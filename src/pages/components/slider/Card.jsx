import { width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";

const Card = (props) => {
    const localStyle = {
        width: props.width,
    };

    return (
        <section className="card" style={localStyle}>
            <img
                src="https://lastfm.freetls.fastly.net/i/u/770x0/d54ce0bab1328844072bff31dab02a7c.jpg#d54ce0bab1328844072bff31dab02a7c"
                alt="event cover"
                className="card-cover"
            />
            <section className="card-info">
                <h3 className="card-title">Taco Hemingway</h3>
                <p className="card-date">20.07.2024</p>
                <p className="card-place">Warszawa</p>
            </section>
        </section>
    );
};

export default Card;
