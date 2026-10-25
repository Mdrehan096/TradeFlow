import React from "react";
import { render, screen } from "@testing-library/react";

import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

test("RightSection renders Learn More with a safe fallback href", () => {
  render(
    <RightSection
      imageURL="media/images/console.png"
      productName="Console"
      productDesription="Test description"
      learnMore=""
    />
  );

  const link = screen.getByRole("link", { name: /learn more/i });
  expect(link.getAttribute("href")).toBe("#");
});

test("LeftSection renders product links with a safe fallback href", () => {
  render(
    <LeftSection
      imageURL="media/images/kite.png"
      productName="Kite"
      productDesription="Test description"
      tryDemo=""
      learnMore=""
      googlePlay=""
      appStore=""
    />
  );

  expect(screen.getByRole("link", { name: /try demo/i }).getAttribute("href")).toBe("#");
  expect(screen.getByRole("link", { name: /learn more/i }).getAttribute("href")).toBe("#");
});
