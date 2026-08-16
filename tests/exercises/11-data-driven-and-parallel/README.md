# Module 11 — Data-Driven Tests & Parallelism

## Objectives
- Generate multiple `test()` cases from a plain data array instead of copy-pasting near-identical tests.
- Use `test.step()` to make multi-part tests readable in the HTML report.
- Understand how Playwright parallelizes: across files by default, and see the effect of `--workers`.

## Background
The Margherita's base prices are `S: 8.99`, `M: 11.99`, `L: 14.99`. Toppings used below: Pepperoni
`1.50`, Mushroom `1.00`, Extra Cheese `1.25` (see `server/src/data.ts` for the full list).

## Exercises
Fill in `priced-combinations.spec.ts`:

1. Build a `const cases = [...]` array of `{ size, toppings, expectedTotal }` covering at least 4
   combinations, e.g.:
   - Small, no toppings → `8.99`
   - Medium, `["Pepperoni"]` → `13.49`
   - Large, `["Mushroom", "Extra Cheese"]` → `17.24`
   - Small, `["Pepperoni", "Mushroom", "Extra Cheese"]` → `12.74`
2. Loop over `cases` with a top-level `for` loop, calling `test(...)` once per case **outside** any
   `test()` block (this is what makes each case its own named test in the report, not just an
   assertion inside one big test). Each generated test should navigate to `/pizza/margherita`,
   select the size, check the toppings, and assert `data-testid="unit-price"` shows the expected
   total.
3. Wrap the three interaction steps (select size / check toppings / read price) in `test.step()`
   calls so the HTML report shows a clear breakdown per case.

## Run with different worker counts
```
npx playwright test tests/exercises/11-data-driven-and-parallel --project=chromium --workers=1
npx playwright test tests/exercises/11-data-driven-and-parallel --project=chromium --workers=4
```
Compare the wall-clock time reported at the end. With enough independent test cases and workers,
more workers should finish faster (up to the number of CPU cores you have).

## Check yourself
`tests/solutions/11-data-driven-and-parallel/priced-combinations.spec.ts`

## Stretch goal
Wrap your generated tests in `test.describe.parallel("priced combinations", () => { ... })` and
confirm (via `--workers=4` timing, or the report's timeline) that cases within the same file now
also run concurrently instead of sequentially — describe blocks are sequential within a worker by
default.
