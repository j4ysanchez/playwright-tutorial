import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("searching narrows the pizza grid to matching results", async ({ page }) => {
  test.fixme();

  // TODO: fill the "Search pizzas" input with "Margherita"
  // TODO: assert page.getByTestId("pizza-card") has a count of 1
});

test("search result card contains the expected pizza name", async ({ page }) => {
  test.fixme();

  // TODO: fill the search box with "supreme"
  // TODO: get the single matching card (getByTestId("pizza-card"))
  // TODO: assert a heading named "Veggie Supreme" is visible *inside that card*
});

test("vegetarian filter hides non-vegetarian pizzas", async ({ page }) => {
  test.fixme();

  // TODO: check the "Vegetarian only" checkbox (getByLabel)
  // TODO: assert there is no card containing the text "Pepperoni Classic"
});

test("searching for a nonsense term shows the empty state", async ({ page }) => {
  test.fixme();

  // TODO: fill the search box with something that matches nothing, e.g. "zzz999"
  // TODO: assert the text "No pizzas match your search." is visible
  // TODO: assert page.getByTestId("pizza-card") has a count of 0
});
