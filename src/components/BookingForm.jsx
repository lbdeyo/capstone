export default function BookingForm({ values, change, submit }) {
  return (
    <section className="booking-container">
      <section className="booking-form">
        <h2 style={{ textAlign: "center" }}>Reserve a Table</h2>
        <form
          onSubmit={submit}
          style={{
            display: "grid",
            maxWidth: "300px",
            gap: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <label htmlFor="res-date">Choose date</label>
          <input type="date" id="res-date" onChange={change} required />
          <label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            onChange={(e) => change("time", e.target.value)}
            required
          >
            {values.times.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
          <label htmlFor="guests">Number of guests</label>
          <input
            type="number"
            placeholder="1"
            min="1"
            max="10"
            id="guests"
            onChange={(e) => change("numPersons", e.target.value)}
            required
          />
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            onChange={(e) => change("occasion", e.target.value)}
            value={values.occasion}
            required
          >
            <option>Birthday</option>
            <option>Anniversary</option>
          </select>
          <input
            type="submit"
            className="button"
            value="Make Your Reservation"
            required
          />
        </form>
      </section>
    </section>
  );
}
