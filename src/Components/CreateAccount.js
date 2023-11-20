import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateAccount.css';
import hand from "../Assets/Images/hand.png";
// import {BsHandThumbsUpFill}from "react-icons/bs";
// import { BsLockFill } from "react-icons/bs";
import Grid from '@mui/material/Grid';
import Smart from "../Assets/Images/Logo-Icon-White.png";
import Tools from "../Assets/Images/Smart-Tools.png";
import Support from "../Assets/Images/Total-Support.png";

function CreateAccountPage() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('')

  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value);
    // const mobile = e.target.value
    const pattern = new RegExp(/^\d{1,10}$/);
   const isValidMobileNo = pattern.test(e.target.value)
    if (isValidMobileNo && e.target.value.length == 10) {
      document.getElementById('MobileNumberError').innerHTML = ''
    }
    else {
      document.getElementById('MobileNumberError').innerHTML = 'invalid mobile number *'
    }
  }

  const handleEmailID = (e) => {
    setEmailID(e.target.value);
    const email = e.target.value
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    console.log('isValidEmail', isValidEmail);
    if (isValidEmail) {
      document.getElementById('emailIDError').innerHTML = ''
    }
    else {
      document.getElementById('emailIDError').innerHTML = 'invalid Email Id *'
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }
  const handleLoginPage = () => {
    navigate('/login-Page')
  }
  const handleRoyal = () => {
    try {
      dispatch({ type: 'REGISTER_USER', payload: { mobileNo: phoneNo, name: userName, emailId: emailID, password: password } })
      navigate('/royalgrandhostel')
    } catch (error) {
      console.log('error', error);
    }

  }
  console.log("state", state);
  return (
    <>
      <div className="" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
        <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white" }}>
            <div className="d-flex justify-content-center ps-5 pt-5" >
              <img src={Smart} class="img-fluid rounded-3" style={{ height: "35px", width: "35px", backgroundColor: "" }} />
              <h3 className="ps-2" style={{ fontSize: "25px", fontWeight: "400", wordSpacing: "" }}>smartstay</h3>
            </div>
            <p className="d-flex justify-content-center pt-2 mb-2" style={{ fontSize: "15px" }}>Welcome to Smartstay</p>
            <p className="d-flex justify-content-center" style={{ fontSize: "11px", paddingTop: "-1px" }}>Over 157,000 hotels and homes across 35 countries</p>
            <div style={{ paddingTop: "40px" }}>
              <div className="d-flex justify-content-start ps-5" ><img src={Tools} class="img-fluid" style={{ height: "50px", width: "50px" }} /></div>
              <p className="d-flex justify-content-start ps-5 pt-0 mb-0" style={{ fontSize: "13px" }} >Smart Tools</p>
              <p className="d-flex justify-content-start ps-5 pe-5 pt-2" style={{ fontSize: "11px" }} >Easy-to-use tools that let you integrate our offerings, search
                and share content, track performance and manage earnings.</p>
            </div>
            <div style={{ paddingTop: "20px" }}>
              <div className="d-flex justify-content-start ps-5"  ><img src={Support} class="img-fluid" style={{ height: "50px", width: "50px" }} /></div>
              <p className="d-flex justify-content-start ps-5 mb-0" style={{ fontSize: "13px" }} >Total Support</p>
              <p className="d-flex justify-content-start ps-5  pe-5 text-justify pt-2 mb-5" style={{ fontSize: "11px" }} >A dedicated team to help resolve any issues yoiu may face while using our products or promoting our hotels.</p>
            </div>
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#F6F7FB" }}>

            <div className="text-end m-2" >
              <span className="right-content lh-1" style={{ fontSize: "13px" }}>Already have an account?</span>
              <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleLoginPage()}>Login</button>
            </div>
            <div class="d-flex align-items-center flex-column mb-1">
              <h5 className="mb-1" style={{ paddingTop: "20px", fontSize: "18px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={hand} style={{ width: "30px", height: "30px" }}></img></h5>
              <label className="profile pt-0" style={{ fontSize: "13px" }}>We need a few basic details to consider your profile</label>
            </div>
            <div>
              <div
              >

                <div class="mb-2 mt-3" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "20%" }}>
                  <label class="sr-only mb-0" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Name or Business Name </b></label>
                  <input class="name form-control mt-1" style={{ width: "80%", padding: "1.3%", border: "none", fontSize: 12, marginTop: "2%" }} type="name" id="name" placeholder="Enter Name or Business" name="name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                </div>

                <div className="secondrow mt-3 mb-2" style={{ marginLeft: "20%" }}>

                  <div className="mobphno" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Phone Number</b></label>
                    <input class="phone form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%" }} type="phone" id="phone" placeholder="Enter Phone Number" name="Phone" value={phoneNo} onChange={(e) => { handlePhoneNo(e) }} />
                    <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                  <div className="mobphno" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Email Id</b></label>
                    <input class="email form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%" }} type="email" id="email" placeholder="Enter Email Id" name="email" value={emailID} onChange={(e) => { handleEmailID(e) }} />
                    <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                </div>


                <div class="mb-2" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "12", marginLeft: "20%" }}>
                  <label class="sr-only" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Password</b></label>
                  <input class="pwd form-control" style={{ width: "80%", padding: "1.3%", border: "none", fontSize: 12, marginTop: "1%" }} type="password" id="pwd" placeholder="Enter password" name="pwd" value={password} onChange={(e) => { handlePassword(e) }} />
                </div>
                <div class="lists d-flex mt-1" style={{ justifyContent: "space-between", textAlign: "left", width: "64%", fontSize: "13px", marginLeft: "19%" }}>
                  <ul>
                    <li class="mb-0">One Upper Case Character</li>
                    <li class="mt-0 pt-1">One Special Character</li>
                  </ul>

                  <ul>
                    <li class="mb-0">8 Characters Minimum</li>
                    <li class="mt-0 pt-1">One number</li>
                  </ul>
                </div>
              </div>



              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button type="submit" style={{ fontWeight: "700", width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} class="btn" onClick={() => handleRoyal()}>CREATE ACCOUNT</button>

                <div class="footer" style={{ lineHeight: "50%", marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <p style={{ fontSize: "12px" }}>By clicking 'Sign up for free' I accept the</p>
                  <p style={{ fontSize: "12px" }}><span style={{ color: '#007FFF' }}><b>Terms of use</b></span>  &  <span style={{ color: '#007FFF' }}><b>Privacy Policy</b></span> of Smartstay</p>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>




    </>
  )
}

export default CreateAccountPage;
