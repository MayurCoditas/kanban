import { NavBarIcon } from "components/navbar-icon/navbarIcon";
import { Actions } from "contexts/actions";
import { BoardContext } from "contexts/boardData";
import React, { useContext } from "react";
import "./boardName.scss";
import { IBoardName } from "./interfaces";

const BoardName: React.FC<IBoardName> = ({ board }) => {
  const { dispatch, currentBoard } = useContext(BoardContext);

  const handleClick = () => {
    dispatch({ type: Actions.setCurrentBoard, payload: board });
  };

  return (
    <div
      className={`boardName-container ${
        currentBoard?.name === board.name ? "selected" : ""
      }`}
      onClick={handleClick}
    >
      <NavBarIcon />
      <p>{board.name}</p>
    </div>
  );
};

export default BoardName;
