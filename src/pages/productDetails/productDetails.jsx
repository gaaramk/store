import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import ProductImages from "@/components/ProductImages";
import { Button } from "@/components/ui/button";
import useProducts from "@/Hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const ProductDetails = () => {
  // Get product ID from URL params
  const { id } = useParams();

  // Fetch all products to get related ones
  const res = useProducts();

  // Function to fetch product details
  const getProduct = () => {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  };

  // Query to fetch single product details using react-query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProduct,
  });

  const product = data?.data?.data;

  // Show loading state
  if (isLoading) return <Loading />;

  // Show error state
  if (isError) return <h1>{error.message}</h1>;

  // Filter related products by same category
  const relatedProducts = res.data?.data?.data?.filter(
    (prod) =>
      prod.category?._id === product.category?._id && prod._id !== product._id
  );

  return (
    <section className="py-25">
      <div className="container capitalize my-10">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Product Images */}
          <div>
            <ProductImages product={product} />
          </div>

          {/* Product Info */}
          <div>
            {/* Product Category and Title */}
            <div>
              <small className="text-gray-400">{product.category.name}</small>
              <h2 className="text-2xl font-bold my-3">{product.title}</h2>
            </div>

            {/* Price and Rating */}
            <div className="flex justify-between items-center">
              {/* Product Price */}
              <div>
                {product.priceAfterDiscount ? (
                  <>
                    <span className="line-through text-lg text-red-400">
                      {product.price} EGP
                    </span>
                    <span className="mx-3 text-2xl font-bold">
                      {product.priceAfterDiscount} EGP
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold">
                    {product.price} EGP
                  </span>
                )}
              </div>

              {/* Rating and Sold Count */}
              <div className="flex items-center gap-5 p-3">
                <p>{product.sold} sold</p>
                <span className="flex items-center gap-2">
                  <i className="fa-solid fa-star text-yellow-400 text-lg"></i>
                  <p className="font-bold text-2xl">{product.ratingsAverage}</p>
                  ({product.ratingsQuantity})
                </span>
              </div>
            </div>

            {/* Product Description */}
            <div className="my-5">
              <h2 className="text-lg font-bold my-3">Description:</h2>
              <p>{product.description}</p>
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full">Add to cart</Button>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <h2 className="text-2xl font-bold mt-10 mb-5">Related Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProducts?.length > 0 ? (
              relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-gray-500">No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
