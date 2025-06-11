import type { Product } from "../../types/types";
import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import Modal from "../../components/Modal/Modal";
import CartModalContent from "../../features/cart/CartModalContent";
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

  const filteredProducts = useMemo(() => {
    if (selectedCategory) {
      return products.filter(
        (product: Product) => product.category === selectedCategory
      );
    }
    return products;
  }, [products, selectedCategory]);

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + Number(item.product.price) * item.quantity,
        0
      ),
    [cartItems]
  );

  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData));
    }
  }, [productsData, dispatch]);

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
