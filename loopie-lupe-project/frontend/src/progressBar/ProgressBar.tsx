import React from "react";
import { Type } from "../utils/Types";
import "./ProgressBar.css";

interface ProgressBarProps {
    type: Type;
    progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ type, progress }) => (
    <div className="progress-bar">
        <div>{type} - {progress}</div>
        <div className="outer-bar">
            <div 
                className="inner-bar"
                style={{width: `${(progress / 20) * 100}%`}}
            />
        </div>
    </div>
);