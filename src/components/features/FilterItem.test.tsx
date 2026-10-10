import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { FilterItem } from "./FilterItem";

describe("Features FilterItem Component", () => {
  it("renders label and count", () => {
    render(
      <FilterItem
        id="web"
        label="Web Design"
        count={113}
        checked={false}
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Web Design")).toBeInTheDocument();
    expect(screen.getByText("113")).toBeInTheDocument();
  });

  it("handles click to toggle checked state", () => {
    const handleChange = vi.fn();
    render(
      <FilterItem
        id="web"
        label="Web Design"
        checked={false}
        onChange={handleChange}
      />
    );
    const item = screen.getByRole("checkbox", { name: /web design/i });
    fireEvent.click(item);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("handles keyboard toggle via Space key", () => {
    const handleChange = vi.fn();
    render(
      <FilterItem
        id="web"
        label="Web Design"
        checked={false}
        onChange={handleChange}
      />
    );
    const item = screen.getByRole("checkbox", { name: /web design/i });
    fireEvent.click(item);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("renders icon when iconName is provided", () => {
    const { container } = render(
      <FilterItem
        id="slides"
        label="Slides"
        iconName="presentation"
        checked={false}
        onChange={() => {}}
      />
    );
    const img = container.querySelector("img");
    expect(img).toHaveAttribute("src", "/figma/presentation.svg");
  });
});
