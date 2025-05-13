import { useContext, useEffect, useRef } from "react";
import { useProgress } from "../context/ProgressContext";
import type { Task } from "../data/types";
import { TaskDetailsDialogContext } from "../MainPage";
import { defineType } from "../utils/defineType";
import "./Card.css";

interface CardProp {
  info: Task;
}

function Card({ info }: CardProp) {
  const { openDetails, setDetailsTask } = useContext(TaskDetailsDialogContext);
  const { addTypeCount } = useProgress();

  const previousStatusRef = useRef(info.status);

  useEffect(() => {
    setDetailsTask(info);
  }, []);

  useEffect(() => {
    const previousStatus = previousStatusRef.current;

    if (info.status === "DONE" && previousStatus !== "DONE") {
      const type = defineType(info.name);
      if (type) {
        addTypeCount(type);
      }
    }
    previousStatusRef.current = info.status;
  }, [info.status, info.name, addTypeCount]);

  return (
    <div className="card_body" onClick={openDetails}>
      <div className="card_disc_box">
        <p className="card_disc">{info.name}</p>
      </div>
      <div className="card_image_box">
        {info.imgUrl == "" ? (
          ""
        ) : (
          <img
            src={info.imgUrl}
            alt="Business Chemistry Image"
            className="card_image"
          />
        )}
      </div>
    </div>
  );
}
export default Card;
