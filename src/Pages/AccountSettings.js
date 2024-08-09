import React, { useRef, useState, useEffect } from "react";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import imageCompression from 'browser-image-compression';
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Button from 'react-bootstrap/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Men from '../Assets/Images/Rectangle 2.png';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Eye, EyeSlash } from 'iconsax-react';
import Logout from '../Assets/Images/LogoutCurve-Linear-32px.png'


const Accountsettings = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState('');


  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const cookies = new Cookies()
  console.log("state for settings", state)

  // const tokenCookies = cookies.get('token');

  // const state = useSelector(state => state.UsersList)
  const stateData = useSelector(state => state.createAccount)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [selectedTab, setSelectedTab] = useState('Personal');
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [Address, setAddress] = useState("")
  const [Country, setCountry] = useState("")
  const [City, setCity] = useState("")
  const [statee, setStatee] = useState("")
  const [id, setId] = useState("")
  const [updateval, setUpdateval] = useState("")
  const [login_Password, setLogin_Password] = useState("")

  const initialValuesRef = useRef({});

  // const initialValues = {
  //   firstname: '', 
  //   lastname: '',  
  //   phone: '',    
  //   email: '',     
  //   Address: ''   
  // };
  
  // const [firstname, setFirstName] = useState(initialValues.firstname);
  // const [lastname, setLastName] = useState(initialValues.lastname);
  // const [phone, setPhone] = useState(initialValues.phone);
  // const [email, setEmail] = useState(initialValues.email);
  // const [Address, setAddress] = useState(initialValues.Address);
  

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [EmailError, setEmailError] = useState(false);
  const [mobilenoError, setMobileNoError] = useState(false);
  const [AddressError, setAddressError] = useState(false);
  const [error , setError] = useState(false)
  const [value, setValue] = React.useState('1');



  const handleChanges = (event, newValue) => {
    setValue(newValue);
  }



  const handleName = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setFirstNameError(true);
      setFirstName('');
    } else {
      setFirstNameError(false);
      setFirstName(value);
    }
  };

  const handlelastName = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setLastNameError(true);
      setLastName('');
    } else {
      setLastNameError(false);
      setLastName(value);
    }
  }

  const handleEmailId = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setEmailError(true);
      setEmail('');
    } else {
      setEmailError(false);
      setEmail(value);
    }
  }

  const handlePhone = (e) => {
    const value = e.target.value.trim();
  
    if (value === '') {
      setMobileNoError(true);
      setPhone('');
    } else if (value.length <= 10) {  // Allow input as long as it's 10 digits or less
      setMobileNoError(false);
      setPhone(value);
    } else {
      // If the length is greater than 10, do nothing to prevent adding more digits
      setPhone(value.slice(0, 10)); // Optionally trim it to 10 digits if needed
    }
  };
  
  

  const handleAddress = (e) => {
    const value = e.target.value;
    if (value.trim() === '') {
      setAddressError(true);
      setAddress('');
    } else {
      setAddressError(false);
      setAddress(value);
    }
  }



  useEffect(() => {
    if (state.createAccount.statusCodeTwo === 200) {
      dispatch({ type: 'ACCOUNTDETAILS' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_TWO_STEP' })
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUSCODE' });
      }, 200);
    }

  }, [state.createAccount.statusCodeTwo])


  // useEffect(() => {
  //     const UserIsEnable = state.createAccount.accountList[0].user_details.isEnable


  //     if (UserIsEnable === 1) {
  //         setIsChecked(true);

  //         localStorage.setItem("IsEnable", '');


  //     } else {
  //         setIsChecked(false);
  //     }
  // }, [state.createAccount.accountList])


  useEffect(() => {

    const FIlteredProfile = state?.createAccount?.accountList[0].user_details
    console.log("FIlteredProfile", FIlteredProfile);
    if (FIlteredProfile) {
      const CustomerFirstName = FIlteredProfile.first_name
      const CustomerLastName = FIlteredProfile.last_name
      const PhoneNUmber = FIlteredProfile.mobileNo
      const UserEmail = FIlteredProfile.email_Id
      const UserAddress = FIlteredProfile.Address
      const CustomerId = FIlteredProfile.id
      const AdminProfile = FIlteredProfile.profile

      setId(CustomerId)
      setFirstName(CustomerFirstName)
      setLastName(CustomerLastName)
      setPhone(PhoneNUmber)
      setEmail(UserEmail)
      setAddress(UserAddress)
      setProfilePicture(Men)
      setSelectedImage(AdminProfile)


      initialValuesRef.current = {
        firstname: CustomerFirstName,
        lastname: CustomerLastName,
        phone: PhoneNUmber,
        email: UserEmail,
        Address: UserAddress,
      };

    }


  }, [state?.createAccount?.accountList])


  console.log("details", firstname, lastname, email, phone)

  const tokenCookies = cookies.get('token');


  // console.log("state.createAccount.statusCodeForAccount == 200",state.createAccount.statusCodeForAccount == 200)


  useEffect(() => {
    if (state.createAccount.statusCodeForAccount == 200) {
      dispatch({ type: 'ACCOUNTDETAILS' })
      console.log("accountdetails get working");
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_ACCOUNT' })
      }, 2000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
      }, 1000)

    } else {
      console.log("create account not working")
    }
  }, [state.createAccount?.statusCodeForAccount])

  useEffect(() => {
    dispatch({ type: 'ACCOUNTDETAILS' })
  }, [])

  useEffect(() => {
    if (state.createAccount.statuscodeforUpdateprofile == 200) {
      dispatch({ type: 'ACCOUNTDETAILS' })
      console.log("accountdetails get working");
      setTimeout(() => {
        dispatch({ type: 'CLEAR_UPDATE_STATUS_CODE_ACCOUNT' })
      }, 2000)

      // setTimeout(() => {
      //     dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
      // },


    } else {
      console.log("create account not working")
    }
  }, [state.createAccount?.statuscodeforUpdateprofile])


  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setSelectedImage(compressedFile);
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };


  useEffect(() => {
    if (stateData.statusCodeForAccountList == 200) {

      const loginInfo = stateData.accountList[0].user_details

      console.log("loginInfo", loginInfo)
      if (loginInfo) {
        const LoginId = loginInfo.id;
        const NameId = loginInfo.Name;
        const phoneId = loginInfo.mobileNo;
        const emilidd = loginInfo.email_Id;
        const Is_Enable = loginInfo.isEnable;
        const Pass_word = loginInfo.password;

        const encryptedLoginId = CryptoJS.AES.encrypt(LoginId.toString(), 'abcd').toString();
        // const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
        const encryptedphone = CryptoJS.AES.encrypt(phoneId.toString(), 'abcd').toString();
        const encryptedemail = CryptoJS.AES.encrypt(emilidd.toString(), 'abcd').toString();
        const encryptIsEnable = CryptoJS.AES.encrypt(Is_Enable.toString(), 'abcd').toString();
        const encryptPassword = CryptoJS.AES.encrypt(Pass_word.toString(), 'abcd').toString();

        localStorage.setItem("loginId", encryptedLoginId);
        // localStorage.setItem("NameId", encryptedname);
        localStorage.setItem("phoneId", encryptedphone);
        localStorage.setItem("emilidd", encryptedemail);
        localStorage.setItem("IsEnable", encryptIsEnable);
        localStorage.setItem("Password", encryptPassword);

        console.log("Is_Enable *****", Is_Enable)

        if (Is_Enable == 0) {
          const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd');
          localStorage.setItem("login", encryptData.toString());
        } else {
          const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd');
          localStorage.setItem("login", encryptData.toString());
        }
      } else {
        console.log("No data found")
      }
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE' })
      }, 100)
    }

  }, [stateData.statusCodeForAccountList])


  const handleLogout = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want LogOut?',
      confirmButtonText: 'Ok',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({ type: 'LOG_OUT' })

        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd')
        localStorage.setItem("login", encryptData.toString())
        localStorage.setItem("loginId", '')
        localStorage.setItem("NameId", '')
        localStorage.setItem("phoneId", '')
        localStorage.setItem("emilidd", '')
      }
    })
  }

  let hasChanges =
  firstname !== initialValuesRef.current.firstname ||
  lastname !== initialValuesRef.current.lastname ||
  phone !== initialValuesRef.current.phone ||
  email !== initialValuesRef.current.email ||
  Address !== initialValuesRef.current.Address;



  const handleSaveUpdate = () => {

    const hasChanges =
    firstname !== initialValuesRef.current.firstname ||
    lastname !== initialValuesRef.current.lastname ||
    phone !== initialValuesRef.current.phone ||
    email !== initialValuesRef.current.email ||
    Address !== initialValuesRef.current.Address;
    
    if (hasChanges && firstname  && phone && email && Address) {
      dispatch({
        type: 'PROFILE-UPDATE',
        payload: { first_name: firstname, last_name: lastname, phone: phone, email_id: email, address: Address, id: id, profile: selectedImage }
      });
    } else if (!hasChanges) {
      Swal.fire({
        icon: 'info',
        title: 'No Changes Detected',
        timer: 1000
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        timer: 1000
      });
    }
  };
  

  const [password, setPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };


  const [passwordError, setPasswordError] = useState('');
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(false);
  const [isLowerCaseEnough, setLowerCaseEnough] = useState(false);
  const [isNumericEnough, setNumericEnough] = useState(false);


  const handlePassword = (e) => {
    setPassword(e.target.value);
    const password = e.target.value;
    let errorMessage = '';

    if (password.length >= 8) {
      setIsPasswordLongEnough(true);
    } else {
      setIsPasswordLongEnough(false);
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      setLowerCaseEnough(true);
    } else {
      setLowerCaseEnough(false);
    }

    if (/\d/.test(password) && /[@$!%*?&]/.test(password)) {
      setNumericEnough(true);
    } else {
      setNumericEnough(false);
    }


    if (password.length < 8) {
      errorMessage = 'Password must be at least 8 characters long.';
    } else if (!/[a-z]/.test(password)) {
      errorMessage = 'Password must contain at least one lowercase letter.';
    } else if (!/[A-Z]/.test(password)) {
      errorMessage = 'Password must contain at least one uppercase letter.';
    } else if (!/\d/.test(password)) {
      errorMessage = 'Password must contain at least one number.';
    } else if (!/[@$!%*?&]/.test(password)) {
      errorMessage = 'Password must contain at least one special character.';
    }
    setPasswordError(errorMessage);
  };


  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

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
        icon: 'warning',
        title: 'Invalid Password',
        text: passwordError,
        confirmButtonText: 'Ok'
      });
      return;
    }



    if (password == !confirmpassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter Confirm Password Same as Password',
        confirmButtonText: 'Ok'
      });
      return;
    }


    if (password && confirmpassword) {
      dispatch({ type: 'FORGETPAGE', payload: { NewPassword: password, email: email, confirm_password: confirmpassword } });
      inputRefs && inputRefs.forEach(ref => {
        if (ref.current) {
          ref.current.value = null;
        }

      });

      setPassword('');
      setConfirmPassword('');

    } else {

      // setShowOtpVerification(false);
      Swal.fire({
        icon: 'error',
        title: 'Please Enter All Fields',

      });

    }
  };



  return (

    <div className="container" style={{ marginLeft: '30px' }}>
      <h3 style={{ marginLeft: '10px', fontSize: 24, fontWeight: 600, fontFamily: "Gilroy" }}>Account Settings</h3>


      <div className='d-flex justify-content-start gap-3 align-items-center '>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5, marginBottom: '20px' }}>


          <Image
            src={selectedImage ? (typeof selectedImage == 'string' ? selectedImage : URL.createObjectURL(selectedImage)) : Men}
            roundedCircle
            style={{
              height: 50,
              width: 50,
              borderRadius: '50%',
            }}
          />
          <div style={{ marginLeft: '30px', marginTop: '10px' }}>
            <h2 style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Profile Picture</h2>
            <input type="file" className="sr-only" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} id="upload-photo" />
            <p onClick={() => document.getElementById('upload-photo').click()} style={{ fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600, color: "#1E45E1", fontStyle: 'normal', lineHeight: 'normal' }}>Update image</p>

          </div>
        </div>
      </div>


      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <TabList onChange={handleChanges} aria-label="lab API tabs example" style={{ marginLeft: '20px' }}>
            <Tab label="Edit profile" value="1" className='me-3' style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
            <Tab label="Account setting" value="2" className='me-3' style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>First Name <span style={{color:'red', fontSize:'20px'}}>*</span></Form.Label>

                  <Form.Control
                    style={{
                      padding: '20px', marginTop: '10px', fontSize: 16,
                      fontWeight: 500,
                      color: "rgba(34, 34, 34, 1)",
                      fontFamily: "Gilroy", borderColor: firstNameError ? 'red' : ''
                    }}
                    type="text"
                    placeholder='Enter your name'
                    value={firstNameError ? '' : firstname}
                    onChange={handleName}
                  />
                  {firstNameError && <p style={{ fontSize: '12px', color: 'red' }}>* First Name is Required</p>}
                </Form.Group>
              </div>

              <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Last Name *(optional)</Form.Label>
                  <Form.Control
                    style={{
                      padding: '20px', marginTop: '10px', fontSize: 16,
                      fontWeight: 500,
                      color: "rgba(34, 34, 34, 1)",
                      fontFamily: "Gilroy"
                    }}
                    type="text"
                    placeholder="Enter Lastname"
                    value={lastname}
                    onChange={handlelastName}
                  />
                </Form.Group>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Email <span style={{color:'red', fontSize:'20px'}}>*</span></Form.Label>

                  <Form.Control
                    style={{
                      padding: '20px', marginTop: '10px', fontSize: 16,
                      fontWeight: 500,
                      color: "rgba(34, 34, 34, 1)",
                      fontFamily: "Gilroy", borderColor: EmailError ? 'red' : ''
                    }}
                    type="text"
                    placeholder="Enter email"
                    value={EmailError ? '' : email}
                    onChange={handleEmailId}
                  />
 {EmailError && <p style={{ fontSize: '12px', color: 'red' }}>*Email is Required</p>}
                </Form.Group>
              </div>


              <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Mobile Number <span style={{color:'red', fontSize:'20px'}}>*</span></Form.Label>
                  <Form.Control
                    style={{
                      padding: '20px', marginTop: '10px', fontSize: 16,
                      fontWeight: 500,
                      color: "rgba(34, 34, 34, 1)",
                      fontFamily: "Gilroy", borderColor: mobilenoError ? 'red' : ''
                    }}
                    type="text"
                    placeholder="Enter phone"
                     value={mobilenoError ? '' : phone}
                     onChange={handlePhone}
                  />
 {mobilenoError && <p style={{ fontSize: '12px', color: 'red' }}>* Mobile Number is Required</p>}
                </Form.Group>
              </div>
            </div>
            <div className='col-lg-8 col-md-8 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>Address <span style={{color:'red', fontSize:'20px'}}>*</span></Form.Label>

                <Form.Control
                  style={{
                    padding: '20px', marginTop: '10px', fontSize: 16,
                    fontWeight: 500,
                    color: "rgba(34, 34, 34, 1)",
                    fontFamily: "Gilroy", borderColor: AddressError ? 'red' : ''
                  }}
                  type="text"
                  placeholder="Enter Address"
                   value={AddressError ? '' : Address}
                   onChange={handleAddress}
                />
 {AddressError && <p style={{ fontSize: '12px', color: 'red' }}>* Address is Required</p>}
              </Form.Group>
            </div>


            <div style={{ marginTop: '30px' }}>
              <Button onClick={handleSaveUpdate} disabled={!hasChanges} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}>
                Save Changes</Button>
            </div>

            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'row', cursor: "pointer" }} onClick={handleLogout}>

              <div> <img src={Logout} height={20} width={20} /> </div>
              <p style={{ color: 'red', fontWeight: 500, fontSize: '18px', paddingBottom: '5px', marginLeft: '5px' }}>Log out</p>
            </div>


          </>
        </TabPanel>

        {/* password update  */}

        <TabPanel value="2">
          <hr style={{ border: '1px solid #ced4da', width: '70%' }} />
          <div style={{ display: 'flex', flexDirection: 'row' }}>

            <div className="me-3 col-lg-4 col-md-5 col-sm-10 col-xs-10">
              <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  size="lg"
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
                    borderRight: "none"
                  }}
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(224, 236, 255, 1)", cursor: "pointer" }}>
                  {showPassword ? (
                    <Eye size="20" color="rgba(30, 69, 225, 1)" />
                  ) : (

                    <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                  )}
                </InputGroup.Text>

              </InputGroup>
            </div>


            <div className="col-lg-4 col-md-5 col-sm-10 col-xs-10">
              <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  size="lg"
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
                    borderRight: "none"
                  }}
                />
                <InputGroup.Text onClick={toggleConfirmPasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(224, 236, 255, 1)", cursor: "pointer" }}>
                  {showConfirmPassword ? (
                    <Eye size="20" color="rgba(30, 69, 225, 1)" />
                  ) : (

                    <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                  )}
                </InputGroup.Text>

              </InputGroup>
            </div>
          </div>
          <div style={{ marginTop: '30px' }}>
            <Button onClick={handlePasswordchange} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}>
              Save Changes</Button>
          </div>

        </TabPanel>

      </TabContext>


    </div>

  )
}
export default Accountsettings;