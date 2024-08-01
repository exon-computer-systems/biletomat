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
import { useNavigate } from "react-router-dom";

const SearchBarForm = ({ events, onSearch }) => {
  const [isSelected, setIsSelected] = useState("");
  const [height, setHeight] = useState(0);
  const nav = useNavigate();

  const [searchData, setSearchData] = useState({
    title: "",
    artists: "",
    date: "",
    city: "",
  });
  // const queryParamters = new URLSearchParams(window.location.search);
  // const title = queryParamters.get("title");
  // const date = queryParamters.get("date");
  // const city = queryParamters.get("city");

  // console.log(title, date, city);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch(searchData);
  };

  const handleChange = e => {
    setIsSelected(() => e.target.value);
    const { name, value } = e.target;
    const updatedSearchData = { ...searchData, [name]: value };

    setSearchData(updatedSearchData);
  };

  console.log(searchData);

  useEffect(() => {
    setHeight(isSelected.length > 0 ? 300 : 0);
  }, [isSelected]);

  return (
    <section className="search-wrapper">
      <form
        onChange={handleSubmit}
        // onSubmit={() => nav(`/${title}`)}
        className={`search-bar ${isSelected !== "" ? "active" : ""}`}
      >
        <div className="search-box search">
          <input
            type="text"
            placeholder="Wyszukaj"
            onChange={handleChange}
            value={searchData.title}
            name={"title"}
          />
          <span></span>
        </div>

        <div className="search-box date">
          <FontAwesomeIcon className="icons" icon={faCalendar} />
          <input
            type="text"
            placeholder="Data"
            onFocus={e => (e.target.type = "date")}
            onBlur={e => (e.target.type = "text")}
            onChange={handleChange}
            id="date"
            value={searchData.date}
            name="date"
          />
          <span></span>
        </div>
        <div className="search-box localization">
          <FontAwesomeIcon className="icons" icon={faLocationDot} />
          <select onChange={handleChange} value={searchData.city} name="city">
            <option name="poznan" id="">
              Poznań
            </option>
            <option name="poznan" id="">
              Bydgoszcz
            </option>
            <option name="poznan" id="">
              Toruń
            </option>
            <option name="poznan" id="">
              Warszawa
            </option>
          </select>
        </div>
        <div className="search-box search-btn-wrapper">
          <button type="submit">
            <FontAwesomeIcon className="icons" icon={faMagnifyingGlass} />
            Szukaj
          </button>
        </div>
        <AnimateHeight duration={500} height={height} id="expandable-search">
          <Searched events={events} />
        </AnimateHeight>
      </form>
    </section>
  );
};

export default SearchBarForm;
