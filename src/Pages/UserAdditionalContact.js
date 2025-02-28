import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button,Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import { InputGroup} from "react-bootstrap";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";

function UserAdditionalContact(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [Phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [contactId, setContactId] = useState("");
  const [formError, setFormError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [guardianError, setGuardianError] = useState("");
  const MobileNumber = `${countryCode}${Phone}`;

  const [initialState, setInitialState] = useState({
    userName: "",
    guardiaz: "",
    Phone: "",
    address: "",
  });

  useEffect(() => {
    if (props.contactEdit && props.editAdditional) {
      const phoneNumber = String(props.contactEdit.mob_no || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      setUserName(props.contactEdit.user_name);
      setGuardian(props.contactEdit.guardian);
      setPhone(mobileNumber);
      setAddress(props.contactEdit.address);
      // setUserId(props.contactEdit.user_id);
      setContactId(props.contactEdit.id);
      setCountryCode(countryCode);

      setInitialState({
        userName: props.contactEdit.user_name || "",
        guardian: props.contactEdit.guardian || "",
        Phone: props.contactEdit.mob_no || "",
        address: props.contactEdit.address || "",
      });
    }
  }, [props.contactEdit && props.editAdditional]);

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setFormError("");
    setUserNameError("");
  };
  const handleGuardian = (e) => {
    setGuardian(e.target.value);
    setFormError("");
    setGuardianError("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setFormError("");
    setAddressError("");
  };

  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null ||
      value === "0";
    if (isValueEmpty) {
      switch (fieldName) {
        case "gurardian":
          setGuardianError("Gurardian is required");
          break;
        case "userName":
          setUserNameError("UserName is required");
          break;
        case "Phone":
          setPhoneError("Phone number is required");
          break;
        case "address":
          setAddressError("Address is required");
          break;

        default:
          break;
      }
      return false;
    }

    switch (fieldName) {
      case "gurardian":
        setGuardianError("");
        break;
      case "userName":
        setUserNameError("");
        break;
      case "Phone":
        setPhoneError("");
        break;
      case "address":
        setAddressError("");
        break;
      default:
        break;
    }

    return true;
  };

  const handleSubmitContact = () => {
    const isUserValid = validateAssignField(userName, "userName");
    const isGuardianValid = validateAssignField(guardian, "gurardian");
    const isPhoneValid = validateAssignField(Phone, "Phone");
    const isAddressValid = validateAssignField(address, "address");

    if (!isUserValid || !isGuardianValid || !isPhoneValid || !isAddressValid) {
      return;
    }

    if (props.editAdditional && props.contactEdit.id) {
      const isChanged = !(
        userName === initialState.userName &&
        guardian === initialState.guardian &&
        Number(countryCode + Phone) === Number(initialState.Phone) &&
        address === initialState.address
      );
      if (!isChanged) {
        setFormError("No changes detected.");
        return;
      } else {
        setFormError("");
      }

      dispatch({
        type: "CUSTOMERADDCONTACT",
        payload: {
          user_name: userName,
          guardian: guardian,
          mob_no: MobileNumber,
          address: address,
          user_id: props.id,
          id: contactId,
        },
      });
    } else {
      dispatch({
        type: "CUSTOMERADDCONTACT",
        payload: {
          user_name: userName,
          guardian: guardian,
          mob_no: MobileNumber,
          address: address,
          user_id: props.id,
        },
      });
    }
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      handleCloseAdditionalForm();
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  

  const handlePhone = (e) => {
    setPhone(e.target.value);
    const pattern = /^\d{1,10}$/;
    const isValidMobileNo = pattern.test(e.target.value);

    if (isValidMobileNo && e.target.value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid mobile number *");
    }
    setFormError("");
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
  };
  useEffect(() => {
    if (state.UsersList.contactError) {
      setPhoneError(state.UsersList.contactError);
    }
  }, [state.UsersList.contactError]);

  const handleCloseAdditionalForm = () => {
    props.setAdditionalForm(false);
    setUserName("");
    setPhone("");
    setAddress("");
    setGuardian("");
    setUserNameError("");
    setGuardianError("");
    setPhoneError("");
    setAddressError("");
    setFormError("");
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
  };

  return (
    <div>
      <Modal
        show={props.additionalForm}
        onHide={handleCloseAdditionalForm}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: "666px",

            paddingRight: "10px",

            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body>
            <div className="d-flex align-items-center">
              <div className="container">
                <div className="row mb-3"></div>

                <Modal.Header
                  style={{ marginBottom: "30px", position: "relative" }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Add Contact
                  </div>
                  <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleCloseAdditionalForm}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "16px",
                      border: "1px solid black",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "30px",
                        paddingBottom: "6px",
                      }}
                    >
                      &times;
                    </span>
                  </button>
                </Modal.Header>

                <div className="row mb-3">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        first Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter name"
                        onChange={(e) => handleUserName(e)}
                        value={userName}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    </Form.Group>

                    {userNameError && (
                      <div style={{ marginTop: "-15px", color: "red" }}>
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {userNameError}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Guardian{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter name"
                        onChange={(e) => handleGuardian(e)}
                        value={guardian}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    </Form.Group>

                    {guardianError && (
                      <div style={{ marginTop: "-15px", color: "red" }}>
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {guardianError}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Mobile number{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>

                      <InputGroup>
                        <Form.Select
                          value={countryCode}
                          id="vendor-select-pg"
                          // onChange={handleCountryCodeChange}
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
                          value={Phone}
                          onChange={handlePhone}
                          type="text"
                          placeholder="9876543210"
                          maxLength={10}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: Phone ? 600 : 500,
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

                      {phoneError && (
                        <div style={{ marginTop: "-15px", color: "red" }}>
                          <MdError
                            style={{
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              marginRight: "5px",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              color: "red",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            {phoneError}
                          </span>
                        </div>
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Address{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Address"
                        onChange={(e) => handleAddress(e)}
                        value={address}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    </Form.Group>
                    {/* {addressError && (
                                      <div style={{ color: "red" }}>
                                        <MdError />
                                        {addressError}
                                      </div>
                                    )} */}

                    {addressError && (
                      <div style={{ marginTop: "-15px", color: "red" }}>
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {addressError}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                  {formError && (
                          <div className="d-flex justify-content-center align-items-center" style={{ color: "red",marginTop:"-10px" }}>
                            <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
                            <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{formError}</span>
                          </div>
                        )}
                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  onClick={handleSubmitContact}
                >
                  Add Contact
                </Button>
              </div>
              {/* )} */}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
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
