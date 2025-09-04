// src/components/Main.jsx
import { useReducer } from "react";
import BookingPage from "./BookingPage";
import { fetchAPI } from "../utils/api";

const STORAGE_KEY = "availableTimes";

function loadTimesFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function saveTimesToStorage(times) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(times));
  } catch {
    // ignore quota/disabled storage errors
  }
}

function initializeTimes() {
  // Try cache first, then fall back to fresh API
  const cached = loadTimesFromStorage();
  return cached ?? fetchAPI(new Date());
}

function updateTimes(state, action) {
  switch (action.type) {
    case "date_changed": {
      const next = fetchAPI(action.date);
      saveTimesToStorage(next);
      return next;
    }
    default:
      return state;
  }
}

export default function Main({ onSubmit }) {
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes
  );

  return (
    <BookingPage
      availableTimes={availableTimes}
      dispatch={dispatch}
      onSubmit={onSubmit}
    />
  );
}

export { initializeTimes, updateTimes };
