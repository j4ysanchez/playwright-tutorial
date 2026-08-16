# Module 05 — Async UI: Waiting & Loading States

## Objectives
- Understand Playwright's auto-waiting: `expect(locator)...` polls until the condition is true or
  the timeout expires — you almost never need a manual sleep.
- Recognize a classic race condition, see it fail, and learn the correct fix.
- Learn why `page.waitForTimeout()` is an anti-pattern.

## Background
The API in this app has a small artificial delay (~200–500ms) on `GET /api/pizzas`, specifically so
the menu page's "Loading pizzas…" state (`role="status"`) is visible for a moment before the grid
renders. The "Add to Cart" toast auto-dismisses after 2.5 seconds.

## Exercises

### 1. The flaky way (do this first, on purpose)
In `loading-state.spec.ts`, exercise 1 asserts the loading text is visible **immediately** after
`page.goto("/")`, with no wait at all beforehand. Run it 5–10 times in a loop:
```
npx playwright test tests/exercises/05-waiting-and-async/loading-state.spec.ts -g "flaky" --repeat-each=10 --project=chromium
```
Notice it sometimes fails — by the time your assertion runs, the (fast, local) request may have
already resolved and the loading text is already gone. **This is the point of the exercise**: an
assertion racing a fast network call is inherently unreliable, no matter how "correct" the
locator is.

### 2. The reliable way
Exercise 2 asks you to assert the **end state** directly — the pizza grid is visible — without
asserting anything about the loading indicator's presence. `expect(locator).toBeVisible()` already
retries for up to the default timeout, so it doesn't matter whether the grid took 10ms or 400ms to
appear.

### 3. Toast auto-dismiss
Fill in exercise 3: after adding an item to the cart, assert the toast is visible, then assert it
becomes hidden — using `expect(toast).toBeHidden({ timeout: 4000 })`, not `waitForTimeout(3000)`.
Explain in a comment why the timeout-based wait is worse even if it "works."

## Check yourself
`tests/solutions/05-waiting-and-async/loading-state.spec.ts` (note: the "flaky" test is left as
skipped in the solution — it's *supposed* to be unreliable, that's the lesson, not something to fix)

## Stretch goal
Module 09 (Network Mocking) revisits this exact loading state and shows the *actually* reliable way
to test it deterministically, by controlling the network delay yourself instead of racing the real one.
