import "./EditPage.css";

const EditPage = () => {
  return (
    <section className="edit-page-container">
      <h1>Edytuj Post</h1>
      <section className="edit-page-wrapper">
        <form>
          <h2 className="ogolne">Ogólne</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Tytuł Wydarzenia</label>
              <input type="text" name="title" id="title" />
            </div>
            <div className="form-group">
              <label htmlFor="artists">Artysta/Artyści</label>
              <input type="text" name="artists" id="artists" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="desc">Opis</label>
              <input type="text" name="desc" id="desc" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tid">Title ID</label>
              <input type="text" name="tid" id="tid" />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Rozpoczęcie Zdarzenia</label>
              <input type="text" name="startDate" id="startDate" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="endDate">Zakończenia Zdarzenia</label>
              <input type="text" name="endDate" id="endDate" />
            </div>
            <div className="form-group">
              <label htmlFor="city">Miasto</label>
              <input type="text" name="city" id="city" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="coverImage">Zdjęcie URL Zdarzenia</label>
              <input type="text" name="coverImage" id="coverImage" />
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Rodzaj Eventu</label>
              <input type="text" name="eventType" id="eventType" />
            </div>
          </div>
          <section className="edit-tickets">
            <h2>Bilety</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="adult-ticket">Bilet dla dorosłych</label>
                <input type="number" name="adult-ticket" id="adult-ticket" />
              </div>
              <div className="form-group">
                <label htmlFor="kid-ticket">Bilet dla dzieci</label>
                <input type="number" name="kid-ticket" id="kid-ticket" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vip-ticket">Bilet VIP</label>
                <input type="number" name="vip-ticket" id="vip-ticket" />
              </div>
              <div className="form-group">
                <label htmlFor="availableSeats">Dostępne miejsca</label>
                <input
                  type="number"
                  name="availableSeats"
                  id="availableSeats"
                />
              </div>
            </div>
          </section>
          <div className="edit-page-btn-container">
            <button className="save-btn edit-page-btn" type="submit">
              Zapisz
            </button>
            <button className="delete-btn edit-page-btn" type="submit">
              Usuń post
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default EditPage;
