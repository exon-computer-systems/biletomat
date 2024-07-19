import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";

const Card = ({ title, date, city, coverImage, width, height }) => {
    const localStyle = {
        width: width,
    };

    return (
        <section className={`promo-card ${height}`} style={localStyle}>
            <img
                src={coverImage}
                alt="event cover"
                className="promo-card-cover"
            />
            <section className="card-info">
                <h3 className="card-title">{title}</h3>
                <p className="card-date">{date}</p>
                <p className="card-place">{city}</p>
            </section>
        </section>
    );
};

export default Card;
