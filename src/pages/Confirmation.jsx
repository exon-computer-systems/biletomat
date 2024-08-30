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
  setUserEmail,
  userEmail,
}) => {
  const nav = useNavigate();
  const { auth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      if (event.seated) {
        // For seated events, reserve specific seats
        const requests = selectedSeats.map(selectedSeat => {
          return axios.post("/events/reserve", {
            eventId: event._id,
            sectorName: selectedSeat.rowInfo.sectorName,
            rowNumber: selectedSeat.rowInfo.rowNumber,
            seatNumber: selectedSeat.seatNumber,
            // userId: auth.id,
            ...(auth.id ? { userId: auth.id } : { guestEmail: userEmail }),
          });
        });

        const responses = await Promise.all(requests);

        responses.forEach(response => {
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
                ...(auth.id ? { userId: auth.id } : { guestEmail: userEmail }),
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
                ...(auth.id ? { userId: auth.id } : { guestEmail: userEmail }),
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
                ...(auth.id ? { userId: auth.id } : { guestEmail: userEmail }),
              })
            );
          }
        }

        console.log(ticketRequests);

        const responses = await Promise.all(ticketRequests);
        // setPurchased(responses);
        responses.forEach(response => {
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

  const handleBack = () => {
    auth.email ? setOrderSteps(3) : setOrderSteps(4);
  };

  console.log(selectedSeats);

  return (
    <>
      <h2 className="choose-tickets-h2">Podsumowanie</h2>
      <section className="confirmation-container">
        <section className="ticket-info-wrapper">
          <div className="ticket-type info1">
            <h2>Wybrane bilety</h2>
            <span className="info2">
              <p>{`Normalny: ${order.normal}`}</p>

              <p>{`Ulgowy: ${order.discounted}`}</p>

              <p>{`Senior: ${order.senior}`}</p>
            </span>
          </div>

          <section className="ticket-info-scroll">
            {/* <section className="info1"></section>
             */}

            {selectedSeats.map((el, idx) => (
              <section className="info3" key={idx}>
                <div className="info3-title">
                  <p>{`Bilet ${idx + 1}`}</p>
                </div>
                <div className="info3-wrapper">
                  <p className="info3-sector">{`Sektor ${el.rowInfo.sectorName}`}</p>
                  <p className="info3-row">{`Rząd ${el.rowInfo.rowNumber}`}</p>
                  <p className="info3-seat">{`Miejsce ${el.seatNumber}`}</p>
                </div>
              </section>
            ))}
          </section>
          {/* <div className="info1">
                            <h2>Sektor</h2>
                            <p>
                                {selectedSeats?.[0]?.rowInfo?.sectorName ||
                                    "N/A"}
                            </p>
                        </div> */}

          {/* {event.seated && (
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
                        )} */}
        </section>

        <section className="conf-cta">
          <h3>Łącznie: {order.total} PLN</h3>
          <section className="conf-cta-btn">
            <button onClick={handleBack}>COFNIJ</button>
            <button onClick={handleSubmit}>KUP BILET</button>
          </section>
        </section>
      </section>
    </>
  );
};

export default Confirmation;
