import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import BuyTicket from "./pages/BuyTicket";
import LogIn from "./pages/components/logIn/LogIn";
import EventPage from "./pages/eventPage/EventPage";
import UserPage from "./pages/components/userPage/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path={`/event/:id`} element={<EventPage />} />
        <Route path="/buy" element={<BuyTicket />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
