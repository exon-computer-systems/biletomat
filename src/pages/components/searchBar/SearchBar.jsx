import SearchBarForm from "./SearchBarForm";
import axios from "../../api/axios";
import { useEffect, useState } from "react";

const SearchBar = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    title: "",
    startDate: "",
    artist: "",
    city: "",
  });

  useEffect(() => {
    const fetchData = async params => {
      try {
        const response = await axios.get(`/events/search`, { params });
        setEvents(response.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching events");
        setEvents([]);
      }
    };
    // if (Object.values(searchParams).every(x => x !== ""))
    fetchData(searchParams);
  }, [searchParams]);

  const handleSearch = params => {
    setSearchParams(params);
  };

  return (
    <>
      <SearchBarForm onSearch={handleSearch} events={events} />
    </>
  );
};

export default SearchBar;
