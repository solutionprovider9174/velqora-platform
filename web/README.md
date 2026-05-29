# Velqora — Enterprise Logistics & Renewable Energy ERP

> **Move. Manage. Master.**
> Next.js 14 frontend for the Velqora enterprise logistics ERP platform, designed to connect to a Java Spring Boot backend.

## ✨ Highlights

- **Operations Control Tower** dashboard with 6-KPI grid, shipment status summary, equipment lifecycle, AI monitoring preview
- **Backend-aligned modules**: Shipments, Warehouse Operations, Inventory Control, Equipment Assets
- **SaaS-ready**: multi-company, multi-branch, multi-language (15+), multi-currency (12+)
- **AI Monitoring** preview with operational alerts, demand forecast chart, recommendations
- **Roadmap modules** (Fleet, Drivers, Energy Systems, Finance & Billing, Onboarding & Migration, Integrations) shown as professional future-ready pages with status badges (Active / Preview / Soon)
- **Mobile responsive** across all pages — sidebar collapses to drawer, tables scroll, KPI grids re-flow
- **Unified Alert Center** in topbar bell, dashboard, and AI Monitoring page

## 🚀 Quick start

```bash
npm install
npm run dev
# → http://localhost:3000
```

Demo login (`/auth/login`):
- Email: `admin@velqora.com`
- Password: `password`

## 🏗️ Stack

- Next.js 14.2 (App Router) + TypeScript
- Tailwind CSS v3 (custom Velqora navy + blue brand palette)
- Recharts for charts
- Axios + JWT interceptor (`src/lib/apiClient.ts`)
- TanStack React Query v5 (`src/hooks/useApi.ts`)
- Zustand for auth + UI state (`src/store/`)
- Lucide React + Tabler icons

## 📁 Project structure

```
src/
├── app/
│   ├── landing/             Public marketing page
│   ├── auth/login/          Sign-in
│   ├── dashboard/           Operations Control Tower
│   ├── shipments/           Shipment workflows + drawer + actions menu
│   ├── warehouse/           Warehouse Operations + 3 tabs
│   ├── inventory/           Inventory Control + 4 tabs
│   ├── equipment/           Equipment Assets lifecycle
│   ├── ai-monitoring/       AI Monitoring (Preview)
│   ├── reports/             Operational reports
│   ├── settings/            6-tab settings center
│   ├── companies/           Company / tenant management
│   ├── users/               Users & Access
│   ├── onboarding/          Onboarding & Migration (Roadmap)
│   ├── integrations/        Integrations (Roadmap)
│   ├── fleet/               Fleet Monitoring (Roadmap)
│   ├── drivers/             Driver Management (Roadmap)
│   ├── energy/              Energy Systems (Roadmap)
│   └── finance/             Finance & Billing (Roadmap)
├── components/
│   ├── layout/              Sidebar (sectioned nav + status badges), Topbar
│   ├── dashboard/           All Operations Control Tower widgets
│   ├── landing/             10 landing sections
│   └── shared/              Providers
├── lib/                     apiClient (axios + JWT), utils
├── services/                Backend service layer (auth, shipment, inventory, equipment...)
├── hooks/                   React Query hooks (useShipments, useInventoryBalances...)
├── store/                   Zustand (auth + UI)
└── types/                   Backend-aligned TypeScript types
```

## 🔌 Backend API contract

The frontend is wired to call these Spring Boot endpoints (via `NEXT_PUBLIC_API_BASE_URL`):

**Dashboard**
- `GET /api/dashboard/overview`
- `GET /api/dashboard/logistics/status-summary`
- `GET /api/dashboard/equipment/status-summary`
- `GET /api/dashboard/inventory/low-stock`

**Shipments**
- `GET /api/logistics/shipments` (paginated, filters: status, priority, companyId, branchId, search)
- `POST /api/logistics/shipments`
- `GET /api/logistics/shipments/{id}`
- `PATCH /api/logistics/shipments/{id}`
- `PATCH /api/logistics/shipments/{id}/status`
- `GET /api/logistics/shipments/{id}/events`

**Inventory**
- `GET /api/inventory/products`
- `GET /api/inventory/warehouses`
- `GET /api/inventory/balances`
- `GET /api/inventory/stock-movements`
- `POST /api/inventory/stock-movements`

**Equipment**
- `GET /api/equipment/assets`
- `POST /api/equipment/assets`
- `PATCH /api/equipment/assets/{id}/status`

**Auth**
- `POST /api/auth/login` → returns JWT
- `GET /api/auth/me`

## 🧭 Backend enums

UI labels are aligned with backend enum values:

- **ShipmentStatus**: `CREATED`, `READY_FOR_DISPATCH`, `DISPATCHED`, `IN_TRANSIT`, `DELAYED`, `DELIVERED`, `CANCELLED`, `RETURNED`
- **Priority**: `LOW`, `NORMAL`, `HIGH`, `URGENT`
- **StockMovementType**: `INBOUND` → "Received", `OUTBOUND` → "Dispatched", `TRANSFER`, `ADJUSTMENT`
- **StockStatus**: `IN_STOCK`, `LOW_STOCK`, `REORDER`, `OUT_OF_STOCK`
- **EquipmentStatus**: `INSTALLED`, `IN_STOCK`, `MAINTENANCE`, `RETIRED`, `INSPECTION_DUE`

## ⚙️ Environment

Copy `.env.example` → `.env.local`:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=Velqora
```

## 📦 Build

```bash
npm run build
npm start
```

## 🗺️ Roadmap modules (visible but marked "Soon")

These pages exist as professional future-ready placeholders, ready to be wired up when the backend adds support:

- **Fleet Monitoring** — vehicles, fuel, route status, maintenance
- **Driver Management** — profiles, availability, assignments, compliance
- **Energy Systems** — IoT telemetry, solar/battery/inverter monitoring
- **Finance & Billing** — invoicing, payments, multi-currency, accounting integrations
- **Onboarding & Migration** — CSV/Excel data import workflow for new customers
- **Integrations** — ERP, CRM, accounting, IoT, AI service connectors

---

Built for Velqora · © 2025
