# Module 08 — Combining API + UI Tests

## Objectives
- Use the API to set up state fast, and the browser only to test the behavior you actually care
  about ("seed via API, verify via UI").
- Use the API to verify that a UI action produced the correct server-side result ("act via UI,
  verify via API").

## Why this matters
Clicking through the menu → customize → cart → checkout flow just to test "does the confirmation
page render the total correctly" is slow and couples an unrelated flow (adding to cart) to the
thing under test (the confirmation page). If you can create an order directly via the API, your
confirmation-page test gets faster and more focused.

The reverse is also useful: after a UI-driven checkout, hitting the API to fetch the raw persisted
order is a stronger check than eyeballing the rendered page — it confirms the *data*, not just its
formatting.

Note: these tests use both `page` and `request` in the same test, so unlike Modules 06–07 they are
plain `*.spec.ts` files (not `*.api.spec.ts`) and run through the browser projects. The Vite dev
server proxies `/api/*` to the Express server (see `web/vite.config.ts`), so `request.post("/api/orders")`
reaches the real backend either way.

## Exercises
Fill in `seed-and-verify.spec.ts`:

1. **Seed via API, verify via UI.** Use `request.post("/api/orders")` to create an order directly
   (skip the cart/checkout UI entirely). Take the returned `id`, `page.goto` to `/order/:id`, and
   assert the rendered total matches the API response's `total`.
2. **Act via UI, verify via API.** Drive the full checkout flow through the UI (as in Module 03).
   After landing on the confirmation page, read the order id out of the URL
   (`page.url()` or `expect(page).toHaveURL(...)` with a capture group), then use
   `request.get("/api/orders/:id")` to fetch the same order from the server and assert its
   `status` is `"received"`.

## Check yourself
`tests/solutions/08-api-ui-combo/seed-and-verify.spec.ts`

## Stretch goal
Seed three different orders via the API in a `beforeEach`, then write a UI test against
`GET /api/orders` output shape (no UI for an order list exists yet — this is intentionally an
API-only assertion) confirming the newest order comes first.
