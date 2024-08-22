import React, { useEffect, useState } from "react";
import "./SectorMap.css";
import axios from "../../api/axios";
import SeatMap from "./SeatMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SectorMap = ({
  event,
  selectedSeats,
  setSelectedSeats,
  checkOutHandle,
  maxSelected,
  setOrderSteps,
  order,
  setOrder,
}) => {
  const [sector, setSector] = useState("");
  const [seatGridSize, setSeatGridSize] = useState({
    rows: 0,
    cols: 0,
  });

  console.log(event);

  return (
    <>
      {sector ? (
        <h2 className="choose-tickets-h2">Wybierz miejsce</h2>
      ) : (
        <h2 className="choose-tickets-h2">Wybierz sektor</h2>
      )}
      <section className="smap-cont">
        <section className="sector-heading">
          <button onClick={() => setOrderSteps(1)} className="smap-btn">
            <FontAwesomeIcon icon={faArrowLeft} />
            Cofnij
          </button>
        </section>
        {sector ? (
          <SeatMap
            order={order}
            setOrder={setOrder}
            sectorId={sector}
            rows={seatGridSize.rows}
            cols={seatGridSize.cols}
            maxSelected={maxSelected}
            event={event}
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            checkOutHandle={checkOutHandle}
            setOrderSteps={setOrderSteps}
          />
        ) : (
          <>
            <section className="smap">
              <button
                onClick={() => {
                  setSector("A");
                  setSeatGridSize({
                    rows: 5,
                    cols: 10,
                  });
                }}
                className="smap-sector1 smap-sector"
              >
                A
              </button>
              <button
                onClick={() => {
                  setSector("B");
                  setSeatGridSize({
                    rows: 8,
                    cols: 10,
                  });
                }}
                className="smap-sector2 smap-sector"
              >
                B
              </button>
              <button
                onClick={() => {
                  setSector("C");
                  setSeatGridSize({
                    rows: 13,
                    cols: 8,
                  });
                }}
                className="smap-sector3 smap-sector"
              >
                C
              </button>
              <button
                onClick={() => {
                  setSector("D");
                  setSeatGridSize({
                    rows: 13,
                    cols: 8,
                  });
                }}
                className="smap-sector4 smap-sector"
              >
                D
              </button>
              <button
                onClick={() => {
                  setSector("E");
                  setSeatGridSize({
                    rows: 8,
                    cols: 26,
                  });
                }}
                className="smap-sector5 smap-sector"
              >
                E
              </button>
            </section>
            <section className="smap-info">
              {event.ticketInfo.map((el, idx) => (
                <>
                  <section key={idx} className="smap-info-text">
                    <span
                      className={`smap-info-color smap-color-${idx}`}
                    ></span>
                    <p>Normalny - {el.normal}</p>
                    <p>Ulgowy - {el.discounted}</p>
                    <p>Senior - {el.senior}</p>
                  </section>
                  {idx < 4 && <hr />}
                </>
              ))}
            </section>
          </>
        )}
      </section>
    </>
  );
};

export default SectorMap;
