import type { Pizza, Topping } from "./types.js";

export const toppings: Topping[] = [
  { id: "pepperoni", name: "Pepperoni", price: 1.5 },
  { id: "mushroom", name: "Mushroom", price: 1.0 },
  { id: "onion", name: "Onion", price: 0.75 },
  { id: "sausage", name: "Sausage", price: 1.5 },
  { id: "extra-cheese", name: "Extra Cheese", price: 1.25 },
  { id: "olives", name: "Black Olives", price: 1.0 },
  { id: "pepper", name: "Bell Pepper", price: 0.75 },
  { id: "pineapple", name: "Pineapple", price: 1.0 },
];

export const pizzas: Pizza[] = [
  {
    id: "margherita",
    slug: "margherita",
    name: "Margherita",
    description: "San Marzano tomatoes, fresh mozzarella, basil.",
    vegetarian: true,
    basePrices: { S: 8.99, M: 11.99, L: 14.99 },
    color: "#e63946",
  },
  {
    id: "pepperoni-classic",
    slug: "pepperoni-classic",
    name: "Pepperoni Classic",
    description: "Loaded with double pepperoni and mozzarella.",
    vegetarian: false,
    basePrices: { S: 9.99, M: 12.99, L: 15.99 },
    color: "#d62828",
  },
  {
    id: "veggie-supreme",
    slug: "veggie-supreme",
    name: "Veggie Supreme",
    description: "Mushroom, onion, bell pepper, olives, extra cheese.",
    vegetarian: true,
    basePrices: { S: 9.49, M: 12.49, L: 15.49 },
    color: "#2a9d8f",
  },
  {
    id: "bbq-chicken",
    slug: "bbq-chicken",
    name: "BBQ Chicken",
    description: "Grilled chicken, red onion, smoky BBQ sauce.",
    vegetarian: false,
    basePrices: { S: 10.49, M: 13.49, L: 16.49 },
    color: "#f4a261",
  },
  {
    id: "hawaiian",
    slug: "hawaiian",
    name: "Hawaiian",
    description: "Ham, pineapple, mozzarella. Controversial, delicious.",
    vegetarian: false,
    basePrices: { S: 9.49, M: 12.49, L: 15.49 },
    color: "#e9c46a",
  },
  {
    id: "quattro-formaggi",
    slug: "quattro-formaggi",
    name: "Quattro Formaggi",
    description: "Mozzarella, gorgonzola, parmesan, fontina.",
    vegetarian: true,
    basePrices: { S: 10.99, M: 13.99, L: 16.99 },
    color: "#f1faee",
  },
];

export const coupons: Record<string, { type: "percent" | "flat"; amount: number; label: string }> = {
  PIZZA10: { type: "percent", amount: 0.1, label: "10% off your order" },
  FREESHIP: { type: "flat", amount: 3.0, label: "$3 off your order" },
};
