// src/components/Main.test.jsx
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

import { initializeTimes, updateTimes } from "../times";
import { fetchAPI } from "../utils/api";

// Mock the API module
vi.mock("../utils/api", () => ({
  fetchAPI: vi.fn(),
  submitAPI: vi.fn(() => true),
}));

describe.sequential("times helpers", () => {
  test("initializeTimes returns a populated array (no cache)", () => {
    // fresh spies for THIS test
    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(null);
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    fetchAPI.mockReset().mockReturnValue(["17:00"]);

    const result = initializeTimes();

    expect(fetchAPI).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(
      "availableTimes",
      JSON.stringify(["17:00"])
    );
    expect(result).toEqual(["17:00"]);

    // optional: cleanup
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  test('updateTimes caches on "date_changed"', () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");
    const date = new Date(2025, 0, 1);

    fetchAPI.mockReset().mockReturnValue(["18:00"]);

    const prev = ["17:00"];
    const next = updateTimes(prev, { type: "date_changed", date });

    expect(fetchAPI).toHaveBeenCalledWith(date);
    expect(setItemSpy).toHaveBeenCalledWith(
      "availableTimes",
      JSON.stringify(["18:00"])
    );
    expect(next).toEqual(["18:00"]);

    setItemSpy.mockRestore();
  });

  test("initializeTimes uses cached times when available", () => {
    const cached = JSON.stringify(["19:00", "19:30"]);

    const getItemSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockReturnValue(cached);
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem"); // not expected to be called

    // ensure any prior implementations don’t leak in
    fetchAPI.mockReset();

    const result = initializeTimes();

    expect(fetchAPI).not.toHaveBeenCalled();
    expect(result).toEqual(["19:00", "19:30"]);
    expect(setItemSpy).not.toHaveBeenCalled();

    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });
});
