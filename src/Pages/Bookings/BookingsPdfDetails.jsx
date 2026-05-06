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

function BookingsPdfDetails() {
  const location = useLocation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [rowDatas, setRowDatas] = useState("");
  const invoiceRefs = useRef({});

  const { rowData } = location.state || {};

  useEffect(() => {
    setSelectedInvoiceId(rowData);
  }, [rowData]);

  // console.log("rowData", rowData)

  const handleDisplayInvoiceDownload = (item) => {
    // console.log("itemmmmm", item)
    setRowDatas(item);
    setSelectedInvoiceId(item.transactionId);
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

  return (
    <div className="w-full grid grid-cols-12 font-gilroy">
      <div className="col-span-12 md:col-span-4 border-r">
        <div className="sticky top-0 bg-white z-10 border-b px-4 py-3">
          <div className="flex justify-between items-center">
            <label className="text-[18px] font-semibold text-black">
              Bookings
            </label>
          </div>
        </div>

        <div className="h-[90vh] overflow-y-auto p-2 space-y-3">
          {state?.Booking?.tenantBookingList?.advanceInvoiceList?.map(
            (item) => (
              <div
                key={item.invoiceId}
                ref={(el) => (invoiceRefs.current[item.invoiceId] = el)}
                className={`p-3 rounded shadow-sm cursor-pointer transition
            ${
              String(selectedInvoiceId) === String(item.invoiceId)
                ? "bg-[#E8EDFF]"
                : "bg-white hover:bg-gray-50"
            }
          `}
              >
                <div className="flex justify-between items-start">
                  <div className="shrink-0">
                    {item.profilePic && item.profilePic !== "0" ? (
                      <img
                        src={item.profilePic}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center text-sm font-semibold uppercase">
                        {item.initials}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 ml-3">
                    <div className="flex justify-between items-center mb-1">
                      <div
                        className="text-sm font-semibold text-[#222] cursor-pointer"
                        onClick={() => {
                          setSelectedInvoiceId(item.invoiceId);
                          handleDisplayInvoiceDownload(item);
                        }}
                      >
                        {item.fullName || "Unnamed"}
                      </div>

                      <div className="text-sm font-semibold text-[#222]">
                        ₹ {item.availableAmount || "0"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-xs text-[#555]">
                        {item?.bookingDate}
                      </div>

                      <span className="text-[10px] bg-green-100 text-black rounded-full px-3 py-1 flex items-center">
                        {item?.paymentStatus === "PAID" ? "Paid" : "Unpaid"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
     
      <div className="col-span-12 md:col-span-8">
        <BookingPdfModal rowData={rowData || rowDatas} />
      </div>
    </div>
  );
}

export default BookingsPdfDetails;
