import type { Product } from "../../types/types";
import { useEffect, useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../../api/api";
import {
  setProducts,
  setSelectedCategory,
} from "../../features/products/productSlice";
import ProductModal from "../../components/ProductModal/ProductModal";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import type { RootState, AppDispatch } from "../../app/store";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const selectedCategory = useSelector(
    (state: RootState) => state.products.selectedCategory
  );
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

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

  // Handler to create product
  const handleCreateProduct = async (product: Product) => {
    await addDoc(collection(db, "products"), {
      ...product,
      isFirestoreProduct: true,
    });
    // Fetch updated products from Firestore and update global state
    fetchFirestoreProducts();
    setShowProductModal(false);
  };

  // Handler to edit product
  const handleEditProduct = async (product: Product) => {
    if (!product.id) return;
    await updateDoc(doc(db, "products", String(product.id)), {
      ...product,
      isFirestoreProduct: true,
    });
    fetchFirestoreProducts();
    setEditProduct(null);
  };

  // Handler to delete product
  const handleDeleteProduct = async (productId: string) => {
    await deleteDoc(doc(db, "products", productId));
    fetchFirestoreProducts();
  };

  // Fetch Firestore products and merge with API products
  const fetchFirestoreProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const firestoreProducts = snapshot.docs.map((doc) => ({
      ...(doc.data() as Product),
      id: doc.id,
      isFirestoreProduct: true,
    }));
    // Merge with API products, but avoid duplicates (optional)
    const apiOnlyProducts = (productsData || []).filter(
      (apiProd: Product) =>
        !firestoreProducts.some((fp) => fp.id === apiProd.id)
    );
    dispatch(setProducts([...firestoreProducts, ...apiOnlyProducts]));
  };

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
      fetchFirestoreProducts();
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
            <button onClick={() => setShowProductModal(true)}>
              Create Product
            </button>
            <ProductModal
              isOpen={showProductModal}
              onClose={() => setShowProductModal(false)}
              onSave={handleCreateProduct}
            />
            {editProduct && (
              <ProductModal
                isOpen={!!editProduct}
                onClose={() => setEditProduct(null)}
                onSave={handleEditProduct}
                initialProduct={editProduct}
              />
            )}
          </div>
          <div className="prod-container">
            {filteredProducts.map((product: Product) => (
              <ProductCard
                product={product}
                key={product.id}
                setEditProduct={setEditProduct}
                handleDeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
