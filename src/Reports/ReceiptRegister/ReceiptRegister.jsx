import React, { useEffect, useState, useRef } from 'react';
import {
  Filter,
  Export, ArrowLeft,
  ArrowSwapVertical, Setting3, SearchNormal1,
  ArrowDown2

} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiPagination from "../../Components/ApiPagination";
import ReceiptFilter from './ReceiptFilter';

function ReceiptRegister() {

  const navigate = useNavigate();
  const state = useSelector(state => state)
  const { RangePicker } = DatePicker;
  const [invoiceFilter, setInvoiceFilter] = useState(false)
  const dropdownRef = useRef(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const [receiptRegister, setReceiptRegister] = useState('')
  const [chips, setChips] = useState([])
  const [loading, setLoading] = useState(false)
  const tableRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [size, setSize] = useState('');
  const [page, setPage] = useState(0);
  const skipApiRef = useRef(false);

  const isInitialLoad = useRef(true);
  const apiStart = state?.reports?.getReceiptRegister?.summary?.startDate;
  const apiEnd = state?.reports?.getReceiptRegister?.summary?.endDate;



  useEffect(() => {
    if (state.reports.getReceiptRegisterSuccess === 200) {
      setLoading(false)
      setReceiptRegister(state?.reports?.getReceiptRegister)
      setInvoiceFilter(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_REPORTS_RECEIPT_REGISTER_REDUCER' })
      }, 100)
    }

  }, [state.reports.getReceiptRegisterSuccess])







  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setRegister(false);
      }
    }

    if (register) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [register]);


  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el.scrollLeft > 0);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);


  const reportCards = [
    // { title: "Receipt Register" },
    { title: "Bank Transaction Register" },
    { title: "Tenant Register" },
    { title: "Occupancy" },
    { title: "Expense Register" },
    { title: "Vendor Ledger" },
    { title: "Electricity Billing Register" },
    { title: "Complaint Register" },
    { title: "Request Register" },
    { title: "Final Settlement" },
    { title: "Invoice Register" },
  ];

  const handleNavigateReports = () => {
    navigate(`/reports/${state.login.selectedHostel_Id}`)
    dispatch({
      type: "SET_RECEIPT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceType: [],
        collectedBy: [],
        period: [],
        paymentMode: [],
        createdByLabels: [],
      },
    })
  }

  const handleNavigateRegister = (item) => {
    setRegister(false)
    if (item?.title === "Tenant Register") {
      navigate(`/reports/tenant-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Receipt Register") {
      navigate(`/reports/receipt-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Bank Transaction Register") {
      navigate(`/reports/bank-transaction-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Occupancy") {
      navigate(`/reports/occupancy-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Expense Register") {
      navigate(`/reports/expense-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Vendor Ledger") {
      navigate(`/reports/vendor-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Electricity Billing Register") {
      navigate(`/reports/electricity-billing-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Complaint Register") {
      navigate(`/reports/complaint-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Request Register") {
      navigate(`/reports/request-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Final Settlement") {
      navigate(`/reports/final-settlement-register/${state.login?.selectedHostel_Id}`)
    } else if (item?.title === "Invoice Register") {
      navigate(`/reports/invoice-register/${state.login?.selectedHostel_Id}`);
    }
    dispatch({
      type: "SET_RECEIPT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceType: [],
        collectedBy: [],
        period: [],
        paymentMode: [],
        createdByLabels: [],
      },
    })
  }

  const handleClickFilter = () => {
    setInvoiceFilter(true)
    dispatch({
      type: "SET_RECEIPT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceType: [],
        collectedBy: [],
        period: undefined,
        paymentMode: [],
        createdByLabels: [],
      },
    })


  }

  const handleCloseFilterBills = () => {
    setInvoiceFilter(false)
  }



  const stats = [
    { title: "Total Receipts", value: state?.reports?.getReceiptRegister?.pagination?.totalRecords },
    { title: "Collected Amount", value: state?.reports?.getReceiptRegister?.summary?.receivedAmount, },

  ];



  const options = [
    { key: "sharing", label: "Sharing", checked: true },
    { key: "checkin", label: "Check-in Date", checked: true },
    { key: "checkout", label: "Checkout date", checked: true },
    { key: "stay", label: "Stay Duration", checked: false },
    { key: "room", label: "Room", checked: true },
    { key: "bed", label: "Bed", checked: false },
    { key: "status", label: "Status", checked: true },
    { key: "payment", label: "Last Payment", checked: true },
  ];


  const handleReset = () => {
    dispatch({
      type: "SET_RECEIPT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceType: [],
        collectedBy: [],
        period: [],
        paymentMode: [],
        createdByLabels: [],
      },
    })
    dispatch({
      type: 'GET_REPORTS_RECEIPT_REGISTER_SAGA', payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: {
          size: size,
          page: page,
        }
      }
    })
  }



  useEffect(() => {
    const invoiceFilters = state.reports?.receiptRegisterFilters;
    const filterData = [];

    if (invoiceFilters?.startDate || invoiceFilters?.endDate) {
      filterData.push({
        key: "date-range",
        label: "Date Range is",
        type: "date",
        value:
          invoiceFilters.startDate && invoiceFilters.endDate
            ? `${invoiceFilters.startDate} - ${invoiceFilters.endDate}`
            : invoiceFilters.startDate || invoiceFilters.endDate,
      });
    }

    if (invoiceFilters?.invoiceType?.length) {
      filterData.push({
        key: "type",
        label: "Type is",
        type: "type",
        value: invoiceFilters.invoiceType.join(", "),
      });
    }

    if (invoiceFilters?.createdByLabels?.length) {
      filterData.push({
        key: "collected",
        label: "Collected By  is",
        type: "collected",
        value: invoiceFilters.createdByLabels.join(", "),
      });
    }


    if (invoiceFilters?.period?.length) {
      filterData.push({
        key: "period",
        label: "Period  is",
        type: "period",
        value: invoiceFilters?.period,
      });
    }


    if (invoiceFilters?.paymentMode?.length) {
      filterData.push({
        key: "payment",
        label: "PaymentMode  is",
        type: "payment",
        value: invoiceFilters.paymentMode.join(", "),
      });
    }


    setChips(filterData);
  }, [state.reports.receiptRegisterFilters]);


  useEffect(() => {
    if (!apiStart || !apiEnd || !isInitialLoad.current) return;

    isInitialLoad.current = false;

    setSelectedRange({
      from: dayjs(apiStart, "DD/MM/YYYY").toDate(),
      to: dayjs(apiEnd, "DD/MM/YYYY").toDate(),
    });
  }, [apiStart, apiEnd]);

  const handleDateChange = (dates) => {
    if (!dates) {
      setSelectedRange(null);
      dispatch({
        type: "SET_RECEIPT_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,

        },
      })
      dispatch({
        type: 'GET_REPORTS_RECEIPT_REGISTER_SAGA', payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            size: size,
            page: page,
          }
        }
      })

      return;
    }

    const [from, to] = dates;


    setSelectedRange({
      from: from ? from.toDate() : null,
      to: to ? to.toDate() : null,
    });

    const filters = {
      startDate: from ? dayjs(from).format("DD-MM-YYYY") : undefined,
      endDate: to ? dayjs(to).format("DD-MM-YYYY") : undefined,
      size: size,
      page: page,
    };

    dispatch({
      type: "SET_RECEIPT_REGISTER_FILTERS",
      payload: filters
    });


  };






  useEffect(() => {
    return () => {

      dispatch({
        type: "SET_RECEIPT_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          invoiceType: [],
          collectedBy: [],
          period: [],
          paymentMode: [],
          createdByLabels: [],
        },
      });

      const filters = {
        size,
        page,
      };
      dispatch({
        type: "GET_REPORTS_RECEIPT_REGISTER_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: filters,
        },
      });


    };
  }, []);


  const startDate = selectedRange?.from
    ? dayjs(selectedRange.from).format("DD-MM-YYYY")
    : undefined;

  const endDate = selectedRange?.to
    ? dayjs(selectedRange.to).format("DD-MM-YYYY")
    : undefined;


  useEffect(() => {
    if (!state.login?.selectedHostel_Id) return;
    const filters = {
      startDate: startDate,
      endDate: endDate,
      size,
      page,
    };
    dispatch({
      type: "GET_REPORTS_RECEIPT_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: filters,
      },
    });
    setLoading(true)
  }, [size, page, selectedRange, state.login?.selectedHostel_Id,]);







  const currentPage =
    state?.reports?.getReceiptRegister?.pagination?.currentPage ?? 1;

  const totalPages =
    state?.reports?.getReceiptRegister?.pagination?.totalPages ?? 1;

  const totalRecords =
    state?.reports?.getReceiptRegister?.pagination?.totalRecords ?? 0;





  const handlePageChange = (page) => {
    setPage(page)

  };


  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue)

  };


useEffect(() => {
      if (state.createAccount?.networkError) {
        setLoading(false)
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        }, 3000)
      }
  
    }, [state.createAccount?.networkError])

  return (
    <div className="h-screen flex flex-col font-gilroy p-2">
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 right-0 left-0 z-40 bg-white">
        <div className='flex items-center gap-2'>
          <ArrowLeft onClick={handleNavigateReports}
            size="20"
            color="#4A5565" className='cursor-pointer'
          />
          <div>
            <div className='flex items-center gap-2 relative w-fit' onClick={() => setRegister(!register)}>
              <h1 className="text-lg font-semibold my-0 text-[#222222]">Receipt Register</h1>
              <div className='rounded-none border-0'>
                <ArrowDown2
                  size="18"
                  color="#1E45E1"
                  className={`cursor-pointer transition-transform duration-200 ${register ? "rotate-180" : ""
                    }`}
                />
                {register && (
                  <div ref={dropdownRef} className="absolute z-50 mt-2 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]">
                    {reportCards.map((item, index) => {
                      const isFirst = index === 0;
                      const isLast = index === reportCards.length - 1;

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            handleNavigateRegister(item)

                          }}
                          className={`
                px-4 py-2 text-sm text-[#222] cursor-pointer
                hover:bg-[#F1F5FF]
                ${isFirst ? "hover:rounded-t-2xl" : ""}
                ${isLast ? "hover:rounded-b-2xl" : ""}
                ${!isLast ? "border-b border-[#E5E7EB]" : ""}
              `}
                        >
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <label className="text-sm font-normal text-[#4A5565]">
              Reports / Receipt Register
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-stretch" >

          <div
            className="datepicker-wrapper"
            style={{ position: "relative", }}
          >
            <RangePicker
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                fontFamily: "Gilroy",

              }}
              format="DD/MM/YYYY"
              placeholder={["From date", "To date"]}
              value={
                selectedRange?.from && selectedRange?.to
                  ? [dayjs(selectedRange.from), dayjs(selectedRange.to)]
                  : null
              }
              onChange={handleDateChange}
              disabledDate={(current) => {

                if (current && current > dayjs().endOf("day")) {
                  return true;
                }
                return false;
              }}

              getPopupContainer={(triggerNode) =>
                triggerNode.closest(".datepicker-wrapper")
              }
            />
          </div>

          <button onClick={handleClickFilter}
            className="h-[36px] flex items-center gap-2 px-4 border rounded-lg text-sm font-gilroy"
          >
            <Filter size="16" />
            Filter
          </button>
          <button
            className="h-[36px] flex items-center gap-2 px-4 bg-[#1E45E1] text-white rounded-lg text-sm font-gilroy"
          >
            <Export size="16" />
            Export
          </button>
        </div>

      </div>
      <div className="px-1 pb-[20px] bg-[#F9FAFB] rounded-lg h-fit py-0 flex flex-col ">
        {chips.length > 0 && (
          <div className="me-3 ms-3 mt-3 flex items-start gap-3 p-3 rounded-[10px] bg-[#FFFFFF] border border-[#E5E7EB] font-[Gilroy,sans-serif]">


            <div className="flex flex-1 gap-2 flex-wrap overflow-y-auto min-w-0">
              {chips.map((chip) => (
                <div key={chip.key}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] rounded-full text-[12px] font-medium text-[#1F2937] border border-[#E0E7FF] shrink-0">
                    {chip.label} :
                    <span className="text-[12px] font-medium text-[#16151C]">
                      {chip.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>


            <span
              onClick={handleReset}
              className="text-[#1E45E1] text-[13px] font-medium cursor-pointer whitespace-nowrap"
            >
              Reset
            </span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3 ms-1 me-1 ">
          {stats?.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#E5E7EB] h-[110px]"
            >
              <div className='flex justify-between '>

                <label className="text-sm font-semibold text-[#4A5565]">
                  {item.title}
                </label>
                {item.up && (
                  <span className="text-xs text-[#008236] bg-[#F0FDF4] h-fit rounded-lg px-2 py-1">
                    ↑ {item.up}
                  </span>
                )}
                {item.down && (
                  <span className="text-xs text-[#C10007] bg-[#FEF2F2] h-fit  rounded-lg px-2 py-1">
                    ↓ {item.down}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <h2 className="text-2xl font-semibold text-[#101828]">
                  {item.value}
                </h2>


              </div>
              {item.link && (
                <p className="text-xs text-[#155DFC]  cursor-pointer">
                  Click to filter
                </p>
              )}
            </div>
          ))}
        </div>


        <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
          <div ref={tableRef} className=" overflow-y-auto relative max-h-[400px] rounded-xl ">
            <table className="w-full  text-[12px] font-gilroy">

              <thead className="bg-[#F9FAFB] text-[#6B7280] sticky top-0 z-30 rounded-tl-xl  rounded-tr-xl">
                <tr className="border-b border-[#E8E8E8]">


                  <th className="px-4 py-2.5 text-left font-semibold sticky left-0 z-40 bg-[#F9FAFB] w-[40px] rounded-tl-xl">
                    <Setting3
                      onClick={() => setOpen(!open)}
                      className="cursor-pointer"
                      size="18"
                      color="#4B4B4B"
                    />
                  </th>


                  <th className="px-4 py-2.5 text-left font-semibold  sticky left-[42px] z-30 bg-[#F9FAFB] w-[140px] uppercase">
                    Receipt No
                  </th>


                  <th className="px-4 py-2.5 text-left font-semibold sticky left-[170px] z-30 bg-[#F9FAFB] w-[200px] uppercase ">
                    date
                  </th>


                  <th className="px-4 py-2.5 text-center font-semibold  uppercase">

                    Name

                  </th>


                  <th className="px-4 py-2.5 text-center font-semibold w-[200px] uppercase">
                    Invoice No
                  </th>



                  <th className="px-4 py-2.5 text-center font-semibold uppercase">
                    <div className="flex justify-center items-center gap-1">
                      Amount
                      <ArrowSwapVertical size="16" color="#4B4B4B" />
                    </div>
                  </th>
                  <th className="px-4 py-2.5 text-center font-semibold uppercase">
                    <div className="flex justify-center items-center gap-1">
                      Payment Made
                      <ArrowSwapVertical size="16" color="#4B4B4B" />
                    </div>
                  </th>

                  <th className="px-4 py-2.5 text-center font-semibold uppercase rounded-tr-xl" >
                    <div className="flex justify-center items-center gap-1">
                      Collected BY
                      <ArrowSwapVertical size="16" color="#4B4B4B" />
                    </div>
                  </th>



                </tr>
              </thead>


              <tbody>
                {receiptRegister?.data?.length > 0 ? receiptRegister?.data?.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-none  transition"
                  >
                    <td className="px-4 py-2.5 sticky left-0 z-20 bg-white w-[40px]"></td>
                    <td
                      className="px-4 py-2.5 text-[#1E45E1] font-semibold truncate whitespace-nowrap sticky 
                      left-[42px] z-20 bg-white w-[140px]"
                      title={row.receiptNo}
                    >
                      {row.receiptNo}
                    </td>


                    <td className="px-4 py-2.5 sticky left-[170px] z-20 bg-white w-[200px]">
                      <div className="flex items-center gap-2">

                        <span
                          className="truncate whitespace-nowrap font-semibold text-[#111928]"
                          title={row.date}
                        >
                          {row.date}
                        </span>
                      </div>
                    </td>

                    <td
                      className={`px-4 py-2.5 text-center font-semibold truncate whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                      title={row.customerName}
                    >
                      {row.customerName}
                    </td>

                    <td
                      className={`px-4 py-2.5 text-center text-[#6B7280] truncate whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                    >
                      {row.invoiceNumber}
                    </td>

                    <td
                      className={`px-4 py-2.5 text-center text-[#6B7280] truncate font-medium transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                    >
                      ₹ {row.amount}
                    </td>

                    <td
                      className={`px-4 py-2.5 text-center font-semibold truncate text-[#222222] transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                    >
                      ₹ {row.paymentMade}
                    </td>

                    <td
                      className={`px-4 py-2.5 text-center font-semibold truncate text-[#222222] transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                    >
                      {row.collectedBy}
                    </td>




                  </tr>
                ))
                  : (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-10 text-center text-sm text-red-800 font-semibold"
                      >
                        No Data Found
                      </td>
                    </tr>
                  )}
              </tbody>

            </table>
          </div>

          {
            receiptRegister?.data?.length > 0 &&

            <ApiPagination
              currentPage={currentPage + 1}
              totalPages={totalPages}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
              onSizeChange={handleSizeChange}
            />
          }


          {open && (
            <>

              <div
                className="fixed inset-0 bg-black/20 z-40 "
                onClick={() => setOpen(false)}
              />


              <div
                className={`
              fixed top-[250px] left-[250px] h-fit w-[280px]
              bg-white z-50
              border-r border-[#E5E7EB]
              shadow-xl  rounded-xl border border-[#E5E7EB] shadow-xl
              transform transition-transform duration-300 ease-in-out
              ${open ? "translate-x-0" : "-translate-x-full"}
            `}
              >





                <div className="p-3 border-b">
                  <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                    <SearchNormal1 size={16} color="#98A2B3" />
                    <input
                      placeholder="Search"
                      className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
                    />
                  </div>
                </div>


                <div className="max-h-[220px] overflow-y-auto px-3 py-2 space-y-2 show-scrolls">
                  {options.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={item.checked}
                        className="w-4 h-4 accent-[#1E45E1] rounded"
                      />
                      <span className="text-[#101828]">
                        {item.label}
                      </span>
                    </label>
                  ))}
                </div>


                <div className="p-3 border-t flex gap-2">
                  <button
                    className="flex-1 py-2 text-sm border rounded-lg text-[#344054]"
                  >
                    Reset
                  </button>
                  <button
                    className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg"
                  >
                    Apply Filters
                  </button>
                </div>

              </div>
            </>
          )}

        </div>


      </div>
      {
        invoiceFilter && <ReceiptFilter show={invoiceFilter} handleClose={handleCloseFilterBills} size={size} page={page} startDate={startDate} endDate={endDate} />
      }
    </div>
  )
}

export default ReceiptRegister