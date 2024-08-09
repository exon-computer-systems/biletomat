import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import "./SearchResults.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import SearchBar from "../components/searchBar/SearchBar";

const SearchResults = () => {
  const [eventResults, setEventResults] = useState([]);
  const location = useLocation();
  const nav = useNavigate();

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
      setEventResults(response.data);
    };

    queryResults();
  }, [location.search]);

  return (
    <>
      <Navbar />
      <section className="search-results-container">
        <SearchBar />
        <h2 className="results-query">
          Wyniki wyszukiwania dla: "
          {searchParams.title || searchParams.startDate || searchParams.city}"
        </h2>

        {eventResults.length > 0 ? (
          eventResults.map((event, i) => (
            <section
              key={i}
              className="search-results-wrapper"
              onClick={() => nav(`/event/${event.tid}`)}
            >
              <div className="result-img-cover">
                <img src={event.coverImage} alt={`${event.title} cover`} />
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
          ))
        ) : (
          <p>Nie znaleziono wyników</p>
        )}
      </section>
    </>
  );
};

export default SearchResults;
