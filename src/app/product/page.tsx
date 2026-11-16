"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail } from "lucide-react";
import { NavBar } from "@/components/features/NavBar";
import { Footer } from "@/components/features/Footer";
import { WaitlistForm } from "@/components/features/WaitlistForm/WaitlistForm";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal } from "@/components/features/RequestSkillModal";
import { UserProfileModal, UserProfileData } from "@/components/features/UserProfileModal";
import { HelpCenterModal } from "@/components/features/HelpCenterModal";
import { useAuthSafe } from "@/lib/AuthContext";
import styles from "./page.module.css";

// 02 What changed: Tools that understand the open skill standard (Pitch Deck Slide 3)
const COMPATIBLE_TOOLS = [
  { name: "Claude", logo: "/figma/agent-claude.png" },
  { name: "Cursor", logo: "/figma/agent-cursor.png" },
  { name: "GitHub Copilot", logo: "/figma/github_icon.png" },
  { name: "Codex", logo: "/figma/agent-codex.png" },
  { name: "Gemini", logo: "/figma/agent-gemini.png" },
];

function ProductPageContent() {
  const router = useRouter();

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
      email: provider === "github" ? "alex.vance@github.com" : "alex.vance@skillhouse.dev",
      avatarUrl: "/figma/header_avatar_figma.png",
      provider,
      role: "Maker",
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

  return (
    <div className={styles.pageWrapper}>
      {/* Global Dark Brand Navbar with Product link active */}
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
            1. HERO SECTION (Pitch Deck Slide 1 & 2)
            ======================================================== */}
        <section className={styles.heroSection} aria-label="Skillhouse Product Overview">
          <div className={styles.eyebrowBadge}>
            <span className={styles.eyebrowDot} />
            <span>2026 · BUILT FOR TEAMS AND MAKERS</span>
          </div>

          <h1 className={styles.heroHeading}>Skillhouse</h1>

          <p className={styles.heroSubtitle}>
            Turn everyday tasks into simple, repeatable workflows with skills built for your agent.
          </p>

          <div className={styles.waitlistHeroContainer}>
            <WaitlistForm variant="hero" />
          </div>

          {/* Three Foundational Ideas (Pitch Deck Slide 2) */}
          <div className={styles.ideasGrid}>
            <div className={styles.ideaCard}>
              <div className={styles.ideaHeader}>
                <div className={styles.triangleBadge} />
                <h3 className={styles.ideaTitle}>An AI agent</h3>
              </div>
              <p className={styles.ideaBody}>
                An AI assistant, such as Claude, Cursor or Codex, that does tasks for you.
              </p>
            </div>

            <div className={styles.ideaCard}>
              <div className={styles.ideaHeader}>
                <div className={styles.triangleBadge} />
                <h3 className={styles.ideaTitle}>A skill</h3>
              </div>
              <p className={styles.ideaBody}>
                Saved instructions that teach your agent one job, done your way. Example: turn meeting notes into a client update.
              </p>
            </div>

            <div className={`${styles.ideaCard} ${styles.ideaCardHighlight}`}>
              <div className={styles.ideaHeader}>
                <div className={styles.triangleBadge} />
                <h3 className={styles.ideaTitle}>Skillhouse</h3>
              </div>
              <p className={styles.ideaBody}>
                Where people find skills that have been checked, and share the ones they build.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. WHAT CHANGED (Pitch Deck Slide 3)
            ======================================================== */}
        <section className={styles.standardSection} aria-label="What Changed: Open Skill Standard">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>02 · What changed</span>
            <h2 className={styles.sectionTitle}>One skill now works in many AI tools.</h2>
            <p className={styles.sectionDescription}>
              In December 2025, Anthropic, the company behind Claude, published an open, shared way to write skills. Many AI tools now understand it, so you write a skill once and use it in any of them.
            </p>
          </div>

          <div className={styles.standardCard}>
            <div className={styles.architectureFlow}>
              <div className={styles.oneSkillBox}>
                <span className={styles.skillLabel}>One skill</span>
                <span className={styles.skillName}>client-update</span>
              </div>

              <ArrowRight size={24} className={styles.arrowRightIcon} />

              <div className={styles.toolsMatrix}>
                {COMPATIBLE_TOOLS.map((tool) => (
                  <div key={tool.name} className={styles.toolPill}>
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={18}
                      height={18}
                      unoptimized
                    />
                    <span>{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. THE PROBLEM (Pitch Deck Slide 4)
            ======================================================== */}
        <section className={styles.problemSection} aria-label="The Problem">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>03 · The problem</span>
            <h2 className={styles.sectionTitle}>Anyone can write a skill. Nobody can tell which to trust.</h2>
          </div>

          <div className={styles.problemGrid}>
            <div className={styles.problemCard}>
              <h3 className={styles.problemQuestion}>
                <div className={styles.problemTriangle} />
                Does it work?
              </h3>
              <p className={styles.problemText}>
                Many skills are untested. You find out after you have lost an afternoon.
              </p>
            </div>

            <div className={styles.problemCard}>
              <h3 className={styles.problemQuestion}>
                <div className={styles.problemTriangle} />
                Is it safe?
              </h3>
              <p className={styles.problemText}>
                A skill tells your agent what to do. A careless one can do the wrong thing.
              </p>
            </div>

            <div className={styles.problemCard}>
              <h3 className={styles.problemQuestion}>
                <div className={styles.problemTriangle} />
                Who made it?
              </h3>
              <p className={styles.problemText}>
                With no name behind it, nobody fixes it and nobody answers questions.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            4. WHAT WE OFFER (Pitch Deck Slide 5)
            ======================================================== */}
        <section className={styles.offerSection} aria-label="What We Offer">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>04 · What we offer</span>
            <h2 className={styles.sectionTitle}>A trusted place to find, install and ask for skills.</h2>
          </div>

          <div className={styles.offerGrid}>
            <div className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <div className={styles.offerTriangle} />
                <h3 className={styles.offerTitle}>Find</h3>
              </div>
              <p className={styles.offerBody}>
                Browse by job: client reporting, web design, product launch, social media and more. Every skill is reviewed.
              </p>
            </div>

            <div className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <div className={styles.offerTriangle} />
                <h3 className={styles.offerTitle}>Install</h3>
              </div>
              <p className={styles.offerBody}>
                Add a skill to the agent you already use, including Claude, Cursor, Codex and Gemini.
              </p>
            </div>

            <div className={styles.offerCard}>
              <div className={styles.offerHeader}>
                <div className={styles.offerTriangle} />
                <h3 className={styles.offerTitle}>Ask</h3>
              </div>
              <p className={styles.offerBody}>
                Can&apos;t find it? Request it. Our team and our makers, the people who build skills, decide what to build next.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. FIRST USERS & MARKET (Pitch Deck Slide 6 & 7)
            ======================================================== */}
        <section className={styles.marketSection} aria-label="Market and Developer Community">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>05 · Our first users</span>
            <h2 className={styles.sectionTitle}>
              Africa&apos;s developer community is growing faster than any other continent.
            </h2>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>4.7M</span>
              <span className={styles.statLabel}>software developers in Africa in 2024</span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statValue}>21%</span>
              <span className={styles.statLabel}>growth a year from 2019 to 2024, the fastest of any continent</span>
            </div>

            <div className={styles.statCard}>
              <span className={styles.statValue}>9.3M</span>
              <span className={styles.statLabel}>developer accounts on GitHub, the site developers share code on, early 2026</span>
            </div>
          </div>

          {/* Slide 7: Why now */}
          <div className={styles.fundingRow}>
            <h3 className={styles.fundingTitle}>Why now · More money is flowing into African tech.</h3>
            <div className={styles.fundingGrid}>
              <div className={styles.fundingItem}>
                <span className={styles.fundingAmount}>$4.1bn</span>
                <span className={styles.fundingMeta}>raised in 2025, up 25% on 2024 (Partech)</span>
              </div>
              <div className={styles.fundingItem}>
                <span className={styles.fundingAmount}>$1.64bn</span>
                <span className={styles.fundingMeta}>raised in 2025, up 46% on 2024 (Disrupt Africa)</span>
              </div>
              <div className={styles.fundingItem}>
                <span className={styles.fundingAmount}>$3.5bn</span>
                <span className={styles.fundingMeta}>raised in 2025, up 65% on 2024 (Intelpoint)</span>
              </div>
            </div>
            <p className={styles.citationsRow}>
              Sources: Boston Consulting Group (consultants), 2024 · OpenUK (an open-source research group), 2026 · Partech · Disrupt Africa · Intelpoint.
            </p>
          </div>
        </section>

        {/* ========================================================
            6. WHY WE WIN (Pitch Deck Slide 8)
            ======================================================== */}
        <section className={styles.flywheelSection} aria-label="Why We Win">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>07 · Why we win</span>
            <h2 className={styles.sectionTitle}>Skillhouse gets better the more it is used.</h2>
          </div>

          <div className={styles.quoteBanner}>
            <p className={styles.quoteText}>
              &ldquo;A copycat can copy a skill. It cannot copy the people who trust us.&rdquo;
            </p>
          </div>

          <div className={styles.flywheelGrid}>
            <div className={styles.flywheelCard}>
              <span className={styles.flywheelStep}>01 · Application</span>
              <h3 className={styles.flywheelTitle}>Use</h3>
              <p className={styles.flywheelBody}>
                People install a skill and put it to work.
              </p>
            </div>

            <div className={styles.flywheelCard}>
              <span className={styles.flywheelStep}>02 · Feedback</span>
              <h3 className={styles.flywheelTitle}>Improve</h3>
              <p className={styles.flywheelBody}>
                They tell us what to fix, and the maker updates it.
              </p>
            </div>

            <div className={styles.flywheelCard}>
              <span className={styles.flywheelStep}>03 · Reputation</span>
              <h3 className={styles.flywheelTitle}>Earn trust</h3>
              <p className={styles.flywheelBody}>
                The maker&apos;s name is on every skill, so good work is seen and weak work gets fixed.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            7. HOW WE EARN (Pitch Deck Slide 9)
            ======================================================== */}
        <section className={styles.pricingSection} aria-label="Pricing and Business Model">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>08 · How we earn</span>
            <h2 className={styles.sectionTitle}>Free to start. One plan for everything.</h2>
          </div>

          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <div>
                <span className={styles.planTier}>Free</span>
                <div className={styles.planPrice}>$0</div>
              </div>
              <p className={styles.planDetails}>
                Browse everything and install the free skills.
              </p>
            </div>

            <div className={`${styles.pricingCard} ${styles.pricingCardHighlight}`}>
              <div>
                <span className={styles.planTier}>Premium</span>
                <div className={styles.planPrice}>$5.99 <span style={{ fontSize: "16px", fontWeight: 400 }}>a month</span></div>
              </div>
              <p className={styles.planDetails}>
                Every premium skill, plus new releases and updates.
              </p>
            </div>

            <div className={styles.pricingCard}>
              <div>
                <span className={styles.planTier}>Coming next</span>
                <div className={styles.planPrice}>Makers</div>
              </div>
              <p className={styles.planDetails}>
                A way for founding makers to submit their own skills.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            8. WHERE WE ARE (Pitch Deck Slide 10)
            ======================================================== */}
        <section className={styles.roadmapSection} aria-label="Where We Are">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>09 · Where we are</span>
            <h2 className={styles.sectionTitle}>The product works. The first season is next.</h2>
          </div>

          <div className={styles.roadmapGrid}>
            <div className={styles.roadmapCard}>
              <h3 className={styles.roadmapPhase}>Today</h3>
              <p className={styles.roadmapText}>
                A working marketplace. People can browse, open a skill page and install it.
              </p>
            </div>

            <div className={styles.roadmapCard}>
              <h3 className={styles.roadmapPhase}>Next</h3>
              <p className={styles.roadmapText}>
                Paid plans. The payment page is built. The system that charges people comes next.
              </p>
            </div>

            <div className={styles.roadmapCard}>
              <h3 className={styles.roadmapPhase}>First season</h3>
              <p className={styles.roadmapText}>
                Bring in the first makers, the people who build skills, and list their reviewed skills.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================
            9. THE ASK & TEAM (Pitch Deck Slide 11)
            ======================================================== */}
        <section className={styles.teamSection} aria-label="The Ask and Founders">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>10 · The ask</span>
            <h2 className={styles.sectionTitle}>Help us build the first season of the house.</h2>
          </div>

          <div className={styles.teamCard}>
            <p className={styles.teamIntro}>
              We are applying for grants to launch our first season. Funding goes to three things:
            </p>

            <div className={styles.askGrid}>
              <div className={styles.askItem}>
                <span className={styles.askNumber}>01</span>
                <h3 className={styles.askTitle}>Review</h3>
                <p className={styles.askDescription}>
                  People who test and check every skill before it is listed.
                </p>
              </div>

              <div className={styles.askItem}>
                <span className={styles.askNumber}>02</span>
                <h3 className={styles.askTitle}>Makers</h3>
                <p className={styles.askDescription}>
                  Bring in the first builders and put their names on their work.
                </p>
              </div>

              <div className={styles.askItem}>
                <span className={styles.askNumber}>03</span>
                <h3 className={styles.askTitle}>Reach</h3>
                <p className={styles.askDescription}>
                  Meet people who use AI every day, in the communities where they already gather.
                </p>
              </div>
            </div>

            <div className={styles.contactsRow}>
              <div className={styles.contactItem}>
                <Mail size={16} color="var(--color-deck-mint)" />
                <span>
                  David Emeka · <a href="mailto:khalid@skillhouse.dev">khalid@skillhouse.dev</a>
                </span>
              </div>

              <div className={styles.contactItem}>
                <Mail size={16} color="var(--color-deck-mint)" />
                <span>
                  Nsikan Etukudoh · <a href="mailto:nsikan@skillhouse.dev">nsikan@skillhouse.dev</a>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            10. EARLY ACCESS WAITLIST CTA
            ======================================================== */}
        <section className={styles.ctaBanner} aria-label="Join the First Season Early Access">
          <span className={styles.ctaBadge}>FIRST SEASON EARLY ACCESS</span>
          <h2 className={styles.ctaTitle}>Ready to teach your AI agent new skills?</h2>
          <p className={styles.ctaSubtitle}>
            Join our early access list. Be the first to try reviewed skills and get updates on new releases.
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
        user={user || { name: "Alex Vance", email: "alex@skillhouse.dev" }}
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
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--color-bg-page, #0C0E0D)" }} />}>
      <ProductPageContent />
    </Suspense>
  );
}
