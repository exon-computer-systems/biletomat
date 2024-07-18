import React from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
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
