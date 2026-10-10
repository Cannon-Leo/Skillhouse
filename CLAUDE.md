# Skillhouse — Agent & Engineering Guidelines

This repository hosts **Skillhouse**, an AI agent skill marketplace built with Next.js 16 (App Router), React 19, Turbopack, and Vanilla CSS Modules.

---

# SUPERIOR RULE: DESIGN SYSTEM FIRST

## Priority: Mandatory. Overrides default implementation behaviour.

Before creating, modifying, or implementing any UI, you MUST inspect the existing design system and reuse its established components, tokens, patterns, and conventions.

**Never create a new component, style, token, variant, or interaction pattern before verifying that an existing solution cannot meet the requirement.**

This rule takes precedence over convenience, speed, personal preference, and the agent's default coding patterns.

### 1. Inspect Before Implementing

Before writing UI code:
1. Review `DESIGN_SYSTEM.md` and `:root` tokens in `src/app/globals.css`.
2. Inspect the available primitives (`src/components/primitives/`) and UI components (`src/components/ui/`).
3. Search the codebase for components that already solve the requested problem or a sufficiently similar one.
4. Inspect existing design tokens for colour, typography, spacing, sizing, borders, radii, shadows, and other visual properties.
5. Check whether the required layout or interaction can be composed from existing components.

Do not assume a component is unavailable simply because you have not encountered it yet.

### 2. Reuse Is the Default

When a suitable component exists:
* Use it instead of building a replacement.
* Use its supported variants and props.
* Compose existing components when a new arrangement is needed.
* Use existing design tokens instead of hardcoded values.
* Follow established naming, accessibility, responsive behaviour, and interaction conventions.
* Preserve the component's intended behaviour unless the task explicitly requires a change.

Do not create duplicate buttons, inputs, dialogs, cards, navigation elements, typography styles, or other components that overlap with existing functionality.

Do not bypass the design system with arbitrary CSS, inline styles, raw HTML elements, or custom implementations when an established component or token is appropriate.

### 3. Component Hierarchy & Build Order

Always build and compose along this ladder:
```
Design Tokens → Primitives → Reusable Components → Composite Components → Sections → Screens → Validation
```

Ask *"what system generated this layout?"* — not *"how do I draw this screen?"*.

#### Codebase Component Map:
- **Design Tokens**: `DESIGN_SYSTEM.md`, `src/app/globals.css` (`--color-brand: #FB6320`, `--font-pixel`, `--font-sans`, `--font-mono`).
- **Primitives** (`src/components/primitives/`):
  - `Button`: Primary, secondary, outline, ghost, brand variants.
  - `Card`: Surface container with strict border & hover states.
  - `Input`: Accessible form input with focus rings and label association.
- **UI Components** (`src/components/ui/`):
  - `Checkbox`: Accessible styled checkbox with check state.
  - `Pill`: Category, filter, and tag indicators.
  - `SearchInput`: Search bar with keyboard shortcut pill and clear button.
  - `FigmaIcon`: Local SVG asset helper.
  - `Overlay`: Modal and popover backdrop.
- **Feature Components** (`src/components/features/`):
  - `NavBar`, `Footer`, `CategoriesDropdown`, `ConnectAgentBanner`, `SkillCard`, `AdCard`, `FilterSidebar`, `FilterSection`, `FilterItem`, `SkillDetailHeader`, `SkillPlayground`, `SkillRuntimeSpecs`, `SkillAudienceBox`, `UserMenuPopover`, `LoginModal`, `RequestSkillModal`.

### 4. Extend Before Creating

If an existing component is close to the required solution but lacks a capability:
1. Determine whether its existing props, variants, composition slots, or supported styles can satisfy the requirement.
2. If not, assess whether extending the existing component is appropriate.
3. Preserve backwards compatibility and existing usages.
4. Avoid adding a variant or prop that introduces unnecessary complexity or duplicates existing functionality.

### 5. New Components Require Evidence

You may create a new component only after verifying that:
* No existing component adequately satisfies the requirement.
* The requirement cannot reasonably be met by composing existing components.
* Extending an existing component would be less appropriate than introducing a separate component.
* The proposed component follows the project's architecture and design-system conventions.

For a one-off layout, prefer composing existing components over introducing a new shared abstraction.

### 6. Tokens Are the Source of Truth

Never invent design tokens or introduce arbitrary visual values without checking the existing system first.

- **Primary Brand Accent**: `#FB6320` (`--color-brand`)
- **Verified Accent**: `#03A400`
- **Surface Fill**: `#000000` (dark cards / footer), `#FFFFFF` (light cards)
- **Geometry**: Strict `0px` radius on buttons, cards, containers, inputs; `4px` on checkboxes; concentric pill/circular on badges and avatars.
- **Max Width**: 1600px globally with 40px horizontal padding on desktop.

### 7. Verification & The Gauntlet

Before finishing any task, run the automated gauntlet:
```bash
npm run gauntlet
```
This runs ESLint, TypeScript check (`tsc --noEmit`), and Vitest with coverage. All three must pass with zero errors.

### 8. Required Final Report

On completing any UI task, report:
1. **Reused components and tokens**.
2. **Components/tokens modified or extended**.
3. **Justification for any new component created**.
4. **Any design-system limitations that remain unresolved**.
