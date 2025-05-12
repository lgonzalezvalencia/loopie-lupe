import type { Task } from "../data/types";
import "./Card.css";

interface CardProp {
  info: Task;
}

function Card({ info }: CardProp) {
  return (
    <div className="card_body">
      <div className="card_disc_box">
        <p className="card_disc">{info.name}</p>
      </div>
      <div className="card_image_box">
        <img
          src={info.imgUrl}
          alt="Business Chemistry Image"
          className="card_image"
        />
      </div>
    </div>
  );
}
export default Card;
