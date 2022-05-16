import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Product.css";

const Product = ({ data }) => {
  const [details, setDetails] = useState(false);
  const navigate = useNavigate();

  const { name, id, price, image } = data;

  return (
    <div
      className="music__product"
      onMouseOver={() => setDetails(true)}
      onMouseOut={() => setDetails(false)}
    >
      <div className="music__product-image">
        <img src={image.url} alt={name} />
        <button
          className={`music__product-details btn-style ${
            details && "music__product-details--show"
          }`}
          onClick={() => navigate(`/products/${id}`)}
        >
          Details
        </button>
      </div>
      <div className="music__product-container">
        <p className="music__product-name">{name}</p>
        <p className="music__product-price">{price.formatted_with_symbol}</p>
      </div>
    </div>
  );
};
export default Product;
