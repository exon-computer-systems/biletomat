import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import "./SearchResults.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const SearchResults = () => {
  const [eventResults, setEventResults] = useState([]);
  const location = useLocation();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(() => !isClicked);
  };

  const queryParams = new URLSearchParams(location.search);
  const searchParams = {
    title: queryParams.get("title") || "",
    artists: queryParams.get("artists") || "",
    date: queryParams.get("date") || "",
    city: queryParams.get("city") || "",
  };

  useEffect(() => {
    const queryResults = async () => {
      const response = await axios.get(`/events/search`, {
        params: searchParams,
      });
      setEventResults(response.data);
    };

    queryResults();
  }, [location.search]);

  return (
    <>
      <Navbar />
      <section className="search-results-container">
        <h2>
          Wyniki wyszukiwania dla: "
          {searchParams.title || searchParams.date || searchParams.city}"
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
              </section>{" "}
            </>
          ))
        ) : (
          <p>No results found</p>
        )}
      </section>
    </>
  );
};

export default SearchResults;
