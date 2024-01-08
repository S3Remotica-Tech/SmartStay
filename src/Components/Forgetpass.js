import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forgetpass.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Hai from "../Assets/Images/hand.png";
import Key from "../Assets/Images/new icon/key.png";
import Eye from "../Assets/Images/new icon/eye.png";
import HomeSideComponent from "./HomeSideContent";


function ForgetPasswordPage() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowpassword] = useState(false);
  const [error, setError] = useState(null);

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const handleEmailid = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setEmail(e.target.value);
  };



  const handlePassword = (e) => {
    dispatch({ type: 'CLEAR_ERROR' });

    const newPassword = e.target.value;

    // Password validation criteria
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

    if (passwordRegex.test(newPassword)) {
      // Password meets criteria, set it
      setPassword(newPassword);
      setError(null); // Clear any previous error
    } else {
      // Password does not meet criteria
      // You can dispatch an error action or show a message to the user
      const errorMessage = "Invalid password";
      console.log(errorMessage);

      // Example: Dispatching an error action (replace with your actual error handling logic)
      dispatch({ type: 'SET_ERROR', payload: errorMessage });

      setError(errorMessage);
    }
  };

  const handlePasswordReset = () => {
    if (email && password) {
      dispatch({ type: 'FORGETPAGE', payload: { NewPassword: password, email: email } })

      setEmail("")
      setPassword("")

    }
    else {
      if (email == '') {
        dispatch({ type: 'ERROR', payload: "Please Enter Email" })

      }
      else if (password == '') {
        dispatch({ type: 'ERROR', payload: "Please Enter password" })

      }
      else {
        dispatch({ type: 'ERROR' })

      }
    }

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
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Forget your password</strong><img src={Hai} width="30" height="30" alt='Hai' /></div>
          <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px", color: "gray" }}>We need a few basic details to consider your profile</p></div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
              <div>{state.NewPass.errorMessage?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.NewPass.errorMessage}</label> : null}</div>
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

                {error && <div style={{ color: 'red' }}>{error}</div>}
                {
                  state.NewPass.errorPassword.length > 0 ? <label style={{ color: "red" }}>{state.NewPass.errorPassword}</label> : null


                }

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