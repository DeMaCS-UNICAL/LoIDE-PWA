import React from "react";

interface OutputProps {
  model: string;
  error: string;
  fontSize?: number;
}

const Output: React.FC<OutputProps> = ({ model, error, fontSize = 20 }) => {
  return (
    <div className="loide-output" style={{ fontSize: `${fontSize}px` }}>
      <div className="output-content ion-padding">
        <div className="output-model">{model}</div>
        <div className={`output-error ${error.length === 0 ? "" : "ion-margin-top"}`}>{error}</div>
      </div>
    </div>
  );
};

export default Output;
