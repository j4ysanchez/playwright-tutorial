# Module 06 — API Testing Fundamentals

## Objectives
- Use the `request` fixture (an `APIRequestContext`) to call the API directly, no browser involved.
- Assert on HTTP status codes and JSON response bodies.
- Understand why API tests are dramatically faster than driving the same check through the UI.

## Setup note: the `api` project
Look at `playwright.config.ts` at the repo root. There's a dedicated `api` project that matches
only files named `*.api.spec.ts`, with `baseURL` pointing at the server (port 4000) instead of the
web app (port 5173). The `chromium`/`firefox`/`webkit` projects explicitly *ignore* those files.
That's why this module's file is named `pizzas.api.spec.ts` and not just `pizzas.spec.ts` — it
determines which project picks it up, and it means these tests run **once**, not three times per
browser (a browser engine is irrelevant to a raw HTTP call).

Run just this project:
```
npx playwright test --project=api
```

## Background
Relevant endpoints (see `server/src/routes/pizzas.ts` and `server/src/routes/orders.ts`):
- `GET /api/pizzas` → array of pizzas
- `GET /api/pizzas/:id` → single pizza, 404 if unknown
- `POST /api/orders` → `{ items, customer, couponCode? }` → 201 with the priced order

## Exercises
Fill in `pizzas.api.spec.ts`:

1. `GET /api/pizzas` → assert status `200`, body is an array with more than one item, and every
   item has `id`, `name`, and `basePrices` keys.
2. `GET /api/pizzas/margherita` → assert `name === "Margherita"` and `basePrices.M === 11.99`.
3. `GET /api/pizzas/does-not-exist` → assert status `404` and the error message mentions
   "not found".
4. `POST /api/orders` with one Margherita, size `M`, quantity `2`, no toppings → assert status
   `201`, `body.id` is defined, and `body.total` is strictly greater than `body.subtotal` (tax is
   added on top).

## Check yourself
`tests/solutions/06-api-basics/pizzas.api.spec.ts`

## Stretch goal
Time both a UI test that adds a pizza to the cart via clicking through pages, and an equivalent API
test that does the same via `POST /api/orders`. Compare the two durations in the HTML report.
