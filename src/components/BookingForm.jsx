import React from "react";

export default function BookingForm({
  values,
  change,
  submit,
  times,
  dispatch,
}) {
  // derive validity from state
  const guests = values.numPersons === "" ? NaN : Number(values.numPersons);

  const dateInvalid = !values.date;
  const timeInvalid = !values.time;
  const occInvalid = !values.occasion;
  const guestsInvalid = !(
    Number.isFinite(guests) &&
    guests >= 1 &&
    guests <= 10
  );

  const isValid = !dateInvalid && !timeInvalid && !occInvalid && !guestsInvalid;

  return (
    <section className="booking-container">
      {/* Live region for SR feedback on submit */}
      <div role="status" aria-live="polite" className="visually-hidden">
        {values.submittedMessage || ""}
      </div>

      <form
        className="booking-form"
        aria-label="Table reservation form"
        role="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (isValid) submit(values);
        }}
      >
        {/* DATE */}
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
            aria-invalid={dateInvalid || undefined}
            aria-describedby="res-date-help"
          />
          <p id="res-date-help" className="visually-hidden">
            Select your reservation date in YYYY-MM-DD format.
          </p>
        </div>

        {/* TIME */}
        <div className="field">
          <label htmlFor="res-time">Choose time</label>
          <br />
          <select
            id="res-time"
            value={values.time || ""}
            onChange={(e) => change("time", e.target.value)}
            required
            aria-invalid={timeInvalid || undefined}
            aria-describedby="res-time-help"
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
          <p id="res-time-help" className="visually-hidden">
            Choose a time from the available options.
          </p>
        </div>

        {/* GUESTS */}
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
            aria-invalid={guestsInvalid || undefined}
            aria-describedby="guests-help guests-error"
            aria-errormessage={guestsInvalid ? "guests-error" : undefined}
            inputMode="numeric"
            autoComplete="off"
          />
          <p id="guests-help" className="visually-hidden">
            Enter a number between 1 and 10.
          </p>
          {/* Only visually show error if desired; SR will read via aria-errormessage */}
          <p id="guests-error" aria-live="polite" className="visually-hidden">
            {guestsInvalid ? "Guests must be between 1 and 10." : ""}
          </p>
        </div>

        {/* OCCASION */}
        <div className="field">
          <label htmlFor="occasion">Occasion</label>
          <br />
          <select
            id="occasion"
            name="occasion"
            value={values.occasion || ""}
            onChange={(e) => change("occasion", e.target.value)}
            required
            aria-invalid={occInvalid || undefined}
            aria-describedby="occasion-help"
          >
            <option value="" disabled hidden>
              Select…
            </option>
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
          </select>
          <p id="occasion-help" className="visually-hidden">
            Select the occasion for your reservation.
          </p>
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
