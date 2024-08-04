import React, { useEffect, useState, useRef } from "react";
import "./RedeemTicket.css";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import Confirmation from "../Confirmation";

const RedeemTicket = () => {
    const inputRef = useRef(null);

    const [code, setCode] = useState("");
    const [data, setData] = useState({});
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleRedeem = async (e) => {
        e.preventDefault();
        console.log("Redeem Ticket");

        try {
            const response = await axios.post("/redeem", { redeemCode: code });
            // console.log(response.data);
            setData(response.data.data);

            if (response) {
                const eventResponse = await axios.get(
                    `/events/one/${response.data.data.eventId}`
                );

                // console.log("Event:", eventResponse.data);

                const { title, city, startDate, artists } = eventResponse.data;

                setData((prev) => ({
                    ...prev,
                    title,
                    city,
                    startDate,
                    artists,
                }));

                const userResponse = await axios.get(
                    `/users/${response.data.data.userId}`
                );

                // console.log("User:", userResponse.data);

                const { email, firstName, lastName, age } = userResponse.data;

                setData((prev) => ({
                    ...prev,
                    email,
                    firstName,
                    lastName,
                    age,
                }));

                setData((prev) => {
                    const totalPrice =
                        prev.childTicket.quantity * prev.childTicket.price +
                        prev.adultTicket.quantity * prev.adultTicket.price +
                        prev.vipTicket.quantity * prev.vipTicket.price;

                    const ticketType = {
                        adultTicket: prev.adultTicket.quantity,

                        kidTicket: prev.childTicket.quantity,

                        vipTicket: prev.vipTicket.quantity,
                    };

                    return {
                        ...prev,
                        price: totalPrice,
                        ticketType,
                    };
                });

                setShowConfirmation(true);
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);

    return (
        <>
            <Navbar />

            {showConfirmation ? (
                <Confirmation confirmationData={data} />
            ) : (
                <section className="redeem-cont">
                    <section className="redeem">
                        <h1 className="redeem-title">Zeskanuj bilet</h1>
                        <section className="redeem-content">
                            <input
                                ref={inputRef}
                                type="text"
                                className="redeem-input"
                                value={code}
                                onChange={handleChange}
                            />

                            <button
                                className="redeem-btn"
                                onClick={handleRedeem}
                            >
                                Sprawdz bilet
                            </button>
                        </section>
                    </section>
                </section>
            )}
        </>
    );
};

export default RedeemTicket;
