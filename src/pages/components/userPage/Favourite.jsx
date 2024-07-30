const Favourite = () => {
  return (
    <section className="tickets-wrapper">
      <div className="mytickets-header">
        <h1>Ulubione</h1>
      </div>
      <section className="tickets">
        <div className="ticket">
          <div className="ticket-wrapper">
            <div>
              <h3>bilet1</h3>
            </div>
            <div className="cta-ticket-btns">
              <button className="delete-favourite-btn">
                Usuń z ulubionych
              </button>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Favourite;
