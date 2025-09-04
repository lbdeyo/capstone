import { useCallback, useState } from "react";
import BookingForm from "./BookingForm";
import React from "react";
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

export default function Reservations({ availableTimes, dispatch }) {
  const [form, setForm] = useState({
    date: "",
    time: "17:00",
    numPersons: "",
    occasion: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // This message will be read by screen readers via aria-live in BookingForm
    setForm((f) => ({ ...f, submittedMessage: "Reservation submitted." }));
  };

  const onChange = useCallback((name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  return (
    <section
      className="booking-container"
      aria-labelledby="avail-times-heading"
    >
      <h2 style={{ textAlign: "center" }}>Book Now</h2>
      <h3 id="avail-times-heading">Available slots</h3>

      {/* Read-only list with ARIA semantics */}
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
        This list shows available times. Choose your time in the Time select
        field below.
      </p>

      <BookingForm
        values={form}
        change={onChange}
        submit={onSubmit}
        times={availableTimes}
        dispatch={dispatch}
      />
    </section>
  );
}
