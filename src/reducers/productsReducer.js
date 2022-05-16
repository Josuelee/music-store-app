import { GET_PRODUCTS, FILTER_RANGE_PRODUCTS } from "../types";

const initialState = null;

function productsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload;

    case FILTER_RANGE_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
}

export default productsReducer;
