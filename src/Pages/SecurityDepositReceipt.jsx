import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import leftarrow from "../Assets/Images/arrow-left.png"
import { MdError } from "react-icons/md";
import Logo from '../Assets/Images/get.png'
import Dial from '../Assets/Images/dial.png'
import Room from '../Assets/Images/Car.png'
import Locat from '../Assets/Images/location 03.png'
import Barcode from '../Assets/Images/invoice_barcode.svg'
import Gpay from '../Assets/Images/gpay.png'
import Phonepe from '../Assets/Images/phonepe.png'
import Paytm from '../Assets/Images/paytm.png'
import Questionimage from '../Assets/Images/question.png';
import EditICon from '../Assets/Images/edit_whiteicon.png'
import TextAreaICon from '../Assets/Images/textarea.png'
import BankICon from '../Assets/Images/bank_white.png'
import "react-datepicker/dist/react-datepicker.css";
import Rentalinvoice from '../Assets/Images/Rental_invoice.png';
import SecurityDepositinvoice from '../Assets/Images/bill_settings.png';
import RentalReceipt from '../Assets/Images/receipt-text.png';
import DepositReceipt from '../Assets/Images/receipt-2.png';
import FinalReceipt from '../Assets/Images/receipt-square.png';
import LeftArrow from '../Assets/Images/New_images/arrow-leftblack.png';
import mob from "../Assets/Images/New_images/Rectangle 77.png";
import substrac from "../Assets/Images/New_images/Subtract.png";
import frame from "../Assets/Images/New_images/FramePDF.png";
import mobblue from "../Assets/Images/New_images/Rectangleblue.png";
import substracBlue from "../Assets/Images/New_images/location 03.png";
import frameblue from "../Assets/Images/New_images/Frameblue.png";
import paidfull from '../Assets/Images/New_images/paidfull.png'
import receiptLogo from '../Assets/Images/New_images/receiptlogo.png';
import received from '../Assets/Images/New_images/received.png'
import Select from "react-select";
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {CloseCircle} from "iconsax-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";


  const SecurityReceiptPdfTemplate = () => {


    const dispatch = useDispatch();
     const state = useSelector((state) => state);
   
     const [selectedDate, setSelectedDate] = useState(null);
     const [invoicedueDate, setInvoiceDueDate] = useState('');
     const [accountName, setAccountName] = useState("")
     const [account_number, setAccount_Number] = useState(""); 
     const [description, setDescription] = useState("");
     const [ifsccode, setIfscCode] = useState(""); 
     const [bank_name, setBankName] = useState(""); 
     const [prefix, setPrefix] = useState("");
     const [suffix, setSuffix] = useState("");
     const [tax, setTax] = useState("");
     const [banking, setBanking] = useState([])
     const [selectedBankId, setSelectedBankId] = useState(null);
     const [editErrmsg , setEditErrMessage] = useState('')
     const [showform, setShowForm] = useState(false);
     const [contactnumberform , setContactNumberForm] = useState(false)
   
     const [edit, setEdit] = useState(false);
     const [cardshow, setCardShow] = useState(true)
     const [loading, setLoading] = useState(false)
   
     const [InvoiceList, setInvoiceList] = useState([]);
     
     const [isVisible, setIsVisible] = useState(true);
     const cardRef = useRef(null);
     const innerScrollRef = useRef(null);
     const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);
   
     const [accountNameError, setaccountnameError] = useState("");
     const [bankid_Error, setBankIdError] = useState("");
     const [prefix_errmsg , setPrefixErrMsg] = useState('')
     const [suffix_errmsg , setSuffixErrMsg] = useState('')
     const [tax_errmsg , setTaxErrMsg] = useState('')
     const [notes_errmsg , setNotesErrMsg] = useState('')
     const [terms_errmsg , setTermsErrMsg] = useState('')
     const [signature_errmsg , setSignatureErrMsg] = useState('')
     const [selectedTab, setSelectedTab] = useState("rental_invoice");
     const [showFullView, setShowFullView] = useState(false);
   
   
   
     const handleShowContactNumberForm = () => {
   setContactNumberForm(true)
     }
   
     const handleCloseContactNumberForm = () => {
       setContactNumberForm(false)
     }
   
   
     const CardItems = [
       {
        id:1, 
        icon : Rentalinvoice, 
        title : "Monthly Rental Invoice", 
        type: 'paymentinvoice',
        description : "Detailed monthly rent breakdown including utilities and service charges"
       },
        {
        id:2, 
        icon: SecurityDepositinvoice,
        title: "Security Deposit Invoice",
        type: 'despositinvoice',
        description: "Detailed monthly rent breakdown including utilities and service charges."
       },
        {
        id:3, 
        icon : RentalReceipt, 
        title : "Monthly Rental Receipt", 
        type: 'payementreceipt',
        description : "Detailed monthly rent breakdown including utilities and service charges"
       },
        {
        id:4, 
        icon: DepositReceipt,
        title: "Security Deposit Receipt",
        type: 'depositreceipt',
        description: "Detailed monthly rent breakdown including utilities and service charges."
       },
        {
        id:5, 
        icon : FinalReceipt, 
        title : "Final Settlement Receipt", 
        type:'finalreceipt', 
        description : "Detailed monthly rent breakdown including utilities and service charges"
       },
        
     ]
   
   
     const PdfOptions = [
     { label: "Rental Invoice", value: "rental_invoice" },
     { label: "Security Deposit Invoice", value: "security_deposit_invoice" },
     { label: "Rental Receipt", value: "rental_receipt" },
     { label: "Security Deposit Receipt", value: "security_deposit_receipt" },
     { label: "NOC Receipt", value: "noc_receipt" }
   ];
   
   
     const [color, setColor] = useState({ r: 30, g: 69, b: 225, a: 1 });
   
     // Preset colors (18 colors for 2 rows of 9 each)
     const presetColors = [
       "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
       "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
     ];
   
     const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
     const alphaValue = Math.round(color.a * 100);
   
     const handleselectPdf = (selected) => {
       setSelectedard(selected.value); 
     };
   
   
    
   
    const handleAccountName = (e) => {
       const value = e.target.value
       const pattern = /^[a-zA-Z\s]*$/;
       if (!pattern.test(value)) {
         return;
       }
       setAccountName(value);
       setaccountnameError("")
     };
   
   
   
   const handleAccountNumberChange = (e) => {
     const numericValue = e.target.value.replace(/[^0-9]/g, ""); 
     setAccount_Number(numericValue);
   
   };
   
   
   const handleIfscCodeChange = (e) => {
       const Value = e.target.value  
       setIfscCode(Value)
   
     
   }
   
   const handleBankNameChange = (e) => {
       const Value = e.target.value  
       setBankName(Value)
       
    
   }
   
    const handleDescription = (e) => {
       setDescription(e.target.value);
     };
   
   
       const handleSubmitBank = () => {
   
       if (!accountName) {
         setaccountnameError("Please Enter Benificiary Name");
         return;
       }  
       setaccountnameError("");
    
       if(accountName){
         dispatch({     
         type: "ADD_BANKING",
         payload: { type:"bank", benificiary_name: accountName, acc_no: account_number, bank_name: bank_name,
                    ifsc_code: ifsccode, desc: description, hostel_id: state.login.selectedHostel_Id
                  },
       });
       }
     };
   
   
   const hanldePrefix = (e) => {
        const Value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
       setPrefix(Value)
   
       if (Value.trim() !== "") {
       setPrefixErrMsg("");
     }
   }
   
   const hanldeSuffix = (e) => {
        const numericValue =  e.target.value.replace(/[^0-9]/g, ""); 
       setSuffix(numericValue)
   
       if (numericValue.trim() !== "") {
       setSuffixErrMsg("");
     }
   }
   
   
   
   
   const handleTaxChange = (e) => {
     const inputValue = e.target.value;
   
     const formattedValue = inputValue
       .replace(/[^0-9.]/g, '')    
       .replace(/^([^.]*\.)|\./g, '$1'); 
   
     setTax(formattedValue);
   
     if (formattedValue.trim() !== "") {
       setTaxErrMsg("");
     }
   };
   
   
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
   
   
     
     const handleEdit = () => {
       setShowForm(false);
       setCardShow(false)
       setEdit(true); 
   
       if(state.login.selectedHostel_Id){
         setLoading(true)
         dispatch({ type: "SETTINGS_GET_INVOICE" , payload:{hostel_id: state.login.selectedHostel_Id} });
       }
     };
   
     const handleEditClose = () => {
       setShowForm(true);
       setCardShow(false)
       setEdit(false);
       setPrefixErrMsg("");
       setSuffixErrMsg("");
       setTaxErrMsg("");
       setNotesErrMsg("");
       setTermsErrMsg("");
       setAccount_Number("")
       setSignatureErrMsg("")
       setEditErrMessage("")
       setIfscCode("")
       setBankName("")
       setPrefix("")
       setSuffix("")
       setTax("")
       setSignature(null)
       setSelectedBankId(null)
       setSignaturePreview(null)
       setBankIdError("")
     }
   
   
     useEffect(()=> {
               if(InvoiceList?.invoiceSettings?.signatureFile && signature){
                   setIsSignatureConfirmed(true)
                   setSignatureErrMsg("")
               }
     },[signature])
   
   
   
   
   
     const handleSaveInvoice = () => {
    if (
     !prefix || !suffix || !tax || !notes || !terms || !signature || !isSignatureConfirmed || !selectedBankId
   ) {
     if (!prefix) setPrefixErrMsg("Please Enter Prefix");
     if (!suffix) setSuffixErrMsg("Please Enter Suffix");
     if (!tax) setTaxErrMsg("Please Enter Tax");
     if (!notes) setNotesErrMsg("Please Enter Notes");
     if (!terms) setTermsErrMsg("Please Enter Terms");
     if(!selectedBankId)setBankIdError("Please Add or select bank")
     if (!signature) {
       setSignatureErrMsg("Please select signature");
     } else if (!isSignatureConfirmed) {
       setSignatureErrMsg("Please click Done after selecting a signature");
     }
     return;
   }
   
   
     const currentData = {
       prefix,
       suffix,
       tax,
       notes: notes?.replace(/"/g, '') || '',
       privacyPolicy: terms,
       signatureFile: signature,
       bankingId: Number(selectedBankId)
     };
   
     const originalData = {
       prefix: InvoiceList?.invoiceSettings?.prefix || '',
       suffix: InvoiceList?.invoiceSettings?.suffix || '',
       tax: InvoiceList?.invoiceSettings?.tax || '',
       notes: InvoiceList?.invoiceSettings?.notes?.replace(/"/g, '') || '',
       privacyPolicy: InvoiceList?.invoiceSettings?.privacyPolicyHtml || '',
       signatureFile: InvoiceList?.invoiceSettings?.signatureFile || '',
       bankingId: Number(InvoiceList?.invoiceSettings?.bankingId || 0),
     };
   
     if (
       InvoiceList?.invoiceSettings &&
       JSON.stringify(currentData) === JSON.stringify(originalData)
     ) {
       setEditErrMessage("No changes detected");
       setSignatureErrMsg("")
       return;
     }
   
     if(selectedBankId){
          dispatch({
       type: "ADD_INVOICE_SETTINGS",
       payload: {
         hostelId: Number(state.login.selectedHostel_Id),
         bank_id: Number(selectedBankId),
         prefix,
         suffix,
         tax,
         notes,
         privacyPolicy: terms,
         signature,
       },
     });
     }
   
   
   };
   
   
   
      
     
    
   //   useEffect(() => {
   //     if (hostelid) {
   //          setLoading(true)
   //     dispatch({ type: "SETTINGS_GET_INVOICE" , payload:{hostel_id: state.login.selectedHostel_Id} });
   //     dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
   //     }
   //   }, [hostelid]);
   
   
   
   
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
   
   
         useEffect(() => {
       if (state.Settings?.settingsInvoicegetSucesscode === 200) {
           setLoading(false)
         setInvoiceList(state.Settings.SettingsInvoice)
   
         setTimeout(() => {
           dispatch({ type: "CLEAR_SETTINGSGETINVOICE_STATUS_CODE" });
         }, 1000);
       }
     }, [state.Settings.settingsInvoicegetSucesscode]);
   
   
       useEffect(() => {
       if (state.Settings?.settingsInvoicegetErrorStatuscode === 201) {
           setLoading(false)
           setSelectedBankId(null)
           setPrefix("")
           setSuffix("")
           setTax("")
           setSignature(null)
           setSignaturePreview(null)
           setBankIdError("")
   
         setTimeout(() => {
           dispatch({ type: "CLEAR_ERROR_SETTINGS_GETINVOICE_STATUS_CODE" });
         }, 1000);
       }
     }, [state.Settings.settingsInvoicegetErrorStatuscode]);
   
   
   
   
     
     
   //     useEffect(() => {
   //     if (state.Settings?.settingsAddInvoiceSucesscode === 200) {
   
   //     dispatch({ type: "SETTINGS_GET_INVOICE" , payload:{hostel_id: hostelid} });
   
   //       setTimeout(() => {
   //         dispatch({ type: "CLEAR_ADDINVOICE_SETTINGS_STATUS_CODE" });
   //       }, 1000);
   //     }
   //   }, [state.Settings.settingsAddInvoiceSucesscode]);
   
   
    
   
     
   
    
     
    
   
   
   
     useEffect(() => {
       if (state.InvoiceList?.invoiceSettingsStatusCode === 200) {
   
         dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
         setSelectedDate('')
         setInvoiceDueDate('')
   
         setTimeout(() => {
           dispatch({ type: "CLEAR_INVOICE_SETTINS_STATUSCODE" });
         }, 1000);
       }
     }, [state.InvoiceList]);
   
   
   
   
     const [selectedcard, setSelectedard] = useState('')
   
     
   
     const handleShow = (type) => {
   
       if (!state.login.selectedHostel_Id) {
     toast.error("Please add a hostel before adding Invoice information.", {
           hideProgressBar: true,
           autoClose: 1500,
           style: {
             color: "#000",
             borderBottom: "5px solid red",
             fontFamily: "Gilroy",
           },
         });
         return;
       }
       setIsInvoiceAddMode(true)
       setIsSidebarOpen(false)
       setIsVisible(true)
       setSelectedard(type)
       setShowForm(true);
       setEdit(false);
       setCardShow(false)
     };
   
   
   
     const handleCloseForm = () => {
       setShowForm(false);
       setEdit(false);
       setCardShow(true)
       setSelectedard('')
       setPrefix('')
       setSelectedDate('')
       setInvoiceDueDate('')
       setIsInvoiceAddMode(false)
       setIsSidebarOpen(true)
     };
   
   
     const [bankaccountform , setBankAccountForm] = useState(false)
    
   
               const handleAddBankAccount = () => {
                  setBankAccountForm(true)
                      }
   
     
               const handleCloseBankAccount = () => {
                    setBankAccountForm(false)
                    setaccountnameError("")
                    setAccountName("")
                    setAccount_Number("")
                    setIfscCode("")
                    setBankName("")
                    setDescription("")
                   }
   
                    useEffect(() => {
                       if(state.login.selectedHostel_Id){
                       dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
                       }
                     }, [state.login.selectedHostel_Id]);
    
    useEffect(() => {
       if (state.bankingDetails.statusCodeForGetBanking === 200) {
         setBanking(state.bankingDetails.bankingList.banks)
         setTimeout(() => {
           dispatch({ type: "CLEAR_BANKING_LIST" });
         }, 200);
       }
     }, [state.bankingDetails.statusCodeForGetBanking]);
   
                   
        useEffect(() => {
          if (state.bankingDetails.statusCodeForAddBanking === 200) {
            setAccountName("")
            setAccount_Number("")
            setIfscCode("")
            setBankName("")
            setDescription("")
            handleCloseBankAccount();
      
            dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
            setTimeout(() => {
              dispatch({ type: "CLEAR_ADD_USER_BANKING" });
            }, 1000);
          }
        }, [state.bankingDetails.statusCodeForAddBanking]);
   
   
   
   
   
   
     
   
     const handleBankClick = (id) => {
       setSelectedBankId(id);
     };
   
       useEffect(() => {
       if (banking.length > 0) {
         const defaultBank = banking.find((bank) => bank.setus_default === 2) || banking[0];
         setSelectedBankId(defaultBank.id);
       }
     }, [banking]);
   
     
   
   
     useEffect(() => {
       if (selectedDate && isNaN(new Date(selectedDate).getTime())) {
         setSelectedDate(null);
       }
     }, [selectedDate]);
   
     useEffect(() => {
       if (invoicedueDate && isNaN(new Date(invoicedueDate).getTime())) {
         setInvoiceDueDate(null);
       }
     }, [invoicedueDate]);
   
   
   
   
    
   
   
         useEffect(()=> {
                if(InvoiceList?.invoiceSettings){
                      setPrefix(InvoiceList.invoiceSettings.prefix)
                      setSuffix(InvoiceList.invoiceSettings.suffix)
                      setNotes(InvoiceList.invoiceSettings.notes)
                      setTax(InvoiceList.invoiceSettings.tax)
                      setTerms(InvoiceList.invoiceSettings.privacyPolicyHtml)
                      setSignature(InvoiceList.invoiceSettings.signatureFile || null)
                      setSignaturePreview(InvoiceList.invoiceSettings.signatureFile || null)
                      setNotes(InvoiceList.invoiceSettings.notes?.replace(/"/g, "") || "");
   
       if (InvoiceList.invoiceSettings.bankingId) {
         setSelectedBankId(InvoiceList.invoiceSettings.bankingId);
       } else if (banking.length > 0) {
         setSelectedBankId(banking[0].id); 
       }
                }
        },[InvoiceList ,banking])
   
   
   
   useEffect(() => {
     if (!InvoiceList?.invoiceSettings) return;
   
     const currentData = {
       prefix,
       suffix,
       tax,
       notes: notes?.replace(/"/g, '') || '',
       privacyPolicy: terms,
       signatureFile: signature,
       bankingId: Number(selectedBankId)
     };
   
     const originalData = {
       prefix: InvoiceList.invoiceSettings.prefix || '',
       suffix: InvoiceList.invoiceSettings.suffix || '',
       tax: InvoiceList.invoiceSettings.tax || '',
       notes: InvoiceList.invoiceSettings.notes?.replace(/"/g, '') || '',
       privacyPolicy: InvoiceList.invoiceSettings.privacyPolicyHtml || '',
       signatureFile: InvoiceList.invoiceSettings.signatureFile || '',
       bankingId: Number(InvoiceList.invoiceSettings.bankingId || 0),
     };
   
     if (JSON.stringify(currentData) !== JSON.stringify(originalData)) {
       setEditErrMessage('');
     }
   }, [prefix, suffix, tax, notes, terms, signature, selectedBankId, InvoiceList]);
   
   
   
   
   
   useEffect(() => {
     if (showFullView) {
       document.body.style.overflow = 'hidden';
     } else {
       document.body.style.overflow = 'auto';
     }
   }, [showFullView]);
   
   
   

    return(

        <div className="col-12 d-flex flex-row">
       <div className="col-lg-5 show-scroll" style={{ maxHeight: 450,
                  overflowY: "auto",
                  overflowX:'hidden',}}>
       <p style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600,}}>Inherited Global Details</p>
       <p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,color:'rgba(99, 109, 148, 1)'}}>Fill the form with details you'd like to customize.</p>
       
        
       
       
        
       
                         
       
        
       
       
       
       
       
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
       
             <RgbaColorPicker color={color} onChange={setColor} style={{ width: "100%", }} />
       
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

       <div className="receipt-container border ps-4 pe-4 pb-4 pt-4 col-lg-7" ref={cardRef} style={{ marginTop:'20px', borderRadius:'8px' ,}} >
      
      <div   ref={innerScrollRef}
        className="border shadow show-scroll"
        style={{
          maxHeight: 450,
          overflowY: "auto",
          borderBottomLeftRadius: "13px",
          borderBottomRightRadius: "13px",
        }}>
                        <div   className=" text-white  p-3 position-relative" style={{ minHeight: "100px",backgroundColor:"#00A32E" }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className=" mb-0"><img src={receiptLogo} alt="logo" style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }} className="me-2"/>Smartstay</h4>
                              <small className="ms-4" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</small>
                            </div>
                            <div className="text-start">
                              <h5 className="mb-1" style={{ fontSize: 17, fontWeight: 600,  fontFamily: "Gilroy" , marginRight:'20px'}}> Royal Grand Hostel</h5>
            <div style={{ fontSize: 13, fontWeight: 400, fontFamily: "Gilroy" }}>
       9, 8th Avenue Rd, Someshwara Nagar, <br />
                   Chennai, Tamilnadu - 600 056
                   </div>
                            </div>
                          </div>
                        </div>
                      
                       
                        <div className="container bg-white rounded-bottom border position-relative" style={{}}>
                          <div className="text-center pt-2 pb-1">
                            <h5 className="" style={{ fontSize: '17px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>Security Deposit Receipt</h5> 
                          </div>
                      
                        
                          <div className="row px-4 mt-3">
                            <div className="col-md-7 mb-3">
                              <p className=" mb-1" style={{color:'rgba(0, 163, 46, 1)' ,  fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To :</p>
                              <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                              <p className="mb-1"><img src={mob} alt="mob" width={12} height={12}/>
                             <span className="ms-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}>
                                +91 85647 85332
                                              </span>
                               </p>
                               <p className="mb-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frame} alt="frame" width={15} height={15} className="me-1"/> 
                               No 103 -02 </p>
                              <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                             
                             <div className="me-2">
                               <img src={substrac} alt="subs" />
                             </div>
                           
                             <div>
                                         <p>
                  9, 8th Main Rd, Someshwara Nagar, <br></br>
                   Bengaluru, Karnataka 560011
                </p>
                             </div>
                           
                           </div>
      
                            </div>
                            <div className="col-md-5 mb-3">
                              <div className="row">
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Receipt No :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#SSR001</div>
                      
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Invoice Ref :</div>
                                <div className="col-6 text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#324515</div>
                      
                                <div className="col-6 text-muted text-end mt-1"   style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                      
      
                      
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',paddingLeft:18}}>UPI / Net Banking </div>
                              </div>
                            </div>
                          </div>
                      
                          {selectedcard === "depositreceipt" && (
        <div className="d-flex justify-content-end text-end mt-3 me-5">
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, fontFamily: "Gilroy" , marginRight:'15px', marginTop:'60px'}}>
                Amount received
              </label>
            </div>
          <div style={{ padding: '20px', border: '1px solid rgba(0, 163, 46, 1)', borderRadius:'5px' }}>
          
            <div>
              <label style={{ fontSize: 17, fontWeight: 700, fontFamily: "Gilroy" , color:'rgba(0, 163, 46, 1)' }}>
                 ₹ 8,073.00
              </label>
            </div>
            <div>
              <label style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#000000",
                fontFamily: "Gilroy"
              }}>
                Eight Thousand and Seventy Three Rupees Only
              </label>
            </div>
          </div>
        </div>
      )}
      
      {selectedcard === "depositreceipt" && 
      (
      <div>
        <p style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)',marginLeft:'20px'}}>Payment For</p>
        </div>
      )
      
      }
                         
                          <div className="px-4 pb-3">
                            <div className="table-responsive">
                              <table className="table  text-center align-middle">
                                <thead  style={{backgroundColor:"#00A32E",color:"#FFFFFF"}}>
                                  <tr style={{color:"white"}}>
                                    <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white" , fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600 }}>S.NO</th>
                                    <th style={{color:"white" , fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600}}>Inv No</th>
                                    <th style={{color:"white" ,  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600 }}>Description</th>
                                    { selectedcard !== "payementreceipt" && (
        <th style={{ color: "white"  ,  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600 }}>Duration</th>
      )}
                                  
                                    <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600  }}>Amount / INR</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
                                    <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                                    <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}>INV-004</td>
                                    <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}> 
                                      {selectedcard === "payementreceipt" ? "Room Rental" : "Security Deposit (Advance)"}
                                      </td>
                                    {selectedcard !== "payementreceipt" && (
        <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}} >May 2025</td>
      )}
      
      <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
        {selectedcard === "payementreceipt" ? "Rs: 8,000.00" : "Rs: 8,073.00"}
      </td>
      
      
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
        
      {selectedcard === "payementreceipt"  && (
        <div className="d-flex justify-content-end mt-3">
          <div className="w-100 w-md-50" style={{ paddingRight: "50px" }}>
            <div className="d-flex justify-content-end py-1">
              <div
                className="w-50 text-end"
                style={{
                  fontSize: '13px',
                  fontFamily: 'Gilroy',
                  fontWeight: 500,
                  color: 'rgba(23, 23, 23, 1)',
                }}
              >
                Sub Total
              </div>
              <div
                className="w-25 text-end"
                style={{
                  fontSize: '13px',
                  fontFamily: 'Gilroy',
                  fontWeight: 500,
                  color: 'rgba(23, 23, 23, 1)',
                }}
              >
                 Rs: 1150.00
              </div>
            </div>
            <div className="d-flex justify-content-end py-2 fw-bold">
              <div
                className="w-50 text-end"
                style={{
                  fontSize: '13px',
                  fontFamily: 'Gilroy',
                  fontWeight: 500,
                  color: 'rgba(23, 23, 23, 1)',
                }}
              >
                Total
              </div>
              <div
                className="w-25 text-end"
                style={{
                  fontSize: '15px',
                  fontFamily: 'Gilroy',
                  fontWeight: 500,
                  color: 'rgba(23, 23, 23, 1)',
                }}
              >
             Rs: 9,150.00
              </div>
            </div>
          </div>
        </div>
      )}
      
      
                          </div>
                      
                         
                        
                        </div>
                        <div className="px-4" style={{marginTop:20}}>
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <h6  style={{
              fontSize: '13px',
              fontFamily: 'Gilroy',
              fontWeight: 700,
              color: '#00A32E',
              letterSpacing:'1px'}}
              >PAYMENT DETAILS</h6>
                                <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode: 
          G-Pay</p>
                                {selectedcard === "payementreceipt" && (
        <p
          className="mb-1"
          style={{
            fontSize: '13px',
            fontFamily: 'Gilroy',
            fontWeight: 500,
            color: 'rgba(23, 23, 23, 1)',
          }}
        >
          Transaction ID: GPay-2134-8482-XYZ
        </p>
      )}
      
                                <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Received By: Admin - Anjali R</p>
                                <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)',marginTop:"-14px" }}>Status: Paid</p>
          
                              </div>
                              <div className="col-md-6 text-end">
                              <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={91} width={162}/></p>
                              {selectedcard !== "payementreceipt" && (
          <div className="text-start mt-2 ms-5" >
            <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(0, 163, 46, 1)',fontSize:"13px",marginLeft:"35px"}}>
            &quot;Thank you for choosing SmartStay. &quot;
            </p>
            <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(0, 163, 46, 1)',fontSize:"13px",marginLeft:"35px"}}>
            Your transaction is completed &quot;
            </p>
          </div>
        )}
                              </div>
                              <div className="row">
        <div className="col-md-6">
          <h6  style={{color:"#00A32E",fontSize:"13px",fontWeight:600,fontFamily:"Gilroy"}}>Acknowledgment</h6>
          <p style={{ fontSize: "12px", color: "#555",fontFamily:"Gilroy" }}>
            This payment confirms your dues till the mentioned period. Final settlement during checkout will be calculated based on services utilized and advance paid.
          </p>
        </div>
      
        <div className="col-md-6 text-end">
          <p className="text-success fw-bold border-success px-4 py-2 d-inline-block">
          </p>
          <p className="mt-4" style={{fontSize: "13px",fontFamily:"Gilroy",color:"#2C2C2C",paddingRight:"25px"}}>Authorized Signature</p>
        </div>
      </div>
      
                            </div>
                          </div>
                      
                          <div className="py-2 px-5">
                          <div className=" text-white text-center" style={{borderTopLeftRadius:"12px",borderTopRightRadius:"12px",backgroundColor:"#00A32E",padding:7}}>
                            <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)',}}>Email : contact@royalgrandhostel.in| Contact : +91 88994 56611</small>
                          </div>
                          </div>
                          </div>
                      </div>


                       </div>
    )

  }
  export default SecurityReceiptPdfTemplate;