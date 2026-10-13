import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import React from "react";
import { FaqSection, FAQ_ITEMS } from "./FaqSection";

describe("FaqSection Component (Figma Node 851:3373)", () => {
  it("renders heading and subtitle", () => {
    render(<FaqSection />);
    expect(screen.getByRole("heading", { name: /frequently asked questions/i })).toBeDefined();
    expect(screen.getByText(/the essentials for choosing/i)).toBeDefined();
  });

  it("renders all questions from Figma", () => {
    render(<FaqSection />);
    FAQ_ITEMS.forEach((item) => {
      expect(screen.getByText(item.question)).toBeDefined();
    });
  });

  it("expands the first FAQ by default", () => {
    render(<FaqSection />);
    expect(
      screen.getByText(/a skill is a reusable set of instructions and resources/i)
    ).toBeDefined();
  });

  it("toggles answers open and closed when clicked", () => {
    render(<FaqSection />);
    const secondQuestionBtn = screen.getByRole("button", {
      name: /do i need to already have properties\?/i,
    });

    expect(
      screen.queryByText(/no\. you can start using skillhouse right away/i)
    ).toBeNull();

    fireEvent.click(secondQuestionBtn);
    expect(
      screen.getByText(/no\. you can start using skillhouse right away/i)
    ).toBeDefined();

    fireEvent.click(secondQuestionBtn);
    expect(
      screen.queryByText(/no\. you can start using skillhouse right away/i)
    ).toBeNull();
  });
});
