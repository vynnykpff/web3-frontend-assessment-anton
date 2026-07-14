# Nodveta Frontend Engineering Assessment

A partially completed **Nodveta Infrastructure Dashboard** starter built with Next.js, TypeScript, and Tailwind CSS.

**Candidates:** read **[ASSESSMENT.md](./ASSESSMENT.md)** for the 1-hour exercise brief.

This is **not** the production Nodveta website. All data is static mock blockchain data — there are no private APIs or production credentials.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Vitest](https://vitest.dev/)

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
cd nodveta-frontend-assessment
npm install
```

### Development

```bash
npm run dev
```

This starts the dev server at **http://localhost:3000**.

## Project Structure

```
nodveta-frontend-assessment/
├── ASSESSMENT.md              # 1-hour candidate brief (start here)
├── app/
│   ├── dashboard/page.tsx     # Dashboard layout (responsive grids incomplete)
│   └── ...
├── components/
│   ├── dashboard/             # Metric cards, transaction table, etc.
│   ├── layout/                # Header, sidebar, app shell
│   └── ui/                    # Button, Badge, Card
├── data/mock-dashboard.ts     # Static mock data
├── lib/
│   └── get-confirmation-label.ts   # Bug fix + test target
└── types/dashboard.ts
```

## What Already Works

- Dev environment, Nodveta branding, desktop sidebar
- Dashboard with mock metrics, transactions, nodes, and request chart
- System status list with health badges
- Reusable UI components (`Button`, `Badge`, `Card`)

## What Candidates Complete (1 hour)

| # | Task | File | ~Time |
|---|------|------|-------|
| 1 | Fix failed-transaction confirmation label | `lib/get-confirmation-label.ts` | 10 min |
| 2 | Implement status filter + accessible label | `components/dashboard/transaction-table.tsx` | 15 min |
| 3 | Style metric cards using `trend` | `components/dashboard/metric-card.tsx` | 15 min |
| 4 | Responsive dashboard grids | `app/dashboard/page.tsx` | 10 min |
| 5 | Unit test for confirmation label | `lib/get-confirmation-label.test.ts` | 10 min |

See **[ASSESSMENT.md](./ASSESSMENT.md)** for full instructions.

## Known Issue

The transaction table displays the **wrong confirmation label for failed transactions** when `confirmations > 0`. Example: `tx-005` (`status: "failed"`, `confirmations: 24`) shows `"Confirmed"` instead of a failure label.

Fix in `lib/get-confirmation-label.ts`.

## For Recruiters

- **Duration:** 1 hour (senior frontend engineer)
- **Scope:** 5 required tasks; optional extras are clearly marked
- **Evaluation:** bug fix, filtering, UI polish, responsiveness, tests, PR quality
- **No trap bugs** — the known issue is documented

## License

Assessment use only.
