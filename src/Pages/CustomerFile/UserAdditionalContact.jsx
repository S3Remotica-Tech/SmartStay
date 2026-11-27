/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import { InputGroup } from "react-bootstrap";

import PropTypes from "prop-types";
import { CloseCircle, Trash } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

function UserAdditionalContact({ show, handleClose, customerId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [guardian, setGuardian] = useState(null);
  const [Phone, setPhone] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const countryCode = "91";
  // const [contactId, setContactId] = useState("");
  const [formError, setFormError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [guardianError, setGuardianError] = useState("");

  const [formLoading, setFormLoading] = useState(false);
  const [isOthers, setIsOthers] = useState(false);
  const [guardianOccupation, setGuardianOccupation] = useState("");
  const [isOccupationOther, setIsOccupationOther] = useState(false);
  const [occupationError, setOccupationError] = useState("");

  const CustomerOverView = state.UsersList?.customerdetails;

  const handleUserName = (e) => {
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setUserName(value);
    setFormError("");
    setUserNameError("");
  };

  const usernameRef = useRef(null);
  const guardianRef = useRef(null);
  const PhoneRef = useRef(null);
  const nochangeRef = useRef(null);

  const isValidPhone = (phone) => {
    if (!/^\d{10}$/.test(phone)) return false;
    if (/^(\d)\1{9}$/.test(phone)) return false;
    return true;
  };

  const handlePhone = (e) => {
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
    const value = e.target.value;
    if (!/^\d{0,10}$/.test(value)) {
      return;
    }
    setPhone(value);
    if (value === "") {
      setPhoneError("");
    } else if (value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Please Enter Valid Mobile Number");
    }
    setFormError("");
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_CONTACT_ERROR" });
    };
  }, []);

  const handleCloseAdditionalForm = () => {
    setUserName("");
    setPhone("");
    setGuardian("");
    setGuardianOccupation("");
    setUserNameError("");
    setGuardianError("");
    setPhoneError("");
    setOccupationError("");
    setFormError("");
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
  };

  useEffect(() => {
    if (state.UsersList.contactError) {
      setFormLoading(false);
    }
  }, [state.UsersList.contactError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const reasonOptions = [
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Brother", label: "Brother" },
    { value: "Sister", label: "Sister" },
    {
      value: "Others",
      label: "Others",
      color: "#1E45E1",
    },
  ];

  const occupationOptions = [
    { value: "Govt Employee", label: "Govt Employee" },
    { value: "Private Employee", label: "Private Employee" },
    { value: "Business / Self-employed", label: "Business / Self-employed" },
    { value: "Farmer", label: "Farmer" },
    { value: "Daily Wage / Labour", label: "Daily Wage / Labour" },
    { value: "Homemaker", label: "Homemaker" },
    { value: "Retired Employee", label: "Retired Employee" },
    { value: "Abroad (Working Overseas)", label: "Abroad (Working Overseas)" },
    { value: "Other", label: "Other" },
  ];

  const handleGuardian = (selectedOption) => {
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
    setFormError("");
    setGuardianError("");
    if (selectedOption?.value === "Others") {
      setIsOthers(true);
      setGuardian("");
    } else {
      setIsOthers(false);
      setGuardian(selectedOption.value);
    }
  };

  const handleOccupation = (selectedOption) => {
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
    setOccupationError("");

    if (selectedOption?.value === "other") {
      setIsOccupationOther(true);
      setGuardianOccupation("");
    } else {
      setIsOccupationOther(false);
      setGuardianOccupation(selectedOption.value);
    }
  };
  const handleSubmitContact = () => {
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
    let hasError = false;
    if (!userName.trim()) {
      setUserNameError("Please enter Guardian Name");
      if (usernameRef.current) usernameRef.current.focus();
      hasError = true;
    }

    if (!isValidPhone(Phone)) {
      setPhoneError("Enter a valid mobile number");
      if (!hasError && PhoneRef.current) PhoneRef.current.focus();
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      hostelId: state.login.selectedHostel_Id,
      customerId: CustomerOverView?.customerId || customerId,
      fullName: userName,
      mobile: Phone,
      relationship: guardian || "",
      occupation: guardianOccupation || "",
    };

    dispatch({
      type: "CUSTOMERADDCONTACT",
      payload,
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      setFormLoading(false);
      handleCloseAdditionalForm();
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] ">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="  px-4 py-3 shrink-0 flex justify-between mb-2 border-b">
          <div className="text-[18px] font-semibold font-gilroy">
            Add Parent/Guardian Details
          </div>

          <CloseCircle data-testid="user-additional-contact-close-icon"
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[500px]">
          <div className="flex flex-wrap mt-1">
            <div className="w-full">
              <Form.Group className="mb-2">
                <Form.Label className={fieldLabelClass}>
                  Guardian Full Name{" "}
                  <span className={fieldRequiredClass}> *</span>
                </Form.Label>
                <FormControl data-testid="user-additional-contact-guardian-full-name-input"
                  type="text"
                  id="form-controls"
                  placeholder="Enter Guardian Name"
                  onChange={(e) => handleUserName(e)}
                  value={userName}
                  ref={usernameRef}
                  className={fieldClass(!!userNameError)}
                />
              </Form.Group>

              {userNameError && (
                <ErrorMessage className="mt-[6px]" message={userNameError} type="error" />
              )}
            </div>

            <div className="w-full">
              <Form.Group className="mb-2">
                <Form.Label className={fieldLabelClass}>
                  Relationship{" "}
                </Form.Label>
                {isOthers ? (
                  <div style={{ position: "relative" }}>
                    <FormControl data-testid="user-additional-contact-relationship-input"
                      type="text"
                      placeholder="Enter Relationship"
                      value={guardian}
                      onChange={(e) => setGuardian(e.target.value)}
                      className={fieldClass()}
                    />
                    <Trash data-testid="user-additional-contact-is-others-icon"
                      size="18"
                      color="#FF0000"
                      variant="link"
                      onClick={() => {
                        setIsOthers(false);
                        setGuardian("");
                      }}
                      className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#1E45E1] no-underline font-medium font-gilroy cursor-pointer"
                    ></Trash>
                  </div>
                ) : (
                  <div data-testid="user-additional-contact-relationship-select" className="contents"><Select
                    ref={guardianRef}
                    value={
                      reasonOptions.find((opt) => opt.value === guardian) ||
                      null
                    }
                    onChange={handleGuardian}
                    options={reasonOptions}
                    placeholder="Select Relationship"
                    menuPlacement="bottom"
                    menuPosition="fixed"
                    noOptionsMessage={() => "No Relationship available"}
                    styles={{
                      ...fieldSelectStyles(!!guardianError),
                      menuList: (base) => ({ ...base, padding: 0, maxHeight: "150px" }),
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                  /></div>
                )}
              </Form.Group>

              {guardianError && (
                <ErrorMessage className="mt-[6px]" message={guardianError} type="error" />
              )}
            </div>
            <div className="w-full">
              <Form.Group className="mb-2">
                <Form.Label className={fieldLabelClass}>
                  Guardian Occupation{" "}
                </Form.Label>

                {isOccupationOther ? (
                  <div style={{ position: "relative" }}>
                    <FormControl data-testid="user-additional-contact-guardian-occupation-input"
                      type="text"
                      placeholder="Enter Occupation"
                      value={guardianOccupation}
                      onChange={(e) => setGuardianOccupation(e.target.value)}
                      className={fieldClass()}
                    />

                    <Trash data-testid="user-additional-contact-is-occupation-other-icon"
                      size="18"
                      color="#FF0000"
                      variant="link"
                      onClick={() => {
                        setIsOccupationOther(false);
                        setGuardianOccupation("");
                      }}
                      className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#1E45E1] no-underline font-medium font-gilroy cursor-pointer"
                    />
                  </div>
                ) : (
                  <div data-testid="user-additional-contact-guardian-occupation-select" className="contents"><Select
                    value={occupationOptions.find(
                      (opt) => opt.value === guardianOccupation,
                    )}
                    onChange={handleOccupation}
                    options={occupationOptions}
                    placeholder="Select Occupation"
                    menuPlacement="bottom"
                    menuPortalTarget={document.body}
                    menuPosition="fixed"
                    menuShouldScrollIntoView={false}
                    styles={{
                      ...fieldSelectStyles(!!occupationError),
                      menuList: (base) => ({ ...base, padding: 0, maxHeight: "150px" }),
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                  /></div>
                )}

                {occupationError && (
                  <ErrorMessage className="mt-[6px]" message={occupationError} type="error" />
                )}
              </Form.Group>
            </div>

            <div className="w-full">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}>
                  Mobile Number{" "}
                  <span className={fieldRequiredClass}> * </span>
                </Form.Label>

                <InputGroup className="!flex">
                  <Form.Select data-testid="user-additional-contact-mobile-number-select"
                    value={countryCode}
                    id="vendor-select-pg"
                    className={`${fieldClass()} !w-[88px] !flex-none !rounded-r-none`}
                  >
                    <option>+{countryCode}</option>
                  </Form.Select>

                  <Form.Control data-testid="user-additional-contact-mobile-number-input"
                    value={Phone}
                    ref={PhoneRef}
                    onChange={handlePhone}
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                    className={`${fieldClass(!!phoneError)} !rounded-l-none`}
                  />
                </InputGroup>
                <p
                  id="MobileNumberError"
                  className="text-red-500 text-[12px] mt-[5px]"
                ></p>

                {phoneError && (
                  <ErrorMessage className="mt-[6px]" message={phoneError} type="error" />
                )}
              </Form.Group>
            </div>

            {formError && (
              <div ref={nochangeRef} className="text-red-500 text-center">
                <ErrorMessage className="mt-[6px]" message={formError} type="error" />
              </div>
            )}
          </div>
        </div>

        {state.UsersList.contactError && (
          <ErrorMessage className="mt-[6px]" message={state.UsersList.contactError} type="error" />
        )}

        <div className="flex justify-end gap-3 p-4">
          <Button data-testid="user-additional-contact-cancel-btn"
            onClick={handleClose}
            className="w-full mt-1 bg-white border-0 !font-gilroy !text-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] font-gilroy px-[40px] py-2"
          >
            Cancel
          </Button>

          <Button data-testid="user-additional-contact-submit-contact-btn"
            disabled={formLoading}
            onClick={handleSubmitContact}
            className="w-full mt-1 !whitespace-nowrap !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy !px-[40px] py-2"
          >
            {formLoading ? "Adding..." : "Add"}
          </Button>
        </div>

        {formLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10 top-[100px]">
            <div className="w-10 h-10 rounded-full border-t-[4px] border-t-blue-600 border-r-[4px] border-r-transparent animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

UserAdditionalContact.propTypes = {
  show: PropTypes?.bool.isRequired,
  handleClose: PropTypes?.func.isRequired,

  customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default UserAdditionalContact;
