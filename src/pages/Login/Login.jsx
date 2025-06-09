import { useFormik } from "formik";
import * as yup from "yup";
import Style from "./Login.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { DotLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "@/Context/AuthContext";
import { cartContext } from "@/Context/CartContext";
import { wishListContext } from "@/Context/WishListContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);

  const { setToken } = useContext(authContext);

  const { getUserCart } = useContext(cartContext);

  const { getUserWish } = useContext(wishListContext);

  const navegate = useNavigate();

  const user = {
    email: "",
    password: "",
  };

  const handelSubmit = (values) => {
    setIsLoading(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        toast.success(res?.data?.message);

        setToken(res?.data?.token);

        if (remember) {
          localStorage.setItem("token", res?.data?.token);
        } else {
          sessionStorage.setItem("token", res?.data?.token);
        }

        getUserCart();

        getUserWish();

        setIsLoading(false);

        navegate("/");
      })
      .catch((err) => {
        console.log(err);

        toast.error(err?.response?.data?.message);
        setIsLoading(false);
      });
  };

  const handelValidationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: user,
    onSubmit: handelSubmit,
    validationSchema: handelValidationSchema,
  });

  return (
    <>
      <section className="h-screen flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-teal-700 capitalize">
            Login
          </h1>
        </div>

        <form
          className="max-w-md mx-auto w-full"
          onSubmit={formik.handleSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=""
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>

            {formik.touched.email && formik.errors.email ? (
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
                  {formik.errors.email}{" "}
                </div>
              </div>
            ) : null}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
              placeholder=""
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>

            {formik.touched.password && formik.errors.password ? (
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
                  {formik.errors.password}{" "}
                </div>
              </div>
            ) : null}
          </div>

          <div>
            <p className="flex items-center gap-2">
              Remember me
              <input
                type="checkbox"
                name="remember"
                id="remember"
                className="w-4 h-4"
                value={false}
                onChange={() => {
                  setRemember(!remember);
                }}
              />
            </p>
          </div>

          <button
            type="submit"
            className="my-5 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
          >
            {isLoading ? <DotLoader size={20} /> : "Sign Up"}
          </button>

          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-teal-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
