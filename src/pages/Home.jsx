import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "./components/Navbar";
import Slider from "./components/slider/Slider";
import PromoSlider from "./components/promoSlider/PromoSlider";
import EventList from "./components/eventList/EventList";
import SearchBar from "./components/searchBar/SearchBar";
import Welcome from "./components/welcome/Welcome";
import LogIn from "./components/logIn/LogIn";

import axios from "./api/axios";
import useAuth from "./hooks/useAuth";
import { useNavigate } from "react-router-dom";

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
  const [activeAuthPanel, setActiveAuthPanel] = useState(false);
  const handleAuth = () => {
    auth?.email ? nav("/user") : setActiveAuthPanel(true);
  };
  const handleClose = () => {
    setActiveAuthPanel(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await axios.get("/events");

      //   console.log(res.data);

      setEvents(res.data);

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {/* {isActive && <Welcome handleClick={() => setIsActive(false)} />} */}
      {/* {isLogged && <LogIn isLogged={isLogged} handleClose={close} />} */}
      <Navbar
        activeAuthPanel={activeAuthPanel}
        setActiveAuthPanel={setActiveAuthPanel}
        handleAuth={handleAuth}
        handleClose={handleClose}
      />
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
