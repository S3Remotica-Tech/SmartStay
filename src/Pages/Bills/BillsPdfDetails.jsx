/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
// import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
// import BillPdfModal from "../PDF/BillPdfModal";
import BillPDFModalNew from "../PDF/BillPDFModalNew";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "../OthersComponent/BillPdfModal.css";
import { useLocation, useNavigate } from "react-router-dom";
import { Add, SearchNormal1, TextalignLeft } from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import Select from "react-select";

function BillsPdfDetails() {
  const location = useLocation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusfilter, setStatusfilter] = useState("ALL");
  const [statusShowfilter, setStatusShowfilter] = useState(false);
  // const [hoveredInvoiceId, setHoveredInvoiceId] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [rowDatas, setRowDatas] = useState("");
  const invoiceRefs = useRef({});

  const searchTimeout = useRef();

  const { canWriteModule: canWriteInvoice, canReadModule: canReadInvoice } =
    useHasPermission("Bills");

  const { rowData, isReportsInvoiceRegisterWay, isTenantWay } =
    location.state || {};

  const handleShowStatusFilter = () => {
    setStatusShowfilter(!statusShowfilter);
  };

  // console.log("rowData Tenant Overview", rowData)

  useEffect(() => {
    if (rowData?.invoiceId) {
      setSelectedInvoiceId(rowData?.invoiceId);
    }
  }, [rowData]);

  const handleDisplayInvoicePDF = (item) => {
    setRowDatas(item);
    setSelectedInvoiceId(item?.invoiceId);
    navigate(`/invoice/details/${item?.invoiceId}`, {
      replace: false,
      state: { ts: Date.now() },
    });
    if (item) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: item.invoiceId,
        },
      });
    }
  };

  const CustomStyles = {
    control: (base) => ({
      ...base,
      height: "auto",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "14px",
      color: "#4B4B4B",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        border: "1px solid #D9D9D9",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      maxHeight: "60px",
      overflowY: "auto",
      flexWrap: "wrap",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#FFF",
      borderRadius: "6px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      fontSize: "12px",
      fontWeight: 600,
      color: "#000000",
    }),

    multiValueRemove: (base) => ({
      ...base,
      cursor: "pointer",
      borderRadius: 10,
      color: "#FF0000",
      ":hover": {
        color: "#FF0000",
      },
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      fontFamily: "Gilroy, sans-serif",
      fontSize: "14px",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: "#1E45E1",
      color: "#FFF",
      maxHeight: "120px",
      padding: 0,
      scrollbarWidth: "thin",
      overflowY: "auto",
      fontFamily: "Gilroy, sans-serif",
      fontSize: "14px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#555",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "" : "white",
      color: state.isFocused ? "#FFF" : "#000000",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#555",
      cursor: "pointer",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    clearIndicator: () => ({
      display: "none",
    }),
  };

  useEffect(() => {
    if (rowData?.invoiceId) {
      setSelectedInvoiceId(rowData.invoiceId);

      setTimeout(() => {
        invoiceRefs.current[rowData.invoiceId]?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 100);
    }
  }, [rowData]);

  console.log("rowData", rowData);

  useEffect(() => {
    if (isReportsInvoiceRegisterWay) {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [isReportsInvoiceRegisterWay]);

  const handleManualShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding bill information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    navigate("/create-bill");
    dispatch({ type: "USERROOMAVAILABLEFALSE" });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      const previousFilters = state.InvoiceList.invoiceFilters || {};

      const filters = {
        ...previousFilters,
        search: value.trim() || undefined,
      };

      dispatch({
        type: "ALL_BILLS_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters,
        },
      });
    }, 500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 h-screen overflow-hidden">
      <div className="md:col-span-4 h-screen  border-r border-gray-200 overflow-y-auto ">
        <div className="sticky top-0 bg-white z-20  overflow-hidden">
          <div className="flex justify-between items-center flex-wrap ">
            <div className="min-h-[50px] px-1 py-2">
              <label className="text-[18px] text-black font-semibold font-gilroy">
                Bills
              </label>
            </div>
            <div className="flex justify-between items-center gap-2">
              <div className="cursor-not-allowed bg-[#F7F8FC] border border-[#9C9C9C26] rounded-md px-1 py-1">
                <TextalignLeft size="20" color="#4B4B4B" />
              </div>

              <button
                disabled={!canWriteInvoice}
                onClick={handleManualShow}
                className="bg-[#1E45E1] text-white px-1 py-1 rounded-md me-2"
              >
                <Add size="22" color="#ffffff" />
              </button>
            </div>
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
                onChange={handleSearchChange}
                placeholder="Search..."
                className="w-full pl-4 py-2 font-gilroy border border-[#D9D9D9] rounded-xl text-sm  outline-none"
              />
            </div>
          </div>
        </div>

        <div className="show-scrolls p-2 mt-1 h-[calc(100vh-30px)] overflow-y-auto  overflow-x-visible">
          {state.InvoiceList?.getAllBillsList?.length > 0 ? (
            state.InvoiceList?.getAllBillsList?.map((item) => (
              <div
                onClick={() => {
                  setSelectedInvoiceId(item.invoiceId);
                  handleDisplayInvoicePDF(item);
                }}
                key={item.invoiceId}
                ref={(el) => (invoiceRefs.current[item.invoiceId] = el)}
                className={`mb-3 shadow-sm rounded p-[10px_16px] cursor-pointer  
transition-all duration-300 ease-in-out  hover:bg-gray-100
${
  String(selectedInvoiceId) === String(item.invoiceId)
    ? "bg-[#F7F8FC]"
    : "bg-white hover:bg-gray-100 "
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
                        {item?.initials}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 ml-3 cursor-pointer">
                    <div className="flex justify-between items-center mb-1  relative group">
                      <div
                        className="font-gilroy text-sm text-[#1E45E1] font-semibold 
                                            max-w-[100px] truncate overflow-hidden whitespace-nowrap"
                      >
                        {item.customerName}
                      </div>
                      <div className="font-gilroy text-base text-[#222] font-semibold">
                        ₹ {item.invoiceAmount}
                      </div>

                      <span
                        className="absolute hidden group-hover:block top-full left-0  mb-1
                                                 font-gilroy 
      bg-gray-300 text-black text-xs rounded px-2 py-1 whitespace-nowrap z-[9999] "
                      >
                        {item.customerName}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3 mb-1">
                      <div className="font-gilroy text-xs text-[#222] font-semibold">
                        {item.invoiceNumber || "0.00"}
                      </div>
                      <div className="font-gilroy text-xs text-[#222] font-medium">
                        {item.invoiceDate}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-1.5">
                  {(item?.status === "Pending" ||
                    item?.status === "Partial Payment") && (
                    <span className="flex items-center gap-2 bg-[#FFF1F1] text-black rounded-full px-2 py-[2px] text-[10px] font-gilroy w-fit">
                      <span className="h-2 w-2 rounded-full bg-[#EF4444]"></span>
                      {item?.status}
                    </span>
                  )}

                  {item?.status === "Paid" && (
                    <span className="flex items-center gap-2 bg-[#ECFDF5] text-black rounded-full px-2 py-[2px] text-[10px] font-gilroy w-fit">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]"></span>
                      {item?.status}
                    </span>
                  )}

                  {(item?.status === "Refunded" ||
                    item?.status === "Partially Refunded") && (
                    <span className="flex items-center gap-2 bg-[#FFFBEB] text-black rounded-full px-2 py-[2px] text-[10px]  font-gilroy w-fit">
                      <span className="h-2 w-2 rounded-full bg-[#F59E0B]"></span>
                      {item?.status}
                    </span>
                  )}

                  {item?.status === "Pending Refund" && (
                    <span className="flex items-center gap-2 bg-[#FFF7ED] text-black rounded-full px-2 py-[2px] text-[10px] font-gilroy w-fit">
                      <span className="h-2 w-2 rounded-full bg-[#FB923C]"></span>
                      {item?.status}
                    </span>
                  )}

                  {item?.status === "Cancelled" && (
                    <span className="flex items-center gap-2 bg-[#F3F4F6] text-black rounded-full px-2 py-[2px] text-[10px] font-gilroy w-fit">
                      <span className="h-2 w-2 rounded-full bg-[#6B7280]"></span>
                      Cancelled
                    </span>
                  )}
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
          <BillPDFModalNew
            rowData={rowData || rowDatas}
            isReportsInvoiceRegisterWay={isReportsInvoiceRegisterWay}
            isTenantWay={isTenantWay}
          />
        </div>
      </div>
    </div>
  );
}

export default BillsPdfDetails;
