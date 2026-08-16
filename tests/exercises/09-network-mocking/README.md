# Module 09 — Network Interception & Mocking

## Objectives
- Intercept requests with `page.route()` and fulfill them with custom responses.
- Test UI states that are hard or slow to trigger for real: empty results, server errors, slow
  networks.
- Deterministically test a loading spinner — the reliable fix for Module 05's flaky exercise.

## Background
`page.route(urlPattern, handler)` lets you intercept any request matching the pattern before it
hits the network. Inside the handler you can:
- `route.fulfill({ status, contentType, body })` — respond without ever hitting the real server.
- `route.abort()` — simulate a network failure.
- `route.continue()` — let the request through, optionally after your own delay.

## Exercises
Fill in `mocked-menu.spec.ts`:

1. **Empty state without filtering.** Mock `GET /api/pizzas` to return `200` with body `[]`, then
   `page.goto("/")` and assert the "No pizzas match your search." empty state appears — without
   ever needing a search term that legitimately matches nothing.
2. **Server error.** Mock `GET /api/pizzas` to return `500` with `{ error: "Database is on fire" }`,
   then assert the error banner (`role="alert"`) is visible and contains that message.
3. **Deterministic loading state.** Mock `GET /api/pizzas` so the handler waits (e.g.
   `await new Promise(r => setTimeout(r, 1000))`) before calling `route.continue()`. Now assert the
   loading text (`getByRole("status")`) **is** visible right after `page.goto("/")` — this is the
   same assertion that flaked in Module 05, but now it can't flake, because you control exactly how
   long the response takes.
4. **Mocked order failure.** On the checkout page, mock `POST /api/orders` to return `400` with a
   custom error message, submit the form, and assert that exact message appears in the error
   banner — without needing to find a real payload that the server would reject.

## Check yourself
`tests/solutions/09-network-mocking/mocked-menu.spec.ts`

## Stretch goal
Combine mocking with a real assertion about *what was sent*: intercept `POST /api/orders`, read
`route.request().postDataJSON()` inside the handler, assert it contains the coupon code you typed
in the form, then call `route.continue()` to let the real request proceed.
