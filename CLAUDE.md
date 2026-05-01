# CLAUDE.md — AI Coding Instructions

## Project: Cup & Cozy — Café Experience App

---

## Quick Start

```bash
npm install
npm run dev
# Opens at http://localhost:5173/
```

---

## Tech Stack Rules

| Technology | Usage Rule |
|---|---|
| **React 19** | Functional components only. No class components. |
| **Tailwind CSS v4** | Use `@theme` tokens. No `tailwind.config.js`. |
| **Framer Motion** | ALL animations except hero. Cards, modals, page transitions. |
| **GSAP** | ONLY for `Hero.jsx` (zoom-in + text stagger). Nowhere else. |
| **State** | React Context + hooks. No Redux, Zustand, or Jotai. |
| **Persistence** | localStorage only. No backend, no API calls. |
| **Audio** | Web Audio API only. No external audio files. |

---

## Architecture Rules

### Component Organization
- **UI primitives** → `src/components/UI/` (Button, Card, Modal)
- **Layout** → `src/components/layout/` (Navbar, Footer)
- **Features** → `src/features/{domain}/` (each feature in own folder)
- **Data** → `src/data/` (static data, no API calls)

### State Management
- Three contexts: `CartContext`, `ThemeContext`, `LoyaltyContext`
- Each context has a dedicated `useX.jsx` file
- All context hooks throw if used outside provider
- Use `useMemo` and `useCallback` to prevent unnecessary re-renders

### Routing
- No react-router. Simple `currentPage` state in App.jsx.
- Page transitions via Framer Motion `AnimatePresence`.

---

## Design System

### Theme Tokens (defined in `index.css` via `@theme`)

**Light Mode:**
```
cream: #fff7ed     (background)
coffee: #7c2d12    (primary)
accent: #f97316    (CTA/highlights)
card: #fef3c7      (card bg)
text: #1f2937      (body text)
```

**Dark Mode (via `html[data-theme="dark"]`):**
```
cream: #1a0f0a
coffee-light: #d4915c
card: #2d1f17
text: #f5e6d3
```

### Typography
- **Display font:** Playfair Display (headings, brand)
- **Body font:** Inter (paragraphs, UI text)
- Use `font-display` and `font-body` utility classes

### Spacing & Sizing
- Cards: `rounded-2xl`, `p-6` to `p-8`
- Sections: `py-24 px-6`, max-width `max-w-7xl`
- Buttons: `rounded-xl`, sizes sm/md/lg

---

## Code Style

### Naming Conventions
- Components: PascalCase (`ProductCard.jsx`)
- Hooks: camelCase with `use` prefix (`useCart.jsx`)
- Data files: camelCase (`menu.js`)
- CSS classes: kebab-case (`card-shadow`)

### Component Structure
```jsx
// 1. Imports
import { useState } from "react";
import { motion } from "framer-motion";

// 2. Animation variants (if any)
const variants = { ... };

// 3. Component
export default function ComponentName({ prop1, prop2 }) {
  // hooks
  // handlers
  // render
  return ( ... );
}
```

### Do NOT
- ❌ Use `class` components
- ❌ Use Redux, MobX, or external state managers
- ❌ Use GSAP outside of Hero.jsx
- ❌ Use inline styles (use Tailwind classes)
- ❌ Use `!important` in CSS
- ❌ Import heavy libraries (Three.js, D3, etc.)
- ❌ Use infinite animation loops
- ❌ Remove existing comments/docstrings unrelated to changes

### Do
- ✅ Use `useCallback` for event handlers passed as props
- ✅ Use `useMemo` for expensive computations
- ✅ Use `loading="lazy"` on images
- ✅ Use semantic HTML elements
- ✅ Keep components under 150 lines
- ✅ Use Framer Motion `whileHover`, `whileTap` for interactions

---

## File Relationships

```
App.jsx
  ├── ThemeProvider (useTheme.jsx)
  │     └── CartProvider (useCart.jsx)
  │           └── LoyaltyProvider (useLoyalty.jsx)
  │                 └── AppContent
  │                       ├── Navbar (uses: useTheme, useCart, useLoyalty)
  │                       ├── Pages (Hero, Menu, Billing, etc.)
  │                       ├── CartDrawer (uses: useCart)
  │                       ├── ProductModal
  │                       ├── AmbientSound (uses: useAmbient)
  │                       └── Footer
```

---

## Feature-Specific Notes

### Dark Mode
- Theme is set via `data-theme` attribute on `<html>`
- Auto-detects time: before 18:00 = light, after = dark
- Manual toggle overrides auto-detection
- Preference stored in `localStorage.theme`

### Loyalty System
- Stamps stored in `localStorage.loyaltyStamps`
- Max 9 stamps per card
- Resets to 0 after claiming reward
- Stamp added on order completion (OrderSuccess)

### Ambient Sound
- Uses Web Audio API `AudioContext`
- Creates filtered noise + oscillator for café ambience
- Must be user-initiated (browser autoplay policy)
- Fade in/out over 500ms via GainNode

### Drink Customizer
- Custom drink is a synthetic menu item (not from menu.js)
- Price = base size price + sum of addon prices
- Added to cart with `name: "Custom {base}"` format
