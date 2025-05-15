import React from "react";
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Home from "../src/components/Home/Home";

const router = createBrowserRouter([
    {path:"/",element:<Home/>}
])
const domNode = document.getElementById("root");
const root = createRoot(domNode)

root.render(
    <RouterProvider router={router}/>
)
