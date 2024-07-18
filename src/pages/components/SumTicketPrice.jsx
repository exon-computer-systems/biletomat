import React, { useState } from "react";

const SumTicketPrice = ({ summary }) => {
  return (
    <>
      <h2>
        Całość - <span>{summary}</span>
      </h2>
      <button>REZERWUJ</button>
    </>
  );
};

export default SumTicketPrice;
