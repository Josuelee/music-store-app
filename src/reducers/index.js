import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import checkoutReducer from "./checkoutReducer";
import productsReducer from "./productsReducer";

const reducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  checkout: checkoutReducer,
});

export default reducer;
