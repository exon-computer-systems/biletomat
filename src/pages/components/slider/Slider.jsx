import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Slider = () => {
    const [width, setWidth] = useState(300);
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    const ref = useRef(0);

    const scrollBy = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const events = await fetch(data);
    //         const json = await events.json();

    //         console.log(json);
    //     };

    //     fetchData();
    // }, []);

    // console.log(data);

    return (
        <section className="slider-wrap">
            <button
                className="slider-btn slider-btn-left"
                onClick={() => scrollBy(-width)}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <button
                className="slider-btn slider-btn-right"
                onClick={() => scrollBy(width)}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </button>
            <section className="slider" ref={ref}>
                <Card width={width} />
                <Card width={width} />
                <Card width={width} />
                <Card width={width} />
                <Card width={width} />
                <Card width={width} />
                <Card width={width} />
                <Card width={width} />
            </section>
        </section>
    );
};

export default Slider;
