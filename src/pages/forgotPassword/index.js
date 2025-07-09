import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ForgotPasswordPage } from "./forgotPassword";
import { emptyFields } from "../../constants/messages";

export const ForgetPassword = () => {
  const [passFiled, setPassField] = useState("");
  const [error, setErrors] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    setPassField(value);
    setErrors(value ? "" : emptyFields);
  };

  const handleSendOtp = () => {
    if (validateForm()) {
      console.log("passFiled", passFiled);
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
