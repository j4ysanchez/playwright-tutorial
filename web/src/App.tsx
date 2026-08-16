import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { MenuPage } from "./pages/MenuPage";
import { PizzaDetailPage } from "./pages/PizzaDetailPage";

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/pizza/:id" element={<PizzaDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/:id" element={<ConfirmationPage />} />
        </Routes>
      </ToastProvider>
    </CartProvider>
  );
}
