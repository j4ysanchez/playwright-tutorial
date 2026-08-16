# Module 01 — Locators & Web-First Assertions

## Objectives
- Use role/label/text/test-id locators, and understand when to reach for each.
- Understand that `expect(locator)...` assertions auto-retry until they pass or time out —
  you're asserting on a *live query*, not a snapshot.
- Scope and filter locators instead of writing brittle CSS selectors.

## Background
The menu page (`/`) renders pizzas fetched from the API. Each card is:
```html
<li class="pizza-card" data-testid="pizza-card">
  <h2>Margherita</h2>
  <span class="badge">Vegetarian</span>   <!-- only if vegetarian -->
  ...
  <a href="/pizza/margherita">Customize</a>
</li>
```
There's a search box labeled "Search pizzas" and a checkbox labeled "Vegetarian only" above the grid.

## Locator strategy cheat sheet
| Use this                          | When                                                             |
|------------------------------------|--------------------------------------------------------------------|
| `getByRole`                        | Default choice — matches how users/assistive tech perceive the page |
| `getByLabel`                       | Form inputs with an associated `<label>`                          |
| `getByText`                        | Plain text content, not an interactive element                    |
| `getByTestId`                      | Last resort, when there's no reasonable accessible name (e.g. a repeated card container) |

## Exercises
Fill in the `TODO`s in `menu-locators.spec.ts`:

1. **Search filters the grid.** Fill the search box with "Margherita" and assert exactly one
   `pizza-card` is visible.
2. **Scoped assertions.** Search for "supreme" and assert the *single* resulting card contains a
   heading named "Veggie Supreme" — locate the heading *inside* the card locator, don't just
   assert page-wide text.
3. **Filter checkbox.** Check "Vegetarian only" with no search term, and assert the non-vegetarian
   "Pepperoni Classic" card is not present (`toHaveCount(0)` scoped by name, or `not.toBeVisible()`).
4. **Empty state.** Search for a nonsense term and assert the text "No pizzas match your search."
   appears, and that zero `pizza-card` elements are rendered.

## Check yourself
`tests/solutions/01-locators/menu-locators.spec.ts`

## Stretch goal
Rewrite exercise 2 two ways: once with `.filter({ hasText: ... })` on the card locator, and once by
scoping `getByRole('heading', ...)` inside the specific card locator. Which reads more clearly to you?
