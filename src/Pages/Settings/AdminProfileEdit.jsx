/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash, Camera } from "iconsax-react";
import AdminProfile from '../../Assets/v2Images/adminprofile.png'
import ErrorMessage from '../../Components/ErrorMessage'


function AdminProfileEdit({ show, handleClose }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    const [errors, setErrors] = useState({});
    const [hoverImage, setHoverImage] = useState(false);

    if (!show) return null;


    const account = state.createAccount?.accountList


    useEffect(() => {
        if (account) {
            setFirstName(account?.firstName)
            setLastName(account?.lastName)
            setMobile(account?.mobileNo)
            setEmail(account?.mailId)
            // setProfileImage(account?.)

        }

    }, [account])

    const validate = () => {
        let newErrors = {};

        if (!firstName.trim())
            newErrors.firstName = "Please Enter First Name";

        if (!mobile.trim())
            newErrors.mobile = "Please Enter Mobile Number";
        else if (!/^\d{10}$/.test(mobile.replace(/\s/g, "")))
            newErrors.mobile = "Mobile number must be 10 digits";

        if (!email.trim())
            newErrors.email = "Please Enter Email";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            newErrors.email = "Please Enter Valid Email Id";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        setErrors((prev) => ({ ...prev, firstName: "" }));
        setErrors((prev) => ({ ...prev, noChange: "" }));
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
        setErrors((prev) => ({ ...prev, noChange: "" }));
    };

    const handleMobileChange = (e) => {
        let value = e.target.value;


        value = value.replace(/\D/g, "");


        if (value.length > 10) return;

        setMobile(value);
        setErrors((prev) => ({ ...prev, mobile: "" }));
        setErrors((prev) => ({ ...prev, noChange: "" }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors((prev) => ({ ...prev, email: "" }));
        setErrors((prev) => ({ ...prev, noChange: "" }));
    };


    const isChanged = () => {
        if (!account) return false;

        return (
            firstName?.trim() !== account?.firstName ||
            lastName?.trim() !== account?.lastName ||
            email?.trim() !== account?.mailId ||
            mobile !== account?.mobileNo
            // profileImage !== null 
        );
    };



    const handleSubmit = () => {
        setErrors((prev) => ({ ...prev, noChange: "" }));
        dispatch({ type: 'REMOVE_UPDATE_PROFILE_ERROR' })
        if (!validate()) return;


        if (!isChanged()) {
            setErrors((prev) => ({
                ...prev,
                noChange: "No changes detected",
            }));
            return;
        }





       
        const payload = {
            profilePic: profileImage || null,
            payloads: {
                firstName: firstName?.trim(),
                lastName: lastName?.trim(),
                emailId: email?.trim(),
                mobile: mobile,
            }
        };

        dispatch({
            type: "PROFILE-UPDATE",
            payload: payload,
        });
        setFormLoading(true)

    };


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        if (state.createAccount?.statuscodeforUpdateprofile) {
            dispatch({ type: "ACCOUNTDETAILS" });
            setFormLoading(false)
            handleClose()
            setTimeout(() => {
                dispatch({ type: 'CLEAR_UPDATE_STATUS_CODE_ACCOUNT' })
            }, 1000)
        }


    }, [state.createAccount?.statuscodeforUpdateprofile])

    useEffect(() => {
        if (state.createAccount?.profileUpdateError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_UPDATE_PROFILE_ERROR' })
            }, 1000)

        }

    }, [state.createAccount?.profileUpdateError])


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] font-['Gilroy']">

            <div className="relative w-[520px] bg-white rounded-2xl p-4 shadow-xl">

                {formLoading && (
                    <div className="absolute inset-0  flex items-center justify-center rounded-2xl z-50">
                        <div className="w-12 h-12 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                <div className="flex items-center gap-2 mb-2">
                    <Edit2 size="20" color="#111827" />
                    <h2 className="text-[20px] font-semibold text-gray-800">
                        Edit Profile
                    </h2>
                </div>

                <div className="overflow-y-auto h-[450px] show-scrolls">



                    <div className="flex justify-center mb-2">
                        <div
                            className="relative w-[70px] h-[70px] rounded-full overflow-hidden border border-gray-200"
                            onMouseEnter={() => setHoverImage(true)}
                            onMouseLeave={() => setHoverImage(false)}
                        >

                            <img
                                src={profileImage || AdminProfile}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />


                            <label
                                className={`absolute inset-0 flex items-center justify-center 
      bg-black/40 cursor-pointer transition duration-200 
      ${hoverImage ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className="bg-white p-2 rounded-full shadow-md">
                                    <Camera size="16" color="#000000" />
                                </div>

                                <input type="file" hidden onChange={handleImageUpload} />
                            </label>


                        </div>
                    </div>


                    <div className="mb-2">
                        <label className="text-[14px] text-gray-700">
                            First Name <span className="text-red-500 text-base">*</span>
                        </label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={handleFirstNameChange}
                            placeholder="Please Enter First Name"
                            className={`w-full h-[44px] mt-2 px-3  shadow-none rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]`}
                        />
                        {errors.firstName && (
                            <ErrorMessage message={errors.firstName} type="error" />
                        )}
                    </div>


                    <div className="mb-2">
                        <label className="text-[14px] text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            value={lastName}
                            placeholder="Please Enter Last Name"
                            onChange={handleLastNameChange}
                            className="w-full h-[44px] mt-2 px-3 shadow-none rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]"
                        />
                    </div>


                    <div className="mb-2">
                        <label className="text-[14px] text-gray-700">
                            Mobile No <span className="text-red-500 text-base">*</span>
                        </label>
                        <div className="flex mt-2">
                            <span className="flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-[14px]">
                                +91
                            </span>
                            <input
                                type="text"
                                value={mobile}
                                placeholder="Please Enter Mobile Number"
                                onChange={handleMobileChange}
                                className={`w-full h-[44px] px-3 shadow-none rounded-r-lg border ${errors.mobile ? "border-red-500" : "border-gray-300"
                                    } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]`}
                            />
                        </div>
                        {errors.mobile && (
                            <ErrorMessage message={errors.mobile} type="error" />
                        )}
                    </div>


                    <div className="mb-2">
                        <label className="text-[14px] text-gray-700">
                            Email ID  <span className="text-red-500 text-base">*</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Please Enter Email Id"
                            className={`w-full h-[44px] mt-2 px-3 shadow-none rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"
                                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-[14px]`}
                        />
                        {errors.email && (
                            <ErrorMessage message={errors.email} type="error" />
                        )}
                        {errors.noChange && (
                            <div className="flex justify-center">
                                <ErrorMessage message={errors.noChange} type="error" />
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex justify-end gap-4">
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
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AdminProfileEdit;