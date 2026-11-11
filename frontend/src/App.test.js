import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navbar from "./landing_page/Navbar";
import HomePage from "./landing_page/home/HomePage";
import SupportPage from "./landing_page/support/SupportPage";

jest.mock(
  "react-router-dom",
  () => ({
    Link: ({ to, children, ...rest }) => (
      <a href={typeof to === "string" ? to : "#"} {...rest}>
        {children}
      </a>
    ),
    NavLink: ({ to, children, className, ...rest }) => (
      <a
        href={typeof to === "string" ? to : "#"}
        className={typeof className === "function" ? className({ isActive: false }) : className}
        {...rest}
      >
        {children}
      </a>
    ),
    useLocation: () => ({ pathname: "/" }),
  }),
  { virtual: true }
);

test("Navbar mobile toggle opens and closes navigation drawer", () => {
  render(<Navbar />);

  const toggleBtn = screen.getByRole("button", { name: /toggle navigation/i });
  expect(toggleBtn).toHaveAttribute("aria-expanded", "false");

  fireEvent.click(toggleBtn);
  expect(toggleBtn).toHaveAttribute("aria-expanded", "true");

  fireEvent.click(screen.getByRole("link", { name: /pricing/i }));
  expect(toggleBtn).toHaveAttribute("aria-expanded", "false");
});

test("HomePage links point to valid internal routes", () => {
  render(<HomePage />);

  const signupLinks = screen.getAllByRole("link", { name: /sign\s*up now/i });
  expect(signupLinks.length).toBeGreaterThanOrEqual(2);
  signupLinks.forEach((link) => {
    expect(link.getAttribute("href")).toBe("/signup");
  });

  const productsLink = screen.getByRole("link", { name: /explore our products/i });
  expect(productsLink.getAttribute("href")).toBe("/product");
});

test("SupportPage filters support topics via search input", () => {
  render(<SupportPage />);

  const searchInput = screen.getByLabelText(/search support topics/i);
  fireEvent.change(searchInput, { target: { value: "eMandates" } });

  expect(screen.getByText("eMandates")).toBeInTheDocument();
  expect(screen.queryByText("Online Account Opening")).not.toBeInTheDocument();
});

