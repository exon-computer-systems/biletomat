import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import QRCode from "react-qr-code";

const MyTickets = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [isClicked, setIsClicked] = useState(false);

    const [tickets, setTickets] = useState([]);
    const [cryptedTickets, setCryptedTickets] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);

    const handleClick = () => {
        setIsClicked(() => !isClicked);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!auth?.id) return; // Ensure `auth.id` exists

            try {
                console.log("Fetching tickets for user:", auth.id);

                const response = await axios.get(`/users/${auth.id}`);

                console.log(response.data.reservations);
                setTickets(response.data.reservations);
            } catch (err) {
                console.warn("Error fetching tickets:", err);
            }
        };

        fetchData();
    }, [auth?.id, axiosPrivate]);

    return (
        <section className="tickets-wrapper">
            <div className="mytickets-header">
                <h1>Moje Bilety</h1>
            </div>

            <section className="tickets">
                {tickets.length > 0 &&
                    tickets.map((el) => {
                        console.log(el);
                        return (
                            <section className="ticket" key={el._id}>
                                <section className="ticket-info">
                                    <h4 className="ticket-info-title">
                                        {el.eventTitle}
                                    </h4>
                                    <p className="ticket-info-date">
                                        {el.eventDate} - 19:00
                                    </p>
                                    <p className="ticket-info-sector">{`Sektor: ${el.sectorName}`}</p>
                                    <p className="ticket-info-row">{`Rząd: ${el.rowNumber}`}</p>
                                    <p className="ticket-info-seat">{`Miejsce: ${el.seatNumber}`}</p>
                                </section>
                                <img
                                    className="ticket-info-qr"
                                    src={el.qrCodeUrl}
                                />
                            </section>
                        );
                    })}
            </section>
        </section>
    );
};

export default MyTickets;
