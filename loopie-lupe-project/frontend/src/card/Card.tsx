import "./Card.css";

function Card() {
  return (
    <div className="card_body">
      <div className="card_disc_box">
        <p className="card_disc">I'm a card</p>
      </div>
      <div className="card_image_box">
        <img
          src="/vite.svg"
          alt="Business Chemistry Image"
          className="card_image"
        />
      </div>
    </div>
  );
}
export default Card;
