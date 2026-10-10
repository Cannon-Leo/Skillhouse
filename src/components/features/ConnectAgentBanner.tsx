"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, Sparkles } from "lucide-react";
import styles from "./ConnectAgentBanner.module.css";

export interface SupportedAgent {
  id: string;
  name: string;
  logo: string;
}

export interface ConnectAgentBannerProps {
  title?: string;
  subtitle?: string;
  guideUrl?: string;
  installCommand?: string;
  onConnect?: () => void;
  className?: string;
}

const DEFAULT_AGENTS: SupportedAgent[] = [
  { id: "claude-code", name: "Claude Code", logo: "/figma/logo-1.png" },
  { id: "antigravity", name: "Antigravity", logo: "/figma/logo-2.png" },
  { id: "kimi-code", name: "Kimi Code CLI", logo: "/figma/logo-3.png" },
  { id: "gemini-cli", name: "Gemini CLI", logo: "/figma/logo-4.png" },
  { id: "codex", name: "Codex", logo: "/figma/logo-5.png" },
  { id: "cursor", name: "Cursor", logo: "/figma/logo-6.png" },
];

const DEFAULT_PROMPT =
  "https://skillry.dev/skills/bs-visual-canvas-deck/install.md and follow the instructions to connect the official CLI, then help me discover the right Skill.";

export const ConnectAgentBanner: React.FC<ConnectAgentBannerProps> = ({
  title = "Connect\nyour agent",
  subtitle = "Give your AI agent practical,\nreusable workflows for real tasks.",
  guideUrl = "#guide",
  installCommand = DEFAULT_PROMPT,
  onConnect,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  const fullPromptText = `Read ${installCommand}`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(fullPromptText);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleConnectClick = () => {
    if (onConnect) {
      onConnect();
    } else {
      handleCopy();
    }
  };

  return (
    <section
      className={`${styles.section} ${className}`}
      aria-label="Connect your AI agent"
    >
      <div className={styles.card}>
        {/* Left Column: Title, Subtitle, Guides, and Supported Agents */}
        <div className={styles.leftColumn}>
          <div className={styles.headingGroup}>
            <h2 className={styles.title}>
              {title.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < title.split("\n").length - 1 && <br className={styles.titleBreak} />}
                </React.Fragment>
              ))}
            </h2>
            <p className={styles.subtitle}>
              {subtitle.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}
                  {idx < subtitle.split("\n").length - 1 && <br className={styles.subtitleBreak} />}
                </React.Fragment>
              ))}
            </p>
            <a
              href={guideUrl}
              className={styles.guideLink}
              onClick={(e) => {
                if (guideUrl === "#guide") {
                  e.preventDefault();
                }
              }}
            >
              Read installation guide
            </a>
          </div>

          <div
            className={styles.agentsGrid}
            role="group"
            aria-label="Supported AI CLI and agent environments"
          >
            {DEFAULT_AGENTS.map((agent) => {
              const isSelected = activeAgent === agent.id;
              return (
                <div
                  key={agent.id}
                  className={`${styles.agentItem} ${isSelected ? styles.agentSelected : ""}`}
                  onClick={() => setActiveAgent(isSelected ? null : agent.id)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveAgent(isSelected ? null : agent.id);
                    }
                  }}
                >
                  <div className={styles.agentLogoWrapper}>
                    <Image
                      src={agent.logo}
                      alt={`${agent.name} logo`}
                      width={22}
                      height={22}
                      className={styles.agentLogo}
                      unoptimized
                    />
                  </div>
                  <span className={styles.agentName}>{agent.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Code/Terminal Card & Connect Button */}
        <div className={styles.rightColumn}>
          <div className={styles.terminalBox}>
            {/* Header */}
            <div className={styles.terminalHeader}>
              <div className={styles.terminalHeaderLeft}>
                <div className={styles.terminalAvatar}>
                  <Sparkles size={13} className={styles.avatarIcon} />
                </div>
                <span className={styles.terminalTitle}>Ask your agent to install it</span>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className={styles.copyButton}
                aria-label="Copy agent instruction prompt"
                title="Copy to clipboard"
              >
                {copied ? <Check size={14} color="#03A400" /> : <Copy size={14} />}
                <span className={styles.copyLabel}>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>

            {/* Instruction Snippet */}
            <div className={styles.promptArea}>
              <p className={styles.promptText}>
                <span className={styles.keyword}>Read</span>{" "}
                <span className={styles.url}>
                  https://skillry.dev/skills/bs-visual-canvas-deck/install.md
                </span>{" "}
                and follow the instructions to connect the official CLI, then help me discover the right Skill.
              </p>
            </div>

            {/* Steps Footer */}
            <div className={styles.stepsFooter}>
              <div className={styles.stepBadge}>
                <span className={styles.stepNum}>01</span>
                <span className={styles.stepText}>Discover a skill</span>
              </div>
              <div className={styles.stepBadge}>
                <span className={styles.stepNum}>02</span>
                <span className={styles.stepText}>Authorize in your browser</span>
              </div>
              <div className={styles.stepBadge}>
                <span className={styles.stepNum}>03</span>
                <span className={styles.stepText}>Install and verify</span>
              </div>
            </div>
          </div>

          {/* Primary CTA Button */}
          <button
            type="button"
            onClick={handleConnectClick}
            className={styles.connectButton}
            aria-label="Connect Skillhouse CLI"
          >
            Connect Skillhouse
          </button>
        </div>
      </div>

      {/* Decorative Bottom Accents (Figma 4640:6027) */}
      <div className={styles.bracketContainer} aria-hidden="true">
        <span className={styles.bracketLine} />
      </div>
    </section>
  );
};
