import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LogIn.css";
import Backdrop from "../backdrop/Backdrop";

const LogIn = ({ handleClose }) => {
  const [logIn, setLogIn] = useState(false);
  const [isClicked, setIsClicked] = useState("0");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    setLogIn(true);
    setIsClicked(e.target.id); // Set the ID of the clicked button
    console.log(userData);
  };

  return (
    <>
      <Backdrop onClick={handleClose}>
        <section id="container">
          <AnimatePresence>
            <motion.div
              onClick={e => e.stopPropagation()}
              className="login-container"
              initial={{ opacity: 0, x: 0, y: -500 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: 500 }}
              transition={{ type: "spring", stiffness: 30, duration: 0.1 }}
            >
              <section className="login-wrapper">
                <div className="login active">
                  <h1>LOG IN</h1>
                </div>
                <span></span>
                <div className="signup">
                  <h1>SIGN UP</h1>
                </div>
              </section>

              <form className="form" onSubmit={handleSubmit}>
                <div className="welcome-wrapper">
                  <h1>Witamy z powrotem</h1>
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    value={userData.email}
                  />
                  <label htmlFor="password" className="label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    value={userData.password}
                  />
                </div>

                <div className="btns-wrapper">
                  <motion.button
                    id="1"
                    type="submit"
                    onClick={handleSubmit}
                    initial={{ x: 0, width: 0 }}
                    animate={{
                      x: logIn && isClicked === "1" ? "40%" : 0,
                      width: logIn && isClicked === "1" ? 350 : 250,
                      opacity: isClicked === "1" || isClicked === "0" ? 1 : 0,
                    }}
                    transition={{ type: "tween", stiffness: 30, duration: 0.5 }}
                  >
                    {logIn && isClicked === "1" ? (
                      <>
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 52 52"
                          width="32"
                          height="32"
                        >
                          <motion.circle
                            cx="26"
                            cy="26"
                            r="23"
                            fill="none"
                            stroke="#ffffff"
                            strokeWidth="3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                          <motion.path
                            fill="none"
                            stroke="#ffff"
                            strokeWidth="4"
                            d="M14 27 L22 34 L38 16"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.2, delay: 0.5 }}
                          />
                        </motion.svg>
                      </>
                    ) : (
                      " Zaloguj się"
                    )}
                  </motion.button>
                  <p>LUB</p>
                  <motion.button
                    id="2"
                    className="sign-google"
                    onClick={handleSubmit}
                    initial={{ x: 0 }}
                    animate={{
                      x: logIn && isClicked === "2" ? "-40%" : 0,
                      width: logIn && isClicked === "2" ? 350 : 250,
                      opacity: isClicked === "2" || isClicked === "0" ? 1 : 0,
                    }}
                    transition={{
                      type: "tween",
                      stiffness: 30,
                      duration: 0.5,
                    }}
                  >
                    {logIn && isClicked === "2" ? (
                      <motion.svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 52 52"
                        width="32"
                        height="32"
                      >
                        <motion.circle
                          cx="26"
                          cy="26"
                          r="23"
                          fill="none"
                          stroke="#000000"
                          strokeWidth="3"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                        <motion.path
                          fill="none"
                          stroke="#000000"
                          strokeWidth="4"
                          d="M14 27 L22 34 L38 16"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.2, delay: 0.5 }}
                        />
                      </motion.svg>
                    ) : (
                      "Sign in with Google"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </section>
      </Backdrop>
    </>
  );
};

export default LogIn;
