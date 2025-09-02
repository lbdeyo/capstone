import { useEffect, useState } from "react";

export default function BookingForm() {
  const [date, setDate] = useState();
  const [time, setTime] = useState("17:00");
  const [numPersons, setNumPersons] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [times, setTimes] = useState([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);

  function onDateChange(e) {
    setDate(e.target.value);
  }

  useEffect(() => {
    console.log(date);
  }, [date]);

  function onNumPersonsChange(e) {
    setNumPersons(e.target.value);
  }

  function onOccasionChange(e) {
    setOccasion(e.target.value);
  }

  function onTimeChange(e) {
    setTime(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault(); // will only fire if form is valid
    console.log({ date, time, numPersons, occasion });
  };

  return (
    <section className="booking-container">
      <section className="booking-form">
        <h2 style={{ textAlign: "center" }}>Reserve a Table</h2>
        <form
          onSubmit={onSubmit}
          style={{
            display: "grid",
            maxWidth: "300px",
            gap: "20px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <label htmlFor="res-date">Choose date</label>
          <input type="date" id="res-date" onChange={onDateChange} required />
          <label htmlFor="res-time">Choose time</label>
          <select id="res-time" onChange={onTimeChange} required>
            {times.map((time, index) => (
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
            onChange={onNumPersonsChange}
            required
          />
          <label htmlFor="occasion">Occasion</label>
          <select
            id="occasion"
            onChange={onOccasionChange}
            value={occasion}
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
