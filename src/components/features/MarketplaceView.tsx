"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronDown, Filter as FilterIcon, SlidersHorizontal, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NavBar } from "@/components/features/NavBar";
import { FilterSidebar, FilterState } from "@/components/features/FilterSidebar";
import { SkillCard } from "@/components/features/SkillCard";
import { AdCard } from "@/components/features/AdCard";
import { SkillDetailHeader } from "@/components/features/SkillDetailHeader";
import { SkillAudienceBox } from "@/components/features/SkillAudienceBox";
import { SkillRuntimeSpecs } from "@/components/features/SkillRuntimeSpecs";
import { ConnectAgentBanner } from "./ConnectAgentBanner";
import { LoginModal } from "@/components/features/LoginModal";
import { RequestSkillModal } from "@/components/features/RequestSkillModal";
import { Footer } from "@/components/features/Footer";
import styles from "./MarketplaceView.module.css";

export interface SkillItem {
  id: string;
  title: string;
  version: string;
  price: string;
  isFree: boolean;
  isFeatured?: boolean;
  description: string;
  installPrompt: string;
  previewImage: string;
  models: string[];
  roles: string[];
  output: string;
  useCase: string;
  category: string;
  installs?: number;
  rating?: number;
  createdAt?: string;
}

export const MARKETPLACE_SKILLS: SkillItem[] = [
  {
    id: "pixel-promo-video",
    title: "Pixel Promo Video",
    version: "2.4.0",
    price: "Free",
    isFree: true,
    isFeatured: true,
    description: "Generates cinematic 4K video promos, animated kinetic text, and product reels directly from prompt specifications.",
    installPrompt: "npx create-agent-skill pixel-promo-video",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-codex.png",
    ],
    roles: ["content-creator", "marketer", "designer"],
    output: "video",
    useCase: "product-launch",
    category: "Video & Media",
    installs: 4820,
    rating: 4.9,
    createdAt: "2026-10-10",
  },
  {
    id: "web-dev-pro",
    title: "Web Development Pro",
    version: "1.0.0",
    price: "Free",
    isFree: true,
    isFeatured: true,
    description: "Generates modern responsive websites using clean HTML, CSS, and TypeScript with optimal performance and SEO best practices.",
    installPrompt: "npx create-agent-skill web-dev-pro",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-cursor.png",
      "/figma/agent-codex.png",
    ],
    roles: ["swe", "founder"],
    output: "web",
    useCase: "web-design",
    category: "Engineering",
    installs: 3910,
    rating: 4.8,
    createdAt: "2026-10-09",
  },
  {
    id: "brand-identity-designer",
    title: "Brand Identity Designer",
    version: "2.1.0",
    price: "$19",
    isFree: false,
    isFeatured: true,
    description: "Synthesizes harmonious color palettes, typography scales, logo systems, and visual guidelines into an exportable design token set.",
    installPrompt: "npx create-agent-skill brand-identity-designer",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-gemini.png",
    ],
    roles: ["designer", "founder"],
    output: "image",
    useCase: "brand-identity",
    category: "Design",
    installs: 2750,
    rating: 4.9,
    createdAt: "2026-10-08",
  },
  {
    id: "social-media-strategist",
    title: "Social Media Strategist",
    version: "1.2.0",
    price: "Free",
    isFree: true,
    isFeatured: false,
    description: "Crafts high-converting multi-platform social media posts, threads, and newsletters calibrated precisely to your audience voice.",
    installPrompt: "npx create-agent-skill social-media-strategist",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-cursor.png",
    ],
    roles: ["marketer", "content-creator"],
    output: "slides",
    useCase: "social-media",
    category: "Marketing",
    installs: 1980,
    rating: 4.7,
    createdAt: "2026-10-07",
  },
  {
    id: "automated-data-insights",
    title: "Automated Data Insights",
    version: "3.0.0",
    price: "$29",
    isFree: false,
    isFeatured: true,
    description: "Processes complex CSV, JSON, and SQL tables to generate automated visual dashboards, outlier detection, and executive summaries.",
    installPrompt: "npx create-agent-skill automated-data-insights",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-codex.png",
      "/figma/agent-gemini.png",
    ],
    roles: ["researcher", "consultant", "founder"],
    output: "slides",
    useCase: "client-reporting",
    category: "Analytics",
    installs: 3120,
    rating: 4.9,
    createdAt: "2026-10-06",
  },
  {
    id: "ecommerce-conversion-pro",
    title: "Ecommerce Conversion Pro",
    version: "1.4.0",
    price: "$15",
    isFree: false,
    isFeatured: false,
    description: "Analyzes buyer drop-offs, writes persuasive checkout microcopy, and generates tailored product descriptions that boost conversions.",
    installPrompt: "npx create-agent-skill ecommerce-conversion-pro",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-cursor.png",
    ],
    roles: ["ecommerce", "marketer"],
    output: "web",
    useCase: "ecommerce-conversion",
    category: "Ecommerce",
    installs: 1450,
    rating: 4.6,
    createdAt: "2026-10-05",
  },
  {
    id: "interactive-pitch-deck",
    title: "Interactive Pitch Deck",
    version: "2.0.0",
    price: "Free",
    isFree: true,
    isFeatured: true,
    description: "Generates visually compelling investor pitch presentations with built-in financial models and competitive landscape diagrams.",
    installPrompt: "npx create-agent-skill interactive-pitch-deck",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-cursor.png",
    ],
    roles: ["founder", "consultant"],
    output: "slides",
    useCase: "sales-fundraising",
    category: "Business",
    installs: 2610,
    rating: 4.8,
    createdAt: "2026-10-04",
  },
  {
    id: "educational-explainer-generator",
    title: "Education Explainer AI",
    version: "1.1.0",
    price: "Free",
    isFree: true,
    isFeatured: false,
    description: "Breaks down advanced scientific and technical concepts into engaging, digestible lesson plans with quizzes and illustrative cards.",
    installPrompt: "npx create-agent-skill education-explainer-ai",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-gemini.png",
      "/figma/agent-codex.png",
    ],
    roles: ["teacher", "researcher"],
    output: "slides",
    useCase: "education",
    category: "Education",
    installs: 1890,
    rating: 4.9,
    createdAt: "2026-10-03",
  },
  {
    id: "creative-previs-director",
    title: "Creative Previs Studio",
    version: "3.2.0",
    price: "$35",
    isFree: false,
    isFeatured: true,
    description: "Produces storyboard frames, camera blocking guides, and lighting look-dev renders for film, commercial, and game cinematic pipelines.",
    installPrompt: "npx create-agent-skill creative-previs-studio",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-cursor.png",
    ],
    roles: ["designer", "content-creator"],
    output: "image",
    useCase: "creative-previsualization",
    category: "Creative",
    installs: 2130,
    rating: 4.9,
    createdAt: "2026-10-02",
  },
  {
    id: "research-paper-synthesizer",
    title: "Research Paper Synthesizer",
    version: "1.8.0",
    price: "Free",
    isFree: true,
    isFeatured: false,
    description: "Digests multi-page ArXiv and PubMed papers into concise methodological comparisons, key findings, and reproducible citations.",
    installPrompt: "npx create-agent-skill research-paper-synthesizer",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-gemini.png",
      "/figma/agent-codex.png",
    ],
    roles: ["researcher", "teacher"],
    output: "web",
    useCase: "research-communication",
    category: "Research",
    installs: 3410,
    rating: 4.8,
    createdAt: "2026-10-01",
  },
  {
    id: "content-publishing-pipeline",
    title: "Content Publishing Engine",
    version: "2.3.0",
    price: "$19",
    isFree: false,
    isFeatured: true,
    description: "Automates article outlining, SEO metadata generation, headline testing, and multi-format markdown syndication across your blog.",
    installPrompt: "npx create-agent-skill content-publishing-engine",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-kimi.png",
      "/figma/agent-cursor.png",
    ],
    roles: ["content-creator", "marketer"],
    output: "web",
    useCase: "publishing",
    category: "Writing",
    installs: 2540,
    rating: 4.7,
    createdAt: "2026-09-30",
  },
  {
    id: "python-api-scaffolder",
    title: "FastAPI Microservice Scaffolder",
    version: "1.5.0",
    price: "Free",
    isFree: true,
    isFeatured: false,
    description: "Builds production-ready asynchronous Python FastAPI endpoints with Pydantic v2 validation, Dockerfile, and pytest coverage.",
    installPrompt: "npx create-agent-skill fastapi-scaffolder",
    previewImage: "/figma/marketplace_sample_card.png",
    models: [
      "/figma/agent-claude.png",
      "/figma/agent-antigravity.png",
      "/figma/agent-cursor.png",
      "/figma/agent-codex.png",
    ],
    roles: ["swe"],
    output: "web",
    useCase: "product-launch",
    category: "Engineering",
    installs: 4120,
    rating: 4.9,
    createdAt: "2026-09-28",
  },
];


export type GridItem =
  | ({ type: "skill" } & SkillItem)
  | {
      type: "ad";
      id: string;
      sponsorName: string;
      title: string;
      description: string;
      badgeLabel: string;
      ctaText: string;
      ctaUrl: string;
      imageSrc?: string;
    };

export const MARKETPLACE_ADS: Array<Omit<Extract<GridItem, { type: "ad" }>, "type">> = [
  {
    id: "ad-claude-fleet",
    sponsorName: "Claude Fleet",
    title: "Scale Autonomous Agent Fleets",
    description: "Deploy, orchestrate and evaluate multi-agent reasoning loops in production with enterprise guardrails.",
    badgeLabel: "Sponsored",
    ctaText: "Explore Fleet",
    ctaUrl: "https://claude.ai",
  },
  {
    id: "ad-creator-monetize",
    sponsorName: "Skillhouse Pro",
    title: "Monetize Custom Agent Skills",
    description: "Publish verified SKILL.md packages to 50,000+ developers and earn 85% revenue share on every install.",
    badgeLabel: "Creator Network",
    ctaText: "Start Earning",
    ctaUrl: "https://skillhouse.ai",
  },
];

export interface MarketplaceViewProps {
  initialCategory?: string;
  initialSearch?: string;
  onNavigateHome?: () => void;
  className?: string;
}


export function resolveCategoryToFilters(categoryName?: string, tab?: string): FilterState {
  const norm = (categoryName || "").toLowerCase().trim().replace(/[\r\n]+/g, " ");
  const defaultState: FilterState = {
    recommendations: ["all"],
    outputs: [],
    roles: [],
    useCases: [],
  };

  if (!norm || norm === "all" || norm === "see all" || norm === "skills") {
    return defaultState;
  }

  // 1. Curated / Recommendations
  if (norm.includes("free")) {
    return { ...defaultState, recommendations: ["free"] };
  }
  if (norm.includes("featured") || norm.includes("trending") || norm.includes("top-rated") || norm.includes("top rated")) {
    return { ...defaultState, recommendations: ["featured"] };
  }

  // 2. Tab-specific resolution if tab is provided
  if (tab === "output") {
    if (norm.includes("image")) return { recommendations: [], outputs: ["image"], roles: [], useCases: [] };
    if (norm.includes("slide") || norm.includes("presentation")) return { recommendations: [], outputs: ["slides"], roles: [], useCases: [] };
    if (norm.includes("video")) return { recommendations: [], outputs: ["video"], roles: [], useCases: [] };
    if (norm.includes("web") || norm.includes("html")) return { recommendations: [], outputs: ["web"], roles: [], useCases: [] };
  }

  if (tab === "role") {
    if (norm.includes("content creator") || norm === "content-creator") return { recommendations: [], outputs: [], roles: ["content-creator"], useCases: [] };
    if (norm.includes("commerce") || norm === "ecommerce") return { recommendations: [], outputs: [], roles: ["ecommerce"], useCases: [] };
    if (norm.includes("consultant")) return { recommendations: [], outputs: [], roles: ["consultant"], useCases: [] };
    if (norm.includes("marketer")) return { recommendations: [], outputs: [], roles: ["marketer"], useCases: [] };
    if (norm.includes("software") || norm.includes("engineer") || norm === "swe") return { recommendations: [], outputs: [], roles: ["swe"], useCases: [] };
    if (norm.includes("founder")) return { recommendations: [], outputs: [], roles: ["founder"], useCases: [] };
    if (norm.includes("designer")) return { recommendations: [], outputs: [], roles: ["designer"], useCases: [] };
    if (norm.includes("teacher")) return { recommendations: [], outputs: [], roles: ["teacher"], useCases: [] };
    if (norm.includes("researcher")) return { recommendations: [], outputs: [], roles: ["researcher"], useCases: [] };
  }

  if (tab === "use-case") {
    if (norm.includes("web design") || norm === "web-design") return { recommendations: [], outputs: [], roles: [], useCases: ["web-design"] };
    if (norm.includes("brand") || norm.includes("identity") || norm === "brand-identity") return { recommendations: [], outputs: [], roles: [], useCases: ["brand-identity"] };
    if (norm.includes("social") || norm === "social-media") return { recommendations: [], outputs: [], roles: [], useCases: ["social-media"] };
    if (norm.includes("education") || norm.includes("explainer") || norm === "education") return { recommendations: [], outputs: [], roles: [], useCases: ["education"] };
    if (norm.includes("product launch") || norm === "product-launch") return { recommendations: [], outputs: [], roles: [], useCases: ["product-launch"] };
    if (norm.includes("reporting") || norm.includes("client reporting") || norm === "client-reporting") return { recommendations: [], outputs: [], roles: [], useCases: ["client-reporting"] };
    if (norm.includes("research communication") || norm === "research-communication") return { recommendations: [], outputs: [], roles: [], useCases: ["research-communication"] };
    if (norm.includes("publishing") || norm.includes("content publishing") || norm === "publishing") return { recommendations: [], outputs: [], roles: [], useCases: ["publishing"] };
  }

  // 3. Direct Outputs matching
  if (norm === "image" || norm === "images" || norm.includes("image")) {
    return { recommendations: [], outputs: ["image"], roles: [], useCases: [] };
  }
  if (norm === "slides" || norm === "presentations" || norm.includes("presentation") || norm.includes("slide")) {
    return { recommendations: [], outputs: ["slides"], roles: [], useCases: [] };
  }
  if (norm === "video" || norm.includes("video")) {
    return { recommendations: [], outputs: ["video"], roles: [], useCases: [] };
  }
  if (norm === "web" || norm === "web & html" || norm === "web-html" || norm === "html" || norm.includes("html")) {
    return { recommendations: [], outputs: ["web"], roles: [], useCases: [] };
  }

  // 4. Direct Roles matching
  if (norm.includes("content creator") || norm === "content-creator") {
    return { recommendations: [], outputs: [], roles: ["content-creator"], useCases: [] };
  }
  if (norm.includes("commerce") || norm === "ecommerce") {
    return { recommendations: [], outputs: [], roles: ["ecommerce"], useCases: [] };
  }
  if (norm.includes("consultant")) {
    return { recommendations: [], outputs: [], roles: ["consultant"], useCases: [] };
  }
  if (norm.includes("marketer")) {
    return { recommendations: [], outputs: [], roles: ["marketer"], useCases: [] };
  }
  if (norm.includes("software") || norm.includes("engineer") || norm === "swe") {
    return { recommendations: [], outputs: [], roles: ["swe"], useCases: [] };
  }
  if (norm.includes("founder")) {
    return { recommendations: [], outputs: [], roles: ["founder"], useCases: [] };
  }
  if (norm.includes("designer")) {
    return { recommendations: [], outputs: [], roles: ["designer"], useCases: [] };
  }
  if (norm.includes("teacher")) {
    return { recommendations: [], outputs: [], roles: ["teacher"], useCases: [] };
  }
  if (norm.includes("researcher")) {
    return { recommendations: [], outputs: [], roles: ["researcher"], useCases: [] };
  }

  // 5. Direct Use Cases matching
  if (norm.includes("web design") || norm === "web-design") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["web-design"] };
  }
  if (norm.includes("brand") || norm.includes("identity") || norm === "brand-identity") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["brand-identity"] };
  }
  if (norm.includes("social") || norm === "social-media") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["social-media"] };
  }
  if (norm.includes("education") || norm.includes("explainer") || norm === "education") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["education"] };
  }
  if (norm.includes("product launch") || norm === "product-launch") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["product-launch"] };
  }
  if (norm.includes("reporting") || norm.includes("client reporting") || norm === "client-reporting") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["client-reporting"] };
  }
  if (norm.includes("research communication") || norm === "research-communication") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["research-communication"] };
  }
  if (norm.includes("publishing") || norm.includes("content publishing") || norm === "publishing") {
    return { recommendations: [], outputs: [], roles: [], useCases: ["publishing"] };
  }
  if (norm.includes("previsualization") || norm.includes("previs")) {
    return { recommendations: [], outputs: [], roles: [], useCases: ["creative-previsualization"] };
  }
  if (norm.includes("fundraising") || norm.includes("sales")) {
    return { recommendations: [], outputs: [], roles: [], useCases: ["sales-fundraising"] };
  }

  // 6. Home screen grid cards fallbacks
  if (norm === "output" || norm.includes("skills by output") || norm.includes("output")) {
    return { recommendations: [], outputs: ["web", "slides", "video", "image"], roles: [], useCases: [] };
  }
  if (norm === "roles" || norm === "role" || norm.includes("skills by roles") || norm.includes("role")) {
    return { recommendations: [], outputs: [], roles: ["content-creator", "founder", "designer", "swe", "marketer"], useCases: [] };
  }
  if (norm === "use-case" || norm.includes("skills by use-case") || norm.includes("use case")) {
    return { recommendations: [], outputs: [], roles: [], useCases: ["web-design", "brand-identity", "product-launch", "social-media", "education", "publishing", "client-reporting"] };
  }

  return defaultState;
}

export function MarketplaceView({
  initialCategory,
  initialSearch,
  onNavigateHome,
  className = "",
}: MarketplaceViewProps) {
  const router = useRouter();

  const [skills] = useState<SkillItem[]>(MARKETPLACE_SKILLS);
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [bookmarkedSkills, setBookmarkedSkills] = useState<Record<string, boolean>>({});
  const [searchValue, setSearchValue] = useState(initialSearch || "");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "alphabetical">("newest");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isRequestSkillOpen, setIsRequestSkillOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  // Initialize filters based on optional initialCategory
  const [filters, setFilters] = useState<FilterState>(() => {
    return initialCategory ? resolveCategoryToFilters(initialCategory) : {
      recommendations: ["all"],
      outputs: [],
      roles: [],
      useCases: [],
    };
  });

  // Keep filters synchronized if initialCategory changes
  useEffect(() => {
    if (initialCategory) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilters(resolveCategoryToFilters(initialCategory));
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchValue(initialSearch);
    }
  }, [initialSearch]);

  // Close sort dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    if (sortDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sortDropdownOpen]);

  const handleToggleBookmark = (skillId: string, isBookmarked: boolean) => {
    setBookmarkedSkills((prev) => ({
      ...prev,
      [skillId]: isBookmarked,
    }));
  };

  const handleSelectCategoryFromNav = (cat: string, tab?: string) => {
    setSelectedSkill(null);
    setFilters(resolveCategoryToFilters(cat, tab));
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("view", "marketplace");
      params.set("category", cat);
      window.history.pushState(null, "", `${window.location.pathname}?${params.toString()}`);
    }
  };

  const filteredSkills = useMemo(() => {
    const result = skills.filter((skill) => {
      // 1. Text Search query
      if (searchValue.trim()) {
        const q = searchValue.toLowerCase();
        const matches =
          skill.title.toLowerCase().includes(q) ||
          skill.description.toLowerCase().includes(q) ||
          skill.output.toLowerCase().includes(q) ||
          skill.useCase.toLowerCase().includes(q) ||
          skill.category.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Recommendations filter
      if (filters.recommendations.includes("free") && !skill.isFree) {
        return false;
      }
      if (filters.recommendations.includes("featured") && !skill.isFeatured) {
        return false;
      }

      // 3. Outputs filter
      if (filters.outputs.length > 0) {
        const matchesOutput = filters.outputs.some((o) => skill.output.toLowerCase() === o);
        if (!matchesOutput) return false;
      }

      // 4. Roles filter
      if (filters.roles.length > 0) {
        const matchesRole = filters.roles.some((r) =>
          skill.roles.some((sr) => sr === r || sr.includes(r) || r.includes(sr))
        );
        if (!matchesRole) return false;
      }

      // 5. Use Cases filter
      if (filters.useCases.length > 0) {
        const matchesUseCase = filters.useCases.some(
          (u) => skill.useCase.toLowerCase() === u || skill.useCase.toLowerCase().includes(u)
        );
        if (!matchesUseCase) return false;
      }

      return true;
    });

    // Sort order
    if (sortBy === "popular") {
      result.sort((a, b) => (b.installs || 0) - (a.installs || 0));
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // newest
      result.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    }

    return result;
  }, [skills, searchValue, filters, sortBy]);



  const totalActiveFilters = useMemo(() => {
    return (
      filters.recommendations.filter((r) => r !== "all").length +
      filters.outputs.length +
      filters.roles.length +
      filters.useCases.length
    );
  }, [filters]);

  const gridItems = useMemo<GridItem[]>(() => {
    const items: GridItem[] = [];
    let adIndex = 0;

    filteredSkills.forEach((skill, index) => {
      // Strategic insert 1: After first row of 4 skills (position 5)
      if (index === 4 && adIndex < MARKETPLACE_ADS.length) {
        items.push({ type: "ad", ...MARKETPLACE_ADS[adIndex++] });
      }
      // Strategic insert 2: After second block of skills (position 10)
      if (index === 8 && adIndex < MARKETPLACE_ADS.length) {
        items.push({ type: "ad", ...MARKETPLACE_ADS[adIndex++] });
      }

      items.push({ type: "skill", ...skill });
    });

    return items;
  }, [filteredSkills]);

  const handleResetFilters = () => {
    setSelectedSkill(null);
    setFilters({
      recommendations: ["all"],
      outputs: [],
      roles: [],
      useCases: [],
    });
    setSearchValue("");
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      params.set("view", "marketplace");
      params.delete("category");
      params.delete("search");
      window.history.pushState(null, "", `${window.location.pathname}?${params.toString()}`);
    }
  };

  return (
    <div className={`${styles.wrapper} ${className}`} data-testid="skills-marketplace-page">
      {/* 1. Sticky Navigation Bar */}
      <NavBar
        currentView="marketplace"
        onViewChange={(view) => {
          if (view === "design-system") {
            router.push("/design-system");
          } else if (view === "home") {
            if (onNavigateHome) {
              onNavigateHome();
            } else {
              router.push("/");
            }
          } else if (view === "marketplace") {
            handleResetFilters();
          }
        }}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchSubmit={(val) => setSearchValue(val)}
        onSelectCategory={handleSelectCategoryFromNav}
        onRequestSkill={() => setIsRequestSkillOpen(true)}
        isSignedIn={isSignedIn}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onGetStarted={() => setIsLoginModalOpen(true)}
        onSignOut={() => setIsSignedIn(false)}
      />

      {/* Mobile Drawer Backdrop Overlay */}
      <div
        className={`${styles.mobileFilterOverlay} ${mobileFiltersVisible ? styles.mobileOpen : ""}`}
        onClick={() => setMobileFiltersVisible(false)}
        aria-hidden="true"
      />

      {/* 2. Main Marketplace Layout Container - Exact Figma Node 751:4572 Specs */}
      <div className={styles.marketplaceLayout}>
        {/* Left Filter Sidebar Column - Exact Figma 751:4573 (w: 220px, pad: 24px, gap: 24px) */}
        <div
          id="marketplace-sidebar"
          className={`${styles.sidebarColumn} ${isSidebarCollapsed ? styles.collapsed : ""} ${mobileFiltersVisible ? styles.mobileOpen : ""}`}
          aria-hidden={isSidebarCollapsed}
          inert={isSidebarCollapsed || undefined}
        >
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onToggleCollapse={() => setIsSidebarCollapsed(true)}
            isCollapsed={isSidebarCollapsed}
          />
        </div>
        {/* Edge Retract/Expand Dock Rail on the body when sidebar is collapsed */}
        {isSidebarCollapsed && (
          <aside className={styles.edgeDockContainer} aria-label="Filters sidebar dock">
            <button
              type="button"
              className={styles.edgeDockRail}
              onClick={() => setIsSidebarCollapsed(false)}
              aria-label={`Expand filters sidebar${totalActiveFilters > 0 ? ` (${totalActiveFilters} active)` : ""}`}
              title="Expand filters sidebar"
              data-testid="edge-expand-rail"
            >
              <PanelLeftOpen size={15} className={styles.edgeDockIcon} aria-hidden="true" />
              <span className={styles.edgeDockText}>Filters</span>
              {totalActiveFilters > 0 && (
                <span className={styles.edgeDockBadge}>{totalActiveFilters}</span>
              )}
            </button>
          </aside>
        )}


        {/* Right Main Content Area - Exact Figma 751:4736 (w: 1140px, pad-left: 40px, pad-right: 40px, pad-top: 24px) */}
        <main className={styles.mainContent}>
          {/* Main Title & Subtitle Frame - Exact Figma 751:4737 (h: 64px, gap: 12px) */}
          <div className={styles.mainHeader}>
            <h1 className={styles.title}>Agent Skills Marketplace</h1>
            <p className={styles.subtitle}>
              Works in Claude Code, Codex, Cursor, Antigravity and any agent that reads SKILL.md.
            </p>
          </div>

          {/* Mobile Filter Toggle Button */}
          <div className={styles.mobileFilterBar}>
            <button
              type="button"
              className={styles.filterToggleBtn}
              onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
              aria-label="Toggle filter options"
            >
              <FilterIcon size={14} />
              <span>{mobileFiltersVisible ? "Close Filters" : "Filter Skills"}</span>
            </button>
            <span className={styles.skillsCount}>
              {filteredSkills.length} Skills
            </span>
          </div>

          {/* Controls Bar - Exact Figma 751:4740 (h: 38px, space-between) */}
          <div className={styles.controlsBar}>
            {/* Left Controls: Modern Expand/Retract Pill and Count */}
            <div className={styles.controlsLeft}>
              <button
                type="button"
                className={`${styles.filterTogglePill} ${isSidebarCollapsed ? styles.isCollapsed : ""}`}
                onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                aria-expanded={!isSidebarCollapsed}
                aria-controls="marketplace-sidebar"
                data-testid="toggle-filter-sidebar"
                aria-label={
                  isSidebarCollapsed
                    ? `Expand filters sidebar${totalActiveFilters > 0 ? ` (${totalActiveFilters} active)` : ""}`
                    : "Collapse filters sidebar"
                }
                title={isSidebarCollapsed ? "Expand filters" : "Collapse filters"}
              >
                {isSidebarCollapsed ? (
                  <PanelLeftOpen size={15} className={styles.togglePillIcon} aria-hidden="true" />
                ) : (
                  <PanelLeftClose size={15} className={styles.togglePillIcon} aria-hidden="true" />
                )}
                <span className={styles.togglePillText}>Filters</span>
                {totalActiveFilters > 0 && (
                  <span className={styles.togglePillBadge} data-testid="active-filter-badge">
                    {totalActiveFilters}
                  </span>
                )}
              </button>

              <span className={styles.skillsCount} data-testid="skills-count">
                {filteredSkills.length} Skills
              </span>
            </div>

            {/* Sort Select Dropdown (Node 751:4744) */}
            <div ref={sortRef} className={styles.sortWrapper}>
              <button
                type="button"
                className={styles.sortButton}
                onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                aria-expanded={sortDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Sort skills by order"
              >
                <span>
                  {sortBy === "newest"
                    ? "Newest"
                    : sortBy === "popular"
                    ? "Most popular"
                    : "Alphabetical"}
                </span>
                <span className={`${styles.sortChevron} ${sortDropdownOpen ? styles.open : ""}`} aria-hidden="true">
                  <ChevronDown size={14} />
                </span>
              </button>

              {sortDropdownOpen && (
                <div className={styles.sortDropdownMenu} role="listbox">
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortBy === "newest"}
                    className={`${styles.sortOption} ${sortBy === "newest" ? styles.selected : ""}`}
                    onClick={() => {
                      setSortBy("newest");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Newest
                  </button>
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortBy === "popular"}
                    className={`${styles.sortOption} ${sortBy === "popular" ? styles.selected : ""}`}
                    onClick={() => {
                      setSortBy("popular");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Most popular
                  </button>
                  <button
                    type="button"
                    role="option"
                    aria-selected={sortBy === "alphabetical"}
                    className={`${styles.sortOption} ${sortBy === "alphabetical" ? styles.selected : ""}`}
                    onClick={() => {
                      setSortBy("alphabetical");
                      setSortDropdownOpen(false);
                    }}
                  >
                    Alphabetical
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Skills Grid - Exact Figma 751:4748 (4 columns, col gap: 16px, row gap: 24px) */}
          {filteredSkills.length > 0 ? (
            <div
              className={`${styles.skillsGrid} ${isSidebarCollapsed ? styles.expandedGrid : ""}`}
              id="marketplace-grid"
              data-testid="marketplace-grid"
            >
              {gridItems.map((item) =>
                item.type === "ad" ? (
                  <AdCard
                    key={item.id}
                    id={item.id}
                    sponsorName={item.sponsorName}
                    title={item.title}
                    description={item.description}
                    badgeLabel={item.badgeLabel}
                    ctaText={item.ctaText}
                    ctaUrl={item.ctaUrl}
                    imageSrc={item.imageSrc}
                    onClick={() => {
                      if (item.ctaUrl) {
                        window.open(item.ctaUrl, "_blank", "noopener,noreferrer");
                      }
                    }}
                  />
                ) : (
                  <SkillCard
                    key={item.id}
                    id={`skill-${item.id}`}
                    title={item.title}
                    category={item.category}
                    previewImage={item.previewImage}
                    models={item.models}
                    isBookmarked={bookmarkedSkills[item.id]}
                    onBookmarkToggle={(isBookmarked) => handleToggleBookmark(item.id, isBookmarked)}
                    onClick={() => setSelectedSkill(item)}
                  />
                )
              )}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No skills found matching your filters</h3>
              <p className={styles.emptyDesc}>
                Try adjusting your search terms, clearing selected output or role tags, or explore our recommended skills.
              </p>
              <button
                type="button"
                className={styles.resetBtn}
                onClick={handleResetFilters}
              >
                Reset all filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Skill Detail Modal Sheet when card is clicked */}
      {selectedSkill && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedSkill(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-skill-title"
        >
          <div
            className={styles.modalSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalCloseBtn}
              onClick={() => setSelectedSkill(null)}
              aria-label="Close skill details"
            >
              <X size={20} />
            </button>

            <SkillDetailHeader
              title={selectedSkill.title}
              version={selectedSkill.version}
              price={selectedSkill.price}
              isFree={selectedSkill.isFree}
              installPrompt={selectedSkill.installPrompt}
              description={selectedSkill.description}
            />

            <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 24 }}>
              <SkillAudienceBox />
              <SkillRuntimeSpecs />
              <ConnectAgentBanner />
            </div>
          </div>
        </div>
      )}

      {/* 4. Global Dark Footer */}
      <Footer
        onSelectCategory={(cat) => {
          handleSelectCategoryFromNav(cat);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onNavigateMarketplace={() => {
          handleResetFilters();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <RequestSkillModal
        isOpen={isRequestSkillOpen}
        onClose={() => setIsRequestSkillOpen(false)}
        onSubmitSuccess={() => setIsRequestSkillOpen(false)}
      />
    </div>
  );
}
