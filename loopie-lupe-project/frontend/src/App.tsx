import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import "./App.css";
import MainPage from "./MainPage";
import type { Task } from "./data/types";
import { ProgressProvider } from "./context/ProgressContext";

interface TaskListContextType {
  taskList: Task[];
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

export const TaskListContext = createContext<TaskListContextType>({
  taskList: [],
  setTaskList: () => {},
});

function App() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <ProgressProvider>
        <MainPage />
      </ProgressProvider>
    </TaskListContext.Provider>
  );
}

export default App;
