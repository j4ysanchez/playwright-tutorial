import { test, expect } from "@playwright/test";

// Fix: the button is actually named "Add to Cart", not "Add to Basket".
test("add to cart from the pizza detail page", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.getByTestId("toast")).toBeVisible();
});

// Fix: Margherita Large is 14.99, not 13.99.
test("selecting Large shows the Large price", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await page.getByLabel(/Large/).check();
  await expect(page.getByTestId("unit-price")).toContainText("14.99");
});

// Fix: the cart badge only renders once the cart is non-empty, so the click has to
// happen before the assertion, not after.
test("cart badge updates after adding an item", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await expect(page.getByTestId("cart-badge")).toHaveText("1");
});
