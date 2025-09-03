import { useCallback, useEffect, useState } from "react";
import BookingForm from "./BookingForm";

export default function Reservations() {
  const [form, setForm] = useState({
    date: "",
    time: "17:00",
    numPersons: "",
    occasion: "",
    times: ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"],
  });

  const onSubmit = (e) => {
    e.preventDefault(); // will only fire if form is valid
    console.log({ form });
  };

  const onChange = useCallback((name, value) => {
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <section className="booking-container">
      <h3>{}</h3>
      <BookingForm values={form} change={onChange} submit={onSubmit} />
    </section>
  );
}
