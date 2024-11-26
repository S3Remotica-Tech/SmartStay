import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from 'react-bootstrap/Button';
import Emptystate from '../Assets/Images/Empty-State.jpg'
import { MdError } from "react-icons/md";


 const Profile_Security = (props) => {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [id, setId] = useState("")


    const LoginId = localStorage.getItem("loginId")
    const Loginname = localStorage.getItem("NameId")
    const Loginemail = localStorage.getItem("emilidd")
    const Loginphone = localStorage.getItem("phoneId")
    const LoginIsEnable = localStorage.getItem("IsEnable")
    const LoginPassword = localStorage.getItem("Password")

  
  
    const [email_IdForLoginUser, setEmail_IdForLoginUser] = useState('')
    const [isEnableCheck, setIsEnableCheck] = useState('')

    useEffect(() => {
        if (LoginId) {
          try {
            const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
            const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
            const parsedData = decryptedString;
            setId(parsedData)
    
            const decryptedDataname = CryptoJS.AES.decrypt(Loginname, 'abcd');
            const decryptedStringname = decryptedDataname.toString(CryptoJS.enc.Utf8);
            const parsedDataname = decryptedStringname;
            // setName(parsedDataname)
    
            const decryptedDataphone = CryptoJS.AES.decrypt(Loginphone, 'abcd');
            const decryptedStringphone = decryptedDataphone.toString(CryptoJS.enc.Utf8);
            const parsedDatphone = decryptedStringphone;
            // setPhone(parsedDatphone)
    
            const decryptedDataemail = CryptoJS.AES.decrypt(Loginemail, 'abcd');
            const decryptedStringemail = decryptedDataemail.toString(CryptoJS.enc.Utf8);
            // setEmail(decryptedStringemail)
            setEmail_IdForLoginUser(decryptedStringemail)
    
    
            const decryptedDataIsEnable = CryptoJS.AES.decrypt(LoginIsEnable, 'abcd');
            const decryptedStringIsEnable = decryptedDataIsEnable.toString(CryptoJS.enc.Utf8);
            setIsEnableCheck(decryptedStringIsEnable)
    
          
    
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
      <>
{props.profilepermissionError ? (
  <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "100vh",
  }}
>
  {/* Image */}
  <img
    src={Emptystate}
    alt="Empty State"
    style={{ maxWidth: "100%", height: "auto" }}
  />

  {/* Permission Error */}
  {props.profilepermissionError && (
    <div
      style={{
        color: "red",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "1rem",
      }}
    >
      <MdError size={20} />
      <span>{props.profilepermissionError}</span>
    </div>
  )}
</div>
):
<>
<div className='d-flex  justify-content-between mt-2 me-2 mb-3'>
   <div className='col-6'>
     <h6 style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Enable Two-factor Authentication</h6>
     <p style={{ fontSize: isSmallScreen ? 10 : 14, fontFamily: "Montserrat", color: '#4B4B4B', lineHeight: '19.6px', fontStyle: 'normal', fontWeight: 500 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum purus dolor duis sodales massa porttitor orci lectus. Ac quis placerat diam odio ut.</p>
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


 <div className='d-flex  justify-content-between me-2 mb-3 '>
   <div className='col-6'>
     <h6 style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>Email Setup</h6>
     <p style={{ fontSize: isSmallScreen ? 10 : 14, fontFamily: "Montserrat", color: '#4B4B4B', lineHeight: '19.6px', fontStyle: 'normal', fontWeight: 500 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum purus dolor duis sodales massa porttitor orci lectus. Ac quis placerat diam odio ut.</p>
   </div>
   <div className='col-2'>
     <Form.Check type="switch" id="custom-switch" 
     checked={isCheckedvalue}
     onChange={handleSwitchChange}  />

   </div>
 </div>


 <div className='d-flex  justify-content-between me-2'>
   <div className='col-6'>
     <h6 style={{ fontSize: 16, fontFamily: "Gilroy", color: '#222', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 600 }}>SMS Setup</h6>
     <p style={{ fontSize: isSmallScreen ? 10 : 14, fontFamily: "Montserrat", color: '#4B4B4B', lineHeight: '19.6px', fontStyle: 'normal', fontWeight: 500 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum purus dolor duis sodales massa porttitor orci lectus. Ac quis placerat diam odio ut.</p>
   </div>
   <div className='col-2'>
     <Form.Check type="switch" id="custom-switch" 
       checked={isCheckedvalue}
       onChange={handleSwitchChange}/>
   </div>
 </div>

 <div className='justify-content-end mt-3'>
   <Button onClick={handleTwoStepVerify} disabled={!isChanged} style={{ fontFamily: 'Montserrat', fontSize: 16, fontWeight: 500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing: 1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }}> Save Changes</Button>

 </div>
</>
}
</>

    
    )
 }
 export default Profile_Security;