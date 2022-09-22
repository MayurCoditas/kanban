import React, { useContext } from "react";
import "./column.scss";
import Task from "components/task/task";
import { IColumn } from "./interfaces";
import { BoardContext } from "contexts/boardData";

const Column: React.FC<IColumn> = ({ name }) => {
  const { currentBoard } = useContext(BoardContext);
  // const onDragOver = (event: React.DragEvent) => {
  //   event.preventDefault();
  //   console.log(event);
  // };
  return (
    <div className="column-container">
      <div className="column-heading">
        <span className="circle"></span>
        <p>
          {name} (
          {currentBoard?.tasks.filter((task) => task.column === name).length})
        </p>
      </div>
      <div className="tasks-container">
        {currentBoard?.tasks
          .filter((task) => task.column === name)
          .map((task) => (
            <Task key={task.name} task={task} />
          ))}
      </div>
    </div>
  );
};

export default Column;
