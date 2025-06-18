import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import type { RootState, AppDispatch } from "../app/store";
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { type Product } from "../types/types";
import AuthListener from "./Auth/AuthListener";
import Navbar from "./Navbar/Navbar";
import Modal from "../components/Modal/Modal";
import LoginForm from "./Auth/LoginForm";
import RegistrationForm from "./Auth/RegistrationForm";
import CartModalContent from "../features/cart/CartModalContent";
import Home from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import Orders from "../pages/Profile/Orders";
import Checkout from "../pages/Checkout/Checkout";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { clearUser } from "../features/user/userSlice";

const MainApp = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.products);

  // Map cart items to include latest product data
  const cartWithProducts = cartItems
    .map((item) => {
      const product = products.find(
        (p) => String(p.id) === String(item.productId)
      );
      if (!product) return null;
      return { product, quantity: item.quantity };
    })
    .filter(Boolean) as { product: Product; quantity: number }[];

  const cartCount = cartWithProducts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const cartTotal = cartWithProducts.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const [showCartModal, setShowCartModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      alert("Logged out!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknown error");
    }
  };

  return (
    <>
      <AuthListener />
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setShowCartModal(true)}
        onRegClick={() => setShowRegForm(true)}
        onLoginClick={() => setShowLoginForm(true)}
        onLogoutClick={handleLogout}
      />
      <Modal isOpen={showLoginForm} onClose={() => setShowLoginForm(false)}>
        <LoginForm onClose={() => setShowLoginForm(false)} />
      </Modal>
      <Modal isOpen={showRegForm} onClose={() => setShowRegForm(false)}>
        <RegistrationForm onClose={() => setShowRegForm(false)} />
      </Modal>
      <Modal isOpen={showCartModal} onClose={() => setShowCartModal(false)}>
        <CartModalContent
          cartItems={cartWithProducts}
          cartTotal={cartTotal}
          onClose={() => setShowCartModal(false)}
          onUpdateQuantity={(id, quantity) =>
            dispatch(updateQuantity({ productId: id, quantity }))
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
        <Route path="/profile/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default MainApp;
