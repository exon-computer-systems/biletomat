import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MyTickets = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [isClicked, setIsClicked] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [events, setEvents] = useState([]);
    const [ticketsData, setTicketsData] = useState([]);

    const handleClick = () => {
        setIsClicked(() => !isClicked);
    };

    // useEffect(() => {
    //     console.log("auth");
    //     setTickets(auth?.purchasedTickets);

    //     const fetchData = async () => {
    //         const sendRequest = (item) => {
    //             return axios.post("/redeem", {
    //                 redeemCode: item,
    //             });
    //         };

    //         try {
    //             const requests = auth?.purchasedTickets.map((item) =>
    //                 sendRequest(item)
    //             );

    //             if (requests) {
    //                 const responses = await Promise.all(requests);
    //                 const newTicketsData = responses.map(
    //                     (response) => response.data.data
    //                 );
    //                 setTicketsData(newTicketsData);

    //                 const eventsResponse = await axios.get("/events");
    //                 console.log(eventsResponse.data);
    //             }
    //         } catch (error) {
    //             console.error("Error:", error);
    //         }
    //     };

    //     fetchData();
    // }, [auth]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(auth.id);

                const response = await axiosPrivate.post("/tickets", {
                    id: auth.id,
                });

                console.log(response.data);
            } catch (err) {
                console.warn(err);
            }
        };

        fetchData();
    }, [auth]);

    return (
        <section className="tickets-wrapper">
            <div className="mytickets-header">
                <h1
                    onClick={() => {
                        console.log(ticketsData);
                    }}
                >
                    Moje Bilety
                </h1>
            </div>
            {/* <section className="tickets">
                {data.map((el, i) => {
                    return (
                        <div className="ticket">
                            <div className="ticket-wrapper">
                                <div>
                                    <h3>{el.name}</h3>
                                    <p>{el.buyDate}</p>
                                </div>
                                <div className="cta-ticket-btns">
                                    <button className="download-btn">
                                        <a href="bilet.pdf" download>
                                            Pobierz
                                        </a>
                                    </button>
                                    <FontAwesomeIcon
                                        icon={faAngleDown}
                                        className="angle-down-btn"
                                        onClick={handleClick}
                                    />
                                </div>
                            </div>
                            {isClicked && (
                                <div className="qr-code">QR CODE</div>
                            )}
                        </div>
                    );
                })}
            </section> */}
        </section>
    );
};

export default MyTickets;
