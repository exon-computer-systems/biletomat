import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
    const { auth } = useAuth();
    const nav = useNavigate();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        setFavorites(auth?.likedEvents);

        const fetchData = async () => {
            const res = await axios.get(`/events`);
            // setFavorites();
        };

        fetchData();
    }, []);

    return (
        <section className="tickets-wrapper">
            <div className="mytickets-header">
                <h1>Ulubione</h1>
            </div>
            <section className="tickets">
                {favorites?.length > 0 &&
                    favorites.map((el) => (
                        <div
                            className="ticket"
                            key={el}
                            onClick={() => nav(`/event/${el}`)}
                        >
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
