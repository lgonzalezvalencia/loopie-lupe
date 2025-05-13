import { useContext, useState } from "react";
import "./TaskDetails.css";
import { TaskListContext } from "../App";
import type { Task } from "../data/types";

interface TaskDetailsProp {
  isOpen: boolean;
  onClose: () => void;
  instance: Task;
}

function TaskDetails({ isOpen, onClose, instance }: TaskDetailsProp) {
  if (!isOpen) return null;
  const { setTaskList } = useContext(TaskListContext);
  const [taskName, setTaskName] = useState(instance.name);
  const [taskDetails, setTaskDetails] = useState(instance.details);
  const [taskDueDate, setTaskDueDate] = useState(instance.dueDate);
  const [taskRepeat, setTaskRepeat] = useState(instance.repeat);
  const [taskStatus, setTaskStatus] = useState(instance.status);

  const handleEditTask = () => {
    const newTask: Task = {
      id: instance.id,
      name: taskName,
      imgUrl: "",
      status: taskStatus,
      details: taskDetails,
      dueDate: new Date(taskDueDate),
      repeat: taskRepeat as "NEVER" | "DAILY" | "WEEKLY" | "MONTHLY",
    };

    setTaskList((prevTasks) =>
      prevTasks.map((task) => (task.id === instance.id ? newTask : task))
    );

    onClose();
    window.location.reload();
    console.log(newTask);
  };

  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <dialog open={isOpen} className="task_details_overlay" onClick={onClose}>
      <div className="task_details_container" onClick={handleContainerClick}>
        <button onClick={onClose}>X</button>

        <form onSubmit={handleEditTask}>
          <h2 className="update-task">Title</h2>
          <input
            type="text"
            className="update-task-input"
            placeholder="Enter task title"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
          <h2 className="update-task">Details</h2>
          <input
            type="text"
            className="update-task-input"
            placeholder="Enter task details"
            value={taskDetails}
            onChange={(e) => setTaskDetails(e.target.value)}
          />
          <h2 className="update-task">Due date</h2>
          <input
            type="date"
            className="update-task-input update-task-input-date"
            value={taskDueDate.split("T")[0]}
            onChange={(e) => setTaskDueDate(e.target.value)}
            required
          />
          <h2 className="update-task">Repeat</h2>
          <select
            className="update-task-input update-task-input-select"
            value={taskRepeat}
            onChange={(e) =>
              setTaskRepeat(
                e.target.value as "NEVER" | "DAILY" | "WEEKLY" | "MONTHLY"
              )
            }
          >
            <option value="NEVER">Never</option>
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
          </select>

          <h2 className="update-task">Status</h2>
          <select
            className="update-task-input update-task-input-select"
            value={taskStatus}
            onChange={(e) =>
              setTaskStatus(
                e.target.value as "TODO" | "IN_PROGRESS" | "ISSUE" | "DONE"
              )
            }
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ISSUE">Issue</option>
            <option value="DONE">Done</option>
          </select>

          <div className="update-task-save-button">
            <button type="submit" className="save-task-button">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default TaskDetails;
