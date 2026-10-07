/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Invoice from "./Invoice";
import Receipt from "./Receipt";
// import { ArrowLeft } from "iconsax-react";
// import { useNavigate } from "react-router-dom";
function BillTemplates() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const state = useSelector((state) => state);

  const [selectedType, setSelectedType] = useState("invoice");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "GET_TEMPLATE_LIST",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

//   console.log("selectedType", selectedType);

  return (
    <div className="w-full h-screen bg-white p-2 sm:p-3 lg:p-3 font-gilroy flex flex-col overflow-hidden">
      <div className="shrink-0 bg-white">
        <div className="my-2 flex flex-col md:flex-row justify-between items-center px-1.5 whitespace-nowrap">
          <div className="w-full flex justify-center md:justify-start items-center gap-1">
            {/* <ArrowLeft className="w-5 h-5 mr-2 cursor-pointer " onClick={() => navigate(-1)} color="#" size="18" /> */}
            <label className="text-black font-semibold text-[18px] font-gilroy">
           
              Bill Templates
            </label>
          </div>

          <div className="flex items-center bg-[#F8F8F8] border border-[#F8F8F8] rounded-lg p-1">
            <button
              type="button"
              onClick={() => setSelectedType("invoice")}
              className={`h-[38px] px-4 rounded-lg flex items-center gap-2 text-[14px] font-semibold transition-all ${
                selectedType === "invoice"
                  ? "bg-[#1E45E1] text-white"
                  : " bg-[#F8F8F8] text-[#64748B]"
              }`}
            >
              Invoice
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("receipt")}
              className={`h-[38px] px-4 rounded-lg flex items-center gap-2 text-[14px] font-semibold transition-all ${
                selectedType === "receipt"
                  ? "bg-[#1E45E1] text-white"
                  : " bg-[#F8F8F8] text-[#64748B]"
              }`}
            >
              Receipt
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto bg-[#FDFDFF] py-8">
        {selectedType === "invoice" ? <Invoice /> : <Receipt />}
      </div>
    </div>
  );
}

export default BillTemplates;