import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const wishListContext = createContext();

const WishListContextProvider = ({ children }) => {
  const [numOfWishItem, setUNumOfWishItem] = useState(0);
  const [userWish, setUserWish] = useState([]); // تأكد إنها array مش null

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const getUserWish = () => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      })
      .then((res) => {
        setUNumOfWishItem(res?.data?.count || 0);
        setUserWish(res?.data?.data || []);
      })
      .catch((err) => console.log(err));
  };

  const addToWish = async (productId) => {
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers: { token } }
      );
      toast.success(res?.data?.message);
      getUserWish();
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.message);
      return false;
    }
  };

  const removeWish = async (productId) => {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token } }
      );
      toast.success("Removed from wishlist");
      getUserWish(); // تحديث الأمنيات
    } catch (err) {
      console.log(err);
    }
  };

  const isInWish = (id) => {
    return userWish?.some((item) => item._id === id);
  };

  useEffect(() => {
    if (token) getUserWish();
  }, [token]);

  return (
    <wishListContext.Provider
      value={{
        userWish,
        numOfWishItem,
        addToWish,
        removeWish,
        isInWish,
        getUserWish,
      }}
    >
      {children}
    </wishListContext.Provider>
  );
};

export default WishListContextProvider;
