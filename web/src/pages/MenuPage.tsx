import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPizzas } from "../api";
import type { Pizza } from "../types";

export function MenuPage() {
  const [search, setSearch] = useState("");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [pizzas, setPizzas] = useState<Pizza[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setPizzas(null);
    setError(null);

    const timer = setTimeout(() => {
      fetchPizzas({ search, vegetarian: vegetarianOnly })
        .then((results) => {
          if (!cancelled) setPizzas(results);
        })
        .catch((err: Error) => {
          if (!cancelled) setError(err.message);
        });
    }, 250);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [search, vegetarianOnly]);

  return (
    <main className="menu-page">
      <h1>Our Menu</h1>

      <div className="menu-filters">
        <label htmlFor="pizza-search">Search pizzas</label>
        <input
          id="pizza-search"
          type="text"
          placeholder="Search by name or ingredient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={vegetarianOnly}
            onChange={(e) => setVegetarianOnly(e.target.checked)}
          />
          Vegetarian only
        </label>
      </div>

      {error && (
        <p role="alert" className="error-banner">
          Couldn't load the menu: {error}
        </p>
      )}

      {!error && pizzas === null && (
        <p role="status" className="loading">
          Loading pizzas…
        </p>
      )}

      {!error && pizzas !== null && pizzas.length === 0 && (
        <p className="empty-state">No pizzas match your search.</p>
      )}

      {!error && pizzas !== null && pizzas.length > 0 && (
        <ul className="pizza-grid" data-testid="pizza-grid">
          {pizzas.map((pizza) => (
            <li key={pizza.id} className="pizza-card" data-testid="pizza-card">
              <div className="pizza-swatch" style={{ backgroundColor: pizza.color }} aria-hidden="true" />
              <h2>{pizza.name}</h2>
              {pizza.vegetarian && <span className="badge">Vegetarian</span>}
              <p>{pizza.description}</p>
              <p className="price">From ${pizza.basePrices.S.toFixed(2)}</p>
              <Link to={`/pizza/${pizza.id}`} className="button">
                Customize
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
