/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import { InputGroup } from "react-bootstrap";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import { CloseCircle, Trash } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'


function UserAdditionalContact({show, handleClose}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [guardian, setGuardian] = useState(null);
  const [Phone, setPhone] = useState("");

  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  // const [contactId, setContactId] = useState("");
  const [formError, setFormError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [guardianError, setGuardianError] = useState("");


  const [formLoading, setFormLoading] = useState(false)
  const [isOthers, setIsOthers] = useState(false);
  const [guardianOccupation, setGuardianOccupation] = useState("");
  const [isOccupationOther, setIsOccupationOther] = useState(false);
  const [occupationError, setOccupationError] = useState("");


  const CustomerOverView = state.UsersList?.customerdetails;

 


  const handleUserName = (e) => {
     dispatch({ type: "CLEAR_CONTACT_ERROR" });
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setUserName(value);
    setFormError("");
    setUserNameError("");
  };




  const usernameRef = useRef(null)
  const guardianRef = useRef(null)
  const PhoneRef = useRef(null)
  const nochangeRef = useRef(null)


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
      setFormLoading(false)
    }

  }, [state.UsersList.contactError])



  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  const reasonOptions = [
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Brother", label: "Brother" },
    { value: "Brother", label: "Brother" },
    {
      value: "Others",
      label: "Others",
      color: "#1E45E1"
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
      customerId: CustomerOverView?.customerId,
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
      setFormLoading(false)
             handleCloseAdditionalForm();
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Dialog className="m-0 p-0 max-w-[666px] rounded-[30px]"
        >
          <Modal.Body>
            <div className="flex items-center">
              <div >
                <Modal.Header
                  className="relative pt-0"
                >
                  <div className="text-[18px] font-semibold font-gilroy"
                  >
                    Add Parent/Guardian Details
                  </div>

                  <CloseCircle size="24" color="#000" onClick={handleClose}
                    className="cursor-pointer" />
                </Modal.Header>

                <div className="max-h-[400px] overflow-y-scroll overflow-x-hidden show-scroll p-2 mt-1 mr-0">
                  <div className="flex flex-wrap mt-1">

                    <div className="w-full">
                      <Form.Group className="mb-2">
                        <Form.Label className="text-[14px] font-medium font-gilroy">
                          Guardian Full Name {" "}
                          <span className="text-red-500 text-[20px]"> *</span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="Enter Guardian Name"
                          onChange={(e) => handleUserName(e)}
                          value={userName}
                          ref={usernameRef}
                          className="text-[16px] text-[#4B4B4B] font-medium font-gilroy shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px] mt-0 w-full px-3"

                        />
                      </Form.Group>

                      {userNameError && (
                        <ErrorMessage message={userNameError} type="error" />
                      )}
                    </div>

                    <div className="w-full">
                      <Form.Group className="mb-2">
                        <Form.Label className="text-[14px] font-medium font-gilroy"
                        >
                          Relationship {" "}

                        </Form.Label>
                        {isOthers ? (
                          <div style={{ position: "relative" }}>
                            <FormControl
                              type="text"
                              placeholder="Enter Relationship"
                              value={guardian}
                              onChange={(e) => setGuardian(e.target.value)}
                              className="text-[16px] text-[#4B4B4B] font-medium font-gilroy shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px] mt-0 w-full px-3"
                            />
                            <Trash
                              size="18"
                              color="#FF0000"
                              variant="link"
                              onClick={() => {
                                setIsOthers(false);
                                setGuardian("");
                              }}
                              className="absolute right-[10px] top-1/2 -translate-y-1/2 text-[14px] text-[#1E45E1] no-underline font-medium font-gilroy cursor-pointer"
                            >

                            </Trash>
                          </div>) : (

                          <Select ref={guardianRef}
                            value={reasonOptions.find((opt) => opt.value === guardian) || null}
                            onChange={handleGuardian}
                            options={reasonOptions}
                            placeholder="Select Relationship"
                            classNamePrefix="custom"
                            menuPlacement="auto"
                            noOptionsMessage={() => "No Relationship available"}
                            styles={{
                              control: (base) => ({
                                ...base,
                                height: "50px",
                                border: "1px solid #D9D9D9",
                                borderRadius: "8px",
                                fontSize: "16px",
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                boxShadow: "none",
                              }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                fontFamily: "Gilroy",
                                backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                color: state.data.value === "Others" ? "#1E45E1" : "#000",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#555",
                              }),
                              indicatorSeparator: () => ({ display: "none" }),
                              menuList: (base) => ({
                                ...base,
                                maxHeight: "150px",
                                overflowY: "auto", scrollbarWidth: "thin",
                                msOverflowStyle: "auto",
                              }),
                            }}
                          />
                        )}

                      </Form.Group>

                      {guardianError && (
                        <ErrorMessage message={guardianError} type="error" />
                      )}
                    </div>
                    <div className="w-full">
                      <Form.Group className="mb-2">
                        <Form.Label className="text-[14px] font-medium font-gilroy">
                          Guardian Occupation{" "}

                        </Form.Label>

                        {isOccupationOther ? (
                          <div style={{ position: "relative" }}>
                            <FormControl
                              type="text"
                              placeholder="Enter Occupation"
                              value={guardianOccupation}
                              onChange={(e) => setGuardianOccupation(e.target.value)}
                              className="text-[16px] text-[#4B4B4B] font-medium font-gilroy shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px] mt-0 w-full px-3"
                            />

                            <Trash
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
                          <Select
                            value={occupationOptions.find(
                              (opt) => opt.value === guardianOccupation
                            )}
                            onChange={handleOccupation}
                            options={occupationOptions}
                            placeholder="Select Occupation"
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
                                boxShadow: "none",
                              }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                fontFamily: "Gilroy",
                                backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                color: state.data.value === "Others" ? "#1E45E1" : "#000"
                              }),
                              indicatorSeparator: () => ({ display: "none" }),
                              menuList: (base) => ({
                                ...base,
                                maxHeight: "150px",
                                overflowY: "auto", scrollbarWidth: "thin",
                                msOverflowStyle: "auto",
                              }),
                            }}
                          />
                        )}

                        {occupationError && (
                          <ErrorMessage message={occupationError} type="error" />
                        )}
                      </Form.Group>
                    </div>

                    <div className="w-full">
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label className="text-[14px] font-medium font-gilroy"
                        >
                          Mobile Number {" "}
                          <span className="text-red-500 text-[20px]">
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <InputGroup className="!flex">

                          <Form.Select
                            value={countryCode}
                            id="vendor-select-pg"
                            className={`border border-[#D9D9D9] h-[50px] text-[16px] text-[#4B4B4B] font-gilroy 
    ${countryCode ? 'font-semibold' : 'font-medium'} 
    shadow-none bg-white max-w-[80px] pr-[10px]

    !rounded-l-[8px] !rounded-r-none   
    !border-r-0                      
    `}
                          >
                            <option>+{countryCode}</option>
                          </Form.Select>

                          <Form.Control
                            value={Phone}
                            ref={PhoneRef}
                            onChange={handlePhone}
                            type="text"
                            placeholder="9876543210"
                            maxLength={10}
                            className="text-[16px] text-[#4B4B4B] font-medium font-gilroy shadow-none 
    border border-[#D9D9D9] h-[50px] mt-0 w-full px-3

    !rounded-r-[8px] !rounded-l-none   
    "
                          />

                        </InputGroup>
                        <p
                          id="MobileNumberError"
                          className="text-red-500 text-[12px] mt-[5px]"
                        ></p>

                        {phoneError && (
                          <ErrorMessage message={phoneError} type="error" />
                        )}
                      </Form.Group>
                    </div>



                    {formError && (
                      <div ref={nochangeRef} className="text-red-500 text-center">
                        <ErrorMessage message={formError} type="error" />
                      </div>
                    )}


                  </div>

                </div>

                {state.UsersList.contactError && (
                  <ErrorMessage message={state.UsersList.contactError} type="error" />
                )}

                <Modal.Footer className="border-0 pt-0" >
                  <div className="flex justify-end gap-3">

                    <Button
                      onClick={handleClose}
                      className="w-full mt-1 bg-white border-0 !font-gilroy !text-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] font-gilroy px-[40px] py-2"

                    >
                      Cancel
                    </Button>

                    <Button disabled={formLoading}
                      onClick={handleSubmitContact}
                      className="w-full mt-1 !whitespace-nowrap !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy !px-[40px] py-2"

                    >
                      {formLoading ? "Adding..." : "Add"}
                    </Button>
                  </div>
                </Modal.Footer>


              </div>
            </div>
          </Modal.Body>



          {formLoading && <div
            className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10 top-[100px]"
          >
            <div className="w-10 h-10 rounded-full border-t-[4px] border-t-blue-600 border-r-[4px] border-r-transparent animate-spin">

            </div>
          </div>}

        </Modal.Dialog>
      </Modal>
    </div>
  );
}

UserAdditionalContact.propTypes = {
  contactEdit: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
  setAdditionalForm: PropTypes.func.isRequired,
  additionalForm: PropTypes.func.isRequired,
  editAdditional: PropTypes.func.isRequired,
};

export default UserAdditionalContact;
