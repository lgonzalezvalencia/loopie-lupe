import { createContext, useContext, useState } from "react";
import "./App.css";
import MainPage from "./MainPage";
import type { Task } from "./data/types";

export const TaskListContext = createContext<Task[]>([]);

function App() {
  const [taskList, setTaskList] = useState([]);
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
