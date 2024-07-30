import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const data = [
  {
    name: "bilet1",
    buyDate: "2024-07-12",
  },
  {
    name: "bilet2",
    buyDate: "2024-07-12",
  },
  {
    name: "bilet3",
    buyDate: "2024-07-12",
  },
];

const MyTickets = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(() => !isClicked);
  };
  return (
    <section className="tickets-wrapper">
      <div className="mytickets-header">
        <h1>Moje Bilety</h1>
      </div>
      <section className="tickets">
        {data.map((el, i) => {
          return (
            <div className="ticket">
              <div className="ticket-wrapper">
                <div>
                  <h3>{el.name}</h3>
                  <p>{el.buyDate}</p>
                </div>
                <div className="cta-ticket-btns">
                  <button className="download-btn">
                    <a href="bilet.pdf" download>
                      Pobierz
                    </a>
                  </button>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className="angle-down-btn"
                    onClick={handleClick}
                  />
                </div>
              </div>
              {isClicked && <div className="qr-code">QR CODE</div>}
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default MyTickets;
