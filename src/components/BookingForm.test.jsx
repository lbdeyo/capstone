import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import BookingForm from "./BookingForm";

function renderBookingForm() {
  const props = {
    values: {
      date: "2025-09-03",
      time: "17:00",
      numPersons: "2",
      occasion: "Birthday",
    },
    change: vi.fn(),
    submit: vi.fn(),
    times: ["17:00", "18:00"],
    dispatch: vi.fn(),
  };
  render(<BookingForm {...props} />);
  return props;
}

test("BookingForm can be submitted by the user", () => {
  const props = renderBookingForm();

  // find the form (assuming it's the only one in the component)
  const form =
    screen.getByRole("form") ||
    screen.getByTestId("booking-form") ||
    screen.getByText(/number of guests/i).closest("form");

  fireEvent.submit(form);

  expect(props.submit).toHaveBeenCalled();
});
