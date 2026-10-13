import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { UserProfileModal, UserProfileData } from "./UserProfileModal";

describe("UserProfileModal Component", () => {
  const mockUser: UserProfileData = {
    name: "Alex Vance",
    email: "alex.vance@skillhouse.ai",
    avatarUrl: "/figma/header_avatar_figma.png",
    role: "Verified Developer",
    provider: "google",
    apiKey: "sk_live_test_123456",
  };

  it("does not render when isOpen is false or user is null", () => {
    const { rerender } = render(<UserProfileModal isOpen={false} onClose={vi.fn()} user={mockUser} />);
    expect(screen.queryByTestId("user-profile-modal")).not.toBeInTheDocument();

    rerender(<UserProfileModal isOpen={true} onClose={vi.fn()} user={null} />);
    expect(screen.queryByTestId("user-profile-modal")).not.toBeInTheDocument();
  });

  it("renders user information and badges when open with Google provider", () => {
    render(<UserProfileModal isOpen={true} onClose={vi.fn()} user={mockUser} />);
    expect(screen.getByTestId("user-profile-modal")).toBeInTheDocument();
    expect(screen.getByText("Alex Vance")).toBeInTheDocument();
    expect(screen.getByText("alex.vance@skillhouse.ai")).toBeInTheDocument();
    expect(screen.getByText("Verified Developer")).toBeInTheDocument();
    expect(screen.getByText("Google OAuth")).toBeInTheDocument();
  });

  it("renders correctly with GitHub provider and fallback fields", () => {
    const githubUser: UserProfileData = {
      name: "Alex Vance",
      provider: "github",
    };
    render(<UserProfileModal isOpen={true} onClose={vi.fn()} user={githubUser} />);
    expect(screen.getByText("GitHub OAuth")).toBeInTheDocument();
    expect(screen.getByText("developer@skillhouse.ai")).toBeInTheDocument();
  });

  it("switches tabs between Profile, CLI & API Keys, and Preferences", () => {
    render(<UserProfileModal isOpen={true} onClose={vi.fn()} user={mockUser} />);

    // Click CLI tab
    const cliTab = screen.getByRole("tab", { name: /cli & api keys/i });
    fireEvent.click(cliTab);
    expect(screen.getByText("Skillhouse Secret API Key")).toBeInTheDocument();
    expect(screen.getByText("sk_live_test_123456")).toBeInTheDocument();

    // Click Preferences tab
    const settingsTab = screen.getByRole("tab", { name: /account preferences/i });
    fireEvent.click(settingsTab);
    expect(screen.getByText("Runtime Preferences")).toBeInTheDocument();
    expect(screen.getByText("Default Agent Environment")).toBeInTheDocument();
  });

  it("handles settings interactions (runtime select, autoSync switch, telemetry switch, and done button)", () => {
    const handleClose = vi.fn();
    render(<UserProfileModal isOpen={true} onClose={handleClose} user={mockUser} initialTab="settings" />);

    // Change runtime select
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "cursor" } });
    expect(select).toHaveValue("cursor");

    // Toggle switches
    const switches = screen.getAllByRole("switch");
    expect(switches[0]).toHaveAttribute("aria-checked", "true");
    fireEvent.click(switches[0]);
    expect(switches[0]).toHaveAttribute("aria-checked", "false");

    expect(switches[1]).toHaveAttribute("aria-checked", "false");
    fireEvent.click(switches[1]);
    expect(switches[1]).toHaveAttribute("aria-checked", "true");

    // Click Done button
    const doneBtn = screen.getByRole("button", { name: /done/i });
    fireEvent.click(doneBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("copies API key and CLI sync command to clipboard", async () => {
    vi.useFakeTimers();
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<UserProfileModal isOpen={true} onClose={vi.fn()} user={mockUser} initialTab="cli" />);

    // Copy API key
    const copyKeyBtn = screen.getByRole("button", { name: /copy key/i });
    fireEvent.click(copyKeyBtn);
    expect(writeTextMock).toHaveBeenCalledWith("sk_live_test_123456");

    // Copy Command
    const copyCmdBtn = screen.getByRole("button", { name: /copy command/i });
    fireEvent.click(copyCmdBtn);
    expect(writeTextMock).toHaveBeenCalledWith(expect.stringContaining("skillhouse sync"));

    vi.advanceTimersByTime(2100);
    vi.useRealTimers();
  });

  it("fires onSignOut and onClose when sign out button is clicked", () => {
    const handleSignOut = vi.fn();
    const handleClose = vi.fn();
    render(
      <UserProfileModal
        isOpen={true}
        onClose={handleClose}
        user={mockUser}
        onSignOut={handleSignOut}
      />
    );

    const signOutBtn = screen.getByRole("button", { name: /sign out of skillhouse/i });
    fireEvent.click(signOutBtn);
    expect(handleSignOut).toHaveBeenCalledTimes(1);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
