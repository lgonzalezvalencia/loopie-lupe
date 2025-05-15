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
import { MainApiUrl } from "./data/endpoints";

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

  const fetchTaskList = async () => {
    try {
      const response = await fetch(MainApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTaskList(data);
    } catch (error) {
      console.error("Error fetching task list:", error);
    }
  };

  useEffect(() => {
    fetchTaskList();
  }, []);

  useEffect(() => {
    const loggedInInfo = sessionStorage.getItem("loggedIn");
    if (loggedInInfo) {
      try {
        setIsLoggedIn(JSON.parse(loggedInInfo));
      } catch (err) {
        console.error("Error parsing if logged in from sessionStorage", err);
      }
    }
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      sessionStorage.setItem("loggedIn", JSON.stringify(isLoggedIn));
    }
  }, [isLoggedIn, isInitialLoad]);

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
