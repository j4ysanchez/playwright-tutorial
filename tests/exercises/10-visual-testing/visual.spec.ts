import { test, expect } from "@playwright/test";

test("first pizza card matches its visual baseline", async ({ page }) => {
  test.fixme();

  // TODO: page.goto("/")
  // TODO: wait for page.getByTestId("pizza-grid") to be visible
  // TODO: assert page.getByTestId("pizza-card").first() matches toHaveScreenshot()
});

test("confirmation page matches its baseline, with the order id masked", async ({ page }) => {
  test.fixme();

  // TODO: place an order (menu -> customize -> add to cart -> cart -> checkout -> submit)
  // TODO: assert the full page matches toHaveScreenshot with:
  //         { mask: [page.getByTestId("order-id")], fullPage: true }
});
