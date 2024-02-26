import React, { useState } from 'react'
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




function Settings() {

  const [selectedTab, setSelectedTab] = useState('Personal');

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName);
  };

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

  return (
    <div className='container-fluid'>
      <div className="d-flex row justify-content-between mt-2 ms-4 me-4 pt-3">
        <div className='col-lg-8 col-md-6 col-sm-12'>
          <h1 style={{ fontSize: "26px" }}>Settings</h1>
          <p>Manage your account settings</p>
        </div>

        <div className='justify-content-end  col-lg-4 col-md-4 col-sm-12 pt-3'>
          <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }} >Save change</button>
          <button type="button" class="mb-2" style={{ backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }} >Cancel</button>

        </div>
      </div>

      <div className='conatiner mt-0 '>
        <div className='d-flex flex-column flex-md-row Page_Content' >
          <div className="sidebar col-12 col-md-4 col-lg-3">
            <div
              className={selectedTab === 'Personal' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Personal')}
            >
              <FaCircleExclamation />  Personal Information
            </div>
            <div
              className={selectedTab === 'Security' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Security')}
            >
              <SecurityIcon />  Security
            </div>
            <div
              className={selectedTab === 'EB_Billings' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('EB_Billings')}
            >
              <ReceiptIcon />  EB Billing
            </div>
            <div
              className={selectedTab === 'Plans' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Plans')}
            >
              <EventNoteIcon />  Plans
            </div>
            <div
              className={selectedTab === 'Invoice_Settings' ? 'tab active' : 'tab'}
              onClick={() => handleTabClick('Invoice_Settings')}
            >
              <ShoppingBagIcon />  Invoice Settings
            </div>

          </div>
          <hr class="vl" />

          <div className="content col-12 col-md-8 col-lg-8" style={{ backgroundColor: '#F8F9FA', paddingLeft: '30px' }}>
            {selectedTab === 'Personal' &&
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700 }}>General Information</h2>
                <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                <hr style={{ opacity: 0.1 }} />
                <h5 style={{ fontWeight: 700 }}>Profile Picture</h5>

                <div className='d-flex flex-column flex-md-row' style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className='col-lg-3 col-md-3 col-sm-12' style={{ display: 'flex', flexDirection: 'row' }}>
                    <Image src={Men} roundedCircle style={{ height: "38px", width: "38px" }} />
                    <h6 className='mt-2 ms-2' style={{ fontWeight: 700 }}>Rahul Sharma</h6>
                  </div>

                  <div className='col-lg-6 col-md-7 col-sm-12 ms-5 mt-1'>
                    <button type="button" class="ChangeBtn mb-3"  >Change Photo</button>
                    <button type="button" class="CancelBtn"  >Delete</button>
                  </div>
                </div>

                <div class="mb-2 mt-3" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <label class="sr-only mb-0" style={{ fontSize: "12px", marginTop: "2%", fontWeight: "530" }}><b>Name or Business Name </b></label>
                  <input class="Name form-control mt-1" style={{ width: "100%", padding: "1.3%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="name" id="name" placeholder="Royal Grand Hostel" name="name" />
                </div>

                <div style={{ display: 'flex', width: "100%" }} >

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Phone Number</b></label>
                    <input class="Phone form-control mt-1" maxLength={10} style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="phone" id="phone" placeholder="123-098-345-09" name="Phone" />
                    <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Email Address</b></label>
                    <input class="Email form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="email" id="email" placeholder="XYZ@gmail.com" name="email" />
                    <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                  </div>

                </div>

                <div style={{ display: 'flex', width: "100%" }} >

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Address</b></label>
                    <input class="Phone form-control mt-1" maxLength={10} style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="address" id="address" placeholder="XYZ" name="address" />

                  </div>

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>Country</b></label>
                      <select class="form-select" aria-label="Default select example" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }}>
                       <option selected>Country</option>
                       <option value="1">India</option>
                       <option value="2">USA</option>
                       <option value="3">England</option>
                    </select>
                  </div>

                </div>

                <div style={{ display: 'flex', width: "100%", marginBottom: '20px' }} >

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start', marginRight: "4%" }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>City</b></label>
                    <input class="Phone form-control mt-1" maxLength={10} style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="city" id="city" placeholder="dfg" name="city" />

                  </div>

                  <div className="Input_field" style={{ display: "flex", flexDirection: "column", alignItems: 'start' }}>
                    <label class="sr-only" style={{ fontSize: "12px", fontWeight: "530" }}><b>State</b></label>
                    <input class="Email form-control mt-1" style={{ width: "100%", padding: "3.4%", border: "none", fontSize: 12, marginTop: "2%", boxShadow: "none" }} type="state" id="state" placeholder="Kjgf" name="state" />

                  </div>

                </div>


              </div>

            }

            {selectedTab === 'Security' &&
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Security</h2>
                <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                <hr />

                <div className='mt-4 mb-5'>
                  <h6 style={{ fontWeight: 700, textDecorationLine: 'underline' }}>Password Management</h6>
                </div>
                <div className='d-flex  justify-content-between mt-2'>
                  <div>
                    <h6 style={{ fontWeight: 700 }}>Login Two-Step Verification</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  </div>
                </div>


                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 700 }}>Email Setup</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  </div>
                </div>


                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 700 }}>SMS Setup</h6>
                    <p style={{ color: '#67686C' }}>Lorem Ipsum dolor sit amet consectetur</p>
                  </div>
                  <div>
                    <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                  </div>
                </div>

                <div className='mt-4 mb-5'>
                  <h6 style={{ fontWeight: 700, textDecorationLine: 'underline' }}>Password Security</h6>
                </div>

                <div className='d-flex  justify-content-between '>
                  <div>
                    <h6 style={{ fontWeight: 700 }}>Password Change</h6>
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