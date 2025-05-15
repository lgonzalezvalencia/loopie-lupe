import { useState, createContext, type Dispatch, useEffect } from "react";
import ColumnContainer from "../columnContainer/ColumnContainer";
import CreateTask from "../createTask/CreateTask";
import TaskDetails from "../taskDetails/TaskDetails";
import type { Task } from "../data/types";
import { useOutletContext } from "react-router-dom";

type OutletContextType = {
    setOnNewClick: React.Dispatch<React.SetStateAction<() => void>>;
}

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

function KanbanPage() {
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

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  const openDetails = () => setIsDetailsOpen(true);
  const closeDetails = () => setIsDetailsOpen(false);

  const { setOnNewClick } = useOutletContext<OutletContextType>();

  useEffect(() => {
    setOnNewClick(() => openDialog);
  }, []);

  return (
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
  );
}

export default KanbanPage;
