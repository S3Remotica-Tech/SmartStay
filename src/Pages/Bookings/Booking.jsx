/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import { CloseCircle, Filter } from "iconsax-react";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import Select from "react-select";
// import PaginationList from '../../Components/PaginationList';
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
// import withErrorBoundary from "../../Hoc/WithErrorBountry";
import BookingInvoice from "../Bookings/BookingInvoice";
import { FiSearch } from "react-icons/fi";
import ApplyBookingModal from "./ApplyInvoices";
import ComingSoon from "../../Utils/ComingSoon";

function Booking() {
  const [showBookingPdf, setShowBookingPdf] = useState(false);
  const [search, setSearch] = useState(false);
  const [statusfilter, setStatusfilter] = useState("");
  // const [showBillsFilter, setShowBillsFilter] = useState(false);
  const [applyInvoice, setApplyInvoice] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const {
    // canWriteModule: canWriteBooking,
    canReadModule: canReadBooking,
    // canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Booking");

  // useEffect(() => {
  //     if (state.UsersList?.accessRestrictionError) {
  //     // setLoading(false)
  //       setTimeout(() => {
  //         dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
  //       }, 1000)
  //     }

  //   }, [state.UsersList?.accessRestrictionError])

  // useEffect(() => {
  //     if (!canReadBooking) {
  //       // setLoading(false);
  //     }
  //   }, [canReadBooking]);

  const sortedData = [];

  useEffect(() => {
    setShowBookingPdf(false);
  }, []);

  const handleSearch = () => {
    setSearch(!search);
  };

  const selectOptions = [{ label: "All", value: "ALL" }];
  const [selectedRows, setSelectedRows] = useState([]);

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
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

  const handleStatusFilter = (selectedOption) => {
    setStatusfilter(selectedOption);
  };

  const handleShowFilterBills = () => {
    // setShowBillsFilter(true)
  };

  // const handleCloseFilterBills = () => {
  //     // setShowBillsFilter(false)

  // }

  const handleApplyInvoices = () => {
    setApplyInvoice(true);
  };
  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };
  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  const isComingSoon =
    import.meta.env.MODE === "production" || import.meta.env.MODE === "qa";

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(tableData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const tableData = [
    {
      invoiceNo: "INV-001",
      name: "John Doe",
      type: "Rent",
      invoiceDate: "01 Apr 2026",
      dueDate: "05 Apr 2026",
      amount: "₹10,000",
      due: "₹2,000",
      status: "Pending",
    },
    {
      invoiceNo: "INV-002",
      name: "Arun Kumar",
      type: "Maintenance",
      invoiceDate: "02 Apr 2026",
      dueDate: "06 Apr 2026",
      amount: "₹8,000",
      due: "₹0",
      status: "Paid",
    },
  ];

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white relative font-gilroy">
      {applyInvoice && (
        <ApplyBookingModal
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
        />
      )}

      <div className="sticky top-0 z-20 bg-white px-1 pt-3">
        <div className="flex flex-wrap items-center justify-between gap-2 shrink-0">
          <label className="text-[18px] font-semibold text-[#222222] font-gilroy">
            Booking
          </label>

          <div className="flex items-center gap-2">
            {search ? (
              <div className="relative min-w-[200px] max-w-[260px] z-[3000]">
                <div className="flex items-center h-10 border border-[#CFD5DB] rounded-lg bg-white">
                  <span className="px-2 flex items-center">
                    <FiSearch
                      className={`h-5 w-5 transition-opacity duration-300
              ${
                canReadBooking
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-40 pointer-events-none"
              }`}
                    />
                  </span>

                  <input
                    type="text"
                    placeholder="Search"
                    value={filterInput}
                    onChange={handlefilterInput}
                    disabled={canReadBooking}
                    className="flex-1 h-full px-2 text-sm font-gilroy
                     outline-none border-none focus:ring-0"
                  />

                  <span className="px-2 flex items-center">
                    <button onClick={() => setSearch(false)}>
                      <CloseCircle size="20" color="#222" />
                    </button>
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center justify-center h-10 w-10
                 border border-[#CBD5E1] rounded-full cursor-pointer"
                onClick={handleSearch}
              >
                <FiSearch
                  className={`h-5 w-5 transition-opacity duration-300
          ${
            canReadBooking
              ? "opacity-100"
              : "cursor-not-allowed opacity-40 pointer-events-none"
          }`}
                />
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                disabled={isComingSoon}
                onClick={handleApplyInvoices}
                className="bg-[#1E45E1] text-white text-sm font-semibold font-gilroy
                 rounded-lg px-3 py-2.5 min-w-[150px] whitespace-nowrap disabled:bg-gray-200 cursor-not-allowed"
              >
                Apply Invoices
              </button>

              <button
                disabled={!canReadBooking}
                className={`${canReadBooking ? "" : "opacity-40 cursor-not-allowed"}`}
              >
                <img src={excelimg} alt="excel" className="w-9 h-9" />
              </button>
            </div>
          </div>
        </div>

        {!showBookingPdf && (
          <div className="flex flex-wrap items-center gap-3 pb-3">
            <div className="w-[150px]">
              <Select
                isDisabled
                options={selectOptions}
                styles={CustomStyles}
                disabled={!canReadBooking}
                onChange={(e) => handleStatusFilter(e)}
                value={statusfilter}
                aria-label="Select"
                id="statusselect"
              />
            </div>

            <Select
              isDisabled
              options={monthOptions}
              value={selectedMonth}
              onChange={handleMonthChange}
              styles={CustomStyles}
              classNamePrefix="custom"
              menuPlacement="auto"
              noOptionsMessage={() => "No options"}
            />

            <button
              onClick={() => canReadBooking && handleShowFilterBills()}
              disabled={!canReadBooking}
              className={`border border-slate-300 rounded-full p-2
            ${canReadBooking ? "" : "opacity-40 cursor-not-allowed"}`}
            >
              <Filter size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="">
        {!canReadBooking ? (
          <div className="h-full flex flex-col items-center justify-center">
            <img src={EmptyState} alt="Empty" className="max-w-full h-auto" />
            <ErrorMessage
              message={["You do not have access to view Booking"]}
              type="warning"
            />
          </div>
        ) : (
          <div>
            <div>
              {isComingSoon ? (
                <ComingSoon />
              ) : (
                <div className="bg-white  rounded-xl shadow-sm border border-[#E8E8E8] ">
                  <div className="overflow-auto h-[calc(100vh-140px)] rounded-xl">
                    <table className="w-full table-fixed font-gilroy">
                      <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs uppercase">
                        <tr className="h-9">
                          <th className="px-4 py-2.5 sticky left-0 z-50 bg-[#F9FAFB] w-[80px]">
                            <input
                              type="checkbox"
                              checked={
                                selectedRows.length === tableData.length &&
                                tableData.length > 0
                              }
                              onChange={handleSelectAll}
                            />
                          </th>

                          <th className=" px-2">Invoice No</th>
                          <th className=" px-2">Name</th>
                          <th className=" px-2">Type</th>
                          <th className=" px-2">Invoice Date</th>
                          <th className=" px-2">Due Date</th>
                          <th className=" px-2">Amount</th>
                          <th className=" px-2">Due</th>
                          <th className="px-2">Status</th>

                          <th className=" px-2 sticky right-0 z-50 bg-[#F9FAFB]">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {tableData.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b last:border-0 text-sm"
                          >
                            <td className="px-4 py-2.5 sticky left-0 bg-white z-40 w-[80px]">
                              <input
                                type="checkbox"
                                checked={selectedRows.includes(item.id)}
                                onChange={() => handleRowSelect(item.id)}
                              />
                            </td>

                            <td className="w-[230px] px-2 py-2.5">
                              {item.invoiceNo}
                            </td>
                            <td className="w-[250px] px-2 py-2.5">
                              {item.name}
                            </td>
                            <td className="w-[230px] px-2 py-2.5">
                              {item.type}
                            </td>
                            <td className="w-[230px] px-2 py-2.5">
                              {item.invoiceDate}
                            </td>
                            <td className="w-[230px] px-2 py-2.5">
                              {item.dueDate}
                            </td>
                            <td className="w-[230px] px-2 py-2.5">
                              {item.amount}
                            </td>
                            <td className="w-[230px] px-2 py-2.5">
                              {item.due}
                            </td>

                            <td className="w-[270px] px-2 py-2.5">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  item.status === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>

                            <td className="w-[230px] px-2 py-2.5 sticky right-0 bg-white z-40"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            {showBookingPdf && (
              <div className="col-span-8 border-l border-gray-300">
                <BookingInvoice />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Booking;
