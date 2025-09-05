// src/components/Reservations.validation.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest"; // adds matchers like toBeDisabled, toHaveValue
import Reservations from "./Reservations";

// Mock the real API used by initializeTimes/updateTimes
vi.mock("../utils/api", () => ({
  fetchAPI: vi.fn(() => ["17:00", "18:00"]), // predictable values
  submitAPI: vi.fn(() => true),
}));

describe("Reservations form validation", () => {
  test("submit is disabled until all required fields are valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<Reservations onSubmit={onSubmit} />);

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });

    // Initially disabled
    expect(submitBtn).toBeDisabled();

    // Fill date (auto-selects first available time via effect)
    await user.clear(dateInput);
    await user.type(dateInput, "2025-09-10"); // YYYY-MM-DD

    // guests invalid (empty) => still disabled
    expect(submitBtn).toBeDisabled();

    // Fill guests with valid number
    await user.clear(guestsInput);
    await user.type(guestsInput, "2");

    // Select occasion
    await user.selectOptions(occasionSelect, "Birthday");

    // Now everything valid -> button enabled
    expect(submitBtn).toBeEnabled();

    // Submits and calls onSubmit with values
    await user.click(submitBtn);
    expect(onSubmit).toHaveBeenCalledTimes(1);
    const payload = onSubmit.mock.calls[0][0];
    expect(payload).toMatchObject({
      date: "2025-09-10",
      time: "17:00", // auto-selected by Reservations effect
      numPersons: 2,
      occasion: "Birthday",
    });

    // Verify timeSelect holds the default value
    expect(timeSelect).toHaveValue("17:00");
  });

  test("invalid guests keeps submit disabled; fixing it enables submit", async () => {
    const user = userEvent.setup();
    render(<Reservations onSubmit={vi.fn()} />);

    const dateInput = screen.getByLabelText(/choose date/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });

    await user.type(dateInput, "2025-09-11");
    await user.selectOptions(occasionSelect, "Anniversary");

    // guests = 0 (invalid: min=1)
    await user.clear(guestsInput);
    await user.type(guestsInput, "0");
    expect(submitBtn).toBeDisabled();

    // guests = 11 (invalid: max=10)
    await user.clear(guestsInput);
    await user.type(guestsInput, "11");
    expect(submitBtn).toBeDisabled();

    // guests = 3 (valid)
    await user.clear(guestsInput);
    await user.type(guestsInput, "3");
    expect(submitBtn).toBeEnabled();
  });

  test("changing date refreshes available times and keeps validity (auto-selects first time)", async () => {
    const user = userEvent.setup();
    render(<Reservations onSubmit={vi.fn()} />);

    const dateInput = screen.getByLabelText(/choose date/i);
    const timeSelect = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionSelect = screen.getByLabelText(/occasion/i);
    const submitBtn = screen.getByRole("button", {
      name: /make your reservation/i,
    });

    // Fill everything once
    await user.type(dateInput, "2025-09-12");
    await user.type(guestsInput, "4");
    await user.selectOptions(occasionSelect, "Birthday");
    // With our mock, Reservations auto-selects first time "17:00"
    expect(timeSelect).toHaveValue("17:00");
    expect(submitBtn).toBeEnabled();

    // Change date again -> effect should maintain validity
    await user.clear(dateInput);
    await user.type(dateInput, "2025-09-13");

    expect(submitBtn).toBeEnabled();
    expect(timeSelect).toBeInTheDocument();
    expect(["17:00", "18:00"]).toContain(timeSelect.value);
  });
});
