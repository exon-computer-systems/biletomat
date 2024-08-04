import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const BuyTicket = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({
    adultTicket: { price: 0, quantity: 0 },
    kidTicket: { price: 0, quantity: 0 },
    vipTicket: { price: 0, quantity: 0 },
  });
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

  const [confirmationData, setConfirmationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    startDate: "",
    ticketType: [],
    price: 0,
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

  const calculateTotal = () => {
    return Object.values(order).reduce((sum, { price, quantity }) => {
      return sum + price * quantity;
    }, 0);
  };

  const total = calculateTotal();
  console.log(confirmationData);

  return (
    <>
      {response ? (
        <Confirmation confirmationData={confirmationData} />
      ) : (
        <div className="wrapper">
          <section className="container">
            <div className="buy-txt">
              <div className="back-btn">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
              <h1>Kup bilet</h1>
            </div>
            <div className="ticket-descp">
              {/* <h1>{}</h1> */}
              <p>20.07.2024 16:00 / TORUŃ / HALA SPORTOWA</p>
            </div>

            <form onSubmit={handleSubmitData}>
              <section className="choice-boxes">
                {Object.entries(order).map(([ticketType, data]) => (
                  <div key={ticketType} className="choice-box">
                    <h2>{ticketType}</h2>
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
                <button type="submit">REZERWUJ</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
};

export default BuyTicket;
