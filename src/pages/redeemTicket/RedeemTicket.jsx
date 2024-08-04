import React, { useEffect, useState, useRef } from "react";
import "./RedeemTicket.css";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

const RedeemTicket = () => {
    const inputRef = useRef();

    const [code, setCode] = useState("");

    const handleRedeem = async (e) => {
        e.preventDefault();
        console.log("Redeem Ticket");

        try {
            const response = await axios.post("/redeem", { redeemCode: code });
            console.log(response.data.data);
        } catch (err) {
            console.warn(err);
        }
    };

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    useEffect(() => {
        inputRef.current?.focus();
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
                            value={code}
                            onChange={handleChange}
                        />

                        <button className="redeem-btn" onClick={handleRedeem}>
                            Sprawdz bilet
                        </button>
                    </section>
                </section>
            </section>
        </>
    );
};

export default RedeemTicket;
