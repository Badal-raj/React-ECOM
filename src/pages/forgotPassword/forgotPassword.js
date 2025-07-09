import React from "react";
import { TextBox, Button } from "../../components/common";

export const ForgotPasswordPage = ({
  passFiled,
  error,
  handleChange,
  handldeBack,
  handleSendOtp,
}) => {
  return (
    <>
      <div className="page-container d-flex">
        <div className="page-body no-overflow bg-white">
          <h5 className="d-flex justify-content-center py-3 my-4 e-comm-style">
            Forget Password
          </h5>
          <div className="fields-container mt-3">
            <div className="my-2 mx-3">
              <TextBox
                name="emailId"
                type="text"
                id="email-id"
                className="form-control"
                placeholder="Enter Registered Email Id"
                label="email Id*"
                value={passFiled}
                error={error}
                onChange={handleChange}
              />
            </div>
            <div className="my-2 mx-3">
              <Button
                className="button-style w-100 my-2"
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            </div>
            <span className="d-flex mx-3 justify-content-end">
              <span className="theme-link-style" onClick={handldeBack}>
                {" "}
                {"<- Back"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
