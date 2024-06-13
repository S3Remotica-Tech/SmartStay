import React, { useState ,useEffect} from "react";
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

function CreateAccountPage() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  useEffect(() => {
    if (state.createAccount.accountMgs.data && state.createAccount.accountMgs.data.statusCode === 200) {
      setUserName('');
      setPhoneNo('');
      setEmailID('');
      setPassword('');
    }
  }, [state.createAccount.accountMgs.data]);

  const handlePhoneNo = (e) => {
    setPhoneNo(e.target.value);
    const pattern = new RegExp(/^\d{1,10}$/);
    const isValidMobileNo = pattern.test(e.target.value)
    if (isValidMobileNo && e.target.value.length === 10) {
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
    if (isValidEmail) {
      document.getElementById('emailIDError').innerHTML = ''
    }
    else {
      document.getElementById('emailIDError').innerHTML = 'Invalid Email Id *'
    }
  }

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
  
  const handleLoginPage = () => {
       navigate('/login-Page')
  }

  const handleRoyal = async () => {

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

    
    if (!userName || !phoneNo || !emailID || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
         
        }
      });
      return;
    } 

    const phoneNumber = parseInt(phoneNo, 10);

    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    const isValidPassword = pattern.test(password);  
    if (!isValidPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid password. Please Enter a valid password.',
        confirmButtonText: 'Ok'
      });
      return;
    }
  
   dispatch({
      type: 'CREATE_ACCOUNT_PAGE',
      payload: { name: userName, mobileNo: phoneNumber, emailId: emailID, password: password }
    });
    setUserName('');
    setPhoneNo('');
    setEmailID('');
    setPassword('');
     
  };

  return (
    <>
      <div className="" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
        <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white", overflowX: "hidden" }}>
            <HomeSideComponent />
          </div>
          <div class="col-lg-8 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#F6F7FB" }}>

            <div className="text-end m-2" >
              <span className="right-content lh-1" style={{ fontSize: "13px" }}>Already have an account?</span>
              <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleLoginPage()}>Login</button>
            </div>
            <div class="d-flex align-items-center flex-column mb-1">
              <h5 className="mb-1" style={{ paddingTop: "20px", fontSize: "18px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={hand} style={{ width: "30px", height: "30px" }} alt="Hand"></img></h5>
              <label className="profile pt-0" style={{ fontSize: "13px" }}>We need a few basic details to consider your profile</label>
            </div>
            <div>
              <div
              >

                <div class="mb-2 mt-3" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "20%" }}>
                  <label class="sr-only mb-0" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Name or Business Name </b></label>
                  <input class="name form-control mt-1" style={{ width: "80%", padding: "1.3%", border: "none", fontSize: 12, marginTop: "2%",boxShadow:"none" }} type="name" id="name" placeholder="Enter Name or Business" name="name" value={userName} onChange={(e) => { setUserName(e.target.value) }} />
                </div>

                <div className="secondrow mt-3 mb-2" style={{ marginLeft: "20%" }}>

                  <div className="mobphno" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Phone Number</b></label>
                    <input class="phone form-control mt-1" maxLength={10} style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%",boxShadow:"none" }} type="phone" id="phone" placeholder="Enter Phone Number" name="Phone" value={phoneNo} onChange={(e) => { handlePhoneNo(e) }} />
                    <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                  <div className="mobphno" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Email Id</b></label>
                    <input class="email form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%",boxShadow:"none" }} type="email" id="email" placeholder="Enter Email Id" name="email" value={emailID} onChange={(e) => { handleEmailID(e) }} />
                    <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                </div>


                <div class="mb-2" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginTop: "12", marginLeft: "20%" }}>
                  <label class="sr-only" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Password</b></label>
                  <input class="form-control" style={{ width: "80%", padding: "1.3%", border: "none", fontSize: 12, marginTop: "1%",boxShadow:"none" }} type={showPassword ? 'text' : 'password'} id="pwd" placeholder="Enter password" name="pwd" value={password} onChange={(e) => { handlePassword(e) }} />
                 
                  <div
                  
                   style={{ position: 'relative', width: '80%' }}>

                    <img
                      src={showPassword ? eye : eyeClosed}
                      style={{
                       position: 'absolute',
                        right: 10,
                        bottom: 8,
                        width: 20,
                        cursor: 'pointer',
                      }}
                      onClick={togglePasswordVisibility}
                    />
                  </div>
                  <p id="passwordError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                </div>
                <div className="lists d-flex mt-1" style={{ justifyContent: "space-between", textAlign: "left", width: "64%", fontSize: "13px", marginLeft: "19%" }}>
                  <ul className="hoverList">
                    <li className="lists1">One Upper Case Character</li>
                    <li className="pt-1">One Special Character</li>
                  </ul>

                  <ul className="hoverList">
                    <li className="mb-0">8 Characters Minimum</li>
                    <li className="mt-0 pt-1">One number</li>
                  </ul>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <button type="submit" style={{ fontWeight: "700", width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} class="btn" onClick={handleRoyal}>CREATE ACCOUNT</button>

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