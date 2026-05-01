# ☕ Cup & Cozy — Café Experience App

> Where warmth meets flavor. A premium, immersive café web application.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-8.0-646cff?logo=vite)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### Core
- 🏠 **Immersive Hero** — GSAP-powered zoom-in with letter-stagger title animation
- 📋 **Dynamic Menu** — 12+ items, category filters, animated product grid
- 🎨 **3D Product Preview** — Parallax tilt effect on mouse movement
- 🛒 **Cart System** — Slide-in drawer, quantity controls, live totals
- 💰 **Billing** — Itemized summary with GST calculation
- 📱 **QR Payment** — Simulated UPI payment with scannable QR code
- ✅ **Order Success** — Confetti animation + order confirmation

### Premium (v2.0)
- 🧪 **Build Your Drink** — Interactive customizer with visual cup preview
- 🧠 **Mood Recommendations** — AI-style suggestions based on how you feel
- 🌗 **Time-Aware Dark Mode** — Auto-switches at 6 PM, manual toggle
- 🎫 **Loyalty Stamp Card** — Gamified 9-stamp punch card with rewards
- 🔊 **Ambient Sound** — Web Audio API-generated café atmosphere

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/your-username/cup-and-cozy.git
cd cup-and-cozy

# Install dependencies
npm install

# Start dev server
npm run dev

# Open in browser
# → http://localhost:5173/
```

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool with HMR |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations (cards, modals, transitions) |
| **GSAP** | Hero intro animation only |
| **Web Audio API** | Ambient café sounds |
| **qrcode.react** | QR code generation |
| **localStorage** | Theme & loyalty persistence |

---

## 📂 Project Structure

```
src/
├── components/
│   ├── UI/              # Button, Card, Modal
│   └── layout/          # Navbar, Footer
├── features/
│   ├── landing/         # Hero, CafeIntro
│   ├── menu/            # MenuPage, MenuGrid, ProductCard, FilterTabs
│   ├── product/         # ProductModal, Fake3DViewer
│   ├── customizer/      # DrinkCustomizer, CupPreview
│   ├── mood/            # MoodSelector
│   ├── cart/            # CartDrawer, CartItem, useCart
│   ├── billing/         # BillingPage, BillSummary
│   ├── payments/        # QRCode
│   ├── orders/          # OrderSuccess
│   ├── theme/           # useTheme (dark mode)
│   ├── loyalty/         # LoyaltyCard, useLoyalty
│   └── ambient/         # AmbientSound, useAmbient
├── data/                # menu.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🎨 Design System

| Token | Light | Dark |
|---|---|---|
| Background | `#fff7ed` | `#1a0f0a` |
| Primary | `#7c2d12` | `#d4915c` |
| Accent | `#f97316` | `#f97316` |
| Cards | `#fef3c7` | `#2d1f17` |
| Text | `#1f2937` | `#f5e6d3` |

**Fonts:** Playfair Display (display) + Inter (body)

---

## 📖 Documentation

- [Product Requirements (PRD)](docs/PRD.md)
- [Technical Requirements (TRD)](docs/TRD.md)
- [Architecture](docs/architecture.md)
- [AI Instructions (CLAUDE.md)](CLAUDE.md)

---

## 🗺 Roadmap

- [x] Core menu & cart system
- [x] QR payment simulation
- [x] Build Your Drink customizer
- [x] Mood-based recommendations
- [x] Dark mode (time-aware)
- [x] Loyalty stamp card
- [x] Ambient sound toggle
- [ ] User authentication
- [ ] Real payment integration
- [ ] Order history & re-order
- [ ] Admin dashboard
- [ ] PWA support

---

## 📄 License

MIT © Cup & Cozy

---

<p align="center">
  <strong>Crafted with ❤️ and ☕ caffeine</strong>
</p>
