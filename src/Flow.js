import React, { useCallback, useRef } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, useReactFlow, Controls, getIncomers, getOutgoers, getConnectedEdges, removeElement } from "reactflow";
import GenderNode from "./Nodes/GenderNode";
import GenderEdge from "./Edges/GenderEdge";

import { useDispatch, useSelector } from "react-redux";
import { updateGenderModalState } from "./redux/slices/genderModalSlice";
import { updateDeleteModalState } from "./redux/slices/deleteModalSlice";
import { useEffect } from "react";
import { updateCreateMiddleNodeSlice } from "./redux/slices/createMiddleNodeSlice";

// static data
const initialNodes = [{ id: "0", type: "GenderNode", position: { x: 0, y: 50 }, data: { name: "Me", gender: "Male" } }];
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
  const { data, createNode, nodeName, nodeGender } = useSelector((state) => state.createMiddleNodeModal);

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
        const modalCallback = (name, gender) => {
          // we need to remove the wrapper bounds, in order to get the correct position
          const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
          const id = getId();
          const newNode = {
            id,
            type: "GenderNode",
            // we are removing the half of the node width (75) to center the new node
            position: project({
              x: event.clientX - left - 75,
              y: event.clientY - top,
            }),
            data: { name, gender },
          };

          setNodes((nds) => nds.concat(newNode));
          setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id, type: "GenderEdge" }));
        };

        // dispatch modal action to show genderModal with success callback function
        dispatch(updateGenderModalState({ modalVisible: true, modalCallback }));
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

  useEffect(() => {
    if (createNode) {
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
        data: { name: nodeName, gender: nodeGender },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => {
        let newEdges = eds.filter(({ source, target }) => {
          // filter the existing edge from the list
          return source !== connectingNodeId.current && target !== data.id;
        });

        // add new 2 edges to the previous node and the next node
        newEdges = [...newEdges, { id, source: connectingNodeId.current, target: id, type: "GenderEdge" }, { id, source: id, target: data.id, type: "GenderEdge" }];

        return newEdges;
      });
      // hide modal and clear all data
      dispatch(updateCreateMiddleNodeSlice({ modalVisible: false, data: {}, createNode: false }));
    }
    return () => {};
  }, [createNode]);

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
