import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { useScrollLock } from "./useScrollLock";

describe("useScrollLock", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    document.body.style.paddingRight = "";
  });

  it("locks both body and html when isLocked is true", () => {
    const { unmount } = renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("does not lock when isLocked is false", () => {
    const { unmount } = renderHook(() => useScrollLock(false));

    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");

    unmount();
  });

  it("supports reference counting for nested locks", () => {
    const hook1 = renderHook(() => useScrollLock(true));
    const hook2 = renderHook(() => useScrollLock(true));

    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");

    // Unmount first hook - lock should still be active because hook2 is still open
    hook1.unmount();
    expect(document.body.style.overflow).toBe("hidden");
    expect(document.documentElement.style.overflow).toBe("hidden");

    // Unmount second hook - now it should unlock
    hook2.unmount();
    expect(document.body.style.overflow).toBe("");
    expect(document.documentElement.style.overflow).toBe("");
  });
});
