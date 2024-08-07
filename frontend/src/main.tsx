import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/auth/login.tsx";
import NotFound from "./pages/error/notFound.tsx";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";

import SignUp from "./pages/auth/signUp.tsx";
import Auth from "./pages/auth/auth.tsx";
import { Provider } from "react-redux";
import store from "./state/store.ts";
import Home from "./pages/client/home.tsx";
import { Toaster } from "sonner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate replace={true} to={"/auth/login"} />,
    errorElement: <NotFound />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <NotFound />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },{
    path: "/home",
    element: <Home />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Toaster richColors theme="dark" position="bottom-right" />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
