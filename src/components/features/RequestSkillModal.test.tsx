import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { RequestSkillModal } from "./RequestSkillModal";

describe("RequestSkillModal", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("does not render when isOpen is false", () => {
    const { container } = render(
      <RequestSkillModal isOpen={false} onClose={vi.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders with introductory copy and required form fields when open", () => {
    render(<RequestSkillModal isOpen={true} onClose={vi.fn()} />);

    expect(screen.getByRole("heading", { name: "Request a skill" })).toBeInTheDocument();
    expect(
      screen.getByText(/Tell us what you want an AI agent to help you do/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/What should the skill help you do\?/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/What are you trying to do, and what would a good result look like\?/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Target agent/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Want updates about this request\?/i)).toBeInTheDocument();
  });

  it("pre-fills title when initialTitle prop is provided", () => {
    render(
      <RequestSkillModal
        isOpen={true}
        onClose={vi.fn()}
        initialTitle="Figma to Tailwind converter"
      />
    );

    const titleInput = screen.getByLabelText(/What should the skill help you do\?/i) as HTMLInputElement;
    expect(titleInput.value).toBe("Figma to Tailwind converter");
  });

  it("validates required fields and email format before submitting", () => {
    render(<RequestSkillModal isOpen={true} onClose={vi.fn()} />);

    const submitBtn = screen.getByTestId("submit-skill-request-btn");
    fireEvent.click(submitBtn);

    expect(screen.getByText("Request title is required")).toBeInTheDocument();
    expect(
      screen.getByText("Problem and desired outcome description is required")
    ).toBeInTheDocument();

    // Type short invalid entries
    const titleInput = screen.getByLabelText(/What should the skill help you do\?/i);
    fireEvent.change(titleInput, { target: { value: "ab" } });
    fireEvent.click(submitBtn);
    expect(screen.getByText("Title must be at least 3 characters")).toBeInTheDocument();

    // Enter invalid email
    const emailInput = screen.getByLabelText(/Want updates about this request\?/i);
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(submitBtn);
    expect(screen.getByText("Please enter a valid email address")).toBeInTheDocument();
  });

  it("submits successfully and presents the confirmation state with Request ID", () => {
    const handleSubmitSuccess = vi.fn();
    render(
      <RequestSkillModal
        isOpen={true}
        onClose={vi.fn()}
        onSubmitSuccess={handleSubmitSuccess}
      />
    );

    fireEvent.change(screen.getByLabelText(/What should the skill help you do\?/i), {
      target: { value: "Automated PR reviews for accessibility" },
    });
    fireEvent.change(
      screen.getByLabelText(/What are you trying to do, and what would a good result look like\?/i),
      {
        target: {
          value:
            "I want an agent to scan PRs for missing aria labels and color contrast issues, and post formatted suggestions directly into the GitHub PR.",
        },
      }
    );
    fireEvent.change(screen.getByLabelText(/Want updates about this request\?/i), {
      target: { value: "alex@example.com" },
    });

    const submitBtn = screen.getByTestId("submit-skill-request-btn");
    fireEvent.click(submitBtn);

    expect(screen.getByRole("heading", { name: "Request submitted" })).toBeInTheDocument();
    expect(
      screen.getByText(/Thanks for sharing what you need. We’ll review your request/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/ID: req_/i)).toBeInTheDocument();
    expect(handleSubmitSuccess).toHaveBeenCalledTimes(1);
    expect(handleSubmitSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Automated PR reviews for accessibility",
        email: "alex@example.com",
        status: "Submitted",
      })
    );

    // Verify localStorage persistence
    const saved = JSON.parse(localStorage.getItem("skill_requests") || "[]");
    expect(saved).toHaveLength(1);
    expect(saved[0].title).toBe("Automated PR reviews for accessibility");
  });

  it("closes modal on cancel and on back to marketplace button click", () => {
    const handleClose = vi.fn();
    const { rerender } = render(<RequestSkillModal isOpen={true} onClose={handleClose} />);

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(handleClose).toHaveBeenCalledTimes(1);

    // Test back to marketplace in success screen
    rerender(
      <RequestSkillModal
        isOpen={true}
        onClose={handleClose}
        initialTitle="Test Skill"
      />
    );
    fireEvent.change(
      screen.getByLabelText(/What are you trying to do, and what would a good result look like\?/i),
      { target: { value: "Valid description for the test outcome." } }
    );
    fireEvent.click(screen.getByTestId("submit-skill-request-btn"));

    const backBtn = screen.getByTestId("back-to-marketplace-btn");
    fireEvent.click(backBtn);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});

  it("updates category, target agent, and access preference fields", () => {
    render(<RequestSkillModal isOpen={true} onClose={vi.fn()} />);

    const categorySelect = screen.getByLabelText(/Category/i);
    fireEvent.change(categorySelect, { target: { value: "Design & creative" } });
    expect((categorySelect as HTMLSelectElement).value).toBe("Design & creative");

    const agentSelect = screen.getByLabelText(/Target agent/i);
    fireEvent.change(agentSelect, { target: { value: "Claude Code" } });
    expect((agentSelect as HTMLSelectElement).value).toBe("Claude Code");

    const freeRadio = screen.getByRole("radio", { name: "Free" });
    fireEvent.click(freeRadio);
    expect((freeRadio as HTMLInputElement).checked).toBe(true);

    const subRadio = screen.getByRole("radio", { name: "Included in a subscription" });
    fireEvent.click(subRadio);
    expect((subRadio as HTMLInputElement).checked).toBe(true);
  });
