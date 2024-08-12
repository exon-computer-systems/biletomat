import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

const MyTickets = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [isClicked, setIsClicked] = useState(false);

    const [tickets, setTickets] = useState([]);

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

                // Reverse the tickets array before setting the state
                const reversedTickets = response.data.reservations.reverse();

                setTickets(reversedTickets);
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
                                    {el.sectorName !== "" ? (
                                        <>
                                            <p className="ticket-info-sector">
                                                {`Sektor: ${el.sectorName}`}
                                            </p>
                                            <p className="ticket-info-row">{`Rząd: ${el.rowNumber}`}</p>
                                            <p className="ticket-info-seat">{`Miejsce: ${el.seatNumber}`}</p>
                                        </>
                                    ) : (
                                        <p className="ticket-info-seat">
                                            Wydarzenie bez przydzielonych miejsc
                                        </p>
                                    )}
                                </section>
                                <img
                                    className="ticket-info-qr"
                                    src={el.qrCodeUrl}
                                    alt="QR Code"
                                />
                            </section>
                        );
                    })}
            </section>
        </section>
    );
};

export default MyTickets;
