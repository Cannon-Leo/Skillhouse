import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SubscriptionBanner } from "./SubscriptionBanner";

describe("SubscriptionBanner UI Component (Figma Node 751:5654)", () => {
  it("renders default Figma copy and arrow icon matching Node 751:5654", () => {
    render(<SubscriptionBanner />);
    
    expect(screen.getByText("Subsribe - All Skills, one subscription")).toBeInTheDocument();
    expect(
      screen.getByText("No exclusions. Access all curated, verified and continuously updated skills")
    ).toBeInTheDocument();
    expect(screen.getByTestId("subscription-banner-arrow")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /subscribe to all skills/i })).toBeInTheDocument();
  });

  it("renders custom title, subtitle, and aria label", () => {
    render(
      <SubscriptionBanner
        title="Custom Subscription Title"
        subtitle="Custom Subtitle Message"
        ariaLabel="Join Club"
        testId="custom-banner"
      />
    );

    expect(screen.getByText("Custom Subscription Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Subtitle Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Join Club" })).toBeInTheDocument();
    expect(screen.getByTestId("custom-banner")).toBeInTheDocument();
  });

  it("renders subscribed state title when isSubscribed is true", () => {
    render(<SubscriptionBanner isSubscribed={true} />);
    expect(screen.getByText("All-Access Subscription Active")).toBeInTheDocument();
  });

  it("triggers onSubscribe on mouse click", () => {
    const handleSubscribe = vi.fn();
    render(<SubscriptionBanner onSubscribe={handleSubscribe} />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleSubscribe).toHaveBeenCalledTimes(1);
  });

  it("triggers onSubscribe on Enter and Space keypresses", () => {
    const handleSubscribe = vi.fn();
    render(<SubscriptionBanner onSubscribe={handleSubscribe} />);
    const banner = screen.getByRole("button");

    fireEvent.keyDown(banner, { key: "Enter" });
    expect(handleSubscribe).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(banner, { key: " " });
    expect(handleSubscribe).toHaveBeenCalledTimes(2);

    fireEvent.keyDown(banner, { key: "Tab" });
    expect(handleSubscribe).toHaveBeenCalledTimes(2);
  });
});
