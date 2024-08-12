import React, { useEffect, useState, useRef } from "react";
import "./RedeemTicket.css";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import {
    faCheckCircle,
    faCircleXmark,
    // faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RedeemTicket = () => {
    const inputRef = useRef(null);

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleRedeem = async (e) => {
        e.preventDefault();

        try {
            setShowConfirmation(false);

            let qrCodeData;

            try {
                qrCodeData = JSON.parse(code);
            } catch (parseError) {
                setTitle("Bilet jest nie aktualny");
                setIcon(faCircleXmark);
            }

            const response = await axios.post("/events/redeem", { qrCodeData });

            if (response.status === 200) {
                setTitle("Weryfikacja biletu przebiegła pomyślnie");
                setIcon(faCheckCircle);
            }
        } catch (err) {
            console.warn(err);
        } finally {
            setShowConfirmation(true);
            setTimeout(() => {
                setCode("");
                setShowConfirmation(false);
            }, 5000);
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
            {!showConfirmation && <Navbar />}

            {showConfirmation ? (
                <section className="redeem-succ-cont">
                    <section className="redeem-succ">
                        <h1 className="redeem-succ-title">{title}</h1>
                        <FontAwesomeIcon
                            className="redeem-succ-icon"
                            icon={icon}
                        />
                    </section>
                </section>
            ) : (
                <section className="redeem-cont">
                    <section className="redeem">
                        <h1 className="redeem-title">Zeskanuj bilet</h1>
                        <form
                            className="redeem-content"
                            onSubmit={handleRedeem}
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                className="redeem-input"
                                value={code}
                                onChange={handleChange}
                            />

                            <button
                                disabled={!code}
                                className="redeem-btn"
                                onClick={handleRedeem}
                            >
                                Sprawdz bilet
                            </button>
                        </form>
                    </section>
                </section>
            )}
        </>
    );
};

export default RedeemTicket;
