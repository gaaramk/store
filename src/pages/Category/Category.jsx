import Loading from "@/components/Loading";
import ProductCard from "@/components/ProductCard";
import useProducts from "@/Hooks/useProducts";
import { useParams } from "react-router-dom";

const Category = () => {
  const { id } = useParams();

  const products = useProducts();

  const categProducts = products.data?.data?.data?.filter(
    (prod) => prod.category._id === id
  );

  if (products.isLoading) return <Loading />;

  if (products.isError)
    return (
      <div className="container py-10">
        <h1 className="text-2xl font-bold text-red-500">
          {products.error.message}
        </h1>
      </div>
    );

  return (
    <section className="py-25">
      <div className="container">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-teal-700 capitalize border-b border-teal-300 pb-2">
          {categProducts[0]?.category.name || "Category"}
        </h1>

        {categProducts.length === 0 ? (
          <h2 className="text-2xl text-gray-600 dark:text-gray-300 font-semibold text-center mt-20">
            No products found in this category.
          </h2>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categProducts.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Category;
