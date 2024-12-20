import {
  faMinus,
  faPlus,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BuyTicket.css";
import useAuth from "./hooks/useAuth";

const BuyTicket = ({
  event,
  order,
  setOrder,
  setOrderSteps,
  setActiveAuthPanel,
}) => {
  const [pricesRange, setPricesRange] = useState();
  const { auth } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    const initialValues = {
      normal: { min: Infinity, max: -Infinity },
      discounted: { min: Infinity, max: -Infinity },
      senior: { min: Infinity, max: -Infinity },
    };

    if (event?._id) {
      if (!event.seated) {
        const prices = {
          normal: { max: event.ticketInfo[0].normal },
          discounted: { max: event.ticketInfo[0].discounted },
          senior: { max: event.ticketInfo[0].senior },
        };

        setPricesRange(prices);
      } else {
        const prices = event.ticketInfo.reduce((acc, curr) => {
          acc.normal.min = Math.min(acc.normal.min, curr.normal);
          acc.normal.max = Math.max(acc.normal.max, curr.normal);
          acc.discounted.min = Math.min(acc.discounted.min, curr.discounted);
          acc.discounted.max = Math.max(acc.discounted.max, curr.discounted);
          acc.senior.min = Math.min(acc.senior.min, curr.senior);
          acc.senior.max = Math.max(acc.senior.max, curr.senior);
          return acc;
        }, initialValues);
        console.log(prices);
        setPricesRange(prices);
      }
    }
  }, [event]);

  const handleDecrease = ticketType => {
    setOrder(prev => ({
      ...prev,
      [ticketType]:
        prev[ticketType] > 0 ? prev[ticketType] - 1 : prev[ticketType],
    }));
  };

  const handleIncrease = ticketType => {
    setOrder(prev => ({
      ...prev,
      [ticketType]:
        prev[ticketType] < 10 ? prev[ticketType] + 1 : prev[ticketType],
    }));
  };

  useEffect(() => {
    setOrder(prevOrder => ({
      ...prevOrder,
      sum: prevOrder.normal + prevOrder.discounted + prevOrder.senior,
    }));
  }, [order.normal, order.discounted, order.senior]);

  const handleSubmit = () => {
    if (order.normal !== 0 || order.discounted !== 0 || order.senior !== 0)
      setOrderSteps(2);

    setOrder(prev => ({
      ...prev,
      total:
        event.ticketInfo[0].normal * prev.normal +
        event.ticketInfo[0].discounted * prev.discounted +
        event.ticketInfo[0].senior * prev.senior,
    }));
  };

  return (
    <>
      {pricesRange && (
        // <div className="wrapper">
        <>
          <h2 className="choose-tickets-h2">Wybierz bilety</h2>
          <section className="container">
            <section className="choice-boxes">
              <div className="choice-box">
                <div className="ticket-name">
                  <h2>Normalny</h2>
                </div>

                <span className="choice-box-range">
                  {event.seated
                    ? `${pricesRange.normal.min} - ${pricesRange.normal.max}`
                    : `${pricesRange.normal.max}`}{" "}
                  PLN
                </span>

                <div className="input">
                  <button
                    className="cta-btns"
                    onClick={() => handleDecrease("normal")}
                  >
                    <FontAwesomeIcon icon={faMinus} className="minus-btn" />
                  </button>
                  <span className="cta-quant">{order.normal}</span>
                  <button
                    className="cta-btns"
                    onClick={() => handleIncrease("normal")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="plus-btn" />
                  </button>
                </div>
              </div>
              <span className="divider"></span>
              <div className="choice-box">
                <div className="ticket-name">
                  <h2>Ulgowy</h2>
                </div>

                <span className="choice-box-range">
                  {event.seated
                    ? `${pricesRange.discounted.min} - ${pricesRange.discounted.max}`
                    : `${pricesRange.discounted.max}`}{" "}
                  PLN
                </span>

                <div className="input">
                  <button
                    className="cta-btns"
                    onClick={() => handleDecrease("discounted")}
                  >
                    <FontAwesomeIcon icon={faMinus} className="minus-btn" />
                  </button>
                  <span className="cta-quant">{order.discounted}</span>
                  <button
                    className="cta-btns"
                    onClick={() => handleIncrease("discounted")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="plus-btn" />
                  </button>
                </div>
              </div>
              <span className="divider"></span>
              <div className="choice-box">
                <div className="ticket-name">
                  <h2>Senior</h2>
                </div>

                <span className="choice-box-range">
                  {event.seated
                    ? `${pricesRange.senior.min} - ${pricesRange.senior.max}`
                    : `${pricesRange.senior.max}`}{" "}
                  PLN
                </span>

                <div className="input">
                  <button
                    className="cta-btns"
                    onClick={() => handleDecrease("senior")}
                  >
                    <FontAwesomeIcon icon={faMinus} className="minus-btn" />
                  </button>
                  <span className="cta-quant">{order.senior}</span>
                  <button
                    className="cta-btns"
                    onClick={() => handleIncrease("senior")}
                  >
                    <FontAwesomeIcon icon={faPlus} className="plus-btn" />
                  </button>
                </div>
              </div>
            </section>

            <div className="summary">
              <span className="summary-btn-cont">
                <button onClick={() => nav("/")}>
                  <FontAwesomeIcon icon={faAngleLeft} />
                  WRÓĆ
                </button>
                <button type="submit" onClick={handleSubmit}>
                  DALEJ
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </span>
              <h2>
                Łącznie <span>{order.sum}</span> biletów
              </h2>
            </div>
          </section>
        </>
        // </div>
      )}
    </>
  );
};

export default BuyTicket;

// const nav = useNavigate();
// const { id } = useParams();
// const { setAuth } = useAuth();
// const [order, setOrder] = useState({
//     normal: 0,
//     discounted: 0,
//     senior: 0,
// });
// const [priceRange, setPriceRange] = useState({});
// const [response, setResponse] = useState(false);
// const { auth } = useAuth();
// const [data, setData] = useState({
//     eventId: "",
//     userId: "",
//     tickets: {
//         adultTicket: 0,
//         kidTicket: 0,
//         vipTicket: 0,
//     },
// });

// const [confirmationData, setConfirmationData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     startDate: "",
//     ticketType: [],
//     price: 0,
// });

// const calculateTotal = () => {
//     return Object.values(order).reduce((sum, { price, quantity }) => {
//         return sum + price * quantity;
//     }, 0);
// };

// const total = calculateTotal();

// useEffect(() => {
//     const maxPrices = event?.ticketInfo?.reduce(
//         (acc, curr) => {
//             acc.normal = Math.max(acc.normal, curr.normal);
//             acc.discounted = Math.max(acc.discounted, curr.discounted);
//             acc.senior = Math.max(acc.senior, curr.senior);
//             return acc;
//         },
//         { normal: -Infinity, discounted: -Infinity, senior: -Infinity }
//     );

//     // Find minimum values
//     const minPrices = event?.ticketInfo?.reduce(
//         (acc, curr) => {
//             acc.normal = Math.min(acc.normal, curr.normal);
//             acc.discounted = Math.min(acc.discounted, curr.discounted);
//             acc.senior = Math.min(acc.senior, curr.senior);
//             return acc;
//         },
//         { normal: Infinity, discounted: Infinity, senior: Infinity }
//     );

//     console.log({ max: maxPrices, min: minPrices });
//     setPriceRange({ max: maxPrices, min: minPrices });
// }, [event]);

// useEffect(() => {
//     setData((prevData) => ({
//         ...prevData,
//         tickets: {
//             adultTicket: order.adultTicket.quantity,
//             kidTicket: order.kidTicket.quantity,
//             vipTicket: order.vipTicket.quantity,
//         },
//     }));

//     console.log(order);
// }, [order]);

// useEffect(() => {
//     setConfirmationData((prevData) => ({
//         ...prevData,
//         ticketType: data.tickets,
//         price: total,
//     }));
// }, [data, total]);

// const handleSubmitData = async (e) => {
//     e.preventDefault();
//     try {
//         const response = await axiosPrivate.post(
//             "/buy",
//             JSON.stringify(data),
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 withCredentials: true,
//             }
//         );

//         setAuth((prev) => ({
//             ...prev,
//             purchasedTickets: [...prev.purchasedTickets, response.data],
//         }));
//         if (response.status === 201) {
//             setResponse(true);
//             console.log(response.data);
//         } else {
//             console.error("Failed to submit data:", response.status);
//         }
//     } catch (err) {
//         console.error("Cannot post data: ", err);
//     }
// };

// useEffect(() => {
//     const fetchData = async () => {
//         try {
//             const response = await axios.get(
//                 `https://biletomat-be.onrender.com/events/${id}`
//             );
//             const event_id = response.data._id;
//             const { kidTicket, adultTicket, vipTicket } = response.data;
//             setConfirmationData({
//                 firstName: auth.firstName,
//                 lastName: auth.lastName,
//                 email: auth.email,
//                 startDate: response.data.startDate,
//                 ticketType: data.tickets,
//                 price: total,
//             });
//             setOrder({
//                 adultTicket: { price: adultTicket, quantity: 0 },
//                 kidTicket: { price: kidTicket, quantity: 0 },
//                 vipTicket: { price: vipTicket, quantity: 0 },
//             });
//             setData({
//                 eventId: event_id,
//                 userId: auth.id,
//                 tickets: {
//                     adultTicket: 0,
//                     kidTicket: 0,
//                     vipTicket: 0,
//                 },
//             });
//         } catch (error) {
//             console.error("Error fetching ticket data:", error);
//         }
//     };
//     fetchData();
// }, [id, auth.id]);

// const handleIncrease = (ticketType) => {
//     setOrder((prevOrder) => ({
//         ...prevOrder,
//         [ticketType]: {
//             ...prevOrder[ticketType],
//             quantity: prevOrder[ticketType].quantity + 1,
//         },
//     }));
// };

// const handleDecrease = (ticketType) => {
//     setOrder((prevOrder) => ({
//         ...prevOrder,
//         [ticketType]: {
//             ...prevOrder[ticketType],
//             quantity: Math.max(prevOrder[ticketType].quantity - 1, 0),
//         },
//     }));
// };
