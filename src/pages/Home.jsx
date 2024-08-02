import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";
import Welcome from "./components/welcome/Welcome";
import LogIn from "./components/logIn/LogIn";
import AuthPanel from "./components/authPanel/AuthPanel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const Home = () => {
    const nav = useNavigate();
    const { auth } = useAuth();

    const [isActive, setIsActive] = useState(true);
    // const close = () => setIsLogged(false);
    // const open = () => setIsLogged(true);
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isLogged, setIsLogged] = useState(false);
    const [activeAuthPanel, setActiveAuthPanel] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);

            const res = await axios.get(
                "https://biletomat-be.onrender.com/events"
            );

            //   console.log(res.data);

            setEvents(res.data);

            setIsLoading(false);
        };

        fetchData();
    }, []);

    const handleAuth = () => {
        auth?.email ? nav("/user") : setActiveAuthPanel(true);
    };

    return (
        <>
            {/* {isActive && <Welcome handleClick={() => setIsActive(false)} />} */}
            {/* {isLogged && <LogIn isLogged={isLogged} handleClose={close} />} */}
            {/* {isLogged && <AuthPanel handleClose={close} />} */}
            {/* <Navbar close={close} open={open} isLogged={isLogged} /> */}
            {activeAuthPanel && (
                <AuthPanel handleClose={() => setActiveAuthPanel(false)} />
            )}

            <Navbar handleAuth={handleAuth} />
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
