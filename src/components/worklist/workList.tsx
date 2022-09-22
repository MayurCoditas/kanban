import Column from "components/column/column";
import { BoardContext } from "contexts/boardData";
import React, { useContext, useState } from "react";
import "./workList.scss";
import Modal from "react-modal";
import NewColumnForm from "components/newColumnForm/newColumnForm";
import { Actions } from "contexts/actions";
import { IBoard } from "./interfaces";

const WorkList: React.FC = () => {
  const { currentBoard, dispatch, boards } = useContext(BoardContext);
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

  const addColumn = (column: string) => {
    let newColumns: string[] = [];
    if (currentBoard) {
      newColumns = newColumns.concat(currentBoard.columns);
      newColumns.push(column);
      console.log(newColumns);
      let updatedBoard: IBoard = { ...currentBoard, columns: newColumns };
      let updatedBoards: IBoard[] = boards.map((board) =>
        board.name === updatedBoard.name ? updatedBoard : board
      );
      dispatch({ type: Actions.setCurrentBoard, payload: updatedBoard });
      dispatch({ type: Actions.updateBoard, payload: updatedBoards });
    }
  };

  return (
    <div className="worklist-container">
      {currentBoard?.columns.map((column) => (
        <Column name={column} />
      ))}
      <div className="last-column-container">
        <button onClick={openModal}>+ Add New Column</button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <NewColumnForm addColumn={addColumn} closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default WorkList;
