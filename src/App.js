import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import BuyTicket from "./pages/BuyTicket";
import LogIn from "./pages/components/logIn/LogIn";
import EventPage from "./pages/eventPage/EventPage";
import EventPage2 from "./pages/eventPage/EventPage2";
import RequireAuth from "./pages/components/RequireAuth";
import UserPage from "./pages/components/userPage/UserPage";
import CreateNewPage from "./pages/createNewPage/CreateNewPage";
import SearchResults from "./pages/SearchResults.jsx/SearchResults";
import EditPage from "./pages/editPage/EditPage";
import RedeemTicket from "./pages/redeemTicket/RedeemTicket";
import ScrollToTop from "./pages/components/scrollToTop/scrollToTop";
import Rodo from "./pages/rodo/Rodo";

function App() {
    const ROLES = {
        User: 2001,
        Editor: 1984,
        Admin: 5150,
    };

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                {/* <Route path={`/event/:id`} element={<EventPage />} /> */}
                <Route path={`/event/:id`} element={<EventPage2 />} />
                <Route path={`/redeem`} element={<RedeemTicket />} />
                <Route path="/search-results" element={<SearchResults />} />
                <Route path="/rodo" element={<Rodo />} />

                {/* protected routes */}
                <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
                    <Route path="/buy/:id" element={<BuyTicket />} />
                    <Route path="/user" element={<UserPage />} />
                </Route>

                <Route
                    element={
                        <RequireAuth
                            allowedRoles={[ROLES.Editor, ROLES.Admin]}
                        />
                    }
                >
                    <Route
                        path="/create-new-page"
                        element={<CreateNewPage />}
                    />
                    <Route path="/edit-page/:id" element={<EditPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
