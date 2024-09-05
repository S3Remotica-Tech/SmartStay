import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import {  InputGroup} from 'react-bootstrap';



function AddVendor({ show, handleClose, currentItem }) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [file, setFile] = useState(null)
  const [first_Name, setFirst_Name] = useState('')
  const [last_Name, setLast_Name] = useState('')
  const [vendor_Mobile, setVendor_Mobile] = useState('')
  const [address, setAddress] = useState('')
  const [email_Id, setEmail_Id] = useState('')
  const [errors, setErrors] = useState({});
  const [business_Name, setBusiness_Name] = useState('')
  const [id, setId] = useState('')
  const [vendor_Id, setVendor_Id] = useState('')

  const [check, setCheck] = useState(null)


  const [countryCode, setCountryCode] = useState('91');


  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };


  const handleBusinessChange = (e) => {
    const value = e.target.value;

    if (value === "") {
        setBusiness_Name(value);
        setErrors(prevErrors => ({ ...prevErrors, businessName: "Business name cannot be empty or spaces only" }));
        return;
    }

       if (value.trim() !== "") {
        setBusiness_Name(value);
        setErrors(prevErrors => ({ ...prevErrors, businessName: "" }));
    }
};



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
    const value = e.target.value;
    
       if (value === "") {
        setFirst_Name(value);
        setErrors(prevErrors => ({ ...prevErrors, firstName: "First name cannot be empty or spaces only" }));
        return;
    }
  
    if (value.trim() !== "") {
        setFirst_Name(value);
        setErrors(prevErrors => ({ ...prevErrors, firstName: "" }));
    }
};

const handleLastNameChange = (e) => {
    const value = e.target.value;
      
    if (value === "") {
        setLast_Name(value);
        setErrors(prevErrors => ({ ...prevErrors, lastName: "Last name cannot be empty or spaces only" }));
        return;
    }
    if (value.trim() !== "") {
        setLast_Name(value);
        setErrors(prevErrors => ({ ...prevErrors, lastName: "" }));
    }
};


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
    const value = e.target.value;

      if (value === "") {
        setAddress(value);
        setErrors(prevErrors => ({ ...prevErrors, address: "Address cannot be empty or spaces only" }));
        return;
    }

     if (value.trim() !== "") {
        setAddress(value);
        setErrors(prevErrors => ({ ...prevErrors, address: "" }));
    }
};




  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail_Id(email);
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isValidEmail = emailRegex.test(email);
    if (isValidEmail) {
      setErrors(prevErrors => ({ ...prevErrors, email_Id: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email_Id: 'Invalid Email Id *' }));
    }
  }

  console.log("file", file)


  const handleAddVendor = () => {

    if (!first_Name && !vendor_Mobile && !email_Id && !address && !business_Name && !countryCode) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
      });
      return;
    }

  
  
 
  if (!first_Name) {
      Swal.fire({
          icon: 'warning',
          title: 'Please Enter a valid First Name',
      });
      return;
  }
  
  if (!vendor_Mobile) {
      Swal.fire({
          icon: 'warning',
          title: 'Please Enter a valid Mobile Number',
      });
      return;
  }
  
  if (errors.vendor_Mobile === 'Invalid mobile number *') {
    Swal.fire({
      icon: 'warning',
      title: 'Enter Valid Mobile Number',

    });
    return;
  }

  if (!countryCode) {
    Swal.fire({
        icon: 'warning',
        title: 'Please select country code',
    });
    return;
}


  if (!email_Id) {
      Swal.fire({
          icon: 'warning',
          title: 'Please Enter a valid Email ID',
      });
      return;
  }

  if (errors.email_Id === 'Invalid Email Id *') {
    Swal.fire({
      icon: 'warning',
      title: 'Enter Valid Email Id',

    });
    return;
  }

  if(!business_Name){
    Swal.fire({
      icon: 'warning',
      title: 'Please Enter a business name',
    });
    return
    }


  if (!address) {
    Swal.fire({
        icon: 'warning',
        title: 'Please Enter a valid Address',
    });
    return;
}




  

  
 





   
   


    const isChanged =
      first_Name !== initialState.first_Name ||
      last_Name !== initialState.last_Name ||
      Number(vendor_Mobile) !== Number(initialState.vendor_Mobile) ||
      address !== initialState.address ||
      email_Id !== initialState.email_Id ||
      business_Name !== initialState.business_Name ||
      file !== initialState.file ||
      countryCode !== initialState.countryCode;

    if (!isChanged) {
      Swal.fire({
        icon: 'warning',
        title: 'No changes detected',

      });
      return;
    }


    const MobileNumber = `${countryCode}${vendor_Mobile}`



    if (first_Name && MobileNumber && email_Id && address && countryCode) {
      if (check === 'EDIT') {
        dispatch({
          type: 'ADDVENDOR',
          payload:
            { profile: file, first_Name: first_Name, Last_Name: last_Name, Vendor_Mobile: MobileNumber, Vendor_Email: email_Id, Vendor_Address: address, Business_Name: business_Name,  id: id }
        })
      } else {
        dispatch({
          type: 'ADDVENDOR',
          payload:
            { profile: file, first_Name: first_Name, Last_Name: last_Name, Vendor_Mobile: MobileNumber, Vendor_Email: email_Id, Vendor_Address: address, Business_Name: business_Name }
        })
      }

      // setFile('')
      // // handleClose()
      // setFirst_Name('')
      // setLast_Name('')
      // setVendor_Mobile('')
      // setAddress('')
      // setEmail_Id('')
      // setBusiness_Name('')
    }
    else {

    }
  }


  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 200 ) {
      
      setFile('')
         setFirst_Name('')
      setLast_Name('')
      setVendor_Mobile('')
      setAddress('')
      setEmail_Id('')
      setBusiness_Name('')
    }
    }, [state.ComplianceList.addVendorSuccessStatusCode])








  useEffect(() => {
    const closeButton = document.querySelector('button[aria-label="close-button"]');
    if (closeButton) {
      closeButton.style.backgroundColor = 'white';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '10px';
      closeButton.style.height = '10px';
      closeButton.style.border = '1.5px solid #000000';
      closeButton.style.padding = '9px';
    }
  }, []);


  const [initialState, setInitialState] = useState({
    first_Name: '',
    last_Name: '',
    vendor_Mobile: '',
    address: '',
    email_Id: '',
    business_Name: '',
    file: null
  });

  useEffect(() => {
    dispatch({ type: 'COUNTRYLIST' })
  }, [])
 





  //     useEffect(()=>{
  // if(currentItem){
  //     const nameParts = currentItem.Vendor_Name.split(' ');
  //     const firstName = nameParts[0];
  //     const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  //         setCheck('EDIT')
  //       setFirst_Name(firstName)
  //       setLast_Name(lastName)
  //       setVendor_Mobile(currentItem.Vendor_Mobile)
  //       setAddress(currentItem.Vendor_Address)
  //       setEmail_Id(currentItem.Vendor_Email)
  //       setBusiness_Name(currentItem.Business_Name)
  //       setId(currentItem.id)
  //       setVendor_Id(currentItem.Vendor_Id)
  //       if (currentItem.Vendor_profile) {
  //         const profile = currentItem.Vendor_profile;
  //                if (typeof profile === 'string') {
  //                     setFile(profile);
  //         } else if (profile instanceof Blob) {
  //                   setFile(profile);
  //         } else {
  //                 setFile(null);
  //           console.warn('Invalid profile format');
  //         }
  //       }

  // }
  //     },[currentItem])

  useEffect(() => {
    if (currentItem) {
      const nameParts = currentItem.Vendor_Name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const phoneNumber = String(currentItem.Vendor_Mobile || '');
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10); 
      const mobileNumber = phoneNumber.slice(-10);



      setCheck('EDIT');
      setFirst_Name(firstName);
      setLast_Name(lastName);
      setVendor_Mobile(mobileNumber);
      setCountryCode(countryCode)
      setAddress(currentItem.Vendor_Address);
      setEmail_Id(currentItem.Vendor_Email);
      setBusiness_Name(currentItem.Business_Name);
      setId(currentItem.id);
      setVendor_Id(currentItem.Vendor_Id);
      setFile(currentItem.Vendor_profile ? currentItem.Vendor_profile : null);

  
      setInitialState({
        first_Name: firstName,
        last_Name: lastName,
        vendor_Mobile: mobileNumber,
        countryCode: countryCode,
        address: currentItem.Vendor_Address,
        email_Id: currentItem.Vendor_Email,
        business_Name: currentItem.Business_Name,
        file: currentItem.Vendor_profile ? currentItem.Vendor_profile : null
      });
    }
  }, [currentItem]);


  console.log("currentItem for add vendor", currentItem)

  return (
    <div
      className="modal show"
      style={{
        display: 'block', position: 'initial', fontFamily: "Gilroy",
      }}
    >
      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
          <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{check === 'EDIT' ? 'Edit a vendor ' : 'Add a vendor'}</Modal.Title>
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
                  <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy" }}>Profile Photo</label>
                </div>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>Max size of image 10MB</label>
                </div>
              </div>
            </div>

            <div className='row mt-4'>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>First Name</Form.Label>
                  <Form.Control onChange={(e) => handleFirstNameChange(e)} value={first_Name} type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: first_Name ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Last Name</Form.Label>
                  <Form.Control value={last_Name} onChange={(e) => handleLastNameChange(e)} type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: last_Name ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Mobile Number</Form.Label>
                  <Form.Control value={vendor_Mobile} onChange={(e) => handleMobileChange(e)} type="text" placeholder="Enter Mobile Number" maxLength={10} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: vendor_Mobile ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group> */}
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label style={{ 
              fontSize: 14, 
              color: "#222222", 
              fontFamily: "Gilroy", 
              fontWeight: 500 
            }}>
              Mobile no.
            </Form.Label>

            <InputGroup>
              <Form.Select
                value={countryCode}
                id="vendor-select-pg"
                onChange={handleCountryCodeChange}
                style={{
                  border: "1px solid #D9D9D9",
                  borderRadius: "8px 0 0 8px",
                  height: 50,
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: countryCode ? 600 : 500,
                  boxShadow: "none",
                  backgroundColor: "#fff",
                  maxWidth:90
                }}
              >
                {
                  state.UsersList?.countrycode && state.UsersList?.countrycode?.country_codes?.map((view)=>{
                    return  <option key={view.country_code} value={view.country_code}>+{view.country_code}</option>
                  })


                }
                

       
              </Form.Select>
              <Form.Control
                value={vendor_Mobile}
                onChange={handleMobileChange}
                type="text"
                placeholder="9876543210"
                maxLength={10}
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: vendor_Mobile ? 600 : 500,
                  boxShadow: "none",
                  borderLeft: "unset",
                  borderRight: "1px solid #D9D9D9",
                  borderTop: "1px solid #D9D9D9",
                  borderBottom: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: "0 8px 8px 0",
                }}
              />
            </InputGroup>
          </Form.Group> 
              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Email ID</Form.Label>
                  <Form.Control value={email_Id} onChange={(e) => handleEmailChange(e)} type="email" placeholder="Enter email address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: email_Id ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Business Name</Form.Label>
                  <Form.Control value={business_Name} onChange={(e) => handleBusinessChange(e)} type="text" placeholder="Enter Business Name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: business_Name ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Address</Form.Label>
                  <Form.Control value={address} onChange={(e) => handleAddressChange(e)} type="text" placeholder="Enter Address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: address ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
            </div>

          </Modal.Body>
          <Modal.Footer style={{ border: "none" }}>

            <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }} onClick={handleAddVendor}>
              {check === 'EDIT' ? 'Save ' : 'Add  vendor'}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}

export default AddVendor