"use client";

import { useEffect } from "react";

/**
 * Universal scroll lock hook that locks both <html> and <body>,
 * compensates for scrollbar width to prevent horizontal layout shift,
 * and uses a reference counter so nested overlays don't prematurely unlock.
 */
let lockCount = 0;
let originalBodyOverflow = "";
let originalHtmlOverflow = "";
let originalBodyPaddingRight = "";

export function useScrollLock(isLocked: boolean = true) {
  useEffect(() => {
    if (!isLocked || typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const html = document.documentElement;
    const body = document.body;

    if (lockCount === 0) {
      originalBodyOverflow = body.style.overflow;
      originalHtmlOverflow = html.style.overflow;
      originalBodyPaddingRight = body.style.paddingRight;

      const scrollBarWidth = window.innerWidth - html.clientWidth;
      if (scrollBarWidth > 0) {
        body.style.paddingRight = `${scrollBarWidth}px`;
      }

      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        body.style.overflow = originalBodyOverflow;
        html.style.overflow = originalHtmlOverflow;
        body.style.paddingRight = originalBodyPaddingRight;
      }
    };
  }, [isLocked]);
}
