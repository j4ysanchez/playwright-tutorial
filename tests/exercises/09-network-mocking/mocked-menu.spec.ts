import { test, expect } from "@playwright/test";

test("mocked empty pizza list shows the empty state", async ({ page }) => {
  test.fixme();

  // TODO: page.route("**/api/pizzas*", route => route.fulfill({ status: 200, json: [] }))
  // TODO: page.goto("/")
  // TODO: assert the empty-state text is visible
});

test("mocked server error shows the error banner", async ({ page }) => {
  test.fixme();

  // TODO: page.route("**/api/pizzas*", route => route.fulfill({ status: 500, json: { error: "Database is on fire" } }))
  // TODO: page.goto("/")
  // TODO: assert page.getByRole("alert") contains "Database is on fire"
});

test("deterministically observe the loading state with a controlled delay", async ({ page }) => {
  test.fixme();

  // TODO: page.route("**/api/pizzas*", async route => {
  //         await new Promise(resolve => setTimeout(resolve, 1000));
  //         await route.continue();
  //       });
  // TODO: page.goto("/")
  // TODO: assert page.getByRole("status") is visible (this can no longer flake)
});

test("mocked order submission failure shows the server's error message", async ({ page }) => {
  test.fixme();

  // TODO: get a pizza into the cart and land on /checkout (real UI steps, no mocking needed here)
  // TODO: page.route("**/api/orders", route => route.fulfill({ status: 400, json: { error: "Kitchen is closed" } }))
  // TODO: fill in name + address, click "Place order"
  // TODO: assert the error banner shows "Kitchen is closed"
});
