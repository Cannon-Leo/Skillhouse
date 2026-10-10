import React, { createRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SearchInput } from "./SearchInput";

describe("UI SearchInput Component", () => {
  it("renders with default placeholder and search type", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText("Search skills / outputs");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "search");
  });

  it("displays shortcut badge when input has no value", () => {
    render(<SearchInput shortcut="⌘K" value="" onChange={() => {}} />);
    expect(screen.getByText("⌘K")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /clear search/i })).not.toBeInTheDocument();
  });

  it("displays clear button when input has value and hides shortcut badge", () => {
    render(<SearchInput value="prompt" onChange={() => {}} shortcut="⌘K" />);
    expect(screen.queryByText("⌘K")).not.toBeInTheDocument();
    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    expect(clearBtn).toBeInTheDocument();
  });

  it("calls onClear and clears input value when clear button is clicked", () => {
    const handleClear = vi.fn();
    render(<SearchInput defaultValue="presentation" onClear={handleClear} />);
    const clearBtn = screen.getByRole("button", { name: /clear search/i });
    fireEvent.click(clearBtn);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });

  it("fires onChange handler when typing", () => {
    const handleChange = vi.fn();
    render(<SearchInput onChange={handleChange} />);
    const input = screen.getByPlaceholderText("Search skills / outputs");
    fireEvent.change(input, { target: { value: 'nextjs' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("handles focus and blur events", () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<SearchInput onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByPlaceholderText("Search skills / outputs");
    
    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);
    
    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it("exposes imperative ref pointing to HTMLInputElement", () => {
    const ref = createRef<HTMLInputElement>();
    render(<SearchInput ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});

  it("focuses input when clicking container wrapper", () => {
    render(<SearchInput placeholder="Search wrapper" />);
    const input = screen.getByPlaceholderText("Search wrapper");
    const wrapper = input.parentElement!;
    fireEvent.click(wrapper);
    expect(document.activeElement).toBe(input);
  });
