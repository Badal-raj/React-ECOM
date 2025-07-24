import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { ResetPasswordPage } from "./ResetPasswordPage";
import { emptyFields, PasswordLength } from "../../constants/messages";

//import { loginFormData } from "../../redux/features/login/loginSlice";
import { resetPasswordData } from "../../redux/features/resetPassword/resetPasswordSlice";

export const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [fields, setFields] = useState({
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmpassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setErrors((prev) => ({ ...prev, [name]: !value ? emptyFields : "" }));
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const formValidation = () => {
    let isFormValid = true;
    let { password, confirmpassword } = fields;
    if (!password) {
      errors.password = emptyFields;
      isFormValid = false;
    } else if (password && password.length < 6) {
      errors.password = PasswordLength;
      isFormValid = false;
    } else if (password !== confirmpassword) {
      isFormValid = false;
      toast.warning("Password and confirm password should be same");
    }
    setErrors({ ...errors });
    return isFormValid;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      const fieldsData = {
        password: fields.password
      };
      let fieildsData= {id: id,  token: token,  password: fields.password}
      try {
        const result = await dispatch(resetPasswordData(fieildsData));
        if (result && result.meta.requestStatus === "fulfilled") {
          toast.success(result.payload.message);
           navigate("/");
           handleResetFields();
        } else {
          toast.error(result.payload.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleResetFields = () => {
    setFields({
      password: "",
      confirmpassword: "",
    });
  };

  const handleEyeClick = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <ResetPasswordPage
        fields={fields}
        errors={errors}
        handleChange={handleChange}
        showPassword={showPassword}
        handleResetPassword={handleResetPassword}
        handleEyeClick={handleEyeClick}
      />
    </>
  );
};
