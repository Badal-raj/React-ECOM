import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { toast } from 'react-toastify';

import { ForgotPasswordPage } from "./forgotPassword";
import { emptyFields } from "../../constants/messages";
import { forgotPasswordFormData } from "../../redux/features/forgotPassword/forgotPasswordSlice"

export const ForgetPassword = () => {
  const [passFiled, setPassField] = useState("");
  const [error, setErrors] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value } = e.target;
    setPassField(value);
    setErrors(value ? "" : emptyFields);
  };

  const handleSendOtp = async() => {
    if (validateForm()) {
        try {
            const result = await dispatch(forgotPasswordFormData({ email: passFiled}));
             if(result && result.meta.requestStatus === "fulfilled"){
              toast.success(result.payload.message);
              setPassField("")
             }
            } catch (error) {
              console.error(error);
            }
    }
  };

  const validateForm = () => {
    let isFormValid = true;
    if (!passFiled) {
      isFormValid = false;
      setErrors(emptyFields);
    }
    return isFormValid;
  };

  const handldeBack = () => {
    navigate("/");
  };
  return (
    <>
      <ForgotPasswordPage
        handldeBack={handldeBack}
        passFiled={passFiled}
        handleChange={handleChange}
        handleSendOtp={handleSendOtp}
        error={error}
      />
    </>
  );
};
