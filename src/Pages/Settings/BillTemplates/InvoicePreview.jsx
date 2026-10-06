import { TickCircle } from "iconsax-react";
import React from "react";

function InvoicePreview() {
  const invoiceData = {
    companyName: "smart stay",
    email: "info@smartstay.com",
    phone: "+91 98765 45654",
    address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
    gst: "GST IN : 00XXXXXX0000",

    invoiceTitle: "Rental Invoice",
    invoiceNo: "INV 001",
    invoiceDate: "31 May 2025",
    dueDate: "31 May 2025",
    joiningDate: "01 Mar 2025",

    tenant: {
      name: "John Doe",
      room: "Room No. 401",
      address: "Chennai, Tamil Nadu",
      phone: "+91 98765 43210",
      email: "john.doe@gmail.com",
      bed: "Ground Floor, Room 103 - Bed 02",
    },

    items: [
      {
        id: 1,
        name: "Rent",
        amount: "₹ 8,000.00",
      },
      {
        id: 2,
        name: "Electricity Bill",
        amount: "₹ 900.00",
      },
      {
        id: 3,
        name: "Food",
        amount: "₹ 2,200.00",
      },
    ],

    subtotal: "₹ 9,000.00",
    gstAmount: "₹ 270.00",
    total: "₹ 9,270.00",

    accountDetails: [
      {
        id: 1,
        label: "Account No",
        value: "6754292084",
      },
      {
        id: 2,
        label: "IFSC Code",
        value: "SBI0001234",
      },
      {
        id: 3,
        label: "Bank Name",
        value: "State Bank of India",
      },
      {
        id: 4,
        label: "UPI ID",
        value: "smartstay@upi",
      },
    ],

    paymentStatus: "Pending",

    notes: "Thanks for your stay with us.",

    terms:
      "Pay on the date of subscription to avoid the access issues.",

    emailFooter: "email : contact@smartstay.in",
    contactFooter: "Contact : +91 98765 50011",
  };

  return (
   <div className="w-[794px] h-[1123px] bg-white p-[26px] font-gilroy text-[#222]">
  <div className="w-full h-full border border-[#D9D9D9] rounded-[10px] p-[28px] flex flex-col">
    
    <div className="flex items-start justify-between">
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="w-[38px] h-[38px] rounded-[8px] border border-[#1E45E1] flex items-center justify-center">
            <div className="text-center leading-[8px]">
              <label className="text-[7px] font-bold text-[#1E45E1]">
                smart stay
              </label>
            </div>
          </div>
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

    <div className="border-t border-[#D9D9D9] mt-[12px]" />

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

export default InvoicePreview;