import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fullHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

const Event = ({
    id,
    tid,
    title,
    date,
    city,
    coverImage,
    sale,
    goingFast,
    isFavorite,
    toggleFavorite,
}) => {
    const nav = useNavigate();

    return (
        <section
            className="search-results-wrapper event-wrap"
            // onClick={() => nav(`/event/${tid}`)}
        >
            <div className="result-img-cover">
                <img src={coverImage} alt={`${title} cover`} />
            </div>
            <section className="results-info">
                <div>
                    <div className="title-favourite">
                        <h2>{title}</h2>
                        <FontAwesomeIcon
                            icon={isFavorite ? fullHeart : emptyHeart}
                            className="heart-icon"
                            onClick={e => {
                                e.stopPropagation(); // Prevent navigation on icon click
                                toggleFavorite();
                            }}
                        />
                    </div>
                    <p>
                        {date} | {city}
                    </p>
                </div>
                <button onClick={() => nav(`/event/${tid}`)}>Kup bilet</button>
            </section>
        </section>
    );
};

export default Event;
