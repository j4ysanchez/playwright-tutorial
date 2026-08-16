import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchPizza, fetchToppings } from "../api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import type { Pizza, Size, Topping } from "../types";

const SIZES: { value: Size; label: string }[] = [
  { value: "S", label: "Small" },
  { value: "M", label: "Medium" },
  { value: "L", label: "Large" },
];

export function PizzaDetailPage() {
  const { id = "" } = useParams();
  const cart = useCart();
  const toast = useToast();

  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [size, setSize] = useState<Size>("M");
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setPizza(null);
    setError(null);
    setSize("M");
    setToppingIds([]);
    setQuantity(1);

    Promise.all([fetchPizza(id), fetchToppings()])
      .then(([pizzaResult, toppingsResult]) => {
        setPizza(pizzaResult);
        setToppings(toppingsResult);
      })
      .catch((err: Error) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main className="pizza-detail-page">
        <p role="alert" className="error-banner">
          {error}
        </p>
        <Link to="/">Back to menu</Link>
      </main>
    );
  }

  if (!pizza) {
    return (
      <main className="pizza-detail-page">
        <p role="status" className="loading">
          Loading…
        </p>
      </main>
    );
  }

  const selectedToppings = toppings.filter((t) => toppingIds.includes(t.id));
  const unitPrice = pizza.basePrices[size] + selectedToppings.reduce((sum, t) => sum + t.price, 0);
  const totalPrice = unitPrice * quantity;

  function toggleTopping(toppingId: string) {
    setToppingIds((current) =>
      current.includes(toppingId) ? current.filter((t) => t !== toppingId) : [...current, toppingId],
    );
  }

  function handleAddToCart() {
    if (!pizza) return;
    cart.addItem({
      pizzaId: pizza.id,
      pizzaName: pizza.name,
      size,
      toppingIds,
      toppingNames: selectedToppings.map((t) => t.name),
      unitPrice: Number(unitPrice.toFixed(2)),
      quantity,
    });
    toast.showToast(`Added ${pizza.name} (${size}) to cart`);
  }

  return (
    <main className="pizza-detail-page">
      <Link to="/">← Back to menu</Link>
      <h1>{pizza.name}</h1>
      <p>{pizza.description}</p>

      <fieldset>
        <legend>Size</legend>
        {SIZES.map(({ value, label }) => (
          <label key={value} className="radio-label">
            <input
              type="radio"
              name="size"
              value={value}
              checked={size === value}
              onChange={() => setSize(value)}
            />
            {label} (${pizza.basePrices[value].toFixed(2)})
          </label>
        ))}
      </fieldset>

      <fieldset>
        <legend>Toppings</legend>
        {toppings.map((topping) => (
          <label key={topping.id} className="checkbox-label">
            <input
              type="checkbox"
              checked={toppingIds.includes(topping.id)}
              onChange={() => toggleTopping(topping.id)}
            />
            {topping.name} (+${topping.price.toFixed(2)})
          </label>
        ))}
      </fieldset>

      <div className="quantity-control">
        <label htmlFor="quantity">Quantity</label>
        <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          −
        </button>
        <span id="quantity" data-testid="quantity-value">
          {quantity}
        </span>
        <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
          +
        </button>
      </div>

      <p className="price" data-testid="unit-price">
        Total: ${totalPrice.toFixed(2)}
      </p>

      <button type="button" className="button" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </main>
  );
}
