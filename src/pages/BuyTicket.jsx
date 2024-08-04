import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router";
import axios, { axiosPrivate } from "./api/axios";
import { useParams } from "react-router-dom";

import {
  faAngleLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "./BuyTicket.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "./hooks/useAuth";

const BuyTicket = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    kidTicket: { price: 0, quantity: 0 },
    adultTicket: { price: 0, quantity: 0 },
    vipTicket: { price: 0, quantity: 0 },
  });
  const { auth, setAuth } = useAuth();
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://biletomat-be.onrender.com/events/${id}`
        );
        const event_id = response.data._id;

        const { kidTicket, adultTicket, vipTicket } = response.data;
        setOrder({
          kidTicket: { price: kidTicket, quantity: 0 },
          adultTicket: { price: adultTicket, quantity: 0 },
          vipTicket: { price: vipTicket, quantity: 0 },
        });
        setData({
          eventId: event_id,
          userId: auth.id,
          tickets: {
            adultTicket: order.adultTicket.quantity,
            kidTicket: order.kidTicket.quantity,
            vipTicket: order.vipTicket.quantity,
          },
        });
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      tickets: {
        adultTicket: order.adultTicket.quantity,
        kidTicket: order.kidTicket.quantity,
        vipTicket: order.vipTicket.quantity,
      },
    }));
  }, [order]);

  const handleSubmitData = async e => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("/buy", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth(prevAuth => ({
        ...prevAuth,
        ...data,
        roles,
        accessToken,
      }));
    } catch (err) {
      console.error("Cannot post data: ", err);
    }
  };
  console.log(data);

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

  const calculateTotal = () => {
    return Object.values(order).reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <>
      <div className="wrapper">
        <section className="container">
          <div className="buy-txt">
            <div className="back-btn">
              <FontAwesomeIcon icon={faAngleLeft} />
            </div>
            <h1>Kup bilet</h1>
          </div>
          <div className="ticket-descp">
            <h1>{}</h1>
            <p>20.07.2024 16:00 / TORUŃ / HALA SPORTOWA</p>
          </div>

          <section className="choice-boxes">
            {Object.entries(order).map(([ticketType, data]) => (
              <div key={ticketType} className="choice-box">
                <h2>{ticketType.replace("_", " ").toUpperCase()}</h2>
                <div className="input">
                  <div
                    className="cta-btns"
                    onClick={() => handleDecrease(ticketType)}
                  >
                    <FontAwesomeIcon icon={faMinus} className="minus-btn" />
                  </div>
                  <input
                    name={ticketType}
                    type="number"
                    value={data.quantity}
                    min={0}
                    disabled
                  />
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

          <div className="summary">
            <h2>
              Całość - <span>{total} PLN</span>
            </h2>
            <button onClick={handleSubmitData}>REZERWUJ</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyTicket;
