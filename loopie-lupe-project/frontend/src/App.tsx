import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import "./App.css";
import MainPage from "./MainPage";
import type { Task } from "./data/types";

interface TaskListContextType {
  taskList: Task[];
  setTaskList: Dispatch<SetStateAction<never[]>>;
}

export const TaskListContext = createContext<TaskListContextType>({
  taskList: [],
  setTaskList: () => {},
});

function App() {
  const [taskList, setTaskList] = useState([]);
  return (
    <TaskListContext.Provider value={{ taskList, setTaskList }}>
      <MainPage />
    </TaskListContext.Provider>
  );
}

export default App;
