import React, { Suspense } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "./page";

// Mock router
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Home Page Authentication & Logged-In Flow", () => {
  beforeEach(() => {
    localStorage.clear();
    mockPush.mockClear();
  });

  it("completes full login flow from 'Get started' button and opens profile/help center screens", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    );

    // 1. Initial State: "Get started" button is visible, avatar is not
    const getStartedBtn = screen.getByTestId("header-get-started-btn");
    expect(getStartedBtn).toBeInTheDocument();
    expect(screen.queryByTestId("header-avatar-button")).not.toBeInTheDocument();

    // 2. Click "Get started" -> LoginModal opens
    fireEvent.click(getStartedBtn);
    expect(await screen.findByText("Welcome to Skillhouse")).toBeInTheDocument();

    // 3. Click "Continue with Google" -> User logs in
    const googleLoginBtn = screen.getByTestId("login-google-btn");
    fireEvent.click(googleLoginBtn);

    // 4. Modal closes and Avatar button is now visible in the header
    await waitFor(() => {
      expect(screen.queryByText("Welcome to Skillhouse")).not.toBeInTheDocument();
      expect(screen.getByTestId("header-avatar-button")).toBeInTheDocument();
      expect(screen.queryByTestId("header-get-started-btn")).not.toBeInTheDocument();
    });

    // 5. Click Avatar -> opens UserMenuPopover
    const avatarBtn = screen.getByTestId("header-avatar-button");
    fireEvent.click(avatarBtn);
    expect(screen.getByTestId("user-menu-popover")).toBeInTheDocument();

    // 6. Click Profile -> opens UserProfileModal
    const profileItem = screen.getByTestId("user-menu-item-profile");
    fireEvent.click(profileItem);
    expect(await screen.findByTestId("user-profile-modal")).toBeInTheDocument();
    expect(screen.getByText("Alex Vance")).toBeInTheDocument();
    expect(screen.getByText("Developer Account")).toBeInTheDocument();

    // Close profile modal
    const closeProfileBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeProfileBtn);
    await waitFor(() => {
      expect(screen.queryByTestId("user-profile-modal")).not.toBeInTheDocument();
    });

    // 7. Click Avatar -> click Help center -> opens HelpCenterModal
    fireEvent.click(avatarBtn);
    const helpItem = screen.getByTestId("user-menu-item-help");
    fireEvent.click(helpItem);
    expect(await screen.findByTestId("help-center-modal")).toBeInTheDocument();
    expect(screen.getByText(/Skillhouse Help Center & Documentation/i)).toBeInTheDocument();

    const closeHelpBtn = screen.getByRole("button", { name: /^Close$/i });
    fireEvent.click(closeHelpBtn);

    // 8. Open Settings tab directly from user menu
    fireEvent.click(avatarBtn);
    const settingsItem = screen.getByTestId("user-menu-item-settings");
    fireEvent.click(settingsItem);
    expect(await screen.findByTestId("user-profile-modal")).toBeInTheDocument();
    expect(screen.getByText("Runtime Preferences")).toBeInTheDocument();

    // Close settings
    fireEvent.click(screen.getByRole("button", { name: /done/i }));

    // 9. Sign out from user menu
    fireEvent.click(avatarBtn);
    const logoutBtn = screen.getByTestId("user-menu-item-logout");
    fireEvent.click(logoutBtn);
    await waitFor(() => {
      expect(screen.getByTestId("header-get-started-btn")).toBeInTheDocument();
      expect(screen.queryByTestId("header-avatar-button")).not.toBeInTheDocument();
    });
  });

  it("supports GitHub login flow", async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <HomePage />
      </Suspense>
    );

    const getStartedBtn = screen.getByTestId("header-get-started-btn");
    fireEvent.click(getStartedBtn);

    const githubLoginBtn = screen.getByTestId("login-github-btn");
    fireEvent.click(githubLoginBtn);

    await waitFor(() => {
      expect(screen.getByTestId("header-avatar-button")).toBeInTheDocument();
    });
  });
});
