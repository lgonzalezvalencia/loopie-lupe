import { useContext, useEffect, useState } from "react";
import Column from "../column/Column";
import "./ColumnContainer.css";
import { TaskListContext } from "../App";
import type { Task } from "../data/types";

function ColumnContainer() {
  const { taskList, setTaskList } = useContext(TaskListContext);

  const [todoList, setTodoList] = useState<Task[]>([]);
  const [progressList, setProgressList] = useState<Task[]>([]);
  const [issueList, setIssueList] = useState<Task[]>([]);
  const [doneList, setDoneList] = useState<Task[]>([]);

  useEffect(() => {}, []);

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
