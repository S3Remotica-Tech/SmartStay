/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/Settings/Settings.css";
import "react-datepicker/dist/react-datepicker.css";
import mob from "../../Assets/Images/New_images/Rectangle 77.png";
import substrac from "../../Assets/Images/New_images/Subtract.png";
import frame from "../../Assets/Images/New_images/FramePDF.png";
import receiptLogo from "../../Assets/Images/New_images/Group_Logo.png";
import received from "../../Assets/Images/New_images/received.png";
import "react-toastify/dist/ReactToastify.css";
import Topbottom from "../../Assets/Images/cancel_presentation.png";
import left85arrow from "../../Assets/Images/arrow85.png";
import printdown from "../../Assets/Images/printericon.png";
import downloadicon from "../../Assets/Images/pdfdown.png";
import CloseIcon from "../../Assets/Images/close_icon.png";
import { Location, Call, Profile } from "iconsax-react";
import { IoBed } from "react-icons/io5";
import Payment from "../../Assets/Images/New_images/Mask-group.png";
import PropTypes from "prop-types";

const RentalReceiptPdfTemplate = ({
  BillsTemplateList,
  templateReceiptThemes,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // const [notes_errmsg, setNotesErrMsg] = useState('')
  // const [terms_errmsg, setTermsErrMsg] = useState('')
  const [showFullView, setShowFullView] = useState(false);
  // const [editErrmsg, setEditErrMessage] = useState('')

  const [color, setColor] = useState({ r: 0, g: 163, b: 46, a: 1 });
  const [useGradient, setUseGradient] = useState(true);
  const defaultGradient = "rgba(0,163, 46, 1)";

  // const canUpdateInvoice = useHasPermission("Bills", "canUpdate")

  // const {
  //   // canWriteModule: canWriteInvoice,
  //   // canReadModule: canReadReceipt,
  //   canUpdateModule: canUpdateInvoice,
  //   // canDeleteModule: canDeleteInvoice,
  // } = useHasPermission("Bills");

  // const handleColorChange = (newColor) => {
  //   setColor(newColor);
  //   setUseGradient(false);
  //   setEditErrMessage("")
  // };

  // const presetColors = [
  //   "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
  //   "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
  // ];

  // const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
  // const alphaValue = Math.round(color.a * 100);

  // const handleNotesChange = (e) => {
  //   const Value = e.target.value
  //   setNotes(Value)
  //   setEditErrMessage("")
  //   if (Value.trim() !== "") {
  //     setNotesErrMsg("");
  //   }
  // }

  // const handleTermsChange = (e) => {
  //   const Value = e.target.value
  //   setTerms(Value)
  //   setEditErrMessage("")
  //   if (Value.trim() !== "") {
  //     setTermsErrMsg("");
  //   }
  // }

  const [notes, setNotes] = useState(
    '"Your comfort is our priority – See you again at Smart Stay!"',
  );

  const [terms, setTerms] = useState(
    "Tenants must pay all dues on or before the due date, maintain cleanliness, and follow PG rules; failure may lead to penalties or termination of stay.",
  );

  // const [allowImageUpload, setAllowImageUpload] = useState(false);
  // const [allowEditFields, setAllowEditFields] = useState({
  //   contact: false,
  //   email: false,
  //   hostelLogo: false,
  //   digitalSignature: false,
  // });
  // const [contactnumberform, setContactNumberForm] = useState(false)

  // const fileInputRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  // const [signature_errmsg, setSignatureErrMsg] = useState("")
  // const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

  // const handleFileSignatureChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setSignature(file);
  //     setSignaturePreview(URL.createObjectURL(file));
  //     setSignatureErrMsg("");
  //     setEditErrMessage('')
  //     setIsSignatureConfirmed(false);
  //   }
  // };

  // const handleClear = () => {
  //   setSignature(null);
  //   setSignaturePreview(null)
  //   setSignatureErrMsg("");
  //   setEditErrMessage('')
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = '';
  //   }
  // };

  // const handleSignatureDone = () => {
  //   if (!signature) {
  //     setSignatureErrMsg("Please select a signature file.");
  //   } else {
  //     setSignatureErrMsg("");
  //     setEditErrMessage('')
  //     setIsSignatureConfirmed(true);
  //   }
  // };

  // const handleShowContactNumberForm = () => {
  //   setContactNumberForm(true);
  //   setAllowImageUpload(false);
  // };

  // const handleCloseContactNumberForm = () => {
  //   setContactNumberForm(false);
  //   setAllowImageUpload(false);
  //   setAllowEditFields({
  //     contact: false,
  //     email: false,
  //     hostelLogo: false,
  //     digitalSignature: false,
  //   });
  // };

  // const handleEditAnyway = () => {
  //   setAllowImageUpload(true);
  //   setAllowEditFields({
  //     contact: true,
  //     email: true,
  //     hostelLogo: true,
  //     digitalSignature: true,
  //   });
  //   setContactNumberForm(false);
  // };

  const [mobilenum, setMobileNum] = useState("");
  // const [MobileError, setMobileError] = useState("")
  const [email, setEmail] = useState("");
  // const [emailError, setEmailError] = useState("")

  // const handleMobile = (e) => {
  //   const input = e.target.value.replace(/\D/g, "");
  //   setMobileNum(input);
  //   setEditErrMessage('')
  //   if (input.length === 0) {
  //     setMobileError("");
  //   } else if (input.length < 10) {
  //     setMobileError(" Please Enter Valid Mobile Number");
  //   } else if (input.length === 10) {
  //     setMobileError("");
  //   } else if (input.length > 10) {
  //     setMobileError(" Please Enter Valid Mobile Number");
  //   }
  // };

  // const handleEmail = (e) => {
  //   const emailValue = e.target.value.toLowerCase();
  //   setEmail(emailValue);
  //   setEditErrMessage('')
  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
  //   const isValidEmail = emailRegex.test(emailValue);
  //   if (!emailValue) {
  //     setEmailError("");

  //   } else if (!isValidEmail) {

  //     setEmailError("Please Enter  Valid Email Id");
  //   } else {
  //     setEmailError("");

  //   }

  // };

  const [logoPreview, setLogoPreview] = useState(null);
  const [hostel_logo, setHostelLogo] = useState(null);

  // console.log("logoPreview", logoPreview);

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

  // const handleSaveTemplate = () => {
  //   const currentData = {
  //     contact_number: mobilenum,
  //     email: email,
  //     receiptSignatureUrl: signature || '',
  //     notes: notes?.replace(/"/g, '') || '',
  //     terms_and_condition: terms || '',
  //     template_theme: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
  //     logo_url: hostel_logo || '',
  //   };

  //   const originalData = {
  //     contact_number: RentalreceiptTemplate.contact_number,
  //     email: RentalreceiptTemplate.email,
  //     receiptSignatureUrl: RentalreceiptTemplate.receiptSignatureUrl || '',
  //     notes: RentalreceiptTemplate.notes?.replace(/"/g, '') || '',
  //     terms_and_condition: RentalreceiptTemplate.terms_and_condition || '',
  //     template_theme: RentalreceiptTemplate.template_theme || '',
  //     logo_url: RentalreceiptTemplate.logo_url || ''
  //   };

  //   if (JSON.stringify(currentData) === JSON.stringify(originalData)) {
  //     setEditErrMessage("No changes detected");
  //     setSignatureErrMsg("");
  //     return;
  //   }

  //   if (RentalreceiptTemplate.isSignatureCustomized) {
  //     const Signatureverify = !RentalreceiptTemplate.receiptSignatureUrl

  //     if (signature && !isSignatureConfirmed && Signatureverify) {
  //       setSignatureErrMsg("Please click Done after selecting a signature");
  //       return
  //     }
  //   }

  //   if (RentalreceiptTemplate.isMobileCustomized) {
  //     if (mobilenum && mobilenum.length < 10) {
  //       setMobileError(" Please Enter Valid Mobile Number");
  //       return
  //     }
  //     else if (mobilenum.length === 10) {
  //       setMobileError("");
  //     }
  //   }

  //   if (RentalreceiptTemplate.isMailIdCustomized) {
  //     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
  //     const isValidEmail = emailRegex.test(email);
  //     if (!email) {
  //       setEmailError("");
  //     } else if (!isValidEmail) {
  //       setEmailError("Please Enter  Valid Email Id");
  //     } else {
  //       setEmailError("");
  //     }
  //   }

  //   if (RentalreceiptTemplate.typeId && state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "ADDGLOBALSETTING",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         templateTypeId: RentalreceiptTemplate.typeId,
  //         receiptLogo: hostel_logo,
  //         receiptSign: signature,
  //         mobile: BillsTemplateList.mobile,
  //         email: BillsTemplateList.emailId,
  //         receiptPhoneNumber: mobilenum,
  //         receiptMailId: email,
  //         isMobileCustomized: BillsTemplateList?.isMobileCustomized,
  //         isEmailCustomized: BillsTemplateList?.isMailIdCustomized,
  //         isLogoCustomized: BillsTemplateList?.isLogoCustomized,
  //         isSignatureCustomized: BillsTemplateList?.isSignatureCustomized,
  //         receiptNotes: notes,
  //         receiptTermsAndCondition: terms,
  //         receiptTemplateColor: useGradient
  //           ? defaultGradient
  //           : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
  //       },
  //     });
  //     setLoading(true)

  //   }

  // };

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
    if (state.Settings.settingGlobalAddStatusCode === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_GLOBAL_SETTINGS" });
      }, 1000);
    }
  }, [state.Settings.settingGlobalAddStatusCode]);

  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetErrorCode === 500) {
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "CLEAR_ERROR_TEMPLATELIST_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.SettingsBilltemplategetErrorCode]);

  const RentalreceiptTemplate =
    BillsTemplateList &&
    BillsTemplateList.templates?.find((template) => template.type === "RENTAL");

  useEffect(() => {
    if (RentalreceiptTemplate) {
      const logo = BillsTemplateList?.isLogoCustomized
        ? RentalreceiptTemplate?.receiptLogoUrl
        : BillsTemplateList?.logo || "";

      setLogoPreview(logo);
      setHostelLogo(logo);

      setMobileNum(
        BillsTemplateList?.isMobileCustomized &&
          RentalreceiptTemplate?.receiptMobileNumber
          ? RentalreceiptTemplate?.receiptMobileNumber
          : BillsTemplateList?.mobile || "",
      );

      setEmail(
        BillsTemplateList?.isMailIdCustomized &&
          RentalreceiptTemplate?.receiptMailId
          ? RentalreceiptTemplate?.receiptMailId
          : BillsTemplateList?.emailId || "",
      );

      const signature = BillsTemplateList?.isSignatureCustomized
        ? RentalreceiptTemplate?.receiptSignatureUrl
        : BillsTemplateList?.signature;

      setSignaturePreview(signature);
      setSignature(signature);

      setNotes(RentalreceiptTemplate?.receiptNotes || "");
      setTerms(RentalreceiptTemplate?.receiptTermsAndCondition || "");

      const templateTheme = RentalreceiptTemplate?.receiptTemplateColor;

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
    if (
      templateReceiptThemes &&
      Object.keys(templateReceiptThemes).length > 0
    ) {
      if (templateReceiptThemes?.logoPreview) {
        setLogoPreview(templateReceiptThemes.logoPreview);

        setHostelLogo(templateReceiptThemes.logoPreview);
      }

      if (templateReceiptThemes?.mobilenum) {
        setMobileNum(templateReceiptThemes.mobilenum);
      }

      if (templateReceiptThemes?.email) {
        setEmail(templateReceiptThemes.email);
      }

      if (templateReceiptThemes?.signaturePreview) {
        setSignaturePreview(templateReceiptThemes.signaturePreview);

        setSignature(templateReceiptThemes.signaturePreview);
      }

      if (templateReceiptThemes?.notes) {
        setNotes(templateReceiptThemes.notes);
      }

      if (templateReceiptThemes?.terms) {
        setTerms(templateReceiptThemes.terms);
      }

      if (templateReceiptThemes?.color) {
        setColor(templateReceiptThemes.color);
        setUseGradient(false);
      }
    }
  }, [BillsTemplateList, RentalreceiptTemplate, templateReceiptThemes]);

  return (
    <>
      <div>
        {loading && (
          <div
            style={{
              position: "fixed",
              top: "48%",
              left: "68%",
              transform: "translate(-50%, -50%)",
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              zIndex: 1050,
            }}
          >
            <div
              style={{
                borderTop: "4px solid #1E45E1",
                borderRight: "4px solid transparent",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                animation: "spin 1s linear infinite",
              }}
            ></div>
          </div>
        )}

        <div
          className="g-0 d-flex justify-content-center ps-5 pe-5 pt-1 "
          style={{ backgroundColor: "#F7F8FC" }}
        >
          <div
            className=""
            ref={cardRef}
            style={{
              maxHeight: 650,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <div
              ref={innerScrollRef}
              className=" col-lg-12  justify-content-center"
              style={{
                borderBottomLeftRadius: "13px",
                borderBottomRightRadius: "13px",
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                marginBottom: 50,
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                className="p-3 position-relative"
                style={{
                  backgroundColor: "",
                }}
              >
                <div className="row d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div className="col-6">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Preview"
                        style={{
                          height: 25,
                          maxWidth: 134,
                          borderRadius: "4px",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <img
                        src={receiptLogo}
                        alt="upload"
                        style={{
                          height: 25,
                          maxWidth: 134,
                          borderRadius: "4px",
                          objectFit: "contain",
                        }}
                      />
                    )}
                  </div>

                  <div className="mt-2 col-5 ps-4 pe-0">
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      {state.UsersList.hotelDetailsinPg?.name}
                    </div>

                    <div
                      style={{
                        fontSize: 8,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
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
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <hr
                className="m-0"
                style={{
                  border: "none",
                  height: "1px",
                  background: useGradient
                    ? defaultGradient
                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2px",
                }}
              />

              <div
                className="container rounded-bottom  position-relative"
                style={{ width: "100%" }}
              >
                <div className="text-center pt-2 pb-1">
                  <h5
                    style={{
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 600,
                      color: useGradient
                        ? defaultGradient
                        : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                    }}
                  >
                    Payment Receipt
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
                      Receipt to:
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
                  <div className="col-md-6 mb-1 ps-5">
                    <div className="row">
                      <div
                        className="col-6 text-muted  text-end mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                          color: "rgba(65, 65, 65, 1)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Receipt No :
                      </div>
                      <div
                        className="col-6  text-start mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          color: "rgba(23, 23, 23, 1)",
                        }}
                      >
                        #SSR001
                      </div>

                      <div
                        className="col-6 text-muted  text-end mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                          color: "rgba(65, 65, 65, 1)",
                        }}
                      >
                        Invoice Ref :
                      </div>
                      <div
                        className="col-6 text-start mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          color: "rgba(23, 23, 23, 1)",
                        }}
                      >
                        #324515
                      </div>

                      <div
                        className="col-6 text-muted text-end mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                          color: "rgba(65, 65, 65, 1)",
                        }}
                      >
                        Date :
                      </div>
                      <div
                        className="col-6  text-start mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          color: "rgba(23, 23, 23, 1)",
                        }}
                      >
                        31 March 2024
                      </div>

                      <div
                        className="col-6 text-muted  text-end mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                          color: "rgba(65, 65, 65, 1)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Payment Mode :
                      </div>
                      <div
                        className="col-6  text-start mt-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          color: "rgba(23, 23, 23, 1)",
                          paddingLeft: 18,
                        }}
                      >
                        UPI / Net Banking{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex py-1 px-4">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      border: "1px solid #E6E6E6",
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                      width: "100%",
                      fontFamily: "Gilroy",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRight: "1px solid #E6E6E6",
                        fontWeight: 600,
                        fontSize: "13px",
                        color: "#000",
                        textTransform: "capitalize",
                      }}
                    >
                      {" "}
                      TOTAL PAID AMOUNT <br />
                      {/* {Number(pdfDetails?.invoiceAmount) > 0 ? "TOTAL PAID AMOUNT" : "Total Refunded Amount"} */}
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          color: "#6D6D6D",
                          fontSize: 11,
                        }}
                      >
                        Security Deposit (Advance)
                      </span>
                    </div>

                    <div
                      style={{
                        flex: 2,
                        backgroundColor: "#fff",
                        borderRadius: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          color: "#000000",
                          fontWeight: 600,
                          fontSize: "18px",
                          backgroundColor: "#F1FFF5",
                          padding: 10,
                          borderTopRightRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            height: "24px",
                            width: "3px",
                            backgroundColor: "#00A651",
                            // backgroundColor: Number(pdfDetails?.invoiceAmount) > 0 ? "#00A651" : "#FF0000",
                          }}
                        />
                        ₹ 5000
                      </div>
                      <div
                        style={{
                          marginTop: "0px",
                          fontSize: "12px",
                          color: "#4B4B4B",
                          padding: 10,
                        }}
                      >
                        Five Thousand Rupees only
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 mb-0 px-4 grid grid-cols-2 gap-4">
                  <div>
                    <h6
                      className="text-[10px] font-semibold font-gilroy"
                      style={{
                        color: useGradient
                          ? defaultGradient
                          : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                      }}
                    >
                      Terms and Conditions
                    </h6>

                    <p className="text-[9px] text-[#555] font-gilroy break-words">
                      {terms}
                    </p>
                  </div>

                  <div className="flex flex-col justify-end items-end">
                    <div className="mt-auto">
                      {signaturePreview && (
                        <img
                          src={signaturePreview}
                          alt="Digital Signature"
                          className="h-[60px] w-[130px]"
                        />
                      )}

                      <p className="text-[11px] font-gilroy text-[#2C2C2C] pt-1">
                        Authorized Signature
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row justify-content-between mt-2 mb-0 px-5">
                  <div className="col-md-8 p-0">
                    <p
                      style={{
                        whiteSpace: "pre-line",
                        fontSize: "11px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "#3D3D3D",
                        paddingRight: 50,
                      }}
                    >
                      {notes}
                    </p>
                  </div>

                  <div className="col-md-4 p-0 d-flex flex-column justify-content-end align-items-end bg-white">
                    <p className="text-success fw-bold border-success d-inline-block">
                      <img
                        src={Payment}
                        alt="payment received"
                        className="img-fluid"
                        style={{ transform: "rotate(0deg)" }}
                      />
                    </p>
                  </div>
                </div>

                <div className="px-4 py-1">
                  <div
                    className="table-responsive row justify-content-between mt-0 mb-2 px-4"
                    style={{ fontFamily: "Gilroy, sans-serif" }}
                  >
                    <table
                      className="p-0"
                      style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        border: "1px solid #dee2e6",
                        borderRadius: "12px",
                        overflow: "hidden",
                        fontFamily: "Gilroy, sans-serif",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "left",
                              borderBottom: "1px solid #dee2e6",
                              width: "20%",
                            }}
                          >
                            INVOICE NO.
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "left",
                              borderBottom: "1px solid #dee2e6",
                              width: "20%",
                            }}
                          >
                            INV DATE
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "right",
                              borderBottom: "1px solid #dee2e6",
                              width: "30%",
                            }}
                          >
                            INVOICE AMOUNT
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "right",
                              borderBottom: "1px solid #dee2e6",
                              width: "30%",
                            }}
                          >
                            PAYMENT AMOUNT
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          style={{
                            borderBottom: "1px solid #dee2e6",
                            backgroundColor: "#fff",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#1E80E1",
                              textDecoration: "underline",
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            INV-501
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            03-11-2025
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "right",
                              verticalAlign: "middle",
                            }}
                          >
                            ₹ 3000
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "right",
                              verticalAlign: "middle",
                            }}
                          >
                            ₹ 3000
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* <div className="px-4" style={{ marginTop: 10 }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 style={{
                      fontSize: '10px',
                      fontFamily: 'Gilroy',
                      fontWeight: 700,
                      color: '#00A32E',
                      letterSpacing: '1px'
                    }}
                    >PAYMENT DETAILS</h6>
                    <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode:
                      G-Pay</p>

                    <p
                      className="mb-1"
                      style={{
                        fontSize: '9px',
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: 'rgba(23, 23, 23, 1)',
                      }}
                    >
                      Transaction ID: GPay-2134-8482-XYZ
                    </p>


                    <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Received By: {state.createAccount?.accountList?.roleName} - {state.createAccount?.accountList?.firstName}</p>
                    <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', marginTop: "-14px" }}>Status: Paid</p>

                  </div>
                  <div className="col-md-6 text-end">
                    <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={71} width={152} /></p>

                  </div>
               

                </div>
              </div> */}

              <hr
                className="m-0"
                style={{
                  border: "none",
                  height: "1px",
                  background: useGradient
                    ? defaultGradient
                    : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2px",
                }}
              />
              <div className="px-4 py-2 pb-2">
                <div
                  className="text-center rounded-bottom d-flex justify-content-between"
                  style={{
                    borderTopRightRadius: "38px",
                    borderTopLeftRadius: "38px",
                  }}
                >
                  <p
                    className="mb-0"
                    style={{
                      fontSize: "13px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      color: "#4B4B4B",
                    }}
                  >
                    Email:{" "}
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                        color: "#222222",
                      }}
                    >
                      {email}
                    </span>
                  </p>

                  <p
                    className="mb-0"
                    style={{
                      fontSize: "13px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      color: "#4B4B4B",
                    }}
                  >
                    Contact:{" "}
                    <span
                      style={{
                        fontSize: "13px",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                        color: "#222222",
                      }}
                    >
                      {mobilenum}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showFullView && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "rgba(90, 90, 90, 0.22)",
              zIndex: 9999,
              overflowY: "auto",
              marginLeft: "10%",
            }}
          >
            <div
              className="bg-white   shadow"
              style={{
                width: "100%",
                maxWidth: "900px",
                minHeight: "90vh",
                overflowY: "auto",
                position: "relative",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#2C2C2C",
                  color: "#fff",
                  padding: "7px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  position: "relative",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginLeft: 25,
                  }}
                >
                  <span style={{ fontSize: "8px" }}>1 / 1</span>
                  <div
                    style={{ borderLeft: "1px solid #555", height: "20px" }}
                  ></div>

                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "3px" }}
                  >
                    <button className="btn btn-sm text-white px-0 py-0 mb-1 me-1">
                      −
                    </button>
                    <span style={{ fontWeight: "bold", fontSize: "8px" }}>
                      100%
                    </span>
                    <button className="btn btn-sm text-white px-0 py-0 mb-1 ms-1">
                      +
                    </button>
                  </div>

                  <div
                    style={{ borderLeft: "1px solid #555", height: "20px" }}
                  ></div>

                  <button className="btn btn-sm  px-1 py-0 me-0">
                    <img src={Topbottom} alt="topbottom" />
                  </button>
                  <button className="btn btn-sm px-1 py-0">
                    <img src={left85arrow} alt="left85arrow" />
                  </button>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <button className="btn btn-sm  px-2 py-0">
                    <img
                      src={downloadicon}
                      alt="topbottom"
                      style={{ width: "12px", height: "12px" }}
                    />
                  </button>
                  <button className="btn btn-sm  px-2 py-0">
                    <img
                      src={printdown}
                      alt="topbottom"
                      style={{ width: "12px", height: "12px" }}
                    />
                  </button>
                  <div
                    className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                    onClick={() => setShowFullView(false)}
                    style={{
                      width: "30px",
                      height: "30px",
                      cursor: "pointer",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    }}
                  >
                    <img
                      src={CloseIcon}
                      alt="Close"
                      style={{ width: "12px", height: "12px" }}
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <div
                  className="receipt-container border ps-5 pe-5 pb-2 pt-2 mt-3 col-lg-8"
                  ref={cardRef}
                  style={{ borderRadius: "8px" }}
                >
                  <div
                    ref={innerScrollRef}
                    className="show-scroll col-lg-12 justify-content-center"
                  >
                    <div
                      className=" text-white  p-2 position-relative"
                      style={{
                        minHeight: 90,
                        backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2 mb-2 mb-lg-0 mt-2">
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Preview"
                              style={{
                                height: 64,
                                width: 74,
                                borderRadius: "4px",
                              }}
                            />
                          ) : (
                            <img
                              src={receiptLogo}
                              alt="upload"
                              style={{
                                height: 64,
                                width: 74,
                                borderRadius: "4px",
                              }}
                            />
                          )}
                          <div></div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {state.UsersList.hotelDetailsinPg?.name}
                          </div>

                          <div
                            style={{
                              fontSize: 8,
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
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
                                <React.Fragment key={idx}>
                                  {line}
                                  <br />
                                </React.Fragment>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      className="container bg-white rounded-bottom border position-relative"
                      style={{ width: "100%" }}
                    >
                      <div className="text-center pt-1 pb-1">
                        <h5
                          className=""
                          style={{
                            fontSize: "14px",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            color: "rgba(23, 23, 23, 1)",
                          }}
                        >
                          Payment Receipt
                        </h5>
                      </div>

                      <div className="row px-4 mt-1">
                        <div className="col-md-6 mb-1">
                          <p
                            className=" mb-1"
                            style={{
                              color: "rgba(0, 163, 46, 1)",
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 400,
                              fontStyle: "italic",
                            }}
                          >
                            Bill To :
                          </p>
                          <p
                            className="mb-1 me-1"
                            style={{
                              fontSize: "11px",
                              fontFamily: "Gilroy",
                              fontWeight: 400,
                              color: "rgba(23, 23, 23, 1)",
                            }}
                          >
                            Mr.{" "}
                            <span
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "#000000",
                              }}
                            >
                              Muthuraja M
                            </span>
                          </p>
                          <p className="mb-1">
                            <img src={mob} alt="mob" width={12} height={12} />
                            <span
                              className="ms-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#000000",
                              }}
                            >
                              +91 85647 85332
                            </span>
                          </p>
                          <p
                            className="mb-1"
                            style={{
                              fontSize: "11px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "#000000",
                            }}
                          >
                            <img
                              src={frame}
                              alt="frame"
                              width={15}
                              height={15}
                              className="me-1"
                            />
                            No 103 -02{" "}
                          </p>
                          <div
                            className="d-flex"
                            style={{
                              fontSize: "11px",
                              fontFamily: "Gilroy",
                              fontWeight: 400,
                              color: "rgba(34, 34, 34, 1)",
                            }}
                          >
                            <div className="me-2">
                              <img src={substrac} alt="subs" />
                            </div>

                            <div>
                              <p
                                style={{
                                  fontSize: "11px",
                                  fontFamily: "Gilroy",
                                }}
                              >
                                9, 8th Main Rd, Someshwara Nagar, <br></br>
                                Bengaluru, Karnataka 560011
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-1 ps-5">
                          <div className="row">
                            <div
                              className="col-6 text-muted  text-end mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                                color: "rgba(65, 65, 65, 1)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Receipt No :
                            </div>
                            <div
                              className="col-6  text-start mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "rgba(23, 23, 23, 1)",
                              }}
                            >
                              #SSR001
                            </div>

                            <div
                              className="col-6 text-muted  text-end mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                                color: "rgba(65, 65, 65, 1)",
                              }}
                            >
                              Invoice Ref :
                            </div>
                            <div
                              className="col-6 text-start mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "rgba(23, 23, 23, 1)",
                              }}
                            >
                              #324515
                            </div>

                            <div
                              className="col-6 text-muted text-end mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                                color: "rgba(65, 65, 65, 1)",
                              }}
                            >
                              Date :
                            </div>
                            <div
                              className="col-6  text-start mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "rgba(23, 23, 23, 1)",
                              }}
                            >
                              31 March 2024
                            </div>

                            <div
                              className="col-6 text-muted  text-end mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                                color: "rgba(65, 65, 65, 1)",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Payment Mode :
                            </div>
                            <div
                              className="col-6  text-start mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "rgba(23, 23, 23, 1)",
                                paddingLeft: 18,
                              }}
                            >
                              UPI / Net Banking{" "}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pb-3">
                        <div className="table-responsive">
                          <table className="table  text-center align-middle">
                            <thead
                              style={{
                                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                                color: "#FFFFFF",
                              }}
                            >
                              <tr style={{ color: "white" }}>
                                <th
                                  style={{
                                    borderTopLeftRadius: "12px",
                                    borderBottomLeftRadius: "12px",
                                    color: "white",
                                    fontSize: "11px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                  }}
                                >
                                  S.NO
                                </th>
                                <th
                                  style={{
                                    color: "white",
                                    fontSize: "11px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                  }}
                                >
                                  Inv No
                                </th>
                                <th
                                  style={{
                                    color: "white",
                                    fontSize: "11px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                  }}
                                >
                                  Description
                                </th>

                                <th
                                  style={{
                                    borderTopRightRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                    color: "white",
                                    fontSize: "10px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                  }}
                                >
                                  Amount / INR
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                                <td
                                  style={{
                                    fontSize: "10px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  1
                                </td>
                                <td
                                  style={{
                                    fontSize: "10px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  INV-004
                                </td>
                                <td
                                  style={{
                                    fontSize: "10px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  payementreceipt
                                </td>
                                <td
                                  style={{
                                    fontSize: "10px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  Rs: 8,000.00
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="d-flex justify-content-end mt-1">
                          <div
                            className="w-100 w-md-50"
                            style={{ paddingRight: "50px" }}
                          >
                            <div className="d-flex justify-content-end py-1">
                              <div
                                className="w-50 text-end"
                                style={{
                                  fontSize: " 10px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  color: "rgba(23, 23, 23, 1)",
                                }}
                              >
                                Sub Total
                              </div>
                              <div
                                className="w-25 text-end"
                                style={{
                                  fontSize: "10px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  color: "rgba(23, 23, 23, 1)",
                                }}
                              >
                                Rs: 1150.00
                              </div>
                            </div>
                            <div className="d-flex justify-content-end py-2 fw-bold">
                              <div
                                className="w-50 text-end"
                                style={{
                                  fontSize: "10px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  color: "rgba(23, 23, 23, 1)",
                                }}
                              >
                                Total
                              </div>
                              <div
                                className="w-25 text-end"
                                style={{
                                  fontSize: "9px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  color: "rgba(23, 23, 23, 1)",
                                }}
                              >
                                Rs: 9,150.00
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="px-4" style={{ marginTop: 10 }}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <h6
                            style={{
                              fontSize: "11px",
                              fontFamily: "Gilroy",
                              fontWeight: 700,
                              color: "#00A32E",
                              letterSpacing: "1px",
                            }}
                          >
                            PAYMENT DETAILS
                          </h6>
                          <p
                            className="mb-1"
                            style={{
                              fontSize: "10px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "rgba(23, 23, 23, 1)",
                            }}
                          >
                            Payment Mode: G-Pay
                          </p>

                          <p
                            className="mb-1"
                            style={{
                              fontSize: "10px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "rgba(23, 23, 23, 1)",
                            }}
                          >
                            Transaction ID: GPay-2134-8482-XYZ
                          </p>

                          <p
                            style={{
                              fontSize: "10px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "rgba(23, 23, 23, 1)",
                            }}
                          >
                            Received By: Admin - Anjali R
                          </p>
                          <p
                            style={{
                              fontSize: "10px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "rgba(23, 23, 23, 1)",
                              marginTop: "-14px",
                            }}
                          >
                            Status: Paid
                          </p>
                        </div>
                        <div className="col-md-6 text-end">
                          <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2">
                            <img
                              src={received}
                              alt="received"
                              height={71}
                              width={152}
                            />
                          </p>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <h6
                              style={{
                                color: useGradient
                                  ? defaultGradient
                                  : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                                fontSize: "10px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                              }}
                            >
                              Terms and Conditions
                            </h6>
                            <p
                              style={{
                                fontSize: "9px",
                                color: "#555",
                                fontFamily: "Gilroy",
                              }}
                            >
                              {terms}
                            </p>
                          </div>

                          <div className="col-md-6 text-end">
                            <p className="text-success fw-bold border-success px-4 py-2 d-inline-block"></p>
                            {signature && (
                              <img
                                src={signature}
                                alt="Digital Signature"
                                style={{
                                  height: 60,
                                  width: 130,
                                  paddingLeft: 30,
                                }}
                              />
                            )}
                            <p
                              className="mt-1"
                              style={{
                                fontSize: "11px",
                                fontFamily: "Gilroy",
                                color: "#2C2C2C",
                                paddingRight: "15px",
                                marginTop: "-20px",
                              }}
                            >
                              Authorized Signature
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="ms-5 me-5">
                      <div
                        className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
                        style={{
                          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                          // background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                          borderTopRightRadius: "38px",
                          borderTopLeftRadius: "38px",
                        }}
                      >
                        <p
                          className="mb-0"
                          style={{
                            fontSize: "10px",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 1)",
                          }}
                        >
                          Email : {email}
                        </p>
                        <p
                          className="mb-0"
                          style={{
                            fontSize: "10px",
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            color: "rgba(255, 255, 255, 1)",
                          }}
                        >
                          Contact : +91 {mobilenum}
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
    </>
  );
};

RentalReceiptPdfTemplate.propTypes = {
  BillsTemplateList: PropTypes.shape({
    templates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      }),
    ),
    mobile: PropTypes.string,
    emailId: PropTypes.string,
    logo: PropTypes.string,
    signature: PropTypes.string,

    isLogoCustomized: PropTypes.bool,
    isSignatureCustomized: PropTypes.bool,
    isMailIdCustomized: PropTypes.bool,
    isMobileCustomized: PropTypes.bool,
  }),

  templateReceiptThemes: PropTypes.shape({
    logoPreview: PropTypes.string,
    mobilenum: PropTypes.string,
    email: PropTypes.string,
    signaturePreview: PropTypes.string,
    notes: PropTypes.string,
    terms: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default RentalReceiptPdfTemplate;
