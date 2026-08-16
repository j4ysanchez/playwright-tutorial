# Playwright Learning Plan — Slice House Pizza Ordering App

This repo pairs a small full-stack pizza ordering app (React + TypeScript frontend, Express +
TypeScript API) with a 14-module, progressively harder set of Playwright exercises that test it —
covering end-to-end (browser) testing and API testing as two sides of the same tool.

## How this repo is organized

```
server/                    Express API (menu, toppings, orders)
web/                       React app (Vite) — the UI under test
tests/
  exercises/NN-topic/      Starter files with TODOs + a README per module
  solutions/NN-topic/      Complete, working reference implementations
playwright.config.ts       webServer auto-starts both apps; 4 projects (api/chromium/firefox/webkit)
```

Every module lives in its own folder with a `README.md` explaining the concept, the exact
exercises, and a pointer to its solution. **Read the module README before opening the spec file.**

## Getting started

```
npm install
npx playwright install        # once, downloads browser binaries
```

You never need to manually run `npm run dev` — `playwright.config.ts`'s `webServer` option starts
both the API (port 4000) and the web app (port 5173) automatically and waits for them to be ready.

Run one module:
```
npx playwright test tests/exercises/01-locators --project=chromium
```

Run everything (exercises are allowed to fail/skip until you finish them — that's expected):
```
npm run test:exercises
```

Check your work against the reference implementation:
```
npm run test:solutions
```

## The app under test

"Slice House" — browse a pizza menu (search + vegetarian filter), customize a pizza (size,
toppings, quantity), add it to a cart (persisted in `localStorage`), check out (client + server
validation, coupon codes), and land on an order confirmation page (fetched fresh from the server).
Read `web/src/pages/*.tsx` and `server/src/routes/*.ts` any time an exercise references specific
behavior — the source is short and worth skimming once up front.

## Module map

| # | Module | Core skill | UI or API |
|---|--------|-----------|-----------|
| 00 | [Setup & Anatomy of a Test](tests/exercises/00-setup/README.md) | `test`, `page`, running modes | UI |
| 01 | [Locators & Web-First Assertions](tests/exercises/01-locators/README.md) | role/label/text/testid locators, auto-retrying assertions | UI |
| 02 | [Interactions & Forms](tests/exercises/02-interactions-and-forms/README.md) | click/fill/check, derived UI state | UI |
| 03 | [Navigation & Multi-Page Flows](tests/exercises/03-navigation/README.md) | URL assertions, state across pages, context isolation | UI |
| 04 | [Fixtures & Page Object Model](tests/exercises/04-page-object-model/README.md) | `test.extend`, POM classes | UI |
| 05 | [Async UI: Waiting & Loading States](tests/exercises/05-waiting-and-async/README.md) | auto-waiting, seeing a race condition, fixing it | UI |
| 06 | [API Testing Fundamentals](tests/exercises/06-api-basics/README.md) | `request` fixture, status codes, JSON bodies | API |
| 07 | [API Validation & Error Cases](tests/exercises/07-api-validation/README.md) | negative testing, data-driven cases | API |
| 08 | [Combining API + UI](tests/exercises/08-api-ui-combo/README.md) | seed via API / verify via UI, and the reverse | Both |
| 09 | [Network Interception & Mocking](tests/exercises/09-network-mocking/README.md) | `page.route`, deterministic loading/error states | UI |
| 10 | [Visual Testing & Screenshots](tests/exercises/10-visual-testing/README.md) | `toHaveScreenshot`, masking dynamic content | UI |
| 11 | [Data-Driven Tests & Parallelism](tests/exercises/11-data-driven-and-parallel/README.md) | generating tests from data, `test.step`, workers | UI |
| 12 | [Configuration, Projects & CI](tests/exercises/12-config-and-ci/README.md) | reading/extending `playwright.config.ts`, GitHub Actions | Both |
| 13 | [Debugging & Trace Viewer](tests/exercises/13-debugging/README.md) | Inspector, UI mode, trace viewer, codegen | UI |

## Suggested pacing

This is deliberately front-loaded on UI fundamentals (00–05) before introducing API testing (06–07),
because the API modules lean on request/response vocabulary (status codes, JSON assertions) that's
easier to absorb once you're already comfortable with Playwright's assertion style from the UI side.
Modules 08 onward assume you're fluent in both and start mixing them.

- **Session 1** (~1–1.5h): Modules 00–02. You'll be writing real interactive tests by the end.
- **Session 2** (~1–1.5h): Modules 03–05. This is where flakiness and its causes become concrete —
  don't skip Module 05's "let it fail on purpose" exercise, it's the most important lesson in the
  whole plan.
- **Session 3** (~1h): Modules 06–07. Pure API testing; notice how much faster these run than
  anything in Sessions 1–2.
- **Session 4** (~1–1.5h): Modules 08–09. This is the payoff module for everything before it —
  seeding via API and mocking the network are the two techniques that make test suites fast *and*
  reliable at the same time.
- **Session 5** (~1h, optional/as-needed): Modules 10–13. Each is fairly independent; pick whichever
  is most relevant to your actual project (visual testing if you care about UI regressions, CI if
  you're about to wire this into a pipeline, debugging any time you're stuck).

## After you finish

Ideas for extending the app to practice further, roughly in order of difficulty:
1. **Order history page** (`GET /api/orders` already exists server-side, unused by the UI) — add a
   `/orders` page listing past orders, then write tests for pagination/empty states.
2. **Authentication** — add a minimal login, then explore Playwright's `storageState` to save a
   logged-in session and reuse it across tests without re-logging-in every time.
3. **Accessibility testing** — add `@axe-core/playwright` and assert no serious violations on each
   page.
4. **Component testing** — Playwright also supports mounting individual React components in
   isolation (`@playwright/experimental-ct-react`); try it on `Header.tsx` or `Toast`.
5. **Sharding** — once the suite is large enough, split it across CI jobs with `--shard=1/3` etc.
   and compare total pipeline time against a single job.
