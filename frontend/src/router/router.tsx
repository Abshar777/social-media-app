import Auth from "@/pages/auth/auth";
import Login from "@/pages/auth/login";
import SignUp from "@/pages/auth/signUp";
import Home from "@/pages/client/home";
import NotFound from "@/pages/error/notFound";
import { createBrowserRouter, Navigate } from "react-router-dom";

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
    path: "/home",
    element: <Home />,
  },
]);

export default router