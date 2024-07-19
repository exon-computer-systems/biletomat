import "./SearchBar.css";
import {
  faMagnifyingGlass,
  faCalendar,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => {
  return (
    <section className="search-wrapper">
      <section className="search-bar">
        <div className="search-box search">
          <FontAwesomeIcon className="icons" icon={faMagnifyingGlass} />
          <input type="text" placeholder="Wyszukaj" />
        </div>

        <div className="search-box date">
          <FontAwesomeIcon className="icons" icon={faCalendar} />
          <input
            type="text"
            placeholder="Data"
            onFocus={e => (e.target.type = "date")}
            onBlur={e => (e.target.type = "text")}
            id="date"
          />
        </div>
        <div className="search-box localization">
          <FontAwesomeIcon className="icons" icon={faLocationDot} />
          <select value="">
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
      </section>
    </section>
  );
};

export default SearchBar;
