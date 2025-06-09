import { Button } from "@/components/ui/button";
import Style from "./Cart.module.css";
import { useContext } from "react";
import { cartContext } from "@/Context/CartContext";
import Loading from "@/components/Loading";
import Counter from "@/components/Counter";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    userProducts,
    numOfCartItem,
    totalCartPrice,
    updateCart,
    removeProduct,
  } = useContext(cartContext);

  if (!userProducts) {
    return <Loading />;
  }

  if (userProducts?.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen w-screen bg-white dark:bg-black">
        <h2 className="text-2xl font-bold">Cart is empty</h2>
      </div>
    );
  }

  async function handelRemoveProduvt(productId) {
    const flag = await removeProduct(productId);

    if (flag) {
      toast.success("Removed from cart");
    } else {
      toast.error("something went wrong");
    }
  }

  return (
    <section className="py-25">
      <div className="container capitalize">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Cart Items */}
          <div className="col-span-8">
            <div className="my-10">
              <p className="text-2xl text-[#173535]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                dignissimos.
              </p>
              <small className="text-[#248387]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, rerum! Reiciendis, natus!
              </small>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase my-7">
                your cart ({numOfCartItem})
              </h2>

              <h2 className="text-2xl font-bold my-3 md:hidden">
                total: {totalCartPrice}$
              </h2>

              <div className="flex gap-3 md:hidden">
                <Button>checkout</Button>
                <Button>bay on delivery</Button>
                <Button variant="destructive">clear</Button>
              </div>

              {userProducts?.map((prod) => (
                <div
                  key={prod?._id}
                  className="flex flex-col md:flex-row gap-5 capitalize my-5"
                >
                  <figure className="md:w-1/3">
                    <img
                      src={prod?.product?.imageCover}
                      alt=""
                      className="object-cover w-full h-[200px]"
                    />
                  </figure>

                  <div className="flex flex-col">
                    <div className="mb-5">
                      <h3 className="text-2xl font-bold">
                        {prod?.product?.title}
                      </h3>
                      <small>{prod?.product?.category?.name}</small>
                    </div>

                    <p className="font-semibold">
                      brand:{" "}
                      <span className="text-[#173535]">
                        {prod?.product?.brand?.name}
                      </span>
                    </p>

                    <p className="font-semibold">
                      price:{" "}
                      <span className="text-[#173535]">{prod?.price}$</span>
                    </p>

                    <Counter
                      productId={prod?.product?._id}
                      prodCount={prod?.count}
                      updateCart={updateCart}
                    />

                    <p className="font-semibold">
                      total:{" "}
                      <span className="text-[#173535]">
                        {prod?.price * prod?.count}$
                      </span>
                    </p>

                    <div className="my-7">
                      <Button
                        variant="destructive"
                        onClick={() => handelRemoveProduvt(prod.product._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 my-5 md:hidden">
              <Button>checkout</Button>
              <Button>bay on delivery</Button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="hidden md:block bg-[#173535] text-white fixed right-10 top-20 w-[300px]">
            <div className="container my-10 capitalize">
              <h2 className="text-2xl font-bold">summary</h2>

              <div>
                <div className="my-5">
                  <h3 className="text-lg font-semibold">
                    Do you have a discount code?
                  </h3>
                  <input
                    type="text"
                    placeholder="code"
                    className="bg-white p-2 rounded-lg text-black my-3"
                  />
                </div>

                <hr />

                <div className="flex justify-between items-center my-5">
                  <h3 className="text-lg">count</h3>
                  <span className="text-lg font-bold">{numOfCartItem}</span>
                </div>

                <div className="flex justify-between items-center my-5">
                  <h3 className="text-lg">Tax</h3>
                  <span className="text-lg font-bold">0$</span>
                </div>

                <div className="flex justify-between items-center my-5">
                  <h3 className="text-lg">Total</h3>
                  <span className="text-lg font-bold">{totalCartPrice}$</span>
                </div>

                <div className="my-5">
                  <Button className="w-full">
                    <Link to="/payment">Checkout</Link>
                  </Button>
                </div>

                <span className="block text-center">OR</span>

                <div className="my-5">
                  <Button variant="secondary" className="w-full">
                    <Link to="/payment">Bay On Delivery</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
