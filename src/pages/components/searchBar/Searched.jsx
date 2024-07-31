const Searched = ({ events }) => {
  return (
    <>
      {events.map((event, index) => (
        <section className="searched-cards" key={index}>
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
