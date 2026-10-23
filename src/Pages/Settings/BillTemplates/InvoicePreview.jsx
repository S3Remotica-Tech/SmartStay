// import { TickCircle } from "iconsax-react";
import React from "react";
import PropTypes from "prop-types";

function InvoicePreview({ invoiceData }) {


  return (
    <div className="w-[794px]  bg-[#F4F4F4] p-[26px] font-gilroy text-[#222] rounded-t-xl">
      <div className="w-full h-full border-1 border-[#D9D9D9] bg-white  rounded-[10px] p-[20px] flex flex-col">

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img src={invoiceData.logo} alt="Logo" className=" object-cover " />
            </div>

            <div className="text-[8px] text-[#6B7280] leading-[11px]">
              <label>{invoiceData.email}</label>
              <label className="block">{invoiceData.phone}</label>
            </div>
          </div>

          <div className="text-right text-[8px] text-[#555] leading-[12px]">
            <label className="font-semibold block">
              {invoiceData.companyName}
            </label>
            <label className="block">{invoiceData.address}</label>
            <label className="block">Chennai - 600 028</label>
            <label className="block">{invoiceData.gst}</label>
          </div>
        </div>

        <div className="flex justify-center mt-[20px]">
          <label className="text-[13px] font-semibold">
            {invoiceData.invoiceTitle}
          </label>
        </div>

        <div className="border-1 border-[#D9D9D9] mt-[12px] p-2 rounded-md" >

          <div className="flex justify-between mt-[16px]">
            <div className="w-[55%]">
              <label className="text-[8px] text-[#6B7280] mb-[5px] block">
                Billed to
              </label>

              <label className="text-[9px] font-semibold block">
                {invoiceData.tenant.name}
              </label>

              <label className="text-[8px] text-[#555] mt-[2px] block">
                {invoiceData.tenant.room}
              </label>

              <label className="text-[8px] text-[#555] block">
                {invoiceData.tenant.address}
              </label>

              <label className="text-[8px] text-[#555] block">
                {invoiceData.tenant.phone}
              </label>

              <label className="text-[8px] text-[#555] block">
                {invoiceData.tenant.email}
              </label>
            </div>

            <div className="w-[40%] text-[8px]">
              <div className="flex justify-between mb-[5px]">
                <label className="text-[#777]">
                  Invoice No
                </label>

                <label className="font-semibold">
                  {invoiceData.invoiceNo}
                </label>
              </div>

              <div className="flex justify-between mb-[5px]">
                <label className="text-[#777]">
                  Date
                </label>

                <label className="font-semibold">
                  {invoiceData.invoiceDate}
                </label>
              </div>

              <div className="flex justify-between mb-[5px]">
                <label className="text-[#777]">
                  Due Date
                </label>

                <label className="font-semibold">
                  {invoiceData.dueDate}
                </label>
              </div>

              <div className="flex justify-between">
                <label className="text-[#777]">
                  Joining Date
                </label>

                <label className="font-semibold">
                  {invoiceData.joiningDate}
                </label>
              </div>
            </div>
          </div>

          <div className="mt-[10px]">
            <label className="text-[8px] text-[#555] block">
              {invoiceData.tenant.bed}
            </label>
          </div>

          <div className="mt-[18px]">
            <div className="flex justify-between bg-[#F7F7F7] border-y border-[#E5E7EB] px-[8px] py-[7px]">
              <label className="text-[8px] font-semibold">
                DESCRIPTION
              </label>

              <label className="text-[8px] font-semibold">
                AMOUNT
              </label>
            </div>

            {invoiceData?.items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between px-[8px] py-[9px] border-b border-[#F1F1F1]"
              >
                <label className="text-[8px]">
                  {item.name}
                </label>

                <label className="text-[8px]">
                  {item.amount}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-[14px]">
            <div className="w-[43%] text-[8px]">
              <div className="flex justify-between mb-[6px]">
                <label>Subtotal</label>
                <label>{invoiceData.subtotal}</label>
              </div>

              <div className="flex justify-between mb-[8px]">
                <label>Tax - GST (3%)</label>
                <label>{invoiceData.gstAmount}</label>
              </div>

              <div className="border-t border-[#D9D9D9] pt-[8px] flex justify-between">
                <label className="font-semibold">
                  Total
                </label>

                <label className="font-semibold">
                  {invoiceData.total}
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-[25px]">
            <div>
              <label className="text-[8px] text-[#1E45E1] font-semibold mb-[7px] block">
                ACCOUNT DETAILS
              </label>

              {invoiceData.accountDetails.map((account) => (
                <div
                  key={account.id}
                  className="flex text-[8px] leading-[14px]"
                >
                  <label className="w-[70px] text-[#777]">
                    {account.label}
                  </label>

                  <label className="font-medium">
                    {account.value}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center">


              <label className="text-[6px] text-[#777] mt-[4px]">
                Scan QR for Payment
              </label>
            </div>
          </div>

          <div className="flex justify-between mt-[25px]">
            <div>

              <div className="border-t border-[#999] w-[100px] mt-[2px]" />

              <label className="text-[7px] text-[#777] mt-[4px] block">
                Authorized Signature
              </label>
            </div>

            <div className="text-right text-[8px]">
              <div className="flex gap-[8px] justify-end">
                <label className="text-[#777]">
                  Status:
                </label>

                <label className="text-[#F59E0B] font-semibold">
                  {invoiceData.paymentStatus}
                </label>
              </div>

              <label className="mt-[8px] block">
                {invoiceData.notes}
              </label>

              <label className="text-[#777] mt-[4px] block">
                02/06/2025 12:30 PM
              </label>
            </div>
          </div>
        </div>
        <div className="mt-[24px]">
          <label className="text-[7px] text-[#777]">
            T&C : {invoiceData.terms}
          </label>
        </div>

        <div className="mt-auto pt-[10px] border-t border-[#E5E7EB] flex justify-between text-[7px] text-[#999]">
          <label>
            {invoiceData.emailFooter}
          </label>

          <label>
            {invoiceData.contactFooter}
          </label>
        </div>

      </div>
    </div>
  );
}
InvoicePreview.propTypes = {
  invoiceData: PropTypes.shape({
    logo: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    companyName: PropTypes.string,
    address: PropTypes.string,
    gst: PropTypes.string,
    invoiceTitle: PropTypes.string,

    tenant: PropTypes.shape({
      name: PropTypes.string,
      room: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      bed: PropTypes.string,
    }),

    invoiceNo: PropTypes.string,
    invoiceDate: PropTypes.string,
    dueDate: PropTypes.string,
    joiningDate: PropTypes.string,

    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        quantity: PropTypes.number,
        rate: PropTypes.number,
        amount: PropTypes.number,
      })
    ),

    subtotal: PropTypes.number,
    gstAmount: PropTypes.number,
    total: PropTypes.number,

    accountDetails: PropTypes.arrayOf(
      PropTypes.object
    ),

    paymentStatus: PropTypes.string,
    notes: PropTypes.string,
    terms: PropTypes.string,
    emailFooter: PropTypes.string,
    contactFooter: PropTypes.string,
  }).isRequired,
};
export default InvoicePreview;