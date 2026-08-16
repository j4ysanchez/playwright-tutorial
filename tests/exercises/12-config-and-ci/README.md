# Module 12 — Configuration, Projects & CI

## Objectives
- Read `playwright.config.ts` end-to-end and know what every option does.
- Add a new browser/device project.
- Understand `trace`, `screenshot`, and `retries`, and get a CI workflow running the suite on push.

## Walk through the existing config
Open `/playwright.config.ts` at the repo root and identify:
- `testDir` — where specs live.
- `webServer` (an array!) — how the API and web app both get started automatically before tests run,
  and how each one's `url` is used as a readiness check.
- `use.baseURL` — why exercise/solution specs can `page.goto("/")` instead of a full URL.
- The `api` project's `testMatch` vs the browser projects' `testIgnore` — this is what routes
  `*.api.spec.ts` files to run once, without a browser, instead of three times.
- `retries` and `trace: "on-first-retry"` — retries only happen in CI (`process.env.CI`), and a
  trace is only captured on the retry, not the first (successful-until-it-isn't) attempt.

## Exercises
This module doesn't have its own spec file — the "test subject" is the config itself.

1. **Add a device project.** Add a fourth entry to the `projects` array using
   `devices["iPad (gen 7)"]` (import `devices` is already there), name it `tablet`, and give it the
   same `testIgnore` as the other browser projects. Run
   `npx playwright test tests/solutions/00-setup --project=tablet` to confirm it launches against a
   tablet viewport.
2. **Force a failing test and inspect the trace.** Temporarily change an assertion in any solution
   spec to something false, run it with `--trace=on` (overriding the config), let it fail, then:
   ```
   npx playwright show-trace test-results/<failed-test-folder>/trace.zip
   ```
   Look at the Actions, Network, and Console tabs. Revert your change afterward.
3. **CI.** Read `.github/workflows/playwright.yml` (already added to the repo for you) and explain
   in your own words, line by line, what each step does. It installs dependencies, installs
   browsers, runs the full suite, and uploads the HTML report as a build artifact even on failure.

## Check yourself
There's no separate "solution config" file — `/playwright.config.ts` already reflects the answer to
exercise 1 once you've made the edit yourself; compare against `git diff` to see just your change.

## Stretch goal
Make the `webkit` project only run in CI (`process.env.CI ? [...] : []` pattern spliced into the
`projects` array) to keep local runs faster, and explain the tradeoff you just made.
