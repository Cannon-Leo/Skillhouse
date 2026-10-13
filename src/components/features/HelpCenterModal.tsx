"use client";

import React, { useState } from "react";
import {
  X,
  BookOpen,
  Terminal,
  Code2,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { Overlay } from "../ui/Overlay";
import styles from "./HelpCenterModal.module.css";

export interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSkill?: () => void;
}

const FAQS = [
  {
    q: "What is an Agent Skill?",
    a: "An Agent Skill is a standardized repository package containing a SKILL.md prompt specification, reference scripts, and execution constraints. When installed, coding assistants like Claude Code, Codex, and Cursor parse this metadata to execute multi-step workflows autonomously.",
  },
  {
    q: "How do I invoke an installed skill in Claude Code or Cursor?",
    a: "Once synchronized via 'skillhouse sync', skills are registered into your local agent environment (such as ~/.claude/agents or ~/.cursor/skills). You can invoke them in conversation using natural language (e.g. 'Audit this page with agency-accessibility-auditor') or via slash commands.",
  },
  {
    q: "Are the skills verified and safe to execute?",
    a: "Every skill on Skillhouse undergoes automated constraint verification (Gate 3 Security Audit and Gauntlet tests) to ensure zero hardcoded secrets, deterministic tool schemas, and zero destructive defaults.",
  },
  {
    q: "Can I request custom skills for my engineering team?",
    a: "Yes! Click the 'Request a skill' button in the navigation header or inside this Help Center. Skillhouse designers and community authors prioritize high-demand community requests.",
  },
];

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
  onRequestSkill,
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const toggleFaq = (idx: number) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-center-title"
        onClick={(e) => e.stopPropagation()}
        data-testid="help-center-modal"
      >
        {/* Close Button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <h2 id="help-center-title" className={styles.title}>
            Skillhouse Help Center &amp; Documentation
          </h2>
          <p className={styles.subtitle}>
            Guides, architecture specifications, and agent integration documentation
          </p>
        </div>

        {/* Body */}
        <div className={styles.contentBody}>
          {/* Quickstart Guides */}
          <div className={styles.guidesGrid}>
            <div
              className={styles.guideCard}
              onClick={() => toggleFaq(1)}
              role="button"
              tabIndex={0}
            >
              <Terminal size={20} className={styles.guideIcon} />
              <h3 className={styles.guideTitle}>Claude Code CLI Guide</h3>
              <p className={styles.guideDesc}>
                Install, configure, and register daemon hooks with your local Claude Code terminal.
              </p>
            </div>

            <div
              className={styles.guideCard}
              onClick={() => toggleFaq(1)}
              role="button"
              tabIndex={0}
            >
              <Code2 size={20} className={styles.guideIcon} />
              <h3 className={styles.guideTitle}>Cursor IDE Integration</h3>
              <p className={styles.guideDesc}>
                Setup workspace rules and register SKILL.md paths for Cursor Agent Mode.
              </p>
            </div>

            <div
              className={styles.guideCard}
              onClick={() => toggleFaq(0)}
              role="button"
              tabIndex={0}
            >
              <BookOpen size={20} className={styles.guideIcon} />
              <h3 className={styles.guideTitle}>SKILL.md Architecture</h3>
              <p className={styles.guideDesc}>
                Read the YAML frontmatter specifications and prompt engineering standards.
              </p>
            </div>

            <div
              className={styles.guideCard}
              onClick={() => toggleFaq(2)}
              role="button"
              tabIndex={0}
            >
              <HelpCircle size={20} className={styles.guideIcon} />
              <h3 className={styles.guideTitle}>Security &amp; Sandboxing</h3>
              <p className={styles.guideDesc}>
                Understand sandboxing policies, tool validation, and permission envelopes.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className={styles.faqSection}>
            <h3 className={styles.faqSectionTitle}>Frequently Asked Questions</h3>
            {FAQS.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div key={idx} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqQuestion}
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isExpanded}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </button>
                  {isExpanded && <div className={styles.faqAnswer}>{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.requestButton}
            onClick={() => {
              onClose();
              onRequestSkill?.();
            }}
          >
            <Sparkles size={14} />
            Request a custom skill
          </button>

          <button
            type="button"
            className={styles.closeFooterButton}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </Overlay>
  );
};
