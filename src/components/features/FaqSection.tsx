"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";
import styles from "./FaqSection.module.css";

export interface FaqItemData {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItemData[] = [
  {
    id: "what-is-agent-skill",
    question: "What is an Agent Skill?",
    answer:
      "A Skill is a reusable set of instructions and resources that helps an AI agent complete a specific kind of work.",
  },
  {
    id: "properties-needed",
    question: "Do I need to already have properties?",
    answer:
      "No. You can start using Skillhouse right away with your existing setup, whether you're configuring a local agent, Claude Code, Cursor, or building custom automated workflows from scratch.",
  },
  {
    id: "time-commitment",
    question: "How much time does it take?",
    answer:
      "Installation takes less than two minutes. Once installed via 'skillhouse sync' or your agent's configuration, skills are instantly active and ready to execute.",
  },
  {
    id: "international-access",
    question: "Can I join if I'm outside Europe?",
    answer:
      "Yes. Skillhouse is accessible worldwide. All skills, prompts, and CLI integrations work globally without geographic restrictions.",
  },
  {
    id: "what-is-base360",
    question: "What is Base360?",
    answer:
      "Base360 is the underlying agent runtime and orchestration framework that powers Skillhouse verification, sandboxed execution, and multi-agent coordination.",
  },
  {
    id: "after-book-call",
    question: "What happens after I book a call?",
    answer:
      "Our engineering team walks through your team's workflow requirements, assists with custom skill integration, and ensures your agent environment is fully tuned for production.",
  },
  {
    id: "refund-guarantee",
    question: "Is there a refund or guarantee?",
    answer:
      "All verified skills come with our 100% satisfaction guarantee. If a skill does not perform according to its specification, our team will assist with prompt tuning or offer a full refund.",
  },
];

export interface FaqSectionProps {
  className?: string;
  items?: FaqItemData[];
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  className = "",
  items = FAQ_ITEMS,
}) => {
  // First item open by default as designed in Figma (#851:3382 has open answer & minus-circle)
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    [items[0]?.id || "what-is-agent-skill"]: true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      className={`${styles.faqSection} ${className}`}
      aria-label="Frequently Asked Questions"
      id="faq-section"
    >
      <div className={styles.container}>
        {/* Header Introduction */}
        <div className={styles.introHeader}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            The essentials for choosing,
            <br />
            installing, and using your first Skill.
          </p>
        </div>

        {/* FAQ List */}
        <div className={styles.faqList} role="region" aria-label="FAQ Accordion">
          {items.map((item) => {
            const isOpen = Boolean(openIds[item.id]);

            return (
              <div
                key={item.id}
                className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.questionButton}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  id={`faq-question-${item.id}`}
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span className={styles.iconWrapper} aria-hidden="true">
                    {isOpen ? (
                      <MinusCircle className={styles.icon} size={24} strokeWidth={1.5} />
                    ) : (
                      <PlusCircle className={styles.icon} size={24} strokeWidth={1.5} />
                    )}
                  </span>
                </button>

                {isOpen && item.answer && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-question-${item.id}`}
                    className={styles.answerWrapper}
                  >
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
