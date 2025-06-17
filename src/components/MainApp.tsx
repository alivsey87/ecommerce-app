import { useState, useMemo, useEffect } from "react";
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
// import Profile from "../pages/Profile/Profile";
import Checkout from "../pages/Checkout/Checkout";
import LoginForm from "./Auth/LoginForm";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import { setUser, clearUser } from "../features/user/userSlice";
import RegistrationForm from "./Auth/RegistrationForm";

const MainLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          dispatch(
            setUser({
              uid: firebaseUser.uid,
              email: userData.email,
              name: userData.name,
            })
          );
        }
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const [showCartModal, setShowCartModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegForm, setShowRegForm] = useState(false);
  const [showError, setShowError] = useState(false);
  
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
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default MainLayout;
