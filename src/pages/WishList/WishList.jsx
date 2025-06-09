import { useContext } from "react";
import Style from "./WishList.module.css";
import { wishListContext } from "@/Context/WishListContext";
import ProductCard from "@/components/ProductCard";
import Loading from "@/components/Loading";

const WishList = () => {
  const { userWish } = useContext(wishListContext);

  if (!userWish) {
    return <Loading />;
  }

  return (
    <section className="py-25">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-[#248387] capitalize">
          Your Wishlist ({userWish.length})
        </h2>

        {userWish.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userWish.map((prod) => (
              <ProductCard key={prod._id} product={prod} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No items in wishlist.</p>
        )}
      </div>
    </section>
  );
};

export default WishList;
