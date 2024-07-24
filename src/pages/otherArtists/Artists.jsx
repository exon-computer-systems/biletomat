import { width } from "@fortawesome/free-solid-svg-icons/fa0";

const Artists = ({ cover, name }) => {
  const localStyle = {
    width: width,
  };
  return (
    <section className="slider-container">
      <div className="artist-card" style={localStyle}>
        <img src={cover} className="artist-card-cover" />
      </div>
      <h2>{name}</h2>
    </section>
  );
};

export default Artists;
