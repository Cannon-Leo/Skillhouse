import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { NavBar } from "./NavBar";

describe("Features NavBar Component", () => {
  beforeEach(() => {
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  it("renders brand, navigation links, and search bar", () => {
    render(<NavBar />);
    expect(screen.getByAltText("Skillhouse Logo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /categories/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Request a skill" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search skills / outputs")).toBeInTheDocument();
  });

  it("calls onViewChange when brand or skills is clicked", () => {
    const handleViewChange = vi.fn();
    render(<NavBar onViewChange={handleViewChange} />);
    const brand = screen.getByRole("button", { name: /skillhouse home/i });
    fireEvent.click(brand);
    expect(handleViewChange).toHaveBeenCalledWith("home");

    const skillsBtn = screen.getByRole("button", { name: "Skills" });
    fireEvent.click(skillsBtn);
    expect(handleViewChange).toHaveBeenCalledWith("marketplace");
  });

  it("toggles categories mega menu, clicks item, and closes on outside click", () => {
    const handleSelectCategory = vi.fn();
    render(<NavBar onSelectCategory={handleSelectCategory} />);
    const catBtn = screen.getByRole("button", { name: /categories/i });
    expect(catBtn).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Open mega menu
    fireEvent.click(catBtn);
    expect(catBtn).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();

    // Click an item in the mega menu
    const menuItem = screen.getByText("Web design");
    fireEvent.click(menuItem);
    expect(handleSelectCategory).toHaveBeenCalledWith("Web design");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Open and click See all Skills
    fireEvent.click(catBtn);
    const seeAllBtn = screen.getByRole("button", { name: /see all skills/i });
    fireEvent.click(seeAllBtn);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Click outside to close
    fireEvent.click(catBtn);
    fireEvent.mouseDown(document.body);
    expect(catBtn).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Open and click backdrop directly to close
    fireEvent.click(catBtn);
    const backdrop = screen.getByTestId("categories-backdrop");
    expect(backdrop).toBeInTheDocument();
    fireEvent.click(backdrop);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("toggles mobile menu drawer and navigates from mobile links", () => {
    const handleViewChange = vi.fn();
    const handleGetStarted = vi.fn();
    render(
      <NavBar
        onViewChange={handleViewChange}
        onGetStarted={handleGetStarted}
      />
    );
    const mobileBtn = screen.getByRole("button", { name: /open menu/i });
    expect(mobileBtn).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(mobileBtn);
    const drawer1 = screen.getByRole("dialog", { name: /mobile navigation/i });
    expect(drawer1).toBeInTheDocument();

    // Click marketplace link in mobile drawer
    const mktLink = within(drawer1).getByRole("button", { name: /skills marketplace/i });
    fireEvent.click(mktLink);
    expect(handleViewChange).toHaveBeenCalledWith("marketplace");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    // Open again and click design system
    fireEvent.click(mobileBtn);
    const drawer2 = screen.getByRole("dialog", { name: /mobile navigation/i });
    const dsLink = within(drawer2).getByRole("button", { name: /design system/i });
    fireEvent.click(dsLink);
    expect(handleViewChange).toHaveBeenCalledWith("design-system");

    // Open again and click get started in mobile drawer
    fireEvent.click(mobileBtn);
    const drawer3 = screen.getByRole("dialog", { name: /mobile navigation/i });
    const getStartedMobile = within(drawer3).getByRole("button", { name: /get started/i });
    fireEvent.click(getStartedMobile);
    expect(handleGetStarted).toHaveBeenCalledTimes(1);
  });

  it("fires onSearchChange when typing in search input", () => {
    const handleSearch = vi.fn();
    render(<NavBar onSearchChange={handleSearch} />);
    const searchInput = screen.getByPlaceholderText("Search skills / outputs");
    fireEvent.change(searchInput, { target: { value: "automation" } });
    expect(handleSearch).toHaveBeenCalledWith("automation");
  });

  it("calls onGetStarted or onOpenLoginModal when desktop CTA button is clicked", () => {
    const handleLoginModal = vi.fn();
    render(<NavBar onOpenLoginModal={handleLoginModal} />);
    const ctaBtn = screen.getByTestId("header-get-started-btn");
    fireEvent.click(ctaBtn);
    expect(handleLoginModal).toHaveBeenCalledTimes(1);
  });

  it("renders user avatar and toggles profile menu when isSignedIn is true", () => {
    const handleSignOut = vi.fn();
    render(
      <NavBar
        isSignedIn={true}
        onSignOut={handleSignOut}
        user={{ name: "Jane Doe", email: "jane@test.com" }}
      />
    );
    const avatarBtn = screen.getByTestId("header-avatar-button");
    expect(avatarBtn).toBeInTheDocument();
    expect(screen.queryByTestId("header-get-started-btn")).not.toBeInTheDocument();

    // Open user menu
    fireEvent.click(avatarBtn);
    expect(screen.getByText("Bookmarks")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();

    // Click Logout
    const logoutBtn = screen.getByRole("menuitem", { name: /logout/i });
    fireEvent.click(logoutBtn);
    expect(handleSignOut).toHaveBeenCalledTimes(1);
  });

  it("toggles view between marketplace and design-system", () => {
    const handleViewChange = vi.fn();
    render(
      <NavBar
        currentView="marketplace"
        onViewChange={handleViewChange}
      />
    );
    const toggleBadge = screen.getByRole("button", { name: /design system/i });
    fireEvent.click(toggleBadge);
    expect(handleViewChange).toHaveBeenCalledWith("design-system");
  });

  it("handles user menu popover callbacks in signed-in state", () => {
    const handleSignOut = vi.fn();
    render(<NavBar isSignedIn={true} onSignOut={handleSignOut} />);

    const avatarBtn = screen.getByTestId("header-avatar-button");
    fireEvent.click(avatarBtn);

    // Profile click
    fireEvent.click(screen.getByText("Profile"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Reopen and test Account settings
    fireEvent.click(avatarBtn);
    fireEvent.click(screen.getByText("Account settings"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Reopen and test Bookmarks
    fireEvent.click(avatarBtn);
    fireEvent.click(screen.getByText("Bookmarks"));
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Click square action button
    const actionBtn = screen.getByLabelText("Create skill or workflow");
    fireEvent.click(actionBtn);
  });

  it("handles onRequestSkill callback from desktop and mobile drawer", () => {
    const handleRequestSkill = vi.fn();
    render(<NavBar onRequestSkill={handleRequestSkill} />);

    // Click desktop nav link
    const requestBtn = screen.getByRole("button", { name: "Request a skill" });
    fireEvent.click(requestBtn);
    expect(handleRequestSkill).toHaveBeenCalledTimes(1);

    // Open mobile drawer and click
    const mobileBtn = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(mobileBtn);
    const drawer = screen.getByRole("dialog", { name: /mobile navigation/i });
    const mobileRequest = within(drawer).getByRole("button", { name: /request a skill/i });
    fireEvent.click(mobileRequest);
    expect(handleRequestSkill).toHaveBeenCalledTimes(2);
  });
});
