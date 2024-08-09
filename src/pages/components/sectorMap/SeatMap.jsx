import React, { useEffect, useState } from "react";
import { faCouch } from "@fortawesome/free-solid-svg-icons/faCouch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const SeatMap = ({
    rows,
    cols,
    maxSelected,
    sectorId,
    event,
    selectedSeats,
    setSelectedSeats,
    checkOutHandle,
}) => {
    const { auth } = useAuth();
    const { id } = useParams();

    // const [selectedSeats, setSelectedSeats] = useState([]);
    const [seatsData, setSeatsData] = useState([]);
    const [eventData, setEventData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const flattenSeats = (rows) => {
        let seats = [];

        rows.forEach((row) => {
            row.seats.forEach((seat) => {
                seats.push({
                    ...seat,
                    rowInfo: {
                        rowNumber: row.rowNumber,
                        sectorName: sectorId,
                    },
                });
            });
        });

        return seats;
    };

    useEffect(() => {
        // console.log(auth);

        const fetchSeatData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`/events/${id}`);

                setEventData(response.data);

                const sectorArray = response.data.theater.sectors.find(
                    (sector) => sector.sectorName === sectorId
                );

                console.log(sectorArray);

                // Log the response to inspect structure
                const flatSeats = flattenSeats(sectorArray.rows);
                console.log(flatSeats);
                setSeatsData(flatSeats);
            } catch (err) {
                console.warn(err);
            } finally {
                setIsLoading(false); // Ensure loading state is reset
            }
        };

        if (sectorId) {
            fetchSeatData();
        }
    }, [sectorId]);

    const localStyle = {
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
    };

    const handleSeatClick = (seat) => {
        if (seat.status === "free") {
            console.log(seat);
            if (selectedSeats.some((el) => el._id === seat._id)) {
                setSelectedSeats(
                    selectedSeats.filter(
                        (selected) => selected._id !== seat._id
                    )
                );
            } else if (selectedSeats.length < maxSelected) {
                setSelectedSeats([...selectedSeats, seat]);
            }
        }
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(selectedSeats);

    //     try {
    //         if (auth.email) {
    //             // WYSWIETLIC AUTH PANEL JESLI UZYTKOWNIK NIE JEST ZALOGOWANY
    //             const requests = selectedSeats.map((selectedSeat) =>
    //                 axios.post("/events/reserve", {
    //                     eventId: eventData._id,
    //                     sectorName: selectedSeat.rowInfo.sectorName,
    //                     rowNumber: selectedSeat.rowInfo.rowNumber,
    //                     seatNumber: selectedSeat.seatNumber,
    //                     userId: auth.id,
    //                 })
    //             );

    //             setSelectedSeats([]);
    //             const responses = await Promise.all(requests);

    //             responses.forEach((response) => {
    //                 console.log("Response:", response.data.qrCodeUrl);
    //             });
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };

    return (
        <section className="seat-map-cont">
            <form className="seat-map" style={localStyle}>
                {isLoading
                    ? "Loading..."
                    : seatsData.map((seat) => {
                          //   console.log(seat);
                          return (
                              <div
                                  key={seat._id} // Use _id as the unique key for each seat
                                  className={`seat ${
                                      selectedSeats.some(
                                          (el) => el._id === seat._id
                                      )
                                          ? "selected"
                                          : ""
                                  } ${
                                      seat.status === "reserved"
                                          ? "reserved"
                                          : "free"
                                  }`}
                                  onClick={() => {
                                      handleSeatClick(seat);
                                      console.log(selectedSeats);
                                  }}
                              >
                                  <FontAwesomeIcon
                                      icon={faCouch}
                                      className="seat-icon"
                                  />
                              </div>
                          );
                      })}
            </form>
            <button onClick={checkOutHandle}>Rezerwuj</button>
        </section>
    );
};

export default SeatMap;
