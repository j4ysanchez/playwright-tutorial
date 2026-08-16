import { test, expect } from "@playwright/test";

test("full happy path from menu to order confirmation", async ({ page }) => {
  test.fixme();

  // TODO: go to "/"
  // TODO: click "Customize" on the first pizza card
  // TODO: click "Add to Cart"
  // TODO: navigate to the cart (click the "Cart" link)
  // TODO: click "Proceed to Checkout"
  // TODO: fill in "Full name" and "Delivery address"
  // TODO: click "Place order"
  // TODO: assert page URL matches /\/order\/.+/
  // TODO: assert a heading named "Order Received" is visible
});

test("reloading the confirmation page still shows the order", async ({ page }) => {
  test.fixme();

  // TODO: repeat (or extract a helper for) the happy path above to reach /order/:id
  // TODO: page.reload()
  // TODO: assert the "Order Received" heading and order total are still visible
});

test("removing one of two cart items leaves the other", async ({ page }) => {
  test.fixme();

  // TODO: add one pizza to the cart, then go back to "/" and add a *different* pizza
  // TODO: go to "/cart" and assert 2 cart-item elements
  // TODO: click the first "Remove" button
  // TODO: assert 1 cart-item element remains and the URL is still "/cart"
});

test("visiting /checkout with an empty cart redirects to /cart", async ({ page }) => {
  test.fixme();

  // TODO: go directly to "/checkout" (no need to add anything to the cart first — why?)
  // TODO: assert the resulting URL is "/cart"
});
