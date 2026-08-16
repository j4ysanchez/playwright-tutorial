import type { Locator, Page } from "@playwright/test";

export class MenuPage {
  constructor(readonly page: Page) {}

  // TODO: implement — navigate to "/"
  async goto() {
    throw new Error("TODO: implement MenuPage.goto()");
  }

  // TODO: implement — fill the "Search pizzas" input with `term`
  async search(term: string) {
    throw new Error("TODO: implement MenuPage.search()");
  }

  // TODO: implement — click/check the "Vegetarian only" checkbox
  async toggleVegetarianOnly() {
    throw new Error("TODO: implement MenuPage.toggleVegetarianOnly()");
  }

  // TODO: implement — return a Locator matching all pizza cards
  get pizzaCards(): Locator {
    throw new Error("TODO: implement MenuPage.pizzaCards");
  }

  // TODO: implement — click "Customize" on the card whose heading matches `pizzaName`
  async customize(pizzaName: string) {
    throw new Error("TODO: implement MenuPage.customize()");
  }
}
