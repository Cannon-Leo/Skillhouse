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

  it("renders product hero heading, subtitle from pitch deck, and three foundational ideas", () => {
    render(<ProductPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Skillhouse" })).toBeInTheDocument();
    expect(
      screen.getByText(/turn everyday tasks into simple, repeatable workflows with skills built for your agent/i)
    ).toBeInTheDocument();

    // Three ideas from Slide 2
    expect(screen.getByText("An AI agent")).toBeInTheDocument();
    expect(screen.getByText("A skill")).toBeInTheDocument();
    expect(screen.getAllByText("Skillhouse").length).toBeGreaterThanOrEqual(1);

    // Clean waitlist input (no made-up numbers or agent pills)
    const waitlistInputs = screen.getAllByPlaceholderText(/enter your email address/i);
    expect(waitlistInputs.length).toBeGreaterThanOrEqual(1);
    expect(screen.queryByText(/1,420\+ engineers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Primary Agent:/i)).not.toBeInTheDocument();
  });

  it("renders 'What changed' section with Anthropic standard and compatible tools", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /one skill now works in many ai tools/i })
    ).toBeInTheDocument();
    expect(screen.getByText("client-update")).toBeInTheDocument();
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("Cursor")).toBeInTheDocument();
    expect(screen.getByText("GitHub Copilot")).toBeInTheDocument();
    expect(screen.getByText("Codex")).toBeInTheDocument();
    expect(screen.getByText("Gemini")).toBeInTheDocument();
  });

  it("renders 'The problem' section with three core questions", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /anyone can write a skill\. nobody can tell which to trust\./i })
    ).toBeInTheDocument();
    expect(screen.getByText(/does it work\?/i)).toBeInTheDocument();
    expect(screen.getByText(/is it safe\?/i)).toBeInTheDocument();
    expect(screen.getByText(/who made it\?/i)).toBeInTheDocument();
  });

  it("renders 'What we offer' section with Find, Install, and Ask", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /a trusted place to find, install and ask for skills/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Find" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Install" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ask" })).toBeInTheDocument();
  });

  it("renders verified African developer ecosystem stats from BCG, OpenUK, and venture reports", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /africa's developer community is growing faster than any other continent/i })
    ).toBeInTheDocument();
    expect(screen.getByText("4.7M")).toBeInTheDocument();
    expect(screen.getByText("21%")).toBeInTheDocument();
    expect(screen.getByText("9.3M")).toBeInTheDocument();
    expect(screen.getByText("$4.1bn")).toBeInTheDocument();
    expect(screen.getByText("$1.64bn")).toBeInTheDocument();
    expect(screen.getByText("$3.5bn")).toBeInTheDocument();
  });

  it("renders 'Why we win' trust flywheel and honest pricing cards from pitch deck", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /skillhouse gets better the more it is used/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/a copycat can copy a skill/i)).toBeInTheDocument();

    // Flywheel
    expect(screen.getByRole("heading", { name: "Use" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Improve" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Earn trust" })).toBeInTheDocument();

    // Pricing (Slide 9)
    expect(
      screen.getByRole("heading", { name: /free to start\. one plan for everything\./i })
    ).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$5.99")).toBeInTheDocument();
    expect(screen.getAllByText("Makers").length).toBeGreaterThanOrEqual(1);
  });

  it("renders 'Where we are' roadmap and 'The ask' with founder contacts", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", { name: /the product works\. the first season is next\./i })
    ).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("First season")).toBeInTheDocument();

    // The Ask & Founders
    expect(
      screen.getByRole("heading", { name: /help us build the first season of the house\./i })
    ).toBeInTheDocument();
    expect(screen.getByText(/khalid@skillhouse\.dev/i)).toBeInTheDocument();
    expect(screen.getByText(/nsikan@skillhouse\.dev/i)).toBeInTheDocument();
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

    // Open avatar menu again, click Settings, then close
    fireEvent.click(avatarBtn);
    const settingsItem = screen.getByTestId("user-menu-item-settings");
    fireEvent.click(settingsItem);
    const closeSettingsBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeSettingsBtn);

    // Open avatar menu again, click Help Center, then close
    fireEvent.click(avatarBtn);
    const helpItem = screen.getByTestId("user-menu-item-help");
    fireEvent.click(helpItem);
    const closeHelpBtn = screen.getByRole("button", { name: /close dialog/i });
    fireEvent.click(closeHelpBtn);

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

  it("loads stored user profile from localStorage if present", () => {
    localStorage.setItem(
      "skillhouse_user",
      JSON.stringify({
        name: "Stored Maker",
        email: "stored@skillhouse.dev",
        avatarUrl: "/figma/header_avatar_figma.png",
      })
    );

    render(<ProductPage />);
    expect(screen.getByTestId("header-avatar-button")).toBeInTheDocument();
  });

  it("renders the early access CTA banner at the bottom", () => {
    render(<ProductPage />);
    expect(
      screen.getByRole("heading", {
        name: /ready to teach your ai agent new skills\?/i,
      })
    ).toBeInTheDocument();
  });
});
