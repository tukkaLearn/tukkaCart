import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import useFetch from "../hooks/useFetch";
import Error from "../components/Error";
import Loader from "../components/Loader";
const Home = () => {
  const { data, loading, error } = useFetch<Product[]>(
    "https://fakestoreapi.com/products"
  );
  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!data) return null;

  return (
    <div>
      <h1>Products</h1>

      <div className="flex">
        {data.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
