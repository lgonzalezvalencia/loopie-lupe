import { useState, useContext } from "react";
import { TaskListContext } from "../App";
import type { Task } from "../data/types";
import "./CreateTask.css";

interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateTask({ isOpen, onClose }: CreateTaskProps) {
  const { setTaskList } = useContext(TaskListContext);
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskRepeat, setTaskRepeat] = useState("NEVER");

  if (!isOpen) return null;

  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleSaveTask = () => {
    const newTask: Task = {
      id: Date.now(),
      name: taskName,
      imgUrl: "",
      status: "TODO",
      details: taskDetails,
      dueDate: new Date(taskDueDate),
      repeat: taskRepeat as "NEVER" | "DAILY" | "WEEKLY" | "MONTHLY",
    };

    setTaskList((prevTasks) => [...prevTasks, newTask]);
    onClose();
    console.log(newTask);
  };

  return (
    <>
      <div className="create-task-overlay" onClick={onClose}>
        <div className="create-task-container" onClick={handleContainerClick}>
          <button className="dialog-close-button" onClick={onClose}>
            X
          </button>
          <form onSubmit={handleSaveTask}>
            <h2 className="create-task-title">Title</h2>
            <input
              type="text"
              className="create-task-input"
              placeholder="Enter task title"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <h2 className="create-task-details">Details</h2>
            <input
              type="text"
              className="create-task-input"
              placeholder="Enter task details"
              value={taskDetails}
              onChange={(e) => setTaskDetails(e.target.value)}
            />
            <h2 className="create-task-date">Due date</h2>
            <input
              type="date"
              className="create-task-input create-task-input-date"
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              required
            />
            <h2 className="create-task-repeat">Repeat</h2>
            <select
              className="create-task-input create-task-input-select"
              value={taskRepeat}
              onChange={(e) => setTaskRepeat(e.target.value)}
            >
              <option value="NEVER">Never</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
            </select>
            <div className="create-task-save-button">
              <button type="submit" className="save-task-button">
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
