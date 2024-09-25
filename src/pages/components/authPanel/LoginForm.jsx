import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import CheckmarkAnimation from "./CheckmarkAnimation";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const LoginForm = ({ handleClose, response, setResponse }) => {
  const { setAuth } = useAuth();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [errorMsg, setErrorMsg] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [activeInput, setActiveInput] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleKeyChange = input => {
    if (activeInput === "email") {
      setEmailInput(input);
      setUserData(prev => ({ ...prev, email: input }));
    } else if (activeInput === "password") {
      setPasswordInput(input);
      setUserData(prev => ({ ...prev, password: input }));
    }
  };

  const handleKeyPress = button => {
    if (button === "{enter}") {
      setShowKeyboard(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/auth",
        JSON.stringify({
          email: userData.email,
          password: userData.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setResponse(response.status === 200);

      const {
        accessToken,
        roles,
        firstName,
        lastName,
        id,
        likedEvents,
        purchasedTickets,
      } = response?.data;

      setAuth({
        id,
        email: userData.email,
        firstName,
        lastName,
        roles,
        accessToken,
        likedEvents,
        purchasedTickets,
      });

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      if (!err?.response) {
        console.error("No server response");
      } else if (err.response?.status === 400) {
        console.error("Missing username or password");
        setErrorMsg("Email i haslo są wymagane");
      } else if (err.response?.status === 401) {
        console.error("Unauthorized");
        setErrorMsg("Nie pasujące dane logowania");
      } else {
        console.error("Login failed");
      }
    }
  };

  return (
    <section className="apanel-form-cont login-form-cont">
      <h1 className="apanel-title login-title">Witamy z powrotem</h1>
      <form className="login-form apanel-form" onSubmit={handleSubmit}>
        <section className="apanel-inputs">
          <label className="login-label apanel-label">
            <p className="login-label-text">Email</p>
            <input
              className="apanel-input"
              type="text"
              name="email"
              onChange={e => {
                const { value } = e.target;
                setEmailInput(value);
                setUserData(prev => ({ ...prev, email: value }));
              }}
              value={emailInput}
              ref={emailRef}
              required
              autoComplete="off"
              onFocus={() => {
                setShowKeyboard(true);
                setActiveInput("email");
              }}
            />
          </label>

          <label className="login-label apanel-label">
            <p className="login-label-text">Hasło</p>
            <input
              className="apanel-input"
              type="password"
              name="password"
              onChange={e => {
                const { value } = e.target;
                setPasswordInput(value);
                setUserData(prev => ({ ...prev, password: value }));
              }}
              value={passwordInput}
              ref={passwordRef}
              required
              onFocus={() => {
                setShowKeyboard(true);
                setActiveInput("password");
              }}
            />
          </label>
          <p className="apanel-error">{errorMsg}</p>
        </section>
        <button className="login-btn apanel-btn" type="submit">
          Zaloguj
        </button>
      </form>
      {showKeyboard && (
        <Keyboard onChange={handleKeyChange} onKeyPress={handleKeyPress} />
      )}
    </section>
  );
};

export default LoginForm;
