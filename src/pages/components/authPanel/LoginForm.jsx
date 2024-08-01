import React, { useRef, useState, useEffect } from "react";
import axios from "../../api/axios";
// import axios from "axios";
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
    const { setAuth, auth } = useAuth();

    const emailRef = useRef();

    const [userData, setUserData] = useState({
        name: "",
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
                // "https://biletomat-be.onrender.com/auth",
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
                        />
                    </label>
                    <label className="login-label apanel-label">
                        <p className="login-label-text">Password</p>
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
                <button className="login-btn apanel-btn" onClick={handleSubmit}>
                    Login
                </button>
            </form>
        </section>
    );
};

export default LoginForm;
