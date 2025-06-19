// components/ProductModal/ProductModal.tsx
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import type { Product } from "../../types/types";
import "./ProductModal.css";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialProduct?: Product | null;
  categories: string[];
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

const StarDrawing = (
  <path
    d="M50,5 
       L61,35 
       L95,35 
       L67,57 
       L78,91 
       L50,70 
       L22,91 
       L33,57 
       L5,35 
       L39,35 
       Z"
  />
);

const customStyles = {
  itemShapes: StarDrawing,
  activeFillColor: "#235390",
  inactiveFillColor: "#97ceff",
};

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct,
  categories,
}) => {
  const [product, setProduct] = useState<Product>(
    initialProduct || emptyProduct
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setProduct(initialProduct || emptyProduct);
      setError("");
    }
  }, [isOpen, initialProduct]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
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
      !product.rating.rate
    ) {
      setError("All fields are required.");
      return;
    }
    const productToSave = {
      ...product,
      rating: {
        rate: product.rating.rate,
        count: product.rating.rate,
      },
    };
    setError("");
    onSave(productToSave);
    if (!initialProduct) {
      setProduct(emptyProduct);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form className="main-form" onSubmit={handleSubmit}>
        <h3 className="form-head">
          {initialProduct ? "Edit Product" : "Create Product"}
        </h3>

        <div className="form-row">
          <label className="form-label" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="price">
            Price:
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={product.price === 0 ? "" : product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="category">
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="image">
            Image:
          </label>
          <input
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label" htmlFor="description">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label">Rating:</label>
          <Rating
            style={{ maxWidth: 150 }}
            value={product.rating.rate}
            onChange={(value: number) =>
              setProduct((prev: Product) => ({
                ...prev,
                rating: { ...prev.rating, rate: value },
              }))
            }
            itemStyles={customStyles}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="btns-row">
          <button className="btn-main" type="submit">
            {initialProduct ? "Save Changes" : "Create Product"}
          </button>
          <button className="btn-main" type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
