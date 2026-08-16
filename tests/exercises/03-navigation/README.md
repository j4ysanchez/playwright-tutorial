# Module 03 — Navigation & Multi-Page Flows

## Objectives
- Assert on URL changes across a multi-page journey (`expect(page).toHaveURL(...)`).
- Understand what state survives navigation and what doesn't: the cart is persisted to
  `localStorage` (survives reload), but form fields and page-local state are not.
- Use a fresh browser context to get a clean, isolated starting state.

## Background
The full happy path is: `/` → `/pizza/:id` (customize + add to cart) → `/cart` → `/checkout`
(fill form + submit) → `/order/:id` (confirmation, fetched fresh from the server).

`/checkout` redirects to `/cart` if the cart is empty — it's guarded with React Router's
`<Navigate>`.

## Exercises
Fill in `checkout-flow.spec.ts`:

1. **End-to-end happy path.** Starting from `/`, customize any pizza, add it to the cart, go to
   `/cart`, proceed to checkout, fill in name + address, submit, and assert you land on a URL
   matching `/\/order\/.+/` with an "Order Received" heading visible.
2. **Reload persists server state.** On the confirmation page from step 1, reload the page and
   assert the order total is still visible — this data comes from a fresh `GET /api/orders/:id`,
   not client memory.
3. **Removing a cart item.** Add two different pizzas to the cart. On `/cart`, remove one via its
   "Remove" button and assert only one `cart-item` remains and the URL is still `/cart`.
4. **Guarded route.** Every Playwright test already starts with a brand-new, isolated browser
   context — so a test that does nothing but `page.goto("/checkout")` has an empty cart by
   construction. Write that test and assert you're redirected to `/cart`. Add a one-line comment
   in your test explaining *why* you didn't need to clear any state first.

## Check yourself
`tests/solutions/03-navigation/checkout-flow.spec.ts`

## Stretch goal
Prove exercise 4's premise to yourself: in exercise 1's test, after landing on the confirmation
page, open a **second, independent context** with `browser.newContext()` and a **new page** in it,
navigate to `/cart` there, and assert it's empty — even though the first page just placed an order.
This is the same isolation mechanism, made explicit instead of implicit.
