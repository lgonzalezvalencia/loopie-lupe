import React from "react";
import type { Type } from "../utils/Types";
import "./ProgressBar.css";

interface ProgressBarProps {
  type: Type;
  progress: number;
}

const typeColors: Record<Type, string> = {
  Physical: "#FF6B6B",
  Mental: "#4D9DE0",
  Social: "#F7C948",
  Reflective: "#A393EB",
  Productivity: "#89E16A",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ type, progress }) => (
  <div className="progress-bar">
    <p className="type-tag">{type}</p>
    <div className="outer-bar">
      <div 
        className="inner-bar"
        style={{
          width: `${(progress / 20) * 100}%`,
          backgroundColor: typeColors[type],
        }}
      />
    </div>
  </div>
);
