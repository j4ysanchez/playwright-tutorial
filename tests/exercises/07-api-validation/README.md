# Module 07 — API Testing: Validation & Error Cases

## Objectives
- Write negative tests: prove the API rejects bad input with the right status code and message.
- Turn several similar negative cases into one data-driven test instead of copy-pasting.

## Background
`server/src/routes/orders.ts` validates, in order: items non-empty, customer name, customer
address, each item's pizza id, each item's size, each item's quantity, each item's topping ids,
and finally the coupon code. Every failure returns `400` with `{ error: "<message>" }`.

Valid coupon codes: `PIZZA10` (10% off) and `FREESHIP` ($3 off). Anything else is invalid.

## Exercises
Fill in `order-validation.api.spec.ts`:

1. `POST /api/orders` with `items: []` → `400`, error mentions "at least one item".
2. `POST /api/orders` with a valid item but no `customer.name` → `400`.
3. `POST /api/orders` with an unknown `pizzaId` (e.g. `"pizza-that-does-not-exist"`) → `400`.
4. `POST /api/orders` with an invalid `couponCode` (e.g. `"NOTAREALCODE"`) → `400`, error mentions
   "Invalid coupon code".
5. **Data-driven version**: combine cases 1–4 into a single test that loops over an array of
   `{ name, body, expectedErrorSubstring }` cases and asserts each one, instead of four separate
   `test()` blocks. (This foreshadows Module 11.)

## Check yourself
`tests/solutions/07-api-validation/order-validation.api.spec.ts`

## Stretch goal
Add a case for a valid coupon code applied to an order, and assert `discount > 0` in the response —
a positive-path check living alongside your negative-path ones.
