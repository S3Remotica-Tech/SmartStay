
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeSlash } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage'

function AdminChangePassword({ show, handleClose }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [errors, setErrors] = useState({});
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const account = state.createAccount?.accountList
    if (!show) return null;

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        console.log("Current:", currentPassword);
        console.log("New:", newPassword);



        handleClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] font-['Gilroy']">
            <div className="w-[520px] bg-white rounded-2xl p-8 shadow-xl">


                <h2 className="text-[22px] font-semibold text-[#1F2633]">
                    Reset Password for {account?.firstName} {account?.lastName}
                </h2>

                <p className="mt-2 text-[14px] text-gray-500 leading-5">
                    This will generate a new temporary password and invalidate the
                    current login credentials.
                </p>


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
                            }}
                            className={`w-full h-[48px] px-4 pr-12 rounded-lg border ${errors.currentPassword
                                ? "border-red-500"
                                : "border-gray-300"
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
                       <ErrorMessage  message={errors.currentPassword} type="error" />
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
                                }}
                                className={`w-full h-[48px] px-4 pr-12 rounded-lg border ${errors.newPassword ? "border-red-500" : "border-gray-300"
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
                           <ErrorMessage  message={errors.newPassword} type="error" />
                        )}
                    </div>
                   
               

                <div className="mt-8 flex justify-end gap-4">
                    <button
                        onClick={handleClose}
                        className="h-[44px] px-6 rounded-lg border border-gray-300 text-gray-700 text-[14px] font-medium hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="h-[44px] px-6 rounded-lg bg-[#1E45E1] text-white text-[14px] font-medium hover:bg-blue-700 transition"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminChangePassword;