import BoardName from "components/boardName/boardName";
import { NavBarIcon } from "components/navbar-icon/navbarIcon";
import { BoardContext } from "contexts/boardData";
import React, { useContext, useState } from "react";
import "./boardList.scss";
import Modal from "react-modal";
import BoardForm from "components/boardForm/boardForm";
import { Actions } from "contexts/actions";
import { IBoard } from "contexts/interfaces";
import { IBoardValues } from "./interfaces";

const BoardList: React.FC = () => {
  const { boards, dispatch, currentBoard } = useContext(BoardContext);
  const [modalIsOpen, setIsOpen] = useState(false);

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
    },
    content: {
      top: "280px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "360px",
      overflow: "none",
      margin: "0",
      padding: "0",
      border: "none",
      borderRadius: "8px",
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const addBoard = (board: IBoardValues) => {
    let newBoard = {
      ...board,
      tasks: [],
    };
    dispatch({ type: Actions.updateBoard, payload: [...boards, newBoard] });
  };

  return (
    <div className="boardList-container">
      <div className="boardList-heading">
        <p>All Boards ({boards.length})</p>
      </div>
      <div>
        {boards.map((board) => (
          <BoardName key={board.name} board={board} />
        ))}
      </div>
      <button className="create-board-button" onClick={openModal}>
        <NavBarIcon /> +Create New Board
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <BoardForm addBoard={addBoard} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default BoardList;
