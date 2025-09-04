import { useReducer } from "react";
import BookingPage from "./BookingPage";

function initializeTimes() {
  // Seed initial state synchronously using the provided stub API.
  return fetchAPI(new Date());
}

function updateTimes(state, action) {
  console.log(action);
  switch (action.type) {
    case "date_changed":
      // When the user picks a new date, get fresh times from the stub API.
      return fetchAPI(action.date);
    default:
      // Reducers should return current state for unknown actions.
      return state;
  }
}

export default function Main() {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined, // initialArg (unused because we provide an initializer)
    initializeTimes // initializer runs once at mount
  );

  return <BookingPage availableTimes={availableTimes} dispatch={dispatch} />;
}

export { initializeTimes, updateTimes };
