import React from "react";
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from "reactflow";
import { useDispatch } from "react-redux";

import styles from "./GenderEdge.module.scss";
import { updateGenderModalState } from "../redux/slices/genderModalSlice";

const GenderEdge = ({ id, source, target, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd, ...rest }) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const dispatch = useDispatch();

  const onEdgeClick = (id) => {
    dispatch(updateGenderModalState({ modalVisible: true, creationType: "InMiddle", data: { id, source, target, labelX, labelY } }));
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
          <button className={styles.button} onClick={onEdgeClick.bind({}, id)}>
            +
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default GenderEdge;
