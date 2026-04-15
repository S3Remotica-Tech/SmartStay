/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../Pages/Settings/Settings.css";
import { useDispatch, useSelector } from "react-redux";
// import Questionimage from '../../Assets/Images/question.png';
import EditICon from '../../Assets/Images/New_images/edit.png';
import TextAreaICon from '../../Assets/Images/textarea.png'
import BankICon from '../../Assets/Images/bank_white.png'
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import uploadsett from "../../Assets/Images/New_images/upload setting.png";
import PropTypes from "prop-types";
import BankingAddForm from "../../Pages/Banking/BankingAddForm";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import { Trash } from 'iconsax-react'


const AdvanceCustomizeSettings = ({ BillsTemplateList, onTemplateChange }) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [selectedDate, setSelectedDate] = useState(null);
  const [invoicedueDate, setInvoiceDueDate] = useState('');
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [tax, setTax] = useState("");
  const [banking, setBanking] = useState([])
  const [selectedBankId, setSelectedBankId] = useState(null);

  const [editErrmsg, setEditErrMessage] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [contactnumberform, setContactNumberForm] = useState(false)


  const [prefix_errmsg, setPrefixErrMsg] = useState('')
  const [suffix_errmsg, setSuffixErrMsg] = useState('')
  const [tax_errmsg, setTaxErrMsg] = useState('')
  const [notes_errmsg, setNotesErrMsg] = useState('')
  const [terms_errmsg, setTermsErrMsg] = useState('')


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


  useEffect(() => {
    setEdit(false)
  }, [])



  const {
    // canWriteModule: canWriteInvoice,
    // canReadModule: canReadReceipt,
    canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");



  const handleCloseForm = () => {
    setBankAccountForm(false);
    // setEdit(false);
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



  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetErrorCode === 500) {
      setTimeout(() => {
        // setLoading(false)
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
        && securityDepositInvoiceTemplate.invoiceLogoUrl && securityDepositInvoiceTemplate.invoiceLogoUrl
      );
      setHostelLogo(
        BillsTemplateList.isLogoCustomized
        && securityDepositInvoiceTemplate.invoiceLogoUrl && securityDepositInvoiceTemplate.invoiceLogoUrl

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
        && securityDepositInvoiceTemplate.invoiceSignatureUrl && securityDepositInvoiceTemplate.invoiceSignatureUrl

      );
      setSignaturePreview(BillsTemplateList.isSignatureCustomized
        && securityDepositInvoiceTemplate.invoiceSignatureUrl && securityDepositInvoiceTemplate.invoiceSignatureUrl
      );
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
      // setLoading(false)
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




  const handleRemoveQr = () => {

    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: 'DELETETEMPLATESIMAGES', payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: securityDepositInvoiceTemplate?.typeId,
          type: "QRCODE"

        }
      })
    }
  };

  const handleLocalRemoveQr = () => {
    if (qrImage?.startsWith("blob:")) {
      URL.revokeObjectURL(qrImage);
    }

    setQrImage(null);
  };




  const handleDeleteLogo = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: 'DELETETEMPLATESIMAGES', payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: securityDepositInvoiceTemplate?.typeId,
          type: "INVOICE-LOGO"

        }
      })
    }
  }

  const handleLocalDeleteLogo = () => {
    if (logoPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(logoPreview);
    }

    setLogoPreview(null);
  };




  const handleDeleteRentalSignature = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: 'DELETETEMPLATESIMAGES', payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: securityDepositInvoiceTemplate?.typeId,
          type: "INVOICE-SIGNATURE"

        }
      })
    }
  }

  const handleLocalDeleteSignature = () => {
    if (signaturePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(signaturePreview);
    }

    setSignaturePreview(null);
  };




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
      {formLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-[1050]">
          <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}


      <div className="grid grid-cols-1 gap-0">
        <div className="show-scrolls overflow-y-auto overflow-x-hidden max-h-[650px]">

          {(
            BillsTemplateList?.isSignatureCustomized ||
            BillsTemplateList?.isMobileCustomized ||
            BillsTemplateList?.isMailIdCustomized ||
            BillsTemplateList?.isLogoCustomized
          ) &&

            (
              <>
                <p className="font-gilroy text-[17px] font-semibold">
                  Inherited Global Details
                </p>

                <div className="border rounded-[10px] p-2.5 pt-2 pb-3 mb-3 col-span-12 overflow-y-auto">
                  <div className="flex justify-end">
                    <img
                      src={EditICon}
                      onClick={handleShowContactNumberForm}
                      className="cursor-pointer"
                      alt="editicon"
                    />
                  </div>
                  {BillsTemplateList?.isLogoCustomized &&
                    <div className="w-full">

                      <div className="flex justify-between items-center mb-[6px]">
                        <label className="font-semibold font-gilroy">Hostel/PG Logo</label>
                      </div>

                      <div className="p-3 border rounded bg-[#F0F3FF] text-center">
                        <div className="flex justify-center">
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
                              <>
                                <div className="qr-overlay absolute inset-0 hidden bg-black/40 rounded-md" />
                                <div
                                  className="qr-trash absolute -top-1 -right-1 hidden flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer"
                                  onClick={() => {
                                    const isLocal =
                                      logoPreview?.startsWith("data:") ||
                                      logoPreview?.startsWith("blob:");
                                    if (isLocal) handleLocalDeleteLogo();
                                    else handleDeleteLogo();
                                  }}
                                >
                                  <div className="bg-black/70 text-white p-2 rounded-full">
                                    <Trash size={10} />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center justify-center">
                          <label
                            className={`font-gilroy text-[12px] font-normal ${allowEditFields.hostelLogo
                              ? "cursor-pointer text-[#1E45E1]"
                              : "cursor-not-allowed text-[#999]"
                              }`}
                          >
                            Choose file
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              ref={fileInputRef}
                              onChange={handleFileUploadHostel}
                              disabled={!allowEditFields.hostelLogo}
                            />
                          </label>
                          <span className="ml-1 font-gilroy text-[12px] font-normal text-[#16151C]">
                            to Upload
                          </span>
                        </div>
                        <small className="block mt-1 font-gilroy text-[9px] font-normal text-[#4B4B4B]">
                          Must be in PNG Format (600px × 300px)
                        </small>
                      </div>
                    </div>
                  }

                  {BillsTemplateList?.isMobileCustomized &&
                    <div className="p-3 col-span-12 rounded-[10px] overflow-y-auto">
                      <div className="flex flex-col w-full">
                        <div className="col-span-12">
                          <div className="w-full font-gilroy text-[14px] font-medium">

                            <div className="flex justify-between items-center mb-[6px]">
                              <label className="font-semibold">Contact Number</label>
                            </div>

                            <div className="flex items-center bg-[#F0F3FF] rounded-[8px] px-3 py-2 border border-[#E0E0E0]">

                              <select
                                className={`border-none bg-transparent font-inherit text-inherit font-medium pr-4 appearance-none cursor-pointer outline-none 
              bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1L6 6L11 1\' stroke=\'%23666\' stroke-width=\'2\'/%3E%3C/svg%3E')] bg-no-repeat bg-right-center bg-[length:10px]`}
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
                                className="border-none bg-transparent outline-none ml-2 font-inherit text-inherit font-medium flex-1"
                                value={mobilenum}
                                onChange={handleMobile}
                                maxLength={10}
                                disabled={!allowEditFields.contact}
                              />
                            </div>

                            {MobileError && <ErrorMessage message={MobileError} type="error" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  }


                  {BillsTemplateList?.isMailIdCustomized &&
                    <div className="p-3 col-span-12 rounded-[10px] overflow-y-auto">
                      <div className="flex flex-col w-full">
                        <div className="col-span-12">
                          <div className="w-full font-gilroy text-[14px] font-medium">
                            <div className="flex justify-between items-center mb-[6px]">
                              <label className="font-semibold">E-Mail Address</label>
                            </div>

                            <div className="flex items-center bg-[#F0F3FF] rounded-[8px] px-3 py-2 border border-[#E0E0E0]">
                              <input
                                type="email"
                                placeholder="abc@gmail.com"
                                className="ml-2 flex-1 border-none bg-transparent outline-none font-inherit text-inherit font-medium"
                                disabled={!allowEditFields.email}
                                value={email}
                                onChange={handleEmail}
                              />
                            </div>

                            {emailError && <ErrorMessage message={emailError} type="error" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                  {BillsTemplateList?.isSignatureCustomized &&
                    <div className="p-3 col-span-12 rounded-[10px] overflow-y-auto">
                      <div className="flex flex-col w-full">
                        <div className="col-span-12">
                          <div className="w-full font-gilroy text-[14px] font-medium">
                            <div className="flex justify-between items-center mb-[6px]">
                              <label className="font-semibold">Digital Signature Upload</label>
                            </div>

                            <div className="col-span-12">
                              <div
                                className="relative mt-2 flex items-center justify-center h-[120px] rounded border-3 border-dotted border-[#ced4da] group"
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
                                  <span className="text-[14px] font-normal text-[rgba(34,34,34,1)] font-gilroy">
                                    No signature uploaded
                                  </span>
                                )}

                                {signaturePreview && (
                                  <>
                                    <div className="qr-overlay absolute inset-0 bg-black/40 hidden rounded" />
                                    <div
                                      className="qr-trash absolute -top-1 -right-1 hidden flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer hidden"

                                      onClick={() => {
                                        const isLocal =
                                          signaturePreview?.startsWith("data:") ||
                                          signaturePreview?.startsWith("blob:");
                                        if (isLocal) {
                                          handleLocalDeleteSignature();
                                        } else {
                                          handleDeleteRentalSignature();
                                        }
                                      }}
                                    >
                                      <div className="bg-black/70 text-white p-2 rounded-full">
                                        <Trash size={12} />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              <div className="flex flex-col justify-between items-center mt-2">
                                <div className="flex flex-row items-center">
                                  <label
                                    className={`font-gilroy text-[12px] font-normal ${allowEditFields.digitalSignature ? 'text-[#1E45E1] cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                                      }`}
                                  >
                                    Choose file
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      ref={fileInputRef}
                                      onChange={handleFileSignatureChange}
                                      disabled={!allowEditFields.digitalSignature}
                                    />
                                  </label>
                                  <span className="font-gilroy ml-1 text-[12px] font-normal text-[rgba(22,21,28,1)]" >
                                    to Upload Image
                                  </span>
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
                    className="logout-card flex justify-center items-center"
                    dialogClassName="custom-modal-width"
                  >
                    <Modal.Header className="!border-0">
                      <Modal.Title className="text-[18px] font-gilroy font-semibold text-center text-[#222222] flex-1 pt-5">
                        Override Global Value?
                      </Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="text-[14px] font-gilroy font-medium text-[#646464] text-center px-5">
                      You’re changing this field only for this bill.
                      It won’t affect the main settings.
                    </Modal.Body>


                    <Modal.Footer className="!justify-center !border-t-0 !pb-5">
                      <Button
                        className="!w-[160px] !h-[52px] !rounded-[10px] !px-5 !py-3 !bg-white !text-[rgba(111,108,143,1)] !font-gilroy !font-semibold !border !border-gray-500 !mr-2.5"
                        onClick={handleCloseContactNumberForm}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="!w-[160px] !h-[52px] !rounded-[10px] !px-5 !py-3 !bg-[#1E45E1] !text-white !font-gilroy !font-semibold"
                        onClick={handleEditAnyway}
                      >
                        Edit Anyway
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>

              </>
            )}

          <p className="font-gilroy font-semibold text-xl mb-0">
            Form Specific Details
          </p>
          <p className="font-gilroy font-normal text-[#1232b4] text-sm">
            Fill the form with details you'd like to customize.
          </p>

          <div className="border rounded-[10px] p-3 mb-3 max-h-[500px] overflow-y-auto w-full">
            <div>
              <p className="font-gilroy text-sm font-normal text-[#222222]">Invoice No</p>
              <hr className="border-gray-700" />
            </div>

            <div className="flex flex-wrap -mx-2 gap-4">
              <div className="flex-1 px-2 min-w-[200px]">
                <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                  Prefix
                </label>
                <input
                  type="text"
                  placeholder="prefix"
                  value={prefix}
                  onChange={hanldePrefix}
                  className="w-full px-3 py-2 text-base text-[#4B4B4B] font-gilroy font-normal rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {prefix_errmsg.trim() !== "" && (
                  <ErrorMessage message={prefix_errmsg} type="error" />
                )}
              </div>

              <div className="flex-1 px-2 min-w-[200px]">
                <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                  Suffix
                </label>
                <input
                  type="text"
                  placeholder="suffix"
                  value={suffix}
                  onChange={hanldeSuffix}
                  className="w-full px-3 py-2 text-sm text-[#4B4B4B] font-gilroy font-normal rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {suffix_errmsg.trim() !== "" && (
                  <ErrorMessage message={suffix_errmsg} type="error" />
                )}
              </div>
            </div>

            <div className="px-2 mt-4">
              <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                Preview
              </label>
              <input
                type="text"
                placeholder="preview"
                value={`${prefix}-${suffix}`}
                readOnly
                className="w-full px-3 py-2 text-base text-[#4B4B4B] font-gilroy font-normal rounded border border-gray-300 bg-gray-100 cursor-not-allowed"
              />
            </div>

          </div>

          <div className="border rounded-lg p-3 mb-3 w-full max-h-[500px] overflow-y-auto">

            <div>
              <p className="font-gilroy text-sm font-normal text-[#222222]">
                PG Tax Payable
              </p>
              <hr className="border-gray-700" />
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2">
                <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                  Add the Tax payable GST in Percentage %
                </label>
                <input
                  type="text"
                  placeholder="12%"
                  value={tax}
                  onChange={handleTaxChange}
                  className="w-full px-3 py-2 text-base text-[#4B4B4B] font-gilroy font-normal rounded border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-2"
                />
                {tax_errmsg.trim() !== "" && (
                  <ErrorMessage message={tax_errmsg} type="error" />
                )}
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 mb-6 w-full font-gilroy">

            <div className="flex justify-between items-center mb-2">
              <p className="text-base text-[#222222] font-normal whitespace-nowrap m-0">
                Account Details
              </p>
              {banking && banking.length > 0 && (
                <button
                  onClick={handleAddBankAccount}
                  className="text-sm font-normal text-white !bg-[#1E45E1] !border !border-[#1E45E1] rounded-lg w-[106px] h-[35px] hover:bg-blue-700"
                >
                  Add
                </button>
              )}
            </div>

            <hr className="!border !border-gray-700 mb-2" />

            <div className="max-h-[180px] overflow-y-auto space-y-3 show-scrolls">
              {banking && banking.length > 0 ? (
                banking.map((bank) => (
                  <div
                    key={bank.bankingId}
                    className="cursor-pointer"
                    onClick={() => handleBankClick(bank.bankingId)}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="bank"
                        checked={selectedBankId === bank.bankingId}
                        onChange={() => handleBankClick(bank.bankingId)}
                        className="accent-[#1E45E1] w-4 h-4"
                      />
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#1E45E1] flex items-center justify-center text-white">
                          <img src={BankICon} alt="bankicon" className="w-[17px] h-[17px] mb-1" />
                        </div>

                        <div>
                          <div className="font-semibold text-sm">{bank.bankName || 'Bank Name'}</div>
                          <div className="text-xs text-gray-500">
                            {bank.accountHolderName || 'Beneficiary'} / Savings A/C
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <p className="text-sm font-normal text-gray-500">No Bank accounts are there!</p>
                  <button
                    onClick={handleAddBankAccount}
                    className="text-sm font-normal text-white bg-[#1E45E1] border border-[#1E45E1] rounded-lg w-[106px] h-[35px] hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

          </div>


          <div className="border p-3 mb-3 w-full rounded-lg overflow-y-auto font-gilroy">

            <div>
              <p className="text-sm font-normal text-[#222222]">Upload QR</p>
              <hr className="border-gray-700" />
            </div>

            <p className="text-xs font-normal text-[#4B4B4B] mb-2">
              Valid UPI QR Code for Payment Easy
            </p>


            <div className="w-full">
              <div className="flex items-center justify-center p-3 border rounded bg-gray-100">

                <div
                  className="relative w-full max-w-[100px] aspect-square bg-white rounded-lg flex items-center justify-center"
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
                        className="w-full h-full object-contain rounded-lg bg-white mb-2 z-10"
                      />
                      <div className="qr-overlay hidden absolute inset-0 bg-black/15 rounded-lg z-20 pointer-events-none" />
                      <div
                        className="qr-trash hidden absolute flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer z-30"
                        onClick={() => {
                          const isLocal = qrImage?.startsWith("data:") || qrImage?.startsWith("blob:");
                          if (isLocal) handleLocalRemoveQr();
                          else handleRemoveQr();
                        }}
                      >
                        <Trash size={12} />
                      </div>
                    </>
                  ) : (
                    <img src={uploadsett} alt="upload" className="h-[30px] mb-2" />
                  )}
                </div>

                <div className="flex flex-col ml-3">
                  <div>
                    <label className="cursor-pointer text-xs font-normal text-[#1E45E1]">
                      Choose file
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={qrFileInputRef}
                        onChange={handleQrImageChange}
                      />
                    </label>
                    <span className="ml-1 text-xs font-normal text-[#161514]">to Upload</span>
                  </div>

                  <small className="block mt-1 text-[9px] font-normal text-[#4B4B4B]">
                    JPG SVG PNG (150px × 150px)
                  </small>
                </div>

              </div>
            </div>

          </div>

          <div className="p-3 mb-3 border rounded-lg w-full font-gilroy">

            <h6 className="text-sm font-normal text-[#222222]">Notes</h6>
            <hr className="border-gray-700" />

            <label className="block text-sm font-normal text-[#222222] mb-1">
              Add Notes
            </label>

            <div className="relative">
              <textarea
                rows={4}
                placeholder="Add any message..."
                value={notes}
                onChange={handleNotesChange}
                className="form-control w-full px-3 py-2 !text-sm font-normal text-[#222222] resize-none pr-12 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <img
                src={TextAreaICon}
                alt="textarea_icon"
                className="absolute right-3 top-3 pointer-events-none"
              />
            </div>

            {notes_errmsg.trim() !== "" && (
              <ErrorMessage message={notes_errmsg} type="error" />
            )}

          </div>

          <div className="p-3 mb-3 border rounded-lg w-full font-gilroy">

            <h6 className="text-sm font-normal text-[#222222]">Terms & Condition</h6>
            <hr className="border-gray-700" />

            <label className="block text-sm font-normal text-[#222222] mb-1">Add T&C</label>

            <div className="relative">
              <textarea
                rows={4}
                placeholder="Add any message..."
                value={terms}
                onChange={handleTermsChange}
                className="h-18 form-control w-full px-3 py-2 !text-xs font-normal text-[#222222] resize-none pr-12 !border !border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <img
                src={TextAreaICon}
                alt="textarea-icon"
                className="absolute right-3 top-3 pointer-events-none"
              />
            </div>

            {terms_errmsg.trim() !== "" && (
              <ErrorMessage message={terms_errmsg} type="error" />
            )}

          </div>

          <div className="w-full border p-4 rounded-lg font-gilroy">
            <h6 className="font-gilroy mb-3 text-[14px] font-normal">
              Template Theme
            </h6>


            <div className="w-full">
              <RgbaColorPicker
                color={color}
                onChange={handleColorChange}
                style={{ width: "100%" }}
              />
            </div>

             <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-between">
              <input
                value={hexValue}
                readOnly
                className="w-20 text-center border border-gray-300 rounded"
              />
              <input
                value={color.r}
                readOnly
                className="w-10 text-center border border-gray-300 rounded"
              />
              <input
                value={color.g}
                readOnly
                className="w-10 text-center border border-gray-300 rounded"
              />
              <input
                value={color.b}
                readOnly
                className="w-10 text-center border border-gray-300 rounded"
              />
              <input
                value={alphaValue}
                readOnly
                className="w-10 text-center border border-gray-300 rounded"
              />
            </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-between text-[12px] text-gray-600 mt-1 mb-3">
              <span className="w-20 text-center">Hex</span>
              <span className="w-10 text-center">R</span>
              <span className="w-10 text-center">G</span>
              <span className="w-10 text-center">B</span>
              <span className="w-10 text-center">A</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {presetColors.map((preset, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const r = parseInt(preset.substr(1, 2), 16);
                    const g = parseInt(preset.substr(3, 2), 16);
                    const b = parseInt(preset.substr(5, 2), 16);
                    setColor({ r, g, b, a: 1 });
                  }}
                 
                  className={`w-6 h-6 rounded-[20%] cursor-pointer 
                    ${preset.toLowerCase() === '#ffffff' ? '!border !border-gray-300' : ''} !bg-[${preset}]`}
                />
              ))}

              <div className={`w-6 h-6 rounded-[20%] cursor-pointer border-2 border-black bg-[${hexValue}]`} />
            </div>

          </div>

          {editErrmsg.trim() !== "" && (
            <div className="flex justify-center">
              <ErrorMessage message={editErrmsg} type="error" />
            </div>
          )}


          <div className="flex justify-end mt-4 lg:col-span-10">
            <button
              disabled={!canUpdateInvoice}
              onClick={handleSaveTemplate}
              className={`w-40 h-10 px-4 rounded-lg font-gilroy font-semibold text-sm
      text-white bg-[#1E45E1] 
      ${!canUpdateInvoice ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              Save Template
            </button>
          </div>


        </div>





      </div>

      {bankaccountform && (

        <BankingAddForm showForm={bankaccountform}
          setShowForm={handleCloseForm}
          setEdit={setEdit}
          edit={edit}

        />

      )}
    </>
  )
}
AdvanceCustomizeSettings.propTypes = {
  hostelid: PropTypes.func.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
  BillsTemplateList: PropTypes.shape({
    mobile: PropTypes.string,
    emailId: PropTypes.string,

    isMobileCustomized: PropTypes.bool,
    isMailIdCustomized: PropTypes.bool,
    isLogoCustomized: PropTypes.bool,
    isSignatureCustomized: PropTypes.bool,

    logo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),

    signature: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),

    templates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })
    ),
  }),

}
export default AdvanceCustomizeSettings;