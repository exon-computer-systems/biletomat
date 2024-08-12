import React, { useEffect, useState } from "react";
import {
  faHeart,
  faUser,
  faRightFromBracket,
  faPlusCircle,
  faPlus,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import AuthPanel from "./authPanel/AuthPanel";

const Navbar = ({
  handlePanel,
  activeAuthPanel,
  setActiveAuthPanel,
  handleAuth,
  handleClose,
}) => {
  const nav = useNavigate();
  const { auth } = useAuth();

  const allowedRoles = [1984, 2150];

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
          {/* // display button if user contains allowed role */}
          {allowedRoles.some(i => auth?.roles?.includes(i)) && (
            <div className="add-post">
              <button
                className="nav-btn fav-btn"
                type="button"
                onClick={() => nav("/create-new-page")}
              >
                <FontAwesomeIcon icon={faPlus} className="nav-icn" />
              </button>
            </div>
          )}
          <div className="scan">
            <button
              className="nav-btn log-btn"
              type="button"
              onClick={() => nav("/redeem")}
            >
              <FontAwesomeIcon icon={faQrcode} className="nav-icn" />
            </button>
          </div>
          <div className="login">
            <button
              className="nav-btn log-btn"
              type="button"
              // onClick={() => (isLogged ? close() : open())}
              onClick={handleAuth}
            >
              <FontAwesomeIcon icon={faUser} className="nav-icn" />
            </button>
          </div>
        </div>
      </header>

      {activeAuthPanel && <AuthPanel handleClose={handleClose} />}
    </>
  );
};

export default Navbar;
