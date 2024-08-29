import React, { useState, useEffect } from "react";
import "./EventList.css";
import Event from "./Event";
import useAuth from "../../hooks/useAuth";

const EventList = ({ events, isLoading }) => {
    const { auth } = useAuth();
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Initialize favorite states for each event
        const initialFavorites = events.map(event =>
            auth?.likedEvents?.includes(event.tid)
        );
        setFavorites(initialFavorites);
    }, [auth, events]);

    const toggleFavorite = index => {
        const updatedFavorites = [...favorites];
        updatedFavorites[index] = !updatedFavorites[index];
        setFavorites(updatedFavorites);

        // Here you could also update the user's favorite events on the backend or in local storage
    };

    return (
        <section className="e-list-wrap">
            <section className="e-list">
                <h2 className="e-list-title">Najblizsze wydarzenia</h2>
                <section className="e-list-events">
                    {isLoading ? (
                        <p>Loading events...</p>
                    ) : (
                        events.map((el, idx) => (
                            <Event
                                id={el.id}
                                tid={el.tid}
                                key={idx}
                                title={el.title}
                                date={el.startDate}
                                city={el.city}
                                coverImage={el.coverImage}
                                sale={el.sale}
                                goingFast={el.goingFast}
                                isFavorite={favorites[idx]}
                                toggleFavorite={() => toggleFavorite(idx)}
                            />
                        ))
                    )}
                </section>
            </section>
        </section>
    );
};

export default EventList;
