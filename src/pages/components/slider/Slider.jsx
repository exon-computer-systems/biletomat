import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Slider = ({ events, isLoading }) => {
  const [width, setWidth] = useState(300);

  const ref = useRef(0);
  const intervalRef = useRef(null);

  const totalEvents = [...events, ...events, ...events]; // Clone events list

  const scrollBy = scrollOffset => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  const startScrolling = () => {
    intervalRef.current = setInterval(() => {
      scrollBy(width);
    }, 2000); // Adjust the interval time as needed (2000ms = 2s)
  };

  const stopScrolling = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startScrolling();
    return () => stopScrolling();
  }, [width]);

  return (
    <section
      className="slider-wrap"
      onMouseEnter={stopScrolling}
      onMouseLeave={startScrolling}
    >
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
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          totalEvents.map((el, i) => (
            <Card
              key={i}
              tid={el.tid}
              title={el.title}
              date={el.date}
              city={el.city}
              coverImage={el.coverImage}
              width={width}
            />
          ))
        )}
      </section>
    </section>
  );
};

export default Slider;
