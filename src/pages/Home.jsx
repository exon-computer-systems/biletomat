import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";
import Welcome from "./components/welcome/Welcome";
import LogIn from "./components/logIn/LogIn";
import axios from "axios";

const Home = () => {
    const [isActive, setIsActive] = useState(true);
    const [isLogged, setIsLogged] = useState(false);
    const close = () => setIsLogged(false);
    const open = () => setIsLogged(true);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
            {/* {isActive && <Welcome handleClick={() => setIsActive(false)} />} */}
            {isLogged && <LogIn isLogged={isLogged} handleClose={close} />}
            <Navbar close={close} open={open} isLogged={isLogged} />
            <section className="home">
                <SearchBar />

                <Slider events={events} isLoading={isLoading} />
                {/* <PromoSlider /> */}
                <EventList events={events} isLoading={isLoading} />
            </section>
        </>
    );
};

export default Home;
