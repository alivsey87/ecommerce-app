import type { Product } from "../../types/types";
import { useEffect, useMemo } from "react";
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

  useEffect(() => {
    if (productsData) {
      dispatch(setProducts(productsData));
    }
  }, [productsData, dispatch]);

  return (
    <>
      <div className="bg-color">
        <div className="main-container">
          <div className="filt-container">
            <label htmlFor="category-select" className="cat-label">
              Filter by category
            </label>
            <select
              id="category-select"
              className="cat-select"
              onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
              value={selectedCategory}
            >
              <option value="">All</option>
              {categories?.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="prod-container">
            {filteredProducts.map((product: Product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
