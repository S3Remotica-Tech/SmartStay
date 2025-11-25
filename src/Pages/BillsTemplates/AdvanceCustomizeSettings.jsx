/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import Logo from '../../Assets/Images/get.png'
import Dial from '../../Assets/Images/dial.png'
import Room from '../../Assets/Images/Car.png'
import Locat from '../../Assets/Images/location 03.png'
import Barcode from '../../Assets/Images/invoice_barcode.svg'
import Gpay from '../../Assets/Images/gpay.png'
import Phonepe from '../../Assets/Images/phonepe.png'
import Paytm from '../../Assets/Images/paytm.png'
import Questionimage from '../../Assets/Images/question.png';
import EditICon from '../../Assets/Images/New_images/edit.png';
import TextAreaICon from '../../Assets/Images/textarea.png'
import BankICon from '../../Assets/Images/bank_white.png'
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CloseCircle } from "iconsax-react";
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import uploadsett from "../../Assets/Images/New_images/upload setting.png";
import ZoomImage from '../../Assets/Images/zoom.png'
import Topbottom from '../../Assets/Images/cancel_presentation.png';
import left85arrow from '../../Assets/Images/arrow85.png';
import printdown from '../../Assets/Images/printericon.png';
import downloadicon from '../../Assets/Images/pdfdown.png';
import CloseIcon from '../../Assets/Images/close_icon.png';
import PropTypes from "prop-types";
import BankingAddForm from "../BankingAddForm";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import { Location, Call, Profile, } from 'iconsax-react'
import { IoBed } from "react-icons/io5";
import { Container, Row, Col, Table } from "react-bootstrap";

const AdvanceCustomizeSettings = ({ BillsTemplateList, onTemplateChange }) => {

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
  const [loading, setLoading] = useState(false)
  const [editErrmsg, setEditErrMessage] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [contactnumberform, setContactNumberForm] = useState(false)

  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);

  const [accountNameError, setaccountnameError] = useState("");
  const [prefix_errmsg, setPrefixErrMsg] = useState('')
  const [suffix_errmsg, setSuffixErrMsg] = useState('')
  const [tax_errmsg, setTaxErrMsg] = useState('')
  const [notes_errmsg, setNotesErrMsg] = useState('')
  const [terms_errmsg, setTermsErrMsg] = useState('')
  const [showFullView, setShowFullView] = useState(false);

  const [mobilenum, setMobileNum] = useState("")
  const [MobileError, setMobileError] = useState("")
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const fileInputRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [signature_errmsg, setSignatureErrMsg] = useState("")
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

  const [bankaccountform, setBankAccountForm] = useState(false)

  const [allowImageUpload, setAllowImageUpload] = useState(false);
  const [allowEditFields, setAllowEditFields] = useState({
    contact: false,
    email: false,
    hostelLogo: false,
    digitalSignature: false,
  });

  const [edit, setEdit] = useState(false);



  // const canUpdateInvoice = useHasPermission("Bills", "canUpdate")










  const {
    // canWriteModule: canWriteInvoice,
    // canReadModule: canReadReceipt,
    canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");



  const handleCloseForm = () => {
    setBankAccountForm(false);
    setEdit(false);
  }

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




  const handleMobile = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setMobileNum(input);
    setEditErrMessage("")
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
    setEditErrMessage("")
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







  const defaultGradient = 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))';

  const [useGradient, setUseGradient] = useState(true);
  const [color, setColor] = useState({ r: 30, g: 69, b: 225, a: 1 });

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setUseGradient(false);
    setEditErrMessage("")
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
    setEditErrMessage("")
    if (Value.trim() !== "") {
      setPrefixErrMsg("");
    }
  }

  const hanldeSuffix = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setSuffix(numericValue)
    setEditErrMessage("")
    if (numericValue.trim() !== "") {
      setSuffixErrMsg("");
    }
  }




  const handleTaxChange = (e) => {
    const inputValue = e.target.value;
    setEditErrMessage("")
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





  const handleFileSignatureChange = (e) => {
    const file = e.target.files[0];
    setEditErrMessage("")
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
    setEditErrMessage("")
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };


  const handleSignatureDone = () => {
    if (!signature) {
      setSignatureErrMsg("Please select a signature file.");
    } else {
      setEditErrMessage("")
      setSignatureErrMsg("");
      setIsSignatureConfirmed(true);
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


  ;





  const handleAddBankAccount = () => {
    setBankAccountForm(true)
    setEditErrMessage("")
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
    if (state.bankingDetails.bankingList) {
      setBanking(state.bankingDetails.bankingList.listBanks)
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.bankingList]);


  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 200) {
      setAccountName("")
      setAccount_Number("")
      setIfscCode("")
      setBankName("")
      setDescription("")
      handleCloseBankAccount();

      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBanking]);








  const handleBankClick = (id) => {
      setEditErrMessage("")
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




  useEffect(() => {
    if (showFullView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showFullView]);


  const [logoPreview, setLogoPreview] = useState(null);
  const [hostel_logo, setHostelLogo] = useState(null)


  const handleFileUploadHostel = (e) => {
    if (!allowImageUpload) return;
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setEditErrMessage("")
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };

      reader.readAsDataURL(file);
      setHostelLogo(file)
    }
  };



  const [qrImage, setQrImage] = useState(null);
  const [qrimagepreview, setQRImagePreview] = useState(null)
  const qrFileInputRef = useRef(null);

  const handleQrImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setQRImagePreview(file)
      setQrImage(URL.createObjectURL(file));
      setEditErrMessage("")
    }
  };



  const handleSaveTemplate = () => {

    const currentTemplate = {
      // hostelId: state.login.selectedHostel_Id,
      // templateTypeId: securityDepositInvoiceTemplate.typeId,
      // mobile: BillsTemplateList.mobile,
      // email: BillsTemplateList.emailId,
      // invoicePhoneNumber: mobilenum,
      // invoiceMailId: email,
      // isMobileCustomized: BillsTemplateList?.isMobileCustomized,
      // isEmailCustomized: BillsTemplateList?.isMailIdCustomized,
      // isLogoCustomized: BillsTemplateList?.isLogoCustomized,
      // isSignatureCustomized: BillsTemplateList?.isSignatureCustomized,
      // hostelLogo: BillsTemplateList?.logo,
      // billSignature: BillsTemplateList?.signature,
      // invLogo: hostel_logo,
      // invSign: signature,
      qrCode: qrimagepreview,
      prefix: prefix,
      suffix: suffix,
      gstPercentile: tax,
      invoiceNotes: notes,
      invoiceTermsAndCondition: terms,
      bankId: selectedBankId || "",
      invoiceTemplateColor: useGradient
        ? defaultGradient
        : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
    };

    const oldTemplate = {
      // hostelId: state.login.selectedHostel_Id,
      // templateTypeId: securityDepositInvoiceTemplate.typeId,
      // mobile: BillsTemplateList.mobile,
      // email: BillsTemplateList.emailId,
      // invoicePhoneNumber: securityDepositInvoiceTemplate.contact_number || "",
      // invoiceMailId: securityDepositInvoiceTemplate.email || "",
      // isMobileCustomized: BillsTemplateList?.isMobileCustomized,
      // isEmailCustomized: BillsTemplateList?.isMailIdCustomized,
      // isLogoCustomized: BillsTemplateList?.isLogoCustomized,
      // isSignatureCustomized: BillsTemplateList?.isSignatureCustomized,
      // hostelLogo: BillsTemplateList?.logo,
      // billSignature: BillsTemplateList?.signature,
      // invLogo: securityDepositInvoiceTemplate.logo_url || null,
      // invSign: securityDepositInvoiceTemplate.invoiceSignatureUrl || null,
      qrCode: securityDepositInvoiceTemplate.qrCodeUrl || null,
      prefix: securityDepositInvoiceTemplate.prefix || "",
      suffix: securityDepositInvoiceTemplate.suffix || "",
      gstPercentile: securityDepositInvoiceTemplate.gstPercentile || "",
      invoiceNotes: securityDepositInvoiceTemplate.invoiceNotes || "",
      invoiceTermsAndCondition: securityDepositInvoiceTemplate.invoiceTermsAndCondition || "",
      bankId: securityDepositInvoiceTemplate.selectedBankId || "",
      invoiceTemplateColor: securityDepositInvoiceTemplate.invoiceTemplateColor || "",
    };



    const normalize = (val) => {
      if (val === null || val === undefined) return "";
      const v = String(val).trim();
      return v === "null" || v === "undefined" ? "" : v;
    };



    const isChanged =
      normalize(currentTemplate.qrCode) !== normalize(oldTemplate.qrCode) ||
      normalize(currentTemplate.prefix) !== normalize(oldTemplate.prefix) ||
      normalize(currentTemplate.suffix) !== normalize(oldTemplate.suffix) ||
      normalize(currentTemplate.gstPercentile) !== normalize(oldTemplate.gstPercentile) ||
      normalize(currentTemplate.invoiceNotes) !== normalize(oldTemplate.invoiceNotes) ||
      normalize(currentTemplate.invoiceTermsAndCondition) !== normalize(oldTemplate.invoiceTermsAndCondition) ||
      normalize(currentTemplate.bankId) !== normalize(oldTemplate.bankId) ||
      normalize(currentTemplate.invoiceTemplateColor) !== normalize(oldTemplate.invoiceTemplateColor);





    if (!isChanged) {
      setEditErrMessage("No changes detected");
      setSignatureErrMsg("")
      return;
    }

    if (securityDepositInvoiceTemplate.isSignatureCustomized) {
      const Signatureverify = !securityDepositInvoiceTemplate.invoiceSignatureUrl

      if (signature && !isSignatureConfirmed && Signatureverify) {
        setSignatureErrMsg("Please click Done after selecting a signature");
        return
      }
    }

    if (securityDepositInvoiceTemplate.isMobileCustomized) {
      if (mobilenum && mobilenum.length < 10) {
        setMobileError(" Please Enter Valid Mobile Number");
        return
      }
      else if (mobilenum.length === 10) {
        setMobileError("");
      }
    }

    if (securityDepositInvoiceTemplate.isMailIdCustomized) {
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



    if (securityDepositInvoiceTemplate.typeId && state.login.selectedHostel_Id) {
      dispatch({
        type: "ADDGLOBALSETTING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          templateTypeId: securityDepositInvoiceTemplate.typeId,
          mobile: BillsTemplateList.mobile,
          email: BillsTemplateList.emailId,
          invoicePhoneNumber: mobilenum,
          invoiceMailId: email,
          isMobileCustomized: BillsTemplateList?.isMobileCustomized,
          isEmailCustomized: BillsTemplateList?.isMailIdCustomized,
          isLogoCustomized: BillsTemplateList?.isLogoCustomized,
          isSignatureCustomized: BillsTemplateList?.isSignatureCustomized,
          hostelLogo: BillsTemplateList?.logo,
          billSignature: BillsTemplateList?.signature,
          invLogo: hostel_logo,
          invSign: signature,
          qrCode: qrimagepreview,
          prefix: prefix,
          suffix: suffix,
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






  useEffect(() => {
    if (state.Settings?.settingsBillsAddTemplateSucesscode === 200) {

      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BILLS_TEMPLATE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsBillsAddTemplateSucesscode]);

  //   useEffect(() => {
  //        if (state.Settings?.SettingsBilltemplategetsuccessCode === 200) {

  //   setBillsTemplateList(state.Settings.settingsBillsTemplateList)
  //     setTimeout(() => {
  //         setLoading(false)
  //       dispatch({ type: "CLEAR_GET_TEMPLATELIST_STATUS_CODE" });
  //     }, 500);
  //   }
  // }, [state.Settings.SettingsBilltemplategetsuccessCode]);

  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetErrorCode === 500) {
      setTimeout(() => {
        setLoading(false)
        dispatch({ type: "CLEAR_ERROR_TEMPLATELIST_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.SettingsBilltemplategetErrorCode]);



  const securityDepositInvoiceTemplate = BillsTemplateList && BillsTemplateList.templates?.find(
    (template) => template.type === "ADVANCE"
  );






  useEffect(() => {
    if (securityDepositInvoiceTemplate) {
      setLogoPreview(BillsTemplateList.isLogoCustomized
        && securityDepositInvoiceTemplate.invoiceLogoUrl ? securityDepositInvoiceTemplate.invoiceLogoUrl
        : BillsTemplateList.logo);
      setHostelLogo(
        BillsTemplateList.isLogoCustomized
          && securityDepositInvoiceTemplate.invoiceLogoUrl ? securityDepositInvoiceTemplate.invoiceLogoUrl
          : BillsTemplateList.logo
      );
      setMobileNum(
        BillsTemplateList.isMobileCustomized
          && securityDepositInvoiceTemplate.invoiceMobileNumber ? securityDepositInvoiceTemplate.invoiceMobileNumber
          : BillsTemplateList.mobile
      );
      setEmail(
        BillsTemplateList.isMailIdCustomized
          && securityDepositInvoiceTemplate.invoiceMailId ? securityDepositInvoiceTemplate.invoiceMailId
          : BillsTemplateList.emailId
      );
      setPrefix(securityDepositInvoiceTemplate.prefix || "");
      setSuffix(securityDepositInvoiceTemplate.suffix || "");
      setSignature(
        BillsTemplateList.isSignatureCustomized
          && securityDepositInvoiceTemplate.invoiceSignatureUrl ? securityDepositInvoiceTemplate.invoiceSignatureUrl
          : BillsTemplateList.signature
      );
      setSignaturePreview(BillsTemplateList.isSignatureCustomized
        && securityDepositInvoiceTemplate.invoiceSignatureUrl ? securityDepositInvoiceTemplate.invoiceSignatureUrl
        : BillsTemplateList.signature);
      setTerms(securityDepositInvoiceTemplate.invoiceTermsAndCondition || "");
      setTax(securityDepositInvoiceTemplate.gstPercentile || "");
      setSelectedBankId(securityDepositInvoiceTemplate.selectedBankId || null);
      setQrImage(securityDepositInvoiceTemplate.qrCodeUrl || null);
      setQRImagePreview(securityDepositInvoiceTemplate.qrCodeUrl || null);
      setNotes(securityDepositInvoiceTemplate.invoiceNotes || "");

      const templateTheme = securityDepositInvoiceTemplate.invoiceTemplateColor;
      if (templateTheme && templateTheme.trim() !== "") {
        if (templateTheme.includes("rgba")) {
          const match = templateTheme.match(
            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)/
          );
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
  }, [securityDepositInvoiceTemplate]);

  useEffect(() => {
    if (state.Settings.settingGlobalAddStatusCode === 200) {
      setFormLoading(false)
      setLoading(false)
      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_GLOBAL_SETTINGS" });
      }, 1000);
    }

  }, [state.Settings.settingGlobalAddStatusCode])


 


  useEffect(() => {
    onTemplateChange({
      logoPreview,
      mobilenum,
      email,
      signaturePreview,
      prefix,
      suffix,
      tax,
      qrImage,
      notes,
      terms,
      color,
    });
  }, [logoPreview,
    mobilenum,
    email,
    signaturePreview,
    prefix,
    suffix,
    tax,
    qrImage,
    notes,
    terms,
    color,]);














  return (
    <>

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


      <div className="row g-0">


        <div className="col-lg-12 show-scrolls" style={{
          maxHeight: 650,
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
                                className="rounded mt-2 d-flex justify-content-center align-items-center"
                                style={{
                                  height: '120px', borderStyle: 'dotted', borderWidth: '3px',
                                  borderColor: '#ced4da'
                                }}
                              >
                                {signaturePreview ? (
                                  <img src={signaturePreview} alt="signature" style={{ maxHeight: '100%', maxWidth: '100%' }} />
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



          <p style={{ fontFamily: 'Gilroy', fontSize: 17, fontWeight: 600, }}>Form Specific Details</p>
          <p style={{ fontFamily: 'Gilroy', fontSize: 13, fontWeight: 400, color: 'rgba(99, 109, 148, 1)' }}>{`Fill the form with details you'd like to customize.`}</p>

          <div className="border p-3 mb-3 col-lg-12" style={{ borderRadius: '10px', overflowY: 'auto', }}>

            <div>
              <p style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                Invoice No</p>
              <hr></hr>
            </div>

            <div className='d-flex row g-0 '>
              <div className='col-lg-11'>
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

              <div className='col-lg-11 '>
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

            <div className='col-lg-11 '>
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

          <div className="border p-3 mb-3 col-lg-12 " style={{ borderRadius: '10px', overflowY: 'auto', }}>

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
                  <div key={bank.bankingId} style={{ marginBottom: 15, cursor: 'pointer' }} onClick={() => handleBankClick(bank.bankingId)}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="radio"
                        name="bank"
                        checked={selectedBankId === bank.bankingId}
                        onChange={() => handleBankClick(bank.bankingId)}
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


          </div>

          <div className="border p-3 mb-3 col-lg-12" style={{ borderRadius: "10px", overflowY: "auto" }}>
            <div>
              <p
                style={{
                  fontFamily: "Gilroy",
                  color: "rgba(34, 34, 34, 1)",
                  fontSize: 14,
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: "normal",
                }}
              >
                Upload QR
              </p>
              <hr />
            </div>

            <p
              style={{
                fontFamily: "Gilroy",
                fontSize: 12,
                fontWeight: 400,
                color: "rgba(75, 75, 75, 1)",
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              Valid UPI QR Code for Payment Easy
            </p>

            <div className="col-12">
              <div
                className="p-3 border rounded"
                style={{ backgroundColor: "#f9f9f9", textAlign: "center" }}
              >
                {qrImage ? (
                  <img
                    src={qrImage}
                    alt="QR Preview"
                    style={{
                      height: "100px",
                      width: "100px",
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

                <div>
                  <label
                    style={{
                      cursor: "pointer",
                      color: "rgba(30, 69, 225, 1)",
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
                    Choose file
                    <input
                      type="file"
                      accept="image/*"
                      className="d-none"
                      ref={qrFileInputRef}
                      onChange={handleQrImageChange}
                    />
                  </label>
                  <span
                    className="ms-1"
                    style={{
                      color: "rgba(22, 21, 28, 1)",
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      fontWeight: 400,
                    }}
                  >
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
                    marginTop: "5px",
                  }}
                >
                  JPG SVG PNG (150px × 150px)
                </small>
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
                style={{ fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
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
                style={{ fontFamily: 'Gilroy', fontSize: 12, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
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
            <h6 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color: 'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal', marginBottom: 12 }}>Template Theme</h6>

            <RgbaColorPicker color={color} onChange={handleColorChange} style={{ width: "100%", }} />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
              <input value={hexValue} readOnly style={{ width: 80, textAlign: "center", border: "1px solid #ccc", borderRadius: 4, fontFamily: 'Gilroy', fontSize: 12, }} />
              <input value={color.r} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4, fontFamily: 'Gilroy', fontSize: 12, }} />
              <input value={color.g} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4, fontFamily: 'Gilroy', fontSize: 12, }} />
              <input value={color.b} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4, fontFamily: 'Gilroy', fontSize: 12, }} />
              <input value={alphaValue} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4, fontFamily: 'Gilroy', fontSize: 12, }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginTop: 4, marginBottom: 12 }}>
              <span style={{ width: 80, textAlign: "center", fontFamily: 'Gilroy', fontSize: 12, }}>Hex</span>
              <span style={{ width: 40, textAlign: "center", fontFamily: 'Gilroy', fontSize: 12, }}>R</span>
              <span style={{ width: 40, textAlign: "center", fontFamily: 'Gilroy', fontSize: 12, }}>G</span>
              <span style={{ width: 40, textAlign: "center", fontFamily: 'Gilroy', fontSize: 12, }}>B</span>
              <span style={{ width: 40, textAlign: "center", fontFamily: 'Gilroy', fontSize: 12, }}>A</span>
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

      {bankaccountform && (

        <BankingAddForm showForm={bankaccountform}
          setShowForm={handleCloseForm}
          setEdit={setEdit}


        />

      )}
    </>
  )
}
AdvanceCustomizeSettings.propTypes = {
  hostelid: PropTypes.func.isRequired,

}
export default AdvanceCustomizeSettings;