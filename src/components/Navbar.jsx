import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext, useEffect, useState } from "react";
import { authContext } from "@/Context/AuthContext";
import { cartContext } from "@/Context/CartContext";
import { wishListContext } from "@/Context/WishListContext";
import useCategories from "@/Hooks/useCategories";
import Search from "./Search";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const { token } = useContext(authContext);
  const { numOfCartItem } = useContext(cartContext);
  const { numOfWishItem } = useContext(wishListContext);
  const res = useCategories();
  const categories = res.data?.data?.data || [];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY || currentScrollY < 50);
      setScrolled(currentScrollY > 100);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  const renderNavLinks = () => (
    <ul className="flex flex-col md:flex-row md:space-x-6 text-sm md:text-base">
      <li>
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/products" className="nav-link">
          Products
        </NavLink>
      </li>
      <li>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            Categories
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <DropdownMenuItem key={cat._id} className="cursor-pointer">
                  <NavLink to={`/category/${cat._id}`}>{cat.name}</NavLink>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No categories</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </ul>
  );

  const renderDarkModeToggle = () => (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <div className="toggle-switch" />
      <span className="ml-2 text-gray-900 dark:text-gray-300">
        <i className={`fa-solid ${darkMode ? "fa-moon" : "fa-sun"}`}></i>
      </span>
    </label>
  );

  return (
    <nav
      className={`z-50 fixed top-0 w-full transition-all duration-500 ${
        scrolled
          ? "bg-white/90 shadow-md dark:bg-black/90"
          : "bg-transparent text-[#248387]"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className=" max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2 md:py-4 relative">
        <Link to="/" className="text-4xl font-bold">
          ZEK
        </Link>

        {token && (
          <button
            className="md:hidden text-gray-400 dark:text-white"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        )}

        <div className="hidden md:flex items-center space-x-6">
          {renderNavLinks()}
          {renderDarkModeToggle()}
        </div>

        <div>
          <Search />
        </div>

        <div className="flex items-center space-x-4">
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/wishlist">Wishlist ({numOfWishItem})</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/cart"> Cart ({numOfCartItem})</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Link to="/allorders"> My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  Logout <i className="fa-solid fa-right-from-bracket ml-2"></i>
                </DropdownMenuItem>
                <DropdownMenuItem>{renderDarkModeToggle()}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex space-x-4">
              <NavLink to="/login" className="auth-link">
                Login
              </NavLink>
              <NavLink to="/register" className="auth-link">
                Signup
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {token && isMobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-1 bg-white dark:bg-zinc-900 rounded-lg shadow-md p-4 absolute top-full left-0 w-full z-40">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Products
            </NavLink>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full text-start px-3 py-2 rounded-md text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                Categories
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat._id}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="cursor-pointer"
                    >
                      <NavLink to={`/category/${cat._id}`}>{cat.name}</NavLink>
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No categories</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
