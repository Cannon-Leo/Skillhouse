import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserMenuPopover } from "./UserMenuPopover";

describe("UserMenuPopover Component (Node 760:12903)", () => {
  it("renders all items from Figma Node 760:12903 (drop down menu/attending)", () => {
    render(<UserMenuPopover />);

    expect(screen.getByText("Bookmarks")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Account settings")).toBeInTheDocument();
    expect(screen.getByText("Help center")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // In standard attending variant, Switch to is not present
    expect(screen.queryByText("Switch to")).not.toBeInTheDocument();
  });

  it("renders extended items when variant is extended (Node 753:11852), with Switch to disabled until creators launch", () => {
    render(<UserMenuPopover variant="extended" onDirectoryHistory={() => {}} />);

    expect(screen.getByText("Directory history")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Account settings")).toBeInTheDocument();
    expect(screen.getByText("Help center")).toBeInTheDocument();
    // Switch to section is commented out until creators are introduced
    expect(screen.queryByText("Switch to")).not.toBeInTheDocument();
    expect(screen.queryByText("Host")).not.toBeInTheDocument();
    expect(screen.queryByText("Service Provider")).not.toBeInTheDocument();
    expect(screen.queryByText("My Listings & Services")).not.toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });

  it("triggers callbacks when menu items are clicked", () => {
    const handleBookmarks = vi.fn();
    const handleProfile = vi.fn();
    const handleSettings = vi.fn();
    const handleHelp = vi.fn();
    const handleLogout = vi.fn();

    render(
      <UserMenuPopover
        onBookmarks={handleBookmarks}
        onProfile={handleProfile}
        onAccountSettings={handleSettings}
        onHelpCenter={handleHelp}
        onLogout={handleLogout}
      />
    );

    fireEvent.click(screen.getByText("Bookmarks"));
    expect(handleBookmarks).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Profile"));
    expect(handleProfile).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Account settings"));
    expect(handleSettings).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Help center"));
    expect(handleHelp).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText("Logout"));
    expect(handleLogout).toHaveBeenCalledTimes(1);
  });

  it("supports keyboard navigation with ArrowDown, ArrowUp, Home, End, Escape", () => {
    const handleClose = vi.fn();
    render(<UserMenuPopover onClose={handleClose} />);

    const menu = screen.getByRole("menu");
    const bookmarksBtn = screen.getByTestId("user-menu-item-bookmarks");
    const profileBtn = screen.getByTestId("user-menu-item-profile");
    const logoutBtn = screen.getByTestId("user-menu-item-logout");

    // Start with bookmarks focused
    bookmarksBtn.focus();
    expect(document.activeElement).toBe(bookmarksBtn);

    // ArrowDown moves to Profile
    fireEvent.keyDown(menu, { key: "ArrowDown" });
    expect(document.activeElement).toBe(profileBtn);

    // ArrowUp moves back to Bookmarks
    fireEvent.keyDown(menu, { key: "ArrowUp" });
    expect(document.activeElement).toBe(bookmarksBtn);

    // End moves to Logout
    fireEvent.keyDown(menu, { key: "End" });
    expect(document.activeElement).toBe(logoutBtn);

    // Home moves back to Bookmarks
    fireEvent.keyDown(menu, { key: "Home" });
    expect(document.activeElement).toBe(bookmarksBtn);

    // Escape triggers onClose
    fireEvent.keyDown(menu, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("renders active item indicator when activeItem is specified", () => {
    render(<UserMenuPopover activeItem="bookmarks" />);
    const bookmarksBtn = screen.getByTestId("user-menu-item-bookmarks");
    expect(bookmarksBtn.className).toContain("activeItem");
  });

  it("calls onClose on outside click", () => {
    const handleClose = vi.fn();
    render(
      <div>
        <div data-testid="outside">Outside area</div>
        <UserMenuPopover onClose={handleClose} />
      </div>
    );

    fireEvent.mouseDown(screen.getByTestId("outside"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
