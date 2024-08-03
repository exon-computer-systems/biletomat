import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faCalendar,
  faLocationDot,
  faAngleDown,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import "./EventPage.css";
import axios from "axios";
import PromoSlider from "../components/promoSlider/PromoSlider";
import OtherArtists from "../otherArtists/OtherArtistsList";
import NavBar from "../components/Navbar";
import useAuth from "../hooks/useAuth";
import LinkBack from "../components/LinkBack/LinkBack";

const EventPage = () => {
  const nav = useNavigate();
  const { auth } = useAuth();
  const { id } = useParams(); //  Getting id from url to render page based on clicked event
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const allowedRoles = [1984, 2150];

  // Fetching data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `https://biletomat-be.onrender.com/events/${id}`
      );

      setEvents(res.data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <>
      <NavBar />

      <section className="event-page-container">
        <LinkBack />
        <section className="section1-container">
          <section className="section1-wrapper">
            <div className="cover-buy-wrapper">
              <div className="cover-image">
                <img src={events.coverImage} />
              </div>
              <div className="title-descp">
                <div className="descp">
                  <h2>
                    Event {events.title}
                    {allowedRoles.some(i => auth?.roles?.includes(i)) && (
                      <button onClick={() => nav(`/edit-page/${id}`)}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                    )}
                  </h2>
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
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="date-icon"
                    />
                    <p className="city">{events.city}</p>
                  </div>
                </div>
                <div className="btns">
                  <button
                    className="buy-ticket"
                    onClick={() => nav(`/buy/${id}`)}
                  >
                    KUP BILET
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                  </button>
                  <button>
                    <FontAwesomeIcon icon={faShare} className="share-icon" />
                  </button>
                </div>
              </div>
            </div>
            <FontAwesomeIcon icon={faAngleDown} className="arrow-down-btn" />
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
