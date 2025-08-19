import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../../components/App";
import { beforeEach, describe, test } from "vitest";
import TransactionsList from "../../components/TransactionsList";
import AccountContainer from "../../components/AccountContainer";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

const mockData = []

describe("AddTransactions", async () => {
  beforeEach(() => {
  global.fetch = vi.fn((url, options) => {
    if (options && options.method === "POST") {
      return Promise.resolve({
        json: () => Promise.resolve({
          date: "2023-01-01",
          description: "Test Transaction",
          category: "Test Category",
          amount: "100",
        }),
      });
    }
    return Promise.resolve({
      json: () => Promise.resolve([]),
    });
  });
  });

  test("adds new transaction to frontend", async () => {
    render(<AccountContainer />);
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Transaction" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Test Category" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByRole('textbox', { name: "" }), { target: { value: "2023-01-01" } });
    });

    fireEvent.click(screen.getByText("Add Transaction"));

    // Wait for the new transaction to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText("Test Transaction")).toBeInTheDocument();
      expect(screen.getByText("Test Category")).toBeInTheDocument();
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    });
  });

  test("If post request was called", async () => {
    render(<AccountContainer />);
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Test Transaction" },
    });
    fireEvent.change(screen.getByPlaceholderText("Category"), {
      target: { value: "Test Category" },
    });
    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByRole('textbox', { name: "" }), { target: { value: "2023-01-01" } });
    });

    fireEvent.click(screen.getByText("Add Transaction"));

   await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:6001/transactions",
        expect.objectContaining({
          method: "POST",
      }),
    );
    });