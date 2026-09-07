/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { Location, Call, Profile, DocumentDownload } from "iconsax-react";
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "../../Utils/Permission";
import Book from "../../Assets/v2Images/Maskgroup.svg";
import Refund from "../../Assets/v2Images/Refund.svg";
import BookingCancelled from "../../Assets/v2Images/BookingCancelled.png";
import Payment from "../../Assets/v2Images/PaymentReceived.svg";

const InvoiceCard = ({ rowData }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);

  const [hoveredItem, setHoveredItem] = useState(null);
  const pdfDetails = state.InvoiceList?.newReceiptchanges;
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

  const [isVisible, setIsVisible] = useState(true);

  const { canReadModule: canReadReceipt } = useHasPermission("Receipt");

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

  const receiptConfig = {
    rent: {
      label: "Payment Receipt",
      image: Payment,
    },
    booking: {
      label: "Booking Receipt",
      image: Book,
      image2: BookingCancelled,
    },
    advance: {
      label: "Security Deposit Receipt",
      image: Payment,
    },
    final: {
      label: "Final Settlement Receipt",
      image: Refund,
    },
  };

  const type = pdfDetails?.configurations?.receiptType?.trim().toLowerCase();

  let currentConfig = receiptConfig[type];

  if (!currentConfig) {
    currentConfig = receiptConfig.final;
  }

  if (type !== "booking") {
    currentConfig = {
      ...currentConfig,
      image: Number(pdfDetails?.invoiceAmount) > 0 ? Payment : Refund,
    };
  }

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
  const isExportAllow = isValidSubscription && canReadReceipt;

  useEffect(() => {
    // setIdForWhats(rowData?.id);
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

  function convertNumberToWords(num) {
    const a = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const b = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];

    if ((num = Number(num)) > 999999999) return "Overflow";
    if (num === 0) return "Zero Rupees Only";

    const nStr = ("000000000" + num).slice(-9);
    const n = nStr.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";

    let str = "";

    const twoDigitWords = (val) => {
      val = Number(val);
      if (val < 20) return a[val];
      return (
        b[Math.floor(val / 10)] + (val % 10 !== 0 ? " " + a[val % 10] : "")
      );
    };

    str += n[1] !== "00" ? twoDigitWords(n[1]) + " Crore " : "";
    str += n[2] !== "00" ? twoDigitWords(n[2]) + " Lakh " : "";
    str += n[3] !== "00" ? twoDigitWords(n[3]) + " Thousand " : "";
    str += n[4] !== "0" ? a[Number(n[4])] + " Hundred " : "";
    str +=
      n[5] !== "00"
        ? (str !== "" ? "and " : "") + twoDigitWords(n[5]) + " "
        : "";

    return str.trim() + " Rupees Only.";
  }

  // const innerScrollRef = useRef(null);s

  const [pdfLoading, setPdfLoading] = useState(false);

  const handleBackInvoice = () => {
    navigate(`/receipts/${state.login?.selectedHostel_Id}`);
  };

  const handleDownload = (item) => {
    if (item.transactionId) {
      dispatch({
        type: "RECEIPTPDF",
        payload: {
          transactionId: item.transactionId,
          hostelId: state.login?.selectedHostel_Id,
        },
      });
      setPdfLoading(true);
    }
  };

  //   useEffect(() => {
  //     if (!state.InvoiceList.ReceiptPDF) return;

  //     window.open(state.InvoiceList.ReceiptPDF, "_blank");
  // setPdfLoading(false)
  //     dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
  //   }, [state.InvoiceList.ReceiptPDF]);

  useEffect(() => {
    if (state.InvoiceList.statusCodeForReceiptPDf === 200) {
      setPdfLoading(false);
      window.open(state.InvoiceList.ReceiptPDF, "_blank");

      dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
    }
  }, [state.InvoiceList.statusCodeForReceiptPDf]);

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

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (key === "whatsapp") {
      dispatch({
        type: "WHATSAPPSHAREPDFRECEIPT",
        payload: {
          hostelId: pdfDetails?.hostelId,
          transactionId: pdfDetails?.receiptInfo?.receiptId,
        },
      });

      setPdfLoading(true);
    }
  };

  useEffect(() => {
    if (state.InvoiceList.shareReceiptPdfSuccess === 200) {
      setPdfLoading(false);
      dispatch({ type: "REMOVE_WHATSAPP_SHARE_PDF_RECEIPT" });
    }
  }, [state.InvoiceList.shareReceiptPdfSuccess]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "RECEIPTSLIST",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

  // const hasAmount = -100

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

  return (
    <>
      <div
        className="sticky-top bg-white p-0 m-0 d-flex justify-content-between align-items-center"
        style={{ borderLeft: "1px solid #E5E7EB" }}
      >
        {pdfLoading && (
          <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex justify-between items-center bg-white border-b border-[#E0E0E0] h-[50px] w-full">
          <div className="flex items-center gap-2">
            <div className="pl-1">
              <label className="text-[14px] font-medium text-[#222222] font-gilroy">
                {pdfDetails?.invoiceNumber}
              </label>
            </div>

            <span className="flex items-center gap-2 bg-[#ECFDF5] text-black rounded-full px-2 py-[2px] text-[10px] font-gilroy w-fit capitalize">
              <span className="h-2 w-2 rounded-full bg-[#10B981]"></span>
              {rowData?.paymentStatus}
            </span>
          </div>

          <div>
            <div className="flex gap-2 mr-3 items-center">
              <div
                className={`flex justify-center items-center border rounded-[8px] h-[30px] w-[30px]
          ${isExportAllow ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"}`}
                onClick={() => {
                  if (isExportAllow) handleDownload(rowData);
                }}
              >
                <DocumentDownload
                  size="18"
                  color={isExportAllow ? "#222222" : "#BDBDBD"}
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
                    className="h-[15px] w-[15px] brightness-0 invert"
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
                          key={item.key}
                          className={`flex items-center mb-2 p-1 rounded z-[9999]
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${hoveredItem === item.key && !isDisabled ? "bg-[#1E45E1]" : "bg-white"}
                  `}
                          onMouseEnter={() =>
                            !isDisabled && setHoveredItem(item.key)
                          }
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => {
                            if (!isDisabled) handleMenuClick(item.key);
                          }}
                        >
                          <img
                            src={
                              hoveredItem === item.key && !isDisabled
                                ? item.iconWhite
                                : item.icon
                            }
                            className="mr-2"
                            alt={item.label}
                          />

                          <span
                            className={`text-[13px] font-normal font-gilroy
                      ${
                        hoveredItem === item.key && !isDisabled
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

      <div className="bg-[#F7F8FC] h-[90vh] overflow-y-auto overflow-x-hidden flex justify-center p-3 show-scrolls">
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
                  <div className="p-2 relative rounded-t-[8px]">
                    <div className="flex justify-between items-center px-3">
                      <div className="w-1/2">
                        <img
                          src={
                            pdfDetails?.configurations?.hostelLogo
                              ? pdfDetails?.configurations?.hostelLogo
                              : Logo
                          }
                          alt="logo"
                          className={`mt-2 max-w-[134px] rounded-[4px] object-contain ${
                            pdfDetails?.configurations?.hostelLogo
                              ? "h-[50px]"
                              : "h-[25px]"
                          }`}
                        />
                      </div>

                      <div className="mt-2 w-[45%] pl-4 pr-0">
                        <div className="text-[14px] font-semibold text-[#2B2B2B] font-gilroy mr-[20px]">
                          {pdfDetails?.stayInfo?.hostelName}
                        </div>

                        <div className="text-[11px] font-medium text-[#4B4B4B] font-gilroy leading-[1.2rem] w-[220px] break-words overflow-hidden line-clamp-5">
                          {pdfDetails?.configurations?.address}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="h-[1px] rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                    style={{ background: templateColor }}
                  />

                  <div className="w-full bg-white rounded-b relative font-[Gilroy]">
                    <div className="text-center pt-2 pb-1">
                      <h5
                        className="text-[17px] font-[Gilroy] font-semibold"
                        style={textStyle}
                      >
                        {pdfDetails?.configurations?.receiptType === "Rent"
                          ? "Payment Receipt"
                          : pdfDetails?.configurations?.receiptType ===
                              "Booking"
                            ? "Booking Receipt"
                            : pdfDetails?.configurations?.receiptType ===
                                "Advance"
                              ? "Security Deposit Receipt"
                              : "Final Settlement Receipt"}
                      </h5>
                    </div>

                    {/* GRID SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 mt-1">
                      {/* LEFT SIDE */}
                      <div className="md:col-span-5 text-[#222] text-[13px] font-[Gilroy]">
                        <div
                          className="mb-2 text-[12px] italic font-normal"
                          style={textStyle}
                        >
                          Receipt to :
                        </div>

                        <div className="flex items-center mb-1">
                          <span style={getIconStyle(templateColor)}>
                            <Profile size="16" variant="Bold" />
                          </span>
                          <span className="ml-1 text-[12px] font-semibold text-[#171717]">
                            : {pdfDetails?.customerInfo?.fullName}
                          </span>
                        </div>

                        <div className="flex mb-1">
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

                        <div className="flex mb-1">
                          <span style={getIconStyle(templateColor)}>
                            <IoBed className="text-[16px]" />
                          </span>
                          <span className="ml-1 text-[12px] flex items-center text-[#171717]">
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
                          <div className="ml-1 text-[12px] text-[#171717]">
                            : {pdfDetails?.customerInfo?.fullAddress}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-7 grid grid-cols-2 gap-y-1 mt-2 md:pl-6">
                        {[
                          [
                            "Receipt No :",
                            pdfDetails?.receiptInfo?.receiptNumber,
                          ],
                          ["Date :", pdfDetails?.receiptInfo?.transactionDate],
                          ["Time :", pdfDetails?.receiptInfo?.transactionTime],
                          [
                            "Payment Mode :",
                            pdfDetails?.accountDetails?.bankName,
                          ],
                          [
                            "Transaction ID :",
                            pdfDetails?.receiptInfo?.transactionId,
                          ],

                          ...(pdfDetails?.rentalPeriod
                            ? [["Rental Period :", pdfDetails.rentalPeriod]]
                            : []),
                        ].map(([label, value], i) => (
                          <React.Fragment key={i}>
                            <div className="text-right text-[10px] text-[#4B4B4B] whitespace-nowrap overflow-hidden text-ellipsis">
                              {label}
                            </div>
                            <div className="text-left ms-2 text-[12px] font-semibold text-[#171717] whitespace-nowrap overflow-hidden text-ellipsis">
                              {value}
                            </div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="px-4 mt-3">
                      <div className="flex flex-col md:flex-row border border-[#E6E6E6] rounded-[10px] overflow-hidden items-center">
                        <div className="md:w-1/3 w-full p-[10px] font-semibold text-[13px] text-black border-b md:border-b-0 md:border-r border-[#E6E6E6] capitalize">
                          {Number(pdfDetails?.invoiceAmount) > 0
                            ? "TOTAL PAID AMOUNT"
                            : "Total Refunded Amount"}
                          <br />

                          {(pdfDetails?.configurations?.receiptType ===
                            "Booking" ||
                            pdfDetails?.configurations?.receiptType ===
                              "Advance") && (
                            <span className="text-[11px] text-[#6D6D6D] font-[Gilroy]">
                              Security Deposit (Advance)
                            </span>
                          )}
                        </div>

                        <div className="md:w-2/3 w-full">
                          <div className="flex items-center gap-2 bg-[#F1FFF5] p-[10px] text-[18px] font-semibold text-black">
                            <div className="h-[24px] w-[3px] bg-[#00A651]" />₹{" "}
                            {pdfDetails?.receiptInfo?.paidAmount}
                          </div>

                          <div className="text-[12px] text-[#4B4B4B] p-[10px]">
                            {convertNumberToWords(
                              pdfDetails?.receiptInfo?.paidAmount || 0,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap justify-between  items-center mt-4 mb-4 px-5">
                    <div className="w-full md:w-8/12 p-0  flex items-center">
                      <div>
                        <h4 className="text-[12px] font-[Gilroy] font-medium text-[#4B4B4B]">
                          Acknowledgment
                        </h4>

                        <p className="whitespace-pre-line text-[11px] font-[Gilroy] font-semibold text-[#3D3D3D] pr-[100px] text-justify">
                          {pdfDetails?.configurations?.termAndCondition}
                        </p>
                      </div>
                    </div>

                    <div className="w-full md:w-4/12 flex flex-col justify-end items-end p-0 mt-4 md:mt-0">
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

                  <div className="flex flex-wrap justify-between mt-2 mb-0 px-5">
                    <div className="w-full md:w-8/12 p-0 flex items-center ">
                      <p className="whitespace-pre-line  text-[11px] font-[Gilroy] font-medium text-[#3D3D3D] pr-[100px]">
                        {pdfDetails?.configurations?.receiptNotes}
                      </p>
                    </div>

                    <div className="w-full md:w-4/12 flex flex-col h-fit  ">
                      <img
                        src={
                          currentConfig?.label === "Booking Receipt" &&
                          pdfDetails?.paymentStatus === "Refunded"
                            ? currentConfig?.image2
                            : currentConfig?.image
                        }
                        alt={currentConfig?.label}
                        className="w-full h-fit"
                      />
                    </div>
                  </div>

                  {pdfDetails?.configurations?.receiptType === "Advance" ||
                  pdfDetails?.configurations?.receiptType === "Booking" ? (
                    <div
                      className="table-responsive row justify-content-between mt-0 mb-2 px-5"
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
                              Invoice Number
                            </th>
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "center",
                                borderBottom: "1px solid #dee2e6",
                                width: "60%",
                              }}
                            >
                              DESCRIPTION
                            </th>
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "right",
                                borderBottom: "1px solid #dee2e6",
                                width: "20%",
                              }}
                            >
                              AMOUNT / INR
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            style={{
                              // borderBottom: "1px solid #dee2e6",
                              backgroundColor: "#fff",
                            }}
                          >
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                textAlign: "left",
                                verticalAlign: "middle",
                                width: "20%",
                              }}
                            >
                              {pdfDetails?.invoiceNumber}
                            </td>
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#444",
                                textAlign: "center",
                                verticalAlign: "middle",
                                width: "60%",
                              }}
                            >
                              Security Deposit (Advance) - Deductions
                            </td>
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#444",
                                textAlign: "right",
                                verticalAlign: "middle",
                                width: "20%",
                              }}
                            >
                              Rs.{" "}
                              {pdfDetails?.invoiceAmount?.toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr
                            style={{
                              backgroundColor: "#F9F9F9",
                              fontWeight: 600,
                            }}
                          >
                            <td
                              colSpan="2"
                              style={{
                                textAlign: "left",
                                padding: "10px 14px",
                                fontSize: "13px",
                                // borderTop: "1px solid #dee2e6",
                                color: "#000",
                              }}
                            >
                              Total
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                padding: "10px 14px",
                                fontSize: "13px",
                                // borderTop: "1px solid #dee2e6",
                                color: "#000",
                              }}
                            >
                              ₹{" "}
                              {pdfDetails?.invoiceAmount?.toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : pdfDetails?.configurations?.receiptType === "Rent" ? (
                    <div
                      className="table-responsive row justify-content-between mt-0 mb-2 px-5"
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
                              {pdfDetails?.invoiceNumber}
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
                              {pdfDetails?.invoiceDate}
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
                              ₹{" "}
                              {pdfDetails?.invoiceAmount?.toLocaleString(
                                "en-IN",
                              )}
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
                              ₹{" "}
                              {pdfDetails?.receiptInfo?.paidAmount?.toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div
                      className="table-responsive row justify-content-between mt-0 mb-2 px-5"
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
                                width: "10%",
                              }}
                            >
                              S.NO
                            </th>
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "left",
                                borderBottom: "1px solid #dee2e6",
                                width: "60%",
                              }}
                            >
                              DESCRIPTION
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
                              AMOUNT / INR
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            style={{
                              // borderBottom: "1px solid #dee2e6",
                              backgroundColor: "#fff",
                            }}
                          >
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              1
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
                              {pdfDetails?.configurations?.receiptType}
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
                              Rs.{" "}
                              {pdfDetails?.invoiceAmount?.toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>

                          <tr
                            style={{
                              backgroundColor: "#F9F9F9",
                              fontWeight: 600,
                            }}
                          >
                            <td
                              colSpan="2"
                              style={{
                                textAlign: "left",
                                padding: "10px 14px",
                                fontSize: "13px",
                                // borderTop: "1px solid #dee2e6",
                                color: "#000",
                              }}
                            >
                              Total
                            </td>
                            <td
                              style={{
                                textAlign: "right",
                                padding: "10px 14px",
                                fontSize: "13px",
                                // borderTop: "1px solid #dee2e6",
                                color: "#000",
                              }}
                            >
                              ₹{" "}
                              {pdfDetails?.invoiceAmount?.toLocaleString(
                                "en-IN",
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div
                    className="absolute left-0 right-0 bottom-4"
                    style={{
                      background: "#FFFFFF",
                    }}
                  >
                    <div
                      className="h-[1px] rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                      style={{ background: templateColor }}
                    />

                    <div className="px-5">
                      <div className="flex flex-col md:flex-row md:justify-between items-center text-center md:text-left rounded-t-[38px]">
                        <p className="text-[13px] font-[Gilroy] font-medium text-[#4B4B4B] mb-2 md:mb-0">
                          Email:{" "}
                          <span className="text-[13px] font-[Gilroy] font-semibold text-[#222222]">
                            {pdfDetails?.emailId}
                          </span>
                        </p>

                        <p className="text-[13px] font-[Gilroy] font-medium text-[#4B4B4B]">
                          Contact:{" "}
                          <span className="text-[13px] font-[Gilroy] font-semibold text-[#222222]">
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
          </div>
        )}
      </div>
    </>
  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  handleClosed: PropTypes.func.isRequired,
};

export default withErrorBoundary(InvoiceCard);
