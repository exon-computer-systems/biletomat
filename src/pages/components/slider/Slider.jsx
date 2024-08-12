import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Slider = ({ events, isLoading }) => {
  const [width, setWidth] = useState(300);
  const ref = useRef(null);
  const intervalRef = useRef(null);

  const totalEvents = [...events, ...events];

  const scrollBy = scrollOffset => {
    if (ref.current) {
      ref.current.scrollLeft += scrollOffset;
    }
  };

  const startScrolling = () => {
    intervalRef.current = setInterval(() => {
      if (ref.current) {
        scrollBy(width);

        if (ref.current.scrollLeft >= ref.current.scrollWidth / 2) {
          ref.current.scrollLeft = 0;
        }
      }
    }, 2000);
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
