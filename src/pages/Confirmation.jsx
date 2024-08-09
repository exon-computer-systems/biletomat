import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Confirmation.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faCalendar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import useAuth from "./hooks/useAuth";

const Confirmation = ({ confirmationData, selectedSeats, events, total }) => {
  const nav = useNavigate();
  const { auth } = useAuth();
  useEffect(() => {
    console.log(confirmationData);
  }, [confirmationData]);

  console.log(
    "selected: ",
    selectedSeats.map(el => el.seatNumber)
  );

  console.log("confirmationData", confirmationData);

  return (
    <section className="confirmation-container">
      <section className="confirmation-wrapper">
        <div className="confirmation-header">
          <div className="confirmation-cover">
            <img src={events.coverImage} alt="" />
          </div>
          <div className="confirmation-info">
            <h1>{events.title}</h1>
            <div className="date-place">
              <div className="place">
                <FontAwesomeIcon icon={faCalendar} className="conf-icon" />
                <div className="place-info">
                  <p className="start-date">{events.startDate}</p>
                  <p className="hours">19:00 - 21:00</p>
                </div>
              </div>
              <div className="date">
                <FontAwesomeIcon icon={faLocationDot} className="conf-icon" />
                <p className="city">{events.city}</p>
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
              {confirmationData.ticketType.adultTicket > 0 && (
                <p>{`Normalny: ${confirmationData.ticketType.adultTicket}`}</p>
              )}
              {confirmationData.ticketType.kidTicket > 0 && (
                <p>{`Ulgowy: ${confirmationData.ticketType.kidTicket}`}</p>
              )}
              {confirmationData.ticketType.vipTicket > 0 && (
                <p>{`Senior: ${confirmationData.ticketType.vipTicket}`}</p>
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
              {selectedSeats.map(el => {
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
          <h2>Łącznie: {total}</h2>
          <section className="conf-cta-btn">
            <button>Kup Bilet</button>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Confirmation;
