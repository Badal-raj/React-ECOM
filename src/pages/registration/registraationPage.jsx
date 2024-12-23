import React from "react";
import { TextBox, PasswordBox, Button } from "../../components/common";

export const RegistrationPage = ({
  fields,
  errors,
  showPassword,
  handleSignIn,
  handleChange,
  handleRegistration,
  handleEyeClick,
  onKeyDown,
  loading
}) => {
  return (
    <>
      <div className="page-container d-flex">
        <div className="page-body no-overflow bg-white">
          <h5 className="d-flex justify-content-center py-2 mt-3 e-comm-style">
            E-Comm Registration
          </h5>
          <div className="fields-container">
            <div className="my-2 mx-3">
              <TextBox
                name="userName"
                type="text"
                id="userName_id"
                className="form-control"
                placeholder="Name"
                label="Name*"
                value={fields.userName}
                error={errors?.userName}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextBox
                name="emailId"
                type="text"
                id="email_id"
                className="form-control"
                placeholder="Emial Id"
                label="Email Id*"
                value={fields.emailId}
                error={errors?.emailId}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <TextBox
                name="mobileNo"
                type="text"
                id="mobile_no"
                className="form-control"
                placeholder="mobile no"
                label="Mobile No.*"
                value={fields.mobileNo}
                error={errors?.mobileNo}
                onChange={handleChange}
                onKeyDown={onKeyDown}
              />
            </div>
            <div className="my-2 mx-3">
              <PasswordBox
                name="password"
                type={showPassword ? "text" : "password"}
                id="pass_id"
                className="form-control"
                placeholder="Password"
                label="Password*"
                showPassword={showPassword}
                value={fields.password}
                error={errors?.password}
                onChange={handleChange}
                handleEyeClick={handleEyeClick}
              />
            </div>
            <div className="my-2 mx-3">
              <Button
                className="button-style w-100 my-2"
                onClick={handleRegistration}
                loading={loading}
              >
                {loading ? "registering" : "Register"}
              </Button>
            </div>
          </div>
          <span className="d-flex justify-content-end my-2 mx-3">
            <span className="info-text">
              Already have account?
              <span className="theme-link-style mx-2" onClick={handleSignIn}>
                Sign In
              </span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};
