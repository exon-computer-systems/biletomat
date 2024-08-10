import React from "react";
import "./SuccessBuy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const SuccessBuy = () => {
    const nav = useNavigate();

    return (
        <section className="succbuy-cont">
            <section className="succbuy">
                <h1 className="succbuy-title">Pomyślnie zakupiono bilet</h1>
                <FontAwesomeIcon
                    className="succbuy-icon"
                    icon={faCheckCircle}
                />
            </section>
            <section className="succbuy-btn-cont">
                <p className="succbuy-text">
                    Bilet dostepny w panelu użytkownika
                </p>

                <section className="succbuy-btn-wrap">
                    <button
                        onClick={() => console.log("print qr code")}
                        className="succbuy-btn nonprimary"
                    >
                        Drukuj
                    </button>
                    <button
                        onClick={() => nav("/")}
                        className="succbuy-btn primary"
                    >
                        Pomiń
                    </button>
                </section>
            </section>
        </section>
    );
};

export default SuccessBuy;
