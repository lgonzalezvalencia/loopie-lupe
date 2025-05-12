import Column from "../column/Column";
import "./ColumnContainer.css";

function ColumnContainer() {
  return (
    <>
      <div className="columns">
        <Column />
        <Column />
        <Column />
        <Column />
      </div>
    </>
  );
}
export default ColumnContainer;
