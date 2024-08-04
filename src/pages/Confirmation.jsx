import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Confirmation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Confirmation = ({ confirmationData }) => {
    const nav = useNavigate();
    //   const calculateItems = () => {
    //     for (const [key, value] of Object.entries(confirmationData.tickets)) {
    //       if (key < 0) return;
    //       type = `${key} * ${value}`;
    //     }
    //   };
    //   calculateItems();

    useEffect(() => {
        console.log(confirmationData);
    }, [confirmationData]);

    return (
        <section className="confirmation-container">
            <section className="confirmation-wrapper">
                <div className="success-icon">
                    <div className="check-icn">
                        <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <h1>Udało się!</h1>
                    <h2>Pomyślnie zakupiono bilet</h2>
                </div>
                <section className="ticket-info-wrapper">
                    <div className="section-info">
                        <div className="name info1">
                            <p>Imię</p>
                            <p>
                                {confirmationData.firstName}{" "}
                                {confirmationData.lastName}
                            </p>
                        </div>
                        <div className="email info1">
                            <p>Email</p>
                            <p>{confirmationData.email}</p>
                        </div>
                        <div className="ticket-type info1">
                            <p>Rodzaj biletu</p>
                            {confirmationData.ticketType.adultTicket > 0 && (
                                <p>{`Dorośli: ${confirmationData.ticketType.adultTicket}`}</p>
                            )}
                            {confirmationData.ticketType.kidTicket > 0 && (
                                <p>{`Dziecięce: ${confirmationData.ticketType.kidTicket}`}</p>
                            )}
                            {confirmationData.ticketType.vipTicket > 0 && (
                                <p>{`VIP: ${confirmationData.ticketType.vipTicket}`}</p>
                            )}
                        </div>
                    </div>
                    <div className="section-info">
                        <div className="date info1">
                            <p>Data</p>
                            <p>{confirmationData.startDate}</p>
                        </div>
                        <div className="seats info1">
                            <p>Miejsca</p>
                            <p>04</p>
                        </div>
                        <div className="price info1">
                            <p>Cena</p>
                            <p>{confirmationData.price} PLN</p>
                        </div>
                    </div>
                </section>
                <section className="conf-cta">
                    <button>Pobierz Bilet</button>
                    <button onClick={() => nav("/user")}>
                        Zobacz w profilu
                    </button>
                </section>
            </section>
        </section>
    );
};

export default Confirmation;
