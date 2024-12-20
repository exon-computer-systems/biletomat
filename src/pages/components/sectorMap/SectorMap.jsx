import React, { useEffect, useState } from "react";
import "./SectorMap.css";
import axios from "../../api/axios";
import SeatMap from "./SeatMap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const SectorMap = ({
  event,
  selectedSeats,
  setSelectedSeats,
  checkOutHandle,
  maxSelected,
  orderSteps,
  setOrderSteps,
  order,
  setOrder,
  setSeatGridSize,
  sector,
  setSector,
}) => {
  // const [showSeatMap, setShowSeatMap] = useState(false);

  console.log(event);

  return (
    <>
      <h2 className="choose-tickets-h2">Wybierz sektor</h2>

      <section className="smap-cont">
        <section className="smap">
          <button
            onClick={() => {
              setSector("A");
              setSeatGridSize({
                rows: 5,
                cols: 10,
              });
            }}
            className={`smap-sector1 smap-sector ${
              sector === "A" ? "smap-sector-selected" : ""
            }`}
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
            className={`smap-sector2 smap-sector ${
              sector === "B" ? "smap-sector-selected" : ""
            }`}
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
            className={`smap-sector3 smap-sector ${
              sector === "C" ? "smap-sector-selected" : ""
            }`}
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
            className={`smap-sector4 smap-sector ${
              sector === "D" ? "smap-sector-selected" : ""
            }`}
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
            className={`smap-sector5 smap-sector ${
              sector === "E" ? "smap-sector-selected" : ""
            }`}
          >
            E
          </button>
        </section>
        <section className="smap-info">
          {event.ticketInfo.map((el, idx) => (
            <>
              <section key={idx} className="smap-info-text">
                <span className={`smap-info-color smap-color-${idx}`}></span>
                <p>Normalny - {el.normal}</p>
                <p>Ulgowy - {el.discounted}</p>
                <p>Senior - {el.senior}</p>
              </section>
              {idx < 4 && <hr />}
            </>
          ))}
        </section>
        {/* <section className="summary-cont"> */}
        <div className="summary">
          <span className="summary-btn-cont">
            <button onClick={() => setOrderSteps(1)}>
              <FontAwesomeIcon icon={faAngleLeft} />
              WRÓĆ
            </button>
            <button
              type="submit"
              disabled={!sector}
              onClick={() => {
                if (sector) {
                  setOrderSteps(3);
                }
              }}
            >
              DALEJ
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </span>
          <h2>
            Łącznie <span>{order.sum}</span> biletów
          </h2>
        </div>
        {/* </section> */}
      </section>
    </>
  );
};

export default SectorMap;
