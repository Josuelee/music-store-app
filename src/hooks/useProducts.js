import { useState } from "react";
import { commerce } from "../lib/commerce";
import { getProducts } from "../actions/productsActions";
import { useDispatch } from "react-redux";

export const useProducts = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchData = async (params = {}) => {
    try {
      setLoading(true);

      const newItem = await commerce.products.list(params);
      if (newItem.data) {
        dispatch(getProducts(newItem?.data));
      } else {
        dispatch(getProducts(null));
      }

      setLoading(false);
    } catch (err) {
      console.warn("Something wrong happend", err);
    }
  };

  return { fetchData, loading };
};
