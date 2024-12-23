import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
   let auth =  sessionStorage.getItem('user-id');
   let validToken = localStorage.getItem("access-token")
  return auth && validToken ?  <Outlet /> : <Navigate to="/" />;
};
