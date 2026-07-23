# Current Feature

**Dashboard UI Phase 2** — Build out the sidebar for the dashboard layout (phase 2 of 3). See @context/features/dashboard-phase-2-spec.md.

## Status

In Progress

## Goals

- Collapsible sidebar
- Items/types with links to `/items/TYPE` (e.g. `/items/snippets`)
- Favorite collections
- Most recent collections
- User avatar area at the bottom
- Drawer icon to open/close sidebar
- Always a drawer on mobile view

## Notes

- Use the screenshot at @context/screenshots/dashboard-ui-main.png for the target look.
- Import data directly from @src/lib/mock-data.ts for now (no database yet).
- References: @context/project-overview.md, @context/features/dashboard-phase-1-spec.md, @context/features/dashboard-phase-3-spec.md.

## History

<!-- Keep this updated. Earliest to latest -->

- 2026-07-23: **Dashboard UI Phase 1** — Completed. Initialized shadcn/ui (Nova preset, @base-ui/react, lucide icons) with Button + Input components; added `/dashboard` route with layout and top bar (DevStash logo, display-only search with ⌘K hint, New Collection + New Item buttons); dark mode by default; Sidebar and Main placeholders. Fixed the `--font-sans` self-reference in globals.css so Geist applies (and wired `--font-mono`). Build passes, lint clean. See @context/features/dashboard-phase-1-spec.md.
