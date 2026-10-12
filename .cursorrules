# Skillhouse — Universal AI Agent Engineering & Design System Rules

## CRITICAL PRIORITY: MANDATORY ZERO-HALLUCINATION ENFORCEMENT
You are an autonomous AI software engineer contributing to Skillhouse. You MUST strictly adhere to the established design system, architectural boundaries, and constraints. You have ZERO latitude to invent competing styles, rogue components, or arbitrary magic numbers.

---

### 🚨 ANTI-HALLUCINATION GUARDS (THINGS YOU MUST NEVER DO)
1. **NEVER invent hex colors or Tailwind classes**:
   - Skillhouse uses Vanilla CSS Modules driven by `:root` tokens in `src/app/globals.css`.
   - Never write `#ff5500`, `#333`, or ad-hoc colors. Use `var(--color-brand)`, `var(--color-surface-peach)`, `var(--color-surface-cream)`, etc.
2. **NEVER create duplicate primitives**:
   - Never write raw `<button className="...">` when `src/components/primitives/Button/Button.tsx` or `src/components/ui/Button.tsx` exists.
   - Never create duplicate Cards, Inputs, Checkboxes, or Pills.
3. **NEVER use rounded corners on cards/buttons**:
   - Containers, buttons, cards, dialogs, and inputs enforce a strict **0px border-radius** (`--radius-none`).
   - Only checkboxes (`4px`), popovers (`4px`), and pills/avatars (`360px` / `--radius-full`) have rounded geometry.
4. **NEVER omit `white-space: nowrap` on single-line action surfaces**:
   - All buttons, badges, pills, and stats MUST have `white-space: nowrap;` to prevent text splitting across lines on mobile/tablet viewports.
5. **NEVER invent ad-hoc margins or paddings**:
   - All spacing must strictly derive from the empirical 4pt/8pt sub-grid scale (`--space-3xs` to `--space-4xl` in `globals.css`).

---

### 🧱 COMPONENT BUILD LADDER
When implementing any feature, build and compose strictly in this order:
Tokens (globals.css) -> Primitives (src/components/primitives/) -> UI Components (src/components/ui/) -> Feature Components (src/components/features/) -> Pages (app/) -> Validation (npm run gauntlet)

#### Available Component Map:
- **Primitives**: `Button` (primary, secondary, outline, ghost, brand), `Card`, `Input`.
- **UI Elements**: `Checkbox` (24x24px, 4px radius), `Pill` (interactive/static), `SearchInput` (with ⌘K shortcut), `Overlay` (fullscreen backdrop blur), `FigmaIcon`.
- **Domain Features**: `NavBar`, `Footer`, `CategoriesDropdown`, `CategorySkillGrid`, `SkillCard`, `AdCard`, `FilterSidebar`, `SkillDetailHeader`, `SkillRuntimeSpecs`, `SkillAudienceBox`, `ConnectAgentBanner`, `LoginModal`, `RequestSkillModal`, `UserMenuPopover`.

---

### 📐 ARCHITECTURAL RULES
1. **Unidirectional Dependency Flow**:
   `app/ (pages)` -> `features/` -> `primitives/` & `ui/` -> `globals.css (tokens)`.
2. **Feature Isolation & The Deletion Test**:
   - Each feature in `src/components/features/` owns its markup, styles (`.module.css`), and tests (`.test.tsx`).
   - Deleting any feature directory must ONLY cause import errors at the page composition layer (`app/`). No cross-feature circular imports.
3. **Icons**:
   - Strictly use `lucide-react` for UI action, navigation, and state icons.
   - For brand/model logomarks, use the authentic SVGs in `public/figma/`.

---

### 🛡️ QUALITY GATE (THE GAUNTLET)
Before marking any task complete, you MUST execute:
```bash
npm run gauntlet
```
This automatically runs:
- `npm run lint` (ESLint 9)
- `npm run typecheck` (`tsc --noEmit`)
- `npm run test -- --run --coverage` (Vitest with >=90% line coverage)

Zero errors, zero warnings, and zero failing tests are tolerated.
