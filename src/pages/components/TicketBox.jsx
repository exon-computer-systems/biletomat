import React, { useState } from "react";

const dataTicket = [
  {
    title: "Dorośli",
    price: 100,
  },
  {
    title: "Dzieci",
    price: 50,
  },
  {
    title: "Rodzinny 2+2",
    price: 280,
  },
  {
    title: "VIP",
    price: 300,
  },
];

const TicketBox = ({ value, setValue, onChange, summary, setSummary }) => {
  return (
    <>
      {dataTicket.map((data, i) => (
        <>
          <div className="choice-box">
            <h2>{data.title}</h2>
            <div>
              <span>{data.price.toFixed(2)} PLN</span>
              <input type="number" value={value} onChange={onChange} />
            </div>
          </div>
        </>
      ))}
    </>
  );
};

export default TicketBox;
