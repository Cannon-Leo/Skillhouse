"use client";

import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import styles from "./Dialog.module.css";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;
export const DialogClose = DialogPrimitive.Close;

export type DialogOverlayProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  DialogOverlayProps
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={`${styles.overlay} ${className}`}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  showCloseButton?: boolean;
}

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className = "", children, showCloseButton = true, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={`${styles.content} ${className}`}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close
          className={styles.closeButton}
          aria-label="Close dialog"
        >
          <X size={18} />
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={`${styles.title} ${className}`}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className = "", ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={`${styles.description} ${className}`}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
