import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from 'react-toastify';

import { RegistrationPage } from "./registraationPage";
import { isValidEmail, numberOnly } from "../../constants/regexs";
import { emptyFields, mobNoLength, invalidEmail, PasswordLength } from "../../constants/messages";

import { registrationFormData } from "../../redux/features/registration/registrationSlice";

export const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.registeredData);

  const [fields, setFields] = useState({
    userName: "",
    emailId: "",
    mobileNo: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    userName: "",
    emailId: "",
    mobileNo: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(()=>{
  if(error){
    toast.error(error  || 'Failed to signup')
  }
  },[error])

  const handleSignIn = () => {
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(name === "emailId" && !isValidEmail.test(fields[name]=value)){
        setErrors((prev)=>({...prev, [name]: !value ? emptyFields : invalidEmail}))
    }else if(name === "mobileNo"){
        setErrors((prev)=>({...prev, [name]: !value ? emptyFields : value.length === 10 ? "" : mobNoLength}))
    }
     else{
    setErrors((prev)=>({...prev, [name]: !value ? emptyFields : ""}))
    }
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e) => {
    // Allow only numeric keys (0-9), backspace (for deletion), and delete
    if (!numberOnly.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault(); // Prevent non-numeric input
    }
  };

  const formValidation = () => {
    let isFormValid = true;
    if (!fields.userName) {
      errors.userName = emptyFields;
      isFormValid = false;
    }
    if (!fields.emailId) {
      errors.emailId = emptyFields;
      isFormValid = false;
    }else if(!isValidEmail.test(fields.emailId)){
        errors.emailId = invalidEmail;
        isFormValid = false;
    }

    if (!fields.mobileNo) {
      errors.mobileNo = emptyFields;
      isFormValid = false;
    }else if(fields.mobileNo && fields.mobileNo.length !==10){
        errors.mobileNo = mobNoLength;
      isFormValid = false; 
    }

    if (!fields.password) {
      errors.password = emptyFields;
      isFormValid = false;
    }else if(fields.password && fields.password.length < 6){
        errors.password = PasswordLength;
        isFormValid = false;
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleResetFields = () =>{
    setFields({
      userName: "",
      emailId: "",
      mobileNo: "",
      password: "",
    })
  }

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (formValidation()) {      
      const fieldsData = {
        userName: fields.userName,
        email: fields.emailId,
        phoneNo: fields.mobileNo,
        password: fields.password
       }
       try {
       const result = await dispatch(registrationFormData(fieldsData));
       //here we are handling the success case
       if(result && result.meta.requestStatus === "fulfilled"){
        toast.success(result.payload.message)
        handleResetFields();
        navigate("/");
       }
       //here we can also handle the rejected case like "fullfilled" instead of useEffect
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <RegistrationPage
        fields={fields}
        errors={errors}
        showPassword={showPassword}
        handleSignIn={handleSignIn}
        handleChange={handleChange}
        handleRegistration={handleRegistration}
        handleEyeClick={handleEyeClick}
        onKeyDown={handleKeyDown}
        loading={loading}
      />
    </>
  );
};
