import Board from "components/board/board";
import Navbar from "components/navbar/Navbar";
import React from "react";
import "./homepage.scss";

const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <Navbar />
      <Board />
    </div>
  );
};

export default HomePage;
