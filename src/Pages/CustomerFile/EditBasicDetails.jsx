/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    Modal,
    Form,
    Button,
    InputGroup,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage'


function EditBasicDetails({ show, handleClose, basicDetails }) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const countryCode = "91"
    // const [id, setId] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [phoneError, setPhoneError] = useState("")
    const [initialValues, setInitialValues] = useState(null);
    const [isChanged, setIsChanged] = useState("")
    const [emailError, setEmailError] = useState("")



    const handleFirstNameChange = (e) => {
        const lettersOnly = e.target.value.replace(/[^A-Za-z\s]/g, "");
        setFirstName(lettersOnly);
        setFirstNameError("")
        setIsChanged("")

    };

    const handleLastNameChange = (e) => {
        const lettersOnly = e.target.value.replace(/[^A-Za-z]/g, "");
        setLastName(lettersOnly);
        setIsChanged("")
    };



    const handleEmailChange = (e) => {
        const emailValue = e.target.value.toLowerCase();
        setEmail(emailValue);

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
        const isValidEmail = emailRegex.test(emailValue);
        if (!emailValue) {
            setEmailError("");
            ;
        } else if (!isValidEmail) {

            setEmailError("Please Enter  Valid Email Id");
        } else {
            setEmailError("");

        }
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
        setIsChanged("")
    };

    const handlePhoneChange = (e) => {
        dispatch({ type: 'REMOVE_ALREADY_MOBILE_BASIC_ERROR' })
        const input = e.target.value.replace(/\D/g, "");
        setPhone(input);

        if (input.length === 0) {
            setPhoneError("");
        } else if (input.length < 10) {
            setPhoneError("Please Enter Mobile Number");
        } else if (input.length === 10) {
            setPhoneError("");
        }

        setIsChanged("")

        dispatch({ type: "CLEAR_PHONE_ERROR" });
    };





    useEffect(() => {
        if (basicDetails) {

            setFirstName(basicDetails?.firstName);
            setLastName(basicDetails?.lastName);
            setPhone(basicDetails?.mobileNo);
            // setCountryCode(basicDetails?.countryCode);
            // setId(basicDetails.customerId);
            setEmail(basicDetails?.emailId)


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
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])



    const MobileNumber = `${phone}`;



console.log("basicDetails",basicDetails)

    const handleSubmit = () => {
        dispatch({ type: 'REMOVE_ALREADY_MOBILE_BASIC_ERROR' })

        if (!firstName) {
            setFirstNameError("Please Enter First Name");
            return;
        }
        if (phoneError === "Please Enter Mobile Number") {
            return;
        }
        if (!phone) {
            setPhoneError("Please Enter Mobile Number");
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
        const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");

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

    };



    return (
        <div className="modal show block static" >
            <Modal show={show}
                onHide={handleClose}
                centered backdrop="static">
                <Modal.Dialog className="w-full max-w-4xl pt-1.5 pb-2.5 px-2.5 m-0 p-0"
                >
                    <Modal.Header className="border border-gray-200">
                        <Modal.Title className="!text-xl text-gray-900 !font-semibold !font-gilroy">
                            Edit Basic Details
                        </Modal.Title>

                        <CloseCircle size="24" color="#000"
                            onClick={handleClose}
                            className="cursor pointer"
                        />
                    </Modal.Header>

                    <Modal.Body className="pt-2 pb-2 px-3">
                        <div className="row mb-0">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                                        First name
                                        <span className="text-red-600 text-xl">*</span>
                                    </Form.Label>

                                    <Form.Control
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                        type="text"
                                        placeholder="Enter First name"
                                        className={`text-base text-gray-600 font-gilroy ${firstName ? "font-semibold" : "font-medium"
                                            } border border-gray-300 h-12 rounded-lg shadow-none`}
                                    />
                                </Form.Group>

                                {firstNameError && (
                                    <ErrorMessage message={firstNameError} type="error" />
                                )}
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                                        Last name
                                    </Form.Label>

                                    <Form.Control
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                        type="text"
                                        placeholder="Enter Last Name"
                                        className={`text-base text-gray-600 font-gilroy ${lastName ? "font-semibold" : "font-medium"
                                            } border border-gray-300 h-12 rounded-lg shadow-none`}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                                    <Form.Label className="text-sm text-gray-900 font-medium font-gilroy">
                                        Email
                                    </Form.Label>

                                    <Form.Control
                                        value={email}
                                        onChange={handleEmailChange}
                                        type="text"
                                        placeholder="Enter Email"
                                        className={`text-base text-gray-600 font-gilroy ${email ? "font-semibold" : "font-medium"
                                            } border border-gray-300 h-12 rounded-lg shadow-none`}
                                    />
                                </Form.Group>

                                {emailError && (
                                    <ErrorMessage message={emailError} type="error" />
                                )}
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

                                {phoneError && (
                                    <ErrorMessage message={phoneError} type="error" />
                                )}

                                {
                                    state.UsersList?.alreadyMobileBasicError &&
                                    <ErrorMessage message={state.UsersList?.alreadyMobileBasicError} type="error" />
                                }
                            </div>
                        </div>
                    </Modal.Body>

                    {isChanged ?
                        <div className="flex items-center justify-center mt-2 mb-2">
                            <ErrorMessage message={isChanged} type="error" />
                        </div>
                        : null}


                    <Modal.Footer className="border-0 pt-0">
                        <div className="flex justify-end gap-3">

                            <Button className="w-100 mt-1 bg-white border-0 !text-[#1E45E1] !font-bold !text-base !font-gilroy rounded-xl py-2 px-10"
                                onClick={handleClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={handleSubmit}
                                className="!bg-[#1E45E1] !font-semibold !text-base !font-gilroy rounded-xl py-2 px-10 w-100 mt-1"
                            >
                                Update
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}
EditBasicDetails.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    basicDetails: PropTypes.func.isRequired,

};
export default EditBasicDetails