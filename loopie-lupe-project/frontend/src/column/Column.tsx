import Card from "../card/Card";
import "./Column.css";

function Column() {
  return (
    <>
      <div className="column">
        <Card
          title="I'm a card and my job is to show information in an easy to parse way"
          imageUrl="/driver.png"
        />
      </div>
    </>
  );
}
export default Column;
