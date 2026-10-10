# Skillhouse — Multi-Agent Engineering & Design System Rules

## Priority: Mandatory. Overrides default implementation behaviour.

Before creating, modifying, or implementing any UI, you MUST inspect the existing design system and reuse its established components, tokens, patterns, and conventions.

**Never create a new component, style, token, variant, or interaction pattern before verifying that an existing solution cannot meet the requirement.**

---

## 1. Inspect Before Implementing

Before writing UI code:
1. Review `DESIGN_SYSTEM.md` and `:root` tokens in `src/app/globals.css`.
2. Inspect available primitives in `src/components/primitives/` (`Button`, `Card`, `Input`) and UI elements in `src/components/ui/` (`Checkbox`, `Pill`, `SearchInput`, `FigmaIcon`, `Overlay`).
3. Inspect existing feature components in `src/components/features/` (`NavBar`, `Footer`, `CategoriesDropdown`, `ConnectAgentBanner`, `SkillCard`, `AdCard`, `FilterSidebar`, `FilterSection`, `FilterItem`, `SkillDetailHeader`, `SkillPlayground`, `SkillRuntimeSpecs`, `SkillAudienceBox`, `UserMenuPopover`, `LoginModal`, `RequestSkillModal`).
4. Follow component build order:
   `Design Tokens → Primitives → Reusable Components → Composite Components → Sections → Screens → Validation`

---

## 2. Reuse Is the Default

* Use existing components instead of building replacements.
* Compose existing components when a new layout is needed.
* Use existing design tokens instead of hardcoded values (`--color-brand: #FB6320`, `--font-pixel`, `--font-sans`, `--font-mono`).
* Icons: Strictly enforce `lucide-react` for all UI, action, navigation, and indicator icons across the entire codebase.
* Geometry: Strict `0px` radius on buttons, cards, containers, inputs; `4px` on checkboxes; concentric pill/circular on badges and avatars.
* Container max-width: 1600px with 40px horizontal padding on desktop (`box-sizing: border-box`).
* Do not bypass the design system with arbitrary CSS, inline styles, or rogue one-offs.

---

## 3. Extend Before Creating

If an existing component is close to the required solution:
* Assess whether extending existing props or variants is appropriate.
* Preserve backwards compatibility and existing usages.
* Do not modify a shared component in a way that breaks other screens.

---

## 4. Verification & The Gauntlet

Run before completing any task:
```bash
npm run gauntlet
```
All commits must satisfy `npm run gauntlet` (lint + typecheck + vitest tests with coverage).

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
