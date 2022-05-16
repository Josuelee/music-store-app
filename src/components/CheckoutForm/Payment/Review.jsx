import "./Payment";

import { useSelector } from "react-redux";

const Review = () => {
  const token = useSelector((state) => state.checkout.token);

  return (
    <>
      <h3 className="music__review_title">Order Summary</h3>
      <div className="music__review_container">
        {token.live.line_items?.map((product) => (
          <div className="music__review_list" key={product.id}>
            <p>{product.name}</p>
            <div className="music__review_data">
              <p>Quantity: {product.quantity}</p>
              <p>{product.line_total.formatted_with_symbol}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="music__review_total">
        <p>Total</p>
        <p className="music__review_total-price">
          {token.live.subtotal.formatted_with_symbol}
        </p>
      </div>
    </>
  );
};
export default Review;
