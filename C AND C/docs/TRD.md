# Technical Requirements Document (TRD)

## Cup & Cozy — Café Experience App

**Version:** 2.0  
**Last Updated:** April 29, 2026  

---

## 1. Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Build Tool** | Vite | 8.x | Fast HMR, ESM-native bundling |
| **UI Framework** | React | 19.x | Component-based UI |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS with custom design tokens |
| **Animation (Primary)** | Framer Motion | 12.x | Declarative React animations |
| **Animation (Hero Only)** | GSAP | 3.x | Hero zoom-in + text stagger |
| **QR Generation** | qrcode.react | 4.x | SVG-based QR codes |
| **Audio** | Web Audio API | Native | Ambient sound generation |
| **State Management** | React Context + Hooks | Native | Cart, theme, loyalty state |
| **Persistence** | localStorage | Native | Theme pref, loyalty stamps |

---

## 2. Architecture Decisions

### 2.1 No Router Library
- Simple state-based page navigation via `currentPage` state
- Reduces bundle size by ~15KB (no react-router)
- Adequate for single-page café experience
- Page transitions handled by Framer Motion `AnimatePresence`

### 2.2 Context over Redux
- App state is shallow (cart items, theme, loyalty)
- No need for middleware, time-travel debugging, or complex selectors
- Three focused contexts: `CartContext`, `ThemeContext`, `LoyaltyContext`
- Each context is memoized to prevent unnecessary re-renders

### 2.3 Web Audio API over Audio Files
- No external audio files to load or host
- Programmatic generation of café ambience
- Tiny footprint (no network requests)
- Full control over volume, fade, and frequency

### 2.4 GSAP Limited to Hero
- GSAP is powerful but heavy (~30KB)
- Used ONLY for hero zoom-in and text letter stagger
- All other animations use Framer Motion (already in bundle)
- No GSAP ScrollTrigger or complex timelines

### 2.5 Tailwind CSS v4 with @theme
- Custom design tokens defined in `@theme` directive
- Both light and dark palettes via CSS custom properties
- No `tailwind.config.js` needed (v4 auto-detection)
- Utility classes + component layer for reusable styles

---

## 3. State Management Architecture

```
┌──────────────────────────────────────────┐
│                App.jsx                    │
│  ┌──────────────────────────────────┐    │
│  │        ThemeProvider              │    │
│  │  ┌──────────────────────────┐    │    │
│  │  │      CartProvider         │    │    │
│  │  │  ┌──────────────────┐    │    │    │
│  │  │  │  LoyaltyProvider  │    │    │    │
│  │  │  │                   │    │    │    │
│  │  │  │   AppContent      │    │    │    │
│  │  │  │                   │    │    │    │
│  │  │  └──────────────────┘    │    │    │
│  │  └──────────────────────────┘    │    │
│  └──────────────────────────────────┘    │
└──────────────────────────────────────────┘
```

### Context Details

| Context | State | Persistence | Consumers |
|---|---|---|---|
| `ThemeContext` | `isDark`, `toggleTheme` | localStorage | Navbar, all components via CSS vars |
| `CartContext` | `items[]`, `isOpen`, totals | None (session only) | ProductCard, CartDrawer, Billing |
| `LoyaltyContext` | `stamps`, `totalOrders` | localStorage | LoyaltyCard, OrderSuccess |

---

## 4. Component Architecture

### 4.1 Component Categories

| Category | Path | Purpose |
|---|---|---|
| **UI Primitives** | `src/components/UI/` | Button, Card, Modal (reusable) |
| **Layout** | `src/components/layout/` | Navbar, Footer (structural) |
| **Features** | `src/features/*/` | Domain-specific components |
| **Data** | `src/data/` | Static menu data, mood mappings |

### 4.2 New Feature Components (v2.0)

```
src/features/
  customizer/
    DrinkCustomizer.jsx    # Full customizer page/modal
    CustomizerOption.jsx   # Reusable option selector
    CupPreview.jsx         # Visual cup that updates
  mood/
    MoodSelector.jsx       # Mood picker section
  theme/
    useTheme.jsx           # Theme context + hook
  loyalty/
    LoyaltyCard.jsx        # Visual stamp card
    useLoyalty.jsx          # Loyalty context + hook
  ambient/
    AmbientSound.jsx       # Floating sound toggle
    useAmbient.js          # Web Audio API hook
```

---

## 5. Styling System

### 5.1 Design Tokens (Light)

```css
--color-cream: #fff7ed
--color-coffee: #7c2d12
--color-accent: #f97316
--color-card: #fef3c7
--color-text: #1f2937
```

### 5.2 Design Tokens (Dark)

```css
--color-cream: #1a0f0a
--color-coffee: #d4915c
--color-accent: #f97316
--color-card: #2d1f17
--color-text: #f5e6d3
```

### 5.3 Theme Switching Strategy
- CSS custom properties set on `<html>` element via `data-theme` attribute
- Tailwind's `@theme` for token definitions
- Dark overrides in `index.css` via `html[data-theme="dark"]` selector
- 300ms transition on `background-color` and `color` properties

---

## 6. Performance Budget

| Metric | Budget | Strategy |
|---|---|---|
| JS Bundle | < 200KB gzipped | Tree-shaking, no heavy libs |
| CSS | < 30KB gzipped | Tailwind purge, minimal custom |
| Images | < 500KB total | WebP where possible, lazy loading |
| LCP | < 2.0s | Hero image preload, font preconnect |
| CLS | < 0.1 | Explicit dimensions on images |
| FID | < 100ms | No heavy JS on main thread |

---

## 7. Browser & Device Support

| Browser | Version | Support Level |
|---|---|---|
| Chrome | Latest 2 | Full |
| Firefox | Latest 2 | Full |
| Safari | Latest 2 | Full |
| Edge | Latest 2 | Full |
| Mobile Safari | iOS 15+ | Full |
| Chrome Android | Latest | Full |

---

## 8. Security Considerations

- No user authentication (client-only app)
- No sensitive data stored (localStorage = theme pref + stamp count)
- QR code is simulated (no real payment endpoints)
- No API calls to external services
- CSP-friendly (no inline scripts, no eval)

---

## 9. Testing Strategy

| Type | Tool | Coverage |
|---|---|---|
| Manual | Browser testing | All user flows |
| Visual | Screenshot comparison | Component rendering |
| Performance | Lighthouse | Core Web Vitals |
| Accessibility | axe-core | WCAG 2.1 AA |

---

## 10. Build & Deployment

```bash
# Development
npm run dev          # Starts Vite dev server (HMR)

# Production Build
npm run build        # Outputs to dist/

# Preview Production
npm run preview      # Serves dist/ locally

# Deployment
# Static hosting: Vercel, Netlify, GitHub Pages
# Just deploy the dist/ folder
```
