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
                id={el.id}
                tid={el.tid}
                key={idx}
                title={el.title}
                date={el.startDate}
                city={el.city}
                coverImage={el.coverImage}
                sale={el.sale}
                goingFast={el.goingFast}
              />
            ))
          )}
        </section>
      </section>
    </section>
  );
};

export default EventList;
