import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <img
          className="logoImage"
          src="https://motocms.exon.pl/mt-content/uploads/2021/08/exon-logo-biel.png"
          alt="exon logo"
        />
      </div>
      <div className="icons">
        <div className="favorites">
          <button type="button">favorites</button>
        </div>
        <div className="login">
          <button type="button">login</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
