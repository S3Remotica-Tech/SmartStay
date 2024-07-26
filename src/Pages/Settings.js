import React, { useEffect, useState } from 'react'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Men from '../Assets/Images/men.jpg';
import { Dropdown, Table } from 'react-bootstrap';
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
import Cookies from 'universal-cookie';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Complaintsettings from './Complaint_settings';
import ExpencesSettings from './Expences_settings';
import dottt from "../Assets/Images/Group 14.png"



function Settings() {
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const cookies = new Cookies()

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

        const decryptedDataPassword = CryptoJS.AES.decrypt(LoginPassword, 'abcd');
        const decryptedStringPassword = decryptedDataPassword.toString(CryptoJS.enc.Utf8);
        setLogin_Password(decryptedStringPassword)

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
      Swal.fire({
        text: "Update successfully",
        icon: "success",
        timer: 1000,
    });
    }else{
      dispatch({
        type: 'CREATE_ACCOUNT',
        payload: { name: Name, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id }
      });
      Swal.fire({
        text: "Update successfully",
        icon: "success",
        timer: 1000,
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




  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    
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


useEffect(()=>{
  const UserIsEnable = state.createAccount.accountList[0].user_details.isEnable
 

if(UserIsEnable === 1){
  setIsChecked(true);

 localStorage.setItem("IsEnable", '');


}else{
  setIsChecked(false);
}
},[state.createAccount.accountList])



// useEffect(()=>{
//     dispatch({ type: 'ACCOUNTDETAILS' })
//    },[])

  
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
     const FIlteredProfile = state.createAccount?.accountList[0].user_details
       if(FIlteredProfile.profile){
        const ProfileImage = FIlteredProfile.profile
    const CustomerName = FIlteredProfile.Name
    const PhoneNUmber = FIlteredProfile.mobileNo
    const UserEmail = FIlteredProfile.email_Id
    
    setName(CustomerName)
    setPhone(PhoneNUmber)
    setEmail(UserEmail)
    
    setProfilePicture(ProfileImage)
    }else{
      setProfilePicture(Men)
    }
  
},[state.createAccount?.accountList])



const tokenCookies = cookies.get('token');


// console.log("state.createAccount.statusCodeForAccount == 200",state.createAccount.statusCodeForAccount == 200)


useEffect(()=>{
if(state.createAccount.statusCodeForAccount == 200){
  dispatch({ type: 'ACCOUNTDETAILS' })
setTimeout(()=>{
dispatch({ type: 'CLEAR_STATUS_CODE_ACCOUNT'})
},2000)

setTimeout(()=>{
  dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE'})
  },1000)

}else{
  console.log("create account not working")
}
},[state.createAccount?.statusCodeForAccount])

console.log("state for settings",state)


const [value, setValue] = React.useState('1');

const handleChanges = (event, newValue) => {
  setValue(newValue);
}

const [selectedHostel, setSelectedHostel] = useState('');
const [unit , setUnit] = useState(1);
const [amount , setAmount] = useState('')
console.log("selectedHostel",selectedHostel);

const handleHostelChange = (e) => {
  setSelectedHostel(e.target.value)
};

const handlesaveEbbill = () => {
  if (selectedHostel && amount){
    dispatch({ type: 'EB-BILLING-UNIT-ADD', payload: { hostel_id: selectedHostel, unit : unit , amount : amount} })
    Swal.fire({
      icon: "success",
      title: 'EB Billings Added successfully',
      confirmButtonText: "ok"
  }).then((result) => {
      if (result.isConfirmed) {
      }
  });
    setSelectedHostel('')
    setUnit('');
    setAmount('')
  }
  else {
       Swal.fire({
           icon: "warning",
           title: 'Please Enter All Field',
           confirmButtonText: "ok"
         }).then((result) => {
           if (result.isConfirmed) {
           }
         });
       }

}

useEffect(()=>{
dispatch({type:'EB-BILLING-UNIT-LIST'})
},[])

  return (
    <div className='container'>



      <div className="d-flex row justify-content-between mt-2 ms-4 me-4 pt-3">
        <div className='col-lg-8 col-md-6 col-sm-12 mb-4'>
          <h1 style={{ fontSize: 24 , fontFamily:"Gilroy", color:'#222',lineHeight:'normal',fontStyle:'normal', fontWeight:600 }}>Settings</h1>
          {/* <p>Manage your account settings</p> */}
        </div>


      </div>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <TabList onChange={handleChanges} aria-label="lab API tabs example" style={{marginLeft:'20px'}}>
            <Tab label="Security" value="1" className='me-3' style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#4B4B4B',lineHeight:'normal',fontStyle:'normal', fontWeight:500 , textTransform: 'none'}}/>
            <Tab label="EB Billing" value="2" className='me-3' style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#4B4B4B',lineHeight:'normal',fontStyle:'normal', fontWeight:500 , textTransform: 'none'}}/>
            <Tab label="Invoice" value="3" className='me-3' style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#4B4B4B',lineHeight:'normal',fontStyle:'normal', fontWeight:500, textTransform: 'none' }}/>
            <Tab label="Expences" value="4" className='me-3' style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#4B4B4B',lineHeight:'normal',fontStyle:'normal', fontWeight:500, textTransform: 'none' }}/>
            <Tab label="Complaint type" value="5" className='me-3 ' style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#4B4B4B',lineHeight:'normal',fontStyle:'normal', fontWeight:500, textTransform: 'none' }}/>
            <Tab label="Amenities" value="6" className='me-3' style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#4B4B4B',lineHeight:'normal',fontStyle:'normal', fontWeight:500 , textTransform: 'none'}}/>
          </TabList>
        </Box>
        <TabPanel value="1"> 
           <>
          
                <div className='d-flex  justify-content-between mt-2 me-2 mb-3'>
                  <div className='col-6'>
                    <h6 style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#222',lineHeight:'normal',fontStyle:'normal', fontWeight:600 }}>Enable Two-factor Authentication</h6>
                    <p style={{ fontSize: 14 , fontFamily:"Montserrat", color:'#4B4B4B',lineHeight:'19.6px',fontStyle:'normal', fontWeight:500 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum purus dolor duis sodales massa porttitor orci lectus. Ac quis placerat diam odio ut.</p>
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
                    <h6 style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#222',lineHeight:'normal',fontStyle:'normal', fontWeight:600 }}>Email Setup</h6>
                    <p style={{ fontSize: 14 , fontFamily:"Montserrat", color:'#4B4B4B',lineHeight:'19.6px',fontStyle:'normal', fontWeight:500 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum purus dolor duis sodales massa porttitor orci lectus. Ac quis placerat diam odio ut.</p>
                  </div>
                  <div className='col-2'>
                    <Form.Check type="switch" id="custom-switch" />
                 
                  </div>
                </div>


                <div className='d-flex  justify-content-between me-2'>
                  <div className='col-6'>
                    <h6 style={{ fontSize: 16 , fontFamily:"Gilroy", color:'#222',lineHeight:'normal',fontStyle:'normal', fontWeight:600 }}>SMS Setup</h6>
                    <p style={{ fontSize: 14 , fontFamily:"Montserrat", color:'#4B4B4B',lineHeight:'19.6px',fontStyle:'normal', fontWeight:500 }}>Lorem ipsum dolor sit amet consectetur. Lorem ipsum purus dolor duis sodales massa porttitor orci lectus. Ac quis placerat diam odio ut.</p>
                  </div>
                  <div className='col-2'>
                    <Form.Check type="switch" id="custom-switch" />
                  </div>
                </div>

                <div className='justify-content-end mt-3'>
                    <Button style={{fontFamily:'Montserrat', fontSize: 16,fontWeight:500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing:1, borderRadius: 12, width: 170, padding: "18px, 10px, 18px, 10px" }} onClick={handleTwoStepVerify}> Save Changes</Button>

                  </div>

                
               
              </>
        </TabPanel>



        <TabPanel value="2">
          <div style={{display:'flex', flexDirection:'row'}}>
            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
        <div className='col-lg-11 col-md-11 col-sm-12 col-xs-12'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                      <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#222", fontStyle:'normal', lineHeight:'normal'}}>
                        Select Hostel
                      </Form.Label>
                    <Form.Select aria-label="Default select example" 
           className='border'     value={selectedHostel.id} onChange={(e) => handleHostelChange(e)}  style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 65, borderRadius: 8 }}>

                        <option style={{ fontSize: 14, fontWeight: 600, }} >Select PG</option>
                        {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                            <>
                                <option key={item.id} value={item.id} >{item.Name}</option></>
                        ))}

                    </Form.Select>
                </Form.Group>

                  </div>
                  <div className='col-lg-11 col-md-4 col-sm-12 col-xs-12' style={{border:'1px solid #ced4da',padding:'30px',borderRadius:'20px'}}>
                    <div style={{display:'flex',flexDirection:'column'}}>

                    <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#000", fontStyle:'normal', lineHeight:'normal'}}
          >
            Unit
          </Form.Label>
          <Form.Control
          style={{padding:'10px',marginTop:'10px',backgroundColor: "#E7F1FF"}}
            type="text"
            placeholder="Unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </Form.Group>
      </div>

      <div className='col-lg-11 col-md-12 col-sm-12 col-xs-12'>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label style={{fontFamily:'Gilroy', fontSize: 14,fontWeight:500, color: "#000", fontStyle:'normal', lineHeight:'normal'}}
          >
            Amount / Unit 
          </Form.Label>
          <Form.Control
            style={{padding:'10px',marginTop:'10px'}}
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Form.Group>
      </div>
                    </div>
              <div  className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <Button className='col-lg-11 col-md-12 col-sm-12 col-xs-12' onClick={handlesaveEbbill} style={{fontFamily:'Montserrat', fontSize: 16,fontWeight:500, backgroundColor: "#1E45E1", color: "white", height: 56, letterSpacing:1, borderRadius: 12 }}>
               Save Changes</Button>
              </div>

                  </div>
                  </div>

                  <hr style={{ border:'1px solid #ced4da',   transform: 'rotate(180deg)'}}/>


                  <div className='col-lg-6 col-md-5 col-sm-12 col-xs-12 ms-5'> 
                  <Table className="ebtable mt-3" responsive  >
                          <thead style={{ backgroundColor: "#E7F1FF" }}>
                            <tr>

                              <th style={{color:'#222', paddingLeft: "40px",  fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy",fontStyle:'normal',lineHeight:'normal', paddingRight: "10px", paddingTop: "10px", paddingBottom: "10px" }}>Paying guest</th>
                              <th style={{color:'#222',fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" ,fontStyle:'normal',lineHeight:'normal'}}>Unit</th>
                              <th style={{color:'#222',fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" ,fontStyle:'normal',lineHeight:'normal'}}>Amount </th>
                              <th style={{color:'#222',fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px",fontStyle:'normal',lineHeight:'normal', }}></th>
                              {/* <th style={{ color: "#939393", fontWeight: 500, fontSize: "14px", fontFamily: "Gilroy", padding: "10px" }}>Dated</th> */}

                            </tr>
                          </thead>
                          <tbody style={{ height: "50px", fontSize: "11px" }}>
                           
                          {state.Settings.EBBillingUnitlist?.eb_settings && state.Settings.EBBillingUnitlist.eb_settings.length > 0 &&state.Settings.EBBillingUnitlist.eb_settings.map((eb) => (
                                <tr  style={{ lineHeight: "40px" }}>
                                  <td style={{ paddingLeft: "40px", fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{eb.Name}</td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{eb.unit} KW </td>
                                  <td style={{ fontWeight: 500, fontSize: "16px", fontFamily: "Gilroy" }}>{eb.amount}</td>
                                  <td> <img src={dottt} style={{ height: 30, width: 30 }} /></td>
                                </tr>
                          ))}
                            {/* {currentRowsEb.length === 0 && (
                              <tr>
                                <td colSpan="6" style={{ textAlign: "center", color: "red" }}>No data found</td>
                              </tr>
                            )} */}

                          </tbody>
                        </Table>
                  </div>
                  </div>
           </TabPanel>
        <TabPanel value="3"><InvoiceSettings /> </TabPanel>
        <TabPanel value="4"><ExpencesSettings/> </TabPanel>
        <TabPanel value="5"><Complaintsettings/> </TabPanel>
        <TabPanel value="6"><Amenities /> </TabPanel>
      </TabContext>

      {/* <div className='mt-0 ' style={{}}>
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
                  </div>
                  <div className='justify-content-end'>
                    <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} onClick={handleTwoStepVerify} >Save change</button>
                  </div>
                </div>
                <hr style={{ opacity: 0.1 }} />

                <div className='mt-4 mb-5'>
                  <h6 style={{ fontWeight: 700, textDecorationLine: 'underline' }}>Password Management</h6>
                </div>
                <div className='d-flex  justify-content-between mt-2 me-2 mb-3'>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Login Two-Step Verification</h6>
                  </div>
                  <div>
                  <Form.Check 
        type="switch"
        id="custom-switch"
        checked={isChecked}
        onChange={handleChange}
      />
                  
                  </div>
                </div>


                <div className='d-flex  justify-content-between me-2 mb-3 '>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Email Setup</h6>
                  </div>
                  <div>
                    <Form.Check type="switch" id="custom-switch" />
                 
                  </div>
                </div>


                <div className='d-flex  justify-content-between me-2'>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>SMS Setup</h6>
                  </div>
                  <div>
                    <Form.Check type="switch" id="custom-switch" />
                  </div>
                </div>

                <div className='mt-4 mb-4'>
                  <h6 style={{ fontWeight: 650, textDecorationLine: 'underline' }}>Password Security</h6>
                </div>

                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Password Change</h6>
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
      </div> */}

    </div>
  )
}

export default Settings