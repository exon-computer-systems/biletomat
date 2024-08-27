import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import AuthPanel from "../components/authPanel/AuthPanel";

const LoginProvider = ({
    setOrderSteps,
    selectedSeats,
    order,
    setSelectedSeats,
    event,
    userEmail,
    setUserEmail,
}) => {
    const { auth } = useAuth();

    const [showAuthPanel, setShowAuthPanel] = useState(false);

    const handleClose = () => {
        setShowAuthPanel(false);
    };

    useEffect(() => {
        if (auth.email) setOrderSteps(5);
    }, [auth.email]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setOrderSteps(5);
    };

    return (
        <>
            <h2 className="choose-tickets-h2">Infomarcje do zakupu</h2>
            <form className="lp-cont" onSubmit={handleSubmit}>
                <section className="lp">
                    <p className="lp-text">Podaj email</p>
                    <p className="lp-text2">na który zostaną wysłane bilety</p>
                    <input
                        type="email"
                        className="lp-input"
                        name="userEmail"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        className="lp-authpanel"
                        onClick={() => setShowAuthPanel(!showAuthPanel)}
                    >
                        Mam już konto lub chce założyć nowe
                    </button>
                </section>
                <section className="summary">
                    <span className="summary-btn-cont">
                        <button type="button" onClick={() => setOrderSteps(3)}>
                            WRÓĆ
                        </button>
                        <button type="submit" onClick={handleSubmit}>
                            DALEJ
                        </button>
                    </span>
                </section>
            </form>

            {showAuthPanel && <AuthPanel handleClose={handleClose} />}
        </>
    );
};

export default LoginProvider;
