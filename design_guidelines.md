# Design Guidelines: Allegro IC B2B Marketplace Platform

## Design Approach
**Selected Approach:** Hybrid - Material Design System foundation with B2B marketplace customization

**Justification:** Data-intensive B2B platform requiring clear information hierarchy, professional credibility, and efficient workflows. Material Design provides robust patterns for tables, forms, and data displays while allowing customization for the calm, trustworthy aesthetic needed in B2B transactions.

**Key Design Principles:**
- Professional credibility and trust-building
- Information clarity without overwhelming users
- Efficient task completion for busy procurement professionals
- Calm, focused aesthetic that reduces cognitive load

---

## Core Design Elements

### A. Color Palette

**Primary Colors:**
- **Dark Mode Primary:** 217 91% 60% (Calm professional blue)
- **Light Mode Primary:** 217 91% 45% (Deeper professional blue)
- **Dark Mode Background:** 222 47% 11% (Deep slate)
- **Light Mode Background:** 0 0% 100% (Pure white)

**Neutral Colors:**
- **Dark Mode Surface:** 217 33% 17% (Elevated slate)
- **Dark Mode Border:** 217 20% 25% (Subtle borders)
- **Light Mode Surface:** 210 20% 98% (Soft gray)
- **Light Mode Border:** 217 15% 85% (Light borders)

**Accent Colors:**
- **Success:** 142 76% 36% (Trustworthy green for confirmations)
- **Warning:** 38 92% 50% (Amber for caution states)
- **Error:** 0 84% 60% (Clear red for errors)

**Semantic Colors:**
- **Blockchain Accent:** 280 65% 60% (Purple for blockchain elements)
- **Escrow Accent:** 160 60% 45% (Teal for secure transactions)

### B. Typography

**Font Families:**
- **Primary:** 'Inter' (via Google Fonts) - Clean, professional, excellent for data
- **Monospace:** 'JetBrains Mono' - For part numbers, technical specs, blockchain hashes

**Type Scale:**
- **Hero/Display:** text-5xl to text-6xl, font-bold (Company names, hero headings)
- **Headings:** text-2xl to text-4xl, font-semibold (Section titles, page headers)
- **Body:** text-base, font-normal (Primary content, descriptions)
- **Small:** text-sm, font-medium (Labels, metadata, table headers)
- **Micro:** text-xs, font-normal (Timestamps, secondary info, part numbers)

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, and 8 for consistency
- **Micro spacing:** p-2, gap-2 (tight component spacing)
- **Standard spacing:** p-4, gap-4 (default component padding)
- **Section spacing:** p-6, py-8 (card interiors, form groups)
- **Major spacing:** p-8, py-12, py-16 (page sections, major containers)

**Grid System:**
- **Dashboard:** 12-column grid with gap-4 to gap-6
- **Inventory Tables:** Full-width with fixed column widths
- **Company Cards:** 3-column on desktop (lg:grid-cols-3), 2-column tablet (md:grid-cols-2), single column mobile

**Container Widths:**
- **Full-width data:** w-full with inner max-w-7xl for tables/dashboards
- **Content sections:** max-w-6xl for general content
- **Forms:** max-w-2xl for focused input experiences

### D. Component Library

**Navigation:**
- Sticky header with company logo, search bar, notifications, and profile
- Breadcrumb navigation for deep category hierarchies
- Sidebar navigation for dashboard sections (collapsible on mobile)

**Data Display:**
- **Inventory Tables:** Alternating row colors, hover states, sortable columns, inline actions
- **Component Cards:** Image thumbnail, part number (monospace), specs grid, supplier badge, availability indicator
- **Stats Dashboard:** KPI cards with icons, trend indicators, sparkline charts

**Forms & Inputs:**
- **Search:** Prominent search bar with autocomplete, advanced filters (collapsible)
- **Inventory Input:** Multi-step form with file upload for datasheets, bulk CSV import
- **Filters:** Checkbox groups, range sliders for quantity/price, multi-select dropdowns

**Interactive Elements:**
- **CTAs:** Solid primary buttons for main actions, outline for secondary
- **Status Indicators:** Pill badges for inventory status (In Stock, Low Stock, Pre-Order)
- **Progress:** Stepper component for escrow/blockchain transaction flow

**Overlays:**
- **Modals:** For quick actions (Add to Cart, Request Quote)
- **Slide-overs:** For detailed views (Component specs, Company profile)
- **Toasts:** Success/error notifications (top-right, auto-dismiss)

### E. Animations

**Use sparingly - focus on feedback and transitions:**
- **Page transitions:** Subtle fade-in (duration-200)
- **Hover states:** scale-[1.02] for cards, smooth color transitions
- **Loading states:** Skeleton screens with pulse animation
- **Blockchain flow:** Subtle progress indicators, checkmark animations on step completion
- **No decorative animations** - keep focus on functionality

---

## Page-Specific Design

### Landing Page (Marketing)
- **Hero Section:** Large image showing electronic components/ICs with gradient overlay, compelling headline about trusted B2B marketplace, primary CTA "Browse Inventory", secondary "Register as Supplier"
- **Trust Indicators:** Logos of component manufacturers, transaction volume stats, security badges
- **How It Works:** 3-column process (Search → Purchase → Secure Delivery) with icons
- **Featured Categories:** Grid of top component categories with images
- **Platform Features:** Escrow service, blockchain transparency, quality assurance highlights
- **CTA Section:** Strong call-to-action for company registration

### Inventory Listing Page
- **Filter Sidebar:** Manufacturer, component type, stock status, price range, location
- **Results Grid/Table Toggle:** Card view for browsing, table view for detailed comparison
- **Sort Controls:** Price, quantity, supplier rating, date listed
- **Quick Actions:** Add to cart, request quote, save to watchlist

### Company Profile Page
- **Header:** Company logo, name, verified badge, rating, location, member since
- **Stats Row:** Total listings, successful transactions, response time, certifications
- **Inventory Tab:** Company's available components with search/filter
- **About Tab:** Company description, specializations, quality certifications
- **Reviews Tab:** Customer feedback with ratings and verified purchase badges

### Escrow/Blockchain Flow
- **Transaction Timeline:** Horizontal stepper showing: Order → Payment Held → Shipment → Delivery → Funds Released
- **Blockchain Visualization:** Mock transaction hash, block confirmation status, timestamp
- **Security Indicators:** Lock icons, encryption badges, escrow protection messaging
- **Status Updates:** Real-time notifications within the flow interface

---

## Images

**Hero Image:** Wide banner image showcasing Allegro IC components arranged professionally - close-up of circuit boards, ICs in trays, or semiconductor manufacturing aesthetic. Should convey precision, technology, and professionalism.

**Category Images:** Thumbnail images for each component category (ICs, sensors, capacitors, etc.) showing representative products

**Company Logos:** Placeholder for supplier company logos in profile headers and listings

**Product Images:** Component images in inventory cards - prefer technical product shots with white/transparent backgrounds

---

## Technical Implementation Notes

- Use Heroicons for all interface icons (via CDN)
- Implement dark mode toggle with localStorage persistence
- All blockchain/escrow elements are UI-only (no actual blockchain integration)
- Tables should be responsive with horizontal scroll on mobile
- Forms include validation feedback with error states matching color palette