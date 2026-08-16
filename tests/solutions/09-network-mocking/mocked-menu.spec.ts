import { test, expect } from "@playwright/test";

test("mocked empty pizza list shows the empty state", async ({ page }) => {
  await page.route("**/api/pizzas*", (route) => route.fulfill({ status: 200, json: [] }));

  await page.goto("/");

  await expect(page.getByText("No pizzas match your search.")).toBeVisible();
});

test("mocked server error shows the error banner", async ({ page }) => {
  await page.route("**/api/pizzas*", (route) =>
    route.fulfill({ status: 500, json: { error: "Database is on fire" } }),
  );

  await page.goto("/");

  await expect(page.getByRole("alert")).toContainText("Database is on fire");
});

test("deterministically observe the loading state with a controlled delay", async ({ page }) => {
  await page.route("**/api/pizzas*", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await route.continue();
  });

  await page.goto("/");

  await expect(page.getByRole("status")).toBeVisible();
});

test("mocked order submission failure shows the server's error message", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Customize" }).first().click();
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.getByRole("link", { name: /Cart/ }).click();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();

  await page.route("**/api/orders", (route) =>
    route.fulfill({ status: 400, json: { error: "Kitchen is closed" } }),
  );

  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Delivery address").fill("1 Analytical Engine Way");
  await page.getByRole("button", { name: "Place order" }).click();

  await expect(page.getByRole("alert")).toContainText("Kitchen is closed");
});
