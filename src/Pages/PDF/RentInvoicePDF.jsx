/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
import { TiTick } from "react-icons/ti";

function RentInvoicePDF() {
  const state = useSelector((state) => state);
  const pdfDetails = state.InvoiceList?.particularBillsDetails;

  const showRentalPeriod =
    pdfDetails?.configurations?.invoiceType === "Rent" &&
    pdfDetails?.invoiceType !== "SETTLEMENT";

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

  return (
    <div
      className="relative bg-white font-gilroy rounded"
      style={{
        width: "794px",
        height: "1123px",
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
                height: pdfDetails?.configurations?.hostelLogo ? 50 : 25,
              }}
            />
            <div>
              <div className="py-1">
                <div className="text-[#222222] text-[14px] font-medium ">
                  {pdfDetails?.emailId && pdfDetails.emailId !== "null"
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
            <div className="text-[#222222] text-[10px] font-medium  ">
              <span>GST IN : </span>{" "}
              <span>{pdfDetails?.headerInfo?.gstNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center py-2">
        <h5
          className="text-[18px] font-gilroy font-semibold text-[#171717]"
          // style={textStyle}
        >
          Rental Invoice
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
                pdfDetails.customerInfo.customerMobileNo !== "undefined"
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
                <div className="text-[#4B4B4B] text-[12px]  ">Stay Details</div>

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

              <div className="truncate text-right text-[11px] font-normal text-[#4B4B4B]">
                Joining date :
              </div>

              <div className="truncate text-left text-[14px] font-semibold text-[#171717]">
                {pdfDetails?.customerInfo?.joiningDate}
              </div>

              {showRentalPeriod && (
                <>
                  <div className="truncate text-right text-[11px] font-normal text-[#4B4B4B]">
                    Rental Period :
                  </div>

                  <div className="truncate text-left text-[14px] font-semibold text-[#171717]">
                    {pdfDetails?.invoiceInfo?.invoicePeriod}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 my-4 ">
          <div className="font-gilroy">
            <div className="grid grid-cols-12 border-b border-[#DFDFDF]  overflow-hidden">
              <div
                className={`${pdfDetails?.invoiceInfo?.listDeductions?.length > 0 ? "col-span-12 md:col-span-6  border-r border-[#DFDFDF]" : "col-span-12 md:col-span-12"} flex flex-col`}
              >
                <div className="overflow-x-auto flex-1">
                  <table className="w-full ">
                    <thead className="">
                      <tr className=" border-b border-[#E4E4E4] bg-[#F9F9F9]">
                        <th
                          className="w-[70%] px-3 py-2 text-left text-[12px] font-semibold text-[#222222] 
                        capitalize"
                        >
                          {pdfDetails?.invoiceInfo?.totalAmount > 0
                            ? "DESCRIPTION"
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
                            <td className="px-3 py-2 text-[14px] font-medium text-[#2D2D2D]">
                              {item.description}
                            </td>

                            <td className="px-3 py-2 text-right text-[14px] font-semibold text-[#2D2D2D]">
                              ₹ {Number(item.amount).toLocaleString("en-IN")}
                            </td>
                          </tr>
                        ),
                      )}

                      {Array.from({
                        length: Math.max(
                          0,
                          (pdfDetails?.invoiceInfo?.listDeductions?.length ||
                            0) -
                            (pdfDetails?.invoiceInfo?.invoiceItems?.length ||
                              0),
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

                {/* <div className="flex items-center justify-between  px-3 py-2 text-[14px] font-semibold text-[#2D2D2D]">
                  <span>Total</span>

                  <span>
                    ₹{" "}
                    {Number(
                      pdfDetails?.invoiceInfo?.total1 || 0,
                    ).toLocaleString("en-IN")}
                  </span>
                </div> */}
              </div>
              {pdfDetails?.invoiceInfo?.listDeductions?.length > 0 && (
                <div className="col-span-12 md:col-span-6 flex flex-col">
                  <div className="overflow-x-auto flex-1">
                    <table className="w-full table-fixed">
                      <thead>
                        <tr className="border-b border-[#E4E4E4] bg-[#F9F9F9]">
                          <th className="w-[70%] px-3 py-2 text-left text-[14px] font-semibold text-[#222222]">
                            Deductions
                          </th>

                          <th className="w-[30%] px-3 py-2 text-right text-[14px] font-semibold text-[#222222]">
                            AMOUNT / INR
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {pdfDetails?.invoiceInfo?.listDeductions?.length > 0 ? (
                          pdfDetails?.invoiceInfo?.listDeductions?.map(
                            (item, index) => (
                              <tr key={index} className="">
                                <td className="px-3 py-2 text-[14px] font-medium text-[#2D2D2D]">
                                  {item.type}
                                </td>

                                <td className="px-3 py-2 text-right text-[14px] font-semibold text-[#2D2D2D]">
                                  ₹{" "}
                                  {Number(item.amount).toLocaleString("en-IN")}
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

                  <div
                    className="flex items-center justify-between border-t border-[#DFDFDF] bg-[#F9F9F9] px-3 py-2 
                  text-[14px] font-semibold"
                  >
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

          <div className="my-2 w-full flex justify-end">
            <div className="w-[260px] px-3 py-2 text-[13px] font-semibold">
              <div className="flex justify-between items-center mb-2 text-[13px]  text-[#1A1C21] font-semibold">
                <span className=" font-[Gilroy,sans-serif]">Grand Total</span>
                <span className=" font-[Gilroy,sans-serif]">
                  ₹ {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-2 text-[13px] font-semibold">
                <span className=" font-[Gilroy,sans-serif]">Payment Made</span>
                <span className=" text-[rgba(0,163,46,1)] font-[Gilroy,sans-serif]">
                  ₹ {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}
                </span>
              </div>

              <div className="flex justify-between items-center mb-2 text-[13px] text-[#1A1C21] font-semibold">
                <span className=" font-[Gilroy,sans-serif]">
                  Discount Applied
                </span>
                <span className=" text-[#FF0000] font-[Gilroy,sans-serif]">
                  ₹ {Number(pdfDetails?.invoiceInfo?.discountAmount || 0)}
                </span>
              </div>

              <div className="flex justify-between items-center text-[13px] font-semibold">
                <span className="text-[#1A1C21] font-[Gilroy,sans-serif]">
                  Balance Due
                </span>
                <span className="text-[#FF0000] font-[Gilroy,sans-serif]">
                  ₹ {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}
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
                  pdfDetails?.invoiceInfo?.paymentStatus === "Pending"
                    ? "text-[#F59E0B]"
                    : pdfDetails?.invoiceInfo?.paymentStatus === "Paid"
                      ? "text-[#038C3D]"
                      : pdfDetails?.invoiceInfo?.paymentStatus === "Overdue"
                        ? "text-[#DC2626]"
                        : "text-[#6B7280]"
                }`}
              />
              <span
                className={`text-sm ${
                  pdfDetails?.invoiceInfo?.paymentStatus === "Pending"
                    ? "text-[#F59E0B]"
                    : pdfDetails?.invoiceInfo?.paymentStatus === "Paid"
                      ? "text-[#038C3D]"
                      : pdfDetails?.invoiceInfo?.paymentStatus === "Overdue"
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

      <div className={`w-full my-2 md:w-8/12 px-3 py-2`}>
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
                {pdfDetails?.emailId && pdfDetails.emailId !== "null"
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
  );
}

export default RentInvoicePDF;
