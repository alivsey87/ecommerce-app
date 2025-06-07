import type { Product } from "../../types/types";
import { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import CartModal from "../../components/CartModal/CartModal";
import Navbar from "../../components/Navbar/Navbar";
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
    staleTime: 1000 * 60 * 60,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60,
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

  const [showCartModal, setShowCartModal] = useState(false);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <>
      <div className="bg-color">
        <Navbar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) =>
            dispatch(setSelectedCategory(category))
          }
          onClearFilter={() => dispatch(setSelectedCategory(""))}
          cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setShowCartModal(true)}
        />

        {showCartModal && (
          <CartModal
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
