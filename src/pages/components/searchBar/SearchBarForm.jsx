import "./SearchBar.css";
import {
    faMagnifyingGlass,
    faCalendar,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import Searched from "./Searched";

const SearchBarForm = ({ events, onSearch }) => {
    const [isSelected, setIsSelected] = useState("");
    const [height, setHeight] = useState(0);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [artitst, setArtists] = useState("");
    const [city, setCity] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ title, date, artitst, city });
    };

    const handleChange = (e) => {
        setIsSelected(() => e.target.value);
        setTitle(e.target.value);
        // setDate(e.target.value);
        // setArtists(e.target.value);
        // setCity(e.target.value);

        console.log(title);

        console.log(height);
    };

    useEffect(() => {
        setHeight(isSelected.length > 0 ? "auto" : 0);
    }, [isSelected]);

    return (
        <section className="search-wrapper">
            <form
                onChange={handleSubmit}
                className={`search-bar ${isSelected !== "" ? "active" : ""}`}
            >
                <div className="search-box search">
                    <input
                        type="text"
                        placeholder="Wyszukaj"
                        onChange={handleChange}
                        value={title}
                    />
                    <span></span>
                </div>

                <div className="search-box date">
                    <FontAwesomeIcon className="icons" icon={faCalendar} />
                    <input
                        type="text"
                        placeholder="Data"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        id="date"
                    />
                    <span></span>
                </div>
                <div className="search-box localization">
                    <FontAwesomeIcon className="icons" icon={faLocationDot} />
                    <select required>
                        <option name="poznan" id="" value={1}>
                            Poznań
                        </option>
                        <option name="poznan" id="" value={2}>
                            Bydgoszcz
                        </option>
                        <option name="poznan" id="" value={3}>
                            Toruń
                        </option>
                        <option name="poznan" id="" value={4}>
                            Warszawa
                        </option>
                    </select>
                </div>
                <div className="search-box search-btn-wrapper">
                    <button type="submit">
                        <FontAwesomeIcon
                            className="icons"
                            icon={faMagnifyingGlass}
                        />
                        Szukaj
                    </button>
                </div>
                <AnimateHeight
                    duration={500}
                    height={height}
                    id="expandable-search"
                >
                    <Searched events={events} />
                </AnimateHeight>
            </form>
        </section>
    );
};

export default SearchBarForm;
