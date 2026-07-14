# Nodveta Frontend Assessment (1 Hour)

**Time limit: 60 minutes**

This exercise evaluates how you work in an existing Next.js codebase — reading code, fixing a bug, shipping a small feature, and opening a professional pull request.

You do **not** need to complete every TODO in the repo. Focus on the **required tasks** below.

---

## Required Tasks (~60 min)

Complete these five tasks in order. Approximate time budgets are for senior engineers.

### 1. Fix the confirmation label bug (~10 min)

**File:** `lib/get-confirmation-label.ts`

Failed transactions can show the wrong confirmation label (e.g. `"Confirmed"` when `status` is `"failed"`). Fix the logic and verify against `tx-005` in the dashboard.

Run tests: `npx vitest run`

### 2. Wire up transaction status filtering (~15 min)

**File:** `components/dashboard/transaction-table.tsx`

The status `<select>` is wired to state but filtering is not implemented. Filter the table by `statusFilter` and update the “Showing N transactions” count.

Also add an accessible label for the filter control (e.g. `aria-label` or a `<label>`).

### 3. Polish metric cards (~15 min)

**File:** `components/dashboard/metric-card.tsx`

Use the existing `metric.trend` field (`"up" | "down" | "neutral"`) to improve visual design — color, icon, or badge. Keep it consistent with the Nodveta theme.

### 4. Make the dashboard responsive (~10 min)

**File:** `app/dashboard/page.tsx`

Update the metric and analytics grids so they work on mobile and tablet (not just desktop `grid-cols-4` / `grid-cols-2`).

### 5. Add a unit test (~10 min)

**File:** `lib/get-confirmation-label.test.ts`

Implement the skipped test for failed transactions and ensure `npx vitest run` passes.

---

## Optional (only if you have extra time)

These are **not** required for a complete submission:

- Mobile sidebar navigation (`components/layout/sidebar.tsx`)
- Rich empty state for the transaction table
- Loading state simulation
- Additional component tests
- Further accessibility or system-status enhancements

---

## Submission

1. Create a feature branch.
2. Complete the five required tasks.
3. Open a pull request with:
   - Summary of what you changed
   - Screenshots of the dashboard (desktop + mobile if possible)
   - Anything you would improve with more time

**We evaluate:** code quality, correctness, responsiveness, tests, and PR communication — not how many optional items you finish.

---

## Quick Start

```bash
cd nodveta-frontend-assessment
npm install
npm run dev
```

Open [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to review the starter UI. `npm run dev` opens **http://localhost:3000** in your browser automatically.
