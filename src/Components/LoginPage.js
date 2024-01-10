import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Hai from "../Assets/Images/hand.png";
import Login from "../Assets/Images/new icon/login-user.png";
import Eye from "../Assets/Images/new icon/eye.png";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png';
import HomeSideComponent from "./HomeSideContent";

const MyComponent = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)

  let navigate = useNavigate();

  const [email_Id, setemail_Id] = useState('')
  const [password, setpassword] = useState('')

  const [showPassword, setShowpassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const handleCreateAccount = () => {
    navigate('/create-account')
  }
  const handleForgetPassword = () => {
    navigate('/forget-password')
  }


  const handleEmailChange = (e) => {
    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    setemail_Id(e.target.value)
  }


  const handlePasswordChange = (e) => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
    setpassword(e.target.value)
  }

  const handleLogin = () => {
    if (email_Id && password) {
      dispatch({ type: 'LOGININFO', payload: { email_Id: email_Id, password: password } });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: email_Id ? 'Enter Password' : 'Enter Email id and Password',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
      <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white", overflowX: "hidden" }}>
          <HomeSideComponent />
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB", overflowX: "hidden" }}>
          <div className="text-end m-2" >
            <span className="right-content lh-1" style={{ fontSize: "13px" }}>New to Smartstay account?</span>
            <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleCreateAccount()}>Create an Account</button>
          </div>
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={Hai} width="30" height="30" alt='Hai' /></div>
          <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px", color: "gray" }}>We need a few basic details to consider your profile</p></div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
              <div>{state.login.errorMessage?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorMessage}</label> : null}</div>
              <Form className="Form">
                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Email Or Phone Number</b></Form.Label>
                <InputGroup className="mb-3" size="lg" style={{ color: "#D9D9D9" }} >
                  <Form.Control
                    placeholder="Enter Email or Business"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    aria-describedby="basic-addon2"
                    autoFocus
                    value={email_Id} onChange={(e) => handleEmailChange(e)}
                    style={{
                      fontSize: "12px",
                      fontWeight: "530",
                      opacity: 1,
                      borderRadius: "2px",
                      color: "gray",
                      '::placeholder': { color: "gray", fontSize: "12px" }
                    }}

                  />
                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none', borderRadius: "2px" }} >
                    <img src={Login} height="13" width="13" alt='Login' />
                  </InputGroup.Text>
                </InputGroup>

                <div>{state.login.errorEmail?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorEmail}</label> : null}</div>


                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Password</b></Form.Label>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    aria-describedby="basic-addon2" style={{
                      borderRadius: "2px", fontSize: "12px", fontWeight: "530", color: "gray",
                      '::placeholder': { color: "gray", fontSize: 12 }

                    }}
                    value={password} onChange={(e) => handlePasswordChange(e)}
                  />

                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none', borderRadius: "2px" }}>
                    <img src={showPassword ? Eye : eyeClosed} height="13" width="13" alt='Eye' onClick={togglePasswordVisibility} />
                  </InputGroup.Text>
                </InputGroup>

                <div>{state.login.errorPassword?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorPassword}</label> : null}</div>


                <div className="mb-3 d-flex justify-content-between" >
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" style={{ fontSize: "11px", fontWeight: 700 }} />
                  </Form.Group>
                  <Form.Label style={{ color: "#007FFF", fontSize: "11px", cursor: "pointer" }} onClick={() => handleForgetPassword()} ><b>Forgot Password?</b></Form.Label>
                </div>
              </Form>
              <div className="d-flex justify-content-center pt-2">
                <Button type="" className="btn" style={{ fontWeight: 600, width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} onClick={() => handleLogin()}>
                  LOGIN
                </Button>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <p style={{ color: 'gray', fontSize: "11px", fontFamily: "sans-serif", fontWeight: "bold", marginBottom: "0px" }}>By Clicking 'Sign in for free' I accept the</p>
              </div>
              <div className="d-flex justify-content-center">
                <p style={{ color: '#007FFF', fontSize: "11px", fontWeight: "bold" }}>Terms of Use <span style={{ color: 'gray', fontSize: "13px", fontFamily: "sans-serif", fontWeight: "bold" }}>  & </span> Privacy Policy <span style={{ color: 'gray', fontSize: "11px", fontFamily: "sans-serif", fontWeight: "bold" }}> of SmartStay.</span></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;