import React, { useState } from "react";
import TicketBox from "./components/TicketBox";
import "./BuyTicket.css";
import SumTicketPrice from "./components/SumTicketPrice";
const BuyTicket = () => {
  const [value, setValue] = useState("");
  const [summary, setSummary] = useState("0 PLN");

  const onChange = e => {
    setValue(e.target.value);
  };

  return (
    <div className="wrapper">
      <section className="container">
        <div className="ticket-descp">
          <h1>Dawid Podsiadło</h1>
          <p>20.07.2024 16:00 / TORUŃ / HALA SPORTOWA</p>
        </div>

        <section className="choice-boxes">
          <TicketBox
            value={value}
            setValue={setValue}
            onChange={onChange}
            summary={summary}
            setSummary={setSummary}
          />
        </section>

        <div className="summary">
          <SumTicketPrice />
        </div>
      </section>
    </div>
  );
};

export default BuyTicket;
