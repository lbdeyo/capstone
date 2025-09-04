import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Main from "./components/Main";
import ConfirmedBooking from "./components/ConfirmedBooking";
import "./App.css";

export default function App() {
  const navigate = useNavigate();

  function submitForm(form) {
    if (submitAPI(form)) {
      window.localStorage.setItem("form", form);
      navigate("/bookingconfirmed");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    // This message will be read by screen readers via aria-live in BookingForm
    const form = (f) => ({ ...f, submittedMessage: "Reservation submitted." });
    submitForm(form);
    // setForm();
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/booking" element={<Main onSubmit={onSubmit} />} />
      <Route path="/bookingconfirmed" element={<ConfirmedBooking />} />
    </Routes>
  );
}
