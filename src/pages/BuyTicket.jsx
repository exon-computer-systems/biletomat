import React, { useState } from "react";

import "./BuyTicket.css";

const dataTicket = [
  {
    title: "Dorośli",
    price: 100,
    name: "adults",
  },
  {
    title: "Dzieci",
    price: 50,
    name: "children",
  },
  {
    title: "Rodzinny 2+2",
    price: 280,
    name: "family",
  },
  {
    title: "VIP",
    price: 300,
    name: "vip",
  },
];

const BuyTicket = () => {
  const [summary, setSummary] = useState("0 PLN");
  const [order, setOrder] = useState({
    adults: 0,
    children: 0,
    family: 0,
    vip: 0,
  });

  const onChange = e => {
    setOrder(e.target.value);
  };

  return (
    <div className="wrapper">
      <section className="container">
        <div className="ticket-descp">
          <h1>Dawid Podsiadło</h1>
          <p>20.07.2024 16:00 / TORUŃ / HALA SPORTOWA</p>
        </div>

        <section className="choice-boxes">
          <div className="choice-box">
            <h2>{dataTicket[0].title}</h2>
            <div>
              <span>{dataTicket[0].price} PLN</span>
              <input
                name={dataTicket.name}
                type="number"
                value={order}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="choice-box">
            <h2>{dataTicket[1].title}</h2>
            <div>
              <span>{dataTicket[1].price} PLN</span>
              <input
                name={dataTicket.name}
                type="number"
                value={order}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="choice-box">
            <h2>{dataTicket[2].title}</h2>
            <div>
              <span>{dataTicket[2].price} PLN</span>
              <input
                name={dataTicket.name}
                type="number"
                value={order}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="choice-box">
            <h2>{dataTicket[3].title}</h2>
            <div>
              <span>{dataTicket[3].price} PLN</span>
              <input
                name={dataTicket.name}
                type="number"
                value={order}
                onChange={onChange}
              />
            </div>
          </div>
        </section>

        <div className="summary">
          <h2>
            Całość - <span>{summary}</span>
          </h2>
          <button>REZERWUJ</button>
        </div>
      </section>
    </div>
  );
};

export default BuyTicket;
