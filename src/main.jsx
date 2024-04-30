import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import About from "./pages/about/about";
import Services from "./pages/services/services";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/dashboard/users/users";
import Products from "./pages/dashboard/products/products";
import Orders from "./pages/dashboard/orders/orders";

const router = createBrowserRouter ([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/contact",
        element: <Contact/>,
    },
    {
        path: "/about",
        element: <About/>,
    },
    {
        path: "/services",
        element: <Services/>,
    },
    {
        path: "/dashboard",
        element: <Dashboard/>,
    },
    {
        path: "/users",
        element: <Users/>,
    },
    {
        path: "/products",
        element: <Products/>,
    },
    {
        path: "/orders",
        element: <Orders/>,
    },
]);

createRoot (document.getElementById("root")).render (
    <React.StrictMode>
        <RouterProvider router = {router} />
    </React.StrictMode>
);
