import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Holdings from "./components/Holdings";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import { GeneralContextProvider } from "./components/GeneralContext";
import WatchList from "./components/WatchList";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.mock("react-chartjs-2", () => ({
  Doughnut: () => <div data-testid="mock-doughnut-chart" />,
  Bar: () => <div data-testid="mock-bar-chart" />,
}));

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: {} });
});

test("Menu toggles mobile navigation and profile dropdown", () => {
  render(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );

  const hamburger = screen.getByRole("button", {
    name: /toggle dashboard navigation/i,
  });
  expect(hamburger).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(hamburger);
  expect(hamburger).toHaveAttribute("aria-expanded", "true");

  const profileTriggers = screen.getAllByRole("button", { name: /USERID/i });
  fireEvent.click(profileTriggers[0]);
  expect(screen.getAllByText("TradeFlow User").length).toBeGreaterThanOrEqual(1);
});

test("WatchList filters stocks and opens/closes BuyActionWindow", () => {
  render(
    <MemoryRouter>
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>
    </MemoryRouter>
  );

  const search = screen.getByLabelText(/search watchlist stocks/i);
  fireEvent.change(search, { target: { value: "INFY" } });
  expect(screen.getByText("1 / 50")).toBeInTheDocument();

  fireEvent.click(screen.getByText("INFY"));
  const buyBtn = screen.getByRole("button", { name: /buy/i });
  fireEvent.click(buyBtn);

  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByText(/Buy INFY/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("Holdings renders valid table with fallback holdings totals", async () => {
  render(<Holdings />);

  await waitFor(() => {
    expect(screen.getByText("Holdings (13)")).toBeInTheDocument();
  });

  expect(screen.getByRole("table")).toBeInTheDocument();
  expect(screen.getByText("Total investment")).toBeInTheDocument();
  expect(screen.getByText(/1,553\.40 \(\+5\.20%\)/)).toBeInTheDocument();
});

test("Home renders TopBar and Summary view", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );

  expect(screen.getByText("NIFTY 50")).toBeInTheDocument();
  expect(screen.getByText("Hi, User!")).toBeInTheDocument();
});

test("Orders shows retry state on network error and recovers when backend responds", async () => {
  axios.get.mockRejectedValueOnce(new Error("Network error"));
  render(
    <MemoryRouter>
      <GeneralContextProvider>
        <Orders />
      </GeneralContextProvider>
    </MemoryRouter>
  );

  const retryBtn = await screen.findByRole("button", { name: /retry/i });
  expect(retryBtn).toBeInTheDocument();

  axios.get.mockResolvedValueOnce({
    data: [{ _id: "1", name: "INFY", qty: 2, price: 1555.45, mode: "BUY" }],
  });
  fireEvent.click(retryBtn);

  await waitFor(() => {
    expect(screen.getByText("Orders (1)")).toBeInTheDocument();
  });
  expect(screen.getByText("INFY")).toBeInTheDocument();
});
