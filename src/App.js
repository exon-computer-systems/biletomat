import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import BuyTicket from "./pages/BuyTicket";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buy" element={<BuyTicket />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
