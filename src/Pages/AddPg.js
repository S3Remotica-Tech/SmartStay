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


function AddPg({ show, handleClose, currentItem }) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [pgName, setPgName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [floors, setFloors] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [errorsPG, setErrorsPG] = useState({});
  const [initialState, setInitialState] = useState({});

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



  const handleMobileChange = (e) => {
    const value = e.target.value;
    setMobile(value);
    const pattern = new RegExp(/^\d{1,10}$/);
    const isValidMobileNo = pattern.test(value);
    if (isValidMobileNo && value.length === 10) {
      setErrors(prevErrors => ({ ...prevErrors, mobile: '' }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, mobile: 'Invalid mobile number *' }));
    }
  };




  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isValidEmail = emailRegex.test(emailValue);

    setErrors(prevErrors => ({
        ...prevErrors,
        email: isValidEmail ? '' : 'Invalid Email Id *'
    }));
};



  const handlePgNameChange = (e) => {
    setPgName(e.target.value);
  };



 

  const handleFloorsChange = (e) => {
    setFloors(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

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


  const handleCreatePayingGuest = () => {
    const emailError = errors.email === 'Invalid Email Id *';
    const mobileError = errors.mobile === 'Invalid mobile number *';


    if(!pgName && !mobile && !email && !location){
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Fields',
    

      });
      return;
    }

    if (errors.email)  {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Valid Email Id',
       
      });
      return;
    }

    if (mobileError) {
      Swal.fire({
        icon: 'warning',
        title: 'Enter Valid Mobile Number',
     
      });
      return;
    }

    const isChanged = 
    pgName !== initialState.pgName || 
    Number(mobile) !== Number(initialState.mobile) || 
    email !== initialState.email || 
    location !== initialState.location || 
    file !== initialState.file;

  if (!isChanged) {
    Swal.fire({
      icon: 'warning',
      title: 'No changes detected',
     
    });
    return;
  }


    if (pgName && mobile && email && location) {
      dispatch({ type: 'PGLIST', payload: { profile: file, name: pgName, phoneNo: mobile, email_Id: email, location: location, id: currentItem.id } })
      // handleClose()
      setFile('')
      setPgName('')
      setMobile('')
      setEmail('')

      setLocation('')
    } else {
      
    }



  }

  console.log("current Item", currentItem)


  // useEffect(() => {
  //   if (currentItem) {
  //     setPgName(currentItem.Name || '')
  //     setMobile(currentItem.hostel_PhoneNo || '')
  //     setEmail(currentItem.email_id || '')
  //     setLocation(currentItem.Address)
  //     if (currentItem.profile) {
  //       const profile = currentItem.profile;
  //       if (typeof profile === 'string') {
  //         setFile(profile);
  //       } else if (profile instanceof Blob) {
  //         setFile(profile);
  //       } else {
  //         setFile(null);
  //         console.warn('Invalid profile format');
  //       }
  //     }

  //   }
  // }, [currentItem])




  useEffect(() => {
    if (currentItem) {
      const initialData = {
        pgName: currentItem.Name || '',
        mobile: currentItem.hostel_PhoneNo || '',
        email: currentItem.email_id || '',
        location: currentItem.Address,
        file: currentItem.profile ? (typeof currentItem.profile === 'string' ? currentItem.profile : null) : null,
      };

      setPgName(initialData.pgName);
      setMobile(initialData.mobile);
      setEmail(initialData.email);
      setLocation(initialData.location);
      setFile(initialData.file);
      setInitialState(initialData); // Save initial state
    }
  }, [currentItem]);


















  return (
    <div
      className="modal show"
      style={{
        display: 'block', position: 'initial',
      }}
    >
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
          <Modal.Header closeButton closeLabel="close-button" style={{}}>
            <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>{currentItem ?  "Edit Paying Guest": "Add Paying Guest"}</Modal.Title>
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
                  <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy" }}>Image</label>
                </div>
                <div>
                  <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>Max size of image 10MB</label>
                </div>
              </div>
            </div>

            <div className='row mt-4'>
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest Name</Form.Label>
                  <Form.Control
                    value={pgName}
                    onChange={handlePgNameChange}
                    type="text" placeholder="Enter PG name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:pgName ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>

              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Mobile no.</Form.Label>
                  <Form.Control
                    value={mobile}
                    onChange={handleMobileChange}
                    type="text" placeholder="9876543210" maxLength={10} 
                    style={{
                      fontSize: 16,color:"#4B4B4B" ,fontFamily: "Gilroy", fontWeight: mobile ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 ,
                                       
                    }} />
                </Form.Group>

              </div>
              <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Email ID</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={handleEmailChange}
                    type="email" placeholder="email@gmail.com" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:email ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
              {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500}}>Number of floors</Form.Label>
                <Form.Control 
                value={floors}
                onChange={handleFloorsChange}
                 type="text" placeholder="Enter no. of floors" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div> */}
              <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Address</Form.Label>
                  <Form.Control
                    value={location}
                    onChange={handleLocationChange}
                    type="text" placeholder="Enter address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:location ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
                </Form.Group>

              </div>
            </div>

          </Modal.Body>
          <Modal.Footer style={{ border: "none" }}>

            <Button onClick={handleCreatePayingGuest} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }}>
            {currentItem ?  "Edit Paying Guest": "Add Paying Guest"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  )
}

export default AddPg
