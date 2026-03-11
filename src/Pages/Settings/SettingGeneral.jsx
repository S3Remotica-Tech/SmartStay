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
import { CloseCircle, PasswordCheck } from "iconsax-react";
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
  Crown1,
  Edit, CardSend, Shield
} from "iconsax-react";
import Logout from "../../Components/Logout";
import RecentActivity from "./RecentActivity";
import ManagedUsers from "./ManagedUsers";
import AdminChangePassword from "./AdminChangePassword";
import AdminProfileEdit from "./AdminProfileEdit";

function SettingGeneral() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [formLoading, setFormLoading] = useState(false)
  const [verifyLoading, setVerfifyLoading] = useState(false)
  const [changeLoading, setChangeLoading] = useState(false)

  const [showFormGeneral, setShowFormGeneral] = useState(false);
  const [showOpenAdminProfile, setShowOpenAdminProfile] = useState(false);
  const [showOpenAdminProfileEdit, setShowOpenAdminProfileEdit] = useState(false);
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


const firstNameRef = useRef(null);
const emailRef = useRef(null);
const phoneRef = useRef(null);
const passwordRef = useRef(null);
const cityRef = useRef(null);
const pincodeRef = useRef(null);
const stateRef = useRef(null);


  useEffect(() => {
    if (!canReadProfile) {
      setLoading(false);
    }
  }, [canReadProfile]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])



  const indianStates = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
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
      setFormLoading(true)
    }
    
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





  useEffect(() => {
    if (state.Settings?.StatusCodeforGetGeneral === 200 || state.Settings?.StatusCodeforGetGeneral === 201 || state.Settings?.StatusCodeforGetGeneral === 204) {
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

  const handleOpenAdminProfile = () => {
    setShowOpenAdminProfile(true)
  }

  const handleCloseAdminProfile = () => {
    setShowOpenAdminProfile(false)
  }

  const handleAdminEdit = () => {
    setShowOpenAdminProfileEdit(true)
  }

  const handleCloseAdminEdit = () => {
    setShowOpenAdminProfileEdit(false)
  }

  return (
    <>
      {
        logoutformshow && <Logout show={logoutformshow} handleClose={handleCloseLogout} />
      }


      {
        showOpenAdminProfile && <AdminChangePassword show={showOpenAdminProfile} handleClose={handleCloseAdminProfile} />
      }

      {
        showOpenAdminProfileEdit && <AdminProfileEdit show={showOpenAdminProfileEdit} handleClose={handleCloseAdminEdit} />
      }

      {loading && (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center z-[1050] bg-transparent">
          <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div>

        <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap font-gilroy">

          <div className="w-full flex justify-center md:justify-start mt-0">
            <label className="text-black font-semibold text-lg font-gilroy whitespace-nowrap">
              General Settings
            </label>
          </div>


          <div className="w-full flex justify-center md:justify-end mt-0">
            <button
              disabled={!canWriteProfile}
              onClick={handleShowFormGreneral}
              className={`bg-blue-700 text-white font-semibold text-sm rounded-lg px-4 py-2 h-[45px] w-[146px] whitespace-nowrap font-gilroy transition ${canWriteProfile
                ? "hover:bg-blue-800"
                : "cursor-not-allowed opacity-50"
                }`}
            >
              + Create Master
            </button>
          </div>
        </div>

        <div className="relative overflow-y-auto mt-0 p-0 font-gilroy" style={{ height: "calc(100vh - 70px)" }}>

          {
            !canReadProfile ? (
              <div className="flex flex-col items-center justify-center mt-24">

                <img
                  src={Emptystate}
                  alt="Empty State"

                />
                <ErrorMessage message={['You do not have access to view General']} type="warning" />

              </div>
            )
              : (
                <div className="sticky top-0 bg-white z-[900] mt-2">
                  {account.roleId === 1 && (
                   <div className="bg-white rounded-lg border border-gray-300 p-4 font-gilroy">
                      <div className="flex w-full gap-4">
                        <div >
                          {
                            account?.profilePic ? (
                              <img
                                src={account.profilePic}
                                alt="profile"
                                className="w-14 h-14 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-semibold text-lg font-gilroy uppercase"
                              >
                                {account?.initial}
                              </div>
                            )
                          }
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">

                            <div className="w-full">
                              <span
                                className="text-lg font-semibold text-gray-900 capitalize block truncate"
                                title={`${account.firstName} ${account.lastName}`}
                              >
                                {account.firstName} {account.lastName}
                              </span>
                            </div>

                            <div class="relative">
                              <div
                                onClick={() => setOpenMenu(!openMenu)}
                                className={`h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${openMenu ? "bg-[#E7F1FF]" : "bg-transparent"
                                  }`}
                              >
                                <PiDotsThreeOutlineVerticalFill className="h-5 w-5 cursor-pointer" />
                                {openMenu && (
                                  <div
                                    ref={menuRef}
                                    className="absolute top-11 right-0 w-44 bg-white border border-gray-200 rounded-lg shadow-md z-50"
                                  >

                                    <div
                                      onClick={() => { handleAdminEdit() }}
                                      className={`flex items-center gap-2 p-2.5 w-full bg-gray-100 rounded-t-lg 
              ${canUpdateProfile ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
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
                                      />
                                      <label className={`text-sm font-medium font-gilroy ${canUpdateProfile ? "text-black cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                        }`}>Edit</label>
                                    </div>

                                    <div
                                      onClick={() => {
                                        handleOpenAdminProfile(account)
                                      }}
                                      className={`flex items-center gap-2 p-2.5 w-full bg-gray-100 rounded-t-lg 
              ${canUpdateProfile ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
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
                                      />
                                      <label className={`text-sm font-medium font-gilroy ${canUpdateProfile ? "text-black cursor-pointer" : "text-gray-400 cursor-not-allowed"
                                        }`}>Change Password</label>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                          </div>




                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5 text-xs text-yellow-500 bg-yellow-50 px-2 py-0.5 rounded-full font-gilroy w-max">
                              {account?.roleName} <Crown1 size={14} color="#FF9900" />
                            </div>

                            <div>
                              <label className="text-gray-400 text-sm font-normal font-gilroy">
                                {account?.lastUpdated}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-2 border border-gray-200" />

                      <div className="flex justify-between mt-2">
                        <div className="flex gap-4 mt-2">
                          <div className="flex items-center gap-1.5 text-sm text-gray-600">
                            <Call size={14} color="#1E45E1" />
                            + {account.countryCode} {account.mobileNo}
                          </div>

                          <div className="w-px h-7 bg-gray-300" />
                          <div className="flex items-center gap-1.5 text-sm text-blue-600">
                            <Sms size={14} color="#1E45E1" />
                            {account.mailId}
                            <span>
                              <CardSend size={16} color="#292D32" />
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={handleShowLogout}
                          className="mt-2 inline-flex items-center gap-1 text-sm !text-[#FF0000] font-semibold bg-red-50 !border !border-red-200 rounded-md px-2.5 py-1.5 cursor-pointer"
                        >
                          <LogoutCurve size={16} color="#FF0000" />
                          Logout
                        </button>
                      </div>

                    </div>

                  )}

                  <div className="flex border-b border-gray-200 h-fit gap-8 font-gilroy">
                    {tabs.map((tab) => (
                      <div
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`relative px-1 py-3 text-sm cursor-pointer ${activeTab === tab.key ? "font-semibold text-[#1E45E1" : "font-medium text-gray-500"
                          }`}
                      >
                        {tab.label}

                        {activeTab === tab.key && (
                          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1E45E1] rounded"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  {
                    activeTab === "masters" && (
                      <div className="overflow-y-auto flex-1 max-h-[calc(100vh-200px)] p-2">
                        {generalFilterddata && generalFilterddata.length > 0 ? (
                          generalFilterddata.map((item) => {
                            const imageUrl = item.profilePic;
                            return (


                              <div
                                className="bg-white rounded-xl p-3 mt-2 border border-gray-200"
                                key={item.userId}
                              >
                                <div className="flex flex-wrap justify-between items-center w-full">
                                  <div className="flex items-center w-100">
                                    {
                                      imageUrl ? (
                                        <img
                                          src={imageUrl}
                                          alt={item.firstName || "Default Profile"}
                                          className="h-12 w-12 rounded-full object-cover"
                                        />
                                      ) : (
                                        <div className="h-12 w-12 rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center font-semibold text-base uppercase">
                                          {item.initials}
                                        </div>
                                      )
                                    }
                                    <div className="ml-2 w-100">
                                      <div className="flex justify-between items-center w-full">

                                        <div
                                          className="mb-0 text-base font-semibold font-gilroy h-fit truncate ml-1"
                                          title={`${item.firstName} ${item.lastName}`}
                                        >
                                          {item.firstName} {item.lastName}
                                        </div>

                                        <div
                                          className={`ms-2 me-2 mt-0 flex justify-center items-center rounded-full h-10 w-10 relative cursor-pointer ${generalEdit === item.userId ? 'z-[1000]' : ''
                                            }`}
                                          onClick={() => handlegeneralform(item.userId)}
                                        >
                                          <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />

                                          {generalEdit === item.userId && (
                                            <div
                                              ref={popupRef}
                                              className={`absolute top-10 ${window.innerWidth <= 404 ? 'right-auto w-24 text-[13px]' : 'right-10 w-32 text-[14px]'
                                                } flex flex-col items-start bg-[#F9F9F9] border border-[#EBEBEB] rounded-lg p-0 z-[1050]`}
                                            >

                                              <div className="w-full rounded-lg bg-[#F9F9F9]">

                                                <div
                                                  onClick={() => canUpdateProfile && handleEditGeneralUser(item)}
                                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EDF2FF')}
                                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F9F9F9')}
                                                  className={`flex items-center gap-2.5 px-3 py-2 w-full rounded-t-lg ${canUpdateProfile ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50'
                                                    }`}
                                                >
                                                  <Edit
                                                    size={16}
                                                    color="#1E45E1"
                                                    className={canUpdateProfile ? '' : 'filter grayscale brightness-[70%]'}
                                                  />
                                                  <label
                                                    className={`text-[14px] font-medium font-gilroy ${canUpdateProfile ? 'text-black cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                                                      }`}
                                                  >
                                                    Edit
                                                  </label>
                                                </div>

                                                <div className="h-px bg-[#F0F0F0] m-0" />

                                                <div
                                                  onClick={() => canDeleteProfile && handleDelete(item)}
                                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF0F0')}
                                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F9F9F9')}
                                                  className={`flex items-center gap-2.5 px-3 py-2 w-full rounded-b-lg ${canDeleteProfile ? 'cursor-pointer opacity-100' : 'cursor-not-allowed opacity-50'
                                                    }`}
                                                >
                                                  <img
                                                    src={Delete}
                                                    alt="Delete"
                                                    className={canDeleteProfile ? '' : 'filter grayscale brightness-[70%]'}
                                                    style={{ height: 16, width: 16 }}
                                                  />
                                                  <label
                                                    className={`text-[14px] font-medium font-gilroy ${canDeleteProfile ? 'text-red-600 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                                                      }`}
                                                  >
                                                    Delete
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </div>


                                      <div className="flex justify-between items-center w-full">

                                        <div className="flex items-center gap-1 text-sm text-[#3A90E5] bg-[#F0F7FF] px-2 py-1 rounded-full font-gilroy w-fit">
                                          {item.roleName} <Shield size={14} color="#3A90E5" />
                                        </div>

                                        <div>
                                          <label className="text-gray-400 text-sm font-normal font-gilroy">
                                            Profile last updated - 20/11/25
                                          </label>
                                        </div>
                                      </div>
                                    </div>

                                  </div>


                                </div>

                                <hr className="my-2 border border-gray-200" />

                                <div className="flex justify-between w-full">
                                  <div className="flex gap-4 mt-2">
                                    <div className="flex items-center gap-1.5 text-sm text-gray-600 font-gilroy">
                                      <Call size={14} color="#1E45E1" />
                                      +{item.countryCode} {item.mobileNo}
                                    </div>

                                    <div className="w-px h-7 border border-gray-300" />

                                    <div className="flex items-center gap-1.5 text-sm text-blue-700 font-gilroy">
                                      <Sms size={14} color="#1E45E1" />
                                      {item.mailId}
                                      <span>
                                        <CardSend size={16} color="#292D32" />
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center flex-wrap">
                                    <img
                                      src={img2}
                                      width={20}
                                      height={20}
                                      alt="icon"
                                      className={canWriteProfile ? '' : 'filter grayscale brightness-[70%]'}
                                    />
                                    <p
                                      onClick={() => canWriteProfile && handleChangePassword(item)}
                                      className={`mb-0 mx-2 text-sm font-semibold font-montserrat ${canWriteProfile ? 'text-blue-700 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                                        }`}
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

                            <div className="flex flex-col items-center text-center animated-text">
                              <img src={EmptyState} alt="emptystate" />

                              <div className="pb-1 font-gilroy font-semibold text-lg text-gray-600">
                                No Profile
                              </div>

                              <div className="pb-1 font-gilroy font-medium text-sm text-gray-600">
                                There are no Profile available.
                              </div>
                            </div>
                          )
                        }

                      </div>
                    )}

                  {
                    activeTab === "recent" && <RecentActivity />
                  }


                  {
                    activeTab === "users" && <ManagedUsers />
                  }

                </div>
              )}

        </div>

      </div>

      <Modal
        show={deleteForm}
        onHide={handleCloseDeleteFormShow}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"


      >

        <Modal.Header className="!border-b-0">
          <Modal.Title
            className="!w-full !text-center mt-1 !text-[18px] !font-semibold !text-[#222222] !font-gilroy"
          >
            Delete General?
          </Modal.Title>
        </Modal.Header>


        <Modal.Body className="!text-center !text-sm !font-medium !font-gilroy !text-gray-500 !-mt-7">
          Are you sure you want to delete this General?
        </Modal.Body>

        {generalDeleteError && (
          <div className="flex justify-center items-center">
            <ErrorMessage message={generalDeleteError} type="error" />
          </div>
        )}

        <Modal.Footer className="!flex !justify-center !border-t-0 !-mt-2">
          <Button
            onClick={handleCloseDeleteFormShow}
            className="!mr-2 !w-full !max-w-40 !h-13 !rounded-lg !py-3 !px-5 !bg-white !text-blue-700 !border !border-blue-700 !font-semibold !font-gilroy !text-sm"
          >
            Cancel
          </Button>

          <Button
            onClick={handleConformDelete}
            className="!w-full !max-w-40 !h-13 !rounded-lg !py-3 !px-5 !bg-blue-700 !text-white !font-semibold !font-gilroy !text-sm"
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

        <Modal.Header className="relative flex items-center justify-between">
          <div className="text-xl font-semibold font-gilroy">
            Change Password
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleCloseChangepassword}
            className="cursor-pointer"
          />
        </Modal.Header>


        <Modal.Body className="font-gilroy mt-0 pt-0">
          <Form.Group>
            <Form.Label className="text-sm font-medium font-gilroy text-gray-900 mt-0 pt-0">
              New Password <span className="text-red-500 text-xl"> *</span>
            </Form.Label>

            <InputGroup>
              <FormControl
                id="form-controls"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                value={checkPassword}
                onChange={(e) => handleCheckPassword(e)}
                className="text-base font-medium font-gilroy text-gray-600 shadow-none border border-gray-300 h-12 rounded-lg pr-12"
              />

              <InputGroup.Text
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide Password" : "Show Password"}
                className="bg-transparent border-0 cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <img src={eye} alt="Hide Password" width={20} height={20} />
                ) : (
                  <img src={eyeClosed} alt="Show Password" width={20} height={20} />
                )}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {passError && <ErrorMessage message={passError} type="error" />}
        </Modal.Body>

        {verifyLoading && (
          <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 border-4 border-r-transparent border-t-blue-700 rounded-full animate-spin"></div>
          </div>
        )}

        <Modal.Footer className="flex justify-center m-0 pt-1 border-0">
          <Button
            onClick={() => handleCheckPasswordChange()}
            className="w-full mt-1 h-12 !rounded-xl !bg-[#1E45E1] text-sm !font-semibold font-gilroy"
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

        <Modal.Header className="relative mb-2 flex items-center justify-between">
          <div className="text-xl font-semibold font-gilroy">
            {edit ? "Edit General" : "Add General"}
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </Modal.Header>

        <div className="font-gilroy flex items-center ml-2.5">

          <div className="h-20 w-20 relative">
            <Image
              src={
                file
                  ? typeof file === "string"
                    ? file
                    : URL.createObjectURL(file)
                  : Profile
              }
              roundedCircle
              className="h-20 w-20 object-cover"
            />

            <label htmlFor="imageInput" className="absolute bottom-0 right-1 cursor-pointer">
              <Image
                src={Plus}
                roundedCircle
                className="h-5 w-5"
              />

              <input
                type="file"
                accept="image/*"
                multiple
                id="imageInput"
                onChange={handleImageChange}
                className="sr-only"
              />
            </label>
          </div>

          <div className="pl-4">
            <div>
              <label className="text-base font-medium font-gilroy text-gray-900">
                Profile Photo
              </label>
            </div>

            <div>
              <label className="text-sm font-medium font-gilroy text-gray-600">
                Max size of image 10MB
              </label>
            </div>
          </div>
        </div>

        <Modal.Body className="font-gilroy show-scroll mt-0 mr-3 max-h-80 overflow-y-auto">

          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-12 md:col-span-6">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  First Name <span className="text-red-500 text-xl"> *</span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => handleFirstName(e)}
                  className="text-base font-medium font-gilroy text-gray-600 shadow-none border border-gray-300 h-12 rounded-lg"
                />
              </Form.Group>
              {firstNameError && (
                <ErrorMessage message={firstNameError} type="error" />
              )}
            </div>

            <div className="col-span-12 md:col-span-6">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Last Name <span className="invisible text-xl"> *</span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => handlelastName(e)}
                  className="text-base font-medium font-gilroy text-gray-600 shadow-none border border-gray-300 h-12 rounded-lg"
                />
              </Form.Group>

            </div>

            <div className="col-span-12 md:col-span-6 mb-0">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Mobile Number <span className="text-red-500 text-xl"> *</span>
                </Form.Label>

                <InputGroup className="flex">
                  <Form.Select
                    value={countryCode}
                    id="vendor-select-pg"
                    className="max-w-[5.5rem] !h-12 border border-gray-300 rounded-l-lg !rounded-tr-none !rounded-br-none"
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
                    className="!h-12 text-sm font-medium font-gilroy text-gray-600 shadow-none border border-gray-300 border-l-0 rounded-r-lg"
                  />
                </InputGroup>
              </Form.Group>

              {phoneError && <ErrorMessage message={phoneError} type="error" />}
              {phoneErrorMessage && <ErrorMessage message={phoneErrorMessage} type="error" />}
              {state.Settings?.generalMobileError && (
                <ErrorMessage message={state.Settings?.generalMobileError} type="error" />
              )}
            </div>

            <div className="col-span-12 md:col-span-6 mb-0">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Email ID <span className="text-red-500 text-xl"> *</span>
                </Form.Label>

                <FormControl
                  type="text"
                  id="form-controls"
                  autoComplete="off"
                  autoCorrect="off"
                  placeholder="Enter Email ID"
                  value={emilId}
                  onChange={(e) => handleEmailId(e)}
                  className="text-base font-medium font-gilroy text-gray-600 shadow-none border border-gray-300 h-12 rounded-lg"
                />
              </Form.Group>

              {emailError && <ErrorMessage message={emailError} type="error" />}
              {state.Settings?.generalEmailError && (
                <ErrorMessage message={state.Settings?.generalEmailError} type="error" />
              )}
              {emailErrorMessage && (
                <ErrorMessage message={state.Settings?.generalEmailError} type="error" />
              )}
            </div>

            {!edit && (
              <div className="col-span-12 md:col-span-12 lg:col-span-12 mb-1 mt-1">
                <Form.Group className="">
                  <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                    Password <span className="text-red-500 text-xl">*</span>
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
                      className="h-12 w-full rounded-lg border border-gray-300 pl-3 pr-10 text-base text-gray-600 font-gilroy font-medium shadow-none focus:outline-none focus:ring-0"

                    />
                    <InputGroup.Text
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide Password" : "Show Password"
                      }
                      className="bg-white border border-gray-300 cursor-pointer rounded-lg"
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

            <div className="col-span-12 md:col-span-12 lg:col-span-12 mb-2 mt-2">
              <Form.Group className="">
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Flat , House no , Building , Company , Apartment
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter House No"
                  value={house_no}
                  onChange={(e) => handleHouseNo(e)}
                  className="h-12 text-base text-gray-600 font-gilroy font-medium shadow-none border border-gray-300 rounded-lg"
                />
              </Form.Group>
              {house_noError && (
                <ErrorMessage message={house_noError} type="error" />
              )}
            </div>

            <div className="col-span-12 md:col-span-6 mb-1">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Area , Street , Sector , Village
                </Form.Label>

                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Street"
                  value={street}
                  onChange={handleStreetName}
                  className="h-12 text-base text-gray-600 font-gilroy font-medium shadow-none border border-gray-300 rounded-lg"
                />
              </Form.Group>
              {streetError && (
                <ErrorMessage message={streetError} type="error" />
              )}
            </div>

            <div className="col-span-12 md:col-span-6 mb-1">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Landmark
                </Form.Label>

                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="E.g , near appollo hospital"
                  value={landmark}
                  onChange={handleLandmark}
                  className="h-12 text-base text-gray-600 font-gilroy font-medium shadow-none border border-gray-300 rounded-lg"
                />
              </Form.Group>

              {landmarkError && (
                <ErrorMessage message={landmarkError} type="error" />
              )}
            </div>

            <div className="col-span-12 md:col-span-6">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Pincode <span className="text-red-500 text-xl">*</span>
                </Form.Label>

                <Form.Control
                  value={pincode}
                  onChange={handlePinCodeChange}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Pincode"
                  className="h-12 text-base text-gray-600 font-gilroy font-medium shadow-none border border-gray-300 rounded-lg"
                />

                {pincodeError && (
                  <ErrorMessage message={pincodeError} type="error" />
                )}
              </Form.Group>
            </div>

            <div className="col-span-12 md:col-span-6 mb-1">
              <Form.Group>
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  Town / City <span className="text-red-500 text-xl">*</span>
                </Form.Label>

                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter City"
                  value={city}
                  onChange={handleCity}
                  className="h-12 text-base text-gray-600 font-gilroy font-medium shadow-none border border-gray-300 rounded-lg"
                />
              </Form.Group>

              {cityError && (
                <ErrorMessage message={cityError} type="error" />
              )}
            </div>

            <div className="col-span-12">
              <Form.Group controlId="exampleForm.ControlInput5">
                <Form.Label className="text-sm font-medium font-gilroy text-gray-900">
                  State <span className="text-red-500 text-xl">*</span>
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
                      return inputValue.replace(/[^a-zA-Z\s]/g, "");
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
                      backgroundColor: state.isFocused ? "#f0f0f0" : "#fff",
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
          {formError && (
            <div className="flex justify-center mt-1">
              <ErrorMessage message={formError} type="error" />
            </div>
          )}
        </Modal.Body>

        {formLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10">
            <div className="h-10 w-10 rounded-full border-4 border-t-blue-700 border-r-transparent animate-spin"></div>
          </div>
        )}


        <Modal.Footer className="flex justify-center border-0">

          <Button
            className="!w-full !bg-[#1E45E1] text-white !font-semibold !h-12 !rounded-xl !text-sm !font-gilroy mt-1"
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







