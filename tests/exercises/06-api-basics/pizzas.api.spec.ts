import { test, expect } from "@playwright/test";

test("GET /api/pizzas returns a non-empty list of pizzas", async ({ request }) => {
  test.fixme();

  // TODO: const response = await request.get("/api/pizzas");
  // TODO: assert response.ok() (or response.status() === 200)
  // TODO: const body = await response.json();
  // TODO: assert Array.isArray(body) && body.length > 1
  // TODO: assert body[0] has id/name/basePrices keys
});

test("GET /api/pizzas/margherita returns the expected pizza", async ({ request }) => {
  test.fixme();

  // TODO: GET /api/pizzas/margherita
  // TODO: assert body.name === "Margherita"
  // TODO: assert body.basePrices.M === 11.99
});

test("GET /api/pizzas/:id 404s for an unknown id", async ({ request }) => {
  test.fixme();

  // TODO: GET /api/pizzas/does-not-exist
  // TODO: assert response.status() === 404
  // TODO: assert body.error contains "not found"
});

test("POST /api/orders creates a priced order", async ({ request }) => {
  test.fixme();

  // TODO: POST /api/orders with:
  //   {
  //     items: [{ pizzaId: "margherita", size: "M", toppingIds: [], quantity: 2 }],
  //     customer: { name: "Ada Lovelace", address: "1 Analytical Engine Way", phone: "" },
  //   }
  // TODO: assert response.status() === 201
  // TODO: assert body.id is truthy
  // TODO: assert body.total > body.subtotal
});
