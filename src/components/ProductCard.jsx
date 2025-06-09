import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useContext } from "react";
import { cartContext } from "@/Context/CartContext";
import { wishListContext } from "@/Context/WishListContext";

const ProductCard = ({ product }) => {
  const { addProduct } = useContext(cartContext);
  const { addToWish, removeWish, isInWish } = useContext(wishListContext);

  const isWished = isInWish(product._id);

  const toggleWish = () => {
    isWished ? removeWish(product._id) : addToWish(product._id);
  };

  return (
    <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg dark:bg-black/50 dark:border-gray-700">
      {/* Wishlist Icon */}
      <div className="absolute top-3 right-3 z-10" onClick={toggleWish}>
        <i
          className={`fa-heart text-2xl cursor-pointer transition-colors duration-300 ${
            isWished ? "fa-solid text-red-500" : "fa-regular text-gray-400"
          }`}
        ></i>
      </div>

      {/* Product Image */}
      <Link to={`/productDetails/${product._id}`}>
        <img
          className="p-5 rounded-t-xl h-[250px] w-full object-cover"
          src={product.imageCover}
          alt={product.title}
        />
      </Link>

      {/* Product Info */}
      <div className="px-5 pb-6">
        {/* Title */}
        <Link to={`/productDetails/${product._id}`}>
          <h5 className="line-clamp-1 text-lg font-semibold text-gray-900 dark:text-white">
            {product.title}
          </h5>
        </Link>

        {/* Rating */}
        <div className="flex items-center mt-2 mb-4">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-4 h-4 ${
                  index < Math.round(product.ratingsAverage)
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M10.97 1.47a.6.6 0 011.06 0l2.47 5.01 5.52.8a.6.6 0 01.33 1.02l-4 3.9.94 5.5a.6.6 0 01-.87.63L11 16.3l-4.94 2.6a.6.6 0 01-.87-.63l.94-5.5-4-3.9a.6.6 0 01.33-1.02l5.52-.8 2.47-5.01z" />
              </svg>
            ))}
          </div>
          <span className="ml-3 text-sm font-medium text-blue-800 bg-blue-100 px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-900">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            {product.priceAfterDiscount || product.price}$
          </span>
          {product.priceAfterDiscount && (
            <span className="text-lg font-semibold line-through text-red-500">
              {product.price}$
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          className="mt-4 w-full rounded-xl text-sm font-semibold"
          onClick={() => addProduct(product._id)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
