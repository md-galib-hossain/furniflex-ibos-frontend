import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";  
import App from "./App"; 
import Homepage from "./pages/Homepage";
import Store from "./pages/Store";
import Login from "./pages/Login/Login";

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
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} >
       </RouterProvider>
  </StrictMode>
);
