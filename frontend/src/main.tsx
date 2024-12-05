import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme/theme-provider.tsx";
import { Provider } from "react-redux";
import store, { persistor } from "./state/store.ts";
import { Toaster } from "sonner";
import router from "./router/router.tsx";
import { ConformDailogue } from "./components/ui/conformAlert.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <NextUIProvider>
        <Toaster richColors theme="dark" position="bottom-right" />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <ConformDailogue />
              <RouterProvider router={router} />
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </NextUIProvider>
    </ThemeProvider>
  </React.StrictMode>
);
