# Skillhouse Design System Specification

A cohesive, production-grade design system and component architecture extracted from Figma design file `cenkXrTeBinliSZvWjPDZX` (`meyaj2`).

---

## 1. Architectural Foundations

1. **Authentic Geist Pixel Square Typography**:
   - Font binary `GeistPixel-Square.ttf` located locally in `frontend/public/fonts/` and integrated via `next/font/local` into `:root` as `--font-geist-pixel` / `--font-pixel`.
   - Used for all hero titles, skill detail titles, pricing tags, and subscription callouts.
2. **Signature Orange `#FB6320` Design Language**:
   - The primary brand accent extracted directly from Figma fills and strokes.
   - Powers the brand CTA buttons, subscription banners, checked checkbox states, prompt copy actions, and interactive focus rings.
3. **Exact Figma Geometry & Radii**:
   - **Sharp `0px` Corners**: Applied strictly to cards, buttons, banners, inputs, and pills matching Figma.
   - **Checkbox**: `4px` radius.
   - **Avatars & Model Badges**: Concentric circular radii (`30px` for 20px badges in Node 673:3035, `42px` for 28px badges in Node 725:11346).

---

## 2. Signature Token Palette

| Token Variable | Hex / CSS Value | Role & Usage |
|---|---|---|
| `--color-brand` | `#FB6320` | Signature brand CTA button (Node 671:8317), subscription banner (Node 725:11270), active checkbox fill (Node 673:2299) |
| `--color-brand-hover` | `#E05215` | Interactive hover for brand buttons and links |
| `--color-brand-active` | `#C9440D` | Active / pressed state for brand elements |
| `--color-brand-light` | `#FFE3D7` | Light orange tint for banner subtext (Node 725:11285) |
| `--color-brand-subtle` | `#FFF4EE` | Subtle background tint for active filter rows & verified chip |
| `--color-surface-cream`| `#FFECD8` | Search input warm cream fill (Node 694:4030) |
| `--color-surface-peach`| `#FBE1C7` | Model logomark avatar circle background (Nodes 673:2956, 725:11351) |
| `rgba(255, 236, 217, 0.7)` | Peach Pill Fill | Warm peach background for template `EL-d7837055` ("sort-select") pills |
| `rgba(166, 166, 166, 0.5)` | Border / Divider | 1px stroke for container frames, pills, and dividers |
| `--shadow-brand` | `0px 4px 14px rgba(251, 99, 32, 0.28)` | Subtle brand orange elevation glow |
| `--shadow-focus` | `0 0 0 3px rgba(251, 99, 32, 0.22)` | Accessible keyboard focus ring |

---

## 3. Typography Hierarchy

- **Geist Pixel Square** (`--font-pixel`):
  - 28px (`--text-3xl`), line-height 1.1: Used for Skill title (Node 725:11241) and Pricing `$5` (Node 725:11265)
  - 16px (`--text-base`), line-height 1.45: Used for Subscription Callout title (Node 725:11284)
- **Geist Sans** (`--font-sans`):
  - 16px Regular (400), line-height 20px: Card title (Node 673:2906)
  - 16px Medium (500): Top Navigation links (Node 732:793)
  - 14px Medium (500): Buttons (`Get started`, `See all Skills`, `Buy now`)
  - 14px Regular (400), line-height 1.45em: Muted section labels (`This skill is often used by`, `Runs in`, `Install guides`, `Generates with`), Filter labels (`Web`, `Slides`, `Video`, `Image`), Description body
  - 14px Regular (400): Peach Pill text (`Product Manager`, `Claude Code`, `Cursor`, `Host Agent LLM`)
  - 12px Regular (400): Counter badges (`387`, `47`), Version pill (`v1.0.1`), Updated date

---

## 4. Specifically Mapped & Updated Figma Nodes

### A. Node `673:3035` (`skill - grid`)
- **Component**: `SkillCard` (`src/components/features/SkillCard.tsx`)
- **Structure**:
  - Vertical column layout, gap `12px`, sharp `0px` border-radius.
  - Image container: height `200px`, object-fit `cover`, `0px` radius.
  - Footer row: `gap: 17.8px`, space-between alignment:
    - **Title**: Geist 16px Regular, `20px` line-height, `#000000`, `flex: 1`.
    - **Overlapping Logomarks Frame ("k")**: `gap: -5px`, flex-shrink `0`.
    - **4 Circular Badges**: `20x20px`, border-radius `30px`, background `#FBE1C7`, border `0.167px solid rgba(166, 166, 166, 0.5)`, box-shadow `0px 0.833px 1.667px rgba(16, 24, 40, 0.06)`. Inner images centered at 12.5x12.5px.
- **Interactive States**:
  - Card hover: `transform: translateY(-2px)`, preview image zoom `1.02`.
  - Title hover: color transitions smoothly to `#FB6320`.
  - Press: `transform: scale(0.96)`.

---

### B. Node `725:11328` ("This skill is often used by")
- **Component**: `SkillAudienceBox` (`src/components/features/SkillAudienceBox.tsx`)
- **Structure**:
  - Outer container: column layout, padding `16px`, gap `16px`, border `1px solid rgba(166, 166, 166, 0.5)`, sharp `0px` border-radius.
  - Section label: `"This skill is often used by"` (Geist Regular 14px, line-height 1.45em, color `#7F776E`).
  - Pills row: `gap: 12px`, flex-wrap row.
  - **3 Peach Pills** (Template `EL-d7837055`, "sort-select"):
    - Height: `28px`, padding `0 8px`, gap `8px`, border-radius `0px`.
    - Background: `rgba(255, 236, 217, 0.7)` (warm peach tint).
    - Border: `1px solid rgba(166, 166, 166, 0.5)`.
    - Font: Geist Regular 14px `#000000`.
    - Values: `"Product Manager"`, `"Graphic Designer"`, `"Art Director"`.
  - Horizontal Divider: `1px solid rgba(166, 166, 166, 0.5)`.
  - Footer text: `"Last updated Oct 3, 2026"` (Geist Regular 14px, line-height 1.45em, color `#7F776E`).
- **Interactive States**:
  - Pills hover: background `rgba(255, 226, 200, 0.95)`, border `#FB6320`, text `#FB6320`.
  - Selection: selectable with active state highlight.

---

### C. Node `725:11346` ("Runs in" + "Install guides" + "Generates with")
- **Component**: `SkillRuntimeSpecs` (`src/components/features/SkillRuntimeSpecs.tsx`)
- **Structure**:
  - Outer container: column layout, padding `16px`, gap `16px`, border `1px solid rgba(166, 166, 166, 0.5)`, sharp `0px` border-radius.
  - **Row 1 ("Runs in")**:
    - Label: `"Runs in"` (width `97px`, Geist Regular 14px, line-height 1.45em, color `#7F776E`).
    - Row gap: `48px`.
    - 6 Circular Runtime Avatars (Template `EL-02d969a5` & `EL-53eec184`):
      - Width `28px`, height `28px`, border-radius `42px` (circle).
      - Background: `#FBE1C7`.
      - Border: `0.233px solid rgba(166, 166, 166, 0.1)`.
      - Box-shadow: `0px 1.167px 2.333px rgba(16, 24, 40, 0.06)`.
      - Inner logos: 17.5x17.5px centered (`logo-1.png` through `logo-6.png`).
  - Horizontal Divider: `1px solid rgba(166, 166, 166, 0.5)`.
  - **Row 2 ("Install guides")**:
    - Label: `"Install guides"` (width `97px`, Geist Regular 14px, line-height 1.45em, color `#7F776E`).
    - Row gap: `48px`.
    - 2 Peach Pills: `"Claude Code"`, `"Cursor"` (height `28px`, sharp `0px` radius, `rgba(255, 236, 217, 0.7)` fill, `1px solid rgba(166, 166, 166, 0.5)` border).
  - **Row 3 ("Generates with")**:
    - Label: `"Generates with"` (width `97px`, Geist Regular 14px, line-height 1.45em, color `#7F776E`).
    - Row gap: `48px`.
    - 1 Peach Pill: `"Host Agent LLM"` (height `28px`, sharp `0px` radius, `rgba(255, 236, 217, 0.7)` fill, `1px solid rgba(166, 166, 166, 0.5)` border).
- **Interactive States**:
  - Circular avatar hover: `transform: translateY(-2px) scale(1.12)`.
  - Pills hover / click: cursor pointer, active border/fill toggle.

---

### D. Reusable Primitive: `Pill` (Template `EL-d7837055`, "sort-select")
- **Component**: `Pill` (`src/components/ui/Pill.tsx`)
- Standard 28px height, sharp `0px` radius, `rgba(255, 236, 217, 0.7)` peach background, `1px solid rgba(166, 166, 166, 0.5)` border, Geist 14px regular font.
- Interactive hover and selected state support across all audience and environment containers.

---

### E. Reusable Primitive: BookmarkButton (Nodes 751:5617 & 673:3035)
- **Component**: `BookmarkButton` (`src/components/ui/BookmarkButton.tsx`)
- **Design Rule**: **Strictly fully rounded circular button (`border-radius: var(--radius-full, 50%)`) across all instantiations.**
- **Variants & Sizes**:
  - `size="md"` (`28x28px` circular): Used in `SkillDetailHeader` (Node `751:5617`, `#FFECD8` cream surface).
  - `size="sm"` (`26x26px` circular): Used in `SkillCard` (Node `673:3035`, `#FFFFFF` white surface).
  - Active Bookmarked state: Solid `#FB6320` brand orange with pure white `#FFFFFF` icon.
  - Press feedback: `scale(0.96)`.

---

## 5. Master Canvas Nodes Summary

| Figma Node | Component | File Location | Specifications |
|---|---|---|---|
| `732:793` | `NavBar` | `src/components/features/NavBar.tsx` | Geist 16px/20px, `#464646`, 24px gap, interactive Categories dropdown popover |
| `694:4027` | `SearchInput` | `src/components/ui/SearchInput.tsx` | 40px height, `#FFECD8` cream background, `search-normal.svg` icon, clear button, `⌘K` badge |
| `673:15` | `Button` (`primary`) | `src/components/ui/Button.tsx` | 40px height, `#000000` fill, Geist 14px Medium, `Shadow/xs`, hover `#222224`, press `scale(0.96)` |
| `671:8317` | `Button` (`brand`) | `src/components/ui/Button.tsx` | 48px height, `#FB6320` vibrant brand orange fill, Geist 14px Medium, press `scale(0.96)` |
| `673:2316` | `FilterSection` | `src/components/features/FilterSection.tsx` | Geist Medium 14px header ("By output"), collapsible rotating chevron, 8px vertical gap |
| `673:2327` | `FilterItem` | `src/components/features/FilterItem.tsx` | Checkbox + 16px SVG icon + label ("Slides") + counter badge ("47"), row hover |
| `673:793` | `FilterSidebar` | `src/components/features/FilterSidebar.tsx` | 240px sidebar, Recommendations, By output, By role, By use case, live active count badge |
| `673:3035` | `SkillCard` | `src/components/features/SkillCard.tsx` | 200px cover image, Geist 16px title, overlapping circular model badges (`-5px` gap, 20x20, #FBE1C7) |
| `725:11328`| `SkillAudienceBox` | `src/components/features/SkillAudienceBox.tsx` | "This skill is often used by", 3 warm peach pills (28px height, 0px radius), divider, date |
| `725:11346`| `SkillRuntimeSpecs`| `src/components/features/SkillRuntimeSpecs.tsx` | "Runs in" (6x 28px avatars), divider, "Install guides" (2 pills), "Generates with" (1 pill) |
| `725:11237`| `SkillDetailHeader`| `src/components/features/SkillDetailHeader.tsx` | Master header integrating title, pricing, orange subscription banner, and nodes 725:11328 & 725:11346 |

---

## 6. Live Interactive Workbench
Access `/design-system` directly in the browser to test every component, variant, and interactive state live.

---

## 7. Responsive Design Architecture & Viewport Standards

Skillhouse enforces strict responsive behavior across three core device tiers with zero horizontal overflow:

### A. Breakpoint Tier Matrix

| Viewport Tier | Width Range | Layout Structure | Navigation & Filter Behavior | Detail Panel Behavior |
|---|---|---|---|---|
| **Desktop Wide** | `> 1200px` | 3-Column: Sidebar (240px) + Fluid Grid (minmax 280px) + Detail Panel (440px) | Full top navigation links, search input, design system badge, primary CTA | Persistent right-hand inspector column (`SkillDetailHeader`) |
| **Tablet** | `768px – 1199px` | 2-Column: Sidebar (240px) + 2-Column Grid | Top navigation shows Search, badge, and hamburger toggle button | Right column hides; clicking a card opens slide-over drawer overlay (`.detailDrawerOverlay`) |
| **Mobile** | `320px – 767px` | 1-Column: Fluid stacked sections, 1-column cards | Header collapses into square hamburger toggle `[ ☰ ]` opening slide-down mobile drawer with search & links | Mobile filter bar toggles inline filter accordion (`.mobileFilterBar`); tapping card opens full slide-over drawer with `✕ Close` |

### B. Component-Level Responsive Adaptations

1. **Top Navigation (`NavBar`)**:
   - `< 992px`: Collapses horizontal nav links into animated mobile drawer with full search, page routes, and full-width "Get started" button.
   - `< 640px`: Hides desktop CTA and inline search; displays only the brand wordmark and accessible `40x40px` hamburger menu button.
2. **Hero Section (`heroBar`)**:
   - `< 900px`: Switches from row distribution to column stacking (`align-items: flex-start`).
   - `< 480px`: Action buttons ("See all Skills" & "Submit a Skill") expand to full-width stacked buttons with 12px gap.
3. **Skill Card (`SkillCard` - Node `673:3035`)**:
   - Card width is fluid (`100%`).
   - Card title incorporates `overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0` ensuring titles never displace the 4 overlapping logomarks frame.
   - At `< 360px`, cover image height adjusts from 200px to 180px for compact viewport harmony.
4. **Runtime Specs (`SkillRuntimeSpecs` - Node `725:11346`)**:
   - Desktop uses `gap: 48px` between category label and spec items.
   - `< 560px`: Category labels flex-wrap with model avatars and peach pills to eliminate horizontal clipping.
   - `< 440px`: Spec rows shift to vertical column layout (`flex-direction: column; gap: 8px`), providing ample room for 6 circular model badges.
5. **Audience Box (`SkillAudienceBox` - Node `725:11328`)**:
   - Pills row wraps fluidly (`flex-wrap: wrap`) with 12px gap.
   - Container padding adjusts from 16px to 12px on narrow mobile screens.
6. **Detail Header (`SkillDetailHeader` - Node `725:11237`)**:
   - `< 440px`: "Copy install prompt" and "Download ZIP" action buttons stack vertically.
   - Pricing row maintains flexible space-between distribution across all screen sizes.

### C. Overflow Protection & Best Practices
- **Next.js 16 Viewport Specification**: Configured in `layout.tsx` via `export const viewport: Viewport = { width: "device-width", initialScale: 1 }`.
- **CSS Flexbox Min-Width Defense**: All flex containers and children declare `min-width: 0; max-width: 100%; word-break: break-word` to neutralize standard flex blowout bugs.
- **Root Overflow Lock**: `html, body` styles enforce `max-width: 100vw; overflow-x: hidden;`.

## 8. Header Nav Options, Login Modal & Overlay (Figma Updates)

### A. Header Nav Options (Node `744:1024` — File `cenkXrTeBinliSZvWjPDZX`)
- **Container**:
  - Background: `#FFEEDD` (warm cream tint).
  - Border Bottom: `1px solid rgba(231, 231, 231, 0.5)`.
  - Max Width: `1440px`, padding: `16px 40px` (desktop), `16px 24px` (tablet), `12px 16px` (mobile).
  - Height: `72px` sticky header with `backdrop-filter: blur(8px)`.
- **Brand Logo (Node `744:1064`)**:
  - Wordmark badge: 38x40px `#000000` block with `Skill house` in `Geist Pixel Square` 9.87px (`#F8F8F8`).
  - Brand dot: 8x8px `#FB6320` circle.
- **Search Box (Node `744:1090`)**:
  - Background: `#FFECD8` surface.
  - Border: `1px solid rgba(166, 166, 166, 0.5)`.
  - Box Shadow: `0px 1px 2px 0px rgba(16, 24, 40, 0.05)`.
- **Variants**:
  - **Variant 1 (`Property 1=default`)**:
    - Black "Get started" button (`#000000`, 14px Geist Medium, 40px height, padding 12px 24px, `Shadow/xs`).
    - Opens Login Modal on click.
  - **Variant 2 (`Property 1=signed in`)**:
    - 40x40 circular profile avatar (`/figma/header_avatar.png`, border-radius 222px) with white border.
    - 17.78px arrow-down chevron (`#744:1104`).
    - Toggles interactive user profile dropdown menu with "Sign out" action.

### B. Login Modal (Node `4621:371148` — File `fAcwCvHAG6hUgW6PB8gDSr`)
- **Surface**:
  - Width: `450px` (responsive `calc(100vw - 32px)` on mobile).
  - Background: `#FFEEDD`.
  - Border: `1px solid rgba(166, 166, 166, 0.5)`.
  - Box Shadow: `0px 0px 0px 1px rgba(16, 25, 40, 0.05), 0px 0px 3px -1px rgba(16, 25, 40, 0.04), 0px 16px 24px -6px rgba(16, 25, 40, 0.08)`.
- **Header**:
  - Title: `"Welcome to Skillhouse"` in `Geist Pixel Square` 24px, 400 weight, line-height 1.2em, letter-spacing -0.02em, color `#000000`, center-aligned.
  - Accessible top-right close button (`X`).
- **Description**:
  - Text: `"Skillhouse designs original Agent Skills for Claude Code, Codex and Cursor. Install reusable SKILL.md workflows for slides, web pages, images and video."`
  - Font: Geist Regular 14px, color `#7F776E`, centered, max-width 332px.
- **OAuth Buttons**:
  - Height: `48px`, border `1px solid #000000`, transparent background, `Shadow/xs`.
  - Press scale: `scale(0.96)`.
  - "Continue with Google" (`/figma/google_icon.png` 18x18px).
  - "Continue with Github" (`/figma/github_icon.png` 18x18px).

### C. Modal Overlay (Node `4597:367764` — File `fAcwCvHAG6hUgW6PB8gDSr`)
- **Backdrop**:
  - Background: `rgba(66, 65, 69, 0.54)`.
  - Effect: `backdrop-filter: blur(8px)`.
  - Behavior: Closes modal on backdrop click, closes on `Escape` key, locks `body` scroll while open.

### D. Checkbox & Filter Item (Node `673:2298` — File `cenkXrTeBinliSZvWjPDZX`)
- **Checkbox Primitive**:
  - Size: 24x24px (`size="md"`), 4px border radius.
  - Selected state: `#FB6320` background and border with exact white checkmark vector (`checkbox_item.svg`).
  - Unselected state: `1.5px solid #CFD9E8` border, transparent background.
- **Filter Row**:
  - Layout: `padding: 6px 0px`, `gap: 8px`, `align-items: center`.
  - Label: 14px Geist Regular `#1C1C1E`.
  - Count: 12px Geist Regular `#9B9B9B` aligned right via flex space-between.


## 9. Spacing Design System & Composite Skill Detail Action Panel Specs

### A. Empirical Spacing Scale System (Concatenated from all Figma Nodes)
The spacing design system is derived directly from empirical measurements concatenated across all inspected Figma nodes in files `cenkXrTeBinliSZvWjPDZX` (`meyaj2`) and `fAcwCvHAG6hUgW6PB8gDSr` (`IsangAI`). It establishes a strict 4pt/8pt sub-grid system eliminating ad-hoc magic numbers.

| CSS Variable | Value | Scale Multiplier | Primary Figma Usages & Observed Nodes |
|---|---|---|---|
| `--space-3xs` | `4px` | 0.5x (Micro) | Model avatars overlap in specs (Node `752:11312`), chevron/category icon gap in nav (Node `744:1080`), subscription banner title-subtitle stack (Node `752:11150`) |
| `--space-2xs` | `6px` | 0.75x (Tight) | Stat item icon-to-label gap (Node `752:11256`), info-circle link gap (Node `752:11287`), checkbox filter row vertical padding (Node `673:2298`) |
| `--space-xs` | `8px` | 1x (Base Grid) | Circular button padding (Node `752:11251`), pill tag inner padding (Node `752:11295`), audience label gap (Node `752:11292`), checkbox row gap (Node `673:2298`) |
| `--space-sm` | `10px` | 1.25x | Primary action buttons row gap (Nodes `752:11275` & `752:11154`), circular bookmark/share button group gap (Node `752:11250`) |
| `--space-md` | `12px` | 1.5x | Audience pills row gap (Node `752:11294`), runtime install guide pills gap (Node `752:11346`), button vertical padding (Template `EL-18198c27`) |
| `--space-lg` | `16px` | 2x | Audience box padding & gap (Node `752:11291`), runtime specs box padding & gap (Node `752:11309`), orange banner padding & gap (Node `752:11137`), meta stats row gap (Node `752:11255`), description block gap (Node `752:11285`), header vertical padding (Node `744:1063`) |
| `--space-xl` | `24px` | 3x | Composite action panel root section gap (Nodes `752:11245` & `752:11109`), primary button horizontal padding (Template `EL-18198c27`), nav links gap (Node `744:1077`), mega menu dropdown padding (Node `750:3470`), login modal padding (Node `4621:371149`) |
| `--space-2xl` | `32px` | 4x | Major layout section gap, header content gap (Node `744:1063`), modal inner spacing |
| `--space-3xl` | `40px` | 5x | Header desktop horizontal edge padding (Node `744:1063`) |
| `--space-4xl` | `48px` | 6x | Wide runtime specs row gap between fixed category label column and logomarks (Template `EL-9aeb4880`, Node `752:11310`) |

### B. Structural Component Dimensions
| CSS Variable | Value | Component & Node Rationale |
|---|---|---|
| `--dim-panel-width` | `437px` | Fixed width of Composite Skill Detail Action Panel (Nodes `752:11245` & `752:11109`) |
| `--dim-btn-action` | `48px` | Primary action button height ('Copy install prompt' & 'Download ZIP') (Template `layout_18198c27`) |
| `--dim-spec-label` | `97px` | Fixed column width for 'Runs in', 'Install guides', 'Generates with' labels (Template `layout_630da271`) |
| `--dim-btn-round` | `28px` | Circular bookmark and share button outer diameter (Template `EL-e8dd6c0d`) |
| `--dim-pill-height` | `28px` | Fixed height for peach audience and runtime guide pills (Template `EL-d7837055`) |
| `--dim-avatar-spec` | `28px` | Circular model logomark avatar in runs-in specs (Template `EL-53eec184`) |
| `--dim-icon-md` | `16px` | Primary action button icons (copy/import) (Node `752:11278`) & banner chevron (Node `752:11153`) |
| `--dim-icon-sm` | `14px` | Stat strip icons (Node `752:11257`) and circular action button icons (Node `752:11252`) |
| `--dim-icon-xs` | `12px` | Info-circle license helper icon (Node `752:11288`) |

### C. Component 219 — Composite Skill Detail Action Panel Specs (Nodes `752:11245` & `752:11109`)
- **Panel Container**:
  - Max Width: `437px` (`--dim-panel-width`).
  - Layout: Flex column, root gap `24px` (`--space-xl`).
- **1. Top Action Block (Nodes `752:11246` / `752:11110`)**:
  - Gap: `16px` (`--space-lg`).
  - **Row A: Title & Round Actions**:
    - Title: `Geist Pixel Square` 28px, `line-height: 1em`, `color: #000000`.
    - Round buttons: 28x28px (`--dim-btn-round`), background `#FFECD8`, border `1px solid rgba(166, 166, 166, 0.5)`, radius `360px`, gap `10px` (`--space-sm`). Active bookmark fill: `#FB6320`.
  - **Row B: Meta Stats Row (Node `752:11255` / `752:11119`)**:
    - Gap: `16px` (`--space-lg`), items gap `6px` (`--space-2xs`).
    - Stat 1: 295 installs (download icon `14x14px`).
    - Stat 2: 295 saves (bookmark icon `14x14px`).
    - Stat 3: Version tag `v1.0.1` (tag icon `11x14px`).
    - Stat 4: Security `Secure` (shield check icon `14x14px`).
  - **Row C: Monetization Variants**:
    - **Free State (`Property 1=free`, Node `752:11245`)**:
      - Price text: `Free` in `Geist Pixel Square` 20px (`--text-xl`), line-height `1em`, color `#000000`.
      - Omission: Does **not** render the orange subscription banner. Zero barrier to installation.
    - **Premium State (`Property 1=premium`, Node `752:11109`)**:
      - Banner background: `#FB6320` (`--color-brand`).
      - Padding: `16px` (`--space-lg`), gap `16px` (`--space-lg`).
      - Title: `Geist Pixel Square` 16px, color `#FFFFFF` ("Subsribe - All Skills, one subscription").
      - Subtext: `Geist Sans` 13px, color `#FFE3D7` ("No exclusions. Access all curated, verified and continuously updated skills").
      - Chevron: `16x16px` right arrow icon.
      - Omission: Does **not** render the standalone "Free" price text.
  - **Row D: Primary Action Buttons (Nodes `752:11275` / `752:11154`)**:
    - Gap: `10px` (`--space-sm`).
    - Height: `48px` (`--dim-btn-action`), padding: `12px 24px` (`--space-md` `--space-xl`).
    - Left: "Copy install prompt" (border `1px solid #FB6320`, text color `#FB6320`, copy icon `16x16px`). Interactive copied state feedback: "Prompt Copied!".
    - Right: "Download ZIP" (border `1px solid #000000`, text color `#000000`, download icon `16x16px`). Interactive trigger: toast archive confirmation.
- **Divider Line**:
  - `1px solid rgba(166, 166, 166, 0.5)` (`--color-border`), margin `0`.
- **2. Description Block (Nodes `752:11285` / `752:11164`)**:
  - Gap: `16px` (`--space-lg`).
  - Text: `14px` Geist Sans, line-height `1.45em`, color `#7F776E`.
  - Info link: Underlined helper "What do I get when I buy this Skill?" with `12x12px` info-circle icon (`--dim-icon-xs`), gap `6px` (`--space-2xs`). Toggles package contents breakdown.
- **3. Skill Audience Box (Nodes `752:11291` / `752:11170`)**:
  - Padding: `16px` (`--space-lg`), gap: `16px` (`--space-lg`).
  - Label: "This skill is often used by" (`14px` Geist Sans `#7F776E`).
  - Roles: Interactive `28px` peach pills (gap `12px` `--space-md`).
  - Subtext: "Last updated Oct 3, 2026".
- **4. Runtime & Guide Specs (Nodes `752:11309` / `752:11188`)**:
  - Padding: `16px` (`--space-lg`), gap: `16px` (`--space-lg`).
  - Rows: Gap `48px` (`--space-4xl`) between fixed 97px label and logomarks.
  - Logomark avatars: `28x28px` (`--dim-avatar-spec`), gap `4px` (`--space-3xs`), hover zoom effect.
  - Guide pills: Gap `12px` (`--space-md`).

### E. Subscription Banner Component (Figma Node 751:5654 "add journey")
- **Component Identifier**: `SubscriptionBanner` (Node `751:5654`, file `cenkXrTeBinliSZvWjPDZX`)
- **Container Geography**:
  - Background: Solid `#FB6320` (`--color-brand`).
  - Padding: `16px` on all sides (`--space-lg`).
  - Border: None, Border-radius: `0px` (`--radius-none`).
  - Layout: `display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 16px;`.
  - Micro-interactions: `scale(0.96)` on press, `-1px translateY` on hover with `--shadow-brand`, `+4px translateX` on right arrow.
- **Left Text Container**:
  - Layout: Flex column, gap `4px` (`--space-3xs`), flex `1`.
  - Title: `Geist Pixel Square` 16px, line-height `1.45em`, color `#FFFFFF`, copy: `"Subsribe - All Skills, one subscription"`.
  - Subtitle: `Geist Sans` 13px, line-height `1.45em`, color `#FFE3D7`, copy: `"No exclusions. Access all curated, verified and continuously updated skills"`.
- **Right Arrow**:
  - Component: `Line arrow-right` (component `725:846`), dimension `16x16px`, color `#FFFFFF`, centered vertically.
- **Responsive Adaptations**:
  - Desktop (`> 480px`): Exact Figma Node `751:5654` horizontal row layout (`textContainer` flex: 1, centered `Line arrow-right` 16x16px on right).
  - Mobile (`<= 480px`): Responsive column layout (`flex-direction: column; align-items: flex-start; gap: 12px; padding: clamp(12px, 3.5vw, 16px)`), placing the arrow cleanly below the subtitle text with 100% text width.
  - Micro-Mobile (`<= 360px`): Fluid typography scaling (title 15px, subtitle 12px) preventing awkward sentence fragmentation.

### D. Responsive Layout Divider Junctions & Action Button Fixes (Figma File IsangAI Node 4577-221479)
1. **Vertical Column Divider Lines Touch Horizontal Hero Divider (0px Junction Gap)**:
   - Previously, `.layoutContainer` had `padding: 16px 40px`, which caused an artificial 16px vertical gap between the top horizontal divider (`.heroBar`'s `border-bottom`) and the column divider lines.
   - Refined `.layoutContainer` to `padding: 0 40px 48px 40px` so its top boundary is flush (Y = 0) against the horizontal divider line.
   - Added `padding-top: 24px` to both `.feedSection` and `.detailSection`, matching `.sidebar`'s `padding: 24px 20px 48px 0`.
   - Result: Left divider (`border-right` on sidebar) and right divider (`border-left` on detail section) touch the top horizontal divider with **0px gap**, while all three column headers ("Filters", "Trending Skills", "Web Development Pro") align at exactly Y = 24px.

2. **Copy Install Prompt Responsive Sentence Wrap Prevention**:
   - Added `white-space: nowrap` to `.copyPromptBtn`, `.copyPromptBtn span`, and `.downloadZipBtn`.
   - Adjusted padding from static `12px 24px` to responsive `12px clamp(10px, 1.8vw, 16px)`.
   - Rebalanced flex ratios to `flex: 1.15` (copy button) and `flex: 0.85` (download ZIP button) with `min-width: 0`.
   - Added mobile fallback `@media (max-width: 380px)` stacking to column layout, preventing text breaking across all responsive viewports.

## 7. Global Footer System (Figma Master Component Node `751:7780` & Instance Node `751:4917`)

### A. Component Specifications & Spatial Geography
- **Master Component**: Node `751:7780` (`footer`, File `cenkXrTeBinliSZvWjPDZX`)
- **Canvas Instance**: Node `751:4917` (Dimensions: `1440px × 750px`)
- **Background Color**: `#000000` (Pure solid dark neutral)
- **Background Texture Layer**: Node `751:7781` (`Gradient Lines`, `1440px × 880px`, exported as authentic 2x asset `/figma/footer-gradient-lines.png`)
- **Watermark Wordmark**: Node `751:7795`
  - Text: `"Skillhouse"`
  - Font: `IBM Plex Sans Thai Looped`, `Medium` (`fontWeight: 500`)
  - Size: `300px` (Desktop) / `clamp(100px, 20.8vw, 300px)` (Responsive)
  - Color: `#FFFFFF` at `20%` opacity (`rgba(255, 255, 255, 0.20)`)
  - Positioning: Flush along bottom boundary (`bottom: -45px`, centered horizontally)
  - Interactivity: `pointer-events: none; user-select: none;`

### B. Left Column: Branding, Tagline, Authentic Socials, Copyright (Node `751:7797`)
- **Width**: `388px` on desktop, `gap: 50px`
- **Logo Badge (Node `751:7798`)**:
  - Size: `99.5px × 106px`
  - Asset: Authentic `/figma/footer-logo-badge.svg` (house silhouette, white fill, black eyes, pixel "Skill" "house")
- **Tagline (Node `751:7811`)**:
  - Text: `"Turn everyday tasks into simple,
repeatable workflows with skills
built for your agent."`
  - Typography: `15px` Geist Sans, line-height `1.4em`, letter-spacing `-0.01em`, color `#FFFFFF`
- **Social Media Links (Node `751:7812`)**:
  - Row gap: `16px`, size `18px × 18px`
  - **X (formerly Twitter)** (Node `751:7813`): Vector `/figma/footer-social-1.svg`
  - **LinkedIn** (Node `751:7816`): Vector `/figma/footer-social-2.svg`
- **Copyright (Node `751:7821`)**:
  - Text: `"© 2026 Skillhouse. All rights reserved"`
  - Typography: `15px` Geist Sans, color `#FFFFFF`

### C. Right Column: 5 Nav Groups (Node `751:7822`)
- **Layout**: Auto Layout row, `gap: 40px`, right-aligned
- **Column Header Title**: `Geist Pixel Square` 16px, line-height `1.4em`, color `#FB6320` (`--color-brand`)
- **Links Typography**: `15px` Geist Sans, line-height `1.4em`, color `#FFFFFF`, gap `20px` between items
- **5 Column Breakdown**:
  1. **Explore**: Skills, Pricing
  2. **Categories**: Web design, Product launch, Brand identity, Client reporting, Social media, Research communication
  3. **By output**: Images, Video, Presentations, Web & HTML
  4. **By agent**: Claude Code Skills, Codex Skills, Cursor Skills, Gemini CLI Skills, OpenCode Skills, Antigravity Skills
  5. **Skillhouse**: Privacy Policy, Terms of Service, Cookie Policy, Third-Party Notices, Help & Support

