// FlowChart.js
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  useEdgesState,
  useNodesState,
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { v4 as uuidv4 } from "uuid";
import Modal from "./Modal";
import CustomNode from "./CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

const FlowChart = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [currentNodeId, setCurrentNodeId] = useState(null);

  const addNode = (label, type = "custom", position = { x: 200, y: 200 }) => {
    const newNode = {
      id: uuidv4(),
      type,
      position,
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
    return newNode.id;
  };

  const addNodeWithIcon = (
    label,
    position = { x: 200, y: 200 },
    onAddCallback
  ) => {
    const newNode = {
      id: uuidv4(),
      type: "custom",
      position,
      data: { label, addIcon: true, onAdd: onAddCallback },
    };
    setNodes((nds) => [...nds, newNode]);
    return newNode.id;
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge(
          { ...params, animated: true, style: { stroke: "#555" } },
          eds
        )
      ),
    [setEdges]
  );

  const initializeFlow = (leadLabel) => {
    setNodes([]);
    setEdges([]);

    const leadNodeId = addNode(leadLabel, "custom", { x: 200, y: 50 });
    const sequenceNodeId = addNodeWithIcon(
      "Sequence Start Point",
      { x: 200, y: 150 },
      () => handleAddNode(sequenceNodeId)
    );

    setEdges([{
      id: uuidv4(),
      source: leadNodeId,
      target: sequenceNodeId,
    }]);
  };

  const handleAddNode = (parentId) => {
    setCurrentNodeId(parentId);
    setModalType("addNode");
    setShowModal(true);
  };

  const handleAddSelectedNode = (label) => {
    const parentNode = nodes.find((node) => node.id === currentNodeId);
    const position = { x: parentNode.position.x, y: parentNode.position.y + 100 };
    const newNodeId = addNodeWithIcon(
      label,
      position,
      () => handleAddNode(newNodeId)
    );

    setEdges((eds) => [
      ...eds,
      { id: uuidv4(), source: currentNodeId, target: newNodeId },
    ]);
  };

  const handleLeadSource = (option) => {
    if (option === "Test List") {
      initializeFlow("Lead from Test List");
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <Modal
        show={showModal}
        title={
          modalType === "leadSource"
            ? "Select Lead Source"
            : "Add Sequence Step"
        }
        onClose={() => setShowModal(false)}
        onSelect={
          modalType === "leadSource"
            ? handleLeadSource
            : handleAddSelectedNode
        }
        options={
          modalType === "leadSource"
            ? ["Test List"]
            : ["Cold Email", "Wait/Delay"]
        }
      />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "10px",
        }}
        onClick={() => {
          setModalType("leadSource");
          setShowModal(true);
        }}
      >
        Add Lead Source
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
