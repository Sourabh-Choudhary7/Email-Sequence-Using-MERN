// CustomNode.js
import React from "react";
import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ id, data }) => (
  <div
    style={{
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: "#f9f9f9",
      textAlign: "center",
    }}
  >
    <Handle
      type="target"
      position={Position.Top}
      style={{ background: "#555" }}
    />
    {data.label}
    {data.addIcon && (
      <button
        style={{
          marginTop: "10px",
          padding: "5px",
          border: "none",
          borderRadius: "4px",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={data.onAdd}
      >
        +
      </button>
    )}
    <Handle
      type="source"
      position={Position.Bottom}
      style={{ background: "#555" }}
    />
  </div>
);

export default CustomNode;
