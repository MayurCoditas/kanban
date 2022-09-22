import React, { useContext, useEffect, useState } from "react";
import "./taskForm.scss";
import { ISubTask, ITask } from "./interfaces";
import { BoardContext } from "contexts/boardData";
import _ from "lodash";

const TaskForm: React.FC<{
  closeForm: () => void;
  updateTasks: (newTask: ITask) => void;
}> = ({ closeForm, updateTasks }) => {
  const [subTask, setSubTask] = useState<ISubTask[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { currentBoard } = useContext(BoardContext);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (currentBoard) {
      setStatus(currentBoard.columns[0]);
    }
  }, [currentBoard]);

  const addSubTask: React.MouseEventHandler = (event: React.MouseEvent) => {
    event.preventDefault();
    if (subTask)
      setSubTask([
        ...subTask,
        { name: "", id: Math.ceil(Math.random() * 100), status: false },
      ]);
    else
      setSubTask([
        { name: "", id: Math.ceil(Math.random() * 100), status: false },
      ]);
  };

  const removeSubTask: React.MouseEventHandler = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    let target = event.target as HTMLInputElement;
    event.preventDefault();
    let id = Number(target.name);
    if (subTask) {
      setSubTask(subTask.filter((subtask) => subtask.id !== id));
    }
  };

  const handleTitleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStatusChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStatus(event.target.value);
  };

  const addTask: React.FormEventHandler = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    let newTask: ITask = {
      name: title,
      description: description,
      subTasks: subTask.filter((subtask) => subtask.name.length !== 0),
      column: status,
    };
    updateTasks(newTask);
    closeForm();
  };

  const handleSubTaskInputChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newSubtasks = subTask.map((subtask) => {
      if (subtask.id === Number(event.target.name)) {
        return { ...subtask, name: event.target.value };
      } else return subtask;
    });
    setSubTask(newSubtasks);
  };

  return (
    <div className="form-container">
      <form onSubmit={addTask}>
        <div className="taskName-container">
          <p className="form-heading">Add new Task</p>
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={handleTitleChange}
            required
          />
          <label>Description</label>
          <textarea
            className="textArea"
            onChange={handleDescriptionChange}
          ></textarea>
          <label>Sub Tasks</label>
          {subTask.length !== 0 ? (
            subTask.map((subtask) => (
              <div key={`${subtask.id}`} className="subtask-input-container">
                <input
                  type="text"
                  onChange={handleSubTaskInputChange}
                  name={`${subtask.id}`}
                />
                <button onClick={removeSubTask} name={`${subtask.id}`}>
                  <svg
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <label className="noSubTask-Text">No SubTasks</label>
          )}
          <button onClick={addSubTask}>+ Add New SubTask</button>
          <div className="select-container">
            <label>Status</label>
            <select onChange={handleStatusChange}>
              {currentBoard?.columns.map((column) => (
                <option>{column}</option>
              ))}
            </select>
          </div>
          <button className="create-task">Create Task</button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
