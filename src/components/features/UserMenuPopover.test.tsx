import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserMenuPopover } from "./UserMenuPopover";

describe("UserMenuPopover Component", () => {
  it("renders all items from Figma Node 753:11852", () => {
    render(<UserMenuPopover />);

    expect(screen.getByText("Directory history")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Account settings")).toBeInTheDocument();
    expect(screen.getByText("Help center")).toBeInTheDocument();
    expect(screen.getByText("Switch to")).toBeInTheDocument();
    expect(screen.getByText("Host")).toBeInTheDocument();
    expect(screen.getByText("Service Provider")).toBeInTheDocument();
    expect(screen.getByText("My Listings & Services")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("triggers callbacks when menu items are clicked", () => {
    const handleProfile = vi.fn();
    const handleLogout = vi.fn();
    const handleHost = vi.fn();

    render(
      <UserMenuPopover
        onProfile={handleProfile}
        onLogout={handleLogout}
        onSwitchHost={handleHost}
      />
    );

    fireEvent.click(screen.getByText("Profile"));
    expect(handleProfile).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Host"));
    expect(handleHost).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Logout"));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });
});
