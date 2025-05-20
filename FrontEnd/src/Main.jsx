import React from "react";
import { createRoot } from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import TaskManager from "./components/Task/Tasks";

const router = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/register",element:<Register/>},
    {path:"/dashboard",element:<Dashboard/>},
    { path:"/project/:projectId", element:<TaskManager />}

])
const domNode = document.getElementById("root");
const root = createRoot(domNode)

root.render(
    <RouterProvider router={router}/>

)
