import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Smart from "../Assets/Images/Logo-Icon-White.png";
import Tools from "../Assets/Images/Smart-Tools.png";
import Support from "../Assets/Images/Total-Support.png";
import Hai from "../Assets/Images/hand.png";
import Login from "../Assets/Images/new icon/login-user.png";
import Eye from "../Assets/Images/new icon/eye.png";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';

 



const MyComponent = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  console.log("state", state)
  

  let navigate = useNavigate();

  const [email_Id, setemail_Id] = useState('')
  const [password, setpassword] = useState('')


  
  


  const handleCreateAccount = () => {
    navigate('/create-account')
  }
  const handleForgetPassword = () => {
    navigate('/forget-password')
  }


  const handleEmailChange = (e) => {
    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    setemail_Id(e.target.value)
    console.log("Email", e.target.value)
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
        text: 'Enter Email id and Password',
      });
    }
  };
 
  return (
    <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
      <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white", overflowX: "hidden" }}>
          <div className="d-flex justify-content-center pt-5" >
            <img src={Smart} class="img-fluid rounded-3" style={{ height: "35px", width: "35px", backgroundColor: "" }} />
            <h3 className="ps-2" style={{ fontSize: "25px", fontWeight: 550, letterSpacing:"0.02em" }}>smartstay</h3>
          </div>
<div className="d-flex justify-content-center pt-2 mb-2">
<p  style={{ fontSize: "15px",marginBottom:0}}>Welcome to Smartstay</p>
  </div>
<div className="d-flex justify-content-center pt-2 mb-2">
<p  style={{ fontSize: "11px",   }}>Over 157,000 hotels and homes across 35 countries</p>
</div>
         
        
          <div style={{ paddingTop: "40px" }}>
            <div className="d-flex justify-content-start ps-5" ><img src={Tools} class="img-fluid" style={{ height: "50px", width: "50px" }} /></div>
            <p className="d-flex justify-content-start ps-5 pt-0 mb-0" style={{ fontSize: "13px" }} >Smart Tools</p>
            <p className="d-flex justify-content-start ps-5 pe-5 pt-2" style={{ fontSize: "11px" }}  >Easy-to-use tools that let you integrate our offerings, search
              and share content, track performance and manage earnings.</p>
          </div>
          <div style={{ paddingTop: "20px" }}>
            <div className="d-flex justify-content-start ps-5"  ><img src={Support} class="img-fluid" style={{ height: "50px", width: "50px" }} /></div>
            <p className="d-flex justify-content-start ps-5 mb-0" style={{ fontSize: "13px" }} >Total Support</p>
            <p className="d-flex justify-content-start ps-5  pe-5 text-justify pt-2 mb-5" style={{ fontSize: "11px" }} >A dedicated team to help resolve any issues yoiu may face while using our products or promoting our hotels.</p>
          </div>
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB", overflowX: "hidden" }}>
          <div className="text-end m-2" >
            <span className="right-content lh-1" style={{ fontSize: "13px" }}>New to Smartstay account?</span>
            <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleCreateAccount()}>Create an Account</button>
          </div>
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={Hai} width="30" height="30" /></div>
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
                    <img src={Login} height="13" width="13" />
                  </InputGroup.Text>
                </InputGroup>

                <div>{state.login.errorEmail?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorEmail}</label> : null}</div>


                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Password</b></Form.Label>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control type="password"
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
                    <img src={Eye} height="13" width="13" />
                  </InputGroup.Text>
                </InputGroup>

                <div>{state.login.errorPassword?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorPassword}</label> : null}</div>


                <div className="mb-3 d-flex justify-content-between" >
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" style={{ fontWeight: "700", fontSize: "11px", fontWeight: "700" }} />
                  </Form.Group>
                  <Form.Label style={{ color: "#007FFF", fontSize: "11px", cursor: "pointer" }} onClick={() => handleForgetPassword()} ><b>Forgot Password?</b></Form.Label>
                </div>
              </Form>
              <div class="d-flex justify-content-center pt-2">
                <Button type="" className="btn" style={{ width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} onClick={() => handleLogin()}>
                  <b>CREATE ACCOUNT</b>
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
