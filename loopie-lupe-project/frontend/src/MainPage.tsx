import { createContext, useState, type Dispatch } from "react";
import ColumnContainer from "./columnContainer/ColumnContainer";
import CreateTask from "./createTask/CreateTask";
import "./MainPage.css";
import LoginPage from "./login/LoginPage";
import TaskDetails from "./taskDetails/TaskDetails";
import type { Task } from "./data/types";

interface TaskDetailsDialogContextProp {
  isDetailsOpen: boolean;
  openDetails: () => void;
  closeDetails: () => void;
  setDetailsTask: Dispatch<React.SetStateAction<Task>>;
}

export const TaskDetailsDialogContext =
  createContext<TaskDetailsDialogContextProp>({
    isDetailsOpen: false,
    openDetails: () => {},
    closeDetails: () => {},
    setDetailsTask: () => {},
  });

function MainApp() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsTask, setDetailsTask] = useState<Task>({
    id: "",
    name: "",
    imgUrl: "",
    status: "",
    details: "",
    dueDate: null,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

  return (
    <>
      {isLoggedIn /* Reminder to change the condition to !isLoggedIn for Authentication */ ? (
        <LoginPage setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="main-container">
          <div className="page_header">
            <h1 className="page-title">MindFlow</h1>
            <button onClick={openDialog}>+ New</button>
          </div>

          <div className="kanban-area">
            <CreateTask isOpen={isDialogOpen} onClose={closeDialog} />
            <TaskDetails
              isOpen={isDetailsOpen}
              onClose={closeDetails}
              instance={detailsTask}
            />
            <TaskDetailsDialogContext.Provider
              value={{
                isDetailsOpen,
                openDetails,
                closeDetails,
                setDetailsTask,
              }}
            >
              <ColumnContainer />
            </TaskDetailsDialogContext.Provider>
          </div>
        </div>
      )}
    </>
  );
}

export default MainApp;
