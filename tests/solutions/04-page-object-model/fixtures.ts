import { test as base } from "@playwright/test";
import { MenuPage } from "./pages/MenuPage";
import { CartPage } from "./pages/CartPage";

interface Fixtures {
  menuPage: MenuPage;
  cartPage: CartPage;
}

export const test = base.extend<Fixtures>({
  menuPage: async ({ page }, use) => {
    await use(new MenuPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from "@playwright/test";
