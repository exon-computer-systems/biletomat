import React from "react";

import Navbar from "./components/Navbar";

import "./Home.css";

import Slider from "./components/slider/Slider";

const Home = () => {
    return (
        <>
            <Navbar />

            <section className="home">
                <Slider />
            </section>
        </>
    );
};

export default Home;
