import type { Product } from "../../types/types";
import "./ProductCard.css";
import { Rating } from "@smastrom/react-rating";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";

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

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
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
      <button className="btn-main" onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
