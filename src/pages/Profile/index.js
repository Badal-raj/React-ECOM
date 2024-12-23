import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { UploadProfile } from "./profile";
import { handleUploadProfilePic } from "../../redux/features/uploadProfilePic/uploadProfileSlice";
import { hangleUserDetal } from "../../redux/features/uploadProfilePic/fetchUserDetaiSlice";

export const UserProfileDetails = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  const [userDetails, setUserDetails] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  let userId = sessionStorage.getItem("user-id");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user_data = await dispatch(hangleUserDetal({ user_id: userId }));
    if (user_data && user_data.meta.requestStatus === "fulfilled") {
      setUserDetails(user_data?.payload?.result);
    }
  };

  const handleChange = (e) => {
    const imgSrc = e.target.files[0];
    if (imgSrc) {
      setImgUrl(imgSrc);
      const objectURL = URL.createObjectURL(imgSrc); // Create a URL for the selected file
      // setFile(objectURL);
    }
  };

  const handleUploadFile = async (e) => {
    e.preventDefault();
    
    if (imgUrl) {
      try {
        const formData = new FormData();
        formData.append("profilePic", imgUrl);
        formData.append("userId", userId);

        const apiResponse = await dispatch(handleUploadProfilePic(formData));

        if (apiResponse && apiResponse.meta.requestStatus === "fulfilled") {
          toast.success(apiResponse.payload.message);
          getUserData();
          setImgUrl(null);
          if(fileInputRef.current){
            fileInputRef.current.value = ""
          }
        } else {
          toast.error(apiResponse.payload);
        }
      } catch (error) {
        console.error(error);
      }
    }else {
      toast.error("Please select the image");
    }
  };

  return (
    <>
      <UploadProfile
        file={userDetails}
        fileInputRef={fileInputRef}
        handleChange={handleChange}
        handleUploadFile={handleUploadFile}
      />
    </>
  );
};
