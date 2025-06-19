import type { Product } from "../../types/types";
import "./cart.css";

interface CartModalProps {
  cartItems: { product: Product; quantity: number }[];
  cartTotal: number;
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

const CartModalContent: React.FC<CartModalProps> = ({
  cartItems,
  cartTotal,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onCheckout,
}) => (
  <>
    <h2 className="cart-modal-header">Your Cart</h2>
    {cartItems.length === 0 ? (
      <h4 className="cart-modal-empty">Your cart is empty.</h4>
    ) : (
      <>
        <ul className="cart-modal-list">
          {cartItems.map((item, idx) => (
            <li key={item.product.id || idx} className="cart-modal-item">
              <div className="cart-modal-img-col">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="cart-modal-img"
                />
              </div>
              <div className="cart-modal-details-col">
                <p className="cart-modal-title">{item.product.title}</p>
                <div className="cart-modal-price">
                  ${(Number(item.product.price) * item.quantity).toFixed(2)}
                </div>
                <div className="cart-modal-controls-row">
                  <button
                    className="btn-main cart-modal-qty-btn"
                    onClick={() =>
                      onUpdateQuantity(
                        String(item.product.id),
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="cart-modal-qty-value">{item.quantity}</span>
                  <button
                    className="btn-main cart-modal-qty-btn"
                    onClick={() =>
                      onUpdateQuantity(
                        String(item.product.id),
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                  <button
                    className="btn-main cart-modal-remove-btn"
                    onClick={() => onRemoveFromCart(String(item.product.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="cart-modal-footer">
          <div className="cart-modal-total">Total: ${cartTotal.toFixed(2)}</div>
          <div className="cart-modal-actions">
            <button
              className="btn-main cart-modal-clear-btn"
              onClick={onClearCart}
            >
              Clear Cart
            </button>
            <button
              className="btn-main cart-modal-checkout-btn"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </>
    )}
  </>
);

export default CartModalContent;
