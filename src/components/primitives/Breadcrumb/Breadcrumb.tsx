import * as React from "react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className = "", ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="Breadcrumb"
      className={`${styles.breadcrumb} ${className}`}
      {...props}
    />
  )
);
Breadcrumb.displayName = "Breadcrumb";

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className = "", ...props }, ref) => (
  <ol ref={ref} className={`${styles.list} ${className}`} {...props} />
));
BreadcrumbList.displayName = "BreadcrumbList";

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className = "", ...props }, ref) => (
  <li ref={ref} className={`${styles.item} ${className}`} {...props} />
));
BreadcrumbItem.displayName = "BreadcrumbItem";

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  asChild?: boolean;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ asChild, className = "", children, ...props }, ref) => {
  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(childElement, {
      ...props,
      className: `${styles.link} ${childElement.props.className || ""} ${className}`.trim(),
    });
  }

  return (
    <a ref={ref} className={`${styles.link} ${className}`} {...props}>
      {children}
    </a>
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className = "", ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={`${styles.page} ${className}`}
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

export const BreadcrumbSeparator = ({
  children,
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={`${styles.separator} ${className}`}
    {...props}
  >
    {children ?? "/"}
  </li>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

export const BreadcrumbEllipsis = ({
  className = "",
  ...props
}: React.ComponentPropsWithoutRef<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={`${styles.ellipsis} ${className}`}
    {...props}
  >
    ...
  </span>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";
