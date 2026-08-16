import { test, expect } from "./fixtures";

test("customizing a pizza adds it to the cart, visible via page objects", async ({ menuPage, cartPage }) => {
  await menuPage.goto();
  await menuPage.search("Margherita");
  await menuPage.customize("Margherita");

  await test.step("add to cart", async () => {
    await menuPage.page.getByRole("button", { name: "Add to Cart" }).click();
  });

  await cartPage.goto();
  await expect(cartPage.items).toHaveCount(1);
});

test("vegetarian filter works the same way through the page object", async ({ menuPage }) => {
  await menuPage.goto();
  await menuPage.toggleVegetarianOnly();

  await expect(menuPage.pizzaCards.filter({ hasText: "Pepperoni Classic" })).toHaveCount(0);
});
