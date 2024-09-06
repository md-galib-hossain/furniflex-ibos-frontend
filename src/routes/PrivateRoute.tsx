import { AuthContext } from "@/contexts/AuthContext";
import { Loader } from "lucide-react";
import { ReactNode, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user ,loading} = useContext(AuthContext);
  const location = useLocation()
  if(loading){
    return <div className="min-h-screen flex items-center justify-center">
        <Loader className="size-5 animate-spin" />
    </div>
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login" state={{from:location}} replace></Navigate>;
};

export default PrivateRoute;
