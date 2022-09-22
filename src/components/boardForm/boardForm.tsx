import React, { useState } from "react";
import "./boardForm.scss";
import { IBoardValues } from "./interfaces";

const BoardForm: React.FC<{
  addBoard: (board: IBoardValues) => void;
  closeModal: () => void;
}> = ({ addBoard, closeModal }) => {
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState<string[]>([]);

  const handleClick = () => {
    let newBoardValues = {
      name: boardName,
      columns: columns.filter((column) => column.length > 0),
    };
    addBoard(newBoardValues);
    closeModal();
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setBoardName(event?.target.value);
  };

  const handleAddColumn = () => {
    setColumns([...columns, ""]);
  };

  const handleRemoveColumn: React.MouseEventHandler = (
    event: React.MouseEvent<HTMLInputElement>
  ) => {
    let target = event.target as HTMLInputElement;
    setColumns(
      columns.filter((column, index) => Number(target.name) !== index)
    );
  };

  const handleColumnInputChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setColumns(
      columns.map((column, index) =>
        Number(event.target.name) === index ? event.target.value : column
      )
    );
  };

  return (
    <div className="board-form-container">
      <div className="board-form-heading">
        <p>Create New Board</p>
      </div>
      <label>Board Name</label>
      <input type="text" onChange={handleChange} required />
      <div className="add-column-container">
        <label>Add Columns</label>

        {columns.length === 0 ? (
          <label>No Columns</label>
        ) : (
          columns.map((column, index) => (
            <div className="column-input-container">
              <input
                type="text"
                onChange={handleColumnInputChange}
                name={`${index}`}
              />
              <button onClick={handleRemoveColumn} name={`${index}`}>
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
        )}
        <button onClick={handleAddColumn}>Add Column</button>
      </div>
      <button onClick={handleClick}>Create Board</button>
    </div>
  );
};

export default BoardForm;
