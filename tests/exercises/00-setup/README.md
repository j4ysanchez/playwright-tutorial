# Module 00 — Setup & Anatomy of a Test

## Objectives
- Understand the parts of a Playwright test: `test()`, the `page` fixture, navigation, and assertions.
- Run tests in headless, headed, and UI mode.
- Understand how `playwright.config.ts` starts the app for you (`webServer`) and what `baseURL` does.

## Before you start
From the repo root:
```
npm install
npx playwright install   # once, downloads browsers
```
You do **not** need to manually start the server or web app — `playwright.config.ts` boots both
via the `webServer` option and waits for them to be ready before tests run.

## Exercise

Open `home.spec.ts` in this folder and fill in the `TODO`s:

1. Navigate to `/` (the config's `baseURL` means you can just pass `"/"`).
2. Assert the page's `<title>` contains "Slice House".
3. Assert a heading with the accessible name "Our Menu" is visible.

## Run it

```
npx playwright test tests/exercises/00-setup --project=chromium
npx playwright test tests/exercises/00-setup --project=chromium --headed
npx playwright test tests/exercises/00-setup --ui
```

Compare `--headed` (watch Chromium actually open) with the default headless run, then try `--ui`
(Playwright's UI mode) and step through the test action-by-action using the timeline.

## Check yourself
A full solution is in `tests/solutions/00-setup/home.spec.ts`.

## Stretch goal
Run `npx playwright test tests/exercises/00-setup --project=chromium --project=firefox --project=webkit`
and note that the same test runs three times, once per browser engine.
