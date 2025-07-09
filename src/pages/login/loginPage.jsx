import React from "react";

import { TextBox, PasswordBox, Button } from "../../components/common";

export const LoginPage = ({
  fields,
  errors,
  showPassword,
  handleLogin,
  handleNewRegistration,
  handleEyeClick,
  handleChange,
  handleForgetPassword
}) => {
  return (
    <div className="page-container d-flex">
      <div className="page-body no-overflow bg-white">
        <h5 className="d-flex justify-content-center py-3 my-4 e-comm-style">
          E-Comm Login
        </h5>
        <div className="fields-container mt-3">
          <div className="my-2 mx-3">
            <TextBox
              name="userId"
              type="text"
              id="email-mobno"
              className="form-control"
              placeholder="User Name"
              label="User id or Mobile no.*"
              value={fields.userId}
              error={errors?.userId}
              onChange={handleChange}
            />
          </div>
          <div className="my-2 mx-3">
            <PasswordBox
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control"
              placeholder="Password"
              label="Password*"
              value={fields.password}
              error={errors?.password}
              onChange={handleChange}
              showPassword={showPassword}
              handleEyeClick={handleEyeClick}
            />
          </div>
          <div className="my-2 mx-3">
            <Button className="button-style w-100 my-2" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </div>

        <span className="d-flex mx-3 justify-content-end">
          <span className="theme-link-style" onClick={handleForgetPassword}>Forgot Password ?</span>
        </span>

        <span className="d-flex justify-content-end mx-3 my-2">
          <span className="info-text">
            Not registered yet?
            <span
              className="theme-link-style mx-2"
              onClick={handleNewRegistration}
            >
              {" "}
              Create an account
            </span>
          </span>
        </span>
      </div>
    </div>
  );
};
