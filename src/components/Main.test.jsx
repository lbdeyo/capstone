// Adjust the path below to where your named exports live:
import { initializeTimes, updateTimes } from "./Main"; // e.g. "../components/Main" or "../Main"
import { describe, test, expect } from "vitest";

describe("initializeTimes & updateTimes", () => {
  test("initializeTimes returns the initial list of times", () => {
    const result = initializeTimes();
    expect(result).toEqual([
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]);
  });

  test("updateTimes returns the same state for unknown actions (no-op)", () => {
    const prevState = ["17:00", "18:00"];
    const result = updateTimes(prevState, { type: "UNKNOWN_ACTION" });
    // important: should be the SAME reference if your reducer returns state unchanged
    expect(result).toBe(prevState);
  });
});
