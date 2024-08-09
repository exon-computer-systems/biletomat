import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Confirmation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useAuth from "./hooks/useAuth";
import axios from "./api/axios";

const Confirmation = ({ selectedSeats, event, order, setSelectedSeats }) => {
    const nav = useNavigate();
    const { auth } = useAuth();

    // console.log(
    //     "selected: ",
    //     selectedSeats.map((el) => el.seatNumber)
    // );

    // console.log("confirmationData", confirmationData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedSeats);

        try {
            if (auth.email) {
                // WYSWIETLIC AUTH PANEL JESLI UZYTKOWNIK NIE JEST ZALOGOWANY
                const requests = selectedSeats.map((selectedSeat) => {
                    console.log({
                        eventId: event._id,
                        sectorName: selectedSeat.rowInfo.sectorName,
                        rowNumber: selectedSeat.rowInfo.rowNumber,
                        seatNumber: selectedSeat.seatNumber,
                        userId: auth.id,
                    });

                    return axios.post("/events/reserve", {
                        eventId: event._id,
                        sectorName: selectedSeat.rowInfo.sectorName,
                        rowNumber: selectedSeat.rowInfo.rowNumber,
                        seatNumber: selectedSeat.seatNumber,
                        userId: auth.id,
                    });
                });
                const responses = await Promise.all(requests);
                responses.forEach((response) => {
                    console.log("Response:", response.data.qrCodeUrl);
                });
            }
        } catch (err) {
            console.warn(err);
        } finally {
            // setSelectedSeats([]);
        }
    };

    return (
        <section className="confirmation-container">
            <section className="confirmation-wrapper">
                <div className="confirmation-header">
                    <div className="confirmation-cover">
                        <img src={event.coverImage} alt="" />
                    </div>
                    <div className="confirmation-info">
                        <h1>{event.title}</h1>
                        <div className="date-place">
                            <div className="place">
                                <FontAwesomeIcon
                                    icon={faCalendar}
                                    className="conf-icon"
                                />
                                <div className="place-info">
                                    <p className="start-date">
                                        {event.startDate}
                                    </p>
                                    <p className="hours">19:00 - 21:00</p>
                                </div>
                            </div>
                            <div className="date">
                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    className="conf-icon"
                                />
                                <p className="city">{event.city}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="ticket-info-wrapper">
                    <div className="section-info">
                        <div className="name info1">
                            <p>Imię</p>
                            <p>
                                {auth.firstName} {auth.lastName}
                            </p>
                        </div>
                        <div className="email info1">
                            <p>Email</p>
                            <p>{auth.email}</p>
                        </div>
                        <div className="ticket-type info1">
                            <p>Rodzaj biletu</p>
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
                    </div>
                    <div className="section-info">
                        <div className="date info1">
                            <p>Sektor</p>
                            <p>{selectedSeats.at(0).rowInfo.sectorName}</p>
                        </div>
                        <div className="seats info1">
                            <p>Miejsca</p>
                            {selectedSeats.map((el) => {
                                return (
                                    <p key={el._id}>
                                        R{el.rowInfo.rowNumber} {el.seatNumber}
                                    </p>
                                );
                            })}
                        </div>

                        <div className="price info1"></div>
                    </div>
                </section>
                <section className="conf-cta">
                    <h2>Łącznie: {order.total}</h2>
                    <section className="conf-cta-btn">
                        <button onClick={handleSubmit}>Kup Bilet</button>
                    </section>
                </section>
            </section>
        </section>
    );
};

export default Confirmation;
