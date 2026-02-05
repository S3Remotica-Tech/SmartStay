
import React, { useEffect, useState, useRef } from 'react';
import {
    Filter,
    Export, ArrowLeft,
    ArrowSwapVertical, Setting3, SearchNormal1,
    ArrowDown,
    ArrowDown2

} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BillsFilter from '../../Pages/Bills/BillsFilter';
import PaginationList from "../../Components/PaginationList";
import InvoiceRegisterFilter from './InvoiceRegisterFilter';


function InvoiceRegister() {


    const navigate = useNavigate();
    const state = useSelector(state => state)
    const { RangePicker } = DatePicker;
    const [open, setOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState(null);
    const [register, setRegister] = useState(false)
    const [invoiceFilter, setInvoiceFilter] = useState(false)
    const dropdownRef = useRef(null);
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [invoiceRegister, setInvoiceRegister] = useState('')
    const [chips, setChips] = useState([])


    const handleCloseFilterBills = () => {
        setInvoiceFilter(false)
    }

    // console.log("invoiceRegister", invoiceRegister)


    useEffect(() => {
        if (state.login?.selectedHostel_Id) {

            dispatch({ type: 'GET_REPORTS_INVOICE_REGISTER_SAGA', payload: { hostelId: state.login.selectedHostel_Id, filters: {} } })
            //  setLoading(true)
        }
    }, [state.login?.selectedHostel_Id])



    useEffect(() => {
        if (state.reports.getInvoiceRegisterSuccess === 200) {
            setLoading(false)
            setInvoiceRegister(state?.reports?.getInvoiceRegister)
            setInvoiceFilter(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_REPORTS_INVOICE_REGISTER_REDUCER',  })
            }, 100)
        }

    }, [state.reports.getInvoiceRegisterSuccess])




    useEffect(() => {
        // setSelectedRange({
        //     from: dayjs().startOf("month").toDate(),
        //     to: dayjs().endOf("month").toDate(),
        // });
    }, []);


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

    const stats = [
        { title: "Total Invoices", value: state?.reports?.getInvoiceRegister?.totalInvoices },
        { title: "Total Amount", value: state?.reports?.getInvoiceRegister?.totalAmount, up: "12%" },
        { title: "Paid Amount", value: state?.reports?.getInvoiceRegister?.paidAmount, up: "8%", link: true },
        { title: "Outstanding", value: state?.reports?.getInvoiceRegister?.outStandingAmount, down: "5%", link: true },
    ];





    const handleNavigateReports = () => {
        navigate(`/reports/${state.login.selectedHostel_Id}`)
        dispatch({
            type: "SET_INVOICE_REGISTER_FILTERS",
            payload: {
                startDate: undefined,
                endDate: undefined,
                invoiceTypes: [],
                createdBy: [],
                invoiceModes: [],
                paymentStatus: [],
                search: "",
            },
        })
    }

    const handleClickFilter = () => {
        setInvoiceFilter(true)
    }

    const handleReset = () => {
        dispatch({
            type: "SET_INVOICE_REGISTER_FILTERS",
            payload: {
                startDate: undefined,
                endDate: undefined,
                invoiceTypes: [],
                createdBy: [],
                invoiceModes: [],
                paymentStatus: [],
                search: "",
            },
        })
        dispatch({ type: 'GET_REPORTS_INVOICE_REGISTER_SAGA', payload: { hostelId: state.login.selectedHostel_Id } })
    }



const handleNavigateBillsPdf = (row) =>{
     dispatch({ type: 'GETPARTICULARBILLSDETAILS', payload: { hostelId: row.hostelId, invoiceId: row.invoiceId } })

      navigate(`/invoice/details/${row.invoiceId}`, {
        state: {
          rowData: row
        },
      });
}




    const statusColor = {
        PAID: "bg-[#D9FFD9] text-[#065F46]",
        PENDING: "bg-[#FFD9D9] text-[#7A1C1C]",
        PARTIAL_PAYMENT: "bg-[#FFD9D9] text-[#7A1C1C]",
        REFUNDED: "bg-[#FFF3CD] text-[#8B8000]",
        PARTIALLY_REFUNDED: "bg-[#FFF3CD] text-[#8B8000]",
        PENDING_REFUND: "bg-[#FFE6B3] text-[#b45309]",
    };





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
    const reportCards = [
        { title: "Receipt Register" },
        { title: "Bank Transaction Register" },
        { title: "Tenant Register" },
        { title: "Occupancy" },
        { title: "Expense Register" },
        { title: "Vendor Ledger" },
        { title: "Electricity Billing Register" },
        { title: "Complaint Register" },
        { title: "Request Register" },
        { title: "Final Settlement" },
        //  { title: "Invoice Register" },
    ];



    const handleNavigateRegister = (item) => {
        setRegister(false)

        if (item?.title === "Tenant Register") {
            navigate(`/reports/tenant-register`)
        } else if (item?.title === "Receipt Register") {
            navigate(`/reports/receipt-register`)
        } else if (item?.title === "Bank Transaction Register") {
            navigate(`/reports/bank-transaction-register`)
        } else if (item?.title === "Occupancy") {
            navigate(`/reports/occupancy-register`)
        } else if (item?.title === "Expense Register") {
            navigate(`/reports/expense-register`)
        } else if (item?.title === "Vendor Ledger") {
            navigate(`/reports/vendor-register`)
        } else if (item?.title === "Electricity Billing Register") {
            navigate(`/reports/electricity-billing-register`)
        } else if (item?.title === "Complaint Register") {
            navigate(`/reports/complaint-register`)
        } else if (item?.title === "Request Register") {
            navigate(`/reports/request-register`)
        } else if (item?.title === "Final Settlement") {
            navigate(`/reports/final-settlement-register`)
        } else if (item?.title === "Invoice Register") {
            navigate(`/reports/invoice-register`)
        }

        dispatch({
            type: "SET_INVOICE_REGISTER_FILTERS",
            payload: {
                startDate: undefined,
                endDate: undefined,
                invoiceTypes: [],
                createdBy: [],
                invoiceModes: [],
                paymentStatus: [],
                search: "",
            },
        })
    }


    
    useEffect(() => {
        const invoiceFilters = state.reports.invoiceRegisterFilters;
        const filterData = [];


        if (invoiceFilters?.paymentStatus?.length) {
            filterData.push({
                key: "payment-status",
                label: "Status is",
                type: "paymentStatus",
                value: invoiceFilters.paymentStatus.join(", "),
            });
        }


        if (invoiceFilters?.invoiceTypes?.length) {
            filterData.push({
                key: "type",
                label: "Type is",
                type: "type",
                value: invoiceFilters.invoiceTypes.join(", "),
            });
        }


        if (invoiceFilters?.invoiceModes?.length) {
            filterData.push({
                key: "modes",
                label: "Mode is",
                type: "modes",
                value: invoiceFilters.invoiceModes.join(", "),
            });
        }





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


        if (invoiceFilters?.search) {
            filterData.push({
                key: "search",
                label: "Tenant",
                type: "search",
                value: invoiceFilters.search,
            });
        }

        setChips(filterData);
    }, [state.reports.invoiceRegisterFilters]);











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
                            <h1 className="text-lg font-semibold my-0 text-[#222222]">Invoice Register</h1>
                            <div className='rounded-none border-0'>
                                <ArrowDown2
                                    size="18"
                                    color="#1E45E1"
                                    className={`cursor-pointer transition-transform duration-200 ${register ? "rotate-180" : ""
                                        }`}
                                />
                                {register && (
                                    <div ref={dropdownRef} className="absolute z-40 mt-2 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]">
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
                            Reports / Invoice Register
                        </label>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 items-stretch" style={{ height: 36 }}>

                    <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", }}
                    >
                        <RangePicker disabled
                            style={{
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                                fontFamily: "Gilroy",

                            }}
                            format="DD/MM/YYYY"
                            placeholder={["From date", "To date"]}
                            // value={
                            //     selectedRange?.from && selectedRange?.to
                            //         ? [dayjs(selectedRange.from), dayjs(selectedRange.to)]
                            //         : null
                            // }
                            // onChange={(dates) => {

                            //     if (dates) {
                            //         setSelectedRange({
                            //             from: dates[0].toDate(),
                            //             to: dates[1].toDate(),
                            //         });
                            //     } else {
                            //         setSelectedRange(null);
                            //     }
                            // }}
                            disabledDate={(current) => {
                                if (!selectedRange?.from) return current > dayjs().endOf("day");
                                return (
                                    current > dayjs().endOf("day") ||
                                    current < dayjs(selectedRange.from).startOf("day")
                                );
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


            <div className="px-1 pb-1 bg-[#F9FAFB] rounded-lg h-fit flex flex-col overflow-hidden">
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
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl p-3 shadow-sm border border-[#E5E7EB] h-[130px]"
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




                <div className="bg-white mt-4 rounded-xl shadow-sm border border-[#E8E8E8] ms-1 me-1 flex-1 ">

                    <div className="overflow-y-auto  max-h-[400px] relative ">
                        <table className="w-full  text-[12px] font-gilroy">

                            <thead className="bg-[#F9FAFB] text-[#6B7280] sticky top-0 z-30 rounded-tl-xl  rounded-tr-xl">
                                <tr className="border-b border-[#E8E8E8]">


                                    <th className=" px-4 py-2.5 text-left font-semibold sticky left-0 z-40 bg-[#F9FAFB] w-[40px]  rounded-tl-xl">
                                        <Setting3
                                            onClick={() => setOpen(!open)}
                                            className="cursor-pointer"
                                            size="18"
                                            color="#4B4B4B"
                                        />
                                    </th>


                                    <th className="px-4 py-2.5 text-left font-semibold  sticky left-[40px] z-30 bg-[#F9FAFB] w-[140px] "> 
                                                                               INVOICE NO
                                    </th>


                                    <th className="px-4 py-2.5 text-left font-semibold sticky left-[170px] z-30 bg-[#F9FAFB] w-[200px] ">
                                        NAME
                                    </th>


                                    <th className="px-4 py-2.5 text-center font-semibold ">
                                        <div className="flex justify-center items-center gap-1">
                                            TYPE
                                            <ArrowSwapVertical size="16" color="#4B4B4B" />
                                        </div>
                                    </th>


                                    <th className="px-4 py-2.5 text-center font-semibold w-[200px] ">
                                        INVOICE DATE
                                    </th>


                                    <th className="px-4 py-2.5 text-center font-semibold ">
                                        DUE DATE
                                    </th>


                                    <th className="px-4 py-2.5 text-center font-semibold ">
                                        <div className="flex justify-center items-center gap-1">
                                            AMOUNT
                                            <ArrowSwapVertical size="16" color="#4B4B4B" />
                                        </div>
                                    </th>


                                    <th className="px-4 py-2.5 text-center font-semibold ">
                                        <div className="flex justify-center items-center gap-1">
                                            DUE
                                            <ArrowSwapVertical size="16" color="#4B4B4B" />
                                        </div>
                                    </th>


                                    <th className="px-4 py-2.5 text-center font-semibold rounded-tr-xl">
                                        STATUS
                                    </th>

                                </tr>
                            </thead>


                            <tbody>
                                <PaginationList>
                                    {invoiceRegister?.invoiceList?.length > 0 ? (
                                        invoiceRegister?.invoiceList?.map((row, i) => (
                                            <tr
                                                key={i}
                                                className="border-b last:border-none  transition"
                                            >
                                                <td className="px-4 py-1.5 sticky left-0 z-20 bg-white w-[40px]"></td>
                                                <td 
                                                // onClick={()=> handleNavigateBillsPdf(row)}
                                                    className="cursor-pointer px-4 py-1.5 text-[#1E45E1] font-semibold truncate whitespace-nowrap sticky left-[40px] z-20 bg-white w-[140px]"
                                                    title={row.invoiceNumber}
                                                >
                                                    {row.invoiceNumber}
                                                </td>


                                                <td className="px-4 py-1.5 sticky left-[170px] z-20 bg-white w-[200px]">
                                                    <div className="flex items-center gap-2">
                                                        {row.profilePic ? (
                                                            <img
                                                                src={row.profilePic}
                                                                alt={row.fullName}
                                                                className="w-7 h-7 rounded-full object-cover"

                                                            />
                                                        ) : (
                                                            <div className="w-7 h-7 rounded-full bg-slate-200 text-[#44536A] flex items-center justify-center text-xs font-semibold">
                                                                {row.initials}
                                                            </div>
                                                        )}

                                                        <span
                                                            className="truncate whitespace-nowrap font-semibold text-[#111928]"
                                                            title={row.fullName}
                                                        >
                                                            {row.fullName}
                                                        </span>
                                                    </div>

                                                </td>


                                                <td className="px-4 py-1.5 text-center font-semibold truncate whitespace-nowrap"
                                                    title={row.invoiceType}>
                                                    {row.invoiceType}
                                                </td>


                                                <td className="px-4 py-1.5 text-center text-[#6B7280] truncate whitespace-nowrap">
                                                    {row.invoiceDate}
                                                </td>


                                                <td className="px-4 py-1.5 text-center  text-[#6B7280] truncate font-medium">
                                                    {row.dueDate}
                                                </td>


                                                <td className="px-4 py-1.5 text-center font-semibold truncate text-[#222222]">
                                                    ₹ {row.invoiceAmount}
                                                </td>


                                                <td className="px-4 py-1.5 text-center font-semibold truncate text-[#222222]">
                                                    ₹ {row.dueAmount}
                                                </td>


                                                <td className="px-4 py-1.5 text-center">
                                                    <span
                                                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap
      ${statusColor[row.paymentStatus]}`}
                                                    >
                                                        {row.paymentStatus.replace(/_/g, " ")}
                                                    </span>

                                                </td>

                                            </tr>
                                        ))

                                    ) : (
                                        <tr>
                                            <td
                                                colSpan={9}
                                                className="py-10 text-center text-sm text-gray-600 font-medium"
                                            >
                                                No Data Found
                                            </td>
                                        </tr>
                                    )
                                    }
                                </PaginationList>
                            </tbody>

                        </table>
                    </div>


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



                {
                    invoiceFilter &&
                    <InvoiceRegisterFilter show={invoiceFilter} handleClose={handleCloseFilterBills} invoiceRegisterFilter={true} />
                }
            </div>
        </div>
    );
}
export default InvoiceRegister;