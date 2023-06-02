import React from "react";
import { Handle, Position } from "reactflow";
import styles from "./GenderNode.module.scss";

const GenderNode = ({ data: { name, gender } }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className={[styles["gender-node"], styles[`gender-node--type-${gender.toLowerCase()}`]].join(" ")}>
        <p className={styles["gender-node__name"]}>{name}</p>
        <p className={styles["gender-node__gender"]}>{gender}</p>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
};

export default GenderNode;
