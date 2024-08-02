import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Favourite = () => {
    const { auth } = useAuth();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(auth?.likedEvents);
    });

    return (
        <section className="tickets-wrapper">
            <div className="mytickets-header">
                <h1>Ulubione</h1>
            </div>
            <section className="tickets">
                {favorites.length > 0 &&
                    favorites.map((el) => (
                        <div className="ticket" key={el}>
                            <div className="ticket-wrapper">
                                <div>
                                    <h3>{el}</h3>
                                </div>
                                <div className="cta-ticket-btns">
                                    <button className="delete-favourite-btn">
                                        Usuń z ulubionych
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </section>
        </section>
    );
};

export default Favourite;
