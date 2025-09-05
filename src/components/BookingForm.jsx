// src/components/BookingForm.jsx
import React from "react";

export default function BookingForm({
  values,
  change,
  submit,
  times,
  dispatch,
}) {
  // derive validity purely from state (no refs/checkValidity)
  const guests = values.numPersons === "" ? NaN : Number(values.numPersons);
  const isValid =
    values.date &&
    values.time &&
    values.occasion &&
    Number.isFinite(guests) &&
    guests >= 1 &&
    guests <= 10;

  return (
    <section className="booking-container">
      {/* aria-live region for submission/status messages if you add them later */}
      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {values.submittedMessage || ""}
      </div>

      <form
        className="booking-form"
        role="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) submit(values);
        }}
      >
        {/* Date */}
        <div className="field">
          <label htmlFor="res-date">Choose date</label>
          <br />
          <input
            type="date"
            id="res-date"
            value={values.date || ""}
            onChange={(e) => {
              const s = e.target.value; // "YYYY-MM-DD"
              change("date", s);
              const [y, m, d] = s.split("-").map(Number);
              dispatch({ type: "date_changed", date: new Date(y, m - 1, d) });
            }}
            required
          />
        </div>

        {/* Time */}
        <div className="field">
          <label htmlFor="res-time">Choose time</label>
          <br />
          <select
            id="res-time"
            value={values.time || ""}
            onChange={(e) => change("time", e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select a time…
            </option>
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Guests */}
        <div className="field">
          <label htmlFor="guests">Number of guests</label>
          <br />
          <input
            type="number"
            id="guests"
            placeholder="1"
            min="1"
            max="10"
            step="1"
            value={values.numPersons ?? ""}
            onChange={(e) =>
              change(
                "numPersons",
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            required
          />
        </div>

        {/* Occasion */}
        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <br />
          <select
            id="occasion"
            name="occasion"
            value={values.occasion || ""}
            onChange={(e) => change("occasion", e.target.value)}
            required
          >
            <option value="" disabled hidden>
              Select…
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>

        <button
          type="submit"
          className="button"
          disabled={!isValid}
          aria-label="On Click — Make Your Reservation"
        >
          Make Your Reservation
        </button>
      </form>
    </section>
  );
}
