import { GET_PRODUCTS, FILTER_RANGE_PRODUCTS } from "../types";

export const getProducts = (res) => ({ type: GET_PRODUCTS, payload: res });
export const filterRangeProducts = (res) => ({
  type: FILTER_RANGE_PRODUCTS,
  payload: res,
});
