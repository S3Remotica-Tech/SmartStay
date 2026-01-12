/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import img2 from "../../Assets/Images/New_images/settingeye.png";
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Select from "react-select";
// import "../Pages/Settings/Settings.css";
import "../Settings/Settings.css";

import eye from "../../Assets/Images/login-password.png";
import eyeClosed from "../../Assets/Images/Show_password.png";
// import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import '../Settings/SettingAll.css'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { CloseCircle } from "iconsax-react";
import '../Settings/SettingGeneral.css';
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { Card } from "react-bootstrap";
import {
  Call,
  Sms,
  LogoutCurve,
  Crown1, PasswordCheck, Edit, CardSend, Shield
} from "iconsax-react";
import Logout from "../../Components/Logout";
import RecentActivity from "./RecentActivity";
import ManagedUsers from "./ManagedUsers";

function SettingGeneral() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [formLoading, setFormLoading] = useState(false)
  const [verifyLoading, setVerfifyLoading] = useState(false)
  const [changeLoading, setChangeLoading] = useState(false)

  const [showFormGeneral, setShowFormGeneral] = useState(false);
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("masters");

  const tabs = [
    { key: "masters", label: "Masters" },
    { key: "recent", label: "Recent Activity" },
    { key: "users", label: "Managed Users" }
  ];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [Phone, setPhone] = useState("");
  const [emilId, setEmailId] = useState("");

  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [generalEdit, setGeneralEdit] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deleteForm, setDeleteForm] = useState(false);
  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formError, setFormError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [passId, setPassId] = useState("");
  const [confirmPass, setConfirmPass] = useState(false);
  const [checkPassword, setCheckPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conformShowPassword, setConFormShowPassword] = useState("");
  const [conformPasswordError, setConformPasswordError] = useState("");
  const [newPassError, setNewPassError] = useState("")
  const [generalFilterddata, setGeneralFilterddata] = useState([]);


  const [loading, setLoading] = useState(false)
  const [generalDeleteError, setGeneralDeleteError] = useState("")

  const {
    canWriteModule: canWriteProfile,
    canReadModule: canReadProfile,
    canUpdateModule: canUpdateProfile,
    canDeleteModule: canDeleteProfile,
  } = useHasPermission("Profile");





  useEffect(() => {
    if (!canReadProfile) {
      setLoading(false);
    } 
  }, [canReadProfile]);






  const indianStates = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];


  const handleNewPassword = (e) => {
    const newPassword = e.target.value
    setNewPassword(e.target.value);
    setNewPassError("")


    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setNewPassError("Password must include a capital letter, a number, and a special character.");
    } else {
      setNewPassError("");
    }
  };

  const handleConfirmPassword = (e) => {
    const ConfirmPassword = e.target.value
    setConfirmPassword(e.target.value);
    setConformPasswordError("")


    const hasUppercase = /[A-Z]/.test(ConfirmPassword);
    const hasNumber = /[0-9]/.test(ConfirmPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(ConfirmPassword);

    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setConformPasswordError("Password must include a capital letter, a number, and a special character.");
    } else {
      setConformPasswordError("");
    }
    dispatch({ type: "CLEAR_CONFORM_PASSWORD_MATCHES" });
  };

  // const handleConfirmPass = () => {
  //   setConfirmPass(true);
  // };


  const handleCloseConfirmPass = () => {
    setConfirmPass(false);
    setConformPasswordError("")
    setConfirmPassword("")
    setNewPassword("")
    setNewPassError("")
  };

  const handleChangePassword = (pass) => {
    setChangePassword(true);
    setPassId(pass.userId);
  };
  const handleCloseChangepassword = () => {
    setChangePassword(false);
    setPassError("");
    setCheckPassword("")


  };

  const handleCheckPassword = (e) => {
    const CheckPassword = e.target.value
    setCheckPassword(e.target.value);
    setPassError("");

    const hasUppercase = /[A-Z]/.test(CheckPassword);
    const hasNumber = /[0-9]/.test(CheckPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(CheckPassword)
    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setPassError("Password must include a capital letter, a number, and a special character.");
    } else {
      setPassError("");
    }
    dispatch({ type: "CLEAR_PASSWORD_ERROR" });
  };

  // const CheckvalidateField = (value, fieldName) => {
  //   if (!value || (typeof value === "string" && value.trim() === "")) {
  //     switch (fieldName) {
  //       case "checkPassword":
  //         setPassError("Please Enter Password");
  //         break;


  //       default:
  //         break;
  //     }
  //     return false;
  //   }
  //   return true;
  // }

  const handleCheckPasswordChange = () => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
    if (!checkPassword) {
      setPassError("Please Enter Password");
      return
    }
    if (checkPassword && checkPassword.length < 8) {
      setPassError("Password must be at least 8 characters");
      return
    }


    const hasUppercase = /[A-Z]/.test(checkPassword);
    const hasNumber = /[0-9]/.test(checkPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(checkPassword)
    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setPassError("Password must include a capital letter, a number, and a special character.");
      return
    } else {
      setPassError("");
    }

    if (checkPassword) {
      dispatch({ type: "CHECKPASSWORD", payload: { adminId: passId, password: checkPassword } });
      setVerfifyLoading(true)
    }
  }



  const handlegeneralform = (userId) => {
    setGeneralEdit((prevId) => (prevId === userId ? null : userId));
  };


  const handleDelete = (user) => {
    setDeleteId(user.userId);
    setDeleteForm(true);
  };

  const handleCloseDeleteFormShow = () => {
    setDeleteForm(false);
    setGeneralDeleteError("")
    dispatch({ type: "CLEAR_DELETE_GENERAL_ERROR" })
  }

  const handleConformDelete = () => {
    if (deleteId) {
      dispatch({ type: "GENERALDELETEGENERAL", payload: deleteId });
    }
  }


  const handleShowFormGreneral = () => {
    setShowFormGeneral(true);
    setEdit(false);
  }

  const handleClose = () => {
    setShowFormGeneral(false);
    setFirstName("");
    setLastName("");
    setEmailId("");
    setFile("");
    setProfileImage("")
    setPassword("");
    setPhone("");
    setFirstNameError("");
    setEmailError("");
    setHouseNo("");
    setStreet("");
    setLandmark("")
    setPincode("");
    setCity("");
    setStateName("")
    setHouse_NoError("")
    setStreetError("")
    setCityError("")
    setLandmarkError("")
    setPincodeError("")
    setStateNameError("")
    setPhoneError("");
    setPasswordError("");
    setFormError("");
    setEmailError("")
    setEmailErrorMessage("")
    dispatch({ type: 'CLEAR_GENERAL_EMAIL_ERROR' })
  }

  const [profileimage, setProfileImage] = useState(null)

  const handleImageChange = async (event) => {

    const fileImage = event.target.files[0];
    setProfileImage(fileImage)
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
      setFormError("");
    }
  }

  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstName(value);
    setFirstNameError("");
    setFormError("");
  }

  const handlelastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setLastName(value);

    setFormError("");
  }


  const handlePhone = (e) => {
    dispatch({ type: "CLEAR_MOBILE_ERROR" });
    const value = e.target.value;
    if (!/^\d{0,10}$/.test(value)) {
      return;
    }

    setPhone(value);

    if (value === "") {
      setPhoneError("");
      setPhoneErrorMessage("");
      dispatch({ type: "CLEAR_MOBILE_ERROR" });
      return;
    }

    const pattern = /^\d{10}$/;
    const isValidMobileNo = pattern.test(value);

    if (isValidMobileNo) {
      setPhoneError("");
    } else {
      setPhoneError("Please Enter Valid Mobile Number");
      setFormError("");
    }

    setPhoneErrorMessage("");
    dispatch({ type: "CLEAR_MOBILE_ERROR" });
  }


  const handleEmailId = (e) => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: 'CLEAR_GENERAL_EMAIL_ERROR' })
    const emailValue = e.target.value.toLowerCase();
    setEmailId(emailValue);
    setFormError("");

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);

    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Please Enter Valid Email Id");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
      setFormError("");
    }


  }



  const regex = /^[a-zA-Z0-9 .,'/#()&:-]*$/;




  const handleHouseNo = (e) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setHouseNo(value);
      setHouse_NoError("");
      setFormError("");
    } else {
      setHouse_NoError("Please Enter valid characters");
    }
  };

  const handleStreetName = (e) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setStreet(value);
      setStreetError("");
      setFormError("");
    } else {
      setStreetError("Please Enter valid characters");
    }
  };

  const handleLandmark = (e) => {
    const value = e.target.value;
    if (regex.test(value)) {
      setLandmark(value);
      setLandmarkError("");
      setFormError("");
    } else {
      setLandmarkError("Please Enter valid characters");
    }
  };




  const handlePinCodeChange = (e) => {
    const value = e.target.value;
    if (!/^\d{0,6}$/.test(value)) {
      return;
    }

    setFormError("");
    setPincode(value);
    if (value.length > 0 && value.length < 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPincodeError("");
      setFormError("");
    }


  };

  const handleCity = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
      setFormError("");
    }

  }


  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError("");




    // if (!newPassword) {
    //   setPasswordError("Please Enter Password");
    //   return;
    // }
    // if (newPassword && newPassword.length < 8) {
    //   setPasswordError("Password must be at least 8 characters long");
    //   return;
    // }
    // const hasUppercase = /[A-Z]/.test(newPassword);
    // const hasNumber = /[0-9]/.test(newPassword);
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    // if (!hasUppercase || !hasNumber || !hasSpecialChar) {
    //   setPasswordError(
    //     "Password must include a capital letter, a number, and a special character"
    //   );
    //   return;
    // }

    // If valid setPasswordError("");
    setFormError("");
  };


  const MobileNumber = `${Phone}`;

  const handleEditGeneralUser = (user) => {

    // const phoneNumber = String(user.mobileNo || "");
    // const countryCode = mobileNo.slice(0, mobileNo.length - 10);
    // const mobileNumber = mobileNo.slice(-10);
    setEdit(true);
    setShowFormGeneral(true);

    setFile(user.profilePic === "0" ? null : user.profilePic);
    setProfileImage(user.profilePic === "0" ? null : user.profilePic)
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setPhone(user.mobileNo);
    setCountryCode(user.countryCode);
    setEmailId(user.mailId);

    setHouseNo(user.houseNo);
    setStreet(user.street);
    setLandmark(user.landmark)
    setPincode(user.pincode);
    setCity(user.city);
    setStateName(user.state);


    setEditId(user.userId);
    // setPassword(user.password);

    // setInitialStateAssign({
    //   file: user.profilePic === "0" ? null : user.profilePic || null,
    //   firstName: user.firstName || "",
    //   lastName: user.lastName || "",
    //   Phone: user.mobileNo || "",
    //   emilId: user.mailId || "",
    //   house_no: user.houseNo || '',
    //   street: user.street || '',
    //   pincode: user.pincode || '',
    //   city: user.city || '',
    //   landmark: user.landmark || '',
    //   state: user.state || '',

    // });

    setInitialStateAssign({
      file: user.profilePic === "0" ? null : user.profilePic || null,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      Phone: user.mobileNo || "",
      emilId: user.mailId || "",
      house_no: user.houseNo || "",
      street: user.street || "",
      pincode: user.pincode || "",
      city: user.city || "",
      landmark: user.landmark || "",
      state: user.state || "",
      countryCode: user.countryCode || ""
    });

  };

  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "firstName":
          setFirstNameError("Please Enter First Name");
          break;
        case "emilId":
          setEmailError("Please Enter Email Id ");
          break;
        case "Phone":
          setPhoneError("Please Enter Phone Number");
          break;

        case "password":
          setPasswordError("Please Enter Password");
          break;

        case "City":
          setCityError("Please Enter City");
          break;
        case "Pincode":
          setPincodeError("Please Enter Pincode");
          break;
        case "state_name":
          setStateNameError("Please Select State");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  };

  const [initialStateAssign, setInitialStateAssign] = useState({
    firstName: "",
    lastName: "",
    Phone: "",
    emilId: "",
    address: "",
    house_no: '',
    street: '',
    city: '',
    pincode: '',
    landmark: '',
    state: '',
    countryCode: "",
    file: null,
  });


  function isValidEmail(email) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  }





  const handleSave = () => {

    dispatch({ type: 'CLEAR_GENERAL_EMAIL_ERROR' })
    dispatch({ type: 'CLEAR_MOBILE_ERROR' })

    let hasError = false;
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
    const normalize = (v) => (v ?? "");


    const validations = [
      validateField(firstName, "firstName"),
      validateField(emilId, "emilId"),
      validateField(Phone, "Phone"),
      !edit ? validateField(password, "password") : true,
      validateField(city, "City"),
      validateField(pincode, "Pincode"),
      validateField(state_name, "state_name"),
    ];


    if (!Phone) {
      setPhoneError("Please Enter Mobile Number");
      hasError = true;
    } else if (!/^(?!0{10})[1-9][0-9]{9}$/.test(Phone)) {
      setPhoneError("Please Enter Valid Mobile Number");
      hasError = true;
    } else {
      setPhoneError("");
    }


    if (!edit) {
      if (!password) {
        setPasswordError("Please Enter Password");
        hasError = true;
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters long");
        hasError = true;
      }

      if (password) {
        const hasUppercase = /[A-Z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!hasUppercase || !hasNumber || !hasSpecialChar) {
          setPasswordError(
            "Password must include a capital letter, a number, and a special character"
          );
          hasError = true;
        }
      }
    }



    if (!pincode) {
      setPincodeError("Please Enter Pincode");
      hasError = true;
    }
    else if (!/^\d{6}$/.test(pincode)) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
      hasError = true;
    }
    else if (pincode === "000000") {
      setPincodeError("Pin Code cannot be all zeros");
      hasError = true;
    }
    else if (pincode[0] === "0") {
      setPincodeError("Pin Code cannot start with 0");
      hasError = true;
    }
    else if (pincode && String(pincode).slice(-3) === "000") {
      setPincodeError("Last 3 digits cannot be 000");
      hasError = true;
    }
    else {
      setPincodeError("");
    }



    if (emilId) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      if (!emailRegex.test(emilId.toLowerCase())) {
        setEmailError("Please Enter Valid Email Id"); hasError = true;
      } else setEmailError("");
    }





    if (hasError || validations.includes(false) || !isValidEmail(emilId)) {
      return;
    }





    const AddPayload = {
      accountInfo: {
        firstName: firstName,
        lastName: lastName,
        mobile: normalizedPhoneNumber,
        mailId: emilId,
        houseNo: house_no,
        street: street,
        landmark: landmark,
        city: city,
        pincode: pincode,
        state: state_name,
        password: password
      },
      profilePic: profileimage,
    };

    const isFile = v => v instanceof File || v instanceof Blob;

    const payloadForApi = {
      adminId: editId,
      payload: {
        firstName,
        lastName,
        mobile: normalizedPhoneNumber,
        mailId: emilId,
        houseNo: house_no,
        street,
        landmark,
        city,
        pincode: Number(pincode),
        state: state_name
      },

      profilePic: isFile(profileimage) ? profileimage : null
    };






    if (edit && editId) {

      const isChanged =
        normalize(firstName) !== normalize(initialStateAssign.firstName) ||
        normalize(lastName) !== normalize(initialStateAssign.lastName) ||
        normalize(emilId) !== normalize(initialStateAssign.emilId) ||
        normalize(house_no) !== normalize(initialStateAssign.house_no) ||
        normalize(street) !== normalize(initialStateAssign.street) ||
        normalize(landmark) !== normalize(initialStateAssign.landmark) ||
        normalize(city) !== normalize(initialStateAssign.city) ||
        Number(pincode) !== Number(initialStateAssign.pincode ?? "") ||
        normalize(state_name) !== normalize(initialStateAssign.state) ||
        String(Phone).replace(/\s+/g, "") !== String(initialStateAssign.Phone ?? "").replace(/\s+/g, "") ||
        // check profile pic safely
        (profileimage && profileimage !== initialStateAssign.file);





      if (!isChanged) {

        setFormError("No Changes Detected");
        return
      }

      // dispatch({
      //   type: "EDITGENERALSETTING",
      //     adminId: editId, 
      //     payload: {
      //      EditPayload,
      //     profilePic: profileimage
      //   }
      // })
      if (isChanged) {

        dispatch({ type: "EDITGENERALSETTING", payload: payloadForApi });
      }



      setFormError("");

    }

    if (!edit) {
      dispatch({ type: "ADDGENERALSETTING", payload: AddPayload });
    }
    setFormLoading(true)
  };


  useEffect(() => {
    if (state.Settings.notmatchpass) {
      setVerfifyLoading(false)
      setPassError(state.Settings.notmatchpass);
    }
  }, [state.Settings.notmatchpass]);

  useEffect(() => {
    if (state.Settings.generalDeleteError) {
      setGeneralDeleteError(state.Settings.generalDeleteError);
    }
  }, [state.Settings.generalDeleteError]);

  useEffect(() => {
    setLoading(true)

    dispatch({ type: "GETALLGENERAL" });
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [state.login.selectedHostel_Id]);



  useEffect(() => {
    if (state.Settings.statusCodeForCheckPassword === 200) {
      setVerfifyLoading(false)
      handleCloseChangepassword();
      // handleConfirmPass();
      setTimeout(() => {
        dispatch({ type: "CLEAR_GENERAL_PASSWORD_CHECK" });
      }, 200);
    }
  }, [state.Settings.statusCodeForCheckPassword]);



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setGeneralEdit(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.Settings?.generalEmailError) {
      setFormLoading(false)
    }
  }, [state.Settings?.generalEmailError]);

  useEffect(() => {
    if (state.Settings?.generalMobileError) {
      setFormLoading(false)
    }
  }, [state.Settings?.generalMobileError]);


  useEffect(() => {
    if (state.Settings?.StatusCodeForSettingGeneral === 201) {
      setFormLoading(false)
      handleClose();
      dispatch({ type: "GETALLGENERAL" });
      // dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTING_GENERAL_ADD" });
      }, 200);
    }
  }, [state.Settings?.StatusCodeForSettingGeneral]);

  useEffect(() => {
    if (state.Settings?.EditStatusCodeForSettingGeneral === 200) {
      setFormLoading(false)
      handleClose();
      dispatch({ type: "GETALLGENERAL" });
      // dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTING_EDIT_GENERAL" });
      }, 200);
    }
  }, [state.Settings?.EditStatusCodeForSettingGeneral]);




  useEffect(() => {
    if (state.Settings?.statusCodeForGeneralDelete === 200) {
      handleCloseDeleteFormShow();
      dispatch({ type: "GETALLGENERAL" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_GENERAL" });
      }, 200);
    }
  }, [state.Settings?.statusCodeForGeneralDelete]);


  // const [generalrowsPerPage, setGeneralrowsPerPage] = useState(2);
  // const [generalcurrentPage, setGeneralcurrentPage] = useState(1);


  // const indexOfLastRowGeneral = generalcurrentPage * generalrowsPerPage;
  // const indexOfFirstRowGeneral = indexOfLastRowGeneral - generalrowsPerPage;
  // const currentRowGeneral = generalFilterddata?.slice(
  //   indexOfFirstRowGeneral,
  //   indexOfLastRowGeneral
  // );

  // const handlePageChange = (generalpageNumber) => {
  //   setGeneralcurrentPage(generalpageNumber);
  // };

  // const handleItemsPerPageChange = (selectedOption) => {
  //   setGeneralrowsPerPage(selectedOption.value);
  //   setGeneralcurrentPage(1);
  // };



  // const totalPagesGeneral = Math.ceil(
  //   generalFilterddata?.length / generalrowsPerPage
  // );



  useEffect(() => {
    if (state.Settings?.StatusCodeforGetGeneral === 200 || state.Settings?.StatusCodeforGetGeneral === 201) {
      setGeneralFilterddata(state.Settings?.settingGetGeneralData || []);
      setLoading(false)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_ALL_GENERAL' })
      }, 1000)

    }
  }, [state.Settings?.StatusCodeforGetGeneral]);




  const ConformvalidateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "newPassword":
          setNewPassError("Please Enter New Password");
          break;
        case "confirmPassword":
          setConformPasswordError("Please Enter Confirm Password");
          break;

        default:
          break;
      }
      return false;
    }
    return true;
  };

  const handleSavePassword = () => {

    dispatch({ type: 'CLEAR_CONFORM_PASSWORD_MATCHES' })
    if (!ConformvalidateField(newPassword, "newPassword"));
    if (!ConformvalidateField(confirmPassword, "confirmPassword"));

    const hasUppercase = /[A-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setNewPassError("Password must include a capital letter, a number, and a special character.");
      return
    } else {
      setNewPassError("");
    }


    const hasUpperCase = /[A-Z]/.test(confirmPassword);
    const hAsNumber = /[0-9]/.test(confirmPassword);
    const hasSpecialCHar = /[!@#$%^&*(),.?":{}|<>]/.test(confirmPassword);

    if (!hasUpperCase || !hAsNumber || !hasSpecialCHar) {
      setConformPasswordError("Password must include a capital letter, a number, and a special character.");
      return
    } else {
      setConformPasswordError("");
    }



    if (newPassword && confirmPassword) {
      dispatch({
        type: "GENERALPASSWORDCHANGES",
        payload: { id: passId, new_pass: newPassword, cn_pass: confirmPassword },
      });
      setChangeLoading(true)
    }

  }

  useEffect(() => {
    if (state.Settings.conformPassNotmatch) {
      setChangeLoading(false)
      setConformPasswordError(state.Settings.conformPassNotmatch);
    }
  }, [state.Settings.conformPassNotmatch]);

  useEffect(() => {
    if (state.Settings.StatusCodeforGeneralPassword === 200) {
      setChangeLoading(false)
      handleCloseConfirmPass();
      setTimeout(() => {
        dispatch({ type: "CLEAR_GENERAL_PASSWORD_CHANGES" });
      }, 200);
    }
  }, [state.Settings.StatusCodeforGeneralPassword]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  const account = state.createAccount?.accountList


  const [openMenu, setOpenMenu] = React.useState(false);
  const menuRef = React.useRef(null);


  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [logoutformshow, setLogoutformshow] = useState(false);

  const handleShowLogout = () => {
    setLogoutformshow(true);
  };

  const handleCloseLogout = () => {
    setLogoutformshow(false);
  };






  return (
    <>
      {
        logoutformshow && <Logout show={logoutformshow} handleClose={handleCloseLogout} />
      }
      <div

        className="d-flex flex-column flex-md-row justify-content-between align-items-center"


        style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          minHeight: 50,
          whiteSpace: "nowrap",
          paddingRight: 5,
          paddingLeft: 5,


        }}
      >

        <div className="w-100 d-flex justify-content-center justify-content-md-start mt-0">
          <div>
            <label
              style={{
                fontSize: 20,
                color: "#000000",
                fontWeight: 600,
                fontFamily: "Gilroy",
                whiteSpace: "nowrap",

              }}
            >
              General Settings
            </label>
          </div>
        </div>
        <div
          className="d-flex justify-content-center justify-content-md-end w-100 mt-0 mt-md-0"

        >

          <div
          >
            <Button
              disabled={!canWriteProfile}
              style={{
                fontFamily: "Gilroy",
                fontSize: "14px",
                backgroundColor: "#1E45E1",
                color: "white",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "11px",
                height: 45,
                width: 146,
                whiteSpace: "nowrap",
                marginTop: 0

              }}

              onClick={handleShowFormGreneral}
            >
              + Create Master
            </Button>
          </div>
        </div>
      </div>

      <div className="container  mt-0 p-0" style={{
        position: "relative",
        height:"100vh", overflowY:"hidden",
        // overflowY: "auto",
        // maxHeight: 500,
        // minHeight: 500, 
        fontFamily: "Gilroy"
      }}>

        {loading &&
          <div
            style={{
              position: 'fixed',
              top: '48%',
              left: '68%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              zIndex: 1050,
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


        {
          !canReadProfile ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100
              }}
            >

              <img
                src={Emptystate}
                alt="Empty State"

              />
              <ErrorMessage message={['You do not have access to view General']} type="warning" />

            </div>
          )
            : (
              <div className="mt-2" style={{position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          }}>
                {account && (
                  <Card
                    style={{
                      
                      borderRadius: 12,
                      border: "1px solid #DCDCDC",
                      padding: 16,
                      fontFamily: "Gilroy, sans-serif"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        gap: 15
                      }}
                    >
                      {/* LEFT */}
                      <div >
                        {
                          account?.profilePic ? (
                            <img
                              src={account.profilePic}
                              alt="profile"
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                objectFit: "cover"
                              }}
                            />
                          ) : (
                            <div
                              style={{
                                width: 56,
                                height: 56,
                                borderRadius: "50%",
                                backgroundColor: "#E2E8F0",
                                color: "#44536A",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 600,
                                fontSize: 18,
                                fontFamily: "Gilroy, sans-serif",
                                textTransform: "uppercase"
                              }}
                            >
                              {account?.initial}
                            </div>
                          )
                        }
                      </div>
                      <div style={{ width: "100%" }}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div

                          >
                            <span
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                color: "#222222", textTransform: "capitalize"
                              }}
                            >
                              {account.firstName}  {account.lastName}
                            </span>


                          </div>
                          <div style={{ position: "relative" }}>
                            <div
                              onClick={() => setOpenMenu(!openMenu)}
                              style={{
                                cursor: "pointer",
                                height: 40,
                                width: 40,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: openMenu ? "#E7F1FF" : "transparent"
                              }}
                            >
                              <PiDotsThreeOutlineVerticalFill
                                style={{ height: 20, width: 20, cursor:"not-allowed" }}
                              />
                              {/* {openMenu && (
                                <div
                                  ref={menuRef}
                                  style={{
                                    position: "absolute",
                                    top: 45,
                                    right: 0,
                                    width: 180,
                                    backgroundColor: "#FFFFFF",
                                    border: "1px solid #EBEBEB",
                                    borderRadius: 10,
                                    boxShadow: "0px 8px 20px rgba(0,0,0,0.08)",
                                    zIndex: 1000
                                  }}
                                >
                                 
                                  <div
                                    onClick={() => {
                                      setOpenMenu(false);
                                     
                                    }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      padding: "8px 12px",
                                      width: "100%",
                                      backgroundColor: "#F9F9F9",
                                      borderTopLeftRadius: 10,
                                      borderTopRightRadius: 10,
                                      cursor: canUpdateProfile ? "pointer" : "not-allowed",
                                      opacity: canUpdateProfile ? 1 : 0.5,
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.backgroundColor = "#EDF2FF")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.backgroundColor = "#FFFFFF")
                                    }
                                  >
                                    <Edit
                                      size="16"
                                      color="#1E45E1"
                                    />  <label style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy, sans-serif",
                                      color: canUpdateProfile ? "#000000" : "#999999",
                                      cursor: canUpdateProfile ? "pointer" : "not-allowed",
                                    }}>Edit</label>
                                  </div>

                                  <div
                                    onClick={() => {
                                      setOpenMenu(false);
                                                                         }}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      padding: "8px 12px",
                                      width: "100%",
                                      backgroundColor: "#F9F9F9",
                                      borderBottomLeftRadius: 10,
                                      borderBottomRightRadius: 10,
                                      cursor: canUpdateProfile ? "pointer" : "not-allowed",
                                      opacity: canUpdateProfile ? 1 : 0.5,
                                    }}
                                    onMouseEnter={(e) =>
                                      (e.currentTarget.style.backgroundColor = "#EDF2FF")
                                    }
                                    onMouseLeave={(e) =>
                                      (e.currentTarget.style.backgroundColor = "#FFFFFF")
                                    }
                                  >
                                    <PasswordCheck
                                      size="16"
                                      color="#FF9500"
                                    />  <label style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy, sans-serif",
                                      color: canUpdateProfile ? "#000000" : "#999999",
                                      cursor: canUpdateProfile ? "pointer" : "not-allowed",
                                    }}>Change Password</label>
                                  </div>
                                </div>
                              )} */}
                            </div>
                          </div>

                        </div>



                        <div className="d-flex justify-content-between align-items-center">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                              fontSize: 12,
                              color: "#FF9900",
                              backgroundColor: "#FFFAF1",
                              padding: "2px 8px",
                              borderRadius: 20, width: "fit-content", fontFamily: "Gilroy"
                            }}
                          >

                            {account.roleName} <Crown1 size={14} color="#FF9900" />
                          </div>
                          <div>
                            <label style={{ color: "#9C9C9C", fontSize: 14, fontWeight: 400 }}>Profile last updated - 20/11/25</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr className="m-2" style={{ border: "1px solid #E8E8E8" }} />
                    <div className="d-flex justify-content-between">
                      <div
                        style={{
                          display: "flex",
                          gap: 16,
                          marginTop: 8
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13,
                            color: "#555"
                          }}
                        >
                          <Call size={14} color="#1E45E1" />
                          + {account.countryCode} {account.mobileNo}
                        </div>
                        <div
                          style={{
                            width: 1,
                            height: 28,
                            border: "1px solid #D9D9D9"
                          }}
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            fontSize: 13,
                            color: "#1E45E1"
                          }}
                        >
                          <Sms size={14} color="#1E45E1" />
                          {account.mailId}
                          <span>
                            <CardSend
                              size="16"
                              color="#292D32"
                            /></span>
                        </div>
                      </div>

                      <button
                        style={{
                          marginTop: 8,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: "#FF0000",
                          background: "#FFF7F7",
                          border: "1px solid #FFDADA",
                          borderRadius: 8,
                          padding: "6px 12px",
                          cursor: "pointer"
                        }}
                        onClick={handleShowLogout}
                      >
                        <LogoutCurve size={16} color="#FF0000" />
                        Logout
                      </button>

                    </div>

                  </Card>

                )}

                <div 
                  style={{
                    display: "flex",
                    borderBottom: "1px solid #E5E7EB",
                    gap: 32,
                    fontFamily: "Gilroy, sans-serif",
                    position:"sticky"
                  }}
                >
                  {tabs.map(tab => (
                    <div
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      style={{
                        padding: "14px 4px",
                        fontSize: 15,
                        fontWeight: activeTab === tab.key ? 600 : 500,
                        color: activeTab === tab.key ? "#1E45E1" : "#6B7280",
                        cursor: "pointer",
                        position: "relative"
                      }}
                    >
                      {tab.label}

                      {activeTab === tab.key && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: -1,
                            left: 0,
                            width: "100%",
                            height: 2,
                            backgroundColor: "#1E45E1",
                            borderRadius: 2
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {
                  activeTab === "masters" && (
                    <div className="show-scrolls" style={{ overflowY: "auto",
        maxHeight:500,}}>
                      {generalFilterddata && generalFilterddata.length > 0 ? (
                        generalFilterddata.map((item) => {
                          const imageUrl = item.profilePic;
                          return (


                            <div
                              className="card p-3  mt-2 "
                              style={{
                                borderRadius: 16,
                               
                                // overflow: 'hidden'
                              }}
                              key={item.userId}
                            >
                              <div

                                className="d-flex flex-wrap justify-content-between align-items-center w-100"
                              >
                                <div className="d-flex align-items-center w-100">
                                  {
                                    imageUrl ?

                                      <Image
                                        src={imageUrl}
                                        alt={item.firstName || "Default Profile"}
                                        roundedCircle
                                        style={{
                                          height: "50px",
                                          width: "50px",
                                        }}

                                      />
                                      :

                                      <div
                                        style={{
                                          height: 40,
                                          width: 40,
                                          borderRadius: "50%",
                                          backgroundColor: "#E2E8F0",
                                          color: "#44536A",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          fontWeight: 600,
                                          fontSize: 14,
                                          textTransform: "uppercase",
                                        }}
                                      >
                                        {item.initials}
                                      </div>

                                  }
                                  <div className="ms-2 w-100">
                                    <div className="d-flex justify-content-between align-items-center w-100" >
                                      <div
                                        className="mb-0 text-break"
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          height: "fit-content"
                                        }}
                                      >
                                        {item.firstName} {item.lastName}
                                      </div>


                                      <div className="ms-2 me-2 mt-0" style={{
                                        cursor: "pointer", height: 40, width: 40, borderRadius: 100,
                                        // border: "1px solid #EFEFEF",
                                        display: "flex", justifyContent: "center", alignItems: "center",
                                        position: "relative", zIndex: generalEdit ? 1000 : 'auto'
                                        ,
                                        // backgroundColor: generalEdit === item.userId ? "#E7F1FF" : "transparent",


                                      }} onClick={() => handlegeneralform(item.userId)} >
                                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                                        {generalEdit === item.userId && (
                                          <div
                                            ref={popupRef}
                                            style={{
                                              cursor: "pointer",
                                              backgroundColor: "#F9F9F9",
                                              position: "absolute",
                                              right: window.innerWidth <= 404 ? "auto" : 40,
                                              top: 40,
                                              width: window.innerWidth <= 404 ? 100 : 120,
                                              height: "auto",
                                              border: "1px solid #EBEBEB",
                                              borderRadius: 10,
                                              display: "flex",
                                              flexDirection: "column",
                                              padding: 0,
                                              alignItems: "flex-start",
                                              zIndex: 1050,
                                              fontSize: window.innerWidth <= 404 ? 13 : 14,
                                            }}
                                          >
                                            <div
                                              style={{
                                                width: "100%",
                                                backgroundColor: "#F9F9F9",
                                                borderRadius: 10,
                                              }}
                                            >

                                              <div
                                                onClick={() => canUpdateProfile && handleEditGeneralUser(item)}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDF2FF")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: "10px",
                                                  padding: "8px 12px",
                                                  width: "100%",
                                                  backgroundColor: "#F9F9F9",
                                                  borderTopLeftRadius: 10,
                                                  borderTopRightRadius: 10,
                                                  cursor: canUpdateProfile ? "pointer" : "not-allowed",
                                                  opacity: canUpdateProfile ? 1 : 0.5,
                                                }}
                                              >
                                                <Edit
                                                  size="16"
                                                  color="#1E45E1"
                                                  style={{ height: 16, width: 16, filter: canUpdateProfile ? "none" : "grayscale(100%) brightness(70%)", }} />
                                                <label
                                                  style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy, sans-serif",
                                                    color: canUpdateProfile ? "#000000" : "#999999",
                                                    cursor: canUpdateProfile ? "pointer" : "not-allowed",
                                                  }}
                                                >
                                                  Edit
                                                </label>
                                              </div>

                                              <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px" }} />


                                              <div
                                                onClick={() => canDeleteProfile && handleDelete(item)}
                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF0F0")}
                                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                                                style={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: "10px",
                                                  padding: "8px 12px",
                                                  width: "100%",
                                                  backgroundColor: "#F9F9F9",
                                                  borderBottomLeftRadius: 10,
                                                  borderBottomRightRadius: 10,
                                                  cursor: canDeleteProfile ? "pointer" : "not-allowed",
                                                  opacity: canDeleteProfile ? 1 : 0.5,
                                                }}
                                              >
                                                <img src={Delete} alt="Delete" style={{ height: 16, width: 16, filter: canDeleteProfile ? "none" : "grayscale(100%) brightness(70%)", }} />
                                                <label
                                                  style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy, sans-serif",
                                                    color: canDeleteProfile ? "#FF0000" : "#999999",
                                                    cursor: canDeleteProfile ? "pointer" : "not-allowed",
                                                  }}
                                                >
                                                  Delete
                                                </label>
                                              </div>
                                            </div>
                                          </div>

                                        )}
                                      </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 4,
                                          fontSize: 12,
                                          color: "#3A90E5",
                                          backgroundColor: "#F0F7FF",
                                          padding: "2px 8px",
                                          borderRadius: 20, width: "fit-content", fontFamily: "Gilroy"
                                        }}
                                      >

                                        {item.roleName} <Shield size={14} color="#3A90E5" />
                                      </div>
                                      <div>
                                        <label style={{ color: "#9C9C9C", fontSize: 14, fontWeight: 400, fontFamily: "Gilroy" }}>Profile last updated - 20/11/25</label>
                                      </div>
                                    </div>
                                  </div>

                                </div>


                              </div>


                              {/* <div className="row">
                          <div className="col-md-6">
                            <p
                              className="mb-0"
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Email ID
                            </p>
                            <p
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              {item.mailId}
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p
                              className="mb-0"
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Contact Number
                            </p>
                            <p
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              + {item?.countryCode}
                              {item &&
                                String(item.mobileNo).slice(
                                  0,
                                  String(item.mobileNo).length - 10
                                )}{" "}
                              {item && String(item.mobileNo).slice(-10)}
                            </p>
                          </div>

                          <div className="col-12">
                            <p
                              className="mb-0"
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Address
                            </p>
                            <p
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              {(item?.houseNo ? item?.houseNo : '') +
                                (item.street ? ' ' + item.street : '') +
                                (item.landmark ? ', ' + item.landmark : '')}
                              <br />
                              {(item.city ? item.city + ', ' : '') +
                                (item.state ? item.state + ' ' : '-') +
                                (item.pincode ? item.pincode : '')}
                            </p>

                          </div>

                        </div> */}

                              <hr className="m-2" style={{ border: "1px solid #E8E8E8" }} />
                              <div className="d-flex justify-content-between">
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 16,
                                    marginTop: 8
                                  }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      fontSize: 13,
                                      color: "#555", fontFamily: "Gilroy"
                                    }}
                                  >
                                    <Call size={14} color="#1E45E1" />
                                    + {item.countryCode} {item.mobileNo}
                                  </div>
                                  <div
                                    style={{
                                      width: 1,
                                      height: 28,
                                      border: "1px solid #D9D9D9"
                                    }}
                                  />
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 6,
                                      fontSize: 13,
                                      color: "#1E45E1", fontFamily: "Gilroy"
                                    }}
                                  >
                                    <Sms size={14} color="#1E45E1" />
                                    {item.mailId}
                                    <span>
                                      <CardSend
                                        size="16"
                                        color="#292D32"
                                      /></span>
                                  </div>
                                </div>

                                <div className="d-flex align-items-center flex-wrap">
                                  <img src={img2} width="20" height="20" alt="icon" style={{ filter: canWriteProfile ? "none" : "grayscale(100%) brightness(70%)" }} />
                                  <p
                                    onClick={() => canWriteProfile && handleChangePassword(item)}
                                    className="mb-0 mx-2 text-wrap"
                                    style={{
                                      fontFamily: "Montserrat",
                                      fontWeight: 600,
                                      fontSize: 14,
                                      color: canWriteProfile ? "#1E45E1" : "#B0B0B0",
                                      cursor: canWriteProfile ? "pointer" : "not-allowed",
                                    }}
                                  >
                                    Change Password
                                  </p>



                                </div>

                              </div>
                            </div>

                          );
                        })
                      ) :
                        !loading && (
                          <div
                            style={{
                              textAlign: "center",
                              marginTop: 90,
                              height: '40vh',
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center"
                            }}
                          >
                            <img src={EmptyState} alt="emptystate" />
                            <div
                              className="pb-1"
                              style={{
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: 18,
                                color: "rgba(75, 75, 75, 1)",
                              }}
                            >
                              No Profile
                            </div>
                            <div
                              className="pb-1"
                              style={{
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                fontSize: 14,
                                color: "rgba(75, 75, 75, 1)",
                              }}
                            >
                              There are no Profile available.
                            </div>
                          </div>
                        )
                      }

                    </div>)}




                {
                  activeTab === "recent" && <RecentActivity />
                }


 {
                  activeTab === "users" && <ManagedUsers />
                }




              </div>
            )}

      </div>



      <Modal
        show={deleteForm}
        onHide={handleCloseDeleteFormShow}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"


      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            className="w-100 text-center mt-1"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",

              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}
          >
            Delete General?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-27px",
          }}
        >
          Are you sure you want to delete this General?
        </Modal.Body>
        {generalDeleteError && (
          <div className="d-flex justify-content-center align-items-center">
            <ErrorMessage message={generalDeleteError} type="error" />
          </div>
        )}
        <Modal.Footer
          className="d-flex justify-content-center"
          style={{
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            className="me-2"
            style={{

              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
              marginRight: 10,
            }}
            onClick={handleCloseDeleteFormShow}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleConformDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={changePassword}
        onHide={() => handleCloseChangepassword()}
        backdrop="static"
        centered
      // dialogClassName="custom-modal"

      >
        <Modal.Header style={{

          position: "relative"
        }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Change Password
          </div>

          <CloseCircle size="24" color="#000" onClick={handleCloseChangepassword}
            style={{ cursor: 'pointer' }} />

        </Modal.Header>
        <Modal.Body style={{ marginTop: '0px', paddingTop: 2 }}>

          <Form.Group className="">
            <Form.Label
              style={{
                fontSize: 14,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
                marginTop: 0,
                paddingTop: 0,
              }}
            >
              New Password {" "}
              <span style={{ color: "red", fontSize: "20px" }}> * </span>
            </Form.Label>
            <InputGroup>
              <FormControl
                id="form-controls"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={checkPassword}
                onChange={(e) => handleCheckPassword(e)}
                className="custom-input"
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
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #D9D9D9",
                  borderLeft: "none",
                  cursor: "pointer",
                  borderRadius: "0 8px 8px 0",
                }}
              >
                {showPassword ? (
                  <img src={eye} alt="Hide Password" width={20} height={20} />
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
          {passError && (
            <ErrorMessage message={passError} type="error" />
          )}


        </Modal.Body>
        {verifyLoading && <div
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
        </div>}
        <Modal.Footer className="d-flex justify-content-center m-0 pt-1" style={{ border: "none" }}>
          <Button

            className="w-100 custom-button mt-2"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: "50px",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "Montserrat, sans-serif",
              marginTop: "-5px",
            }}
            onClick={() => handleCheckPasswordChange()}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        show={confirmPass}
        onHide={() => handleCloseConfirmPass()}
        backdrop="static"
        centered

      >

        <Modal.Header style={{ marginBottom: "", position: "relative" }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Confirm Password
          </div>

          <CloseCircle size="24" color="#000" onClick={handleCloseConfirmPass}
            style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Modal.Body className="pt-2">
          <div className="col-lg-12 
           col-md-12 col-sm-12 col-xs-12"
          >

            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                New Password {" "}
                <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>
              <InputGroup>
                <FormControl
                  id="form-controls"
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => handleNewPassword(e)}
                  className="custom-input"
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
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #D9D9D9",
                    borderLeft: "none",
                    cursor: "pointer",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  {showPassword ? (
                    <img src={eye} alt="Hide Password" width={20} height={20} />
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
              {newPassError && (
                <ErrorMessage message={newPassError} type="error" />

              )}


            </Form.Group>


          </div>
          <div className="col-lg-12 
           col-md-12 col-sm-12 col-xs-12"
          >
            <Form.Group className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Confirm Password {" "}
                <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>
              <InputGroup>
                <FormControl
                  id="form-controls"
                  placeholder="Enter password"
                  type={conformShowPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPassword(e)}
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
                  onClick={() => setConFormShowPassword(!conformShowPassword)}
                  aria-label={
                    conformShowPassword ? "Hide Password" : "Show Password"
                  }
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #D9D9D9",
                    borderLeft: "none",
                    cursor: "pointer",
                    borderRadius: "0 8px 8px 0",
                  }}
                >
                  {conformShowPassword ? (
                    <img src={eye} alt="Hide Password" width={20} height={20} />
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
              {conformPasswordError && (
                <ErrorMessage message={conformPasswordError} type="error" />
              )}

            </Form.Group>




          </div>
        </Modal.Body>
        {changeLoading && <div
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
        </div>}
        <Modal.Footer className="d-flex justify-content-center " style={{ border: "done" }}>
          <Button
            className="col-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: "50px",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "Montserrat, sans-serif",

            }}
            onClick={handleSavePassword}
          >
            Save Password
          </Button>
        </Modal.Footer>

      </Modal>

      <Modal
        show={showFormGeneral}
        onHide={() => handleClose()}
        backdrop="static"
        centered
      // dialogClassName="custom-modal"
      >


        <Modal.Header style={{ marginBottom: "10px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            {edit ? "Edit General" : "Add General"}
          </div>

          <CloseCircle size="24" color="#000" onClick={handleClose}
            style={{ cursor: 'pointer' }} />

        </Modal.Header>
        <div className="d-flex align-items-center" style={{ marginLeft: 10 }}>
          <div
            className=""
            style={{ height: 80, width: 80, position: "relative" }}
          >
            <Image
              src={
                file
                  ? typeof file === "string"
                    ? file
                    : URL.createObjectURL(file)
                  : Profile
              }
              roundedCircle
              style={{ height: 80, width: 80 }}
            />

            <label htmlFor="imageInput" className="">
              <Image
                src={Plus}
                roundedCircle
                style={{
                  height: 20,
                  width: 20,
                  position: "absolute",
                  top: 65,
                  left: 70,
                  transform: "translate(-50%, -50%)",
                }}
              />
              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                id="imageInput"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="ps-3">
            <div>
              <label
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: "#222222",
                  fontFamily: "Gilroy",
                }}
              >
                Profile Photo
              </label>
            </div>
            <div>
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                }}
              >
                Max size of image 10MB
              </label>
            </div>
          </div>
        </div>
        <Modal.Body style={{ maxHeight: "300px", overflowY: "scroll" }} className="show-scroll mt-0 me-3">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
              <Form.Group>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => handleFirstName(e)}
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
              {firstNameError && (
                <ErrorMessage message={firstNameError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Last Name {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => handlelastName(e)}
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

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-0">
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
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <InputGroup className="d-flex">
                  <Form.Select
                    value={countryCode}
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
                    }}
                  >
                    <option>+{countryCode}</option>
                  </Form.Select>
                  <Form.Control
                    value={Phone}
                    onChange={handlePhone}
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    placeholder="9876543210"
                    maxLength={10}
                    style={{
                      fontSize: 14,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: Phone ? 500 : 500,
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
              {phoneErrorMessage && (
                <ErrorMessage message={phoneErrorMessage} type="error" />
              )}
              {state.Settings?.generalMobileError && (
                <ErrorMessage message={state.Settings?.generalMobileError} type="error" />
              )}

            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-0">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Email ID {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  autoComplete="off"
                  autoCorrect="off"
                  placeholder="Enter Email ID"
                  value={emilId}
                  onChange={(e) => handleEmailId(e)}
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
                <ErrorMessage message={emailError} type="error" />
              )}
              {state.Settings?.generalEmailError && (
                <ErrorMessage message={state.Settings?.generalEmailError} type="error" />
              )}

              {emailErrorMessage && (
                <ErrorMessage message={state.Settings?.generalEmailError} type="error" />
              )}
            </div>


            {!edit && (
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1 mt-0">
                <Form.Group className="">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Password {" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <InputGroup>
                    <FormControl
                      autoComplete="new-password"
                      autoCorrect="off"
                      id="form-controls"
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
                {!edit && passwordError && (
                  <ErrorMessage message={passwordError} type="error" />
                )}
              </div>
            )}

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Flat , House no , Building , Company , Apartment {" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter House No"
                  value={house_no}
                  onChange={(e) => handleHouseNo(e)}
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
              {house_noError && (
                <ErrorMessage message={house_noError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Area , Street , Sector , Village {" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Street"
                  value={street}
                  onChange={(e) => handleStreetName(e)}
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
              {streetError && (
                <ErrorMessage message={streetError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Landmark {" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="E.g , near appollo hospital"
                  value={landmark}
                  onChange={(e) => handleLandmark(e)}
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
              {landmarkError && (
                <ErrorMessage message={landmarkError} type="error" />
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
                  Pincode {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={pincode}
                  onChange={(e) => handlePinCodeChange(e)}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Pincode"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: pincode ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
                {pincodeError && (
                  <ErrorMessage message={pincodeError} type="error" />
                )}


              </Form.Group>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Town/City {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => handleCity(e)}

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
              {cityError && (
                <ErrorMessage message={cityError} type="error" />
              )}
            </div>


            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group className="" controlId="exampleForm.ControlInput5">
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
                  State {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>

                <Select
                  options={indianStates}
                  onChange={(selectedOption) => {
                    setStateName(selectedOption?.value);
                    setFormError("");
                  }}
                  value={
                    state_name ? { value: state_name, label: state_name } : null
                  }
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change") {
                      const lettersOnly = inputValue.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                      return lettersOnly;
                    }
                    return inputValue;
                  }}
                  placeholder="Select State"
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  noOptionsMessage={() => "No state available"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "50px",
                      border: "1px solid #D9D9D9",
                      borderRadius: "8px",
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: state_name ? 600 : 500,
                      boxShadow: "none",
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
                      cursor: "pointer",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      color: "#000",
                    }),
                  }}
                />
              </Form.Group>

              {!state_name && state_nameError && (
                <ErrorMessage message={state_nameError} type="error" />
              )}
            </div>




          </div>
        </Modal.Body>



        {formLoading && <div
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
        </div>}



        <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
          {formError && (
            <ErrorMessage message={formError} type="error" />
          )}

          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12 w-sm-full"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 14,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 5,
            }}
            onClick={handleSave}
          >
            {edit ? "Save changes" : "Add General"}
          </Button>
        </Modal.Footer>
      </Modal>


    </>
  );
}
export default withErrorBoundary(SettingGeneral);







