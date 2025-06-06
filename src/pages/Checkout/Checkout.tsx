import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../../app/store";
import { useState } from "react";
import "./Checkout.css";

const Checkout: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handlePurchase = () => {
    setShowModal(true);
    setTimeout(() => {
      dispatch(clearCart());
      sessionStorage.removeItem("cart");
      setShowModal(false);
      navigate("/");
    }, 2000); // Show modal for 2 seconds
  };

  const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

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
                <li className="checkout-product" key={item.id || idx}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="checkout-product-img"
                  />
                  <div className="checkout-product-info">
                    <div className="checkout-product-title">{item.title}</div>
                    <div className="checkout-product-price">${item.price}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="checkout-summary">
          <div style={{ fontWeight: "bold", margin: "1rem 0" }}>
            Total: ${total.toFixed(2)}
          </div>
          {cartItems.length > 0 && (
            <button className="btn-main" onClick={handlePurchase}>
              Purchase
            </button>
          )}
          <button
            className="btn-main"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
      {showModal && (
        <div className="cart-modal-overlay">
          <div className="cart-modal">
            <h2>Thank you for your purchase!</h2>
            <p>Redirecting to home...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
