import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart as fullHeart,
    faShare,
    faCalendar,
    faLocationDot,
    faAngleLeft,
    faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import axios from "../api/axios";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

import NavBar from "../components/Navbar";
import LinkBack from "../components/LinkBack/LinkBack";
import SectorMap from "../components/sectorMap/SectorMap";
import BuyTicket from "../BuyTicket";
import Confirmation from "../Confirmation";
import SuccessBuy from "../components/successBuy/SuccessBuy";
import AuthPanel from "../components/authPanel/AuthPanel";

import "./EventPage.css";
import SeatMap from "../components/sectorMap/SeatMap";
import LoginProvider from "./LoginProvider";

const EventPage = () => {
    const { auth, setAuth } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();

    const [orderSteps, setOrderSteps] = useState(1);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [purchased, setPurchased] = useState([]);
    const [confirmationData, setConfirmationData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        startDate: "",
        ticketType: [],
        price: 0,
    });
    const [order, setOrder] = useState({
        normal: 0,
        discounted: 0,
        senior: 0,
        sum: 0,
    });
    const [sector, setSector] = useState("");
    const [seatGridSize, setSeatGridSize] = useState({
        rows: 0,
        cols: 0,
    });
    const [activeAuthPanel, setActiveAuthPanel] = useState(false);

    const allowedRoles = [1984, 2150];

    // useEffect(() => {
    //     console.log(order);
    // }, [order]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`/events/${id}`);
                setEvent(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        setIsFavorite(auth?.likedEvents?.includes(event.tid));
    }, [auth, event]);

    const handleFavorite = async () => {
        if (!auth?.email) {
            setActiveAuthPanel(true);
            return;
        }

        try {
            const response = await axiosPrivate.put(
                `/users/${auth.id}`,
                { tid: event.tid },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            setAuth((prevAuth) => ({
                ...prevAuth,
                likedEvents: response.data.likedEvents,
            }));
        } catch (err) {
            console.error("Error updating favorite events:", err);
        }
    };

    const handleClose = () => {
        setActiveAuthPanel(false);
    };

    const checkOutHandle = () => {
        const allSeatsMatch = selectedSeats.every(
            (seat) => seat.rowInfo.rowNumber && seat.seatNumber
        );

        if (allSeatsMatch) {
            setIsSelected(true);
        }
    };

    useEffect(() => {
        console.log(orderSteps);
        if (orderSteps === 2 && event.seated === false) {
            setOrderSteps(5);
        }
    }, [orderSteps, event.seated, setOrderSteps]);

    return (
        <>
            <NavBar />
            <section className="event-page-container">
                <section className="section1-container">
                    <section className="section1-wrapper">
                        <div className="cover-buy-wrapper">
                            <div className="cover-image">
                                <img
                                    src={event.coverImage}
                                    alt={`${event.title} Cover`}
                                />
                            </div>
                            <div className="title-descp">
                                <div className="descp">
                                    <h2>
                                        {event.title}
                                        {allowedRoles.some((role) =>
                                            auth?.roles?.includes(role)
                                        ) && (
                                            <button
                                                onClick={() =>
                                                    navigate(`/edit-page/${id}`)
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
                                                {event.startDate}
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
                                        <p className="city">{event.city}</p>
                                    </div>
                                </div>
                                <div className="btns">
                                    <button onClick={handleFavorite}>
                                        <FontAwesomeIcon
                                            icon={
                                                isFavorite
                                                    ? fullHeart
                                                    : emptyHeart
                                            }
                                            className="heart-icon"
                                        />
                                        <p>Do ulubionych</p>
                                    </button>
                                    <button>
                                        <FontAwesomeIcon
                                            icon={faShare}
                                            className="share-icon"
                                        />
                                        <p>Udostępnij</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <p>Opis: {event.description}</p>
                    </section>
                </section>
                <section className="section2-wrapper">
                    {(() => {
                        switch (orderSteps) {
                            case 1:
                                return (
                                    <BuyTicket
                                        order={order}
                                        setOrder={setOrder}
                                        event={event}
                                        setOrderSteps={setOrderSteps}
                                        setActiveAuthPanel={setActiveAuthPanel}
                                    />
                                );

                            case 2:
                                return (
                                    <SectorMap
                                        order={order}
                                        setOrder={setOrder}
                                        event={event}
                                        selectedSeats={selectedSeats}
                                        setSelectedSeats={setSelectedSeats}
                                        checkOutHandle={checkOutHandle}
                                        maxSelected={order.sum}
                                        orderSteps={orderSteps}
                                        setOrderSteps={setOrderSteps}
                                        sector={sector}
                                        setSector={setSector}
                                        setSeatGridSize={setSeatGridSize}
                                    />
                                );
                            case 3:
                                return (
                                    <SeatMap
                                        rows={seatGridSize.rows}
                                        cols={seatGridSize.cols}
                                        maxSelected={order.sum}
                                        sectorId={sector}
                                        event={event}
                                        selectedSeats={selectedSeats}
                                        setSelectedSeats={setSelectedSeats}
                                        checkOutHandle={checkOutHandle}
                                        order={order}
                                        setOrder={setOrder}
                                        setOrderSteps={setOrderSteps}
                                    />
                                );
                            case 4:
                                return (
                                    <Confirmation
                                        selectedSeats={selectedSeats}
                                        setSelectedSeats={setSelectedSeats}
                                        confirmationData={confirmationData}
                                        event={event}
                                        order={order}
                                        setOrderSteps={setOrderSteps}
                                        setPurchased={setPurchased}
                                    />
                                );
                            case 5:
                                return (
                                    <LoginProvider
                                        setOrderSteps={setOrderSteps}
                                        selectedSeats={selectedSeats}
                                        setSelectedSeats={setSelectedSeats}
                                        order={order}
                                        event={event}
                                    />
                                );
                            case 6:
                                return <SuccessBuy />;
                        }
                    })()}
                </section>
            </section>
        </>
    );
};

export default EventPage;
