import React, { useCallback } from "react";
import { Handle, Position } from "reactflow";
import styles from "./GenderNode.module.scss";

const GenderNode = ({ data }) => {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={styles.container}>
        <label htmlFor="text">Atallah</label>
        <label htmlFor="text">male</label>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default GenderNode;
