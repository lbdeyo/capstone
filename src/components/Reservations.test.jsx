import React from "react";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Reservations from "./Reservations";

test("renders the Available slots heading in Reservations", () => {
  render(
    <Reservations availableTimes={["17:00", "18:00"]} dispatch={vi.fn()} />
  );
  expect(
    screen.getByRole("heading", { name: /available slots/i })
  ).toBeInTheDocument();
});
