import { test, expect } from "@playwright/test";

const validItem = { pizzaId: "margherita", size: "M" as const, toppingIds: [] as string[], quantity: 1 };
const validCustomer = { name: "Ada Lovelace", address: "1 Analytical Engine Way", phone: "" };

test("rejects an order with no items", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: { items: [], customer: validCustomer },
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).error).toContain("at least one item");
});

test("rejects an order with a missing customer name", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: { items: [validItem], customer: { ...validCustomer, name: "" } },
  });
  expect(response.status()).toBe(400);
});

test("rejects an order referencing an unknown pizza", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: {
      items: [{ ...validItem, pizzaId: "pizza-that-does-not-exist" }],
      customer: validCustomer,
    },
  });
  expect(response.status()).toBe(400);
});

test("rejects an invalid coupon code", async ({ request }) => {
  const response = await request.post("/api/orders", {
    data: { items: [validItem], customer: validCustomer, couponCode: "NOTAREALCODE" },
  });
  expect(response.status()).toBe(400);
  expect((await response.json()).error).toContain("Invalid coupon code");
});

test("data-driven: several invalid payloads all return 400 with the right message", async ({ request }) => {
  const cases = [
    {
      name: "empty items",
      body: { items: [], customer: validCustomer },
      expectedErrorSubstring: "at least one item",
    },
    {
      name: "missing customer name",
      body: { items: [validItem], customer: { ...validCustomer, name: "" } },
      expectedErrorSubstring: "Customer name",
    },
    {
      name: "unknown pizza",
      body: { items: [{ ...validItem, pizzaId: "nope" }], customer: validCustomer },
      expectedErrorSubstring: "Unknown pizza",
    },
    {
      name: "invalid coupon",
      body: { items: [validItem], customer: validCustomer, couponCode: "NOTAREALCODE" },
      expectedErrorSubstring: "Invalid coupon code",
    },
  ];

  for (const testCase of cases) {
    await test.step(testCase.name, async () => {
      const response = await request.post("/api/orders", { data: testCase.body });
      expect(response.status()).toBe(400);
      expect((await response.json()).error).toContain(testCase.expectedErrorSubstring);
    });
  }
});
