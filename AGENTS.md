# AGENTS.md

## Cursor Cloud specific instructions

This is a single-page React application built with Vite and TypeScript. There is no backend, database, or external service dependency.

### Services

| Service | Command | Port | Notes |
|---------|---------|------|-------|
| Vite dev server | `npm run dev` | 5173 | Only service; serves the React SPA with HMR |

### Key commands

- **Install deps:** `npm install`
- **Dev server:** `npm run dev` (or `npm run dev -- --host 0.0.0.0` for network access)
- **Type-check + build:** `npm run build`
- **Preview production build:** `npm run preview`

### Notes

- Node.js 18+ is required (Vite 8 + React 19).
- The project uses `package-lock.json` — always use `npm` (not yarn/pnpm).
- There is no linting or test framework configured in this repo. `tsc --noEmit` (run as part of `npm run build`) is the closest check available.
