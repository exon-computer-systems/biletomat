import React, { useEffect, useState, useRef } from "react";
import "./RedeemTicket.css";
import Navbar from "../components/Navbar";

const RedeemTicket = () => {
    const inputRef = useRef();

    const handleRedeem = () => {
        console.log("Redeem Ticket");
    };

    useEffect(() => {
        inputRef?.current.focus();
    }, []);

    return (
        <>
            <Navbar />
            <section className="redeem-cont">
                <section className="redeem">
                    <h1 className="redeem-title">Zeskanuj bilet</h1>
                    <section className="redeem-content">
                        <input
                            ref={inputRef}
                            type="text"
                            className="redeem-input"
                        />

                        <button onClick={handleRedeem}>Sprawdz bilet</button>
                    </section>
                </section>
            </section>
        </>
    );
};

export default RedeemTicket;
