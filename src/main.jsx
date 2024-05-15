import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import About from "./pages/about/about";
import Services from "./pages/services/services";
import Dashboard from "./pages/dashboard/dashboard";
import UsersDashboard from "./pages/dashboard/users/usersDashboard";
import ProductsDashboard from "./pages/dashboard/products/productsDashboard";
import OrdersDashboard from "./pages/dashboard/orders/ordersDashboard";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { GoogleOAuthProvider } from "@react-oauth/google"
import Cart from "./pages/cart/cart"
import Products from "./pages/products/products";
import Product from "./pages/product/product";

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
        path: "/users_dashboard",
        element: <UsersDashboard/>,
    },
    {
        path: "/products_dashboard",
        element: <ProductsDashboard/>,
    },
    {
        path: "/orders_dashboard",
        element: <OrdersDashboard/>,
    },
    {
        path: "/login",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,
    },
    {
        path: "/cart",
        element: <Cart/>,
    },
    {
        path: "/products/:keyword?",
        element: <Products/>,
    },
    {
        path: "/product/:id",
        element: <Product />
    }
]);

createRoot (document.getElementById("root")).render (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <React.StrictMode>
            <RouterProvider router = {router} />
        </React.StrictMode>
    </GoogleOAuthProvider>
);
