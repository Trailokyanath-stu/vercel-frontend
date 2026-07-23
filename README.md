# The Grand Palette — React + Vite Frontend

A React/Vite rewrite of The Grand Palette's public website, built to talk to
the same Node/Express + MongoDB backend from the `grand-palette-backend`
project (reservations, contact messages, and the admin-editable menu).

This is the **public-facing site only**. The admin dashboard
(`admin.html` / `admin.css` / `admin.js`) stays as plain HTML/JS in the
backend's `public/` folder — it's a small, self-contained tool and doesn't
need a framework. You're welcome to ask for a React version of that too.

---

## 1. Requirements

- [Node.js](https://nodejs.org) 18 or newer
- The backend running somewhere reachable (locally at `http://localhost:5000`
  by default — see the backend's own README)

---

## 2. Setup

```bash
npm install
npm run dev
```

The dev server starts at **http://localhost:5173**. Requests to `/api/...`
are automatically proxied to `http://localhost:5000` (configured in
`vite.config.js`), so make sure the backend is running first.

---

## 3. Project structure

```
grand-palette-react/
├── index.html                # Vite entry HTML (fonts, <div id="root">)
├── vite.config.js             # Dev server + /api proxy to the backend
├── src/
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                    # Composes every section
│   ├── api.js                      # fetch() helpers for the backend API
│   ├── styles/style.css              # All site styling (dark/neon theme)
│   ├── context/
│   │   └── ReservationModalContext.jsx   # Lets any button open the booking modal
│   ├── hooks/
│   │   └── useCountUp.js                   # Animated counter-on-scroll hook
│   └── components/
│       ├── Reveal.jsx                        # Scroll-reveal wrapper (IntersectionObserver)
│       ├── Loader.jsx                          # Page loader animation
│       ├── Navbar.jsx                            # Sticky nav + mobile hamburger menu
│       ├── Hero.jsx                                # Parallax hero + floating icons
│       ├── About.jsx
│       ├── Services.jsx
│       ├── Menu.jsx                                    # Fetches live menu from GET /api/menu
│       ├── Features.jsx                                  # Feature grid + animated counters
│       ├── Reviews.jsx                                     # Testimonial slider
│       ├── CTA.jsx
│       ├── Contact.jsx                                         # Contact form -> POST /api/contact
│       ├── Footer.jsx
│       ├── ReservationModal.jsx                                  # Booking form -> POST /api/reservations
│       └── BackToTop.jsx
```

---

## 4. How it connects to the backend

- **Menu** (`src/components/Menu.jsx`) calls `GET /api/menu` on mount and
  renders whatever items the admin dashboard has marked "available." No
  code changes are needed to update prices or dishes — that's all managed
  from the backend's admin panel.
- **Reservations** — the "Join Now," "Reserve Your Table," and navbar
  "Reserve Table" buttons all open the same modal (via
  `ReservationModalContext`), which posts to `POST /api/reservations`.
- **Contact form** posts to `POST /api/contact`.

All three simply need the backend reachable at `/api` — in dev that's
handled by the Vite proxy; in production, see the deployment note below.

---

## 5. Building for production

```bash
npm run build
```

This outputs static files to `dist/`. You have two good options:

**Option A — serve it from the Express backend (simplest):**
Copy the contents of `dist/` into the backend's `public/` folder (replacing
the existing `index.html`/`style.css`/`script.js`), so the same Express app
serves both the API and the built React site. No proxy or CORS config
needed since everything is same-origin.

**Option B — host separately (e.g. Vercel/Netlify for the frontend):**
Set `CORS_ORIGIN` in the backend's `.env` to your frontend's deployed URL,
and update `src/api.js`'s `API_BASE` to the backend's full URL
(e.g. `https://your-backend.onrender.com/api`) before building.

---

## 6. Notes

- All styling reuses the original site's `style.css` as-is — colors,
  typography, and animations are unchanged from the vanilla version.
- React automatically escapes all text content (including menu items from
  the database), so there's no manual HTML-escaping needed like in the
  vanilla JS version.
- `prefers-reduced-motion` is respected globally via CSS in `style.css`.
