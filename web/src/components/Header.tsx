import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export function Header() {
  const { totalCount } = useCart();

  return (
    <header className="site-header">
      <Link to="/" className="logo">
        🍕 Slice House
      </Link>
      <nav>
        <Link to="/">Menu</Link>
        <Link to="/cart" aria-label={`Cart, ${totalCount} item${totalCount === 1 ? "" : "s"}`}>
          Cart
          {totalCount > 0 && (
            <span className="cart-badge" data-testid="cart-badge">
              {totalCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
