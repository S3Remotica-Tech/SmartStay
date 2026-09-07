/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";

function EditBasicDetails({ show, handleClose, basicDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const countryCode = "91";
  // const [id, setId] = useState("")
  const [firstNameError, setFirstNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [initialValues, setInitialValues] = useState(null);
  const [isChanged, setIsChanged] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFirstNameChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^A-Za-z\s]/g, "");
    setFirstName(lettersOnly);
    setFirstNameError("");
    setIsChanged("");
  };

  const handleLastNameChange = (e) => {
    const lettersOnly = e.target.value.replace(/[^A-Za-z]/g, "");
    setLastName(lettersOnly);
    setIsChanged("");
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
    } else if (!isValidEmail) {
      setEmailError("Please Enter  Valid Email Id");
    } else {
      setEmailError("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setIsChanged("");
  };

  const handlePhoneChange = (e) => {
    dispatch({ type: "REMOVE_ALREADY_MOBILE_BASIC_ERROR" });

    const input = e.target.value.replace(/\D/g, "");
    setPhone(input);

    if (input.length === 0) {
      setPhoneError("");
    } else if (!/^[1-9][0-9]{9}$/.test(input)) {
      setPhoneError("Please Enter Valid Mobile Number");
    } else {
      setPhoneError("");
    }

    setIsChanged("");

    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };

  useEffect(() => {
    if (basicDetails) {
      setFirstName(basicDetails?.firstName);
      setLastName(basicDetails?.lastName);
      setPhone(basicDetails?.mobileNo);
      // setCountryCode(basicDetails?.countryCode);
      // setId(basicDetails.customerId);
      setEmail(basicDetails?.emailId);

      setInitialValues({
        profile: basicDetails?.profilePic,
        firstname: basicDetails?.firstName,
        lastname: basicDetails?.lastName,
        Phone: basicDetails?.mobileNo,
        Email: basicDetails?.emailId,
      });
    }
  }, [basicDetails]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  // const MobileNumber = `${phone}`;

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_ALREADY_MOBILE_BASIC_ERROR" });

    if (!firstName) {
      setFirstNameError("Please Enter First Name");
      return;
    }
    if (phoneError === "Please Enter Mobile Number") {
      return;
    }

    const normalizedPhone = (phone || "").replace(/\D/g, "");

    if (!normalizedPhone) {
      setPhoneError("Please Enter Mobile Number");
      return;
    }

    if (
      normalizedPhone.length !== 10 ||
      !/^[1-9][0-9]{9}$/.test(normalizedPhone) ||
      /^0{10}$/.test(normalizedPhone)
    ) {
      setPhoneError("Please Enter Valid Mobile Number");
      return;
    }

    if (emailError) {
      return;
    }
    const capitalizeFirstLetter = (str = "") => {
      if (typeof str !== "string") return "";
      const trimmed = str.trim();
      return trimmed
        ? trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase()
        : "";
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstName ?? "");
    const capitalizedLastname = capitalizeFirstLetter(lastName ?? "");
    const normalizedPhoneNumber = normalizedPhone;

    const currentValues = {
      profile: basicDetails?.profilePic,
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      Phone: normalizedPhoneNumber,
      Email: email,
    };

    const normalize = (key, val) => {
      if (val === null || val === undefined) return "";

      let str = String(val).trim().toLowerCase();

      if (str === "n/a" || str === "undefined") return "";

      if (key === "Phone") {
        return str.slice(-10);
      }

      return str;
    };

    const isChanged = Object.keys(currentValues).some((key) => {
      const current = normalize(key, currentValues[key]);
      const initial = normalize(key, initialValues?.[key]);
      return current !== initial;
    });

    if (!isChanged) {
      setIsChanged("No changes detected");
      return;
    }

    dispatch({
      type: "EDITBASICDETAILS",
      payload: {
        customerId: basicDetails?.customerId,
        payloads: {
          firstName: capitalizedFirstname || "",
          lastName: capitalizedLastname || "",
          mailId: email || "",
          mobile: phone,
          houseNo: basicDetails?.address?.houseNo || "",
          street: basicDetails?.address?.streetName || "",
          landmark: basicDetails?.address?.landmark || "",
          pincode: basicDetails?.address?.pincode || "",
          city: basicDetails?.address?.city || "",
          state: basicDetails?.address?.state || "",
        },
        profilePic: basicDetails?.profilePic || "",
      },
    });
    setLoading(true);
  };

  useEffect(() => {
    if (
      state.UsersList.editBasicSuccessStatusCode === 200 ||
      state.UsersList?.alreadyMobileBasicError
    ) {
      setLoading(false);
    }
  }, [
    state.UsersList.editBasicSuccessStatusCode,
    state.UsersList?.alreadyMobileBasicError,
  ]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="  px-4 py-3 shrink-0 flex justify-between mb-2 border-b">
          <div className="!text-xl text-gray-900 !font-semibold !font-gilroy">
            Edit Basic Details
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[500px]">
          <div className="row mb-0">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                  First name
                  <span className="text-red-600 text-xl">*</span>
                </Form.Label>

                <Form.Control
                  value={firstName}
                  onChange={handleFirstNameChange}
                  type="text"
                  placeholder="Enter First name"
                  className={`text-base text-gray-600 font-gilroy ${
                    firstName ? "font-semibold" : "font-medium"
                  } border border-gray-300 h-12 rounded-lg shadow-none`}
                />
              </Form.Group>

              {firstNameError && (
                <ErrorMessage message={firstNameError} type="error" />
              )}
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                  Last name
                </Form.Label>

                <Form.Control
                  value={lastName}
                  onChange={handleLastNameChange}
                  type="text"
                  placeholder="Enter Last Name"
                  className={`text-base text-gray-600 font-gilroy ${
                    lastName ? "font-semibold" : "font-medium"
                  } border border-gray-300 h-12 rounded-lg shadow-none`}
                />
              </Form.Group>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group
                className="mb-2"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                  Email
                </Form.Label>

                <Form.Control
                  value={email}
                  onChange={handleEmailChange}
                  type="text"
                  placeholder="Enter Email"
                  className={`text-base text-gray-600 font-gilroy ${
                    email ? "font-semibold" : "font-medium"
                  } border border-gray-300 h-12 rounded-lg shadow-none`}
                />
              </Form.Group>

              {emailError && <ErrorMessage message={emailError} type="error" />}
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                  Mobile Number
                  <span className="text-red-600 text-xl">*</span>
                </Form.Label>

                <InputGroup className="w-full">
                  <Form.Select
                    value={countryCode}
                    // id="vendor-select-pg"
                    className={`
      h-12 max-w-24
      border border-gray-300 border-r-0
      rounded-l-lg rounded-r-none
      cursor-pointer bg-white
      text-base text-gray-600 font-gilroy
      ${countryCode ? "font-semibold" : "font-medium"}
      focus:shadow-none focus:border-gray-300
    `}
                  >
                    <option value="91">+91</option>
                  </Form.Select>

                  <Form.Control
                    value={phone}
                    onChange={handlePhoneChange}
                    type="text"
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    className={`
      h-12 shadow-none
      border border-gray-300 border-l-0
      rounded-r-lg rounded-l-none
      text-base text-gray-600 font-gilroy
      ${phone ? "font-semibold" : "font-medium"}
      focus:shadow-none focus:border-gray-300
    `}
                  />
                </InputGroup>
              </Form.Group>

              {phoneError && <ErrorMessage message={phoneError} type="error" />}

              {state.UsersList?.alreadyMobileBasicError && (
                <ErrorMessage
                  message={state.UsersList?.alreadyMobileBasicError}
                  type="error"
                />
              )}
            </div>
          </div>
          {loading && (
            <div className="absolute inset-x-0 top-24 bottom-0 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-r-transparent animate-spin"></div>
            </div>
          )}
        </div>

        {isChanged ? (
          <div className="flex items-center justify-center mt-2 mb-2">
            <ErrorMessage message={isChanged} type="error" />
          </div>
        ) : null}

        <div className="flex justify-end p-4 gap-3">
          <Button
            className="mt-1 bg-white border-0 !text-[#1E45E1] !font-bold !text-base !font-gilroy rounded-xl py-2 px-10"
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="!bg-[#1E45E1] !font-semibold !text-base !font-gilroy rounded-xl py-2 px-10  mt-1"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
EditBasicDetails.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  basicDetails: PropTypes.func.isRequired,
};
export default EditBasicDetails;
