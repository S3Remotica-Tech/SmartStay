/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "../OthersComponent/BillPdfModal.css";
import { useLocation } from "react-router-dom";
import BookingPdfModal from "./BookingPdfModal";
import { Add, SearchNormal1, TextalignLeft } from "iconsax-react";

function BookingsPdfDetails() {
  const location = useLocation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [rowDatas, setRowDatas] = useState("");
  const invoiceRefs = useRef({});
  const [search, setSearch] = useState("");

  const { rowData } = location.state || {};

  useEffect(() => {
    setSelectedInvoiceId(rowData);
  }, [rowData]);

  // console.log("rowData", rowData)

  const handleDisplayInvoiceDownload = (item) => {
    // console.log("calleddddddd", item);
    setRowDatas(item);
    setSelectedInvoiceId(item);
    if (item && state.login.selectedHostel_Id) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: item,
        },
      });
    }
  };

  // console.log("state", state.InvoiceList)

  useEffect(() => {
    if (rowData) {
      setSelectedInvoiceId(rowData);

      setTimeout(() => {
        invoiceRefs.current[rowData]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [rowData]);

  const headerKeyMap = {
    "Inv No": "invNo",
    "Booking Date": "bookingDate",
    "Tenant Name": "tenantName",
    "Mobile No": "mobile",
    Floor: "floorName",
    Room: "roomName",
    Bed: "bedName",
    Amount: "amount",
    Status: "status",
  };

  const formattedData = (
    state?.Booking?.tenantBookingList?.bookingsList || []
  ).map((row) => {
    const obj = {};

    (state?.Booking?.tenantBookingList?.tableHeaders || []).forEach(
      (header, index) => {
        const key = headerKeyMap[header];
        const value = row[index];

        if (key) {
          obj[key] = value ?? "-";
        }
      },
    );

    const apiData = row[row.length - 1];

    obj.apiCall = {
      invoiceId: apiData?.invoiceId || null,
      canApply: apiData?.canApply || null,
      availableAmount: apiData?.availableAmount || 0,
    };

    return obj;
  });

  const statusStyles = {
    Paid: {
      bg: "#EFFFF2",
      text: "#038C3D",
    },
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen  font-gilroy">
      <div className="md:col-span-4 h-screen  border-r border-gray-200 overflow-y-auto  ">
        <div className="sticky top-0 bg-white z-20  overflow-hidden">
          <div className="flex justify-between items-center flex-wrap ">
            <div className="min-h-[50px] px-1 py-2">
              <label className="text-[18px] text-black font-semibold font-gilroy">
                Retainer Invoice
              </label>
            </div>
            {/* <div className="flex justify-between items-center gap-2">
              <div className="cursor-not-allowed bg-[#F7F8FC] border border-[#9C9C9C26] rounded-md px-1 py-1">
                <TextalignLeft size="20" color="#4B4B4B" />
              </div>
            </div> */}
          </div>

          <div className="h-[1px] bg-gray-200 p-0"></div>

          <div
            className={` transition-all duration-300 ease-in-out
           max-h-[200px] opacity-100 mt-2 scale-100
         `}
          >
            <div className="relative w-full max-w-md p-2 mt-2 ">
              <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                <SearchNormal1 size="18" color="#888" />
              </div>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full pl-4 py-2 font-gilroy border border-[#D9D9D9] rounded-xl text-sm  outline-none"
              />
            </div>
          </div>
        </div>

        <div className="show-scrolls p-2 mt-1 h-[calc(100vh-30px)] overflow-y-auto overflow-x-visible">
          {formattedData?.length > 0 ? (
            formattedData?.map((item) => (
              <div
                onClick={() => {
                  setSelectedInvoiceId(item.apiCall?.invoiceId);
                  handleDisplayInvoiceDownload(item.apiCall?.invoiceId);
                }}
                key={item.apiCall?.invoiceId}
                ref={(el) =>
                  (invoiceRefs.current[item.apiCall?.invoiceId] = el)
                }
                className={`mb-3 shadow-sm rounded p-[10px_16px] cursor-pointer
        transition-all duration-300 ease-in-out hover:bg-gray-100
        ${
          String(selectedInvoiceId) === String(item.apiCall?.invoiceId)
            ? "bg-[#F7F8FC]"
            : "bg-white"
        }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    {item?.profilePic && item?.profilePic !== "0" ? (
                      <img
                        src={item?.profilePic}
                        alt="User"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center font-semibold text-sm uppercase font-gilroy">
                        {item?.tenantName?.charAt(0) || "NA"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 ml-3 cursor-pointer">
                    <div className="flex justify-between items-center mb-1 relative group">
                      <div
                        className="font-gilroy text-sm text-[#1E45E1] font-semibold 
                max-w-[100px] truncate overflow-hidden whitespace-nowrap"
                      >
                        {item.tenantName}
                      </div>

                      <div className="font-gilroy text-base text-[#222] font-semibold">
                        {item.amount}
                      </div>

                      <span
                        className="absolute hidden group-hover:block top-full left-0 mb-1
                bg-gray-300 text-black text-xs rounded px-2 py-1 whitespace-nowrap z-[9999]"
                      >
                        {item.tenantName}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 mb-1">
                      <div className="font-gilroy text-xs text-[#222] font-semibold">
                        {item.invNo || "-"}
                      </div>

                      <div className="font-gilroy text-xs text-[#222] font-medium">
                        {item.bookingDate || "-"}
                      </div>
                    </div>

                    <div className="mt-2">
                      <span
                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-0.5 text-xs text-[#222222]"
                        style={{
                          backgroundColor:
                            statusStyles[item.status]?.bg || "#EFFFF2",
                        }}
                      >
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              statusStyles[item.status]?.text || "#038C3D",
                          }}
                        ></span>

                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-1 font-gilroy">
                No bills available
              </h3>
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-8 h-screen overflow-hidden">
        <div className="h-screen overflow-y-auto">
          <BookingPdfModal rowData={rowData || rowDatas} />
        </div>
      </div>
    </div>
  );
}

export default BookingsPdfDetails;
