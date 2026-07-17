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
  Link21,
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
import ApplyAdvance from "../Bills/ApplyAdvance";
import FinalSettlementInvoicePDF from "./FinalSettlementInvoicePDF";
import RentInvoicePDF from "./RentInvoicePDF";
import AdvanceInvoicePDF from "./AdvanceInvoicePDF";
import FinalSettlementOldPDF from "./FinalSettlementOldPDF";

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

  const bookingCreditDetails = state?.Booking?.advanceInitialize;

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
  const [label, setLabel] = useState("");
  const [bookingModal, setBookingModal] = useState(false);
  const [advanceDetails, setAdvanceDetails] = useState("");
  const [applyBookingInvoice, setBookingApplyInvoice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [invoiceList, setInvoiceList] = useState({
    balanceDue: "",
    invoiceId: "",
    invoiceDate: "",
  });

  const [openMenu, setOpenMenu] = useState(false);
  const [showRefuseModal, setShowRefuseModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const handleApplyInvoices = (Name) => {
    setLabel(Name);
    setApplyInvoice(true);
    setOpen(false);
  };

  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };

  const handleBookingApplyRedeem = (item) => {
    setBookingModal(true);
    setAdvanceDetails(item);
    setLabel("Advance");
  };

  const handleCloseBookingModal = () => {
    setBookingModal(false);
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

  // useEffect(() => {
  //   if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {

  //     dispatch({
  //       type: "GETPARTICULARBILLSDETAILS",
  //       payload: {
  //         hostelId: pdfDetails?.hostelId,
  //         invoiceId: pdfDetails?.invoiceId,
  //       },
  //     });
  //     setTimeout(() => {
  //       dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
  //     });
  //   }
  // }, [state.InvoiceList?.makeInvoiceDiscountStatus]);

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
        type: "ALL_BILLS_LIST_SAGA",
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

  // console.log("pdfDetails", pdfDetails);

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
    // console.log("pdfDetails", pdfDetails);
    setShowform(true);
    setSelectedUserId(pdfDetails?.customerInfo?.customerId);
    // setInvoiceValue(pdfDetails)
    setInvoiceList({
      balanceDue:
        pdfDetails?.invoiceInfo?.finalAmount ||
        pdfDetails?.invoiceInfo?.balanceAmount,
      invoiceId: pdfDetails?.invoiceId || pdfDetails?.invoiceInfo?.invoiceId,
      invoiceDate:
        pdfDetails?.invoiceDate || pdfDetails?.invoiceInfo?.invoiceDate,
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

  const finalAmount = Number(pdfDetails?.invoiceInfo?.finalAmount);
  const totalAmount = Number(pdfDetails?.invoiceInfo?.totalAmount);
  const status = String(pdfDetails?.invoiceInfo?.status);
  const paymentStatus = String(pdfDetails?.invoiceInfo?.paymentStatus);

  const canShowRecordPayment =
    (finalAmount > 0 && status !== "PAID") ||
    (totalAmount > 0 && paymentStatus === "Pending");

  const canShowRefund =
    (finalAmount < 0 && status !== "REFUNDED") ||
    (totalAmount < 0 && paymentStatus === "Pending");

  const isSettlement = pdfDetails?.invoiceType === "SETTLEMENT";
  const isRent =
    pdfDetails?.invoiceInfo?.invoiceItems?.[0]?.description === "Rent";

  const isNotDiscounted = pdfDetails?.invoiceInfo?.isDiscounted === false;

  const showSplitButton = true;

  const isDiscount = isPending && (isSettlement || isRent) && isNotDiscounted;

  const isAdvanceRedeemAvailable =
    pdfDetails?.invoiceInfo?.isAvanceAvailableForRedeem;

  const isApplyInvoiceRedeemAvailable =
    pdfDetails?.invoiceInfo?.canApplyToOtherInvoice;

  const isAdvanceInvoice =
    pdfDetails?.configurations?.invoiceType === "Advance";

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
        type: "ALL_BILLS_LIST_SAGA",
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
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });

      dispatch({
        type: "ALL_BILLS_LIST_SAGA",
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
      setDeleteLoading(false);
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });

      dispatch({
        type: "ALL_BILLS_LIST_SAGA",
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
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: pdfDetails?.hostelId,
          invoiceId: pdfDetails?.invoiceId,
        },
      });
      dispatch({
        type: "ALL_BILLS_LIST_SAGA",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      dispatch({
        type: "ALL_BILLS_LIST_SAGA",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

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

        <div className="relative h-[calc(120vh-80px)] overflow-y-auto bg-[#F7F8FC] py-[10px]   flex justify-center p-3 show-scrolls">
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
                {pdfDetails?.configurations?.invoiceType === "Advance" ? (
                  <AdvanceInvoicePDF />
                ) : pdfDetails?.configurations?.invoiceType === "Rent" ? (
                  <RentInvoicePDF />
                ) : pdfDetails?.invoiceInfo?.isNewPattern ? (
                  <FinalSettlementInvoicePDF />
                ) : (
                  <FinalSettlementOldPDF />
                )}
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
        {pdfDetails?.invoiceInfo?.canRedeem > 0 && (
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
                    Credits Available :{" "}
                    {pdfDetails?.invoiceInfo?.avilableAmountToRedeem || "-"}{" "}
                    <span
                      className={`font-semibold text-sm transition-all duration-150
    ${
      !canUpdateInvoice
        ? "text-[#A9A9A9] opacity-50 cursor-not-allowed"
        : "text-[#1E45E1] cursor-pointer"
    }`}
                      onClick={(e) => {
                        if (!canUpdateInvoice) return;

                        e.stopPropagation();
                        handleApplyInvoices("booking");
                      }}
                    >
                      Apply Now
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {pdfDetails?.invoiceInfo?.paymentStatus !== "Cancelled" && (
        <div className="sticky bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.15)] font-gilroy">
          <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
            <div className="flex  gap-4">
              <div
                onClick={() => {
                  setActiveTab("payments");
                  // setIsOpenPayment(true);
                }}
                className={`px-1 py-2 cursor-pointer text-sm font-medium whitespace-nowrap ${
                  activeTab === "payments"
                    ? "text-[#1E45E1] border-b-[3px] border-[#1E45E1]"
                    : "text-black "
                }`}
              >
                {totalAmount < 0 || finalAmount < 0
                  ? "Refund Made"
                  : "Payments Made"}
              </div>

              <div
                onClick={() => {
                  setActiveTab("invoices");
                  // setIsOpenPayment(true);
                }}
                className={`px-1 py-2 cursor-pointer text-sm font-medium  whitespace-nowrap ${
                  activeTab === "invoices"
                    ? "text-[#1E45E1]  border-b-[3px] border-[#1E45E1]"
                    : "text-black border-0"
                }`}
              >
                Deducted From
              </div>
            </div>

            {/* {pdfDetails?.paymentHistory?.length === 0 &&
            activeTab === "payments" &&
            pdfDetails?.invoiceInfo?.totalAmount > 0 ? (
              <span className="bg-[#F1F1F1] px-4 py-2 rounded-md text-xs text-black whitespace-nowrap">
                {" "}
                No Payments made yet!
              </span>
            ) : pdfDetails?.refundHistory?.length === 0 &&
              activeTab === "payments" &&
              pdfDetails?.invoiceInfo?.totalAmount < 0 ? (
              <span className="bg-[#FFF8F8] px-4 py-2 rounded-md text-sm text-red-500 whitespace-nowrap">
                No Refund made yet!
              </span>
            ) : (
              ""
            )} */}

            <div className="flex items-center gap-2">
              {canShowRecordPayment && (
                <div className="relative inline-flex">
                  <button
                    disabled={!canWriteInvoice}
                    onClick={() => {
                      if (canWriteInvoice)
                        handleNavigateRecordPayment(pdfDetails);
                    }}
                    className={`flex items-center gap-2 bg-[#1E45E1] text-white text-sm whitespace-nowrap px-4 py-2 
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
                          className={`w-full text-left px-4 py-2 text-sm rounded-md whitespace-nowrap transition-all 
                            duration-150
    ${
      canWriteInvoice
        ? "opacity-50 cursor-not-allowed text-[#A9A9A9] "
        : "cursor-pointer text-[#222222] hover:bg-[#F7FAFF]"
    }`}
                        >
                          Waive Off
                        </button>

                        {!isAdvanceInvoice ? (
                          <button
                            onClick={(e) => {
                              if (
                                !canUpdateInvoice ||
                                !isAdvanceRedeemAvailable
                              )
                                return;

                              e.stopPropagation();
                              handleApplyInvoices("Advance");
                            }}
                            disabled={
                              !canUpdateInvoice || !isAdvanceRedeemAvailable
                            }
                            className={`w-full disabled:text-gray-400 text-left px-4 py-2 text-sm 
    whitespace-nowrap rounded-md transition-all duration-150
    ${
      !canUpdateInvoice || !isAdvanceRedeemAvailable
        ? "opacity-50 cursor-not-allowed text-[#A9A9A9]"
        : "cursor-pointer text-[#222222] hover:bg-[#F7FAFF]"
    }
  `}
                          >
                            Adjust with Advance
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              if (
                                !canUpdateInvoice ||
                                !isApplyInvoiceRedeemAvailable
                              )
                                return;

                              e.stopPropagation();
                              handleBookingApplyRedeem(pdfDetails);
                            }}
                            disabled={
                              !canUpdateInvoice ||
                              !isApplyInvoiceRedeemAvailable
                            }
                            className={`w-full disabled:text-gray-400 text-left px-4 py-2 text-sm 
    whitespace-nowrap rounded-md transition-all duration-150
    ${
      !canUpdateInvoice || !isApplyInvoiceRedeemAvailable
        ? "opacity-50 cursor-not-allowed text-[#A9A9A9]"
        : "cursor-pointer text-[#222222] hover:bg-[#F7FAFF]"
    }
  `}
                          >
                            Apply to Invoice
                          </button>
                        )}
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

              {pdfDetails?.invoiceInfo?.paymentStatus === "Paid" &&
                (!isAdvanceInvoice ? (
                  <button
                    onClick={(e) => {
                      if (!canUpdateInvoice || !isAdvanceRedeemAvailable)
                        return;

                      e.stopPropagation();
                      handleApplyInvoices("Advance");
                    }}
                    disabled={!canUpdateInvoice || !isAdvanceRedeemAvailable}
                    className={`w-full disabled:text-gray-400 text-left px-4 py-2 text-sm 
    whitespace-nowrap rounded-md transition-all duration-150 flex items-center gap-2 px-3 py-2 border border-[#E7E7E7] rounded-[10px]
    ${
      !canUpdateInvoice || !isAdvanceRedeemAvailable
        ? "opacity-50 cursor-not-allowed text-[#A9A9A9]"
        : "cursor-pointer text-[#222222] hover:bg-[#F7FAFF]"
    }
  `}
                  >
                    <Link21
                      color={!canUpdateInvoice ? "#A9A9A9" : "#1E45E1"}
                      size="16"
                    />{" "}
                    Adjust with Advance
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      if (!canUpdateInvoice || !isApplyInvoiceRedeemAvailable)
                        return;

                      e.stopPropagation();
                      handleBookingApplyRedeem(pdfDetails);
                    }}
                    disabled={
                      !canUpdateInvoice || !isApplyInvoiceRedeemAvailable
                    }
                    className={`w-full disabled:text-gray-400   !bg-[#F9F9F9]  font-semibold
                      text-left px-4 py-2 text-sm  flex items-center gap-2 px-3 py-2 border-2 border-[#E7E7E7] 
                      rounded-[10px]
    whitespace-nowrap rounded-md transition-all duration-150
    ${
      !canUpdateInvoice || !isApplyInvoiceRedeemAvailable
        ? "opacity-50 cursor-not-allowed text-[#A9A9A9]"
        : "cursor-pointer text-[#222222] hover:bg-[#F7FAFF]"
    }
  `}
                  >
                    <Link21
                      color={!canUpdateInvoice ? "#A9A9A9" : "#1E45E1"}
                      size="16"
                    />{" "}
                    Apply to Invoice
                  </button>
                ))}

              {canShowRefund && (
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

                  {pdfDetails?.paymentHistory?.length > 0 && (
                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        className="overflow-auto relative  h-[150px]  rounded-xl show-scrolls"
                      >
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
                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        className="overflow-auto relative  h-[150px]  rounded-xl show-scrolls"
                      >
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
                <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                  <div
                    id="tableContainer"
                    className="overflow-auto relative  h-[150px]  rounded-xl show-scrolls"
                  >
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
                                  {item.redeemedOn || "-"}
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
                  ₹
                  {pdfDetails?.invoiceInfo?.finalAmount ||
                    pdfDetails?.invoiceInfo?.balanceAmount}
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
        <ApplyAdvance
          label={label}
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={pdfDetails}
        />
      )}

      {bookingModal && (
        <ApplyBookingModal
          show={bookingModal}
          handleClose={handleCloseBookingModal}
          advanceDetails={advanceDetails}
          label={label}
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
                disabled={deleteLoading}
                onClick={handleRefuse}
                className={`
    px-4 
    py-2 
    text-sm 
    rounded-md 
    bg-[#1E45E1] 
    text-white 
    font-gilroy
    flex items-center justify-center gap-2
    ${deleteLoading ? "opacity-70 cursor-not-allowed" : ""}
  `}
              >
                {deleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Refusing...
                  </>
                ) : (
                  "Yes, Refuse"
                )}
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
