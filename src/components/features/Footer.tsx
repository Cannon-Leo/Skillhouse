"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

// Exact authentic SVG from Figma Node I751:4917;751:7813
const XSocialIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={styles.socialSvg}
  >
    <path
      d="M12.6148 15.5763L2.81486 2.97627C2.58496 2.68069 2.7956 2.25 3.17007 2.25H5.0299C5.16876 2.25 5.29985 2.31411 5.3851 2.42373L15.1851 15.0237C15.415 15.3194 15.2044 15.75 14.8299 15.75H12.9701C12.8312 15.75 12.7001 15.6859 12.6148 15.5763Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M15 2.25L3 15.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Exact authentic SVG from Figma Node I751:4917;751:7816
const LinkedInSocialIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={styles.socialSvg}
  >
    <path
      d="M15.75 6V12C15.75 14.071 14.071 15.75 12 15.75H6C3.92894 15.75 2.25 14.071 2.25 12V6C2.25 3.92894 3.92894 2.25 6 2.25H12C14.071 2.25 15.75 3.92894 15.75 6Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.25 12.75V10.125V7.5"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.25 12.75V10.3125M8.25 10.3125V7.5M8.25 10.3125C8.25 7.5 12.75 7.5 12.75 10.3125V12.75"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.25 5.25828L5.25833 5.24902"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export interface FooterProps {
  onSelectCategory?: (category: string) => void;
  onNavigateMarketplace?: () => void;
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateMarketplace,
  className,
}) => {
  return (
    <footer
      className={`${styles.footer} ${className || ""}`}
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Background Gradient Lines - Exact Figma Node 751:7781 */}
      <div className={styles.gradientLines} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column: Branding, Tagline, Socials, Copyright - Figma Node 751:7797 */}
        <div className={styles.brandSection}>
          {/* Logo Badge - Figma Node 751:7798 */}
          <Link href="/" className={styles.logoBadge} aria-label="Skillhouse Home">
            <Image
              src="/figma/footer-logo-badge.svg"
              alt="Skillhouse Logo"
              width={100}
              height={106}
              priority
              className={styles.logoImage}
            />
          </Link>

          {/* Tagline & Info Group - Figma Node 751:7810 */}
          <div className={styles.taglineGroup}>
            <p className={styles.tagline}>
              Turn everyday tasks into simple,
              <br />
              repeatable workflows with skills
              <br />
              built for your agent.
            </p>

            {/* Social Links Row - Figma Node 751:7812 */}
            <div className={styles.socialRow}>
              <a
                href="https://x.com/skillhouse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skillhouse on X (formerly Twitter)"
                className={styles.socialLink}
              >
                <XSocialIcon />
              </a>
              <a
                href="https://linkedin.com/company/skillhouse"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Skillhouse on LinkedIn"
                className={styles.socialLink}
              >
                <LinkedInSocialIcon />
              </a>
            </div>

            {/* Copyright Notice - Figma Node 751:7821 */}
            <p className={styles.copyright}>
              © 2026 Skillhouse. All rights reserved
            </p>
          </div>
        </div>

        {/* Right Navigation Columns (5 Columns) - Figma Node 751:7822 */}
        <div className={styles.navColumns}>
          {/* Column 1: Explore - Node 751:7823 */}
          <div className={styles.navColumn}>
            <h3 className={styles.columnTitle}>Explore</h3>
            <ul className={styles.linkList}>
              <li>
                <Link
                  href="/skills"
                  className={styles.link}
                  onClick={(e) => {
                    if (onNavigateMarketplace) {
                      e.preventDefault();
                      onNavigateMarketplace();
                    }
                  }}
                >
                  Skills
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={styles.link}>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Categories - Node 751:7828 */}
          <div className={styles.navColumn}>
            <h3 className={styles.columnTitle}>Categories</h3>
            <ul className={styles.linkList}>
              <li>
                <Link
                  href="/skills?category=web-design"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("web-design");
                    }
                  }}
                >
                  Web design
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=product-launch"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("product-launch");
                    }
                  }}
                >
                  Product launch
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=brand-identity"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("brand-identity");
                    }
                  }}
                >
                  Brand identity
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=client-reporting"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("client-reporting");
                    }
                  }}
                >
                  Client reporting
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=social-media"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("social-media");
                    }
                  }}
                >
                  Social media
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=research-communication"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("research-communication");
                    }
                  }}
                >
                  Research communication
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: By output - Node 751:7837 */}
          <div className={styles.navColumn}>
            <h3 className={styles.columnTitle}>By output</h3>
            <ul className={styles.linkList}>
              <li>
                <Link
                  href="/skills?category=image"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("image");
                    }
                  }}
                >
                  Images
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=video"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("video");
                    }
                  }}
                >
                  Video
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=slides"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("slides");
                    }
                  }}
                >
                  Presentations
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?category=web"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("web");
                    }
                  }}
                >
                  Web &amp; HTML
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: By agent - Node 751:7844 */}
          <div className={styles.navColumn}>
            <h3 className={styles.columnTitle}>By agent</h3>
            <ul className={styles.linkList}>
              <li>
                <Link
                  href="/skills?search=claude"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("claude");
                    }
                  }}
                >
                  Claude Code Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?search=codex"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("codex");
                    }
                  }}
                >
                  Codex Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?search=cursor"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("cursor");
                    }
                  }}
                >
                  Cursor Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?search=gemini"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("gemini");
                    }
                  }}
                >
                  Gemini CLI Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?search=opencode"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("opencode");
                    }
                  }}
                >
                  OpenCode Skills
                </Link>
              </li>
              <li>
                <Link
                  href="/skills?search=antigravity"
                  className={styles.link}
                  onClick={(e) => {
                    if (onSelectCategory) {
                      e.preventDefault();
                      onSelectCategory("antigravity");
                    }
                  }}
                >
                  Antigravity Skills
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Skillhouse - Node 751:7853 */}
          <div className={styles.navColumn}>
            <h3 className={styles.columnTitle}>Skillhouse</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/privacy" className={styles.link}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.link}>
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className={styles.link}>
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/notices" className={styles.link}>
                  Third-Party Notices
                </Link>
              </li>
              <li>
                <Link href="/support" className={styles.link}>
                  Help &amp; Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    
      {/* Massive Bottom Watermark Text - Exact Figma Node 751:7795 */}
      {/* Positioned strictly below the content (Node 751:7796) as designed in Node 751:7780 */}
      <div className={styles.watermark} aria-hidden="true">
        Skillhouse
      </div>
    </footer>
  );
};
