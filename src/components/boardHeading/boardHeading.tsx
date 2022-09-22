import React from "react";
import "./boardHeading.scss";
import { IBoardheading } from "./interfaces";

const BoardHeading: React.FC<IBoardheading> = ({ name, addTask }) => {
  return (
    <div className="board-heading-container">
      <p className="board-heading">{name}</p>
      <button onClick={addTask}>+ Add New Task</button>
    </div>
  );
};

export default BoardHeading;
