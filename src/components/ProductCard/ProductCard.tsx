import type { Product } from "../../types/types";
import "./ProductCard.css";
import { Rating } from "@smastrom/react-rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

type ProductCardProps = {
  product: Product;
  setEditProduct: (product: Product) => void;
  handleDeleteProduct: (id: string) => void;
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

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  setEditProduct,
  handleDeleteProduct,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="product-card">
      <h3>{product.title}</h3>
      <h5>{product.category}</h5>
      <p>${product.price}</p>
      <img className="product-image" src={product.image} alt={product.title} />

      <p>{product.description}</p>
      <Rating
        style={{ maxWidth: 150, padding: 10 }}
        value={product.rating.rate}
        itemStyles={customStyles}
        readOnly
      />
      <button
        className="btn-main"
        onClick={() => dispatch(addToCart({ productId: String(product.id) }))}
      >
        Add to Cart
      </button>
      {product.isFirestoreProduct && (
        <div className="edit-btns">
          <button className="btn-main" onClick={() => setEditProduct(product)}>Edit</button>
          <button className="btn-main" onClick={() => handleDeleteProduct(String(product.id))}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
