import "./UserPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faHeart, faTicket } from "@fortawesome/free-solid-svg-icons";
import { useState, lazy, Suspense, useEffect } from "react";
import useAxiosPrivates from "../../hooks/useAxiosPrivate";

const MainUserPage = lazy(() => import("./MainUserPage"));
const Favourite = lazy(() => import("./Favourite"));
const MyTickets = lazy(() => import("./MyTickets"));

const UserPage = () => {
    const [isClicked, setIsClicked] = useState("main"); // setting state to main for site to always be open on the main option

    const axiosPrivate = useAxiosPrivates();

    useEffect(() => {
        const controller = new AbortController();
        const getRefresh = async () => {
            try {
                const response = await axiosPrivate.get("/events/ed-sheeran", {
                    signal: controller.signal,
                });
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        getRefresh();

        return () => {
            controller.abort();
        };
    }, []);

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
                        <div className="image-logo">
                            <img
                                className="exon-logo"
                                src="https://cyberbezpieczenstwo.exon.pl/mt-content/uploads/2020/10/ekson-logo-duze_przezroczyste_2020-10-16-09-07-44.png"
                                alt="exon logo"
                            />
                        </div>
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
                    <div className="logout">
                        <h2>Wyloguj się</h2>
                    </div>
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
