import type { Locator, Page } from "@playwright/test";

export class MenuPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto("/");
  }

  async search(term: string) {
    await this.page.getByLabel("Search pizzas").fill(term);
  }

  async toggleVegetarianOnly() {
    await this.page.getByLabel("Vegetarian only").check();
  }

  get pizzaCards(): Locator {
    return this.page.getByTestId("pizza-card");
  }

  async customize(pizzaName: string) {
    await this.pizzaCards
      .filter({ hasText: pizzaName })
      .getByRole("link", { name: "Customize" })
      .click();
  }
}
