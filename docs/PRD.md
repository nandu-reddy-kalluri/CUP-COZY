# Product Requirements Document (PRD)

## Cup & Cozy — Café Experience App

**Version:** 2.0  
**Last Updated:** April 29, 2026  
**Author:** Cup & Cozy Dev Team  

---

## 1. Product Overview

**Cup & Cozy** is a premium, modern café web application that delivers an immersive digital café experience. It goes beyond a typical menu website by offering interactive drink customization, mood-based recommendations, ambient café sounds, a gamified loyalty program, and an adaptive day/night theme — creating an experience that feels alive, personal, and memorable.

---

## 2. Problem Statement

Most café websites are static, uninspiring, and transactional. Users visit, glance at a menu, and leave. There is no emotional connection, personalization, or reason to return. Cup & Cozy solves this by making the digital experience as warm and engaging as the physical café.

---

## 3. Target Audience

| Segment | Description |
|---|---|
| **Primary** | Urban coffee enthusiasts (18-35) who value aesthetics and experience |
| **Secondary** | Remote workers looking for cozy café vibes at home |
| **Tertiary** | Café owners seeking a premium template for their business |

---

## 4. Core Features (v1.0)

### 4.1 Immersive Hero Section
- Full-screen café background with GSAP zoom-in animation
- Letter-stagger text reveal ("Cup & Cozy")
- Glass-effect navigation badge
- "Explore Menu" CTA

### 4.2 Menu System
- 12+ curated menu items across Coffee, Beverages, Snacks
- Category filter tabs with animated active indicator
- Product cards with image zoom, bestseller/popular tags
- Add to cart from grid or modal

### 4.3 Product Preview (Fake 3D)
- Parallax tilt effect on mouse movement
- Specular highlight overlay for realism
- Product details: description, calories, size, tags

### 4.4 Cart System
- Slide-in drawer from right
- Quantity controls (+/−)
- Live subtotal + 5% GST calculation
- Proceed to checkout flow

### 4.5 Billing & Payment
- Itemized order summary
- QR code payment simulation (UPI format)
- "Simulate Payment" for demo purposes

### 4.6 Order Confirmation
- Success animation with confetti particles
- Unique order ID generation
- Payment status display

---

## 5. New Features (v2.0)

### 5.1 Build Your Drink Customizer ⭐
**Goal:** Let users craft their perfect drink interactively.

**Requirements:**
- Accessible from menu via "Customize" button on eligible drinks
- Selection options:
  - **Base drink** (Espresso, Latte, Cappuccino, Cold Brew, Matcha)
  - **Milk type** (Regular, Oat, Almond, Soy, Coconut)
  - **Size** (Small ₹120, Medium ₹160, Large ₹200)
  - **Sweetness** (0%, 25%, 50%, 75%, 100%)
  - **Add-ons** (Extra shot ₹30, Whipped cream ₹20, Vanilla syrup ₹25, Caramel drizzle ₹25, Cinnamon ₹15)
- Live price calculation as options change
- Visual cup illustration that updates with selections
- "Add Custom Drink to Cart" button

**Success Metrics:**
- 30%+ users interact with customizer
- Higher average order value vs. standard menu items

### 5.2 Mood-Based Recommendations 🧠
**Goal:** Personalized suggestions based on user's current mood.

**Requirements:**
- "How are you feeling?" prompt on homepage (below hero)
- Four mood options with emoji + label:
  - ⚡ Energized → Bold coffees, espresso
  - 🧸 Cozy → Hot chocolate, cappuccino, pastries
  - 🧊 Chill → Iced drinks, cold brew, frappe
  - 🌍 Adventurous → Matcha, unique blends, new items
- Selecting a mood filters and highlights 3-4 recommended items
- Smooth animation on selection with personalized tagline
- Can be dismissed or changed

**Success Metrics:**
- 40%+ engagement with mood selector
- Increased discovery of non-default items

### 5.3 Dark Mode (Time-Aware) 🌗
**Goal:** Adaptive visual theme that matches time of day for premium feel.

**Requirements:**
- Auto-detection: Before 6 PM = Light (warm cream), After 6 PM = Dark (espresso)
- Manual toggle in navbar (sun/moon icon)
- User preference persisted in localStorage
- Smooth CSS transition between themes (300ms)
- Dark theme palette:
  - Background: #1a0f0a
  - Surface: #2d1f17
  - Card: #3d2c22
  - Text: #f5e6d3
  - Accent: #f97316 (unchanged)
- All components must look polished in both themes

**Success Metrics:**
- 20%+ users toggle theme manually
- Reduced bounce rate during evening hours

### 5.4 Loyalty Stamp Card 🎫
**Goal:** Gamify repeat visits with a visual punch card system.

**Requirements:**
- Visual card resembling a real café stamp card (3×3 grid = 9 stamps)
- Each completed order = 1 stamp
- Stamps animate in with a "stamped" effect
- After 9 stamps: "🎉 Free Drink!" reward modal
- Progress persisted in localStorage
- Accessible from navbar (small coffee cup icon)
- Shows progress: "3 of 9 stamps collected"
- Reset after reward is claimed

**Success Metrics:**
- Users complete 2+ order cycles
- Increased session return rate

### 5.5 Ambient Sound Toggle 🔊
**Goal:** Immersive café atmosphere through ambient audio.

**Requirements:**
- Floating button (bottom-left corner) with speaker icon
- Generates café ambience using Web Audio API:
  - Soft filtered noise (café chatter simulation)
  - Gentle tone layers (warmth)
- Click to toggle on/off
- Volume control on hover
- Subtle pulse animation when active
- Muted by default (user must opt-in)
- Smooth fade-in/fade-out (500ms)

**Success Metrics:**
- 15%+ users activate ambient sound
- Longer average session duration

---

## 6. User Flows

### Primary Flow
```
Landing → Mood Selector → Menu → Customize Drink → Add to Cart → Billing → QR Payment → Order Success → Loyalty Stamp
```

### Secondary Flow
```
Landing → Browse Menu → Product Modal → Add to Cart → Checkout → Payment
```

---

## 7. Non-Functional Requirements

| Requirement | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Lighthouse Performance | > 90 |
| Bundle Size | < 500KB gzipped |
| Accessibility | WCAG 2.1 AA |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2) |
| Mobile Responsive | 320px - 2560px |

---

## 8. Out of Scope (v2.0)

- Real payment integration
- User authentication / accounts
- Backend API / database
- Push notifications
- Native mobile app
- Multi-location support

---

## 9. Timeline

| Phase | Features | Duration |
|---|---|---|
| v1.0 ✅ | Core menu, cart, billing, QR payment | Complete |
| v2.0 🚧 | Customizer, Mood, Dark Mode, Loyalty, Ambient | Current |
| v3.0 (future) | Auth, real payments, order history, admin panel | Planned |
