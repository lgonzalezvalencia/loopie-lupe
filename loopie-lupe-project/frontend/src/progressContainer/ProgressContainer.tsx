import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { ProgressBar } from "../progressBar/ProgressBar";
import { ALL_TYPES } from "../utils/Types";
import "./ProgressContainer.css";

export const ProgressContainer: React.FC = () => {
    const { progress } = useContext(ProgressContext);

    return (
        <div className="progress-container">
            <h2>Progress</h2>
            {ALL_TYPES.map((type) => (
                <ProgressBar key={type} type={type} progress={progress[type]} />
            ))}
        </div>
    );
}