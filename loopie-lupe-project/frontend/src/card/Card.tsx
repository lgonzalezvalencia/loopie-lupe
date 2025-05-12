import "./Card.css";

interface CardProp {
  title: String;
  imageUrl: string;
}

function Card({ title, imageUrl }: CardProp) {
  return (
    <div className="card_body">
      <div className="card_disc_box">
        <p className="card_disc">{title}</p>
      </div>
      <div className="card_image_box">
        <img
          src={imageUrl}
          alt="Business Chemistry Image"
          className="card_image"
        />
      </div>
    </div>
  );
}
export default Card;
