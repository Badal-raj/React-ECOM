import React from "react";
import { dummyprofile_pic } from "../../constants/images";

const PROFILE_BASE_URL = process.env.REACT_APP_PROFILE_PIC;

export const UploadProfile = ({ file, fileInputRef, handleChange, handleUploadFile }) => {
  
  return (
    <div className="p-3 d-flex">
      <div className="w-50 mx-3">
        <div className="">
          <input
            type="file"
            id="customFile"
            className="form-control mb-2"
            onChange={handleChange}
            ref={fileInputRef}
          />
          <button onClick={handleUploadFile} className="w-25">Upload</button>
        </div>
        <div className="my-4 d-flex flex-column">
          <span className="my-2">name: {" " + file?.name ? file?.name : "__"}</span>
          <span className="my-2">email: {" " + file?.email ? file?.email : "__"}</span>
          <span className="my-2">mob no: {" " + file?.mobileNo ? file?.mobileNo : "__"}</span>
        </div>
      </div>
      <div className="photo-container mx-4">
          <img
            src={ file?.profilePic ? `${PROFILE_BASE_URL}${file?.profilePic}` : dummyprofile_pic}
            alt="img"
            className="img-style"
          />
      </div>
    </div>
  );
};
