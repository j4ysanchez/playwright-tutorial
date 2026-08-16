# Slice House (web)

React + TypeScript frontend for the Slice House pizza ordering app, built with Vite. It talks to
the Express API in `../server` (proxied under `/api` in dev, see `vite.config.ts`).

This app exists as the target of the Playwright exercises in `../tests` — see
[`../LEARNING_PLAN.md`](../LEARNING_PLAN.md) for the curriculum. You don't need to run this app
manually; `../playwright.config.ts` starts it automatically for test runs.

To run it standalone during development:
```
npm run dev -w server   # in one terminal
npm run dev -w web      # in another
```
