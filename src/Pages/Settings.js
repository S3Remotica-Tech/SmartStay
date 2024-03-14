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


  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };
  const LoginId = localStorage.getItem("loginId")
  const Loginname = localStorage.getItem("NameId")
  const Loginemail = localStorage.getItem("emilidd")
  const Loginphone = localStorage.getItem("phoneId")

  console.log("Loginemail",Loginemail)

  useEffect(() => {
    const decryptedData = CryptoJS.AES.decrypt(LoginId, 'abcd');
    const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
    const parsedData = decryptedString;
    setId(parsedData)

    const decryptedDataname = CryptoJS.AES.decrypt(Loginname, 'abcd');
    const decryptedStringname = decryptedDataname.toString(CryptoJS.enc.Utf8);
    const parsedDataname = decryptedStringname;
    setName(parsedDataname)

    const decryptedDataphone = CryptoJS.AES.decrypt(Loginphone, 'abcd');
    const decryptedStringphone = decryptedDataphone.toString(CryptoJS.enc.Utf8);
    const parsedDatphone = decryptedStringphone;
    setPhone(parsedDatphone)

    const decryptedDataemail = CryptoJS.AES.decrypt(Loginemail, 'abcd');
    const decryptedStringemail = decryptedDataemail.toString(CryptoJS.enc.Utf8);
       setEmail(decryptedStringemail)
       console.log("decryptedStringemail",decryptedStringemail)

  }, [])


  useEffect(() => {
    dispatch({
      type: 'LOGININFO'
    });
    setUpdateval(state.login.loginInformation)
  })

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    marginTop: 15,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));
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
    if (!Name || !phone || !email || !Address || !Country || !City || !statee) {
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
    dispatch({
      type: 'CREATE_ACCOUNT',
      payload: { name: Name, mobileNo: phone, emailId: email, Address: Address, Country: Country, City: City, State: statee, id: id }
    });
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setCountry('');
    setCity("");
    setStatee("");
  }

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    console.log("eventChecked",event.target.checked)
    setIsChecked(event.target.checked);
  };


  console.log("email for Login User",email)
  const handleTwoStepVerify = () => {
    console.log("executed")
dispatch({ type : 'TWOSTEPVERIFY', payload : { emailId : email, isEnable : isChecked}})
dispatch({type:'CLEAR_ERROR'})
  }




  return (
    <div className='container-fluid'>
      <div className="d-flex row justify-content-between mt-2 ms-4 me-4 pt-3">
        <div className='col-lg-8 col-md-6 col-sm-12'>
          <h1 style={{ fontSize: "26px" }}>Settings</h1>
          <p>Manage your account settings</p>
        </div>


      </div>

      <div className='conatiner mt-0 ' style={{}}>
        <div className='d-flex flex-column flex-md-row Page_Content' >
          <div className="sidebar col-12 col-md-4 col-lg-3 pt-5">
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Personal' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Personal')}
            >
              <FaCircleExclamation style={{ fontSize: '16px', marginRight: '8px' }} />  Personal Information
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Security' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Security')}
            >
              <SecurityIcon style={{ fontSize: '16px', marginRight: '8px' }} />  Security
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'EB_Billings' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('EB_Billings')}
            >
              <ReceiptIcon style={{ fontSize: '16px', marginRight: '8px' }} />  EB Billing
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Plans' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Plans')}
            >
              <EventNoteIcon style={{ fontSize: '16px', marginRight: '8px' }} />  Plans
            </div>
            <div
              style={{ fontSize: '13px' }}
              className={selectedTab === 'Invoice_Settings' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Invoice_Settings')}
            >
              <ShoppingBagIcon style={{ fontSize: '16px', marginRight: '8px' }} />  Invoice Settings
            </div>

          </div>
          <hr class="vl" />

          <div className="col-12 col-md-8 col-lg-8 pt-5" style={{ backgroundColor: '#F8F9FA', paddingLeft: '30px' }}>
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

                <div className='d-flex flex-column flex-md-row mt-1' style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className='col-lg-3 col-md-3 col-sm-12' style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image src={Men} roundedCircle style={{ height: "38px", width: "38px" }} />
                    <h6 className='mt-2 ms-3' style={{ fontSize: '14px', fontWeight: 700 }}>Rahul Sharma</h6>
                  </div>

                  <div className='col-lg-6 col-md-7 col-sm-12 ms-5 mt-1'>
                    <button type="button" class="ChangeBtn mb-3"  >Change Photo</button>
                    <button type="button" class="CancelBtn"  >Delete</button>
                  </div>
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
                <div className='d-flex  justify-content-between mt-2'>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Login Two-Step Verification</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <AntSwitch 
                    checked={isChecked}
      onChange={handleChange} inputProps={{ 'aria-label': 'ant design' }} />
                  </div>
                </div>


                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>Email Setup</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  </div>
                </div>


                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 650 }}>SMS Setup</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
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
            {selectedTab === 'EB_Billings' && <h2>EB Billings</h2>}
            {selectedTab === 'Plans' && <h2>Plans</h2>}
            {selectedTab === 'Invoice_Settings' && <h2>Invoice Settings</h2>}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Settings