import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage.tsx";
import { StatusPage } from "./pages/StatusPage.tsx";
import { RatePage } from "./pages/RatePage.tsx";
import { NotFoundPage } from "./pages/NotFoundPage.tsx";
import { LoginPage } from "./pages/LoginPage.tsx";
import { Layout } from "./components/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/status", element: <StatusPage /> },
      { path: "/rate", element: <RatePage /> },
    ],
  },
]);
//header and footer components
//header home button / profile button / shows all navigation
//footer can be an about us / contact us / privacy policy / terms of service
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
