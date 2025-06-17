import { useSelector, useDispatch } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../../app/store";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import "./Checkout.css";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      setShowModal(true);
      setTimeout(() => {
        dispatch(clearCart());
        sessionStorage.removeItem("cart");
        setShowModal(false);
        navigate("/");
      }, 2500);
    } else {
      try {
        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          items: cartItems,
          total,
          createdAt: serverTimestamp(),
        });
        setShowModal(true);
        setTimeout(() => {
          dispatch(clearCart());
          sessionStorage.removeItem("cart");
          setShowModal(false);
          navigate("/");
        }, 2500);
      } catch {
        alert("Failed to place order.");
      }
    }
  };

  // Calculate total using quantity
  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="checkout-content">
        <div className="checkout-products">
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {cartItems.map((item, idx) => (
                <li className="checkout-product" key={item.product.id || idx}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="checkout-product-img"
                  />
                  <div className="checkout-product-info">
                    <div className="checkout-product-title">
                      {item.product.title}
                    </div>
                    <div className="checkout-quantity-controls">
                      <button
                        className="btn-main checkout-qty-btn"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.product.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="checkout-qty-value">
                        {item.quantity}
                      </span>
                      <button
                        className="btn-main checkout-qty-btn"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.product.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                      <button
                        className="btn-main checkout-remove-btn"
                        onClick={() =>
                          dispatch(removeFromCart(item.product.id))
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="checkout-summary">
          <div className="checkout-total">Total: ${total.toFixed(2)}</div>
          {cartItems.length > 0 && (
            <button className="btn-main" onClick={handlePurchase}>
              Purchase
            </button>
          )}
          <button
            className="btn-main checkout-back-btn"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <h2>Thank you for your fake purchase!</h2>
            <br />
            <p>Redirecting to home...</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Checkout;
