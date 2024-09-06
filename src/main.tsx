import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";  
import App from "./App"; 
import Homepage from "./pages/Homepage";
import Store from "./pages/Store";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "/",           
    element: <App />,    
    children: [
      {
        path: "/",       
        element: <Homepage />,
      },
      {
        path: "/store",  
        element: <Store />,
      },
    ],
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/signup",
    element: <Signup/>
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} >
       </RouterProvider>
  </StrictMode>
);
