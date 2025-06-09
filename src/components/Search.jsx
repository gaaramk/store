import useProducts from "@/Hooks/useProducts";
import { Link } from "react-router-dom";
import { useState } from "react";

const Search = () => {
  const products = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const filterProducts = (query) => {
    return products.data?.data?.data?.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    const result = filterProducts(query);
    setFilteredProducts(result);

    if (query === "") {
      setFilteredProducts([]);
    }
  };

  return (
    <section className="relative">
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>

          <input
            type="search"
            id="default-search"
            className=" block w-full p-4 ps-10 text-sm font-bold text-gray-900 dark:text-gray-300 border-b dark:border-gray-600 focus-within:outline-none focus:border-teal-500 dark:placeholder:text-gray-400 "
            placeholder="Search ..."
            onChange={handleSearch}
          />
        </div>
      </div>

      {filteredProducts.length > 0 && (
        <div className="bg-white absolute w-full border border-gray-200 mt-2 rounded-2xl z-50 max-h-96 overflow-y-auto">
          <ul>
            {filteredProducts.map((product) => (
              <li key={product._id} className="p-2 hover:bg-gray-100">
                <Link to={`/productDetails/${product._id}`}>
                  <div className="flex gap-2 items-center">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-1/3 object-cover"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">{product.title}</h2>
                      <p className="text-gray-600">{product.category.name}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Search;
