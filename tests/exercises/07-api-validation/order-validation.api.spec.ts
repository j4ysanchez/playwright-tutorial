import { test, expect } from "@playwright/test";

const validItem = { pizzaId: "margherita", size: "M" as const, toppingIds: [] as string[], quantity: 1 };
const validCustomer = { name: "Ada Lovelace", address: "1 Analytical Engine Way", phone: "" };

test("rejects an order with no items", async ({ request }) => {
  test.fixme();

  // TODO: POST /api/orders with items: [] and a valid customer
  // TODO: assert status 400 and error mentions "at least one item"
});

test("rejects an order with a missing customer name", async ({ request }) => {
  test.fixme();

  // TODO: POST /api/orders with items: [validItem] and customer: { ...validCustomer, name: "" }
  // TODO: assert status 400
});

test("rejects an order referencing an unknown pizza", async ({ request }) => {
  test.fixme();

  // TODO: POST /api/orders with an item whose pizzaId is "pizza-that-does-not-exist"
  // TODO: assert status 400
});

test("rejects an invalid coupon code", async ({ request }) => {
  test.fixme();

  // TODO: POST /api/orders with couponCode: "NOTAREALCODE"
  // TODO: assert status 400 and error mentions "Invalid coupon code"
});

test("data-driven: several invalid payloads all return 400 with the right message", async ({ request }) => {
  test.fixme();

  // TODO: build an array of cases, each with a `body` (full request payload) and an
  // `expectedErrorSubstring`, covering the four scenarios above. Loop over them with a
  // `for (const case of cases)` and assert each one inside `await test.step(case.name, ...)`.
});
