import Auth from "@/pages/auth/auth";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signUp";
import Home from "@/pages/client/home";
import NotFound from "@/pages/error/notFound";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoute";
import File from "@/pages/file";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace={true} to={"/auth/login"} />,
    errorElement: <NotFound />,
  },
  {
    element: <Auth />,
    errorElement: <NotFound />,
    children: [
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    element:<File/>,
    path:"file"
  },
  {
    element: <ProtectedRoute />,
    children:[{
      path:"home",
      element: <Home />
    }]
  },
]);

export default router