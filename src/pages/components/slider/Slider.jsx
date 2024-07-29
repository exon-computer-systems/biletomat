import React, { useEffect, useRef, useState } from "react";
import "./Slider.css";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Slider = ({ events, isLoading }) => {
  const [width, setWidth] = useState(300);

  const ref = useRef(0);

  const scrollBy = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  };

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
        {/* {data
                    // ?.filter((el, idx) => idx < 5)
                    .map((el, idx) => {
                        return (
                            <Card
                                key={idx}
                                title={el.artist}
                                date={el.date}
                                city={el.city}
                                coverImage={el.coverImage}
                                width={width}
                            />
                        );
                    })} */}

        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          events.map((el, i) => (
            <Card
              key={i}
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
