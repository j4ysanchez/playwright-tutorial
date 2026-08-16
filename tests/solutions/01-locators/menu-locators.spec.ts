import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("searching narrows the pizza grid to matching results", async ({ page }) => {
  await page.getByLabel("Search pizzas").fill("Margherita");
  await expect(page.getByTestId("pizza-card")).toHaveCount(1);
});

test("search result card contains the expected pizza name", async ({ page }) => {
  await page.getByLabel("Search pizzas").fill("supreme");

  const card = page.getByTestId("pizza-card");
  await expect(card).toHaveCount(1);
  await expect(card.getByRole("heading", { name: "Veggie Supreme" })).toBeVisible();
});

test("vegetarian filter hides non-vegetarian pizzas", async ({ page }) => {
  await page.getByLabel("Vegetarian only").check();

  const nonVegCard = page.getByTestId("pizza-card").filter({ hasText: "Pepperoni Classic" });
  await expect(nonVegCard).toHaveCount(0);
});

test("searching for a nonsense term shows the empty state", async ({ page }) => {
  await page.getByLabel("Search pizzas").fill("zzz999");

  await expect(page.getByText("No pizzas match your search.")).toBeVisible();
  await expect(page.getByTestId("pizza-card")).toHaveCount(0);
});
