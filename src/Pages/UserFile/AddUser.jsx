

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Form from "react-bootstrap/Form";
import eye from "../../Assets/Images/login-password.png";
import eyeClosed from "../../Assets/Images/Show_password.png";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'

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
  const [formLoading, setFormLoading] = useState(false)

  const [hostel_Id, setHostel_Id] = useState("")
  const [user_Id, setUser_Id] = useState("")



  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostel_Id(state.login.selectedHostel_Id);
    }
  }, [state?.login?.selectedHostel_Id]);


  useEffect(() => {

    dispatch({ type: 'SETTING_ROLE_LIST', payload: state.login.selectedHostel_Id });
  }, []);


  useEffect(() => {
    if (editDetails && edit) {
      // const mobileNo = String(editDetails.mobileNo || "");
      // const countryCode = mobileNo.slice(0, 2);
      // const mobileNumber = mobileNo.slice(2);

      const initial = {
        name: editDetails.firstName || "",
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
      setUser_Id(editDetails?.userId)

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
    const newPassword = e.target.value;
    setPassword(newPassword);

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    let errorMessage = "";


    if (newPassword.length < 8) {
      errorMessage += "Password must be at least 8 characters\n";
    }


    if (!hasUppercase) {
      errorMessage += "At least 1 capital letter\n";
    }


    if (!hasNumber) {
      errorMessage += "At least 1 number\n";
    }

    if (!hasSpecialChar) {
      errorMessage += "At least 1 special character\n";
    }

    setPasswordError(errorMessage.trim());
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
      }
      else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
        isValid = false;
      }
      else {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUppercase || !hasNumber || !hasSpecialChar) {
          setPasswordError(
            "Password must include a capital letter, a number, and a special character"
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
      setFormLoading(false)
      handleCloseForm();
      dispatch({ type: "GETUSERSTAFF", payload: { hostelId: hostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_STAFF_USER" });
      }, 200);
    }
  }, [state.Settings.StatusForaddSettingUser]);

  useEffect(() => {
    if (state.Settings.StatusForEditSettingUser === 200) {
      setFormLoading(false)
      handleCloseForm();
      dispatch({ type: "GETUSERSTAFF", payload: { hostelId: hostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_EDIT_STAFF_USER" });
      }, 200);
    }
  }, [state.Settings.StatusForEditSettingUser]);



  useEffect(() => {
    if (state.Settings.emailIdError || state.Settings.phoneNumError) {
      setFormLoading(false)
    }

  }, [state.Settings.emailIdError, state.Settings.phoneNumError])


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])






  return (
    <div className="modal show block relative">
      <Modal show={show} onHide={handleCloseForm} centered backdrop="static">
        <Modal.Dialog className="w-full max-w-[850px] m-0 p-0">

          <Modal.Header className="border border-[#E7E7E7] px-4 py-2.5 flex items-center justify-between">

            <Modal.Title className="!text-xl !font-gilroy !font-semibold text-[#222222]">
              {edit ? "Edit Staff" : "Add Staff"}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleCloseForm}
              className="cursor-pointer"
            />

          </Modal.Header>

          <Modal.Body className="pt-0">
            <div className="grid grid-cols-12 gap-x-6 mt-2">

              <div className="col-span-6">
                <Form.Group controlId="exampleForm.ControlInput1" >
                  <Form.Label className="text-sm font-medium font-gilroy text-[#222222]"
                  >
                    Name {' '}
                    <span className="text-lg text-red-500">*</span>
                  </Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    type="text"
                    placeholder="Enter Name"
                    className="h-12 rounded-lg border border-gray-300 !font-gilroy !text-base font-medium text-gray-600 shadow-none focus:shadow-none"
                  />
                </Form.Group>
                {nameError && (
                  <ErrorMessage message={nameError} type="error" />
                )}
              </div>

              <div className="col-span-6 mb-1">
                <Form.Group controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm font-medium font-gilroy text-[#222222]">
                    Email ID {" "}
                    <span className="text-lg text-red-500">*</span>
                  </Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Enter Email ID"
                    className="h-12 rounded-lg border border-gray-300 !font-gilroy !text-base font-medium text-gray-600 shadow-none focus:shadow-none"
                  />
                </Form.Group>

                {emailError && (
                  <ErrorMessage message={emailError} type="error" />
                )}

                {state.Settings.emailIdError && (
                  <ErrorMessage message={state.Settings.emailIdError} type="error" />
                )}
              </div>

              <div className="col-span-6 mb-1">

                <Form.Group>
                  <Form.Label className="text-sm font-medium font-gilroy text-[#222222]">
                    Mobile No <span className="text-lg text-red-500">*</span>
                  </Form.Label>

                  <InputGroup className="border border-gray-300 rounded-lg overflow-hidden h-[52px]">
                    <Form.Select
                      value={countryCode}
                      autoComplete="off"
                      autoCorrect="off"
                      className={`border-0 bg-white text-[16px] text-[#4B4B4B] font-gilroy max-w-[90px] px-3 shadow-none focus:outline-none ${countryCode ? "font-semibold" : "font-medium"
                        }`}
                    >
                      <option>+{countryCode}</option>
                    </Form.Select>

                    <Form.Control
                      value={mobile}
                      onChange={handleMobileChange}
                      type="text"
                      autoComplete="off"
                      autoCorrect="off"
                      placeholder="9876543210"
                      maxLength={10}
                      className={`border-0 text-[16px] text-[#4B4B4B] font-gilroy px-3 shadow-none focus:outline-none ${mobile ? "font-semibold" : "font-medium"
                        }`}
                    />
                  </InputGroup>
                </Form.Group>

                {mobileError && (
                  <ErrorMessage message={mobileError} type="error" />
                )}

                {countryCodeError && (
                  <ErrorMessage message={countryCodeError} type="error" />
                )}

                {state.Settings.phoneNumError && (
                  <ErrorMessage message={state.Settings.phoneNumError} type="error" />
                )}
              </div>
              {!edit && (
                <div className="col-span-6 mb-2">
                  <Form.Group className="">
                    <Form.Label className="text-sm font-medium font-gilroy text-[#222222]">
                      Password {" "}
                      <span className="text-lg text-red-500">
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <InputGroup className="border border-gray-300 rounded-lg overflow-hidden h-12">
                      <FormControl
                        id="form-controls"
                        autoComplete="new-password"
                        autoCorrect="off"
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handlePassword(e)}
                        className="border-0 text-[16px] text-[#4B4B4B] font-gilroy focus:outline-none shadow-none"
                      />

                      <InputGroup.Text
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide Password" : "Show Password"}
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

                    <ErrorMessage message={passwordError} type="error" />

                  )}

                </div>
              )}

              <div className="col-span-6 ">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm font-medium font-gilroy text-[#222222]">
                    Role {" "}
                    <span className="text-lg text-red-500">*</span>
                  </Form.Label>

                  <Select
                    options={
                      state.Settings?.getsettingRoleList?.map((u) => ({
                        value: u.id,
                        label: u.name,
                      })) || []
                    }
                    onChange={handleRoleChange}
                    value={
                      state.Settings?.getsettingRoleList?.find(
                        (option) => option.id === role
                      )
                        ? {
                          value: role,
                          label: state.Settings.getsettingRoleList.find(
                            (option) => option.id === role
                          )?.name,
                        }
                        : null
                    }
                    placeholder="Select a Role"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "50px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #ced4da",
                        fontFamily: "Gilroy",
                      }),
                      menuList: (base) => ({
                        ...base,
                        backgroundColor: "#f8f9fa",
                        maxHeight: "120px",
                        padding: 0,
                        scrollbarWidth: "thin",
                        overflowY: "auto",
                        fontFamily: "Gilroy",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#555",
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        color: "#555",
                        display: "inline-block",
                        fill: "currentColor",
                        lineHeight: 1,
                        stroke: "currentColor",
                        strokeWidth: 0,
                        cursor: "pointer",
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        backgroundColor: state.isFocused
                          ? "lightblue"
                          : "white",
                        color: "#000",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </Form.Group>

                {roleError && (
                  <ErrorMessage message={roleError} type="error" />
                )}
              </div>

              <div className="col-span-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-sm font-medium font-gilroy text-[#222222]">
                    Description {" "}
                  </Form.Label>
                  <Form.Control
                    value={description}
                    onChange={handleDescriptionChange}
                    type="text"
                    placeholder="Enter Description"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                      marginTop: "6px",
                    }}
                  />
                </Form.Group>
              </div>

              {error && (
                <div className="flex justify-center">
                  <ErrorMessage message={error} type="error" />
                </div>
              )}
            </div>
          </Modal.Body>


          {formLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent opacity-75">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
            </div>
          )}

          <Modal.Footer className="!mt-[-10px] !border-0 !px-3">
            <button
              onClick={handleSubmit}
              className="!w-full !cursor-pointer !bg-[#1E45E1] !font-semibold !p-3 !rounded-lg !text-sm !font-gilroy !text-white"
            >
              {edit ? "Save Changes" : " + Staff"}
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
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
