import { test, expect } from "@playwright/test";

test("first pizza card matches its visual baseline", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("pizza-grid")).toBeVisible();

  await expect(page.getByTestId("pizza-card").first()).toHaveScreenshot("pizza-card.png");
});

test("confirmation page matches its baseline, with the order id masked", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Customize" }).first().click();
  await page.getByRole("button", { name: "Add to Cart" }).click();
  await page.getByRole("link", { name: /Cart/ }).click();
  await page.getByRole("link", { name: "Proceed to Checkout" }).click();
  await page.getByLabel("Full name").fill("Ada Lovelace");
  await page.getByLabel("Delivery address").fill("1 Analytical Engine Way");
  await page.getByRole("button", { name: "Place order" }).click();

  await expect(page).toHaveScreenshot("confirmation-page.png", {
    mask: [page.getByTestId("order-id")],
    fullPage: true,
  });
});
