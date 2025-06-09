import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
  const [userProducts, setUserProducts] = useState(null);
  const [totalCartPrice, setUTotalCartPrice] = useState(0);
  const [numOfCartItem, setUNumOfCartItem] = useState(0);
  const [cartOwner, setCartOwner] = useState(null);
  const [cartId, setCartId] = useState(null);

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const addProduct = async (peoductId) => {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId: peoductId,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        // console.log(res?.data?.cartId);
        setUserProducts(res?.data?.data?.products);
        setUTotalCartPrice(res?.data?.data?.totalCartPrice);
        setUNumOfCartItem(res?.data?.numOfCartItems);
        setCartOwner(res?.data?.data?.cartOwner);
        setCartId(res?.data?.cartId || res?.data?.data?._id);

        toast.success(res?.data?.message);

        return true;
      })
      .catch((err) => {
        console.log(err);

        toast.error(err?.response?.data?.message);

        return false;
      });
  };

  const getUserCart = () => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setUserProducts(res?.data?.data?.products);
        setUTotalCartPrice(res?.data?.data?.totalCartPrice);
        setUNumOfCartItem(res?.data?.numOfCartItems);
        setCartOwner(res?.data?.data?.cartOwner);
        setCartId(res?.data?.cartId || res?.data?.data?._id);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCart = (productId, newCount) => {
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: newCount,
        },
        {
          headers: {
            token,
          },
        }
      )
      .then((res) => {
        setUserProducts(res?.data?.data?.products);
        setUTotalCartPrice(res?.data?.data?.totalCartPrice);
        setUNumOfCartItem(res?.data?.numOfCartItems);
        setCartOwner(res?.data?.data?.cartOwner);
        setCartId(res?.data?.cartId || res?.data?.data?._id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeProduct = async (productId) => {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
          token,
        },
      })
      .then((res) => {
        setUserProducts(res?.data?.data?.products);
        setUTotalCartPrice(res?.data?.data?.totalCartPrice);
        setUNumOfCartItem(res?.data?.numOfCartItems);
        setCartOwner(res?.data?.data?.cartOwner);
        setCartId(res?.data?.cartId || res?.data?.data?._id);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const UpdateUi = () => {
    getUserCart();
  };

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addProduct,
        getUserCart,
        updateCart,
        removeProduct,
        UpdateUi,
        userProducts,
        totalCartPrice,
        numOfCartItem,
        cartOwner,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
