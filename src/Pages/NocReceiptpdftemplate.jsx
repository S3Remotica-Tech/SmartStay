 /* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "../Pages/Settings.css";
import { MdError } from "react-icons/md";
import Logo from '../Assets/Images/get.png'
import TextAreaICon from '../Assets/Images/textarea.png'
import "react-datepicker/dist/react-datepicker.css";
import mobblue from "../Assets/Images/New_images/Rectangleblue.png";
import substracBlue from "../Assets/Images/New_images/location 03.png";
import frameblue from "../Assets/Images/New_images/Frameblue.png";
import paidfull from '../Assets/Images/New_images/paidfull.png'
import Button from 'react-bootstrap/Button';
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import ZoomImage from '../Assets/Images/zoom.png'
import Topbottom from '../Assets/Images/cancel_presentation.png';
import left85arrow from '../Assets/Images/arrow85.png';
import printdown from '../Assets/Images/printericon.png';
import downloadicon from '../Assets/Images/pdfdown.png'; 
import CloseIcon from '../Assets/Images/close_icon.png';
import EditICon from '../Assets/Images/New_images/edit.png';
import uploadsett from "../Assets/Images/New_images/upload setting.png";
import Modal from 'react-bootstrap/Modal';
import Questionimage from '../Assets/Images/question.png';









  const NOCReceiptPdfTemplate = () => {


          
           const cardRef = useRef(null);
           const innerScrollRef = useRef(null);
           const [showFullView, setShowFullView] = useState(false);
       
           const [notes_errmsg , setNotesErrMsg] = useState('')
           const [terms_errmsg , setTermsErrMsg] = useState('')
   
          const defaultGradient = 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))';
         
           const [useGradient, setUseGradient] = useState(true);
           const [color, setColor] = useState({ r: 30, g: 69, b: 225, a: 1 }); 
           const handleColorChange = (newColor) => {
             setColor(newColor);
             setUseGradient(false); 
           }
         
           const presetColors = [
             "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
             "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
           ];
         
           const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
           const alphaValue = Math.round(color.a * 100);
         
          
         
      
     
         
         
         const handleNotesChange = (e) => {
             const Value = e.target.value  
             setNotes(Value)
         
             if (Value.trim() !== "") {
             setNotesErrMsg("");
           }
         }
         
         const handleTermsChange = (e) => {
             const Value = e.target.value  
             setTerms(Value)
         
             if (Value.trim() !== "") {
             setTermsErrMsg("");
           }
         }
         
         
         
         
         
            const [notes, setNotes] = useState(
             '"Your comfort is our priority – See you again at Smart Stay!"'
           );
         
            const [terms, setTerms] = useState(
             'Tenants must pay all dues on or before the due date, maintain cleanliness, and follow PG rules; failure may lead to penalties or termination of stay.'
           );
         

           
                     const [allowImageUpload, setAllowImageUpload] = useState(false);
                   const [currentEditingField, setCurrentEditingField] = useState(null); // "contact" or "email"
                   const [allowEditFields, setAllowEditFields] = useState({
                     contact: false,
                     email: false,
                     hostelLogo: false,
                     digitalSignature: false, 
                   });
                    const [contactnumberform , setContactNumberForm] = useState(false)
           
                       const fileInputRef = useRef(null);
                        const [signature, setSignature] = useState(null); 
                        const [signaturePreview, setSignaturePreview] = useState(null); 
                     
                     
                      const handleFileSignatureChange = (e) => {
                       const file = e.target.files[0];
                       if (file) {
                         setSignature(file);
                         setSignaturePreview(URL.createObjectURL(file)); 
                         setSignatureErrMsg("");
                         setIsSignatureConfirmed(false);
                       }
                     };
                     
                     
                       const handleClear = () => {
                         setSignature(null);
                         setSignaturePreview(null)
                         setSignatureErrMsg("");
                         if (fileInputRef.current) {
                           fileInputRef.current.value = '';
                         }
                       };
                     
                     
                       const handleSignatureDone = () => {
                       if (!signature) {
                         setSignatureErrMsg("Please select a signature file.");
                       } else {
                         setSignatureErrMsg("");
                         setIsSignatureConfirmed(true);
                       }
                     };
                   
                  const handleShowContactNumberForm = (field) => {
  setContactNumberForm(true);
  setAllowImageUpload(false);
  setCurrentEditingField(field);
};

  

 const handleCloseContactNumberForm = () => {
  setContactNumberForm(false);
  setAllowImageUpload(false);
  setAllowEditFields({
    contact: false,
    email: false,
    hostelLogo: false,
    digitalSignature: false,
  });
};


const handleEditAnyway = () => {
  setAllowImageUpload(true);
  setAllowEditFields({
    contact: true,
    email: true,
    hostelLogo: true,
    digitalSignature: true,
  });
  setContactNumberForm(false); 
};
                   
                   
                   const [mobilenum,setMobileNum] = useState("")
                   const [MobileError,setMobileError] = useState("")
                   const[email,setEmail] = useState("")
                   const[emailError,setEmailError] = useState("")
                   
                   const handleMobile = (e) => {
                     const input = e.target.value.replace(/\D/g, ""); 
                     setMobileNum(input);
                   
                     if (input.length === 0) {
                       setMobileError("");
                     } else if (input.length < 10) {
                       setMobileError(" Please Enter Valid Mobile Number");
                     } else if (input.length === 10) {
                       setMobileError("");
                     } else if (input.length > 10) {
                       setMobileError(" Please Enter Valid Mobile Number");
                     }
                   };
                   
                   const handleEmail = (e) => {
                       const emailValue = e.target.value.toLowerCase();
                       setEmail(emailValue);
                   
                       const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
                       const isValidEmail = emailRegex.test(emailValue);
                       if (!emailValue) {
                         setEmailError("");
                        
                       } else if (!isValidEmail) {
                         
                         setEmailError("Please Enter  Valid Email Id");
                       } else {
                         setEmailError("");
                        
                       }
                      
                     };
                 
                   const [isEditable, setIsEditable] = useState(false);
                     const [logoPreview, setLogoPreview] = useState(null);
                     // const fileInputRef = useRef();
                   
                     // const handleShowContactNumberForm = () => {
                     //   setIsEditable(true);
                     // };
                   
                     const handleFileUploadHostel = (e) => {
                         if (!allowImageUpload) return;
                       const file = e.target.files[0];
                       if (file && file.type.startsWith("image/")) {
                         const reader = new FileReader();
                         reader.onloadend = () => {
                           setLogoPreview(reader.result);
                         };
                         reader.readAsDataURL(file);
                       }
                     };
           
                     const [qrImage, setQrImage] = useState(null);
                     const qrFileInputRef = useRef(null);
                   
                     const handleQrImageChange = (e) => {
                       const file = e.target.files[0];
                       if (file) {
                         setQrImage(URL.createObjectURL(file));
                       }
                     };
         
   
         
           useEffect(() => {
             const appearOptions = {
               threshold: 0.5,
             };
             const faders = document.querySelectorAll(".fade-in");
             const appearOnScro1l = new IntersectionObserver(function (
               entries
             ) {
               entries.forEach((entry) => {
                 if (!entry.isIntersecting) {
                   return;
                 } else {
                   entry.target.classList.add("appear");
                   appearOnScro1l.unobserve(entry.target);
                 }
               });
             },
               appearOptions);
             faders.forEach((fader) => {
               appearOnScro1l.observe(fader);
             });
           });
         
   
   
   

    return(

        <div className="col-12 d-flex flex-row">
       <div className="col-lg-5 show-scroll" style={{ maxHeight: 450,
                  overflowY: "auto",
                  overflowX:'hidden',}}>
<p style={{ fontFamily: 'Gilroy', fontSize: 17, fontWeight: 600,}}>Inherited Global Details</p>

  <div className="border ps-3 pe-3 pb-3 pt-2 mb-3 col-lg-10 " style={{borderRadius:'10px' , overflowY:'auto', }}>
    <div className="d-flex justify-content-end">
                        <img src={EditICon}  onClick={ handleShowContactNumberForm} style={{ cursor: 'pointer' }} alt="editicon" />
      
          </div>
          <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <label style={{ fontWeight: 600 }}>Hostel/PG Logo</label>
            </div>
  <div className="p-3 border rounded" style={{ backgroundColor: '#f9f9f9', textAlign: 'center' }}>
   
    {/* Image Preview */}
    {logoPreview ? (
      <img src={logoPreview} alt="Preview" style={{ height: 60, borderRadius: '6px', marginBottom: '10px' }} />
    ) : (
      <img src={uploadsett} alt="upload" style={{ height: 30, marginBottom: '10px' }} />
    )}

    {/* Upload Instruction & Input */}
    <div>
      <label
        style={{
          cursor: allowEditFields.hostelLogo ? 'pointer' : 'not-allowed',
          color: allowEditFields.hostelLogo ? 'rgba(30, 69, 225, 1)' : '#999',
          fontFamily: 'Gilroy',
          fontSize: 12,
          fontWeight: 400
        }}
      >
        Choose file
        <input
          type="file"
          accept="image/png"
          className="d-none"
          ref={fileInputRef}
          onChange={handleFileUploadHostel}
          disabled={!allowEditFields.hostelLogo}
        />
      </label>
      <span className="ms-1" style={{ color: 'rgba(22, 21, 28, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400 }}>
        to Upload
      </span>
    </div>

    {/* File Format Info */}
    <small
      style={{
        fontFamily: "Gilroy",
        fontSize: 9,
        color: "rgba(75, 75, 75, 1)",
        fontWeight: 400,
        display: "block",
        marginTop: "5px"
      }}
    >
      Must be in PNG Format (600px × 300px)
    </small>
  </div>

    <div className=" p-3  col-lg-12" style={{borderRadius:'10px' , overflowY:'auto', }}>

    
 <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
 <div style={{ width: '100%', fontFamily: 'Gilroy', fontSize: '14px', fontWeight: 500 }}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  }}>
    <label style={{ fontWeight: 600 }}>Contact Number</label>
  </div>

  <div style={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F3FF',
    borderRadius: '8px',
    padding: '8px 12px',
    border: '1px solid #E0E0E0',
  }}>
    <select style={{
      border: 'none',
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      appearance: 'none',
      paddingRight: '16px',
      cursor: 'pointer',
      outline: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1L6 6L11 1\' stroke=\'%23666\' stroke-width=\'2\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right center',
      backgroundSize: '10px'
    }}
     disabled={!allowEditFields.contact}
    >
      <option value="+91">+91</option>
      <option value="+1">+1</option>
      <option value="+44">+44</option>
      <option value="+971">+971</option>
      
    </select>

    <input
      type="tel"
      placeholder="9876543210"
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        marginLeft: '8px',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
      }}
       value={mobilenum}
       onChange={handleMobile}
      maxLength={10}
       disabled={!allowEditFields.contact}
    />
   
  </div>
   {MobileError && (
                            <div style={{ color: "red",  }}>
                              {" "}
                              <MdError
                                style={{ fontSize: "13px", marginBottom: "2px" }}
                              />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "red",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  marginRight: "3px"
                                }}
                              >
                                {" "}
                                {MobileError}
                              </span>
                            </div>
                          )}
</div>



                        </div>

                      
                    </div>
                          
                  </div>

                    <div className=" p-3  col-lg-12 " style={{borderRadius:'10px' , overflowY:'auto', }}> 
 <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
 <div style={{ width: '100%', fontFamily: 'Gilroy', fontSize: '14px', fontWeight: 500 }}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  }}>
    <label style={{ fontWeight: 600 }}>E-Mail Address</label>
  </div>

  <div style={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F3FF',
    borderRadius: '8px',
    padding: '8px 12px',
    border: '1px solid #E0E0E0',
  }}>
  

    <input
      type="tel"
      placeholder="abc@gmail.com"
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        marginLeft: '8px',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
      }}
      disabled={!allowEditFields.email}
      value={email}
       onChange={handleEmail}
    />
   
  </div>
   {emailError && (
                            <div style={{ color: "red",  }}>
                              {" "}
                              <MdError
                                style={{ fontSize: "13px", marginBottom: "2px" }}
                              />
                              <span
                                style={{
                                  fontSize: "12px",
                                  color: "red",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  marginRight: "3px"
                                }}
                              >
                                {" "}
                                {emailError}
                              </span>
                            </div>
                          )}
</div>



                        </div>

                      
                    </div>
                          
                  </div>

                  <div className=" p-3  col-lg-12 " style={{borderRadius:'10px' , overflowY:'auto', }}>
 <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
 <div style={{ width: '100%', fontFamily: 'Gilroy', fontSize: '14px', fontWeight: 500 }}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  }}>
    <label style={{ fontWeight: 600 }}>Digital Signature Upload</label>
  </div>

      <div className="col-12">
               <div
            className="rounded mt-2 d-flex justify-content-center align-items-center"
            style={{ height: '120px', borderStyle: 'dotted' , borderWidth: '3px', 
        borderColor: '#ced4da'}}
          >
            {signaturePreview ? (
              <img src={signaturePreview} alt="signature" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            ) : (
              <span className="text-muted"   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
              >No signature uploaded</span>
            )}
          </div>
    
          <div className="d-flex  flex-column justify-content-between align-items-center mt-2">
            <div className="d-flex flex-row">
              <label  style={{    cursor: allowEditFields.digitalSignature ? 'pointer' : 'not-allowed',
    color: allowEditFields.digitalSignature ? 'rgba(30, 69, 225, 1)' : '#999', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400}}>
                Choose file
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  ref={fileInputRef}
    onChange={handleFileSignatureChange}
    disabled={!allowEditFields.digitalSignature}
                />
              </label>
              <span className="ms-1" style={{color:'rgba(22, 21, 28, 1)' ,  fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400}}>to Upload Image</span>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-link text-decoration-none "
                onClick={handleClear}
                disabled={!signaturePreview}
                style={{color:'rgba(75, 75, 75, 1)' ,  fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400}}
              >
                Clear
              </button>
              <button
                className="btn btn-link text-decoration-none "
                disabled={!signaturePreview}
                onClick={handleSignatureDone}
                style={{color:'rgba(30, 69, 225, 1)',   fontFamily: 'Gilroy', fontSize: 12, fontWeight: 600}}
              >
                Done
              </button>
            </div>
    
            
          </div>
            {/* {signature_errmsg.trim() !== "" && (
                                                  <div className="d-flex align-items-center p-1">
                                                    <MdError
                                                      style={{
                                                        color: "red",
                                                        marginRight: "5px",
                                                        fontSize: "14px",
                                                      }}
                                                    />
                                                    <label
                                                      className="mb-0"
                                                      style={{
                                                        color: "red",
                                                        fontSize: "12px",
                                                        fontFamily: "Gilroy",
                                                        fontWeight: 500,
                                                      }}
                                                    >
                                                      {signature_errmsg}
                                                    </label>
                                                  </div>
                                                )} */}
          </div>
</div>
                        </div>  
                    </div>        
                  </div>
                 <Modal
  show={contactnumberform}
  onHide={handleCloseContactNumberForm}
  centered
  backdrop="static"
  className="logout-card d-flex justify-content-center align-items-center"
  dialogClassName="custom-modal-width" 
>
  <Modal.Header style={{ borderBottom: "none" }}>
    <Modal.Title
      style={{
        fontSize: "18px",
        fontFamily: "Gilroy",
        textAlign: "center",
        fontWeight: 600,
        color: "#222222",
        flex: 1,
        paddingTop:'20px'
      }}
    >
      <img src={Questionimage} alt="question" className="me-2" />
      Override Global Value?
    </Modal.Title>
  </Modal.Header>

  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy",
      color: "#646464",
      textAlign: "center",
      paddingLeft: "20px",
      paddingRight: "20px",
    }}
  >
    You’re changing this field only for this bill. 
    It won’t affect the main settings.
  </Modal.Body>

  <Modal.Footer
    style={{
      justifyContent: "center",
      borderTop: "none",
      paddingBottom:'20px'
    }}
  >
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 10,
        padding: "12px 20px",
        background: "#fff",
        color: "rgba(111, 108, 143, 1)",
        fontWeight: 600,
        fontFamily: "Gilroy",
        fontSize: "14px",
        marginRight: 10,
      }}
      className="border"
      onClick={handleCloseContactNumberForm}
    >
      Cancel
    </Button>
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 10,
        padding: "12px 20px",
        background: "#1E45E1",
        color: "#FFFFFF",
        fontWeight: 600,
        fontFamily: "Gilroy",
        fontSize: "14px",
      }}
        onClick={handleEditAnyway}

    >
      Edit Anyway
    </Button>
  </Modal.Footer>
</Modal>
</div>

       <p style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600,}}>Form Specific Details</p>
       <p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,color:'rgba(99, 109, 148, 1)'}}>{`Fill the form with details you'd like to customize.`}</p>
       
    
       
       
            <div className="p-3 mb-3 border col-lg-10" style={{borderRadius:'10px'}}>
                 <h6   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
                  Notes
                  </h6>
                  <hr />
             <label className="form-label"  style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)',fontStyle: 'normal', lineHeight: 'normal' }}>Add Notes</label>
             <div className="position-relative">
               <textarea
                 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                 className="form-control pe-5" 
                 rows="4"    
                 placeholder='Add any message...'
                 value={notes}
                 onChange={handleNotesChange}
               />
               <img
                 src={TextAreaICon}
                 alt="textarea_icon"
                 style={{
                   position: "absolute",
                   right: "12px",
                   top: "12px",
                   color: "#666",
                   pointerEvents: "none",
                 }}
               />
             </div>
              {notes_errmsg.trim() !== "" && (
                                                     <div className="d-flex align-items-center p-1">
                                                       <MdError
                                                         style={{
                                                           color: "red",
                                                           marginRight: "5px",
                                                           fontSize: "14px",
                                                         }}
                                                       />
                                                       <label
                                                         className="mb-0"
                                                         style={{
                                                           color: "red",
                                                           fontSize: "12px",
                                                           fontFamily: "Gilroy",
                                                           fontWeight: 500,
                                                         }}
                                                       >
                                                         {notes_errmsg}
                                                       </label>
                                                     </div>
                                                   )}
           </div>
       
                            <div className="p-3 mb-3 border col-lg-10" style={{borderRadius:'10px'}}>
             <h6  style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
               Terms & Condition</h6>
             <hr />
             <label className="form-label"                   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
             >Add T&C</label>
       
             <div className="position-relative">
               <textarea
                 className="form-control pe-5" 
                 rows="4"
                 placeholder='Add any message...'
                 value={terms}
                 onChange={handleTermsChange}
                 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
               />
                <img
                 src={TextAreaICon}
                  alt="textarea-icon"
                 style={{
                   position: "absolute",
                   right: "12px",
                   top: "12px",
                   color: "#666",
                   pointerEvents: "none",
                 }}
               />
             </div>
              {terms_errmsg.trim() !== "" && (
                                                     <div className="d-flex align-items-center p-1">
                                                       <MdError
                                                         style={{
                                                           color: "red",
                                                           marginRight: "5px",
                                                           fontSize: "14px",
                                                         }}
                                                       />
                                                       <label
                                                         className="mb-0"
                                                         style={{
                                                           color: "red",
                                                           fontSize: "12px",
                                                           fontFamily: "Gilroy",
                                                           fontWeight: 500,
                                                         }}
                                                       >
                                                         {terms_errmsg}
                                                       </label>
                                                     </div>
                                                   )}
             
           </div>
       
       
            <div className="col-lg-10" style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 16,  fontFamily: "sans-serif" }}>
             <h6 style={{ marginBottom: 12 }}>Template Theme</h6>
       
             <RgbaColorPicker color={color} onChange={handleColorChange}  style={{ width: "100%", }} />
       
             <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
               <input value={hexValue} readOnly style={{ width: 80, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={color.r} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={color.g} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={color.b} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={alphaValue} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
             </div>
       
             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginTop: 4, marginBottom: 12 }}>
               <span style={{ width: 80, textAlign: "center" }}>Hex</span>
               <span style={{ width: 40, textAlign: "center" }}>R</span>
               <span style={{ width: 40, textAlign: "center" }}>G</span>
               <span style={{ width: 40, textAlign: "center" }}>B</span>
               <span style={{ width: 40, textAlign: "center" }}>A</span>
             </div>
       
             <div style={{
               display: "grid",
               gridTemplateColumns: "repeat(9, 1fr)",
               gap: 8,
               justifyContent: "center"
             }}>
              {presetColors.map((preset, index) => (
         <div
           key={index}
           onClick={() => {
             const r = parseInt(preset.substr(1, 2), 16);
             const g = parseInt(preset.substr(3, 2), 16);
             const b = parseInt(preset.substr(5, 2), 16);
             setColor({ r, g, b, a: 1 });
           }}
           style={{
             width: 24,
             height: 24,
             borderRadius: "20%",
             backgroundColor: preset,
             cursor: "pointer",
             border: preset.toLowerCase() === "#ffffff" ? "1px solid #ccc" : "none"
           }}
         />
       ))}
       
       <div
         onClick={() => console.log("Current color clicked")}
         style={{
           width: 24,
           height: 24,
           borderRadius: "20%",
           backgroundColor: hexValue,
           cursor: "pointer",
           border: "2px solid #000"
         }}
         title="Current selected color"
       />
       
             </div>
         </div>
       
        <div className="d-flex justify-content-end mt-2 col-lg-10">
               <Button
             style={{
               width: 160,
               height: 42,
               borderRadius: 10,
               padding: "8px 16px",
               background: "#1E45E1",
               color: "#FFFFFF",
               fontWeight: 600,
               fontFamily: "Gilroy",
               fontSize: "14px",
             }}
           >
             Save Template
           </Button>
         </div>
       
       </div>

<div className="col-lg-7 d-flex justify-content-center" style={{backgroundColor:'rgba(244, 246, 255, 1)'}}>
  <div className="d-flex justify-content-center">
       <div className="receipt-container border ps-4 pe-4 pb-4 pt-1 col-10"  
         ref={cardRef}  style={{ borderRadius:'8px' , backgroundColor:'white' }}>

         <div className="d-flex justify-content-end ">
  <button
    className="btn btn-sm border bg-white"
    onClick={() => setShowFullView(true)}
    style={{height:25 , fontSize:8 , color: 'rgba(23, 23, 23, 1)'}}
  >
    <img  src={ZoomImage} alt="zoom"/> Full View
  </button>
</div>
       
       <div   ref={innerScrollRef}
          className=" show-scroll col-lg-12  justify-content-center"
         style={{
           maxHeight: 470,
           overflowY: "auto",
           borderBottomLeftRadius: "13px",
           borderBottomRightRadius: "13px",
         }}>
                       
                         <div   className=" text-white  p-2 position-relative" style={{height:60,
                          background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,}}>
                          <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex gap-2 mb-2 mb-lg-0">
                                      <img src={ Logo} alt="logo" style={{ height: 30, width: 30 }} />
                                      <div>
                                        <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
                                        <div style={{ fontSize: 10, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
                                      </div>
                                    </div>
                                
                                    <div>
                                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" , marginRight:'20px'}}>
                                       Royal Grand Hostel
                                      </div>
                                      <div style={{ fontSize: 10, fontWeight: 600, fontFamily: "Gilroy" }}>
                                      <>
                         
                                      9, 8th Avenue Rd, Someshwara Nagar, <br />
                                      Chennai, Tamilnadu - 600 056
                               
                                </>
                                
                                      </div>
                                    </div>
                                  </div>
                         </div>
                       
                        
                         <div className="container bg-white rounded-bottom border  shadow position-relative" style={{width:"100%",}}>
                           <div className="text-center pt-1 pb-1">
       
                             <p className="" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>
       
        Final Settlement Receipt
               </p>
       
       
                           </div>
                       
                         
                           <div className="row px-4 mt-1">
                             <div className="col-md-6 mb-1">
                               <p className="mb-1" style={{fontSize: '11px', color:'#1E45E1' ,fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To:</p>
                               <p className="mb-1 me-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                               <p className="mb-1"><img src={mobblue} alt="mob" width={12} height={12}/>
                                <span className="ms-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}> 
                                             +91 85647 85332
                                                            </span>
               
                                </p>
                               <p className="mb-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frameblue} alt="frame" width={15} height={15} className="me-1"/>
                                        No 103 -02  </p>
       
                                <div className="d-flex" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                              
                              <div className="me-2">
                                <img src={substracBlue} alt="local" />
                              </div>
                            
                              <div>
                              <p style={{ fontSize: '9px',fontFamily: 'Gilroy',}}>
                   9, 8th Main Rd, Someshwara Nagar, <br></br>
                    Bengaluru, Karnataka 560011
                 </p>
                              </div>
                            
                            </div>
       
                             </div>
                             <div className="col-md-6 mb-1 ps-5">
                               <div className="row">
       
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Receipt No :</div>
                                 <div className="col-6  text-start mt-1"  style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#REC-FS324515</div>
                       
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                                 <div className="col-6  text-start mt-1"  style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                       
       
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Room No :</div>
                                 <div className="col-6  text-start mt-1"  style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>103–02</div>
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                                 <div className="col-6  text-start"  style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',marginTop:2,paddingLeft:18}}>
                Cash</div>
                               </div>
                             </div>
                           </div>
                       
                          
                           <div className="px-2">
                             <div className="table-responsive">
                               <table className="table  text-center align-middle">
                                 <thead  style={{background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,color:"#FFFFFF"}}>
                                   <tr style={{color:"white"}}>
                                     <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white", fontSize:'10px' , fontFamily:'Gilroy', fontWeight:400 }}>S.NO</th>
                                     <th style={{color:"white" , fontSize:'10px' , fontFamily:'Gilroy', fontWeight:400}}>Description</th>
                                     <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'10px' , fontFamily:'Gilroy', fontWeight:400 }}>Amount / INR</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                   <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                                     <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                                     <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}}>Outstanding Dues (if any)</td>
                                     <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}}> Rs: - 8,000.00</td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>
                       
                             
                             <div className="d-flex justify-content-end mt-3"  >
         <div className="w-100 w-md-50" style={{paddingRight:"80px"}}>
       
         <div className="d-flex justify-content-end py-1">
             <div className="w-50 text-end" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Advance Amount</div>
             <div className="w-25 text-end" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}> Rs: 10,000.00</div>
           </div>
          
           
       
           
           <div className="d-flex justify-content-end py-2 fw-bold">
             <div className="w-50 text-end" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: '#1E1E1E', }}>Refundable Total</div>
             <div className="w-25 text-end" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: '#1E1E1E', }}>Rs: 2,000.00</div>
           </div>
         </div>
       </div>
       
                           </div>
                       
                          
                         
                         </div>
                         <div className="px-4" style={{marginTop:20}}>
                             <div className="row">
                             <div className="col-md-8">
           <h6 className="" style={{color:'#1E45E1' ,fontSize:'10px' ,fontFamily: 'Gilroy', fontWeight: 500}}>Acknowledgment</h6>
           <p style={{ fontSize: "9px", color: "#555" ,fontFamily: 'Gilroy', fontWeight:400}}>
           This document confirms final settlement for the Tenant on <br></br>
           . All dues are cleared, and room has been vacated.
           </p>
         </div>
                               <div className="col-md-4 text-end">
                                 <p className="mt-4"   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}>
                                   Authorized Signature</p>
                               </div>
                             </div>
                           </div>
       
                           <div className="d-flex justify-content-between mt-4 align-items-start flex-wrap ms-4">
        
           <div className="text-start mt-4">
             <p className="mb-0" style={{fontSize: "9px", fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(30, 69, 225, 1)'}}>
             &quot;Your comfort is our priority –
             </p>
             <p className="mb-0" style={{fontSize: "9px", fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(30, 69, 225, 1)'}}>
               See you again at Smart Stay! &quot;
             </p>
           </div>
         
       
             <div>
             <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received" height={81} width={152}/></p>
       
            </div>
           </div>
                       
                            <div className="ms-5 me-5">
         <div
           className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
           style={{
             background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
             borderTopRightRadius: '38px',
             borderTopLeftRadius: '38px',
           }}
         >
           <p
             className="mb-0"
             style={{
               fontSize: '10px',
               fontFamily: 'Gilroy',
               fontWeight: 600,
               color: 'rgba(255, 255, 255, 1)',
               
             }}
           >
             Email : contact@royalgrandhostel.in
           </p>
           <p
             className="mb-0"
             style={{
               fontSize: '10px',
               fontFamily: 'Gilroy',
               fontWeight: 600,
               color: 'rgba(255, 255, 255, 1)',
             }}
           >
           Contact : +91 88994 56611
           </p>
         </div>
       </div>
                           </div>
                       </div></div></div>


                                       {showFullView && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: 'rgba(90, 90, 90, 0.22)',
      zIndex: 9999,
      overflowY: 'auto',
      marginLeft:'10%'
    }}
  >
    <div
      className="bg-white   shadow"
      style={{
        width: '100%',
        maxWidth: '900px',
        minHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
         borderTopLeftRadius: '16px',
         borderTopRightRadius: '16px',
      }}
    >
     <div
  style={{
    backgroundColor: '#2C2C2C',
    color: '#fff',
    padding: '7px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  }}
>
 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' , marginLeft:25}}>
     <span style={{ fontSize: '8px' }}>1 / 1</span>
     <div style={{ borderLeft: '1px solid #555', height: '20px' }}></div>
 
     <div className="d-flex align-items-center" style={{ gap: '3px' }}>
       <button className="btn btn-sm text-white px-0 py-0 mb-1 me-1">−</button>
       <span style={{ fontWeight: 'bold', fontSize: '8px' }}>100%</span>
       <button className="btn btn-sm text-white px-0 py-0 mb-1 ms-1" >+</button>
     </div>
 
     <div style={{ borderLeft: '1px solid #555', height: '20px' }}></div>
 
     <button className="btn btn-sm  px-1 py-0 me-0"><img  src={Topbottom} alt="topbottom"/></button>
     <button className="btn btn-sm px-1 py-0"><img  src={left85arrow} alt="left85arrow"/></button>
   </div>
 
   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
     <button className="btn btn-sm  px-2 py-0"><img  src={downloadicon} alt="topbottom"   style={{ width: '12px', height: '12px' }}/></button>
     <button className="btn btn-sm  px-2 py-0"><img  src={printdown} alt="topbottom"   style={{ width: '12px', height: '12px' }}/></button>
  <div
           className="bg-white rounded-circle d-flex align-items-center justify-content-center"
           onClick={() => setShowFullView(false)}
           style={{
             width: '30px',
             height: '30px',
             cursor: 'pointer',
             boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
         
           }}
         >
           <img
             src={CloseIcon}
             alt="Close"
             style={{ width: '12px', height: '12px' }}
           />
         </div>
 
   </div>
</div> 



<div className="d-flex justify-content-center">
   <div className="receipt-container border ps-5 pe-5 pb-2 pt-2 mt-3 col-lg-8 "  
         ref={cardRef}  style={{ borderRadius:'8px' , }}>

     
       
       <div   ref={innerScrollRef}
          className=" show-scroll col-lg-12  justify-content-center"
         style={{
           maxHeight: 480,
           overflowY: "auto",
           borderBottomLeftRadius: "13px",
           borderBottomRightRadius: "13px",
         }}>
                       
                         <div   className=" text-white  p-2 position-relative" style={{height:90,
                           background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`, }}>
                          <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex gap-2 mb-2 mb-lg-0">
                                      <img src={ Logo} alt="logo" style={{ height: 40, width: 40 }} />
                                      <div>
                                        <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
                                        <div style={{ fontSize: 13, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
                                      </div>
                                    </div>
                                
                                    <div>
                                      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" , marginRight:'20px'}}>
                                       Royal Grand Hostel
                                      </div>
                                      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
                                      <>
                         
                                      9, 8th Avenue Rd, Someshwara Nagar, <br />
                                      Chennai, Tamilnadu - 600 056
                               
                                </>
                                
                                      </div>
                                    </div>
                                  </div>
                         </div>
                       
                        
                         <div className="container bg-white rounded-bottom border  shadow position-relative" style={{width:"100%",}}>
                           <div className="text-center pt-1 pb-1">
       
                             <p className="" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>
       
        Final Settlement Receipt
               </p>
       
       
                           </div>
                       
                         
                           <div className="row px-4 mt-1">
                             <div className="col-md-6 mb-1">
                               <p className="mb-1" style={{fontSize: '12px', color:'#1E45E1' ,fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To:</p>
                               <p className="mb-1 me-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                               <p className="mb-1"><img src={mobblue} alt="mob" width={12} height={12}/>
                                <span className="ms-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}> 
                                             +91 85647 85332
                                                            </span>
               
                                </p>
                               <p className="mb-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frameblue} alt="frame" width={15} height={15} className="me-1"/>
                                        No 103 -02  </p>
       
                                <div className="d-flex" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                              
                              <div className="me-2">
                                <img src={substracBlue} alt="local" />
                              </div>
                            
                              <div>
                              <p style={{ fontSize: '10px',fontFamily: 'Gilroy',}}>
                   9, 8th Main Rd, Someshwara Nagar, <br></br>
                    Bengaluru, Karnataka 560011
                 </p>
                              </div>
                            
                            </div>
       
                             </div>
                             <div className="col-md-6 mb-1 ps-5">
                               <div className="row">
       
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Receipt No :</div>
                                 <div className="col-6  text-start mt-1"  style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#REC-FS324515</div>
                       
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                                 <div className="col-6  text-start mt-1"  style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                       
       
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Room No :</div>
                                 <div className="col-6  text-start mt-1"  style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>103–02</div>
                                 <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                                 <div className="col-6  text-start"  style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',marginTop:2,paddingLeft:18}}>
                Cash</div>
                               </div>
                             </div>
                           </div>
                       
                          
                           <div className="px-2">
                             <div className="table-responsive">
                               <table className="table  text-center align-middle">
                                 <thead  style={{
                                  background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,color:"#FFFFFF"}}>
                                   <tr style={{color:"white"}}>
                                     <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:400 }}>S.NO</th>
                                     <th style={{color:"white" , fontSize:'11px' , fontFamily:'Gilroy', fontWeight:400}}>Description</th>
                                     <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'11px' , fontFamily:'Gilroy', fontWeight:400 }}>Amount / INR</th>
                                   </tr>
                                 </thead>
                                 <tbody>
                                   <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                                     <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                                     <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}}>Outstanding Dues (if any)</td>
                                     <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}}> Rs: - 8,000.00</td>
                                   </tr>
                                 </tbody>
                               </table>
                             </div>
                       
                             
                             <div className="d-flex justify-content-end mt-3"  >
         <div className="w-100 w-md-50" style={{paddingRight:"80px"}}>
       
         <div className="d-flex justify-content-end py-1">
             <div className="w-50 text-end" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Advance Amount</div>
             <div className="w-25 text-end" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}> Rs: 10,000.00</div>
           </div>
          
           
       
           
           <div className="d-flex justify-content-end py-2 fw-bold">
             <div className="w-50 text-end" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500, color: '#1E1E1E', }}>Refundable Total</div>
             <div className="w-25 text-end" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600, color: '#1E1E1E', }}>Rs: 2,000.00</div>
           </div>
         </div>
       </div>
       
                           </div>
                       
                          
                         
                         </div>
                         <div className="px-4" style={{marginTop:20}}>
                             <div className="row">
                             <div className="col-md-8">
           <h6 className="" style={{color:'#1E45E1' ,fontSize:'10px' ,fontFamily: 'Gilroy', fontWeight: 500}}>Acknowledgment</h6>
           <p style={{ fontSize: "10px", color: "#555" ,fontFamily: 'Gilroy', fontWeight:400}}>
           This document confirms final settlement for the Tenant on <br></br>
           . All dues are cleared, and room has been vacated.
           </p>
         </div>
                               <div className="col-md-4 text-end">
                                 <p className="mt-4"   style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}>
                                   Authorized Signature</p>
                               </div>
                             </div>
                           </div>
       
                           <div className="d-flex justify-content-between mt-4 align-items-start flex-wrap ms-4">
        
           <div className="text-start mt-4">
             <p className="mb-0" style={{fontSize: "10px", fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(30, 69, 225, 1)'}}>
             &quot;Your comfort is our priority –
             </p>
             <p className="mb-0" style={{fontSize: "10px", fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(30, 69, 225, 1)'}}>
               See you again at Smart Stay! &quot;
             </p>
           </div>
         
       
             <div>
             <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received" height={81} width={152}/></p>
       
            </div>
           </div>
                       
                            <div className="ms-5 me-5">
         <div
           className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
           style={{
            background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
             borderTopRightRadius: '38px',
             borderTopLeftRadius: '38px',
           }}
         >
           <p
             className="mb-0"
             style={{
               fontSize: '11px',
               fontFamily: 'Gilroy',
               fontWeight: 600,
               color: 'rgba(255, 255, 255, 1)',
               
             }}
           >
             Email : contact@royalgrandhostel.in
           </p>
           <p
             className="mb-0"
             style={{
               fontSize: '11px',
               fontFamily: 'Gilroy',
               fontWeight: 600,
               color: 'rgba(255, 255, 255, 1)',
             }}
           >
           Contact : +91 88994 56611
           </p>
         </div>
       </div>
                           </div>
                       </div>
  </div>



   </div>
  </div>
)}
                       </div>
    )

  }
  export default NOCReceiptPdfTemplate;