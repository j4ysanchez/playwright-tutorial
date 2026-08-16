import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/pizza/margherita");
});

test("selecting a size updates the total price", async ({ page }) => {
  test.fixme();

  // TODO: select the "Large" radio via getByLabel(/Large/)
  // TODO: assert page.getByTestId("unit-price") contains "14.99"
});

test("adding toppings increases the total price", async ({ page }) => {
  test.fixme();

  // TODO: check "Pepperoni" and "Extra Cheese" checkboxes via getByLabel
  // TODO: assert the total price reflects base Medium price + both topping prices
  //       (11.99 + 1.50 + 1.25 = 14.74)
});

test("quantity stepper updates the displayed quantity", async ({ page }) => {
  test.fixme();

  // TODO: click "Increase quantity" three times
  // TODO: assert page.getByTestId("quantity-value") has text "4"
});

test("add to cart shows a toast and updates the cart badge", async ({ page }) => {
  test.fixme();

  // TODO: increase quantity to 4 (reuse the previous exercise's steps)
  // TODO: click "Add to Cart"
  // TODO: assert page.getByTestId("toast") is visible
  // TODO: assert page.getByTestId("cart-badge") has text "4"
});
