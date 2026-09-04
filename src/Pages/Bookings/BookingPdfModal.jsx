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
  const { canUpdateModule: canUpdateInvoice } = useHasPermission("Bills");

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
                <label className="text-[14px] font-medium text-[#222222] font-gilroy">
                  {pdfDetails?.invoiceNumber}
                </label>
              </div>

              <div>
                {rowData?.paymentStatus !== "Pending" ? (
                  <span className="text-[10px] bg-[#D9FFD9] text-black rounded-[14px] px-3 py-2 font-gilroy">
                    Paid
                  </span>
                ) : (
                  <span className="text-[10px] bg-[#FFF0F0] text-[#EB2427] rounded-[14px] px-3 py-2 cursor-pointer font-gilroy">
                    Unpaid
                  </span>
                )}
              </div>
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
                    <div className="p-2 relative rounded-t-lg">
                      <div className="flex justify-between items-center px-3">
                        <div className="w-1/2">
                          <img
                            src={
                              pdfDetails?.configurations?.hostelLogo
                                ? pdfDetails?.configurations?.hostelLogo
                                : Logo
                            }
                            alt="logo"
                            style={{
                              height: pdfDetails?.configurations?.hostelLogo
                                ? 50
                                : 25,
                              maxWidth: 134,
                            }}
                            className="mt-2 object-contain rounded"
                          />
                        </div>

                        <div className="mt-2 w-[45%] pl-4 pr-0">
                          <div className="text-[14px] font-semibold text-[#2B2B2B] mr-5 font-gilroy">
                            {pdfDetails?.stayInfo?.hostelName}
                          </div>
                          <div className="flex flex-wrap text-[11px] font-medium text-[#4B4B4B] leading-[1.2rem] w-[220px] break-words overflow-hidden line-clamp-5 font-gilroy">
                            {pdfDetails?.configurations?.address}
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr
                      className="mb-2"
                      style={{
                        border: "none",
                        height: "1px",
                        background: templateColor,
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        borderRadius: "2px",
                      }}
                    />

                    <div className="w-full bg-white rounded-b-lg relative">
                      <div className="text-center pt-2 pb-1">
                        <h5
                          className="text-[17px] font-semibold font-gilroy"
                          style={textStyle}
                        >
                          Retainer Invoice
                        </h5>
                      </div>
                      <div
                        className="mb-2 text-[11px] font-semibold italic px-5 mt-2"
                        style={textStyle}
                      >
                        Bill to:
                      </div>
                      <div className="grid grid-cols-2 gap-4 px-5 mt-2">
                        <div className="text-[13px] text-[#222] font-gilroy">
                          <div className="grid grid-cols-[120px_10px_1fr] mb-1 items-center">
                            <div className="text-[10px] text-[#4B4B4B] truncate ">
                              Tenant Name
                            </div>
                            <div className="text-center">:</div>
                            <div className="font-semibold text-[12px] text-[#171717]">
                              {pdfDetails?.customerInfo?.fullName}
                            </div>
                          </div>

                          <div className="grid grid-cols-[120px_10px_1fr] mb-1 items-center">
                            <div className="text-[10px] text-[#4B4B4B] truncate">
                              Mobile No
                            </div>
                            <div className="text-center">:</div>
                            <div className="text-[12px] text-[#171717]">
                              {pdfDetails?.customerInfo?.customerMobileNo &&
                              pdfDetails.customerInfo.customerMobileNo !==
                                "undefined"
                                ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                                : ""}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-[140px_10px_1fr] flex items-center">
                          {[
                            ["Invoice", pdfDetails?.invoiceNumber],
                            ["Invoice Date", pdfDetails?.invoiceDate],
                          ].map(([label, value], i) => (
                            <React.Fragment key={i}>
                              <div className="text-right text-[10px] text-[#4B4B4B] truncate">
                                {label}
                              </div>
                              <div className="text-center h-fit">:</div>
                              <div className="text-left text-[12px] font-semibold text-[#171717] truncate">
                                {value}
                              </div>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mx-5 my-2">
                      <div className="mb-1">
                        <label
                          className="text-[12px] font-semibold"
                          style={{ fontFamily: "Gilroy", ...textStyle }}
                        >
                          Payment Summary
                        </label>
                      </div>

                      <div className="border border-[#DFDFDF] rounded-lg ">
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead className="bg-white text-[#6B7280] text-xs uppercase">
                              <tr>
                                <th className="px-3 py-2 text-left text-[12px] font-semibold text-[#222]">
                                  INV NO
                                </th>
                                <th className="px-3 py-2 text-center text-[12px] font-semibold text-[#222]">
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
                                    <td className="px-3 py-2 text-[12px] text-[#2D2D2D] font-medium">
                                      {item.invoiceNo}
                                    </td>
                                    <td className="px-3 py-2 text-[12px] text-[#2D2D2D] font-medium text-center">
                                      {item.description}
                                    </td>
                                    <td className="px-3 py-2 text-[12px] font-semibold text-[#2D2D2D] text-right">
                                      ₹{" "}
                                      {Number(item.amount).toLocaleString(
                                        "en-IN",
                                      )}
                                    </td>
                                  </tr>
                                ),
                              )}

                              <tr className="bg-[#F9F9F9] border-t border-[#DFDFDF]">
                                <td
                                  colSpan={2}
                                  className={`px-3 py-2 text-[14px] text-[#2D2D2D] font-medium  text-center
            `}
                                >
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

                      <div className="mb-3 mt-3 px-3 py-2 border rounded bg-[#FAFBFF] text-[13px] font-semibold">
                        <div className="flex justify-between items-center mb-2">
                          <div
                            className="text-[#4B4B4B] text-[12px] font-semibold"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            Grand Total
                          </div>
                          <div
                            className="text-[12px] font-semibold text-[#4B4B4B]"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            ₹{" "}
                            {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <div
                            className="text-[#4B4B4B] text-[12px] font-semibold"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            Payment Made
                          </div>
                          <div
                            className="text-[12px] font-semibold text-[rgba(0,163,46,1)]"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                          </div>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                          <div
                            className="text-[#4B4B4B] text-[12px] font-semibold"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            Balance Due
                          </div>
                          <div
                            className="text-[12px] font-semibold text-[#FF0000]"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            ₹{" "}
                            {Number(
                              pdfDetails?.invoiceInfo?.balanceAmount || 0,
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-5 mt-1">
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 md:col-span-6 mb-1">
                          <h6
                            className="text-[11px] font-extrabold mb-[12px]"
                            style={{ fontFamily: "Gilroy", ...textStyle }}
                          >
                            PAY ACCOUNT DETAILS
                          </h6>

                          <div className="mb-1">
                            <label
                              className="text-[11px] font-medium text-[#4B4B4B]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              Account No:
                            </label>{" "}
                            <span
                              className="text-[12px] font-medium text-[#171717]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              {pdfDetails?.accountDetails?.accountNo || "N/A"}
                            </span>
                          </div>

                          <div className="mb-1">
                            <label
                              className="text-[11px] font-medium text-[#4B4B4B]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              IFSC Code:
                            </label>{" "}
                            <span
                              className="text-[12px] font-medium text-[#171717]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              {pdfDetails?.accountDetails?.ifscCode || "N/A"}
                            </span>
                          </div>

                          <div className="mb-1">
                            <label
                              className="text-[11px] font-medium text-[#4B4B4B]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              Bank Name:
                            </label>{" "}
                            <span
                              className="text-[12px] font-medium text-[#171717]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              {pdfDetails?.accountDetails?.bankName || "N/A"}
                            </span>
                          </div>

                          <div>
                            <label
                              className="text-[11px] font-medium text-[#4B4B4B]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              UPI Details:
                            </label>{" "}
                            <span
                              className="text-[12px] font-medium text-[#171717]"
                              style={{ fontFamily: "Gilroy" }}
                            >
                              {pdfDetails?.accountDetails?.upiId || "N/A"}
                            </span>
                          </div>
                        </div>

                        <div className="hidden md:block md:col-span-2"></div>

                        <div className="col-span-12 md:col-span-4 flex flex-col justify-between">
                          <div className="flex justify-center mb-2">
                            {pdfDetails?.accountDetails?.qrCode && (
                              <img
                                src={pdfDetails?.accountDetails?.qrCode}
                                alt="Barcode"
                                className="max-w-[150px] rounded-sm"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 justify-between mt-4 mb-5 px-5">
                      <div className="col-span-12 md:col-span-8">
                        <h4
                          className="text-[12px] font-semibold"
                          style={{ fontFamily: "Gilroy", ...textStyle }}
                        >
                          Terms and Conditions
                        </h4>

                        <p
                          className="text-[11px] font-medium text-[#3D3D3D] pr-[50px]"
                          style={{
                            whiteSpace: "pre-line",
                            fontFamily: "Gilroy",
                          }}
                        >
                          {pdfDetails?.configurations?.termAndCondition}
                        </p>
                      </div>

                      <div className="col-span-12 md:col-span-4 flex flex-col justify-end items-end">
                        {pdfDetails?.configurations?.signatureUrl && (
                          <img
                            src={pdfDetails?.configurations?.signatureUrl}
                            alt="Digital Signature"
                            className="h-[60px] w-[130px] pl-[20px]"
                          />
                        )}

                        <p
                          className="text-[13px] font-semibold text-[rgba(44,44,44,1)]"
                          style={{ fontFamily: "Gilroy" }}
                        >
                          Authorized Signature
                        </p>
                      </div>
                    </div>
                    <div
                      className="absolute left-0 right-0 bottom-4"
                      style={{
                        background: "#FFFFFF",
                      }}
                    >
                      <hr
                        className="mb-2"
                        style={{
                          border: "none",
                          height: "1px",
                          background: templateColor,
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          borderRadius: "2px",
                        }}
                      />

                      <div className="px-5">
                        <div className="flex justify-between text-center rounded-b-[38px]">
                          <p
                            className="mb-0 text-[13px] font-medium text-[#4B4B4B]"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            Email:{" "}
                            <span className="text-[13px] font-semibold text-[#222222]">
                              {pdfDetails?.emailId}
                            </span>
                          </p>

                          <p
                            className="mb-0 text-[13px] font-medium text-[#4B4B4B]"
                            style={{ fontFamily: "Gilroy" }}
                          >
                            Contact:{" "}
                            <span className="text-[13px] font-semibold text-[#222222]">
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
