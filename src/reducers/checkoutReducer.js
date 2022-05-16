import {
  GENERATE_CHECKOUT_TOKEN,
  NEXT_CHECKOUT_STEP,
  BACK_CHECKOUT_STEP,
  UPDATE_SHIPPING_CHECKOUT,
  CAPTURE_CHECKOUT,
  INITIAL_CHECKOUT_STEP,
} from "../types";

const initialState = {
  order: {},
  token: null,
  shippingData: {},
  steps: 0,
};

function checkoutReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_CHECKOUT_TOKEN:
      return { ...state, token: action.payload };

    case NEXT_CHECKOUT_STEP:
      return { ...state, steps: state.steps + action.payload };

    case BACK_CHECKOUT_STEP:
      return { ...state, steps: state.steps - action.payload };

    case INITIAL_CHECKOUT_STEP:
      return { ...state, steps: 0 };

    case UPDATE_SHIPPING_CHECKOUT:
      return { ...state, shippingData: action.payload };

    case CAPTURE_CHECKOUT:
      return { ...state, order: action.payload };

    default:
      return state;
  }
}

export default checkoutReducer;
