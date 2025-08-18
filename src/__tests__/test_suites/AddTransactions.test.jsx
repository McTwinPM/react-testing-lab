import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";
import { test } from "vitest";
import TransactionsList from "../../components/TransactionsList";


test("adds new transaction to frontend", () => {
  render(<App />);
  const button = screen.getByText('Add Transaction');
  const mockdata = {
    id: 1,
    description: "Test Transaction",
    amount: 100,
  };
  fireEvent.click(button);
  expect(TransactionsList).toHave(mockdata);
});
test("If post request was called", () => {
  render(<App />);
  const button = screen.getByText('Add Transaction');
  fireEvent.click(button);
  expect(fetch).toHaveBeenCalledWith("/api/transactions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: expect.any(Number),
      description: expect.any(String),
      amount: expect.any(Number),
    }),
  });
});

