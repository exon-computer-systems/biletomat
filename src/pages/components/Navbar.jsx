import React, { useState } from "react";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = ({ setIsLogged, isLogged, close, open }) => {
  //   const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <div className="wave-background"></div>
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
            <button
              className="nav-btn fav-btn"
              type="button"
              onClick={() => console.log("Favourite clicked")}
            >
              <FontAwesomeIcon icon={faHeart} className="nav-icn" />
            </button>
          </div>
          <div className="login">
            <button
              className="nav-btn log-btn"
              type="button"
              onClick={() => (isLogged ? close() : open())}
            >
              <FontAwesomeIcon icon={faUser} className="nav-icn" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
