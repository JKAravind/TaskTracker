import React from "react";
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "../src/components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const router = createBrowserRouter([
    {path:"/",element:<Home/>},
    {path:"/register",element:<Register/>},
    {path:"/login",element:<Login/>}
])
const domNode = document.getElementById("root");
const root = createRoot(domNode)

root.render(
    <RouterProvider router={router}/>
)
