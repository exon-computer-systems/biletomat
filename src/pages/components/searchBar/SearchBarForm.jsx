import "./SearchBar.css";
import {
  faMagnifyingGlass,
  faCalendar,
  faLocationDot,
  faMasksTheater,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";
import AnimateHeight from "react-animate-height";
import Searched from "./Searched";
import { useNavigate } from "react-router-dom";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const SearchBarForm = ({ events, onSearch }) => {
  const [isSelected, setIsSelected] = useState("");
  const [height, setHeight] = useState(0);
  const [showKeyboard, setShowKeyboard] = useState(false); // State for keyboard visibility
  const [keyboardInput, setKeyboardInput] = useState(""); // State to track keyboard input
  const nav = useNavigate();

  const handleKeyChange = input => {
    setKeyboardInput(input); // Update the state with virtual keyboard input
    setSearchData(prev => ({ ...prev, title: input }));
  };

  const handleKeyPress = button => {
    button === "{enter}" && setShowKeyboard(false);
  };

  const [searchData, setSearchData] = useState({
    title: "",
    artists: "",
    startDate: "",
    city: "",
  });

  const keyboardRef = useRef(null);

  console.log(events);
  console.log(searchData);

  const handleSearch = e => {
    e.preventDefault();
    setIsSelected(() => e.target.value);
    const { name, value } = e.target;
    const updatedSearchData = { ...searchData, [name]: value };
    console.log(updatedSearchData);
    setSearchData(updatedSearchData);
    onSearch(searchData);
  };

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const updatedSearchData = { ...searchData, [name]: value };
    console.log(updatedSearchData);
    setSearchData(updatedSearchData);
    onSearch(searchData);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (searchData.date && !dateRegex.test(searchData.date)) {
      alert("Niepoprawny format daty. Proszę użyć formatu YYYY-MM-DD.");
      return;
    }

    const filteredSearchData = Object.fromEntries(
      Object.entries(searchData).filter(([key, value]) => value !== "")
    );

    if (Object.keys(filteredSearchData).length >= 0) {
      const searchParams = new URLSearchParams(filteredSearchData).toString();
      nav(`/search-results?${searchParams}`);
    }
  };

  useEffect(() => {
    setHeight(isSelected.length > 0 ? "auto" : 0);
  }, [isSelected]);

  console.log("ss", isSelected);

  return (
    <section className="search-wrapper">
      <form
        onChange={handleChange}
        onSubmit={handleSubmit}
        className={`search-bar ${isSelected !== "" ? "active" : ""}`}
      >
        <div className="search-box search">
          <FontAwesomeIcon className="icons" icon={faMasksTheater} />
          <input
            type="text"
            placeholder="Wydarzenie"
            onChange={e => {
              const { value } = e.target;
              setKeyboardInput(value);
              setSearchData(prev => ({ ...prev, title: value }));
            }}
            value={keyboardInput}
            name="title"
            ref={keyboardRef}
            data-kioskboard-specialcharacters="true"
            data-kioskboard-type="keyboard"
            onFocus={() => setShowKeyboard(true)}
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
            value={searchData.startDate}
            name="startDate"
          />
          <span></span>
        </div>
        <div className="search-box localization">
          <FontAwesomeIcon className="icons" icon={faLocationDot} />
          <select value={searchData.city} name="city" onChange={handleChange}>
            <option hidden selected>
              Lokalizacja
            </option>
            <option value="Bydgoszcz">Bydgoszcz</option>
            <option value="Toruń">Toruń</option>
            <option value="Warszawa">Warszawa</option>
            <option value="Gdańsk">Gdańsk</option>
            <option value="Kraków">Kraków</option>
            <option value="Gdynia">Gdynia</option>
            <option value="Katowice">Katowice</option>
            <option value="Szczecin">Szczecin</option>
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
      {showKeyboard && (
        <Keyboard
          onChange={handleKeyChange}
          onKeyPress={handleKeyPress}
          inputName="title"
        />
      )}
    </section>
  );
};

export default SearchBarForm;
