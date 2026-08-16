import { test, expect } from "@playwright/test";

test("GET /api/pizzas returns a non-empty list of pizzas", async ({ request }) => {
  const response = await request.get("/api/pizzas");
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(1);
  expect(body[0]).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      basePrices: expect.any(Object),
    }),
  );
});

test("GET /api/pizzas/margherita returns the expected pizza", async ({ request }) => {
  const response = await request.get("/api/pizzas/margherita");
  const body = await response.json();

  expect(body.name).toBe("Margherita");
  expect(body.basePrices.M).toBe(11.99);
});

test("GET /api/pizzas/:id 404s for an unknown id", async ({ request }) => {
  const response = await request.get("/api/pizzas/does-not-exist");
  expect(response.status()).toBe(404);

  const body = await response.json();
  expect(body.error).toContain("not found");
});

test("POST /api/orders creates a priced order", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: {
      items: [{ pizzaId: "margherita", size: "M", toppingIds: [], quantity: 2 }],
      customer: { name: "Ada Lovelace", address: "1 Analytical Engine Way", phone: "" },
    },
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.id).toBeTruthy();
  expect(body.total).toBeGreaterThan(body.subtotal);
});
