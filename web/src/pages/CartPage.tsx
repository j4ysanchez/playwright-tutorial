import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <main className="cart-page">
        <h1>Your Cart</h1>
        <p className="empty-state">Your cart is empty.</p>
        <Link to="/" className="button">
          Browse the menu
        </Link>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.key} className="cart-item" data-testid="cart-item">
            <div>
              <h2>
                {item.pizzaName} ({item.size})
              </h2>
              {item.toppingNames.length > 0 && <p className="toppings-list">{item.toppingNames.join(", ")}</p>}
              <p className="price">${item.unitPrice.toFixed(2)} each</p>
            </div>

            <div className="quantity-control">
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.pizzaName}`}
                onClick={() => updateQuantity(item.key, item.quantity - 1)}
              >
                −
              </button>
              <span data-testid="quantity-value">{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${item.pizzaName}`}
                onClick={() => updateQuantity(item.key, item.quantity + 1)}
              >
                +
              </button>
            </div>

            <p className="line-total">${(item.unitPrice * item.quantity).toFixed(2)}</p>

            <button type="button" className="link-button" onClick={() => removeItem(item.key)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p>
          Subtotal: <strong data-testid="cart-subtotal">${subtotal.toFixed(2)}</strong>
        </p>
        <Link to="/checkout" className="button">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}
