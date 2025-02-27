import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import imageCompression from "browser-image-compression";
// import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Button from "react-bootstrap/Button";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Men from "../Assets/Images/Admin_Profile.png";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Eye, EyeSlash } from "iconsax-react";
import Logout from "../Assets/Images/LogoutCurve-Linear.png";
import VISA from "../Assets/Images/visa.png";
import { MdError } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notify from "../Assets/Images/New_images/notify.png";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Emptystate from "../Assets/Images/Empty-State.jpg";

const Accountsettings = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [settingGeneral, setSettigGeneral] = useState("");
  const [profilepermissionError, setProfilePermissionError] = useState("");
  const [profileEdit, setProfileEdit] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [currentpasswordfilter, setcurentpasswordfilter] = useState("");
  const initialValuesRef = useRef({});
  const [firstNameError, setFirstNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [mobilenoError, setMobileNoError] = useState("");
  const [AddressError, setAddressError] = useState("");
  const [value, setValue] = React.useState("1");
  const [countryCode, setCountryCode] = useState("91");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [show, setShow] = useState(false);
  // const [notification, setNotification] = useState([]);
  const [currentpassword, setCurrentpassword] = useState("");
  const [passworderrmsg, setPasswordErrormsg] = useState("");
  const [inputdisable, setInputDisable] = useState("");
  const [logoutformshow, setLogoutformshow] = useState(false);
  const [totalErrormsg, setTotalErrmsg] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [hideCurrentpassword, setHideCurrentPassword] = useState(true);
  const [showCurrentPassword, setShowCurrentpassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  // const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  // const [isLowerCaseEnough, setLowerCaseEnough] = useState(false);
  // const [isNumericEnough, setNumericEnough] = useState(false);

  useEffect(() => {
    setSettigGeneral(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      settingGeneral[0]?.is_owner == 1 ||
      settingGeneral[0]?.role_permissions[17]?.per_view == 1
    ) {
      setProfilePermissionError("");
    } else {
      setProfilePermissionError("Permission Denied");
    }
  }, [settingGeneral]);

  useEffect(() => {
    if (
      settingGeneral[0]?.is_owner == 1 ||
      settingGeneral[0]?.role_permissions[17]?.per_edit == 1
    ) {
      setProfileEdit("");
    } else {
      setProfileEdit("Permission Denied");
    }
  }, [settingGeneral]);

  // const cookies = new Cookies();

  // const tokenCookies = cookies.get('token');

  // const state = useSelector(state => state.UsersList)
  const stateData = useSelector((state) => state.createAccount);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

  useEffect(() => {
    dispatch({ type: "ALL-NOTIFICATION-LIST" });
  }, []);

  // useEffect(() => {
  //   if (
  //     state.login.UpdateNotificationMessage != null &&
  //     state.login.UpdateNotificationMessage != ""
  //   ) {
  //     dispatch({ type: "ALL-NOTIFICATION-LIST" });
  //     setTimeout(() => {
  //       dispatch({ type: "AFTER_UPDATE_NOTIFICATION", message: null });
  //       newNotificationIDs = [];
  //     }, 100);
  //   }
  // }, [state.login.UpdateNotificationMessage]);

  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };

  const MobileNumber = `${countryCode}${phone}`;

  const handleChanges = (event, newValue) => {
    setValue(newValue);
  };

  let newNotificationIDs =
    state.login.Notification &&
    state.login.Notification?.length > 0 &&
    state.login.Notification.filter(
      (notification) => notification.status === 1
    ).map((notification) => notification.id);

  // const newNotificationsCount = newNotificationIDs.length;

  const handleClosepopup = () => setShow(false);

  const handleShowpopup = () => {
    setShow(true);
    if (newNotificationIDs.length > 0 && newNotificationIDs != []) {
      setTimeout(() => {
        dispatch({
          type: "UPDATE-NOTIFICATION",
          payload: { id: newNotificationIDs },
        });
      }, 1000);
    }

    // dispatch({ type: 'ALL-NOTIFICATION-LIST' })
  };

  const handleName = (e) => {
    setFirstName(e.target.value);
    // const value = e.target.value;
    if (e.target.value.trim() === "") {
      setFirstNameError("Please Enter FirstName");
    } else {
      setFirstNameError("");
    }
  };

  const handlelastName = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      // setLastNameError(true);
      setLastName("");
    } else {
      // setLastNameError(false);
      setLastName(value);
    }
  };

  const handleEmailId = (e) => {
    setEmail(e.target.value);
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_MOBILE_ERROR" });

    const email = e.target.value;
    setEmailError("");

    const hasUpperCase = /[A-Z]/.test(email);

    if (hasUpperCase) {
      setEmailError("Email address cannot contain uppercase letters");
      return;
    }

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    const emailIDError = document.getElementById("emailIDError");

    if (emailIDError) {
      if (isValidEmail) {
        emailIDError.innerHTML = "";
      } else {
        emailIDError.innerHTML = "Invalid Email Id *";
      }
    }
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);

    dispatch({ type: "CLEAR_MOBILE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_MOBILE_ERROR" });

    // const phoneNumber = parseInt(phone, 10);
    // const pattern = new RegExp(/^\d{1,10}$/);
    // const isValidMobileNo = pattern.test(e.target.value);

    if (e.target.value.trim() === "") {
      setMobileNoError("Please Enter phone");
    }
    // else if (e.target.value > 10){
    //   setMobileNoError('Invalid mobile number ');
    // }
    else {
      setMobileNoError("");
    }

    // if (errorElement) {
    //   if (isValidMobileNo && e.target.value.length === 10) {
    //     errorElement.innerHTML = '';
    //   } else {
    //     errorElement.innerHTML = 'Invalid mobile number *';
    //   }
    // }
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);

    // const value = e.target.value;
    if (e.target.value.trim() === "") {
      setAddressError("Please Enter Address");
    } else {
      setAddressError("");
    }
  };

  useEffect(() => {
    if (state.createAccount.statusCodeTwo === 200) {
      dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODE_TWO_STEP" });
      }, 100);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUSCODE" });
      }, 200);
    }
  }, [state.createAccount.statusCodeTwo]);

  useEffect(() => {
    const FIlteredProfile = state?.createAccount?.accountList[0]?.user_details;

    if (FIlteredProfile) {
      const CustomerFirstName = FIlteredProfile.first_name;
      const CustomerLastName = FIlteredProfile.last_name;
      const PhoneNUmber = String(FIlteredProfile.mobileNo).slice(-10);
      const Countrycode = +String(FIlteredProfile.mobileNo).slice(
        0,
        String(FIlteredProfile.mobileNo).length - 10
      );
      const UserEmail = FIlteredProfile.email_Id;
      const UserAddress = FIlteredProfile.Address;
      const CustomerId = FIlteredProfile.id;
      const AdminProfile = FIlteredProfile.profile;
      const Currentpassword = FIlteredProfile.password;

      setId(CustomerId);
      setFirstName(CustomerFirstName);
      setLastName(CustomerLastName);
      setPhone(PhoneNUmber);
      setEmail(UserEmail);
      setAddress(UserAddress);
      setcurentpasswordfilter(Currentpassword);
      setCountryCode(Countrycode);

      // Set default image if AdminProfile is null or undefined
      if (AdminProfile) {
        setSelectedImage(AdminProfile);
      } else {
        setSelectedImage(null); // This will trigger the default image
      }

      initialValuesRef.current = {
        firstname: CustomerFirstName,
        lastname: CustomerLastName,
        phone: PhoneNUmber,
        email: UserEmail,
        Address: UserAddress,
        Profile: AdminProfile,
      };
    }
  }, [state?.createAccount?.accountList]);

  // const tokenCookies = cookies.get("token");

  useEffect(() => {
    if (state.createAccount.statusCodeForAccount == 200) {
      dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODE_ACCOUNT" });
      }, 2000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ACCOUNT_STATUS_CODE" });
      }, 1000);
    } else {
      console.log("create account not working");
    }
  }, [state.createAccount?.statusCodeForAccount]);

  useEffect(() => {
    dispatch({ type: "ACCOUNTDETAILS" });
  }, []);

  useEffect(() => {
    if (state.createAccount.statuscodeforUpdateprofile == 200) {
      dispatch({ type: "ACCOUNTDETAILS" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPDATE_STATUS_CODE_ACCOUNT" });
      }, 2000);
    } else {
      console.log("create account not working");
    }
  }, [state.createAccount?.statuscodeforUpdateprofile]);

  useEffect(() => {
    if (state.NewPass?.status_codes === 200) {
      setDisplayPassword(false);
      setHideCurrentPassword(true);
      setCurrentpassword("");
    }
  }, [state.NewPass?.status_codes]);

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
        setSelectedImage(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  const handlecurrentpassword = (e) => {
    setCurrentpassword(e.target.value);
    if (!e.target.value) {
      setPasswordErrormsg("Please Enter password");
    } else {
      setPasswordErrormsg("");
    }
  };

  const Passwordverify = async () => {
    var plainPassword = currentpassword;
    var storedHashPassword = currentpasswordfilter;

    if (!currentpassword) {
      setPasswordErrormsg("Enter Current Password'");
      return;
    }

    try {
          const hashedInputPassword = CryptoJS.SHA256(plainPassword).toString();

      const isMatch = hashedInputPassword === storedHashPassword;
      setInputDisable(isMatch);

      var toastStyle = {
        backgroundColor: "#E6F6E6",
        color: "black",
        width: "100%",
        borderRadius: "60px",
        height: "20px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        fontSize: 14,
        textAlign: "start",
        display: "flex",
        alignItems: "center",
        padding: "10px",
      };

      if (isMatch) {
        toast.success("Password matches!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: toastStyle,
        });

        setDisplayPassword(true);
        setHideCurrentPassword(false);
      } else {
        setPasswordErrormsg(
          "Incorrect password! Please enter the correct password!"
        );
      }
    } catch (error) {
      console.error("Error comparing passwords:", error);
    }
  };

  useEffect(() => {
    if (stateData.statusCodeForAccountList == 200) {
      const loginInfo = stateData.accountList[0].user_details;

      if (loginInfo) {
        const LoginId = loginInfo.id;
        // const NameId = loginInfo.Name;
        const phoneId = loginInfo.mobileNo;
        const emilidd = loginInfo.email_Id;
        const Is_Enable = loginInfo.isEnable;
        const Pass_word = loginInfo.password;

        const encryptedLoginId = CryptoJS.AES.encrypt(
          LoginId.toString(),
          "abcd"
        ).toString();
        // const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
        const encryptedphone = CryptoJS.AES.encrypt(
          phoneId.toString(),
          "abcd"
        ).toString();
        const encryptedemail = CryptoJS.AES.encrypt(
          emilidd.toString(),
          "abcd"
        ).toString();
        const encryptIsEnable = CryptoJS.AES.encrypt(
          Is_Enable.toString(),
          "abcd"
        ).toString();
        const encryptPassword = CryptoJS.AES.encrypt(
          Pass_word.toString(),
          "abcd"
        ).toString();

        localStorage.setItem("loginId", encryptedLoginId);
        // localStorage.setItem("NameId", encryptedname);
        localStorage.setItem("phoneId", encryptedphone);
        localStorage.setItem("emilidd", encryptedemail);
        localStorage.setItem("IsEnable", encryptIsEnable);
        localStorage.setItem("Password", encryptPassword);

        if (Is_Enable == 0) {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(true),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        } else {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(false),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        }
      } else {
        console.log("No data found");
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_ACCOUNT_STATUS_CODE" });
      }, 100);
    }
  }, [stateData.statusCodeForAccountList]);

  const handleShowLogout = () => {
    setLogoutformshow(true);
  };

  const handleCloseLogout = () => {
    setLogoutformshow(false);
  };

  const handleLogout = () => {
    dispatch({ type: "LOG_OUT" });

    const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
    localStorage.setItem("login", encryptData.toString());
    localStorage.setItem("loginId", "");
    // localStorage.setItem("NameId", "");
    localStorage.setItem("phoneId", "");
    localStorage.setItem("emilidd", "");
    // localStorage.setItem('currentPage', 'dashboard');
  };

  let hasChanges =
    firstname !== initialValuesRef.current.firstname ||
    lastname !== initialValuesRef.current.lastname ||
    phone !== initialValuesRef.current.phone ||
    email !== initialValuesRef.current.email ||
    Address !== initialValuesRef.current.Address ||
    selectedImage !== initialValuesRef.current.Profile;

  const handleSaveUpdate = () => {
    // const emailcapitalelement = document.getElementById("emailIDError");
    // const emailCapitalError = emailcapitalelement
    //   ? emailcapitalelement.innerHTML
    //   : "";
    // const phoneNumberError = document.getElementById("MobileNumberError");
    // const mobileError = phoneNumberError ? phoneNumberError.innerHTML : "";

    const emailElement = document.getElementById("emailIDError");
    const emailError = emailElement ? emailElement.innerHTML : "";

    // const phoneNumber = parseInt(phone, 10);
    const phonePattern = new RegExp(/^\d{10}$/);
    const isValidMobileNo = phonePattern.test(phone);

    if (!firstname || !MobileNumber || !email || !Address) {
      setTotalErrmsg("Please enter All field");
      setTimeout(() => {
        setTotalErrmsg("");
      }, 2000);
      return;
    }

    if (!firstname) {
      setFirstNameError("Please enter first name");
      return;
    }

    if (!email) {
      setEmailError("Please Enter Email id");
      return;
    }
    if (emailError === "Invalid Email Id *") {
      setEmailError("Please Enter a valid Email address");
      return;
    }

    if (!MobileNumber) {
      setMobileNoError("Please enter  mobile number");
      return;
    }
    if (!isValidMobileNo) {
      setMobileNoError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!Address) {
      setAddressError("Please enter Address");
      return;
    }

    if (hasChanges && firstname && MobileNumber && email && Address) {
      dispatch({
        type: "PROFILE-UPDATE",
        payload: {
          first_name: firstname,
          last_name: lastname,
          phone: MobileNumber,
          email_id: email,
          address: Address,
          id: id,
          profile: selectedImage,
        },
      });
    } else if (!hasChanges) {
      Swal.fire({
        icon: "info",
        title: "No Changes Detected",

        confirmButtonText: "Ok",
        // timer: 1000
      });
    }
  };

  // const encryptedPassword = localStorage.getItem("Password");

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const togglePasswordVisibilitys = () => {
    setShowCurrentpassword(!showCurrentPassword);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    const password = e.target.value;
    let errorMessage = "";

    // if (password.length >= 8) {
    //   setIsPasswordLongEnough(true);
    // } else {
    //   setIsPasswordLongEnough(false);
    // }

    // if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    //   setLowerCaseEnough(true);
    // } else {
    //   setLowerCaseEnough(false);
    // }

    // if (/\d/.test(password) && /[@$!%*?&]/.test(password)) {
    //   setNumericEnough(true);
    // } else {
    //   setNumericEnough(false);
    // }

    if (password.length < 8) {
      errorMessage = "Password must be at least 8 characters long.";
    } else if (!/[a-z]/.test(password)) {
      errorMessage = "Password must contain at least one lowercase letter.";
    } else if (!/[A-Z]/.test(password)) {
      errorMessage = "Password must contain at least one uppercase letter.";
    } else if (!/\d/.test(password)) {
      errorMessage = "Password must contain at least one number.";
    } else if (!/[@$!%*?&]/.test(password)) {
      errorMessage = "Password must contain at least one special character.";
    }
    setPasswordError(errorMessage);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handlePasswordchange = () => {
    // setShowOtpVerification(true)

    if (passwordError) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Password",
        text: passwordError,
        confirmButtonText: "Ok",
      });
      return;
    }

    if (password == !confirmpassword) {
      Swal.fire({
        icon: "warning",
        title: "Please Enter Confirm Password Same as Password",
        confirmButtonText: "Ok",
      });
      return;
    }

    if (password && confirmpassword) {
      dispatch({
        type: "FORGETPAGE",
        payload: {
          NewPassword: password,
          email: email,
          confirm_password: confirmpassword,
        },
      });
    
      if (inputRefs) {
        inputRefs.forEach((ref) => {
          if (ref.current) {
            ref.current.value = null;
          }
        });
      }
    
      setPassword("");
      setConfirmPassword("");
    }
     else {
      // setShowOtpVerification(false);
      Swal.fire({
        icon: "error",
        title: "Please Enter All Fields",
      });
    }
  };

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries,
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      className="container fade-in"
      style={{ marginLeft: "30px", marginTop: "30px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              marginLeft: "10px",
              fontSize: 24,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Profile
          </h3>
        </div>
        <div
          className="mr-3 me-5"
          onClick={handleShowpopup}
          style={{ cursor: "pointer" }}
        >
          <img src={Notify} alt="notification" />
        </div>
      </div>
      <Offcanvas
        placement="end"
        show={show}
        onHide={handleClosepopup}
        style={{ width: "69vh" }}
      >
        <Offcanvas.Title
          style={{
            background: "#2F74EB",
            color: "white",
            paddingLeft: "20px",
            height: "35px",
            fontSize: "16px",
            paddingTop: "5px",
          }}
        >
          Notification
        </Offcanvas.Title>
        <Offcanvas.Body
          style={{ maxHeight: "calc(100vh - 35px)", overflowY: "auto" }}
        >
          <div
            className="d-flex flex-row bd-highlight mb-3  item"
            style={{ marginTop: "-20px", fontSize: "15px" }}
          >
            {/* <div className="p-1 bd-highlight user-menu">
              <div>
                {newNotificationsCount > 0 && (
                  <p style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        backgroundColor: "#DBE1FB",
                        padding: "8px 12px",
                        color: "#222222",
                        borderRadius: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {newNotificationsCount} new notifications
                    </span>
                  </p>
                )}
              </div>
              <div className="container" style={{ marginTop: "30px" }}>
                <>
                  <div className="row mb-3">
                    {state.login.Notification &&
                      state.login.Notification?.length > 0 &&
                      state.login.Notification.map((val) => (
                        <div
                          key={val.id}
                          className="border-bottom"
                          style={{
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <p
                            style={{
                              color: val.status === 1 ? "black" : "#939393",
                              width: "75%",
                            }}
                          >
                            {val.message}
                          </p>
                          {val.status === 1 && (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                backgroundColor: "blue",
                                borderRadius: "50%",
                                marginTop: "5px",
                              }}
                            ></div>
                          )}
                        </div>
                      ))}
                  </div>
                </>
              </div>
            </div> */}
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex justify-content-start gap-3 align-items-center ">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto",
            borderRadius: 100,
            padding: 5,
            marginBottom: "20px",
          }}
        >
          <Image
            src={
              selectedImage
                ? typeof selectedImage === "string"
                  ? selectedImage
                  : URL.createObjectURL(selectedImage)
                : Men // Default image
            }
            roundedCircle
            style={{
              height: 50,
              width: 50,
              borderRadius: "50%",
            }}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop if the default image fails too
              e.target.src = Men; // Fallback to the default image if the provided src fails to load
            }}
          />

          <div style={{ marginLeft: "30px", marginTop: "10px" }}>
            {/* <h2 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Profile Picture</h2> */}
            <input
              type="file"
              className="sr-only"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
              id="upload-photo"
            />
            <h2
              className="hover-text-underline"
              onClick={() => document.getElementById("upload-photo").click()}
              style={{
                fontFamily: "Gilroy",
                fontSize: 20,
                fontWeight: 600,
                color: "#1E45E1",
                fontStyle: "normal",
                lineHeight: "normal",
                cursor: "pointer",
                "& :hover": { textDecoration: "underline" },
              }}
            >
              Update image
            </h2>
            <p
              style={{
                fontFamily: "Gilroy",
                fontSize: 16,
                fontWeight: 600,
                color: "#4B4B4B",
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              Max image size 20MB
            </p>
          </div>
        </div>
      </div>

      <Modal
        show={logoutformshow}
        onHide={handleCloseLogout}
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
            Logout?
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
          Are you sure you want Logout?
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
            onClick={handleCloseLogout}
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
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Modal.Footer>
      </Modal>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
          <TabList
            orientation={isSmallScreen ? "vertical" : "horizontal"}
            onChange={handleChanges}
            aria-label="lab API tabs example"
            style={{ marginLeft: "20px" }}
          >
            <Tab
              label="General "
              value="1"
              className="me-3"
              style={{
                fontSize: 16,
                fontFamily: "Gilroy",
                color: value === "1" ? "#222222" : "#4B4B4B",
                lineHeight: "normal",
                fontStyle: "normal",
                fontWeight: 500,
                textTransform: "none",
              }}
            />
            <Tab
              label="Account setting"
              value="2"
              className="me-3"
              style={{
                fontSize: 16,
                fontFamily: "Gilroy",
                color: value === "2" ? "#222222" : "#4B4B4B",
                lineHeight: "normal",
                fontStyle: "normal",
                fontWeight: 500,
                textTransform: "none",
              }}
            />
            <Tab
              label="Security"
              value="3"
              className="me-3"
              style={{
                fontSize: 16,
                fontFamily: "Gilroy",
                color: value === "3" ? "#222222" : "#4B4B4B",
                lineHeight: "normal",
                fontStyle: "normal",
                fontWeight: 500,
                textTransform: "none",
              }}
            />
            <Tab
              label="Subsription"
              value="4"
              className="me-3"
              style={{
                fontSize: 16,
                fontFamily: "Gilroy",
                color: value === "4" ? "#222222" : "#4B4B4B",
                lineHeight: "normal",
                fontStyle: "normal",
                fontWeight: 500,
                textTransform: "none",
              }}
            />
            <Tab
              label="Integration"
              value="5"
              className="me-3"
              style={{
                fontSize: 16,
                fontFamily: "Gilroy",
                color: value === "5" ? "#222222" : "#4B4B4B",
                lineHeight: "normal",
                fontStyle: "normal",
                fontWeight: 500,
                textTransform: "none",
              }}
            />
          </TabList>
        </Box>
        <TabPanel value="1">
          {profilepermissionError ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // height: "100vh",
              }}
            >
              {/* Image */}
              <img
                src={Emptystate}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              {profilepermissionError && (
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <MdError size={20} />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "red",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {profilepermissionError}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
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
                      First Name{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>

                    <Form.Control
                      style={{
                        padding: "20px",
                        marginTop: "10px",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                      }}
                      type="text"
                      placeholder="Enter your name"
                      value={firstname}
                      onChange={handleName}
                    />
                    {firstNameError.trim() !== "" && (
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "red",
                            marginTop: "3px",
                          }}
                        >
                          {firstNameError !== " " && (
                            <MdError
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            />
                          )}{" "}
                          {firstNameError}
                        </p>
                      </div>
                    )}
                    {/* {firstNameError && <p style={{ fontSize: '12px', color: 'red' }}>* First Name is Required</p>} */}
                  </Form.Group>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
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
                      Last Name{" "}
                    </Form.Label>
                    <Form.Control
                      style={{
                        padding: "20px",
                        marginTop: "10px",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                      }}
                      type="text"
                      placeholder="Enter Lastname"
                      value={lastname}
                      onChange={handlelastName}
                    />
                  </Form.Group>
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
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
                      Email{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>

                    <Form.Control
                      style={{
                        padding: "20px",
                        marginTop: "10px",
                        fontSize: 16,
                        fontWeight: 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                        borderColor: EmailError ? "red" : "",
                      }}
                      type="text"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleEmailId}
                    />
                    {EmailError.trim() !== "" && (
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "red",
                            marginTop: "3px",
                          }}
                        >
                          {EmailError !== " " && (
                            <MdError
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            />
                          )}{" "}
                          {EmailError}
                        </p>
                      </div>
                    )}
                    {/* <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
        {EmailError && <p style={{ fontSize: '12px', color: 'red' }}>*Email is Required</p>} */}
                  </Form.Group>
                  {state.createAccount?.emailError ? (
                    <div className="d-flex align-items-center p-1">
                      <MdError style={{ color: "red", marginRight: "5px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: 12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {state.createAccount.emailError}
                      </label>
                    </div>
                  ) : null}
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
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
                      Mobile Number{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Select
                        value={countryCode}
                        id="vendor-select-pg"
                        // onChange={handleCountryCodeChange}
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: "8px 0 0 8px",
                          height: 66,
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: countryCode ? 600 : 500,
                          boxShadow: "none",
                          backgroundColor: "#fff",
                          maxWidth: 90,
                          paddingRight: 10,
                          padding: "20px",
                          marginTop: "10px",
                        }}
                      >
                        {/* {state.UsersList?.countrycode?.country_codes?.map(
                          (item) => {
                            return (
                              <>
                                <option value={item.country_code}>
                                  +{item.country_code}
                                 
                                </option>
                               
                              </>
                            );
                          }
                        )} */}
                         <option >
                                  +{countryCode}
                                 
                                </option>

                      </Form.Select>
                      <Form.Control
                        style={{
                          padding: "20px",
                          marginTop: "10px",
                          fontSize: 16,
                          fontWeight: 500,
                          color: "rgba(34, 34, 34, 1)",
                          fontFamily: "Gilroy",
                        }}
                        type="text"
                        placeholder="Enter phone"
                        maxLength={10}
                        value={phone}
                        onChange={handlePhone}
                      />
                    </InputGroup>
                    {mobilenoError.trim() !== "" && (
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "red",
                            marginTop: "3px",
                          }}
                        >
                          {mobilenoError !== " " && (
                            <MdError
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            />
                          )}{" "}
                          {mobilenoError}
                        </p>
                      </div>
                    )}
                  </Form.Group>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
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
                    Address{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>

                  <Form.Control
                    style={{
                      padding: "10px",
                      marginTop: "10px",
                      fontSize: 16,
                      fontWeight: 500,
                      height: "150px",
                      color: "rgba(34, 34, 34, 1)",
                      fontFamily: "Gilroy",
                    }}
                    type="text"
                    placeholder="Enter Address"
                    value={Address}
                    onChange={handleAddress}
                  />
                  {AddressError.trim() !== "" && (
                    <div>
                      <p
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginTop: "3px",
                        }}
                      >
                        {AddressError !== " " && (
                          <MdError
                            style={{
                              fontSize: "12px",
                              color: "red",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          />
                        )}{" "}
                        {AddressError}
                      </p>
                    </div>
                  )}
                </Form.Group>
              </div>

              {totalErrormsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "15px", color: "red", marginTop: "3px" }}
                  >
                    {totalErrormsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      />
                    )}{" "}
                    {totalErrormsg}
                  </p>
                </div>
              )}
              {/* <div style={{ marginTop: '30px' }}>
    <Button onClick={handleSaveUpdate} disabled={!hasChanges} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}>
      Save Changes</Button>
  </div> */}
              <div style={{ marginTop: "30px" }}>
                <Button
                  onClick={handleSaveUpdate}
                  disabled={!hasChanges || profileEdit} // Disable if no changes or if profileEdit is true
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 16,
                    fontWeight: 500,
                    backgroundColor: "#1E45E1",
                    color: "white",
                    height: 56,
                    letterSpacing: 1,
                    borderRadius: 12,
                    width: 170,
                    padding: "18px, 10px, 18px, 10px",
                  }}
                >
                  Save Changes
                </Button>
              </div>

              {/* <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'row', cursor: "pointer" }} onClick={handleLogout}>

    <div> <img src={Logout} height={20} width={20} /> </div>
    <p style={{ color: 'red', fontWeight: 500, fontSize: '18px', paddingBottom: '5px', marginLeft: '5px' }}>Log out</p>
  </div> */}
            </>
          )}
        </TabPanel>

        {/* password update  */}

        <TabPanel value="2">
          <>
            {profilepermissionError ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Image */}
                <img
                  src={Emptystate}
                  alt="Empty State"
                  style={{ maxWidth: "100%", height: "auto" }}
                />

                {/* Permission Error */}
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <MdError size={20} />
                  <span>{profilepermissionError}</span>
                </div>
              </div>
            ) : (
              <>
                <hr style={{ border: "1px solid #ced4da", width: "70%" }} />

                {hideCurrentpassword && (
                  <>
                    <div
                      className="mb-3"
                      style={{ display: "flex", flexDirection: "row" }}
                    >
                      <div className="me-3 col-lg-4 col-md-5 col-sm-10 col-xs-10">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "rgba(34, 34, 34, 1)",
                            fontFamily: "Gilroy",
                          }}
                        >
                          Current Password
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            value={currentpassword}
                            onChange={handlecurrentpassword}
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Password"
                            style={{
                              position: "relative",
                              boxShadow: "none",
                              border: passworderrmsg
                                ? "1px solid red"
                                : "1px solid rgba(224, 236, 255, 1)",
                              fontSize: 16,
                              fontWeight: 500,
                              color: "rgba(34, 34, 34, 1)",
                              fontFamily: "Gilroy",
                            }}
                          />
                          <InputGroup.Text
                            onClick={togglePasswordVisibilitys}
                            style={{
                              background: "transparent",
                              border: passworderrmsg
                                ? "1px solid red"
                                : "1px solid rgba(224, 236, 255, 1)",
                              cursor: "pointer",
                            }}
                          >
                            {showCurrentPassword ? (
                              <Eye size="20" color="rgba(30, 69, 225, 1)" />
                            ) : (
                              <EyeSlash
                                size="20"
                                color="rgba(30, 69, 225, 1)"
                              />
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                      </div>

                      <div style={{ marginTop: "30px" }}>
                        <Button
                          disabled={profileEdit}
                          onClick={Passwordverify}
                          style={{
                            fontFamily: "Montserrat",
                            fontSize: 16,
                            fontWeight: 500,
                            backgroundColor: "#1E45E1",
                            color: "white",
                            height: 40,
                            letterSpacing: 1,
                            borderRadius: 12,
                            width: 80,
                            padding: "4px 4px",
                          }}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>

                    {passworderrmsg.trim() !== "" && (
                      <div>
                        <p
                          style={{
                            fontSize: "15px",
                            color: "red",
                            marginTop: "3px",
                          }}
                        >
                          {passworderrmsg !== " " && (
                            <MdError
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            />
                          )}{" "}
                          {passworderrmsg}
                        </p>
                      </div>
                    )}
                  </>
                )}

                {displayPassword && (
                  <>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div className="me-3 col-lg-4 col-md-5 col-sm-10 col-xs-10">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "rgba(34, 34, 34, 1)",
                            fontFamily: "Gilroy",
                          }}
                        >
                          New Password
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            disabled={!inputdisable}
                            value={password}
                            onChange={handlePassword}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            style={{
                              position: "relative",
                              boxShadow: "none",
                              border: "1px solid rgba(224, 236, 255, 1)",
                              fontSize: 16,
                              fontWeight: 500,
                              color: "rgba(34, 34, 34, 1)",
                              fontFamily: "Gilroy",
                              borderRight: "none",
                            }}
                          />
                          <InputGroup.Text
                            onClick={togglePasswordVisibility}
                            style={{
                              background: "transparent",
                              border: "1px solid rgba(224, 236, 255, 1)",
                              cursor: "pointer",
                            }}
                          >
                            {showPassword ? (
                              <Eye size="20" color="rgba(30, 69, 225, 1)" />
                            ) : (
                              <EyeSlash
                                size="20"
                                color="rgba(30, 69, 225, 1)"
                              />
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                      </div>

                      <div className="col-lg-4 col-md-5 col-sm-10 col-xs-10">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "rgba(34, 34, 34, 1)",
                            fontFamily: "Gilroy",
                          }}
                        >
                          Confirm Password
                        </Form.Label>
                        <InputGroup>
                          <Form.Control
                            size="lg"
                            disabled={!inputdisable}
                            value={confirmpassword}
                            onChange={handleConfirmPassword}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Password"
                            style={{
                              position: "relative",
                              boxShadow: "none",
                              border: "1px solid rgba(224, 236, 255, 1)",
                              fontSize: 16,
                              fontWeight: 500,
                              color: "rgba(34, 34, 34, 1)",
                              fontFamily: "Gilroy",
                              borderRight: "none",
                            }}
                          />
                          <InputGroup.Text
                            onClick={toggleConfirmPasswordVisibility}
                            style={{
                              background: "transparent",
                              border: "1px solid rgba(224, 236, 255, 1)",
                              cursor: "pointer",
                            }}
                          >
                            {showConfirmPassword ? (
                              <Eye size="20" color="rgba(30, 69, 225, 1)" />
                            ) : (
                              <EyeSlash
                                size="20"
                                color="rgba(30, 69, 225, 1)"
                              />
                            )}
                          </InputGroup.Text>
                        </InputGroup>
                      </div>
                    </div>
                    <div style={{ marginTop: "30px" }}>
                      <Button
                        onClick={handlePasswordchange}
                        disabled={!inputdisable || profileEdit}
                        style={{
                          fontFamily: "Montserrat",
                          fontSize: 16,
                          fontWeight: 500,
                          backgroundColor: "#1E45E1",
                          color: "white",
                          height: 56,
                          letterSpacing: 1,
                          borderRadius: 12,
                          width: 170,
                          padding: "18px, 10px, 18px, 10px",
                        }}
                      >
                        Save Changes
                      </Button>
                    </div>
                  </>
                )}

                <div style={{ marginBottom: "100px" }}></div>
              </>
            )}
          </>
        </TabPanel>

        <TabPanel value="3">
          {/* <Profile_Security profilepermissionError={profilepermissionError} /> */}
        </TabPanel>

        <TabPanel value="4">
          {profilepermissionError ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Image */}
              <img
                src={Emptystate}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              <div
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <MdError size={20} />
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {profilepermissionError}
                </span>
              </div>
            </div>
          ) : (
            <div>
              <div
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "10px",
                  width: "370px",
                  height: "246px",
                }}
              >
                <div
                  style={{
                    marginLeft: "10px",
                    marginTop: "10px",
                    paddingLeft: "8px",
                    paddingTop: "7px",
                    height: 40,
                    width: 40,
                    borderRadius: "50%",
                    backgroundColor: "#E7F1FF",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
  d="M2 10.99V5.71c0-1.33.77-1.65 1.71-.71L6.3 7.59c.39.39 1.03.39 1.41 0L11.29 4a.996.996 0 0 1 1.41 0l3.59 3.59c.39.39 1.03.39 1.41 0L20.29 5c.94-.94 1.71-.62 1.71.71v9.59c0 3-2 5-5 5H7c-2.76 0-5-2.24-5-5"
  stroke="#1e45e1"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
/>
                  </svg>
                </div>

                <p
                  style={{
                    color: "#222222",
                    paddingLeft: "10px",
                    paddingTop: "10px",
                    fontFamily: "Gilroy",
                    fontSize: 14,
                    fontWeight: 600,
                    lineHeight: "16.7px",
                  }}
                >
                  Your plan is active
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      color: "#4B4B4B",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "19.2px",
                    }}
                  >
                    Amount
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      color: "#222222",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "19.2px",
                    }}
                  >
                    ₹599
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      color: "#4B4B4B",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "19.2px",
                    }}
                  >
                    Next payment
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      color: "#222222",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "19.2px",
                    }}
                  >
                    12 September 2024
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      color: "#4B4B4B",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "19.2px",
                    }}
                  >
                    Payment Method
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      color: "#222222",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "19.2px",
                    }}
                  >
                    <img
                      className="mb-1 me-2"
                      src={VISA}
                      height={12}
                      width={30}
                    />{" "}
                    VISA ***60{" "}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                  }}
                >
                  <Button
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: "19.2px",
                      backgroundColor: "white",
                      border: "1px solid #1E45E1",
                      color: "#1E45E1",
                      height: 40,
                      letterSpacing: 1,
                      borderRadius: 8,
                      width: 161,
                      padding: "4px  4px",
                    }}
                  >
                    Cancel Plan
                  </Button>
                  <Button
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 13,
                      fontWeight: 600,
                      lineHeight: "19.2px",
                      backgroundColor: "#1E45E1",
                      color: "#ffffff",
                      height: 40,
                      letterSpacing: 1,
                      borderRadius: 8,
                      width: 161,
                      padding: "4px  4px",
                    }}
                  >
                    Manage Plan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabPanel>

        <TabPanel value="5">
          {profilepermissionError ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Image */}
              <img
                src={Emptystate}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              <div
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <MdError size={20} />
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {profilepermissionError}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "10px",
                  width: "350px",
                  height: "206px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#222",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    marginTop: "20px",
                  }}
                >
                  {/* <p style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>sms</p> */}
                  <div
                    style={{
                      marginLeft: "10px",
                      paddingLeft: "10px",
                      paddingTop: "10px",
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      backgroundColor: "#E7F1FF",
                    }}
                  >
                    <img
                      src={`data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'><path d='M8.5 19H8c-4 0-6-1-6-6V8c0-4 2-6 6-6h8c4 0 6 2 6 6v5c0 4-2 6-6 6h-.5c-.31 0-.61.15-.8.4l-1.5 2c-.66.88-1.74.88-2.4 0l-1.5-2c-.16-.22-.53-.4-.8-.4Z' stroke='%231e45e1' stroke-width='1.5' stroke-miterlimit='10' stroke-linecap='round' stroke-linejoin='round'></path><path d='M15.996 11h.01M11.995 11h.01M7.995 11h.008' stroke='%231e45e1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'></path></svg>`}
                      alt="Custom SVG"
                    />
                  </div>
                  <Button
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: "white",
                      border: "2px solid #1E45E1",
                      color: "#1E45E1",
                      height: 40,
                      letterSpacing: 1,
                      borderRadius: 12,
                      width: 140,
                      padding: "4px  4px",
                    }}
                  >
                    + Buy Credits
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginTop: "15px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 17,
                      fontFamily: "Gilroy",
                      color: "black",
                      lineHeight: "16.7px",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}
                  >
                    SMS Credits
                  </p>
                </div>
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "19.2px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  <p>
                    Enhance your customer communication with seamless sms
                    integration.Instantly reach your audience with personalised
                    messages alerts and updates all within platforms
                  </p>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "10px",
                  width: "350px",
                  height: "206px",
                  marginLeft: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#222",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    marginTop: "20px",
                  }}
                >
                  {/* <p style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Whatsapp</p> */}
                  <div
                    style={{
                      marginLeft: "10px",
                      paddingLeft: "10px",
                      paddingTop: "8px",
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      backgroundColor: "#E7F1FF",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill="#37d67a"
                        d="M21.98 11.41c-.34-5.8-5.61-10.27-11.68-9.27-4.18.69-7.53 4.08-8.18 8.26-.38 2.42.12 4.71 1.21 6.6l-.89 3.31c-.2.75.49 1.43 1.23 1.22l3.26-.9c1.48.87 3.21 1.37 5.06 1.37 5.64 0 10.32-4.97 9.99-10.59zm-5.1 4.31a2.279 2.279 0 01-1.16 1.1c-.3.13-.63.19-.98.19-.51 0-1.06-.12-1.63-.37a9.16 9.16 0 01-1.72-.99c-.58-.42-1.12-.89-1.64-1.4-.52-.52-.98-1.07-1.4-1.64-.41-.57-.74-1.14-.98-1.71-.24-.57-.36-1.12-.36-1.64 0-.34.06-.67.18-.97.12-.31.31-.59.58-.84.32-.32.67-.47 1.04-.47.14 0 .28.03.41.09.13.06.25.15.34.28l1.16 1.64c.09.13.16.24.2.35.05.11.07.21.07.31 0 .12-.04.24-.11.36s-.16.24-.28.36l-.38.4c-.06.06-.08.12-.08.2 0 .04.01.08.02.12.02.04.03.07.04.1.09.17.25.38.47.64a13.482 13.482 0 001.53 1.53c.26.22.48.37.65.46.03.01.06.03.09.04.04.02.08.02.13.02.09 0 .15-.03.21-.09l.38-.38c.13-.13.25-.22.36-.28.12-.07.23-.11.36-.11.1 0 .2.02.31.07.11.05.23.11.35.2l1.66 1.18c.13.09.22.2.28.32.05.13.08.25.08.39-.06.17-.1.36-.18.54z"
                      ></path>
                    </svg>
                  </div>
                  <Button
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: "white",
                      border: "2px solid #1E45E1",
                      color: "#1E45E1",
                      height: 40,
                      letterSpacing: 1,
                      borderRadius: 8,
                      width: 140,
                      padding: "4px  4px",
                    }}
                  >
                    + Buy Credits
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginTop: "15px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 17,
                      fontFamily: "Gilroy",
                      color: "black",
                      lineHeight: "16.7px",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}
                  >
                    Whatsapp Credits
                  </p>
                </div>
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "19.2px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  <p>
                    Take your customer interaction to the next level with
                    whatsapp Credits, connect with your audience where they
                    already are-on Whatsapp{" "}
                  </p>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #DCDCDC",
                  borderRadius: "10px",
                  width: "350px",
                  height: "206px",
                  marginLeft: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    color: "#222",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    fontWeight: 500,
                    marginTop: "20px",
                  }}
                >
                  {/* <p style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Whatsapp</p> */}
                  <div
                    style={{
                      marginLeft: "10px",
                      paddingLeft: "10px",
                      paddingTop: "8px",
                      height: 40,
                      width: 40,
                      borderRadius: "50%",
                      backgroundColor: "#E7F1FF",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM12 14.5c-5.01 0-9.09 3.36-9.09 7.5 0 .28.22.5.5.5h17.18c.28 0 .5-.22.5-.5 0-4.14-4.08-7.5-9.09-7.5Z"
                        fill="#1e45e1"
                      ></path>
                    </svg>
                  </div>
                  <Button
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      fontWeight: 600,
                      backgroundColor: "white",
                      border: "2px solid #1E45E1",
                      color: "#1E45E1",
                      height: 40,
                      letterSpacing: 1,
                      borderRadius: 12,
                      width: 140,
                      padding: "4px  4px",
                    }}
                  >
                    + Buy Credits
                  </Button>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    marginTop: "15px",
                  }}
                >
                  <p
                    style={{
                      fontSize: 17,
                      fontFamily: "Gilroy",
                      color: "black",
                      lineHeight: "16.7px",
                      fontStyle: "normal",
                      fontWeight: 600,
                    }}
                  >
                    Kyc Credits
                  </p>
                </div>
                <div
                  style={{
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    fontFamily: "Gilroy",
                    color: "#4B4B4B",
                    lineHeight: "19.2px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: 13,
                  }}
                >
                  <p>
                    Streamline your onboarding process with kyc credits .quickly
                    and securely verify customer identities ensuring compliance
                    and building trust{" "}
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabPanel>

        <div
          style={{
            marginTop: "50px",
            marginLeft: "30px",
            display: "flex",
            flexDirection: "row",
            cursor: "pointer",
          }}
          onClick={handleShowLogout}
        >
          <div>
            {" "}
            <img src={Logout} height={20} width={20} />{" "}
          </div>
          <p
            style={{
              color: "red",
              fontWeight: 500,
              fontSize: "18px",
              paddingBottom: "5px",
              marginLeft: "5px",
            }}
          >
            Log out
          </p>
        </div>
      </TabContext>
    </div>
  );
};
export default Accountsettings;
