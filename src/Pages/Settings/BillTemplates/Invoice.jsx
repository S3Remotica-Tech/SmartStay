/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// import { useSelector } from "react-redux";
// import {  Edit2 } from "iconsax-react";
import InvoicePreview from "./InvoicePreview";
import receiptLogo from "../../../Assets/Images/New_images/Group_Logo.png";

function Invoice() {
  // const state = useSelector((state) => state);

  //   const templates =
  //     state.Settings?.settingsBillsTemplateList?.templates || [];

  //   const rentalTemplate = templates.find(
  //     (template) => template.type === "RENTAL"
  //   );




  const invoiceTemplates = {
    RENTAL: {
      id: "rent",
      name: "Rent Invoice",
      editable: false,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",

      companyName: "smart stay",
      email: "info@smartstay.com",
      phone: "+91 98765 45654",
      address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
      gst: "GST IN : 00XXXXXX0000",
      logo: receiptLogo,

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
        { id: 1, name: "Room Rent", amount: "₹ 8,000.00" },
        { id: 2, name: "Electricity Bill", amount: "₹ 900.00" },
        { id: 3, name: "Food", amount: "₹ 2,200.00" },
      ],

      subtotal: "₹ 11,100.00",
      gstAmount: "₹ 333.00",
      total: "₹ 11,433.00",

      accountDetails: [
        { id: 1, label: "Account No", value: "6754292084" },
        { id: 2, label: "IFSC Code", value: "SBI0001234" },
        { id: 3, label: "Bank Name", value: "State Bank of India" },
        { id: 4, label: "UPI ID", value: "smartstay@upi" },
      ],

      paymentStatus: "Pending",
      notes: "Thanks for your stay with us.",
      terms: "Pay on the date of subscription to avoid the access issues.",
      emailFooter: "email : contact@smartstay.in",
      contactFooter: "Contact : +91 98765 50011",
    },

    BOOKING: {
      id: "booking",
      name: "Booking Invoice",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",

      companyName: "smart stay",
      email: "info@smartstay.com",
      phone: "+91 98765 45654",
      address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
      gst: "GST IN : 00XXXXXX0000",
      logo: receiptLogo,
      invoiceTitle: "Booking Invoice",
      invoiceNo: "BK 001",
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
        { id: 1, name: "Booking Amount", amount: "₹ 2,000.00" },
        { id: 2, name: "Registration Fee", amount: "₹ 500.00" },
      ],

      subtotal: "₹ 2,500.00",
      gstAmount: "₹ 125.00",
      total: "₹ 2,625.00",

      accountDetails: [
        { id: 1, label: "Account No", value: "6754292084" },
        { id: 2, label: "IFSC Code", value: "SBI0001234" },
        { id: 3, label: "Bank Name", value: "State Bank of India" },
        { id: 4, label: "UPI ID", value: "smartstay@upi" },
      ],

      paymentStatus: "Paid",
      notes: "Thanks for your booking.",
      terms: "Booking amount is subject to the applicable terms.",
      emailFooter: "email : contact@smartstay.in",
      contactFooter: "Contact : +91 98765 50011",
    },

    ADVANCE: {
      id: "advance",
      name: "Advance Invoice",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
      logo: receiptLogo,
      companyName: "smart stay",
      email: "info@smartstay.com",
      phone: "+91 98765 45654",
      address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
      gst: "GST IN : 00XXXXXX0000",

      invoiceTitle: "Advance Invoice",
      invoiceNo: "ADV 001",
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
        { id: 1, name: "Security Deposit", amount: "₹ 5,000.00" },
        { id: 2, name: "Advance Rent", amount: "₹ 3,000.00" },
      ],

      subtotal: "₹ 8,000.00",
      gstAmount: "₹ 0.00",
      total: "₹ 8,000.00",

      accountDetails: [
        { id: 1, label: "Account No", value: "6754292084" },
        { id: 2, label: "IFSC Code", value: "SBI0001234" },
        { id: 3, label: "Bank Name", value: "State Bank of India" },
        { id: 4, label: "UPI ID", value: "smartstay@upi" },
      ],

      paymentStatus: "Paid",
      notes: "Thanks for your advance payment.",
      terms: "Advance payment is subject to applicable terms.",
      emailFooter: "email : contact@smartstay.in",
      contactFooter: "Contact : +91 98765 50011",
    },

    OTHER: {
      id: "other",
      name: "Other Invoice",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",

      companyName: "smart stay",
      email: "info@smartstay.com",
      phone: "+91 98765 45654",
      address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
      gst: "GST IN : 00XXXXXX0000",
      logo: receiptLogo,
      invoiceTitle: "Other Invoice",
      invoiceNo: "OTH 001",
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
        { id: 1, name: "Maintenance Charges", amount: "₹ 500.00" },
        { id: 2, name: "Late Payment Fee", amount: "₹ 200.00" },
      ],

      subtotal: "₹ 700.00",
      gstAmount: "₹ 35.00",
      total: "₹ 735.00",

      accountDetails: [
        { id: 1, label: "Account No", value: "6754292084" },
        { id: 2, label: "IFSC Code", value: "SBI0001234" },
        { id: 3, label: "Bank Name", value: "State Bank of India" },
        { id: 4, label: "UPI ID", value: "smartstay@upi" },
      ],

      paymentStatus: "Pending",
      notes: "Thanks for your payment.",
      terms: "Payment is subject to applicable terms.",
      emailFooter: "email : contact@smartstay.in",
      contactFooter: "Contact : +91 98765 50011",
    },

    REFUND: {
      id: "refund",
      name: "Refund Invoice",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",

      companyName: "smart stay",
      email: "info@smartstay.com",
      phone: "+91 98765 45654",
      address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
      gst: "GST IN : 00XXXXXX0000",
      logo: receiptLogo,
      invoiceTitle: "Refund Invoice",
      invoiceNo: "REF 001",
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
        { id: 1, name: "Security Deposit Refund", amount: "₹ 5,000.00" },
      ],

      subtotal: "₹ 5,000.00",
      gstAmount: "₹ 0.00",
      total: "₹ 5,000.00",

      accountDetails: [
        { id: 1, label: "Account No", value: "6754292084" },
        { id: 2, label: "IFSC Code", value: "SBI0001234" },
        { id: 3, label: "Bank Name", value: "State Bank of India" },
        { id: 4, label: "UPI ID", value: "smartstay@upi" },
      ],

      paymentStatus: "Refunded",
      notes: "Refund processed successfully.",
      terms: "Refund is subject to applicable terms.",
      emailFooter: "email : contact@smartstay.in",
      contactFooter: "Contact : +91 98765 50011",
    },

    ADDITIONAL: {
      id: "additional",
      name: "Additional Invoice",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",

      companyName: "smart stay",
      email: "info@smartstay.com",
      phone: "+91 98765 45654",
      address: "Plot No. 18, 4th Avenue, Chennai - 600 028",
      gst: "GST IN : 00XXXXXX0000",
      logo: receiptLogo,
      invoiceTitle: "Additional Invoice",
      invoiceNo: "ADD 001",
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
        { id: 1, name: "Additional Bed Charges", amount: "₹ 1,000.00" },
        { id: 2, name: "Extra Services", amount: "₹ 500.00" },
      ],

      subtotal: "₹ 1,500.00",
      gstAmount: "₹ 75.00",
      total: "₹ 1,575.00",

      accountDetails: [
        { id: 1, label: "Account No", value: "6754292084" },
        { id: 2, label: "IFSC Code", value: "SBI0001234" },
        { id: 3, label: "Bank Name", value: "State Bank of India" },
        { id: 4, label: "UPI ID", value: "smartstay@upi" },
      ],

      paymentStatus: "Pending",
      notes: "Thanks for your payment.",
      terms: "Payment is subject to applicable terms.",
      emailFooter: "email : contact@smartstay.in",
      contactFooter: "Contact : +91 98765 50011",
    },
  };



  return (
    <div className="w-full bg-white p-2 sm:p-3 lg:p-3 font-gilroy">
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <label className="text-black font-semibold text-[12px]">
            INVOICES
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {Object.entries(invoiceTemplates).map(([type, template]) => (
          <div
            key={template.id}
            className="bg-white border-1 border-[#E5E7EB] rounded-xl "
          >

            <div className="w-full   flex justify-center rounded-xl">
              <InvoicePreview invoiceData={template} />

            </div>

            <div className="px-4 py-3 bg-white border-t border-[#E5E7EB] rounded-b-xl">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-medium text-[#111827]">
                  {template.name}
                </h3>


              </div>

              <p className="text-[13px] text-[#8A8A8A] mt-1">
                Last updated {template.updatedDate} · by{" "}
                {template.updatedBy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Invoice;