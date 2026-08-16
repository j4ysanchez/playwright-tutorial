# Module 04 — Test Structure: Fixtures & Page Object Model

## Objectives
- Extract repeated locator/interaction logic into Page Object classes.
- Use `test.extend()` to create custom fixtures that hand your test ready-to-use page objects
  instead of constructing them by hand in every test.

## Why bother?
Modules 01–03 worked, but every test re-typed `page.getByLabel("Search pizzas")`,
`page.getByRole("link", { name: "Customize" })`, etc. When the UI changes, you'd have to fix every
test individually. A Page Object centralizes "how do I do X on this page" in one class; tests
become readable descriptions of *behavior*, not *DOM plumbing*.

## Files in this module
- `pages/MenuPage.ts` — **TODO**: fill in the methods.
- `pages/CartPage.ts` — **TODO**: fill in the methods.
- `fixtures.ts` — already wired up for you (`base.extend<Fixtures>({...})`, registering `menuPage`
  and `cartPage` as fixtures). Read it anyway — this is the pattern you'd copy for any new page
  object you add later.
- `pom-flow.spec.ts` — already written *against* those fixtures. It destructures
  `{ menuPage, cartPage }` from its test callback the same way you'd destructure `{ page }`. It
  won't pass until you implement the two page object files above — read it first, it tells you
  exactly what API your page objects need to expose.

## Exercises
1. Implement `MenuPage` in `pages/MenuPage.ts`:
   - `goto()`
   - `search(term: string)`
   - `toggleVegetarianOnly()`
   - `pizzaCards` (a `Locator` getter)
   - `customize(pizzaName: string)` — clicks "Customize" on the card with that name
2. Implement `CartPage` in `pages/CartPage.ts`:
   - `goto()`
   - `items` (a `Locator` getter)
   - `subtotalText()` — returns the subtotal's text content
   - `proceedToCheckout()`
3. Run `pom-flow.spec.ts` and get it green.

## Check yourself
`tests/solutions/04-page-object-model/` has a complete, working version of all four files.

## Stretch goal
Add a `PizzaDetailPage` page object (covering the size/topping/quantity controls from Module 02)
and a third fixture for it.
