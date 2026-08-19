/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeSlash } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";

function AdminChangePassword({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const account = state.createAccount?.accountList;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

  const validate = () => {
    let newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Please Enter Current Password";
    }

    if (!newPassword) {
      newErrors.newPassword = "Please Enter New Password";
    } else if (!passwordRegex.test(newPassword)) {
      newErrors.newPassword =
        "Password must be 8+ characters, include upper, lower, number & special symbol";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please Enter Confirm Password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_UPDATE_CHANGEPASSWORD_ERROR" });
    if (!validate()) return;

    if (currentPassword && newPassword) {
      dispatch({
        type: "PASSWORD_UPDATE",
        payload: {
          currentPassword: currentPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.createAccount.statusCodeForPasswordUpdateSuccess === 200) {
      dispatch({ type: "ACCOUNTDETAILS" });
      setFormLoading(false);
      dispatch({ type: "LOGOUTADMINSAGA", payload: { source: "WEB" } });
      const token = cookies.get("v2-token");
      if (!token) {
        dispatch({ type: "LOG_OUT" });
        dispatch({ type: "RESET_ALL" });
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
        localStorage.setItem("login", encryptData.toString());
        return;
      }
      handleClose();
      setTimeout(() => {
        dispatch({ type: "REMOVE-PASSWORD-UPDATE" });
      }, 200);
    }
  }, [state.createAccount.statusCodeForPasswordUpdateSuccess]);

  useEffect(() => {
    if (
      state.createAccount.passwordUpdateError ||
      state.createAccount?.networkError
    ) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 300);
    }
  }, [
    state.createAccount.passwordUpdateError,
    state.createAccount?.networkError,
  ]);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className=" px-4 py-3 shrink-0 border-b flex items-center flex-col gap-2">
          <h2 className="text-[22px] font-semibold text-[#1F2633] ">
            Reset Password for {account?.firstName} {account?.lastName}
          </h2>

          <p className="mt-2 text-[12px] text-gray-500 leading-5 mb-0">
            This will generate a new temporary password and invalidate the
            current login credentials.
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[500px] relative">
          <div className="mt-6">
            <label className="text-[14px] text-gray-700">
              Current Password <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-2">
              <input
                autoComplete="off"
                name="current_password"
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                placeholder="Enter current password"
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                  setErrors({ ...errors, currentPassword: "" });
                  dispatch({ type: "REMOVE_UPDATE_CHANGEPASSWORD_ERROR" });
                }}
                className={`w-full h-[48px] px-4 pr-12 rounded-lg border ${
                  errors.currentPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]`}
              />

              {showCurrent ? (
                <Eye
                  size="20"
                  color="#9CA3AF"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrent(false)}
                />
              ) : (
                <EyeSlash
                  size="20"
                  color="#9CA3AF"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowCurrent(true)}
                />
              )}
            </div>

            {errors.currentPassword && (
              <ErrorMessage message={errors.currentPassword} type="error" />
            )}
          </div>

          <div className="mt-2">
            <label className="text-[14px] text-gray-700">
              New Password <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-2">
              <input
                autoComplete="new-password"
                name="new_password"
                type={showNew ? "text" : "password"}
                value={newPassword}
                placeholder="Enter new password"
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrors({ ...errors, newPassword: "" });
                  dispatch({ type: "REMOVE_UPDATE_CHANGEPASSWORD_ERROR" });
                }}
                className={`w-full h-[48px] px-4 pr-12 rounded-lg border ${
                  errors.newPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]`}
              />

              {showNew ? (
                <Eye
                  size="20"
                  color="#9CA3AF"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNew(false)}
                />
              ) : (
                <EyeSlash
                  size="20"
                  color="#9CA3AF"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowNew(true)}
                />
              )}
            </div>

            {errors.newPassword && (
              <ErrorMessage message={errors.newPassword} type="error" />
            )}
          </div>

          <div className="mt-2">
            <label className="text-[14px] text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>

            <div className="relative mt-2">
              <input
                autoComplete="new-password"
                name="confirm_password"
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                placeholder="Enter confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrors({ ...errors, confirmPassword: "" });
                  dispatch({ type: "REMOVE_UPDATE_CHANGEPASSWORD_ERROR" });
                }}
                className={`w-full h-[48px] px-4 pr-12 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]`}
              />

              {showConfirm ? (
                <Eye
                  size="20"
                  color="#9CA3AF"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirm(false)}
                />
              ) : (
                <EyeSlash
                  size="20"
                  color="#9CA3AF"
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirm(true)}
                />
              )}
            </div>

            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword} type="error" />
            )}
          </div>
          {formLoading && (
            <div className="absolute inset-0  flex items-center justify-center rounded-2xl z-50">
              <div className="w-12 h-12 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        {state.createAccount.passwordUpdateError && (
          <ErrorMessage
            message={state.createAccount.passwordUpdateError}
            type="error"
          />
        )}

        <div className="m-4 flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="h-[44px] px-6 rounded-lg border border-gray-300 text-gray-700 text-[14px] font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={formLoading}
            onClick={handleSubmit}
            className="h-[44px] px-6 rounded-lg bg-[#1E45E1] text-white text-[14px] font-medium hover:bg-blue-700 transition
                         disabled:!bg-gray-300 
                        disabled:!text-gray-500 disabled:!cursor-not-allowed disabled:!opacity-70"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
AdminChangePassword.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default AdminChangePassword;
