import { BoardContext } from "contexts/boardData";
import React, { useContext, useState } from "react";
import { ISubTask, ITaskView } from "./interfaces";
import "./taskView.scss";

const TaskView: React.FC<ITaskView> = ({ task, closeModal, updateTask }) => {
  const { currentBoard } = useContext(BoardContext);

  const [subtasks, setSubtasks] = useState<ISubTask[]>(task.subTasks);
  const [column, setColumn] = useState(task.column);
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setColumn(event.target.value);
  };
  const handleClick: React.MouseEventHandler = (event: React.MouseEvent) => {
    let newTask = { ...task, subTasks: subtasks, column: column };
    console.log(newTask);
    updateTask(newTask);
    closeModal();
  };
  const handleSubtaskStatusChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let updatedSubtask = subtasks.map((subtask) =>
      Number(event.target.name) === subtask.id
        ? { ...subtask, status: event.target.checked }
        : subtask
    );
    setSubtasks(updatedSubtask);
  };

  return (
    <div className="task-view-container">
      <p className="task-heading">{task.name}</p>
      <p className="task-description">{task.description}</p>
      <div>
        <p className="subtask-container-heading">SubTasks</p>
        {subtasks.map((subtask) => {
          return (
            <div className="checkbox-container" key={subtask.id}>
              <input
                type="checkBox"
                name={`${subtask.id}`}
                defaultChecked={subtask.status}
                onChange={handleSubtaskStatusChange}
              />
              <label>{subtask.name}</label>
            </div>
          );
        })}
      </div>
      <select onChange={handleStatusChange} defaultValue={task.column}>
        {currentBoard?.columns.map((column) => (
          <option>{column}</option>
        ))}
      </select>
      <button onClick={handleClick}>Update and Close</button>
    </div>
  );
};

export default TaskView;
