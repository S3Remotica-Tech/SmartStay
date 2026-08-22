/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ReceiptPdfCard from "../PDF/ReceiptPdfModal";
import "../OthersComponent/BillPdfModal.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SearchNormal1 } from "iconsax-react";

function ReceiptPdfDetails() {
  const location = useLocation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { receiptId } = useParams();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [rowDatas, setRowDatas] = useState("");
  const invoiceRefs = useRef({});
  const [search, setSearch] = useState("");

  const { rowData } = location.state || {};

  useEffect(() => {
    if (rowData.transactionId) {
      setSelectedInvoiceId(rowData.transactionId);
    }
  }, [rowData]);

  useEffect(() => {
    if (!receiptId || !state.login.selectedHostel_Id) return;

    dispatch({
      type: "RECEIPTPDF_NEWCHANGES",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        transactionId: receiptId,
      },
    });
  }, [receiptId, state.login.selectedHostel_Id]);

  

  const handleDisplayInvoiceDownload = (item) => {
   
    setRowDatas(item);
    setSelectedInvoiceId(item.transactionId);
    navigate(`/receipts/details/${item.transactionId}`, {
      state: {
        rowData: item,
      },
    });
    if (item?.transactionId && state.login.selectedHostel_Id) {
      dispatch({
        type: "RECEIPTPDF_NEWCHANGES",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          transactionId: item.transactionId,
        },
      });
    }
  };

  

  useEffect(() => {
    if (rowData?.transactionId) {
      setSelectedInvoiceId(rowData.transactionId);

      setTimeout(() => {
        invoiceRefs.current[rowData.transactionId]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [rowData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen overflow-hidden">
      <div className="md:col-span-4 h-screen  border-r border-gray-200 overflow-y-auto ">
        <div className="sticky top-0 bg-white z-20  overflow-hidden">
          <div className="flex justify-between items-center flex-wrap ">
            <div className="min-h-[50px] px-1 py-2">
              <label className="text-[18px] text-black font-semibold font-gilroy">
                Receipts
              </label>
            </div>
            {/* <div className="flex justify-between items-center gap-2 me-2">
                            <div onClick={handleShowStatusFilter} className="cursor-pointer bg-[#F7F8FC] border border-[#9C9C9C26] rounded-md px-1 py-1">
                                <TextalignLeft size="20" color="#4B4B4B" />
                            </div>


                        </div> */}
          </div>

          <div className="h-[1px] bg-gray-200 p-0"></div>

          <div className="relative w-full max-w-md p-2 mt-2 ">
            <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
              <SearchNormal1 size="18" color="#888" />
            </div>

            <input
              disabled
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full pl-4 py-2 font-gilroy border border-[#D9D9D9] rounded-xl text-sm  outline-none"
            />
          </div>
        </div>

        <div className="p-2 mt-2 h-[90vh] overflow-y-auto show-scrolls">
          {state.InvoiceList.ReceiptList?.map((item) => (
            <div
              onClick={() => {
                setSelectedInvoiceId(item.transactionId);
                handleDisplayInvoiceDownload(item);
              }}
              key={item.transactionId}
              ref={(el) => (invoiceRefs.current[item.transactionId] = el)}
              className={`mb-3 shadow-sm rounded p-3 cursor-pointer 
        ${
          String(selectedInvoiceId) === String(item.transactionId)
            ? "bg-[#F7F8FC]"
            : "bg-white"
        }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  {item.profilePic && item.profilePic !== "0" ? (
                    <img
                      src={item.profilePic}
                      alt="User"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center font-semibold text-sm uppercase font-gilroy">
                      {item.initials}
                    </div>
                  )}
                </div>

                <div className="flex-1 ml-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex flex-wrap text-sm font-semibold text-[#1E45E1] font-[Gilroy]">
                      {item.fullName || "Unnamed"}
                    </div>
                    <div className="text-[16px] font-semibold text-[#222] font-[Gilroy]">
                      ₹ {item.paidAmount || "0"}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#222] font-[Gilroy] whitespace-nowrap">
                      <div className="text-[#4B4B4B] text-xs font-medium ">
                        {item.invoiceNumber}
                      </div>
                      <span className="inline-block h-4 w-[1px] bg-gray-400"></span>
                      <div className="text-[#4B4B4B] text-xs font-medium ">
                        {item.invoiceType}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-[#555] font-[Gilroy]">
                      {item?.paidAt}
                    </div>
                  </div>
                </div>
              </div>
              <span className="flex my-1 items-center gap-2 bg-[#ECFDF5] text-black rounded-full px-2 py-[2px] text-[10px] font-gilroy w-fit uppercase">
                <span className="h-2 w-2 rounded-full bg-[#10B981] "></span>
                {item?.paymentStatus}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 md:col-span-8">
        <ReceiptPdfCard rowData={rowData || rowDatas} />
      </div>
    </div>
  );
}

export default ReceiptPdfDetails;
