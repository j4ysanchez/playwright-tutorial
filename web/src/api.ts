import type { Order, OrderInput, Pizza, Topping } from "./types";

async function parseJsonOrThrow(response: Response) {
  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = (body as { error?: string }).error ?? `Request failed with ${response.status}`;
    throw new Error(message);
  }
  return body;
}

export async function fetchPizzas(params: { search?: string; vegetarian?: boolean } = {}): Promise<Pizza[]> {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.vegetarian) query.set("vegetarian", "true");
  const response = await fetch(`/api/pizzas?${query.toString()}`);
  return parseJsonOrThrow(response);
}

export async function fetchPizza(id: string): Promise<Pizza> {
  const response = await fetch(`/api/pizzas/${id}`);
  return parseJsonOrThrow(response);
}

export async function fetchToppings(): Promise<Topping[]> {
  const response = await fetch(`/api/toppings`);
  return parseJsonOrThrow(response);
}

export async function createOrder(input: OrderInput): Promise<Order> {
  const response = await fetch(`/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return parseJsonOrThrow(response);
}

export async function fetchOrder(id: string): Promise<Order> {
  const response = await fetch(`/api/orders/${id}`);
  return parseJsonOrThrow(response);
}
