import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faCalendar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import "./EventPage.css";
import axios from "axios";
import PromoSlider from "../components/promoSlider/PromoSlider";
import OtherArtists from "../otherArtists/OtherArtistsList";
import NavBar from "../components/Navbar";

const EventPage = () => {
  const { id } = useParams(); //  Getting id from url to render page based on clicked event
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `https://biletomat-strapi-backend.onrender.com/api/events/${id}`
      );
      console.log(res.data.data.attributes);
      setEvents(res.data.data.attributes);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />
      <section className="event-page-container">
        <section className="section1-container">
          <section className="section1-wrapper">
            <div className="cover-image">
              <img src={events.coverLink} />
            </div>
            <div className="title-descp">
              <div className="descp">
                <h2>Event {events.title}</h2>
              </div>
              <div className="date-place">
                <div className="place">
                  <FontAwesomeIcon icon={faCalendar} className="place-icon" />
                  <div className="place-info">
                    <p className="start-date">{events.startDate}</p>
                    <p className="hours">19:00 - 21:00</p>
                  </div>
                </div>
                <div className="date">
                  <FontAwesomeIcon icon={faLocationDot} className="date-icon" />
                  <p className="city">{events.city}</p>
                </div>
              </div>
              <div className="btns">
                <button className="buy-ticket">Kup bilet</button>
                <button>
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                </button>
                <button>
                  <FontAwesomeIcon icon={faShare} className="share-icon" />
                </button>
              </div>
            </div>
          </section>
        </section>
        <section className="section2-wrapper">
          <div className="other-tickets">
            <span></span>
            <h2>Pozostałe bilety</h2>
            <button>bilet warszawa</button>
            <button>bilet warszawa</button>
            <button>bilet warszawa</button>
            <button>bilet warszawa</button>
          </div>
        </section>
        <section className="section3-wrapper">
          <h2>Pozostali artyści</h2>
          <span></span>
          <OtherArtists />
        </section>
        <section className="section4-wrapper">
          <h2>Pozostałe wydarzenia</h2>
          <span></span>
          <PromoSlider />
        </section>
      </section>
    </>
  );
};

export default EventPage;
