/* eslint-disable react-hooks/exhaustive-deps */
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
import Topbottom from '../Assets/Images/cancel_presentation.png';
import left85arrow from '../Assets/Images/arrow85.png';
import printdown from '../Assets/Images/printericon.png';
import downloadicon from '../Assets/Images/pdfdown.png';
import CloseIcon from '../Assets/Images/close_icon.png';
import Questionimage from '../Assets/Images/question.png';
import EditICon from '../Assets/Images/New_images/edit.png';
import TextAreaICon from '../Assets/Images/textarea.png'
import BankICon from '../Assets/Images/bank_white.png'
import "react-datepicker/dist/react-datepicker.css";
import uploadsett from "../Assets/Images/New_images/upload setting.png";
import ZoomImage from '../Assets/Images/zoom.png'
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CloseCircle } from "iconsax-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import './SettingInvoice.css';
import NOCReceiptPdfTemplate from "./NocReceiptpdftemplate";
import RentalReceiptPdfTemplate from "./RentalReceiptPdfTempate";
import SecurityDepositInvoiceTemplate from "./SecurityDepositInvoice";
import SecurityReceiptPdfTemplate from "./SecurityDepositReceipt";


function SettingInvoice({ hostelid, setIsInvoiceAddMode, setIsSidebarOpen }) {


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
  const [editErrmsg, setEditErrMessage] = useState('')
  const [showform, setShowForm] = useState(false);
  const [contactnumberform, setContactNumberForm] = useState(false)
  const [editformErrmsg, setEditFormErrMessage] = useState('')

  const [edit, setEdit] = useState(false);
  const [cardshow, setCardShow] = useState(true)
  const [loading, setLoading] = useState(false)

  const [InvoiceList, setInvoiceList] = useState([]);

  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

  const [accountNameError, setaccountnameError] = useState("");
  const [bankid_Error, setBankIdError] = useState("");
  const [prefix_errmsg, setPrefixErrMsg] = useState('')
  const [suffix_errmsg, setSuffixErrMsg] = useState('')
  const [tax_errmsg, setTaxErrMsg] = useState('')
  const [notes_errmsg, setNotesErrMsg] = useState('')
  const [terms_errmsg, setTermsErrMsg] = useState('')
  const [signature_errmsg, setSignatureErrMsg] = useState('')
  const [selectedTab, setSelectedTab] = useState("rental_invoice");
  const [showFullView, setShowFullView] = useState(false);
  const [mobilenum, setMobileNum] = useState("")
  const [MobileError, setMobileError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCheckedmobile, setIsCheckedMobile] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedLogo, setIsCheckedLogo] = useState(false);
  const [isCheckedSignature, setIsCheckedSignature] = useState(false);
  const [getData, setGetData] = useState("")
  const [signature, setSignature] = useState(null)
  const [signaturePreview, setSignaturePreview] = useState(null)
  const [savebuttonshow, setSavebuttonshow] = useState(false)
  const [initialValues, setInitialValues] = useState({});
  const [noChangesDetectedMsg, setNoChangesDetectedMsg] = useState("");



  useEffect(() => {
    if (state.Settings.statusCodeForSettingFetch === 200) {
      setGetData(state.Settings.FetchGlobal.message)
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_GLOBAL_SETTING" });
      }, 1000);
    }

  }, [state.Settings.statusCodeForSettingFetch])





  useEffect(() => {
    if (getData && getData[0]) {
      const initial = {
        mobilenum: getData[0]?.common_contact_number || "",
        email: getData[0]?.common_email || "",
        sign: getData[0]?.common_digital_signature_url || null,
        selectedFile: getData[0]?.common_logo_url || null,
        isCheckedLogo: !!getData[0]?.is_logo_specific_template,
        isCheckedmobile: !!getData[0]?.is_contact_specific_template,
        isCheckedEmail: !!getData[0]?.is_email_specific_template,
        isCheckedSignature: !!getData[0]?.is_signature_specific_template,
      };

      setInitialValues(initial);
      setMobileNum(initial.mobilenum);
      setEmail(initial.email);
      setSign(initial.sign);
      setSignPreview(initial.sign);
      setSelectedFile(initial.selectedFile);
      setPreviewURL(initial.selectedFile);
      setIsCheckedLogo(initial.isCheckedLogo);
      setIsCheckedMobile(initial.isCheckedmobile);
      setIsCheckedEmail(initial.isCheckedEmail);
      setIsCheckedSignature(initial.isCheckedSignature);
    }
  }, [getData, state.login.selectedHostel_Id]);


  useEffect(() => {
    if (state.Settings.settingGlobalAddStatusCode === 200) {
      setSavebuttonshow(false)
      dispatch({ type: "FETCHSETTINGTEMP", payload: { hostel_Id: state.login.selectedHostel_Id } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_GLOBAL_SETTINGS" });
      }, 1000);
    }

  }, [state.Settings.settingGlobalAddStatusCode])



  const [allowImageUpload, setAllowImageUpload] = useState(false);
  const [allowEditFields, setAllowEditFields] = useState({
    contact: false,
    email: false,
    hostelLogo: false,
    digitalSignature: false,
  });



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
  const [paymentmobilenum, setPaymentMobileNum] = useState("")
  const [paymentMobileError, setPaymentMobileError] = useState("")
  const [paymentinvoiceemail, setPaymentinvoiceEmail] = useState("")
  const [paymentinvoiceemailError, setPaymentInvoiceEmailError] = useState("")

  const handlePaymentinvoiceEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setPaymentinvoiceEmail(emailValue);
    setEditFormErrMessage("")
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setPaymentInvoiceEmailError("");

    } else if (!isValidEmail) {

      setPaymentInvoiceEmailError("Please Enter  Valid Email Id");
    } else {
      setPaymentInvoiceEmailError("");

    }

  };


  const handlePaymentInvoiceMobile = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setPaymentMobileNum(input);
    setEditFormErrMessage("")
    if (input.length === 0) {
      setPaymentMobileError("");
    } else if (input.length < 10) {
      setPaymentMobileError(" Please Enter Valid Mobile Number");
    } else if (input.length === 10) {
      setPaymentMobileError("");
    } else if (input.length > 10) {
      setPaymentMobileError(" Please Enter Valid Mobile Number");
    }

  };

  useEffect(() => {
    dispatch({ type: "FETCHSETTINGTEMP", payload: { hostel_Id: state.login.selectedHostel_Id } })
  }, [state.login.selectedHostel_Id])


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
    setFieldError("")
    setSavebuttonshow(true)
    setNoChangesDetectedMsg("");
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
    setFieldError("")
    setSavebuttonshow(true)
    setNoChangesDetectedMsg("");

  };



  const handleMobileCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedMobile(checked);
    setSavebuttonshow(true)
    setNoChangesDetectedMsg("");

  }

  const handleEmaiCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedEmail(checked);
    setSavebuttonshow(true)
    setNoChangesDetectedMsg("");

  }

  const handleLogoCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedLogo(checked);
    setSavebuttonshow(true)
    setNoChangesDetectedMsg("");

  };



  const handleSignatureCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedSignature(checked);
    setSavebuttonshow(true)
    setNoChangesDetectedMsg("");

  };
  const PdfOptions = [
    { label: "Rental Invoice", value: "rental_invoice" },
    { label: "Security Deposit Invoice", value: "security_deposit_invoice" },
    { label: "Rental Receipt", value: "rental_receipt" },
    { label: "Security Deposit Receipt", value: "security_deposit_receipt" },
    { label: "NOC Receipt", value: "noc_receipt" }
  ];

  const defaultGradient = 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))';

  const [useGradient, setUseGradient] = useState(true);
  const [color, setColor] = useState({ r: 30, g: 69, b: 225, a: 1 });
  const handleColorChange = (newColor) => {
    setColor(newColor);
    setUseGradient(false);
    setEditFormErrMessage("")
  }

  const presetColors = [
    "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
    "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
  ];

  const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
  const alphaValue = Math.round(color.a * 100);






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

    if (accountName) {
      dispatch({
        type: "ADD_BANKING",
        payload: {
          type: "bank", benificiary_name: accountName, acc_no: account_number, bank_name: bank_name,
          ifsc_code: ifsccode, desc: description, hostel_id: state.login.selectedHostel_Id
        },
      });
    }
  };


  const hanldePrefix = (e) => {
    const Value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setPrefix(Value)
    setEditFormErrMessage("")
    if (Value.trim() !== "") {
      setPrefixErrMsg("");
    }
  }

  const hanldeSuffix = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setSuffix(numericValue)
    setEditFormErrMessage("")
    if (numericValue.trim() !== "") {
      setSuffixErrMsg("");
    }
  }




  const handleTaxChange = (e) => {
    const inputValue = e.target.value;
    setEditFormErrMessage("")
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
    setEditFormErrMessage("")
    if (Value.trim() !== "") {
      setNotesErrMsg("");
    }
  }

  const handleTermsChange = (e) => {
    const Value = e.target.value
    setTerms(Value)
    setEditFormErrMessage("")
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


  const [logoPreview, setLogoPreview] = useState(null);
  const [hostel_logo, setHostelLogo] = useState(null)


  const handleFileUploadHostel = (e) => {
    if (!allowImageUpload) return;
    const file = e.target.files[0];
    setEditFormErrMessage("")
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  const fileInputRef = useRef(null);
  const [sign, setSign] = useState(null);
  const [signPreview, setSignPreview] = useState(null);




  const handleFileSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSign(file); // For upload
      setSignPreview(URL.createObjectURL(file)); // For preview
      setSignatureErrMsg("");
      setIsSignatureConfirmed(false);
      setFieldError("");
      setSavebuttonshow(true)
    }
    setNoChangesDetectedMsg("");
  };







  const [previewURL, setPreviewURL] = useState(null);
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     console.log("Selected file:", file);
  //     setSelectedFile(file);
  //     setPreviewURL(URL.createObjectURL(file));
  //     setFieldError("");
  //   }
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewURL(objectUrl);
      setFieldError("");
      setSavebuttonshow(true)
    } else {
      setFieldError("Please select a valid PNG or image file.");
    }
    setNoChangesDetectedMsg("");
  };

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);



  // useEffect(() => {
  //   return () => {
  //     if (previewURL) {
  //       URL.revokeObjectURL(previewURL);
  //     }
  //   };
  // }, [previewURL]);





  const handleClear = () => {
    setSign("");
    setSignPreview("")
    setSignatureErrMsg("");
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }

    setNoChangesDetectedMsg("");
    setSavebuttonshow(true);
  };


  const handleSignatureDone = () => {
    if (!sign) {
      setSignatureErrMsg("Please select a signature file.");
    } else {
      setSignatureErrMsg("");
      setIsSignatureConfirmed(true);
    }
  };

  const rentalSignatureInputRef = useRef(null);
  const [rentalSignatureFile, setRentalSignatureFile] = useState(null);
  const [rentalSignaturePreview, setRentalSignaturePreview] = useState(null);
  const [rentalSignatureError, setRentalSignatureError] = useState("");
  const [isRentalSignatureConfirmed, setIsRentalSignatureConfirmed] = useState(false);


  const handleRentalSignatureChange = (e) => {
    const file = e.target.files[0];
    setEditFormErrMessage("")
    if (file) {
      setRentalSignatureFile(file);
      setRentalSignaturePreview(URL.createObjectURL(file));
      setRentalSignatureError("");
      setIsRentalSignatureConfirmed(false);
    }
  };

  const handleRentalSignatureClear = () => {
    setEditFormErrMessage("")
    setRentalSignatureFile(null);
    setRentalSignaturePreview(null);
    setRentalSignatureError("");
    if (rentalSignatureInputRef.current) {
      rentalSignatureInputRef.current.value = '';
    }
  };

  const handleRentalSignatureDone = () => {

    if (!rentalSignatureFile) {
      setRentalSignatureError("Please select a signature file.");
    } else {
      setEditFormErrMessage("")
      setRentalSignatureError("");
      setIsRentalSignatureConfirmed(true);
    }
  };




  // const handleEditClose = () => {
  //   setShowForm(true);
  //   setCardShow(false)
  //   setEdit(false);
  //   setPrefixErrMsg("");
  //   setSuffixErrMsg("");
  //   setTaxErrMsg("");
  //   setNotesErrMsg("");
  //   setTermsErrMsg("");
  //   setAccount_Number("")
  //   setSignatureErrMsg("")
  //   setEditErrMessage("")
  //   setIfscCode("")
  //   setBankName("")
  //   setPrefix("")
  //   setSuffix("")
  //   setTax("")
  //   setSignature(null)
  //   setSelectedBankId(null)
  //   setSignaturePreview(null)
  //   setBankIdError("")
  // }


  // useEffect(()=> {
  //           if(InvoiceList?.invoiceSettings?.signatureFile && signature){
  //               setIsSignatureConfirmed(true)
  //               setSignatureErrMsg("")
  //           }
  // },[signature])





  const handleSaveInvoice = () => {
    if (
      !prefix || !suffix || !tax || !notes || !terms || !signature || !isSignatureConfirmed || !selectedBankId
    ) {
      if (!prefix) setPrefixErrMsg("Please Enter Prefix");
      if (!suffix) setSuffixErrMsg("Please Enter Suffix");
      if (!tax) setTaxErrMsg("Please Enter Tax");
      if (!notes) setNotesErrMsg("Please Enter Notes");
      if (!terms) setTermsErrMsg("Please Enter Terms");
      if (!selectedBankId) setBankIdError("Please Add or select bank")
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

    if (selectedBankId) {
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






  useEffect(() => {
    if (hostelid) {
      setLoading(true)
      dispatch({ type: "SETTINGS_GET_INVOICE", payload: { hostel_id: state.login.selectedHostel_Id } });
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, [hostelid]);




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






  useEffect(() => {
    if (state.Settings?.settingsAddInvoiceSucesscode === 200) {

      dispatch({ type: "SETTINGS_GET_INVOICE", payload: { hostel_id: hostelid } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDINVOICE_SETTINGS_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsAddInvoiceSucesscode]);












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
    dispatch({ type: 'GET_TEMPLATE_LIST', payload: { hostel_Id: Number(state.login.selectedHostel_Id) } })
    setIsInvoiceAddMode(true)
    setIsSidebarOpen(false)
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
    setEditFormErrMessage("")
  };


  const [bankaccountform, setBankAccountForm] = useState(false)


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
    if (state.login.selectedHostel_Id) {
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







  //   useEffect(()=> {
  //          if(InvoiceList?.invoiceSettings){
  //                setPrefix(InvoiceList.invoiceSettings.prefix)
  //                setSuffix(InvoiceList.invoiceSettings.suffix)
  //                setNotes(InvoiceList.invoiceSettings.notes)
  //                setTax(InvoiceList.invoiceSettings.tax)
  //                setTerms(InvoiceList.invoiceSettings.privacyPolicyHtml)
  //                setSignature(InvoiceList.invoiceSettings.signatureFile || null)
  //                setSignaturePreview(InvoiceList.invoiceSettings.signatureFile || null)
  //                setNotes(InvoiceList.invoiceSettings.notes?.replace(/"/g, "") || "");

  // if (InvoiceList.invoiceSettings.bankingId) {
  //   setSelectedBankId(InvoiceList.invoiceSettings.bankingId);
  // } else if (banking.length > 0) {
  //   setSelectedBankId(banking[0].id); 
  // }
  //          }
  //  },[InvoiceList ,banking])

  //  console.log("signatureimaage", InvoiceList.invoiceSettings.signatureFile );




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


  const [qrImage, setQrImage] = useState(null);
  const [qrimagepreview, setQRImagePreview] = useState(null)
  const qrFileInputRef = useRef(null);

  const handleQrImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormErrMessage('')
      setQRImagePreview(file)
      setQrImage(URL.createObjectURL(file));
    }
  };


  const handleSaveRentalTemplate = () => {
    const currentTemplate = {
      hostel_Id: Number(state.login.selectedHostel_Id),
      id: RentalinvoiceTemplate.id,
      digital_signature_url: signature,
      is_signature_specific_template: RentalinvoiceTemplate.is_signature_specific_template,
      contact_number: paymentmobilenum,
      is_contact_specific_template: RentalinvoiceTemplate.is_contact_specific_template,
      email: paymentinvoiceemail,
      is_email_specific_template: RentalinvoiceTemplate.is_email_specific_template,
      logo_url: hostel_logo,
      is_logo_specific_template: RentalinvoiceTemplate.is_logo_specific_template,
      qr_url: qrimagepreview,
      prefix,
      suffix,
      tax,
      notes,
      terms_and_condition: terms,
      banking_id: Number(selectedBankId),
      template_theme: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    };

    const oldTemplate = {
      hostel_Id: Number(state.login.selectedHostel_Id),
      id: RentalinvoiceTemplate.id,
      digital_signature_url: RentalinvoiceTemplate.digital_signature_url || null,
      is_signature_specific_template: RentalinvoiceTemplate.is_signature_specific_template,
      contact_number: RentalinvoiceTemplate.contact_number || '',
      is_contact_specific_template: RentalinvoiceTemplate.is_contact_specific_template,
      email: RentalinvoiceTemplate.email || '',
      is_email_specific_template: RentalinvoiceTemplate.is_email_specific_template,
      logo_url: RentalinvoiceTemplate.logo_url || null,
      is_logo_specific_template: RentalinvoiceTemplate.is_logo_specific_template,
      qr_url: RentalinvoiceTemplate.qr_url || null,
      prefix: RentalinvoiceTemplate.prefix || '',
      suffix: RentalinvoiceTemplate.suffix || '',
      tax: RentalinvoiceTemplate.tax || '',
      notes: RentalinvoiceTemplate.notes || '',
      terms_and_condition: RentalinvoiceTemplate.terms_and_condition || '',
      banking_id: Number(RentalinvoiceTemplate.banking_id || 0),
      template_theme: RentalinvoiceTemplate.template_theme || '',
    };

    const isSame = JSON.stringify(currentTemplate) === JSON.stringify(oldTemplate);

    if (isSame) {
      setEditFormErrMessage("No changes detected");
      setSignatureErrMsg("")
      return;
    }

    if (RentalinvoiceTemplate.is_signature_specific_template === 1) {
      const Signatureverify = !RentalinvoiceTemplate.digital_signature_url

      if (rentalSignatureFile && !isRentalSignatureConfirmed && Signatureverify) {
        setRentalSignatureError("Please click Done after selecting a signature");
        return
      }
    }

    if (RentalinvoiceTemplate.is_contact_specific_template === 1) {
      if (paymentmobilenum && paymentmobilenum.length < 10) {
        setPaymentMobileError(" Please Enter Valid Mobile Number");
        return
      }
      else if (paymentmobilenum.length === 10) {
        setPaymentMobileError("");
      }
    }

    if (RentalinvoiceTemplate.is_email_specific_template === 1) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(paymentinvoiceemail);
      if (!paymentinvoiceemail) {
        setPaymentInvoiceEmailError("");
      } else if (!isValidEmail) {
        setPaymentInvoiceEmailError("Please Enter  Valid Email Id");
      } else {
        setPaymentInvoiceEmailError("");
      }
    }


    if (RentalinvoiceTemplate.id && state.login.selectedHostel_Id) {
      dispatch({
        type: "ADD_BILLS_TEMPLATE",
        payload: {
          hostel_Id: Number(state.login.selectedHostel_Id),
          id: RentalinvoiceTemplate.id,
          digital_signature_url: signature,
          is_signature_specific_template: RentalinvoiceTemplate.is_signature_specific_template,
          contact_number: paymentmobilenum,
          is_contact_specific_template: RentalinvoiceTemplate.is_contact_specific_template,
          email: paymentinvoiceemail,
          is_email_specific_template: RentalinvoiceTemplate.is_email_specific_template,
          logo_url: hostel_logo,
          is_logo_specific_template: RentalinvoiceTemplate.is_logo_specific_template,
          qr_url: qrimagepreview,
          prefix,
          suffix,
          tax,
          notes,
          terms_and_condition: terms,
          banking_id: Number(selectedBankId),
          template_theme: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
      });
    }



  };

  const [BillsTemplateList, setBillsTemplateList] = useState([])


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(false)
      dispatch({ type: 'GET_TEMPLATE_LIST', payload: { hostel_Id: Number(state.login.selectedHostel_Id) } })
    }
  }, [])

  useEffect(() => {
    if (state.Settings?.settingsBillsAddTemplateSucesscode === 200) {

      dispatch({ type: 'GET_TEMPLATE_LIST', payload: { hostel_Id: Number(state.login.selectedHostel_Id) } })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BILLS_TEMPLATE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsBillsAddTemplateSucesscode]);

  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetsuccessCode === 200) {
      setBillsTemplateList(state.Settings.settingsBillsTemplateList)
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_TEMPLATELIST_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.SettingsBilltemplategetsuccessCode]);



  const RentalinvoiceTemplate = BillsTemplateList.find(
    (template) => template.template_type === "Rental Invoice"
  );

  console.log("RentalinvoiceTemplate", RentalinvoiceTemplate)

  useEffect(() => {
    if (RentalinvoiceTemplate) {
      setLogoPreview(RentalinvoiceTemplate.logo_url || null)
      setHostelLogo(RentalinvoiceTemplate.logo_url || null)
      setPaymentMobileNum(RentalinvoiceTemplate.contact_number)
      setPaymentinvoiceEmail(RentalinvoiceTemplate.email)
      setPrefix(RentalinvoiceTemplate.prefix || '')
      setSuffix(RentalinvoiceTemplate.suffix || '')
      setSignature(RentalinvoiceTemplate.digital_signature_url || null)
      setSignaturePreview(RentalinvoiceTemplate.digital_signature_url || null)
      setTerms(RentalinvoiceTemplate.terms_and_condition || '')
      setTax(RentalinvoiceTemplate.tax || '')
      setSelectedBankId(RentalinvoiceTemplate.banking_id || null)
      setQrImage(RentalinvoiceTemplate.qr_url || null)
      setQRImagePreview(RentalinvoiceTemplate.qr_url || null)
setNotes(RentalinvoiceTemplate.notes)
      const templateTheme = RentalinvoiceTemplate.template_theme;
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

  }, [RentalinvoiceTemplate])



  useEffect(() => {
    if (showFullView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showFullView]);




  const [fieldError, setFieldError] = useState("")

  const handleSaveTemplate = () => {
    const hasSignatureInDB = !getData[0]?.common_digital_signature_url;
    if (sign && !isSignatureConfirmed && hasSignatureInDB) {
      setSignatureErrMsg("Please click Done after selecting a signature");
      return
    }
    if (MobileError) {
      setMobileError("Please enter a valid mobile number.");
      return;
    }

    // Check email error
    if (emailError) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    const noChange =
      mobilenum === String(initialValues.mobilenum).trim() &&
      email === initialValues.email &&
      sign === initialValues.sign &&
      selectedFile === initialValues.selectedFile &&
      isCheckedLogo === initialValues.isCheckedLogo &&
      isCheckedmobile === initialValues.isCheckedmobile &&
      isCheckedEmail === initialValues.isCheckedEmail &&
      isCheckedSignature === initialValues.isCheckedSignature;

    if (noChange) {
      setNoChangesDetectedMsg("No changes detected.");
      return;
    } else {
      setNoChangesDetectedMsg("");
    }


    dispatch({
      type: "ADDGLOBALSETTING",
      payload: {
        contact_number: mobilenum,
        is_logo_specific_template: isCheckedLogo,
        is_contact_specific_template: isCheckedmobile,
        email: email,
        is_email_specific_template: isCheckedEmail,
        is_signature_specific_template: isCheckedSignature,
        hostel_Id: Number(state.login.selectedHostel_Id),
        logo_url: selectedFile,
        digital_signature_url: sign
      },
    });


  };

  const handleReset = (() => {
    setSelectedFile(null)
    setSign(null)
    setSignPreview(null)
    setPreviewURL(null)
    setMobileNum("")
    setEmail("")
    setIsCheckedMobile(false)
    setIsCheckedEmail(false)
    setIsCheckedLogo(false)
    setIsCheckedSignature(false)
    setEmailError("")
    setMobileError("")

  })

  const items = [
    { id: 1, name: "Room Rental", amount: 8000 },
    { id: 2, name: "Electricity", amount: 950 },
  ];


  // 1. Calculate subtotal
  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);

  // 2. Calculate tax amount
  const taxAmount = (subtotal * tax) / 100;

  // 3. Calculate total amount (including tax)
  const totalAmount = subtotal + taxAmount;

  console.log("Renmmmm", RentalinvoiceTemplate?.banking)

  return (
    <div className="mt-2" style={{ position: "relative", }}>


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

      {showform &&

        <>

          <div
            className=" py-2 col-md-12"
           
          >
           
     
       

          
         
 {/* <div
              style={{
                position: "sticky",
                top: 0,
                zIndex: 1000,
                backgroundColor: "#fff",
                padding: "10px 16px",
                              }}
            >
              <div style={{ display: 'flex', flexDirection: "row" }}>

                <img
                  src={leftarrow}
                  alt="leftarrow"
                  width={20}
                  height={20}
                  onClick={handleCloseForm}
                  style={{ cursor: "pointer", marginLeft: '10px', marginRight: '5px', marginTop: 2 }}
                />
                <p style={{ fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600, }}>Global Bill Settings</p>
              </div>




              <div
                className="d-flex flex-wrap gap-2 mb-3"
                style={{

                }}
              >
                {PdfOptions.map((option) => (
                  <button
                    key={option.value}
                    style={{
                      borderRadius: '50rem',
                      padding: '0.5rem 1.5rem',
                      fontFamily: 'Gilroy',
                      fontSize: 14,
                      fontWeight: 600,
                      verticalAlign: 'middle',
                      letterSpacing: '0%',
                      lineHeight: '100%',
                      backgroundColor: selectedTab === option.value ? 'rgba(30, 69, 225, 1)' : 'transparent',
                      color: selectedTab === option.value ? '#fff' : '#6c757d',
                      border: '1px solid',
                      borderColor: selectedTab === option.value ? '#0d6efd' : '#6c757d',
                    }}
                    onClick={() => {
                      setSelectedTab(option.value);
                      setEditFormErrMessage("");
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

            </div> */}


 <div
            className="bg-white"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              paddingBottom: "10px",
              backgroundColor: "white",
              height: 75
            }}
          >
            <h4
              className="mb-2"
              style={{
                fontFamily: "Gilroy",
                fontSize: 22,
                color: "rgba(34, 34, 34, 1)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Customize Bill Templates
            </h4>
             <div style={{ display: 'flex', flexDirection: "row" }}>

                <img
                  src={leftarrow}
                  alt="leftarrow"
                  width={20}
                  height={20}
                  onClick={handleCloseForm}
                  style={{ cursor: "pointer",  marginRight: '5px', marginTop: 2 }}
                />
                <p style={{ fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600, }}>Global Bill Settings</p>
              </div>
                <div
                className="d-flex flex-wrap gap-2 mb-3"
                style={{

                }}
              >
                {PdfOptions.map((option) => (
                  <button
                    key={option.value}
                    style={{
                      borderRadius: '50rem',
                      padding: '0.5rem 1.5rem',
                      fontFamily: 'Gilroy',
                      fontSize: 14,
                      fontWeight: 600,
                      verticalAlign: 'middle',
                      letterSpacing: '0%',
                      lineHeight: '100%',
                      backgroundColor: selectedTab === option.value ? 'rgba(30, 69, 225, 1)' : 'transparent',
                      color: selectedTab === option.value ? '#fff' : '#6c757d',
                      border: '1px solid',
                      borderColor: selectedTab === option.value ? '#0d6efd' : '#6c757d',
                    }}
                    onClick={() => {
                      setSelectedTab(option.value);
                      setEditFormErrMessage("");
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
          </div>






          <div className="col-lg-11" style={{maxHeight: "calc(90vh - 130px)",
              overflowY: "auto",marginTop:50,
              }}>
           

            {selectedTab === "rental_invoice" && <>
              <div className="col-12 d-flex flex-row">
                <div className="col-lg-5 show-scrolls" style={{
                  maxHeight: 450,
                  overflowY: "auto",
                  overflowX: 'hidden',
                }}>
                  {(
                    RentalinvoiceTemplate?.is_signature_specific_template === 1 ||
                    RentalinvoiceTemplate?.is_contact_specific_template === 1 ||
                    RentalinvoiceTemplate?.is_email_specific_template === 1 ||
                    RentalinvoiceTemplate?.is_logo_specific_template === 1
                  ) &&

                    (
                      <>
                        <p style={{ fontFamily: 'Gilroy', fontSize: 17, fontWeight: 600, }}>Inherited Global Details</p>

                        <div className="border ps-3 pe-3 pb-3 pt-2 mb-3 col-lg-10 " style={{ borderRadius: '10px', overflowY: 'auto', }}>
                          <div className="d-flex justify-content-end">
                            <img src={EditICon} onClick={handleShowContactNumberForm} style={{ cursor: 'pointer' }} alt="editicon" />

                          </div>
                          {RentalinvoiceTemplate?.is_logo_specific_template === 1 &&
                            <div>
                              <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginBottom: '6px'
                              }}>
                                <label style={{ fontWeight: 600 }}>Hostel/PG Logo</label>
                              </div>
                              <div className="p-3 border rounded" style={{ backgroundColor: '#F0F3FF', textAlign: 'center' }}>

                                {logoPreview ? (
                                  <img src={logoPreview} alt="Preview" style={{ height: 60, borderRadius: '6px', marginBottom: '10px' }} />
                                ) : (
                                  <img src={uploadsett} alt="upload" style={{ height: 30, marginBottom: '10px' }} />
                                )}

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

                          {RentalinvoiceTemplate?.is_contact_specific_template === 1 &&
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
                                        value={paymentmobilenum}
                                        onChange={handlePaymentInvoiceMobile}
                                        maxLength={10}
                                        disabled={!allowEditFields.contact}
                                      />

                                    </div>
                                    {paymentMobileError && (
                                      <div style={{ color: "red", }}>
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
                                          {paymentMobileError}
                                        </span>
                                      </div>
                                    )}
                                  </div>



                                </div>


                              </div>
                            </div>}


                          {RentalinvoiceTemplate?.is_email_specific_template === 1 &&
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
                                        value={paymentinvoiceemail}
                                        onChange={handlePaymentinvoiceEmail}
                                      />

                                    </div>
                                    {paymentinvoiceemailError && (
                                      <div style={{ color: "red", }}>
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
                                          {paymentinvoiceemailError}
                                        </span>
                                      </div>
                                    )}
                                  </div>



                                </div>


                              </div>

                            </div>
                          }
                          {RentalinvoiceTemplate?.is_signature_specific_template === 1 &&
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
                                        className="rounded mt-2 d-flex justify-content-center align-items-center"
                                        style={{
                                          height: '120px', borderStyle: 'dotted', borderWidth: '3px',
                                          borderColor: '#ced4da'
                                        }}
                                      >
                                        {rentalSignaturePreview ? (
                                          <img src={rentalSignaturePreview} alt="signature" style={{ maxHeight: '100%', maxWidth: '100%' }} />
                                        ) : (
                                          <span className="text-muted" style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                                          >No signature uploaded</span>
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
                                              onChange={handleRentalSignatureChange}
                                              disabled={!allowEditFields.digitalSignature}
                                            />
                                          </label>
                                          <span className="ms-1" style={{ color: 'rgba(22, 21, 28, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400 }}>to Upload Image</span>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                          <button
                                            className="btn btn-link text-decoration-none "
                                            onClick={handleRentalSignatureClear}
                                            disabled={!rentalSignaturePreview}
                                            style={{ color: 'rgba(75, 75, 75, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400 }}
                                          >
                                            Clear
                                          </button>
                                          <button
                                            className="btn btn-link text-decoration-none "
                                            disabled={!rentalSignaturePreview}
                                            onClick={handleRentalSignatureDone}
                                            style={{ color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 12, fontWeight: 600 }}
                                          >
                                            Done
                                          </button>
                                        </div>


                                      </div>
                                      {rentalSignatureError.trim() !== "" && (
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
                                            {rentalSignatureError}
                                          </label>
                                        </div>
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


                  <div>
                    <p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal', color: 'rgba(34, 34, 34, 1)' }}>Form Specific Details</p>
                    <p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal', color: 'rgba(34, 34, 34, 1)' }}>
                      {`Fill the form with details you'd like to customize.`}</p>
                  </div>


                  <div className="border p-3 mb-3 col-lg-10" style={{ borderRadius: '10px', overflowY: 'auto', }}>

                    <div>
                      <p
                        // onClick={handleEditClose} 
                        style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                        Invoice No</p>
                      <hr></hr>
                    </div>

                    <div className='d-flex row '>
                      <div className='col-lg-6 col-md-6 col-sm-11 col-xs-11'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label
                            style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal', color: 'rgba(34, 34, 34, 1)' }}
                          >
                            Prefix
                          </Form.Label>
                          <Form.Control
                            style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                            type="text"
                            placeholder="prefix"
                            value={prefix}
                            onChange={hanldePrefix}
                          />
                          {prefix_errmsg.trim() !== "" && (
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
                                {prefix_errmsg}
                              </label>
                            </div>
                          )}

                        </Form.Group>
                      </div>

                      <div className='col-lg-6 col-md-6 col-sm-11 col-xs-11'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                          >
                            Suffix
                          </Form.Label>
                          <Form.Control
                            style={{ padding: '10px', marginTop: '10px', fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                            type="text"
                            placeholder="suffix"
                            value={suffix}
                            onChange={hanldeSuffix}
                          />

                          {suffix_errmsg.trim() !== "" && (
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
                                {suffix_errmsg}
                              </label>
                            </div>
                          )}
                        </Form.Group>
                      </div>
                    </div>

                    <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                        >
                          Preview
                        </Form.Label>
                        <Form.Control
                          style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                          type="text"
                          placeholder="preview"
                          value={`${prefix}-${suffix}`}
                          readOnly

                        />


                      </Form.Group>
                    </div>
                  </div>

                  <div className="border p-3 mb-3 col-lg-10 " style={{ borderRadius: '10px', overflowY: 'auto', }}>

                    <div>
                      <p style={{ fontFamily: 'Gilroy', color: 'rgba(34, 34, 34, 1)', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal' }}>
                        PG Tax Payable</p>
                      <hr></hr>
                    </div>

                    <div className='d-flex row '>
                      <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                          <Form.Label
                            style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                          >
                            Add the Tax payable GST in Percentage %
                          </Form.Label>
                          <Form.Control
                            style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                            type="text"
                            placeholder="12%"
                            value={tax}
                            onChange={handleTaxChange}
                          />

                          {tax_errmsg.trim() !== "" && (
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
                                {tax_errmsg}
                              </label>
                            </div>
                          )}
                        </Form.Group>
                      </div>


                    </div>



                  </div>

                  <div
                    style={{
                      border: '1px solid #ddd',
                      padding: '16px',
                      marginBottom: '24px',
                      borderRadius: '10px',
                      fontFamily: 'Gilroy',
                    }}
                    className="col-lg-10"
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: 18,
                          color: 'rgba(34, 34, 34, 1)',
                          fontWeight: 400,
                          whiteSpace: 'nowrap',
                          margin: 0,
                        }}
                      >
                        Account Details
                      </p>
                      {banking && banking.length > 0 && (
                        <button
                          onClick={handleAddBankAccount}
                          style={{
                            fontSize: 14,
                            backgroundColor: '#1E45E1',
                            color: 'white',
                            fontWeight: 400,
                            borderRadius: 12,
                            width: 106,
                            height: 35,
                            border: '1px solid #1E45E1',
                            fontFamily: 'Gilroy',
                          }}
                        >
                          Add
                        </button>
                      )}
                    </div>

                    <hr />

                    <div style={{ maxHeight: 160, overflowY: 'auto' }} className="show-scrolls">
                      {banking && banking.length > 0 ? (
                        banking.map((bank) => (
                          <div key={bank.id} style={{ marginBottom: 15, cursor: 'pointer' }} onClick={() => handleBankClick(bank.id)}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <input
                                type="radio"
                                name="bank"
                                checked={selectedBankId === bank.id}
                                onChange={() => handleBankClick(bank.id)}
                                style={{ accentColor: '#1E45E1', marginRight: 10, height: 16, width: 16 }}
                              />
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <div
                                  style={{
                                    backgroundColor: '#1E45E1',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: 30,
                                    height: 30,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  <img src={BankICon} alt="bankicon" height={17} width={17} className="mb-1" />
                                </div>
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 14 }}>{bank.bank_name || 'Bank Name'}</div>
                                  <div style={{ fontSize: 13, color: 'grey' }}>
                                    {bank.benificiary_name || 'Beneficiary'} / Savings A/C
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                          <p style={{ fontSize: 14, fontWeight: 400, color: 'grey' }}>No Bank accounts are there!</p>
                          <button
                            onClick={handleAddBankAccount}
                            style={{
                              fontSize: 14,
                              backgroundColor: '#1E45E1',
                              color: 'white',
                              fontWeight: 400,
                              borderRadius: 12,
                              width: 106,
                              height: 35,
                              border: '1px solid #1E45E1',
                              fontFamily: 'Gilroy',
                            }}
                          >
                            Add
                          </button>
                        </div>
                      )}
                    </div>

                    {!selectedBankId && bankid_Error.trim() !== '' && (
                      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 8 }}>
                        <MdError style={{ color: 'red', marginRight: 5, fontSize: 14 }} />
                        <label
                          style={{
                            color: 'red',
                            fontSize: 12,
                            fontWeight: 500,
                          }}
                        >
                          {bankid_Error}
                        </label>
                      </div>
                    )}
                  </div>


                  <div className="border p-3 mb-3 col-lg-10 " style={{ borderRadius: '10px', overflowY: 'auto', }}>

                    <div>
                      <p style={{ fontFamily: 'Gilroy', color: 'rgba(34, 34, 34, 1)', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal' }}>
                        Upload QR</p>
                      <hr></hr>
                    </div>

                    <p style={{ fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400, color: 'rgba(75, 75, 75, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
                      Valid UPI QR Code for Payment Easy</p>
                    <div className="col-12">
                      <div className="d-flex align-items-center justify-content-center p-3 border rounded" style={{ backgroundColor: '#f9f9f9' }}>
                        {qrImage ? (
                          <img
                            src={qrImage}
                            alt="QR Preview"
                            style={{
                              height: "150px",
                              width: "150px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              marginBottom: "10px",
                              border: "1px solid #ddd",
                              backgroundColor: "#fff",
                            }}
                          />
                        ) : (
                          <img
                            src={uploadsett}
                            alt="upload"
                            style={{
                              height: 30,
                              marginBottom: "10px",
                            }}
                          />
                        )}
                        <div className="d-flex flex-column ms-3">
                          <div>
                            <label style={{ cursor: 'pointer', color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>
                              Choose file
                              <input
                                type="file"
                                accept="image/*"
                                className="d-none"
                                ref={qrFileInputRef}
                                onChange={handleQrImageChange}
                              />
                            </label>
                            <span className="ms-1" style={{ color: 'rgba(22, 21, 28, 1)', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>to Upload </span>
                          </div>
                          <small className=""
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: 12,
                              color: "rgba(75, 75, 75, 1)",
                              fontWeight: 400,
                              whiteSpace: "nowrap"
                            }}
                          >JPG SVG PNG(150px × 150px)</small>
                        </div>
                      </div>
                    </div>
                  </div>


                  <div className="p-3 mb-3 border col-lg-10" style={{ borderRadius: '10px' }}>
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

                  <div className="p-3 mb-3 border col-lg-10" style={{ borderRadius: '10px' }}>
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


                  <div className="col-lg-10" style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 16, fontFamily: "sans-serif" }}>
                    <h6 style={{ marginBottom: 12 }}>Template Theme</h6>

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


                  {editformErrmsg.trim() !== "" && (
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
                          fontSize: 12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {editformErrmsg}
                      </label>
                    </div>
                  )}

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
                      onClick={handleSaveRentalTemplate}
                    >
                      Save Template
                    </Button>
                  </div>


                </div>
                <div className="col-lg-7 d-flex justify-content-center" style={{ backgroundColor: 'rgba(244, 246, 255, 1)' }}>
                  <div className="d-flex justify-content-center">
                    <div className="receipt-container border ps-4 pe-4 pb-4 pt-1 col-10" ref={cardRef} style={{ borderRadius: '8px', backgroundColor: 'white' }} >

                      <div className="d-flex justify-content-end ">
                        <button
                          className="btn btn-sm border bg-white"
                          onClick={() => setShowFullView(true)}
                          style={{ height: 25, fontSize: 8, color: 'rgba(23, 23, 23, 1)' }}
                        >
                          <img src={ZoomImage} alt="zoom" /> Full View
                        </button>
                      </div>


                      <div ref={innerScrollRef}
                        className=" show-scrolls col-lg-12  justify-content-center"
                        style={{
                          maxHeight: 450,
                          overflowY: "auto",
                          overflowX: 'hidden',
                          borderBottomLeftRadius: "13px",
                          borderBottomRightRadius: "13px",
                        }}>

                        <div className=" text-white  p-2 position-relative"
                          style={{
                            height: 60,
                            background: useGradient
                              ? defaultGradient
                              : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                          }}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex gap-2 mb-2 mb-lg-0">

                              <img
                                src={
                                  hostel_logo
                                    ? hostel_logo
                                    : Logo
                                }
                                alt="logo"
                                style={{ height: 30, width: 30 }}
                              />
                              <div>
                                <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>{RentalinvoiceTemplate?.Name}</div>
                                <div style={{ fontSize: 10, fontWeight: 300, fontFamily: "Gilroy", marginTop: '15px', marginLeft: '-15px' }}>Meet All Your Needs</div>
                              </div>
                            </div>

                            <div>


                              <div style={{ fontSize: 8, fontWeight: 600, fontFamily: "Gilroy" }}>
                                {[

                                  RentalinvoiceTemplate?.Address,


                                  [
                                    RentalinvoiceTemplate?.area,
                                 
                                   
                                  ]
                                    .filter(Boolean)
                                    .join(", "),


                                  [
                                       RentalinvoiceTemplate?.landmark,
                                     RentalinvoiceTemplate?.city,
                                    RentalinvoiceTemplate?.state,


                                     RentalinvoiceTemplate?.pin_code,

                                  ]
                                    .filter(Boolean)
                                    .join(", "),
                                ]

                                  .filter(line => line && line.trim() !== "")

                                  .map((line, idx) => (
                                    <React.Fragment key={idx}>
                                      {line}
                                      <br />
                                    </React.Fragment>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>


                        <div className="container border shadow-md bg-white rounded-bottom  position-relative" style={{ width: "100%", }}>
                          <div className="text-center pt-1 pb-1">
                            <h5 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>
                              Payment Invoice
                            </h5>
                          </div>


                          <div className="row px-4 mt-1">
                            <div className="col-md-6 mb-1">
                              <p className="mb-1" style={{ color: 'rgba(48, 80, 210, 1)', fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill to:</p>
                              <p className="mb-1 me-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)', }}>Mr. <span className="ms-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', }}> Muthuraja M</span></p>
                              <p className="mb-1"><img src={Dial} alt="mob" />
                                <span className="ms-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1)', }}>
                                  +91 9876543210
                                </span>


                              </p>
                              <p className="mb-1 me-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)', }}><img className="me-1" src={Room} alt="room" style={{ height: 20, width: 20 }} /> No 103 -02</p>
                              <div className="d-flex" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)' }}>

                                <div className="me-2">
                                  <img src={Locat} alt="local" />
                                </div>

                                <div>
                                  <p style={{ fontSize: '9px', fontFamily: 'Gilroy', }}>
                                    9, 8th Main Rd, Someshwara Nagar, <br></br>
                                    Bengaluru, Karnataka 560011

                                  </p>

                                </div>

                              </div>


                            </div>
                            <div className="col-md-6 mb-1 ps-5 ">
                              <div className="row">

                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                                <div className="col-6 text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>#{`${prefix}-${suffix}`}</div>

                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>31 March 2024</div>

                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                                <div className="col-6 text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>31 March 2024</div>

                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                                <div className="col-6 text-muted  text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>05 Jan 2024</div>

                                <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Rent Period :</div>
                                <div className="col-6  text-muted text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))', }}>Mar - June 2024</div>


                              </div>
                            </div>
                          </div>


                          <div className="px-2 ">
                            <div className="table-responsive">
                              <table className="table text-center">
                                <thead
                                  style={{
                                    background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                                    color: "white",
                                  }}
                                >
                                  <tr style={{ padding: 5 }}>
                                    <th
                                      style={{
                                        borderTopLeftRadius: "12px",
                                        borderBottomLeftRadius: "12px",
                                        color: "rgba(255, 255, 255, 1)",
                                        fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600

                                      }}
                                    >
                                      S.NO
                                    </th>
                                    <th style={{ color: "rgba(255, 255, 255, 1)", fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600 }}>Inv No</th>
                                    <th style={{ color: "rgba(255, 255, 255, 1)", fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600 }}>Description</th>
                                    <th
                                      style={{
                                        borderTopRightRadius: "12px",
                                        borderBottomRightRadius: "12px",
                                        color: "rgba(255, 255, 255, 1)",
                                        fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600
                                      }}
                                    >
                                      Amount / INR
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>

                                  <tr style={{ borderBottom: "1px solid #dee2e6", color: 'rgba(188, 188, 188, 1))' }}>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>1</td>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>#324515</td>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Room Rental</td>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Rs. 8000</td>
                                  </tr>
                                  <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>2</td>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>#324515</td>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Electricity</td>
                                    <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Rs. 950</td>
                                  </tr>

                                </tbody>

                              </table>
                            </div>

                            <div className="d-flex flex-wrap align-items-start ">

                              <div className="text-start mt-5" style={{ flex: '1 1 0%' }}>
                                {/* <p className="mb-0" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                                  &quot;Your comfort is our priority –
                                </p> */}
                                <p className="mb-0" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                                  {/* See you again at Smart Stay! &quot; */}{notes}
                                </p>
                              </div>


                              <div className=" ms-auto" style={{ minWidth: '200px' }}>
                                <div className="d-flex justify-content-between py-1">
                                  <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax</span>
                                  <span className="me-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs:{taxAmount}</span>
                                </div>
                                <div className="d-flex justify-content-between py-1">
                                  <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
                                  <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 8950.00 </span>
                                </div>
                                <div className="d-flex justify-content-between fw-bold py-2">
                                  <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
                                  <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs:{totalAmount}</span>
                                </div>
                              </div>
                            </div>

                          </div>




                        </div>
                        <div className="px-4" style={{ marginTop: 10 }}>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <h6 style={{
                                fontSize: '10px',
                                fontFamily: 'Gilroy',
                                fontWeight: 700,
                                color: 'rgba(30, 69, 225, 1)',
                                letterSpacing: '1px'

                              }}
                              >ACCOUNT DETAILS</h6>
                              <p className="mb-1"
                                style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                Account No :{RentalinvoiceTemplate?.banking?.acc_num || "N/A"}</p>
                              <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                IFSC Code :  {RentalinvoiceTemplate?.banking?.ifsc_code || "N/A"}</p>
                              <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                Bank Name: {RentalinvoiceTemplate?.banking?.bank_name || "N/A"}</p>
                              <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                UPI Details : {RentalinvoiceTemplate?.banking?.upi_id || "N/A"}</p>
                            </div>

                            <div className="col-md-2"></div>

                            <div className="col-md-4 d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                              <div className="d-flex justify-content-end mt-auto">
                                {/* <img src={Barcode} alt="Barcode" style={{ height: 89, width: 89, borderRadius:'2px' }} /> */}.
                                <img
                                  src={qrImage ? qrImage : Barcode}
                                  alt="QR Code"
                                  style={{ height: 89, width: 89, borderRadius: '2px' }}
                                />
                              </div>
                              <div className="d-flex flex-row justify-content-end">
                                <img src={Paytm} alt="Paytm" style={{ height: 38, width: 38 }} className="m-2" />
                                <img src={Phonepe} alt="PhonePe" style={{ height: 38, width: 38 }} className="m-2" />
                                <img src={Gpay} alt="GPay" style={{ height: 38, width: 38 }} className="m-2" />
                              </div>

                            </div>
                          </div>
                        </div>


                        <div className="row justify-content-between mt-2 mb-4 px-4">
                          <div className="col-md-8">
                            <h4 style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(30, 69, 225, 1)' }}>Terms and Conditions</h4>
                            <p style={{ whiteSpace: "pre-line", fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(61, 61, 61, 1)' }}>
                             {terms}
                            </p>
                          </div>

                          <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
                            {RentalinvoiceTemplate?.digital_signature_url && (
                              <img
                                src={RentalinvoiceTemplate.digital_signature_url}
                                alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft: 30 }}

                              />
                            )}
                            <p
                              style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(44, 44, 44, 1)', }}
                            >Authorized Signature</p>
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
                              Email :{paymentinvoiceemail}
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
                              Contact : +91 {paymentmobilenum}
                            </p>
                          </div>
                        </div>


                      </div>

                    </div>
                  </div>
                </div>
              </div>

              {showFullView && (
                <>
                  <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{
                      backgroundColor: 'rgba(90, 90, 90, 0.22)',
                      zIndex: 9999,
                      overflowY: 'auto',
                      marginLeft: '10%',

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
                          position: 'relative',
                          borderTopLeftRadius: '16px',
                          borderTopRightRadius: '16px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 25 }}>
                          <span style={{ fontSize: '8px' }}>1 / 1</span>
                          <div style={{ borderLeft: '1px solid #555', height: '20px' }}></div>

                          <div className="d-flex align-items-center" style={{ gap: '3px' }}>
                            <button className="btn btn-sm text-white px-0 py-0 mb-1 me-1">−</button>
                            <span style={{ fontWeight: 'bold', fontSize: '8px' }}>100%</span>
                            <button className="btn btn-sm text-white px-0 py-0 mb-1 ms-1" >+</button>
                          </div>

                          <div style={{ borderLeft: '1px solid #555', height: '20px' }}></div>

                          <button className="btn btn-sm  px-1 py-0 me-0"><img src={Topbottom} alt="topbottom" /></button>
                          <button className="btn btn-sm px-1 py-0"><img src={left85arrow} alt="left85arrow" /></button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button className="btn btn-sm  px-2 py-0"><img src={downloadicon} alt="topbottom" style={{ width: '12px', height: '12px' }} /></button>
                          <button className="btn btn-sm  px-2 py-0"><img src={printdown} alt="topbottom" style={{ width: '12px', height: '12px' }} /></button>
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
                        <div className="receipt-container border ps-4 pe-4 pb-2 pt-2 mt-3 col-lg-8  " ref={cardRef} style={{ borderRadius: '8px' }} >


                          <div ref={innerScrollRef}
                            className="  show-scrolls col-lg-12 justify-content-center"
                            style={{
                              maxHeight: 480,
                              overflowY: "auto",
                              overflowX: 'hidden',
                          
                            }}>

                            <div className=" text-white  p-4 position-relative" style={{
                              height: 100,
                              background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                            }}>
                              <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex gap-2 mb-3 mb-lg-0">
                                  <img
                                    src={
                                      hostel_logo
                                        ? hostel_logo
                                        : Logo
                                    }
                                    alt="logo"
                                    style={{ height: 30, width: 30 }}
                                  />
                                  <div>
                                    <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{RentalinvoiceTemplate.Name}</div>
                                    <div style={{ fontSize: 12, fontWeight: 300, fontFamily: "Gilroy", marginTop: '15px', marginLeft: '-15px' }}>Meet All Your Needs</div>
                                  </div>
                                </div>

                                <div>

                                  {/* <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>
             <>

            {RentalinvoiceTemplate.Address}<br/>{RentalinvoiceTemplate.area},{RentalinvoiceTemplate.area},{RentalinvoiceTemplate.landmark} ,{RentalinvoiceTemplate.city}<br/>{RentalinvoiceTemplate.state},{RentalinvoiceTemplate.pincode}
      
       </>
       
             </div> */}
                                  <div style={{ fontSize: 10, fontWeight: 600, fontFamily: "Gilroy" }}>
                                    {[
                                      // Line 1: full address (if present)
                                      RentalinvoiceTemplate?.Address,

                                      // Line 2: area, landmark, city  (only the ones that exist)
                                      [
                                        RentalinvoiceTemplate?.area,
                                        RentalinvoiceTemplate?.landmark,
                                        RentalinvoiceTemplate?.city,
                                      ]
                                        .filter(Boolean)
                                        .join(", "),

                                      // Line 3: state, pincode
                                      [
                                        RentalinvoiceTemplate?.state,

                                        RentalinvoiceTemplate?.pin_code,
                                       

                                      ]
                                        .filter(Boolean)
                                        .join(", "),
                                    ]
                                      // remove any empty lines
                                      .filter(line => line && line.trim() !== "")
                                      // render each remaining line with a <br/>
                                      .map((line, idx) => (
                                        <React.Fragment key={idx}>
                                          {line}
                                          <br />
                                        </React.Fragment>
                                      ))}
                                  </div>

                                </div>
                              </div>
                            </div>


                            <div className="container bg-white border shadow-md rounded-bottom  position-relative" style={{ width: "100%",}}>
                              <div className="text-center pt-2 pb-1">
                                <h5 style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>
                                  Payment Invoice
                                </h5>
                              </div>


                              <div className="row px-4 mt-3">
                                <div className="col-md-6 mb-3">
                                  <p className="  mb-1" style={{ color: 'rgba(48, 80, 210, 1)', fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill to:</p>
                                  <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)', }}>Mr. <span className="ms-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', }}> Muthuraja M</span></p>
                                  <p className="mb-1"><img src={Dial} alt="mob" />
                                    <span className="ms-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1)', }}>
                                      +91 9876543210
                                    </span>
                                  </p>
                                  <p className="mb-1 me-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)', }}><img className="me-1" src={Room} alt="room" style={{ height: 20, width: 20 }} /> No 103 -02</p>
                                  <div className="d-flex" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)' }}>

                                    <div className="me-2">
                                      <img src={Locat} alt="local" />
                                    </div>

                                    <div>
                                      <p style={{ fontSize: '11px', fontFamily: 'Gilroy', }}>
                                        9, 8th Main Rd, Someshwara Nagar, <br></br>
                                        Bengaluru, Karnataka 560011
                                      </p>

                                    </div>

                                  </div>


                                </div>
                                <div className="col-md-6 mb-3 ps-5 ">
                                  <div className="row">

                                    <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                                    <div className="col-6 text-start mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>#{`${prefix}-${suffix}`}</div>

                                    <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                                    <div className="col-6  text-start mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>31 March 2024</div>

                                    <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                                    <div className="col-6 text-start mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>31 March 2024</div>

                                    <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                                    <div className="col-6 text-muted  text-start mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>05 Jan 2024</div>

                                    <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Rent Period :</div>
                                    <div className="col-6  text-muted text-start mt-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))', }}>Mar - June 2024</div>


                                  </div>
                                </div>
                              </div>


                              <div className="px-4 pb-3">
                                <div className="table-responsive">
                                  <table className="table text-center">
                                    <thead
                                      style={{
                                        background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                                        color: "white",
                                      }}
                                    >
                                      <tr>
                                        <th
                                          style={{
                                            borderTopLeftRadius: "12px",
                                            borderBottomLeftRadius: "12px",
                                            color: "rgba(255, 255, 255, 1)",
                                            fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600

                                          }}
                                        >
                                          S.NO
                                        </th>
                                        <th style={{ color: "rgba(255, 255, 255, 1)", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600 }}>Inv No</th>
                                        <th style={{ color: "rgba(255, 255, 255, 1)", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600 }}>Description</th>
                                        <th
                                          style={{
                                            borderTopRightRadius: "12px",
                                            borderBottomRightRadius: "12px",
                                            color: "rgba(255, 255, 255, 1)",
                                            fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600
                                          }}
                                        >
                                          Amount / INR
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>

                                      <tr style={{ borderBottom: "1px solid #dee2e6", color: 'rgba(188, 188, 188, 1))' }}>
                                        <td style={{ color: 'rgba(188, 188, 188, 1))' }}>1</td>
                                        <td style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>#324515</td>
                                        <td style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Room Rental</td>
                                        <td style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Rs. 8000</td>
                                      </tr>
                                      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                                        <td>2</td>
                                        <td style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>#324515</td>
                                        <td style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Electricity</td>
                                        <td style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1))' }}>Rs. 950</td>
                                      </tr>

                                    </tbody>

                                  </table>
                                </div>

                                <div className="d-flex flex-wrap align-items-start mt-1">
                                 
                                    <div className="text-start mt-5" style={{ flex: '1 1 0%' }}>
                                     {/* <p className="mb-0" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                                        &quot;Your comfort is our priority –
                                      </p> */}
                                      <p className="mb-0" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                                        {/* See you again at Smart Stay! &quot; */} {notes}
                                      </p> 
                                     
                                    </div>
                                

                                  <div className="mt-3 ms-auto" style={{ minWidth: '200px' }}>
                                    <div className="d-flex justify-content-between py-1">
                                      <span style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax</span>
                                      <span className="me-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: {taxAmount}</span>
                                    </div>
                                    <div className="d-flex justify-content-between py-1">
                                      <span style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
                                      <span style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 8950.00 </span>
                                    </div>
                                    <div className="d-flex justify-content-between fw-bold py-2">
                                      <span style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
                                      <span style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs:{totalAmount}</span>
                                    </div>
                                  </div>
                                </div>

                              </div>




                            </div>
                            <div className="px-4" style={{ marginTop: 20 }}>
                              <div className="row">
                                <div className="col-md-6 mb-3">
                                  <h6 style={{
                                    fontSize: '11px',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 700,
                                    color: 'rgba(30, 69, 225, 1)',
                                    letterSpacing: '1px'

                                  }}
                                  >ACCOUNT DETAILS</h6>
                                  <p className="mb-1"
                                    style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                    Account No : {RentalinvoiceTemplate?.banking?.acc_num || "N/A"}</p>
                                  <p className="mb-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                    IFSC Code : {RentalinvoiceTemplate?.banking?.ifsc_code || "N/A"}</p>
                                  <p className="mb-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                    Bank Name: {RentalinvoiceTemplate?.banking?.bank_name || "N/A"}</p>
                                  <p style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                                    UPI Details : {RentalinvoiceTemplate?.banking?.upi_id || "N/A"}</p>
                                </div>

                                <div className="col-md-2"></div>

                                <div className="col-md-4 d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                                  <div className="d-flex justify-content-end mt-auto">
                                    <img
                                      src={qrImage ? qrImage : Barcode}
                                      alt="QR Code"
                                      style={{ height: 89, width: 89, borderRadius: '2px' }}
                                    />
                                  </div>
                                  <div className="d-flex flex-row justify-content-end">
                                    <img src={Paytm} alt="Paytm" style={{ height: 38, width: 38 }} className="m-2" />
                                    <img src={Phonepe} alt="PhonePe" style={{ height: 38, width: 38 }} className="m-2" />
                                    <img src={Gpay} alt="GPay" style={{ height: 38, width: 38 }} className="m-2" />
                                  </div>

                                </div>
                              </div>
                            </div>


                            <div className="row justify-content-between mt-4 mb-4 px-4">
                              <div className="col-md-8">
                                <h4 style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(30, 69, 225, 1)' }}>Terms and Conditions</h4>
                                <p style={{ whiteSpace: "pre-line", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(61, 61, 61, 1)' }}>
                                
                                  {terms}
                                </p>
                              </div>

                              <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
                                {RentalinvoiceTemplate?.digital_signature_url && (
                                  <img
                                    src={RentalinvoiceTemplate.digital_signature_url}
                                    alt="Digital Signature" style={{ height: 60, width: 120, }}

                                  />
                                )}
                                <p
                                  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(44, 44, 44, 1)', }}
                                >Authorized Signature</p>
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
                                    fontSize: '13px',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 600,
                                    color: 'rgba(255, 255, 255, 1)',

                                  }}
                                >
                                  Email : {paymentinvoiceemail}
                                </p>
                                <p
                                  className="mb-0"
                                  style={{
                                    fontSize: '13px',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 600,
                                    color: 'rgba(255, 255, 255, 1)',
                                  }}
                                >
                                  Contact : +91 {paymentmobilenum}
                                </p>
                              </div>
                            </div>


                          </div>

                        </div>
                      </div>
                    </div>

                  </div>

                </>

              )}

            </>}
            {selectedTab === "security_deposit_invoice" &&
              <><SecurityDepositInvoiceTemplate hostelid={hostelid} /> </>}

            {selectedTab === "rental_receipt" &&
              <> <RentalReceiptPdfTemplate hostelid={hostelid} /> </>
            }

            {selectedTab === "security_deposit_receipt" &&
              <>
                <SecurityReceiptPdfTemplate hostelid={hostelid} />
              </>
            }
            {selectedTab === "noc_receipt" &&
              <> <NOCReceiptPdfTemplate hostelid={hostelid} /> </>
            }









          </div>
 </div>

        </>
      }



      {
        cardshow &&
        <div className=" py-2 col-md-11">

          <div
            className="bg-white"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              paddingBottom: "10px",
              backgroundColor: "white",
              height: 75
            }}
          >
            <h4
              className="mb-2"
              style={{
                fontFamily: "Gilroy",
                fontSize: 22,
                color: "rgba(34, 34, 34, 1)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Bill Template Manager
            </h4>
            <h5
              style={{
                fontFamily: "Gilroy",
                fontSize: 17,
                color: "rgba(34, 34, 34, 1)",
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Global Bill Settings
            </h5>
          </div>



          <div
            style={{
              maxHeight: "calc(100vh - 130px)",
              overflowY: "auto",
              paddingRight: "10px",
              paddingTop: "10px",
            }}
          >
            <div className="col-lg-8">
              <p className="mb-5" style={{
                fontFamily: "Gilroy",
                fontSize: 14,
                color: "rgba(97, 97, 97, 1)",
                fontWeight: 400,
                lineHeight: "20px",
                letterSpacing: '0%',
                marginTop: "-10px"
              }}>
                Add your basic billing details here. These will appear on all invoices unless you choose to customize them in individual templates.
              </p>
            </div>
            {fieldError && (
              <div style={{ color: "red", }}>
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
                  {fieldError}
                </span>
              </div>
            )}
            <div className="mb-5" style={{ marginTop: "-25px" }}>
              <div className="row mb-5 align-items-center">
                <div className="col-md-4">
                  <label className="form-label"
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 17,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                    }}
                  >Hostel/PG Logo</label>
                  <div className=" small"
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      color: "rgba(75, 75, 75, 1)",
                      fontWeight: 400,
                      whiteSpace: "nowrap"
                    }}
                  >This will appear in Bill Template</div>
                  <div className="form-check mt-2">
                    <input className="form-check-input" type="checkbox" id="customizeLogo" style={{ cursor: "pointer" }} checked={isCheckedLogo} onChange={handleLogoCheckboxChange} />
                    <label className="form-check-label small" htmlFor="customizeLogo"
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        color: "rgba(30, 69, 225, 1)",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                        marginTop: "-30px"

                      }}
                    >Customize in Specific Templates</label>
                  </div>
                </div>

                <div className="col-md-7">

                  <div
                    className="d-flex align-items-center justify-content-center p-3 border rounded"
                    style={{ backgroundColor: "#f9f9f9" }}
                  >
                    <img
                      // src={
                      //   previewURL
                      //     ? previewURL
                      //     : getData[0]?.common_logo_url
                      //     ? getData[0]?.common_logo_url
                      //     : uploadsett
                      // }

                      src={previewURL ? previewURL : uploadsett}
                      alt="logo-preview"
                      style={{ height: 30 }}
                    />





                    <div className="d-flex flex-column ms-3">
                      <div>
                        <label
                          style={{
                            cursor: "pointer",
                            color: "rgba(30, 69, 225, 1)",
                            fontFamily: "Gilroy",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                        >
                          Choose file
                          <input
                            type="file"
                            accept="image/*"
                            className="d-none"
                            onChange={handleFileChange}
                          />
                        </label>
                        <span
                          className="ms-1"
                          style={{
                            color: "rgba(22, 21, 28, 1)",
                            fontFamily: "Gilroy",
                            fontSize: 14,
                            fontWeight: 400,
                          }}
                        >
                          to Upload
                        </span>
                      </div>
                      <small
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 12,
                          color: "rgba(75, 75, 75, 1)",
                          fontWeight: 400,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Must be in PNG Format (600px × 300px)
                      </small>
                    </div>
                  </div>

                </div>

              </div>

              <div className="row mb-4 align-items-center" style={{ marginTop: "-20px" }}>
                <div className="col-md-4">
                  <label className="form-label "
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 17,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                    }}
                  >Contact Number</label>
                  <div className="form-check" style={{ marginTop: "-10px" }}>
                    <input className="form-check-input" type="checkbox" id="customizeContact" defaultChecked style={{ cursor: "pointer" }} checked={isCheckedmobile} onChange={handleMobileCheckboxChange} />
                    <label className="form-check-label small" htmlFor="customizeContact"
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        color: "rgba(30, 69, 225, 1)",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        whiteSpace: "nowrap",


                      }}
                    >Customize in Specific Templates</label>
                  </div>
                </div>

                <div className="col-md-7">
                  <div
                    className="input-group"
                    style={{
                      border: "1px solid #E5E5E5",
                      borderRadius: 12,
                      overflow: "hidden",
                      height: 45
                    }}
                  >
                    <select
                      className="form-select"
                      style={{
                        maxWidth: 70,
                        border: "none",
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        color: "#4B4B4B",
                        fontWeight: 400,
                        backgroundColor: "transparent",
                        paddingLeft: 10,
                        paddingRight: 5,
                        appearance: "none",
                        WebkitAppearance: "none",
                      }}
                      defaultValue="+91"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>

                    </select>

                    <input
                      type="text"
                      value={mobilenum}
                      onChange={handleMobile}
                      className="form-control"
                      placeholder="9876543210"
                      maxLength={10}
                      style={{
                        border: "none",
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        color: "rgba(75, 75, 75, 1)",
                        fontWeight: 400,
                        borderRadius: 8,
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />

                  </div>
                  {MobileError && (
                    <div style={{ color: "red", }}>
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

              <div className="row mb-4 align-items-center">
                <div className="col-md-4">
                  <label className="form-label "
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 17,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                    }}
                  >E-Mail Address</label>
                  <div className="form-check " style={{ marginTop: "-10px" }}>
                    <input className="form-check-input" type="checkbox" id="customizeEmail" style={{ cursor: "pointer" }} checked={isCheckedEmail} onChange={handleEmaiCheckboxChange} />
                    <label className="form-check-label small" htmlFor="customizeEmail"
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        color: "rgba(30, 69, 225, 1)",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        whiteSpace: "nowrap",

                      }}
                    >Customize in Specific Templates</label>
                  </div>
                </div>
                <div className="col-md-7">
                  <input type="email" className="form-control" placeholder="example@email.com"
                    value={email}
                    onChange={handleEmail}
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      color: "rgba(75, 75, 75, 1)",
                      fontWeight: 400,
                      whiteSpace: "nowrap",
                      height: 45
                    }}
                  />
                  {emailError && (
                    <div style={{ color: "red", }}>
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

              <div className="row mb-2 align-items-center">
                <div className="col-md-4 mb-5" style={{ marginTop: "-10px" }}>
                  <label className="form-label "
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 17,
                      color: "rgba(34, 34, 34, 1)",
                      fontWeight: 600,
                    }}
                  >Digital Signature Upload</label>
                  <div className=" small"
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      color: "rgba(75, 75, 75, 1)",
                      fontWeight: 400,
                      whiteSpace: "nowrap"
                    }}
                  >Add a respected person’s Signature</div>
                  <div className="form-check mt-2">
                    <input className="form-check-input" type="checkbox" id="customizeSignature" style={{ cursor: "pointer" }} checked={isCheckedSignature} onChange={handleSignatureCheckboxChange} />
                    <label className="form-check-label small" htmlFor="customizeSignature"
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        color: "rgba(30, 69, 225, 1)",
                        fontStyle: 'italic',
                        fontWeight: 400,
                        whiteSpace: "nowrap",
                        lineHeight: '13.76px'
                      }}
                    >Customize in Specific Templates</label>
                  </div>
                </div>
                <div className="col-md-7">
                  <div
                    className="rounded mt-2 d-flex justify-content-center align-items-center"
                    style={{
                      height: '120px',
                      borderStyle: 'dotted',
                      borderWidth: '3px',
                      borderColor: '#ced4da',
                    }}
                  >
                    {signPreview ? (
                      <img
                        src={signPreview}
                        alt="uploaded-signature"
                        style={{ maxHeight: '100%', maxWidth: '100%' }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <span
                        className="text-muted"
                        style={{
                          fontFamily: 'Gilroy',
                          fontSize: 14,
                          fontWeight: 400,
                          color: 'rgba(34, 34, 34, 1)',
                          fontStyle: 'normal',
                          lineHeight: 'normal',
                        }}
                      >
                        No signature uploaded
                      </span>
                    )}




                  </div>


                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <label style={{ cursor: 'pointer', color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>
                        Choose file
                        <input
                          type="file"
                          accept="image/*"
                          className="d-none"
                          ref={fileInputRef}

                          onChange={handleFileSignatureChange}
                        />
                      </label>
                      <span className="ms-1" style={{ color: 'rgba(22, 21, 28, 1)', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>to Upload Image</span>
                    </div>
                    <div>
                      <button
                        className="btn btn-link text-decoration-none "
                        onClick={handleClear}
                        // disabled={signaturePreview}
                        style={{ color: 'rgba(75, 75, 75, 1)', fontFamily: 'Gilroy', fontSize: 16, fontWeight: 400 }}
                      >
                        Clear
                      </button>
                      <button
                        className="btn btn-link text-decoration-none "
                        // disabled={!signaturePreview}
                        onClick={handleSignatureDone}
                        style={{ color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600 }}
                      >
                        Done
                      </button>
                    </div>



                  </div>
                  {noChangesDetectedMsg && (
                    <div style={{ color: "red", }}>
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
                        {noChangesDetectedMsg}
                      </span>
                    </div>
                  )}
                  {signature_errmsg.trim() !== "" && (
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
                  )}
                </div>
              </div>
            </div>
            {/* {
  savebuttonshow ?  (
 <div className="d-flex justify-content-end mt-1 me-5" style={{paddingRight:10}}>

      <button className="btn btn-outline-dark me-2" type="button" onClick={handleReset}>Reset</button>
      <button className="btn btn-primary"  onClick={handleSaveTemplate}>{  state.Settings.FetchGlobal.message.length > 0 ? "Update": "Save"} </button>
    </div>
  ) :
  (
        <div className="text-end  me-5" style={{ paddingRight: 10}}>
      <button className="btn btn-primary" type="button" onClick={handleShow}>
        Go to Templates →
      </button>
    </div>
  )
  

} */}
            {
              savebuttonshow || (state.Settings.FetchGlobal.message?.length === 0) ? (
                <div className="d-flex justify-content-end mt-1 me-5" style={{ paddingRight: 10 }}>
                  <button className="btn btn-outline-dark me-2" type="button" onClick={handleReset}>
                    Reset
                  </button>
                  <button className="btn btn-primary" onClick={handleSaveTemplate}>
                    {state.Settings.FetchGlobal.message?.length > 0 ? "Update" : "Save"}
                  </button>
                </div>
              ) : (
                <div className="text-end me-5" style={{ paddingRight: 10 }}>
                  <button className="btn btn-primary" type="button" onClick={handleShow}>
                    Go to Templates →
                  </button>
                </div>
              )
            }


            {/* <div className="text-end mt-3 me-5" style={{paddingRight:10}}>
      <button className="btn btn-primary" type="button" onClick={handleShow}>Go to Templates →</button>
    </div> */}
            {/* {Array.isArray(state.Settings.FetchGlobal?.message) &&
  state.Settings.FetchGlobal.message.length > 0 && (
    <div className="text-end mt-3 me-5" style={{ paddingRight: 10 }}>
      <button className="btn btn-primary" type="button" onClick={handleShow}>
        Go to Templates →
      </button>
    </div>
)} */}
            {emailError && (
              <div style={{ color: "red", }}>
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
      }



      {
        edit &&

        (
          <div>

            <div className="container justify-content-start  d-flex align-items-start"
              style={{
                position: "sticky",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
                backgroundColor: "#FFFFFF",
                height: "60px",
                padding: "10px 5px",
              }}
            >
              <div style={{ position: "fixed" }}>
                <img
                  src={leftarrow}
                  alt="leftarrow"
                  width={20}
                  height={20}
                  // onClick={handleEditClose}
                  style={{ cursor: "pointer" }}
                />
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: "18px",
                    fontFamily: "Gilroy",
                    paddingLeft: "10px"
                  }}
                >
                  {selectedcard === "paymentinvoice" && "Monthly Rental Invoice"}
                  {selectedcard === "despositinvoice" && "Security Deposit Invoice"}
                  {selectedcard === "payementreceipt" && "Monthly Rental Receipt"}
                  {selectedcard === "depositreceipt" && "Security Deposit Receipt"}
                  {selectedcard === "finalreceipt" && "Final Settlement Receipt"}

                </span>{" "}
              </div>
            </div>

            <div style={{ overflowY: 'auto', maxHeight: '500px' }}>

              <div className="border p-3 mb-3" style={{ borderRadius: '10px', minHeight: '100px', maxHeight: 'auto', overflowY: 'auto', }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontFamily: "Gilroy", fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 400, whiteSpace: "nowrap", }}>Account Details</p>
                  </div>
                  <div>
                    {
                      banking && banking.length > 0 &&

                      <button
                        onClick={handleAddBankAccount}
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: "14px",
                          backgroundColor: "#1E45E1",
                          color: "white",
                          fontWeight: 400,
                          borderRadius: "12px",
                          width: 106,
                          height: 35,
                          border: "1px solid #1E45E1",
                        }}
                      >
                        Add
                      </button>
                    }

                  </div>
                </div>


                <hr></hr>
                <>
                  {banking && banking.length > 0 ? (
                    banking.map((bank) => (
                      <div
                        key={bank.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 15,
                          cursor: "pointer",
                        }}
                        onClick={() => handleBankClick(bank.id)}
                      >
                        <input
                          type="radio"
                          name="bank"
                          checked={selectedBankId === bank.id}
                          onChange={() => handleBankClick(bank.id)}
                          style={{ accentColor: "#1E45E1", marginRight: 10, height: 16, width: 16 }}
                        />
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <div
                            style={{
                              backgroundColor: "#1E45E1",
                              color: "white",
                              borderRadius: "50%",
                              width: 30,
                              height: 30,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img src={BankICon} alt="bankicon" height={17} width={17} className="mb-1" />
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14, fontFamily: "Gilroy" }}>
                              {bank.bank_name || "Bank Name"}
                            </div>
                            <div style={{ fontSize: 13, color: "grey", fontFamily: "Gilroy" }}>
                              {bank.benificiary_name || "Beneficiary"} /{" "} Savings A/C
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          fontWeight: 400,
                          color: "grey",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        No Bank accounts are there!
                      </p>
                      <button
                        onClick={handleAddBankAccount}
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: "14px",
                          backgroundColor: "#1E45E1",
                          color: "white",
                          fontWeight: 400,
                          borderRadius: "12px",
                          width: 106,
                          height: 35,
                          border: "1px solid #1E45E1",
                        }}
                      >
                        Add
                      </button>
                    </div>


                  )}
                </>

                {!selectedBankId && bankid_Error.trim() !== "" && (
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
                      {bankid_Error}
                    </label>
                  </div>
                )}
              </div>

              <div className="border p-3 mb-3" style={{ borderRadius: '10px', overflowY: 'auto', }}>

                <div>
                  <p style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                    Invoice No</p>
                  <hr></hr>
                </div>

                <div className='d-flex row '>
                  <div className='col-lg-6 col-md-6 col-sm-11 col-xs-11'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal', color: 'rgba(34, 34, 34, 1)' }}
                      >
                        Prefix
                      </Form.Label>
                      <Form.Control
                        style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                        type="text"
                        placeholder="prefix"
                        value={prefix}
                        onChange={hanldePrefix}
                      />
                      {prefix_errmsg.trim() !== "" && (
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
                            {prefix_errmsg}
                          </label>
                        </div>
                      )}

                    </Form.Group>
                  </div>

                  <div className='col-lg-6 col-md-6 col-sm-11 col-xs-11'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Suffix
                      </Form.Label>
                      <Form.Control
                        style={{ padding: '10px', marginTop: '10px', fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                        type="text"
                        placeholder="suffix"
                        value={suffix}
                        onChange={hanldeSuffix}
                      />

                      {suffix_errmsg.trim() !== "" && (
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
                            {suffix_errmsg}
                          </label>
                        </div>
                      )}
                    </Form.Group>
                  </div>
                </div>

                <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                    >
                      Preview
                    </Form.Label>
                    <Form.Control
                      style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                      type="text"
                      placeholder="preview"
                      value={`${prefix}-${suffix}`}
                      readOnly

                    />


                  </Form.Group>
                </div>
              </div>

              <div className="border p-3 mb-3" style={{ borderRadius: '10px', overflowY: 'auto', }}>

                <div>
                  <p style={{ fontFamily: 'Gilroy', color: 'rgba(34, 34, 34, 1)', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal' }}>
                    PG Tax Payable</p>
                  <hr></hr>
                </div>

                <div className='d-flex row '>
                  <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                      >
                        Add the Tax payable GST in Percentage %
                      </Form.Label>
                      <Form.Control
                        style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                        type="text"
                        placeholder="12%"
                        value={tax}
                        onChange={handleTaxChange}
                      />

                      {tax_errmsg.trim() !== "" && (
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
                            {tax_errmsg}
                          </label>
                        </div>
                      )}
                    </Form.Group>
                  </div>


                </div>



              </div>


              <div className="p-3 mb-3 border " style={{ borderRadius: '10px' }}>
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

              <div className="p-3 mb-3 border " style={{ borderRadius: '10px' }}>
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

              <div className="p-3 mb-3 border " style={{ borderRadius: '10px' }}>
                <h6 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
                  Authorized Signature</h6>
                <small className="text-muted" style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                >Add a respected Persons Signature</small>

                <div
                  className="rounded mt-2 d-flex justify-content-center align-items-center"
                  style={{
                    height: '120px', borderStyle: 'dotted', borderWidth: '3px',
                    borderColor: '#ced4da'
                  }}
                >
                  {/* {signaturePreview ? (
  <img
    src={signaturePreview}
    alt="uploaded-signature"
    style={{ maxHeight: '100%', maxWidth: '100%' }}
  />
) : getData[0]?.common_digital_signature_url &&
   getData[0].common_digital_signature_url !== "null" &&
   getData[0].common_digital_signature_url !== "" ? (
  <img
    src={getData[0].common_digital_signature_url}
    alt="signature"
    style={{ maxHeight: '100%', maxWidth: '100%' }}
    onError={(e) => {
      e.target.onerror = null;
      e.target.style.display = 'none';
    }}
  />
) : (
  <span
    className="text-muted"
    style={{
      fontFamily: 'Gilroy',
      fontSize: 14,
      fontWeight: 400,
      color: 'rgba(34, 34, 34, 1)',
      fontStyle: 'normal',
      lineHeight: 'normal',
    }}
  >
    No signature uploaded
  </span>
)} */}

                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div>
                    <label style={{ cursor: 'pointer', color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>
                      Choose file
                      <input
                        type="file"
                        accept="image/*"
                        className="d-none"
                        ref={fileInputRef}
                        onChange={handleFileSignatureChange}
                      />
                    </label>
                    <span className="ms-1" style={{ color: 'rgba(22, 21, 28, 1)', fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400 }}>to Upload Image</span>
                  </div>
                  <div>
                    <button
                      className="btn btn-link text-decoration-none "
                      onClick={handleClear}
                      // disabled={!signaturePreview}
                      style={{ color: 'rgba(75, 75, 75, 1)', fontFamily: 'Gilroy', fontSize: 16, fontWeight: 400 }}
                    >
                      Clear
                    </button>
                    <button
                      className="btn btn-link text-decoration-none "
                      disabled={!signaturePreview}
                      onClick={handleSignatureDone}
                      style={{ color: 'rgba(30, 69, 225, 1)', fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600 }}
                    >
                      Done
                    </button>
                  </div>


                </div>
                {signature_errmsg.trim() !== "" && (
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
                )}
              </div>

              {editErrmsg.trim() !== "" && (
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
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {editErrmsg}
                  </label>
                </div>
              )}

              <div className="d-flex justify-content-end flex-wrap mt-3 ">
                <button

                  // onClick={handleEditClose}
                  className="me-3 "
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: "14px",
                    backgroundColor: "white",
                    color: "rgba(75, 75, 75, 1)",
                    fontWeight: 400,
                    borderRadius: "12px",
                    width: 146,
                    height: 45,
                    border: "1px solid rgba(75, 75, 75, 1)",

                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveInvoice}
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: "14px",
                    backgroundColor: "#1E45E1",
                    color: "white",
                    fontWeight: 400,
                    borderRadius: "12px",
                    width: 146,
                    height: 45,
                    border: "1px solid #1E45E1",
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )
      }

      {bankaccountform && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "initial",
            fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={bankaccountform}
            onHide={handleCloseBankAccount}
            centered
            backdrop="static"
            dialogClassName="custom-modal"
          >
            <Modal.Dialog
              style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
              className="m-0 p-0"
            >
              <div>
                <Modal.Header
                  style={{ position: "relative" }}
                >
                  <div
                    style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}
                  >


                    Banking Details


                  </div>

                  <CloseCircle size="24" color="#000" onClick={handleCloseBankAccount}
                    style={{ cursor: 'pointer' }} />


                </Modal.Header>
              </div>
              <Modal.Body>

                <div className="row ">



                  <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                        Beneficiary Name   {" "}
                        <span style={{ color: "red", fontSize: "20px", }}>  {" "} *{" "} </span>
                      </Form.Label>
                      <Form.Control
                        style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                        type="text"
                        placeholder="Enter Beneficiary Name"
                        value={accountName}
                        onChange={handleAccountName}
                      />
                      {accountNameError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{ fontSize: "14", marginRight: "5px" }} />
                          <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
                        </div>
                      )}
                    </Form.Group>


                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                        Bank Name
                      </Form.Label>
                      <Form.Control
                        style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                        type="text"
                        placeholder="Enter Bank Name"
                        value={bank_name}
                        onChange={handleBankNameChange}
                      />


                    </Form.Group>


                  </div>


                  <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1" >
                      <Form.Label
                        style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                        Account Number
                      </Form.Label>
                      <Form.Control
                        style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                        type="text"
                        placeholder="Enter Account Number"
                        value={account_number}
                        onChange={handleAccountNumberChange}

                      />


                    </Form.Group>


                  </div>


                  <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                        IFSC Code
                      </Form.Label>
                      <Form.Control
                        style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                        type="text"
                        placeholder="Enter IFSC Code"
                        value={ifsccode}
                        onChange={handleIfscCodeChange}

                      />


                    </Form.Group>


                  </div>



                  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                        Description
                      </Form.Label>
                      <Form.Control
                        style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                        type="text"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => handleDescription(e)}
                      />


                    </Form.Group>


                  </div>















                </div>
              </Modal.Body>




              <Modal.Footer style={{ border: "none" }}>

                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 500,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    marginTop: "-15px"
                  }}
                  onClick={handleSubmitBank}
                >
                  Save

                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      )}





    </div>
  );
}
SettingInvoice.propTypes = {
  hostelid: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setIsInvoiceAddMode: PropTypes.func.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
}
export default SettingInvoice;