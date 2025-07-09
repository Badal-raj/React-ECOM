import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Footer } from "../footer";
import { manageLogout } from "../../redux/features/login/loginSlice";
import { persistor } from "../../redux/app/store";

export const NavHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(manageLogout());
   // persistor.purge(); //Optionally clear persisted data (from localStorage or sessionStorage)
    navigate("/");
  };
  
  return (
    <>
      <div className="header-container">
        <ul className="nav-link">
          <li>
            <Link to="">Product</Link>
          </li>
          <li>
            <Link to="add-product">Add Product</Link>
          </li>
          <li>
           Update Product
          </li>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li>
            <Link onClick={handleLogOut} to="/">Logout</Link>
          </li>
        </ul>
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};
