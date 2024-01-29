import React from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
const ProtectedRoute = () => {
  const user = localStorage.getItem("accessToken");
  return <MainLayout />;
    // if (user !== null || user !== undefined) {
    //   return <Navigate to={{ pathname: "/login" }} />;
    // } else return <MainLayout />;
};

export default ProtectedRoute;
