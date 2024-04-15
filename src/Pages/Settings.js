import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import Men from '../Assets/Images/men.jpg';
import { FaCircleExclamation } from "react-icons/fa6";
import SecurityIcon from '@mui/icons-material/Security';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Settings.css";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from "crypto-js";
import Form from 'react-bootstrap/Form';
import InvoiceSettings from './InvoiceSettings';
import Amenities from './Amenities';
import Billings from './Billing';
import imageCompression from 'browser-image-compression';


function Settings() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();


  const [selectedTab, setSelectedTab] = useState('Personal');
  const [Name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [Address, setAddress] = useState("")
  const [Country, setCountry] = useState("")
  const [City, setCity] = useState("")
  const [statee, setStatee] = useState("")
  const [id, setId] = useState("")
  const [updateval, setUpdateval] = useState("")
  const [login_Password, setLogin_Password] = useState("")


  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const LoginId = localStorage.getItem("loginId")
  const Loginname = localStorage.getItem("NameId")
  const Loginemail = localStorage.getItem("emilidd")
  const Loginphone = localStorage.getItem("phoneId")
  const LoginIsEnable = localStorage.getItem("IsEnable")
  const LoginPassword = localStorage.getItem("Password")


  const [email_IdForLoginUser, setEmail_IdForLoginUser] = useState('')
  const [isEnableCheck, setIsEnableCheck] = useState('')

  console.log("LoginIsEnable", LoginIsEnable)
  console.log("isEnableCheck", isEnableCheck)
  console.log("LoginPassword",LoginPassword)

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
        console.log("decryptedStringemail", decryptedStringemail)


        const decryptedDataIsEnable = CryptoJS.AES.decrypt(LoginIsEnable, 'abcd');
        const decryptedStringIsEnable = decryptedDataIsEnable.toString(CryptoJS.enc.Utf8);
        setIsEnableCheck(decryptedStringIsEnable)

        const decryptedDataPassword = CryptoJS.AES.decrypt(LoginPassword, 'abcd');
        const decryptedStringPassword = decryptedDataPassword.toString(CryptoJS.enc.Utf8);
        console.log("decryptedStringPassword",decryptedStringPassword)
        setLogin_Password(decryptedStringPassword)

        console.log("login_Password",login_Password)

        console.log("decryptedStringIsEnable", decryptedStringIsEnable)

      } catch (error) {
        console.error('Error decrypting LoginId:', error);
      }
    }

  }, [LoginId])





  

  
  const handleName = (e) => {
    setName(e.target.value)
  }
  const handlePhone = (e) => {
    setPhone(e.target.value)
  }
  const handleAddress = (e) => {
    setAddress(e.target.value)
  }
  const handleEmailId = (e) => {
    setEmail(e.target.value)
  }
  const handleCountry = (e) => {
    setCountry(e.target.value)
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handleState = (e) => {
    setStatee(e.target.value)
  }
  const handleSaveUpdate = () => {
   if(selectedImage){
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: { name: Name, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id : id, profile:selectedImage }
      });
    }else{
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: { name: Name, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id }
      });
    }
    
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setCountry('');
    setCity("");
    setStatee("");
  }


// useEffect(()=>{
//   setIsChecked(isEnableCheck === '1');
// },[])


  const [isChecked, setIsChecked] = useState(null);


console.log("isChecked",isChecked)

console.log("isEnableCheck",isEnableCheck === '1')

  const handleChange = (event) => {
    console.log("eventChecked", event.target.checked)
    setIsChecked(event.target.checked);
    
  };


  console.log("email for Login User", email)


  const handleTwoStepVerify = () => {
    dispatch({ type: 'TWOSTEPVERIFY', payload: { emailId: email_IdForLoginUser, isEnable: isChecked } })
    dispatch({ type: 'CLEAR_ERROR' })
    
  }

 
  useEffect(() => {
    if (state.createAccount.statusCodeTwo === 200) {
      dispatch({ type: 'LOGININFO', payload: { email_Id: email, password: login_Password } });
            setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_TWO_STEP' })
              }, 100)
              setTimeout(() => {
                      dispatch({ type: 'CLEAR_STATUSCODE' });
                    }, 200);
    }
    
    
  }, [state.createAccount.statusCodeTwo])


useEffect(()=>{
  const UserIsEnable = state.createAccount.accountList.filter(item=> item.email_Id == email)
  console.log("UserIsEnable",UserIsEnable)
 const IsEnableOn = UserIsEnable[0]?.isEnable

 console.log("IsEnableOn === 1",IsEnableOn === 1)

if(IsEnableOn === 1){
  setIsChecked(true);
}else{
  setIsChecked(false);
}
},[state.createAccount.accountList])




  
 console.log("state for settings",state)

useEffect(()=>{
    dispatch({ type: 'ACCOUNTDETAILS' })
   },[])

  
   const [selectedImage, setSelectedImage] = useState(null);
const [profilePicture, setProfilePicture] = useState('');


   const handleImageChange = async (event) => {
    const file = event.target.files[0];

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
    };
    try {
        const compressedFile = await imageCompression(file, options);
        setSelectedImage(compressedFile);
    } catch (error) {
        console.error('Image compression error:', error);
    }
};

useEffect(()=>{

  const FIlteredProfile = state.createAccount.accountList.filter((item => item.id == id))

  console.log("FIlteredProfile",FIlteredProfile)
if(FIlteredProfile.length > 0 ){

const ProfileImage = FIlteredProfile[0].profile
const CustomerName = FIlteredProfile[0].Name
const PhoneNUmber = FIlteredProfile[0].mobileNo
const UserEmail = FIlteredProfile[0].email_Id



setName(CustomerName)
setPhone(PhoneNUmber)
setEmail(UserEmail)



setProfilePicture(ProfileImage)

}else{
  setProfilePicture(Men)
}
},[state.createAccount.accountList])




  return (
    <div className='container-fluid'>
      <div className="d-flex row justify-content-between mt-2 ms-4 me-4 pt-3">
        <div className='col-lg-8 col-md-6 col-sm-12'>
          <h1 style={{ fontSize: "26px" }}>Settings</h1>
          <p>Manage your account settings</p>
        </div>


      </div>

      <div className='mt-0 ' style={{}}>
        <div className='d-flex flex-column flex-md-row Page_Content g-0' >
          <div className="col-12 col-md-4 col-lg-3 pt-5 sidebar ">
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Personal' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Personal')}
            >
              <FaCircleExclamation style={{ fontSize: '16px', marginRight: '8px' ,color:"gray"}} />  Personal Information
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Security' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Security')}
            >
              <SecurityIcon style={{ fontSize: '16px', marginRight: '8px' ,color:"gray"}} />  Security
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'EB_Billings' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('EB_Billings')}
            >
              <ReceiptIcon style={{ fontSize: '16px', marginRight: '8px'  ,color:"gray"}} /> EB Billing
            </div>
           
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Invoice_Settings' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Invoice_Settings')}
            >
              <ShoppingBagIcon style={{ fontSize: '16px', marginRight: '8px',color:"gray" }} />  Invoice Settings
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Amenities' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Amenities')}
            >
              <EventNoteIcon style={{ fontSize: '16px', marginRight: '8px',color:"gray" }} />  Amenities
            </div>

          </div>
          <hr class="vl" />

          <div className="col-12 col-md-8 col-lg-9 pt-5 pe-3" style={{ width:"", backgroundColor: '#F8F9FA', paddingLeft: '30px' }}>
            {selectedTab === 'Personal' &&
              <div>

                <div className='d-flex justify-content-between'>
                  <div>
                    <h2 style={{ fontSize: '22px', fontWeight: 600 }}>General Information</h2>
                    <p style={{ fontSize: '16px', color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={handleSaveUpdate} >Save change</button>
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

                  </div>

                </div>

                <hr style={{ opacity: 0.1 }} />
                <h5 style={{ fontSize: '16px', fontWeight: 700 }}>Profile Picture</h5>

               

<div className='d-flex justify-content-start gap-3 align-items-center mt-3'>
                    <div style={{ border: "1px solid lightgray", display: "flex", alignItems: "center", justifyContent: "center", width: "auto", height: "auto", borderRadius: 100, padding: 5 }}>


                       <Image
                            src={selectedImage ? URL.createObjectURL(selectedImage): profilePicture == null ? Men : profilePicture
                            }
                            roundedCircle
                            style={{
                                height: 50,
                                width: 50,
                                borderRadius: '50%',
                            }} 
                        />

                    </div>
                    <label style={{fontSize:16, fontWeight:600}}>{Name} </label>
                    <button type="button" className="mb-2 upload-button" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={() => document.getElementById('upload-photo').click()}>Change Photo</button>
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} id="upload-photo" />
                    <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Delete</button>

                </div>

                <div class="mb-2 mt-3" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <label class="sr-only mb-0" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "350" }}><b>Name or Business Name </b></label>
                  <input class="Name form-control mt-1" style={{ width: "100%", padding: "1.3%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="name" id="name" placeholder="Royal Grand Hostel" name="name" value={Name} onChange={handleName} />
                </div>

                <div style={{ display: 'flex', width: "100%" }} >

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "350" }}><b>Phone Number</b></label>
                    <input class="Phone form-control mt-1" maxLength={10} style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="phone" id="phone" placeholder="123-098-345-09" name="Phone" value={phone} onChange={handlePhone} />
                    <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Email Address</b></label>
                    <input class="Email form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="email" id="email" placeholder="XYZ@gmail.com" name="email" value={email} onChange={handleEmailId} />
                    <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                </div>

                <div style={{ display: 'flex', width: "100%" }} >

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Address</b></label>
                    <input class="Phone form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="address" id="address" placeholder="Enter Address" name="address" value={Address} onChange={handleAddress} />

                  </div>

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Country</b></label>
                    <select class="form-select" aria-label="Default select example" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} value={Country} onChange={handleCountry}>
                      <option selected>Country</option>
                      <option value="India">India</option>
                      <option value="USA">USA</option>
                      <option value="England">England</option>
                    </select>
                  </div>

                </div>

                <div style={{ display: 'flex', width: "100%", marginBottom: '20px' }} >

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>City</b></label>
                    <input class="Phone form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="city" id="city" placeholder="Enter City" name="city" value={City} onChange={handleCity} />

                  </div>

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>State</b></label>
                    <input class="Email form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="state" id="state" placeholder="Enter State" name="state" value={statee} onChange={handleState} />

                  </div>

                </div>


              </div>

            }

            {selectedTab === 'Security' &&
              <div>
                <div className='d-flex  justify-content-between'>
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: 650 }}>Security</h2>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={handleTwoStepVerify} >Save change</button>
                  </div>
                </div>
                <hr style={{ opacity: 0.1 }} />

                <div className='mt-4 mb-5'>
                  <h6 style={{ fontWeight: 700, textDecorationLine: 'underline' }}>Password Management</h6>
                </div>
                <div className='d-flex  justify-content-between mt-2 me-2'>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Login Two-Step Verification</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                  <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        checked={isChecked}
        onChange={handleChange}
        // label="Check this switch"
      />
                    {/* <AntSwitch
                      checked={isChecked}
                      onChange={handleChange} inputProps={{ 'aria-label': 'ant design' }} /> */}
                  </div>
                </div>


                <div className='d-flex  justify-content-between me-2'>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Email Setup</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    {/* <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} /> */}
                    <Form.Check type="switch" id="custom-switch" />
                 
                  </div>
                </div>


                <div className='d-flex  justify-content-between me-2'>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>SMS Setup</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    {/* <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} /> */}
                    <Form.Check type="switch" id="custom-switch" />
                  </div>
                </div>

                <div className='mt-4 mb-4'>
                  <h6 style={{ fontWeight: 650, textDecorationLine: 'underline' }}>Password Security</h6>
                </div>

                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Password Change</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <button className='ChangePassword'>Change Password</button>
                  </div>
                </div>

              </div>

            }
            {selectedTab === 'EB_Billings' && 
            <Billings/>
            }
            {selectedTab === 'Amenities' && <Amenities />}
            {selectedTab === 'Invoice_Settings' && <InvoiceSettings />}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Settings