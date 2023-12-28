import MainLayout from "layouts/MainLayout";
import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  const user:string | null= localStorage.getItem("accessToken");
  return <MainLayout />;
    // if (user !== null || user !== undefined) {
    //   return <Navigate to={{ pathname: "/login" }} />;
    // } else return <MainLayout />;
};

export default ProtectedRoute;
