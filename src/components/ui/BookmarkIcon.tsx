"use client";

import React from "react";

export interface BookmarkIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  filled?: boolean;
}

export const BookmarkIcon: React.FC<BookmarkIconProps> = ({
  size = 14,
  filled = false,
  className = "",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 14 14"
    fill={filled ? "currentColor" : "none"}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    {...props}
  >
    <path
      d="M9.81201 1.16667H4.18868C2.94618 1.16667 1.93701 2.18167 1.93701 3.41834V11.6375C1.93701 12.6875 2.68951 13.1308 3.61118 12.6233L6.45784 11.0425C6.76118 10.8733 7.25118 10.8733 7.54868 11.0425L10.3953 12.6233C11.317 13.1367 12.0695 12.6933 12.0695 11.6375V3.41834C12.0637 2.18167 11.0545 1.16667 9.81201 1.16667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
