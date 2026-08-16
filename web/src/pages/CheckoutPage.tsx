import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { createOrder } from "../api";
import { useCart } from "../context/CartContext";
import type { OrderItemInput } from "../types";

interface FieldErrors {
  name?: string;
  address?: string;
}

export function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [couponCode, setCouponCode] = useState("");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (cart.items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!address.trim()) errors.address = "Address is required.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    const items: OrderItemInput[] = cart.items.map((item) => ({
      pizzaId: item.pizzaId,
      size: item.size,
      toppingIds: item.toppingIds,
      quantity: item.quantity,
    }));

    setSubmitting(true);
    try {
      const order = await createOrder({
        items,
        customer: { name, address, phone },
        couponCode: couponCode.trim() || undefined,
      });
      // Navigate away before clearing the cart: CheckoutPage redirects to /cart
      // whenever the cart is empty, so clearing first can race that guard against
      // this navigation and bounce the user back to /cart instead of the order.
      navigate(`/order/${order.id}`);
      cart.clearCart();
    } catch (err) {
      setSubmitError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      {submitError && (
        <p role="alert" className="error-banner">
          {submitError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="customer-name">Full name</label>
          <input id="customer-name" value={name} onChange={(e) => setName(e.target.value)} />
          {fieldErrors.name && (
            <span role="alert" className="field-error">
              {fieldErrors.name}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="customer-address">Delivery address</label>
          <input id="customer-address" value={address} onChange={(e) => setAddress(e.target.value)} />
          {fieldErrors.address && (
            <span role="alert" className="field-error">
              {fieldErrors.address}
            </span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="customer-phone">Phone (optional)</label>
          <input id="customer-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>

        <div className="form-field">
          <label htmlFor="coupon-code">Coupon code (optional)</label>
          <input
            id="coupon-code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="e.g. PIZZA10"
          />
        </div>

        <div className="cart-summary">
          <p>
            Subtotal: <strong data-testid="cart-subtotal">${cart.subtotal.toFixed(2)}</strong>
          </p>
        </div>

        <button type="submit" className="button" disabled={submitting}>
          {submitting ? "Placing order…" : "Place order"}
        </button>
      </form>
    </main>
  );
}
