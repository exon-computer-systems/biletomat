import React from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import SearchBar from "./components/searchBar/SearchBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="home">
        <SearchBar />
        <Slider />
        <PromoSlider />
      </section>
    </>
  );
};

export default Home;
