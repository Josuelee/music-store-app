import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterRangeProducts } from "../../../actions/productsActions";
import { Loader } from "../../../components";
import { useProducts } from "../../../hooks/useProducts";
import { commerce } from "../../../lib/commerce";

import "./Filters.css"

const initialFilter = {
  range: 3000,
  category: "",
};

const Filters = () => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(initialFilter);
  const [searchFilter, setSearchFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchEnabled, setSearchEnabled] = useState(false);
  const [categoriesEnabled, setCategoriesEnabled] = useState(false);
  const [rangeEnabled, setRangeEnabled] = useState(false);

  const { fetchData } = useProducts();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await commerce.categories.list();
      setCategories(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Something wrong happened", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchFilter(e.target.value);

    if (searchFilter) {
      fetchData({ query: searchFilter });
    } else {
      fetchData();
    }
  };

  const handleInputRange = async (e) => {
    const products = await commerce.products.list();

    const rangeFilter = products.data?.filter(
      (product) => product.price.raw < parseInt(e.target.value)
    );

    dispatch(filterRangeProducts(rangeFilter));
  };

  const handleClickCategories = (e) => {
    if (e.target.value === "All") {
      fetchData();
    } else {
      fetchData({ category_id: [e.target.value] });
    }
  };

  const handleFocusCategories = () => {
    setCategoriesEnabled(false);
    setRangeEnabled(true);
    setSearchEnabled(true);
  };

  const handleFocusSearch = () => {
    setSearchEnabled(false);
    setRangeEnabled(true);
    setCategoriesEnabled(true);
  };
  const handleFocusRange = () => {
    setRangeEnabled(false);
    setCategoriesEnabled(true);
    setSearchEnabled(true);
  };

  const handleBlur = () => {
    setRangeEnabled(false);
    setCategoriesEnabled(false);
    setSearchEnabled(false);
  };

  return (
    <form
      className="music__filters"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="music__filters-container">
        <div className="music__filters-search-container">          
          <input
            type="search"
            name="search"
            id="search"
            value={filters.search}
            onChange={handleSearchChange}
            onFocus={handleFocusSearch}
            onBlur={handleBlur}
            disabled={searchEnabled}
            placeholder="Search..."
            className="music__filters-search"
          />
        </div>
        {loading && <Loader />}
        {loading || (
          <div className="music__filters-categories-container">
            <p className="music__filters-categories-title">Categories</p>
            <div className="music__filters-category">
              <div>
                <label htmlFor="all">All</label>
                <input
                  type="radio"
                  name="category"
                  id="all"
                  value="All"
                  onChange={handleChange}
                  onClick={handleClickCategories}
                  onFocus={handleFocusCategories}
                  onBlur={handleBlur}
                  disabled={categoriesEnabled}
                />
              </div>
            </div>
            {categories.map((category) => (
              <div key={category.id} className="music__filters-category">
                <div>
                  <label htmlFor={category.id}>{category.name}</label>
                  <input
                    type="radio"
                    name="category"
                    id={category.id}
                    value={category.id}
                    onChange={handleChange}
                    onClick={handleClickCategories}
                    onFocus={handleFocusCategories}
                    onBlur={handleBlur}
                    disabled={categoriesEnabled}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="music__filters-range-container">
          <p className="music__filters-range-title">Range</p>
          <div className="music__filters-range">
            <input
            type="range"
            name="range"
            min={0}
            max={20000}
            value={filters.range}
            id="range"
            onChange={handleChange}
            onInput={handleInputRange}
            onFocus={handleFocusRange}
            onBlur={handleBlur}
            disabled={rangeEnabled}
          />
          <div className="music__filters-range-value">
            <span>Value:</span>
            <label htmlFor="range">$ {filters.range}</label>
          </div>
          </div>                  
        </div>
      </div>
    </form>
  );
};
export default Filters;
