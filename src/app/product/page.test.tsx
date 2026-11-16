import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProductPage from "./page";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/product",
}));

describe("ProductPage (/product)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders product hero heading, waitlist input, and agent ribbons", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /the app store & runtime for ai agent skills/i })
    ).toBeInTheDocument();

    const waitlistInputs = screen.getAllByPlaceholderText(/enter your work email/i);
    expect(waitlistInputs.length).toBeGreaterThanOrEqual(1);

    expect(screen.getAllByText(/Claude Code/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Cursor/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText(/Antigravity/i).length).toBeGreaterThanOrEqual(1);
  });

  it("renders all four core product pillars and comparison section", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /why raw prompts fail in production/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /one-command fleet synchronization/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /the gauntlet gate/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /universal mcp bridge/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /creator royalties & payouts/i })
    ).toBeInTheDocument();
  });

  it("toggles FAQ accordion questions and reveals/collapses answers", async () => {
    render(<ProductPage />);
    // By default first question is open
    expect(screen.getByText(/what exactly is skillhouse\?/i)).toBeInTheDocument();

    const firstQuestionBtn = screen.getByRole("button", {
      name: /what exactly is skillhouse\?/i,
    });
    // Click to collapse
    fireEvent.click(firstQuestionBtn);

    // Open second question
    const secondQuestionBtn = screen.getByRole("button", {
      name: /how does 'npx skillhouse sync' work\?/i,
    });
    fireEvent.click(secondQuestionBtn);

    await waitFor(() => {
      expect(
        screen.getByText(/our lightweight cli reads your local project setup/i)
      ).toBeInTheDocument();
    });
  });

  it("copies CLI command from terminal simulation block", async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    render(<ProductPage />);
    const copyCliBtn = screen.getByRole("button", { name: /copy cli command/i });
    fireEvent.click(copyCliBtn);

    expect(mockClipboard.writeText).toHaveBeenCalledWith("npx skillhouse sync");
  });

  it("handles navbar view changes for all routes and footer navigation links", () => {
    render(<ProductPage />);

    // Click Skills nav link in header
    const skillsBtn = screen.getByRole("button", { name: "Skills" });
    fireEvent.click(skillsBtn);
    expect(mockPush).toHaveBeenCalledWith("/skills");

    // Click Brand logo in header
    const brand = screen.getByRole("button", { name: /skillhouse home/i });
    fireEvent.click(brand);
    expect(mockPush).toHaveBeenCalledWith("/");

    // Click Skills in footer Explore column
    const footerSkillsLink = screen.getByRole("link", { name: "Skills" });
    expect(footerSkillsLink).toHaveAttribute("href", "/skills");

    // Click a category in footer
    const categoryLink = screen.getByRole("link", { name: "Web design" });
    fireEvent.click(categoryLink);
    expect(mockPush).toHaveBeenCalledWith("/skills?category=web-design");
  });

  it("handles navbar view change for my-skills and design-system routes", () => {
    const { unmount } = render(<ProductPage />);
    unmount();

    // Verify all branches by calling directly with onViewChange simulation
    const pushMock = vi.fn();
    vi.mocked(mockPush).mockImplementation(pushMock);

    render(<ProductPage />);
    const mobileBtn = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(mobileBtn);

    const mySkillsBtn = screen.getByRole("button", { name: /my skills workspace/i });
    fireEvent.click(mySkillsBtn);
    expect(pushMock).toHaveBeenCalledWith("/?view=my-skills");

    fireEvent.click(mobileBtn);
    const dsBtn = screen.getByRole("button", { name: /design system/i });
    fireEvent.click(dsBtn);
    expect(pushMock).toHaveBeenCalledWith("/design-system");
  });

  it("opens login modal from header get started, performs google login and signs out", async () => {
    render(<ProductPage />);

    const getStartedBtn = screen.getByTestId("header-get-started-btn");
    fireEvent.click(getStartedBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const googleBtn = screen.getByRole("button", { name: /continue with google/i });
    fireEvent.click(googleBtn);

    // Header avatar button should appear
    await waitFor(() => {
      expect(screen.getByTestId("header-avatar-button")).toBeInTheDocument();
    });

    // Click user avatar to open popover menu
    const avatarBtn = screen.getByTestId("header-avatar-button");
    fireEvent.click(avatarBtn);

    // Click Profile item in menu
    const profileItem = screen.getByTestId("user-menu-item-profile");
    fireEvent.click(profileItem);

    // Close profile modal
    const closeBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeBtn);

    // Open avatar menu again and click Logout
    fireEvent.click(avatarBtn);
    const logoutBtn = screen.getByTestId("user-menu-item-logout");
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(screen.getByTestId("header-get-started-btn")).toBeInTheDocument();
    });
  });

  it("supports github oauth login flow", async () => {
    render(<ProductPage />);

    fireEvent.click(screen.getByTestId("header-get-started-btn"));
    const githubBtn = screen.getByRole("button", { name: /continue with github/i });
    fireEvent.click(githubBtn);

    await waitFor(() => {
      expect(screen.getByTestId("header-avatar-button")).toBeInTheDocument();
    });
  });

  it("opens request skill modal from header and closes it", () => {
    render(<ProductPage />);
    const requestSkillBtn = screen.getByTestId("header-request-skill-action-btn");
    fireEvent.click(requestSkillBtn);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    const closeBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders the VIP early access CTA banner at the bottom", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", {
        name: /ready to unlock deterministic ai agent workflows\?/i,
      })
    ).toBeInTheDocument();
  });
});
