import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { axiosPrivate } from "./api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Confirmation from "./Confirmation";
import useAuth from "./hooks/useAuth";
import "./BuyTicket.css";

const BuyTicket = ({
  setConfirmationData,
  confirmationData,
  order,
  setOrder,
  total,
}) => {
  const nav = useNavigate();
  const { id } = useParams();
  const { setAuth } = useAuth();

  const [response, setResponse] = useState(false);
  const { auth } = useAuth();
  const [data, setData] = useState({
    eventId: "",
    userId: "",
    tickets: {
      adultTicket: 0,
      kidTicket: 0,
      vipTicket: 0,
    },
  });

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      tickets: {
        adultTicket: order.adultTicket.quantity,
        kidTicket: order.kidTicket.quantity,
        vipTicket: order.vipTicket.quantity,
      },
    }));

    console.log(order);
  }, [order]);

  useEffect(() => {
    setConfirmationData(prevData => ({
      ...prevData,
      ticketType: data.tickets,
      price: total,
    }));
  }, [data, total]);

  const handleSubmitData = async e => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("/buy", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      setAuth(prev => ({
        ...prev,
        purchasedTickets: [...prev.purchasedTickets, response.data],
      }));
      if (response.status === 201) {
        setResponse(true);
        console.log(response.data);
      } else {
        console.error("Failed to submit data:", response.status);
      }
    } catch (err) {
      console.error("Cannot post data: ", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://biletomat-be.onrender.com/events/${id}`
        );
        const event_id = response.data._id;
        const { kidTicket, adultTicket, vipTicket } = response.data;
        setConfirmationData({
          firstName: auth.firstName,
          lastName: auth.lastName,
          email: auth.email,
          startDate: response.data.startDate,
          ticketType: data.tickets,
          price: total,
        });
        setOrder({
          adultTicket: { price: adultTicket, quantity: 0 },
          kidTicket: { price: kidTicket, quantity: 0 },
          vipTicket: { price: vipTicket, quantity: 0 },
        });
        setData({
          eventId: event_id,
          userId: auth.id,
          tickets: {
            adultTicket: 0,
            kidTicket: 0,
            vipTicket: 0,
          },
        });
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchData();
  }, [id, auth.id]);

  const handleIncrease = ticketType => {
    setOrder(prevOrder => ({
      ...prevOrder,
      [ticketType]: {
        ...prevOrder[ticketType],
        quantity: prevOrder[ticketType].quantity + 1,
      },
    }));
  };

  const handleDecrease = ticketType => {
    setOrder(prevOrder => ({
      ...prevOrder,
      [ticketType]: {
        ...prevOrder[ticketType],
        quantity: Math.max(prevOrder[ticketType].quantity - 1, 0),
      },
    }));
  };

  return (
    <>
      <div className="wrapper">
        <section className="container">
          <form onSubmit={handleSubmitData}>
            <section className="choice-boxes">
              <h2>Wybierz bilety</h2>
              {Object.entries(order).map(([ticketType, data]) => (
                <div key={ticketType} className="choice-box">
                  <div className="ticket-name">
                    <h2>{ticketType}</h2>
                  </div>

                  <span>170 PLN</span>

                  <div className="input">
                    <div
                      className="cta-btns"
                      onClick={() => handleDecrease(ticketType)}
                    >
                      <FontAwesomeIcon icon={faMinus} className="minus-btn" />
                    </div>
                    <span
                      name={ticketType}
                      type="number"
                      value={data.quantity}
                      min={0}
                      disabled
                    >
                      {data.quantity}
                    </span>
                    <div
                      className="cta-btns"
                      onClick={() => handleIncrease(ticketType)}
                    >
                      <FontAwesomeIcon icon={faPlus} className="plus-btn" />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* <div className="summary">
              <h2>
                Całość - <span>{total} PLN</span>
              </h2>
              <button type="submit">REZERWUJ</button>
            </div> */}
          </form>
        </section>
      </div>
    </>
  );
};

export default BuyTicket;
