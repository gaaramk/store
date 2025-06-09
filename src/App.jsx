import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/MainLayout/Layout";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import AllOrders from "./pages/AllOrders/AllOrders";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Products from "./pages/Products/Products";
import NotFound from "./pages/NotFound/NotFound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductDetails from "./pages/productDetails/productDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import WishListContextProvider from "./Context/WishListContext";
import WishList from "./pages/WishList/WishList";
import Category from "./pages/Category/Category";
import Payment from "./pages/Payment/payment";

function App() {
  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "productDetails/:id",
          element: <ProductDetails />,
        },
        {
          path: "category/:id",
          element: <Category />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
                {
          path: "payment",
          element: (
            <ProtectedRoute>
              {" "}
              <Payment />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              {" "}
              <AllOrders />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          ),
        },

        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  const reactQueryClient = new QueryClient();

  return (
    <>
      <AuthContextProvider>
        <QueryClientProvider client={reactQueryClient}>
          <CartContextProvider>
            <WishListContextProvider>
              <RouterProvider router={router}></RouterProvider>
              <Toaster />
            </WishListContextProvider>
          </CartContextProvider>
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
