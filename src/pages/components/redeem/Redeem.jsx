import React, { useRef, useEffect, useState } from "react";
import "./Redeem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQrcode,
    faBarcode,
    faAngleDown,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import {
    faCheckCircle,
    faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import axios from "../../api/axios";

const Redeem = () => {
    const inputRef = useRef();

    const [code, setCode] = useState("");
    const [status, setStatus] = useState(false);

    const [showConfirmation, setShowConfirmation] = useState(false);

    // useEffect(() => {
    //     focusInput();

    //     // document.addEventListener("click", focusInput);

    //     // return () => {
    //     //     document.removeEventListener("click", focusInput());
    //     // };
    // }, []);

    const focusInput = () => {
        inputRef?.current?.focus();
    };

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(code);

        try {
            setShowConfirmation(false);

            let qrCodeData;

            try {
                qrCodeData = JSON.parse(code);
            } catch (parseError) {
                setStatus(false);
            }

            const response = await axios.post("/events/redeem", { qrCodeData });

            console.log(response);

            if (response.status === 200) {
                setStatus(true);
            } else if (response.status === 202) {
                setStatus(false);
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

    return (
        // <section className="red-cont">y

        <>
            {showConfirmation ? (
                <section className="redeem-succ-cont">
                    <section className="redeem-succ">
                        <h1 className="redeem-succ-title">
                            {status
                                ? "Witamy na koncercie"
                                : "Bilet jest nie aktualny"}
                        </h1>
                        <FontAwesomeIcon
                            className={`redeem-succ-icon ${
                                status ? "positive" : "negative"
                            }`}
                            icon={status ? faCheckCircle : faCircleXmark}
                        />
                    </section>
                </section>
            ) : (
                <form
                    className="red"
                    onSubmit={handleSubmit}
                    onClick={focusInput}
                >
                    <h3 className="red-title">Zeskanuj bilet poniżej</h3>

                    <FontAwesomeIcon className="red-icon" icon={faBarcode} />

                    <input
                        // onSubmit={handleSubmit}
                        className="red-input"
                        type="password"
                        ref={inputRef}
                        value={code}
                        onChange={handleChange}
                    />
                </form>
            )}
        </>
    );
};

export default Redeem;
