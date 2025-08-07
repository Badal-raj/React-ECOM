import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Footer } from "../footer";
import { manageLogout } from "../../redux/features/login/loginSlice";
import { hangleUserDetal } from "../../redux/features/uploadProfilePic/fetchUserDetaiSlice";
//import { persistor } from "../../redux/app/store";
import { Profile_Avaatar } from "../../constants/svg";

export const NavHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openWiget, setOpenWiget] = useState(false);
  const [userData, setUserData] = useState(null);
  let userId = sessionStorage.getItem("user-id");

 const { userDetails } = useSelector((state) => state.userDetails);

  useEffect(() => {
      getUserData();
    }, []);
  
    const getUserData = async () => {
      const user_data = await dispatch(hangleUserDetal({ user_id: userId }));
      if (user_data && user_data.meta.requestStatus === "fulfilled") {
        setUserData(user_data?.payload?.result);
      }
    };




  const handleLogOut = () => {
    dispatch(manageLogout());
    // persistor.purge(); //Optionally clear persisted data (from localStorage or sessionStorage)
    navigate("/");
  };

  const handleWigetClick = () => {
    setOpenWiget((prev) => !prev);
  };

  return (
    <>
      <div className="header-container">
        <div className="header-section-container">
          <ul className="nav-link">
            <li>
              <Link to="">Product</Link>
            </li>
            <li>
              <Link to="add-product">Add Product</Link>
            </li>
            <li>Update Product</li>
          </ul>
          <div className="profile-detail-container" onClick={handleWigetClick}>
            {
              userDetails ? 
              <div className="profile-wiget-container">
              <img
                src={
                 userDetails?.profilePic
                    ? `http://localhost:8001${userDetails?.profilePic}`
                    : Profile_Avaatar
                }
                alt="img"
                className="profile-pic"
              />
            </div> : 
            <div className="profile-wiget-container">
              <img
                src={
                 userData?.profilePic
                    ? `http://localhost:8001${userData?.profilePic}`
                    : Profile_Avaatar
                }
                alt="img"
                className="profile-pic"
              />
            </div>
            }
            
            {openWiget ? (
              <div className="profile-file-container">
                <ul>
                  <li>
                    <Link to="profile">Profile</Link>
                  </li>
                  <li>
                    <Link onClick={handleLogOut} to="/">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};
