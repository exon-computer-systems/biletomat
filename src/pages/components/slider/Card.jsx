import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, date, city, coverImage, width, tid }) => {
  const nav = useNavigate();
  const localStyle = {
    width: width,
  };

  return (
    <section
      className="card"
      style={localStyle}
      onClick={() => nav(`/event/${tid}`)}
    >
      <img src={coverImage} alt="event cover" className="card-cover" />
      <section className="card-info">
        <h3 className="card-title">{title}</h3>
        <p className="card-date">{date}</p>
        <p className="card-place">{city}</p>
      </section>
    </section>
  );
};

export default Card;
