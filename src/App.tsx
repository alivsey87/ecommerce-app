import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Checkout/Checkout";
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/Modal/Modal";
import CartModalContent from "./features/cart/CartModalContent";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "./features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "./app/store";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "./components/Auth/AuthContext";
import Profile from "./pages/Profile/Profile";

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const [showCartModal, setShowCartModal] = useState(false);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setShowCartModal(true)}
      />
      <Modal isOpen={showCartModal} onClose={() => setShowCartModal(false)}>
        <CartModalContent
          cartItems={cartItems}
          cartTotal={cartTotal}
          onClose={() => setShowCartModal(false)}
          onUpdateQuantity={(id, quantity) =>
            dispatch(updateQuantity({ id, quantity }))
          }
          onRemoveFromCart={(id) => dispatch(removeFromCart(id))}
          onClearCart={() => dispatch(clearCart())}
          onCheckout={() => {
            setShowCartModal(false);
            navigate("/checkout");
          }}
        />
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
