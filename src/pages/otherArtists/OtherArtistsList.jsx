import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Artists from "./Artists";
import "./OtherArtistsList.css";

const OtherArtists = () => {
  const [getArtist, setGetArtist] = useState([]); // putting array of artist in state
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(400);

  const ref = useRef(0);

  const scrollBy = scrollOffset => {
    ref.current.scrollLeft += scrollOffset;
  };

  //   Fetching artist and covers from api
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await axios.get(
        `https://biletomat-strapi-backend.onrender.com/api/events`
      );

      setGetArtist(res.data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  return (
    <section className="artist-slider-wrap">
      <button
        className="slider-btn slider-btn-left"
        onClick={() => scrollBy(-width)}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <button
        className="slider-btn slider-btn-right"
        onClick={() => scrollBy(width)}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
      <section className="artist-slider">
        {isLoading ? (
          <p>Loading artists...</p>
        ) : (
          getArtist.map((e, i) => (
            <Artists
              key={i}
              cover={e.attributes.coverLink}
              name={e.attributes.title}
              width={width}
            />
          ))
        )}
      </section>
    </section>
  );
};

export default OtherArtists;
