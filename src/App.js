import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import BuyTicket from "./pages/BuyTicket";
import LogIn from "./pages/components/logIn/LogIn";
import EventPage from "./pages/eventPage/EventPage";
import RequireAuth from "./pages/components/RequireAuth";

function App() {
    const ROLES = {
        User: 2001,
        Editor: 1984,
        Admin: 5150,
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path={`/event/:id`} element={<EventPage />} />

                {/* protected routes */}
                {/* prettier-ignore */}
                <Route element={ <RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} /> } >
                    <Route path="/buy" element={<BuyTicket />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
