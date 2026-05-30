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

function FinalSettlementInvoicePDF() {
  const state = useSelector((state) => state);
  const pdfDetails = state.InvoiceList?.particularBillsDetails;
  const templateColor = pdfDetails?.configurations?.templateColor;
  const isGradient = templateColor?.includes("linear-gradient");
  const showRentalPeriod =
    pdfDetails?.configurations?.invoiceType === "Rent" &&
    pdfDetails?.invoiceType !== "SETTLEMENT";

  const totalDeductions = pdfDetails?.invoiceInfo?.listDeductions?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

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

  const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;

  return (
    <div className="font-gilroy relative">
      <div className="p-2 rounded-t-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center px-3 gap-4">
          <div className=" justify-start">
            <div>
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
            <div className="py-1">
              <div className="text-[#222222] text-[11px] font-medium ">
                {pdfDetails?.emailId}
              </div>
            </div>
            <div className="py-1">
              <div className="text-[#222222] text-[11px] font-medium  ">
                {pdfDetails?.mobile &&
                  `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
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
            <div className="text-[#222222] text-[11px] font-medium  ">
              <span>GST IN : </span> <span></span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center pt-2 pb-1">
        <h5
          className="text-[17px] font-gilroy font-semibold text-[#171717]"
          // style={textStyle}
        >
          Final Settlement Invoice
        </h5>
      </div>
      <div
        className="mx-4 rounded-lg px-3 py-3"
        style={{ border: "1px solid #D7DAE0" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4  mt-1 font-gilroy">
          <div className="md:col-span-5 mb-3 text-[13px] text-[#222]">
            <div className="mb-2 text-[11px] font-semibold " style={textStyle}>
              Billed to:
            </div>

            <div className="mb-1 flex items-center">
              {/* <span style={getIconStyle(templateColor)}>
                <Profile size="16" variant="Bold" />
              </span> */}

              <span className="ml-1 text-[12px] font-bold text-[#171717]">
                {pdfDetails?.customerInfo?.fullName}
              </span>
            </div>

            <div className="mb-1 flex items-center">
              {/* <span style={getIconStyle(templateColor)}>
                <IoBed className="text-[16px]" />
              </span> */}

              <span className="ml-1 flex font-semibold items-center text-[12px] text-[#171717]">
                {pdfDetails?.stayInfo?.floorName && (
                  <> {pdfDetails.stayInfo.floorName}, </>
                )}
                {pdfDetails?.stayInfo?.roomName && (
                  <>{pdfDetails.stayInfo.roomName} </>
                )}
                - {pdfDetails?.stayInfo?.bedName}
              </span>
            </div>

            <div className="flex">
              {/* <span style={getIconStyle(templateColor)}>
                <Location size="16" variant="Bold" />
              </span> */}

              <div className="ml-1 text-[12px] text-[#5E6470] break-words">
                {pdfDetails?.customerInfo?.fullAddress}
              </div>
            </div>
            <div className="mb-1 flex items-center">
              {/* <span style={getIconStyle(templateColor)}>
                <Call size="16" variant="Bold" />
              </span> */}

              <span className="ml-1 text-[12px] text-[#5E6470]">
                {pdfDetails?.customerInfo?.customerMobileNo &&
                pdfDetails.customerInfo.customerMobileNo !== "undefined"
                  ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                  : ""}
              </span>
            </div>
          </div>

          <div className="md:col-span-7 mt-2 md:pl-5  flex justify-end pe-2">
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

              <>
                <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
                  Rental Period :
                </div>

                <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
                  {pdfDetails?.invoiceInfo?.invoicePeriod}
                </div>
              </>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="flex justify-between text-[10px] text-gray-700 font-semibold border-y-2 bg-[#F9F9F9] border-[#E5E7EB] p-2 uppercase">
            <span>Item Detail</span>
            <span>Amount</span>
          </div>

          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[11px] font-semibold text-[#1A1C21]">
                  Unpaid Invoices
                </h3>

                <div className="mt-1 space-y-1 text-[10px] text-[#6B7280]">
                  <span className="block">INV141 - ₹ 500</span>

                  <span className="block">INV075 - ₹ 2100</span>
                </div>
              </div>

              <p className="text-[11px] font-semibold text-[#1A1C21]">
                ₹ 2,600.00
              </p>
            </div>
          </div>

          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[11px] font-semibold text-[#1A1C21]">
                  Electricity Bill
                </h3>

                <div className="mt-1 space-y-2 text-[10px] text-[#6B7280] leading-5">
                  <div>
                    {" "}
                    <span>
                      Ground Floor - G 005 - B 03 &nbsp; - &nbsp; ₹ 270 (27
                      Units)
                    </span>
                  </div>
                  <div>
                    <span>
                      First Floor - F 002 - B 01 &nbsp; - &nbsp; ₹ 230 (23
                      Units)
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-semibold text-[#1A1C21] whitespace-nowrap">
                ₹ 500.00
              </p>
            </div>
          </div>

          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[11px] font-semibold text-[#1A1C21]">
                  Refundable Advance
                </h3>

                <div className="mt-1 space-y-2 text-[10px] text-[#6B7280]">
                  <div>
                    <span>Total Paid ₹ 10,000</span>
                  </div>

                  <div>
                    <span className="mb-1 block">INV001 - - ₹ 5000</span>
                  </div>

                  <div>
                    <span>INV654 - - ₹ 700</span>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-semibold text-[#1A1C21] whitespace-nowrap flex items-center gap-2">
                <span className="bg-[#00A32E] h-2.5 w-2.5 rounded-full inline-block"></span>{" "}
                ₹ 3,300.00
              </p>
            </div>
          </div>
          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[11px] font-semibold text-[#1A1C21]">
                  Refundable Rent
                </h3>

                <div className="mt-1 space-y-2 text-[10px] text-[#6B7280]">
                  <label>Last Rent Paid ₹ 10,000</label>
                  <label>
                    Current Stay Days (Rent)- 14 - ₹ 2,800 Ground Floor G 005 -
                    B 03 ( 10 days * 200 )
                  </label>
                  <div>
                    <label>Other Charges - ₹ 700</label>
                  </div>
                  <div>
                    <label>EB - ₹ 700</label>
                  </div>
                  <div>
                    <label>Laundry - ₹ 700</label>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-semibold text-[#1A1C21] whitespace-nowrap flex items-center gap-2">
                <span className="bg-[#00A32E] h-2.5 w-2.5 rounded-full inline-block"></span>{" "}
                ₹ 3,300.00
              </p>
            </div>
          </div>

          <div className="py-3  flex flex-col">
            <div className="w-[70%] ml-auto pe-2 space-y-2">
              <div className="flex justify-between items-start gap-3 text-[10px] text-[#1A1C21]">
                <span>Subtotal</span>

                <span className="font-semibold flex items-center gap-1 text-right ml-auto shrink-0">
                  <span className="bg-[#00A32E] h-2.5 w-2.5 rounded-full inline-block shrink-0"></span>

                  <span className="text-[10px] font-semibold text-right ml-auto shrink-0">
                    ₹ 999.00
                  </span>
                </span>
              </div>

              <div className="flex justify-between items-start gap-3 text-[10px] text-[#1A1C21]">
                <span>Tax-GST (8%)</span>

                <span className="text-[10px] font-semibold text-right ml-auto shrink-0">
                  ₹ 79.33
                </span>
              </div>

              <div className="flex justify-between whitespace-nowrap items-start gap-3 text-[10px] text-[#1A1C21]">
                <span>Deductions- Non Refundable</span>

                <span className="text-[10px] font-semibold text-right ml-auto shrink-0">
                  ₹ 5225255.25
                </span>
              </div>

              <div className="flex justify-between items-start whitespace-nowrap gap-3 text-[10px] text-[#1A1C21]">
                <span>Unpaid Invoices</span>

                <span className="text-[10px] font-semibold text-right ml-auto shrink-0">
                  ₹ 79.338
                </span>
              </div>

              <div className="flex justify-between items-start whitespace-nowrap gap-3 text-[10px] text-[#1A1C21]">
                <span>Electricity Bill</span>

                <span className="text-[10px] font-semibold text-right ml-auto shrink-0">
                  ₹ 79.33
                </span>
              </div>

              <div className="flex justify-between items-start pt-3 border-t border-[#E5E7EB] text-[10px] font-semibold text-[#1A1C21] gap-3">
                <span>Total</span>

                <span className="text-[10px] font-semibold text-right ml-auto shrink-0">
                  ₹ 1078.33
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6">
              <h6
                className="mb-3 text-[10px] font-extrabold font-gilroy"
                style={textStyle}
              >
                ACCOUNT DETAILS
              </h6>

              <div className="mb-1">
                <label className="text-[9px] font-medium text-[#4B4B4B] font-gilroy">
                  Account No:
                </label>{" "}
                <span className="text-[10px] font-medium text-[#171717] font-gilroy">
                  {pdfDetails?.accountDetails?.accountNo || "N/A"}
                </span>
              </div>

              <div className="mb-1">
                <label className="text-[9px] font-medium text-[#4B4B4B] font-gilroy">
                  IFSC Code:
                </label>{" "}
                <span className="text-[10px] font-medium text-[#171717] font-gilroy">
                  {pdfDetails?.accountDetails?.ifscCode || "N/A"}
                </span>
              </div>

              <div className="mb-1">
                <label className="text-[9px] font-medium text-[#4B4B4B] font-gilroy">
                  Bank Name:
                </label>{" "}
                <span className="text-[10px] font-medium text-[#171717] font-gilroy">
                  {pdfDetails?.accountDetails?.bankName || "N/A"}
                </span>
              </div>

              <div>
                <label className="text-[9px] font-medium text-[#4B4B4B] font-gilroy">
                  UPI Details:
                </label>{" "}
                <span className="text-[10px] font-medium text-[#171717] font-gilroy">
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

              <span className="text-xs text-[#3D3D3D] text-center fonr-normal">
                Scan QR for Payment
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between  items-center mt-4">
          <div className="">
            {pdfDetails?.configurations?.signatureUrl && (
              <img
                src={pdfDetails?.configurations?.signatureUrl}
                alt="Digital Signature"
                className="h-[60px] w-[130px]"
              />
            )}

            <p className="text-[10px] mt-1 font-[Gilroy] font-semibold text-[#2C2C2C]">
              Authorized Signature
            </p>
          </div>

          <div>
            <div className="text-[12px] flex items-center gap-2 text-gray-900 font-semibold ">
              Status : <TiTick className="text-[#038C3D]" />{" "}
              <span className="text-[#038C3D] text-sm"></span>
            </div>
            <div className="text-[12px] flex items-center font-semibold gap-2 text-gray-900 ">
              Thanks for the business.
            </div>
            <div className="text-[10px] flex font-medium items-center gap-2 text-gray-900 ">
              download date & time
            </div>
          </div>
        </div>
      </div>

      <div className={`w-full md:w-8/12 px-3 py-2`}>
        <h4 className="text-[11px] font-[Gilroy] font-semibold text-gray-600">
          T&C :{" "}
          <span className="whitespace-pre-line text-[10px] font-[Gilroy] font-semibold text-gray-900 pr-[50px]">
            {pdfDetails?.configurations?.termAndCondition}
          </span>
        </h4>
      </div>
    </div>
  );
}

export default FinalSettlementInvoicePDF;
