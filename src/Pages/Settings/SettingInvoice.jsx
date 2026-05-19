/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../../Pages/Settings/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
import EditICon from "../../Assets/Images/New_images/edit.png";
import TextAreaICon from "../../Assets/Images/textarea.png";
import BankICon from "../../Assets/Images/bank_white.png";
import "react-datepicker/dist/react-datepicker.css";
import uploadsett from "../../Assets/Images/New_images/upload setting.png";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import "../../Pages/Settings/SettingInvoice.css";
import RentalReceiptPdfTemplate from "../BillsTemplates/RentalReceiptPdfTempate";
import SecurityDepositInvoiceTemplate from "../BillsTemplates/SecurityDepositInvoice";
import BankingAddForm from "../../Pages/Banking/BankingAddForm";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import {
  Location,
  Call,
  Profile,
  Edit,
  Trash,
  DocumentUpload,
} from "iconsax-react";
import { IoBed } from "react-icons/io5";
import { Row, Col, Table, Card } from "react-bootstrap";
import AdvanceCustomizeSettings from "../BillsTemplates/AdvanceCustomizeSettings";
import ReceiptCustomize from "../BillsTemplates/ReceiptCustomize";
import { FiArrowRight } from "react-icons/fi";
import { RiPercentLine } from "react-icons/ri";
import { FiCode } from "react-icons/fi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsQrCode } from "react-icons/bs";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
// import { NutFill } from "react-bootstrap-icons";

function SettingInvoice({ hostelid, handleFormPage }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [isHovering, setIsHovering] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [invoicedueDate, setInvoiceDueDate] = useState("");

  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [tax, setTax] = useState("");
  const [banking, setBanking] = useState([]);
  const [selectedBankId, setSelectedBankId] = useState(null);
  const [showform, setShowForm] = useState(false);
  const [contactnumberform, setContactNumberForm] = useState(false);
  const [editformErrmsg, setEditFormErrMessage] = useState("");
  const [global, setGlobal] = useState(false);

  const [cardshow, setCardShow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

  const [bankid_Error, setBankIdError] = useState("");
  const [prefix_errmsg, setPrefixErrMsg] = useState("");
  const [suffix_errmsg, setSuffixErrMsg] = useState("");
  const [tax_errmsg, setTaxErrMsg] = useState("");
  const [notes_errmsg, setNotesErrMsg] = useState("");
  const [terms_errmsg, setTermsErrMsg] = useState("");
  const [signature_errmsg, setSignatureErrMsg] = useState("");
  const [selectedTab, setSelectedTab] = useState("rental_invoice");
  const [mobilenum, setMobileNum] = useState("");
  const [MobileError, setMobileError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isCheckedmobile, setIsCheckedMobile] = useState(false);
  const [isCheckedEmail, setIsCheckedEmail] = useState(false);
  const [isCheckedLogo, setIsCheckedLogo] = useState(false);
  const [isCheckedSignature, setIsCheckedSignature] = useState(false);

  const [savebuttonshow, setSavebuttonshow] = useState(true);
  const [initialValues, setInitialValues] = useState({});
  const [noChangesDetectedMsg, setNoChangesDetectedMsg] = useState("");
  const [BillsTemplateList, setBillsTemplateList] = useState([]);

  // const canReadInvoice = useHasPermission("Bills", "canRead")
  // const canUpdateInvoice = useHasPermission("Bills", "canUpdate")

  const {
    // canWriteModule: canWriteProfile,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
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
  }, [BillsTemplateList]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

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
      setFormLoading(false);
      setLoading(false);
      setSavebuttonshow(false);
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: state.login.selectedHostel_Id,
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_GLOBAL_SETTINGS" });
      }, 1000);
    }
  }, [state.Settings.settingGlobalAddStatusCode]);

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
    setGlobal(false);
  };

  const [paymentmobilenum, setPaymentMobileNum] = useState("");
  const [paymentMobileError, setPaymentMobileError] = useState("");
  const [paymentinvoiceemail, setPaymentinvoiceEmail] = useState("");
  const [paymentinvoiceemailError, setPaymentInvoiceEmailError] = useState("");

  const handlePaymentinvoiceEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setPaymentinvoiceEmail(emailValue);
    setEditFormErrMessage("");
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
    setEditFormErrMessage("");
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
    setFieldError("");
    setSavebuttonshow(true);
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
    setFieldError("");
    setSavebuttonshow(true);
    setNoChangesDetectedMsg("");
  };

  const handleMobileCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedMobile(checked);
    setSavebuttonshow(true);
    setNoChangesDetectedMsg("");
  };

  const handleEmaiCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedEmail(checked);
    setSavebuttonshow(true);
    setNoChangesDetectedMsg("");
  };

  const handleLogoCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedLogo(checked);
    setSavebuttonshow(true);
    setNoChangesDetectedMsg("");
  };

  const handleSignatureCheckboxChange = (e) => {
    const checked = e.target.checked;
    setIsCheckedSignature(checked);
    setSavebuttonshow(true);
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
    setEditFormErrMessage("");
  };

  const presetColors = [
    "#F44336",
    "#FF9800",
    "#FFEB3B",
    "#795548",
    "#8BC34A",
    "#4CAF50",
    "#E91E63",
    "#9C27B0",
    "#9C00FF",
    "#03A9F4",
    "#00BCD4",
    "#C8E6C9",
    "#000000",
    "#616161",
    "#9E9E9E",
    "#FFFFFF",
    "#AAAAAA",
    "#FF69B4",
  ];

  const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
  const alphaValue = Math.round(color.a * 100);

  const hanldePrefix = (e) => {
    const Value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setPrefix(Value);
    setEditFormErrMessage("");
    if (Value.trim() !== "") {
      setPrefixErrMsg("");
    }
  };

  const hanldeSuffix = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setSuffix(numericValue);
    setEditFormErrMessage("");
    if (numericValue.trim() !== "") {
      setSuffixErrMsg("");
    }
  };

  const handleTaxChange = (e) => {
    const inputValue = e.target.value;
    setEditFormErrMessage("");
    const formattedValue = inputValue
      .replace(/[^0-9.]/g, "")
      .replace(/^([^.]*\.)|\./g, "$1");

    setTax(formattedValue);

    if (formattedValue.trim() !== "") {
      setTaxErrMsg("");
    }
  };

  const handleNotesChange = (e) => {
    const Value = e.target.value;
    setNotes(Value);
    setEditFormErrMessage("");
    if (Value.trim() !== "") {
      setNotesErrMsg("");
    }
  };

  const handleTermsChange = (e) => {
    const Value = e.target.value;
    setTerms(Value);
    setEditFormErrMessage("");
    if (Value.trim() !== "") {
      setTermsErrMsg("");
    }
  };

  const [notes, setNotes] = useState(
    '"Your comfort is our priority – See you again at Smart Stay!"',
  );

  const [terms, setTerms] = useState(
    "Tenants must pay all dues on or before the due date, maintain cleanliness, and follow PG rules; failure may lead to penalties or termination of stay.",
  );

  const [logoPreview, setLogoPreview] = useState(null);
  const [hostel_logo, setHostelLogo] = useState(null);

  const handleFileUploadHostel = (e) => {
    if (!allowImageUpload) return;
    const file = e.target.files[0];
    setEditFormErrMessage("");
    if (file && file.type.startsWith("image/")) {
      setHostelLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    // e.target.value = null
  };

  const fileInputRef = useRef(null);
  const [sign, setSign] = useState(null);
  const [signPreview, setSignPreview] = useState(null);
  const [isHoveringSign, setIsHoveringSign] = useState(false);

  const handleFileSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSign(file);
      setSignPreview(URL.createObjectURL(file));
      setSignatureErrMsg("");
      setIsSignatureConfirmed(true);
      setFieldError("");
      setSavebuttonshow(true);
    }
    setNoChangesDetectedMsg("");
  };

  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    setEditFormErrMessage("");
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewURL(objectUrl);
      setFieldError("");
      setSavebuttonshow(true);
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
    if (!signPreview) return;

    const isLocalImage =
      signPreview.startsWith("blob:") || signPreview.startsWith("data:");

    if (isLocalImage) {
      setSign("");
      setSignPreview("");
    } else {
      // dispatch({
      //   type: "DELETETEMPLATESIMAGES",
      //   payload: {
      //     hostelId: BillsTemplateList?.hostelId,
      //     templateId: BillsTemplateList?.templateId,
      //     templateTypeId: BillsTemplateList?.templates[1]?.typeId,
      //     type: "SIGNATURE",
      //   },
      // });

      setSign("");
      setSignPreview("");
    }

    setSignatureErrMsg("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

  // const rentalSignatureInputRef = useRef(null);
  const [rentalSignatureFile, setRentalSignatureFile] = useState(null);
  const [rentalSignaturePreview, setRentalSignaturePreview] = useState(null);
  const [rentalSignatureError, setRentalSignatureError] = useState("");
  const [isRentalSignatureConfirmed, setIsRentalSignatureConfirmed] =
    useState(false);

  const handleRentalSignatureChange = (e) => {
    const file = e.target.files[0];
    setEditFormErrMessage("");
    if (file) {
      setRentalSignatureFile(file);
      setRentalSignaturePreview(URL.createObjectURL(file));
      setRentalSignatureError("");
      setIsRentalSignatureConfirmed(false);
    }
  };

  // const handleRentalSignatureClear = () => {
  //   setEditFormErrMessage("")
  //   setRentalSignatureFile(null);
  //   setRentalSignaturePreview(null);
  //   setRentalSignatureError("");
  //   if (rentalSignatureInputRef.current) {
  //     rentalSignatureInputRef.current.value = '';
  //   }
  // };

  // const handleRentalSignatureDone = () => {

  //   if (!rentalSignatureFile) {
  //     setRentalSignatureError("Please select a signature file");
  //   } else {
  //     setEditFormErrMessage("")
  //     setRentalSignatureError("");
  //     setIsRentalSignatureConfirmed(true);
  //   }
  // };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "PARTICULAR_HOSTEL_DETAILS",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  useEffect(() => {
    if (state.Settings?.settingsInvoicegetErrorStatuscode === 201) {
      setLoading(false);
      setSelectedBankId(null);
      setPrefix("");
      setSuffix("");
      setTax("");
      setBankIdError("");

      setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR_SETTINGS_GETINVOICE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsInvoicegetErrorStatuscode]);

  useEffect(() => {
    if (state.Settings?.settingsAddInvoiceSucesscode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDINVOICE_SETTINGS_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsAddInvoiceSucesscode]);

  useEffect(() => {
    if (state.InvoiceList?.invoiceSettingsStatusCode === 200) {
      setSelectedDate("");
      setInvoiceDueDate("");

      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_SETTINS_STATUSCODE" });
      }, 1000);
    }
  }, [state.InvoiceList]);

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
    handleFormPage(true);
    setShowForm(true);

    setCardShow(false);

    dispatch({
      type: "GET_TEMPLATE_LIST",
      payload: state.login.selectedHostel_Id,
    });
    setSelectedTab("rental_invoice");
  };

  const handleCloseForm = () => {
    setBankAccountForm(false);
    setCardShow(true);
    setShowForm(false);
    setPrefix("");
    setSelectedDate("");
    setInvoiceDueDate("");
    handleFormPage(false);
    setEditFormErrMessage("");
  };

  const handleCloseFormBank = () => {
    setBankAccountForm(false);
  };
  const [bankaccountform, setBankAccountForm] = useState(false);

  const handleAddBankAccount = () => {
    setBankAccountForm(true);
  };

  const handleCloseBankAccount = () => {
    setBankAccountForm(false);
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (
      state.UsersList?.templatesImagesDeleteStatusCode === 204 ||
      state.UsersList?.templatesGlobalImagesDeleteStatusCode === 204
    ) {
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: state.login.selectedHostel_Id,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_DELETE_TEMPLATES_IMAGES" });
        dispatch({ type: "REMOVE_DELETE_GLOBAL_TEMPLATES_IMAGES_REDUCER" });
      }, 100);
    }
  }, [
    state.UsersList?.templatesImagesDeleteStatusCode,
    state.UsersList?.templatesGlobalImagesDeleteStatusCode,
  ]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking) {
      setBanking(state.bankingDetails?.bankingList?.listBanks);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);

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
    setEditFormErrMessage("");
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
  const [qrimagepreview, setQRImagePreview] = useState(null);
  const qrFileInputRef = useRef(null);

  const handleQrImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditFormErrMessage("");
      setQRImagePreview(file);
      setQrImage(URL.createObjectURL(file));
      e.target.value = null;
    }
  };

  const RentalinvoiceTemplate =
    BillsTemplateList &&
    BillsTemplateList.templates?.find((template) => template.type === "RENTAL");

  useEffect(() => {
    if (RentalinvoiceTemplate) {
      setLogoPreview(
        BillsTemplateList.isLogoCustomized
          ? RentalinvoiceTemplate.invoiceLogoUrl
          : BillsTemplateList.logo,
      );

      setHostelLogo(
        BillsTemplateList.isLogoCustomized
          ? RentalinvoiceTemplate.invoiceLogoUrl
          : BillsTemplateList.logo,
      );
      setPaymentMobileNum(
        BillsTemplateList.isMobileCustomized &&
          RentalinvoiceTemplate.invoiceMobileNumber
          ? RentalinvoiceTemplate.invoiceMobileNumber
          : BillsTemplateList.mobile,
      );
      setPaymentinvoiceEmail(
        BillsTemplateList.isMailIdCustomized &&
          RentalinvoiceTemplate.invoiceMailId
          ? RentalinvoiceTemplate.invoiceMailId
          : BillsTemplateList.emailId,
      );
      setPrefix(RentalinvoiceTemplate.prefix || "");
      setSuffix(RentalinvoiceTemplate.suffix || "");
      setRentalSignatureFile(
        BillsTemplateList.isSignatureCustomized
          ? RentalinvoiceTemplate.invoiceSignatureUrl
          : BillsTemplateList?.signature,
      );
      setRentalSignaturePreview(
        BillsTemplateList.isSignatureCustomized
          ? RentalinvoiceTemplate.invoiceSignatureUrl
          : BillsTemplateList?.signature,
      );
      setTerms(RentalinvoiceTemplate.invoiceTermsAndCondition || "");
      setTax(RentalinvoiceTemplate.gstPercentile || "");
      setSelectedBankId(RentalinvoiceTemplate.selectedBankId || null);
      setQrImage(RentalinvoiceTemplate.qrCodeUrl || null);
      setQRImagePreview(RentalinvoiceTemplate.qrCodeUrl || null);
      setNotes(RentalinvoiceTemplate.invoiceNotes);
      const templateTheme = RentalinvoiceTemplate.invoiceTemplateColor;
      if (templateTheme && templateTheme.trim() !== "") {
        if (templateTheme.includes("rgba")) {
          const match = templateTheme.match(
            /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)/,
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
  }, [RentalinvoiceTemplate]);

  const handleSaveRentalTemplate = () => {
    setEditFormErrMessage("");
    if (RentalinvoiceTemplate.isSignatureCustomized) {
      const Signatureverify = !RentalinvoiceTemplate.invoiceSignatureUrl;

      if (
        rentalSignatureFile &&
        !isRentalSignatureConfirmed &&
        Signatureverify
      ) {
        setRentalSignatureError(
          "Please click Done after selecting a signature",
        );
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
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.Settings?.settingsBillsAddTemplateSucesscode === 200) {
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: state.login.selectedHostel_Id,
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BILLS_TEMPLATE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsBillsAddTemplateSucesscode]);

  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetsuccessCode === 200) {
      setLoading(false);
      setBillsTemplateList(state.Settings?.settingsBillsTemplateList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_TEMPLATELIST_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.SettingsBilltemplategetsuccessCode]);

  const [fieldError, setFieldError] = useState("");

  const handleSaveTemplate = () => {
    if (sign && isSignatureConfirmed) {
      setSignatureErrMsg("Please click Done after selecting a signature");
      return;
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

      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleReset = () => {
    // setResetCall(true)
    setSelectedFile(null);
    setSign(null);
    setSignPreview(null);
    setPreviewURL(null);
    setMobileNum("");
    setEmail("");
    setIsCheckedMobile(false);
    setIsCheckedEmail(false);
    setIsCheckedLogo(false);
    setIsCheckedSignature(false);
    setEmailError("");
    setMobileError("");
  };

  const items = [
    { id: 1, name: "Room Rental", amount: 8000 },
    { id: 2, name: "Electricity", amount: 950 },
  ];

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);
  const taxAmount = (subtotal * tax) / 100;
  const totalAmount = subtotal + taxAmount;

  const hasTax = tax;

  const [templateThemes, setTemplateThemes] = useState("");
  const [templateReceiptThemes, setTemplateReceiptThemes] = useState("");

  const onTemplateChange = (template) => {
    setTemplateThemes(template);
  };

  const onTemplateReceiptChange = (template) => {
    setTemplateReceiptThemes(template);
  };

  const handleEditChange = () => {
    setGlobal(true);
  };

  const handleDeleteLogoGlobal = () => {
    if (!previewURL) return;

    const isLocalImage =
      previewURL.startsWith("blob:") || previewURL.startsWith("data:");

    if (isLocalImage) {
      setPreviewURL(null);
    } else {
      if (BillsTemplateList?.hostelId) {
        dispatch({
          type: "DELETE_GLOBAL_TEMPLATES_IMAGES_SAGA",
          payload: {
            hostelId: BillsTemplateList?.hostelId,
            templateId: BillsTemplateList?.templateId,
            type: "LOGO",
          },
        });
      }

      setPreviewURL(null);
    }
  };

  const handleDeleteSignatureGlobal = () => {
    if (!signPreview) return;

    const isLocalImage =
      signPreview.startsWith("blob:") || signPreview.startsWith("data:");

    if (isLocalImage) {
      setSignPreview(null);
    } else {
      if (BillsTemplateList?.hostelId) {
        dispatch({
          type: "DELETE_GLOBAL_TEMPLATES_IMAGES_SAGA",
          payload: {
            hostelId: BillsTemplateList?.hostelId,
            templateId: BillsTemplateList?.templateId,
            type: "SIGNATURE",
          },
        });
      }

      setSignPreview(null);
    }
  };

  const handleRemoveQr = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: "DELETETEMPLATESIMAGES",
        payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: RentalinvoiceTemplate?.typeId,
          type: "QRCODE",
        },
      });
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
        type: "DELETETEMPLATESIMAGES",
        payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: RentalinvoiceTemplate?.typeId,
          type: "INVOICE-LOGO",
        },
      });
    }
  };

  const handleLocalDeleteLogo = () => {
    setLogoPreview(null);
  };

  const handleDeleteRentalSignature = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: "DELETETEMPLATESIMAGES",
        payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: RentalinvoiceTemplate?.typeId,
          type: "INVOICE-SIGNATURE",
        },
      });
    }
  };

  const handleLocalDeleteRentalSignature = () => {
    if (rentalSignaturePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(rentalSignaturePreview);
    }

    setRentalSignaturePreview(null);
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-[1050] top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-600 border-r-transparent animate-spin"></div>
        </div>
      )}

      {formLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-[1050] top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-600 border-r-transparent animate-spin"></div>
        </div>
      )}

      {showform && (
        <>
          <div className="grid grid-cols-12 h-screen">
            <div className="col-span-12 md:col-span-4">
              <div className="bg-white sticky top-0 z-10 pb-2 h-[75px]">
                <h4 className="mb-2 pt-2 font-gilroy text-[22px] md:text-lg text-[#222222] font-semibold whitespace-nowrap">
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

                  <p className="font-gilroy text-[16px] font-semibold leading-[22px] m-0">
                    Global Bill Settings
                  </p>
                </div>

                {/* <div className="bg-white grid grid-cols-3 gap-3 mb-4">
                  {PdfOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedTab(option.value);
                        setEditFormErrMessage("");
                      }}
                      className={`
        rounded-full py-[6px] font-gilroy text-[12px] font-semibold leading-[100%] tracking-[0%] 
        text-center w-full
        border
        ${selectedTab === option.value
                          ? "bg-[#1E45E1] border-[#0d6efd] text-white"
                          : "bg-transparent border-[#6c757d] text-[#6c757d]"}
      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div> */}
                {/* <div className="bg-white flex justify-center gap-3 mb-4"> */}
                <div className="bg-white flex flex-wrap justify-center md:justify-start gap-2 md:gap-3 mb-4">
                  {PdfOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSelectedTab(option.value);
                        setEditFormErrMessage("");
                      }}
                      className={`
         font-gilroy text-[12px] font-semibold leading-[100%] tracking-[0%] 
        text-center rounded-full py-1.5 px-3 md:px-4 whitespace-nowrap
        border  md:mb-2
        ${
          selectedTab === option.value
            ? "bg-[#1E45E1] border-[#0d6efd] text-white"
            : "bg-transparent border-[#6c757d] text-[#6c757d]"
        }
      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-[50px] max-h-[calc(95vh-130px)] overflow-y-auto">
                {selectedTab === "rental_invoice" && (
                  <>
                    <div className="flex">
                      <div className="col-lg-12 max-h-[650px] overflow-y-auto overflow-x-hidden show-scrolls">
                        {(BillsTemplateList?.isLogoCustomized ||
                          BillsTemplateList?.isMobileCustomized ||
                          BillsTemplateList?.isMailIdCustomized ||
                          BillsTemplateList?.isSignatureCustomized) && (
                          <>
                            <p className="font-gilroy text-[17px] font-semibold">
                              Inherited Global Details
                            </p>

                            <div className="border rounded-[10px] p-2.5 pb-3 mb-3 col-span-12 overflow-y-auto">
                              <div className="flex justify-end">
                                <img
                                  src={EditICon}
                                  onClick={handleShowContactNumberForm}
                                  alt="editicon"
                                  className="cursor-pointer"
                                />
                              </div>
                              {BillsTemplateList?.isLogoCustomized && (
                                <div>
                                  <div className="flex justify-between items-center mb-[6px]">
                                    <label className="font-gilroy font-semibold">
                                      Hostel/PG Logo
                                    </label>
                                  </div>

                                  <div className="p-3 border rounded bg-[#F0F3FF] text-center">
                                    <div className="flex justify-center">
                                      <div
                                        className="relative inline-block"
                                        onMouseEnter={(e) => {
                                          const trash =
                                            e.currentTarget.querySelector(
                                              ".qr-trash",
                                            );
                                          const overlay =
                                            e.currentTarget.querySelector(
                                              ".qr-overlay",
                                            );

                                          if (trash)
                                            trash.style.display = "flex";
                                          if (overlay)
                                            overlay.style.display = "block";
                                        }}
                                        onMouseLeave={(e) => {
                                          const trash =
                                            e.currentTarget.querySelector(
                                              ".qr-trash",
                                            );
                                          const overlay =
                                            e.currentTarget.querySelector(
                                              ".qr-overlay",
                                            );

                                          if (trash)
                                            trash.style.display = "none";
                                          if (overlay)
                                            overlay.style.display = "none";
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
                                            <div className="qr-overlay absolute inset-0 hidden h-[60px] bg-black/40 rounded-md" />

                                            <div
                                              className="qr-trash absolute -top-1 -right-1 hidden flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer"
                                              onClick={() => {
                                                if (
                                                  logoPreview?.startsWith(
                                                    "data:",
                                                  ) ||
                                                  logoPreview?.startsWith(
                                                    "blob:",
                                                  )
                                                ) {
                                                  handleLocalDeleteLogo();
                                                } else {
                                                  handleDeleteLogo();
                                                }
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

                                    <div>
                                      <label
                                        className={`${
                                          allowEditFields.hostelLogo
                                            ? "cursor-pointer text-[#1E45E1]"
                                            : "cursor-not-allowed text-[#999]"
                                        } font-gilroy text-[12px] font-normal`}
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

                                    <small className="block mt-[5px] font-gilroy text-[9px] font-normal text-[#4B4B4B]">
                                      Must be in PNG Format (600px × 300px)
                                    </small>
                                  </div>
                                </div>
                              )}

                              {BillsTemplateList?.isMobileCustomized && (
                                <div className="p-3 col-span-12 rounded-[10px] overflow-y-auto mb-0">
                                  <div className="flex flex-col w-full">
                                    <div className="col-span-12">
                                      <div className="w-full font-gilroy text-[14px] font-medium">
                                        <div className="flex justify-between items-center mb-[6px]">
                                          <label className="font-semibold">
                                            Contact Number
                                          </label>
                                        </div>
                                        <div className="flex items-center bg-[#F0F3FF] rounded-[8px] px-3 py-2 border border-[#E0E0E0]">
                                          <select
                                            className={`appearance-none bg-transparent border-none pr-4 cursor-pointer outline-none`}
                                            disabled={!allowEditFields.contact}
                                            style={{
                                              fontFamily: "inherit",
                                              fontSize: "inherit",
                                              fontWeight: "inherit",
                                              backgroundImage:
                                                "url(\"data:image/svg+xml;charset=UTF-8,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23666' stroke-width='2'/%3E%3C/svg%3E\")",
                                              backgroundRepeat: "no-repeat",
                                              backgroundPosition:
                                                "right center",
                                              backgroundSize: "10px",
                                            }}
                                          >
                                            <option value="+91">+91</option>
                                            <option value="+1">+1</option>
                                            <option value="+44">+44</option>
                                            <option value="+971">+971</option>
                                          </select>

                                          <input
                                            type="tel"
                                            placeholder="9876543210"
                                            value={paymentmobilenum}
                                            onChange={
                                              handlePaymentInvoiceMobile
                                            }
                                            maxLength={10}
                                            disabled={!allowEditFields.contact}
                                            className="ml-2 bg-transparent border-none outline-none w-full"
                                            style={{
                                              fontFamily: "inherit",
                                              fontSize: "inherit",
                                              fontWeight: "inherit",
                                            }}
                                          />
                                        </div>

                                        {paymentMobileError && (
                                          <ErrorMessage
                                            message={paymentMobileError}
                                            type="error"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {BillsTemplateList?.isMailIdCustomized && (
                                <div className="p-3 col-span-12 rounded-[10px] overflow-y-auto">
                                  <div className="flex flex-col w-full">
                                    <div className="col-span-12">
                                      <div className="w-full font-gilroy text-[14px] font-medium">
                                        <div className="flex justify-between items-center mb-[6px]">
                                          <label className="font-semibold">
                                            E-Mail Address
                                          </label>
                                        </div>
                                        <div className="flex items-center bg-[#F0F3FF] rounded-[8px] px-3 py-2 border border-[#E0E0E0]">
                                          <input
                                            type="email"
                                            placeholder="abc@gmail.com"
                                            className="ml-2 bg-transparent border-none outline-none w-full"
                                            disabled={!allowEditFields.email}
                                            value={paymentinvoiceemail}
                                            onChange={handlePaymentinvoiceEmail}
                                            style={{
                                              fontFamily: "inherit",
                                              fontSize: "inherit",
                                              fontWeight: "inherit",
                                            }}
                                          />
                                        </div>
                                        {paymentinvoiceemailError !== "" && (
                                          <ErrorMessage
                                            message={paymentinvoiceemailError}
                                            type="error"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                              {BillsTemplateList?.isSignatureCustomized && (
                                <div className="p-3 col-span-12 rounded-[10px] overflow-y-auto">
                                  <div className="flex flex-col w-full">
                                    <div className="col-span-12">
                                      <div className="w-full font-gilroy text-[14px] font-medium">
                                        <div className="flex justify-between items-center mb-[6px]">
                                          <label className="font-semibold">
                                            Digital Signature Upload
                                          </label>
                                        </div>

                                        <div className="col-span-12">
                                          <div
                                            className="relative mt-2 flex items-center justify-center h-[120px] rounded border-[3px] border-dotted border-[#ced4da] group"
                                            onMouseEnter={(e) => {
                                              const trash =
                                                e.currentTarget.querySelector(
                                                  ".qr-trash",
                                                );
                                              const overlay =
                                                e.currentTarget.querySelector(
                                                  ".qr-overlay",
                                                );
                                              if (trash)
                                                trash.style.display = "flex";
                                              if (overlay)
                                                overlay.style.display = "block";
                                            }}
                                            onMouseLeave={(e) => {
                                              const trash =
                                                e.currentTarget.querySelector(
                                                  ".qr-trash",
                                                );
                                              const overlay =
                                                e.currentTarget.querySelector(
                                                  ".qr-overlay",
                                                );
                                              if (trash)
                                                trash.style.display = "none";
                                              if (overlay)
                                                overlay.style.display = "none";
                                            }}
                                          >
                                            {rentalSignaturePreview ? (
                                              <img
                                                src={rentalSignaturePreview}
                                                alt="signature"
                                                className="max-h-full max-w-full"
                                              />
                                            ) : (
                                              <span className="text-[14px] font-normal text-[rgba(34,34,34,1)] font-gilroy">
                                                No signature uploaded
                                              </span>
                                            )}
                                            {rentalSignaturePreview && (
                                              <>
                                                <div className="qr-overlay absolute inset-0 bg-black/40 hidden rounded" />

                                                <div
                                                  className="qr-trash absolute -top-1 -right-1 hidden flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer hidden"
                                                  onClick={() => {
                                                    const isLocal =
                                                      rentalSignaturePreview?.startsWith(
                                                        "data:",
                                                      ) ||
                                                      rentalSignaturePreview?.startsWith(
                                                        "blob:",
                                                      );

                                                    if (isLocal) {
                                                      handleLocalDeleteRentalSignature();
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
                                                className={`font-gilroy text-[12px] font-normal ${
                                                  allowEditFields.digitalSignature
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
                                                  onChange={
                                                    handleRentalSignatureChange
                                                  }
                                                  disabled={
                                                    !allowEditFields.digitalSignature
                                                  }
                                                />
                                              </label>
                                              <span className="ml-1 font-gilroy text-[12px] font-normal text-[#16151C]">
                                                to Upload Image
                                              </span>
                                            </div>
                                          </div>
                                          {rentalSignatureError.trim() !==
                                            "" && (
                                            <ErrorMessage
                                              message={rentalSignatureError}
                                              type="error"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <Modal
                                show={contactnumberform}
                                onHide={handleCloseContactNumberForm}
                                centered
                                backdrop="static"
                                className="logout-card flex justify-center items-center"
                                dialogClassName="!max-w-[400px] w-full"
                              >
                                <Modal.Header className="!border-0">
                                  <Modal.Title className="text-[18px] font-gilroy font-semibold text-center text-[#222222] flex-1 pt-2">
                                    Override Global Value?
                                  </Modal.Title>
                                </Modal.Header>

                                <Modal.Body className="-mt-2 text-[14px] font-gilroy font-medium text-[#646464] text-center px-6 py-3">
                                  <p className="mx-auto">
                                    You’re changing this field only for this
                                    bill.
                                    <br />
                                    It won’t affect the main settings.
                                  </p>
                                </Modal.Body>

                                <Modal.Footer className="!justify-center !border-t-0 !pb-5 -mt-5">
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

                        <div>
                          <p className="font-gilroy text-xl font-semibold text-[#222222]">
                            Form Specific Details
                          </p>
                          <p className="-mt-3 font-gilroy text-[14px] font-normal text-[#8f6019]">
                            {`Fill the form with details you'd like to customize.`}
                          </p>
                        </div>

                        <div className="border p-3 mb-3 rounded-lg overflow-y-auto">
                          <div>
                            <p
                              // onClick={handleEditClose}
                              className="font-gilroy text-sm font-normal text-[#222222]"
                            >
                              Invoice No
                            </p>
                            <hr className="border-t border-gray-700" />
                          </div>

                          <div className="flex flex-wrap -mx-2">
                            <div className="w-full sm:w-11/12 md:w-1/2 px-2 mb-3">
                              <div className="mb-3">
                                <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                                  Prefix
                                </label>
                                <input
                                  type="text"
                                  placeholder="prefix"
                                  value={prefix}
                                  onChange={hanldePrefix}
                                  className="w-full p-2.5 mt-2 text-base font-gilroy font-normal text-[#4B4B4B] leading-5 border border-gray-300 rounded"
                                />
                                {prefix_errmsg.trim() !== "" && (
                                  <ErrorMessage
                                    message={prefix_errmsg}
                                    type="error"
                                  />
                                )}
                              </div>
                            </div>

                            <div className="w-full sm:w-11/12 md:w-1/2 px-2 mb-3">
                              <div className="mb-3">
                                <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                                  Suffix
                                </label>
                                <input
                                  type="text"
                                  placeholder="suffix"
                                  value={suffix}
                                  onChange={hanldeSuffix}
                                  className="w-full p-2.5 mt-2 text-sm font-gilroy font-normal text-[#4B4B4B] leading-5 border border-gray-300 rounded"
                                />
                                {suffix_errmsg.trim() !== "" && (
                                  <ErrorMessage
                                    message={suffix_errmsg}
                                    type="error"
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="w-full sm:w-11/12 px-2 mb-3">
                            <div className="mb-3">
                              <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                                Preview
                              </label>
                              <input
                                type="text"
                                placeholder="preview"
                                value={`${prefix}-${suffix}`}
                                readOnly
                                className="w-full p-2.5 mt-2 text-base font-gilroy font-normal text-[#4B4B4B] leading-5 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="border p-3 mb-3 rounded-lg overflow-y-auto">
                          <div>
                            <p className="font-gilroy text-sm font-normal text-[#222222]">
                              PG Tax Payable
                            </p>
                            <hr className="border-t border-gray-700" />
                          </div>

                          <div className="flex flex-wrap -mx-2">
                            <div className="w-full px-2 mb-3">
                              <div>
                                <label className="font-gilroy text-sm font-normal text-[#222222] block mb-2">
                                  Add the Tax payable GST in Percentage %
                                </label>
                                <input
                                  type="text"
                                  placeholder="12%"
                                  value={tax}
                                  onChange={handleTaxChange}
                                  className="w-full p-2.5 mt-2 text-base font-gilroy font-normal text-[#4B4B4B] leading-5 border border-gray-300 rounded"
                                />
                                {tax_errmsg.trim() !== "" && (
                                  <ErrorMessage
                                    message={tax_errmsg}
                                    type="error"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-lg-12 border p-4 mb-6 rounded-[10px] font-gilroy">
                          <div className="flex justify-between items-center mb-2.5">
                            <p className="text-[18px] text-[#222222] font-normal whitespace-nowrap m-0">
                              Account Details
                            </p>

                            {banking && banking.length > 0 && (
                              <button
                                onClick={handleAddBankAccount}
                                className="text-[14px] font-normal text-white rounded-[12px] w-[106px] h-[35px] border border-[#1E45E1] bg-[#1E45E1]"
                              >
                                Add
                              </button>
                            )}
                          </div>

                          <hr className="border-t border-gray-700" />

                          <div className="max-h-[170px] overflow-y-auto show-scrolls mt-3">
                            {banking && banking.length > 0 ? (
                              banking.map((bank) => (
                                <div
                                  key={bank.bankingId}
                                  className="mb-4 cursor-pointer"
                                >
                                  <div className="flex items-center">
                                    <input
                                      type="radio"
                                      name="bank"
                                      checked={
                                        String(selectedBankId) ===
                                        String(bank.bankingId)
                                      }
                                      onChange={() =>
                                        handleBankClick(bank.bankingId)
                                      }
                                      className="accent-[#1E45E1] mr-2.5 w-4 h-4 cursor-pointer"
                                    />
                                    <div className="flex items-center gap-3">
                                      <div className="flex justify-center items-center w-[30px] h-[30px] rounded-full bg-[#1E45E1] text-white">
                                        <img
                                          src={BankICon}
                                          alt="bankicon"
                                          className="w-[17px] h-[17px] mb-1"
                                        />
                                      </div>
                                      <div>
                                        <div className="font-semibold text-[14px]">
                                          {bank.bankName || "Bank Name"}
                                        </div>
                                        <div className="text-[13px] text-gray-500">
                                          {bank.accountHolderName ||
                                            "Beneficiary"}{" "}
                                          / Savings A/C
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="flex flex-col justify-center items-center">
                                <p className="text-[14px] font-normal text-gray-500 mb-2">
                                  No Bank accounts are there!
                                </p>
                                <button
                                  onClick={handleAddBankAccount}
                                  className="text-[14px] font-normal text-white rounded-[12px] w-[106px] h-[35px] border border-[#1E45E1] bg-[#1E45E1]"
                                >
                                  Add
                                </button>
                              </div>
                            )}
                          </div>

                          {!selectedBankId && bankid_Error.trim() !== "" && (
                            <ErrorMessage message={bankid_Error} type="error" />
                          )}
                        </div>

                        <div className="border p-3 mb-3 rounded-[10px] overflow-y-auto">
                          <div>
                            <p className="font-gilroy text-[14px] font-normal text-[#222222]">
                              Upload QR
                            </p>
                            <hr className="border-t border-gray-700" />
                          </div>

                          <p className="font-gilroy text-[12px] font-normal text-[#4B4B4B] mb-2">
                            Valid UPI QR Code for Payment Easy
                          </p>

                          <div className="w-full">
                            <div className="flex items-center justify-center p-3 border rounded-lg bg-[#f9f9f9]">
                              <div
                                className="relative w-full max-w-[100px] aspect-square bg-white rounded-lg flex items-center justify-center"
                                onMouseEnter={(e) => {
                                  const trash =
                                    e.currentTarget.querySelector(".qr-trash");
                                  const overlay =
                                    e.currentTarget.querySelector(
                                      ".qr-overlay",
                                    );
                                  if (trash) trash.style.display = "flex";
                                  if (overlay) overlay.style.display = "block";
                                }}
                                onMouseLeave={(e) => {
                                  const trash =
                                    e.currentTarget.querySelector(".qr-trash");
                                  const overlay =
                                    e.currentTarget.querySelector(
                                      ".qr-overlay",
                                    );
                                  if (trash) trash.style.display = "none";
                                  if (overlay) overlay.style.display = "none";
                                }}
                              >
                                {qrImage ? (
                                  <>
                                    <img
                                      src={qrImage}
                                      alt="QR Preview"
                                      className="w-full h-full object-contain rounded-lg bg-white mb-2 z-[1]"
                                    />

                                    {qrImage && (
                                      <>
                                        <div className="qr-overlay hidden absolute inset-0 bg-black/15 rounded-lg z-[2] pointer-events-none" />

                                        <div
                                          className="qr-trash hidden absolute flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer z-[3]"
                                          onClick={() => {
                                            const isLocal =
                                              qrImage?.startsWith("data:") ||
                                              qrImage?.startsWith("blob:");
                                            if (isLocal) handleLocalRemoveQr();
                                            else handleRemoveQr();
                                          }}
                                        >
                                          <div className="qr-trash">
                                            <Trash size={12} />
                                          </div>
                                        </div>
                                      </>
                                    )}
                                  </>
                                ) : (
                                  <img
                                    src={uploadsett}
                                    alt="upload"
                                    className="h-[30px] mb-2"
                                  />
                                )}
                              </div>

                              <div className="flex flex-col ml-3">
                                <div>
                                  <label className="cursor-pointer text-[14px] font-normal font-gilroy text-[#1E45E1]">
                                    Choose file
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="hidden"
                                      ref={qrFileInputRef}
                                      onChange={handleQrImageChange}
                                    />
                                  </label>
                                  <span className="ms-1 text-[14px] font-normal font-gilroy text-[#16151C]">
                                    to Upload
                                  </span>
                                </div>
                                <small className="text-[12px] font-normal font-gilroy text-[#4B4B4B] whitespace-nowrap">
                                  JPG SVG PNG(150px × 150px)
                                </small>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 mb-3 border rounded-[10px]">
                          <h6 className="font-gilroy text-[14px] font-normal text-[#222222]">
                            Notes
                          </h6>
                          <hr className="border-t border-gray-700" />

                          <label className="font-gilroy text-[14px] font-normal text-[#222222] block mb-2">
                            Add Notes
                          </label>

                          <div className="relative">
                            <textarea
                              className="w-full p-2.5 text-[14px] font-gilroy font-normal text-[#222222] border rounded resize-none pr-12"
                              rows={4}
                              placeholder="Add any message..."
                              value={notes}
                              onChange={handleNotesChange}
                            />
                            <img
                              src={TextAreaICon}
                              alt="textarea_icon"
                              className="absolute right-3 top-3 pointer-events-none"
                              style={{ color: "#666" }}
                            />
                          </div>

                          {notes_errmsg.trim() !== "" && (
                            <ErrorMessage message={notes_errmsg} type="error" />
                          )}
                        </div>

                        <div className="p-3 mb-3 border rounded-[10px]">
                          <h6 className="font-gilroy text-[14px] font-normal text-[#222222]">
                            Terms & Condition
                          </h6>
                          <hr className="border-t border-gray-700" />

                          <label className="font-gilroy text-[14px] font-normal text-[#222222] block mb-2">
                            Add T&C
                          </label>

                          <div className="relative">
                            <textarea
                              rows={4}
                              placeholder="Add any message..."
                              value={terms}
                              onChange={handleTermsChange}
                              className="w-full p-2.5 text-[14px] font-gilroy font-normal text-[#222222] border rounded resize-none pr-12"
                            />
                            <img
                              src={TextAreaICon}
                              alt="textarea-icon"
                              className="absolute right-3 top-3 pointer-events-none"
                              style={{ color: "#666" }}
                            />
                          </div>

                          {terms_errmsg.trim() !== "" && (
                            <ErrorMessage message={terms_errmsg} type="error" />
                          )}
                        </div>

                        <div className="w-full border rounded-[12px] p-4 font-gilroy">
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

                          <div className="flex flex-wrap justify-center gap-2 mt-3">
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
                          <div className="flex justify-between text-[12px] text-gray-600 mt-1 mb-3">
                            <span className="w-20 text-center">Hex</span>
                            <span className="w-10 text-center">R</span>
                            <span className="w-10 text-center">G</span>
                            <span className="w-10 text-center">B</span>
                            <span className="w-10 text-center">A</span>
                          </div>

                          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-9 gap-2 justify-center">
                            {presetColors.map((preset, index) => (
                              <div
                                key={index}
                                onClick={() => {
                                  const r = parseInt(preset.substr(1, 2), 16);
                                  const g = parseInt(preset.substr(3, 2), 16);
                                  const b = parseInt(preset.substr(5, 2), 16);
                                  setColor({ r, g, b, a: 1 });
                                }}
                                className={`w-6 h-6 cursor-pointer rounded-[20%] ${preset.toLowerCase() === "#ffffff" ? "border border-gray-300" : ""}`}
                                style={{ backgroundColor: preset }}
                              />
                            ))}

                            <div
                              className="w-6 h-6 rounded-[20%] cursor-pointer border-2 border-black"
                              style={{ backgroundColor: hexValue }}
                              title="Current selected color"
                            />
                          </div>
                        </div>

                        {editformErrmsg.trim() !== "" && (
                          <div className="flex justify-center">
                            <ErrorMessage
                              message={editformErrmsg}
                              type="error"
                            />
                          </div>
                        )}

                        <div className="flex justify-end mt-4 lg:col-span-10">
                          <button
                            disabled={!canUpdateInvoice}
                            onClick={handleSaveRentalTemplate}
                            className={`w-[160px] h-[42px] rounded-[10px] px-4 py-2 font-gilroy text-[14px] font-semibold text-white ${
                              !canUpdateInvoice
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-[#1E45E1] hover:bg-blue-700"
                            }`}
                          >
                            Save Template
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {selectedTab === "security_deposit_invoice" && (
                  <>
                    <AdvanceCustomizeSettings
                      hostelid={hostelid}
                      BillsTemplateList={BillsTemplateList}
                      onTemplateChange={onTemplateChange}
                    />
                  </>
                )}

                {selectedTab === "rental_receipt" && (
                  <>
                    <ReceiptCustomize
                      hostelid={hostelid}
                      BillsTemplateList={BillsTemplateList}
                      onTemplateReceiptChange={onTemplateReceiptChange}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="col-span-12 md:col-span-8">
              {selectedTab === "rental_invoice" && (
                <div className="grid gap-0 flex justify-center px-3 pt-1 bg-[#F7F8FC]">
                  <div
                    ref={cardRef}
                    className="max-h-[650px] overflow-y-auto overflow-x-hidden"
                  >
                    <div
                      ref={innerScrollRef}
                      className="col-lg-12 justify-center bg-white rounded-lg rounded-bl-[13px] rounded-br-[13px] mb-12 shadow-[0_2px_6px_rgba(0,0,0,0.08)] max-h-[650px] overflow-y-auto overflow-x-hidden"
                    >
                      <div className="p-3 position-relative">
                        <div className="grid grid-cols-12 items-center justify-between px-3">
                          <div className="col-span-6 flex items-center">
                            <img
                              src={logoPreview ? logoPreview : Logo}
                              alt="logo"
                              className="h-[29px] max-w-[134px] rounded object-contain"
                            />
                          </div>

                          <div className="col-span-5 mt-2 pl-20 pr-0">
                            <div className="text-[11px] font-semibold font-gilroy">
                              {state.UsersList.hotelDetailsinPg?.name}
                            </div>

                            <div className="text-[8px] font-semibold font-gilroy leading-tight whitespace-nowrap">
                              {[
                                [
                                  state.UsersList.hotelDetailsinPg?.street,
                                  state.UsersList.hotelDetailsinPg?.area,
                                  state.UsersList.hotelDetailsinPg?.landmark,
                                ]
                                  .filter(Boolean)
                                  .join(", "),
                                [
                                  state.UsersList.hotelDetailsinPg?.city,
                                  state.UsersList.hotelDetailsinPg?.state,
                                ]
                                  .filter(Boolean)
                                  .join(", ") +
                                  (state.UsersList.hotelDetailsinPg?.pinCode
                                    ? ` - ${state.UsersList.hotelDetailsinPg.pinCode}`
                                    : ""),
                              ]
                                .filter((line) => line && line.trim() !== "")
                                .map((line, idx) => (
                                  <div key={idx}>{line}</div>
                                ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr
                        className="m-0 h-px border-0 rounded shadow-sm"
                        style={{
                          background: useGradient
                            ? defaultGradient
                            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                        }}
                      />

                      <div className=" relative w-full rounded-b">
                        <div className="pt-2 pb-1 text-center">
                          <h5
                            className="text-[12px] font-semibold font-gilroy"
                            style={{
                              color: useGradient
                                ? defaultGradient
                                : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                            }}
                          >
                            Payment Bills
                          </h5>
                        </div>

                        <div className="grid grid-cols-12 gap-4 px-4 mt-1">
                          <div className="col-span-12 md:col-span-6 mb-1">
                            <p
                              className={`mb-1 text-[11px] font-medium italic font-gilroy`}
                              style={{
                                color: useGradient
                                  ? defaultGradient
                                  : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                              }}
                            >
                              Bill to:
                            </p>

                            <div className="flex items-center mb-1">
                              <Profile
                                size="16"
                                variant="Bold"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span className="ml-1 text-[9px] font-gilroy font-semibold text-[#171717]">
                                Mr. Muthuraja M
                              </span>
                            </div>

                            <div className="flex items-center mb-1">
                              <Call
                                size="16"
                                variant="Bold"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span className="ml-1 text-[9px] font-gilroy font-medium text-[#171717]">
                                +91 9876543210
                              </span>
                            </div>

                            <div className="flex items-center mb-1">
                              <IoBed
                                size="16"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span className="ml-1 text-[9px] font-gilroy font-medium text-[#171717]">
                                No 103 - 02
                              </span>
                            </div>

                            <div className="flex items-start">
                              <Location
                                size="16"
                                variant="Bold"
                                color={
                                  useGradient
                                    ? defaultGradient
                                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                                }
                              />
                              <span className="ml-1 text-[9px] font-gilroy font-normal text-[#171717] leading-[1.4]">
                                9, 8th Main Rd, Someshwara Nagar, <br />
                                Bengaluru, Karnataka 560011
                              </span>
                            </div>
                          </div>

                          <div className="col-span-12 md:col-span-6 mb-1">
                            <div className="grid grid-cols-12 gap-1 w-full">
                              <div className="col-span-6 text-right mt-1 text-[9px] font-gilroy font-normal text-[rgba(65,65,65,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Invoice :
                              </div>
                              <div className="col-span-6 text-left mt-1 text-[9px] font-gilroy font-semibold text-[rgba(23,23,23,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                #{`${prefix}-${suffix}`}
                              </div>

                              <div className="col-span-6 text-right mt-1 text-[9px] font-gilroy font-normal text-[rgba(65,65,65,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Invoice Date :
                              </div>
                              <div className="col-span-6 text-left mt-1 text-[9px] font-gilroy font-semibold text-[rgba(188,188,188,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                31 March 2024
                              </div>
                              <div className="col-span-6 text-right mt-1 text-[9px] font-gilroy font-normal text-[rgba(65,65,65,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Due date :
                              </div>
                              <div className="col-span-6 text-left mt-1 text-[9px] font-gilroy font-semibold text-[rgba(188,188,188,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                31 March 2024
                              </div>
                              <div className="col-span-6 text-right mt-1 text-[9px] font-gilroy font-normal text-[rgba(65,65,65,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Joining date :
                              </div>
                              <div className="col-span-6 text-left mt-1 text-[9px] font-gilroy font-semibold text-[rgba(188,188,188,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                05 Jan 2024
                              </div>
                              <div className="col-span-6 text-right mt-1 text-[9px] font-gilroy font-normal text-[rgba(65,65,65,1)] whitespace-nowrap overflow-hidden overflow-ellipsis">
                                Rent Period :
                              </div>
                              <div className="col-span- text-left mt-1 text-[9px] font-gilroy font-semibold text-[rgba(188,188,188,1)] whitespace-nowrap overflow-hidden overflow-ellipsis hover:overflow-visible hover:whitespace-normal">
                                Mar - June 2024
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="px-3 py-1">
                          <div className="mb-1">
                            <label
                              className="text-[12px] font-gilroy font-semibold"
                              style={{
                                color: useGradient
                                  ? defaultGradient
                                  : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                              }}
                            >
                              Payment Summary
                            </label>
                          </div>

                          <div className="font-gilroy w-full">
                            <div className="grid grid-cols-12 gap-2 border border-[#DFDFDF] rounded-md m-0">
                              <div
                                className={
                                  hasTax
                                    ? "col-span-12 md:col-span-6 p-2.5"
                                    : "col-span-12 p-2.5"
                                }
                              >
                                <table className="min-w-full border-collapse mb-0">
                                  <thead>
                                    <tr className="bg-white border-b border-[#DFDFDF]">
                                      <th className="text-[12px] font-semibold text-[#222222] text-left px-2 py-1">
                                        INV NO
                                      </th>
                                      <th className="text-[12px] font-semibold text-[#222222] text-right px-2 py-1 capitalize">
                                        DESCRIPTION
                                      </th>
                                      <th className="text-[12px] font-semibold text-[#222222] text-right px-2 py-1">
                                        AMOUNT / INR
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {items.map((item, index) => (
                                      <tr key={item.id}>
                                        <td className="text-[12px] font-medium text-[#2D2D2D] px-2 py-1">
                                          INV-{500 + index + 1}
                                        </td>
                                        <td className="text-[12px] font-semibold text-[#2D2D2D] text-right px-2 py-1">
                                          {item.name}
                                        </td>
                                        <td className="text-[14px] font-semibold text-[#2D2D2D] text-right px-2 py-1">
                                          ₹{item.amount.toLocaleString("en-IN")}
                                        </td>
                                      </tr>
                                    ))}

                                    {/* Total row */}
                                    <tr className="bg-[#FAFBFF] border-t border-[#DFDFDF] font-medium">
                                      <td
                                        colSpan={2}
                                        className="text-[14px] font-medium text-[#2D2D2D] text-left px-2 py-1"
                                      >
                                        Total
                                      </td>
                                      <td className="text-[14px] font-semibold text-[#2D2D2D] text-right px-2 py-1">
                                        ₹
                                        {items
                                          .reduce(
                                            (total, item) =>
                                              total + item.amount,
                                            0,
                                          )
                                          .toLocaleString("en-IN")}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              {/* Right Table (Tax) */}
                              {hasTax && (
                                <div className="col-span-12 md:col-span-6 p-2">
                                  <table className="min-w-full border-collapse mb-0">
                                    <thead>
                                      <tr className="bg-white">
                                        <th className="text-[12px] font-semibold text-[#222222] text-left px-2 py-1">
                                          OTHERS
                                        </th>
                                        <th className="text-[12px] font-semibold text-[#222222] text-right px-2 py-1">
                                          AMOUNT / INR
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="text-[12px] font-medium text-[#2D2D2D] px-2 py-1">
                                          GST ({tax}%)
                                        </td>
                                        <td className="text-[12px] font-semibold text-[#2D2D2D] text-right px-2 py-1">
                                          ₹{Number(tax)}
                                        </td>
                                      </tr>

                                      {/* Tax Total */}
                                      <tr className="bg-[#FAFBFF] border-t border-[#DFDFDF] font-medium">
                                        <td className="text-[14px] font-medium text-[#2D2D2D] px-2 py-1">
                                          Total
                                        </td>
                                        <td className="text-[14px] font-semibold text-[#2D2D2D] text-right px-2 py-1">
                                          ₹{tax}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mb-3 mt-3 px-3 py-2 border rounded bg-[#FAFBFF] text-[13px] font-semibold">
                            <div className="text-[#4B4B4B] text-[14px] font-semibold font-gilroy">
                              Grand Total
                            </div>

                            <div className="text-[#1E1E1E] text-[14px] font-bold font-gilroy">
                              ₹ {totalAmount}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4">
                        <div className="grid grid-cols-12 gap-0">
                          <div className="col-span-12 md:col-span-6 mb-3">
                            <h6
                              className="text-[10px] font-gilroy font-bold tracking-wider"
                              style={{
                                color: useGradient
                                  ? defaultGradient
                                  : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                              }}
                            >
                              ACCOUNT DETAILS
                            </h6>

                            <p className="mb-1 text-[9px] font-gilroy font-medium text-[#171717]">
                              Account No :{" "}
                              {RentalinvoiceTemplate?.accountNumber || "N/A"}
                            </p>
                            <p className="mb-1 text-[9px] font-gilroy font-medium text-[#171717]">
                              IFSC Code :{" "}
                              {RentalinvoiceTemplate?.ifscCode || "N/A"}
                            </p>
                            <p className="mb-1 text-[9px] font-gilroy font-medium text-[#171717]">
                              Bank Name:{" "}
                              {RentalinvoiceTemplate?.bankName || "N/A"}
                            </p>
                            <p className="text-[9px] font-gilroy font-medium text-[#171717]">
                              UPI Details :{" "}
                              {RentalinvoiceTemplate?.upiId || "N/A"}
                            </p>
                          </div>
                          <div className="col-span-12 md:col-span-2"></div>
                          <div className="col-span-12 md:col-span-4 flex flex-col justify-between h-full -mt-6">
                            <div className="flex justify-end mt-auto">
                              {qrImage ? (
                                <img
                                  src={qrImage}
                                  alt="QR Code"
                                  className="h-[89px] w-[89px] rounded-sm"
                                />
                              ) : (
                                <BsQrCode
                                  className="h-[89px] w-[89px] rounded-sm"
                                  style={{
                                    color: useGradient
                                      ? defaultGradient
                                      : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-12 justify-between mt-2 mb-4 px-4 gap-0">
                        <div className="col-span-12 md:col-span-8">
                          <h4
                            className="text-[10px] font-gilroy font-semibold"
                            style={{
                              color: useGradient
                                ? defaultGradient
                                : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                            }}
                          >
                            Terms and Conditions
                          </h4>
                          <p className="text-[9px] font-gilroy font-medium text-[#3D3D3D] whitespace-pre-line break-words">
                            {terms}
                          </p>
                        </div>

                        <div className="col-span-12 md:col-span-4 flex flex-col justify-end items-end">
                          {rentalSignaturePreview && (
                            <img
                              src={rentalSignaturePreview}
                              alt="Digital Signature"
                              className="h-[60px] w-[100px] pl-7.5"
                            />
                          )}
                          <p className="text-[11px] font-gilroy font-medium text-[#2C2C2C]">
                            Authorized Signature
                          </p>
                        </div>
                      </div>

                      <hr
                        className="m-0 h-[1px] rounded-sm shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                        style={{
                          background: useGradient
                            ? defaultGradient
                            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                          border: "none",
                        }}
                      />

                      <div className="px-4 py-2">
                        <div className="flex justify-between text-center rounded-b-[38px]">
                          <p className="mb-0 text-[13px] font-gilroy font-medium text-[#4B4B4B]">
                            Email:{" "}
                            <span className="font-semibold text-[#222222]">
                              {paymentinvoiceemail}
                            </span>
                          </p>

                          <p className="mb-0 text-[13px] font-gilroy font-medium text-[#4B4B4B]">
                            Contact:{" "}
                            <span className="font-semibold text-[#222222]">
                              {paymentmobilenum}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedTab === "security_deposit_invoice" && (
                <>
                  <SecurityDepositInvoiceTemplate
                    hostelid={hostelid}
                    BillsTemplateList={BillsTemplateList}
                    templateThemes={templateThemes}
                  />{" "}
                </>
              )}

              {selectedTab === "rental_receipt" && (
                <>
                  <RentalReceiptPdfTemplate
                    hostelid={hostelid}
                    BillsTemplateList={BillsTemplateList}
                    templateReceiptThemes={templateReceiptThemes}
                  />
                </>
              )}
            </div>
          </div>
        </>
      )}

      {!canReadInvoice ? (
        <>
          <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">
            <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
              <label className="font-gilroy text-[18px] text-[#222] font-semibold">
                Bill Template Manager
              </label>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center mt-24">
            <img src={Emptystate} alt="Empty State" />

            <ErrorMessage
              message={["You do not have access to view Bill Templates"]}
              type="warning"
            />
          </div>
        </>
      ) : (
        cardshow && (
          <>
            {global ? (
              <div className="h-[580px] lg:h-[650px] 2xl:[580px] md:h-[480px] flex flex-col overflow-hidden py-2 w-full">
                <div className="bg-white sticky top-0 z-10 pb-2 h-20">
                  <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
                    <label className="font-gilroy text-[18px] text-[#222] font-semibold">
                      Bill Template Manager
                    </label>
                  </div>

                  <h5 className="flex items-start gap-2 font-gilroy text-[17px] font-semibold text-[rgba(34,34,34,1)]">
                    <img
                      src={leftarrow}
                      alt="leftarrow"
                      width={20}
                      height={20}
                      onClick={handleGlobalCloseForm}
                      className="cursor-pointer mt-0.5 shrink-0"
                    />
                    <span className="leading-[22px]">Global Bill Settings</span>
                  </h5>
                </div>

                <div className="flex-1 overflow-y-auto pr-2.5 pt-2 show-scroll">
                  <div className="w-full lg:w-2/3">
                    <p className="mb-5 -mt-2.5 font-gilroy text-sm text-gray-600 font-normal leading-5">
                      Add your basic billing details here. These will appear on
                      all invoices unless you choose to customize them in
                      individual templates.
                    </p>
                  </div>

                  <div className="-mt-7 mb-4 md:mb-3">
                    <div className="mb-5 flex flex-col md:flex-col lg:flex-row items-start gap-2">
                      <div className="w-full flex flex-col md:flex-col lg:w-1/3 gap-1">
                        <label className="block font-gilroy text-lg font-semibold text-gray-900">
                          Hostel/PG Logo
                        </label>

                        <div className="text-xs font-gilroy text-gray-600 whitespace-nowrap">
                          This will appear in Bill Template
                        </div>

                        <div className="flex items-start gap-2 mt-1">
                          <input
                            type="checkbox"
                            id="customizeLogo"
                            checked={isCheckedLogo}
                            onChange={handleLogoCheckboxChange}
                            className="-mt-1 cursor-pointer accent-[rgba(30,69,225,1)] "
                          />

                          <label
                            htmlFor="customizeLogo"
                            className="text-xs font-gilroy italic font-semibold text-[rgba(30,69,225,1)] -mt-1"
                          >
                            Customize in Specific Templates
                          </label>
                        </div>
                      </div>

                      <div className="w-full md:w-full lg:w-7/12">
                        <div className="flex flex-col md:flex-col lg:flex-row items-start lg:items-center justify-center gap-4 p-3 border rounded bg-gray-50">
                          <div
                            className="relative inline-block"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                          >
                            {previewURL ? (
                              <img
                                src={previewURL}
                                alt="logo-preview"
                                className="h-16 w-16 rounded"
                              />
                            ) : (
                              <DocumentUpload color="#1E45E1" />
                            )}

                            {previewURL && isHovering && (
                              <div className="absolute inset-0 flex items-center justify-center rounded bg-black/40">
                                <div
                                  onClick={
                                    canDeleteInvoice
                                      ? handleDeleteLogoGlobal
                                      : undefined
                                  }
                                  className={`rounded-full p-2 shadow-md transition-transform
    ${
      canDeleteInvoice
        ? "bg-white cursor-pointer hover:scale-110"
        : "bg-gray-200 cursor-not-allowed opacity-60"
    }`}
                                >
                                  <Trash
                                    size={12}
                                    color={canDeleteInvoice ? "#000" : "#999"}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div
                            className={`flex flex-col ${
                              !canUpdateInvoice
                                ? "opacity-60 pointer-events-none"
                                : ""
                            }`}
                          >
                            <div>
                              <label
                                className={`font-gilroy text-sm font-normal ${
                                  canUpdateInvoice
                                    ? "text-[rgba(30,69,225,1)] cursor-pointer"
                                    : "text-gray-400 cursor-not-allowed"
                                }`}
                                onClick={(e) => {
                                  if (!canUpdateInvoice) e.preventDefault();
                                }}
                              >
                                Choose file
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleFileChange}
                                  disabled={!canUpdateInvoice}
                                />
                              </label>

                              <span className="ml-1 font-gilroy text-sm font-normal text-gray-900">
                                {" "}
                                to Upload
                              </span>
                            </div>

                            <small className="mt-1 font-gilroy text-xs font-normal text-gray-600 whitespace-nowrap">
                              Must be in PNG Format (600px × 300px)
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    {fieldError && (
                      <div className="mt-0 mb-5 flex w-full justify-center">
                        <ErrorMessage message={fieldError} type="error" />
                      </div>
                    )}

                    <div className="mb-4 -mt-5 flex flex-col md:flex-col lg:flex-row items-start md:items-start gap-2">
                      <div className="w-full md:w-1/3">
                        <label className="block font-gilroy text-base font-semibold text-gray-900 mb-1">
                          Contact Number
                        </label>

                        <div className="flex items-start gap-2 md:mb-0">
                          <input
                            type="checkbox"
                            id="customizeContact"
                            checked={isCheckedmobile}
                            onChange={handleMobileCheckboxChange}
                            className="cursor-pointer accent-[rgba(30,69,225,1)] "
                          />
                          <label
                            htmlFor="customizeContact"
                            className=" font-gilroy text-xs italic font-semibold text-[rgba(30,69,225,1)] whitespace-nowrap"
                          >
                            Customize in Specific Templates
                          </label>
                        </div>
                      </div>

                      <div className="w-full md:w-full lg:w-7/12">
                        <div className="flex items-center h-11 overflow-hidden rounded-md border border-gray-200">
                          <select
                            defaultValue="+91"
                            className="bg-transparent font-gilroy text-xs font-normal text-gray-600 appearance-none focus:outline-none px-2"
                          >
                            <option value="+91">+91</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                          </select>

                          <input
                            type="text"
                            value={mobilenum}
                            onChange={handleMobile}
                            maxLength={10}
                            placeholder="9876543210"
                            className={`flex-1 bg-transparent font-gilroy text-xs focus:outline-none ${
                              mobilenum
                                ? "text-black font-medium"
                                : "text-gray-600 font-normal"
                            }`}
                          />
                        </div>

                        {MobileError && (
                          <ErrorMessage message={MobileError} type="error" />
                        )}
                      </div>
                    </div>

                    <div className="mb-4 flex flex-col md:flex-col lg:flex-row items-start gap-2">
                      <div className="w-full md:w-1/3">
                        <label className="mb-1 block font-gilroy text-base font-semibold text-gray-900">
                          E-Mail Address
                        </label>

                        <div className="flex items-start gap-2">
                          <input
                            type="checkbox"
                            id="customizeEmail"
                            checked={isCheckedEmail}
                            onChange={handleEmaiCheckboxChange}
                            className="cursor-pointer accent-[rgba(30,69,225,1)] "
                          />
                          <label
                            htmlFor="customizeEmail"
                            className="font-gilroy text-xs italic font-semibold text-[rgba(30,69,225,1)] whitespace-nowrap"
                          >
                            Customize in Specific Templates
                          </label>
                        </div>
                      </div>

                      <div className="w-full md:w-full lg:w-7/12">
                        <input
                          type="email"
                          placeholder="example@email.com"
                          value={email}
                          onChange={handleEmail}
                          className={`w-full h-11 rounded-md border border-gray-200 px-3 font-gilroy text-xs focus:outline-none ${
                            email
                              ? "text-black font-medium"
                              : "text-gray-600 font-normal"
                          }`}
                        />

                        {emailError && (
                          <ErrorMessage message={emailError} type="error" />
                        )}
                      </div>
                    </div>

                    <div className="mb-2 flex flex-col md:flex-col lg:flex-row items-start gap-2">
                      <div className="w-full md:w-1/3">
                        <label className="block font-gilroy text-base font-semibold text-gray-900 whitespace-nowrap">
                          Digital Signature Upload
                        </label>

                        <div className="mt-1 font-gilroy text-xs font-normal text-gray-600 whitespace-nowrap">
                          Add a respected person’s Signature
                        </div>

                        <div className="mt-2 flex items-start gap-2">
                          <input
                            type="checkbox"
                            id="customizeSignature"
                            checked={isCheckedSignature}
                            onChange={handleSignatureCheckboxChange}
                            className="cursor-pointer accent-[rgba(30,69,225,1)] "
                          />
                          <label
                            htmlFor="customizeSignature"
                            className="font-gilroy text-xs italic font-semibold text-[rgba(30,69,225,1)] whitespace-nowrap leading-3.5"
                          >
                            Customize in Specific Templates
                          </label>
                        </div>
                      </div>

                      <div className="w-full md:w-full lg:w-7/12">
                        <div
                          className="relative mt-2 flex items-center justify-center h-28 rounded border-2 border-dotted border-gray-300"
                          onMouseEnter={() => setIsHoveringSign(true)}
                          onMouseLeave={() => setIsHoveringSign(false)}
                        >
                          {signPreview ? (
                            <>
                              <img
                                src={signPreview}
                                alt="uploaded-signature"
                                className="max-h-full max-w-full"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.style.display = "none";
                                }}
                              />

                              {isHoveringSign && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                  <div
                                    onClick={() => {
                                      if (canDeleteInvoice) {
                                        handleDeleteSignatureGlobal();
                                      }
                                    }}
                                    className={`flex items-center justify-center rounded-full p-2 shadow-md
    ${canDeleteInvoice ? "bg-white cursor-pointer" : "bg-gray-200 cursor-not-allowed opacity-60"}
  `}
                                  >
                                    <Trash
                                      size={16}
                                      color={canDeleteInvoice ? "#000" : "#999"}
                                    />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="font-gilroy text-sm font-normal text-gray-900">
                              No signature uploaded
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <label
                              className={`font-gilroy text-sm font-normal
      ${
        canUpdateInvoice
          ? "text-[rgba(30,69,225,1)] cursor-pointer"
          : "text-gray-400 cursor-not-allowed"
      }`}
                              onClick={(e) => {
                                if (!canUpdateInvoice) e.preventDefault();
                              }}
                            >
                              Choose file
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleFileSignatureChange}
                                disabled={!canUpdateInvoice}
                              />
                            </label>

                            <span className="ml-1 font-gilroy text-sm font-normal text-gray-900">
                              to Upload Image
                            </span>
                          </div>

                          <div className="flex gap-4">
                            <button
                              onClick={handleClear}
                              className="font-gilroy text-base font-normal text-gray-600"
                            >
                              Clear
                            </button>
                            <button
                              onClick={handleSignatureDone}
                              className="font-gilroy text-base font-semibold text-[rgba(30,69,225,1)]"
                            >
                              Done
                            </button>
                          </div>
                        </div>

                        {noChangesDetectedMsg && (
                          <ErrorMessage
                            message={noChangesDetectedMsg}
                            type="error"
                          />
                        )}

                        {signature_errmsg.trim() !== "" && (
                          <ErrorMessage
                            message={signature_errmsg}
                            type="error"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {savebuttonshow && (
                    <div className="flex justify-end mb-4">
                      <button
                        disabled={!canUpdateInvoice}
                        type="button"
                        onClick={handleReset}
                        className="!border !border-black text-black !font-gilroy !font-semibold !text-[16px] rounded-[12px] !px-4 !py-2 disabled:opacity-50 mr-8"
                      >
                        Reset
                      </button>

                      <button
                        disabled={!canUpdateInvoice}
                        type="button"
                        onClick={handleSaveTemplate}
                        className="bg-[#1E45E1] text-white !font-gilroy !font-semibold !text-[16px] rounded-[12px] !px-4 !py-2 disabled:opacity-50"
                      >
                        {BillsTemplateList.mobile ? "Update" : "Save"}
                      </button>
                    </div>
                  )}

                  {/* {emailError && (
             <ErrorMessage message={emailError} type="error"/>
            )} */}
                </div>
              </div>
            ) : (
              <div>
                <div className="bg-white sticky top-0 z-10 pb-2 h-auto shrink-0 mt-2">
                  <label className="text-[18px] font-semibold text-[#222] font-gilroy">
                    Bill Templates
                  </label>
                </div>

                <div className="rounded-lg p-3 bg-blue-50">
                  <div className="mb-3 bg-white rounded-lg shadow-sm border border-transparent">
                    <div className="flex items-center justify-between p-4">
                      <div className="d-flex justify-content-between align-items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 p-2.5 rounded-full bg-emerald-50">
                          <RiPercentLine className="text-[#00A63E] text-xl" />
                        </div>

                        <div>
                          <h6 className="mb-1 font-gilroy text-[17px] font-semibold text-[#222222] whitespace-nowrap">
                            Global Bill Setting
                          </h6>

                          <p className="mb-0 font-gilroy text-xs font-semibold text-gray-500 whitespace-nowrap">
                            Add your basic billing details here
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handleEditChange}
                        className="flex items-center px-3 p-2 font-gilroy text-base font-semibold text-white bg-[#1E45E1] border border-[#1E45E1] rounded-xl font-gilroy"
                      >
                        Edit <Edit size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-transparent">
                    <div className="flex items-center justify-between p-2.5">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#FAF5FF] -mt-3">
                          <FiCode className="text-[#9810FA] text-lg" />
                        </div>

                        <div className="ml-1 pt-1">
                          <h6 className="mb-1 text-[17px] font-semibold text-[#222] whitespace-nowrap font-gilroy">
                            Templates
                          </h6>
                          <p className="text-xs font-semibold text-gray-500 lg:whitespace-nowrap font-gilroy">
                            Fill the template form with details you like to
                            customize.
                          </p>
                        </div>
                      </div>

                      {!BillsTemplateList?.mobile ? (
                        <OverlayTrigger
                          placement="bottom"
                          overlay={
                            <Tooltip className="bg-white text-[#222] font-medium border border-gray-200 shadow-md">
                              Set the Global bill settings before entering the
                              Templates.
                            </Tooltip>
                          }
                        >
                          <span className="inline-block">
                            <button
                              onClick={handleShow}
                              disabled
                              className="flex items-center px-3 py-2 text-white text-base font-semibold rounded-xl bg-[#1E45E1] border border-[#1E45E1] pointer-events-none font-gilroy"
                            >
                              Go to Templates
                              <FiArrowRight className="ml-2" />
                            </button>
                          </span>
                        </OverlayTrigger>
                      ) : (
                        <button
                          onClick={handleShow}
                          className="flex items-center px-3 py-2 text-white text-base font-semibold rounded-xl bg-[#1E45E1] border border-[#1E45E1] font-gilroy"
                        >
                          Go to Templates
                          <FiArrowRight className="ml-2" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      )}

      {bankaccountform && (
        <BankingAddForm
          showForm={bankaccountform}
          setShowForm={handleCloseFormBank}
          setEdit={() => {}}
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
};
export default withErrorBoundary(SettingInvoice);
