import { test, expect } from "@playwright/test";

test("home page loads and shows the menu heading", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Slice House/);
  await expect(page.getByRole("heading", { name: "Our Menu" })).toBeVisible();
});
