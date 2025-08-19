import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import fetch from 'node-fetch';

global.mockData = [
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
    },
    {
        id: 3,
        date: "2023-10-03",
        description: "Third Test Transaction",
        category: "Test Category",
        amount: 300,
    },
]  


global.setFetchResponse = (val) => {
    global.fetch = vi.fn(() => Promise.resolve({
        json: () => Promise.resolve(val),
        ok: true,
        status: 200
    }))
}

afterEach(() => {
    cleanup();
})