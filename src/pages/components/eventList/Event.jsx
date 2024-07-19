import { faCircle, faBolt, faBurst } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";

const Event = ({ title, desc, date, city, coverImage, sale, goingFast }) => {
    return (
        <section className="event-wrap">
            <section className="event-cover-wrapper">
                <img
                    src={coverImage}
                    alt="event cover"
                    className="event-cover"
                />
            </section>
            <section className="event">
                <section className="event-titles">
                    <h3 className="event-title">{title}</h3>

                    <p className="event-info">
                        <span className="event-date">{date}</span>
                        <FontAwesomeIcon
                            className="event-sep"
                            icon={faCircle}
                        />
                        <span className="event-date">{city}</span>
                    </p>
                </section>
                <p className="event-desc">{desc}</p>
            </section>
            <section className="event-tags">
                {goingFast && (
                    <section className="event-special going-fast">
                        <FontAwesomeIcon icon={faBolt} />
                        <span>Ostatnie bilety</span>
                    </section>
                )}

                {sale && (
                    <section className="event-special sale">
                        <FontAwesomeIcon icon={faBurst} />
                        <span>Promocja</span>
                    </section>
                )}
            </section>
        </section>
    );
};

export default Event;
