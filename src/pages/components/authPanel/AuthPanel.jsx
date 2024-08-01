import React, { useRef, useState, useEffect } from "react";
import "./AuthPanel.css";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthPanel = ({ handleClose }) => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <section className="overlay" onClick={handleClose}>
            <section
                className="apanel-cont"
                onClick={(e) => e.stopPropagation()}
            >
                <section className="apanel-switch-cont">
                    <button
                        className="apanel-switch-btn active"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                    <span className="vert-line"></span>
                    <button
                        className="apanel-switch-btn"
                        onClick={() => setShowLogin(false)}
                    >
                        Sign up
                    </button>
                </section>
                {showLogin ? <LoginForm /> : <RegisterForm />}
            </section>
        </section>
    );
};

export default AuthPanel;
