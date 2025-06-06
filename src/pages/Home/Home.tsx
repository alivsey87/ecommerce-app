import type { Category, Product } from "../../types/types";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../../api/api";
import {
  setProducts,
  setSelectedCategory,
} from "../../features/products/productSlice";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../../app/store";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { data: productsData } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData));
    }
  }, [productsData, dispatch]);

  const getFilteredProducts = () => {
    if (selectedCategory) {
      return products.filter(
        (product: Product) => product.category === selectedCategory
      );
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  // Modal state for cart
  const [showCartModal, setShowCartModal] = useState(false);

  // Calculate total using quantity
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <>
      <div className="bg-color">
        {/* Sticky Navbar */}
        <nav className="navbar">
          <div className="navbar-left">
            <label htmlFor="category-select" className="navbar-label">
              Filter by category
            </label>
            <select
              id="category-select"
              className="navbar-select"
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              {categories?.map((category: Category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              className="btn-main navbar-btn"
              onClick={() => dispatch(setSelectedCategory(""))}
            >
              Clear Filter
            </button>
          </div>
          <div className="navbar-dropdown">
            <button className="navbar-dropdown-toggle" tabIndex={0}>
              ☰
            </button>
            <div className="navbar-dropdown-menu">
              <select
                id="category-select-mobile"
                className="navbar-select"
                aria-label="Filter by category (mobile)"
                onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
                value={selectedCategory}
              >
                <option value="">All Categories</option>
                {categories?.map((category: Category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                className="btn-main navbar-btn"
                onClick={() => dispatch(setSelectedCategory(""))}
              >
                Clear Filter
              </button>
            </div>
          </div>
          <div className="navbar-right">
            <div
              className="cart-icon-wrapper"
              onClick={() => setShowCartModal(true)}
              title="View Cart"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.293-2.707l1.414 1.414c.195.195.451.293.707.293h12c.552 0 1-.448 1-1s-.448-1-1-1h-11.586l-.707-.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414zm15.293-2.293c0-.552-.448-1-1-1h-13.586l-.707-.707c-.391-.391-1.023-.391-1.414 0s-.391 1.023 0 1.414l2 2c.195.195.451.293.707.293h12c.552 0 1-.448 1-1zm-1-6c0-.552-.448-1-1-1h-10c-.552 0-1 .448-1 1s.448 1 1 1h10c.552 0 1-.448 1-1z"
                  fill="#333"
                />
              </svg>
              <span className="cart-badge">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>
          </div>
        </nav>

        {/* Cart Modal */}
        {showCartModal && (
          <div
            className="cart-modal-overlay"
            onClick={() => setShowCartModal(false)}
          >
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="cart-modal-close"
                onClick={() => setShowCartModal(false)}
                aria-label="Close cart"
              >
                ×
              </button>
              <h2>Your Cart</h2>
              {cartItems.length === 0 ? (
                <h4>Your cart is empty.</h4>
              ) : (
                <>
                  <ul>
                    {cartItems.map((item, idx) => (
                      <li
                        key={item.product.id || idx}
                        style={{ marginBottom: "1rem" }}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            borderRadius: "6px",
                            border: "1px solid #eee",
                            background: "#fafbfc",
                          }}
                        />
                        <br />
                        <p>{item.product.title}</p>
                        <div style={{ marginTop: "0.5rem" }}>
                          <button
                            className="btn-main"
                            style={{
                              padding: "0.3rem 0.8rem",
                              minWidth: "unset",
                            }}
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
                          <span style={{ margin: "0 10px" }}>
                            {item.quantity}
                          </span>
                          <button
                            className="btn-main"
                            style={{
                              padding: "0.3rem 0.8rem",
                              minWidth: "unset",
                            }}
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
                            className="btn-main"
                            style={{
                              marginLeft: "1rem",
                              background: "#e74c3c",
                              color: "#fff",
                              padding: "0.3rem 0.8rem",
                              minWidth: "unset",
                            }}
                            onClick={() =>
                              dispatch(removeFromCart(item.product.id))
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {/* Total Price */}
                  <div style={{ fontWeight: "bold", margin: "2rem 0" }}>
                    Total: ${cartTotal.toFixed(2)}
                  </div>
                  <button
                    className="btn-main"
                    style={{ marginRight: "1rem" }}
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </button>
                  <button
                    className="btn-main"
                    onClick={() => {
                      setShowCartModal(false);
                      navigate("/checkout");
                    }}
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="container">
          {filteredProducts.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
