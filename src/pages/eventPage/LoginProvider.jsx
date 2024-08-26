import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const LoginProvider = ({
    setOrderSteps,
    selectedSeats,
    order,
    setSelectedSeats,
    event,
}) => {
    const { auth } = useAuth();

    const [userEmail, setUserEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (event.seated) {
                console.log("test");
                // For seated events, reserve specific seats
                const requests = selectedSeats.map((selectedSeat) => {
                    return axios.post("/events/reserve", {
                        eventId: event._id,
                        sectorName: selectedSeat.rowInfo.sectorName,
                        rowNumber: selectedSeat.rowInfo.rowNumber,
                        seatNumber: selectedSeat.seatNumber,
                        // userId: auth.id,
                        ...(auth.id
                            ? { userId: auth.id }
                            : { guestEmail: userEmail }),
                    });
                });

                const responses = await Promise.all(requests);

                responses.forEach((response) => {
                    console.log("Response:", response.data.qrCodeUrl);
                });
            } else {
                // For non-seated events, reserve tickets based on order types
                const ticketRequests = [];

                // Create reservation requests for each ticket type
                if (order.normal > 0) {
                    for (let i = 0; i < order.normal; i++) {
                        ticketRequests.push(
                            axios.post("/events/reserve", {
                                eventId: event._id,
                                sectorName: "",
                                rowNumber: 0,
                                seatNumber: 0,
                                // userId: auth.id,
                                ...(auth.id
                                    ? { userId: auth.id }
                                    : { guestEmail: userEmail }),
                            })
                        );
                    }
                }

                if (order.discounted > 0) {
                    for (let i = 0; i < order.discounted; i++) {
                        ticketRequests.push(
                            axios.post("/events/reserve", {
                                eventId: event._id,
                                sectorName: "",
                                rowNumber: 0,
                                seatNumber: 0,
                                // userId: auth.id,
                                ...(auth.id
                                    ? { userId: auth.id }
                                    : { guestEmail: userEmail }),
                            })
                        );
                    }
                }

                if (order.senior > 0) {
                    for (let i = 0; i < order.senior; i++) {
                        ticketRequests.push(
                            axios.post("/events/reserve", {
                                eventId: event._id,
                                sectorName: "",
                                rowNumber: 0,
                                seatNumber: 0,
                                // userId: auth.id,
                                ...(auth.id
                                    ? { userId: auth.id }
                                    : { guestEmail: userEmail }),
                            })
                        );
                    }
                }

                console.log(ticketRequests);

                const responses = await Promise.all(ticketRequests);
                setPurchased(responses);
                responses.forEach((response) => {
                    console.log("Response:", response.data.qrCodeUrl);
                });
            }
        } catch (err) {
            console.warn(err);
        } finally {
            setSelectedSeats([]);
            setOrderSteps(6);
        }
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
                        onClick={() => console.log("open auth panel")}
                    >
                        Mam już konto lub chce założyć nowe
                    </button>
                </section>
                <section className="summary">
                    <span className="summary-btn-cont">
                        <button type="button" onClick={() => setOrderSteps(4)}>
                            WRÓĆ
                        </button>
                        <button type="submit" onClick={handleSubmit}>
                            DALEJ
                        </button>
                    </span>
                </section>
            </form>
        </>
    );
};

export default LoginProvider;
