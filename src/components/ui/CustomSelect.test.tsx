import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CustomSelect } from "./CustomSelect";

describe("CustomSelect UI Component", () => {
  const options = ["Development & coding", "Design & creative", "Writing & content"];

  it("renders trigger with selected value and chevron", () => {
    render(
      <CustomSelect
        id="test-select"
        value="Development & coding"
        options={options}
        onChange={() => {}}
      />
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");
    expect(trigger).toHaveTextContent("Development & coding");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("opens custom dropdown listbox when trigger is clicked", () => {
    render(
      <CustomSelect
        id="test-select"
        value="Development & coding"
        options={options}
        onChange={() => {}}
      />
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(3);
  });

  it("selects an option and invokes onChange callback when clicked", () => {
    const handleChange = vi.fn();
    render(
      <CustomSelect
        id="test-select"
        value="Development & coding"
        options={options}
        onChange={handleChange}
      />
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");
    fireEvent.click(trigger);

    const option2 = screen.getByRole("option", { name: "Design & creative" });
    fireEvent.click(option2);

    expect(handleChange).toHaveBeenCalledWith("Design & creative");
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("closes dropdown on outside click and on escape key", () => {
    render(
      <div>
        <div data-testid="outside-elem">Outside</div>
        <CustomSelect
          id="test-select"
          value="Development & coding"
          options={options}
          onChange={() => {}}
        />
      </div>
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Escape key
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();

    // Reopen and outside click
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside-elem"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation with ArrowDown, ArrowUp, and Enter", () => {
    const handleChange = vi.fn();
    render(
      <CustomSelect
        id="test-select"
        value="Development & coding"
        options={options}
        onChange={handleChange}
      />
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");

    // ArrowDown opens the menu
    fireEvent.keyDown(trigger, { key: "ArrowDown" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // ArrowDown advances highlight
    fireEvent.keyDown(trigger, { key: "ArrowDown" });

    // Enter selects
    fireEvent.keyDown(trigger, { key: "Enter" });
    expect(handleChange).toHaveBeenCalledWith("Design & creative");
  });

  it("synchronizes change events on hidden select for test compatibility", () => {
    const handleChange = vi.fn();
    render(
      <CustomSelect
        id="test-select"
        value="Development & coding"
        options={options}
        onChange={handleChange}
      />
    );

    const hiddenSelect = screen.getByTestId("hidden-select-test-select");
    fireEvent.change(hiddenSelect, { target: { value: "Writing & content" } });

    expect(handleChange).toHaveBeenCalledWith("Writing & content");
  });

  it("respects disabled state and prevents opening", () => {
    render(
      <CustomSelect
        id="test-select"
        value="Development & coding"
        options={options}
        onChange={() => {}}
        disabled
      />
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");
    expect(trigger).toBeDisabled();
    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });

  it("handles Home, End, ArrowUp, and Space keyboard actions, and closing via click", () => {
    const handleChange = vi.fn();
    render(
      <CustomSelect
        id="test-select"
        value=""
        placeholder="Select a category"
        options={options}
        onChange={handleChange}
      />
    );

    const trigger = screen.getByTestId("custom-select-trigger-test-select");
    expect(trigger).toHaveTextContent("Select a category");

    // Open via ArrowUp
    fireEvent.keyDown(trigger, { key: "ArrowUp" });
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    // Home goes to first item
    fireEvent.keyDown(trigger, { key: "Home" });

    // End goes to last item
    fireEvent.keyDown(trigger, { key: "End" });

    // ArrowUp goes to previous item
    fireEvent.keyDown(trigger, { key: "ArrowUp" });

    // Space selects highlighted item
    fireEvent.keyDown(trigger, { key: " " });
    expect(handleChange).toHaveBeenCalledWith("Design & creative");

    // Toggle open and close via click
    fireEvent.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    fireEvent.click(trigger);
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});

