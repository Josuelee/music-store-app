import {
  ADD_TO_CART,
  FILL_CART,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
  EMPTY_CART,
  REFRESH_CART,
} from "../types";

export const addToCart = (res) => ({ type: ADD_TO_CART, payload: res });

export const fillCart = (res) => ({ type: FILL_CART, payload: res });

export const removeFromCart = (res) => ({
  type: REMOVE_FROM_CART,
  payload: res,
});

export const updateQuantityCart = (res) => ({
  type: UPDATE_QUANTITY,
  payload: res,
});

export const emptyCart = (res) => ({ type: EMPTY_CART, payload: res });

export const refreshCart = (res) => ({ type: REFRESH_CART, payload: res });
