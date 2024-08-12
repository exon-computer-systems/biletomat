import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import CheckmarkAnimation from "./CheckmarkAnimation";
import KioskBoard from "kioskboard";

const LoginForm = ({ handleClose, response, setResponse }) => {
    const { setAuth } = useAuth();

    const emailRef = useRef();

    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
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
            console.log(JSON.stringify(response?.data));

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
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            value={userData.email}
                            ref={emailRef}
                            required
                            autoComplete="off"
                        />
                    </label>

                    <label className="login-label apanel-label">
                        <p className="login-label-text">Hasło</p>
                        <input
                            className="apanel-input"
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            value={userData.password}
                            required
                        />
                    </label>
                    <p className="apanel-error">{errorMsg}</p>
                </section>
                <button className="login-btn apanel-btn" type="submit">
                    Zaloguj
                </button>
            </form>
        </section>
    );
};

export default LoginForm;
