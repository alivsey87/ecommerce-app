import type { Category, Product } from "../../types/types";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../../api/api";
import {
  setProducts,
  setSelectedCategory,
} from "../../features/products/productSlice";
import type { RootState, AppDispatch } from "../../app/store";

const Home: React.FC = () => {
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

  return (
    <>
      <div className="bg-color">
        <div className="cat-controls">
          <label htmlFor="category-select">Filter by category</label>
          <select
            id="category-select"
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
            className="btn-main"
            onClick={() => dispatch(setSelectedCategory(""))}
          >
            Clear Filter
          </button>
          <div className="cart-status">Cart Items: {cartItems.length}</div>
        </div>

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
