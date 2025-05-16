import { useDraggable } from "@dnd-kit/core";
import { useContext, useEffect, useRef, useState } from "react";
import { useProgress } from "../context/ProgressContext";
import type { Task } from "../data/types";
import { TaskDetailsDialogContext } from "../kanbanPage/KanbanPage";
import { defineType } from "../utils/defineType";
import "./Card.css";
import type { Type } from "../utils/Types";

interface CardProp {
  info: Task;
}

const typeColors: Record<Type, string> = {
  Physical: "#FF6B6B",
  Mental: "#4D9DE0",
  Social: "#F7C948",
  Reflective: "#A393EB",
  Productivity: "#89E16A",
};

function Card({ info }: CardProp) {
  const { openDetails, setDetailsTask } = useContext(TaskDetailsDialogContext);
  const { addTypeCount } = useProgress();

  const previousStatusRef = useRef(info.status);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const type = defineType(info.name);

  const {
    attributes,
    listeners,
    setNodeRef,
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

  return (
    <div
      onClick={() => {
        setDetailsTask(info);
        openDetails();
      }}
      ref={(node) => {
        setNodeRef(node);
        cardRef.current = node;
      }}
      style={{
        transition: isDragging ? "none" : "transform 0.3s ease",
        opacity: isDragging ? 0.7 : 1,
        boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.8)" : "none",
        backgroundColor: type ? typeColors[type] : "#ffffff",
        zIndex: isDragging ? 1 : "auto",
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
