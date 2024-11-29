// Modal.js
import React from "react";

const Modal = ({ show, title, onClose, onSelect, options }) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "1000",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>{title}</h3>
        {options.map((option, index) => (
          <button
            key={index}
            style={{ margin: "10px 0", padding: "10px", width: "100%" }}
            onClick={() => {
              onSelect(option);
              onClose();
            }}
          >
            {option}
          </button>
        ))}
        <button style={{ padding: "10px", width: "100%" }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
