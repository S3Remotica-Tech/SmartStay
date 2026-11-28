/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Form from "react-bootstrap/Form";
import eye from "../../Assets/Images/login-password.png";
import eyeClosed from "../../Assets/Images/Show_password.png";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldRequiredClass,
  fieldGroupClass,
  fieldClass,
  fieldLabelClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

function User({ show, editDetails, setAddUserForm, edit }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [initialState, setInitialState] = useState({});
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const [hostel_Id, setHostel_Id] = useState("");
  const [user_Id, setUser_Id] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
    }
  }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    dispatch({
      type: "SETTING_ROLE_LIST",
      payload: state.login.selectedHostel_Id,
    });
  }, []);

  useEffect(() => {
    if (editDetails && edit) {
      // const mobileNo = String(editDetails.mobileNo || "");
      // const countryCode = mobileNo.slice(0, 2);
      // const mobileNumber = mobileNo.slice(2);

      const initial = {
        name: editDetails.fullName || "",
        email: editDetails.mailId || "",
        mobile: editDetails.mobileNo,
        countryCode: editDetails.countryCode,
        role: editDetails.roleId || "",
        description: editDetails.description || "",
      };

      setName(initial.name);
      setEmail(initial.email);
      setMobile(initial.mobile);
      setCountryCode(initial.countryCode);
      setRole(initial.role);
      setDescription(initial.description);
      setUser_Id(editDetails?.userId);

      setInitialState(initial);
    }
  }, [editDetails]);

  const handleNameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setName(value);
      setNameError("");
      setError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmailError("");
    setError("");

    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);

    if (emailValue && !isValidEmail) {
      setEmailError("Please Enter Email Id");
    } else {
      setEmailError("");
    }

    dispatch({ type: "CLEAR_EMAIL_ID_ERROR" });
  };
  const handleMobileChange = (e) => {
    setMobileError("");
    setError("");

    const value = e.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);

      if (value && value.length < 10) {
        setMobileError("Please Enter Valid Mobile Number");
      } else {
        setMobileError("");
      }
    } else {
      if (value !== "") {
        setMobileError("Invalid Mobile Number");
      }
    }

    dispatch({ type: "CLEAR_PHONE_NUM_ERROR" });
  };

  const handleRoleChange = (selectedOption) => {
    setRoleError("");
    setError("");
    setRole(selectedOption?.value || "");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setError("");
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);

    const errors = [];

    if (value.length < 8) {
      errors.push("Minimum 8 characters");
    }

    if (!/[A-Z]/.test(value)) {
      errors.push("One uppercase letter");
    }

    if (!/[0-9]/.test(value)) {
      errors.push("One number");
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push("One special character");
    }

    setPasswordError(errors);
  };

  const handleCloseForm = () => {
    setAddUserForm(false);
    setName("");
    setDescription("");
    setError("");
    setRole("");
    setRoleError("");
    setMobileError("");
    setError("");
    setMobile("");
    setEmailError("");
    setError("");
    setEmail("");
    setCountryCodeError("");
    dispatch(clearPhoneError());
    dispatch(clearEmailError());
  };

  const clearPhoneError = () => ({
    type: "CLEAR_PHONE_NUM_ERROR",
  });

  const clearEmailError = () => ({
    type: "CLEAR_EMAIL_ID_ERROR",
  });

  const handleSubmit = () => {
    dispatch(clearPhoneError());
    dispatch(clearEmailError());

    let isValid = true;

    setNameError("");
    setEmailError("");
    setMobileError("");
    setCountryCodeError("");
    setRoleError("");
    setPasswordError("");
    setError("");

    const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (!name) {
      setNameError("Please Enter Name");
      isValid = false;
    }

    if (!email) {
      setEmailError("Please Enter Email ID");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError("Please Enter Valid Email ID");
      isValid = false;
    }

    if (!countryCode) {
      setCountryCodeError("Please Select Country Code");
      isValid = false;
    }

    if (!mobile) {
      setMobileError("Please Enter Mobile Number");
      isValid = false;
    } else if (!/^(?!0{10})[1-9][0-9]{9}$/.test(mobile)) {
      setMobileError("Please Enter Valid Mobile Number");
      isValid = false;
    } else {
      setMobileError("");
    }

    if (!role) {
      setRoleError("Please Select Role");
      isValid = false;
    }

    if (!editDetails) {
      if (!password) {
        setPasswordError("Please Enter Password");
        isValid = false;
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
        isValid = false;
      } else {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUppercase || !hasNumber || !hasSpecialChar) {
          setPasswordError(
            "Password must include a capital letter, a number, and a special character",
          );
          isValid = false;
        }
      }
    }

    const hasChanges =
      name !== initialState.name ||
      email !== initialState.email ||
      mobile !== initialState.mobile ||
      countryCode !== initialState.countryCode ||
      role !== initialState.role ||
      description !== initialState.description;

    if (editDetails && !hasChanges) {
      setError("No Changes Detected");
      isValid = false;
    }

    if (mobileError) {
      isValid = false;
    }

    if (isValid) {
      const MobileNumber = `${mobile}`;

      const data = {
        name,
        mobile: MobileNumber,
        emailId: email,
        roleId: role,
        description,
        password,
      };

      const Editdata = {
        name,
        mobile: MobileNumber,
        emailId: email,
        role,
        description,
      };

      if (editDetails && edit && user_Id && hostel_Id) {
        // EDIT API
        dispatch({
          type: "EDITSTAFFUSER",
          payload: { hostelId: hostel_Id, userId: user_Id, data: Editdata },
        });
      } else {
        // ADD API
        dispatch({
          type: "ADDSTAFFUSER",
          payload: { hostelId: hostel_Id, data },
        });
      }

      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.Settings.StatusForaddSettingUser === 201) {
      setFormLoading(false);
      handleCloseForm();
      dispatch({ type: "GETUSERSTAFF", payload: { hostelId: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_STAFF_USER" });
      }, 200);
    }
  }, [state.Settings.StatusForaddSettingUser]);

  useEffect(() => {
    if (state.Settings.StatusForEditSettingUser === 200) {
      setFormLoading(false);
      handleCloseForm();
      dispatch({ type: "GETUSERSTAFF", payload: { hostelId: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_STAFF_USER" });
      }, 200);
    }
  }, [state.Settings.StatusForEditSettingUser]);

  useEffect(() => {
    if (state.Settings.emailIdError || state.Settings.phoneNumError) {
      setFormLoading(false);
    }
  }, [state.Settings.emailIdError, state.Settings.phoneNumError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full  max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className=" relative border-b flex justify-between mb-2 px-3 py-3">
          <div className="!text-xl !font-gilroy !font-semibold text-[#222222]">
            {edit ? "Edit Staff" : "Add Staff"}
          </div>

          <CloseCircle data-testid="add-user-close-form-icon"
            size="24"
            color="#000"
            onClick={handleCloseForm}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[600px]">
          <div className="grid grid-cols-12 gap-x-6 mt-2">
            <div className="col-span-6">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}>
                  Name <span className={fieldRequiredClass}>*</span>
                </Form.Label>
                <Form.Control data-testid="add-user-name-input"
                  value={name}
                  onChange={(e) => handleNameChange(e)}
                  type="text"
                  placeholder="Enter Name"
                  className={fieldClass(!!nameError)}
                />
              </Form.Group>
              {nameError && <ErrorMessage className="mt-[6px]" message={nameError} type="error" />}
            </div>

            <div className="col-span-6 mb-1">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}>
                  Email ID <span className={fieldRequiredClass}>*</span>
                </Form.Label>
                <Form.Control data-testid="add-user-email-id-input"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  type="text"
                  autoComplete="off"
                  autoCorrect="off"
                  placeholder="Enter Email ID"
                  className={fieldClass(!!emailError)}
                />
              </Form.Group>

              {emailError && <ErrorMessage className="mt-[6px]" message={emailError} type="error" />}

              {state.Settings.emailIdError && (
                <ErrorMessage className="mt-[6px]"
                  message={state.Settings.emailIdError}
                  type="error"
                />
              )}
            </div>

            <div className="col-span-6 mb-1">
              <Form.Group>
                <Form.Label className={fieldLabelClass}>
                  Mobile No <span className={fieldRequiredClass}>*</span>
                </Form.Label>

                <InputGroup className={`${fieldGroupClass(!!mobileError)} !px-0 overflow-hidden`}>
                  <Form.Select data-testid="add-user-mobile-no-select"
                    value={countryCode}
                    autoComplete="off"
                    autoCorrect="off"
                    className={`border-0 bg-white text-[16px] text-[#4B4B4B] font-gilroy max-w-[90px] px-3 shadow-none focus:outline-none ${
                      countryCode ? "font-semibold" : "font-medium"
                    }`}
                  >
                    <option>+{countryCode}</option>
                  </Form.Select>

                  <Form.Control data-testid="add-user-mobile-no-input"
                    value={mobile}
                    onChange={handleMobileChange}
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="9876543210"
                    maxLength={10}
                    className={`border-0 text-[16px] text-[#4B4B4B] font-gilroy px-3 shadow-none focus:outline-none ${
                      mobile ? "font-semibold" : "font-medium"
                    }`}
                  />
                </InputGroup>
              </Form.Group>

              {mobileError && (
                <ErrorMessage className="mt-[6px]" message={mobileError} type="error" />
              )}

              {countryCodeError && (
                <ErrorMessage className="mt-[6px]" message={countryCodeError} type="error" />
              )}

              {state.Settings.phoneNumError && (
                <ErrorMessage className="mt-[6px]"
                  message={state.Settings.phoneNumError}
                  type="error"
                />
              )}
            </div>
            {!edit && (
              <div className="col-span-6 mb-2">
                <Form.Group className="">
                  <Form.Label className={fieldLabelClass}>
                    Password <span className={fieldRequiredClass}> * </span>
                  </Form.Label>
                  <InputGroup className={`${fieldGroupClass(!!passwordError)} !px-0 overflow-hidden`}>
                    <FormControl data-testid="add-user-password-input"
                      id="form-controls"
                      autoComplete="new-password"
                      autoCorrect="off"
                      placeholder="Enter Password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handlePassword(e)}
                      className="border-0 text-[16px] text-[#4B4B4B] font-gilroy focus:outline-none shadow-none"
                    />

                    <InputGroup.Text data-testid="add-user-show-password-icon"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                      className="bg-white border-0 cursor-pointer px-3"
                    >
                      <img
                        src={showPassword ? eye : eyeClosed}
                        alt="toggle password"
                        width={20}
                        height={20}
                      />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                {passwordError && (
                  <ErrorMessage className="mt-[6px]" message={passwordError} type="error" />
                )}
              </div>
            )}

            <div className="col-span-6 ">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={fieldLabelClass}>
                  Role <span className={fieldRequiredClass}>*</span>
                </Form.Label>

                <div data-testid="add-user-role-select" className="contents"><Select
                  options={
                    state.Settings?.getsettingRoleList?.map((u) => ({
                      value: u.id,
                      label: u.name,
                    })) || []
                  }
                  onChange={handleRoleChange}
                  value={
                    state.Settings?.getsettingRoleList?.find(
                      (option) => option.id === role,
                    )
                      ? {
                          value: role,
                          label: state.Settings.getsettingRoleList.find(
                            (option) => option.id === role,
                          )?.name,
                        }
                      : null
                  }
                  placeholder="Select a Role"
                  menuPlacement="auto"
                  styles={{
                    ...fieldSelectStyles(!!roleError),
                    menuList: (base) => ({ ...base, padding: 0, maxHeight: "120px" }),
                  }}
                /></div>
              </Form.Group>

              {roleError && <ErrorMessage className="mt-[6px]" message={roleError} type="error" />}
            </div>

            <div className="col-span-6">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={fieldLabelClass}>
                  Description{" "}
                </Form.Label>
                <Form.Control data-testid="add-user-description-input" className={fieldClass(!!error)}
                  value={description}
                  onChange={handleDescriptionChange}
                  type="text"
                  placeholder="Enter Description"
                 
                />
              </Form.Group>
            </div>
          </div>
          {error && (
            <div className="flex items-center justify-center w-full">
              <ErrorMessage className="mt-[6px]" message={error} type="error" />
            </div>
          )}
        </div>

        <div className="flex justify-end p-2">
          <button data-testid="add-user-submit-btn"
            disabled={formLoading}
            onClick={handleSubmit}
            className="!bg-[#1E45E1] !font-semibold !px-6 !py-3 !rounded-lg !text-sm !font-gilroy !text-white
  !flex !items-center !justify-center gap-2
  hover:!bg-[#1639c3] active:!scale-95
disabled:!opacity-70"
          >
            {formLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span>{edit ? "Saving..." : "Adding..."}</span>
              </>
            ) : (
              <span>{edit ? "Save Changes" : "+ Staff"}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
User.propTypes = {
  editDetails: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  setAddUserForm: PropTypes.func.isRequired,
};

export default User;
