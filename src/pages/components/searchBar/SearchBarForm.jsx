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

  const handleSubmit = e => {
    e.preventDefault();
    const searchParams = new URLSearchParams(searchData).toString();
    nav(`/search-results?${searchParams}`);
  };

  const handleChange = e => {
    setIsSelected(() => e.target.value);
    const { name, value } = e.target;
    const updatedSearchData = { ...searchData, [name]: value };
    setSearchData(updatedSearchData);
    onSearch(searchData);
  };


    useEffect(() => {
        setHeight(isSelected.length > 0 ? "auto" : 0);
    }, [isSelected]);


  return (
    <section className="search-wrapper">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className={`search-bar ${isSelected !== "" ? "active" : ""}`}
      >
        <div className="search-box search">
          <input
            type="text"
            placeholder="Wyszukaj"
            onChange={handleChange}
            value={searchData.title}
            name="title"
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
            value={searchData.date}
            name="date"
          />
          <span></span>
        </div>
        <div className="search-box localization">
          <FontAwesomeIcon className="icons" icon={faLocationDot} />
          <select onChange={handleChange} value={searchData.city} name="city">
            <option value=""></option>
            <option value="Poznań">Poznań</option>
            <option value="Bydgoszcz">Bydgoszcz</option>
            <option value="Toruń">Toruń</option>
            <option value="Warszawa">Warszawa</option>
          </select>
        </div>
        <div className="search-box search-btn-wrapper">
          <button onSubmit={handleSubmit} type="submit">
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
