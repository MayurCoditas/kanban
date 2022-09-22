import React, { useState } from "react";
import { INewColumnForm } from "./interfaces";
import "./newColumnForm.scss";

const NewColumnForm: React.FC<INewColumnForm> = ({ addColumn, closeModal }) => {
  const [newColumn, setNewColumn] = useState("");

  const handleClick: React.MouseEventHandler = () => {
    addColumn(newColumn);
    closeModal();
  };

  const handleChange: React.ChangeEventHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewColumn(event.target.value);
  };

  return (
    <div className="column-form-container">
      <label>Column Name</label>
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>Add New Column</button>
    </div>
  );
};

export default NewColumnForm;
