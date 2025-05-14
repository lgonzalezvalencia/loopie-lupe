import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
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

  useEffect(() => {
    setTodoList(taskList.filter((task) => task.status === "TODO"));
    setProgressList(taskList.filter((task) => task.status === "IN_PROGRESS"));
    setIssueList(taskList.filter((task) => task.status === "ISSUE"));
    setDoneList(taskList.filter((task) => task.status === "DONE"));
  }, [taskList]);

  const mapStatus = (columnId: string): Task["status"] => {
    switch (columnId) {
      case "To Do":
        return "TODO";
      case "In Progress":
        return "IN_PROGRESS";
      case "Issue":
        return "ISSUE";
      case "Done":
        return "DONE";
      default:
        return "TODO";
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const activeIndex = taskList.findIndex((task) => task.id === active.id);
      const overStatus = mapStatus(String(over.id));

      if (activeIndex !== -1) {
        const updatedTasks = [...taskList];
        const [movedTask] = updatedTasks.splice(activeIndex, 1);

        if (movedTask.status !== overStatus) {
          movedTask.status = overStatus;
        }

        updatedTasks.push(movedTask);
        setTaskList(updatedTasks);
      }
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="columns">
        <Column title="To Do" instanceTasks={todoList} />
        <Column title="In Progress" instanceTasks={progressList} />
        <Column title="Issue" instanceTasks={issueList} />
        <Column title="Done" instanceTasks={doneList} />
      </div>
    </DndContext>
  );
}

export default ColumnContainer;
