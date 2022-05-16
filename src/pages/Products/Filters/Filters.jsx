import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterRangeProducts } from "../../../actions/productsActions";
import { Loader } from "../../../components";
import { useProducts } from "../../../hooks/useProducts";
import { commerce } from "../../../lib/commerce";

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
      className="music__products-filters"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <label htmlFor="search">Search</label>
        <input
          type="search"
          name="search"
          id="search"
          value={filters.search}
          onChange={handleSearchChange}
          onFocus={handleFocusSearch}
          onBlur={handleBlur}
          disabled={searchEnabled}
        />
      </div>
      {loading && <Loader />}
      {loading || (
        <div>
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
          {categories.map((category) => (
            <div key={category.id}>
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
          ))}
        </div>
      )}
      <div>
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
        <label htmlFor="range">$ {filters.range}</label>
      </div>
    </form>
  );
};
export default Filters;
