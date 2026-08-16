import { test as base } from "@playwright/test";
import { MenuPage } from "./pages/MenuPage";
import { CartPage } from "./pages/CartPage";

interface Fixtures {
  menuPage: MenuPage;
  cartPage: CartPage;
}

// This wiring is done for you — it's boilerplate. Your job in this module is to implement
// MenuPage and CartPage themselves (see pages/MenuPage.ts and pages/CartPage.ts), which is
// where the interesting Page-Object-Model decisions actually live.
export const test = base.extend<Fixtures>({
  menuPage: async ({ page }, use) => {
    await use(new MenuPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from "@playwright/test";
