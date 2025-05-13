import Card from "../card/Card";
import type { Task } from "../data/types";
import "./Column.css";

interface ColumnProps {
  title: string;
  instanceTasks: Task[];
}

function Column({ title, instanceTasks }: ColumnProps) {
  return (
    <>
      <div className="column">
        <p className="column_title"> {title} </p>
        {instanceTasks
          ? instanceTasks.map((instance) => {
              return <Card info={instance} key={instance.id} />;
            })
          : ""}
      </div>
    </>
  );
}
export default Column;
