import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const Layout = () => {
  return (
    <>
      <Navbar />

      <main>
          <Outlet />
          <Toaster />
      </main>

      <Footer />

    </>
  );
};

export default Layout;
