import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import CartModalContent from "../features/cart/CartModalContent";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../app/store";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Checkout from "../pages/Checkout/Checkout";
import LoginForm from "./Auth/LoginForm";
import { useAuth } from "../components/Auth/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";

const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
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
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      alert("Logged out!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknown error");
    }
  };

  return (
    <>
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setShowCartModal(true)}
        onLoginClick={() => setShowLoginForm(true)}
        onLogoutClick={handleLogout}
      />
      <Modal isOpen={showLoginForm} onClose={() => setShowLoginForm(false)}>
        <LoginForm onClose={() => setShowLoginForm(false)} />
      </Modal>
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
      <Modal isOpen={showError} onClose={() => setShowError(false)}>
        <p>{error}</p>
      </Modal>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default MainLayout;
