import React, { useCallback, useEffect, useReducer, useState } from "react";
import BookingForm from "./BookingForm";
import { initializeTimes, updateTimes } from "../times";

function BookingSlot({ time, selected, isBooked = false }) {
  return (
    <li
      role="option"
      aria-selected={selected}
      aria-disabled={isBooked || undefined}
    >
      {time} {isBooked ? "(booked)" : ""}
    </li>
  );
}

export default function Reservations({ onSubmit }) {
  const [form, setForm] = useState({
    date: "", // "YYYY-MM-DD"
    time: "", // start empty so required works
    numPersons: "",
    occasion: "",
  });

  const onChange = useCallback((name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  // times + dispatch live here
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  // refresh available times when the date string changes
  useEffect(() => {
    if (form.date) {
      const [y, m, d] = form.date.split("-").map(Number);
      dispatch({ type: "date_changed", date: new Date(y, m - 1, d) });
    }
  }, [form.date]);

  return (
    <section
      className="booking-container"
      aria-labelledby="avail-times-heading"
    >
      <h2 style={{ textAlign: "center" }}>Book Now</h2>
      <div className="columnar">
        <div className="flexone">
          <h3 id="avail-times-heading">Available slots</h3>
          <div className="slotslayout">
            <ul
              className="slots"
              role="listbox"
              aria-label="Available reservation times"
              aria-describedby="avail-times-help"
            >
              {availableTimes.map((t) => (
                <BookingSlot key={t} time={t} selected={form.time === t} />
              ))}
            </ul>
            <p id="avail-times-help" className="visually-hidden">
              This list shows available times. Choose your time in the Time
              select field below.
            </p>
          </div>
        </div>

        <div className="flexone">
          <BookingForm
            values={form}
            change={onChange}
            submit={onSubmit} // App.onSubmit(formData)
            times={availableTimes}
            dispatch={dispatch}
          />
        </div>
      </div>
    </section>
  );
}
