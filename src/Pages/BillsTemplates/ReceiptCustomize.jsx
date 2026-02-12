/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/Settings/Settings.css";
// import { MdError } from "react-icons/md";
import TextAreaICon from '../../Assets/Images/textarea.png'
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import EditICon from '../../Assets/Images/New_images/edit.png';
import uploadsett from "../../Assets/Images/New_images/upload setting.png";
import Modal from 'react-bootstrap/Modal';
import Questionimage from '../../Assets/Images/question.png';
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import PropTypes from "prop-types";
import { Trash } from 'iconsax-react'

const RentalReceiptPdfTemplate = ({ BillsTemplateList ,onTemplateReceiptChange}) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
    const [loading, setLoading] = useState(false)

  const [notes_errmsg, setNotesErrMsg] = useState('')
  const [terms_errmsg, setTermsErrMsg] = useState('')
  const [editErrmsg, setEditErrMessage] = useState('')

  const [color, setColor] = useState({ r: 0, g: 163, b: 46, a: 1 });
  const [useGradient, setUseGradient] = useState(true);
  const defaultGradient = 'linear-gradient(to right, rgba(0,163, 46, 1), rgba(0, 163, 46, 1))';

 
  const {
    // canWriteModule: canWriteInvoice,
    // canReadModule: canReadReceipt,
    canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setUseGradient(false);
    setEditErrMessage("")
  };

  const presetColors = [
    "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
    "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
  ];

  const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
  const alphaValue = Math.round(color.a * 100);







  const handleNotesChange = (e) => {
    const Value = e.target.value
    setNotes(Value)
    setEditErrMessage("")
    if (Value.trim() !== "") {
      setNotesErrMsg("");
    }
  }

  const handleTermsChange = (e) => {
    const Value = e.target.value
    setTerms(Value)
    setEditErrMessage("")
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
  const [allowEditFields, setAllowEditFields] = useState({
    contact: false,
    email: false,
    hostelLogo: false,
    digitalSignature: false,
  });
  const [contactnumberform, setContactNumberForm] = useState(false)

  const fileInputRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [signature_errmsg, setSignatureErrMsg] = useState("")
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

  const handleFileSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignature(file);
      setSignaturePreview(URL.createObjectURL(file));
      setSignatureErrMsg("");
      setEditErrMessage('')
      setIsSignatureConfirmed(false);
    }
  };


  const handleClear = () => {
    setSignature(null);
    setSignaturePreview(null)
    setSignatureErrMsg("");
    setEditErrMessage('')
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const handleSignatureDone = () => {
    if (!signature) {
      setSignatureErrMsg("Please select a signature file.");
    } else {
      setSignatureErrMsg("");
      setEditErrMessage('')
      setIsSignatureConfirmed(true);
    }
  };


  const handleShowContactNumberForm = () => {
    setContactNumberForm(true);
    setAllowImageUpload(false);
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


  const [mobilenum, setMobileNum] = useState("")
  const [MobileError, setMobileError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")


  const handleMobile = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setMobileNum(input);
    setEditErrMessage('')
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
    setEditErrMessage('')
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

  const [logoPreview, setLogoPreview] = useState(null);
  const [hostel_logo, setHostelLogo] = useState(null)

  const handleFileUploadHostel = (e) => {
    if (!allowImageUpload) return;
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setHostelLogo(file)
      setEditErrMessage('')
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
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






  const handleSaveTemplate = () => {
   


    if (RentalreceiptTemplate.isSignatureCustomized) {
      const Signatureverify = !RentalreceiptTemplate.receiptSignatureUrl

      if (signature && !isSignatureConfirmed && Signatureverify) {
        setSignatureErrMsg("Please click Done after selecting a signature");
        return
      }
    }

    if (RentalreceiptTemplate.isMobileCustomized) {
      if (mobilenum && mobilenum.length < 10) {
        setMobileError(" Please Enter Valid Mobile Number");
        return
      }
      else if (mobilenum.length === 10) {
        setMobileError("");
      }
    }

    if (RentalreceiptTemplate.isMailIdCustomized) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(email);
      if (!email) {
        setEmailError("");
      } else if (!isValidEmail) {
        setEmailError("Please Enter  Valid Email Id");
      } else {
        setEmailError("");
      }
    }

    if (RentalreceiptTemplate.typeId && state.login.selectedHostel_Id) {
      dispatch({
        type: "ADDGLOBALSETTING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          templateTypeId: RentalreceiptTemplate.typeId,
          receiptLogo: hostel_logo,
          receiptSign: signature,
          mobile: BillsTemplateList.mobile,
          email: BillsTemplateList.emailId,
          receiptPhoneNumber: mobilenum,
          receiptMailId: email,
          isMobileCustomized: BillsTemplateList?.isMobileCustomized,
          isEmailCustomized: BillsTemplateList?.isMailIdCustomized,
          isLogoCustomized: BillsTemplateList?.isLogoCustomized,
          isSignatureCustomized: BillsTemplateList?.isSignatureCustomized,
          receiptNotes: notes,
          receiptTermsAndCondition: terms,
          receiptTemplateColor: useGradient
            ? defaultGradient
            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
        },
      });
      setLoading(true)

    }


  };




  useEffect(() => {
    if (state.Settings?.settingsBillsAddTemplateSucesscode === 200) {

      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BILLS_TEMPLATE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsBillsAddTemplateSucesscode]);


  useEffect(() => {
    if (state.Settings.settingGlobalAddStatusCode === 200) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_GLOBAL_SETTINGS" });
      }, 1000);
    }

  }, [state.Settings.settingGlobalAddStatusCode])


  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetErrorCode === 500) {
      setTimeout(() => {
        setLoading(false)
        dispatch({ type: "CLEAR_ERROR_TEMPLATELIST_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.SettingsBilltemplategetErrorCode]);

  const RentalreceiptTemplate = BillsTemplateList && BillsTemplateList.templates?.find(
    (template) => template.type === "RENTAL"
  );




  useEffect(() => {
    if (RentalreceiptTemplate) {
      setLogoPreview(BillsTemplateList.isLogoCustomized && RentalreceiptTemplate.receiptLogoUrl && RentalreceiptTemplate.receiptLogoUrl)
      setHostelLogo(BillsTemplateList.isLogoCustomized && RentalreceiptTemplate.receiptLogoUrl && RentalreceiptTemplate.receiptLogoUrl)
      setMobileNum(BillsTemplateList.isMobileCustomized && RentalreceiptTemplate.receiptMobileNumber ? RentalreceiptTemplate.receiptMobileNumber : BillsTemplateList.mobile)
      setEmail(BillsTemplateList.isMailIdCustomized && RentalreceiptTemplate.receiptMailId ? RentalreceiptTemplate.receiptMailId : BillsTemplateList.emailId)
      setSignature(BillsTemplateList.isSignatureCustomized && RentalreceiptTemplate.receiptSignatureUrl && RentalreceiptTemplate.receiptSignatureUrl)
      setSignaturePreview(BillsTemplateList.isSignatureCustomized && RentalreceiptTemplate.receiptSignatureUrl && RentalreceiptTemplate.receiptSignatureUrl)
      setNotes(RentalreceiptTemplate.receiptNotes)
      setTerms(RentalreceiptTemplate.receiptTermsAndCondition || '')
      const templateTheme = RentalreceiptTemplate.receiptTemplateColor;
      if (templateTheme && templateTheme.trim() !== '') {
        if (templateTheme.includes('rgba')) {
          const match = templateTheme.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)/);
          if (match) {
            setColor({
              r: parseInt(match[1]),
              g: parseInt(match[2]),
              b: parseInt(match[3]),
              a: parseFloat(match[4]),
            });
            setUseGradient(false);
          }
        } else {
          setUseGradient(true);
        }
      } else {
        setUseGradient(true);
      }

    }

  }, [RentalreceiptTemplate])



  useEffect(() => {
    onTemplateReceiptChange({
      logoPreview,
      mobilenum,
      email,
      signaturePreview,
      
      notes,
      terms,
      color,
    });
  }, [logoPreview,
    mobilenum,
    email,
    signaturePreview,
   
    notes,
    terms,
    color,]);

const handleDeleteLogo = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: 'DELETETEMPLATESIMAGES', payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: RentalreceiptTemplate?.typeId,
          type: "RECEIPT-LOGO"

        }
      })
    }
  }

  const handleDeleteRentalSignature = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: 'DELETETEMPLATESIMAGES', payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: RentalreceiptTemplate?.typeId,
          type: "RECEIPT-SIGNATURE"

        }
      })
    }
  }





  useEffect(() => {
    if (state.UsersList?.templatesImagesDeleteStatusCode === 204) {
      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_DELETE_TEMPLATES_IMAGES' })
      }, 100)


    }

  }, [state.UsersList?.templatesImagesDeleteStatusCode])




  return (
    <>
      <div className="row  d-flex flex-row g-0">

        {loading &&
          <div
            style={{
              position: 'fixed',
              top: '48%',
              left: '68%',
              transform: 'translate(-50%, -50%)',
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              zIndex: 1050,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>
        }


        <div className="col-lg-12 show-scrolls" style={{
          maxHeight: 500,
          overflowY: "auto",
          overflowX: 'hidden',
        }}>


          {(
            BillsTemplateList?.isSignatureCustomized ||
            BillsTemplateList?.isMobileCustomized ||
            BillsTemplateList?.isMailIdCustomized ||
            BillsTemplateList?.isLogoCustomized
          ) &&

            (
              <>
                <p style={{ fontFamily: 'Gilroy', fontSize: 17, fontWeight: 600, }}>Inherited Global Details</p>

                <div className="border ps-3 pe-3 pb-3 pt-2 mb-3 col-lg-12" style={{ borderRadius: '10px', overflowY: 'auto', }}>
                  <div className="d-flex justify-content-end">
                    <img src={EditICon} onClick={handleShowContactNumberForm} style={{ cursor: 'pointer' }} alt="editicon" />

                  </div>
                  {BillsTemplateList?.isLogoCustomized &&
                    <div>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '6px'
                      }}>
                        <label style={{ fontWeight: 600, fontFamily: "Gilroy" }}>Hostel/PG Logo</label>
                      </div>
                      <div className="p-3 border rounded" style={{ backgroundColor: '#F0F3FF', textAlign: 'center' }}>

                        <div
                                                 className="flex justify-center"
                                               >
                                                 <div
                                                   className="relative inline-block"
                                                   onMouseEnter={(e) => {
                                                     const trash = e.currentTarget.querySelector(".qr-trash");
                                                     const overlay = e.currentTarget.querySelector(".qr-overlay");
                       
                                                     if (trash) trash.style.display = "flex";
                                                     if (overlay) overlay.style.display = "block";
                                                   }}
                                                   onMouseLeave={(e) => {
                                                     const trash = e.currentTarget.querySelector(".qr-trash");
                                                     const overlay = e.currentTarget.querySelector(".qr-overlay");
                       
                                                     if (trash) trash.style.display = "none";
                                                     if (overlay) overlay.style.display = "none";
                                                   }}
                                                 >
                       
                                                   {logoPreview ? (
                                                     <img
                                                       src={logoPreview}
                                                       alt="Preview"
                                                       className="h-[60px] rounded-md mb-2"
                                                     />
                                                   ) : (
                                                     <img
                                                       src={uploadsett}
                                                       alt="upload"
                                                       className="h-[30px] mb-2"
                                                     />
                                                   )}
                       
                       
                                                   {logoPreview && (
                                                     <div
                                                       className="
                                                      qr-overlay
                                                      absolute inset-0
                                                      hidden
                                                      bg-black/40
                                                      rounded-md
                                                    "
                                                     />
                                                   )}
                       
                       
                                                   {logoPreview && (
                                                     <div
                                                       className="
                                                     qr-trash
                                                      absolute -top-1 -right-1
                                                      hidden
                                                      items-center justify-center 
                                                      rounded-full
                                                      bg-gray-100 text-white
                                                      p-1
                                                      cursor-pointer
                                                    "
                                                       onClick={handleDeleteLogo}
                                                     >
                                                       <div
                                                         className="bg-black/70 text-white p-2 rounded-full">
                                                         <Trash size={12} />
                                                       </div>
                                                     </div>
                                                   )}
                                                 </div>
                       
                                               </div>

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
                    </div>
                  }

                  {BillsTemplateList?.isMobileCustomized &&
                    <div className=" p-3  col-lg-12" style={{ borderRadius: '10px', overflowY: 'auto', }}>
                      <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                          <div style={{ width: '100%', fontFamily: 'Gilroy', fontSize: '14px', fontWeight: 500 }}>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '6px'
                            }}>
                              <label style={{ fontWeight: 600, fontFamily: 'Gilroy' }}>Contact Number</label>
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
                              <ErrorMessage message={MobileError} type="error" />
                            )}
                          </div>



                        </div>


                      </div>
                    </div>}


                  {BillsTemplateList?.isMailIdCustomized &&
                    <div className=" p-3  col-lg-12 " style={{ borderRadius: '10px', overflowY: 'auto', }}>
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
                              <ErrorMessage message={emailError} type="error" />
                            )}
                          </div>



                        </div>


                      </div>

                    </div>
                  }
                  {BillsTemplateList?.isSignatureCustomized &&
                    <div className=" p-3  col-lg-12 " style={{ borderRadius: '10px', overflowY: 'auto', }}>
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
                                                              className="
                                                                relative mt-2
                                                                flex items-center justify-center
                                                                h-[120px]
                                                                rounded
                                                                border-[3px] border-dotted border-[#ced4da]
                                                                group
                                                              "
                                                              onMouseEnter={(e) => {
                                                                const trash = e.currentTarget.querySelector(".qr-trash");
                                                                const overlay = e.currentTarget.querySelector(".qr-overlay");
                              
                                                                if (trash) trash.style.display = "flex";
                                                                if (overlay) overlay.style.display = "block";
                                                              }}
                                                              onMouseLeave={(e) => {
                                                                const trash = e.currentTarget.querySelector(".qr-trash");
                                                                const overlay = e.currentTarget.querySelector(".qr-overlay");
                              
                                                                if (trash) trash.style.display = "none";
                                                                if (overlay) overlay.style.display = "none";
                                                              }}
                                                            >
                              
                                                              {signaturePreview ? (
                                                                <img
                                                                  src={signaturePreview}
                                                                  alt="signature"
                                                                  className="max-h-full max-w-full"
                                                                />
                                                              ) : (
                                                                <span
                                                                  className="
                                                                    text-[14px]
                                                                    font-normal
                                                                    text-[rgba(34,34,34,1)]
                                                                  "
                                                                  style={{ fontFamily: 'Gilroy' }}
                                                                >
                                                                  No signature uploaded
                                                                </span>
                                                              )}
                                                              {signaturePreview && (
                                                                <div className="qr-overlay absolute inset-0 bg-black/40 hidden rounded" />
                                                              )}
                              
                              
                              
                              
                                                              {signaturePreview && (
                                                                <div
                                                                  className="qr-trash
                                                                    absolute -top-1 -right-1
                                                                    hidden
                                                                    items-center justify-center 
                                                                    rounded-full
                                                                    bg-gray-100 text-white
                                                                    p-1
                                                                    cursor-pointer"
                                                                  style={{
                                                                    display: 'none',
                                                                    cursor: 'pointer',
                                                                  }}
                                                                  onClick={handleDeleteRentalSignature}
                                                                >
                                                                  <div
                                                                    className="bg-black/70 text-white p-2 rounded-full">
                                                                    <Trash size={12} />
                                                                  </div>
                                                                </div>
                                                              )}
                                                            </div>

                              <div className="d-flex  flex-column justify-content-between align-items-center mt-2">
                                <div className="d-flex flex-row">
                                  <label style={{
                                    cursor: allowEditFields.digitalSignature ? 'pointer' : 'not-allowed',
                                    color: allowEditFields.digitalSignature ? 'rgba(30, 69, 225, 1)' : '#999', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400
                                  }}>
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
                                  <span className="ms-1" style={{ color: 'rgba(22, 21, 28, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400 }}>to Upload Image</span>
                                </div>
                                <div className="d-flex justify-content-end">
                                  <button
                                    className="btn btn-link text-decoration-none "
                                    onClick={handleClear}
                                    disabled={!signaturePreview}
                                    style={{ color: 'rgba(75, 75, 75, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400 }}
                                  >
                                    Clear
                                  </button>
                                  <button
                                    className="btn btn-link text-decoration-none "
                                    disabled={!signaturePreview}
                                    onClick={handleSignatureDone}
                                    style={{ color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 600 }}
                                  >
                                    Done
                                  </button>
                                </div>


                              </div>
                              {signature_errmsg.trim() !== "" && (
                                <ErrorMessage message={signature_errmsg} type="error" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  }

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
                          paddingTop: '20px'
                        }}
                      >
                        
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
                        paddingBottom: '20px'
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

              </>
            )


          }



          <p style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600, }}>Form Specific Details</p>
          <p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(99, 109, 148, 1)' }}>{`Fill the form with details you'd like to customize.`}</p>














          <div className="p-3 mb-3 border col-lg-12" style={{ borderRadius: '10px' }}>
            <h6 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
              Notes
            </h6>
            <hr />
            <label className="form-label" style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>Add Notes</label>
            <div className="position-relative">
              <textarea
                style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
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
              <ErrorMessage message={notes_errmsg} type="error" />
            )}
          </div>

          <div className="p-3 mb-3 border col-lg-12" style={{ borderRadius: '10px' }}>
            <h6 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
              Terms & Condition</h6>
            <hr />
            <label className="form-label" style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
            >Add T&C</label>

            <div className="position-relative">
              <textarea
                className="form-control pe-5"
                rows="4"
                placeholder='Add any message...'
                value={terms}
                onChange={handleTermsChange}
                style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
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
              <ErrorMessage message={terms_errmsg} type="error" />
            )}

          </div>


          <div className="col-lg-12" style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 16, fontFamily: "sans-serif" }}>
            <h6 style={{ marginBottom: 12, fontFamily: "Gilroy" }}>Template Theme</h6>

            <RgbaColorPicker color={color} onChange={handleColorChange} style={{ width: "100%", }} />

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

          {editErrmsg.trim() !== "" && (
             <div className="d-flex justify-content-center">
            <ErrorMessage message={editErrmsg} type="error" />
            </div>
          )}
          <div className="d-flex justify-content-end mt-2 col-lg-10">
            <Button
              disabled={!canUpdateInvoice}
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
              onClick={handleSaveTemplate}
            >
              Save Template
            </Button>
          </div>

        </div>



      </div>
    </>
  )

}
RentalReceiptPdfTemplate.propTypes = {
  onTemplateReceiptChange: PropTypes.func,

  BillsTemplateList: PropTypes.shape({
    mobile: PropTypes.string,
    emailId: PropTypes.string,
    logo: PropTypes.string,
    signature: PropTypes.string,

    isMobileCustomized: PropTypes.bool,
    isMailIdCustomized: PropTypes.bool,
    isLogoCustomized: PropTypes.bool,
    isSignatureCustomized: PropTypes.bool,

    templates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })
    ),
  }),
};

export default RentalReceiptPdfTemplate;