import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { DotLoader } from "react-spinners";
import { cartContext } from "@/Context/CartContext";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(false);

  const { UpdateUi, cartId } = useContext(cartContext);

  const navegate = useNavigate();

  const shippingAddress = {
    details: "",
    phone: "",
    city: "",
  };

  const handelSubmit = (values) => {
    setIsLoading(true);
    const backendBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.status);
        UpdateUi();
        navegate("/");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  const onlinPay = (values) => {
    setIsLoading(true);
    const backendBody = {
      shippingAddress: values,
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        backendBody,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.open(res?.data?.session?.url, "_blank");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setIsLoading(false);
      });

    setIsLoading(false);
  };

  const detectAndCall = (values) => {
    if (isOnline) {
      onlinPay(values);
    } else {
      handelSubmit(values);
    }
  };

  const handelValidationSchema = yup.object({
    city: yup.string().required("City is required"),
    details: yup.string().required("Details is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .min(11, "Phone is too short"),
  });

  let formik = useFormik({
    initialValues: shippingAddress,
    onSubmit: detectAndCall,
    validationSchema: handelValidationSchema,
  });

  return (
    <>
      <section className="h-screen flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-teal-700 capitalize">
            Payment
          </h1>
        </div>

        <form
          className="max-w-md mx-auto w-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=""
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>

            {formik.touched.city && formik.errors.city ? (
              <div
                id="alert-border-2"
                className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>

                <div className="ms-3 text-sm font-medium">
                  {formik.errors.city}{" "}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=""
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              phone
            </label>

            {formik.touched.phone && formik.errors.phone ? (
              <div
                id="alert-border-2"
                className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>

                <div className="ms-3 text-sm font-medium">
                  {formik.errors.phone}{" "}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="details"
              id="details"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=""
              value={formik.values.details}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="details"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              details
            </label>

            {formik.touched.details && formik.errors.details ? (
              <div
                id="alert-border-2"
                className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                role="alert"
              >
                <svg
                  className="shrink-0 w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>

                <div className="ms-3 text-sm font-medium">
                  {formik.errors.details}{" "}
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex gap-7">
            <button
              onClick={() => setIsOnline(false)}
              className="cursor-pointer my-5 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            >
              {isLoading ? <DotLoader size={20} /> : "Offline Payment"}
            </button>

            <button
              onClick={() => setIsOnline(true)}
              className="cursor-pointer my-5 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            >
              {isLoading ? <DotLoader size={20} /> : "Online Payment"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Payment;
