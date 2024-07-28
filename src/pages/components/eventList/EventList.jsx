import React from "react";
import "./EventList.css";
import Event from "./Event";

const EventList = ({ events, isLoading }) => {
  return (
    <section className="e-list-wrap">
      <section className="e-list">
        <h2 className="e-list-title">Najblizsze wydarzenia</h2>
        <section className="e-list-events">
          {isLoading ? (
            <p>Loading events...</p>
          ) : (
            events.map((el, idx) => (
              <Event
                id={el.attributes.uid}
                key={el.idx}
                title={el.attributes.title}
                // desc={el.attributes.description}
                date={el.attributes.startDate}
                city={el.attributes.city}
                coverImage={el.attributes.coverLink}
                sale={el.attributes.sale}
                goingFast={el.attributes.goingFast}
              />
            ))
          )}
        </section>
      </section>
    </section>
  );
};

export default EventList;
