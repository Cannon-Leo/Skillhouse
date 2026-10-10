import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

// Clean inline SVGs for social media (Lucide removed them in newer releases)
const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Giant Background Text */}
      <div className={styles.bgText} aria-hidden="true">
        Skillhouse
      </div>

      <div className={styles.container}>
        {/* Left Section: Branding & Info */}
        <div className={styles.brandSection}>
          <div className={styles.logoWrapper}>
            <Image 
              src="/figma/Logo white.svg" 
              alt="Skillhouse" 
              width={100} 
              height={106} 
              className={styles.logo}
            />
          </div>
          <p className={styles.description}>
            Turn everyday tasks into simple, repeatable workflows with skills built for your agent.
          </p>
          <div className={styles.socials}>
            <Link href="#" aria-label="Twitter" className={styles.socialLink}><TwitterIcon /></Link>
            <Link href="#" aria-label="Instagram" className={styles.socialLink}><InstagramIcon /></Link>
            <Link href="#" aria-label="LinkedIn" className={styles.socialLink}><LinkedinIcon /></Link>
            <Link href="#" aria-label="YouTube" className={styles.socialLink}><YoutubeIcon /></Link>
            <Link href="#" aria-label="Facebook" className={styles.socialLink}><FacebookIcon /></Link>
          </div>
          <p className={styles.copyright}>
            © 2026 Skillhouse. All rights reserved
          </p>
        </div>

        {/* Right Section: Link Columns */}
        <div className={styles.linksSection}>
          {/* Column 1 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Explore</h3>
            <ul className={styles.linkList}>
              <li><Link href="#">Skills</Link></li>
              <li><Link href="#">Pricing</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Categories</h3>
            <ul className={styles.linkList}>
              <li><Link href="#">Web design</Link></li>
              <li><Link href="#">Product launch</Link></li>
              <li><Link href="#">Brand identity</Link></li>
              <li><Link href="#">Client reporting</Link></li>
              <li><Link href="#">Social media</Link></li>
              <li><Link href="#">Research communication</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>By output</h3>
            <ul className={styles.linkList}>
              <li><Link href="#">Images</Link></li>
              <li><Link href="#">Video</Link></li>
              <li><Link href="#">Presentations</Link></li>
              <li><Link href="#">Web & HTML</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>By agent</h3>
            <ul className={styles.linkList}>
              <li><Link href="#">Claude Code Skills</Link></li>
              <li><Link href="#">Cursor Skills</Link></li>
              <li><Link href="#">ChatGPT Skills</Link></li>
              <li><Link href="#">Zapier Skills</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li><Link href="#">Terms of service</Link></li>
              <li><Link href="#">Privacy policy</Link></li>
              <li><Link href="#">Refund policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
