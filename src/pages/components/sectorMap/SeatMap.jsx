import React, { useEffect, useState } from "react";
import { faCouch } from "@fortawesome/free-solid-svg-icons/faCouch";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
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
  order,
  setOrder,
  setOrderSteps,
}) => {
  const { auth } = useAuth();
  const { id } = useParams();

  const [seatsData, setSeatsData] = useState([]);
  const [eventData, setEventData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [prices, setPrices] = useState({});
  const [selected, setSelected] = useState(maxSelected - selectedSeats.length);

  console.log(maxSelected);

  const flattenSeats = rows => {
    let seats = [];
    rows.forEach(row => {
      row.seats.forEach(seat => {
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
    const fetchSeatData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/events/${id}`);

        // console.log(response.data);
        setEventData(response.data);

        const sectorArray = response.data.theater.sectors.find(
          sector => sector.sectorName === sectorId
        );

        const pricesObj = response.data.ticketInfo.find(
          sector => sector.sector === sectorId
        );

        setPrices(pricesObj);

        // console.log(sectorArray);

        // Log the response to inspect structure
        const flatSeats = flattenSeats(sectorArray.rows);
        // console.log(flatSeats);
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

  // Updated handleSeatClick function to update the order sum
  const handleSeatClick = seat => {
    console.log(
      "length: " + selectedSeats.length,
      "maxSelected: " + maxSelected
    );
    if (seat.status === "free") {
      if (selectedSeats.some(el => el._id === seat._id)) {
        // If the seat is already selected, remove it
        const updatedSeats = selectedSeats.filter(
          selected => selected._id !== seat._id
        );
        setSelectedSeats(updatedSeats);

        // Increase the order sum dynamically when a seat is deselected
        // setOrder((prevOrder) => ({
        //     ...prevOrder,
        //     sum: prevOrder.sum + 1,
        // }));
        setSelected(prev => prev + 1);
      } else if (selectedSeats.length < maxSelected) {
        // If the seat is not selected and max is not reached, add it
        const updatedSeats = [...selectedSeats, seat];
        setSelectedSeats(updatedSeats);

        // Decrease the order sum dynamically when a seat is selected
        // setOrder((prevOrder) => ({
        //     ...prevOrder,
        //     sum: prevOrder.sum - 1,
        // }));
        setSelected(prev => prev - 1);
      }
    }
  };

  const handleClick = async () => {
    // Calculate total amount
    let total =
      order.normal * prices.normal +
      order.discounted * prices.discounted +
      order.senior * prices.senior;

    setOrder(prev => ({ ...prev, total: total }));
    setOrderSteps(4);
    checkOutHandle();
  };

  return (
    <>
      <h2 className="choose-tickets-h2">Wybierz miejsce</h2>
      <section className="seat-map-cont">
        <section className="seat-map-content">
          <p className="seat-map-stage">SCENA</p>
          <form className="seat-map" style={localStyle}>
            {isLoading
              ? "Loading..."
              : seatsData.map((seat, i) => {
                  return (
                    <div
                      key={seat._id} // Use _id as the unique key for each seat
                      className={`seat ${
                        selectedSeats.some(el => el._id === seat._id)
                          ? "selected"
                          : ""
                      } ${seat.status === "reserved" ? "reserved" : "free"}`}
                      onClick={() => {
                        handleSeatClick(seat);
                        console.log(selectedSeats);
                      }}
                    >
                      <span>{seatsData[i].seatNumber}</span>
                      <FontAwesomeIcon icon={faCouch} className="seat-icon" />
                    </div>
                  );
                })}
          </form>
        </section>
        <section className="summary-cont">
          <span className="summary-legend">
            <p className="summary-legend-info">
              <FontAwesomeIcon icon={faCouch} style={{ color: "#4caf50" }} />{" "}
              Wolne
            </p>

            <p className="summary-legend-info">
              <FontAwesomeIcon icon={faCouch} style={{ color: "#000" }} />{" "}
              Wybrane
            </p>
            <p className="summary-legend-info">
              <FontAwesomeIcon icon={faCouch} style={{ color: "#838f97" }} />{" "}
              Zajęte
            </p>
          </span>
          <div className="summary">
            <span className="summary-btn-cont">
              <button
                onClick={() => {
                  console.log("seatmap back");
                  setSelectedSeats([]);
                  setOrderSteps(2);
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} />
                WRÓĆ
              </button>
              <button
                disabled={selected !== 0} // Disable the button if no seats are selected
                onClick={handleClick}
              >
                DALEJ
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </span>
            <h2>Wybierz jeszcze: {selected}</h2>
          </div>
        </section>
      </section>
    </>
  );
};

export default SeatMap;
