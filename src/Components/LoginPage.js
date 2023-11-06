// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Smart from "../Assets/Images/Logo-Icon-White.png";
// import Tools from "../Assets/Images/Smart-Tools.png";
// import Support from "../Assets/Images/Total-Support.png";
// import Hai from "../Assets/Images/hand.png";
// import Login from "../Assets/Images/new icon/login-user.png";
// import Eye from "../Assets/Images/new icon/eye.png";
// import './LoginPage.css';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import {API} from "../Api/index";


// const logindetailsclear = {

//   EmailId:"",
//   Password:"", 
     
//   }
// const MyComponent = () => {
//   let navigate = useNavigate();


//   const [loginDetails, setLoginDetails] = useState({
//     EmailId: "",
//     Password: "",
//   });
  
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);

//   const handleCreateAccount = () => {
//     navigate('/create-account')
//   }

//   const EmailValidation = (e)=>{
//     setLoginDetails({...loginDetails,EmailId:e.target.value});
//     checkEmail(e);
  
//   }

//   const regex = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

//   const checkEmail = (e) =>{
//     setEmail(e.target.value);
  
//     if(regex.test(email)===false){
//    setError('Please Enter Valid Email Address');
    
//   }else{
//       setError('');
//     return true;
//   }
//   }




//   const handleLogin = async(e)=>{
  
//     e.preventDefault();

//     var status = false;
//     if (loginDetails.EmailId == "") {
//         document.getElementById("Usernameuser").innerHTML =
//             "Please enter your EmailId";
//         status = false;
//     } else {
//         document.getElementById("Usernameuser").innerHTML = " ";
//         status = true;
//     }
//     if (loginDetails.Password == "") {
//         document.getElementById("Passworduser").innerHTML =
//             "Please enter your Password";
//         status = false;
//     } else {
//         document.getElementById("Passworduser").innerHTML = " ";
//         status = true;
//     }
   
//    if(loginDetails){
//         try{
//      const { data } = await API.post('/login/login',loginDetails);
  
//            if(data.statusCode==200){
//         Swal.fire({
//              icon: 'success',
//              iconColor: '#28a745',
//              title:data.message,
//              showConfirmButton: false,
//              timer: 3000
//            });
//         console.log(data);
//         setLoginDetails(logindetailsclear);
//               setTimeout(()=> {
//             window.location.href = '/royalgrandhostel'
//         }, 1000);
           
//        } else {
//         setLoginDetails(logindetailsclear);
//         Swal.fire({
//           icon: 'warning',
//           iconColor: '#dc3545',
//           title: data.message,
//           showConfirmButton: false,
//           timer: 2000
//           });
//        }
//       }
//       catch(err){
//         setLoginDetails(logindetailsclear);
//         Swal.fire({
//           icon: 'warning',
//           iconColor: '#dc3545',
//           title: err.message,
//           showConfirmButton: false,
//           timer: 2000
//           });
//              }
//    }
//    else{
   
//    }
     
//       }
  

//   const handleForgetPassword = () => {
//     navigate('/forget-password')
//   }



//   return (
//     <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
//       <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        
//         <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white",overflowX: "hidden" }}>
//           <div className="d-flex justify-content-center ps-5 pt-5" >
//             <img src={Smart} class="img-fluid rounded-3" style={{ height: "35px", width: "35px", backgroundColor: "" }} />
//             <h3 className="ps-2" style={{ fontSize: "25px", fontWeight: "400", wordSpacing: "" }}>smartstay</h3>
//           </div>
//           <p className="d-flex justify-content-center pt-2 mb-2" style={{ fontSize: "15px" }}>Welcome to Smartstay</p>
//           <p className="d-flex justify-content-center" style={{ fontSize: "11px", paddingTop: "-1px" }}>Over 157,000 hotels and homes across 35 countries</p>
//           <div style={{ paddingTop: "40px" }}>
//             <div className="d-flex justify-content-start ps-5" ><img src={Tools} class="img-fluid" style={{ height: "50px", width: "50px" }} /></div>
//             <p className="d-flex justify-content-start ps-5 pt-0 mb-0" style={{ fontSize: "13px" }} >Smart Tools</p>
//             <p className="d-flex justify-content-start ps-5 pe-5 pt-2" style={{ fontSize: "11px" }} >Easy-to-use tools that let you integrate our offerings, search
//               and share content, track performance and manage earnings.</p>
//           </div>
//           <div style={{ paddingTop: "20px" }}>
//             <div className="d-flex justify-content-start ps-5"  ><img src={Support} class="img-fluid" style={{ height: "50px", width: "50px" }} /></div>
//             <p className="d-flex justify-content-start ps-5 mb-0" style={{ fontSize: "13px" }} >Total Support</p>
//             <p className="d-flex justify-content-start ps-5  pe-5 text-justify pt-2 mb-5" style={{ fontSize: "11px" }} >A dedicated team to help resolve any issues yoiu may face while using our products or promoting our hotels.</p>
//           </div>
//         </div>


//         <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB",overflowX: "hidden" }}>
//           <div className="text-end m-2" >
//             <span className="right-content lh-1" style={{ fontSize: "13px" }}>New to Smartstay account?</span> 
//              <button  style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleCreateAccount()}>Create an Account</button>
//           </div>
//           <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={Hai} width="30" height="30" /></div>
//           <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px",color:"gray" }}>We need a few basic details to consider your profile</p></div>
//           <div className="row d-flex justify-content-center">
//             <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
//               <Form className="Form">
//                 <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530"}}><b>Email Or Phone Number</b></Form.Label>
//                 <InputGroup className="mb-3" size="lg" style={{color:"#D9D9D9"}} >
//                   <Form.Control
//                     placeholder="Enter Email or Business"
//                     aria-label="Recipient's username"
//                     className='form-control border border-0 '
//                     aria-describedby="basic-addon2"
//                     value={loginDetails.EmailId} onChange={(e)=>EmailValidation(e)}
//                      style={{
//                       fontSize: "12px",
//                       fontWeight: "530",
//                       opacity:1,
//                       borderRadius:"2px",
//                       color: "gray", 
//                       '::placeholder': { color: "gray",fontSize:"12px" } 
//                     }}
                  
//                             />
//                   <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none',borderRadius:"2px" }} >
//                     <img src={Login} height="13" width="13" />
//                   </InputGroup.Text>
//                 </InputGroup>
//                 <p style={{fontSize:"11px",marginLeft:"0px",paddingTop:"0px",color:"red"}} >{error}</p>

//                 <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Password</b></Form.Label>
//                 <InputGroup className="mb-3" size="lg">
//                   <Form.Control type="password"
//                     placeholder="Enter Password"
//                     aria-label="Recipient's username"
//                     className='form-control border border-0 '
//                     aria-describedby="basic-addon2" style={{ borderRadius:"2px",fontSize: "12px", fontWeight: "530",color:"gray",
//                     '::placeholder': { color: "gray",fontSize:12 } 
                                    
//                   }}
//                   value={loginDetails.Password} onChange={(e) => setLoginDetails({ ...loginDetails, Password: e.target.value })}
//                    />

//                   <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none',borderRadius:"2px" }}>
//                     <img src={Eye} height="13" width="13" />
//                   </InputGroup.Text>
//                 </InputGroup>
//                                 <p style={{fontSize:"11px",marginLeft:"0px",paddingTop:"0px",color:"red"}} >{error}</p>
//                 <div className="mb-3 d-flex justify-content-between" >
//                   <Form.Group controlId="formBasicCheckbox">
//                     <Form.Check type="checkbox" label="Remember me" style={{ fontWeight: "700", fontSize: "11px", fontWeight: "700" }} />
//                   </Form.Group>
//                   <Form.Label style={{ color: "#007FFF", fontSize: "11px", cursor: "pointer" }} onClick={() => handleForgetPassword()} ><b>Forgot Password?</b></Form.Label>
//                 </div>
//                 <div class="d-flex justify-content-center pt-2">
//                   <Button type="" className="btn" style={{ width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} onClick={() => handleLogin()}>
//                     <b>CREATE ACCOUNT</b>
//                   </Button>
//                 </div>
//                 <div className="d-flex justify-content-center pt-3">
//                   <p style={{ color: 'gray', fontSize: "11px", fontFamily: "sans-serif", fontWeight: "bold", marginBottom: "0px" }}>By Clicking 'Sign in for free' I accept the</p>
//                 </div>
//                 <div className="d-flex justify-content-center">
//                   <p style={{ color: '#007FFF', fontSize: "11px", fontWeight: "bold" }}>Terms of Use <span style={{ color: 'gray', fontSize: "13px", fontFamily: "sans-serif", fontWeight: "bold" }}>  & </span> Privacy Policy <span style={{ color: 'gray', fontSize: "11px", fontFamily: "sans-serif", fontWeight: "bold" }}> of SmartStay.</span></p>
//                 </div>
//               </Form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyComponent;



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
import {API} from "../Api/index";



const MyComponent = () => {
  let navigate = useNavigate();


  const [loginDetails, setLoginDetails] = useState({
    EmailId: "",
    Password: "",
  });
  
  
  const [error, setError] = useState(null);

  const handleCreateAccount = () => {
    navigate('/create-account')
  }
  const handleForgetPassword = () => {
    navigate('/forget-password')
  }



  const EmailValidation = (e) => {
    const email = e.target.value;
    setLoginDetails({ ...loginDetails, EmailId: email });

    if (!regex.test(email)) {
      setError('Please Enter Valid Email Address');
    } else {
      setError('');
    }
  };

  const regex = /^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  



  const handleLogin = async (e) => {
     if (!regex.test(loginDetails.EmailId) || !loginDetails.Password) {
      Swal.fire({
        icon: 'error',
        title: 'Please enter a valid Email and Password',
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const response = await API.post('/login/login', loginDetails);
      console.log('API response:', response);
      if (response.data.statusCode === 200) {
             Swal.fire({
          icon: 'success',
          title: response.data.message,
          showConfirmButton: true,
          timer: 3000,
        });
              navigate('/royalgrandhostel');   
       
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.data.message,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'An error occurred while processing your request',
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  

  



  return (
    <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
      <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white",overflowX: "hidden" }}>
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


        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB",overflowX: "hidden" }}>
          <div className="text-end m-2" >
            <span className="right-content lh-1" style={{ fontSize: "13px" }}>New to Smartstay account?</span> 
             <button  style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleCreateAccount()}>Create an Account</button>
          </div>
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={Hai} width="30" height="30" /></div>
          <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px",color:"gray" }}>We need a few basic details to consider your profile</p></div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
              <Form className="Form">
                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530"}}><b>Email Or Phone Number</b></Form.Label>
                <InputGroup className="mb-3" size="lg" style={{color:"#D9D9D9"}} >
                  <Form.Control
                    placeholder="Enter Email or Business"
                    aria-label="Recipient's username"
                    className='form-control border border-0 '
                    aria-describedby="basic-addon2"
                    value={loginDetails.EmailId} onChange={(e)=>EmailValidation(e)}
                     style={{
                      fontSize: "12px",
                      fontWeight: "530",
                      opacity:1,
                      borderRadius:"2px",
                      color: "gray", 
                      '::placeholder': { color: "gray",fontSize:"12px" } 
                    }}
                  
                            />
                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none',borderRadius:"2px" }} >
                    <img src={Login} height="13" width="13" />
                  </InputGroup.Text>
                </InputGroup>
                <p style={{fontSize:"11px",marginLeft:"0px",paddingTop:"0px",color:"red"}} >{error}</p>

                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Password</b></Form.Label>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control type="password"
                    placeholder="Enter Password"
                    aria-label="Recipient's username"
                    className='form-control border border-0 '
                    aria-describedby="basic-addon2" style={{ borderRadius:"2px",fontSize: "12px", fontWeight: "530",color:"gray",
                    '::placeholder': { color: "gray",fontSize:12 } 
                                    
                  }}
                  value={loginDetails.Password} onChange={(e) => setLoginDetails({ ...loginDetails, Password: e.target.value })}
                   />

                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none',borderRadius:"2px" }}>
                    <img src={Eye} height="13" width="13" />
                  </InputGroup.Text>
                </InputGroup>
                                <p style={{fontSize:"11px",marginLeft:"0px",paddingTop:"0px",color:"red"}} >{error}</p>
                <div className="mb-3 d-flex justify-content-between" >
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" style={{ fontWeight: "700", fontSize: "11px", fontWeight: "700" }} />
                  </Form.Group>
                  <Form.Label style={{ color: "#007FFF", fontSize: "11px", cursor: "pointer" }} onClick={() => handleForgetPassword()} ><b>Forgot Password?</b></Form.Label>
                </div>
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
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
