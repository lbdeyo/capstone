import { useReducer } from "react";
import BookingPage from "./BookingPage";

function initializeTimes() {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
}

function updateTimes(state, action) {
  switch (action.type) {
    case "date_changed":
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    default:
      return state ?? initializeTimes();
  }
}

export default function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    null,
    initializeTimes
  );
  return <BookingPage availableTimes={availableTimes} dispatch={dispatch} />;
}

export { initializeTimes, updateTimes };
