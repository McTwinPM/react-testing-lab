import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../../components/App";
import { afterEach, describe, test } from "vitest";
import AccountContainer from "../../components/AccountContainer";


const mockData=[
    {
        id: 1,
        date: "2023-10-01",
        description: "loan from dad for business",
        category: "Income",
        amount: 1000
    },
    {
        id: 2,
        date: "2023-10-02",
        description: "Taxes",
        category: "Income",
        amount: -500
    }
]

describe("Display Transactions", () => {
    beforeEach(() => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockData)
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