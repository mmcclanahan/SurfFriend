import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SurfSpotsPage } from "./pages/SurfSpotsPage.tsx";
import { CalendarPage } from "./pages/CalendarPage.tsx";
import { StatusPage } from "./pages/StatusPage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { HomePage } from "./pages/HomePage.tsx";
import { Layout } from "./components/Layout.tsx";
import { PrivateRoute } from "./components/PrivateRoute.tsx";
import { NotificationProvider } from "./providers/NotificationProvider.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";

import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/",
    element: <PrivateRoute />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <Layout />,
        children: [
          { path: "/spots", element: <SurfSpotsPage /> },
          { path: "/status", element: <StatusPage /> },
          { path: "/calendar", element: <CalendarPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NotificationProvider>
      <UserProvider>
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </NotificationProvider>
  </React.StrictMode>
);
