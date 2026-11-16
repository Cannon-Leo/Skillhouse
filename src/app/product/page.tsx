"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  X,
  Copy,
  Terminal,
  ShieldCheck,
  Layers,
  ChevronDown,
  ChevronUp,
  Coins,
} from "lucide-react";
import { NavBar } from "@/components/features/NavBar";
import { Footer } from "@/components/features/Footer";
import { WaitlistForm } from "@/components/features/WaitlistForm/WaitlistForm";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal } from "@/components/features/RequestSkillModal";
import { UserProfileModal, UserProfileData } from "@/components/features/UserProfileModal";
import { HelpCenterModal } from "@/components/features/HelpCenterModal";
import { useAuthSafe } from "@/lib/AuthContext";
import styles from "./page.module.css";

const AGENT_FLEET = [
  {
    name: "Claude Code",
    logo: "/figma/agent-claude.png",
    status: "Verified Native",
    version: "v1.0.4",
    features: ["CLAUDE.md integration", "Auto prompt injection", "Subagent tool mapping"],
  },
  {
    name: "Cursor",
    logo: "/figma/agent-cursor.png",
    status: "Verified Native",
    version: "v0.44+",
    features: [".cursorrules auto-sync", "Composer multi-turn", "Symbol context linking"],
  },
  {
    name: "Antigravity",
    logo: "/figma/agent-antigravity.png",
    status: "Runtime Certified",
    version: "v2.0 SDK",
    features: ["Native Swarm orchestration", "Tool call validation", "Shared board messaging"],
  },
  {
    name: "Codex",
    logo: "/figma/agent-codex.png",
    status: "Verified Native",
    version: "Python/TS",
    features: ["Deterministic CLI hooks", "Workspace sandbox", "Zero hallucination gate"],
  },
  {
    name: "Gemini CLI",
    logo: "/figma/agent-gemini.png",
    status: "Verified Native",
    version: "Live 3.8",
    features: ["Multi-modal tool support", "Streaming token logs", "Automated retry physics"],
  },
  {
    name: "Kimi Code",
    logo: "/figma/agent-kimi.png",
    status: "Runtime Certified",
    version: "v2.2 CLI",
    features: ["Long context execution", "Parallel tool calling", "Audit trace exporter"],
  },
];

const PRODUCT_FAQS = [
  {
    id: "what-is-skillhouse",
    question: "What exactly is Skillhouse?",
    answer:
      "Skillhouse is the curated app store and verified runtime for AI Agent Skills. Rather than writing brittle system prompts or fragile API glue from scratch, Skillhouse gives you deterministic, tested skills that install into Claude Code, Cursor, Codex, and Antigravity in one command.",
  },
  {
    id: "how-does-sync-work",
    question: "How does 'npx skillhouse sync' work?",
    answer:
      "Our lightweight CLI reads your local project setup and injects validated instructions into your agent's config (e.g. .cursorrules, CLAUDE.md, or Antigravity runtime) with zero manual copy-pasting. It locks versions and verifies cryptographic hashes before each run.",
  },
  {
    id: "what-makes-verified",
    question: "What does 'Gauntlet Verified' mean?",
    answer:
      "Every skill in the Skillhouse marketplace must pass the Gauntlet Quality Gate: 100% schema validation, deterministic unit tests, sandbox permission boundaries, and zero token leakage before being published.",
  },
  {
    id: "private-beta-timeline",
    question: "When will private beta access be granted?",
    answer:
      "We are releasing early access invites in weekly cohorts starting this month. Joining the waitlist reserves your place and ensures you receive the initial free verified developer skill pack.",
  },
  {
    id: "creator-monetization",
    question: "Can I publish and monetize my own skills?",
    answer:
      "Yes. The Skillhouse Creator Studio allows domain experts, developers, and teams to publish proprietary skills with instant per-install payments, recurring team licenses, and transparent revenue share.",
  },
];

function ProductPageContent() {
  const router = useRouter();
  const [copiedCli, setCopiedCli] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>("what-is-skillhouse");

  // Auth context integration
  const auth = useAuthSafe();
  const [localLoginOpen, setLocalLoginOpen] = useState(false);
  const isLoginOpen = auth ? auth.isLoginOpen : localLoginOpen;
  const setIsLoginOpen = (val: boolean) => {
    if (auth) {
      if (val) auth.openLogin();
      else auth.closeLogin();
    } else {
      setLocalLoginOpen(val);
    }
  };

  const [localRequestSkillOpen, setLocalRequestSkillOpen] = useState(false);
  const isRequestSkillOpen = auth ? auth.isRequestSkillOpen : localRequestSkillOpen;
  const setIsRequestSkillOpen = (val: boolean) => {
    if (auth) {
      if (val) auth.openRequestSkill();
      else auth.closeRequestSkill();
    } else {
      setLocalRequestSkillOpen(val);
    }
  };

  const [localUser, setLocalUser] = useState<UserProfileData | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("skillhouse_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const user = auth ? auth.user : localUser;

  const [localProfileOpen, setLocalProfileOpen] = useState(false);
  const isProfileOpen = auth ? auth.isProfileOpen : localProfileOpen;
  const setIsProfileOpen = (val: boolean) => {
    if (auth) {
      if (val) auth.openProfile();
      else auth.closeProfile();
    } else {
      setLocalProfileOpen(val);
    }
  };

  const [localHelpCenterOpen, setLocalHelpCenterOpen] = useState(false);
  const isHelpCenterOpen = auth ? auth.isHelpCenterOpen : localHelpCenterOpen;
  const setIsHelpCenterOpen = (val: boolean) => {
    if (auth) {
      if (val) auth.openHelpCenter();
      else auth.closeHelpCenter();
    } else {
      setLocalHelpCenterOpen(val);
    }
  };

  const handleLogin = (provider: "google" | "github") => {
    if (auth) {
      auth.login(provider);
      return;
    }
    const loggedInUser: UserProfileData = {
      name: "Alex Vance",
      email: provider === "github" ? "alex.vance@github.com" : "alex.vance@skillhouse.ai",
      avatarUrl: "/figma/header_avatar_figma.png",
      provider,
      role: "Verified Developer",
      apiKey: "sk_live_9f82d1c47a38910b",
    };
    setLocalUser(loggedInUser);
    try {
      localStorage.setItem("skillhouse_user", JSON.stringify(loggedInUser));
    } catch {
      // Storage unavailable
    }
    setLocalLoginOpen(false);
  };

  const handleSignOut = () => {
    if (auth) {
      auth.logout();
      return;
    }
    setLocalUser(null);
    try {
      localStorage.removeItem("skillhouse_user");
    } catch {
      // Storage unavailable
    }
  };

  const handleCopyCliCommand = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("npx skillhouse sync");
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Global Brand Navbar with Product nav active */}
      <NavBar
        currentView="product"
        onViewChange={(view) => {
          if (view === "home") router.push("/");
          else if (view === "marketplace") router.push("/skills");
          else if (view === "my-skills") router.push("/?view=my-skills");
          else if (view === "design-system") router.push("/design-system");
        }}
        onGetStarted={() => setIsLoginOpen(true)}
        onOpenLoginModal={() => setIsLoginOpen(true)}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenSettings={() => setIsProfileOpen(true)}
        onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
        onSignOut={handleSignOut}
        isSignedIn={Boolean(user)}
        user={user ? { name: user.name, email: user.email, avatarUrl: user.avatarUrl } : undefined}
      />

      <main className={styles.main}>
        {/* ========================================================
            1. HERO SECTION & WAITLIST FORM
            ======================================================== */}
        <section className={styles.heroSection} aria-label="Skillhouse Product Waitlist Hero">
          <div className={styles.eyebrowBadge}>
            <span className={styles.eyebrowDot} />
            <span>PRIVATE BETA · COHORT 01 WAITLIST</span>
          </div>

          <h1 className={styles.heroHeading}>
            The App Store & Runtime for <span className={styles.highlightText}>AI Agent Skills</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Turn brittle markdown prompts and fragile scripts into deterministic, one-click installable skills. Built for Claude Code, Cursor, Codex, and Antigravity.
          </p>

          <div className={styles.waitlistHeroContainer}>
            <WaitlistForm variant="hero" />
          </div>

          <div className={styles.agentsRibbon}>
            <span className={styles.ribbonLabel}>Certified Across Leading Agent Runtimes</span>
            <div className={styles.agentsPillsRow}>
              {AGENT_FLEET.map((agent) => (
                <div key={agent.name} className={styles.agentPillItem}>
                  <Image
                    src={agent.logo}
                    alt={agent.name}
                    width={18}
                    height={18}
                    className={styles.agentIconSmall}
                    unoptimized
                  />
                  <span>{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            2. THE PROBLEM VS THE SOLUTION (MODULIFY PATTERN)
            ======================================================== */}
        <section className={styles.comparisonSection} aria-label="Why prompts fail vs verified skills">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>The Paradigm Shift</span>
            <h2 className={styles.sectionTitle}>Why Raw Prompts Fail in Production</h2>
            <p className={styles.sectionDescription}>
              Today&apos;s AI agents are crippled by unversioned copy-paste prompts that hallucinate parameters and break silently. Skillhouse brings software engineering rigor to agentic workflows.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            {/* The Old Way */}
            <div className={styles.comparisonCardBad}>
              <div className={styles.cardHeaderBad}>
                <span className={styles.cardTagBad}>The Fragile Way</span>
                <h3 className={styles.cardTitleBad}>Raw Markdown Prompts</h3>
              </div>
              <ul className={styles.comparisonList}>
                <li className={styles.comparisonItem}>
                  <X size={18} className={styles.iconBad} />
                  <span>Unversioned copy-pasting into chat windows with zero auditability</span>
                </li>
                <li className={styles.comparisonItem}>
                  <X size={18} className={styles.iconBad} />
                  <span>Silent schema drift when model updates change response formatting</span>
                </li>
                <li className={styles.comparisonItem}>
                  <X size={18} className={styles.iconBad} />
                  <span>No security sandbox checks: agents execute unchecked local shell commands</span>
                </li>
                <li className={styles.comparisonItem}>
                  <X size={18} className={styles.iconBad} />
                  <span>No monetization for creators who spend weeks fine-tuning instructions</span>
                </li>
              </ul>
            </div>

            {/* The Skillhouse Way */}
            <div className={styles.comparisonCardGood}>
              <div className={styles.cardHeaderGood}>
                <span className={styles.cardTagGood}>The Skillhouse Standard</span>
                <h3 className={styles.cardTitleGood}>Gauntlet-Verified Skills</h3>
              </div>
              <ul className={styles.comparisonList}>
                <li className={styles.comparisonItem}>
                  <Check size={18} className={styles.iconGood} />
                  <span>One-command installation (`npx skillhouse sync`) with cryptographic pinning</span>
                </li>
                <li className={styles.comparisonItem}>
                  <Check size={18} className={styles.iconGood} />
                  <span>Rigorous Gauntlet testing: 100% schema validation & multi-turn evaluation</span>
                </li>
                <li className={styles.comparisonItem}>
                  <Check size={18} className={styles.iconGood} />
                  <span>Integrated Model Context Protocol (MCP) bridge for live database & tool execution</span>
                </li>
                <li className={styles.comparisonItem}>
                  <Check size={18} className={styles.iconGood} />
                  <span>Automated creator royalties and recurring revenue per verified install</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. CORE PRODUCT PILLARS (BENTO GRID)
            ======================================================== */}
        <section className={styles.pillarsSection} aria-label="Core Product Pillars">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Product Architecture</span>
            <h2 className={styles.sectionTitle}>Built for Scale, Safety & Determinism</h2>
            <p className={styles.sectionDescription}>
              Everything an engineering team needs to turn experimental agents into reliable autonomous teammates.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Pillar 1: One-Command Fleet Sync */}
            <div className={`${styles.bentoCard} ${styles.bentoCol8}`}>
              <div className={styles.bentoIconBox}>
                <Terminal size={22} />
              </div>
              <h3 className={styles.bentoTitle}>One-Command Fleet Synchronization</h3>
              <p className={styles.bentoText}>
                No more emailing prompt templates or wrestling with individual IDE configs. Run a single command to sync team-approved skills directly into Claude Code, Cursor rules, Codex, or Antigravity workspaces.
              </p>
              <div className={styles.terminalBox}>
                <div className={styles.terminalHeader}>
                  <div className={styles.terminalDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <span>bash · skillhouse-cli</span>
                  <button
                    type="button"
                    onClick={handleCopyCliCommand}
                    aria-label="Copy CLI command"
                    style={{ background: "none", border: "none", color: "#8E8F95", cursor: "pointer" }}
                  >
                    {copiedCli ? <Check size={13} color="#34D399" /> : <Copy size={13} />}
                  </button>
                </div>
                <div className={styles.terminalCode}>
                  <span>$</span>
                  <span>npx skillhouse sync --workspace=enterprise-fleet</span>
                </div>
                <div className={styles.terminalOutput}>
                  ✔ Validated 14 installed skills against schema v2.0
                  <br />
                  ✔ Injected verified rules into .cursorrules and CLAUDE.md
                  <br />
                  ✔ Runtime security sandbox active (0 warnings)
                </div>
              </div>
            </div>

            {/* Pillar 2: Gauntlet Quality Gate */}
            <div className={`${styles.bentoCard} ${styles.bentoCol4}`}>
              <div className={styles.bentoIconBox}>
                <ShieldCheck size={22} />
              </div>
              <h3 className={styles.bentoTitle}>The Gauntlet Gate</h3>
              <p className={styles.bentoText}>
                Zero-tolerance quality assurance. Every published skill passes multi-model evaluations, regression checks, and security permission boundaries before hitting the marketplace.
              </p>
              <div className={styles.metricsGrid}>
                <div className={styles.metricTile}>
                  <span className={styles.metricVal}>100%</span>
                  <span className={styles.metricSub}>Schema Compliance</span>
                </div>
                <div className={styles.metricTile}>
                  <span className={styles.metricVal}>0ms</span>
                  <span className={styles.metricSub}>Runtime Cold Start</span>
                </div>
              </div>
            </div>

            {/* Pillar 3: Universal MCP Bridge */}
            <div className={`${styles.bentoCard} ${styles.bentoCol6}`}>
              <div className={styles.bentoIconBox}>
                <Layers size={22} />
              </div>
              <h3 className={styles.bentoTitle}>Universal MCP Bridge</h3>
              <p className={styles.bentoText}>
                Connect Model Context Protocol (MCP) servers effortlessly. Automatically bridge Postgres, SQLite, Cloud APIs, and Chrome DevTools to your agent without writing custom JSON schemas.
              </p>
              <ul className={styles.comparisonList}>
                <li className={styles.comparisonItem}>
                  <Check size={16} className={styles.iconGood} />
                  <span>Automatic schema generation for tool parameters</span>
                </li>
                <li className={styles.comparisonItem}>
                  <Check size={16} className={styles.iconGood} />
                  <span>Sandboxed environment execution prevents data destruction</span>
                </li>
              </ul>
            </div>

            {/* Pillar 4: Creator Royalties */}
            <div className={`${styles.bentoCard} ${styles.bentoCol6}`}>
              <div className={styles.bentoIconBox}>
                <Coins size={22} />
              </div>
              <h3 className={styles.bentoTitle}>Creator Royalties & Payouts</h3>
              <p className={styles.bentoText}>
                Are you an AI engineer or domain specialist? Package your high-performing prompts, custom tools, and workflows into certified skills. Earn monthly recurring revenue per team install.
              </p>
              <div className={styles.metricsGrid}>
                <div className={styles.metricTile}>
                  <span className={styles.metricVal}>85%</span>
                  <span className={styles.metricSub}>Creator Revenue Share</span>
                </div>
                <div className={styles.metricTile}>
                  <span className={styles.metricVal}>Instant</span>
                  <span className={styles.metricSub}>Stripe & Crypto Payouts</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. HOW IT WORKS (3-STEP PIPELINE)
            ======================================================== */}
        <section className={styles.workflowSection} aria-label="How Skillhouse Works">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Seamless Experience</span>
            <h2 className={styles.sectionTitle}>How Skillhouse Works</h2>
            <p className={styles.sectionDescription}>
              Go from discovering a skill to autonomous agent execution in less than three minutes.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>01</span>
              <h3 className={styles.stepTitle}>Discover & Playground Test</h3>
              <p className={styles.stepText}>
                Browse thousands of curated skills across design, full-stack coding, marketing, and data science. Test inputs live in our isolated playground before committing.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>02</span>
              <h3 className={styles.stepTitle}>1-Click Sync or Copy Prompt</h3>
              <p className={styles.stepText}>
                Copy the verified install prompt or run `skillhouse sync` in your CLI. The runtime automatically binds dependencies, schemas, and permissions to your environment.
              </p>
            </div>

            <div className={styles.stepCard}>
              <span className={styles.stepNumber}>03</span>
              <h3 className={styles.stepTitle}>Deterministic Execution</h3>
              <p className={styles.stepText}>
                Prompt your agent naturally. It executes the skill with full precision, tool feedback, and audit logging. When new updates ship, your fleet stays synchronized.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. AGENT RUNTIME MATRIX
            ======================================================== */}
        <section className={styles.matrixSection} aria-label="Supported Agents Matrix">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Compatibility</span>
            <h2 className={styles.sectionTitle}>Supported Agent Runtimes</h2>
            <p className={styles.sectionDescription}>
              Tested and benchmarked across all leading agent platforms. No lock-in.
            </p>
          </div>

          <div className={styles.matrixGrid}>
            {AGENT_FLEET.map((agent) => (
              <div key={agent.name} className={styles.matrixCard}>
                <div className={styles.matrixCardHeader}>
                  <Image
                    src={agent.logo}
                    alt={agent.name}
                    width={28}
                    height={28}
                    className={styles.agentIconSmall}
                    unoptimized
                  />
                  <div>
                    <h4 className={styles.matrixAgentName}>{agent.name}</h4>
                    <span style={{ fontSize: "12px", color: "#7F776E" }}>{agent.version}</span>
                  </div>
                  <span className={styles.matrixStatusBadge}>{agent.status}</span>
                </div>
                <ul className={styles.matrixSpecsList}>
                  {agent.features.map((feat, idx) => (
                    <li key={idx} className={styles.matrixSpecItem}>
                      <Check size={14} color="#FB6320" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            6. PRODUCT FAQS ACCORDION
            ======================================================== */}
        <section className={styles.faqSection} aria-label="Product Frequently Asked Questions">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Got Questions?</span>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionDescription}>
              Everything you need to know about the product, early access, and skill standards.
            </p>
          </div>

          <div className={styles.faqContainer}>
            {PRODUCT_FAQS.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className={styles.faqItem}>
                  <button
                    type="button"
                    className={styles.faqTrigger}
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                  >
                    <span className={styles.faqQuestion}>{faq.question}</span>
                    <span className={styles.faqIcon}>
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  {isOpen && <div className={styles.faqAnswer}>{faq.answer}</div>}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            7. VIP EARLY ACCESS BOTTOM CTA
            ======================================================== */}
        <section className={styles.ctaBanner} aria-label="Join the Private Beta">
          <span className={styles.ctaBadge}>LIMITED CAPACITY · COHORT 01</span>
          <h2 className={styles.ctaTitle}>Ready to Unlock Deterministic AI Agent Workflows?</h2>
          <p className={styles.ctaSubtitle}>
            Reserve your early access spot today. Private beta members receive complimentary access to all premium verified skills and the CLI sync engine.
          </p>
          <div className={styles.ctaFormWrapper}>
            <WaitlistForm variant="compact" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat: string) => router.push(`/skills?category=${encodeURIComponent(cat)}`)}
        onNavigateMarketplace={() => router.push("/skills")}
      />

      {/* Global Interactive Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user || { name: "Alex Vance", email: "alex@skillhouse.ai" }}
        onSignOut={handleSignOut}
      />
      <RequestSkillModal
        isOpen={isRequestSkillOpen}
        onClose={() => setIsRequestSkillOpen(false)}
      />
      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
      />
    </div>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#FFEEDD" }} />}>
      <ProductPageContent />
    </Suspense>
  );
}
