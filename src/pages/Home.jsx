import React from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import Welcome from "./components/welcome/Welcome";
const Home = () => {
  return (
    <>
      <Welcome />
      <Navbar />
      <section className="home">
        <Slider />
        <PromoSlider />
      </section>
    </>
  );
};

export default Home;
