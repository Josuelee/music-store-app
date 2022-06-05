import "./NavBar.css";
import { useState, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai"

import { Link } from "react-router-dom";
import { commerce } from "../../lib/commerce";
import { useSelector, useDispatch } from "react-redux";
import { fillCart } from "../../actions/cartActions";

import Cart from "../Cart/Cart";

const NavBar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);

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
          <div className="movie__navbar-menu">
            <HiMenu className="movie__navbar-menu-icon" 
              onClick={()=> setToggleMenu(true)}
            />              
          </div>               
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
      {toggleMenu && (
          <div className="movie__navbar-responsive">
            <div className="movie__navbar-responsive-close">
              <AiFillCloseCircle
                onClick={()=> setToggleMenu(false)}
                className="movie__navbar-responsive-icon"
              />
            </div>
            <h1 className="movie__navbar-title movie__navbar-title--responsive">music Store</h1>
            <ul className="movie__navbar-lists movie__navbar-lists--responsive">
              <Link onClick={()=> setToggleMenu(false)} to="/">
                Home
              </Link>
              <Link onClick={()=> setToggleMenu(false)} to="products">
                Products
              </Link>
              <Link onClick={()=> setToggleMenu(false)} to="about">
                About
              </Link>
            </ul>

          </div>
        )}         
      {openCart && <Cart setOpenCart={setOpenCart} />}
    </>
  );
};
export default NavBar;
