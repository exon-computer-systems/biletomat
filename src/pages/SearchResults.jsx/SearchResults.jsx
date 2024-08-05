import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import "./SearchResults.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const SearchResults = () => {
  const [eventResults, setEventResults] = useState([]);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);
  const nav = useNavigate();
  const [eventId, setEventId] = useState("");

  const handleClick = () => {
    setIsClicked(() => !isClicked);
  };

  const queryParams = new URLSearchParams(location.search);
  const searchParams = {
    title: queryParams.get("title") || "",
    artists: queryParams.get("artists") || "",
    startDate: queryParams.get("startDate") || "",
    city: queryParams.get("city") || "",
  };

  useEffect(() => {
    const queryResults = async () => {
      const response = await axios.get(`/events/search`, {
        params: searchParams,
      });
      console.log(response.data);
      setEventResults(response.data);
    };

    queryResults();
  }, [location.search]);

  return (
    <>
      <Navbar />
      <section className="search-results-container">
        <h2 className="results-query">
          Wyniki wyszukiwania dla: "
          {searchParams.title || searchParams.starDate || searchParams.city}"
        </h2>
        {eventResults.length > 0 ? (
          eventResults.map((event, i) => (
            <>
              <section key={i} className="search-results-wrapper">
                <div className="result-img-cover">
                  <img src={event.coverImage} />
                </div>
                <section className="results-info">
                  <div>
                    <div className="title-favourite">
                      <h2>{event.title}</h2>
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    <p>
                      {event.startDate} | {event.city}
                    </p>
                  </div>
                  <button>Sprawdź bilet</button>
                </section>
              </section>
            </>
          ))
        ) : (
          <p>Nie znaleziono wyników</p>
        )}
      </section>
    </>
  );
};

export default SearchResults;
