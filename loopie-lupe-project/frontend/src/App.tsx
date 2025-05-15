import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import "./App.css";
import type { Task } from "./data/types";
import { ProgressProvider } from "./context/ProgressContext";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "./login/LoginPage";
import AppRouter from "./AppRouter";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log("isLoggedIn: ", isLoggedIn);

  useEffect(() => {
    const storedTaskList = localStorage.getItem("taskList");
    if (storedTaskList) {
      try {
        setTaskList(JSON.parse(storedTaskList));
      } catch (err) {
        console.error("Error parsing task list from localStorage", err);
      }
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("taskList", JSON.stringify(taskList));
    }
  }, [taskList, isInitialLoad]);

  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <ProgressProvider>
        {isLoggedIn ? (
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        ) : (
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        )}
      </ProgressProvider>
    </TaskListContext.Provider>
  );
}

export default App;
