import React, { useCallback } from "react";
import { Handle, Position } from "reactflow";
import styles from "./GenderNode.module.scss";

const GenderNode = ({ data: { name, gender } }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={styles.container}>
        <p className={styles.name}>{name}</p>
        <p className={styles.gender}>{gender}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default GenderNode;
