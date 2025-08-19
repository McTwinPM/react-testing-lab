import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../components/App";
import { test } from "vitest";

// test("If change event is triggered will page update", () => {
//   render(<App />);
//   const input = screen.getByPlaceholderText("Search transactions...");
//   fireEvent.change(input, { target: { value: "Test" } });
//   expect(screen.getByText("Test Transaction")).toBeInTheDocument();
// });