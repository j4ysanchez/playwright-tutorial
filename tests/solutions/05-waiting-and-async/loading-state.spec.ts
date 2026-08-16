import { test, expect } from "@playwright/test";

// This test is intentionally left failing-sometimes. It's not "fixed" because there is no fix
// that keeps its premise — asserting on a fast-resolving loading indicator without controlling
// the network is inherently racy. Module 09 shows the correct way to test this deterministically
// by mocking the route's timing instead of racing the real server.
test.skip("flaky: loading text is visible immediately after navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("status")).toBeVisible();
});

test("reliable: the pizza grid eventually becomes visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByTestId("pizza-grid")).toBeVisible();
});

test("toast appears after add-to-cart and disappears on its own", async ({ page }) => {
  await page.goto("/pizza/margherita");
  await page.getByRole("button", { name: "Add to Cart" }).click();

  const toast = page.getByTestId("toast");
  await expect(toast).toBeVisible();
  await expect(toast).toBeHidden({ timeout: 4000 });
});
