import "./Featured.css";

import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import Loader from "../Loader/Loader";
import Product from "../Product/Product";

const Featured = () => {
  const products = useSelector((state) => state.products);
  const { fetchData, loading } = useProducts();

  useEffect(() => {
    fetchData({ limit: 4 });
  }, []);

  return (
    <div className="music__featured section__container">
      <h2 className="title-style">Featured Products</h2>
      {loading && <Loader />}
      <div className="music__featured-products">
        {loading ||
          products?.map((product) => (
            <Product key={product.id} data={product} />
          ))}
      </div>
    </div>
  );
};
export default Featured;
