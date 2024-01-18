import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forgetpass.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Hand from "../Assets/Images/hand.png";
import Key from "../Assets/Images/new icon/key.png";
import Eye from "../Assets/Images/new icon/eye.png";
import HomeSideComponent from "./HomeSideContent";
import Swal from 'sweetalert2'


function ForgetPasswordPage() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowpassword] = useState(false);

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const handleEmailid = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setEmail(e.target.value);
  };



  const handlePassword = (e) => {
    setPassword(e.target.value);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    const isValidpasswordNo = pattern.test(e.target.value);

    if (isValidpasswordNo) {
      document.getElementById('passwordError').innerHTML = '';
    } else {
      document.getElementById('passwordError').innerHTML = 'Invalid password *';
    }
  };

  
  const handlePasswordReset = () => {
    const isValidPassword = validatePassword();   
    if (email && isValidPassword) {
      dispatch({ type: 'FORGETPAGE', payload: { NewPassword: password, email: email } });
      setEmail("");
      setPassword("");
    } else {
      let errorMessage = "";
      if (email === '') {
        errorMessage = "Please Enter Email";
      } else if (!isValidPassword) {
        errorMessage = "Invalid Password";
      } else {
        errorMessage = "Please Enter Email and Valid Password";
      }
  
      Swal.fire({
        icon: 'error',
        title: 'Please Enter All Fields',
        text: errorMessage,
      });
  
      dispatch({ type: 'ERROR', payload: errorMessage });
    }
  };
  
  const validatePassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    return pattern.test(password);
  }

  const handleLogin = () => {
    navigate('/login-Page')
  }



  return (
    <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
      <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white", overflowX: "hidden" }}>
          <HomeSideComponent />
        </div>

        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB", overflowX: "hidden" }}>
          <div className="text-end m-2" >
            <span className="right-content lh-1" style={{ fontSize: "13px" }}>Return to your</span>
            <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleLogin()}>Login</button>
          </div>
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Forget your password</strong><img src={Hand} width="30" height="30" alt='Hand' /></div>
          <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px", color: "gray" }}>We need a few basic details to consider your profile</p></div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
              {/* <div>{state.NewPass.errorMessage?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.NewPass.errorMessage}</label> : null}</div> */}
              <Form className="Form">
                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Reset Key From Your Email</b></Form.Label>
                <InputGroup className="mb-3" size="lg" style={{ color: "#D9D9D9" }} >
                  <Form.Control
                    placeholder="Enter Reset Key From Your Email"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    aria-describedby="basic-addon2"
                    autoFocus
                    value={email} onChange={(e) => handleEmailid(e)}
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
                    <img src={Key} height="13" width="13" alt='key' />
                  </InputGroup.Text>
                </InputGroup>
                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>New Password</b></Form.Label>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control type={showPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    aria-describedby="basic-addon2" style={{
                      borderRadius: "2px", fontSize: "12px", fontWeight: "530", color: "gray",
                      '::placeholder': { color: "gray", fontSize: 12 }

                    }}
                    value={password} onChange={(e) => handlePassword(e)}
                  />

                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none', borderRadius: "2px" }}>
                    <img src={showPassword ? Eye : eyeClosed} height="13" width="13" alt='Eye' onClick={togglePasswordVisibility} />
                  </InputGroup.Text>
                </InputGroup>

                <p id="passwordError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>

                {/* {
                  state.NewPass.errorPassword.length > 0 ? <label style={{ color: "red" }}>{state.NewPass.errorPassword}</label> : null
                } */}

                <div className="lists d-flex " style={{ fontSize: "13px", justifyContent: "space-between", textAlign: "left", width: "100%" }} >
                  <ul className="hoverList">
                    <li className="one" style={{ textAlign: "left" }}>One Upper Case Character</li>
                    <li style={{ textAlign: "left" }}>One Special Character</li>
                  </ul>
                  <div >

                    <ul className="hoverList">
                      <li className="mb-0" style={{ textAlign: "left" }}>8 Characters Minimum</li>
                      <li className="mt-0 pt-1" style={{ textAlign: "left" }}>One number</li>
                    </ul>
                  </div>
                </div>

              </Form>
              <div className="d-flex justify-content-center pt-2">
                <Button type="" className="btn" style={{ fontWeight: 600, width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} onClick={handlePasswordReset}>
                  PASSWORD RESET
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

export default ForgetPasswordPage;