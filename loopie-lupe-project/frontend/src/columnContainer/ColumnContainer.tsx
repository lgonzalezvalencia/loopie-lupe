import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useContext, useEffect, useState } from "react";
import Column from "../column/Column";
import "./ColumnContainer.css";
import { TaskListContext } from "../App";
import type { Task } from "../data/types";
import { MainApiUrl } from "../data/endpoints";

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

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const activeIndex = taskList.findIndex((task) => task.id === active.id);
      const overStatus = mapStatus(String(over.id));

      if (activeIndex !== -1) {
        const updatedTasks = [...taskList];
        const [movedTask] = updatedTasks.splice(activeIndex, 1);

        if (movedTask.status !== overStatus) {
          movedTask.status = overStatus;
          try {
            const response = await fetch(`${MainApiUrl}/${movedTask.id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: overStatus }),
            });

            if (response.ok) {
              const updatedTasks = [...taskList];
              updatedTasks[activeIndex] = { ...movedTask, status: overStatus };
              setTaskList(updatedTasks);
            } else {
              console.error(
                `Failed to update status. Status: ${response.status}`
              );
            }
          } catch (error) {
            console.error("Error occurred while updating the status:", error);
          }
          updatedTasks.push(movedTask);
          setTaskList(updatedTasks);
        }
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 10,
      },
    })
  );

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
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
