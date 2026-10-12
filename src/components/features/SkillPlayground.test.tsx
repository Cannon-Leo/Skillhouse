import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SkillPlayground } from "./SkillPlayground";

describe("SkillPlayground Component", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("renders playground description, text input, and quick action chips", () => {
    render(<SkillPlayground />);

    expect(screen.getByPlaceholderText(/type notes or prompt instructions/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /shorten/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lengthen/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /re-write/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^generate$/i })).toBeInTheDocument();
  });

  it("populates default text when action is triggered with empty input", () => {
    render(<SkillPlayground />);

    const shortenBtn = screen.getByRole("button", { name: /shorten/i });
    fireEvent.click(shortenBtn);

    const textarea = screen.getByPlaceholderText(/type notes or prompt instructions/i) as HTMLTextAreaElement;
    expect(textarea.value).toContain("Draft a clean, production-ready AI workflow");
  });

  it("executes generation API call and displays result with copy & save actions", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        result: "Synthesized executive workflow ready for deployment.",
        cached: true,
      }),
    } as unknown as Response);

    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<SkillPlayground />);

    const textarea = screen.getByPlaceholderText(/type notes or prompt instructions/i);
    fireEvent.change(textarea, { target: { value: "Build daily standup summary workflow" } });

    const generateBtn = screen.getByRole("button", { name: /^generate$/i });
    fireEvent.click(generateBtn);

    await waitFor(() => {
      expect(screen.getByText("Synthesized executive workflow ready for deployment.")).toBeInTheDocument();
    });

    expect(screen.getByText(/prompt cached/i)).toBeInTheDocument();

    // Copy action
    const copyBtn = screen.getByRole("button", { name: /copy/i });
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalledWith("Synthesized executive workflow ready for deployment.");

    // Save action
    const saveBtn = screen.getByRole("button", { name: /save/i });
    fireEvent.click(saveBtn);
  });

  it("handles API error or network failure gracefully", async () => {
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network failed"));

    render(<SkillPlayground />);

    const textarea = screen.getByPlaceholderText(/type notes or prompt instructions/i);
    fireEvent.change(textarea, { target: { value: "Test error state" } });

    const submitBtn = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Network error contacting AI generation endpoint.")).toBeInTheDocument();
    });
  });
});
