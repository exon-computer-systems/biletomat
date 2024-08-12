import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";
import Welcome from "./components/welcome/Welcome";
import LogIn from "./components/logIn/LogIn";

import axios from "./api/axios";

const Home = () => {
    const [isActive, setIsActive] = useState(true);
    // const close = () => setIsLogged(false);
    // const open = () => setIsLogged(true);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLogged, setIsLogged] = useState(false);
    // const [activeAuthPanel, setActiveAuthPanel] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get("/events");

                console.log(res.data);

                setEvents(res.data);
            } catch (err) {
                console.warn(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {/* {isActive && <Welcome handleClick={() => setIsActive(false)} />} */}
            {/* {isLogged && <LogIn isLogged={isLogged} handleClose={close} />} */}
            <Navbar />
            <section className="home">
                <SearchBar events={events} />

                <Slider events={events} isLoading={isLoading} />
                {/* <PromoSlider /> */}
                <EventList events={events} isLoading={isLoading} />
            </section>
        </>
    );
};

export default Home;
