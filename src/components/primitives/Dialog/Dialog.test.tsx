import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./Dialog";

describe("Dialog Primitive (Radix Engine + Skillhouse Tokens)", () => {
  it("renders dialog content when triggered", () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button type="button">Open Dialog</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Skillhouse Modal Title</DialogTitle>
          <DialogDescription>Skillhouse description paragraph.</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    const triggerBtn = screen.getByRole("button", { name: "Open Dialog" });
    fireEvent.click(triggerBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Skillhouse Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Skillhouse description paragraph.")).toBeInTheDocument();
  });

  it("closes dialog when close button is clicked", () => {
    const handleOpenChange = vi.fn();
    render(
      <Dialog defaultOpen onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogTitle>Active Dialog</DialogTitle>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeBtn);

    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it("renders controlled dialog when open prop is true", () => {
    const handleClose = vi.fn();
    render(
      <Dialog open={true} onOpenChange={handleClose}>
        <DialogContent>
          <DialogTitle>Controlled Modal</DialogTitle>
          <DialogClose asChild>
            <button type="button">Custom Cancel</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const cancelBtn = screen.getByRole("button", { name: "Custom Cancel" });
    fireEvent.click(cancelBtn);

    expect(handleClose).toHaveBeenCalledWith(false);
  });
});
