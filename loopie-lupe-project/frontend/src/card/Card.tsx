import { useDraggable } from "@dnd-kit/core";
import { useContext, useEffect, useRef, useState } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setDetailsTask(info);
  }, []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: dragging,
  } = useDraggable({
    id: info.id,
  });

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

  useEffect(() => {
    setIsDragging(dragging);
  }, [dragging]);

  const getConstrainedTransform = () => {
    if (!cardRef.current || !transform) return transform;

    const columnWidth = cardRef.current.parentElement?.offsetWidth || 0;
    const constrainedX = Math.max(
      0,
      Math.min(transform.x, columnWidth - cardRef.current.offsetWidth)
    );

    return { ...transform, x: constrainedX };
  };

  const constrainedTransform = getConstrainedTransform();

  return (
    <div
      onClick={openDetails}
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
      style={{
        transition: isDragging ? "none" : "transform 0.3s ease",
        opacity: isDragging ? 0.85 : 1, // Semi-transparent while dragging
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.8)" : "none", // Shadow effect
      }}
      {...listeners}
      {...attributes}
      className="card_body"
    >
      <div className="card_disc_box">
        <p className="card_disc">{info.name}</p>
      </div>
      <div className="card_image_box">
        {info.imgUrl === "" ? (
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
