// components/ProductModal/ProductModal.tsx
import { useState } from "react";
import Modal from "../Modal/Modal";
import type { Product } from "../../types/types";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
};

const emptyProduct: Product = {
  id: "",
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
  rating: { rate: 0, count: 0 },
  isFirestoreProduct: true,
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
}) => {
  const [product, setProduct] = useState<Product>(initialProduct || emptyProduct);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct((prev) => ({
      ...prev,
      rating: { ...prev.rating, [e.target.name]: Number(e.target.value) },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all fields
    if (
      !product.title ||
      !product.price ||
      !product.description ||
      !product.category ||
      !product.image ||
      !product.rating.rate ||
      !product.rating.count
    ) {
      setError("All fields are required.");
      return;
    }
    setError("");
    onSave(product);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h3>{initialProduct ? "Edit Product" : "Create Product"}</h3>
        <input name="title" value={product.title} onChange={handleChange} placeholder="Title" required />
        <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="Price" required />
        <input name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
        <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" required />
        <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
        <input name="rate" type="number" value={product.rating.rate} onChange={handleRatingChange} placeholder="Rating (rate)" required />
        <input name="count" type="number" value={product.rating.count} onChange={handleRatingChange} placeholder="Rating (count)" required />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">{initialProduct ? "Save Changes" : "Create Product"}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </Modal>
  );
};

export default ProductModal;