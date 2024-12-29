import { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import {
  Button,
  Offcanvas,
  Form,
  FormControl,
  FormSelect,
  InputGroup,
} from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "./Amenities.css";
import "./Settings.css";
import { useDispatch, useSelector } from "react-redux";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import eye from "../Assets/Images/login-password.png";
import eyeClosed from "../Assets/Images/pngaaa.com-6514750.png";
import { Mobile } from "iconsax-react";
import { Email } from "@material-ui/icons";
import { MdError } from "react-icons/md";
import emptyimg from "../Assets/Images/New_images/empty_image.png";
import {Autobrightness,Call,Sms,House,Buildings,ArrowLeft2,ArrowRight2,MoreCircle,} from "iconsax-react";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";

function UserSettings() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [descError, setDescError] = useState("");
  const [EditUser, setEditUser] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [editShow, setEditShow] = useState(false);
  const [editId, setEditId] = useState("");
  const [formError, setFormError] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [UserscurrentPage, setUserscurrentPage] = useState(1);
  const [usersFilterddata, setUsersFilterddata] = useState([]);

  useEffect(() => {
    dispatch({ type: "SETTING_ROLE_LIST" });
    // dispatch({ type: "COUNTRYLIST" });
    dispatch({ type: "GETUSERSTAFF" });
  }, []);

  useEffect(() => {
    setemailIdError(state.Settings.emailIdError);
  }, [state.Settings.emailIdError]);

  useEffect(() => {
    setphonenumError(state.Settings.phoneNumError);
  }, [state.Settings.phoneNumError]);

  useEffect(() => {
    setUsersFilterddata(
      state.Settings?.addSettingStaffList?.response?.user_details
    );
  }, [state.Settings?.addSettingStaffList?.response?.user_details]);

  useEffect(() => {
    if (state.Settings.StatusForaddSettingUser === 200) {
      handleStaffClose();
      dispatch({ type: "GETUSERSTAFF" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_STAFF_USER" });
      }, 200);
    }
  }, [state.Settings.StatusForaddSettingUser]);

  const handleName = (e) => {
    setName(e.target.value);
    setNameError("");
    setFormError("");
  };
  // const handleEmail=(e)=>{
  //   setEmail(e.target.value)
  // }
  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const hasUpperCase = /[A-Z]/.test(emailValue);
    const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    } else if (hasUpperCase) {
      setEmailErrorMessage("Email should be in lowercase *");
      setEmailError("Invalid Email Id *");
    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Invalid Email Id *");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
      setemailIdError("");
      setFormError("");
    }
    dispatch({ type: "CLEAR_EMAIL_ID_ERROR" });
  };

  const handleMobile = (e) => {
    // const input = e.target.value;
    setPhone(e.target.value);

    const pattern = /^\d{1,10}$/;
    const isValidMobileNo = pattern.test(e.target.value);

    if (e.target.value === "") {
      setPhoneError("");
    } else if (isValidMobileNo && e.target.value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid mobile number *");
    }

    setPhoneErrorMessage("");
    setFormError("");
    dispatch({ type: "CLEAR_PHONE_NUM_ERROR" });
  };
  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };

  const handleRole = (e) => {
    setRole(e.target.value);
    setRoleError("");
    setFormError("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setFormError("");
  };

  const handleStaffClose = () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setRole("");
    setDescription("");
    setFormError("");
  };
  const handleEditUser = (id, event) => {
    if (EditUser === id) {
      setEditUser(null);
    } else {
      // Get the position of the clicked element
      const rect = event.currentTarget.getBoundingClientRect();
      const newPopupPosition = {
        top: rect.top + window.scrollY + 40, // Adjust for height
        left: rect.left + window.scrollX - 130, // Adjust for width
      };

      setPopupPosition(newPopupPosition); // Set the position dynamically
      setEditUser(id);
    }
  };

  // const handleEditUser = (id) => {
  //   if (EditUser === id) {
  //     setEditUser(null);
  //   } else {
  //     setEditUser(id);
  //   }

  // };
  const [initialStateAssign, setInitialStateAssign] = useState({
    name: "",
    phone: "",
    role: "",
    description: "",
    email: "",
  });
  const MobileNumber = `${countryCode}${phone}`;
  const handleEditForm = (u) => {
    const phoneNumber = String(u.mobileNo || "");
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const mobileNumber = phoneNumber.slice(-10);
    setEditShow(true);
    setName(u.first_name);
    setEmail(u.email_Id);
    setCountryCode(countryCode);
    setPhone(mobileNumber);
    setDescription(u.description);
    setRole(u.role_id);
    setEditId(u.id);

    setInitialStateAssign({
      name: u.first_name || "",
      phone: u.mobileNo || "",
      email: u.email_Id || "",
      role: u.role_id || "",
      description: u.description || "",
    });
  };

  const handleDeleteForm = (v) => {
    setDeleteId(v.id);
  };

  const validateAssignField = (value, fieldName) => {
    if (!value || value === "Select a Role") {
      switch (fieldName) {
        case "name":
          setNameError("name is required");
          break;
        case "phone":
          setPhoneError("Phone  is required");
          break;
        case "email":
          setEmailError("email ID is required");
          break;
        case "role":
          setRoleError("role is required");
          break;

        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "name":
          setNameError("");
          break;
        case "phone":
          setPhoneError("");
          break;
        case "email":
          setEmailError("");
          break;
        // case "password":
        // setPasswordError("");
        // break;
        case "role":
          setRoleError("");
          break;

        default:
          break;
      }
      return true;
    }
  };

  const handleSubmit = () => {
    if (!validateAssignField(name, "name"));
    if (!validateAssignField(phone, "phone"));
    if (!validateAssignField(email, "email"));
    if (!validateAssignField(role, "role"));

    if (role === "Select a Role" || roleError) {
      setRoleError("Please select a valid Role");
      // return;
    }

    if (phoneError === "Invalid mobile number *") {
      setPhoneErrorMessage("Please enter a valid 10-digit phone number");
      // return;
    } else {
      setPhoneErrorMessage("");
    }
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
    if (editShow) {
      const noChangesDetected =
        name === initialStateAssign.name &&
        Number(countryCode + phone) === Number(initialStateAssign.phone) &&
        email === initialStateAssign.email &&
        description === initialStateAssign.description &&
        String(role) === String(initialStateAssign.role);

      if (noChangesDetected) {
        setFormError("No changes detected.");
        return;
      } else {
        setFormError("");
      }
      dispatch({
        type: "ADDSTAFFUSER",
        payload: {
          user_name: name,
          phone: normalizedPhoneNumber,
          email_id: email,
          role_id: role,
          description: description,
          id: editId, // Include ID for editing
        },
      });
    } else {
      // Dispatch action for adding a new staff user
      dispatch({
        type: "ADDSTAFFUSER",
        payload: {
          user_name: name,
          phone: normalizedPhoneNumber,
          email_id: email,
          password: password, // Password is needed for adding
          role_id: role,
          description: description,
        },
      });
    }

    // dispatch({
    //   type: "ADDSTAFFUSER",
    //   payload: {user_name:name,phone:normalizedPhoneNumber,email_id:email,password:password,role_id:role,description:description},
    // });
  };

  const usersPerPage = 5;
  const indexOfLastRowUsers = UserscurrentPage * usersPerPage;
  const indexOfFirstRowUsers = indexOfLastRowUsers - usersPerPage;
  const currentRowUsers = usersFilterddata?.slice(
    indexOfFirstRowUsers,
    indexOfLastRowUsers
  );

  const handleUsersPageChange = (userspageNumber) => {
    setUserscurrentPage(userspageNumber);
  };
  const totalPagesUsers = Math.ceil(usersFilterddata?.length / usersPerPage);

  const renderPageNumbersUsers = () => {
    const pageNumbersUsers = [];
    let startPageUsers = UserscurrentPage - 1;
    let endPageUsers = UserscurrentPage + 1;

    if (UserscurrentPage === 1) {
      startPageUsers = 1;
      endPageUsers = 3;
    }

    if (UserscurrentPage === totalPagesUsers) {
      startPageUsers = totalPagesUsers - 2;
      endPageUsers = totalPagesUsers;
    }

    if (UserscurrentPage === 2) {
      startPageUsers = 1;
      endPageUsers = 3;
    }

    if (UserscurrentPage === totalPagesUsers - 1) {
      startPageUsers = totalPagesUsers - 2;
      endPageUsers = totalPagesUsers;
    }

    for (let i = startPageUsers; i <= endPageUsers; i++) {
      if (i > 0 && i <= totalPagesUsers) {
        pageNumbersUsers.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === UserscurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === UserscurrentPage ? "transparent" : "transparent",
                border: i === UserscurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleUsersPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersUsers;
  };

  return (
    <>
      <div className="d-flex flex-column flex-sm-column flex-md-column  flex-lg-row col-lg-12">
        <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12">
          <div
            className="col-lg-11 col-md-11 col-sm-12 col-xs-12"
            style={{
              border: "1px solid #ced4da",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "-10px",
              }}
            >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                    value={name}
                    onChange={(e) => handleName(e)}
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
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {nameError}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group>
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Mobile{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
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
                      value={phone}
                      onChange={handleMobile}
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
                  <p
                    id="MobileNumberError"
                    style={{ color: "red", fontSize: 11, marginTop: 5 }}
                  ></p>
                  {phoneError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {phoneError}
                      </span>
                    </div>
                  )}
                  {phonenumError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {phonenumError}
                      </span>
                    </div>
                  )}
                  {phoneErrorMessage && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {phoneErrorMessage}
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
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Email{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                    value={email}
                    onChange={(e) => handleEmail(e)}
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
                {emailIdError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {emailIdError}
                    </span>
                  </div>
                )}
                {emailError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {emailError}
                    </span>
                  </div>
                )}
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {!editShow && (
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Password{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <InputGroup>
                      <FormControl
                        id="form-controls"
                        placeholder="Enter password"
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
                          borderRight: "none", // Remove the right border
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
                          borderLeft: "none", // Ensure no overlap with the input
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
                )}
              </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput5"
                >
                  <Form.Label
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#222",
                      fontStyle: "normal",
                      lineHeight: "normal",
                    }}
                  >
                    Role
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="border"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      lineHeight: "18.83px",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                    value={role}
                    onChange={(e) => handleRole(e)}
                  >
                    <option value="">Select a Role</option>
                    {state.Settings?.getsettingRoleList?.response?.roles?.map(
                      (u) => (
                        <option key={u.id} value={u.id}>
                          {u.role_name}
                        </option>
                      )
                    )}
                  </Form.Select>
                </Form.Group>
                {roleError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "red",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {roleError}
                    </span>
                  </div>
                )}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Description{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder="Enter name"
                    type="text"
                    value={description}
                    onChange={(e) => handleDescription(e)}
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
              </div>
            </div>
            {/* <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'> */}
            {formError && (
              <div style={{ color: "red" }}>
                <MdError />
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {formError}
                </span>
              </div>
            )}
            <Button
              className="w-100"
              onClick={handleSubmit}
              disabled={formError}
              style={{
                fontFamily: "Montserrat",
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 56,
                letterSpacing: 1,
                borderRadius: 12,
              }}
            >
              + Create user{" "}
            </Button>
            {/* </div> */}
          </div>
        </div>

        {/* <hr style={{ border: '1px solid #ced4da', transform: 'rotate(180deg)' }} /> */}

        <div className="col-lg-6 col-md-10 col-sm-12 col-xs-12 ms-lg-5 ms-sm-0 ms-0 mt-sm-2 mt-xs-2 ">
          {currentRowUsers?.length > 0 ? (
            <Table
              responsive="md"
              className="Ta_Design mt-3 mt-md-0 mt-lg-0 "
              style={{
                tableLayout: "auto",
                borderRadius: "24px",
                border: "1px solid #DCDCDC",
              }}
            >
              <thead style={{ backgroundColor: "#E7F1FF" }}>
                <tr>
                  <th
                    style={{
                      color: "#222",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      borderTopLeftRadius: "24px",
                      textAlign: "left",
                      paddingLeft: 20,
                    }}
                  >
                    Users
                  </th>
                  <th
                    style={{
                      color: "#222",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Email
                  </th>
                  <th
                    style={{
                      color: "#222",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Mobile
                  </th>
                  <th
                    style={{
                      color: "#222",
                      fontWeight: 600,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      padding: "10px",
                      textAlign: "left",
                    }}
                  >
                    Role
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      borderTopRightRadius: "24px",
                      textAlign: "center",
                    }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {currentRowUsers?.map((item) => {
                  const imageUrl = item.profile || Profile;
                  return (
                    <tr style={{ overflowX: "auto" }}>
                      {/* <td
                
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                   paddingLeft:20,
                   whiteSpace: "nowrap"
                 }}
               >
                {item.first_name}
               </td> */}
                      <td
                        style={{
                          border: "none",
                          display: "flex",
                          padding: "10px",
                        }}
                      >
                        <Image
                          src={imageUrl}
                          alt={item.first_name || "Default Profile"}
                          roundedCircle
                          style={{
                            height: "40px",
                            width: "40px",
                            marginRight: "10px",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Profile;
                          }}
                        />
                        <span
                          className="Customer_Name_Hover"
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            // color: "#1E45E1",
                            cursor: "pointer",
                            marginTop: 10,
                          }}
                          // onClick={() => handleRoomDetailsPage(user)}
                        >
                          {item.first_name}
                        </span>
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "16px",
                          fontFamily: "Gilroy",
                          textAlign: "left",
                          paddingTop: 17,
                        }}
                      >
                        {item.email_Id}
                      </td>
                      {/* <td
                 style={{
                   fontWeight: 500,
                   fontSize: "16px",
                   fontFamily: "Gilroy",
                   textAlign: "left",
                 }}
               >
                {item.mobileNo}
               </td> */}
                      <td
                        style={{
                          paddingTop: 15,
                          border: "none",
                          textAlign: "start",
                          fontSize: "16px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          marginTop: 10,
                          whiteSpace: "nowrap",
                        }}
                      >
                        +
                        {item &&
                          String(item.mobileNo).slice(
                            0,
                            String(item.mobileNo).length - 10
                          )}{" "}
                        {item && String(item.mobileNo).slice(-10)}
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "16px",
                          fontFamily: "Gilroy",
                          textAlign: "left",
                          paddingTop: 15,
                        }}
                      >
                        {item.role_name}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          style={{
                            height: "40px",
                            width: "40px",
                            borderRadius: "50%",
                            border: "1px solid #EFEFEF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            zIndex: EditUser === item.id ? 1000 : "auto",
                          }}
                          //  onClick={() => handleEditUser(item.id)}
                          onClick={(event) => handleEditUser(item.id, event)}
                        >
                          <PiDotsThreeOutlineVerticalFill
                            style={{ height: "20px", width: "20px" }}
                          />
                          {EditUser === item.id && (
                            <div
                              ref={popupRef}
                              style={{
                                cursor: "pointer",
                                backgroundColor: "#F9F9F9",
                                position: "absolute",
                                top: popupPosition?.top || 0,
                                left: popupPosition?.left || 0,
                                width: 160,
                                height: 70,
                                border: "1px solid #EBEBEB",
                                borderRadius: 10,
                                display: "flex",
                                flexDirection: "column",
                                padding: 10,
                                alignItems: "start",
                              }}
                            >
                              <div
                                className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                onClick={() => handleEditForm(item)}
                              >
                                <img
                                  src={Edit}
                                  style={{ height: 16, width: 16 }}
                                  alt="Edit"
                                />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: "Gilroy, sans-serif",
                                    color: "#000000",
                                    cursor: "pointer",
                                  }}
                                >
                                  Edit
                                </label>
                              </div>
                              <div
                                className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                onClick={() => handleDeleteForm(item)}
                              >
                                <img
                                  src={Delete}
                                  style={{ height: 16, width: 16 }}
                                  alt="Delete"
                                  //  onClick={handleDeleteTransForm}
                                  //  onClick={() => handleDeleteTransForm(user)}
                                />
                                <label
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 500,
                                    fontFamily: "Gilroy, sans-serif",
                                    color: "#FF0000",
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div>
              <div style={{ textAlign: "center" }}>
                <img src={emptyimg} width={240} height={240} alt="emptystate" />
              </div>
              <div
                className="pb-1"
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: 20,
                  color: "rgba(75, 75, 75, 1)",
                }}
              >
                No Users{" "}
              </div>
              <div
                className="pb-1"
                style={{
                  textAlign: "center",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  fontSize: 16,
                  color: "rgba(75, 75, 75, 1)",
                }}
              >
                There are no Users available.{" "}
              </div>
            </div>
          )}

          {currentRowUsers?.length > 0 && (
            <nav>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyleType: "none",
                  padding: 0,
                  justifyContent: "end",
                }}
              >
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color: UserscurrentPage === 1 ? "#ccc" : "#007bff",
                      cursor:
                        UserscurrentPage === 1 ? "not-allowed" : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handleUsersPageChange(UserscurrentPage - 1)}
                    disabled={UserscurrentPage === 1}
                  >
                    <ArrowLeft2 size="16" color="#1E45E1" />
                  </button>
                </li>
                {UserscurrentPage > 3 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handleUsersPageChange(1)}
                    >
                      1
                    </button>
                  </li>
                )}
                {UserscurrentPage > 3 && <span>...</span>}
                {renderPageNumbersUsers()}
                {UserscurrentPage < totalPagesUsers - 2 && <span>...</span>}
                {UserscurrentPage < totalPagesUsers - 2 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",

                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handleUsersPageChange(totalPagesUsers)}
                    >
                      {totalPagesUsers}
                    </button>
                  </li>
                )}
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color:
                        UserscurrentPage === UserscurrentPage
                          ? "#ccc"
                          : "#007bff",
                      cursor:
                        UserscurrentPage === UserscurrentPage
                          ? "not-allowed"
                          : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handleUsersPageChange(UserscurrentPage + 1)}
                    disabled={UserscurrentPage === totalPagesUsers}
                  >
                    <ArrowRight2 size="16" color="#1E45E1" />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}

export default UserSettings;
