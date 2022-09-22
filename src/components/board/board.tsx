import BoardHeading from "components/boardHeading/boardHeading";
import TaskForm from "components/taskForm/taskForm";
import WorkList from "components/worklist/workList";
import { BoardContext } from "contexts/boardData";
import React, { useContext, useEffect, useState } from "react";
import "./board.scss";
import Modal from "react-modal";
import { IBoard, ITask } from "./interfaces";
import { Actions } from "contexts/actions";
Modal.setAppElement("#root");
const Board: React.FC = () => {
  const { currentBoard, dispatch, boards } = useContext(BoardContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<ITask | null>(null);

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
      width: "320px",
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

  useEffect(() => {
    if (newTask) {
      if (currentBoard) {
        let newTasks = [...currentBoard.tasks, newTask];
        let newBoard: IBoard = { ...currentBoard, tasks: newTasks };
        let newBoards: IBoard[] = boards;
        newBoards = newBoards.map((board) =>
          board.name !== currentBoard.name ? board : newBoard
        );

        dispatch({ type: Actions.updateBoard, payload: newBoards });
        dispatch({ type: Actions.setCurrentBoard, payload: newBoard });
      }
      setNewTask(null);
    }
  }, [boards, currentBoard, dispatch, newTask]);

  const updateTasks: (newTask: ITask) => void = (newTask) => {
    setNewTask(newTask);
  };

  return (
    <div className="board-container">
      {currentBoard ? (
        <>
          <BoardHeading name={currentBoard.name} addTask={openModal} />
          <WorkList />
        </>
      ) : null}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <TaskForm closeForm={closeModal} updateTasks={updateTasks} />
      </Modal>
    </div>
  );
};

export default Board;
