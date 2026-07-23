# Current Feature

<!-- Feature name and short description -->

## Status

Completed

## Goals

<!-- Goals and requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-07-23: **Dashboard UI Phase 1** — Completed. Initialized shadcn/ui (Nova preset, @base-ui/react, lucide icons) with Button + Input components; added `/dashboard` route with layout and top bar (DevStash logo, display-only search with ⌘K hint, New Collection + New Item buttons); dark mode by default; Sidebar and Main placeholders. Fixed the `--font-sans` self-reference in globals.css so Geist applies (and wired `--font-mono`). Build passes, lint clean. See @context/features/dashboard-phase-1-spec.md.
- 2026-07-23: **Dashboard UI Phase 2** — Completed. Added the collapsible dashboard sidebar via the shadcn sidebar block (relocated the generated files into `src/` and fixed their aliases in components.json). Built `AppSidebar` with a Types nav (color-tinted lucide icons, counts, links to `/items/[type]`), Favorites + Recent collection groups, and a user-avatar footer with a settings link. Collapses to an icon rail on desktop and a drawer on mobile via a top-bar `SidebarTrigger`; moved the DevStash logo into the sidebar header and added `TooltipProvider` at the root. Rewrote the generated `use-mobile` hook to satisfy the repo's `set-state-in-effect` lint rule. Data imported directly from mock-data. Build passes, lint clean. See @context/features/dashboard-phase-2-spec.md.
- 2026-07-23: **Dashboard UI Phase 3** — Completed. Built out the dashboard main content area: a `dashboard-data` helper derives stats/lists from mock-data (with a `getItemType` lookup); `StatsCards` shows 4 stat tiles (items, collections, favorite items, favorite collections); `SectionHeader` provides titles with optional icon and "View all" link; `CollectionCard` renders accent-bordered collection cards with type-icon rows; `ItemCard` renders type-bordered item cards with pin/favorite markers, tags, and dates, used for both the Pinned and 10-Recent-Items sections. Added a `DynamicIcon` component to `icon-map` (renamed to `.tsx`) that resolves lucide icons via `createElement` to satisfy the React Compiler's `static-components` rule. Build passes, lint clean; not yet visually verified in the browser. See @context/features/dashboard-phase-3-spec.md.
