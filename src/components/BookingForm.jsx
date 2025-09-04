import React from "react";
export default function BookingForm({
  values,
  change,
  submit,
  times,
  dispatch,
}) {
  return (
    <section className="booking-container">
      <form onSubmit={submit} className="booking-form" role="form">
        <div className="field">
          <label htmlFor="res-date">Choose date</label> <br></br>
          <input
            type="date"
            id="res-date"
            value={values.date}
            onChange={(e) => {
              const nextDate = e.target.value;
              change("date", nextDate);
              dispatch({ type: "date_changed", date: nextDate });
            }}
            required
          />
        </div>

        <div className="field">
          <label htmlFor="res-time">Choose time</label>
          <br></br>
          <select
            id="res-time"
            value={values.time}
            onChange={(e) => change("time", e.target.value)}
            required
          >
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="guests">Number of guests</label>
          <br></br>
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            onChange={(e) => change("numPersons", e.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <br></br>
          <select
            id="occasion"
            onChange={(e) => change("occasion", e.target.value)}
            value={values.occasion}
            required
          >
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
        </div>

        <button type="submit" className="button">
          Make Your Reservation
        </button>
      </form>
    </section>
  );
}
