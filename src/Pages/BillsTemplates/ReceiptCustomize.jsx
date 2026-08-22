/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/Settings/Settings.css";

import TextAreaICon from "../../Assets/Images/textarea.png";
import "react-datepicker/dist/react-datepicker.css";

import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import EditICon from "../../Assets/Images/New_images/edit.png";
import uploadsett from "../../Assets/Images/New_images/upload setting.png";
import Modal from "react-bootstrap/Modal";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import PropTypes from "prop-types";
import { Trash } from "iconsax-react";

const RentalReceiptPdfTemplate = ({
  BillsTemplateList,
  onTemplateReceiptChange,
}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [loading, setLoading] = useState(false);

  const [notes_errmsg, setNotesErrMsg] = useState("");
  const [terms_errmsg, setTermsErrMsg] = useState("");
  const [editErrmsg, setEditErrMessage] = useState("");

  const [color, setColor] = useState({ r: 0, g: 163, b: 46, a: 1 });
  const [useGradient, setUseGradient] = useState(true);
  const defaultGradient =
    "linear-gradient(to right, rgba(0,163, 46, 1), rgba(0, 163, 46, 1))";

  const {
    // canWriteModule: canWriteInvoice,
    // canReadModule: canReadReceipt,
    canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setUseGradient(false);
    setEditErrMessage("");
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

  const handleNotesChange = (e) => {
    const Value = e.target.value;
    setNotes(Value);
    setEditErrMessage("");
    if (Value.trim() !== "") {
      setNotesErrMsg("");
    }
  };

  const handleTermsChange = (e) => {
    const Value = e.target.value;
    setTerms(Value);
    setEditErrMessage("");
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

  const [allowImageUpload, setAllowImageUpload] = useState(false);
  const [allowEditFields, setAllowEditFields] = useState({
    contact: false,
    email: false,
    hostelLogo: false,
    digitalSignature: false,
  });
  const [contactnumberform, setContactNumberForm] = useState(false);

  const fileInputRef = useRef(null);
  const [signature, setSignature] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [signature_errmsg, setSignatureErrMsg] = useState("");
  const [isSignatureConfirmed, setIsSignatureConfirmed] = useState(false);

  const handleFileSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignature(file);
      setSignaturePreview(URL.createObjectURL(file));
      setSignatureErrMsg("");
      setEditErrMessage("");
      setIsSignatureConfirmed(false);
    }
  };

  // const handleClear = () => {
  //   setSignature(null);
  //   setSignaturePreview(null);
  //   setSignatureErrMsg("");
  //   setEditErrMessage("");
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  // const handleSignatureDone = () => {
  //   if (!signature) {
  //     setSignatureErrMsg("Please select a signature file.");
  //   } else {
  //     setSignatureErrMsg("");
  //     setEditErrMessage("");
  //     setIsSignatureConfirmed(true);
  //   }
  // };

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

  const [mobilenum, setMobileNum] = useState("");
  const [MobileError, setMobileError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleMobile = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setMobileNum(input);
    setEditErrMessage("");
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
    setEditErrMessage("");
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
  const [hostel_logo, setHostelLogo] = useState(null);

  const handleFileUploadHostel = (e) => {
    if (!allowImageUpload) return;
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setHostelLogo(file);
      setEditErrMessage("");
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

  const handleSaveTemplate = () => {
    if (RentalreceiptTemplate.isSignatureCustomized) {
      const Signatureverify = !RentalreceiptTemplate.receiptSignatureUrl;

      if (signature && !isSignatureConfirmed && Signatureverify) {
        setSignatureErrMsg("Please click Done after selecting a signature");
        return;
      }
    }

    if (RentalreceiptTemplate.isMobileCustomized) {
      if (mobilenum && mobilenum.length < 10) {
        setMobileError(" Please Enter Valid Mobile Number");
        return;
      } else if (mobilenum.length === 10) {
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
            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
      });
      setLoading(true);
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
      setLogoPreview(
        BillsTemplateList.isLogoCustomized &&
          RentalreceiptTemplate.receiptLogoUrl &&
          RentalreceiptTemplate.receiptLogoUrl,
      );
      setHostelLogo(
        BillsTemplateList.isLogoCustomized &&
          RentalreceiptTemplate.receiptLogoUrl &&
          RentalreceiptTemplate.receiptLogoUrl,
      );
      setMobileNum(
        BillsTemplateList.isMobileCustomized &&
          RentalreceiptTemplate.receiptMobileNumber
          ? RentalreceiptTemplate.receiptMobileNumber
          : BillsTemplateList.mobile,
      );
      setEmail(
        BillsTemplateList.isMailIdCustomized &&
          RentalreceiptTemplate.receiptMailId
          ? RentalreceiptTemplate.receiptMailId
          : BillsTemplateList.emailId,
      );
      setSignature(
        BillsTemplateList.isSignatureCustomized &&
          RentalreceiptTemplate.receiptSignatureUrl &&
          RentalreceiptTemplate.receiptSignatureUrl,
      );
      setSignaturePreview(
        BillsTemplateList.isSignatureCustomized &&
          RentalreceiptTemplate.receiptSignatureUrl &&
          RentalreceiptTemplate.receiptSignatureUrl,
      );
      setNotes(RentalreceiptTemplate.receiptNotes);
      setTerms(RentalreceiptTemplate.receiptTermsAndCondition || "");
      const templateTheme = RentalreceiptTemplate.receiptTemplateColor;
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
  }, [RentalreceiptTemplate]);

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
  }, [logoPreview, mobilenum, email, signaturePreview, notes, terms, color]);

  const handleDeleteLogo = () => {
    if (BillsTemplateList?.hostelId) {
      dispatch({
        type: "DELETETEMPLATESIMAGES",
        payload: {
          hostelId: BillsTemplateList?.hostelId,
          templateId: BillsTemplateList?.templateId,
          templateTypeId: RentalreceiptTemplate?.typeId,
          type: "RECEIPT-LOGO",
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
          templateTypeId: RentalreceiptTemplate?.typeId,
          type: "RECEIPT-SIGNATURE",
        },
      });
    }
  };

  const handleLocalDeleteRentalSignature = () => {
    if (signaturePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(signaturePreview);
    }

    setSignaturePreview(null);
  };

  useEffect(() => {
    if (state.UsersList?.templatesImagesDeleteStatusCode === 204) {
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: state.login.selectedHostel_Id,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_DELETE_TEMPLATES_IMAGES" });
      }, 100);
    }
  }, [state.UsersList?.templatesImagesDeleteStatusCode]);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-transparent z-[1050]">
          <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-0">
        <div className="show-scrolls overflow-y-auto overflow-x-hidden max-h-[650px]">
          {(BillsTemplateList?.isSignatureCustomized ||
            BillsTemplateList?.isMobileCustomized ||
            BillsTemplateList?.isMailIdCustomized ||
            BillsTemplateList?.isLogoCustomized) && (
            <>
              <p className="font-gilroy text-base font-semibold">
                Inherited Global Details
              </p>
              <div className="border rounded-lg p-2.5 pb-3 mb-3 col-span-12 overflow-y-auto">
                <div className="flex justify-end">
                  <img
                    src={EditICon}
                    onClick={handleShowContactNumberForm}
                    className="cursor-pointer"
                    alt="editicon"
                  />
                </div>
                {BillsTemplateList?.isLogoCustomized && (
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
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
                              e.currentTarget.querySelector(".qr-trash");
                            const overlay =
                              e.currentTarget.querySelector(".qr-overlay");
                            if (trash) trash.style.display = "flex";
                            if (overlay) overlay.style.display = "block";
                          }}
                          onMouseLeave={(e) => {
                            const trash =
                              e.currentTarget.querySelector(".qr-trash");
                            const overlay =
                              e.currentTarget.querySelector(".qr-overlay");
                            if (trash) trash.style.display = "none";
                            if (overlay) overlay.style.display = "none";
                          }}
                        >
                          {logoPreview ? (
                            <img
                              src={logoPreview}
                              alt="Preview"
                              className="h-15 rounded-md mb-2"
                            />
                          ) : (
                            <img
                              src={uploadsett}
                              alt="upload"
                              className="h-7.5 mb-2"
                            />
                          )}

                          {logoPreview && (
                            <>
                              <div className="qr-overlay absolute inset-0 hidden bg-black/40 rounded-md" />
                              <div
                                className="qr-trash absolute -top-1 -right-1 hidden flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer"
                                onClick={() => {
                                  if (
                                    logoPreview?.startsWith("data:") ||
                                    logoPreview?.startsWith("blob:")
                                  ) {
                                    handleLocalDeleteLogo();
                                  } else {
                                    handleDeleteLogo();
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
                      </div>

                      <div className="mt-1">
                        <label
                          className={`${
                            allowEditFields.hostelLogo
                              ? "cursor-pointer text-[#1E45E1]"
                              : "cursor-not-allowed text-gray-400"
                          } font-gilroy text-[12px] font-normal`}
                        >
                          Choose file
                          <input
                            type="file"
                            accept="image/png"
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

                      <small className="block mt-1.5 font-gilroy text-[9px] font-normal text-[#4B4B4B]">
                        Must be in PNG Format (600px × 300px)
                      </small>
                    </div>
                  </div>
                )}

                {BillsTemplateList?.isMobileCustomized && (
                  <div className="p-3 col-span-12 rounded-lg overflow-y-auto">
                    <div className="flex flex-col">
                      <div className="w-full font-gilroy text-sm font-medium">
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="font-gilroy font-semibold">
                            Contact Number
                          </label>
                        </div>
                        <div className="flex items-center bg-[#F0F3FF] rounded-md px-3 py-2 border border-gray-300">
                          <select
                            className={`border-none bg-transparent font-inherit text-inherit font-inherit pr-4 appearance-none outline-none cursor-pointer 
            bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M1 1L6 6L11 1" stroke="%23666" stroke-width="2"/%3E%3C/svg%3E')] 
            bg-no-repeat bg-right bg-[length:10px]`}
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
                            className="border-none bg-transparent outline-none ml-2 font-inherit text-inherit font-inherit"
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
                )}

                {BillsTemplateList?.isMailIdCustomized && (
                  <div className="p-3 col-span-12 rounded-lg overflow-y-auto">
                    <div className="flex flex-col">
                      <div className="w-full font-gilroy text-sm font-medium">
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="font-semibold">
                            E-Mail Address
                          </label>
                        </div>

                        <div className="flex items-center bg-[#F0F3FF] rounded-md px-3 py-2 border border-gray-300">
                          <input
                            type="email"
                            placeholder="abc@gmail.com"
                            className="border-none bg-transparent outline-none ml-2 font-inherit text-inherit font-inherit w-full"
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
                )}

                {BillsTemplateList?.isSignatureCustomized && (
                  <div className="p-3 col-span-12 rounded-lg overflow-y-auto">
                    <div className="flex flex-col">
                      <div className="w-full font-gilroy text-sm font-medium">
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="font-semibold">
                            Digital Signature Upload
                          </label>
                        </div>

                        <div className="col-span-12">
                          <div
                            className="relative mt-2 flex items-center justify-center w-full rounded border-3 border-dotted border-[#CED4DA] h-40"
                            onMouseEnter={(e) => {
                              const trash =
                                e.currentTarget.querySelector(".qr-trash");
                              const overlay =
                                e.currentTarget.querySelector(".qr-overlay");
                              if (trash) trash.style.display = "flex";
                              if (overlay) overlay.style.display = "block";
                            }}
                            onMouseLeave={(e) => {
                              const trash =
                                e.currentTarget.querySelector(".qr-trash");
                              const overlay =
                                e.currentTarget.querySelector(".qr-overlay");
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
                              <span className="text-[14px] font-normal text-[#222222] font-gilroy">
                                No signature uploaded
                              </span>
                            )}

                            {signaturePreview && (
                              <>
                                <div className="qr-overlay absolute inset-0 bg-black/40 hidden rounded" />
                                <div
                                  className="qr-trash absolute -top-1 -right-1 hidden flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer"
                                  onClick={() => {
                                    const isLocal =
                                      signaturePreview?.startsWith("data:") ||
                                      signaturePreview?.startsWith("blob:");
                                    if (isLocal)
                                      handleLocalDeleteRentalSignature();
                                    else handleDeleteRentalSignature();
                                  }}
                                >
                                  <div className="bg-black/70 text-white p-2 rounded-full">
                                    <Trash size={12} />
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          <div className="flex justify-center mt-2">
                            <label
                              className={`${
                                allowEditFields.digitalSignature
                                  ? "cursor-pointer text-[#1E45E1]"
                                  : "cursor-not-allowed text-gray-400"
                              } font-gilroy text-[12px] font-normal flex items-center`}
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
                              <span className="ml-1 text-[#16151C]">
                                to Upload Image
                              </span>
                            </label>
                          </div>

                          {signature_errmsg.trim() !== "" && (
                            <ErrorMessage
                              message={signature_errmsg}
                              type="error"
                            />
                          )}
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
                  <Modal.Header className="border-0">
                    <Modal.Title className="text-[18px] font-gilroy font-semibold text-center text-[#222222] flex-1 pt-5">
                      Override Global Value?
                    </Modal.Title>
                  </Modal.Header>

                  <Modal.Body className="text-[14px] font-medium font-gilroy text-[#646464] text-center px-5">
                    You’re changing this field only for this bill. It won’t
                    affect the main settings.
                  </Modal.Body>

                  <Modal.Footer className="!flex !justify-center !border-0 !pb-5">
                    <button
                      className="!w-[160px] !h-[52px] !rounded-[10px] !px-5 !py-3 !bg-white !text-[#6F6C8F] !font-gilroy !font-semibold !text-[14px] !border !mr-2.5"
                      onClick={handleCloseContactNumberForm}
                    >
                      Cancel
                    </button>
                    <button
                      className="!w-[160px] !h-[52px] !rounded-[10px] !px-5 !py-3 !bg-[#1E45E1] !text-white !font-gilroy !font-semibold !text-[14px]"
                      onClick={handleEditAnyway}
                    >
                      Edit Anyway
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </>
          )}

          <p className="font-gilroy text-xl font-semibold mb-0">
            Form Specific Details
          </p>
          <p className="font-gilroy text-sm font-normal text-[#9700a3]">
            Fill the form with details you&apos;d like to customize.
          </p>

          <div className="p-3 mb-3 border border-gray-300 col-span-12 rounded-lg">
            <h6 className="font-gilroy text-[14px] font-normal text-[#222222] mb-2">
              Notes
            </h6>
            <hr className="border-gray-700 mb-2" />

            <label className="form-label font-gilroy text-[14px] font-normal text-[#222222]">
              Add Notes
            </label>
            <div className="relative">
              <textarea
                className="form-control pe-5 w-full h-24 resize-none font-gilroy !text-sm font-normal text-[#222222] placeholder:text-gray-400"
                placeholder="Add any message..."
                value={notes}
                onChange={handleNotesChange}
              />
              <img
                src={TextAreaICon}
                alt="textarea_icon"
                className="absolute top-3 right-3 pointer-events-none"
              />
            </div>
            {notes_errmsg.trim() !== "" && (
              <ErrorMessage message={notes_errmsg} type="error" />
            )}
          </div>

          <div className="p-3 mb-3 border border-gray-300 col-span-12 rounded-lg">
            <h6 className="font-gilroy text-[14px] font-normal text-[#222222] mb-2">
              Terms & Condition
            </h6>
            <hr className="border-gray-300 mb-2" />

            <label className="form-label font-gilroy text-[14px] font-normal text-[#222222]">
              Add T&C
            </label>
            <div className="relative">
              <textarea
                className="form-control pe-5 w-full h-24 resize-none font-gilroy !text-sm font-normal text-[#222222] placeholder:text-gray-400"
                placeholder="Add any message..."
                value={terms}
                onChange={handleTermsChange}
              />
              <img
                src={TextAreaICon}
                alt="textarea-icon"
                className="absolute top-3 right-3 pointer-events-none"
              />
            </div>
            {terms_errmsg.trim() !== "" && (
              <ErrorMessage message={terms_errmsg} type="error" />
            )}
          </div>

          <div className="col-span-12 border border-gray-300 p-4 font-sans rounded-lg">
            <h6 className="font-gilroy text-[14px] font-normal mb-3">
              Template Theme
            </h6>

            <div className=" w-full">
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
                className="w-[70px] md:w-20 text-center border border-gray-300 rounded"
              />
              <input
                value={color.r}
                readOnly
                className="w-[45px] md:w-10 text-center border border-gray-300 rounded"
              />
              <input
                value={color.g}
                readOnly
                className="w-[45px] md:w-10 text-center border border-gray-300 rounded"
              />
              <input
                value={color.b}
                readOnly
                className="w-[45px] md:w-10 text-center border border-gray-300 rounded"
              />
              <input
                value={alphaValue}
                readOnly
                className="w-[45px] md:w-10 text-center border border-gray-300 rounded"
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
              {presetColors.map((preset, index) => {
                const r = parseInt(preset.substr(1, 2), 16);
                const g = parseInt(preset.substr(3, 2), 16);
                const b = parseInt(preset.substr(5, 2), 16);
                return (
                  <div
                    key={index}
                    onClick={() => setColor({ r, g, b, a: 1 })}
                    className={`w-6 h-6 rounded-[20%] cursor-pointer ${
                      preset.toLowerCase() === "#ffffff"
                        ? "border border-gray-300"
                        : ""
                    }`}
                    style={{ backgroundColor: preset }}
                  />
                );
              })}

              <div
                className="w-6 h-6 rounded-[20%] cursor-pointer border-2 border-black"
                style={{ backgroundColor: hexValue }}
                title="Current selected color"
              />
            </div>
          </div>

          {editErrmsg.trim() !== "" && (
            <div className="d-flex justify-content-center">
              <ErrorMessage message={editErrmsg} type="error" />
            </div>
          )}

          <div className="flex justify-end mt-2 col-span-10">
            <button
              disabled={!canUpdateInvoice}
              onClick={handleSaveTemplate}
              className={`w-40 h-10 rounded-lg px-4 bg-[#1E45E1] text-white font-gilroy font-semibold text-sm ${
                !canUpdateInvoice
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              Save Template
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
RentalReceiptPdfTemplate.propTypes = {
  onTemplateReceiptChange: PropTypes.func,

  BillsTemplateList: PropTypes.shape({
    hostelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    templateId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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
      }),
    ),
  }),
};

export default RentalReceiptPdfTemplate;
