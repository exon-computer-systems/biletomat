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

                setCryptedTickets(auth.purchasedTickets);

                const response = await axiosPrivate.post("/tickets", {
                    id: auth.id,
                });

                // Log and set tickets
                console.log("Fetched tickets:", response.data);
                setTickets(response.data); // Set tickets in state

                if (response) {
                    const eventResponse = await axios.get("/events");

                    console.log(eventResponse.data);
                    setEvents(eventResponse.data);
                }
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
                {cryptedTickets.length > 0 &&
                    cryptedTickets.map((el) => {
                        console.log(el);
                        return (
                            <QRCode
                                title="Test"
                                bgColor="#FFFFFF"
                                fgColor="#000000"
                                value={el}
                                size={400}
                            />
                        );
                    })}
            </section>
        </section>
    );
};

export default MyTickets;
