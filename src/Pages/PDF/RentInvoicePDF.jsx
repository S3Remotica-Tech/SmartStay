/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import "../Bills/Invoices.css";
// import Whatsapp from "../../Assets/Images/whatsapp.png";
// import Whatsapp_blue from "../../Assets/Images/whatsapp_blue.png";
// import Whatsapp_white from "../../Assets/Images/whatsapp_white.png";
// import Mail from "../../Assets/Images/gmail.png";
// import Mail_white from "../../Assets/Images/gmail_white.png";
// import Message_text from "../../Assets/Images/message-text.png";
// import Message_text_white from "../../Assets/Images/message-white.png";
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
// import PropTypes from "prop-types";
// import { IoClose } from "react-icons/io5";
// import { Row, Col, Table } from "react-bootstrap";
import {
  Location,
  Call,
  Profile,
  // DocumentDownload,
  // Edit,
  // RefreshSquare,
  // Link21,
} from "iconsax-react";
import { IoBed } from "react-icons/io5";
// import withErrorBoundary from "../../Hoc/WithErrorBountry";
// import { useNavigate } from "react-router-dom";
// import { ArrowUp2, ArrowDown2, AddCircle, Add } from "iconsax-react";
// import RecordPayment from "../../Pages/Bills/RecordPayment";
// import RefundAmount from "../Bills/RefundAmount";
// import { useHasPermission } from "../../Utils/Permission";
// import DiscountInvoice from "./DiscountInvoice";
// import WaiveOFFConfirm from "./WaiveOFFConfirm";
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
// import ApplyBookingModal from "../../Pages/Bookings/ApplyInvoices";
// import { TiTick } from "react-icons/ti";

function RentInvoicePDF() {
  const state = useSelector((state) => state);
  const pdfDetails = state.InvoiceList?.particularBillsDetails;
  const templateColor = pdfDetails?.configurations?.templateColor;
  const isGradient = templateColor?.includes("linear-gradient");
  const showRentalPeriod =
    pdfDetails?.configurations?.invoiceType === "Rent" &&
    pdfDetails?.invoiceType !== "SETTLEMENT";
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

  // const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;

  return (
    <div>
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
                height: pdfDetails?.configurations?.hostelLogo ? 50 : 25,
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
                pdfDetails.customerInfo.customerMobileNo !== "undefined"
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

        <div className="font-gilroy">
          <div className="grid grid-cols-12 border border-[#DFDFDF] rounded-lg overflow-hidden">
            <div
              className={`${pdfDetails?.invoiceInfo?.listDeductions?.length > 0 ? "col-span-12 md:col-span-6" : "col-span-12 md:col-span-12"} border-r border-[#DFDFDF] flex flex-col`}
            >
              <div className="overflow-x-auto flex-1">
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
                        <tr key={index} className="">
                          <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
                            {item.description}
                          </td>

                          <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
                            ₹ {Number(item.amount).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ),
                    )}

                    {Array.from({
                      length: Math.max(
                        0,
                        (pdfDetails?.invoiceInfo?.listDeductions?.length || 0) -
                          (pdfDetails?.invoiceInfo?.invoiceItems?.length || 0),
                      ),
                    }).map((_, index) => (
                      <tr key={`empty-left-${index}`}>
                        <td className="px-3 py-2">&nbsp;</td>
                        <td className="px-3 py-2">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold text-[#2D2D2D]">
                <span>Total</span>

                <span>
                  ₹{" "}
                  {Number(pdfDetails?.invoiceInfo?.total1 || 0).toLocaleString(
                    "en-IN",
                  )}
                </span>
              </div>
            </div>
            {pdfDetails?.invoiceInfo?.listDeductions?.length > 0 && (
              <div className="col-span-12 md:col-span-6 flex flex-col">
                <div className="overflow-x-auto flex-1">
                  <table className="w-full table-fixed">
                    <thead>
                      <tr className="bg-white border-b border-[#DFDFDF]">
                        <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222]">
                          Deductions
                        </th>

                        <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
                          AMOUNT / INR
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {pdfDetails?.invoiceInfo?.listDeductions?.length > 0 ? (
                        pdfDetails?.invoiceInfo?.listDeductions?.map(
                          (item, index) => (
                            <tr key={index} className="">
                              <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
                                {item.type}
                              </td>

                              <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
                                ₹ {Number(item.amount).toLocaleString("en-IN")}
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
                  <span className="text-[#FF0000]">Total Deductions</span>

                  <span className="text-[#2D2D2D]">
                    ₹{" "}
                    {Number(
                      pdfDetails?.invoiceInfo?.total2 || 0,
                    ).toLocaleString("en-IN")}
                  </span>
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
                ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
              </span>
            </div>

            <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                Payment Made
              </span>
              <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
              </span>
            </div>

            <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                Discount Applied
              </span>
              <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
              </span>
            </div>

            <div className="flex justify-between items-center text-[12px] font-semibold">
              <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
                Balance Due
              </span>
              <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
              </span>
            </div>
          </div>
        </div>
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
  );
}

export default RentInvoicePDF;
