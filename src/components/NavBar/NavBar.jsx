import "./NavBar.css";
import { useState, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { fillCart } from "../../actions/cartActions";

import Cart from "../Cart/Cart";

const NavBar = () => {
  const [openCart, setOpenCart] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const fetchCart = async () => {
    try {
      const cartData = await commerce.cart.retrieve();
      dispatch(fillCart(cartData));
    } catch (err) {
      console.log("Something wrong happend");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <div className="movie__navbar ">
        <div className="movie__navbar-container section__container">
          <ul className="movie__navbar-lists">
            <Link to="/">Home</Link>
            <Link to="products">Products</Link>
            <Link to="about">About</Link>
          </ul>
          <h1 className="movie__navbar-title">music Store</h1>
          <div className="movie__navbar-cart">
            <IconButton onClick={() => setOpenCart(true)}>
              <Badge
                badgeContent={cart ? cart?.total_items : 0}
                color="secondary"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} />}
    </>
  );
};
export default NavBar;
