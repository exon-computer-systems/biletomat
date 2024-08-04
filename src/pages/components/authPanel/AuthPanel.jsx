import React, { useState } from "react";
import "./AuthPanel.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CheckmarkAnimation from "./CheckmarkAnimation"; // Make sure to import this if it's in a separate file

const AuthPanel = ({ handleClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [response, setResponse] = useState(false);

  return (
    <section className="overlay" onClick={handleClose}>
      <section className="apanel-cont" onClick={e => e.stopPropagation()}>
        {response ? (
          <CheckmarkAnimation />
        ) : (
          <>
            <section className="apanel-switch-cont">
              <button
                className={`apanel-switch-btn ${showLogin ? "active" : ""}`}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <span className="vert-line"></span>
              <button
                className={`apanel-switch-btn ${!showLogin ? "active" : ""}`}
                onClick={() => setShowLogin(false)}
              >
                Sign up
              </button>
            </section>
            {showLogin ? (
              <LoginForm handleClose={handleClose} setResponse={setResponse} />
            ) : (
              <RegisterForm
                handleClose={handleClose}
                setResponse={setResponse}
              />
            )}
          </>
        )}
      </section>
    </section>
  );
};

export default AuthPanel;
