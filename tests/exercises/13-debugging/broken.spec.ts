import { test, expect } from "@playwright/test";

// Bug category: a locator that doesn't match anything real on the page.
test("add to cart from the pizza detail page", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await page.getByRole("button", { name: "Add to Basket" }).click();
  await expect(page.getByTestId("toast")).toBeVisible();
});

// Bug category: the expected value itself is wrong.
test("selecting Large shows the Large price", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await page.getByLabel(/Large/).check();
  await expect(page.getByTestId("unit-price")).toContainText("13.99");
});

// Bug category: an assertion runs before the action that would make it true.
test("cart badge updates after adding an item", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await expect(page.getByTestId("cart-badge")).toHaveText("1");
  await page.getByRole("button", { name: "Add to Cart" }).click();
});
