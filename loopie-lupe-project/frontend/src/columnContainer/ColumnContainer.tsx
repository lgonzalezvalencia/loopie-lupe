import { useContext, useEffect, useState } from "react";
import Column from "../column/Column";
import "./ColumnContainer.css";
import { TaskListContext } from "../App";
import type { Task } from "../data/types";

function ColumnContainer() {
  const { taskList } = useContext(TaskListContext);

  const [todoList, setTodoList] = useState<Task[]>([]);
  const [progressList, setProgressList] = useState<Task[]>([]);
  const [issueList, setIssueList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);

  useEffect(() => {
    setTodoList(taskList.filter((task) => task.status === "TODO"));
    setProgressList(taskList.filter((task) => task.status === "IN_PROGRESS"));
    setIssueList(taskList.filter((task) => task.status === "ISSUE"));
    setDoneList(taskList.filter((task) => task.status === "DONE"));
  }, [taskList]);

  return (
    <>
      <div className="columns">
        <Column title="To Do" instanceTasks={todoList} />
        <Column title="In Progress" instanceTasks={progressList} />
        <Column title="Issue" instanceTasks={issueList} />
        <Column title="Done" instanceTasks={doneList} />
      </div>
    </>
  );
}
export default ColumnContainer;
