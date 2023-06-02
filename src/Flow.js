import React, { useCallback, useRef } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, useReactFlow, Controls, getIncomers, getOutgoers, getConnectedEdges, removeElement } from "reactflow";
import GenderNode from "./Nodes/GenderNode";
import GenderEdge from "./Edges/GenderEdge";

import { useDispatch, useSelector } from "react-redux";
import { updateGenderModalState } from "./redux/slices/genderModalSlice";
import { updateDeleteModalState } from "./redux/slices/deleteModalSlice";
import { useEffect } from "react";

// static data
const initialNodes = [{ id: "0", type: "GenderNode", position: { x: 0, y: 50 }, data: { nodeName: "Me", nodeGender: "Male" } }];
const fitViewOptions = {
  padding: 3,
};
const nodeTypes = { GenderNode };
const edgeTypes = { GenderEdge };

let id = 1;
const getId = () => `${id++}`;

export const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();

  // redux state management
  const dispatch = useDispatch();
  const { data, isCreateNode, nodeName, nodeGender, creationType } = useSelector((state) => state.genderModal);

  const onConnect = useCallback((params) => {
    // Avoid connecting node edges with itself
    const { source, target } = params;
    if (source === target) return;

    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        // dispatch modal action to show genderModal with success callback function
        const eventData = { clientX: event.clientX, clientY: event.clientY };
        dispatch(updateGenderModalState({ modalVisible: true, data: eventData, creationType: "Normal" }));
      }
    },
    [project],
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      const modalCallback = (delete_all_childs) => {
        setEdges(
          deleted.reduce((acc, currentNode) => {
            const incomers = getIncomers(currentNode, nodes, edges);
            const outgoers = getOutgoers(currentNode, nodes, edges);
            const connectedEdges = getConnectedEdges([currentNode], edges);

            const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));
            const createdEdges = incomers.flatMap(({ id: source }) => outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target })));

            // check if user input is to delete all nested nodes of the current node
            if (delete_all_childs) {
              const updatedNodes = deleteNode(currentNode);
              setNodes(updatedNodes);
            }

            return [...remainingEdges, ...createdEdges];
          }, edges),
        );
      };

      // dispatch modal action to show deleteModal with success callback function
      dispatch(updateDeleteModalState({ modalVisible: true, modalCallback }));
    },
    [nodes, edges],
  );

  const deleteNestedNodes = (deletedNodeId, deletedNodes = {}) => {
    // loop over all current edges and locate all nested nodes
    edges.map((edge) => {
      if (edge.source === deletedNodeId) {
        deleteNestedNodes(edge.id, deletedNodes);
        deletedNodes[edge.id] = true;
      }
    });

    return { ...deletedNodes, [deletedNodeId]: true };
  };

  const deleteNode = (deletedNode) => {
    const locatedNodes = {};
    const deletedNodes = deleteNestedNodes(deletedNode.id, locatedNodes);
    const newNodes = nodes.filter((node) => !deletedNodes[node.id]);

    return newNodes;
  };

  const clearGenderModalState = () => dispatch(updateGenderModalState({ modalVisible: false, data: {}, isCreateNode: false, creationType: "" }));

  const createInMiddleNode = () => {
    // we need to remove the wrapper bounds, in order to get the correct position
    const id = getId();
    const newNode = {
      id,
      type: "GenderNode",
      // we are removing the half of the node width (75) to center the new node
      position: project({
        x: data.labelX,
        y: data.labelY,
      }),
      data: { nodeName, nodeGender },
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => {
      let newEdges = eds.filter((e) => e.id !== data.id);

      // add new 2 edges to the previous node and the next node
      const prevEdge = { id: getId(), source: data.source, target: newNode.id, type: "GenderEdge" };
      const nextEdge = { id: getId(), source: newNode.id, target: data.target, type: "GenderEdge" };

      newEdges = [...newEdges, prevEdge, nextEdge];

      return newEdges;
    });

    // hide modal and clear all data
    clearGenderModalState();
  };

  const createNormalNode = () => {
    // we need to remove the wrapper bounds, in order to get the correct position
    const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
    const id = getId();
    const newNode = {
      id,
      type: "GenderNode",
      // we are removing the half of the node width (75) to center the new node
      position: project({
        x: data.clientX - left - 75,
        y: data.clientY - top,
      }),
      data: { nodeName, nodeGender },
    };

    setNodes((nds) => nds.concat(newNode));
    setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id, type: "GenderEdge" }));

    clearGenderModalState();
  };

  useEffect(() => {
    if (!isCreateNode) {
      return;
    }

    creationType === "Normal" && createNormalNode();
    creationType === "InMiddle" && createInMiddleNode();

    return () => {};
  }, [isCreateNode]);

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectStart={onConnectStart}
        onConnectEnd={onConnectEnd}
        onNodesDelete={onNodesDelete}
        fitView
        fitViewOptions={fitViewOptions}
      />
      <Controls />
    </div>
  );
};
