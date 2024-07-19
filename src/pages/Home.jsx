import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";
import Welcome from "./components/welcome/Welcome";

const Home = () => {
    const [isActive, setIsActive] = useState(true);

    return (
        <>
            {isActive && <Welcome handleClick={() => setIsActive(false)} />}

            <Navbar />
            <section className="home">
                <SearchBar />
                <Slider />
                {/* <PromoSlider /> */}
                <EventList />
            </section>
        </>
    );
};

export default Home;
