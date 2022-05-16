import "./Cart.css";

import CartItem from "./CartITem/CartItem";

import { RiCloseFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../actions/cartActions";
import { commerce } from "../../lib/commerce";
import { useNavigate } from "react-router-dom";

const Cart = ({ setOpenCart }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let buttonDisabled = cart && cart?.line_items.length === 0 ? true : false;

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    dispatch(emptyCart(cart));
  };

  const handleGoCheckout = () => {
    setOpenCart(false);
    navigate("/checkout");
  };

  return (
    <div className="music__cart--background">
      <div className="music__cart">
        <div className="music__cart-content">
          <RiCloseFill
            className="music__cart-close"
            onClick={() => setOpenCart(false)}
          />
          <h2>Your Bag</h2>
          {cart ? (
            <div className="music__cart-products">
              {cart?.line_items.map((el) => (
                <CartItem key={el.id} data={el} />
              ))}
            </div>
          ) : (
            <div>
              <h2>There is no products</h2>
            </div>
          )}
          <h2>Total: {cart?.subtotal.formatted_with_symbol} </h2>
          <div className="music__cart-shopping">
            <button
              className="btn-style music__cart-button"
              disabled={buttonDisabled}
              onClick={handleGoCheckout}
            >
              Go To Checkout
            </button>
            <button
              className="btn-style  music__cart-button"
              disabled={buttonDisabled}
              onClick={handleEmptyCart}
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
