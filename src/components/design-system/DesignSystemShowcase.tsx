"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/Button";
import { Checkbox } from "../ui/Checkbox";
import { SearchInput } from "../ui/SearchInput";
import { Pill } from "../ui/Pill";
import { FilterItem } from "../features/FilterItem";
import { FilterSection } from "../features/FilterSection";
import { SkillCard } from "../features/SkillCard";
import { SkillAudienceBox } from "../features/SkillAudienceBox";
import { SkillRuntimeSpecs } from "../features/SkillRuntimeSpecs";
import { SkillDetailHeader } from "../features/SkillDetailHeader";
import styles from "./DesignSystemShowcase.module.css";

export const DesignSystemShowcase: React.FC = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [cb1, setCb1] = useState(false);
  const [cb2, setCb2] = useState(true);
  const [demoPillSelected, setDemoPillSelected] = useState<string>("Claude Code");
  const [filterActive, setFilterActive] = useState<Record<string, boolean>>({
    web: true,
    slides: false,
    video: false,
    image: true,
  });

  const toggleFilter = (key: string) => {
    setFilterActive((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const orangeTokens = [
    { name: "Brand Orange (Core)", hex: "#FB6320", desc: "Signature brand CTA, checked checkbox, links, active rings", var: "--color-brand" },
    { name: "Brand Hover", hex: "#E05215", desc: "Interactive hover for buttons and active states", var: "--color-brand-hover" },
    { name: "Brand Light (Banner Subtext)", hex: "#FFE3D7", desc: "Figma node 725:11285 banner subtext", var: "--color-brand-light" },
    { name: "Brand Subtle Tint", hex: "#FFF4EE", desc: "Active row highlight & verified chip fill", var: "--color-brand-subtle" },
    { name: "Surface Cream (Search Box)", hex: "#FFECD8", desc: "Figma node 694:4030 input background", var: "--color-surface-cream" },
    { name: "Surface Peach (Avatars)", hex: "#FBE1C7", desc: "Figma node 673:2956 model logomark background", var: "--color-surface-peach" },
  ];

  const neutralTokens = [
    { name: "Dark / Black", hex: "#000000", desc: "Primary black button, display titles, borders", var: "--color-dark" },
    { name: "Dark Hover", hex: "#1C1C1E", desc: "Hover state for black buttons and active body text", var: "--color-dark-hover" },
    { name: "Text Secondary", hex: "#464646", desc: "Nav items, search placeholder, label body", var: "--color-text-secondary" },
    { name: "Text Muted", hex: "#7F776E", desc: "Version labels, descriptions, subheadings", var: "--color-text-muted" },
    { name: "Text Tertiary", hex: "#9B9B9B", desc: "Item count badges (387, 113, 47, 144, 83)", var: "--color-text-tertiary" },
    { name: "Border Regular", hex: "rgba(166, 166, 166, 0.5)", desc: "Inputs, cards, and panel dividers", var: "--color-border" },
  ];

  return (
    <div className={styles.container}>
      {/* 1. Header Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Skillhouse Design System</h1>
        <p className={styles.heroSubtitle}>
          Living component library, token specifications, and interactive testing workbench
          powered by the official <strong>Geist Pixel Square</strong> font and Figma signature palette (File: <code>cenkXrTeBinliSZvWjPDZX</code>).
        </p>
        <div className={styles.metaInfo}>
          <span className={styles.metaPill}>Font: Geist Pixel Square (.ttf)</span>
          <span className={styles.metaPill}>Signature Accent: #FB6320</span>
          <span className={styles.metaPill}>9 Canvas Nodes Mapped</span>
        </div>
      </section>

      {/* 2. Signature Orange System */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            01. Signature Orange Palette System
            <span className={styles.nodeBadge}>#FB6320 Scale</span>
          </h2>
          <p className={styles.sectionDesc}>
            The primary brand identifier across CTA buttons (Node 671:8317), subscription banner (Node 725:11270),
            checkbox active fills (Node 673:2299), copy prompt borders (Node 725:11313), and cream/peach surfaces.
          </p>
        </div>

        <div className={styles.colorGrid}>
          {orangeTokens.map((c, i) => (
            <div key={i} className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: c.hex }}
              />
              <div className={styles.colorDetails}>
                <span className={styles.colorName}>{c.name}</span>
                <span className={styles.colorHex}>{c.hex}</span>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  {c.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Neutrals & Surface Scale */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>02. Neutrals & Surface Tokens</h2>
          <p className={styles.sectionDesc}>
            Monochromatic foundation for high-contrast legible product surfaces.
          </p>
        </div>

        <div className={styles.colorGrid}>
          {neutralTokens.map((c, i) => (
            <div key={i} className={styles.colorCard}>
              <div
                className={styles.colorSwatch}
                style={{ backgroundColor: c.hex.startsWith("rgba") ? "#D9D9D9" : c.hex }}
              />
              <div className={styles.colorDetails}>
                <span className={styles.colorName}>{c.name}</span>
                <span className={styles.colorHex}>{c.hex}</span>
                <span style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                  {c.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Geist Pixel Square Typography */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            03. Typography — Geist Pixel Square & Geist Sans
            <span className={styles.nodeBadge}>GeistPixel-Square.ttf</span>
          </h2>
          <p className={styles.sectionDesc}>
            Loaded directly from the authentic <code>GeistPixel-Square.ttf</code> binary for crisp pixel aesthetics.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div className={styles.typeSampleRow}>
            <span className="font-pixel" style={{ fontSize: "28px" }}>
              Visual Canvas Deck $5
            </span>
            <span className={styles.typeMeta}>Geist Pixel Square / 28px (Node 725:11241 & 725:11265)</span>
          </div>

          <div className={styles.typeSampleRow}>
            <span className="font-pixel" style={{ fontSize: "16px" }}>
              Subscribe — All Skills, one subscription
            </span>
            <span className={styles.typeMeta}>Geist Pixel Square / 16px (Node 725:11284)</span>
          </div>

          <div className={styles.typeSampleRow}>
            <span className="font-pixel" style={{ fontSize: "14px" }}>
              Pixel Promo Video · v2.3.0
            </span>
            <span className={styles.typeMeta}>Geist Pixel Square / 14px</span>
          </div>

          <div className={styles.typeSampleRow}>
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              Navigation Links & Body Headers
            </span>
            <span className={styles.typeMeta}>Geist Sans / 16px / Medium 500</span>
          </div>

          <div className={styles.typeSampleRow}>
            <span style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
              Search skills / outputs (Placeholder & input body)
            </span>
            <span className={styles.typeMeta}>Geist Sans / 14px / Regular 400</span>
          </div>

          <div className={styles.typeSampleRow}>
            <span style={{ fontSize: "12px", color: "var(--color-text-tertiary)" }}>
              Counts and Metadata (387, 113, 47, v1.0.1)
            </span>
            <span className={styles.typeMeta}>Geist Sans / 12px / Regular 400</span>
          </div>
        </div>
      </section>

      {/* 5. Button Primitives */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            04. Button Primitives
            <span className={styles.nodeBadge}>Nodes 673:15 & 671:8317</span>
          </h2>
          <p className={styles.sectionDesc}>
            Primary Dark (#000000), Brand Orange (#FB6320), Outlines, and Icon actions with press feedback (scale 0.96) and loading states.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          {/* Variants */}
          <div className={styles.sandboxRow}>
            <span className={styles.stateLabel}>Primary Dark (673:15)</span>
            <Button variant="primary" size="md">
              Get started
            </Button>
            <Button variant="primary" size="lg">
              Buy now ($5)
            </Button>
          </div>

          {/* Brand Accent */}
          <div className={styles.sandboxRow}>
            <span className={styles.stateLabel}>Brand Orange (671:8317)</span>
            <Button variant="brand" size="md">
              See all Skills
            </Button>
            <Button variant="brand" size="lg">
              Explore Library →
            </Button>
          </div>

          {/* Outlines */}
          <div className={styles.sandboxRow}>
            <span className={styles.stateLabel}>Outlines (725:11313)</span>
            <Button
              variant="outline-brand"
              size="md"
              leftIcon={<Image src="/figma/copy.svg" alt="" width={16} height={16} unoptimized />}
            >
              Copy install prompt
            </Button>
            <Button
              variant="outline"
              size="md"
              leftIcon={<Image src="/figma/import.svg" alt="" width={16} height={16} unoptimized />}
            >
              Download ZIP
            </Button>
          </div>

          {/* Interactive States */}
          <div className={styles.sandboxRow}>
            <span className={styles.stateLabel}>State Controls</span>
            <Button
              variant="brand"
              size="md"
              isLoading={btnLoading}
              onClick={() => {
                setBtnLoading(true);
                setTimeout(() => setBtnLoading(false), 2000);
              }}
            >
              Click for Loading State
            </Button>
            <Button variant="primary" size="md" disabled>
              Disabled State
            </Button>
            <Button variant="icon-border" size="icon-sm" title="Upload action">
              <Image src="/figma/upload.svg" alt="" width={14} height={14} unoptimized />
            </Button>
            <Button variant="icon-border" size="icon-sm" title="Archive action">
              <Image src="/figma/archive.svg" alt="" width={14} height={14} unoptimized />
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Search Input Component */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            05. Search Input Field
            <span className={styles.nodeBadge}>Node 694:4027</span>
          </h2>
          <p className={styles.sectionDesc}>
            Input with search-normal icon, subtle warm cream background (#FFECD8) or white variant, clear button, and focus ring.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div style={{ maxWidth: "340px" }}>
            <span className={styles.stateLabel}>Figma Cream Variant</span>
            <div style={{ marginTop: "8px" }}>
              <SearchInput
                variant="cream"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onClear={() => setSearchVal("")}
                placeholder="Search skills / outputs"
              />
            </div>
          </div>

          <div style={{ maxWidth: "340px" }}>
            <span className={styles.stateLabel}>White Surface Variant</span>
            <div style={{ marginTop: "8px" }}>
              <SearchInput
                variant="white"
                placeholder="Search skills / outputs"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Checkbox & Filter Items */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            06. Checkbox & Filter Items
            <span className={styles.nodeBadge}>Nodes 673:226, 673:228, 673:2316, 673:2327</span>
          </h2>
          <p className={styles.sectionDesc}>
            Custom 18px checkbox primitive with smooth animated checkmark and composite FilterItem with category icons and count badges.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div className={styles.sandboxRow}>
            <span className={styles.stateLabel}>Raw Checkboxes</span>
            <Checkbox
              label="Unchecked Default"
              checked={cb1}
              onChange={(e) => setCb1(e.target.checked)}
            />
            <Checkbox
              label="Checked Default (#FB6320)"
              checked={cb2}
              onChange={(e) => setCb2(e.target.checked)}
            />
            <Checkbox
              label="Disabled"
              checked={false}
              disabled
            />
          </div>

          <div style={{ maxWidth: "260px", marginTop: "16px" }}>
            <span className={styles.stateLabel}>Filter Group (673:2316)</span>
            <div style={{ marginTop: "12px" }}>
              <FilterSection title="By output" defaultOpen={true} showDivider={false}>
                <FilterItem
                  id="demo-web"
                  label="Web"
                  count={113}
                  iconName="monitor"
                  checked={filterActive.web}
                  onChange={() => toggleFilter("web")}
                />
                <FilterItem
                  id="demo-slides"
                  label="Slides"
                  count={47}
                  iconName="presentation"
                  checked={filterActive.slides}
                  onChange={() => toggleFilter("slides")}
                />
                <FilterItem
                  id="demo-video"
                  label="Video"
                  count={144}
                  iconName="video"
                  checked={filterActive.video}
                  onChange={() => toggleFilter("video")}
                />
                <FilterItem
                  id="demo-image"
                  label="Image"
                  count={83}
                  iconName="image"
                  checked={filterActive.image}
                  onChange={() => toggleFilter("image")}
                />
              </FilterSection>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Skill Card Component (Node 673:3035) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            07. Skill Card Grid Item
            <span className={styles.nodeBadge}>Node 673:3035 (skill - grid)</span>
          </h2>
          <p className={styles.sectionDesc}>
            Exact Figma tree: 200px cover image with sharp 0px corners, title in Geist 16px Regular, and -5px overlapping circular model badges (20x20px, #FBE1C7, 0.167px border).
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            <SkillCard
              id="card-1"
              title="Pixel Promo Video"
              category="Video"
              price="$8"
              previewImage="/figma/skill-card-preview.png"
              onClick={() => alert("Opened Pixel Promo Video")}
            />
            <SkillCard
              id="card-2"
              title="Visual Canvas Deck"
              category="Slides"
              price="$5"
              previewImage="/figma/skill-card-preview.png"
              onClick={() => alert("Opened Visual Canvas Deck")}
            />
          </div>
        </div>
      </section>

      {/* 9. Target Audience Box (Node 725:11328) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            08. Skill Audience Container
            <span className={styles.nodeBadge}>Node 725:11328 (often used by)</span>
          </h2>
          <p className={styles.sectionDesc}>
            Exact Figma tree: 16px padding, 16px gap, 1px border (rgba(166, 166, 166, 0.5)), sharp 0px radius, Geist 14px muted label, warm peach pills (height 28px, fill rgba(255, 236, 217, 0.7)), 1px divider, and updated date.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div style={{ maxWidth: "480px", width: "100%" }}>
            <SkillAudienceBox
              label="This skill is often used by"
              roles={["Product Manager", "Graphic Designer", "Art Director"]}
              lastUpdated="Last updated Oct 3, 2026"
            />
          </div>
        </div>
      </section>

      {/* 10. Skill Runtime & Guide Specs (Node 725:11346) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            09. Skill Runtime & Environment Specs
            <span className={styles.nodeBadge}>Node 725:11346 (runs in)</span>
          </h2>
          <p className={styles.sectionDesc}>
            Exact Figma tree: 3 spec rows with 97px fixed labels, 48px gap, 6 circular 28x28px runtime avatars (#FBE1C7, radius 42px), horizontal divider, and sharp 28px peach install guide pills.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div style={{ maxWidth: "480px", width: "100%" }}>
            <SkillRuntimeSpecs
              runsInModels={[
                "/figma/logo-1.png",
                "/figma/logo-2.png",
                "/figma/logo-3.png",
                "/figma/logo-4.png",
                "/figma/logo-5.png",
                "/figma/logo-6.png",
              ]}
              installGuides={["Claude Code", "Cursor"]}
              generatesWith={["Host Agent LLM"]}
            />
          </div>
        </div>
      </section>

      {/* 11. Peach Pill Primitive (Template EL-d7837055) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            10. Peach Pill / Tag Primitive
            <span className={styles.nodeBadge}>Template EL-d7837055 (sort-select)</span>
          </h2>
          <p className={styles.sectionDesc}>
            Reusable interactive pill: height 28px, sharp 0px border-radius, background rgba(255, 236, 217, 0.7), 1px border rgba(166, 166, 166, 0.5), Geist 14px regular font, and active selection state.
          </p>
        </div>

        <div className={styles.sandboxCard}>
          <div className={styles.sandboxRow}>
            <span className={styles.stateLabel}>Interactive Pills</span>
            {["Claude Code", "Cursor", "Product Manager", "Host Agent LLM"].map((pill) => (
              <Pill
                key={pill}
                isSelected={demoPillSelected === pill}
                onClick={() => setDemoPillSelected(pill)}
              >
                {pill}
              </Pill>
            ))}
          </div>
        </div>
      </section>

      {/* 12. Master Action Header (Node 725:11237) */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            11. Composite Skill Detail Action Panel
            <span className={styles.nodeBadge}>Node 725:11237 (main-header)</span>
          </h2>
          <p className={styles.sectionDesc}>
            Master action header integrating Geist Pixel Square titles, orange subscription banner (#FB6320), copy prompt button, Node 725:11328 audience container, and Node 725:11346 runtime specs.
          </p>
        </div>

        <div className={styles.sandboxCard} style={{ alignItems: "center" }}>
          <SkillDetailHeader
            onBuy={() => alert("Buy now triggered ($5)")}
            onSubscribe={() => alert("All Skills Subscription opened")}
          />
        </div>
      </section>
    </div>
  );
};
