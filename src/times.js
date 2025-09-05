// src/times.js
import { fetchAPI } from "./utils/api";

const CACHE_KEY = "availableTimes";

export function initializeTimes() {
  // try cache first
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const arr = JSON.parse(cached);
      if (Array.isArray(arr)) return arr;
    }
  } catch {
    // ignore and fall through
  }

  const times = fetchAPI(new Date());
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(times));
  } catch {}
  return times;
}

export function updateTimes(state, action) {
  switch (action.type) {
    case "date_changed": {
      const newTimes = fetchAPI(action.date);
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(newTimes));
      } catch {}
      return Array.isArray(newTimes) && newTimes.length ? newTimes : state;
    }
    default:
      return state;
  }
}
