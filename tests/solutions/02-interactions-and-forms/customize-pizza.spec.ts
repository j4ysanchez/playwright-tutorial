import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/pizza/margherita");
});

test("selecting a size updates the total price", async ({ page }) => {
  await page.getByLabel(/Large/).check();
  await expect(page.getByTestId("unit-price")).toContainText("14.99");
});

test("adding toppings increases the total price", async ({ page }) => {
  await page.getByLabel(/Pepperoni/).check();
  await page.getByLabel(/Extra Cheese/).check();

  // Medium base (11.99) + Pepperoni (1.50) + Extra Cheese (1.25)
  await expect(page.getByTestId("unit-price")).toContainText("14.74");
});

test("quantity stepper updates the displayed quantity", async ({ page }) => {
  const increase = page.getByRole("button", { name: "Increase quantity" });
  await increase.click();
  await increase.click();
  await increase.click();

  await expect(page.getByTestId("quantity-value")).toHaveText("4");
});

test("add to cart shows a toast and updates the cart badge", async ({ page }) => {
  const increase = page.getByRole("button", { name: "Increase quantity" });
  await increase.click();
  await increase.click();
  await increase.click();

  await page.getByRole("button", { name: "Add to Cart" }).click();

  await expect(page.getByTestId("toast")).toBeVisible();
  await expect(page.getByTestId("cart-badge")).toHaveText("4");
});
