import {
  faCircle,
  faClock,
  faPercent,
  faHeart,
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
  //   eprDefault();
  //   setId(ecurrentTargetgetAttribute("data-value"));
  //   consolelog(getId);
  // };
  return (
    <>
      <section
        // key={}
        className="search-results-wrapper event-wrap"
        onClick={() => nav(`/event/${tid}`)}
      >
        <div className="result-img-cover">
          <img src={coverImage} alt={`${title} cover`} />
        </div>
        <section className="results-info">
          <div>
            <div className="title-favourite">
              <h2>{title}</h2>
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <p>
              {date} | {city}
            </p>
          </div>
          <button>Sprawdź bilet</button>
        </section>
      </section>
    </>
  );
};

export default Event;
