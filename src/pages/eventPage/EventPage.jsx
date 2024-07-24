import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShare } from "@fortawesome/free-solid-svg-icons";
import "./EventPage.css";
import axios from "axios";
import PromoSlider from "../components/promoSlider/PromoSlider";
import OtherArtists from "../otherArtists/OtherArtistsList";

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
    <section className="event-page-container">
      <h1>{events.title}</h1>
      <section className="section1-wrapper">
        <div className="cover-image">
          <img src={events.coverLink} />
        </div>
        <div className="title-descp">
          <div className="descp">
            <h2>Opis</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              lacinia magna fringilla augue dictum, ac laoreet ligula fermentum.
              Suspendisse sed nisi consequat nunc commodo pharetra in sit amet
              felis. Donec aliquet ante id augue tincidunt tempus. Quisque vel
              auctor quam. Aenean velit mi, pretium a magna vitae, condimentum
              gravida ipsum. Nunc quis ligula id erat imperdiet dapibus quis non
              urna.
            </p>
          </div>
          <div className="btns">
            <button className="buy-ticket">Kup bilet</button>
            <button>
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button>
              <FontAwesomeIcon icon={faShare} />
            </button>
          </div>
        </div>
      </section>
      <section className="section2-wrapper">
        <div className="section2-info">
          <div className="date-place">
            <h3>{events.startDate}</h3>
            <p>{events.city}</p>
          </div>
          <div className="event-table-contents">
            <span></span>
            <ul>
              <li>Bilety</li>
              <li>Opis wydarzenia</li>
              <li>Lokalizacja</li>
            </ul>
          </div>
        </div>
        <div className="other-tickets">
          <span></span>
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
  );
};

export default EventPage;
