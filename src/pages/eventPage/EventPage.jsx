import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart as fullHeart,
    faShare,
    faCalendar,
    faLocationDot,
    faAngleDown,
    faAngleLeft,
    faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import "./EventPage.css";
import axios, { axiosPrivate } from "../api/axios";
import PromoSlider from "../components/promoSlider/PromoSlider";
import OtherArtists from "../otherArtists/OtherArtistsList";
import NavBar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import LinkBack from "../components/LinkBack/LinkBack";

const EventPage = () => {
    const { auth, setAuth } = useAuth();
    const { id } = useParams(); //  Getting id from url to render page based on clicked event
    const nav = useNavigate();

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const allowedRoles = [1984, 2150];

    // Fetching data
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const res = await axios.get(`/events/${id}`);

            setEvents(res.data);
            setIsLoading(false);
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        // console.log(auth);
        // console.log(auth?.likedEvents?.includes(events.tid));
        setIsFavorite(auth?.likedEvents?.includes(events.tid));
    }, [auth, isLoading]);

    const handleFavorite = async () => {
        // console.log(auth.id);
        // console.log(events.tid);
        if (!auth) {
            console.log("user is not logged");
            // TU DODAC OTWIERANIE AUTHPANEL
        }

        try {
            const response = await axiosPrivate.put(
                `/users/${auth.id}`,
                JSON.stringify({
                    tid: events.tid,
                }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            // console.log(response);
            setAuth((prevAuth) => ({
                ...prevAuth,
                likedEvents: response.data.likedEvents,
            }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <NavBar />

            <section className="event-page-container">
                <LinkBack />
                <section className="section1-container">
                    <section className="section1-wrapper">
                        <div className="cover-buy-wrapper">
                            <div className="cover-image">
                                <img src={events.coverImage} />
                            </div>
                            <div className="title-descp">
                                <div className="descp">
                                    <h2>
                                        {events.title}

                                        {allowedRoles.some((i) =>
                                            auth?.roles?.includes(i)
                                        ) && (
                                            <button
                                                onClick={() =>
                                                    nav(`/edit-page/${id}`)
                                                }
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                            </button>
                                        )}
                                    </h2>
                                </div>
                                <div className="date-place">
                                    <div className="place">
                                        <FontAwesomeIcon
                                            icon={faCalendar}
                                            className="place-icon"
                                        />
                                        <div className="place-info">
                                            <p className="start-date">
                                                {events.startDate}
                                            </p>
                                            <p className="hours">
                                                19:00 - 21:00
                                            </p>
                                        </div>
                                    </div>
                                    <div className="date">
                                        <FontAwesomeIcon
                                            icon={faLocationDot}
                                            className="date-icon"
                                        />
                                        <p className="city">{events.city}</p>
                                    </div>
                                </div>
                                <div className="btns">
                                    <button
                                        className="buy-ticket"
                                        onClick={() => nav(`/buy/${id}`)}
                                    >
                                        KUP BILET
                                    </button>
                                    <button onClick={handleFavorite}>
                                        <FontAwesomeIcon
                                            icon={
                                                isFavorite
                                                    ? fullHeart
                                                    : emptyHeart
                                            }
                                            className="heart-icon"
                                        />
                                    </button>
                                    <button>
                                        <FontAwesomeIcon
                                            icon={faShare}
                                            className="share-icon"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p>{events.description}</p>
                    </section>
                </section>
                <section className="section2-wrapper">
                    <div className="other-tickets">
                        <span></span>
                        <h2>Pozostałe bilety</h2>
                        <button>bilet warszawa</button>
                        <button>bilet warszawa</button>
                        <button>bilet warszawa</button>
                        <button>bilet warszawa</button>
                    </div>
                </section>
                <section className="section3-wrapper">
                    <h2>Pozostali artyści</h2>
                    <span></span>
                    <OtherArtists />
                </section>
                <section className="section4-wrapper">
                    <h2>Pozostałe wydarzenia</h2>
                    <span></span>
                    <PromoSlider />
                </section>
            </section>
        </>
    );
};

export default EventPage;
