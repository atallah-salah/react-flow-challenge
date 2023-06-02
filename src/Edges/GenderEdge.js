import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "reactflow";
import { updateCreateMiddleNodeSlice } from "../redux/slices/createMiddleNodeSlice";
import { useDispatch } from "react-redux";

// import "./buttonedge.css";

const GenderEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const dispatch = useDispatch();

  const onEdgeClick = (evt, id) => {
    dispatch(updateCreateMiddleNodeSlice({ modalVisible: true, data: { id, labelX, labelY } }));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: "all",
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={(event) => onEdgeClick(event, id)}>
            +
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default GenderEdge;
