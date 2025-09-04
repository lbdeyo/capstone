// src/components/Main.test.jsx
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
vi.mock("../utils/api", () => ({ fetchAPI: vi.fn() }));

import { initializeTimes, updateTimes } from "./Main";
import { fetchAPI } from "../utils/api";

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(Storage.prototype, "getItem").mockReturnValue(null);
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

test("initializeTimes returns a populated array (no cache)", () => {
  fetchAPI.mockReturnValue(["17:00"]);
  const result = initializeTimes();
  expect(fetchAPI).toHaveBeenCalledTimes(1);
  expect(result).toEqual(["17:00"]);
});

test('updateTimes caches on "date_changed"', () => {
  const date = new Date(2025, 0, 1);
  fetchAPI.mockReturnValue(["18:00"]);
  const next = updateTimes(["17:00"], { type: "date_changed", date });
  expect(fetchAPI).toHaveBeenCalledWith(date);
  expect(localStorage.setItem).toHaveBeenCalledWith(
    "availableTimes",
    JSON.stringify(["18:00"])
  );
  expect(next).toEqual(["18:00"]);
});

test("initializeTimes uses cached times when available", () => {
  const cached = JSON.stringify(["19:00", "19:30"]);
  localStorage.getItem.mockReturnValue(cached);
  const result = initializeTimes();
  expect(fetchAPI).not.toHaveBeenCalled();
  expect(result).toEqual(["19:00", "19:30"]);
});
