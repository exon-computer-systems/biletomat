import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "./LinkBack.css";

const LinkBack = () => {
  return (
    <Link to="/" className="back-icon">
      <FontAwesomeIcon icon={faAngleLeft} />
      <h2>Wróć</h2>
    </Link>
  );
};

export default LinkBack;
