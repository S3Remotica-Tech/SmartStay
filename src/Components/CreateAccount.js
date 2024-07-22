import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateAccount.css';
import hand from "../Assets/Images/hand.png";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import eye from '../Assets/Images/login-password.png'
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png';
import HomeSideComponent from "./HomeSideContent";
import Logo from '../Assets/Images/New_images/Group.png'
import Icon from '../Assets/Images/New_images/Smartstay.png'
import CreateAccount from '../Assets/Images/New_images/createAccount.png'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import OpenEye from '../Assets/Images/New_images/eye.png'
import { InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'iconsax-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 



function CreateAccountPage() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('')
  const [showConfirmPassword , setShowConfirmPassword] = useState(false)
const [firstName, setFirstName] = useState('')
const [lastName, setLastName] = useState('')

const handleFirstName = (e) =>{
  setFirstName(e.target.value)
}

const handleLastName = (e)=>{
  setLastName(e.target.value)
}


  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  console.log("state", state)


const handleConfirmPassword = (e) =>{
  setConfirmPassword(e.target.value)
}

const toggleConfirmPasswordVisibility = () => {
  setShowConfirmPassword(!showConfirmPassword)
}

  useEffect(() => {
    if (state.createAccount.statusCodeCreateAccount === 200) {
      setFirstName('')
      setLastName('')
      setPhoneNo('');
      setEmailID('');
      setPassword('');
      setConfirmPassword('')

setTimeout(()=>{
dispatch({ type: 'CLEAR_STATUS_CODE_CREATE_ACCOUNT'})
},2000)

    }
  }, [state.createAccount.statusCodeCreateAccount]);

  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value);
    const pattern = new RegExp(/^\d{1,10}$/);
    const isValidMobileNo = pattern.test(e.target.value);
    const mobileNumberError = document.getElementById('MobileNumberError');
    if (mobileNumberError) {
      if (isValidMobileNo && e.target.value.length === 10) {
        mobileNumberError.innerHTML = '';
      } else {
        mobileNumberError.innerHTML = 'Invalid mobile number *';
      }
    }
  };
  
 
  const handleEmailID = (e) => {
    setEmailID(e.target.value);
    const email = e.target.value;
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    const emailIDError = document.getElementById('emailIDError');
    if (emailIDError) {
      if (isValidEmail) {
        emailIDError.innerHTML = '';
      } else {
        emailIDError.innerHTML = 'Invalid Email Id *';
      }
    }
  };


  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  //   };


  const [passwordError, setPasswordError] = useState('');



  const handlePassword = (e) => {
    setPassword(e.target.value);
    const password = e.target.value;
    let errorMessage = '';
  
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
  




  const handleLoginPage = () => {
    navigate('/login-Page')
  }

  const handleCreateAccount = async () => {
    const emailElement = document.getElementById('emailIDError');
    const emailError = emailElement ? emailElement.innerHTML : '';

    if (emailError === 'Invalid Email Id *') {
      Swal.fire({
        icon: 'warning',
        title: 'Please enter a valid email address',
        confirmButtonText: 'Ok',
        timer: 1000
      });
      return;
    }

    const phoneNumber = parseInt(phoneNo, 10);
    const phonePattern = new RegExp(/^\d{10}$/);
    const isValidMobileNo = phonePattern.test(phoneNo);

    if (!isValidMobileNo) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid mobile number. Please Enter a valid 10-digit mobile number.',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (!firstName || !lastName || !phoneNo || !emailID || !password || !confirmpassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (passwordError) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Password',
        text: passwordError,
        confirmButtonText: 'Ok'
      });
      return;
    }



if(password ==! confirmpassword){
  Swal.fire({
    icon: 'warning',
    title: 'Please Enter Confirm Password Same as Password',
    confirmButtonText: 'Ok'
  });
  return;
}

    dispatch({
      type: 'CREATE_ACCOUNT_PAGE',
      payload: { first_name: firstName, last_name: lastName, mobileNo: phoneNumber, emailId: emailID, password: password,confirm_password: confirmpassword }
    });
    // setFirstName('')
    // setLastName('')
    // setPhoneNo('');
    // setEmailID('');
    // setPassword('');
    // setConfirmPassword('')
  };

  return (
    <>
         <div style={{ width: "100%", height:"100vh" ,fontFamily: "Gilroy" , backgroundColor:""}}>
        <div className=" ms-5 mb-5">

          <div className="row g-0 coumn-gap-1 row-gap-4">
            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 mt-4">
              <div className="d-flex gap-1 mb-1">

                <img src={Logo} style={{ height: 25, width: 25 }} />
                {/* <img src={Icon} style={{width:"100%"}} /> */}
                <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy" }}>Smartstay</label></div>
              </div>

              <div className="mt-3 mb-1 "><label style={{ fontSize: 32, fontWeight: 600, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}> Create your free account</label></div>
              <div className="mt-1 mb-1 "><label style={{ fontSize: 16, fontWeight: 400, color: "rgba(75, 75, 75, 1)", fontFamily: "Montserrat" }}>Enter your details below to find your stay smartly</label></div>

              <div className="row row-gap-3 mt-5 me-2">
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>First Name</Form.Label>
                    <Form.Control
                    value={firstName}
                    onChange={(e)=>{handleFirstName(e)}}
                    size="lg" type="text" placeholder="First name" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Last Name</Form.Label>
                    <Form.Control
                    value={lastName}
                    onChange={(e)=>{handleLastName(e)}}
                    size="lg" type="text" placeholder="Last name" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Email ID</Form.Label>
                    <Form.Control size="lg"
                      value={emailID} onChange={(e) => { handleEmailID(e) }}
                      type="email" placeholder="Email address" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />
                
                <div id="emailIDError" style={{ color: "red", fontSize: 12 }}></div>
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Mobile number</Form.Label>
                    <Form.Control size="lg"
                      value={phoneNo} onChange={(e) => { handlePhoneNo(e) }}
                      maxLength={10}
                      type="text" placeholder="Enter Mobile no." style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
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
                    <InputGroup.Text    onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(224, 236, 255, 1)", cursor: "pointer" }}>
                    {showPassword ? (
               <Eye size="20" color="rgba(30, 69, 225, 1)" />
            ) : (
             
              <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
            )}
                    </InputGroup.Text>

                  </InputGroup>
                </div>

                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
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
                    <InputGroup.Text    onClick={toggleConfirmPasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(224, 236, 255, 1)", cursor: "pointer" }}>
                    {showConfirmPassword ? (
               <Eye size="20" color="rgba(30, 69, 225, 1)" />
            ) : (
             
              <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
            )}
                    </InputGroup.Text>

                  </InputGroup>
                </div>
               
                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-4 mb-1" >
                  <Button onClick={handleCreateAccount} className="w-100" style={{ backgroundColor: "rgba(30, 69, 225, 1)", borderRadius: 12, padding: 10, fontFamily: "Montserrat", height: 50 ,fontWeight:600}}>Create account</Button>
                </div>

              </div>
              <div className="mt-3 mb-2">
                <label style={{ fontSize: 14, fontWeight: 400, fontFamily: "Montserrat" }}>Already have an account?<span  onClick={() => handleLoginPage()} className="ms-2 create-account-hover" style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", color: "rgba(30, 69, 225, 1)" ,cursor:"pointer"}}>Sign in</span> </label>
              </div>

            </div>
            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 d-flex justify-content-center mt-4" style={{ backgroundColor: "" }}>
              <div>
                <img src={CreateAccount} style={{ height: 460, width: 460 }} />
              </div>

            </div>


          </div>








        </div>








      </div>




    </>
  )
}

export default CreateAccountPage;