import { test, expect } from "@playwright/test";

test("flaky: loading text is visible immediately after navigation", async ({ page }) => {
  test.fixme();

  // TODO: page.goto("/") and, with NO wait in between, assert
  // page.getByRole("status") (the "Loading pizzas…" text) is visible.
  // Run with --repeat-each=10 and watch it flake.
});

test("reliable: the pizza grid eventually becomes visible", async ({ page }) => {
  test.fixme();

  // TODO: page.goto("/")
  // TODO: assert page.getByTestId("pizza-grid") is visible
  //       (no assertion at all about the loading state — let auto-waiting do its job)
});

test("toast appears after add-to-cart and disappears on its own", async ({ page }) => {
  test.fixme();

  // TODO: go to /pizza/margherita and click "Add to Cart"
  // TODO: assert the toast (getByTestId("toast")) is visible
  // TODO: assert the toast becomes hidden within ~4s
  //       hint: expect(locator).toBeHidden({ timeout: 4000 })
});
