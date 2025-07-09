import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { LoginPage } from "./loginPage";
import { emptyFields, PasswordLength } from "../../constants/messages";

import { loginFormData } from "../../redux/features/login/loginSlice";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    userId: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userId: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: !value ? emptyFields : "" }));
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const formValidation = () => {
    let isFormValid = true;
    if (!fields.userId) {
      errors.userId = emptyFields;
      isFormValid = false;
    }
    if (!fields.password) {
      errors.password = emptyFields;
      isFormValid = false;
    } else if (fields.password && fields.password.length < 6) {
      errors.password = PasswordLength;
      isFormValid = false;
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    if (formValidation()) {
      const fieldsData = {
        email: fields.userId,
        password: fields.password,
      };
      const result = await dispatch(loginFormData(fieldsData));
      
      if (result && result.meta.requestStatus === "fulfilled") {
        toast.success(result.payload.message);
        sessionStorage.setItem("user-id", result.payload?.userId);
        setFields({
          userId: "",
          password: "",
        })
        navigate("/dashboard");
      } else {
        toast.error(result.payload);
      }
    }
  };

  const handleNewRegistration = () => {
    navigate("/registration");
  };

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev);
  };

  const handleForgetPassword =()=>{
     navigate("/forgot-password");
  }

  return (
    <>
      <LoginPage
        fields={fields}
        errors={errors}
        showPassword={showPassword}
        handleLogin={handleLogin}
        handleNewRegistration={handleNewRegistration}
        handleEyeClick={handleEyeClick}
        handleChange={handleChange}
        handleForgetPassword={handleForgetPassword}
      />
    </>
  );
};
