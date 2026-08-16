import type { Locator, Page } from "@playwright/test";

export class CartPage {
  constructor(readonly page: Page) {}

  // TODO: implement — navigate to "/cart"
  async goto() {
    throw new Error("TODO: implement CartPage.goto()");
  }

  // TODO: implement — return a Locator matching all cart line items
  get items(): Locator {
    throw new Error("TODO: implement CartPage.items");
  }

  // TODO: implement — return the subtotal element's text content
  async subtotalText(): Promise<string> {
    throw new Error("TODO: implement CartPage.subtotalText()");
  }

  // TODO: implement — click "Proceed to Checkout"
  async proceedToCheckout() {
    throw new Error("TODO: implement CartPage.proceedToCheckout()");
  }
}
