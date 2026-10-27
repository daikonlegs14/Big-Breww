# Big Brew Coffee Shop — Live Beverage Platform & Manager Dashboard

A modern, responsive web application for **Big Brew Coffee Shop**, showcasing handcrafted signature drinks, tiered user authentication, and a full-stack persistent CRUD live menu management system for managers and customers.

---

## 1. Business Name & Description

**Business Name:** Big Brew Coffee Shop  
**Official Website:** [https://bigbrew.com](https://bigbrew.com)  
**Preview Deployment:** [https://ais-pre-2jsycnjoox2e2jqjywqt3k-638227821281.asia-east1.run.app](https://ais-pre-2jsycnjoox2e2jqjywqt3k-638227821281.asia-east1.run.app)  
**Brand Identity:** Artisanal, accessible Filipino specialty coffee brand celebrated for freshly pulled espresso shots, signature sweet iced creations (such as our iconic *Spanish Sweet Latte*, *Muscovado Brown Sugar Latte*, and *Dirty Uji Matcha Fusion*), starting at just **₱39.00**.

Big Brew bridges the gap between commercial mass-market instant coffee and expensive luxury cafes, delivering freshly pulled espresso from Benguet and Cavite highland beans at everyday neighborhood prices.

---

## 2. Problem Being Solved

1. **High Barriers to Specialty Coffee:** In many urban communities, third-wave espresso and specialty milk foam drinks cost between ₱180 and ₱260, making daily quality coffee unaffordable for students and everyday workers. Big Brew solves this by offering handcrafted barista-made coffee starting at ₱39.
2. **Static & Outdated Menus:** Traditional coffee shops struggle with printed menus that don't reflect live branch inventory, seasonal releases, or sold-out status.
3. **Operational Overhead:** Store managers need an intuitive, secure, mobile-friendly interface to update prices, modify descriptions, launch signature beverages, and mark sold-out items without touching code or causing accidental data loss.

---

## 3. Feature List

### A. Public Landing Page (No Login Required)
- **Zero-Friction Access:** Browsable by any customer or visitor without requiring sign in.
- **Mobile-First & Fully Responsive:** Clean viewport layout adhering to touch target standards (≥44px), readable typography (`Fraunces` display and `Plus Jakarta Sans` body), and adaptive column wrapping across smartphones, tablets, and 1440px desktops.
- **Hero Showcase:** Visual introduction with brand narrative, pricing anchor ("Starting at ₱39"), real-time fresh brew rotation markers, and featured drink showcase.
- **Signature Drinks Spotlight:** Dedicated highlights section featuring the top house specials with distinct flavor profiles, cup sizes, and pricing.
- **Live Beverage Catalog:** Real-time filterable menu with:
  - Category selector (`All`, `Signature Espresso`, `Specialty Fusion`, `Iced Specialties`, `Cold Brew & Refreshers`, `Milktea & Fruit Teas`).
  - Search bar filtering by drink title, description, or tasting notes.
  - Temperature filter (`All`, `Iced Only`, `Hot Only`).
  - Sort selector (Featured/Signature first, Price low-to-high, Price high-to-low, Alphabetical).
- **Interactive Drink Modal:** Comprehensive drink card popup detailing caffeine strength, flavor notes, size options (`Grande 16oz` vs `Venti 22oz`), and availability status.
- **Customer Order Tray:** Customers can add beverages to an interactive order tray drawer with live quantity adjustments and simulated counter pickup ticketing.
- **Roasting & Sourcing Craft Section:** Storytelling explaining farmer cooperatives, small-batch roasting, and fresh extraction.
- **Store Directory:** Branch addresses, operating hours (e.g. 7:00 AM – 11:00 PM), and contact info.

### B. User Accounts, Authentication & Access Roles
- **Two Access Tiers:**
  1. **Admin / Manager:** Full CRUD permissions on the live drink menu, ability to reset to default seeds, stock status toggling, and price management.
  2. **Regular User / Customer:** Public browsing, profile viewing, drink details inspection, order tray creation, and pickup reservation.
- **Session Authentication:** Token-based authentication with local storage persistence and server-side verification via `/api/auth/me`.
- **User Role Switcher / Demo Portal:** One-click prefill buttons in the login modal for effortless evaluation between Manager and Customer tiers.
- **Account Registration:** Public customer sign up with full name, email, and password validation.

### C. Live Menu CRUD (Create, Read, Update, Delete)
- **Create (Manager Only):** Form to publish new signature drinks with fields for name, category, price, description, tasting notes, cup sizes, temperature, and visual asset selection.
- **Read (Public & Manager):** Real-time synced drinks list fetched from the server.
- **Update (Manager Only):** Edit existing beverages directly on card hover or modal (update price, description, category, or stock availability).
- **Delete (Manager Only) with Accidental Loss Prevention:**
  - Delete button triggers a dedicated **Confirmation Modal** requiring explicit confirmation before removing an item.
  - Prevents accidental taps and irreversible loss.
- **Input Validation:**
  - Required fields: Name (2–60 characters), Category, Price (> ₱0), Description (≥ 8 characters).
  - Clear, user-friendly inline error messages shown directly underneath each invalid input.
- **Data Persistence:**
  - All drink creations, updates, and deletions are saved to disk in `data/drinks.json` and user data in `data/users.json`.
  - Data survives dev server restarts and browser reloads.

---

## 4. Test Accounts & Sample Credentials

You can use the **1-Click Demo Buttons** inside the **"Sign In / Manager"** modal, or enter the credentials manually:

| Role | Email | Password | Permissions & Features |
| :--- | :--- | :--- | :--- |
| **Admin / Manager** | `manager@bigbrew.com` | `manager123` | Full Live Menu CRUD (Create, Edit, Delete with confirmation), Reset Seeds, Manage stock status |
| **Regular Customer** | `customer@bigbrew.com` | `coffee123` | Public landing page, view drink profiles, customize sizes, add to order tray |

*New customer accounts can also be created on the fly via the "Sign Up" tab.*

---

## 5. Tech Stack Used

- **Frontend:**
  - React 19 (Functional components, Custom hooks)
  - TypeScript (Strict typing for Drink models, user roles, forms)
  - Tailwind CSS v4 (`@tailwindcss/vite`, responsive utility classes, custom typography)
  - Lucide React (Streamlined functional iconography)
- **Backend & Persistence:**
  - Node.js with Express 4
  - `tsx` TypeScript runtime
  - File-based JSON Database storage (`data/drinks.json`, `data/users.json`) with automatic fallback seed generation
- **Build & Development Tooling:**
  - Vite 8 (Ultra-fast build and dev middleware integration)

---

## 6. AI Tools Used & How They Were Used

1. **Google AI Studio Assistant (Coding Engine):**
   - Engineered the complete full-stack architecture, including Express REST endpoints, TypeScript schemas, validation logic, and responsive React component structure.
   - Designed the user interface adhering to domain-specific e-commerce & retail design principles (Zero-Pill typography, 60-30-10 color balance, Top Bar Contract).
2. **`generate_image` Generative Tooling:**
   - Generated high-fidelity, photorealistic visual assets specifically tailored to Big Brew's signature beverage offerings:
     - `hero_bigbrew_coffee`: Hero coffee bar background featuring an artisan iced pour.
     - `drink_spanish_latte`: Signature layered Spanish latte with condensed sweet cream.
     - `drink_matcha_espresso`: Dirty Uji Matcha layered with espresso crema and iced milk.
     - `drink_brown_sugar_boba`: Iced brown sugar latte with rich Muscovado syrup drizzles.
     - `craft_coffee_beans`: Highland Arabica coffee beans and burlap bag for the Roasting Story section.

---

## 7. Setup & Run Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation
1. Install project dependencies:
   ```bash
   npm install
   ```

2. Start the full-stack development server:
   ```bash
   npm run dev
   ```
   *The Express server boots on `http://localhost:3000` and automatically mounts Vite middleware.*

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Building for Production
To build the client bundle for production deployment:
```bash
npm run build
npm start
```
