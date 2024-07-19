import React from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";

const Home = () => {
    return (
        <>
            <Navbar />
            <section className="home">
                <Slider />
                {/* <PromoSlider /> */}
                <EventList />
            </section>
        </>
    );
};

export default Home;
