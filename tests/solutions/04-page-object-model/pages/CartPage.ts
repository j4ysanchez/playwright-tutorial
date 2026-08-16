import type { Locator, Page } from "@playwright/test";

export class CartPage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto("/cart");
  }

  get items(): Locator {
    return this.page.getByTestId("cart-item");
  }

  async subtotalText(): Promise<string> {
    return (await this.page.getByTestId("cart-subtotal").textContent()) ?? "";
  }

  async proceedToCheckout() {
    await this.page.getByRole("link", { name: "Proceed to Checkout" }).click();
  }
}
