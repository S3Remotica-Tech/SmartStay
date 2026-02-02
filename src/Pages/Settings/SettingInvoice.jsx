/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../Pages/Settings/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import leftarrow from "../../Assets/Images/arrow-left.png"
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
// import Gpay from '../../Assets/Images/gpay.png'
// import Phonepe from '../../Assets/Images/phonepe.png'
// import Paytm from '../../Assets/Images/paytm.png'
import Questionimage from '../../Assets/Images/question.png';
import EditICon from '../../Assets/Images/New_images/edit.png';
import TextAreaICon from '../../Assets/Images/textarea.png'
import BankICon from '../../Assets/Images/bank_white.png'
import "react-datepicker/dist/react-datepicker.css";
import uploadsett from "../../Assets/Images/New_images/upload setting.png";
import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import '../../Pages/Settings/SettingInvoice.css';
import RentalReceiptPdfTemplate from "../BillsTemplates/RentalReceiptPdfTempate";
import SecurityDepositInvoiceTemplate from "../BillsTemplates/SecurityDepositInvoice";
import BankingAddForm from "../../Pages/Banking/BankingAddForm";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import { Location, Call, Profile, Edit, Trash } from 'iconsax-react'
import { IoBed } from "react-icons/io5";
import { Row, Col, Table, Card } from "react-bootstrap";
import AdvanceCustomizeSettings from '../BillsTemplates/AdvanceCustomizeSettings'
import ReceiptCustomize from '../BillsTemplates/ReceiptCustomize';
import { FiArrowRight } from "react-icons/fi";
import { RiPercentLine } from "react-icons/ri";
import { FiCode } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsQrCode } from "react-icons/bs";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

function SettingInvoice({ hostelid, handleFormPage }) {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);











  const [selectedDate, setSelectedDate] = useState(null);
  const [invoicedueDate, setInvoiceDueDate] = useState('');

  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [tax, setTax] = useState("");
  const [banking, setBanking] = useState([])
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [showform, setShowForm] = useState(false);
  const [contactnumberform, setContactNumberForm] = useState(false)
  const [editformErrmsg, setEditFormErrMessage] = useState('')
  const [global, setGlobal] = useState(false)


  const [cardshow, setCardShow] = useState(true)
  const [loading, setLoading] = useState(false)
  const [formLoading, setFormLoading] = useState(false)




  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);




  const [bankid_Error, setBankIdError] = useState("");
  const [prefix_errmsg, setPrefixErrMsg] = useState('')
  const [suffix_errmsg, setSuffixErrMsg] = useState('')
  const [tax_errmsg, setTaxErrMsg] = useState('')
  const [notes_errmsg, setNotesErrMsg] = useState('')
  const [terms_errmsg, setTermsErrMsg] = useState('')
  const [signature_errmsg, setSignatureErrMsg] = useState('')
  const [selectedTab, setSelectedTab] = useState("rental_invoice");
  const [mobilenum, setMobileNum] = useState("")
  const [MobileError, setMobileError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCheckedmobile, setIsCheckedMobile] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedLogo, setIsCheckedLogo] = useState(false);
  const [isCheckedSignature, setIsCheckedSignature] = useState(false);

  const [savebuttonshow, setSavebuttonshow] = useState(true)
  const [initialValues, setInitialValues] = useState({});
  const [noChangesDetectedMsg, setNoChangesDetectedMsg] = useState("");
  const [BillsTemplateList, setBillsTemplateList] = useState([])



  // const canReadInvoice = useHasPermission("Bills", "canRead")
  // const canUpdateInvoice = useHasPermission("Bills", "canUpdate")


  const {
    // canWriteModule: canWriteProfile,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteProfile,
  } = useHasPermission("Bills");


  useEffect(() => {
    if (!canReadInvoice) {
      setLoading(false);
    }
  }, [canReadInvoice]);

  useEffect(() => {
    if (BillsTemplateList.length === 0) {
      setLoading(false);
    }

  }, [BillsTemplateList])





  useEffect(() => {
    if (BillsTemplateList) {
      const initial = {
        mobile: BillsTemplateList?.mobile || "",
        emailId: BillsTemplateList?.emailId || "",
        signature: BillsTemplateList?.signature || null,
        logo: BillsTemplateList?.logo || null,
        isLogoCustomized: BillsTemplateList?.isLogoCustomized,
        isMobileCustomized: BillsTemplateList?.isMobileCustomized,
        isMailIdCustomized: BillsTemplateList?.isMailIdCustomized,
        isSignatureCustomized: BillsTemplateList?.isSignatureCustomized,
      };

      setInitialValues(initial);
      setMobileNum(BillsTemplateList.mobile);
      setEmail(BillsTemplateList.emailId);
      setSign(BillsTemplateList?.signature);
      setSignPreview(BillsTemplateList?.signature);
      setSelectedFile(BillsTemplateList?.logo);
      setPreviewURL(BillsTemplateList?.logo);
      setIsCheckedLogo(BillsTemplateList?.isLogoCustomized);
      setIsCheckedMobile(BillsTemplateList?.isMobileCustomized);
      setIsCheckedEmail(BillsTemplateList?.isMailIdCustomized);
      setIsCheckedSignature(BillsTemplateList?.isSignatureCustomized);
    }
  }, [BillsTemplateList, state.login.selectedHostel_Id]);





  useEffect(() => {
    if (state.Settings.settingGlobalAddStatusCode === 200) {
      setFormLoading(false)
      setLoading(false)
      setSavebuttonshow(false)
      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

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

  const handleGlobalCloseForm = () => {
    setGlobal(false)
  }




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
    { label: "Bills", value: "rental_invoice" },
    { label: "Security Deposit", value: "security_deposit_invoice" },
    { label: "Receipt", value: "rental_receipt" },
    // { label: "Security Deposit Receipt", value: "security_deposit_receipt" },
    // { label: "NOC Receipt", value: "noc_receipt" }
  ];

  const defaultGradient = "#1E45E1";

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
      setHostelLogo(file);
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
      setSign(file);
      setSignPreview(URL.createObjectURL(file));
      setSignatureErrMsg("");
      setIsSignatureConfirmed(true);
      setFieldError("");
      setSavebuttonshow(true)
    }
    setNoChangesDetectedMsg("");
  };







  const [previewURL, setPreviewURL] = useState(null);


  const handleFileChange = (e) => {
    setEditFormErrMessage('')
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
      setIsSignatureConfirmed(false);
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
      setRentalSignatureError("Please select a signature file");
    } else {
      setEditFormErrMessage("")
      setRentalSignatureError("");
      setIsRentalSignatureConfirmed(true);
    }
  };









  // const handleSaveInvoice = () => {
  //   if (
  //     !prefix || !suffix || !tax || !notes || !terms || !signature || !isSignatureConfirmed || !selectedBankId
  //   ) {
  //     if (!prefix) setPrefixErrMsg("Please Enter Prefix");
  //     if (!suffix) setSuffixErrMsg("Please Enter Suffix");
  //     if (!tax) setTaxErrMsg("Please Enter Tax");
  //     if (!notes) setNotesErrMsg("Please Enter Notes");
  //     if (!terms) setTermsErrMsg("Please Enter Terms");
  //     if (!selectedBankId) setBankIdError("Please Add or select bank")
  //     if (!signature) {
  //       setSignatureErrMsg("Please select signature");
  //     } else if (!isSignatureConfirmed) {
  //       setSignatureErrMsg("Please click Done after selecting a signature");
  //     }
  //     return;
  //   }


  //   const currentData = {
  //     prefix,
  //     suffix,
  //     tax,
  //     notes: notes?.replace(/"/g, '') || '',
  //     privacyPolicy: terms,
  //     signatureFile: signature,
  //     bankingId: Number(selectedBankId)
  //   };

  //   const originalData = {
  //     prefix: InvoiceList?.invoiceSettings?.prefix || '',
  //     suffix: InvoiceList?.invoiceSettings?.suffix || '',
  //     tax: InvoiceList?.invoiceSettings?.tax || '',
  //     notes: InvoiceList?.invoiceSettings?.notes?.replace(/"/g, '') || '',
  //     privacyPolicy: InvoiceList?.invoiceSettings?.privacyPolicyHtml || '',
  //     signatureFile: InvoiceList?.invoiceSettings?.signatureFile || '',
  //     bankingId: Number(InvoiceList?.invoiceSettings?.bankingId || 0),
  //   };

  //   if (
  //     InvoiceList?.invoiceSettings &&
  //     JSON.stringify(currentData) === JSON.stringify(originalData)
  //   ) {
  //     setEditErrMessage("No changes detected");
  //     setSignatureErrMsg("")
  //     return;
  //   }

  //   if (selectedBankId) {
  //     dispatch({
  //       type: "ADD_INVOICE_SETTINGS",
  //       payload: {
  //         hostelId: Number(state.login.selectedHostel_Id),
  //         bank_id: Number(selectedBankId),
  //         prefix,
  //         suffix,
  //         tax,
  //         notes,
  //         privacyPolicy: terms,
  //         signature,
  //       },
  //     });
  //   }


  // };






  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true)
      // dispatch({ type: "SETTINGS_GET_INVOICE", payload: { hostel_id: state.login.selectedHostel_Id } });
      dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, [state.login.selectedHostel_Id]);




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


  // useEffect(() => {
  //   if (state.Settings?.settingsInvoicegetSucesscode === 200) {
  //     setLoading(false)
  //     setInvoiceList(state.Settings.SettingsInvoice)

  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_SETTINGSGETINVOICE_STATUS_CODE" });
  //     }, 1000);
  //   }
  // }, [state.Settings.settingsInvoicegetSucesscode]);


  useEffect(() => {
    if (state.Settings?.settingsInvoicegetErrorStatuscode === 201) {
      setLoading(false)
      setSelectedBankId(null)
      setPrefix("")
      setSuffix("")
      setTax("")
      // setSignature(null)
      // setSignaturePreview(null)
      setBankIdError("")

      setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR_SETTINGS_GETINVOICE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsInvoicegetErrorStatuscode]);






  useEffect(() => {
    if (state.Settings?.settingsAddInvoiceSucesscode === 200) {

      // dispatch({ type: "SETTINGS_GET_INVOICE", payload: { hostel_id: hostelid } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDINVOICE_SETTINGS_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsAddInvoiceSucesscode]);












  useEffect(() => {
    if (state.InvoiceList?.invoiceSettingsStatusCode === 200) {
      setSelectedDate('')
      setInvoiceDueDate('')

      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_SETTINS_STATUSCODE" });
      }, 1000);
    }
  }, [state.InvoiceList]);




  // const [selectedcard, setSelectedard] = useState('')



  const handleShow = () => {

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
    // dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })
    // setIsInvoiceAddMode(true)
    // setIsSidebarOpen(false)
    handleFormPage(true)
    // setSelectedard(type)
    setShowForm(true);
    // setEdit(false);
    setCardShow(false)
  };



  const handleCloseForm = () => {
    setBankAccountForm(false);
    // setEdit(false);
    setCardShow(true)
    setShowForm(false)
    // setSelectedard('')
    setPrefix('')
    setSelectedDate('')
    setInvoiceDueDate('')
    handleFormPage(false)
    setEditFormErrMessage("")
  };

  const handleCloseFormBank = () => {
    setBankAccountForm(false);
    // setEdit(false);
  }
  const [bankaccountform, setBankAccountForm] = useState(false)


  const handleAddBankAccount = () => {
    setBankAccountForm(true)
  }

  const handleRemoveQr = () => {
    setQrImage(null);
    setQRImagePreview(null)
    if (qrFileInputRef.current) {
      qrFileInputRef.current.value = "";
    }
  };

  const handleCloseBankAccount = () => {
    setBankAccountForm(false)
    // setaccountnameError("")
    // setAccountName("")
    // setAccount_Number("")
    // setIfscCode("")
    // setBankName("")
    // setDescription("")
  }

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking) {
      setBanking(state.bankingDetails?.bankingList?.listBanks)
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);


  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 200) {
      // setAccountName("")
      // setAccount_Number("")
      // setIfscCode("")
      // setBankName("")
      // setDescription("")
      handleCloseBankAccount();

      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBanking]);








  const handleBankClick = (id) => {
    setEditFormErrMessage('')
    setSelectedBankId(id);
  };

  useEffect(() => {
    if (banking?.length > 0) {
      const defaultBank = banking.find((bank) => bank.isDefault) || banking[0];
      setSelectedBankId(defaultBank.bankingId);
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

  const RentalinvoiceTemplate = BillsTemplateList && BillsTemplateList.templates?.find(
    (template) => template.type === "RENTAL"
  );



  useEffect(() => {
    if (RentalinvoiceTemplate) {
      setLogoPreview(BillsTemplateList.isLogoCustomized && RentalinvoiceTemplate.invoiceLogoUrl ? RentalinvoiceTemplate.invoiceLogoUrl : BillsTemplateList.logo)
      setHostelLogo(BillsTemplateList.isLogoCustomized && RentalinvoiceTemplate.invoiceLogoUrl ? RentalinvoiceTemplate.invoiceLogoUrl : BillsTemplateList.logo)
      setPaymentMobileNum(
        BillsTemplateList.isMobileCustomized && RentalinvoiceTemplate.invoiceMobileNumber
          ? RentalinvoiceTemplate.invoiceMobileNumber
          : BillsTemplateList.mobile
      );
      setPaymentinvoiceEmail(BillsTemplateList.isMailIdCustomized && RentalinvoiceTemplate.invoiceMailId ? RentalinvoiceTemplate.invoiceMailId : BillsTemplateList.emailId)
      setPrefix(RentalinvoiceTemplate.prefix || '')
      setSuffix(RentalinvoiceTemplate.suffix || '')
      // setSignature(BillsTemplateList.isSignatureCustomized && RentalinvoiceTemplate.invoiceSignatureUrl ? RentalinvoiceTemplate.invoiceSignatureUrl : BillsTemplateList.signature)
      setRentalSignatureFile(BillsTemplateList.isSignatureCustomized && RentalinvoiceTemplate.invoiceSignatureUrl ? RentalinvoiceTemplate.invoiceSignatureUrl : BillsTemplateList.signature)
      setRentalSignaturePreview(BillsTemplateList.isSignatureCustomized && RentalinvoiceTemplate.invoiceSignatureUrl ? RentalinvoiceTemplate.invoiceSignatureUrl : BillsTemplateList.signature)
      setTerms(RentalinvoiceTemplate.invoiceTermsAndCondition || '')
      setTax(RentalinvoiceTemplate.gstPercentile || '')
      setSelectedBankId(RentalinvoiceTemplate.selectedBankId || null)
      setQrImage(RentalinvoiceTemplate.qrCodeUrl || null)
      setQRImagePreview(RentalinvoiceTemplate.qrCodeUrl || null)
      setNotes(RentalinvoiceTemplate.invoiceNotes)
      const templateTheme = RentalinvoiceTemplate.invoiceTemplateColor;
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











  const handleSaveRentalTemplate = () => {
    setEditFormErrMessage('')
    // const currentTemplate = {
    //   // hostelId: Number(state.login.selectedHostel_Id),
    //   // templateTypeId: RentalinvoiceTemplate.typeId,
    //   // invSign: rentalSignatureFile,
    //   // isSignatureCustomized: isCheckedSignature,
    //   // invoicePhoneNumber: paymentmobilenum,
    //   // isMobileCustomized: isCheckedmobile,
    //   // invoiceMailId: paymentinvoiceemail,
    //   // isEmailCustomized: isCheckedEmail,
    //   // invLogo: hostel_logo,
    //   // isLogoCustomized: isCheckedLogo,
    //   qrCode: qrimagepreview,
    //   prefix: prefix,
    //   suffix: suffix,
    //   gstPercentile: tax,
    //   invoiceNotes: notes,
    //   invoiceTermsAndCondition: terms,
    //   bankId: selectedBankId || "",
    //   invoiceTemplateColor: useGradient
    //     ? defaultGradient
    //     : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    // };

    // const oldTemplate = {
    //   // hostelId: Number(state.login.selectedHostel_Id),
    //   // templateTypeId: RentalinvoiceTemplate.typeId,
    //   // invSign: RentalinvoiceTemplate.invSign || null,
    //   // isSignatureCustomized: RentalinvoiceTemplate.isSignatureCustomized,
    //   // invoicePhoneNumber: RentalinvoiceTemplate.invoicePhoneNumber || "",
    //   // isMobileCustomized: RentalinvoiceTemplate.isMobileCustomized,
    //   // invoiceMailId: RentalinvoiceTemplate.invoiceMailId || "",
    //   // isEmailCustomized: RentalinvoiceTemplate.isEmailCustomized,
    //   // invLogo: RentalinvoiceTemplate.invLogo || null,
    //   // isLogoCustomized: RentalinvoiceTemplate.isLogoCustomized,
    //   qrCode: RentalinvoiceTemplate.qrCodeUrl || null,
    //   prefix: RentalinvoiceTemplate.prefix || "",
    //   suffix: RentalinvoiceTemplate.suffix || "",
    //   gstPercentile: RentalinvoiceTemplate.gstPercentile || "",
    //   invoiceNotes: RentalinvoiceTemplate.invoiceNotes || "",
    //   invoiceTermsAndCondition: RentalinvoiceTemplate.invoiceTermsAndCondition || "",
    //   bankId: RentalinvoiceTemplate.selectedBankId || "",
    //   invoiceTemplateColor: RentalinvoiceTemplate.invoiceTemplateColor || "",
    // };


    // const isChanged =

    //   currentTemplate.qrCode !== oldTemplate.qrCode ||
    //   currentTemplate.prefix !== oldTemplate.prefix ||
    //   currentTemplate.suffix !== oldTemplate.suffix ||
    //   currentTemplate.gstPercentile !== oldTemplate.gstPercentile ||
    //   currentTemplate.invoiceNotes !== oldTemplate.invoiceNotes ||
    //   currentTemplate.invoiceTermsAndCondition !== oldTemplate.invoiceTermsAndCondition ||
    //   currentTemplate.bankId !== oldTemplate.bankId
    //  currentTemplate.invoiceTemplateColor !== oldTemplate.invoiceTemplateColor;








    // if (!isChanged) {
    //   setEditFormErrMessage("No changes detected");
    //   setSignatureErrMsg("");
    //   return;
    // }




    if (RentalinvoiceTemplate.isSignatureCustomized) {
      const Signatureverify = !RentalinvoiceTemplate.invoiceSignatureUrl;

      if (rentalSignatureFile && !isRentalSignatureConfirmed && Signatureverify) {
        setRentalSignatureError("Please click Done after selecting a signature");
        return;
      }
    }

    if (RentalinvoiceTemplate.isMobileCustomized) {
      if (paymentmobilenum && paymentmobilenum.length < 10) {
        setPaymentMobileError("Please Enter Valid Mobile Number");
        return;
      } else if (paymentmobilenum.length === 10) {
        setPaymentMobileError("");
      }
    }

    if (RentalinvoiceTemplate.isMailIdCustomized) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(paymentinvoiceemail);
      if (!paymentinvoiceemail) {
        setPaymentInvoiceEmailError("");
      } else if (!isValidEmail) {
        setPaymentInvoiceEmailError("Please Enter Valid Email Id");
        return;
      } else {
        setPaymentInvoiceEmailError("");
      }
    }



    if (RentalinvoiceTemplate.typeId && state.login.selectedHostel_Id) {
      dispatch({
        type: "ADDGLOBALSETTING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          templateTypeId: RentalinvoiceTemplate.typeId,
          mobile: BillsTemplateList.mobile,
          email: BillsTemplateList.emailId,
          invoicePhoneNumber: paymentmobilenum,
          invoiceMailId: paymentinvoiceemail,
          isMobileCustomized: isCheckedmobile,
          isEmailCustomized: isCheckedEmail,
          isLogoCustomized: isCheckedLogo,
          isSignatureCustomized: isCheckedSignature,
          hostelLogo: selectedFile,
          billSignature: sign,
          invLogo: hostel_logo,
          invSign: rentalSignatureFile,
          qrCode: qrimagepreview,
          prefix,
          suffix,
          gstPercentile: tax,
          invoiceNotes: notes,
          invoiceTermsAndCondition: terms,
          bankId: selectedBankId,
          invoiceTemplateColor: useGradient
            ? defaultGradient
            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
      });
      setFormLoading(true)

    }
  };


  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })
  //   }
  // }, [])

  useEffect(() => {
    if (state.Settings?.settingsBillsAddTemplateSucesscode === 200) {

      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BILLS_TEMPLATE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsBillsAddTemplateSucesscode]);

  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetsuccessCode === 200) {
      setLoading(false)
      setBillsTemplateList(state.Settings?.settingsBillsTemplateList)
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_TEMPLATELIST_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.SettingsBilltemplategetsuccessCode]);







  // useEffect(() => {
  //   if (showFullView) {
  //     document.body.style.overflow = 'hidden';
  //   } else {
  //     document.body.style.overflow = 'auto';
  //   }
  // }, [showFullView]);





  const [fieldError, setFieldError] = useState("")

  const handleSaveTemplate = () => {
    // const hasSignatureInDB = BillsTemplateList?.signature;



    if (sign && isSignatureConfirmed) {
      setSignatureErrMsg("Please click Done after selecting a signature");
      return
    }
    if (MobileError) {
      setMobileError("Please enter a valid mobile number");
      return;
    }


    if (emailError) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const noChange =
      mobilenum === String(initialValues.mobile).trim() &&
      email === initialValues.emailId &&
      sign === initialValues.signature &&
      selectedFile === initialValues.logo &&
      isCheckedLogo === initialValues.isLogoCustomized &&
      isCheckedmobile === initialValues.isMobileCustomized &&
      isCheckedEmail === initialValues.isMailIdCustomized &&
      isCheckedSignature === initialValues.isSignatureCustomized;

    if (noChange) {
      setNoChangesDetectedMsg("No changes detected.");
      return;
    } else {
      setNoChangesDetectedMsg("");
    }

    if (BillsTemplateList.templateId) {
      dispatch({
        type: "ADDGLOBALSETTING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          mobile: mobilenum,
          email: email,
          isMobileCustomized: isCheckedmobile,
          isEmailCustomized: isCheckedEmail,
          isLogoCustomized: isCheckedLogo,
          isSignatureCustomized: isCheckedSignature,
          hostelLogo: selectedFile,
          billSignature: sign,
          // templateTypeId: BillsTemplateList.templateId
        },
      });

      setFormLoading(true)
    }

  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  const handleReset = (() => {
    // setResetCall(true)
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



  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const taxAmount = (subtotal * tax) / 100;
  const totalAmount = subtotal + taxAmount;

  const hasTax = tax;


  const [templateThemes, setTemplateThemes] = useState('')
  const [templateReceiptThemes, setTemplateReceiptThemes] = useState('')


  const onTemplateChange = (template) => {

    setTemplateThemes(template)
  }


  const onTemplateReceiptChange = (template) => {
    setTemplateReceiptThemes(template)
  }


  const handleEditChange = () => {
    setGlobal(true)
  }












  return (
    <div className="" style={{ position: "relative" }}>


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

      {formLoading &&
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
          <Row className="ps-1 " style={{ backgroundColor: "", height: "100vh" }}  >
            <Col md={4}
              className=""
            >
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
                  className="mb-2 pt-2"
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
                <div className="flex items-start gap-2 my-2">
                  <img
                    src={leftarrow}
                    alt="leftarrow"
                    width={20}
                    height={20}
                    onClick={handleCloseForm}
                    className="cursor-pointer mt-[2px] shrink-0"
                  />

                  <p className="font-[Gilroy] text-[16px] font-semibold leading-[22px] m-0">
                    Global Bill Settings
                  </p>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${PdfOptions.length}, 1fr)`,
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {PdfOptions.map((option) => (
                    <button
                      key={option.value}
                      style={{
                        borderRadius: "50rem",
                        padding: "6px 8px",
                        fontFamily: "Gilroy",
                        fontSize: 12,
                        fontWeight: 600,
                        verticalAlign: "middle",
                        letterSpacing: "0%",
                        lineHeight: "100%",
                        backgroundColor:
                          selectedTab === option.value
                            ? "rgba(30, 69, 225, 1)"
                            : "transparent",
                        color: selectedTab === option.value ? "#fff" : "#6c757d",
                        border: "1px solid",
                        borderColor:
                          selectedTab === option.value ? "#0d6efd" : "#6c757d",
                        whiteSpace: "nowrap",
                        textAlign: "center",
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






              <div
                className="" style={{
                  maxHeight: "calc(95vh - 130px)",
                  overflowY: "auto", marginTop: 50,
                }}
              >


                {selectedTab === "rental_invoice" && <>
                  <div className="d-flex row g-0">
                    <div className="col-lg-12 show-scrolls" style={{
                      maxHeight: 650,
                      overflowY: "auto",
                      overflowX: 'hidden',
                    }}>
                      {(
                        BillsTemplateList?.isLogoCustomized ||
                        BillsTemplateList?.isMobileCustomized ||
                        BillsTemplateList?.isMailIdCustomized ||
                        BillsTemplateList?.isSignatureCustomized
                      ) &&

                        (
                          <>
                            <p style={{ fontFamily: 'Gilroy', fontSize: 17, fontWeight: 600, }}>Inherited Global Details</p>

                            <div className="border ps-3 pe-3 pb-3 pt-2 mb-3 col-lg-12 " style={{ borderRadius: '10px', overflowY: 'auto', }}>
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
                                          <ErrorMessage message={paymentMobileError} type="error" />
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
                                            value={paymentinvoiceemail}
                                            onChange={handlePaymentinvoiceEmail}
                                          />

                                        </div>
                                        {paymentinvoiceemailError !== "" && (
                                          <ErrorMessage message={paymentinvoiceemailError} type="error" />
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
                                            <ErrorMessage message={rentalSignatureError} type="error" />
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


                      <div className="border p-3 mb-3 col-lg-12" style={{ borderRadius: '10px', overflowY: 'auto', }}>

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
                                <ErrorMessage message={prefix_errmsg} type="error" />
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
                                <ErrorMessage message={suffix_errmsg} type="error" />
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

                      <div className="border p-3 mb-3 col-lg-12" style={{ borderRadius: '10px', overflowY: 'auto', }}>

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
                                <ErrorMessage message={tax_errmsg} type="error" />
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
                        className="col-lg-12"
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
                              <div key={bank.bankingId} style={{ marginBottom: 15, cursor: 'pointer' }} >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <input
                                    type="radio"
                                    name="bank"
                                    checked={String(selectedBankId) === String(bank.bankingId)}
                                    onChange={() => handleBankClick(bank.bankingId)}
                                    style={{ accentColor: '#1E45E1', marginRight: 10, height: 16, width: 16, cursor: "pointer" }}
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
                                      <div style={{ fontWeight: 600, fontSize: 14 }}>{bank.bankName || 'Bank Name'}</div>
                                      <div style={{ fontSize: 13, color: 'grey' }}>
                                        {bank.accountHolderName || 'Beneficiary'} / Savings A/C
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
                          <ErrorMessage message={bankid_Error} type="error" />
                        )}
                      </div>


                      <div className="border p-3 mb-3 col-lg-12 " style={{ borderRadius: '10px', overflowY: 'auto', }}>

                        <div>
                          <p style={{ fontFamily: 'Gilroy', color: 'rgba(34, 34, 34, 1)', fontSize: 14, fontWeight: 400, fontStyle: 'normal', lineHeight: 'normal' }}>
                            Upload QR</p>
                          <hr></hr>
                        </div>

                        <p style={{ fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400, color: 'rgba(75, 75, 75, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
                          Valid UPI QR Code for Payment Easy</p>
                        <div className="col-12">
                          <div className="d-flex align-items-center justify-content-center p-3 border rounded" style={{ backgroundColor: '#f9f9f9' }}>

                            <div
                              style={{
                                position: "relative",
                                width: "100%",
                                maxWidth: 120,
                                aspectRatio: "1 / 1",
                                backgroundColor: "#fff",
                                // border: "1px solid #ddd",
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
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

                              {qrImage ? (
                                <>
                                  <img
                                    src={qrImage}
                                    alt="QR Preview"
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "contain",
                                      borderRadius: "8px",
                                      marginBottom: "10px",
                                      // border: "1px solid #ddd",
                                      backgroundColor: "#fff", zIndex: 1,
                                    }}
                                  />
                                  <div
                                    className="qr-overlay"
                                    style={{
                                      display: "none",
                                      position: "absolute",
                                      inset: 0,
                                      backgroundColor: "rgba(0,0,0,0.15)",
                                      borderRadius: 8,
                                      zIndex: 2,
                                      pointerEvents: "none",
                                    }}
                                  />


                                  <div
                                    className="qr-trash"
                                    onClick={handleRemoveQr}
                                    style={{
                                      display: "none",
                                      position: "absolute",
                                      // top: "50%",
                                      // right: 6,
                                      width: 28,
                                      height: 28,
                                      borderRadius: "50%",
                                      backgroundColor: "rgba(0,0,0,0.7)",
                                      color: "#fff",
                                      cursor: "pointer",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 14, zIndex: 3,
                                    }}
                                  >
                                    <Trash size="20" />
                                  </div>
                                </>
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
                            </div>
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


                      {editformErrmsg.trim() !== "" && (
                        <div className="d-flex justify-content-center">
                          <ErrorMessage message={editformErrmsg} type="error" />
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
                          onClick={handleSaveRentalTemplate}
                        >
                          Save Template
                        </Button>
                      </div>


                    </div>

                  </div>



                </>}

                {selectedTab === "security_deposit_invoice" &&
                  <>

                    <AdvanceCustomizeSettings hostelid={hostelid} BillsTemplateList={BillsTemplateList}


                      onTemplateChange={onTemplateChange}

                    />

                  </>}

                {selectedTab === "rental_receipt" &&
                  <>
                    <ReceiptCustomize hostelid={hostelid} BillsTemplateList={BillsTemplateList} onTemplateReceiptChange={onTemplateReceiptChange} />

                  </>}


              </div>
            </Col>

            <Col md={8} className="p-0">
              {
                selectedTab === "rental_invoice" &&

                <div className=" g-0 d-flex justify-content-center ps-5 pe-5 pt-1 " style={{ backgroundColor: '#F7F8FC' }}>

                  <div className="" ref={cardRef} style={{
                    maxHeight: 650,
                    overflowY: "auto",
                    overflowX: 'hidden',
                  }}>



                    <div ref={innerScrollRef}
                      className=" col-lg-12  justify-content-center"
                      style={{

                        borderBottomLeftRadius: "13px",
                        borderBottomRightRadius: "13px", borderRadius: "8px", backgroundColor: "#FFFFFF", marginBottom: 50, boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
                      }}>

                      <div className="p-3 position-relative"
                        style={{
                          backgroundColor: ""
                        }}>
                        <div className="row d-flex justify-content-between align-items-center ps-3 pe-3">
                          <div className="col-6">

                            <img
                              src={
                                logoPreview
                                  ? logoPreview
                                  : Logo
                              }
                              alt="logo"
                              style={{ height: 25, maxWidth: 134, borderRadius: '4px', objectFit: "contain", }}
                            />

                          </div>

                          <div className="mt-2 col-5 ps-4 pe-0">


                            <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>{state.UsersList.hotelDetailsinPg?.name}</div>

                            <div style={{ fontSize: 8, fontWeight: 600, fontFamily: "Gilroy" }}>
                              {[
                                [state.UsersList.hotelDetailsinPg?.street, state.UsersList.hotelDetailsinPg?.area, state.UsersList.hotelDetailsinPg?.landmark]
                                  .filter(Boolean)
                                  .join(", "),

                                [state.UsersList.hotelDetailsinPg?.city, state.UsersList.hotelDetailsinPg?.state]
                                  .filter(Boolean)
                                  .join(", ") + (state.UsersList.hotelDetailsinPg?.pinCode ? ` - ${state.UsersList.hotelDetailsinPg.pinCode}` : "")
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

                      <hr className="m-0"
                        style={{
                          border: "none",
                          height: "1px",
                          background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          borderRadius: "2px",
                        }}
                      />

                      <div className="container rounded-bottom  position-relative" style={{ width: "100%", }}>
                        <div className="text-center pt-2 pb-1">
                          <h5 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`, }}>
                            Payment Bills
                          </h5>
                        </div>


                        <div className="row px-4 mt-1">
                          <div className="col-md-6 mb-1">
                            <p
                              className="mb-1"
                              style={{
                                color: useGradient
                                  ? defaultGradient
                                  : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                fontStyle: "italic",
                              }}
                            >
                              Bill to:
                            </p>


                            <div className="d-flex align-items-center mb-1">
                              <Profile
                                size="16"
                                variant="Bold"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span
                                className="ms-1"
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 600,
                                  color: "#171717",
                                }}
                              >
                                Mr. Muthuraja M
                              </span>
                            </div>


                            <div className="d-flex align-items-center mb-1">
                              <Call
                                size="16"
                                variant="Bold"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span
                                className="ms-1"
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  color: "#171717",
                                }}
                              >
                                +91 9876543210
                              </span>
                            </div>


                            <div className="d-flex align-items-center mb-1">
                              <IoBed
                                size="16"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span
                                className="ms-1"
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  color: "#171717",
                                }}
                              >
                                No 103 - 02
                              </span>
                            </div>

                            {/* Address */}
                            <div className="d-flex align-items-start">
                              <Location
                                size="16"
                                variant="Bold"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span
                                className="ms-1"
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 400,
                                  color: "#171717",
                                  lineHeight: 1.4,
                                }}
                              >
                                9, 8th Main Rd, Someshwara Nagar, <br />
                                Bengaluru, Karnataka 560011
                              </span>
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


                        <div className="px-3 py-1 ">
                          <div className="mb-1">
                            <label style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>Payment Summary</label>
                          </div>
                          <div className="" style={{ fontFamily: "Gilroy" }}>
                            <Row
                              style={{
                                border: "1px solid #DFDFDF",
                                borderRadius: 8,
                                margin: 0,
                              }}
                            >
                              <Col md={hasTax ? 6 : 12} className="p-2">



                                <Table responsive bordered={false} className="mb-0">
                                  <thead>
                                    <tr style={{ backgroundColor: "#FFF" }}>
                                      <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>INV NO</th>
                                      <th
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 600,
                                          color: "#222222",
                                          textAlign: "right", textTransform: "capitalize"
                                        }}
                                      >
                                        DESCRIPTION
                                      </th>
                                      <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textAlign: "right" }}>AMOUNT / INR</th>

                                    </tr>
                                  </thead>

                                  <tbody>
                                    {items.map((item, index) => (
                                      <tr key={item.id}>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500 }}>
                                          INV-{500 + index + 1}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            color: "#2D2D2D",
                                            fontWeight: 600,
                                            textAlign: "right",
                                          }}
                                        >
                                          {item.name}
                                        </td>
                                        <td
                                          style={{
                                            textAlign: "right",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "#2D2D2D",
                                          }}
                                        >
                                          ₹{item.amount.toLocaleString("en-IN")}
                                        </td>
                                      </tr>
                                    ))}


                                    <tr
                                      style={{
                                        backgroundColor: "#FAFBFF",
                                        fontWeight: 600,
                                        borderTop: "1px solid #DFDFDF",
                                      }}
                                    >
                                      <td
                                        colSpan={2}
                                        style={{
                                          fontSize: 14,
                                          color: "#2D2D2D",
                                          fontWeight: 500,
                                          textAlign: "start",
                                        }}
                                      >
                                        Total
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "right",
                                          fontSize: 14,
                                          fontWeight: 600,
                                          color: "#2D2D2D",
                                        }}
                                      >
                                        ₹
                                        {items
                                          .reduce((total, item) => total + item.amount, 0)
                                          .toLocaleString("en-IN")}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>

                              </Col>
                              {hasTax && (
                                <Col md={6} className="p-2">
                                  <Table responsive bordered={false} className="mb-0">
                                    <thead>
                                      <tr style={{ backgroundColor: "#FFF" }}>
                                        <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>OTHERS</th>
                                        <th
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "#222222",
                                            textAlign: "right",
                                          }}
                                        >
                                          AMOUNT / INR
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      <tr>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500 }}>
                                          GST ({tax}%)
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            color: "#2D2D2D",
                                            fontWeight: 600,
                                            textAlign: "right",
                                          }}
                                        >
                                          ₹{" "}
                                          {Number(tax)}
                                        </td>
                                      </tr>

                                      <tr
                                        style={{
                                          backgroundColor: "#FAFBFF",
                                          fontWeight: 600,
                                          borderTop: "1px solid #DFDFDF",
                                        }}
                                      >
                                        <td style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 500 }}>Total</td>
                                        <td
                                          style={{
                                            textAlign: "right",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "#2D2D2D",
                                          }}
                                        >
                                          ₹{" "}
                                          {tax}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Col>
                              )}

                            </Row>
                          </div>



                          <div
                            className="d-flex justify-content-between align-items-center mb-3 mt-3  px-3 py-2 border rounded"
                            style={{
                              backgroundColor: "#FAFBFF",
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            <div style={{ color: "#4B4B4B", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Grand Total</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1E1E", fontFamily: "Gilroy" }}>₹{" "}
                              {totalAmount}</div>
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
                              color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                              letterSpacing: '1px'

                            }}
                            >ACCOUNT DETAILS</h6>
                            <p className="mb-1"
                              style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                              Account No :{RentalinvoiceTemplate?.accountNumber || "N/A"}</p>
                            <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                              IFSC Code :  {RentalinvoiceTemplate?.ifscCode || "N/A"}</p>
                            <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                              Bank Name: {RentalinvoiceTemplate?.bankName || "N/A"}</p>
                            <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                              UPI Details : {RentalinvoiceTemplate?.upiId
                                || "N/A"}</p>
                          </div>

                          <div className="col-md-2"></div>

                          <div className="col-md-4 d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                            <div className="d-flex justify-content-end mt-auto">
                              {
                                qrImage ?
                                  <img
                                    src={qrImage}
                                    alt="QR Code"
                                    style={{ height: 89, width: 89, borderRadius: '2px' }}
                                  />
                                  :
                                  <BsQrCode style={{ height: 89, width: 89, borderRadius: '2px', color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }} />
                              }
                            </div>
                            {/* <div className="d-flex flex-row justify-content-end">
                              <img src={Paytm} alt="Paytm" style={{ height: 38, width: 38 }} className="m-2" />
                              <img src={Phonepe} alt="PhonePe" style={{ height: 38, width: 38 }} className="m-2" />
                              <img src={Gpay} alt="GPay" style={{ height: 38, width: 38 }} className="m-2" />
                            </div> */}

                          </div>
                        </div>
                      </div>


                      <div className="row justify-content-between mt-2 mb-4 px-4">
                        <div className="col-md-8">
                          <h4 style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600, color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>Terms and Conditions</h4>
                          <p style={{ whiteSpace: "pre-line", fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(61, 61, 61, 1)' }}>
                            {terms}
                          </p>
                        </div>

                        <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
                          {rentalSignaturePreview && (
                            <img
                              src={rentalSignaturePreview}
                              alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft: 30 }}

                            />
                          )}
                          <p
                            style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(44, 44, 44, 1)', }}
                          >Authorized Signature</p>
                        </div>
                      </div>


                      <hr className="m-0"
                        style={{
                          border: "none",
                          height: "1px",
                          background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                          borderRadius: "2px",
                        }}
                      />

                      <div className="px-4 py-2 pb-2">
                        <div
                          className="text-center rounded-bottom d-flex justify-content-between"
                          style={{
                            borderTopRightRadius: '38px',
                            borderTopLeftRadius: '38px',
                          }}
                        >

                          <p
                            className="mb-0"
                            style={{
                              fontSize: '13px',
                              fontFamily: 'Gilroy',
                              fontWeight: 500,
                              color: '#4B4B4B',
                            }}
                          >
                            Email: {" "}
                            <span
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 600,
                                color: '#222222',
                              }}
                            >
                              {paymentinvoiceemail}

                            </span>
                          </p>


                          <p
                            className="mb-0"
                            style={{
                              fontSize: '13px',
                              fontFamily: 'Gilroy',
                              fontWeight: 500,
                              color: '#4B4B4B',
                            }}
                          >
                            Contact: {" "}
                            <span
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 600,
                                color: '#222222',
                              }}
                            >
                              {paymentmobilenum}
                            </span>
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                </div>}

              {selectedTab === "security_deposit_invoice" &&
                <><SecurityDepositInvoiceTemplate hostelid={hostelid} BillsTemplateList={BillsTemplateList} templateThemes={templateThemes} /> </>}

              {selectedTab === "rental_receipt" &&
                <> <RentalReceiptPdfTemplate hostelid={hostelid} BillsTemplateList={BillsTemplateList} templateReceiptThemes={templateReceiptThemes} /> </>
              }



            </Col>








          </Row>
        </>
      }



      {

        !canReadInvoice ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 90
              }}
            >

              <img
                src={Emptystate}
                alt="Empty State"

              />



              <ErrorMessage message={['You do not have access to view Bill Templates']} type="warning" />

            </div>
          </>
        ) :

          cardshow &&
          <>


            {global ?
              <div className=" py-2 col-md-12">

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
                  <h5 className="flex items-start gap-2 font-[Gilroy] text-[17px] font-semibold text-[rgba(34,34,34,1)]">
                    <img
                      src={leftarrow}
                      alt="leftarrow"
                      width={20}
                      height={20}
                      onClick={handleGlobalCloseForm}
                      className="cursor-pointer mt-[2px] shrink-0"
                    />

                    <span className="leading-[22px]">
                      Global Bill Settings
                    </span>
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
                      {fieldError && (
                        <div className="d-flex mb-5 mt-0 justify-content-center">
                          <ErrorMessage message={fieldError} type="error" />
                        </div>
                      )}

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
                              color: mobilenum ? "#000" : "rgba(75, 75, 75, 1)",
                              fontWeight: mobilenum ? 500 : 400,
                              borderRadius: 8,
                              outline: "none",
                              boxShadow: "none",
                            }}
                          />

                        </div>
                        {MobileError && (
                          <ErrorMessage message={MobileError} type="error" />
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
                            color: email ? "#000" : "rgba(75, 75, 75, 1)",
                            fontWeight: email ? 500 : 400,
                            whiteSpace: "nowrap",
                            height: 45
                          }}
                        />
                        {emailError && (
                          <ErrorMessage message={emailError} type="error" />
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
                          <ErrorMessage message={noChangesDetectedMsg} type="error" />
                        )}
                        {signature_errmsg.trim() !== "" && (
                          <ErrorMessage message={signature_errmsg} type="error" />
                        )}
                      </div>
                    </div>
                  </div>

                  {
                    savebuttonshow && (
                      <div className="d-flex justify-content-end mt-1 me-5" style={{ paddingRight: 10 }}>
                        <button disabled={!canUpdateInvoice} className="btn btn-outline-dark me-2" type="button" onClick={handleReset} style={{
                          fontWeight: 600,
                          borderRadius: 12,
                          fontSize: 16,
                          fontFamily: "Gilroy",
                          padding: 12,
                        }}
                        >
                          Reset
                        </button>
                        <button
                          disabled={!canUpdateInvoice}
                          className="btn" onClick={handleSaveTemplate} style={{
                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            borderRadius: 12,
                            fontSize: 16,
                            fontFamily: "Gilroy",
                            padding: 12,
                            color: "#FFF",


                          }} >
                          {BillsTemplateList.mobile ? "Update" : "Save"}
                        </button>
                      </div>
                    )

                    // : BillsTemplateList?.mobile && (
                    //   <div className="text-end me-5" style={{ paddingRight: 10 }}>
                    //     <button className="" type="button" onClick={handleShow}
                    //       style={{
                    //         backgroundColor: "#1E45E1",
                    //         fontWeight: 600,
                    //         borderRadius: 12,
                    //         fontSize: 16,
                    //         fontFamily: "Gilroy",
                    //         padding: 12,
                    //         color: "#FFF",
                    //         border: "1px solid #1E45E1"

                    //       }}>
                    //       Go to Templates →
                    //     </button>
                    //   </div>
                    // )
                  }



                  {/* {emailError && (
             <ErrorMessage message={emailError} type="error"/>
            )} */}


                </div>
              </div>
              :
              <div >
     <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">
  <label className="text-[18px] font-semibold text-[#222] font-gilroy">
    Bill Templates
  </label>
</div>


                <div
                  style={{

                    borderRadius: "10px",
                    padding: "15px",
                    backgroundColor: "#f9fbff",
                  }}
                >

                  <Card className="mb-3 shadow-sm border-0">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <div
                          style={{
                            padding: 10,
                            borderRadius: "50%",
                            backgroundColor: "#F0FDF4",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                            height: 40,
                          }}
                        >
                          <RiPercentLine style={{ color: "#00A63E", fontSize: 20 }} />
                        </div>

                        <div>

                          <h6 className=" mb-1"
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: 17,
                              color: "rgba(34, 34, 34, 1)",
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}>Global Bill Setting</h6>
                          <p className="text-muted mb-0"
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: 12,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }} >Add your basic billing details here</p>
                        </div>
                      </div>
                      <Button onClick={handleEditChange}
                        variant=""
                        className="d-flex align-items-center px-3"
                        style={{
                          backgroundColor: "#1E45E1",
                          fontWeight: 600,
                          borderRadius: 12,
                          fontSize: 16,
                          fontFamily: "Gilroy",
                          padding: 8,
                          color: "#FFF",
                          border: "1px solid #1E45E1"

                        }}
                      >
                        Edit <Edit size="16" className="ms-1" />
                      </Button>
                    </Card.Body>
                  </Card>


                  <Card className="shadow-sm border-0">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <div
                          style={{
                            padding: 10,
                            borderRadius: "50%",
                            backgroundColor: "#FAF5FF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 40,
                            height: 40,
                          }}
                        >
                          <FiCode style={{ color: "#9810FA", fontSize: 20 }} />
                        </div>
                        <div>
                          <h6 className=" mb-1" style={{
                            fontFamily: "Gilroy",
                            fontSize: 17,
                            color: "rgba(34, 34, 34, 1)",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}>Templates</h6>
                          <p className="text-muted mb-0" style={{
                            fontFamily: "Gilroy",
                            fontSize: 12,
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                          }}>
                            Fill the template form with details you like to customize.
                          </p>
                        </div>
                      </div>
                      {!BillsTemplateList?.mobile ? (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip className="custom-tooltip"
                              style={{
                                backgroundColor: "white",
                                color: "#222",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                border: "1px solid #E5E5E5",
                                boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                              }}
                            >
                              Set the Global bill settings before entering the Templates.
                            </Tooltip>
                          }
                        >
                          <span className="d-inline-block">
                            <Button
                              onClick={handleShow}
                              variant="primary"
                              disabled
                              className="d-flex align-items-center px-3"
                              style={{
                                backgroundColor: "#1E45E1",
                                fontWeight: 600,
                                borderRadius: 12,
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                padding: 8,
                                color: "#FFF",
                                border: "1px solid #1E45E1",
                                pointerEvents: "none",
                              }}
                            >
                              Go to Templates <FiArrowRight className="ms-2" />
                            </Button>
                          </span>
                        </OverlayTrigger>
                      ) : (
                        <Button
                          onClick={handleShow}
                          variant="primary"
                          className="d-flex align-items-center px-3"
                          style={{
                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            borderRadius: 12,
                            fontSize: 16,
                            fontFamily: "Gilroy",
                            padding: 8,
                            color: "#FFF",
                            border: "1px solid #1E45E1",
                          }}
                        >
                          Go to Templates <FiArrowRight className="ms-2" />
                        </Button>
                      )}


                    </Card.Body>
                  </Card>
                </div>
              </div>}
          </>
      }





      {bankaccountform && (


        <BankingAddForm showForm={bankaccountform}
          setShowForm={handleCloseFormBank}
          setEdit={() => { }}

        />


      )}





    </div>
  );
}
SettingInvoice.propTypes = {
  hostelid: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  // setIsInvoiceAddMode: PropTypes.func.isRequired,
  handleFormPage: PropTypes.func.isRequired,
}
export default withErrorBoundary(SettingInvoice);