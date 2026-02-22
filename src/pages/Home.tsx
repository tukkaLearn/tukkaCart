import type { Product } from "../types/product";
import ProductCard from "../components/ProductCard";
import "./Home.css";
import useFetch from "../hooks/useFetch";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useCallback, useMemo, useState } from "react";
const Home = () => {
  const { data, loading, error } = useFetch<Product[]>(
    "https://fakestoreapi.com/products"
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    if (!data) return [];
    return ["all", ...new Set(data.map((p) => p.category.toLowerCase()))];
  }, [data]);

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((product) => {
      const matchTitle = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      console.log(category);
      const matchCategory =
        category.toLowerCase() === "all" ||
        product.category === category.toLowerCase();

      return matchTitle && matchCategory;
    });
  }, [data, search, category]);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    []
  );

  const handleCategory = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value),
    []
  );
  if (loading) return <Loader />;
  if (error) return <Error message={error} />;
  if (!data) return null;

  return (
    <div>
      <h1>Grab your favorite products</h1>

      <div className="filters">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={handleSearch}
          name="search"
        />

        <select value={category} onChange={handleCategory} name="category">
          {categories.map((cat) => (
            <option key={cat}>{cat.toUpperCase()}</option>
          ))}
        </select>
        <p className="results">{filteredProducts.length} results found</p>
      </div>

      <div className="flex">
        {filteredProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
