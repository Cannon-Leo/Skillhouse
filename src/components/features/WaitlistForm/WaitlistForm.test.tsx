import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WaitlistForm } from "./WaitlistForm";

describe("WaitlistForm Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders email input and submit button cleanly without made-up claims across variants", () => {
    const { rerender } = render(<WaitlistForm variant="compact" />);
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
    expect(screen.getByTestId("waitlist-submit-btn")).toBeInTheDocument();
    expect(screen.queryByText(/Primary Agent:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/1,420\+ engineers/i)).not.toBeInTheDocument();

    rerender(<WaitlistForm variant="banner" />);
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
  });

  it("shows an error when submitting an empty email", () => {
    render(<WaitlistForm />);
    const submitBtn = screen.getByTestId("waitlist-submit-btn");
    fireEvent.click(submitBtn);

    expect(screen.getByRole("alert")).toHaveTextContent(/please enter your email address/i);

    // Typing in email resets the error status
    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "a" } });
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("shows an error when submitting an invalid email format", () => {
    render(<WaitlistForm />);
    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "invalid-email" } });

    const submitBtn = screen.getByTestId("waitlist-submit-btn");
    fireEvent.click(submitBtn);

    expect(screen.getByRole("alert")).toHaveTextContent(/valid email address/i);
  });

  it("handles server error response cleanly with custom and default fallback messages", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({
        success: false,
        error: "Server capacity reached.",
      }),
    });
    global.fetch = mockFetch;

    const { rerender } = render(<WaitlistForm />);
    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "error@test.com" } });
    fireEvent.click(screen.getByTestId("waitlist-submit-btn"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("Server capacity reached.");
    });

    // Test default fallback error when data.error is missing
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
      }),
    });
    rerender(<WaitlistForm />);
    fireEvent.change(input, { target: { value: "error2@test.com" } });
    fireEvent.click(screen.getByTestId("waitlist-submit-btn"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/unable to join waitlist/i);
    });
  });

  it("handles fetch network failure and falls back gracefully", async () => {
    const handleSuccess = vi.fn();
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network failed"));
    global.fetch = mockFetch;

    render(<WaitlistForm onSuccessCallback={handleSuccess} />);
    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "offline@test.com" } });
    fireEvent.click(screen.getByTestId("waitlist-submit-btn"));

    await waitFor(() => {
      expect(screen.getByTestId("waitlist-success")).toBeInTheDocument();
    });
    expect(handleSuccess).toHaveBeenCalledWith(1, "offline@test.com");
  });

  it("submits valid email, displays already joined heading when user already on list, and shares link", async () => {
    const mockClipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
    Object.assign(navigator, { clipboard: mockClipboard });

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        position: 42,
        email: "alex@company.com",
        alreadyJoined: true,
      }),
    });
    global.fetch = mockFetch;

    render(<WaitlistForm />);

    const input = screen.getByPlaceholderText(/enter your email address/i);
    fireEvent.change(input, { target: { value: "alex@company.com" } });

    const submitBtn = screen.getByTestId("waitlist-submit-btn");
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByTestId("waitlist-success")).toBeInTheDocument();
    });

    expect(screen.getByText(/you're already on the list!/i)).toBeInTheDocument();
    expect(screen.getByText(/#42/)).toBeInTheDocument();

    // Click copy share referral link
    const shareBtn = screen.getByRole("button", { name: /share invite link/i });
    fireEvent.click(shareBtn);
    expect(mockClipboard.writeText).toHaveBeenCalledWith("https://skillhouse.dev/product?ref=waitlist");

    // Click register another email
    const resetBtn = screen.getByRole("button", { name: /register another email/i });
    fireEvent.click(resetBtn);

    expect(screen.queryByTestId("waitlist-success")).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your email address/i)).toBeInTheDocument();
  });
});
