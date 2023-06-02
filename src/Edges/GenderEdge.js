import React from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";
import { updateCreateMiddleNodeSlice } from "../redux/slices/createMiddleNodeSlice";
import { useDispatch } from "react-redux";

import styles from "./GenderEdge.module.scss";

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

  const onEdgeClick = (event, id) => {
    // show create new node modal
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
        >
          <button className={styles.button} onClick={(event) => onEdgeClick(event, id)}>
            +
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default GenderEdge;
