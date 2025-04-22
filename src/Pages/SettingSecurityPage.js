/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import './SettingSecurityPage.css';

 const Profile_Security = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch();



    const LoginId = localStorage.getItem("loginId")
    // const Loginname = localStorage.getItem("NameId")
    const Loginemail = localStorage.getItem("emilidd")
    // const Loginphone = localStorage.getItem("phoneId")
    // const LoginIsEnable = localStorage.getItem("IsEnable")

  
  
    const [email_IdForLoginUser, setEmail_IdForLoginUser] = useState('')

    useEffect(() => {
        if (LoginId) {
          try {
            // const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
            // const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
            // const parsedData = decryptedString;
            // setId(parsedData)
    
            // const decryptedDataname = CryptoJS.AES.decrypt(Loginname, 'abcd');
            // const decryptedStringname = decryptedDataname.toString(CryptoJS.enc.Utf8);
            // const parsedDataname = decryptedStringname;
            // setName(parsedDataname)
    
            // const decryptedDataphone = CryptoJS.AES.decrypt(Loginphone, 'abcd');
            // const decryptedStringphone = decryptedDataphone.toString(CryptoJS.enc.Utf8);
            // const parsedDatphone = decryptedStringphone;
            // setPhone(parsedDatphone)
    
            const decryptedDataemail = CryptoJS.AES.decrypt(Loginemail, 'abcd');
            const decryptedStringemail = decryptedDataemail.toString(CryptoJS.enc.Utf8);
            // setEmail(decryptedStringemail)
            setEmail_IdForLoginUser(decryptedStringemail)
    
    
            // const decryptedDataIsEnable = CryptoJS.AES.decrypt(LoginIsEnable, 'abcd');
            // const decryptedStringIsEnable = decryptedDataIsEnable.toString(CryptoJS.enc.Utf8);
            // setIsEnableCheck(decryptedStringIsEnable)
    
          
    
          } catch (error) {
            console.error('Error decrypting LoginId:', error);
          }
        }
    
      }, [LoginId])

  const [isChecked, setIsChecked] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [initialIsEnable, setInitialIsEnable] = useState(null);

  const [isCheckedvalue, setIsCheckedvalue] = useState(false);

  const handleChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);

    if (newValue !== initialIsEnable) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  };

  const handleSwitchChange = (e) => {
    // Prevent the switch from toggling
    e.preventDefault();
    setIsCheckedvalue(false)
  };

    const handleTwoStepVerify = () => {
        dispatch({ type: 'TWOSTEPVERIFY', payload: { emailId: email_IdForLoginUser, isEnable: isChecked } })
        dispatch({ type: 'CLEAR_ERROR' })
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
    
    
      useEffect(() => {
        const UserIsEnable = state.createAccount.accountList[0]?.user_details.isEnable;
        const isEnableInitialValue = UserIsEnable === 1;
    
        setIsChecked(isEnableInitialValue);
        setInitialIsEnable(isEnableInitialValue); // Set the initial value
    
        if (UserIsEnable === 1) {
          localStorage.setItem("IsEnable", '');
        }
    
        setIsChanged(false);
      }, [state.createAccount.accountList]);


      const theme = useTheme();
      const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
//       <>
// {props.profilepermissionError ? (
//   <div
//   style={{
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
   
//   }}
// >
//   {/* Image */}
//   <img
//     src={Emptystate}
//     alt="Empty State"
//     style={{ maxWidth: "100%", height: "auto" }}
//   />

//   {/* Permission Error */}
//   {props.profilepermissionError && (
//     <div
//       style={{
//         color: "red",
//         display: "flex",
//         alignItems: "center",
//         gap: "0.5rem",
//         marginTop: "1rem",
//       }}
//     >
//       <MdError size={20} />
//       <span>{props.profilepermissionError}</span>
//     </div>
//   )}
// </div>
// ):
<div className="container" 
style={{
  marginTop:26,
  minHeight: '100vh',
  // display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: '150px', 
  overflowY: 'auto',
  }}
>
<div  className="w-100 d-flex justify-content-center justify-content-md-start mt-2">
    <p className="cardnewsubs" style={{fontSize:20,fontFamily:"Gilroy",fontWeight:600}}>Security</p>
</div>
<div className='d-flex  justify-content-between mt-2 me-2 mb-3 cardnewsubs '>
   <div className='col-6 '>
     <h6 style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Enable Two-factor Authentication</h6>
     <p style={{ fontSize: isSmallScreen ? 10 : 14, fontFamily: "Montserrat", color: '#4B4B4B', lineHeight: '19.6px', fontStyle: 'normal', fontWeight: 500 }}>Enhance your account security by enabling two-factor authentication. This adds an extra layer of protection, ensuring only you can access your account.</p>
   </div>
   <div className='col-2'>
     <Form.Check
       type="switch"
       id="custom-switch"
       checked={isChecked}
       onChange={handleChange}
     />

   </div>
 </div>


 <div className='d-flex  justify-content-between me-2 mb-3 cardnewsubs'>
   <div className='col-6'>
     <h6 style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Email Setup</h6>
     <p style={{ fontSize: isSmallScreen ? 10 : 14, fontFamily: "Montserrat", color: '#4B4B4B', lineHeight: '19.6px', fontStyle: 'normal', fontWeight: 500 }}>Configure email authentication to receive security notifications and verification codes directly in your inbox.</p>
   </div>
   <div className='col-2'>
     <Form.Check type="switch" id="custom-switch" 
     checked={isCheckedvalue}
     onChange={handleSwitchChange}  />

   </div>
 </div>


 <div className='d-flex  justify-content-between me-2  cardnewsubs'>
   <div className='col-6'>
     <h6 style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>SMS Setup</h6>
     <p style={{ fontSize: isSmallScreen ? 10 : 14, fontFamily: "Montserrat", color: '#4B4B4B', lineHeight: '19.6px', fontStyle: 'normal', fontWeight: 500 }}>Set up SMS authentication to receive security alerts and verification codes via text messages for added account protection.</p>
   </div>
   <div className='col-2'>
     <Form.Check type="switch" id="custom-switch" 
       checked={isCheckedvalue}
       onChange={handleSwitchChange}/>
       
   </div>
 </div>

 {/* <div className='justify-content-end mt-3 '> */}
 <div className=" justify-content-end mt-3 ">
   <Button onClick={handleTwoStepVerify} disabled={!isChanged} 
  //  style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56,
  //   letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" ,marginLeft:30}}
  style={{
    fontFamily: "Gilroy",
    fontSize: "14px",
    backgroundColor: "#1E45E1",
    color: "white",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "12px ",
    width: "auto",
    maxWidth: "100%",
    marginBottom: "10px",
    maxHeight: 50,
    marginTop: "-20px",
    whiteSpace: "nowrap",
  }}
    > Save Changes</Button>

 </div>
</div>
// {/* }
// </> */}

    
    )
 }
 export default Profile_Security;