import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../components/App";
import { afterEach, describe, test } from "vitest";
import AccountContainer from "../../components/AccountContainer";




describe("Display Transactions", () => {
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(global.mockData)
            })
        );
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    test("if transactions displayed on startup", async () => {
        render(<App />);
        expect(await screen.findByText("loan from dad for business")).toBeInTheDocument();
        expect(await screen.findByText("Taxes")).toBeInTheDocument();
    });
});