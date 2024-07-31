import "./EditPage.css";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const EditPage = () => {
  const { setAuth, auth } = useAuth();
  const nav = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  // const [isClicked, setIsClicked] = useState("");
  const [postPageData, setPostPageData] = useState({
    title: "",
    artists: "",
    tid: "",
    description: "",
    startDate: "",
    endDate: "",
    city: "",
    coverImage: "",
    eventType: "",
    adultTicket: "",
    kidTicket: "",
    vipTicket: "",
    totalSeats: "",
    availableSeats: "",
    sale: false,
    goingFast: true,
  });

  const handleInputChange = e => {
    const { name, value, type } = e.target;
    const inputValue = type === "number" ? Number(value) : value;
    setPostPageData(prev => ({ ...prev, [name]: inputValue }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        "/events",
        JSON.stringify(postPageData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth(prevAuth => ({
        ...prevAuth,
        ...postPageData,
        roles,
        accessToken,
      }));

      nav("/success"); // Navigate to a success page if needed
    } catch (err) {
      if (!err?.response) {
        console.error("No server response");
      } else if (err.response?.status === 400) {
        console.error(
          "Bad Request:",
          err.response?.data?.message || "Check your input data."
        );
      } else if (err.response?.status === 401) {
        console.error("Unauthorized");
      } else {
        console.error(
          "Submit failed:",
          err.response?.data?.message || "Unknown error."
        );
      }
    }
  };

  return (
    <section className="edit-page-container">
      <h1>Edytuj Post</h1>
      <section className="edit-page-wrapper">
        <form onSubmit={handleSubmit}>
          <h2 className="ogolne">Ogólne</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Tytuł Wydarzenia</label>
              <input
                type="text"
                name="title"
                id="title"
                value={postPageData.title}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="artists">Artysta/Artyści</label>
              <input
                type="text"
                name="artists"
                id="artists"
                value={postPageData.artists}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">Opis</label>
              <input
                type="text"
                name="description"
                id="description"
                value={postPageData.description}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tid">Title ID</label>
              <input
                type="text"
                name="tid"
                id="tid"
                value={postPageData.tid}
                placeholder="np. nazwa-nazwa"
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Rozpoczęcie Zdarzenia</label>
              <input
                type="text"
                name="startDate"
                id="startDate"
                value={postPageData.startDate}
                placeholder="YYYY-MM-DD"
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="endDate">Zakończenia Zdarzenia</label>
              <input
                type="text"
                name="endDate"
                id="endDate"
                placeholder="YYYY-MM-DD"
                value={postPageData.endDate}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">Miasto</label>
              <input
                type="text"
                name="city"
                id="city"
                value={postPageData.city}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="coverImage">Zdjęcie URL Zdarzenia</label>
              <input
                type="text"
                name="coverImage"
                id="coverImage"
                placeholder="https://example.com"
                value={postPageData.coverImage}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Rodzaj Eventu</label>
              <input
                type="text"
                name="eventType"
                id="eventType"
                value={postPageData.eventType}
                required
                onChange={handleInputChange}
              />
            </div>
          </div>
          <section className="edit-tickets">
            <div className="form-row">
              <h2>Bilety</h2>
              <div className="form-group">
                <label htmlFor="adultTicket">Bilet dla dorosłych</label>
                <input
                  type="number"
                  name="adultTicket"
                  id="adultTicket"
                  value={postPageData.adultTicket}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="kidTicket">Bilet dla dzieci</label>
                <input
                  type="number"
                  name="kidTicket"
                  id="kidTicket"
                  value={postPageData.kidTicket}
                  required
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="vipTicket">Bilet VIP</label>
                <input
                  type="number"
                  name="vipTicket"
                  id="vipTicket"
                  value={postPageData.vipTicket}
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="totalSeats">Ilość miejsc</label>
                <input
                  type="number"
                  name="totalSeats"
                  id="totalSeats"
                  value={postPageData.totalSeats}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="availableSeats">Dostępne miejsca</label>
                <input
                  type="number"
                  name="availableSeats"
                  id="availableSeats"
                  value={postPageData.availableSeats}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </section>
          <div className="edit-page-btn-container">
            <button
              className="save-btn edit-page-btn"
              type="submit"
              onClick={handleSubmit}
            >
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
