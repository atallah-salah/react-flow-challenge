import React from "react";
import { Handle, Position } from "reactflow";
import styles from "./GenderNode.module.scss";

const GenderNode = ({ data: { nodeName, nodeGender } }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={[styles["gender-node"], styles[`gender-node--type-${nodeGender.toLowerCase()}`]].join(" ")}>
        <p className={styles["gender-node__name"]}>{nodeName}</p>
        <p className={styles["gender-node__gender"]}>{nodeGender}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default GenderNode;
