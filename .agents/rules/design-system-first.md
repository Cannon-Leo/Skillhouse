# SUPERIOR RULE: DESIGN SYSTEM FIRST

## Priority: Mandatory. Overrides default implementation behaviour.

Before creating, modifying, or implementing any UI, you MUST inspect the existing design system and reuse its established components, tokens, patterns, and conventions.

**Never create a new component, style, token, variant, or interaction pattern before verifying that an existing solution cannot meet the requirement.**

This rule takes precedence over convenience, speed, personal preference, and the agent's default coding patterns.

### 1. Inspect Before Implementing

Before writing UI code:

1. Identify the framework, styling approach, component library, design-system files, and relevant project instructions.
2. Inspect the available components, their variants, props, composition patterns, and usage examples.
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

### 3. Extend Before Creating

If an existing component is close to the required solution but lacks a capability:

1. Determine whether its existing props, variants, composition slots, or supported styles can satisfy the requirement.
2. If not, assess whether extending the existing component is appropriate.
3. Preserve backwards compatibility and existing usages.
4. Avoid adding a variant or prop that introduces unnecessary complexity or duplicates existing functionality.

Do not modify a shared component in a way that unintentionally changes unrelated screens.

### 4. New Components Require Evidence

You may create a new component only after verifying that:

* No existing component adequately satisfies the requirement.
* The requirement cannot reasonably be met by composing existing components.
* Extending an existing component would be less appropriate than introducing a separate component.
* The proposed component follows the project's architecture and design-system conventions.

When a new reusable component is necessary, make it part of the established system where appropriate. Reuse existing tokens, document its purpose, and avoid duplicating existing functionality.

For a one-off layout, prefer composing existing components over introducing a new shared abstraction.

### 5. Tokens Are the Source of Truth

Never invent design tokens or introduce arbitrary visual values without checking the existing system first.

Prefer, in order:

1. Existing semantic design tokens.
2. Existing component variants and documented values.
3. Existing project conventions for exceptional cases.
4. A new token or value only when the requirement cannot be met otherwise.

Do not introduce new colours, font sizes, spacing scales, border radii, shadows, or breakpoints simply to make a component look different.

### 6. When the Design System Is Unclear

If the relevant component, token, or usage pattern cannot be located:

* Search the repository and relevant documentation again.
* Inspect nearby implementations for established conventions.
* Do not claim that a component or token is missing without sufficient evidence.
* If access to the design system is unavailable, state that limitation instead of pretending to have inspected it.
* If a consequential design decision remains ambiguous, ask for clarification before creating a competing implementation.

### 7. Verification Before Completion

Before finishing any UI task, verify that:

* Existing components were reused wherever appropriate.
* No unnecessary duplicate components were introduced.
* Existing tokens were used instead of avoidable hardcoded values.
* Shared components were not unintentionally broken.
* The implementation follows existing responsive and accessibility conventions.
* Any new component or token has a clear, justified purpose.

### 8. Required Final Report

Briefly report:

* Which existing components and tokens were reused.
* Whether any components or tokens were added or modified.
* Why a new component was necessary, if one was created.
* Any design-system limitations that remain unresolved.

**Final enforcement rule:** Inspect first. Reuse by default. Compose before extending. Extend before creating. Verify before finishing. Never silently create a competing design system.
