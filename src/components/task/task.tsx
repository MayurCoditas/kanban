import React, { useContext, useState } from "react";
import { IBoard, ITask, ITaskProp } from "./interfaces";
import "./task.scss";
import Modal from "react-modal";
import TaskView from "components/taskView/taskView";
import { BoardContext } from "contexts/boardData";
import { Actions } from "contexts/actions";
Modal.setAppElement("#root");

const Task: React.FC<ITaskProp> = ({ task }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { dispatch, boards, currentBoard } = useContext(BoardContext);

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

  const updateTask = (newTask: ITask) => {
    if (newTask) {
      if (currentBoard) {
        let newTasks = currentBoard.tasks.map((task) =>
          newTask.name === task.name ? newTask : task
        );
        let newBoard: IBoard = { ...currentBoard, tasks: newTasks };
        let newBoards: IBoard[] = boards;
        newBoards = newBoards.map((board) =>
          board.name !== currentBoard.name ? board : newBoard
        );

        dispatch({ type: Actions.updateBoard, payload: newBoards });
        dispatch({ type: Actions.setCurrentBoard, payload: newBoard });
      }
    }
  };

  return (
    <>
      <div className="task-container" onClick={openModal}>
        <p className="task-heading">{task.name}</p>
        <p className="subtask-info">
          {task.subTasks.reduce(
            (sum, subTask) => (subTask.status ? sum + 1 : sum),
            0
          )}{" "}
          of {task.subTasks.length} subtasks
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Exampl Modal"
      >
        <TaskView task={task} closeModal={closeModal} updateTask={updateTask} />
      </Modal>
    </>
  );
};

export default Task;
