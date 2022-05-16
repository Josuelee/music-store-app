import "./CartItem.css";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import { commerce } from "../../../lib/commerce";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantityCart,
} from "../../../actions/cartActions";

const CartProduct = ({ data }) => {
  const dispatch = useDispatch();
  const { line_total, id, image, name, quantity } = data;

  const removeProducts = async () => {
    const cartData = await commerce.cart.remove(id);
    dispatch(removeFromCart(cartData.cart));
  };

  const updateQuantity = async (quantity) => {
    const cartData = await commerce.cart.update(id, {
      quantity,
    });

    dispatch(updateQuantityCart(cartData.cart));
  };

  return (
    <article className="music__cart_product">
      <div className="music__cart_product_img">
        <img src={image.url} alt={name} />
      </div>
      <div className="music__cart_product_container">
        <div className="music__cart_product_info">
          <h3>{name}</h3>
          <h4>{line_total.formatted_with_symbol}</h4>
          <p onClick={removeProducts}>remove</p>
        </div>
        <div className="music__cart_quantity">
          <AiOutlineUp onClick={() => updateQuantity(quantity + 1)} />
          {quantity}
          <AiOutlineDown onClick={() => updateQuantity(quantity - 1)} />
        </div>
      </div>
    </article>
  );
};
export default CartProduct;
