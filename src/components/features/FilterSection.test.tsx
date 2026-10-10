import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FilterSection } from "./FilterSection";

describe("Features FilterSection Component", () => {
  it("renders title and children with open state by default", () => {
    render(
      <FilterSection title="By Role">
        <div>Role options</div>
      </FilterSection>
    );
    expect(screen.getByText("By Role")).toBeInTheDocument();
    expect(screen.getByText("Role options")).toBeInTheDocument();
    const header = screen.getByRole("button", { name: /by role/i });
    expect(header).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles collapse state when header is clicked", () => {
    render(
      <FilterSection title="Categories">
        <div>Category list</div>
      </FilterSection>
    );
    const header = screen.getByRole("button", { name: /categories/i });
    
    fireEvent.click(header);
    expect(header).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(header);
    expect(header).toHaveAttribute("aria-expanded", "true");
  });

  it("toggles collapse state using Enter and Space keys", () => {
    render(
      <FilterSection title="Output Types">
        <div>Output list</div>
      </FilterSection>
    );
    const header = screen.getByRole("button", { name: /output types/i });

    fireEvent.keyDown(header, { key: "Enter" });
    expect(header).toHaveAttribute("aria-expanded", "false");

    fireEvent.keyDown(header, { key: " " });
    expect(header).toHaveAttribute("aria-expanded", "true");
  });

  it("starts collapsed when defaultOpen is false", () => {
    render(
      <FilterSection title="Use cases" defaultOpen={false}>
        <div>Hidden items</div>
      </FilterSection>
    );
    const header = screen.getByRole("button", { name: /use cases/i });
    expect(header).toHaveAttribute("aria-expanded", "false");
  });
});

  it("does not toggle on other key presses like Tab", () => {
    render(
      <FilterSection title="Key Test">
        <div>Content</div>
      </FilterSection>
    );
    const header = screen.getByRole("button", { name: /key test/i });
    fireEvent.keyDown(header, { key: "Tab" });
    expect(header).toHaveAttribute("aria-expanded", "true");
  });
