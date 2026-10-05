/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import {  Edit2 } from "iconsax-react";
import InvoicePreview from "./InvoicePreview";

function Invoice() {
  const state = useSelector((state) => state);

//   const templates =
//     state.Settings?.settingsBillsTemplateList?.templates || [];

//   const rentalTemplate = templates.find(
//     (template) => template.type === "RENTAL"
//   );

 


  const invoiceTemplates = [
    {
      id: "rent",
      name: "Rent Invoice",
      type: "RENTAL",
      editable: false,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
    },
    {
      id: "booking",
      name: "Booking Invoice",
      type: "BOOKING",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
    },
    {
      id: "advance",
      name: "Advance Invoice",
      type: "ADVANCE",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
    },
    {
      id: "other",
      name: "Other Invoice",
      type: "OTHER",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
    },
    {
      id: "refund",
      name: "Refund Invoice",
      type: "REFUND",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
    },
    {
      id: "additional",
      name: "Additional Invoice",
      type: "ADDITIONAL",
      editable: true,
      updatedDate: "27 Jul 2025",
      updatedBy: "Admin",
    },
  ];

  
  

 

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
        {invoiceTemplates.map((template) => (
          <div
            key={template.id}
            className="bg-white border border-[#E5E7EB] rounded-xl "
          >
           <div className="w-full  bg-[#F8F8F8] flex justify-center">
  <div className="w-full  flex justify-center">
    <InvoicePreview templateType={template.type} />
  </div>
</div>

            <div className="px-4 py-3 bg-white">
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