# Module 02 — Interactions & Forms

## Objectives
- Drive real user interactions: click, fill, check/uncheck, radio selection.
- Assert derived UI state (a computed price) rather than just "the click happened".

## Background
`/pizza/margherita` is the customize page. It has:
- A `Size` fieldset with radio inputs labeled "Small ($8.99)", "Medium ($11.99)", "Large ($14.99)".
- A `Toppings` fieldset with one checkbox per topping, labeled e.g. "Pepperoni (+$1.50)".
- A quantity stepper: buttons labeled "Decrease quantity" / "Increase quantity", value shown in an
  element with `data-testid="quantity-value"`.
- A running total in an element with `data-testid="unit-price"` (despite the test id, it shows
  `size price + toppings, multiplied by quantity` — read the source at
  `web/src/pages/PizzaDetailPage.tsx` if you want to predict exact numbers).
- An "Add to Cart" button that shows a toast (`data-testid="toast"`) and updates the cart badge
  in the header (`data-testid="cart-badge"`).

## Exercises
Fill in `customize-pizza.spec.ts`:

1. Go directly to `/pizza/margherita` (you don't have to click through the menu every time).
2. Select the "Large" size radio and assert the total price text updates to include `14.99`.
3. Check the "Pepperoni" and "Extra Cheese" topping checkboxes and assert the total price updates
   again (compute the expected number from the base price + both topping prices).
4. Click "Increase quantity" three times, assert the quantity value reads `4`.
5. Click "Add to Cart", assert a toast becomes visible, and assert the header cart badge shows `4`.

## Check yourself
`tests/solutions/02-interactions-and-forms/customize-pizza.spec.ts`

## Stretch goal
Uncheck a topping you just checked and assert the price goes back down. This exercises `.uncheck()`
and forces you to track expected state through multiple interactions instead of just the end state.
