import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { ShoppingCart } from "lucide-react";
import useGetCartItems from "@/hooks/userGetCartItems";

const Navbar = () => {
  const { user, loading: userLoading } = useContext(AuthContext);

  const { data: cartItems, isLoading: cartLoading } = useGetCartItems(
    user?.email || null
  );

  const cartLength = cartItems?.data?.result.length;

  return (
    <div className="navbar bg-card px-8 py-6 z-10 border-b dark:bg-secondary">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" // Larger icon size
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-card dark:bg-secondary rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/" className="text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/store" className="text-lg">
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-lg">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/custom" className="text-lg">
                Custom
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-lg">
                Blog
              </Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-2xl font-bold">
          FurniFlex
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/" className="text-lg font-medium">
              Home
            </Link>
          </li>

          <li>
            <Link to="/store" className="text-lg font-medium">
              Products
            </Link>
          </li>
          <li>
            <Link to="#" className="text-lg font-medium">
              Categories
            </Link>
          </li>
          <li>
            <Link to="#" className="text-lg font-medium">
              Custom
            </Link>
          </li>
          <li>
            <Link to="#" className="text-lg font-medium">
              Blog
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-6 items-center">
          {/* Updated Cart Icon with Badge */}
          <div className="relative">
            <Link to="/cart">
              <button className="btn btn-ghost hover:bg-transparent hover:shadow-none focus:outline-none active:bg-transparent">
                <ShoppingCart className="w-6 h-6" />
              </button>
              <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-primary text-xs font-bold">
                {!cartLoading && cartLength}
              </div>
            </Link>
          </div>

          <UserButton user={user} className="" loading={userLoading} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
