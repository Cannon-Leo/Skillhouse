import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { DesignSystemShowcase } from "./DesignSystemShowcase";

describe("DesignSystemShowcase Component", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renders color tokens and typography documentation", () => {
    render(<DesignSystemShowcase />);
    expect(screen.getByText("Skillhouse Design System")).toBeInTheDocument();
    expect(screen.getByText("Brand Orange (Core)")).toBeInTheDocument();
    expect(screen.getByText("#FB6320")).toBeInTheDocument();
  });

  it("handles loading state toggle on button showcase", () => {
    render(<DesignSystemShowcase />);
    const loadingBtn = screen.getByRole("button", { name: /click for loading state/i });
    fireEvent.click(loadingBtn);
    expect(screen.getAllByRole("button", { name: /loading.../i }).length).toBeGreaterThan(0);
  });

  it("handles audience role pill selection within audience box", () => {
    render(<DesignSystemShowcase />);
    const rolePills = screen.getAllByRole("button", { name: "Graphic Designer" });
    expect(rolePills.length).toBeGreaterThan(0);
    fireEvent.click(rolePills[0]);
    expect(rolePills[0].className).toContain("selected");
  });
});
