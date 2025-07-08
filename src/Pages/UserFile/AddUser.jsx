/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Form from "react-bootstrap/Form";
import eye from "../../Assets/Images/login-password.png";
import eyeClosed from "../../Assets/Images/Show_password.png";
import PropTypes from "prop-types";
import Select from "react-select";

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


  useEffect(() => {

    dispatch({
      type: "SETTING_ROLE_LIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);


  useEffect(() => {
    if (editDetails && edit) {
      const mobileNo = String(editDetails.mobileNo || "");
      const countryCode = mobileNo.slice(0, 2);
      const mobileNumber = mobileNo.slice(2);

      const initial = {
        name: editDetails.first_name || "",
        email: editDetails.email_Id || "",
        mobile: mobileNumber,
        countryCode: countryCode,
        role: editDetails.role_id || "",
        description: editDetails.description || "",
      };

      setName(initial.name);
      setEmail(initial.email);
      setMobile(initial.mobile);
      setCountryCode(initial.countryCode);
      setRole(initial.role);
      setDescription(initial.description);

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
      setEmailError("Invalid Email Id");
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
    setError("");


    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setPasswordError(
        "Password must include at least 1 capital letter, 1 number, and 1 special character."
      );
    } else {
      setPasswordError("");
    }
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
      setEmailError("Please Enter  Valid Email ID");
      isValid = false;
    }

    if (!countryCode) {
      setCountryCodeError("Please Select Country Code");
      isValid = false;
    }

    if (!mobile) {
      setMobileError("Please Enter Mobile Number");
      isValid = false;
    } else if (mobile.length !== 10) {
      setMobileError("Please Enter Valid Mobile Number");
      isValid = false;
    }

    if (!role) {
      setRoleError("Please Select Role");
      isValid = false;
    }

    if (!editDetails && !password) {
      setPasswordError("Please Enter Password");
      isValid = false;
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
      const MobileNumber = `${countryCode}${mobile}`;
      const payload = {
        user_name: name,
        phone: MobileNumber,
        email_id: email,
        role_id: role,
        description: description,
      };

      if (editDetails && edit) {
        payload.id = editDetails.id;
      } else {
        payload.password = password;
      }

      dispatch({
        type: "ADDSTAFFUSER",
        payload,
      });
      setFormLoading(true)
    }
  };


  useEffect(() => {
    if (state.Settings.StatusForaddSettingUser === 200) {
      setFormLoading(false)
      handleCloseForm();
      dispatch({
        type: "GETUSERSTAFF",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_STAFF_USER" });
      }, 200);
    }
  }, [state.Settings.StatusForaddSettingUser]);



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
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
      }}
    >
      <Modal show={show} onHide={handleCloseForm} centered backdrop="static">
        <Modal.Dialog
          style={{ maxWidth: 850, width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {edit ? "Edit User" : "Add User"}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleCloseForm}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>

          <Modal.Body className="pt-0">
            <div className="row mt-2">
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Name {' '}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={name}
                    onChange={(e) => handleNameChange(e)}
                    type="text"
                    placeholder="Enter Name"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {nameError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        marginRight: "5px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <MdError style={{ marginBottom: "2px",fontSize: 14, }} />
                    </span>
                    {nameError}
                  </p>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Email ID {" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => handleEmailChange(e)}
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="Enter Email ID"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>

                {emailError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <span style={{ fontSize: "13px", marginRight: "5px" }}>
                      <MdError style={{ marginBottom: "3px" }} />
                    </span>
                    {emailError}
                  </p>
                )}

                {state.Settings.emailIdError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError
                      style={{
                        color: "red",
                        marginRight: "5px",
                        fontSize: "14px",
                      }}
                    />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {state.Settings.emailIdError}
                    </label>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group>
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Mobile No {" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>

                  <InputGroup>
                    <Form.Select
                      value={countryCode}
                      autoComplete="off"
                      autoCorrect="off"

                      id="vendor-select-pg"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px 0 0 8px",
                        height: 50,
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: countryCode ? 600 : 500,
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        maxWidth: 90,
                        paddingRight: 10,
                      }}
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
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: mobile ? 600 : 500,
                        boxShadow: "none",
                        borderLeft: "unset",
                        borderRight: "1px solid #D9D9D9",
                        borderTop: "1px solid #D9D9D9",
                        borderBottom: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: "0 8px 8px 0",
                      }}
                    />
                  </InputGroup>
                  <p
                    id="MobileNumberError"
                    style={{ color: "red", fontSize: 11, marginTop: 5 }}
                  ></p>
                </Form.Group>

                {mobileError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                      marginTop: "-11px",
                    }}
                  >
                    <span style={{ fontSize: "13px", marginRight: "5px",marginTop:"2px" }}>
                      <MdError style={{ marginBottom: "4px" }} />
                    </span>
                    {mobileError}
                  </p>
                )}

                {countryCodeError && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <span style={{ fontSize: "14px", marginRight: "5px" }}>
                      <MdError style={{ marginBottom: "4px" }} />
                    </span>
                    {countryCodeError}
                  </p>
                )}

                {state.Settings.phoneNumError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {state.Settings.phoneNumError}
                    </label>
                  </div>
                )}
              </div>
              {!edit && (
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                  <Form.Group className="mb-2">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Password {" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        id="form-controls"
                        autoComplete="new-password"
                        autoCorrect="off"
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => handlePassword(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          borderRight: "none",
                          height: "50px",
                          borderRadius: "8px 0 0 8px",
                        }}
                      />
                      <InputGroup.Text
                        className="border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide Password" : "Show Password"
                        }
                        style={{
                          backgroundColor: "#fff",
                          border: "1px solid #D9D9D9",
                          borderLeft: "none",
                          cursor: "pointer",
                          borderRadius: "0 8px 8px 0",
                        }}
                      >
                        {showPassword ? (
                          <img
                            src={eye}
                            alt="Hide Password"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <img
                            src={eyeClosed}
                            alt="Show Password"
                            width={20}
                            height={20}
                          />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                 

                  {passwordError && (
                    <p
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "5px",
                        margin: 0,
                        marginTop: "6px",
                      }}
                    >
                      <span>
                        <MdError style={{ fontSize: "13px",marginBottom:"3px" }}/>
                      </span>
                      {passwordError}
                    </p>
                  )}

                </div>
              )}

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-1"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Role {" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>

                  <Select
                    options={
                      state.Settings?.getsettingRoleList?.map((u) => ({
                        value: u.id,
                        label: u.role_name,
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
                          )?.role_name,
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
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      display: "flex",
                      alignItems: "center",
                      margin: 0,
                     
                    }}
                  >
                    <span>
                      <MdError style={{ fontSize: "13px",marginBottom:"3px",marginRight:"5px" }} />
                    </span>
                    {roleError}
                  </p>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
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
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    marginTop: "5px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  <MdError style={{ marginRight: "5px", fontSize:14 }} />
                  {error}
                </div>
              )}
            </div>
          </Modal.Body>


 {state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
              </div>
              : null}




          {formLoading &&
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                opacity: 0.75,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  borderTop: '4px solid #1E45E1',
                  borderRight: '4px solid transparent',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>
          }
          
          <Modal.Footer
            style={{ border: "none", marginTop: "-10px" }}
          >



            <Button
              onClick={handleSubmit}
              className="w-100"
              style={{
                cursor: "pointer",
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                padding: 12,
                borderRadius: 8,
                fontSize: 14,
                fontFamily: "Gilroy",
              }}
            >
              {edit ? "Save Changes" : " + Create User"}
            </Button>
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
