import type { Product } from "../types/product";
import "./ProductCard.css";

type Props = {
  product: Product;
  onAdd: () => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />

      <h3 className="title">
        {product.title.length > 50
          ? product.title.slice(0, 50) + "..."
          : product.title}
      </h3>

      <p className="price">${product.price}</p>

      <button className="btn" onClick={onAdd}>
        Add to Cart
      </button>
    </div>
  );
}
