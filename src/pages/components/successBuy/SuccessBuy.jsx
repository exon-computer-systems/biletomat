import React from "react";
import "./SuccessBuy.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const SuccessBuy = () => {
  const nav = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "/client-print",
        { data: "Your print data here" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Print request sent successfully");
    } catch (error) {
      console.error("Error sending print request:", error);
    }
    console.log("printing");
  };

  return (
    <section className="succbuy-cont">
      <section className="succbuy">
        <h1 className="succbuy-title">Pomyślnie zakupiono bilet</h1>
        <FontAwesomeIcon className="succbuy-icon" icon={faCheckCircle} />
      </section>
      <section className="succbuy-btn-cont">
        <p className="succbuy-text">Bilet dostepny w panelu użytkownika</p>

        <section className="succbuy-btn-wrap">
          <button
            onClick={() => fetchData()}
            className="succbuy-btn nonprimary"
          >
            Drukuj
          </button>
          <button onClick={() => nav("/")} className="succbuy-btn primary">
            Pomiń
          </button>
        </section>
      </section>
    </section>
  );
};

export default SuccessBuy;
