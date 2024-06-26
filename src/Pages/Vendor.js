import React, { useState, useEffect } from 'react';
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import Filter from '../Assets/Images/New_images/Group 13.png';
import Image from 'react-bootstrap/Image';
import { FaSearch } from 'react-icons/fa';
import { FormControl, InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Vendors from '../Assets/Images/New_images/profile-picture.png';
import Badge from 'react-bootstrap/Badge';
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import AddVendor from './AddVendormodal';
import { useDispatch, useSelector } from 'react-redux';


function Vendor() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("/////////state for VEndor/////////////", state)

  useEffect(() => {
    dispatch({ type: 'VENDORLIST' })
  }, [])

useEffect(()=>{
  if(state.ComplianceList.addVendorSuccessStatusCode === 200){
    setTimeout(()=>{
      dispatch({ type: 'VENDORLIST' })
      console.log("get vendor list executed")
    },100)
      setTimeout(()=>{
      dispatch({ type: 'CLEAR_ADD_VENDOR_STATUS_CODE' })
    },5000)
  }
},[state.ComplianceList.addVendorSuccessStatusCode])


console.log("state.ComplianceList.addVendorSuccessStatusCode == 200",state.ComplianceList.addVendorSuccessStatusCode == 200)




  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {

    console.log('Search query:', query);
  };

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }



  return (

    <div style={{ width: "100%" }} className=''>
      <div className='m-4'>
        <div className='d-flex justify-content-end align-items-center mb-4'>

          <div>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
                <CiSearch style={{ fontSize: 20 }} />
              </InputGroup.Text>
              <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
                placeholder="Search..."
              />
            </InputGroup>
          </div>
          <div className="mr-3">
            <img src={Notify} alt="notification" />
          </div>

          <div className="mr-3">
            <Image src={Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <label style={{ fontSize: 20, color: "#000000", fontWeight: 700 }}>Vendors</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
            </div>

            <div>
              <Button onClick={handleShow} style={{ backgroundColor: "#1E45E1", color: "white", height: 50, fontWeight: 550, borderRadius: 10, width: "auto" }}> + Add Vendor</Button>
            </div>



          </div>
        </div>

        <div className='row row-gap-3'>
          {state.ComplianceList.VendorList && state.ComplianceList.VendorList.map((vendor) => (
            <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
              <Card key={vendor.id} style={{ borderRadius: 20, border: "1px solid lightgray" }}>
                <Card.Body style={{ padding: 20 }}>
                  <div className="d-flex justify-content-between align-items-center" >
                    <div className='d-flex gap-2'>
                      <div className="">
                        <Image src={vendor.Vendor_profile ? vendor.Vendor_profile : Vendors} roundedCircle style={{ height: "60px", width: "60px" }} />
                      </div>
                      <div >
                        <div className='pb-2'>
                          <label style={{ fontSize: 15, color: "#000000", fontWeight: 500 }} >{vendor.Vendor_Name}</label>
                        </div>
                        <div>
                          <div style={{ backgroundColor: "#FFEFCF", fontWeight: 700, width: "fit-content", padding: 5, borderRadius: 10, fontSize: 10 }}>Business Name</div>

                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid lightgray", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-3">

                    <div className='mb-2'>
                      <div className='mb-1'>
                        <label style={{ color: "gray", fontSize: 15, fontWeight: 500 }}>Email ID </label>
                      </div>
                      <div >
                        <label style={{ color: "#000000", fontSize: 15, fontWeight: 700 }}>{vendor.Vendor_Email}</label>
                      </div>

                    </div>
                    <div className='mb-2'>
                      <div className='mb-1'>
                        <label style={{ color: "gray", fontSize: 15, fontWeight: 500 }}>Contact Number</label>
                      </div>
                      <div>
                        <label style={{ color: "#000000", fontSize: 15, fontWeight: 700 }}>+91 {vendor.Vendor_Mobile}</label>
                      </div>

                    </div>
                  </div>

                  <div className='mb-2'>
                    <div className='mb-1'>
                      <label style={{ color: "gray", fontSize: 15, fontWeight: 500 }}> Address</label>

                    </div>

                    <div>
                      <label style={{ color: "#000000", fontSize: 15, fontWeight: 700 }}>{vendor.Vendor_Address}</label>
                    </div>

                  </div>




                </Card.Body>
              </Card>

            </div>
          ))}
        </div>
      </div>

      {show &&
        <AddVendor show={show} handleClose={handleClose} />
      }

    </div>


  )
}

export default Vendor;