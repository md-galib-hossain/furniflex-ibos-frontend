import { useContext, useEffect, useState } from "react";

import UserAvatarImg from "@/assets/avatar-placeholder.png";
import { Check, LogOutIcon, Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { AuthContext } from "@/contexts/AuthContext";

const UserButton = ({ user, className,loading }: any) => {
  const { logOutUser } = useContext(AuthContext);
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const handleToggle = (value: "light" | "dark") => {
    setTheme(value);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleLogOut = async () => {
    try {
      await logOutUser();
    } catch (err) {
      console.log(err);
    }
  };
  console.log(user,"asd");
  return (
    <div className="cursor-pointer">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex-none rounded-full outline outline-2 outline-primary",
              className
            )}
          >
            {!loading && user?.photoUrl  ? (
              <img
                src={`${user.photoURL}`}
                alt="User Avatar"
                className={`rounded-full w-10 h-10`}
              />
            ) : (
              <img
              src={UserAvatarImg}
              alt="User Avatar"
              className={`rounded-full w-10 h-10`}
            />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user?.email ? (
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
          ) : (
            <DropdownMenuLabel>Please login</DropdownMenuLabel>
          )}
          <DropdownMenuSeparator />
          {/* <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem> */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Monitor className="mr-2 size-4" />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={() => handleToggle("light")}>
                  <Sun className="mr-2 size-4" />
                  Light
                  {theme === "light" && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleToggle("dark")}>
                  <Moon className="mr-2 size-4" />
                  Dark
                  {theme === "dark" && <Check className="ms-2 size-4" />}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          {user?.email ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogOut}>
                <LogOutIcon className="mr-2 size-4" />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuSeparator />
              <Link to="/login">
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 size-4" />
                  Login
                </DropdownMenuItem>
              </Link>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserButton;
