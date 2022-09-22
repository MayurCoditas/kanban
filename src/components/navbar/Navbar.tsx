import Logo from "components/logo/logo";
import React from "react";
import "./Navbar.scss";
import BoardList from "components/boardList/boardList";

const Navbar: React.FC = () => {
  return (
    <div className="navbar-container">
      <Logo />
      <BoardList />
    </div>
  );
};

export default Navbar;
