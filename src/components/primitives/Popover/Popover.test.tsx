import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Popover, PopoverTrigger, PopoverContent } from "./Popover";

describe("Popover Primitive (Radix Engine + Skillhouse Tokens)", () => {
  it("renders popover content when trigger is clicked", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button type="button">Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <div>Popover Body</div>
        </PopoverContent>
      </Popover>
    );

    expect(screen.queryByText("Popover Body")).not.toBeInTheDocument();

    const trigger = screen.getByRole("button", { name: "Open Popover" });
    fireEvent.click(trigger);

    expect(screen.getByText("Popover Body")).toBeInTheDocument();
  });

  it("renders controlled popover when open is true", () => {
    const handleOpenChange = vi.fn();
    render(
      <Popover open={true} onOpenChange={handleOpenChange}>
        <PopoverContent>
          <div>Controlled Content</div>
        </PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Controlled Content")).toBeInTheDocument();
  });
});
