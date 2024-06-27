import React, { useState, useEffect } from 'react';
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import Filter from '../Assets/Images/New_images/Group 13.png';
import { FaSearch } from 'react-icons/fa';
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import AddVendor from './AddVendormodal';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import VendorListMap from './VendorListMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';



function Vendor() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const [file, setFile] = useState(null)
  const [first_Name, setFirst_Name] = useState('')
  const [last_Name, setLast_Name] = useState('')
  const [vendor_Mobile, setVendor_Mobile] = useState('')
  const [address, setAddress] = useState('')
  const [email_Id, setEmail_Id] = useState('')
  const [errors, setErrors] = useState({});
  const [business_Name, setBusiness_Name] = useState('')
  const [id , setId] = useState('')
  const [vendor_Id, setVendor_Id] = useState('')

  const [check, setCheck] = useState(null)


  console.log("/////////state for VEndor/////////////", state)

  useEffect(() => {
    dispatch({ type: 'VENDORLIST' })
  }, [])

  useEffect(() => {
    if (state.ComplianceList.getVendorStatusCode === 200) {
      setFilteredData(state.ComplianceList.VendorList)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_VENDOR_STATUS_CODE' })
      }, 1000)
    }
  }, [state.ComplianceList.getVendorStatusCode])



  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: 'VENDORLIST' })
        console.log("get vendor list executed")
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_VENDOR_STATUS_CODE' })
      }, 5000)
    }
    setCheck(null)
  }, [state.ComplianceList.addVendorSuccessStatusCode])








  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setQuery(searchItem);
    if (searchItem != '') {
      const filteredItems = state.ComplianceList.VendorList && state.ComplianceList.VendorList.filter((user) =>
        user.Vendor_Name && user.Vendor_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);
    }
    else {
      setFilteredData(state.ComplianceList.VendorList)
    }
    setCurrentPage(1);
  };



  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  }
  const handleClose = () => {
    setShow(false);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditVendor = (vendorData) => {
    console.log("Edited vendor data:", vendorData);
    const nameParts = vendorData.Vendor_Name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    if (vendorData) {
      setShow(true);
      setCheck('EDIT')
      setFirst_Name(firstName)
      setLast_Name(lastName)
      setVendor_Mobile(vendorData.Vendor_Mobile)
      setAddress(vendorData.Vendor_Address)
      setEmail_Id(vendorData.Vendor_Email)
      setBusiness_Name(vendorData.Business_Name)
      setId(vendorData.id)
      setVendor_Id(vendorData.Vendor_Id)
      if (vendorData.Vendor_profile) {
        const profile = vendorData.Vendor_profile;
        // Check if the profile is a valid URL or File/Blob object
        if (typeof profile === 'string') {
          // If it's a URL, you don't need to use createObjectURL
          setFile(profile);
        } else if (profile instanceof Blob) {
          // If it's a Blob or File, use createObjectURL
          setFile(profile);
        } else {
          // If it's neither, set file to null
          setFile(null);
          console.warn('Invalid profile format');
        }
      }
    }
  };





  




  const handleBusinessChange = (e) => {
    setBusiness_Name(e.target.value)
  }


  // const handleImageChange = (event) => {
  //   const fileimgage = event.target.files[0];
  //   if (fileimgage) {
  //     setFile(fileimgage);
  //   }
  // };

 const handleImageChange = async (event) => {
  const fileImage = event.target.files[0];
  if (fileImage) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 800,
      useWebWorker: true
  };
  try {
      const compressedFile = await imageCompression(fileImage, options);
      setFile(compressedFile);
  } catch (error) {
      console.error('Image compression error:', error);
  }
  }
};


  const handleFirstNameChange = (e) => {
    setFirst_Name(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLast_Name(e.target.value)
  }

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setVendor_Mobile(value);
    const pattern = new RegExp(/^\d{1,10}$/);
    const isValidMobileNo = pattern.test(value);
    if (isValidMobileNo && value.length === 10) {
      setErrors(prevErrors => ({ ...prevErrors, vendor_Mobile: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, vendor_Mobile: 'Invalid mobile number *' }));
    }
  }


  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail_Id(email);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      setErrors(prevErrors => ({ ...prevErrors, email_Id: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email_Id: 'Invalid Email Id *' }));
    }
  }

  console.log("file",file)


  const handleAddVendor = () => {

    if (errors.email_Id === 'Invalid Email Id *') {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Valid Email Id',
        timer: 2000
      });
      return;
    }

    if (errors.vendor_Mobile === 'Invalid mobile number *') {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Valid Mobile Number',
        timer: 2000
      });
      return;
    }



    if (first_Name && last_Name && vendor_Mobile && email_Id && address) {
      if(check === 'EDIT'){
        dispatch({
          type: 'ADDVENDOR',
          payload:
            { profile: file, first_Name: first_Name, Last_Name: last_Name, Vendor_Mobile: vendor_Mobile, Vendor_Email: email_Id, Vendor_Address: address, Business_Name: business_Name ,Vendor_Id : vendor_Id, id : id }
        })
      }else{
        dispatch({
          type: 'ADDVENDOR',
          payload:
            { profile: file, first_Name: first_Name, Last_Name: last_Name, Vendor_Mobile: vendor_Mobile, Vendor_Email: email_Id, Vendor_Address: address, Business_Name: business_Name }
        })
      }
      
      setFile('')
      handleClose()
      setFirst_Name('')
      setLast_Name('')
      setVendor_Mobile('')
      setAddress('')
      setEmail_Id('')
      setBusiness_Name('')
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
        timer: 1000
      });
    }
  }

  useEffect(() => {
    const closeButton = document.querySelector('button[aria-label="close-button"]');
    if (closeButton) {
      closeButton.style.backgroundColor = 'white';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '10px';
      closeButton.style.height = '10px';
      closeButton.style.border = '1.5px solid #222222';
      closeButton.style.padding = '9px';
    }
  }, []);





  return (

    <div style={{ width: "100%", fontFamily: "Gilroy,sans-serif" }} className=''>
      <div className='m-4'>
        <div className='d-flex justify-content-end align-items-center mb-4'>

          <div>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
                <CiSearch style={{ fontSize: 20 }} />
              </InputGroup.Text>
              <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
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
            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600 }}>Vendors</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
            </div>

            <div>
              <Button onClick={handleShow} style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 151, padding: "18px, 20px, 18px, 20px" }}> + Add Vendor</Button>
            </div>
          </div>
        </div>

        <div className='row row-gap-3'>
          {currentItems && currentItems.map((vendor) => (
            <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
              <VendorListMap vendor={vendor} onEditVendor={handleEditVendor} />
              {/* <Card className="h-100" key={vendor.id} style={{ borderRadius: 16, border: "1px solid #E6E6E6" }}>
                <Card.Body style={{ padding: 20 }}>
                  <div className="d-flex justify-content-between align-items-center flex-wrap" >
                    <div className='d-flex gap-2'>
                      <div className="">
                        <Image src={vendor.Vendor_profile ? vendor.Vendor_profile : Vendors} roundedCircle style={{ height: "60px", width: "60px" }} />
                      </div>
                      <div >
                        <div className='pb-2'>
                          <label style={{ fontSize: 16, color: "#222222", fontWeight: 600, }} >{vendor.Vendor_Name}</label>
                        </div>
                        <div>
                          <div style={{ backgroundColor: "#FFEFCF", fontWeight: 500, width: "fit-content", padding: 5, borderRadius: 10, fontSize: 14 }}>{vendor.Business_Name}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                        {showDots && <>
                          <div style={{ backgroundColor: "#FFFFFF", position: "absolute", right: 0, top: 50, width: 100, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "center", padding: 10, alignItems: "center" }}>
                            <div>
                              <div className='mb-2'>
                                <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222" }}>Edit</label>
                              </div>
                              <div>
                                <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#FF0000" }}>Delete</label>
                              </div>
                            </div>
                          </div>


                        </>}

                      </div>
                    </div>
                  </div>
                  <hr style={{ border: "1px solid #E7E7E7" }} />

                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

                    <div className='mb-2'>
                      <div className='mb-1'>
                        <label style={{ color: "#939393", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy,sans-serif" }}>Email ID </label>
                      </div>
                      <div >
                        <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy,sans-serif" }}>{vendor.Vendor_Email}</label>
                      </div>

                    </div>
                    <div className='mb-2'>
                      <div className='mb-1'>
                        <label style={{ color: "#939393", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy,sans-serif" }}>Contact Number</label>
                      </div>
                      <div>
                        <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy,sans-serif" }}>+91 {vendor.Vendor_Mobile}</label>
                      </div>

                    </div>
                  </div>

                  <div className='mb-2'>
                    <div className='mb-1'>
                      <label style={{ color: "#939393", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy,sans-serif" }}> Address</label>

                    </div>

                    <div>
                      <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy,sans-serif" }}>{vendor.Vendor_Address}</label>
                    </div>

                  </div>




                </Card.Body>
              </Card> */}

            </div>
          ))
          }

          {filteredData.length == 0 &&

            <div style={{ width: 400 }}>
              <Alert variant="warning" >
                Currently, no vendors are available.
              </Alert>

            </div>
          }

        </div>
        <Pagination className="mt-4 d-flex justify-content-end">
          {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      {show &&
        <div
          className="modal show"
          style={{
            display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
              <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Add a vendor</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className='d-flex align-items-center'>


                  <div className="" style={{ height: 100, width: 100, position: "relative" }}>

                    <Image src={file ? (typeof file === 'string' ? file : URL.createObjectURL(file)) : Profile2} roundedCircle style={{ height: 100, width: 100 }} />
                    <label htmlFor="imageInput" className='' >
                      <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)' }} />
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        id="imageInput"
                        onChange={handleImageChange}
                        style={{ display: "none" }} />
                    </label>





                  </div>
                  <div className='ps-3'>
                    <div>
                      <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy,sans-serif" }}>Profile Photo</label>
                    </div>
                    <div>
                      <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif" }}>Max size of image 10MB</label>
                    </div>
                  </div>
                </div>

                <div className='row mt-4'>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>First Name</Form.Label>
                      <Form.Control onChange={(e) => handleFirstNameChange(e)} value={first_Name} type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Last Name</Form.Label>
                      <Form.Control value={last_Name} onChange={(e) => handleLastNameChange(e)} type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Mobile Number</Form.Label>
                      <Form.Control value={vendor_Mobile} onChange={(e) => handleMobileChange(e)} type="text" placeholder="Enter Mobile Number" maxLength={10} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Email ID</Form.Label>
                      <Form.Control value={email_Id} onChange={(e) => handleEmailChange(e)} type="email" placeholder="Enter email address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Business Name</Form.Label>
                      <Form.Control value={business_Name} onChange={(e) => handleBusinessChange(e)} type="text" placeholder="Enter Business Name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Address</Form.Label>
                      <Form.Control value={address} onChange={(e) => handleAddressChange(e)} type="text" placeholder="Enter Address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                    </Form.Group>

                  </div>
                </div>

              </Modal.Body>
              <Modal.Footer style={{ border: "none" }}>

                <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }} onClick={handleAddVendor}>
                  Add vendor
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      }





    </div>


  )
}

export default Vendor;