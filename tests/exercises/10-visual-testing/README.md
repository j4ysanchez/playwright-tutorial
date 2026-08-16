# Module 10 — Visual Testing & Screenshots

## Objectives
- Use `expect(locator).toHaveScreenshot()` for pixel-level regression checks.
- Mask dynamic content that would otherwise make every run "different".
- Understand the baseline image workflow: generate, review, commit, compare.

## Background
Screenshots are captured per-OS and per-browser by default (a macOS Chromium render differs
slightly from a Linux one). Baselines live next to the spec file in a `-snapshots` folder. If you
run this module on a different OS than the one that generated the committed baseline, you'll need
to regenerate it — that's expected, not a bug.

The confirmation page (`/order/:id`) includes a random UUID (`data-testid="order-id"`) that's
different on every single run — a raw screenshot of that page will never match twice unless you
mask it out.

## Exercises
Fill in `visual.spec.ts`:

1. Navigate to `/`, wait for the pizza grid to be visible, then assert
   `page.getByTestId("pizza-card").first()` matches a screenshot baseline.
2. Place an order (reuse the flow from earlier modules or write a small helper) to reach
   `/order/:id`. Take a **full page** screenshot with `page.getByTestId("order-id")` passed to the
   `mask` option, so the random id doesn't break every comparison.

## Generate baselines
The first run of a `toHaveScreenshot()` assertion has nothing to compare against — it creates the
baseline and fails once, on purpose:
```
npx playwright test tests/exercises/10-visual-testing --project=chromium --update-snapshots
```
Run it again without `--update-snapshots` and it should pass. Open the generated `.png` files in
`tests/exercises/10-visual-testing/visual.spec.ts-snapshots/` to see what got captured.

## Check yourself
`tests/solutions/10-visual-testing/visual.spec.ts` (baselines are intentionally *not* pre-committed
for the solution either — generate your own with `--update-snapshots` the first time you run it).

## Stretch goal
Deliberately change `--accent` in `web/src/index.css` to a different color, rerun without
`--update-snapshots`, and look at the diff image Playwright generates in `test-results/`.
