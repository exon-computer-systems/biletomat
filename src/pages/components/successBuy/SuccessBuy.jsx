import React from "react";
import "./SuccessBuy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const SuccessBuy = ({ purchased }) => {
    const nav = useNavigate();

    const fetchData = async () => {
        try {
            const requests = purchased.map((ticket) => {
                console.log(ticket);
                return axios.post("/events/print", {
                    qrSrc: ticket.data,
                });
            });

            const responses = await Promise.all(requests);
            responses.forEach((response) => {
                console.log("Response:", response.data);
            });
        } catch (error) {
            console.error("Error sending print request:", error);
        }
        console.log("printing");
    };

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
                        onClick={() => fetchData()}
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
