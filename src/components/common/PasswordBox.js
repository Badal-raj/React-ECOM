import React from "react";
import { Open_Eye, Close_Eye } from "../../constants/svg";

export const PasswordBox = ({
  type,
  id,
  name,
  className,
  placeholder,
  label,
  value,
  error,
  showPassword,
  onChange,
  handleEyeClick,
}) => {
  return (
    <>
      <div className="password-box-style">
        {label && <label className="label mx-1">{label}</label>}
        {/* <div className="password-box-style"> */}
        <input
          type={type}
          name={name}
          id={id}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <img
          src={showPassword ? Open_Eye : Close_Eye}
          className="eye-style"
          alt="eye"
          onClick={handleEyeClick}
        />
      </div>
      {error && (
        <span className="text-danger small-size fw-normal fst-italic">
          {error}
        </span>
      )}
    </>
  );
};
