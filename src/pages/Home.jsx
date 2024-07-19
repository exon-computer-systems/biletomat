import React from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";

const Home = () => {
    return (
        <>
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
