import React, { useEffect, useState } from "react";
import "./SectorMap.css";
import axios from "../../api/axios";
import SeatMap from "./SeatMap";

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

    return (
        <section className="smap-cont">
            <button onClick={() => setOrderSteps(1)} className="">
                cofnij
            </button>
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
            )}
        </section>
    );
};

export default SectorMap;
