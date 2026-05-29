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
        <h5 className="text-[17px] font-gilroy font-semibold" style={textStyle}>
          Final Settlement Invoice
        </h5>
      </div>
      <div
        className="mx-4 rounded-lg px-3 py-3"
        style={{ border: "1px solid", borderColor: templateColor }}
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
          <div className="flex justify-between text-[11px] text-gray-700 font-semibold border-y-2 border-[#E5E7EB] p-2 uppercase">
            <span>Item Detail</span>
            <span>Amount</span>
          </div>

          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-[14px] font-semibold text-[#1A1C21]">
                  Unpaid Invoices
                </h3>

                <div className="mt-1 space-y-1 text-[12px] text-[#6B7280]">
                  <span className="block">INV141 - ₹ 500</span>

                  <span className="block">INV075 - ₹ 2100</span>
                </div>
              </div>

              <p className="text-[14px] font-semibold text-[#1A1C21]">
                ₹ 2,600.00
              </p>
            </div>
          </div>

          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[14px] font-semibold text-[#1A1C21]">
                  Electricity Bill
                </h3>

                <div className="mt-1 space-y-2 text-[12px] text-[#6B7280] leading-5">
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

              <p className="text-[14px] font-semibold text-[#1A1C21] whitespace-nowrap">
                ₹ 500.00
              </p>
            </div>
          </div>

          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[14px] font-semibold text-[#1A1C21]">
                  Refundable Advance
                </h3>

                <div className="mt-1 space-y-2 text-[12px] text-[#6B7280]">
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

              <p className="text-[14px] font-semibold text-[#1A1C21] whitespace-nowrap flex items-center gap-2">
                <span className="bg-[#00A32E] h-2.5 w-2.5 rounded-full inline-block"></span>{" "}
                ₹ 3,300.00
              </p>
            </div>
          </div>
          <div className="py-3 border-b border-[#E5E7EB]">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-[14px] font-semibold text-[#1A1C21]">
                  Refundable Rent
                </h3>

                <div className="mt-1 space-y-2 text-[12px] text-[#6B7280]">
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

              <p className="text-[14px] font-semibold text-[#1A1C21] whitespace-nowrap flex items-center gap-2">
                <span className="bg-[#00A32E] h-2.5 w-2.5 rounded-full inline-block"></span>{" "}
                ₹ 3,300.00
              </p>
            </div>
          </div>

          <div className="py-3 flex justify-end pe-1">
            <div className="w-[260px] space-y-1">
              <div className="flex justify-between items-center gap-3 text-[14px] text-[#1A1C21]">
                <span className=" min-w-0">Subtotal</span>

                <span className="font-semibold flex items-center gap-1 shrink-0 max-w-[120px] ">
                  <span className="bg-[#00A32E] h-2.5 w-2.5 rounded-full inline-block shrink-0"></span>

                  <span className="">₹ 999.00</span>
                </span>
              </div>

              <div className="flex justify-between items-center gap-3 text-[14px] text-[#1A1C21]">
                <span className=" min-w-0">Tax-GST (8%)</span>

                <span className="font-semibold shrink-0 max-w-[120px]  text-right">
                  ₹ 79.33
                </span>
              </div>

              <div className="flex justify-between items-center gap-3 text-[14px]  text-[#1A1C21]">
                <span className="">Deductions- Non Refundable</span>

                <span className="font-semibold shrink-0 max-w-[120px] text-right">
                  ₹ 522525.2558
                </span>
              </div>

              <div className="flex justify-between items-center gap-3 text-[14px] text-[#1A1C21]">
                <span className=" min-w-0">Unpaid Invoices</span>

                <span className="font-semibold shrink-0 max-w-[120px]  text-right">
                  ₹ 79.3385
                </span>
              </div>

              <div className="flex justify-between items-center gap-3 text-[14px] text-[#1A1C21]">
                <span className=" min-w-0">Electricity Bill</span>

                <span className="font-semibold shrink-0 max-w-[120px]  text-right">
                  ₹ 79.33
                </span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[#E5E7EB] text-[15px] font-semibold text-[#1A1C21] gap-3">
                <span>Total</span>

                <span className="shrink-0 max-w-[120px] truncate text-right">
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

// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../Bills/Invoices.css";
// import Whatsapp from "../../Assets/Images/whatsapp.png";
// import Whatsapp_blue from "../../Assets/Images/whatsapp_blue.png";
// import Whatsapp_white from "../../Assets/Images/whatsapp_white.png";
// import Mail from "../../Assets/Images/gmail.png";
// import Mail_white from "../../Assets/Images/gmail_white.png";
// import Message_text from "../../Assets/Images/message-text.png";
// import Message_text_white from "../../Assets/Images/message-white.png";
// import Logo from "../../Assets/Images/New_images/Group_Logo.png";
// import PropTypes from "prop-types";
// import { IoClose } from "react-icons/io5";
// import { Row, Col, Table } from "react-bootstrap";
// import {
//   Location,
//   Call,
//   Profile,
//   DocumentDownload,
//   Edit,
//   RefreshSquare,
//   Link21,
// } from "iconsax-react";
// import { IoBed } from "react-icons/io5";
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

// function FinalSettlementInvoicePDF() {
//   const state = useSelector((state) => state);
//   const pdfDetails = state.InvoiceList?.particularBillsDetails;
//   const templateColor = pdfDetails?.configurations?.templateColor;
//   const isGradient = templateColor?.includes("linear-gradient");
//   const showRentalPeriod =
//     pdfDetails?.configurations?.invoiceType === "Rent" &&
//     pdfDetails?.invoiceType !== "SETTLEMENT";

//   const totalDeductions = pdfDetails?.invoiceInfo?.listDeductions?.reduce(
//     (sum, item) => sum + Number(item.amount || 0),
//     0,
//   );

//   const textStyle = isGradient
//     ? {
//         fontFamily: "Gilroy",
//         fontWeight: 600,
//         background: templateColor,
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//       }
//     : {
//         fontFamily: "Gilroy",
//         fontWeight: 600,
//         color: templateColor || "#1E45E1",
//       };

//   const getIconStyle = (templateColor) => {
//     const isGradient = templateColor?.includes("linear-gradient");

//     return isGradient
//       ? {
//           background: templateColor,
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent",
//           display: "inline-flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }
//       : { color: templateColor || "#4B4B4B" };
//   };

//   const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;

//   return (
//     <div>
//       <div className="p-2 rounded-t-lg">
//         <div className="grid grid-cols-1 sm:grid-cols-2 items-center px-3 gap-4">
//           <div className="flex justify-start">
//             <img
//               src={
//                 pdfDetails?.configurations?.hostelLogo
//                   ? pdfDetails?.configurations?.hostelLogo
//                   : Logo
//               }
//               alt="logo"
//               className="mt-2 max-w-[134px] rounded object-contain"
//               style={{
//                 height: pdfDetails?.configurations?.hostelLogo ? 50 : 25,
//               }}
//             />
//           </div>

//           <div className="mt-2 sm:pl-4">
//             <div className="text-[14px] font-semibold text-[#2B2B2B] font-gilroy">
//               {pdfDetails?.stayInfo?.hostelName}
//             </div>

//             <div className="text-[11px] font-medium text-[#4B4B4B] leading-[1.2rem] break-words line-clamp-5 font-gilroy">
//               {pdfDetails?.configurations?.address}
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr
//         className="m-0"
//         style={{
//           border: "none",
//           height: "1px",
//           background: templateColor,
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//           borderRadius: "2px",
//         }}
//       />

//       <div
//         className="bg-white rounded-bottom  position-relative"
//         style={{ width: "100%" }}
//       >
//         <div className="text-center pt-2 pb-1">
//           <h5
//             className="text-[17px] font-gilroy font-semibold"
//             style={textStyle}
//           >
//             {pdfDetails?.invoiceType === "SETTLEMENT"
//               ? "Final Settlement Invoice"
//               : pdfDetails?.configurations?.invoiceType === "Advance"
//                 ? "Security Deposit"
//                 : pdfDetails?.configurations?.invoiceType === "Rent"
//                   ? "Payment Bills"
//                   : "Invoice"}
//           </h5>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-5 mt-1 font-gilroy">
//           <div className="md:col-span-5 mb-3 text-[13px] text-[#222]">
//             <div
//               className="mb-2 text-[11px] font-semibold italic"
//               style={textStyle}
//             >
//               Bill to:
//             </div>

//             <div className="mb-1 flex items-center">
//               <span style={getIconStyle(templateColor)}>
//                 <Profile size="16" variant="Bold" />
//               </span>

//               <span className="ml-1 text-[12px] font-semibold text-[#171717]">
//                 : {pdfDetails?.customerInfo?.fullName}
//               </span>
//             </div>

//             <div className="mb-1 flex items-center">
//               <span style={getIconStyle(templateColor)}>
//                 <Call size="16" variant="Bold" />
//               </span>

//               <span className="ml-1 text-[12px] text-[#171717]">
//                 :{" "}
//                 {pdfDetails?.customerInfo?.customerMobileNo &&
//                 pdfDetails.customerInfo.customerMobileNo !== "undefined"
//                   ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
//                   : ""}
//               </span>
//             </div>

//             <div className="mb-1 flex items-center">
//               <span style={getIconStyle(templateColor)}>
//                 <IoBed className="text-[16px]" />
//               </span>

//               <span className="ml-1 flex items-center text-[12px] text-[#171717]">
//                 {pdfDetails?.stayInfo?.floorName && (
//                   <>: {pdfDetails.stayInfo.floorName}, </>
//                 )}
//                 {pdfDetails?.stayInfo?.roomName && (
//                   <>{pdfDetails.stayInfo.roomName} </>
//                 )}
//                 - {pdfDetails?.stayInfo?.bedName}
//               </span>
//             </div>

//             <div className="flex">
//               <span style={getIconStyle(templateColor)}>
//                 <Location size="16" variant="Bold" />
//               </span>

//               <div className="ml-1 text-[12px] text-[#171717] break-words">
//                 : {pdfDetails?.customerInfo?.fullAddress}
//               </div>
//             </div>
//           </div>

//           <div className="md:col-span-7 mt-2 md:pl-5">
//             <div className="grid grid-cols-2 gap-2 ">
//               <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
//                 Invoice :
//               </div>

//               <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
//                 {pdfDetails?.invoiceNumber}
//               </div>

//               <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
//                 Invoice Date :
//               </div>

//               <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
//                 {pdfDetails?.invoiceDate}
//               </div>

//               <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
//                 Due date :
//               </div>

//               <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
//                 {pdfDetails?.dueDate}
//               </div>

//               <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
//                 Joining date :
//               </div>

//               <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
//                 {pdfDetails?.customerInfo?.joiningDate}
//               </div>

//               {showRentalPeriod && (
//                 <>
//                   <div className="truncate text-right text-[10px] font-normal text-[#4B4B4B]">
//                     Rental Period :
//                   </div>

//                   <div className="truncate text-left text-[12px] font-semibold text-[#171717]">
//                     {pdfDetails?.invoiceInfo?.invoicePeriod}
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="px-5 ">
//         <div className="mb-1">
//           <label
//             className="text-[12px] font-gilroy font-semibold"
//             style={textStyle}
//           >
//             Payment Summary
//           </label>
//         </div>
//         {pdfDetails?.invoiceType === "SETTLEMENT" ? (
//           <>
//             <div className="font-gilroy">
//               <div className="grid grid-cols-12 border border-[#DFDFDF] rounded-lg overflow-hidden">
//                 <div className="col-span-12 md:col-span-6 border-r border-[#DFDFDF] flex flex-col">
//                   <div className="overflow-x-auto flex-1">
//                     <table className="w-full table-fixed">
//                       <thead>
//                         <tr className="bg-white border-b border-[#DFDFDF]">
//                           <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222] capitalize">
//                             {pdfDetails?.invoiceInfo?.totalAmount > 0
//                               ? "Payment"
//                               : "Refund"}
//                           </th>

//                           <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
//                             AMOUNT / INR
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {pdfDetails?.invoiceInfo?.invoiceItems?.map(
//                           (item, index) => (
//                             <tr key={index} className="">
//                               <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
//                                 {item.description}
//                               </td>

//                               <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
//                                 ₹ {Number(item.amount).toLocaleString("en-IN")}
//                               </td>
//                             </tr>
//                           ),
//                         )}

//                         {Array.from({
//                           length: Math.max(
//                             0,
//                             (pdfDetails?.invoiceInfo?.listDeductions?.length ||
//                               0) -
//                               (pdfDetails?.invoiceInfo?.invoiceItems?.length ||
//                                 0),
//                           ),
//                         }).map((_, index) => (
//                           <tr key={`empty-left-${index}`}>
//                             <td className="px-3 py-2">&nbsp;</td>
//                             <td className="px-3 py-2">&nbsp;</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold text-[#2D2D2D]">
//                     <span>Total</span>

//                     <span>
//                       ₹{" "}
//                       {Number(
//                         pdfDetails?.invoiceInfo?.subTotal || 0,
//                       ).toLocaleString("en-IN")}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="col-span-12 md:col-span-6 flex flex-col">
//                   <div className="overflow-x-auto flex-1">
//                     <table className="w-full table-fixed">
//                       <thead>
//                         <tr className="bg-white border-b border-[#DFDFDF]">
//                           <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222]">
//                             Deductions
//                           </th>

//                           <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
//                             AMOUNT / INR
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {pdfDetails?.invoiceInfo?.listDeductions?.length > 0 ? (
//                           pdfDetails?.invoiceInfo?.listDeductions?.map(
//                             (item, index) => (
//                               <tr key={index} className="">
//                                 <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
//                                   {item.type}
//                                 </td>

//                                 <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
//                                   ₹{" "}
//                                   {Number(item.amount).toLocaleString("en-IN")}
//                                 </td>
//                               </tr>
//                             ),
//                           )
//                         ) : (
//                           <tr>
//                             <td
//                               colSpan={2}
//                               className="px-3 py-2 text-center text-[12px] font-medium text-[#2D2D2D]"
//                             >
//                               No Deductions
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold">
//                     <span className="text-[#FF0000]">Total Deductions</span>

//                     <span className="text-[#2D2D2D]">
//                       ₹ {Number(totalDeductions || 0).toLocaleString("en-IN")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="my-3 w-full flex justify-end">
//               <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">
//                 <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Grand Total
//                   </span>
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Payment Made
//                   </span>
//                   <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
//                   </span>
//                 </div>
//                 {pdfDetails?.invoiceInfo?.isDiscounted && (
//                   <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
//                     <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                       Discount Applied
//                     </span>
//                     <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
//                       ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
//                     </span>
//                   </div>
//                 )}

//                 <div className="flex justify-between items-center text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Balance Due
//                   </span>
//                   <span className="text-red-600 font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </>
//         ) : pdfDetails?.configurations?.invoiceType === "Advance" ? (
//           <div className="mt-0 mb-2 p-0 font-gilroy">
//             <div className="font-gilroy">
//               <div className="grid grid-cols-12 border border-[#DFDFDF] rounded-lg overflow-hidden">
//                 <div className="col-span-12 md:col-span-6 border-r border-[#DFDFDF] flex flex-col">
//                   <div className="overflow-x-auto flex-1">
//                     <table className="w-full table-fixed">
//                       <thead>
//                         <tr className="bg-white border-b border-[#DFDFDF]">
//                           <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222] capitalize">
//                             {pdfDetails?.invoiceInfo?.totalAmount > 0
//                               ? "Payment"
//                               : "Refund"}
//                           </th>

//                           <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
//                             AMOUNT / INR
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {pdfDetails?.invoiceInfo?.invoiceItems?.map(
//                           (item, index) => (
//                             <tr key={index} className="">
//                               <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
//                                 {item.description}
//                               </td>

//                               <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
//                                 ₹ {Number(item.amount).toLocaleString("en-IN")}
//                               </td>
//                             </tr>
//                           ),
//                         )}

//                         {Array.from({
//                           length: Math.max(
//                             0,
//                             (pdfDetails?.invoiceInfo?.listDeductions?.length ||
//                               0) -
//                               (pdfDetails?.invoiceInfo?.invoiceItems?.length ||
//                                 0),
//                           ),
//                         }).map((_, index) => (
//                           <tr key={`empty-left-${index}`}>
//                             <td className="px-3 py-2">&nbsp;</td>
//                             <td className="px-3 py-2">&nbsp;</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold text-[#2D2D2D]">
//                     <span>Total</span>

//                     <span>
//                       ₹{" "}
//                       {Number(
//                         pdfDetails?.invoiceInfo?.subTotal || 0,
//                       ).toLocaleString("en-IN")}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="col-span-12 md:col-span-6 flex flex-col">
//                   <div className="overflow-x-auto flex-1">
//                     <table className="w-full table-fixed">
//                       <thead>
//                         <tr className="bg-white border-b border-[#DFDFDF]">
//                           <th className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222]">
//                             Deductions
//                           </th>

//                           <th className="w-[30%] px-3 py-2 text-right text-[12px] font-semibold text-[#222222]">
//                             AMOUNT / INR
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {pdfDetails?.invoiceInfo?.listDeductions?.length > 0 ? (
//                           pdfDetails?.invoiceInfo?.listDeductions?.map(
//                             (item, index) => (
//                               <tr key={index} className="">
//                                 <td className="px-3 py-2 text-[12px] font-medium text-[#2D2D2D]">
//                                   {item.type}
//                                 </td>

//                                 <td className="px-3 py-2 text-right text-[12px] font-semibold text-[#2D2D2D]">
//                                   ₹{" "}
//                                   {Number(item.amount).toLocaleString("en-IN")}
//                                 </td>
//                               </tr>
//                             ),
//                           )
//                         ) : (
//                           <tr>
//                             <td
//                               colSpan={2}
//                               className="px-3 py-2 text-center text-[12px] font-medium text-[#2D2D2D]"
//                             >
//                               No Deductions
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#FAFBFF] px-3 py-2 text-[14px] font-semibold">
//                     <span className="text-[#FF0000]">Total Deductions</span>

//                     <span className="text-[#2D2D2D]">
//                       ₹ {Number(totalDeductions || 0).toLocaleString("en-IN")}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="my-3 flex w-full justify-end">
//               <div className="w-[260px] rounded bg-[#F8F8F8] px-3 py-2 text-[13px] font-semibold">
//                 <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B]">Grand Total</span>

//                   <span className="text-[#4B4B4B]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
//                   </span>
//                 </div>

//                 <div className="mb-2 flex items-center justify-between text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B]">Payment Made</span>

//                   <span className="text-[rgba(0,163,46,1)]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B]">Balance Due</span>

//                   <span className="text-[#FF0000]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <>
//             <div className="font-gilroy">
//               <div className="grid grid-cols-12 border border-[#DFDFDF] rounded-lg overflow-hidden">
//                 <div
//                   className={`${
//                     hasTax > 0
//                       ? "col-span-12 md:col-span-6 border-r border-[#DFDFDF]"
//                       : "col-span-12"
//                   }`}
//                 >
//                   <div className="overflow-x-auto">
//                     <table className="w-full">
//                       <thead>
//                         <tr className="bg-white border-b">
//                           <th className="text-[12px] font-semibold text-[#222222] text-left  px-[14px] py-[10px]">
//                             S.NO
//                           </th>
//                           <th className="text-[12px] font-semibold text-[#222222] text-center  px-[14px] py-[10px]">
//                             DESCRIPTION
//                           </th>
//                           <th className="text-[12px] font-semibold text-[#222222] text-right  px-[14px] py-[10px]">
//                             AMOUNT / INR
//                           </th>
//                         </tr>
//                       </thead>

//                       <tbody>
//                         {pdfDetails?.invoiceInfo?.invoiceItems?.map(
//                           (item, index) => (
//                             <tr key={index}>
//                               <td className="text-[12px] text-[#2D2D2D] font-medium  px-[14px] py-[10px]">
//                                 {index + 1}
//                               </td>

//                               <td className="text-[12px] text-[#2D2D2D] font-medium text-center  px-[14px] py-[10px]">
//                                 {item.description}
//                               </td>

//                               <td className="text-[12px] text-[#2D2D2D] font-semibold text-right  px-[14px] py-[10px]">
//                                 ₹ {Number(item.amount).toLocaleString("en-IN")}
//                               </td>
//                             </tr>
//                           ),
//                         )}

//                         <tr className="bg-[#F9F9F9] font-semibold border-t border-[#DFDFDF]">
//                           <td
//                             colSpan={2}
//                             className={`text-[14px] text-[#2D2D2D] font-medium  px-[14px] py-[10px] ${
//                               hasTax ? "text-left" : "text-center pl-[150px]"
//                             }`}
//                           >
//                             Total
//                           </td>

//                           <td className="text-right text-[14px] font-semibold text-[#2D2D2D]  px-[14px] py-[10px]">
//                             ₹{" "}
//                             {Number(
//                               pdfDetails?.invoiceInfo?.subTotal || 0,
//                             ).toLocaleString("en-IN")}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 {hasTax && (
//                   <div className="col-span-12 md:col-span-6">
//                     <div className="overflow-x-auto">
//                       <table className="w-full mb-0">
//                         <thead>
//                           <tr className="bg-white border-b border-[#DFDFDF]">
//                             <th className="w-[70%] px-[14px] py-2 text-left text-[12px] font-semibold text-[#222222]">
//                               OTHERS
//                             </th>

//                             <th className="w-[30%] px-[14px] py-2 text-right text-[12px] font-semibold text-[#222222]">
//                               AMOUNT / INR
//                             </th>
//                           </tr>
//                         </thead>

//                         <tbody>
//                           <tr>
//                             <td className="text-[12px] text-[#2D2D2D] font-medium  px-[14px] py-[12px]">
//                               GST ({pdfDetails?.invoiceInfo?.taxPercentage}
//                               %)
//                             </td>

//                             <td className="text-[12px] text-[#2D2D2D] font-semibold text-right  px-[14px] py-[10px]">
//                               ₹{" "}
//                               {Number(
//                                 pdfDetails?.invoiceInfo?.taxAmount,
//                               ).toLocaleString("en-IN", {
//                                 minimumFractionDigits: 2,
//                               })}
//                             </td>
//                           </tr>

//                           <tr className="bg-[#F9F9F9] font-semibold border-t border-[#DFDFDF]">
//                             <td className="text-[14px] text-[#2D2D2D] font-medium  px-[14px] py-[10px]">
//                               Total
//                             </td>

//                             <td className="text-right text-[14px] font-semibold text-[#2D2D2D]  px-[14px] py-[10px]">
//                               ₹{" "}
//                               {Number(
//                                 pdfDetails?.invoiceInfo?.taxAmount || 0,
//                               ).toLocaleString("en-IN")}
//                             </td>
//                           </tr>
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="my-3 w-full flex justify-end">
//               <div className="w-[260px] px-3 py-2 rounded bg-[#F8F8F8] text-[13px] font-semibold">
//                 <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Grand Total
//                   </span>
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Payment Made
//                   </span>
//                   <span className="text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center mb-2 text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Discount Applied
//                   </span>
//                   <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
//                   </span>
//                 </div>

//                 <div className="flex justify-between items-center text-[12px] font-semibold">
//                   <span className="text-[#4B4B4B] font-[Gilroy,sans-serif]">
//                     Balance Due
//                   </span>
//                   <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
//                     ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       <div className="px-5 mt-1">
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
//           <div className="md:col-span-6">
//             <h6
//               className="mb-3 text-[11px] font-extrabold font-gilroy"
//               style={textStyle}
//             >
//               ACCOUNT DETAILS
//             </h6>

//             <div className="mb-1">
//               <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
//                 Account No:
//               </label>{" "}
//               <span className="text-[12px] font-medium text-[#171717] font-gilroy">
//                 {pdfDetails?.accountDetails?.accountNo || "N/A"}
//               </span>
//             </div>

//             <div className="mb-1">
//               <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
//                 IFSC Code:
//               </label>{" "}
//               <span className="text-[12px] font-medium text-[#171717] font-gilroy">
//                 {pdfDetails?.accountDetails?.ifscCode || "N/A"}
//               </span>
//             </div>

//             <div className="mb-1">
//               <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
//                 Bank Name:
//               </label>{" "}
//               <span className="text-[12px] font-medium text-[#171717] font-gilroy">
//                 {pdfDetails?.accountDetails?.bankName || "N/A"}
//               </span>
//             </div>

//             <div>
//               <label className="text-[11px] font-medium text-[#4B4B4B] font-gilroy">
//                 UPI Details:
//               </label>{" "}
//               <span className="text-[12px] font-medium text-[#171717] font-gilroy">
//                 {pdfDetails?.accountDetails?.upiId || "N/A"}
//               </span>
//             </div>
//           </div>

//           <div className="md:col-span-2"></div>

//           <div className="md:col-span-4 flex flex-col justify-between">
//             <div className="flex justify-center mb-2">
//               {pdfDetails?.accountDetails?.qrCode && (
//                 <img
//                   src={pdfDetails?.accountDetails?.qrCode}
//                   alt="Barcode"
//                   className="max-w-[150px] h-auto rounded-sm object-contain"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-wrap justify-between items-center mt-4 mb-5 px-5">
//         <div
//           className={`w-full md:w-8/12 ${pdfDetails?.configurations?.termAndCondition ? "bg-[#F5F7FFBD]" : "bg-[#FFFFFF]"}  px-1 py-2 rounded`}
//         >
//           <h4 className="text-[11px] font-[Gilroy] font-semibold text-[#4B4B4B]">
//             Terms and Conditions
//           </h4>

//           <p className="whitespace-pre-line text-[10px] font-[Gilroy] font-semibold text-[#3D3D3D] pr-[50px]">
//             {pdfDetails?.configurations?.termAndCondition}
//           </p>
//         </div>

//         <div className="w-full md:w-4/12 flex flex-col justify-end items-end mt-4 md:mt-0">
//           {pdfDetails?.configurations?.signatureUrl && (
//             <img
//               src={pdfDetails?.configurations?.signatureUrl}
//               alt="Digital Signature"
//               className="h-[60px] w-[130px] pl-5"
//             />
//           )}

//           <p className="text-[10px] font-[Gilroy] font-semibold text-[#2C2C2C]">
//             Authorized Signature
//           </p>
//         </div>
//       </div>

//       <hr
//         className="mb-2"
//         style={{
//           border: "none",
//           height: "1px",
//           background: templateColor,
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//           borderRadius: "2px",
//         }}
//       />
//       <div className="px-5">
//         <div className="flex items-center justify-between text-center rounded-t-[38px]">
//           <p className="mb-0 text-[13px] font-gilroy font-medium text-[#4B4B4B]">
//             Email:{" "}
//             <span className="text-[13px] font-gilroy font-semibold text-[#222222]">
//               {pdfDetails?.emailId}
//             </span>
//           </p>

//           <p className="mb-0 text-[13px] font-gilroy font-medium text-[#4B4B4B]">
//             Contact:{" "}
//             <span className="text-[13px] font-gilroy font-semibold text-[#222222]">
//               {pdfDetails?.mobile &&
//                 `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FinalSettlementInvoicePDF;
