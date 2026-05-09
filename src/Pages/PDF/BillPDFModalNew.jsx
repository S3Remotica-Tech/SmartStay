/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Bills/Invoices.css";
import Whatsapp from "../../Assets/Images/whatsapp.png";
import Whatsapp_blue from "../../Assets/Images/whatsapp_blue.png";
import Whatsapp_white from "../../Assets/Images/whatsapp_white.png";
import Mail from "../../Assets/Images/gmail.png";
import Mail_white from "../../Assets/Images/gmail_white.png";
import Message_text from "../../Assets/Images/message-text.png";
import Message_text_white from "../../Assets/Images/message-white.png";
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { Row, Col, Table } from "react-bootstrap";
import {
  Location,
  Call,
  Profile,
  DocumentDownload,
  Edit,
  RefreshSquare,
} from "iconsax-react";
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { ArrowUp2, ArrowDown2, AddCircle, Add } from "iconsax-react";
import RecordPayment from "../../Pages/Bills/RecordPayment";
import RefundAmount from "../Bills/RefundAmount";
import { useHasPermission } from "../../Utils/Permission";
import DiscountInvoice from "./DiscountInvoice";
import WaiveOFFConfirm from "./WaiveOFFConfirm";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ApplyBookingModal from "../../Pages/Bookings/ApplyInvoices";
import { TiTick } from "react-icons/ti";

const InvoiceCard = ({ rowData, isReportsInvoiceRegisterWay, isTenantWay }) => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showform, setShowform] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [payapleform, setPayableForm] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [refundDetails, setRefundDetails] = useState("");
  const modalRef = useRef(null);
  const [showDiscountInvoice, setShowDiscountInvoice] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const innerScrollRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [showWaiveModal, setShowWaiveModal] = useState(false);
  const [activeTab, setActiveTab] = useState("payments");
  const menuItems = [
    {
      label: "Send Mail",
      icon: Mail,
      iconWhite: Mail_white,
      key: "mail",
    },
    {
      label: "Send SMS",
      icon: Message_text,
      iconWhite: Message_text_white,
      key: "sms",
    },
    {
      label: "Send Whatsapp",
      icon: Whatsapp_blue,
      iconWhite: Whatsapp_white,
      key: "whatsapp",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [applyInvoice, setApplyInvoice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [invoiceList, setInvoiceList] = useState({
    balanceDue: "",
    invoiceId: "",
    invoiceDate: "",
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleCloseForm = () => {
    setShowform(false);
    dispatch({ type: "CLEAR_PAYABLE_AMOUNT" });
    dispatch({ type: "CLEAR_INVALID_DETAILS_ERROR" });
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
  };

  const handleCloseConfirm = () => {
    setShowWaiveModal(false);
  };

  const handleDownload = (rowData) => {
    if (rowData) {
      dispatch({
        type: "INVOICEPDF",
        payload: {
          hostelId: rowData?.hostelId || pdfDetails?.hostelId,
          invoiceId: rowData?.invoiceId,
        },
      });
      setPdfLoading(true);
    }
  };

  const handleApplyInvoices = () => {
    setApplyInvoice(true);
    setOpen(false);
  };

  useEffect(() => {
    console.log("applyInvoice updated:", applyInvoice);
  }, [applyInvoice]);

  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };

  useEffect(() => {
    setIsVisible(true);
  }, [rowData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state?.InvoiceList?.invoicePDF;
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
        setPdfLoading(false);
        dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
      }
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  useEffect(() => {
    if (
      state.InvoiceList.pdfErrorMessage ||
      state.createAccount?.networkError ||
      state.InvoiceList?.sharePdfError
    ) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
        dispatch({ type: "REMOVE_SHARE_PDF_ERROR" });
      }, 100);
    }
  }, [
    state.InvoiceList.pdfErrorMessage,
    state.createAccount?.networkError,
    state.InvoiceList?.sharePdfError,
  ]);

  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false);
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
      });
    }
  }, [state.InvoiceList?.makeInvoiceDiscountStatus]);

  useEffect(() => {
    if (state.InvoiceList.sharePdfSuccess) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_SHARE_PDF" });
      }, 100);
    }
  }, [state.InvoiceList.sharePdfSuccess]);

  useEffect(() => {
    if (state.InvoiceList.createRefundStatusCode === 200) {
      setPayableForm(false);
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_CREATE_REFUND" });
      }, 100);
    }
  }, [state.InvoiceList.createRefundStatusCode]);

  const handleBackInvoice = () => {
    if (isReportsInvoiceRegisterWay) {
      navigate(`/reports/invoice-register/${state.login?.selectedHostel_Id}`);
    } else if (isTenantWay) {
      navigate(`/tenant/details/${pdfDetails?.customerInfo?.customerId}`);
      dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    } else {
      navigate(`/invoice/${state.login?.selectedHostel_Id}`);
    }
  };

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (String(key) === "whatsapp") {
      dispatch({
        type: "GETSHAREPDF",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });

      setPdfLoading(true);
    }
  };

  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
  const isExportAllow = isValidSubscription && canReadInvoice;

  const pdfDetails = state.InvoiceList?.particularBillsDetails;

  const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;

  const templateColor = pdfDetails?.configurations?.templateColor;
  const isGradient = templateColor?.includes("linear-gradient");

  const textStyle = isGradient
    ? {
        fontFamily: "Gilroy",
        fontWeight: 600,
        background: templateColor,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : {
        fontFamily: "Gilroy",
        fontWeight: 600,
        color: templateColor || "#1E45E1",
      };

  const getIconStyle = (templateColor) => {
    const isGradient = templateColor?.includes("linear-gradient");

    return isGradient
      ? {
          background: templateColor,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }
      : { color: templateColor || "#4B4B4B" };
  };

  const totalDeductions = pdfDetails?.invoiceInfo?.listDeductions?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const showRentalPeriod =
    pdfDetails?.configurations?.invoiceType === "Rent" &&
    pdfDetails?.invoiceType !== "SETTLEMENT";

  const handleNavigateRecordPayment = (pdfDetails) => {
    setShowform(true);
    setSelectedUserId(pdfDetails?.customerInfo?.customerId);
    // setInvoiceValue(pdfDetails)
    setInvoiceList({
      balanceDue: pdfDetails?.invoiceInfo?.balanceAmount,
      invoiceId: pdfDetails?.invoiceId,
      invoiceDate: pdfDetails?.invoiceDate,
    });
  };

  const handleNavigateRefund = (pdfDetails) => {
    setRefundDetails(pdfDetails);
    setPayableForm(true);
  };
  const handleCloseRefundAmount = () => {
    setPayableForm(false);
  };

  const handleWaiveOff = () => {
    setOpen(false);
    setShowWaiveModal(true);
  };

  const handleMakeDiscount = () => {
    setOpen(false);
    setShowDiscountInvoice(true);
    setIsEdit(false);
  };

  const handleCloseFormDiscount = () => {
    setShowDiscountInvoice(false);
  };

  const statusClasses = {
    Pending: {
      bg: "bg-[#FFF1F1]",
      dot: "bg-[#EF4444]",
    },
    "Partial Payment": {
      bg: "bg-[#FFF1F1]",
      dot: "bg-[#EF4444]",
    },
    Paid: {
      bg: "bg-[#ECFDF5]",
      dot: "bg-[#10B981]",
    },
    Refunded: {
      bg: "bg-[#FFFBEB]",
      dot: "bg-[#F59E0B]",
    },
    "Partially Refunded": {
      bg: "bg-[#FFFBEB]",
      dot: "bg-[#F59E0B]",
    },
    "Pending Refund": {
      bg: "bg-[#FFF7ED]",
      dot: "bg-[#FB923C]",
    },
    Cancelled: {
      bg: "bg-[#F3F4F6]",
      dot: "bg-[#6B7280]",
    },
  };

  const isPending = pdfDetails?.invoiceInfo?.paymentStatus === "Pending";

  const isSettlement = pdfDetails?.invoiceType === "SETTLEMENT";
  const isRent =
    pdfDetails?.invoiceInfo?.invoiceItems?.[0]?.description === "Rent";

  const isNotDiscounted = pdfDetails?.invoiceInfo?.isDiscounted === false;

  const showSplitButton = true;
  const isDiscount = isPending && (isSettlement || isRent) && isNotDiscounted;

  const isRedeemAvailable = pdfDetails?.invoiceInfo?.canRedeem;

  const hasPayments = pdfDetails?.paymentHistory?.length > 0;
  const hasRefunds = pdfDetails?.refundHistory?.length > 0;

  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false);
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
      });
    }
  }, [state.InvoiceList?.makeInvoiceDiscountStatus]);

  useEffect(() => {
    const handleClickOutside = () => setOpenMenu(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (state.InvoiceList?.editInvoiceDiscountStatus === 200) {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_INVOICE_DISCOUNT_REDUCER" });
      }, 100);
    }
  }, [state.InvoiceList?.editInvoiceDiscountStatus]);

  useEffect(() => {
    if (state.InvoiceList?.refuseDiscountStatus === 204) {
      setShowRefuseModal(false);
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });

      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "REFUSE_DISCOUNT_REDUCER_CLEAR" });
      }, 100);
    }
  }, [state.InvoiceList?.refuseDiscountStatus]);

  const handleRefuse = () => {
    const payload = {
      hostelId: pdfDetails?.hostelId,
      invoiceId: pdfDetails?.invoiceId,
    };
    if (pdfDetails?.hostelId && pdfDetails?.invoiceId) {
      dispatch({
        type: "REFUSE_DISCOUNT",
        payload,
      });
    }
  };

  useEffect(() => {
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

  return (
    <div className="relative">
      <style>
        {`
@keyframes slideInRight {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slideIn {
  animation: slideInRight 0.4s ease-out;
}
`}
      </style>

      <div className="border-l border-gray-200">
        <div className="flex justify-between items-center bg-white border-b border-gray-200 min-h-[50px] w-full sticky top-0 z-10 px-2">
          <div className="flex items-center gap-2">
            <div className="pl-1">
              <label className="text-[16px] text-black font-semibold font-gilroy">
                {pdfDetails?.invoiceNumber}
              </label>
            </div>

            <div>
              {(() => {
                const status =
                  pdfDetails?.invoiceInfo?.paymentStatus === "Cancelled"
                    ? "Cancelled"
                    : pdfDetails?.invoiceInfo?.paymentStatus;

                if (!status) return null;

                const styles = statusClasses[status] || {
                  bg: "bg-gray-100",
                  dot: "bg-gray-400",
                };

                return (
                  <span
                    className={`flex items-center gap-2 px-2 py-[2px] text-[10px] rounded-full  font-gilroy w-fit ${styles.bg}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                    {status}
                  </span>
                );
              })()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center justify-center border rounded-lg h-[30px] w-[30px] ${
                isExportAllow
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-50"
              }`}
              onClick={() => {
                if (isExportAllow) handleDownload(rowData);
              }}
            >
              <DocumentDownload
                size="18"
                color={isExportAllow ? "#222222" : "#BDBDBD"}
              />
            </div>

            <button
              disabled
              className="flex items-center justify-center h-[30px] w-[30px] rounded-lg border
             disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshSquare
                size="18"
                className="text-[#222222] disabled:text-gray-400"
              />
            </button>

            <div className="relative inline-block">
              <div
                className="flex items-center justify-center gap-2 h-[30px] w-[80px] rounded-lg cursor-pointer bg-[#1E45E1]"
                onClick={handleShareClick}
              >
                <img
                  src={Whatsapp}
                  alt="Share"
                  className="h-[15px] w-[15px] invert"
                />
                <span className="text-sm font-normal text-white font-gilroy leading-none">
                  Share
                </span>
              </div>

              {isOpen && (
                <div className="absolute right-[5px] mt-2 p-2 shadow rounded-lg bg-white w-40 z-[9999]">
                  {menuItems.map((item) => {
                    const isDisabled = !isExportAllow;

                    return (
                      <div
                        ref={modalRef}
                        key={item.key}
                        className={`flex items-center mb-2 p-1 rounded transition-colors duration-200
                  ${
                    isDisabled
                      ? "bg-gray-100 cursor-not-allowed opacity-60"
                      : hoveredItem === item.key
                        ? "bg-[#1E45E1] text-white cursor-pointer"
                        : "bg-white cursor-pointer"
                  }`}
                        onMouseEnter={() =>
                          !isDisabled && setHoveredItem(item.key)
                        }
                        onMouseLeave={() => !isDisabled && setHoveredItem(null)}
                        onClick={() => !isDisabled && handleMenuClick(item.key)}
                      >
                        <img
                          src={
                            !isDisabled && hoveredItem === item.key
                              ? item.iconWhite
                              : item.icon
                          }
                          className="mr-2"
                          alt={item.label}
                        />

                        <span
                          className={`text-[13px] font-normal font-gilroy ${
                            isDisabled
                              ? "text-gray-400"
                              : hoveredItem === item.key
                                ? "text-white"
                                : "text-[#212529]"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="mr-3">
              <IoClose
                className="h-5 w-5 text-red-500 cursor-pointer"
                onClick={handleBackInvoice}
              />
            </div>
          </div>
        </div>

        <div className="relative h-[calc(100vh-80px)] overflow-y-auto bg-[#F7F8FC]   flex justify-center p-3 show-scrolls">
          {pdfLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {isVisible && (
            <div className="w-[90%] rounded-lg mb-5">
              <div
                ref={innerScrollRef}
                className="bg-white rounded-lg  shadow-md"
              >
                <div className="p-2 rounded-t-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center px-3 gap-4">
                    <div className="flex justify-start">
                      <img
                        src={
                          pdfDetails?.configurations?.hostelLogo
                            ? pdfDetails?.configurations?.hostelLogo
                            : Logo
                        }
                        alt="logo"
                        className="mt-2 max-w-[134px] rounded object-contain"
                        style={{
                          height: pdfDetails?.configurations?.hostelLogo
                            ? 50
                            : 25,
                        }}
                      />
                    </div>

                    <div className="mt-2 sm:pl-4">
                      <div className="text-[14px] font-semibold text-[#2B2B2B] font-gilroy">
                        {pdfDetails?.stayInfo?.hostelName}
                      </div>

                      <div className="text-[11px] font-medium text-[#4B4B4B] leading-[1.2rem] break-words line-clamp-5 font-gilroy">
                        {pdfDetails?.configurations?.address}
                      </div>
                    </div>
                  </div>
                </div>

                <hr
                  className="m-0"
                  style={{
                    border: "none",
                    height: "1px",
                    background: templateColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                />

                <div
                  className="bg-white rounded-bottom  position-relative"
                  style={{ width: "100%" }}
                >
                  <div className="text-center pt-2 pb-1">
                    <h5
                      className="text-[17px] font-gilroy font-semibold"
                      style={textStyle}
                    >
                      {pdfDetails?.invoiceType === "SETTLEMENT"
                        ? "Final Settlement Invoice"
                        : pdfDetails?.configurations?.invoiceType === "Advance"
                          ? "Security Deposit"
                          : pdfDetails?.configurations?.invoiceType === "Rent"
                            ? "Payment Bills"
                            : "Invoice"}
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 mt-1 font-gilroy">
                    <div className="md:col-span-5 mb-3 text-[13px] text-[#222]">
                      <div
                        className="mb-2 text-[11px] font-semibold italic"
                        style={textStyle}
                      >
                        Bill to:
                      </div>

                      <div className="mb-1 flex items-center">
                        <span style={getIconStyle(templateColor)}>
                          <Profile size="16" variant="Bold" />
                        </span>

                        <span className="ml-1 text-[12px] font-semibold text-[#171717]">
                          : {pdfDetails?.customerInfo?.fullName}
                        </span>
                      </div>

                      <div className="mb-1 flex items-center">
                        <span style={getIconStyle(templateColor)}>
                          <Call size="16" variant="Bold" />
                        </span>

                        <span className="ml-1 text-[12px] text-[#171717]">
                          :{" "}
                          {pdfDetails?.customerInfo?.customerMobileNo &&
                          pdfDetails.customerInfo.customerMobileNo !==
                            "undefined"
                            ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                            : ""}
                        </span>
                      </div>

                      <div className="mb-1 flex items-center">
                        <span style={getIconStyle(templateColor)}>
                          <IoBed className="text-[16px]" />
                        </span>

                        <span className="ml-1 flex items-center text-[12px] text-[#171717]">
                          {pdfDetails?.stayInfo?.floorName && (
                            <>: {pdfDetails.stayInfo.floorName}, </>
                          )}
                          {pdfDetails?.stayInfo?.roomName && (
                            <>{pdfDetails.stayInfo.roomName} </>
                          )}
                          - {pdfDetails?.stayInfo?.bedName}
                        </span>
                      </div>

                      <div className="flex">
                        <span style={getIconStyle(templateColor)}>
                          <Location size="16" variant="Bold" />
                        </span>

                        <div className="ml-1 text-[12px] text-[#171717] break-words">
                          : {pdfDetails?.customerInfo?.fullAddress}
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-7 mt-2 md:pl-5">
                      <div className="grid grid-cols-2 gap-2 ">
                        <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
                          Invoice :
                        </div>

                        <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
                          {pdfDetails?.invoiceNumber}
                        </div>

                        <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
                          Invoice Date :
                        </div>

                        <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
                          {pdfDetails?.invoiceDate}
                        </div>

                        <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
                          Due date :
                        </div>

                        <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
                          {pdfDetails?.dueDate}
                        </div>

                        <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
                          Joining date :
                        </div>

                        <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
                          {pdfDetails?.customerInfo?.joiningDate}
                        </div>

                        {showRentalPeriod && (
                          <>
                            <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
                              Rental Period :
                            </div>

                            <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
                              {pdfDetails?.invoiceInfo?.invoicePeriod}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 ">
                  <div className="mb-1">
                    <label
                      className="text-[12px] font-gilroy font-semibold"
                      style={textStyle}
                    >
                      Payment Summary
                    </label>
                  </div>
                  {pdfDetails?.invoiceType === "SETTLEMENT" ? (
                    <>
                      <div className="font-gilroy">
                        <div className="grid grid-cols-12 border border-[#DFDFDF] rounded-lg overflow-hidden">
                          <div className="col-span-12 md:col-span-6 border-r border-[#DFDFDF]">
                            <div className="overflow-x-auto">
                              <table className="w-full table-fixed">
                                <thead>
                                  <tr className="bg-white border-b border-[#DFDFDF]">
                                    <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222] capitalize">
                                      {pdfDetails?.invoiceInfo?.totalAmount > 0
                                        ? "Payment"
                                        : "Refund"}
                                    </th>

                                    <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pdfDetails?.invoiceInfo?.invoiceItems?.map(
                                    (item, index) => (
                                      <tr
                                        key={index}
                                        className="border-b border-[#F3F3F3]"
                                      >
                                        <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
                                          {item.description}
                                        </td>

                                        <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
                                          ₹{" "}
                                          {Number(item.amount).toLocaleString(
                                            "en-IN",
                                          )}
                                        </td>
                                      </tr>
                                    ),
                                  )}
                                </tbody>
                              </table>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold text-[#2D2D2D]">
                              <span>Total</span>

                              <span>
                                ₹{" "}
                                {Number(
                                  pdfDetails?.invoiceInfo?.subTotal || 0,
                                ).toLocaleString("en-IN")}
                              </span>
                            </div>
                          </div>

                          <div className="col-span-12 md:col-span-6">
                            <div className="overflow-x-auto">
                              <table className="w-full table-fixed">
                                <thead>
                                  <tr className="bg-white border-b border-[#DFDFDF]">
                                    <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222] capitalize">
                                      Deductions
                                    </th>

                                    <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pdfDetails?.invoiceInfo?.listDeductions
                                    ?.length > 0 ? (
                                    pdfDetails?.invoiceInfo?.listDeductions?.map(
                                      (item, index) => (
                                        <tr
                                          key={index}
                                          className="border-b border-[#F3F3F3]"
                                        >
                                          <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
                                            {item.type}
                                          </td>

                                          <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
                                            ₹{" "}
                                            {Number(item.amount).toLocaleString(
                                              "en-IN",
                                            )}
                                          </td>
                                        </tr>
                                      ),
                                    )
                                  ) : (
                                    <tr>
                                      <td
                                        colSpan={2}
                                        className="px-3 py-2 text-center text-[12px] font-medium text-[#2D2D2D]"
                                      >
                                        No Deductions
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>

                            <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold">
                              <span className="text-[#FF0000]">
                                Total Deductions
                              </span>

                              <span className="text-[#2D2D2D]">
                                ₹{" "}
                                {Number(totalDeductions || 0).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="my-3 w-full flex justify-end">
                        <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">
                          <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Grand Total
                            </span>
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.totalAmount || 0,
                              )}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Payment Made
                            </span>
                            <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                            </span>
                          </div>
                          {pdfDetails?.invoiceInfo?.isDiscounted && (
                            <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                                Discount Applied
                              </span>
                              <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                                ₹{" "}
                                {Number(
                                  pdfDetails?.invoiceInfo?.discountAmount || 0,
                                )}
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-center text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Balance Due
                            </span>
                            <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.balanceAmount || 0,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : pdfDetails?.configurations?.invoiceType === "Advance" ? (
                    <div className="mt-0 mb-2 p-0 font-gilroy">
                      <div className="overflow-x-auto">
                        <table className="w-full border border-[#dee2e6] rounded-xl overflow-hidden border-separate border-spacing-0">
                          <thead>
                            <tr>
                              <th className="w-[10%] px-[14px] py-[10px] text-[13px] font-semibold text-black text-left border-b border-[#dee2e6]">
                                S.NO
                              </th>

                              <th className="w-[60%] px-[14px] py-[10px] text-[13px] font-semibold text-black text-left border-b border-[#dee2e6]">
                                DESCRIPTION
                              </th>

                              <th className="w-[30%] px-[14px] py-[10px] text-[13px] font-semibold text-black text-right border-b border-[#dee2e6]">
                                AMOUNT / INR
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {pdfDetails?.invoiceInfo?.invoiceItems?.map(
                              (item, index) => (
                                <tr key={index} className="bg-white">
                                  <td className="px-[14px] py-[10px] text-[13px] font-medium text-left align-middle">
                                    {index + 1}
                                  </td>

                                  <td className="px-[14px] py-[10px] text-[13px] font-medium text-[#444] text-left align-middle">
                                    {item.description}
                                  </td>

                                  <td className="px-[14px] py-[10px] text-[13px] font-medium text-[#444] text-right align-middle">
                                    Rs. {item.amount?.toLocaleString("en-IN")}
                                  </td>
                                </tr>
                              ),
                            )}

                            <tr className="bg-[#F9F9F9] font-semibold">
                              <td
                                colSpan={2}
                                className="px-[14px] py-[10px] text-[13px] text-black text-left"
                              >
                                Total
                              </td>

                              <td className="px-[14px] py-[10px] text-[13px] text-black text-right">
                                ₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.subTotal || 0)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="my-3 flex w-full justify-end">
                        <div className="w-[260px] rounded bg-[#F8F8F8] px-3 py-2 text-[13px] font-semibold">
                          <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
                            <span className="text-[#4B4B4B]">Grand Total</span>

                            <span className="text-[#4B4B4B]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.totalAmount || 0,
                              )}
                            </span>
                          </div>

                          <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
                            <span className="text-[#4B4B4B]">Payment Made</span>

                            <span className="text-[rgba(0,163,46,1)]">
                              ₹{" "}
                              {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[12px] font-semibold">
                            <span className="text-[#4B4B4B]">Balance Due</span>

                            <span className="text-[#FF0000]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.balanceAmount || 0,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="font-gilroy">
                        <div className="grid grid-cols-12 border border-[#DFDFDF] rounded-lg overflow-hidden">
                          <div
                            className={`${
                              hasTax > 0
                                ? "col-span-12 md:col-span-6 border-r border-[#DFDFDF]"
                                : "col-span-12"
                            }`}
                          >
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="bg-white border-b">
                                    <th className="text-[12px] font-semibold text-[#222222] text-left  px-[14px] py-[10px]">
                                      S.NO
                                    </th>
                                    <th className="text-[12px] font-semibold text-[#222222] text-center  px-[14px] py-[10px]">
                                      DESCRIPTION
                                    </th>
                                    <th className="text-[12px] font-semibold text-[#222222] text-right  px-[14px] py-[10px]">
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pdfDetails?.invoiceInfo?.invoiceItems?.map(
                                    (item, index) => (
                                      <tr key={index}>
                                        <td className="text-[12px] text-[#2D2D2D] font-medium  px-[14px] py-[10px]">
                                          {index + 1}
                                        </td>

                                        <td className="text-[12px] text-[#2D2D2D] font-medium text-center  px-[14px] py-[10px]">
                                          {item.description}
                                        </td>

                                        <td className="text-[12px] text-[#2D2D2D] font-semibold text-right  px-[14px] py-[10px]">
                                          ₹{" "}
                                          {Number(item.amount).toLocaleString(
                                            "en-IN",
                                          )}
                                        </td>
                                      </tr>
                                    ),
                                  )}

                                  <tr className="bg-[#F9F9F9] font-semibold border-t border-[#DFDFDF]">
                                    <td
                                      colSpan={2}
                                      className={`text-[14px] text-[#2D2D2D] font-medium  px-[14px] py-[10px] ${
                                        hasTax
                                          ? "text-left"
                                          : "text-center pl-[150px]"
                                      }`}
                                    >
                                      Total
                                    </td>

                                    <td className="text-right text-[14px] font-semibold text-[#2D2D2D]  px-[14px] py-[10px]">
                                      ₹{" "}
                                      {Number(
                                        pdfDetails?.invoiceInfo?.subTotal || 0,
                                      ).toLocaleString("en-IN")}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {hasTax && (
                            <div className="col-span-12 md:col-span-6">
                              <div className="overflow-x-auto">
                                <table className="w-full mb-0">
                                  <thead>
                                    <tr className="bg-white border-b border-[#DFDFDF]">
                                      <th className="w-[70%] px-[14px] py-2 text-left text-[12px] font-semibold text-[#222222]">
                                        OTHERS
                                      </th>

                                      <th className="w-[30%] px-[14px] py-2 text-right text-[12px] font-semibold text-[#222222]">
                                        AMOUNT / INR
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    <tr>
                                      <td className="text-[12px] text-[#2D2D2D] font-medium  px-[14px] py-[12px]">
                                        GST (
                                        {pdfDetails?.invoiceInfo?.taxPercentage}
                                        %)
                                      </td>

                                      <td className="text-[12px] text-[#2D2D2D] font-semibold text-right  px-[14px] py-[10px]">
                                        ₹{" "}
                                        {Number(
                                          pdfDetails?.invoiceInfo?.taxAmount,
                                        ).toLocaleString("en-IN", {
                                          minimumFractionDigits: 2,
                                        })}
                                      </td>
                                    </tr>

                                    <tr className="bg-[#F9F9F9] font-semibold border-t border-[#DFDFDF]">
                                      <td className="text-[14px] text-[#2D2D2D] font-medium  px-[14px] py-[10px]">
                                        Total
                                      </td>

                                      <td className="text-right text-[14px] font-semibold text-[#2D2D2D]  px-[14px] py-[10px]">
                                        ₹{" "}
                                        {Number(
                                          pdfDetails?.invoiceInfo?.taxAmount ||
                                            0,
                                        ).toLocaleString("en-IN")}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="my-3 w-full flex justify-end">
                        <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">
                          <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Grand Total
                            </span>
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.totalAmount || 0,
                              )}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Payment Made
                            </span>
                            <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Discount Applied
                            </span>
                            <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.discountAmount || 0,
                              )}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-[12px] font-semibold">
                            <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                              Balance Due
                            </span>
                            <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                              ₹{" "}
                              {Number(
                                pdfDetails?.invoiceInfo?.balanceAmount || 0,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="px-5 mt-1">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-6">
                      <h6
                        className="mb-3 text-[11px] font-extrabold font-gilroy"
                        style={textStyle}
                      >
                        ACCOUNT DETAILS
                      </h6>

                      <div className="mb-1">
                        <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
                          Account No:
                        </label>{" "}
                        <span className="text-[12px] font-medium text-[#171717] font-gilroy">
                          {pdfDetails?.accountDetails?.accountNo || "N/A"}
                        </span>
                      </div>

                      <div className="mb-1">
                        <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
                          IFSC Code:
                        </label>{" "}
                        <span className="text-[12px] font-medium text-[#171717] font-gilroy">
                          {pdfDetails?.accountDetails?.ifscCode || "N/A"}
                        </span>
                      </div>

                      <div className="mb-1">
                        <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
                          Bank Name:
                        </label>{" "}
                        <span className="text-[12px] font-medium text-[#171717] font-gilroy">
                          {pdfDetails?.accountDetails?.bankName || "N/A"}
                        </span>
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
                          UPI Details:
                        </label>{" "}
                        <span className="text-[12px] font-medium text-[#171717] font-gilroy">
                          {pdfDetails?.accountDetails?.upiId || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="md:col-span-2"></div>

                    <div className="md:col-span-4 flex flex-col justify-between">
                      <div className="flex justify-center mb-2">
                        {pdfDetails?.accountDetails?.qrCode && (
                          <img
                            src={pdfDetails?.accountDetails?.qrCode}
                            alt="Barcode"
                            className="max-w-[150px] h-auto rounded-sm object-contain"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap justify-between items-center mt-4 mb-5 px-5">
                  <div
                    className={`w-full md:w-8/12 ${pdfDetails?.configurations?.termAndCondition ? "bg-[#F5F7FFBD]" : "bg-[#FFFFFF]"}  px-1 py-2 rounded`}
                  >
                    <h4 className="text-[11px] font-[Gilroy] font-semibold text-[#4B4B4B]">
                      Terms and Conditions
                    </h4>

                    <p className="whitespace-pre-line text-[10px] font-[Gilroy] font-semibold text-[#3D3D3D] pr-[50px]">
                      {pdfDetails?.configurations?.termAndCondition}
                    </p>
                  </div>

                  <div className="w-full md:w-4/12 flex flex-col justify-end items-end mt-4 md:mt-0">
                    {pdfDetails?.configurations?.signatureUrl && (
                      <img
                        src={pdfDetails?.configurations?.signatureUrl}
                        alt="Digital Signature"
                        className="h-[60px] w-[130px] pl-5"
                      />
                    )}

                    <p className="text-[10px] font-[Gilroy] font-semibold text-[#2C2C2C]">
                      Authorized Signature
                    </p>
                  </div>
                </div>

                <hr
                  className="mb-2"
                  style={{
                    border: "none",
                    height: "1px",
                    background: templateColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                />
                <div className="px-5">
                  <div className="flex items-center justify-between text-center rounded-t-[38px]">
                    <p className="mb-0 text-[13px] font-gilroy font-medium text-[#4B4B4B]">
                      Email:{" "}
                      <span className="text-[13px] font-gilroy font-semibold text-[#222222]">
                        {pdfDetails?.emailId}
                      </span>
                    </p>

                    <p className="mb-0 text-[13px] font-gilroy font-medium text-[#4B4B4B]">
                      Contact:{" "}
                      <span className="text-[13px] font-gilroy font-semibold text-[#222222]">
                        {pdfDetails?.mobile &&
                          `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed  right-14 ${isOpenPayment ? "bottom-[200px]" : "bottom-16"} z-50 flex flex-col gap-3 items-end`}
      >
        {Number(pdfDetails?.invoiceInfo?.discountAmount) > 0 &&
          pdfDetails?.invoiceInfo?.paymentStatus === "Pending" &&
          !showDiscountInvoice && (
            <div className=" animate-slideIn">
              <div className="relative flex items-center justify-between gap-4 bg-white px-3 py-2 rounded-md shadow-lg min-w-[220px]">
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[#00A63E] text-white text-[11px]">
                    <span className="text-[16px]">
                      {" "}
                      <TiTick className="text-base" />{" "}
                    </span>
                  </span>

                  <div className="flex flex-col">
                    <span className="mb-1 font-gilroy text-[14px] font-normal leading-[100%] tracking-normal">
                      Discount Applied
                    </span>

                    <span className="font-gilroy text-[12px] leading-[19.5px] tracking-[0px]">
                      ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
                      <span className="pl-2">Were applied on this invoice</span>
                    </span>
                  </div>
                </div>

                <PiDotsThreeOutlineVerticalFill
                  className="cursor-pointer text-gray-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(!openMenu);
                  }}
                />

                {openMenu && (
                  <div
                    className="absolute right-0 bottom-16 w-30 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      disabled={!canUpdateInvoice}
                      onClick={() => {
                        setIsEdit(true);
                        setEditData(
                          pdfDetails?.discountDetails ||
                            pdfDetails?.invoiceInfo,
                        );
                        setShowDiscountInvoice(true);
                        setOpenMenu(false);
                      }}
                      className={`
    w-full flex items-center gap-3 px-4 py-2.5 text-sm font-gilroy transition
    ${
      canUpdateInvoice
        ? "text-gray-700 hover:bg-gray-100 cursor-pointer"
        : "text-gray-400 bg-gray-50 cursor-not-allowed opacity-60"
    }
  `}
                    >
                      <Edit
                        size={16}
                        className={canUpdateInvoice ? "" : "opacity-50"}
                      />
                      Edit
                    </button>

                    <div className="h-px bg-gray-200 mx-2" />

                    <button
                      disabled={!canDeleteInvoice}
                      onClick={() => {
                        setShowRefuseModal(true);
                        setOpenMenu(false);
                        setSelectedInvoice(pdfDetails);
                      }}
                      className={`
    w-full flex items-center gap-3 px-4 py-2.5 text-sm font-gilroy transition
    ${
      canDeleteInvoice
        ? "text-red-600 hover:bg-red-50 cursor-pointer"
        : "text-gray-400 bg-gray-50 cursor-not-allowed opacity-60"
    }
  `}
                    >
                      <IoClose
                        className={`h-4 w-4 ${canDeleteInvoice ? "" : "opacity-50"}`}
                      />
                      Refuse with invoice
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        <div className=" animate-slideIn">
          <div className="relative flex items-center justify-between gap-4 bg-white px-3 py-2 rounded-md shadow-lg min-w-[220px]">
            <div className="flex items-center gap-1">
              <span className="h-7 w-7 flex items-center justify-center rounded-full bg-[#00A63E] text-white text-[11px]">
                <span className="text-[16px]">
                  <TiTick className="text-base" />
                </span>
              </span>
              <div className="flex flex-col">
                <span className="font-gilroy text-[14px] font-normal leading-[100%] tracking-normal">
                  Credits Available:{" "}
                  <span
                    className={`font-semibold text-sm transition-all duration-150
    ${
      !canUpdateInvoice || !isRedeemAvailable
        ? "text-[#A9A9A9] opacity-50 cursor-not-allowed"
        : "text-[#1E45E1] cursor-pointer"
    }`}
                    onClick={(e) => {
                      if (!canUpdateInvoice || !isRedeemAvailable) return;

                      e.stopPropagation();
                      handleApplyInvoices();
                    }}
                  >
                    Apply Now
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pdfDetails?.invoiceInfo?.paymentStatus !== "Cancelled" && (
        <div className="sticky bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.15)] font-gilroy">
          <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
            <div className="flex  gap-4">
              <div
                onClick={() => {
                  setActiveTab("payments");
                  setIsOpenPayment(true);
                }}
                className={`px-1 py-2 cursor-pointer text-sm font-medium ${
                  activeTab === "payments"
                    ? "text-[#1E45E1] border-b-[3px] border-[#1E45E1]"
                    : "text-black "
                }`}
              >
                {pdfDetails?.invoiceInfo?.totalAmount < 0
                  ? "Refund Made"
                  : "Payments Made"}
              </div>

              <div
                onClick={() => {
                  setActiveTab("invoices");
                  setIsOpenPayment(true);
                }}
                className={`px-1 py-2 cursor-pointer text-sm font-medium ${
                  activeTab === "invoices"
                    ? "text-[#1E45E1]  border-b-[3px] border-[#1E45E1]"
                    : "text-black border-0"
                }`}
              >
                Deducted From
              </div>
            </div>

            {pdfDetails?.paymentHistory?.length === 0 &&
            activeTab === "payments" &&
            pdfDetails?.invoiceInfo?.totalAmount > 0 ? (
              <span className="bg-[#F1F1F1] px-4 py-2 rounded-md text-xs text-black">
                {" "}
                No Payments made yet!
              </span>
            ) : pdfDetails?.refundHistory?.length === 0 &&
              activeTab === "payments" &&
              pdfDetails?.invoiceInfo?.totalAmount < 0 ? (
              <span className="bg-[#FFF8F8] px-4 py-2 rounded-md text-sm text-red-500">
                No Refund made yet!
              </span>
            ) : (
              ""
            )}

            <div className="flex items-center gap-2">
              {Number(pdfDetails?.invoiceInfo?.balanceAmount) > 0 && (
                <div className="relative inline-flex">
                  <button
                    disabled={!canWriteInvoice}
                    onClick={() => {
                      if (canWriteInvoice)
                        handleNavigateRecordPayment(pdfDetails);
                    }}
                    className={`flex items-center gap-2 bg-[#1E45E1] text-white text-sm px-4 py-2 
        ${showSplitButton ? "rounded-l-md" : "rounded-md"} 
        disabled:opacity-50`}
                  >
                    <Add size="16" color="#FFFFFF" />
                    Record Payment
                  </button>
                  <div className="relative inline-flex" ref={menuRef}>
                    {showSplitButton && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpen(!open);
                        }}
                        className="bg-[#1E45E1] text-white px-2 rounded-r-md border-l border-blue-400"
                      >
                        <ArrowDown2
                          size="16"
                          className={`transition-transform duration-300 ${
                            open ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                    {open && (
                      <div className="absolute bottom-14 right-0 font-gilroy  !w-fit px-2 py-2 bg-white flex flex-col border border-gray-200 rounded-lg shadow-xl z-50">
                        <button
                          disabled
                          onClick={handleWaiveOff}
                          className={`w-full text-left px-4 py-2 text-sm  rounded-md  whitespace-nowrap 
        disabled:cursor-not-allowed disabled:text-gray-200
        ${canWriteInvoice ? "hover:bg-[#F7FAFF]" : "opacity-50 cursor-not-allowed"}
      `}
                        >
                          Waive Off
                        </button>

                        <button
                          onClick={(e) => {
                            if (!canUpdateInvoice || !isRedeemAvailable) return;

                            e.stopPropagation();
                            handleApplyInvoices();
                          }}
                          disabled={!canUpdateInvoice || !isRedeemAvailable}
                          className={`w-full text-left px-4 py-2 text-sm whitespace-nowrap rounded-md  transition-all duration-150
    ${
      !canUpdateInvoice || !isRedeemAvailable
        ? "opacity-50 cursor-not-allowed bg-gray-100 text-[#A9A9A9]"
        : "cursor-pointer text-[#222222] hover:bg-[#F7FAFF]"
    }
  `}
                        >
                          Adjust with Advance
                        </button>

                        {isDiscount && (
                          <button
                            onClick={handleMakeDiscount}
                            disabled={!canWriteInvoice}
                            className={`w-full text-left px-4 py-2 text-sm rounded-md  whitespace-nowrap 
        ${canWriteInvoice ? "hover:bg-[#F7FAFF]" : "opacity-50 cursor-not-allowed"}
      `}
                          >
                            Make Discount
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {pdfDetails?.invoiceInfo?.totalAmount < 0 &&
                Number(pdfDetails?.invoiceInfo?.balanceAmount) !== 0 && (
                  <button
                    disabled={!canWriteInvoice}
                    onClick={() => handleNavigateRefund(pdfDetails)}
                    className="flex items-center gap-1 bg-[#1E45E1] text-white text-sm px-3 py-1.5 rounded-md disabled:opacity-50"
                  >
                    + Refund Amount
                  </button>
                )}

              {isOpenPayment ? (
                <ArrowUp2
                  size="18"
                  variant="Bold"
                  color="#1E45E1"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenPayment(false);
                    setIsOpen(false);
                  }}
                />
              ) : (
                <ArrowDown2
                  size="18"
                  variant="Bold"
                  color="#1E45E1"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpenPayment(true);
                    setIsOpen(false);
                  }}
                />
              )}
            </div>
          </div>

          {isOpenPayment && (
            <div>
              {activeTab === "payments" && (
                <div>
                  {!hasPayments && !hasRefunds && (
                    <div className="p-4 text-sm text-center text-red-600 font-medium">
                      No Data Found
                    </div>
                  )}

                  {/* {!hasPayments && hasRefunds && (
                    <div className="p-4 text-sm text-center text-orange-600 font-medium">
                      No Payments made yet!
                    </div>
                  )}

                  {hasPayments && !hasRefunds && (
                    <div className="p-4 text-sm text-center text-orange-600 font-medium">
                      No Refund made yet!
                    </div>
                  )} */}

                  {pdfDetails?.paymentHistory?.length > 0 && (
                    <div className="overflow-x-auto px-4">
                      <div className="rounded-md overflow-hidden border border-[#E5E7EB]">
                        <table className="w-full text-sm">
                          <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                            <tr>
                              <th className="text-left px-3 py-2">DATE</th>
                              <th className="text-left px-3 py-2">REF NO</th>
                              <th className="text-left px-3 py-2">
                                PAYMENT MODE
                              </th>
                              <th className="text-left px-3 py-2">AMOUNT</th>
                              <th className="text-left px-3 py-2">STATUS</th>
                            </tr>
                          </thead>

                          <tbody>
                            {pdfDetails.paymentHistory.map((item, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-3 py-2 text-xs text-[#6B7280] font-semibold">
                                  {item.date || item.paidDate || "-"}
                                </td>

                                <td className="px-3 py-2 text-xs text-[#1E45E1] font-medium">
                                  {item.transactionReferenceId ||
                                    item.referenceNumber ||
                                    "-"}
                                </td>

                                <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                                  {item.bankAccount}
                                </td>

                                <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                                  ₹{item.amount}
                                </td>

                                <td className="px-3 py-2">
                                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                    ● Paid
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {pdfDetails?.refundHistory?.length > 0 && (
                    <div className="overflow-x-auto px-4">
                      <div className="rounded-md overflow-hidden border border-[#E5E7EB]">
                        <table className="w-full text-sm">
                          <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                            <tr>
                              <th className="text-left px-3 py-2">DATE</th>
                              <th className="text-left px-3 py-2">REF NO</th>
                              <th className="text-left px-3 py-2">
                                RETURNED FROM
                              </th>
                              <th className="text-left px-3 py-2">AMOUNT</th>
                              <th className="text-left px-3 py-2">STATUS</th>
                            </tr>
                          </thead>

                          <tbody>
                            {pdfDetails.refundHistory.map((item, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-3 py-2 text-xs text-[#6B7280] font-semibold">
                                  {item.date || item.paidDate || "-"}
                                </td>

                                <td className="px-3 py-2 text-xs text-[#1E45E1] font-medium">
                                  {item.transactionReferenceId ||
                                    item.referenceNumber ||
                                    "-"}
                                </td>

                                <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                                  {item.bankAccount}
                                </td>

                                <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                                  ₹{item.amount}
                                </td>

                                <td className="px-3 py-2">
                                  <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full">
                                    ● Refunded
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "invoices" && (
                <div className="overflow-x-auto px-4 mb-2">
                  <div className="rounded-md overflow-hidden border border-[#E5E7EB]">
                    <table className="w-full text-sm">
                      <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                        <tr>
                          <th className="text-left px-3 py-2">DATE</th>
                          <th className="text-left px-3 py-2">INV NO</th>
                          <th className="text-left px-3 py-2">
                            AMOUNT APPLIED
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {pdfDetails.invoiceInfo?.redemptionInfo?.redeemdList
                          ?.length > 0 ? (
                          pdfDetails.invoiceInfo?.redemptionInfo?.redeemdList?.map(
                            (item, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-3 py-2 text-xs text-[#6B7280] font-semibold">
                                  {item.date || "-"}
                                </td>

                                <td className="px-3 py-2 text-xs text-[#1E45E1] font-medium">
                                  {item.invoiceNo || "-"}
                                </td>

                                <td className="px-3 py-2 text-xs font-semibold text-[#111928]">
                                  {item.amount}
                                </td>
                              </tr>
                            ),
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan={12}
                              className="text-center align-middle py-3 text-sm text-red-600 font-semibold"
                            >
                              No Data Found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex justify-end px-5 py-2 border-t ">
                <span className="mr-2 text-sm text-[#4B4B4B] font-medium">
                  Balance Due
                </span>
                <span className="text-sm text-red-500 font-medium">
                  ₹{pdfDetails?.invoiceInfo?.balanceAmount}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {showWaiveModal && (
        <WaiveOFFConfirm
          show={showWaiveModal}
          handleClose={handleCloseConfirm}
        />
      )}

      {applyInvoice && (
        <ApplyBookingModal
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={pdfDetails}
        />
      )}
      {showDiscountInvoice && (
        <DiscountInvoice
          show={showDiscountInvoice}
          handleClose={handleCloseFormDiscount}
          isEdit={isEdit}
          editData={isEdit ? editData : ""}
        />
      )}

      {showform && (
        <RecordPayment
          show={showform}
          handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          invoiceList={invoiceList}
        />
      )}

      {payapleform && (
        <RefundAmount
          show={payapleform}
          handleClose={handleCloseRefundAmount}
          refundDetails={refundDetails}
        />
      )}

      {showRefuseModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
          <div className="bg-white shadow-lg rounded-lg w-[90%] max-w-md p-4">
            <h2 className="text-black font-gilroy text-[17.24px] font-semibold leading-[24.9px] tracking-normal">
              Refuse Discount !
            </h2>

            <p className="text-[#646464] font-gilroy mb-4 text-[13.41px] font-normal leading-[19.15px] tracking-normal">
              Are you sure you want to refuse this discount?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRefuseModal(false)}
                className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 bg-[#F3F3F3] font-gilroy"
              >
                Cancel
              </button>

              <button
                onClick={handleRefuse}
                className="px-4 py-2 text-sm rounded-md bg-[#2400FF] text-white font-gilroy"
              >
                Yes, Refuse
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  isReportsInvoiceRegisterWay: PropTypes.bool,
  isTenantWay: PropTypes.bool,
};

export default withErrorBoundary(InvoiceCard);
