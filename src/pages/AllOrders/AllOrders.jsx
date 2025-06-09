import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { cartContext } from "@/Context/CartContext";
import AccordionOrders from "@/components/AccordionOrders";
import SelectView from "@/components/SelectView";

const OrderData = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);

  const [allOrders, setAllOrders] = useState(true);
  const [bycash, setBycash] = useState(false);
  const [byCard, setByCard] = useState(false);

  const { cartOwner } = useContext(cartContext);

  const getToken = () =>
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const getUserOrders = async () => {
    const token = getToken();
    if (!token) return;

    try {
      const res = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`,
        {
          headers: {
            token,
          },
        }
      );

      setOrders(res.data);
      setFilteredOrders(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong", {
        icon: "🚫",
      });
    }
  };

  useEffect(() => {
    getUserOrders();
  }, [cartOwner]);

  useEffect(() => {
    if (bycash) {
      setFilteredOrders(
        orders.filter((order) => order.paymentMethodType === "cash")
      );
    } else if (byCard) {
      setFilteredOrders(
        orders.filter((order) => order.paymentMethodType === "card")
      );
    } else if (allOrders) {
      setFilteredOrders(orders);
    }
    console.log(orders);
  }, [allOrders, bycash, byCard, orders]);

  return (
    <div className="w-[90%] mx-auto py-25">
      <div className="my-4">
        <h3 className="text-lg font-semibold mb-2">Show by:</h3>
        <SelectView
          setAllOrders={setAllOrders}
          setBycash={setBycash}
          setByCard={setByCard}
        />
      </div>

      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <AccordionOrders key={order._id} order={order} />
        ))
      ) : (
        <div className="w-full flex justify-center items-center">
          <h1 className="font-bold text-2xl">No Orders</h1>
        </div>
      )}
    </div>
  );
};

export default OrderData;
