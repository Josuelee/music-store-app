import "./ProductDetails.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../../actions/cartActions";
import { commerce } from "../../lib/commerce";

const ProductDetails = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();

  if (!products)
    return (
      <div className="music__detail-error section__container section__margin">
        <h2 className="">There is no information</h2>
        <Link to="/products" className="btn-style music__back-to-products">
          Go back to product
        </Link>
      </div>
    );

  const productDetail = products.find((el) => el.id === id);

  const description = productDetail.description
    .substr(3)
    .slice(0, productDetail.description.length - 7);

  const handleAddToCart = async () => {
    try {
      const dataToAdd = await commerce.cart.add(productDetail.id);
      dispatch(addToCart(dataToAdd.cart));
    } catch (err) {
      console.warn("Something went wrong");
    }
  };

  return (
    <div className="music__product_details section__margin section__container">
      <Link className="music__back-to-products btn-style " to="/products">
        Back to products
      </Link>
      <div className="music__product_details-container">
        <div className="music__product_details-image">
          <img src={productDetail.image.url} alt={productDetail.name} />
        </div>
        <div className="music__product_details-data">
          <h2 className="title-style">{productDetail.name}</h2>
          <h3>{productDetail.price.formatted_with_symbol}</h3>
          <p>{description}</p>
          <button className="btn-style" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
