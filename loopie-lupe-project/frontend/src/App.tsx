import {
  createContext,
  useEffect,
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
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
      try {
        setTaskList(JSON.parse(storedTaskList) as Task[]);
      } catch (error) {
        console.error("Error parsing task list from localStorage", error);
      }
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad)
      localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList, isInitialLoad]);

  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <ProgressProvider>
        <MainPage />
      </ProgressProvider>
    </TaskListContext.Provider>
  );
}

export default App;
