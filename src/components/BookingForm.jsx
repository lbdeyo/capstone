import React, { useCallback, useEffect, useRef, useState } from "react";

export default function BookingForm({
  values,
  change,
  submit,
  times,
  dispatch,
}) {
  const formRef = useRef(null);
  const [canSubmit, setCanSubmit] = useState(false);

  const evalValidity = () => {
    if (formRef.current) setCanSubmit(formRef.current.checkValidity());
  };

  useEffect(() => {
    evalValidity(); // run on mount and when values change
  }, [values]);

  const onChange = useCallback((name, value) => {
    console.log("change ->", name, value); // should show: change -> occasion Birthday
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  return (
    <section className="booking-container">
      <form
        ref={formRef}
        className="booking-form"
        role="form"
        onInput={evalValidity}
        onChange={evalValidity}
        onSubmit={(e) => {
          e.preventDefault();
          submit(values); // <-- send data object up
        }}
      >
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

        <div className="field">
          <label htmlFor="guests">Number of guests</label>
          <br />
          <input
            type="number"
            id="guests"
            placeholder="1"
            min="1"
            max="10"
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

        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <br />
          <select
            id="occasion"
            name="occasion"
            value={values.occasion || ""}
            onChange={(e) => {
              change("occasion", e.target.value);
            }}
            required
          >
            <option value="" disabled hidden>
              Select…
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>

        <button type="submit" className="button" disabled={!canSubmit}>
          Make Your Reservation
        </button>
      </form>
    </section>
  );
}
