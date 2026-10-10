# Skillhouse UI & Architecture Context

## Design System
- **Colors**: Primary brand color is Orange (`#FB6320`), accessible green for verified badges (`#03A400`), strict black (`#000000`) for dark backgrounds, off-white (`#F8F8F8`) for text on dark backgrounds.
- **Typography**: Uses Geist Sans (body), Geist Mono (code), and Geist Pixel (brand elements/headers).
- **Layout Constraints**: Max-width of 1600px globally. Horizontal paddings for all major wrapper inner containers (NavBar, Hero, Main, Footer) is strictly 40px on Desktop. `box-sizing: border-box` is mandatory to ensure perfect vertical flush alignment on large viewports.
- **Micro-interactions**: Use `lucide-react` for icons.

## Frameworks
- Next.js 16.4.0 (App Router), Turbopack enabled.
- React 19.
- CSS Modules for strict component scoping and vanilla CSS logic. Avoid Tailwind.

## Best Practices
- **"use client"**: Explicitly define `"use client"` at the top of any component file containing event listeners (e.g., `onClick`), state (`useState`), or refs.
- **Performance**: Favor Server Components where interactivity is not required.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
