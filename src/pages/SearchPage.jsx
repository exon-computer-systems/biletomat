import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./SearchPage.css";
import SearchBar from "./components/searchBar/SearchBar";
import Event from "./components/eventList/Event";
import axios from "axios";

const SearchPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const res = await axios.get(
                "https://biletomat-strapi-backend.onrender.com/api/events"
            );

            console.log(res.data);

            setEvents(res.data.data);

            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            <Navbar />
            <section className="search-pg pg-cont">
                <SearchBar />
                <section className="search-pg-content">
                    <h4 className="search-pg-finds">Znaleziono wynikow: 500</h4>
                    <section className="search-pg-query">
                        {isLoading ? (
                            <p>Loading events...</p>
                        ) : (
                            events.map((el, idx) => (
                                <Event
                                    key={el.attributes.uid}
                                    title={el.attributes.title}
                                    desc={el.attributes.description}
                                    date={el.attributes.startDate}
                                    city={el.attributes.city}
                                    coverImage={el.attributes.coverLink}
                                    sale={el.attributes.sale}
                                    goingFast={el.attributes.goingFast}
                                />
                            ))
                        )}
                    </section>
                </section>
            </section>
        </>
    );
};

export default SearchPage;
