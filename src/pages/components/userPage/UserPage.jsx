import "./UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHeart, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useState, lazy, Suspense, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import useAuth from "../../hooks/useAuth";

const MainUserPage = lazy(() => import("./MainUserPage"));
const Favourite = lazy(() => import("./Favourite"));
const MyTickets = lazy(() => import("./MyTickets"));

const UserPage = () => {
    const nav = useNavigate();
    const logout = useLogout();
    const { auth } = useAuth();

    const [isClicked, setIsClicked] = useState("main"); // setting state to main for site to always be open on the main option

    const handleLogout = () => {
        logout();
        nav("/");
    };

    const components = {
        main: <MainUserPage />,
        favourite: <Favourite />,
        mytickets: <MyTickets />,
    };
    return (
        <section className="user-page-container">
            <section className="menu-bar-wrapper">
                <section className="menu-bar">
                    <div className="options-wrapper">
                        <Link className="image-logo" to={"/"}>
                            <img
                                className="exon-logo"
                                src="https://cyberbezpieczenstwo.exon.pl/mt-content/uploads/2020/10/ekson-logo-duze_przezroczyste_2020-10-16-09-07-44.png"
                                alt="exon logo"
                            />
                        </Link>
                        <ul>
                            <li
                                className={isClicked === "main" ? "active" : ""}
                                onClick={() => setIsClicked("main")}
                            >
                                <FontAwesomeIcon icon={faHouse} />
                                Główne
                            </li>
                            <li
                                className={
                                    isClicked === "favourite" ? "active" : ""
                                }
                                onClick={() => setIsClicked("favourite")}
                            >
                                <FontAwesomeIcon icon={faHeart} />
                                Ulubione
                            </li>
                            <li
                                className={
                                    isClicked === "mytickets" ? "active" : ""
                                }
                                onClick={() => setIsClicked("mytickets")}
                            >
                                <FontAwesomeIcon icon={faTicket} />
                                Moje Bilety
                            </li>
                        </ul>
                    </div>
                    <button className="logout" onClick={handleLogout}>
                        <h2>Wyloguj się</h2>
                    </button>
                </section>
                <section className="main-user-menu">
                    <Suspense fallback={<div>Loading...</div>}>
                        {components[isClicked]}
                    </Suspense>
                </section>
            </section>
        </section>
    );
};

export default UserPage;
