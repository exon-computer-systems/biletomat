import React, { useRef, useState, useEffect, useContext } from "react";
import useAuth from "../../hooks/useAuth";
import "./LogIn.css";
import SignIn from "./SignIn";
import Backdrop from "../backdrop/Backdrop";
import axios from "axios";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";

// import axios from "../../api/axios";
// const LOGIN_URL = "/auth";

const LogIn = ({ handleClose }) => {
    const { setAuth, auth } = useAuth();
    const emailRef = useRef();

    const [logOrSign, setLogOrSign] = useState("1");
    const [logIn, setLogIn] = useState(false);
    const [isClicked, setIsClicked] = useState("0");
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // useEffect(() => {
    //     setErrMsg("");
    // }, [userData]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://biletomat-be.onrender.com/auth",
                // "http://localhost:3500/auth",
                JSON.stringify({
                    email: userData.email,
                    password: userData.password,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;

            setAuth({
                email: userData.email,
                password: userData.password,
                roles,
                accessToken,
            });
            setLogIn(true);
            setIsClicked(e.target.id);
        } catch (err) {
            if (!err?.response) {
                console.error("No server response");
            } else if (err.response?.status == 400) {
                console.error("Missing username or password");
            } else if (err.response?.status == 401) {
                console.error("Unauthorized");
            } else {
                console.error("Login failed");
            }
        }
    };

    const handleSwitch = (e) => {
        setLogOrSign(e.currentTarget.getAttribute("data-value"));
        console.log(logOrSign);
    };

    return (
        <>
            <Backdrop onClick={handleClose}>
                <section id="container">
                    <AnimatePresence>
                        <motion.div
                            onClick={(e) => e.stopPropagation()}
                            className="login-container"
                            initial={{ opacity: 0, x: 0, y: -500 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0, x: 500 }}
                            transition={{
                                type: "spring",
                                stiffness: 30,
                                duration: 0.1,
                            }}
                        >
                            <section className="login-wrapper">
                                <div
                                    data-value="1"
                                    onClick={handleSwitch}
                                    className={`login ${
                                        logOrSign === "1" ? "active" : ""
                                    }`}
                                >
                                    <h1>LOG IN</h1>
                                </div>
                                <span></span>
                                <div
                                    data-value="2"
                                    onClick={handleSwitch}
                                    className={`signup ${
                                        logOrSign === "2" ? "active" : ""
                                    }`}
                                >
                                    <h1>SIGN UP</h1>
                                </div>
                            </section>
                            {logOrSign === "2" ? (
                                <SignIn
                                    handleSubmit={handleSubmit}
                                    handleInputChange={handleInputChange}
                                    userData={userData}
                                    logIn={logIn}
                                    isClicked={isClicked}
                                />
                            ) : (
                                <form className="form" onSubmit={handleSubmit}>
                                    <div className="welcome-wrapper">
                                        <h1>Witamy z powrotem</h1>
                                        <label
                                            htmlFor="email"
                                            className="label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            onChange={handleInputChange}
                                            value={userData.email}
                                            ref={emailRef}
                                            required
                                        />
                                        <label
                                            htmlFor="password"
                                            className="label"
                                        >
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            onChange={handleInputChange}
                                            value={userData.password}
                                            required
                                        />
                                    </div>

                                    <div className="btns-wrapper">
                                        <motion.button
                                            id="1"
                                            type="submit"
                                            onClick={handleSubmit}
                                            initial={{ x: 0 }}
                                            animate={{
                                                x:
                                                    logIn && isClicked === "1"
                                                        ? "40%"
                                                        : 0,
                                                width:
                                                    logIn && isClicked === "1"
                                                        ? 350
                                                        : 250,
                                                opacity:
                                                    isClicked === "1" ||
                                                    isClicked === "0"
                                                        ? 1
                                                        : 0,
                                            }}
                                            transition={{
                                                type: "tween",
                                                stiffness: 30,
                                                duration: 0.6,
                                            }}
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
                                                            initial={{
                                                                pathLength: 0,
                                                            }}
                                                            animate={{
                                                                pathLength: 1,
                                                            }}
                                                            transition={{
                                                                duration: 0.4,
                                                            }}
                                                        />
                                                        <motion.path
                                                            fill="none"
                                                            stroke="#ffff"
                                                            strokeWidth="4"
                                                            d="M14 27 L22 34 L38 16"
                                                            initial={{
                                                                pathLength: 0,
                                                            }}
                                                            animate={{
                                                                pathLength: 1,
                                                            }}
                                                            transition={{
                                                                duration: 0.2,
                                                                delay: 0.5,
                                                            }}
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
                                                x:
                                                    logIn && isClicked === "2"
                                                        ? "-40%"
                                                        : 0,
                                                width:
                                                    logIn && isClicked === "2"
                                                        ? 350
                                                        : 250,
                                                opacity:
                                                    isClicked === "2" ||
                                                    isClicked === "0"
                                                        ? 1
                                                        : 0,
                                            }}
                                            transition={{
                                                type: "tween",
                                                stiffness: 30,
                                                duration: 0.6,
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
                                                        initial={{
                                                            pathLength: 0,
                                                        }}
                                                        animate={{
                                                            pathLength: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.4,
                                                        }}
                                                    />
                                                    <motion.path
                                                        fill="none"
                                                        stroke="#000000"
                                                        strokeWidth="4"
                                                        d="M14 27 L22 34 L38 16"
                                                        initial={{
                                                            pathLength: 0,
                                                        }}
                                                        animate={{
                                                            pathLength: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                            delay: 0.5,
                                                        }}
                                                    />
                                                </motion.svg>
                                            ) : (
                                                <>
                                                    <FontAwesomeIcon
                                                        icon={faGoogle}
                                                    />
                                                    Sign in with Google
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </section>
            </Backdrop>
        </>
    );
};

export default LogIn;
