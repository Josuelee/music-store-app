import {
  ADD_TO_CART,
  EMPTY_CART,
  FILL_CART,
  REFRESH_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from "../types";
const initialState = null;

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return action.payload;

    case FILL_CART:
      return action.payload;

    case REMOVE_FROM_CART:
      return action.payload;

    case UPDATE_QUANTITY:
      return action.payload;

    case EMPTY_CART:
      return action.payload;

    case REFRESH_CART:
      return action.payload;

    default:
      return state;
  }
}

export default cartReducer;
