/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "react-circular-progressbar/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import BookingToCheckin from "../CustomerFile/BookingToCheckin";
import RecordPayment from "../Bills/RecordPayment";
import {
  ArrowUp2,
  ArrowDown2,
  ArrowUp,
  DocumentText,
  Calendar,
  ExportSquare,
  TrendDown,
  TrendUp,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "../../Utils/Permission";

function DashQuickAccess({ handleTriggerFilter }) {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [selected, setSelected] = useState("This Month");
  const [open, setOpen] = useState(false);
  const [activeTabDashboard, setActiveTabDashboard] = useState("checkin");
  const [loading, setLoading] = useState(false);
  const [tenantDetails, setTenantDetails] = useState("");
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const [showform, setShowform] = useState(false);
  const QuickAccess = state.PgList?.dashboardList;
  // const [invoiceValue, setInvoiceValue] = useState("");
  const [invoiceList, setInvoiceList] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [BookingAssignForm, setBookingAssignForm] = useState(false);

  const billingSummary = {
    title: "Billing Summary",
    invoices: QuickAccess?.billingSummary?.totalInvoiceGenerated || 0,
    totalAmount: QuickAccess?.billingSummary?.totalAmount || 0,
    collected: ` ${QuickAccess?.billingSummary?.totalPaid || 0}`,
    refunded: ` ${QuickAccess?.billingSummary?.refundedAmount || 0}`,
    outstanding: `${QuickAccess?.billingSummary?.totalPending || 0}`,
    collectionRate: `${QuickAccess?.billingSummary?.collectionRate || 0}`,
    trend: `${QuickAccess?.billingSummary?.fromLastMonth || ""} from last month`,
  };



  const dateOptions =
    QuickAccess?.filters?.map((item) => ({
      label: item,
      value: item,
    })) || [];

  const tabs = [
    {
      id: "checkin",
      label: "Upcoming Check-ins",
      count: `${QuickAccess?.checkins?.length || "0"}`,
    },
    {
      id: "overdue",
      label: "Overdue Invoices",
      count: `${QuickAccess?.overdueInvoices?.length || "0"}`,
    },
  ];

  const checkinList =
    QuickAccess?.checkins?.map((item) => ({
      customerId: item?.tenantId,
      name: item.customerName || "-",
      sharing: item.sharingType,
      room: item.roomName,
      bed: item.bedName,
      date: item.joiningDate,
      profilePic: item.profilePic,
      initials: item.initials,
    })) || [];

  const payments =
    QuickAccess?.overdueInvoices?.map((item) => ({
      invoiceId: item.invoiceId,
      name: item.customerName || "-",
      invoice: item.invoiceNumber,
      status: item.status,
      amount: item.dueAmount,
      date: item.dueDate,
      initials: item.initials,
      profilePic: item.profilePic,
      customerId: item.customerId,
      dueAmount: item.dueAmount,
      invoiceDate: item.invoiceDate,
    })) || [];

  const { canWriteModule: canWriteTenant } = useHasPermission("Customers");

  const { canWriteModule: canWriteInvoice } = useHasPermission("Bills");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "GET_DASHBOARD_SAGA",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         filters: {
  //           billingFilter: selected,
  //         },
  //       },
  //     });

  //     // setLoading(true);
  //   }
  // }, [selected]);

  useEffect(() => {
    if (state.PgList?.dashboardList) {
      setLoading(false);
    }
  }, [state.PgList?.dashboardList]);

  useState(() => {
    if (state.PgList.getDashboardSuccessStatus === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_DASHBOARD_REDUCER" });
      }, 200);
    }
  }, [state.PgList.getDashboardSuccessStatus]);

  const handleNavigateTenant = (tenantId) => {
    if (tenantId) {
      navigate(`/tenant/details/${tenantId}`, {
        state: {
          customerId: tenantId,
          hostelId: state.login.selectedHostel_Id,
          isDashboardWay: true,
          IsOverView: true,
        },
      });
    }
  };

  const handleBookingAssign = (book) => {
    setBookingAssignForm(true);
    setTenantDetails(book);
  };

  const handleCloseBooking = () => {
    setBookingAssignForm(false);
  };

  const handleRecordPayment = (item) => {
    setShowform(true);
    setSelectedUserId(item.customerId);
    setInvoiceList({
      balanceDue: item?.dueAmount,
      invoiceId: item?.invoiceId,
      invoiceDate: item?.invoiceDate,
    });
  };

  // useEffect(() => {
  //   if (
  //     state.UsersList?.bookingToCheckinStatusCode === 200 ||
  //     state.UsersList?.bookingToCheckinStatusCode === 201
  //   ) {
  //     setBookingAssignForm(false);
  //     dispatch({
  //       type: "GET_DASHBOARD_SAGA",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         filters: {
  //           billingFilter: selected,
  //         },
  //       },
  //     });

  //     setTimeout(() => {
  //       dispatch({ type: "REMOVE_BOOKING_TO_CHECKIN" });
  //     }, 100);
  //   }
  // }, [state.UsersList?.bookingToCheckinStatusCode]);

  useEffect(() => {
    if (state.UsersList?.bookingToCheckinSuccessCode === 201) {
      setBookingAssignForm(false);
      dispatch({
        type: "GET_DASHBOARD_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            billingFilter: selected,
          },
        },
      });

      dispatch({ type: "REMOVE_BOOKING_TO_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.bookingToCheckinSuccessCode]);

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      dispatch({
        type: "GET_DASHBOARD_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            billingFilter: selected,
          },
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      }, 300);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

  const handleCloseForm = () => {
    setShowform(false);
  };

  const handlefilterbyDates = (option) => {
    setSelected(option.value);
    setOpen(false);
    // handleTriggerFilter(option)
  };

  return (
    <div className="mt-6 font-[Gilroy]">
      {BookingAssignForm && (
        <BookingToCheckin
          show={BookingAssignForm}
          handleClose={handleCloseBooking}
          tenantDetails={tenantDetails}
        />
      )}

      {showform && (
        <RecordPayment
          show={showform}
          handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          // invoiceValue={invoiceValue}
          invoiceList={invoiceList}
        />
      )}

      <h2 className="text-lg font-semibold text-[#101828] mb-4 font-[Gilroy]">
        Quick Access & Follow-ups
      </h2>
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="bg-white rounded-xl border border-[#E5E7EB] lg:col-span-5 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
                <DocumentText size="18" color="#F97316" variant="Bulk" />
              </div>
              <h3 className="font-semibold text-base text-[#101828] my-0 ">
                {billingSummary.title}
              </h3>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                disabled
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-xs border rounded-md px-3 py-2 font-[Gilroy] whitespace-nowrap 
   text-black border-gray-300
  disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <Calendar size="16" />
                {selected}

                {open ? (
                  <ArrowUp2 size="16" color="#1E45E1" />
                ) : (
                  <ArrowDown2 size="16" color="#1E45E1" />
                )}
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
                  {dateOptions?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        handlefilterbyDates(option);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-[Gilroy] hover:bg-gray-100 ${
                        selected === option.label
                          ? "text-blue-600 font-medium "
                          : "text-gray-600"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between ">
            <span className="text-[#4A5565 font-medium text-xs">
              Invoices Generated
            </span>
            <span className="font-semibold text-[#222222] ">
              {billingSummary.invoices}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#4A5565 font-medium text-xs">
              Total Amount
            </span>
            <span className="font-semibold text-green-600 text-base">
              ₹ {billingSummary.totalAmount}
            </span>
          </div>
          <hr className="border border-[#F3F4F5] mx-0" />
          <div className="flex justify-between text-sm">
            <span className="text-[#4A5565 font-medium text-xs">Collected</span>
            <span className="font-semibold text-green-600 text-base">
              ₹{billingSummary.collected}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-[#4A5565 font-medium text-xs">Refunded</span>
            <span className="font-semibold text-red-600 text-base">
              ₹{billingSummary.refunded}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="flex items-center gap-1 text-[#4A5565 font-medium text-xs">
              Outstanding <ExportSquare size="14" color="#1E45E1" />
            </span>
            <span className="font-semibold text-green-600 text-base ">
              ₹ {billingSummary.outstanding}
            </span>
          </div>
          <hr className="border border-[#F3F4F5] mx-0" />
          <div className="">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#4A5565 font-medium text-xs">
                {" "}
                Collection Rate
              </span>
              <span className="font-semibold">
                {billingSummary.collectionRate}
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F54900] transition-all duration-300"
                  style={{
                    width: `${Math.min(Math.max(parseFloat(billingSummary.collectionRate) || 0, 0), 100)}%`,
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
              {parseFloat(billingSummary.trend) >= 0 ? (
                <TrendUp size="16" color="#00A63E" />
              ) : (
                <TrendDown size="16" color="#E53935" />
              )}

              {billingSummary.trend}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB]  p-4 lg:col-span-7">
          <div className="flex border-b border-[#F3F3F3] justify-around mb-3 w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabDashboard(tab.id)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTabDashboard === tab.id
                    ? "border-b-2 border-[#1E45E1] text-[#1E45E1]"
                    : "text-gray-500"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          {activeTabDashboard === "checkin" && (
            <div className="space-y-3 max-h-[280px] overflow-y-auto show-scrolls">
              {checkinList.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500">
                  No check-in records found
                </div>
              ) : (
                checkinList.map((item) => (
                  <div
                    key={item.customerId}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <p className="font-semibold text-base">{item.name}</p>

                      <div className="flex gap-2">
                        <p className="text-xs text-[#4A5565]">{item.sharing}</p>
                        <p className="text-xs text-[#4A5565]">{item.room}</p>
                        <p className="text-xs text-[#4A5565]">{item.bed}</p>
                        <p className="text-xs text-[#4A5565]">
                          Check-in : {item.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className="border rounded-md px-3 py-1 text-sm"
                        onClick={() => handleNavigateTenant(item.customerId)}
                      >
                        View
                      </button>

                      <button
                        disabled={!canWriteTenant}
                        className="bg-[#1E45E1] text-white rounded-md px-3 py-1 text-sm
  disabled:bg-gray-200 disabled:cursor-not-allowed disabled:text-gray-400"
                        onClick={() => {
                          if (canWriteTenant) {
                            handleBookingAssign(item);
                          }
                        }}
                      >
                        Check-in
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTabDashboard === "overdue" && (
            <div className="space-y-3 max-h-[280px] overflow-y-auto show-scrolls  font-[Gilroy] ">
              {payments.length === 0 ? (
                <div className="text-center py-6 text-sm text-gray-500">
                  No overdue records found
                </div>
              ) : (
                payments.map((item) => (
                  <div
                    key={item.invoiceId}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600 overflow-hidden">
                        {item.profilePic ? (
                          <img
                            src={item.profilePic}
                            alt="profile"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span>{item.initials}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 mb-2">
                          {item.name}
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{item.invoice}</span>

                          <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-[2px] text-[11px] font-medium text-orange-600">
                            <span className="h-2 w-2 rounded-full bg-orange-500" />
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹ {item.amount}
                        </div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>

                      <button
                        disabled={!canWriteInvoice}
                        className="bg-[#1E45E1] text-white rounded-md px-3 py-1 text-sm
  disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
                        onClick={() => {
                          if (canWriteInvoice) {
                            handleRecordPayment(item);
                          }
                        }}
                      >
                        Record Payment
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashQuickAccess;
