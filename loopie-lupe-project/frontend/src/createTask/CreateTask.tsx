import "./CreateTask.css";

interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreateTask({ isOpen, onClose }: CreateTaskProps) {
  if (!isOpen) return null;

  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="create-task-overlay" onClick={onClose}>
        <div className="create-task-container" onClick={handleContainerClick}>
          <button className="dialog-close-button" onClick={onClose}>
            X
          </button>
          <h2 className="create-task-title">Title</h2>
          <input
            type="text"
            className="create-task-input"
            placeholder="Enter task title"
          />
          <h2 className="create-task-details">Details</h2>
          <input
            type="text"
            className="create-task-input"
            placeholder="Enter task details"
          />
          <h2 className="create-task-date">Due date</h2>
          <input
            type="date"
            className="create-task-input create-task-input-date"
            placeholder="Enter task date"
          />
          <h2 className="create-task-repeat">Repeat</h2>
          <select className="create-task-input create-task-input-select">
            <option value="never">Never</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="create-task-save-button">
            <button className="save-task-button">Save Task</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CreateTask;
