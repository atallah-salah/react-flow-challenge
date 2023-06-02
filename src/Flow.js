import React, { useCallback, useRef, useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState, addEdge, useReactFlow, Controls, getIncomers, getOutgoers, getConnectedEdges, removeElement } from "reactflow";
import GenderNode from "./Nodes/GenderNode";
import { useDispatch } from "react-redux";
import { updateGenderModalState } from "./redux/slices/genderModalSlice";
import { updateDeleteModalState } from "./redux/slices/deleteModalSlice";

const initialNodes = [{ id: "0", type: "GenderNode", position: { x: 0, y: 50 }, data: { name: "test", gender: "Male" } }];

let id = 1;
const getId = () => `${id++}`;

const fitViewOptions = {
  padding: 3,
};

export const Flow = () => {
  const reactFlowWrapper = useRef(null);
  const connectingNodeId = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { project } = useReactFlow();
  const dispatch = useDispatch();

  const nodeTypes = useMemo(() => ({ GenderNode }), []);

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
          setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id }));
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

            if (delete_all_childs) {
              const updatedNodes = deleteAllReltatedNodes(currentNode);
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

  const deleteNodesWithMyIdSourced = (deletedNodeId, deletedNodes = {}) => {
    edges.map((edge) => {
      if (edge.source === deletedNodeId) {
        deleteNodesWithMyIdSourced(edge.id, deletedNodes);
        deletedNodes[edge.id] = true;
      }
    });

    return { ...deletedNodes, [deletedNodeId]: true };
  };

  const deleteAllReltatedNodes = (deletedNode) => {
    const deletedNodesChecked = {};
    const deletedNodes = deleteNodesWithMyIdSourced(deletedNode.id, deletedNodesChecked);
    const newNodes = nodes.filter((node) => !deletedNodes[node.id]);

    return newNodes;
  };

  return (
    <div className="wrapper" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
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
