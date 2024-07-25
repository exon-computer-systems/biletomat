import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router";

import "./BuyTicket.css";

const dataTicket = [
  { title: "Dorośli", price: 100, name: "adults" },
  { title: "Dzieci", price: 50, name: "children" },
  { title: "Rodzinny 2+2", price: 280, name: "family" },
  { title: "VIP", price: 300, name: "vip" },
];

const BuyTicket = () => {
  const [order, setOrder] = useState({
    adults: 0,
    children: 0,
    family: 0,
    vip: 0,
  });

  const calculateTotal = order => {
    return dataTicket.reduce((sum, ticket) => {
      return sum + ticket.price * order[ticket.name];
    }, 0);
  };

  const onChange = e => {
    const { name, value } = e.target;
    const updatedOrder = { ...order, [name]: parseInt(value) || 0 };
    setOrder(updatedOrder);
  };

  const total = calculateTotal(order);

  const nav = useNavigate();

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <section className="container">
          <div className="ticket-descp">
            <h1>Dawid Podsiadło</h1>
            <p>20.07.2024 16:00 / TORUŃ / HALA SPORTOWA</p>
          </div>

          <section className="choice-boxes">
            {dataTicket.map((data, index) => (
              <div key={index} className="choice-box">
                <h2>{data.title}</h2>
                <div className="input">
                  <span>{data.price} PLN</span>
                  <input
                    name={data.name}
                    type="number"
                    value={order[data.name]}
                    onChange={onChange}
                    min={0}
                  />
                </div>
              </div>
            ))}
          </section>

          <div className="summary">
            <h2>
              Całość - <span>{total} PLN</span>
            </h2>
            <button>REZERWUJ</button>
          </div>
        </section>
      </div>
    </>
  );
};

export default BuyTicket;
