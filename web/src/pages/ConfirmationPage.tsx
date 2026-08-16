import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchOrder } from "../api";
import type { Order } from "../types";

export function ConfirmationPage() {
  const { id = "" } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setOrder(null);
    setError(null);
    fetchOrder(id)
      .then(setOrder)
      .catch((err: Error) => setError(err.message));
  }, [id]);

  if (error) {
    return (
      <main className="confirmation-page">
        <p role="alert" className="error-banner">
          {error}
        </p>
        <Link to="/">Back to menu</Link>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="confirmation-page">
        <p role="status" className="loading">
          Loading order…
        </p>
      </main>
    );
  }

  return (
    <main className="confirmation-page">
      <h1>Order Received</h1>
      <p data-testid="order-status" className="badge">
        {order.status}
      </p>
      <p>
        Order ID: <code data-testid="order-id">{order.id}</code>
      </p>

      <ul className="cart-list">
        {order.items.map((item, index) => (
          <li key={index} className="cart-item">
            <div>
              <h2>
                {item.pizzaName} ({item.size}) × {item.quantity}
              </h2>
            </div>
            <p className="line-total">${item.lineTotal.toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <p>Subtotal: ${order.subtotal.toFixed(2)}</p>
        {order.discount > 0 && <p>Discount: -${order.discount.toFixed(2)}</p>}
        <p>Tax: ${order.tax.toFixed(2)}</p>
        <p>
          Total: <strong data-testid="order-total">${order.total.toFixed(2)}</strong>
        </p>
      </div>

      <h2>Delivering to</h2>
      <p>{order.customer.name}</p>
      <p>{order.customer.address}</p>

      <Link to="/" className="button">
        Order more pizza
      </Link>
    </main>
  );
}
