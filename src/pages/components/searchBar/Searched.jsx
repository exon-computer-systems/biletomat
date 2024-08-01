import { useNavigate } from "react-router-dom";

const Searched = ({ events }) => {
  const nav = useNavigate();

  return (
    <>
      {events.map((event, index) => (
        <section
          className="searched-cards"
          key={index}
          onClick={() => nav(`/event/${event.tid}`)}
        >
          <img src={event.coverImage} alt="" />
          <section className="wrapper-desc">
            <h1>{event.title}</h1>
            <p>{`${event.startDate} | ${event.city}`}</p>
          </section>
        </section>
      ))}
    </>
  );
};

export default Searched;
