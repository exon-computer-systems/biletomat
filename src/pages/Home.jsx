import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";
import Welcome from "./components/welcome/Welcome";
import LogIn from "./components/logIn/LogIn";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Redeem from "./components/redeem/Redeem";

const Home = () => {
  const [isActive, setIsActive] = useState(true);
  const { auth } = useAuth();
  const nav = useNavigate();
  // const close = () => setIsLogged(false);
  // const open = () => setIsLogged(true);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLogged, setIsLogged] = useState(false);
  // const [activeAuthPanel, setActiveAuthPanel] = useState(false);
  const handleChange = input => {
    console.log("Input changed", input);
  };

  const handleKeyPress = button => {
    console.log("Button pressed", button);
  };

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
    <section className="home-cont">
      {/* {isActive && <Welcome handleClick={() => setIsActive(false)} />} */}
      {/* {isLogged && <LogIn isLogged={isLogged} handleClose={close} />} */}
      <Navbar />
      <section className="home">
        <SearchBar events={events} />

        <Slider events={events} isLoading={isLoading} />
        {/* <PromoSlider /> */}
        <EventList events={events} isLoading={isLoading} />
        <Redeem />
        {/* <Keyboard
          className="keyboard"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        /> */}
      </section>
    </section>
  );
};

export default Home;
