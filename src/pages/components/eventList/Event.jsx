import {
  faCircle,
  faClock,
  faPercent,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navigate, useNavigate } from "react-router-dom";

import React, { useState } from "react";

const Event = ({
  id,
  tid,
  title,
  desc,
  date,
  city,
  coverImage,
  sale,
  goingFast,
}) => {
  // const [getId, setId] = useState("");
  const nav = useNavigate();
  // const handleNavigation = e => {
  //   e.preventDefault();
  //   setId(e.currentTarget.getAttribute("data-value"));
  //   console.log(getId);
  // };
  return (
    <>
      <section
        className="event-wrap"
        data-value={tid}
        onClick={() => nav(`/event/${tid}`)}
      >
        <section className="event-cover-wrapper">
          <img src={coverImage} alt="event cover" className="event-cover" />
        </section>
        <section className="event">
          <section className="event-tags">
            {goingFast && (
              <section className="event-special going-fast">
                <FontAwesomeIcon icon={faClock} />
                <span>OSTATNIE</span>
              </section>
            )}

            {sale && (
              <section className="event-special sale">
                <FontAwesomeIcon icon={faPercent} />
                <span>TANIEJ</span>
              </section>
            )}
          </section>
          <section className="event-titles">
            <div>
              <h3 className="event-title">{title}</h3>

              <p className="event-info">
                <span className="event-date">{date}</span>
                <FontAwesomeIcon className="event-sep" icon={faCircle} />
                <span className="event-date">{city}</span>
              </p>
            </div>
            <button className="check-btn">Sprawdź</button>
          </section>
          <p className="event-desc">{desc}</p>
        </section>
      </section>
    </>
  );
};

export default Event;
