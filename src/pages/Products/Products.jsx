import "./Products.css";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Loader, Product } from "../../components";
import { useProducts } from "../../hooks/useProducts";
import Filters from "./Filters/Filters";

const Products = () => {
  const products = useSelector((state) => state.products);
  const { fetchData, loading } = useProducts();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="music__products section__container section__margin">
      <h2 className="title__margin title-style">Our Products</h2>
      {loading && <Loader />}
      <div className="music__products-container">
        <Filters />
        <div className="music__products-all">
          {loading ||
            (products &&
              products?.map((product) => (
                <Product name={product.name} key={product.id} data={product} />
              )))}
        </div>
      </div>
    </div>
  );
};
export default Products;
