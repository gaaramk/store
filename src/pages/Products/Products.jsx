import { useState, useMemo } from "react";
import useProducts from "@/Hooks/useProducts";
import useCategories from "@/Hooks/useCategories";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Products = () => {
  const products = useProducts();
  const categories = useCategories();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOption, setSortOption] = useState(null);

  const allProducts = products.data?.data?.data || [];

  if (products.isLoading || categories.isLoading) return <Loading />;
  if (products.isError) return <h1>{products.error.message}</h1>;
  if (categories.isError) return <h1>{categories.error.message}</h1>;

  // Filtered + Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filtering
    if (selectedCategory) {
      result = result.filter(
        (product) => product.category._id === selectedCategory
      );
    }

    // Sorting
    switch (sortOption) {
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "expensive":
        result.sort(
          (a, b) =>
            (b.priceAfterDiscount || b.price) -
            (a.priceAfterDiscount || a.price)
        );
        break;
      case "cheap":
        result.sort(
          (a, b) =>
            (a.priceAfterDiscount || a.price) -
            (b.priceAfterDiscount || b.price)
        );
        break;
      case "best":
        result.sort((a, b) => b.ratingsAverage - a.ratingsAverage);
        break;
      default:
        break;
    }

    return result;
  }, [allProducts, selectedCategory, sortOption]);

  return (
    <div className="py-25">
      <div className="container">
        {/* Filter & Sort */}
        <div className="flex flex-wrap items-center gap-5 mb-6">
          {/* Filter by Category */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border px-4 py-2 rounded-md bg-white shadow-sm dark:bg-black">
              Category <i className="fa-solid fa-caret-down ml-2"></i>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSelectedCategory(null)}>
                All
              </DropdownMenuItem>
              {categories.data?.data?.data?.map((category) => (
                <DropdownMenuItem
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger className="border px-4 py-2 rounded-md bg-white shadow-sm dark:bg-black">
              Sort <i className="fa-solid fa-caret-down ml-2"></i>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOption("az")}>
                A-Z
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("za")}>
                Z-A
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("best")}>
                Best Rated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("expensive")}>
                Most Expensive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("cheap")}>
                Most Affordable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
