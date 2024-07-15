import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SurfSpotsPage } from "./pages/SurfSpotsPage.tsx";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { StatusPage } from "./pages/StatusPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { Layout } from "./components/Layout.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <SurfSpotsPage userId={1} /> },
      { path: "/status", element: <StatusPage userId={1} /> },
      { path: "/calendar", element: <CalendarPage userId={1} /> },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
