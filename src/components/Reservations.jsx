// src/components/Reservations.jsx
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
    time: "", // keep empty until user selects (or we auto-fill)
    numPersons: "",
    occasion: "",
  });

  const change = useCallback((name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  // When date changes, ask API for new times
  useEffect(() => {
    if (!form.date) return;
    const [y, m, d] = form.date.split("-").map(Number);
    dispatch({ type: "date_changed", date: new Date(y, m - 1, d) });
  }, [form.date]);

  // Strategy A (recommended): auto-select first available time when list updates
  useEffect(() => {
    if (availableTimes.length === 0) return;
    // If current `time` is not in the new list, pick the first
    if (!form.time || !availableTimes.includes(form.time)) {
      setForm((f) => ({ ...f, time: availableTimes[0] })); // ONLY touch `time`
    }
  }, [availableTimes, form.time]);

  // If you prefer to FORCE the user to reselect, replace the effect above with:
  // useEffect(() => {
  //   if (form.time && !availableTimes.includes(form.time)) {
  //     setForm((f) => ({ ...f, time: "" }));
  //   }
  // }, [availableTimes, form.time]);

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
            change={change}
            submit={onSubmit} // App.onSubmit(formData)
            times={availableTimes}
            dispatch={dispatch}
          />
        </div>
      </div>
    </section>
  );
}
