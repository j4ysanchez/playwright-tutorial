import { test, expect } from "@playwright/test";

test("order created via the API renders correctly on the confirmation page", async ({ page, request }) => {
  const response = await request.post("/api/orders", {
    data: {
      items: [{ pizzaId: "margherita", size: "M", toppingIds: [], quantity: 2 }],
      customer: { name: "Ada Lovelace", address: "1 Analytical Engine Way", phone: "" },
    },
  });
  const order = await response.json();

  await page.goto(`/order/${order.id}`);

  await expect(page.getByTestId("order-total")).toContainText(order.total.toFixed(2));
});

test("order placed through the UI is persisted correctly on the server", async ({ page, request }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Customize" }).first().click();
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.getByRole("link", { name: /Cart/ }).click();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();
  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Delivery address").fill("1 Analytical Engine Way");
  await page.getByRole("button", { name: "Place order" }).click();

  await expect(page).toHaveURL(/\/order\/.+/);
  const id = page.url().split("/order/")[1];

  const response = await request.get(`/api/orders/${id}`);
  const order = await response.json();
  expect(order.status).toBe("received");
});
