// src/times.js
import { fetchAPI } from "./utils/api";

export function initializeTimes() {
  return fetchAPI(new Date());
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "date_changed": {
      const newTimes = fetchAPI(action.date);
      return Array.isArray(newTimes) && newTimes.length ? newTimes : state;
    }
    default:
      return state;
  }
}
