import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const AccordionOrders = ({ order }) => {
  return (
    <>
      <div className="border rounded-2xl shadow-lg my-5 p-3">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex items-center gap-5 capitalize">
                <h2 className="font-bold text-2xl py-3">Order Details</h2>
                <p className="text-lg">date: {order.createdAt.split("T")[0]}</p>
                <p className="text-lg">count: {order.cartItems.length}</p>
                <p className="text-lg">total: {order.totalOrderPrice} $</p>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <>
                <div className="capitalize">
                  <div className="border-b-2 border-gray-950 dark:border-gray-400 pb-3">
                    <h2 className="font-bold text-2xl py-3">
                      Shipping Address
                    </h2>
                    <p className="text-lg">name: {order.user.name}</p>
                    <p className="text-lg">
                      city: {order.shippingAddress.city}
                    </p>
                    <p className="text-lg">
                      phone: {order.shippingAddress.phone}
                    </p>
                    <p className="text-lg">
                      address-details: {order.shippingAddress.details}
                    </p>
                  </div>

                  <div className="border-b-2 border-gray-950 dark:border-gray-400 pb-3">
                    <h2 className="font-bold text-2xl py-3">payment details</h2>

                    <div className="flex items-center gap-15">
                      <div>
                        <p className="text-lg">
                          shipping: {order.shippingPrice} $
                        </p>
                        <p className="text-lg">tax: {order.taxPrice} $</p>
                        <p className="text-lg">
                          total: {order.totalOrderPrice} $
                        </p>
                      </div>

                      <div>
                        <p className="text-lg">
                          payment: {order.paymentMethodType}
                        </p>
                        <p className="text-lg">
                          status: {order.isPaid ? "paid" : "not paid"}
                        </p>
                        <p className="text-lg">
                          delivery:{" "}
                          {order.isDelivered ? "delivered" : "not delivered"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="font-bold text-2xl py-3">order items</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                      {order.cartItems.map((cartItem) => (
                        <div
                          key={cartItem?._id}
                          className="border dark:border-gray-700 p-3 rounded-2xl relative"
                        >
                          <img
                            src={cartItem?.product?.imageCover}
                            alt={cartItem?.product?.title}
                            className="w-full object-cover h-[200px] rounded-2xl"
                          />
                          <h2 className="font-bold text-2xl py-3">
                            {cartItem?.product?.title}
                          </h2>
                          <p className="text-lg">
                            price: {cartItem?.price * cartItem?.count} $
                          </p>
                          <p className="text-lg">quantity: {cartItem?.count}</p>
                          <Link
                            href={`/products/${cartItem?.product?.id}`}
                            className="absolute bottom-0 right-5 my-3 dark:text-white text-black underline hover:text-primary dark:hover:text-primary transition-all duration-300 ease-in-out"
                          >
                            Read more...
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default AccordionOrders;
