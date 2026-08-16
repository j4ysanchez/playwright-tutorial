import { randomUUID } from "node:crypto";
import { Router } from "express";
import { coupons, pizzas, toppings } from "../data.js";
import type { Order, OrderInput, OrderItem, Size } from "../types.js";

export const ordersRouter = Router();

const orders = new Map<string, Order>();
const VALID_SIZES: Size[] = ["S", "M", "L"];

function validateAndPrice(input: OrderInput): { order?: Order; error?: string } {
  if (!input.items || !Array.isArray(input.items) || input.items.length === 0) {
    return { error: "Order must include at least one item." };
  }

  if (!input.customer?.name?.trim()) {
    return { error: "Customer name is required." };
  }
  if (!input.customer?.address?.trim()) {
    return { error: "Customer address is required." };
  }

  const items: OrderItem[] = [];

  for (const rawItem of input.items) {
    const pizza = pizzas.find((p) => p.id === rawItem.pizzaId);
    if (!pizza) {
      return { error: `Unknown pizza: ${rawItem.pizzaId}` };
    }
    if (!VALID_SIZES.includes(rawItem.size)) {
      return { error: `Invalid size: ${rawItem.size}` };
    }
    if (!Number.isInteger(rawItem.quantity) || rawItem.quantity < 1) {
      return { error: "Quantity must be a positive integer." };
    }

    let unitPrice = pizza.basePrices[rawItem.size];
    for (const toppingId of rawItem.toppingIds ?? []) {
      const topping = toppings.find((t) => t.id === toppingId);
      if (!topping) {
        return { error: `Unknown topping: ${toppingId}` };
      }
      unitPrice += topping.price;
    }

    items.push({
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      size: rawItem.size,
      toppingIds: rawItem.toppingIds ?? [],
      quantity: rawItem.quantity,
      unitPrice: Number(unitPrice.toFixed(2)),
      lineTotal: Number((unitPrice * rawItem.quantity).toFixed(2)),
    });
  }

  const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));

  let discount = 0;
  if (input.couponCode) {
    const coupon = coupons[input.couponCode.toUpperCase()];
    if (!coupon) {
      return { error: `Invalid coupon code: ${input.couponCode}` };
    }
    discount = coupon.type === "percent" ? subtotal * coupon.amount : coupon.amount;
    discount = Number(Math.min(discount, subtotal).toFixed(2));
  }

  const taxed = (subtotal - discount) * 0.08;
  const tax = Number(taxed.toFixed(2));
  const total = Number((subtotal - discount + tax).toFixed(2));

  const order: Order = {
    id: randomUUID(),
    items,
    customer: input.customer,
    couponCode: input.couponCode,
    subtotal,
    discount,
    tax,
    total,
    status: "received",
    createdAt: new Date().toISOString(),
  };

  return { order };
}

ordersRouter.post("/orders", (req, res) => {
  const { order, error } = validateAndPrice(req.body as OrderInput);
  if (error || !order) {
    return res.status(400).json({ error });
  }
  orders.set(order.id, order);
  res.status(201).json(order);
});

ordersRouter.get("/orders/:id", (req, res) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ error: `Order not found: ${req.params.id}` });
  }
  res.json(order);
});

ordersRouter.get("/orders", (_req, res) => {
  res.json([...orders.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
});
