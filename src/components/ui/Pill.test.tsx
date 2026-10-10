import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pill } from "./Pill";

describe("UI Pill Component", () => {
  it("renders label children correctly", () => {
    render(<Pill>Featured</Pill>);
    expect(screen.getByRole("button", { name: "Featured" })).toBeInTheDocument();
  });

  it("applies selected class when isSelected is true", () => {
    render(<Pill isSelected>Active Tag</Pill>);
    const pill = screen.getByRole("button", { name: "Active Tag" });
    expect(pill.className).toContain("selected");
  });

  it("does not apply selected class when isSelected is false", () => {
    render(<Pill isSelected={false}>Inactive</Pill>);
    const pill = screen.getByRole("button", { name: "Inactive" });
    expect(pill.className).not.toContain("selected");
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Pill onClick={handleClick}>Clickable</Pill>);
    fireEvent.click(screen.getByRole("button", { name: "Clickable" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes disabled and other button attributes", () => {
    const handleClick = vi.fn();
    render(<Pill disabled onClick={handleClick}>Disabled Pill</Pill>);
    const pill = screen.getByRole("button", { name: "Disabled Pill" });
    expect(pill).toBeDisabled();
    fireEvent.click(pill);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
