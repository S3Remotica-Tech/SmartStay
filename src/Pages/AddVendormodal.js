
//  this component not used now///////////////////////////////////////




// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import Profile from '../Assets/Images/New_images/profile-picture.png'
// import Image from 'react-bootstrap/Image';
// import Plus from '../Assets/Images/New_images/add-circle.png'
// import Form from 'react-bootstrap/Form';
// import { useDispatch, useSelector } from 'react-redux';
// import Swal from 'sweetalert2';



// function StaticExample({ show, handleClose }) {

//   const state = useSelector(state => state)
//   const dispatch = useDispatch();





//   const [file, setFile] = useState(null)
//   const [first_Name, setFirst_Name] = useState('')
//   const [last_Name, setLast_Name] = useState('')
//   const [vendor_Mobile, setVendor_Mobile] = useState('')
//   const [address, setAddress] = useState('')
//   const [email_Id, setEmail_Id] = useState('')
//   const [errors, setErrors] = useState({});
//  const [business_Name, setBusiness_Name] = useState('')







// const handleBusinessChange = (e) =>{
//   setBusiness_Name(e.target.value)
// }


//   const handleImageChange = (event) => {
//     const fileimgage = event.target.files[0];
//     if (fileimgage) {
//       setFile(fileimgage);
//     }
//   };

//   const handleFirstNameChange = (e) => {
//     setFirst_Name(e.target.value)
//   }

//   const handleLastNameChange = (e) => {
//     setLast_Name(e.target.value)
//   }

//   const handleMobileChange = (e) => {
//     const value = e.target.value;
//     setVendor_Mobile(value);
//     const pattern = new RegExp(/^\d{1,10}$/);
//     const isValidMobileNo = pattern.test(value);
//     if (isValidMobileNo && value.length === 10) {
//       setErrors(prevErrors => ({ ...prevErrors, vendor_Mobile: '' }));
//     } else {
//       setErrors(prevErrors => ({ ...prevErrors, vendor_Mobile: 'Invalid mobile number *' }));
//     }
//   }


//   const handleAddressChange = (e) => {
//     setAddress(e.target.value)
//   }

//    const handleEmailChange = (e) => {
//     const email = e.target.value;
//     setEmail_Id(email);
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     const isValidEmail = emailRegex.test(email);
//     if (isValidEmail) {
//       setErrors(prevErrors => ({ ...prevErrors, email_Id: '' }));
//     } else {
//       setErrors(prevErrors => ({ ...prevErrors, email_Id: 'Invalid Email Id *' }));
//     }
//   }

// const handleAddVendor = () =>{

//   if (errors.email_Id === 'Invalid Email Id *') {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Enter Valid Email Id',
//       timer: 2000
//     });
//     return;
//   }
  
//   if (errors.vendor_Mobile === 'Invalid mobile number *') {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Enter Valid Mobile Number',
//       timer: 2000
//     });
//     return;
//   }



// if(first_Name &&  last_Name && vendor_Mobile && email_Id && address ){
//   dispatch({ type : 'ADDVENDOR' ,
//      payload :  
//      {profile : file, first_Name: first_Name, Last_Name: last_Name ,Vendor_Mobile: vendor_Mobile, Vendor_Email: email_Id, Vendor_Address: address ,Business_Name: business_Name }})
//      setFile('')
//      handleClose()
//      setFirst_Name('')
//      setLast_Name('')
//      setVendor_Mobile('')
//      setAddress('')
//      setEmail_Id('')
//      setBusiness_Name('')
//     }
// else{
//   Swal.fire({
//     icon: 'warning',
//     title: 'Please Enter All Fields',
//     timer:1000
//      });
// }
// }

// useEffect(() => {
//   const closeButton = document.querySelector('button[aria-label="close-button"]');
//   if (closeButton) {
//     closeButton.style.backgroundColor = 'white';
//     closeButton.style.borderRadius = '50%';
//     closeButton.style.width = '10px';
//     closeButton.style.height = '10px';
//     closeButton.style.border = '1.5px solid #222222';
//     closeButton.style.padding = '9px';
//   }
// }, []);



//   return (
//     <div
//       className="modal show"
//       style={{ display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif", 
//        }}
//     >
//       <Modal show={show} onHide={handleClose}  centered>
//       <Modal.Dialog style={{ maxWidth:850, width: '100%' }} className='m-0 p-0'>
//         <Modal.Header closeButton closeLabel="close-button" style={{border:"1px solid #E7E7E7"}}>
//           <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Add a vendor</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <div className='d-flex align-items-center'>


//             <div className="" style={{ height: 100, width: 100, position: "relative" }}>

//               <Image src={file ? URL.createObjectURL(file) : Profile} roundedCircle style={{ height: 100, width: 100 }} />
//               <label htmlFor="imageInput" className='' >
//                 <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)' }} />
//                 <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 className="sr-only"
//                 id="imageInput"
//                 onChange={handleImageChange}
//                 style={{ display: "none" }} />      
//               </label>



             

//             </div>
//             <div className='ps-3'>
//               <div>
//                 <label style={{ fontSize: 16, fontWeight: 500 ,color:"#222222", fontFamily: "Gilroy,sans-serif"}}>Profile Photo</label>
//               </div>
//               <div>
//                 <label style={{ fontSize: 14, fontWeight: 500 ,color:"#4B4B4B", fontFamily: "Gilroy,sans-serif"}}>Max size of image 10MB</label>
//               </div>
//             </div>
//           </div>

//           <div className='row mt-4'>
//             <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>First Name</Form.Label>
//                 <Form.Control  onChange={(e)=> handleFirstNameChange(e)} value={first_Name} type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" ,height: 50, borderRadius:8}} />
//               </Form.Group>

//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Last Name</Form.Label>
//                 <Form.Control   value={last_Name} onChange={(e)=> handleLastNameChange(e)} type="text" placeholder="Enter name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" ,height: 50, borderRadius:8}} />
//               </Form.Group>

//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Mobile Number</Form.Label>
//                 <Form.Control   value={vendor_Mobile} onChange={(e)=>  handleMobileChange(e)} type="text" placeholder="Enter Mobile Number" maxLength={10} style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" ,height: 50, borderRadius:8}}/>
//               </Form.Group>

//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Email ID</Form.Label>
//                 <Form.Control   value={email_Id} onChange={(e)=> handleEmailChange(e)} type="email" placeholder="Enter email address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" ,height: 50, borderRadius:8}} />
//               </Form.Group>

//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Business Name</Form.Label>
//                 <Form.Control   value={business_Name} onChange={(e)=>  handleBusinessChange(e)} type="text" placeholder="Enter Business Name" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" ,height: 50, borderRadius:8}} />
//               </Form.Group>

//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
//               <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
//                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 500 }}>Address</Form.Label>
//                 <Form.Control   value={address} onChange={(e)=>  handleAddressChange(e)} type="text" placeholder="Enter Address" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" ,height: 50, borderRadius:8}} />
//               </Form.Group>

//             </div>
//           </div>

//         </Modal.Body>
//         <Modal.Footer style={{ border: "none" }}>

//           <Button  className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height:50, borderRadius:12, fontSize:16, fontFamily:"Montserrat, sans-serif" }} onClick={handleAddVendor}>
//             Add vendor
//           </Button>
//         </Modal.Footer>
//         </Modal.Dialog>
//       </Modal>
//     </div>
//   );
// }

// export default StaticExample;