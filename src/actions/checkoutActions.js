import {
  BACK_CHECKOUT_STEP,
  CAPTURE_CHECKOUT,
  GENERATE_CHECKOUT_TOKEN,
  INITIAL_CHECKOUT_STEP,
  NEXT_CHECKOUT_STEP,
  UPDATE_SHIPPING_CHECKOUT,
} from "../types";

export const generateCheckoutToken = (res) => ({
  type: GENERATE_CHECKOUT_TOKEN,
  payload: res,
});

export const nextStep = (res) => ({ type: NEXT_CHECKOUT_STEP, payload: res });
export const backStep = (res) => ({ type: BACK_CHECKOUT_STEP, payload: res });
export const initalStep = (res) => ({
  type: INITIAL_CHECKOUT_STEP,
  payload: res,
});
export const updateShippingData = (res) => ({
  type: UPDATE_SHIPPING_CHECKOUT,
  payload: res,
});

export const captureCheckout = (res) => ({
  type: CAPTURE_CHECKOUT,
  payload: res,
});
