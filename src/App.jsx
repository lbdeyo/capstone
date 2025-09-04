import { Routes, Route, useNavigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import BookingPage from "./components/BookingPage";
import ConfirmedBooking from "./components/ConfirmedBooking";
import "./App.css";
import { submitAPI } from "./utils/api";

// make sure App is rendered inside <BrowserRouter> in your main entry (e.g. main.jsx)
export default function App() {
  const navigate = useNavigate();

  function submitForm(formData) {
    if (submitAPI(formData)) {
      window.localStorage.setItem("form", JSON.stringify(formData));
      navigate("/bookingconfirmed");
    }
  }

  // App receives a *formData object*, not an event
  const onSubmit = (formData) => {
    const enriched = {
      ...formData,
      submittedMessage: "Reservation submitted.",
    };
    submitForm(enriched);
  };

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/booking" element={<BookingPage onSubmit={onSubmit} />} />
      <Route path="/bookingconfirmed" element={<ConfirmedBooking />} />
    </Routes>
  );
}
