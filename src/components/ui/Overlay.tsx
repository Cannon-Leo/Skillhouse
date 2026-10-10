"use client";

import React, { useEffect } from "react";
import styles from "./Overlay.module.css";

export interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
  closeOnClickOutside?: boolean;
}

export const Overlay: React.FC<OverlayProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  closeOnClickOutside = true,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`${styles.backdrop} ${className}`}
      onClick={(e) => {
        if (closeOnClickOutside && e.target === e.currentTarget) {
          onClose?.();
        }
      }}
      data-testid="modal-overlay"
    >
      {children}
    </div>
  );
};
