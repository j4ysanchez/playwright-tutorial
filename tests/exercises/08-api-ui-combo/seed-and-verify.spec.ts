import { test, expect } from "@playwright/test";

test("order created via the API renders correctly on the confirmation page", async ({ page, request }) => {
  test.fixme();

  // TODO: request.post("/api/orders") with a valid payload (see Module 06/07 for the shape)
  // TODO: read `id` and `total` off the JSON response
  // TODO: page.goto(`/order/${id}`)
  // TODO: assert page.getByTestId("order-total") contains the same total
});

test("order placed through the UI is persisted correctly on the server", async ({ page, request }) => {
  test.fixme();

  // TODO: drive the full checkout flow through the UI (menu -> customize -> cart -> checkout -> submit)
  // TODO: extract the order id from the resulting URL, e.g.:
  //       const url = page.url();
  //       const id = url.split("/order/")[1];
  // TODO: request.get(`/api/orders/${id}`)
  // TODO: assert the JSON response's `status` field is "received"
});
