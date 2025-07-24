import { BrowserRouter, Routes, Route } from "react-router-dom";
import  {ProtectedRoute} from "./protectedRouter";
import { Registration} from "../pages/registration";
import { Login} from "../pages/login";
import {Dashboard} from "../components/dashboard";
import { Product } from "../pages/product";
//import { AddProduct } from "../components/addProduct";
//import { UpdateProduct } from "../components/updateProduct";
import { Profile } from "../components/profile";
import { NotFoundPage } from "../pages/notFound/notFound"
import { AddProduct } from "../pages/addProduct";
import { UpdateProduct } from "../pages/updateProduct";
import { UserProfileDetails } from "../pages/Profile";
import { ForgetPassword } from "../pages/forgotPassword";
import { ResetPassword } from "../pages/resetPassword";

export const PageRouter = () => {
  return (
    <BrowserRouter>
     {/* <NavHeader/> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} > 
          <Route path="" element={<Product />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update/:id" element={<UpdateProduct />} />
          <Route path="profile" element={<UserProfileDetails />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
