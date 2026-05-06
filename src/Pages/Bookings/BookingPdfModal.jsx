/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
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
// import Gpay from '../../Assets/Images/gpay.png'
// import Phonepe from '../../Assets/Images/phonepe.png'
// import Paytm from '../../Assets/Images/paytm.png'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { Row, Col, Table } from "react-bootstrap";
import { Location, Call, Profile } from "iconsax-react";
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { ArrowUp2, ArrowDown2, AddCircle, Add, Link21 } from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import ApplyBookingModal from "./ApplyInvoices";

const InvoiceCard = ({ rowData }) => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const [hoveredItem, setHoveredItem] = useState(null);

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
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const cardRef = useRef(null);
  const [applyInvoice, setApplyInvoice] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, [rowData]);

  const innerScrollRef = useRef(null);

  const handleDownload = async () => {};

  const handleBackInvoice = () => {
    navigate(`/booking/${state.login?.selectedHostel_Id}`);
  };
  const {
    canWriteModule: canWriteBooking,
    canReadModule: canReadBooking,
    // canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Booking");
  // const isValid = (value) => {
  //   return value !== null && value !== undefined && value !== "undefined" && value !== "";
  // };

  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (key === "whatsapp") {
      // try {
      //   dispatch({
      //     type: "SET_TRIGGER_SOURCE",
      //     payload: "whatsapp",
      //   });
      //   dispatch({
      //     type: "INVOICEPDF",
      //     payload: {
      //       id: idforwhats,
      //     },
      //   });
      // } catch (error) {
      //   console.error("Error sending WhatsApp with PDF:", error);
      // }
    }
  };

  const pdfDetails = state.InvoiceList?.particularBillsDetails;

  console.log("pdfDetails", pdfDetails);

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

  const handleApplyInvoices = () => {
    setApplyInvoice(true);
  };

  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };

  return (
    <div className="sticky top-0 z-[100] bg-white">
      <div>
        <div className="flex justify-between items-center border-l border-[#E5E7EB]">
          <div className="flex justify-between items-center w-full h-12 bg-white border-b border-[#E0E0E0]">
            {/* LEFT */}
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

            {/* RIGHT */}
            <div>
              <div className="flex gap-2">
                {/* DOWNLOAD */}
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

                {/* SHARE */}
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
                    <div className="absolute left-0 mt-2 p-2 shadow rounded-[8px] bg-white w-[160px] z-10">
                      {menuItems.map((item) => (
                        <div
                          key={item.key}
                          className={`flex items-center mb-2 p-1 rounded cursor-pointer ${
                            hoveredItem === item.key
                              ? "bg-[#1E45E1]"
                              : "bg-white"
                          }`}
                          onMouseEnter={() => setHoveredItem(item.key)}
                          onMouseLeave={() => setHoveredItem(null)}
                          onClick={() => handleMenuClick(item.key)}
                        >
                          <img
                            src={
                              hoveredItem === item.key
                                ? item.iconWhite
                                : item.icon
                            }
                            className="mr-2"
                            alt={item.label}
                          />
                          <span
                            className={`text-[13px] font-normal font-gilroy ${
                              hoveredItem === item.key
                                ? "text-white"
                                : "text-[#212529]"
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* CLOSE */}
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
            <div className="w-[90%] rounded-lg">
              <div
                ref={innerScrollRef}
                className="rounded-lg bg-white mb-[50px] shadow-[0px_2px_6px_rgba(0,0,0,0.08)]"
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
                      Booking Invoice
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

                    <div className="grid grid-cols-[180px_10px_1fr] flex items-center">
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

                  <div className="border border-[#DFDFDF] rounded-lg overflow-hidden">
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
                                  {Number(item.amount).toLocaleString("en-IN")}
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
                        ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
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
                        ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
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

                    {/* SPACER */}
                    <div className="hidden md:block md:col-span-2"></div>

                    {/* RIGHT SECTION */}
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

                      {/* OPTIONAL ICONS */}
                      {/* 
      <div className="flex justify-end">
        {[Paytm, Phonepe, Gpay].map((icon, idx) => (
          <img key={idx} src={icon} alt="UPI" className="h-[38px] w-[38px] ml-2" />
        ))}
      </div> 
      */}
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
          )}
        </div>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-6px_10px_-6px_rgba(0,0,0,0.15)] font-gilroy">
        <div className="flex justify-between items-center px-4 py-2 cursor-pointer">
          <span className="font-semibold text-[16px] text-[#222]">
            Payments Made
          </span>

          <div className="flex items-center gap-2">
            <div className="relative inline-flex">
              <button
                disabled={!canWriteBooking}
                onClick={() => handleApplyInvoices()}
                className={`flex items-center gap-2 px-3 py-2 border-b border-[#E7E7E7] rounded-[10px]
    ${
      !canWriteBooking
        ? "cursor-not-allowed opacity-50 bg-gray-100"
        : "cursor-pointer bg-gray-200"
    }`}
              >
                <Link21
                  color={`${canWriteBooking ? "#1E45E1" : "#A9A9A9"}`}
                  size="16"
                />
                <span
                  className={` text-sm font-medium text-[#222] ${
                    !canWriteBooking
                      ? "cursor-not-allowed opacity-50 bg-gray-100"
                      : "cursor-pointer "
                  }`}
                >
                  Apply Invoices
                </span>
              </button>
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
            {pdfDetails?.paymentHistory?.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                    <tr>
                      <th className="text-left px-3 py-2">DATE</th>
                      <th className="text-left px-3 py-2">REF NO</th>
                      <th className="text-left px-3 py-2">PAYMENT MODE</th>
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
            )}

            {pdfDetails?.refundHistory?.length > 0 && (
              <div className="overflow-x-auto mt-2">
                <table className="w-full text-sm">
                  <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs font-semibold">
                    <tr>
                      <th className="text-left px-3 py-2">DATE</th>
                      <th className="text-left px-3 py-2">REF NO</th>
                      <th className="text-left px-3 py-2">RETURNED FROM</th>
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

      {applyInvoice && (
        <ApplyBookingModal
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={pdfDetails}
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
