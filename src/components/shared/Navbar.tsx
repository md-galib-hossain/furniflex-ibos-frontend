import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserButton from "./UserButton";
import { ShoppingCart } from "lucide-react"; // Importing Lucide cart icon

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar bg-base-100 px-8 bg-card">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/store">Products</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/custom">Custom</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          FurniFlex
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex py-2">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/store">Products</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/custom">Custom</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
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
            <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-primary text-xs">
              <p className="font-bold">99+</p>
            </div>
           </Link>
          </div>

          <UserButton user={user} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
