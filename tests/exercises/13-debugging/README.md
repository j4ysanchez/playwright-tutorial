# Module 13 — Debugging & the Trace Viewer

## Objectives
- Use Playwright Inspector (`--debug`) to step through a test action-by-action.
- Use UI mode's time-travel to inspect DOM snapshots at any point in a run.
- Use the trace viewer to diagnose a failure after the fact, including network and console output.
- Use `codegen` to bootstrap a test from real interactions instead of writing locators from memory.

## Exercise 1: fix the broken tests
`broken.spec.ts` has three tests, each failing for a **different kind of reason**. Don't just stare
at the code — run them with the debugger and let the tool show you:

```
npx playwright test tests/exercises/13-debugging/broken.spec.ts --project=chromium --debug
```

This opens Playwright Inspector and pauses before each action. Step through with the inspector's
"step over" button and watch where reality diverges from what the test expects. Alternatively, use
UI mode for the same run and drag through the timeline:

```
npx playwright test tests/exercises/13-debugging/broken.spec.ts --project=chromium --ui
```

Fix all three tests in place. As a hint about *categories* of bugs (not the specific fixes):
- One test uses a locator that doesn't match anything real on the page.
- One test asserts the wrong expected value (a simple typo/miscalculation).
- One test asserts on something before the action that would make it true has actually happened.

## Exercise 2: record a flow with codegen
Run:
```
npx playwright codegen localhost:5173
```
With the recorder open, add two *different* pizzas to the cart with different sizes, then go to the
cart page. Stop recording, copy the generated code into `recorded.spec.ts` in this folder, and clean
it up: replace brittle generated selectors with the role/label-based locators you've been using all
along, and add a real assertion (e.g. `cart-item` count is 2) — codegen records actions, not
assertions, so you always have to add those yourself.

## Exercise 3: read a trace
Force any solution test to fail (temporarily break an assertion), run it with a trace:
```
npx playwright test tests/solutions/03-navigation --project=chromium --trace=on
npx playwright show-trace test-results/<folder-with-your-failed-test>/trace.zip
```
In the trace viewer, find: the exact action that failed, a screenshot immediately before and after
it, the network requests in flight at that moment, and any `console.log`/`console.error` output.
Revert your deliberate breakage afterward.

## Check yourself
`tests/solutions/13-debugging/broken.spec.ts` has the fixed versions. Try not to look until you've
found all three yourself with the debugger — that's the actual skill this module is teaching.
