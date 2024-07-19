import React from "react";
import "./Welcome.css";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons/faHandPointer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Welcome = () => {
  return (
    <section className="welcome">
      <div className="box">
        <div className="top">
          <h1 className="welcome-txt">Welcome!</h1>
        </div>
        <div className="center">
          <button className="welcome-btn">
            <FontAwesomeIcon icon={faHandPointer} className="hp-icon" />
          </button>
          <div className="tap-txt">tap here to continue</div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
