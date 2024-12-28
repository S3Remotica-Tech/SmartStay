import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button, Offcanvas, Form, FormControl,InputGroup, Pagination  } from "react-bootstrap";
import img1 from "../Assets/Images/Ellipse 1.png";
import img2 from "../Assets/Images/New_images/settingeye.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import round from "../Assets/Images/Group 14.png"
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import EmptyState from "../Assets/Images/New_images/empty_image.png";
import Plus from "../Assets/Images/New_images/add-circle.png";
import "./Settings.css";
import eye from '../Assets/Images/login-password.png'
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png';
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import { Autobrightness, Call, Sms, House, Buildings, ArrowLeft2, ArrowRight2, MoreCircle } from 'iconsax-react';
import { MdError } from "react-icons/md";



function SettingGeneral(){
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  // useState
const [showFormGeneral,setShowFormGeneral] = useState(false)
const [file, setFile] = useState(null);
const [firstName,setFirstName] = useState("")
const [lastName,setLastName] = useState("")
const [countryCode, setCountryCode] = useState("91");
const [Phone,setPhone] = useState("")
const [emilId,setEmailId] = useState("")
const [address,setAddress] = useState("")
const [password,setPassword]=useState("")
  const [showPassword,setShowPassword]=useState('')
  const [generalEdit, setGeneralEdit] = useState(null);
  const[edit,setEdit]=useState(false)
  const [editId,setEditId]=useState("")
  const [deleteId,setDeleteId]=useState("")
  const[deleteForm,setDeleteForm]=useState(false)
  const [emailAlready,setEmailAlready]=useState("")
  const [phoneAlready,setPhoneAlready]=useState("")
  const [firstNameError,setFirstNameError] = useState("")
  const [lastNameError,setLastNameError] = useState("")
  const [emailError,setEmailError] = useState("")
  const [phoneError,setPhoneError] = useState("")
  const [addressError,setAddressError] = useState("")
  const [passwordError,setPasswordError] = useState("")
  const [formError, setFormError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

// useEffect

useEffect(() => {
  dispatch({ type: "COUNTRYLIST" });
  dispatch({ type: "GETALLGENERAL"});
}, []);

const handlegeneralform = (id) => {
  setGeneralEdit((prevId) => (prevId === id ? null : id));
};
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

useEffect(()=>{
setEmailAlready(state.Settings?.generalEmailError)
},[state.Settings?.generalEmailError])

useEffect(()=>{
  setPhoneAlready(state.Settings?.generalMobileError)
  },[state.Settings?.generalMobileError])

// useEffect(()=>{
// if(edit && editId){

//   setFirstName()


// }
// },[])
// onchanges
const handleDelete=(user)=>{
  setDeleteId(user.id)
  setDeleteForm(true)
}
const handleCloseDeleteFormShow=()=>{
  setDeleteForm(false)
}
const handleConformDelete=()=>{
  dispatch({ type: "GENERALDELETEGENERAL", payload: {id:deleteId}})
}
const handleShowFormGreneral=()=>{
    setShowFormGeneral(true)
    setEdit(false)
}
const handleClose=()=>{
    setShowFormGeneral(false)
    setFirstName("")
    setLastName("")
    setEmailId("")
    setAddress("")
    setFile("")
    setPassword("")
    setPhone("")
    setFirstNameError("")
    setLastNameError("")
    setEmailError("")
    setPhoneError("")
    setAddressError("")
    setPasswordError("")
    setFormError("")
}
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
    }
  };

  const handleFirstName=(e)=>{
    setFirstName(e.target.value)
    setFirstNameError("")
    setFormError("")
  }
  const handlelastName=(e)=>{
    setLastName(e.target.value)
    setLastNameError("")
    setFormError("")
  }
  // const handlePhone=(e)=>{
  //   setPhone(e.target.value)
  //   setPhoneError("")
  //   setPhoneAlready("")
  //   setFormError("")
  //   dispatch({ type: "CLEAR_MOBILE_ERROR"});
  // }
  const handlePhone = (e) => {
    setPhone(e.target.value);
    const pattern = /^\d{1,10}$/;
    const isValidMobileNo = pattern.test(e.target.value);

    if (isValidMobileNo && e.target.value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid mobile number *");
    }
    setPhoneErrorMessage("");
    dispatch({ type: "CLEAR_MOBILE_ERROR" });
  };

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setFormError("")
  };
  // const handleEmailId=(e)=>{
  //   setEmailId(e.target.value)
  //   setEmailError("")
  //   setEmailAlready("")
  //   setFormError("")
  //   dispatch({ type: "CLEAR_GENERAL_EMAIL_ERROR"});
  // }

  const handleEmailId = (e) => {
    const emailValue = e.target.value;
    setEmailId(emailValue);

    
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

      setFormError("");
    }

    // Clear email error on input change
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };
  const handleAddress=(e)=>{
    setAddress(e.target.value)
    setAddressError("")
    setFormError("")
  }
  const handlePassword=(e)=>{
    setPassword(e.target.value)
    setPasswordError("")
    // setPasswordError("")
  }
  const MobileNumber = `${countryCode}${Phone}`;
 
  const handleEditGeneralUser = (user)=>{
    const phoneNumber = String(user.mobileNo || "");
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const mobileNumber = phoneNumber.slice(-10);
    setEdit(true)
setShowFormGeneral(true)

setFirstName(user.first_name)
setLastName(user.last_name)
setPhone(mobileNumber)
setCountryCode(countryCode)
setAddress(user.Address)
setEmailId(user.email_Id)
setFile(user.profile === "0" ? null : user.profile);
setEditId(user.id)
setPassword(user.password)

setInitialStateAssign({
  firstName: user.first_name || "",
  lastName: user.last_name ||"",
  Phone: user.mobileNo|| "",
  emilId: user.email_Id || "",
  address: user.Address || "",
  file: user.profile === "0" ? null : user.profile || null,
});




  }
 

  // valitation
 

  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {
        case "firstName":
          setFirstNameError("firstName is required");
          break;
        // case "lastName":
        //   setLastNameError("lastName is required");
        //   break;
        case "emilId":
          setEmailError("emilId is required");
          break;
        case "Phone":
          setPhoneError("Phone num is required");
          break;
        case "address":
          setAddressError("Address is required");
          break;
          case "password":
            setPasswordError("password is required");
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
    countryCode: "",
    file: null,
  });
  // save
  const handleSave=()=>{
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
    if (!validateField(firstName, "firstName"));
    if (!validateField(emilId, "emilId"));
    if (!validateField(Phone, "Phone"));
    if (!validateField(password, "password"));
    if (!validateField(address, "address"));

   


  
    if(edit && editId){

      const isChanged = 
        firstName !== initialStateAssign.firstName ||
        Number(countryCode + Phone) !== Number(initialStateAssign.Phone) ||
        lastName !== initialStateAssign.lastName ||
        emilId !== initialStateAssign.emilId ||
        address !== initialStateAssign.address ||
        // file === initialStateAssign.file
        (file && initialStateAssign.file && file !== initialStateAssign.file) || 
  (!file && initialStateAssign.file);
      
      if (!isChanged) {
        setFormError("No changes detected.");
        return;
      }
      else {
        setFormError("");
      }
      dispatch({ type: "ADDGENERALSETTING", payload: {f_name:firstName,l_name:lastName,mob_no:normalizedPhoneNumber,email_id:emilId,address:address,profile:file,id:editId}});
    }
    else{
      dispatch({ type: "ADDGENERALSETTING", payload: {f_name:firstName,l_name:lastName,mob_no:normalizedPhoneNumber,email_id:emilId,address:address,password:password,profile:file}});

    }
  }
  useEffect(()=>{
    if(state.Settings?.StatusCodeForSettingGeneral === 200){
      handleClose()
      dispatch({ type: "GETALLGENERAL"});
      
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTING_GENERAL_ADD" });
      }, 200);
    }
    },[state.Settings?.StatusCodeForSettingGeneral])


    useEffect(()=>{
      if(state.Settings?.statusCodeForGeneralDelete === 200){
       handleCloseDeleteFormShow()
        dispatch({ type: "GETALLGENERAL"});
        
        setTimeout(() => {
          dispatch({ type: "CLEAR_DELETE_GENERAL" });
        }, 200);
      }
      },[state.Settings?.statusCodeForGeneralDelete])




// pagination

const generalrowsPerPage = 2;
const [generalcurrentPage, setGeneralcurrentPage] = useState(1);
const [generalFilterddata, setGeneralFilterddata] = useState([]);
const indexOfLastRowGeneral = generalcurrentPage * generalrowsPerPage;
const indexOfFirstRowGeneral = indexOfLastRowGeneral - generalrowsPerPage;
const currentRowGeneral = generalFilterddata?.slice(indexOfFirstRowGeneral, indexOfLastRowGeneral);


const handleGeneralPageChange = (generalpageNumber) => {
  setGeneralcurrentPage(generalpageNumber);
};


const totalPagesGeneral = Math.ceil(generalFilterddata?.length / generalrowsPerPage);

const renderPageNumbersGeneral = () => {
  const pageNumbersGeneral = [];
  let startPageGeneral = generalcurrentPage - 1;
  let endPageGeneral = generalcurrentPage + 1;

  if (generalcurrentPage === 1) {
    startPageGeneral = 1;
    endPageGeneral = 3;
  }

  if (generalcurrentPage === totalPagesGeneral) {
    startPageGeneral = totalPagesGeneral - 2;
    endPageGeneral = totalPagesGeneral;
  }

  if (generalcurrentPage === 2) {
    startPageGeneral = 1;
    endPageGeneral = 3;
  }

  if (generalcurrentPage === totalPagesGeneral - 1) {
    startPageGeneral = totalPagesGeneral - 2;
    endPageGeneral = totalPagesGeneral;
  }

  for (let i = startPageGeneral; i <= endPageGeneral; i++) {
    if (i > 0 && i <= totalPagesGeneral) {
      pageNumbersGeneral.push(
        <li key={i} style={{ margin: '0 5px' }}>
          <button
            style={{
              padding: '5px 10px',
              textDecoration: 'none',
              color: i === generalcurrentPage ? '#007bff' : '#000000',
              cursor: 'pointer',
              borderRadius: '5px',
              display: 'inline-block',
              minWidth: '30px',
              textAlign: 'center',
              backgroundColor: i === generalcurrentPage ? 'transparent' : 'transparent',
              border: i === generalcurrentPage ? '1px solid #ddd' : 'none'
            }}
            onClick={() => handleGeneralPageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
  }

  return pageNumbersGeneral;
};

useEffect(() => {
  setGeneralFilterddata( state.Settings?.settingGetGeneralData.response?.general_users)
}, [ state.Settings?.settingGetGeneralData.response?.general_users])


    return(
        <>
            <div className="d-flex justify-content-between align-items-center settingGreneral  mb-3"
              style={{
                position: "sticky",
                top: 20,
                right: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: "#FFFFFF",
                height: 83,
              }}>
        <div style={{ padding: 15 }}>
          <label
            style={{
              fontSize: 18,
              color: "#000000",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            General
          </label>
        </div>

        <div
          className="d-flex justify-content-between align-items-center"
          style={{ paddingRight: 25 }}
        >
         

          <div>
            <Button
              style={{
                fontFamily: "Montserrat",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 8,
                width: 140,
                padding: "14px, 22px, 14px, 22px",
                border: "none",
                cursor: "pointer",
              }}
            //   disabled={ebAddPermission}
              onClick={handleShowFormGreneral}
            >
              + Create Master
            </Button>
          </div>
        </div>
      </div>




      <div class="container mt-4">
       {
  currentRowGeneral && currentRowGeneral.length > 0 ? (
    currentRowGeneral.map((item) => {
      const imageUrl = item.profile || Profile;
      return (
        <div className="card p-3 settingGreneral mt-2" style={{ borderRadius: 16 }} key={item.id}>
          <div className="d-flex flex-wrap justify-content-between align-items-center">
            <div className="d-flex align-items-center">
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
              <div className="ms-3">
                <p
                  className="mb-0"
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.first_name} {item.last_name}
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <img src={img2} width="20" height="20" alt="icon" />
              <p
                className="mb-0 mx-2"
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
              <img
                src={round}
                width="30"
                height="30"
                alt="icon"
                onClick={() => handlegeneralform(item.id)}
              />
              {generalEdit === item.id && (
                <div
                  ref={popupRef}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#F9F9F9",
                    position: "absolute",
                    right: 80,
                    top: 8,
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
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditGeneralUser(item)}
                  >
                    <img src={Edit} style={{ height: 16, width: 16 }} alt="Edit" />
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
                    <img src={Delete} style={{ height: 16, width: 16 }} alt="Delete" />
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
                {item.Address}
              </p>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div>
        <div style={{ textAlign: "center" }}>
          <img
            src={EmptyState}
            width={240}
            height={240}
            alt="emptystate"
          />
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
        <div style={{textAlign:"center"}}>
            <Button
              style={{
                fontFamily: "Montserrat",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 8,
                width: 160,
                padding: "14px, 22px, 14px, 22px",
                border: "none",
                cursor: "pointer",
              }}
            //   disabled={ebAddPermission}
              onClick={handleShowFormGreneral}
            >
              + Create Master
            </Button>
          </div>
        
      </div>
  )}

         
  </div>

  
  {currentRowGeneral?.length > 0 && (
                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end',marginTop:10 }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: generalcurrentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: generalcurrentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleGeneralPageChange(generalcurrentPage - 1)}
                                disabled={generalcurrentPage === 1}
                              >
                               
                                <ArrowLeft2
                                  size="16"
                                  color="#1E45E1"
                                />
                              </button>
                              
                            </li>
                            {generalcurrentPage > 3 && (
                              <li style={{ margin: '0 5px' }}>
                                <button
                                  style={{
                                    padding: '5px 10px',
                                    textDecoration: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    minWidth: '30px',
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    border: "none"

                                  }}
                                  onClick={() => handleGeneralPageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {generalcurrentPage > 3 && <span>...</span>}
                            {renderPageNumbersGeneral()}
                            {generalcurrentPage < totalPagesGeneral - 2 && <span>...</span>}
                            {generalcurrentPage < totalPagesGeneral - 2 && (
                              <li style={{ margin: '0 5px' }}>
                                <button
                                  style={{
                                    padding: '5px 10px',
                                    textDecoration: 'none',

                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    minWidth: '30px',
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    border: "none"

                                  }}
                                  onClick={() => handleGeneralPageChange(totalPagesGeneral)}
                                >
                                  {totalPagesGeneral}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>
                             
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: generalcurrentPage === generalcurrentPage ? '#ccc' : '#007bff',
                                  cursor: generalcurrentPage === generalcurrentPage ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handleGeneralPageChange(generalcurrentPage + 1)}
                                disabled={generalcurrentPage === totalPagesGeneral}
                              >
                               
                                <ArrowRight2
                                  size="16"
                                  color="#1E45E1"
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
      >
        {/* <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header> */}

        <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
           {/* {props.edit ? "Edit Bank" : "Add Bank"} */} General
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleClose}
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
        <div className="d-flex align-items-center" style={{marginLeft:10}}>
                    <div
                      className=""
                      style={{ height: 80, width: 80, position: "relative" }}
                    >
                      <Image
                        src={
                          file
                            ? typeof file == "string"
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
        <Modal.Body>
          <div className="row ">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
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
                  placeholder="Enter name"
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
                    <MdError />
                    {firstNameError}
                  </div>
                )}
              {/* {accountNameError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {accountNameError}
                  </div>
                )} */}
            </div>
            
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Last Name.{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>  </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter account no."
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
              {/* {lastNameError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {lastNameError}
                  </div>
                )} */}
             
            </div>
           
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            
                <Form.Group
                     
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
                          onChange={handleCountryCodeChange}
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
                          {state.UsersList?.countrycode?.country_codes?.map(
                            (item) => {
                              return (
                              
                                (
                                  <>
                                    <option value={item.country_code}>
                                      +{item.country_code}
                                    </option>
                                  </>
                                )
                              );
                            }
                          )}
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
                      {/* {phoneError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phoneError}
                        </div>
                      )}
                      {phonenumError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phonenumError}
                        </div>
                      )}
                      {phoneErrorMessage && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phoneErrorMessage}
                        </div>
                      )} */}
                    </Form.Group>
                    {phoneError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {phoneError}
                  </div>
                )}
                 {phoneErrorMessage && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {phoneErrorMessage}
                        </div>
                      )}
                  {phoneAlready && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {phoneAlready}
                  </div>
                )}
            </div>
           
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
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
                  placeholder="Enter Email address"
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
                  <div style={{ color: "red" }}>
                    <MdError />
                    {emailError}
                  </div>
                )}
                  {emailAlready && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {emailAlready}
                  </div>
                )}

{emailErrorMessage && (
                                        <div style={{ color: "red" }}>
                                          <MdError />
                                          {emailErrorMessage}
                                        </div>
                                      )}
            </div>

          
            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
  
    <Form.Group className="mb-3">
      <Form.Label
        style={{
          fontSize: 14,
          color: "#222222",
          fontFamily: "Gilroy",
          fontWeight: 500,
        }}
      >
        Password <span style={{ color: "red", fontSize: "20px" }}> * </span>
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
          aria-label={showPassword ? "Hide Password" : "Show Password"}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #D9D9D9",
            borderLeft: "none", // Ensure no overlap with the input
            cursor: "pointer",
            borderRadius: "0 8px 8px 0",
          }}
        >
          {showPassword ? (
            <img src={eye} alt="Hide Password" width={20} height={20} />
          ) : (
            <img src={eyeClosed} alt="Show Password" width={20} height={20} />
          )}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>

</div> */}
{!edit && (
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
        Password <span style={{ color: "red", fontSize: "20px" }}> * </span>
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
          aria-label={showPassword ? "Hide Password" : "Show Password"}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #D9D9D9",
            borderLeft: "none", // Ensure no overlap with the input
            cursor: "pointer",
            borderRadius: "0 8px 8px 0",
          }}
        >
          {showPassword ? (
            <img src={eye} alt="Hide Password" width={20} height={20} />
          ) : (
            <img src={eyeClosed} alt="Show Password" width={20} height={20} />
          )}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
    {!edit && passwordError && (
      <div style={{ color: "red" }}>
        <MdError />
        {passwordError}
      </div>
    )}

  </div>
)}




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
                  Address{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => handleAddress(e)}
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
              {addressError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {addressError}
                  </div>
                )}
            </div>
           
          </div>
        </Modal.Body>
         {/* {error && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {error}
                  </div>
                )}  */}
        <Modal.Footer className="d-flex justify-content-center">
           {formError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {formError}
                  </div>
                )} 
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 20,
            }}
            onClick={handleSave}
          >
            {/* {props.edit ? "save changes" : "Add Bank"} */}Add
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal
        show={deleteForm}
        onHide={handleCloseDeleteFormShow}
        centered
        backdrop="static"
        style={{
          width: 388,
          height: 250,
          marginLeft: "500px",
          marginTop: "200px",
        }}
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              textAlign: "center",
              fontWeight: 600,
              color: "#222222",
              flex: 1,
            }}
          >
            Delete General?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            textAlign: "center",
            marginTop: "-20px",
          }}
        >
          Are you sure you want to delete this General?
        </Modal.Body>

        <Modal.Footer
          style={{
            justifyContent: "center",
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            style={{
              width: 160,
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
              width: 160,
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
        </>
    )
}
export default SettingGeneral;