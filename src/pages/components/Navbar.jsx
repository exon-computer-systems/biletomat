import React, { useState } from "react";
import {
  faHeart,
  faUser,
  faRightFromBracket,
  faPlusCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = ({ setIsLogged, isLogged, close, open }) => {
  //   const [isClicked, setIsClicked] = useState(false);

  const nav = useNavigate();
  const { setAuth } = useAuth();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

  return (
    <>
      <div className="wave-background"></div>
      <header className="navbar">
        <div className="logo" onClick={() => nav("/")}>
          <img
            className="logoImage"
            src="https://motocms.exon.pl/mt-content/uploads/2021/08/exon-logo-biel.png"
            alt="exon logo"
          />
        </div>
        <div className="icons">
          <div className="logout">
            <button
              className="nav-btn logout-btn"
              type="button"
              onClick={() => {
                console.log("Logout");
                signOut();
              }}
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="nav-icn" />
            </button>
          </div>
          <div className="add-post">
            <button
              className="nav-btn fav-btn"
              type="button"
              onClick={() => nav("/edit-page")}
            >
              <FontAwesomeIcon icon={faPlus} className="nav-icn" />
            </button>
          </div>
          <div className="favorites">
            <button
              className="nav-btn fav-btn"
              type="button"
              onClick={() => nav("/user")}
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
