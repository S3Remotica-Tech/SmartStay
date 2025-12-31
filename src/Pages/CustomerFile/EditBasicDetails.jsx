/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    Modal,
    Form,
    Button,
    // InputGroup,
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
    // const [countryCode, setCountryCode] = useState("91");
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

    // const handlePhoneChange = (e) => {
    //     const input = e.target.value.replace(/\D/g, "");
    //     setPhone(input);

    //     if (input.length === 0) {
    //         setPhoneError("");
    //     } else if (input.length < 10) {
    //         setPhoneError("Please Enter Mobile Number");
    //     } else if (input.length === 10) {
    //         setPhoneError("");
    //     }

    //     setIsChanged("")

    //     dispatch({ type: "CLEAR_PHONE_ERROR" });
    // };





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





    const handleSubmit = () => {
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

        const capitalizeFirstLetter = (str) => {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        const capitalizedFirstname = capitalizeFirstLetter(firstName);
        const capitalizedLastname = capitalizeFirstLetter(lastName);
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
                                   },
                profilePic: basicDetails?.profilePic || "",
            },
        });

    };

    

    return (
        <div
            className="modal show"
            style={{
                display: "block",
                position: "initial",
            }}
        >
            <Modal show={show}
                onHide={handleClose}
                centered backdrop="static">
                <Modal.Dialog
                    style={{
                        maxWidth: 850, width: "100%",
                        paddingTop: 5,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
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
                            Edit Basic Details
                        </Modal.Title>

                        <CloseCircle size="24" color="#000"
                            onClick={handleClose}
                            style={{ cursor: "pointer" }} />
                    </Modal.Header>

                    <Modal.Body style={{ padding: "8px 13px" }} >
                        <div className="row mb-0">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group
                                    className="mb-2"
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
                                        First name
                                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                                    </Form.Label>
                                    <Form.Control
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                        type="text"
                                        placeholder="Enter First name"
                                        style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: firstName ? 600 : 500,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                            height: 50,
                                            borderRadius: 8,
                                        }}
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
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Last name {" "}

                                    </Form.Label>
                                    <Form.Control
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                        type="text"
                                        placeholder="Enter Last Name"
                                        style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: lastName ? 600 : 500,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                            height: 50,
                                            borderRadius: 8,
                                        }}
                                    />
                                </Form.Group>


                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group
                                    className="mb-2"
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
                                        Email

                                    </Form.Label>
                                    <Form.Control
                                        value={email}
                                        onChange={handleEmailChange}
                                        type="text"
                                        placeholder="Enter Email"
                                        style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: email ? 600 : 500,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                            height: 50,
                                            borderRadius: 8,
                                        }}
                                    />
                                </Form.Group>
                                {emailError && (
                                    <ErrorMessage message={emailError} type="error" />
                                )}

                            </div>
                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group controlId="exampleForm.ControlInput1">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Mobile Number {" "}
                                        <span style={{ color: "red", fontSize: "20px" }}>
                                            {" "}
                                            *{" "}
                                        </span>
                                    </Form.Label>

                                    <InputGroup>
                                        <Form.Select
                                            value={countryCode}
                                            id="vendor-select-pg"
                                            style={{
                                                border: "1px solid #D9D9D9",
                                                cursor: "pointer",
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

                                            <option value="91" >
                                                + 91
                                            </option>

                                        </Form.Select>
                                        <Form.Control
                                            value={phone}
                                            onChange={handlePhoneChange}
                                            type="text"
                                            placeholder="9876543210"
                                            maxLength={10}
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: phone ? 600 : 500,
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

                                </Form.Group>
                                {phoneError && (
                                    <ErrorMessage message={phoneError} type="error" />
                                )}
                            </div> */}
                        </div>




                    </Modal.Body>




                    {isChanged ?
                        <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                            <ErrorMessage message={isChanged} type="error" />
                        </div>
                        : null}


                    <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
                        <div className="d-flex justify-content-end gap-3">


                            <Button
                                onClick={handleClose}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#fff",
                                    border: "none",
                                    color: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Cancel
                            </Button>

                            <Button 
                                onClick={handleSubmit}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                    
                                }}
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