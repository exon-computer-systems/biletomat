import { faCheck, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Confirmation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";

const Confirmation = ({
    selectedSeats,
    event,
    order,
    setSelectedSeats,
    setOrderSteps,
    setPurchased,
}) => {
    const nav = useNavigate();
    const { auth } = useAuth();

    return (
        <section className="confirmation-container">
            <div>
                <h2 className="conf-h1">Podsumowanie</h2>
                <span></span>
            </div>
            <section className="confirmation-wrapper">
                <section className="ticket-info-wrapper">
                    <div className="section-info">
                        <div className="ticket-type info1">
                            <h2>Rodzaj biletu</h2>
                            {order.normal > 0 && (
                                <p>{`Normalny: ${order.normal}`}</p>
                            )}
                            {order.discounted > 0 && (
                                <p>{`Ulgowy: ${order.discounted}`}</p>
                            )}
                            {order.senior > 0 && (
                                <p>{`Senior: ${order.senior}`}</p>
                            )}
                        </div>
                        <div className="info1">
                            <h2>Sektor</h2>
                            <p>
                                {selectedSeats?.[0]?.rowInfo?.sectorName ||
                                    "N/A"}
                            </p>
                        </div>
                    </div>
                    {event.seated && (
                        <div className="section-info">
                            <div className="seats info1">
                                <h2>Miejsca</h2>
                                {selectedSeats.map((el) => (
                                    <p key={el._id}>
                                        R{el?.rowInfo?.rowNumber}{" "}
                                        {el?.seatNumber}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            </section>
            <section className="conf-cta">
                <h3>Łącznie: {order.total} PLN</h3>
                <section className="conf-cta-btn">
                    <button onClick={() => setOrderSteps(3)}>Anuluj</button>
                    <button onClick={() => setOrderSteps(5)}>Kup Bilet</button>
                </section>
            </section>
        </section>
    );
};

export default Confirmation;
