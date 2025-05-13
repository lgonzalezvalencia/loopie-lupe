import { useDroppable } from "@dnd-kit/core";
import Card from "../card/Card";
import type { Task } from "../data/types";
import "./Column.css";

interface ColumnProps {
  title: string;
  instanceTasks: Task[];
}

function Column({ title, instanceTasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: title,
  });

  return (
    <div ref={setNodeRef} className="column">
      <p className="column_title"> {title} </p>
      {instanceTasks.map((instance) => (
        <Card info={instance} key={instance.id} />
      ))}
    </div>
  );
}

export default Column;
