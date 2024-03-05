import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Components/layout/Main";
import Home from "./Components/Pages/Home";
import User from "./Components/Pages/User";
import Registration from "./Components/Pages/Registration";
import ReadTagID from "./Components/Pages/ReadTagID";
import Update from "./Components/Pages/Update";
import Attendance from "./Components/Pages/Attendance";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    // errorElement : <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/user-data",
        element: <User></User>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/update/:userId",
        element: <Update></Update>,
      },
      {
        path: "/readTagId",
        element: <ReadTagID></ReadTagID>,
      },
      {
        path: "/attendance",
        element: <Attendance></Attendance>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
