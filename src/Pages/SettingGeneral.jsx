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
import img2 from "../Assets/Images/New_images/settingeye.png";
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import EmptyState from "../Assets/Images/New_images/empty_image.png";
import Plus from "../Assets/Images/New_images/add-circle.png";
import Select from "react-select";
import "./Settings.css";
import eye from "../Assets/Images/login-password.png";
import eyeClosed from "../Assets/Images/Show_password.png";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import {ArrowLeft2,ArrowRight2,} from "iconsax-react";
import { MdError } from "react-icons/md";
import './SettingAll.css'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {CloseCircle} from "iconsax-react";
import './SettingGeneral.css';

function SettingGeneral() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);

  const [showFormGeneral, setShowFormGeneral] = useState(false);
  const [file, setFile] = useState(null);
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
  const [emailAlready, setEmailAlready] = useState("");
  const [phoneAlready, setPhoneAlready] = useState("");
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
  
 
  const [loading, setLoading] = useState(true)
const [generalDeleteError,setGeneralDeleteError] = useState("")


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
    setNewPassword(e.target.value);
    setNewPassError("")
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConformPasswordError("")
    dispatch({ type: "CLEAR_CONFORM_PASSWORD_MATCHES" });
  };

  const handleConfirmPass = () => {
    setConfirmPass(true);
  };
  const handleCloseConfirmPass = () => {
    setConfirmPass(false);
    setConformPasswordError("")
    setConfirmPassword("")
    setNewPassword("")
    setNewPassError("")
  };

  const handleChangePassword = (pass) => {
    setChangePassword(true);
    setPassId(pass.id);
  };
  const handleCloseChangepassword = () => {
    setChangePassword(false);
    setPassError("");
    setCheckPassword("")
    

  };

  const handleCheckPassword = (e) => {
    setCheckPassword(e.target.value);
    setPassError("");
    
    dispatch({ type: "CLEAR_PASSWORD_ERROR" });
  };

  const CheckvalidateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "checkPassword":
          setPassError("Current Password is Required");
          break;


        default:
          break;
      }
      return false;
    }
    return true;
  };
  const handleCheckPasswordChange = () => {
    if (!CheckvalidateField(checkPassword, "checkPassword"));
    if (checkPassword) {
      dispatch({

        type: "CHECKPASSWORD",
        payload: { id: passId, password: checkPassword },
      });
    }

  };

  const handlegeneralform = (id) => {
    setGeneralEdit((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = (user) => {
    setDeleteId(user.id);
    setDeleteForm(true);
  };

  const handleCloseDeleteFormShow = () => {
    setDeleteForm(false);
    setGeneralDeleteError("")
    dispatch({type:"CLEAR_DELETE_GENERAL_ERROR"})
  };

  const handleConformDelete = () => {
    dispatch({ type: "GENERALDELETEGENERAL", payload: { id: deleteId } });
  };

  const handleShowFormGreneral = () => {
    setShowFormGeneral(true);
    setEdit(false);
  };

  const handleClose = () => {
    setShowFormGeneral(false);
    setFirstName("");
    setLastName("");
    setEmailId("");
    setFile("");
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
    setEmailAlready('');
    dispatch({ type: 'CLEAR_GENERAL_EMAIL_ERROR'})
  };

  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
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
  };

  const handleFirstName = (e) => {
   const value = e.target.value;
   const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstName(value);
    setFirstNameError("");
    setFormError("");
  };

  const handlelastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
     if (!pattern.test(value)) {
       return;
     }
    setLastName(value);
    
    setFormError("");
  };


  const handlePhone = (e) => {
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
      setPhoneError("Invalid Mobile Number");
    }
  
    setPhoneErrorMessage("");
    dispatch({ type: "CLEAR_MOBILE_ERROR" });
  };
  
  
  const handleEmailId = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmailId(emailValue);
    dispatch({ type: 'CLEAR_GENERAL_EMAIL_ERROR'})
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);

    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Invalid Email Id");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
      setFormError("");
    }

    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };



 

  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("")
    setFormError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");
    setFormError("");
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    setFormError("");
  }

  

  const handlePinCodeChange = (e) => {
    const value = e.target.value;
    if (!/^\d{0,6}$/.test(value)) {
      return;
    }
  
    setPincode(value);
    if (value.length > 0 && value.length < 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPincodeError("");
    }
  
  
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setCityError("");
    setFormError("");
  }

 
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    
  };
  const MobileNumber = `${countryCode}${Phone}`;

  const handleEditGeneralUser = (user) => {
    
    const phoneNumber = String(user.mobileNo || "");
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const mobileNumber = phoneNumber.slice(-10);
    setEdit(true);
    setShowFormGeneral(true);

    setFirstName(user.first_name);
    setLastName(user.last_name);
    setPhone(mobileNumber);
    setCountryCode(countryCode);
   
    setHouseNo(user.Address);
    setStreet(user.area);
    setLandmark(user.landmark)
    setPincode(user.pin_code);
    setCity(user.city);
    setStateName(user.state);
    setEmailId(user.email_Id);
    setFile(user.profile === "0" ? null : user.profile);
    setEditId(user.id);
    setPassword(user.password);

    setInitialStateAssign({
      firstName: user.first_name || "",
      lastName: user.last_name || "",
      Phone: user.mobileNo || "",
      emilId: user.email_Id || "",
      
      house_no: user.Address || '',
      street: user.area || '',
      city: user.city || '',
      pincode:user.pin_code || '',
      landmark:user.landmark || '',
      state: user.state || '',
      file: user.profile === "0" ? null : user.profile || null,
    });
  };

  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "firstName":
          setFirstNameError("First Name Required");
          break;
        case "emilId":
          setEmailError("Email Id Required");
          break;
        case "Phone":
          setPhoneError("Phone Number Required");
          break;
       
        case "password":
          setPasswordError("Password Required");
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
    house_no:'',
    street:'',
    city:'',
    pincode:'',
    landmark:'',
    state:'',
    countryCode: "",
    file: null,
  });

  
  function isValidEmail(email) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    return emailRegex.test(email);
  }


  const handleSave = () => {
  let hasError = false;
  const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
  const normalize = (v) => (v ?? "");


  const validations = [
    validateField(firstName, "firstName"),
    validateField(emilId,   "emilId"),
    validateField(Phone,    "Phone"),
    !edit ? validateField(password, "password") : true,
    validateField(city,     "City"),
    validateField(pincode,  "Pincode"),
    validateField(state_name, "state_name"),
  ];

 
  if (!Phone) {
    setPhoneError("Mobile Number Required"); hasError = true;
  } else if (!/^\d{10}$/.test(Phone)) {
    setPhoneError("Please Enter Valid Mobile Number"); hasError = true;
  } else setPhoneError("");

  
  if (emilId) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    if (!emailRegex.test(emilId.toLowerCase())) {
      setEmailError("Please Enter a Valid Email ID"); hasError = true;
    } else setEmailError("");
  }

  if (hasError || validations.includes(false) || !isValidEmail(emilId)) return;


  const payload = {
    f_name : firstName,
    l_name : lastName,
    mob_no : normalizedPhoneNumber,
    email_id : emilId,
    address : house_no,
    area    : street,
    landmark: landmark,
    city,
    pin_code: pincode,
    state   : state_name,
    profile : file,
  };
  if (!edit) payload.password = password;
  if (edit && editId) payload.id = editId;

  
  if (edit && editId) {
    const isChanged =
      firstName !== initialStateAssign.firstName ||
      Number(countryCode + Phone) !== Number(initialStateAssign.Phone) ||
      normalize(lastName) !== normalize(initialStateAssign.lastName) ||
      emilId !== initialStateAssign.emilId ||
      normalize(house_no) !== normalize(initialStateAssign.house_no) ||
      normalize(street) !== normalize(initialStateAssign.street) ||
      normalize(landmark) !== normalize(initialStateAssign.landmark) ||
      city !== initialStateAssign.city ||
      String(pincode).trim() !== String(initialStateAssign.pincode ?? "").trim() ||
      state_name !== initialStateAssign.state ||
      file !== initialStateAssign.file ||
      (!file && initialStateAssign.file);

    if (!isChanged) { setFormError("No Changes Detected"); return; }
    setFormError("");
  }

  /* ------------ 4. Dispatch --------------- */
  dispatch({ type: "ADDGENERALSETTING", payload });
};

  
  useEffect(() => {
    if (state.Settings.notmatchpass) {
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
  }, []);



  useEffect(() => {
    if (state.Settings.statusCodeForCheckPassword === 200) {
      handleCloseChangepassword();
      handleConfirmPass();
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
    setEmailAlready(state.Settings?.generalEmailError);
  }, [state.Settings?.generalEmailError]);

  useEffect(() => {
    setPhoneAlready(state.Settings?.generalMobileError);
  }, [state.Settings?.generalMobileError]);


  useEffect(() => {
    if (state.Settings?.StatusCodeForSettingGeneral === 200) {
      handleClose();
      dispatch({ type: "GETALLGENERAL" });
      dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTING_GENERAL_ADD" });
      }, 200);
    }
  }, [state.Settings?.StatusCodeForSettingGeneral]);

  useEffect(() => {
    if (state.Settings?.statusCodeForGeneralDelete === 200) {
      handleCloseDeleteFormShow();
      dispatch({ type: "GETALLGENERAL" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_GENERAL" });
      }, 200);
    }
  }, [state.Settings?.statusCodeForGeneralDelete]);

 
 const [generalrowsPerPage, setGeneralrowsPerPage] = useState(2);
  const [generalcurrentPage, setGeneralcurrentPage] = useState(1);
 

  const indexOfLastRowGeneral = generalcurrentPage * generalrowsPerPage;
  const indexOfFirstRowGeneral = indexOfLastRowGeneral - generalrowsPerPage;
  const currentRowGeneral = generalFilterddata?.slice(
    indexOfFirstRowGeneral,
    indexOfLastRowGeneral
  );

  const handlePageChange = (generalpageNumber) => {
    setGeneralcurrentPage(generalpageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setGeneralrowsPerPage(Number(event.target.value));
    setGeneralcurrentPage(1);
  };

  const totalPagesGeneral = Math.ceil(
    generalFilterddata?.length / generalrowsPerPage
  );



  useEffect(() => {
    if (state.Settings?.StatusCodeforGetGeneral === 200 || state.Settings?.StatusCodeforGetGeneral === 201) {
      setGeneralFilterddata(state.Settings?.settingGetGeneralData);
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
          setNewPassError("New Password is Required");
          break;
        case "confirmPassword":
          setConformPasswordError("Confirm Password is Required");
          break;

        default:
          break;
      }
      return false;
    }
    return true;
  };

  const handleSavePassword = () => {
    if (!ConformvalidateField(newPassword, "newPassword"));
    if (!ConformvalidateField(confirmPassword, "confirmPassword"));

    if (newPassword && confirmPassword) {
      dispatch({
        type: "GENERALPASSWORDCHANGES",
        payload: { id: passId, new_pass: newPassword, cn_pass: confirmPassword },
      });
    }

  };
  useEffect(() => {
    if (state.Settings.conformPassNotmatch) {
      setConformPasswordError(state.Settings.conformPassNotmatch);
    }
  }, [state.Settings.conformPassNotmatch]);

  useEffect(() => {
    if (state.Settings.StatusCodeforGeneralPassword === 200) {
      handleCloseConfirmPass();
      setTimeout(() => {
        dispatch({ type: "CLEAR_GENERAL_PASSWORD_CHANGES" });
      }, 200);
    }
  }, [state.Settings.StatusCodeforGeneralPassword]);

 
 
  return (
    <>

      <div
       
          className="d-flex flex-column flex-md-row justify-content-between align-items-center"
          
        
           style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
        
          minHeight: 83,
          whiteSpace: "nowrap",
          paddingRight:10,
          paddingLeft:10,
         

        }}
      >
  
      <div  className="w-100 d-flex justify-content-center justify-content-md-start mt-3">
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
            General
          </label>
        </div>
        </div>
        <div
         className="d-flex justify-content-center justify-content-md-end w-100 mt-3 mt-md-0"
      
       >
        
          <div style={{marginTop:6}}
           >
            <Button
            
            style={{
              fontFamily: "Gilroy",
              fontSize: "14px",
              backgroundColor: "#1E45E1",
              color: "white",
              fontWeight: 600,
              borderRadius: "8px",
              padding: "11px",
            
              height:45,
              width:146,
              whiteSpace:"nowrap",
              marginTop:5

            }}
            
              onClick={handleShowFormGreneral}
            >
              + Create Master
            </Button>
          </div>
        </div>
      </div>

      <div className="container scroll-issue" style={{ position: "relative" ,  
      
                  overflowY: "auto",}}>

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





        {currentRowGeneral && currentRowGeneral.length > 0 ? (
          currentRowGeneral.map((item) => {
            const imageUrl = item.profile || Profile;
            return (


              <div
                className="card p-3 settingGreneral mt-3 "
                style={{
                  borderRadius: 16,
                
                }}
                key={item.id}
              >
                <div 
                
                className="d-flex flex-wrap justify-content-between align-items-center w-100"
                >
                  <div className="d-flex align-items-center flex-wrap mt-2">
                    <Image
                      src={imageUrl} 
                      alt={item.first_name || "Default Profile"}
                      roundedCircle
                      style={{
                        height: "50px",
                        width: "50px",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Profile;
                      }}
                    />
                    <div className="ms-2 mt-2">
                      <p
                        className="mb-0 text-break"
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          
                        }}
                      >
                        {item.first_name} {item.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    <img src={img2} width="20" height="20" alt="icon" />
                    <p
                      onClick={() => handleChangePassword(item)}
                      className="mb-0 mx-2 text-wrap"
                      style={{
                        fontFamily: "Montserrat",
                        fontWeight: 600,
                        fontSize: 14,
                        color: "#1E45E1",
                        cursor: "pointer",
                      }}
                    >
                      Change Password
                    </p>
                  
                    <div className="ms-2 me-2" style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100,
                                            border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center",
                                            position: "relative", zIndex: generalEdit ? 1000 : 'auto'
                                            ,      backgroundColor: generalEdit === item.id ? "#E7F1FF" : "transparent",


                                            }} onClick={() => handlegeneralform(item.id)}>
                                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                    {generalEdit === item.id && (
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
                          padding: 10,
                          alignItems: "start",
                          zIndex: 1050, 
                         
                          fontSize: window.innerWidth <= 404 ? 13 : 14,
                        }}
                      >
                        <div
                          className="mb-2 d-flex justify-content-start align-items-center gap-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEditGeneralUser(item)}
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
                          style={{ cursor: "pointer", pointerEvents: "auto" }}
                          onClick={() => handleDelete(item)}
                        >
                          <img
                            src={Delete}
                            style={{ height: 16, width: 16 }}
                            alt="Delete"
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
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-6">
                    <p
                      className="mb-1"
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
                      {item.email_Id}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p
                      className="mb-1"
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
                      +
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
                      className="mb-1"
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
                      {item.Address ? item.Address : ''} {""}{" "} 
                      {item.area ? item.area :''} {""} {item.city ? item.city :''} {""} {item.state ? item.state : ''} <br></br>
                      {item.pin_code ? item.pin_code  : ''}
                    </p>
                  </div>
                </div>
              </div>

            );
          })
        ) : !loading && (
          <div style={{ textAlign: "center", alignItems: "center", marginTop: 90 }}>
            <div style={{ textAlign: "center" }}>
              <img src={EmptyState} width={240} height={240} alt="emptystate" />
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
              No Profile{" "}
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
              There are no Profile available.{" "}
            </div>
          </div>
        )}
      </div>

      {generalFilterddata?.length >=3 && (
        <nav 
        className="position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center"
       
        >
      
          <div>
            <select
              value={generalrowsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: "5px",
                border: "1px solid #1E45E1",
                borderRadius: "5px",
                color: "#1E45E1",
                fontWeight: "bold",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value={2}>2</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {/* Previous Button */}
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: generalcurrentPage === 1 ? "#ccc" : "#1E45E1",
                  cursor: generalcurrentPage === 1 ? "not-allowed" : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handlePageChange(generalcurrentPage - 1)}
                disabled={generalcurrentPage === 1}
              >
                <ArrowLeft2
                  size="16"
                  color={generalcurrentPage === 1 ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>

            <li
              style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
            >
              {generalcurrentPage} of {totalPagesGeneral}
            </li>

            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color:
                    generalcurrentPage === totalPagesGeneral
                      ? "#ccc"
                      : "#1E45E1",
                  cursor:
                    generalcurrentPage === totalPagesGeneral
                      ? "not-allowed"
                      : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handlePageChange(generalcurrentPage + 1)}
                disabled={generalcurrentPage === totalPagesGeneral}
              >
                <ArrowRight2
                  size="16"
                  color={
                    generalcurrentPage === totalPagesGeneral
                      ? "#ccc"
                      : "#1E45E1"
                  }
                />
              </button>
            </li>
          </ul>
        </nav>
      )}

      <Modal
        show={showFormGeneral}
        onHide={() => handleClose()}
        backdrop="static"
        centered
         dialogClassName="custom-modal"
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
            style={{ cursor: 'pointer' }}/>
			
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
        <Modal.Body style={{maxHeight:"380px", overflowY:"scroll"}} className="show-scroll mt-3 me-3">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group>
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name{" "}
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
                <div style={{ color: "red" }}>
                  <MdError style={{fontSize: '13px',marginRight:"5px"}} />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{firstNameError} </span>
                </div>
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
                  Last Name{" "}
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
                  Mobile Number{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

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
                    borderLeft: "1px solid #D9D9D9",
                    borderRight: "1px solid #D9D9D9",
                    borderTop: "1px solid #D9D9D9",
                    borderBottom: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: "8px 8px 8px 8px",
                    paddingLeft: "12px",
                    width: "100%",
                  }}
                />
            
                <p
                  id="MobileNumberError"
                  style={{ color: "red" }}
                ></p>

              </Form.Group>
              {phoneError && (
                <div style={{ color: "red", marginTop: "-12px", fontSize: "13px" }}>
                  <MdError style={{ marginRight: "5px", marginBottom: "3px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{phoneError}</span>
                </div>
              )}
              {phoneErrorMessage && (
                <div style={{ color: "red" }}>
                  <MdError  style={{ marginRight: "5px", marginBottom: "3px" }}/>
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{phoneErrorMessage}</span>
                </div>
              )}
              {phoneAlready && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"5px", marginBottom: "3px"}}/>
                   <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{phoneAlready} </span>
                </div>
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
                  Email ID{" "}
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
                <div style={{ color: "red", fontSize: "13px" }}>
                  <MdError style={{ marginRight: "5px", marginBottom: "3px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{emailError}</span>
                </div>
              )}
              {emailAlready && (
                <div style={{ color: "red" }}>
                  <MdError  style={{marginRight:"5px", marginBottom: "3px"}}/>
                <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{emailAlready}</span>
                </div>
              )}

              {emailErrorMessage && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"5px", marginBottom: "3px"}}/>
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{emailErrorMessage}</span>
                </div>
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
                    Password{" "}
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
                  <div style={{ color: "red"}}>
                    <MdError style={{fontSize: '13px',marginRight:"5px",marginTop:"1px"}}/>
                    <span style={{ fontSize: '12px',fontFamily: "Gilroy", fontWeight: 500 }}>{passwordError}</span>
                  </div>
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
                <div style={{ color: "red"}}>
                  <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                  <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
                </div>
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
                  Area , Street , Sector , Village{" "}
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
                <div style={{ color: "red"}}>
                  <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                  <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
                </div>
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
                  Landmark{" "}
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
                <div style={{ color: "red"}}>
                  <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                  <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
                </div>
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
                                                                                       Pincode
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
                                                                                       <div className="d-flex align-items-center p-1 mb-2">
                                                                                         <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                                                                                         <label
                                                                                           className="mb-0"
                                                                                           style={{
                                                                                             color: "red",
                                                                                             fontSize: "12px",
                                                                                             fontFamily: "Gilroy",
                                                                                             fontWeight: 500,
                                                                                           }}
                                                                                         >
                                                                                           {pincodeError}
                                                                                         </label>
                                                                                       </div>
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
                  Town/City{" "}
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
                <div style={{ color: "red" }}>
                  <MdError style={{fontSize: '13px',marginRight:"5px"}} />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                </div>
              )}
            </div>

              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
             <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
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
                 State
                 <span style={{ color: "red", fontSize: "20px" }}>*</span>
               </Form.Label>
           
               <Select
                 options={indianStates}
                 onChange={(selectedOption) => {
                   setStateName(selectedOption?.value);
                 }}
                 value={
                   state_name ? { value: state_name, label: state_name } : null
                 }
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
                   }),
                   menuList: (base) => ({
                     ...base,
                     backgroundColor: "#f8f9fa",
                     maxHeight: "120px",
                     padding: 0,
                     scrollbarWidth: "thin",
                     overflowY: "auto",
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
             <div style={{ color: "red" }}>
               <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
               <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                 {state_nameError}
               </span>
             </div>
           )}
           </div>



          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
          {formError && (
            <div style={{ color: "red" }}>
              <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
              <span style={{ fontSize: '13px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{formError}</span>
            </div>
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
  <div className="d-flex justify-content-center align-items-center gap-2 ">
    <MdError style={{ color: "red" }} />
    <label
      className="mb-0"
      style={{
        color: "red",
        fontSize: "12px",
        fontFamily: "Gilroy",
        fontWeight: 500,
        textAlign: "center"
      }}
    >
      {generalDeleteError}
    </label>
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
            dialogClassName="custom-modal"
      
      >
        <Modal.Header style={{ 
          
          position: "relative" }}>
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Current Password
          </div>
         
          <CloseCircle size="24" color="#000" onClick={handleCloseChangepassword} 
            style={{ cursor: 'pointer' }}/>
			
        </Modal.Header>
        <Modal.Body style={{ marginTop: '0px' }}>
          
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
                Current Password{" "}
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
              <div className="text-danger" style={{ color: "red" }}>
                <MdError />

                <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{passError}</span>
              </div>
            )}

         
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center" style={{border:"none"}}>
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
            onClick={handleCheckPasswordChange}
          >
            Verify
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
            style={{ cursor: 'pointer' }}/>
        </Modal.Header>
        <Modal.Body>
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
                New Password{" "}
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
            </Form.Group>
            {newPassError && (
              <div className="text-danger" style={{ color: "red" , fontSize:13, fontFamily:"Gilroy"}}>
                <MdError /> {''}
                {newPassError}
              </div>
            )}
            
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
                Confirm Password{" "}
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
            </Form.Group>
            {conformPasswordError && (
              <div className="text-danger" style={{ color: "red" , fontSize:13, fontFamily:"Gilroy" }}>
                <MdError /> {' '}
                {conformPasswordError}
              </div>
            )}
            
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
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
    </>
  );
}
export default SettingGeneral;
