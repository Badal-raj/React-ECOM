import React from "react";

import { PasswordBox, Button } from "../../components/common";

export const ResetPasswordPage = ({
    fields,
    errors,
    handleChange,
    showPassword,
    handleEyeClick,
    handleResetPassword
}) =>{
    return(
        <>
         <div className="page-container d-flex">
              <div className="page-body no-overflow bg-white">
                <h5 className="d-flex justify-content-center py-3 my-4 e-comm-style">
                  E-Comm Reset Password
                </h5>
                <div className="fields-container mt-3">
                  
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
                    <PasswordBox
                      name="confirmpassword"
                      type={showPassword ? "text" : "password"}
                      id="confirmpassword"
                      className="form-control"
                      placeholder="Confirm Password"
                      label="Confirm Password*"
                      value={fields.confirmpassword}
                      error={errors?.confirmpassword}
                      onChange={handleChange}
                      showPassword={showPassword}
                      handleEyeClick={handleEyeClick}
                    />
                  </div>
                  <div className="my-2 mx-3">
                    <Button className="button-style w-100 my-2" onClick={handleResetPassword}>
                      Reset Password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
        </>
    )
}