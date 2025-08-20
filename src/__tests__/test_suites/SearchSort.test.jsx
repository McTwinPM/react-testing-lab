import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";
import { test, vi } from "vitest";
import AccountContainer from "../../components/AccountContainer";

test("If change event is triggered will page update", async () => {
  // Mock fetch to return a transaction with "Chipotle"
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            date: "2023-01-01",
            description: "Chipotle",
            category: "Food",
            amount: 12.34,
          },
        ]),
    })
  );

  render(<AccountContainer />);
  const input = screen.getByPlaceholderText(/search your recent transactions/i);
  fireEvent.change(input, { target: { value: "C" } });
  expect(await screen.findByText(/chipotle/i)).toBeInTheDocument();
});