"use client";

import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import styles from "./Popover.module.css";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverAnchor = PopoverPrimitive.Anchor;
export const PopoverClose = PopoverPrimitive.Close;
export const PopoverPortal = PopoverPrimitive.Portal;

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  showArrow?: boolean;
}

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ className = "", align = "center", sideOffset = 6, showArrow = false, children, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={`${styles.content} ${className}`}
      {...props}
    >
      {children}
      {showArrow && <PopoverPrimitive.Arrow className={styles.arrow} width={10} height={5} />}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;
