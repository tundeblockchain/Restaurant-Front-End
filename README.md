## Restaurant Admin (React + Vite + TypeScript)

Run locally:

```bash
npm install
npm run dev
```

Environment variables (create `.env.local`):

```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Restaurant Admin
```

Project structure:

- `src/ui` – All MUI-based UI primitives (Theme, Layout, Button, Table, Form, StatCard)
- `src/routes` – Router (React Router v6.28 `createBrowserRouter`)
- `src/screens` – Feature screens (use components from `src/ui`)
- `src/api` – Axios client and modules
- `src/hooks` – TanStack Query hooks that call `src/api`

Notes:
- Keep external UI libraries (MUI) inside `src/ui` only. Screens/components consume from `@ui/*`.
- `VITE_API_BASE_URL` configures Axios base URL.

