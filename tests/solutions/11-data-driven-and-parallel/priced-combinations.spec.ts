import { test, expect } from "@playwright/test";

const SIZE_LABELS: Record<"S" | "M" | "L", RegExp> = {
  S: /Small/,
  M: /Medium/,
  L: /Large/,
};

const cases: { size: "S" | "M" | "L"; toppings: string[]; expectedTotal: string }[] = [
  { size: "S", toppings: [], expectedTotal: "8.99" },
  { size: "M", toppings: ["Pepperoni"], expectedTotal: "13.49" },
  { size: "L", toppings: ["Mushroom", "Extra Cheese"], expectedTotal: "17.24" },
  { size: "S", toppings: ["Pepperoni", "Mushroom", "Extra Cheese"], expectedTotal: "12.74" },
];

for (const { size, toppings, expectedTotal } of cases) {
  test(`Margherita, size ${size}, toppings [${toppings.join(", ")}] totals $${expectedTotal}`, async ({
    page,
  }) => {
    await page.goto("/pizza/margherita");

    await test.step(`select size ${size}`, async () => {
      await page.getByLabel(SIZE_LABELS[size]).check();
    });

    await test.step(`check toppings: ${toppings.join(", ") || "(none)"}`, async () => {
      for (const topping of toppings) {
        await page.getByLabel(new RegExp(topping)).check();
      }
    });

    await test.step("assert total price", async () => {
      await expect(page.getByTestId("unit-price")).toContainText(expectedTotal);
    });
  });
}
