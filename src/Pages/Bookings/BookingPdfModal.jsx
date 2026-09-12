/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Bills/Invoices.css";
import DownLoad from "../../Assets/Images/New_images/searchss.png";
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

import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { ArrowUp2, ArrowDown2, Link21 } from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import ApplyBookingModal from "./ApplyInvoices";
import RetainerApplyInvoice from "./RetainerApplyInvoice";
import { TiTick } from "react-icons/ti";

const InvoiceCard = ({ rowData }) => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const [hoveredItem, setHoveredItem] = useState(null);
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
  const { canUpdateModule: canUpdateInvoice } = useHasPermission("Invoice");

  const [isVisible, setIsVisible] = useState(true);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  // const cardRef = useRef(null);
  const [applyInvoice, setApplyInvoice] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(0.8);

  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const previewContainerRef = useRef(null);

  useEffect(() => {
    const updateScale = () => {
      if (!previewContainerRef.current) return;

      const containerWidth = previewContainerRef.current.clientWidth;

      const padding = 40;

      const scale = (containerWidth - padding) / A4_WIDTH;

      setZoom(scale);
    };

    updateScale();

    window.addEventListener("resize", updateScale);

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, [rowData]);

  const handleDownload = async () => {
    if (rowData || pdfDetails?.hostelId) {
      dispatch({
        type: "INVOICEPDF",
        payload: {
          hostelId: pdfDetails?.hostelId || rowData,
          invoiceId: pdfDetails?.invoiceId,
        },
      });

      setPdfLoading(true);
    }
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setPdfLoading(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 300);
    }
  }, [state.createAccount?.networkError]);

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
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state?.InvoiceList?.invoicePDF;
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
        setPdfLoading(false);
        dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
      }
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  const handleBackInvoice = () => {
    navigate(`/retainer-invoice/${state.login?.selectedHostel_Id}`);
  };
  const {
    // canWriteModule: canWriteBooking,
    canReadModule: canReadBooking,
    // canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Booking");
  // const isValid = (value) => {
  //   return value !== null && value !== undefined && value !== "undefined" && value !== "";
  // };
  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
  const isExportAllow = isValidSubscription && canReadBooking;

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {
    dispatch({ type: "REMOVE_SHARE_PDF_ERROR" });
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

  useEffect(() => {
    if (state.InvoiceList?.sharePdfError) {
      setPdfLoading(false);
    }
  }, [state.InvoiceList?.sharePdfError]);

  const pdfDetails = state.InvoiceList?.particularBillsDetails;

  // const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;
  const isRedeemAvailable = pdfDetails?.invoiceInfo?.canRedeem;

  const [applyInvoiceRetainer, setApplyInvoiceRetainer] = useState(false);
  const [advanceDetails, setAdvanceDetails] = useState("");
  // const templateColor = pdfDetails?.configurations?.templateColor;
  // const isGradient = templateColor?.includes("linear-gradient");

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
  // const textStyle = isGradient
  //   ? {
  //       fontFamily: "Gilroy",
  //       fontWeight: 600,
  //       background: templateColor,
  //       WebkitBackgroundClip: "text",
  //       WebkitTextFillColor: "transparent",
  //     }
  //   : {
  //       fontFamily: "Gilroy",
  //       fontWeight: 600,
  //       color: templateColor || "#1E45E1",
  //     };

  // const getIconStyle = (templateColor) => {
  //   const isGradient = templateColor?.includes("linear-gradient");

  //   return isGradient
  //     ? {
  //         background: templateColor,
  //         WebkitBackgroundClip: "text",
  //         WebkitTextFillColor: "transparent",
  //         display: "inline-flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }
  //     : { color: templateColor || "#4B4B4B" };
  // };

  // const totalDeductions = pdfDetails?.invoiceInfo?.listDeductions?.reduce(
  //   (sum, item) => sum + Number(item.amount || 0),
  //   0,
  // );

  const handleApplyInvoices = () => {
    setApplyInvoice(true);
  };

  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };

  const handleApplyInvoicesRetainer = (item) => {
    setApplyInvoiceRetainer(true);
    setAdvanceDetails(item);
  };

  const handleCloseApplyInvoicesRetainer = () => {
    setApplyInvoiceRetainer(false);
  };

  useEffect(() => {
    if (state.InvoiceList.sharePdfSuccess) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_SHARE_PDF" });
      }, 100);
    }
  }, [state.InvoiceList.sharePdfSuccess]);

  useEffect(() => {
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: pdfDetails?.invoiceId,
        },
      });

      dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

  return (
    <div className=" bg-white font-gilroy">
      <div className="border-l border-gray-200">
        <div className="flex justify-between items-center bg-white  border-gray-200 min-h-[50px] w-full sticky top-0 z-10 px-2">
          <div className="flex justify-between items-center w-full h-12 bg-white border-b border-[#E0E0E0] px-2">
            <div className="flex items-center gap-2">
              <div className="pl-1">
                <label className="text-[16px] text-black font-semibold font-gilroy">
                  {pdfDetails?.invoiceNumber}
                </label>
              </div>

              {(() => {
                const invoice = pdfDetails?.invoiceInfo;

                let status = invoice?.paymentStatus || invoice?.status;

                switch (invoice?.status) {
                  case "PENDING":
                    status = "Pending";
                    break;
                  case "CANCELLED":
                  case "Cancelled":
                    status = "Cancelled";
                    break;
                  case "PENDING REFUND":
                    status = "Pending Refund";
                    break;
                  case "PARTIAL_REFUND":
                    status = "Partially Refunded";
                    break;
                  case "REFUNDED":
                    status = "Refunded";
                    break;
                  case "PAID":
                    status = "Paid";
                    break;
                  default:
                    break;
                }

                if (!status) return null;

                const styles = statusClasses[status] || {
                  bg: "bg-gray-100",
                  dot: "bg-gray-400",
                };

                return (
                  <span
                    className={`flex items-center gap-2 px-2 py-[2px] text-[10px] rounded-full font-gilroy w-fit ${styles.bg}`}
                  >
                    <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
                    {status}
                  </span>
                );
              })()}
            </div>

            <div>
              <div className="flex gap-2">
                <div
                  className="flex justify-center items-center border rounded-[8px] cursor-pointer h-[30px] w-[30px]"
                  onClick={handleDownload}
                >
                  <img
                    src={DownLoad}
                    alt="Download Invoice"
                    className="h-[15px] w-[15px]"
                  />
                </div>

                <div className="relative inline-block">
                  <div
                    className="flex items-center justify-center gap-2 h-[30px] w-[80px] rounded-[8px] cursor-pointer bg-[#1E45E1]"
                    onClick={handleShareClick}
                  >
                    <img
                      src={Whatsapp}
                      alt="Share"
                      className="h-[15px] w-[15px] invert"
                    />
                    <span className="text-[14px] font-normal font-gilroy text-white leading-none">
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
                            onMouseLeave={() =>
                              !isDisabled && setHoveredItem(null)
                            }
                            onClick={() =>
                              !isDisabled && handleMenuClick(item.key)
                            }
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

                <div>
                  <IoClose
                    className="h-[20px] w-[20px] cursor-pointer text-red-500"
                    onClick={handleBackInvoice}
                  />
                </div>
              </div>
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
            <div
              ref={previewContainerRef}
              className="relative flex-1 overflow-auto bg-[#F7F8FC] show-scrolls"
            >
              <div className="min-h-full flex justify-center items-start ">
                <div
                  style={{
                    width: `${A4_WIDTH * zoom}px`,
                    height: `${A4_HEIGHT * zoom}px`,
                    flexShrink: 0,
                  }}
                >
                  <div
                    className="bg-white shadow-md origin-top-left rounded"
                    style={{
                      width: `${A4_WIDTH}px`,
                      height: `${A4_HEIGHT}px`,
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                    }}
                  >
                    <div className="p-2 rounded-t-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-2 items-center px-3 gap-4">
                        <div className="flex gap-2 justify-start">
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
                          <div>
                            <div className="py-1">
                              <div className="text-[#222222] text-[14px] font-medium ">
                                {pdfDetails?.emailId &&
                                pdfDetails.emailId !== "null"
                                  ? pdfDetails.emailId
                                  : ""}
                              </div>
                            </div>
                            <div className="py-1">
                              <div className="text-[#222222] text-[14px] font-medium  ">
                                {pdfDetails?.mobile &&
                                  `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 sm:pl-4">
                          <div className="text-[14px] font-semibold text-[#2B2B2B] font-gilroy">
                            {pdfDetails?.stayInfo?.hostelName}
                          </div>

                          <div className="text-[11px] font-medium text-[#4B4B4B] leading-[1.2rem] break-words line-clamp-5 font-gilroy">
                            {pdfDetails?.configurations?.address}
                          </div>
                          {/* <div className="text-[#222222] text-[10px] font-medium  ">
                                 <span>GST IN : </span>{" "}
                                 <span>{pdfDetails?.headerInfo?.gstNumber}</span>
                               </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="text-center pt-2 pb-1">
                      <h5
                        className="text-[17px] font-semibold font-gilroy"
                        // style={textStyle}
                      >
                        Retainer Invoice
                      </h5>
                    </div>
                    <div className="bg-white  border-1 border-[#D7DAE0] rounded-lg mx-4 py-4   position-relative ">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4  font-gilroy">
                        <div className="md:col-span-6 mb-3 text-[13px] text-[#222]">
                          <div className="mb-2 text-[12px] font-semibold italic text-[#5E6470]">
                            Bill to:
                          </div>

                          <div className="mb-1 flex items-center">
                            <span className=" text-[14px] font-semibold text-[#171717]">
                              {pdfDetails?.customerInfo?.fullName}
                            </span>
                          </div>

                          <div className="mb-1 flex items-center">
                            <span className=" text-[14px] text-[#5E6470]">
                              {" "}
                              {pdfDetails?.customerInfo?.customerMobileNo &&
                              pdfDetails.customerInfo.customerMobileNo !==
                                "undefined"
                                ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                                : ""}
                            </span>
                          </div>

                          <div className="flex">
                            <div className="text-[14px] text-[#5E6470] break-words">
                              {pdfDetails?.customerInfo?.fullAddress}
                            </div>
                          </div>
                          <div className="my-2 flex items-center">
                            <div>
                              <div className="text-[#4B4B4B] text-[12px]  ">
                                Stay Details
                              </div>

                              <span className=" flex items-center text-[14px] font-semibold text-[#171717]">
                                {pdfDetails?.stayInfo?.floorName && (
                                  <> {pdfDetails.stayInfo.floorName} </>
                                )}
                                {pdfDetails?.stayInfo?.roomName && (
                                  <>{pdfDetails.stayInfo.roomName} </>
                                )}
                                - {pdfDetails?.stayInfo?.bedName}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-6  flex justify-end items-center">
                          <div className="grid grid-cols-2 gap-2 ">
                            <div className="truncate text-right text-[11px] font-normal text-[#4B4B4B]">
                              Invoice :
                            </div>

                            <div className="truncate text-left text-[14px] font-semibold text-[#171717]">
                              {pdfDetails?.invoiceNumber}
                            </div>

                            <div className="truncate text-right text-[11px] font-normal text-[#4B4B4B]">
                              Invoice Date :
                            </div>

                            <div className="truncate text-left text-[14px] font-semibold text-[#171717]">
                              {pdfDetails?.invoiceDate}
                            </div>

                            <div className="truncate text-right text-[11px] font-normal text-[#4B4B4B]">
                              Due date :
                            </div>

                            <div className="truncate text-left text-[14px] font-semibold text-[#171717]">
                              {pdfDetails?.dueDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 my-4">
                        <div className="border border-[#DFDFDF] rounded-lg ">
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead className="bg-white text-[#6B7280] text-xs uppercase">
                                <tr>
                                  <th className="px-3 py-2 text-left text-[12px] font-semibold text-[#222]">
                                    DESCRIPTION
                                  </th>

                                  <th className="px-3 py-2 text-right text-[12px] font-semibold text-[#222]">
                                    AMOUNT / INR
                                  </th>
                                </tr>
                              </thead>

                              <tbody>
                                {pdfDetails?.invoiceInfo?.invoiceItems?.map(
                                  (item, index) => (
                                    <tr
                                      key={index}
                                      className="border-t border-[#F1F1F1] hover:bg-[#FAFBFF]"
                                    >
                                      <td className="px-3 py-2 text-[12px] text-[#2D2D2D] font-medium text-left">
                                        {item.description}
                                      </td>

                                      <td className="px-3 py-2 text-[12px] font-semibold text-[#2D2D2D] text-right">
                                        ₹{" "}
                                        {Number(
                                          item.amount || 0,
                                        ).toLocaleString("en-IN")}
                                      </td>
                                    </tr>
                                  ),
                                )}

                                <tr className="bg-[#F9F9F9] border-t border-[#DFDFDF]">
                                  <td className="px-3 py-2 text-[14px] text-[#2D2D2D] font-medium text-left">
                                    Total
                                  </td>

                                  <td className="px-3 py-2 text-right text-[14px] font-semibold text-[#2D2D2D]">
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

                        <div className="my-2 w-full flex justify-end">
                          <div className="w-[260px] px-3 py-2 text-[13px] font-semibold">
                            <div className="flex justify-between items-center mb-2 text-[13px]  text-[#1A1C21] font-semibold">
                              <span className=" font-[Gilroy,sans-serif]">
                                Grand Total
                              </span>
                              <span className=" font-[Gilroy,sans-serif]">
                                ₹{" "}
                                {Number(
                                  pdfDetails?.invoiceInfo?.totalAmount || 0,
                                )}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mb-2 text-[13px] font-semibold">
                              <span className=" font-[Gilroy,sans-serif]">
                                Payment Made
                              </span>
                              <span className=" text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                                ₹{" "}
                                {Number(
                                  pdfDetails?.invoiceInfo?.paidAmount || 0,
                                )}
                              </span>
                            </div>

                            <div className="flex justify-between items-center mb-2 text-[13px] text-[#1A1C21] font-semibold">
                              <span className=" font-[Gilroy,sans-serif]">
                                Discount Applied
                              </span>
                              <span className=" text-[#FF0000] font-[Gilroy,sans-serif]">
                                ₹{" "}
                                {Number(
                                  pdfDetails?.invoiceInfo?.discountAmount || 0,
                                )}
                              </span>
                            </div>

                            <div className="flex justify-between items-center text-[13px] font-semibold">
                              <span className="text-[#1A1C21] font-[Gilroy,sans-serif]">
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
                      </div>

                      <div className="px-4 my-2">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-6">
                            <h6 className="mb-3 text-[13px] font-bold font-gilroy">
                              ACCOUNT DETAILS
                            </h6>

                            <div className="mb-1">
                              <label className="text-[12px] font-medium text-[#4B4B4B] font-gilroy">
                                Account No:
                              </label>{" "}
                              <span className="text-[14px] font-medium text-[#171717] font-gilroy">
                                {pdfDetails?.accountDetails?.accountNo || ""}
                              </span>
                            </div>

                            <div className="mb-1">
                              <label className="text-[12px] font-medium text-[#4B4B4B] font-gilroy">
                                IFSC Code:
                              </label>{" "}
                              <span className="text-[14px] font-medium text-[#171717] font-gilroy">
                                {pdfDetails?.accountDetails?.ifscCode || ""}
                              </span>
                            </div>

                            <div className="mb-1">
                              <label className="text-[12px] font-medium text-[#4B4B4B] font-gilroy">
                                Bank Name:
                              </label>{" "}
                              <span className="text-[14px] font-medium text-[#171717] font-gilroy">
                                {pdfDetails?.accountDetails?.bankName || ""}
                              </span>
                            </div>

                            <div>
                              <label className="text-[12px] font-medium text-[#4B4B4B] font-gilroy">
                                UPI Details:
                              </label>{" "}
                              <span className="text-[14px] font-medium text-[#171717] font-gilroy">
                                {pdfDetails?.accountDetails?.upiId || ""}
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
                            <div className="flex justify-center text-xs text-[#3D3D3D]">
                              Scan QR for Payment
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap justify-between  my-10 px-4">
                        <div className="">
                          {pdfDetails?.configurations?.signatureUrl && (
                            <img
                              src={pdfDetails?.configurations?.signatureUrl}
                              alt="Digital Signature"
                              className="h-[60px] w-[130px] pl-5"
                            />
                          )}

                          <p className="text-[14px] font-[Gilroy] font-semibold text-[#2C2C2C]">
                            Authorized Signature
                          </p>
                        </div>
                        <div>
                          <div className="text-[14px] flex items-center gap-2 my-1 text-gray-900 font-semibold">
                            Status :
                            <TiTick
                              className={`${
                                pdfDetails?.invoiceInfo?.paymentStatus ===
                                "Pending"
                                  ? "text-[#F59E0B]"
                                  : pdfDetails?.invoiceInfo?.paymentStatus ===
                                      "Paid"
                                    ? "text-[#038C3D]"
                                    : pdfDetails?.invoiceInfo?.paymentStatus ===
                                        "Overdue"
                                      ? "text-[#DC2626]"
                                      : "text-[#6B7280]"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                pdfDetails?.invoiceInfo?.paymentStatus ===
                                "Pending"
                                  ? "text-[#F59E0B]"
                                  : pdfDetails?.invoiceInfo?.paymentStatus ===
                                      "Paid"
                                    ? "text-[#038C3D]"
                                    : pdfDetails?.invoiceInfo?.paymentStatus ===
                                        "Overdue"
                                      ? "text-[#DC2626]"
                                      : "text-[#6B7280]"
                              }`}
                            >
                              {pdfDetails?.invoiceInfo?.paymentStatus}
                            </span>
                          </div>
                          <div className="text-[14px] flex items-center font-semibold my-1 gap-2 text-gray-900 ">
                            Thanks for your stay.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={`w-full my-2 md:w-8/12 px-4 py-2`}>
                      <h4 className="text-[14px] font-[Gilroy] font-semibold text-gray-600">
                        T&C :{" "}
                        <span className="whitespace-pre-line text-[14px] font-[Gilroy] font-semibold text-gray-900 pr-[50px]">
                          {pdfDetails?.configurations?.termAndCondition}
                        </span>
                      </h4>
                    </div>
                    <div
                      className="absolute left-0 right-0 bottom-4"
                      style={{
                        background: "#FFFFFF",
                      }}
                    >
                      <hr className="border-1 border-[#D7DAE0] " />
                      <div className="px-5">
                        <div className="flex items-center justify-between text-center rounded-t-[38px]">
                          <p className="mb-0 text-[14px] font-gilroy font-medium text-[#4B4B4B]">
                            Email:{" "}
                            <span className="text-[14px] font-gilroy font-semibold text-[#222222]">
                              {pdfDetails?.emailId &&
                              pdfDetails.emailId !== "null"
                                ? pdfDetails.emailId
                                : ""}
                            </span>
                          </p>

                          <p className="mb-0 text-[14px] font-gilroy font-medium text-[#4B4B4B]">
                            Contact:{" "}
                            <span className="text-[14px] font-gilroy font-semibold text-[#222222]">
                              {pdfDetails?.mobile &&
                                `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 m-4 flex items-stretch">
                {pdfDetails?.invoiceInfo?.detailedDescription && (
                  <div className="col-span-1 md:col-span-12">
                    <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                      Description / Notes
                    </label>

                    <textarea
                      rows={4}
                      placeholder=""
                      className="w-full rounded-[8px] border border-[#D9D9D9] px-3 py-3 text-[15px] font-medium text-[#4B4B4B] outline-none resize-none focus:ring-0 focus:border-[#1E45E1]"
                      value={
                        pdfDetails?.invoiceInfo?.detailedDescription || "-"
                      }
                    />
                  </div>
                )}

                <div className="col-span-1 md:col-span-12">
                  <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                    Received from :{" "}
                    <span className="font-semibold">
                      {pdfDetails?.invoiceInfo?.paidBy}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.15)] font-gilroy">
        <div className="flex justify-between items-center px-4 py-2 !cursor-pointer ">
          <div className="flex  gap-4 cursor-pointer">
            <div
              onClick={() => {
                setIsOpenPayment(true);
                setActiveTab("payments");
              }}
              className={`px-1 py-2 cursor-pointer text-sm font-medium ${
                activeTab === "payments"
                  ? "text-[#1E45E1] border-b-[3px] border-[#1E45E1]"
                  : "text-black "
              }`}
            >
              Payments Made
            </div>

            <div
              onClick={() => {
                setIsOpenPayment(true);
                setActiveTab("invoices");
              }}
              className={`px-1 py-2 cursor-pointer text-sm font-medium ${
                activeTab === "invoices"
                  ? "text-[#1E45E1]  border-b-[3px] border-[#1E45E1]"
                  : "text-black border-0"
              }`}
            >
              Retainer adjusted Invoices
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative inline-flex">
              {pdfDetails?.invoiceInfo?.invoiceType === "ADVANCE" ? (
                <button
                  disabled={!canUpdateInvoice || !isRedeemAvailable}
                  onClick={() => handleApplyInvoices()}
                  className={`flex items-center gap-2 px-3 py-2 border !bg-[#F9F9F9] font-semibold  border-[#E7E7E7] rounded-[10px] transition-all duration-150
    ${
      !canUpdateInvoice || !isRedeemAvailable
        ? "cursor-not-allowed opacity-50 bg-gray-100"
        : "cursor-pointer hover:bg-[#EDF2FF]"
    }`}
                >
                  <Link21
                    color={
                      !canUpdateInvoice || !isRedeemAvailable
                        ? "#A9A9A9"
                        : "#1E45E1"
                    }
                    size="16"
                  />

                  <span
                    className={`text-sm font-semibold ${
                      !canUpdateInvoice || !isRedeemAvailable
                        ? "text-[#A9A9A9]"
                        : "text-[#222222]"
                    }`}
                  >
                    Apply to Invoices
                  </span>
                </button>
              ) : (
                <button
                  disabled={!canUpdateInvoice || !isRedeemAvailable}
                  onClick={() => handleApplyInvoicesRetainer(pdfDetails)}
                  className={`flex items-center gap-2 px-3 py-2 border !bg-[#F9F9F9] font-semibold  border-[#E7E7E7] rounded-[10px] transition-all duration-150
    ${
      !canUpdateInvoice || !isRedeemAvailable
        ? "cursor-not-allowed opacity-50 bg-gray-100"
        : "cursor-pointer hover:bg-[#EDF2FF]"
    }`}
                >
                  <Link21
                    color={
                      !canUpdateInvoice || !isRedeemAvailable
                        ? "#A9A9A9"
                        : "#1E45E1"
                    }
                    size="16"
                  />

                  <span
                    className={`text-sm font-semibold ${
                      !canUpdateInvoice || !isRedeemAvailable
                        ? "text-[#A9A9A9]"
                        : "text-[#222222]"
                    }`}
                  >
                    Apply to Invoices
                  </span>
                </button>
              )}
            </div>

            {isOpenPayment ? (
              <ArrowUp2
                size="18"
                variant="Bold"
                color="#1E45E1"
                style={{ cursor: "pointer" }}
                onClick={() => {
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
                onClick={() => {
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

                <div className="flex justify-end px-5 py-2 border-t mt-2 ">
                  <span className="mr-2 text-sm text-[#4B4B4B] font-medium">
                    Balance Due
                  </span>
                  <span className="text-sm text-red-500 font-medium">
                    ₹{pdfDetails?.invoiceInfo?.balanceAmount}
                  </span>
                </div>
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
                        <th className="text-left px-3 py-2">AMOUNT APPLIED</th>
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
          </div>
        )}
      </div>

      {applyInvoice && (
        <ApplyBookingModal
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={pdfDetails}
        />
      )}

      {applyInvoiceRetainer && (
        <RetainerApplyInvoice
          show={applyInvoiceRetainer}
          handleClose={handleCloseApplyInvoicesRetainer}
          advanceDetails={advanceDetails}
        />
      )}
    </div>
  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  handleClosed: PropTypes.func.isRequired,
};

export default withErrorBoundary(InvoiceCard);
