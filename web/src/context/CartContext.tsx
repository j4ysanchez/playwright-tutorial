import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { CartItem, Size } from "../types";

const STORAGE_KEY = "pizza-cart";

function cartItemKey(pizzaId: string, size: Size, toppingIds: string[]) {
  return [pizzaId, size, [...toppingIds].sort().join(",")].join("|");
}

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "key">) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem: CartContextValue["addItem"] = (item) => {
    const key = cartItemKey(item.pizzaId, item.size, item.toppingIds);
    setItems((current) => {
      const existing = current.find((i) => i.key === key);
      if (existing) {
        return current.map((i) => (i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i));
      }
      return [...current, { ...item, key }];
    });
  };

  const updateQuantity: CartContextValue["updateQuantity"] = (key, quantity) => {
    setItems((current) =>
      quantity <= 0 ? current.filter((i) => i.key !== key) : current.map((i) => (i.key === key ? { ...i, quantity } : i)),
    );
  };

  const removeItem: CartContextValue["removeItem"] = (key) => {
    setItems((current) => current.filter((i) => i.key !== key));
  };

  const clearCart = () => setItems([]);

  const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => Number(items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2)),
    [items],
  );

  return (
    <CartContext.Provider value={{ items, totalCount, subtotal, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
