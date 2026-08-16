import { test, expect, type Page } from "@playwright/test";

async function placeAnOrder(page: Page) {
  await page.goto("/");
  await page.getByRole("link", { name: "Customize" }).first().click();
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.getByRole("link", { name: /Cart/ }).click();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();
  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Delivery address").fill("1 Analytical Engine Way");
  await page.getByRole("button", { name: "Place order" }).click();
}

test("full happy path from menu to order confirmation", async ({ page }) => {
  await placeAnOrder(page);

  await expect(page).toHaveURL(/\/order\/.+/);
  await expect(page.getByRole("heading", { name: "Order Received" })).toBeVisible();
});

test("reloading the confirmation page still shows the order", async ({ page }) => {
  await placeAnOrder(page);
  await expect(page.getByTestId("order-total")).toBeVisible();

  await page.reload();

  await expect(page.getByRole("heading", { name: "Order Received" })).toBeVisible();
  await expect(page.getByTestId("order-total")).toBeVisible();
});

test("removing one of two cart items leaves the other", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Customize" }).nth(0).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.goto("/");
  await page.getByRole("link", { name: "Customize" }).nth(1).click();
  await page.getByRole("button", { name: "Add to Cart" }).click();

  await page.goto("/cart");
  await expect(page.getByTestId("cart-item")).toHaveCount(2);

  await page.getByRole("button", { name: "Remove" }).first().click();

  await expect(page.getByTestId("cart-item")).toHaveCount(1);
  await expect(page).toHaveURL("/cart");
});

test("visiting /checkout with an empty cart redirects to /cart", async ({ page }) => {
  // Every test gets a brand-new browser context with empty localStorage,
  // so the cart is empty here without any explicit setup.
  await page.goto("/checkout");

  await expect(page).toHaveURL("/cart");
});
