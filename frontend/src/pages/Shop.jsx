import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";
import "./shop.css"; // Import the custom CSS file

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  // Add "All Brands" option to uniqueBrands
  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    // Update the price filter state when the user types in the input field
    setPriceFilter(e.target.value);
  };

  return (
    <div className="shop-container mt-10">
      <button
        className="filter-toggle-button"
        onClick={() => setIsFilterVisible(!isFilterVisible)}
      >
        {isFilterVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {isFilterVisible && (
        <aside className="shop-filters">
          <h2 className="filter-title">Filter by Categories</h2>

          <div className="category-filter">
            {categories?.map((c) => (
              <div key={c._id} className="filter-item">
                <input
                  type="checkbox"
                  id={`category-${c._id}`}
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="filter-checkbox"
                />
                <label
                  htmlFor={`category-${c._id}`}
                  className="filter-label"
                >
                  {c.name}
                </label>
              </div>
            ))}
          </div>

          <h2 className="filter-title">Filter by Brands</h2>

          <div className="brand-filter">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="filter-item">
                <input
                  type="radio"
                  id={`brand-${brand}`}
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="filter-radio"
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="filter-label"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h2 className="filter-title">Filter by Price</h2>

          <div className="price-filter">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="price-input"
            />
          </div>

          <div className="reset-button-container">
            <button
              className="reset-button"
              onClick={() => window.location.reload()}
            >
              Reset
            </button>
          </div>
        </aside>
      )}

      <main className="products-display">
        <h2 className="products-count">{products?.length} Products</h2>
        <div className="products-grid">
          {products.length === 0 ? (
            <Loader />
          ) : (
            products?.map((p) => (
              <div className="product-card-container" key={p._id}>
                <ProductCard p={p} />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Shop;
