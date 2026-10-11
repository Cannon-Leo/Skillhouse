# Skillhouse — AI Agent Skills Marketplace

Skillhouse is a modern, curated, verified AI agent skills marketplace built with **Next.js 16 (App Router)**, **React 19**, **Turbopack**, and **Vanilla CSS Modules** driven by a strict design system.

---

## 🚀 Quickstart & Onboarding

### 1. Prerequisites
- **Node.js**: >= 20.x
- **npm**: >= 10.x

### 2. Installation & Setup
```bash
# Clone the repository
git clone <repo-url>
cd Skillhouse/frontend

# Install dependencies (automatically installs Husky hooks)
npm install

# Start local development server (with Turbopack)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Marketplace.  
Open [http://localhost:3000/design-system](http://localhost:3000/design-system) to view the live Interactive Design System Showcase.

### 3. Core Commands
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js 16 dev server with Turbopack on port 3000 |
| `npm run build` | Compiles production bundle |
| `npm run start` | Starts production server |
| `npm run lint` | Runs ESLint 9 checks |
| `npm run typecheck` | Runs TypeScript compiler validation (`tsc --noEmit`) |
| `npm run test` | Runs Vitest unit tests in watch mode |
| **`npm run gauntlet`** | **Mandatory Quality Gate**: Runs linting, typechecking, and Vitest with coverage |

---

## 📐 Project Architecture & Directory Layout

We follow a feature-first, layered architecture. Dependency flow is strictly **unidirectional**:  
`app/ (pages/routes)` ➔ `features/` ➔ `primitives/` & `ui/` ➔ `globals.css (tokens)`.

```text
frontend/
├── public/                     # Static assets & authentic vector SVGs (/figma/*)
├── src/
│   ├── app/                    # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   │   ├── design-system/      # Design System live showcase route (/design-system)
│   │   ├── globals.css         # Root CSS design tokens, typography, empirical spacing
│   │   └── page.module.css     # Marketplace page layout & responsive grid styles
│   ├── components/
│   │   ├── primitives/         # Universal building blocks (Button, Card, Input)
│   │   ├── ui/                 # Reusable UI elements (Checkbox, Pill, SearchInput, Overlay, FigmaIcon)
│   │   ├── features/           # Domain feature components (NavBar, SkillCard, FilterSidebar, etc.)
│   │   └── design-system/      # Design System Showcase sections 1–15
│   └── types/                  # Shared TypeScript definitions
├── DESIGN_SYSTEM.md            # Complete empirical design system specification
├── CLAUDE.md / AGENTS.md       # AI & Engineer contribution guidelines
```

### The Deletion Test
Every feature in `src/components/features/` owns its styles, types, and unit tests. If you delete any feature folder (e.g., `rm -rf src/components/features/ConnectAgentBanner*`), only import statements at the page composition layer (`app/`) should break. No circular or cross-feature imports are permitted.

---

## 🛡️ The 8 Mandatory Product & Engineering Rules

All team members and AI pair programmers **must strictly adhere** to these rules. No code may be merged without satisfying all 8 rules.

### Rule 1: Design System First — Reuse Before Build
Before writing any new JSX, markup, or CSS:
1. **Search First**: Inspect `DESIGN_SYSTEM.md` and `src/components/` to see if a component or token already exists.
2. **Build Ladder**:
   ```
   Design Tokens ➔ Primitives ➔ Reusable UI ➔ Composite Features ➔ Sections ➔ Screens ➔ Validation
   ```
3. **Never duplicate**: Never create custom one-off buttons, badges, pills, modals, inputs, or card containers. If an existing component lacks a small capability, **extend it with a prop or variant** while preserving backward compatibility.

### Rule 2: Strict Design Tokens (Zero Arbitrary Values)
* **Brand Primary**: `#FB6320` (`var(--color-brand)`), Hover: `#E05215`, Subtle Peach Fill: `#FBE1C7` (`var(--color-surface-peach)`), Surface Cream: `#FFECD8` (`var(--color-surface-cream)`).
* **Neutrals**: `#000000` (text & dark cards), `#FFFFFF` (card surfaces & light backgrounds), `#1A1A1A` (secondary dark), `#7F776E` (muted text), `#CFD9E8` / `rgba(166, 166, 166, 0.5)` (subtle borders).
* **Typography**:
  - **Display / Pixel Titles**: `Geist Pixel Square` (`var(--font-pixel)`) for hero headers, price tags, and brand badges.
  - **Interface / Body Text**: `Geist Sans` / `Inter` (`var(--font-sans)`) for UI elements, labels, buttons, descriptions.
  - **Code / Metrics**: `Geist Mono` (`var(--font-mono)`).
* **Geometry**:
  - **Sharp 0px Radius**: Enforced on buttons, cards, containers, inputs, and dialogs.
  - **4px Radius**: Checkboxes, dropdown menus, and popovers.
  - **Pill / Circular (360px)**: Category tags, badges, avatars, and bookmark round buttons.
* **Layout Max-Width**: `1600px` container max-width with `40px` horizontal desktop padding.

### Rule 3: Empirical Spacing Scale (4pt / 8pt Sub-Grid)
Never invent ad-hoc pixel values. All margins, paddings, and gaps derive from our empirical token scale:
| Token | Value | Multiplier | Typical Usage |
| :--- | :--- | :--- | :--- |
| `--space-3xs` | `4px` | 0.5x | Micro gaps, avatar overlaps, category icon margins |
| `--space-2xs` | `6px` | 0.75x | Stat item icon-to-label gaps, checkbox row vertical padding |
| `--space-xs` | `8px` | 1x | Base grid, button inner gaps, checkbox item gaps, pill inner padding |
| `--space-sm` | `10px` | 1.25x | Primary action buttons row gap, circular button group gap |
| `--space-md` | `12px` | 1.5x | Audience pills gap, runtime install guide gap, card inner gaps |
| `--space-lg` | `16px` | 2x | Audience box padding, runtime specs box padding, card padding |
| `--space-xl` | `24px` | 3x | Composite panel section gaps, primary button padding, modal padding |
| `--space-2xl` | `32px` | 4x | Major 3-column layout gutter gap, header content gaps |
| `--space-3xl` | `40px` | 5x | Desktop page horizontal padding |
| `--space-4xl` | `48px` | 6x | Wide runtime specs column gap, hero vertical padding |

### Rule 4: Responsive Sentence Integrity & No Broken Wraps
* **Single-Line Integrity**: All single-line action buttons (e.g., `Copy install prompt`, `Download ZIP`, `Connect Skillhouse`), pills, badges, meta stats (`295 installs`), and navigation links **MUST include `white-space: nowrap;`**.
* **Fluid Padding**: Use `clamp(...)` for horizontal button padding (e.g., `padding: 12px clamp(10px, 1.8vw, 16px)`) to absorb responsive compression without breaking.
* **Stacking Breakpoints**: Narrow mobile containers (`<380px`) must wrap action button rows to column orientation (`flex-direction: column`) rather than squishing text into awkward vertical breaks.
* **Flush Border Junctions**: Column dividers (sidebar `border-right` and detail `border-left`) must align flush with the top horizontal divider with **0px gap**.

### Rule 5: UI Polish & Exact Micro-Interactions
* **Active Press Feedback**: Strictly `transform: scale(0.96)`. Never use `0.95` or arbitrary scale values.
* **Hover Micro-Animations**: Subtle and directional (e.g., `translateX(2px)` or `translateY(-2px)`) using `var(--transition-fast)` (150ms ease).
* **Focus States**: High-contrast, accessible `2px` focus outline (`var(--shadow-focus)`).
* **Icons**: Strictly enforce `lucide-react` for UI actions and authentic downloaded Figma SVGs for brand/model logomarks.

### Rule 6: The UI Completeness Gate (Ship All 4 States)
Every user-facing feature or screen must ship with all four states:
1. **Loading State**: Clean skeleton placeholder shapes matching component dimensions.
2. **Empty State**: Friendly illustration/copy with an immediate next-action button.
3. **Error State**: Non-blocking error banner or card with an actionable retry trigger.
4. **Success State**: Clear confirmation feedback (e.g., `Prompt Copied!`, modal success card).

### Rule 7: The Gauntlet Quality Gate (Zero Tolerance)
Constraints are enforced automatically on every commit via Husky:
```bash
npm run gauntlet
```
Passing the Gauntlet requires:
1. **Zero ESLint warnings or errors** (`eslint`).
2. **Zero TypeScript errors** (`tsc --noEmit`).
3. **100% test pass rate** across all Vitest suites.
4. **>= 90% code coverage threshold**.

### Rule 8: Git Hygiene & Security
* **Never Commit Secrets**: `.env*`, API tokens, private credentials, and test scripts with live keys are strictly blocked.
* **Never Commit Machine Noise**: `.DS_Store`, `coverage/`, `.next/`, `node_modules/`.
* **Descriptive Commits**: Use conventional commits (e.g., `feat:`, `fix:`, `refactor:`, `docs:`).

---

## 🧩 Component Library & Inventory Map

### 1. Primitives (`src/components/primitives/`)
| Component | Supported Variants / Props | Description |
| :--- | :--- | :--- |
| **`Button`** | `primary`, `secondary`, `outline`, `ghost`, `brand` / `sm`, `md`, `lg` | Base action button with `scale(0.96)` press feedback and loading spinner support. |
| **`Card`** | `default`, `interactive`, `bordered` | Strict 0px radius surface container with hover elevation and active state. |
| **`Input`** | `text`, `search`, `email` / `error`, `disabled` | Form field primitive with focus rings and accessible label association. |

### 2. UI Elements (`src/components/ui/`)
| Component | Description |
| :--- | :--- |
| **`Checkbox`** | Accessible 24×24px checkbox with exact 4px radius and `#FB6320` checked vector state (Figma 673:2298). |
| **`Pill`** | Interactive & static category tags with 360px concentric pill radius and peach highlight states. |
| **`SearchInput`** | Global marketplace search bar with keyboard shortcut badge (`⌘K`) and clear button. |
| **`Overlay`** | Fullscreen backdrop with `rgba(66, 65, 69, 0.54)` and `backdrop-filter: blur(8px)` (Figma 4597:367764). |
| **`FigmaIcon`** | Helper component for authentic vector icons downloaded directly from Figma nodes. |

### 3. Feature Components (`src/components/features/`)
| Component | Figma Nodes | Description |
| :--- | :--- | :--- |
| **`NavBar`** | 744:1024, 744:1063 | Desktop & mobile header with logo, search, mega-menu trigger, and profile avatar. |
| **`UserMenuPopover`** | 760:12903, 753:11852 | Attending & host user dropdown menus with Bookmarks, Profile, Settings, and Logout. |
| **`CategoriesDropdown`**| 750:3470 (Comp 215–217) | 3-mode mega menu dropdown (Use-case, Role, Output) with 2-column category items. |
| **`CategorySkillGrid`** | 725:11346 | Responsive multi-column category grid with CategorySkillCards. |
| **`SkillCard`** | 673:3035, 673:2892 | Marketplace skill card with category badge, preview image, bookmark button, and model icons. |
| **`AdCard`** | 673:3035, 673:2892 | Sponsored promotion card with dashed orange border and external link trigger. |
| **`FilterSidebar`** | 673:2298 | Collapsible multi-section filter sidebar with dynamic badge counts and reset button. |
| **`SkillDetailHeader`**| 752:11245, 752:11109 | Action panel with free/premium states, stats row, Copy Prompt button, and Download ZIP. |
| **`SkillAudienceBox`** | 752:11291, 725:11328 | Target persona block with interactive audience pills and update timestamp. |
| **`SkillRuntimeSpecs`** | 752:11309, 725:11346 | Technical runtime specifications block with avatar logomarks and install guide tags. |
| **`ConnectAgentBanner`**| 4640:6028, 759:12163 | Signature terminal banner with interactive prompt copy and Skillhouse agent integration. |
| **`LoginModal`** | 4621:371148 | Auth modal with Google and GitHub OAuth buttons, backdrop blur, and escape dismissal. |
| **`RequestSkillModal`**| Custom P0 Spec | Multi-field user skill request dialog with category selection and feedback confirmation. |
| **`Footer`** | 744:1024 | Global dark footer with background typography, category links, and social icons. |

---

## 🎨 Interactive Design System Showcase

We maintain a live interactive showcase route displaying all tokens, states, and components in isolation:
* **URL**: [http://localhost:3000/design-system](http://localhost:3000/design-system)
* **Sections**:
  1. *Color Palette Tokens*
  2. *Geist Typography Hierarchy*
  3. *Button Variants & Interactive Press States*
  4. *Input & Searchbox Fields*
  5. *Checkboxes & Filter Row Items (Node 673:2298)*
  6. *Interactive & Static Status Pills*
  7. *Category Mega Menu Dropdown (Node 750:3470)*
  8. *Header Navigation Bar (Desktop & Mobile, Node 744:1024)*
  9. *Fullscreen Backdrop Blur & Overlay (Node 4597:367764)*
  10. *Authentication Login Modal (Node 4621:371148)*
  11. *Filter Sidebar (Node 673:2298)*
  12. *Skill Cards & Sponsored Ad Cards (Node 673:3035)*
  13. *Empirical Spacing System (Concatenated 4pt/8pt Scale)*
  14. *Composite Skill Detail Action Panel & States (Nodes 752:11245 & 752:11109)*
  15. *User Profile Dropdown Menu & Interactive States (Node 760:12903)*

---

## 🧪 Testing & Quality Assurance

All tests are written with **Vitest** and **React Testing Library**.
```bash
# Run tests in watch mode
npm run test

# Run tests once with coverage
npm run test -- --run --coverage

# Run complete gauntlet
npm run gauntlet
```

**Assertion Principle**: Test what the user perceives. Assert on accessible names, roles, aria states, text content, and handler executions. Never assert on brittle CSS class name strings or internal component implementation details.
