import { Router } from "express";
import { pizzas, toppings } from "../data.js";

export const pizzasRouter = Router();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// GET /api/pizzas?search=veg&vegetarian=true
pizzasRouter.get("/pizzas", async (req, res) => {
  await delay(200 + Math.random() * 300);

  const search = String(req.query.search ?? "").toLowerCase();
  const vegetarianOnly = req.query.vegetarian === "true";

  const results = pizzas.filter((pizza) => {
    const matchesSearch =
      !search ||
      pizza.name.toLowerCase().includes(search) ||
      pizza.description.toLowerCase().includes(search);
    const matchesDiet = !vegetarianOnly || pizza.vegetarian;
    return matchesSearch && matchesDiet;
  });

  res.json(results);
});

pizzasRouter.get("/pizzas/:id", async (req, res) => {
  await delay(100);
  const pizza = pizzas.find((p) => p.id === req.params.id);
  if (!pizza) {
    return res.status(404).json({ error: `Pizza not found: ${req.params.id}` });
  }
  res.json(pizza);
});

pizzasRouter.get("/toppings", async (_req, res) => {
  await delay(100);
  res.json(toppings);
});
