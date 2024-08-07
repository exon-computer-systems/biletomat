import React, { useState } from "react";
import { Calendar } from "primereact/calendar";
import "./SearchBar.css";

export default function RangeDemo() {
  const [dates, setDates] = useState(null);

  return (
    <div className="date-form">
      <Calendar
        value={dates}
        onChange={e => setDates(e.value)}
        selectionMode="range"
        readOnlyInput
        hideOnRangeSelection
      />
    </div>
  );
}
