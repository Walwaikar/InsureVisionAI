# InsureVisionAI — React frontend

Road-safety, accident-analysis, insurance and emergency-assistance prototype UI.
Converted from the single-file HTML design into a Vite + React application.
All data is demo data, labelled as such. Nothing is sent to a server.

## Tech stack
| Layer | Choice | Why |
|---|---|---|
| UI library | React 18 (function components + hooks) | Component model, state, effects |
| Build tool | Vite 5 + @vitejs/plugin-react | Fast dev server, small production bundle |
| Routing | React Router 6 (`HashRouter`) | Same `#/route` URLs as the HTML version; works on any static host |
| Styling | Plain CSS (`src/styles.css`) with CSS variables | White/Black themes via `data-theme`, 3D carousel, keyframe animation. No UI framework |
| State | React state + Context (Toast, Auth) | App is small; no Redux needed |
| Fonts | Sora + DM Sans (Google Fonts) | |
| Language | JavaScript (JSX) | TypeScript can be added later |

Planned backend: the FastAPI service in the project brief (`/api/v1`, CORS for `http://localhost:5173`).

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview
```
Requires Node 18+.

## Structure
```
src/
  main.jsx            entry: HashRouter + providers
  App.jsx             layout, theme, routes
  data.js             demo data + rule-based assistant replies
  hooks.js            useReveal, useMounted, reduced-motion flag
  context/            Toast.jsx, Auth.jsx (demo auth state)
  components/         Header, Assistant (Sarathi), Chat, Orb, Icon, Charts, CountUp, Field
  pages/              Home, Dashboard, Incidents, Services, Insurance, Login, Help
```

## Connecting the backend later
- `data.js` -> replace with `fetch('/api/v1/incidents')` etc. (add a Vite dev proxy or set an API base URL).
- `context/Auth.jsx` and `pages/Login.jsx` -> call `POST /api/v1/auth/login`, keep the JWT, send `Authorization: Bearer ...`.
- `data.js` `reply()` -> call a chat endpoint; the assistant UI does not change.

## Limitations
- Demo login `gagan@email.com / 123456` is checked in the browser only.
- The map is a stylised illustration. Google Maps is opened via links, not embedded.
- SOS, assistance requests and report downloads are simulated.
