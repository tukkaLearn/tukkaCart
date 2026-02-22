import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import "./HomeTemp.css";
const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>Products</h1>

      <div className="flex">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
