
import React, { useEffect, useState } from 'react';
import {
    Calendar,
    Filter,
    Export, ArrowLeft
} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';



function InvoiceRegister() {




    const { RangePicker } = DatePicker;

    const [selectedRange, setSelectedRange] = useState(null);

    useEffect(() => {
        setSelectedRange({
            from: dayjs().startOf("month").toDate(),
            to: dayjs().endOf("month").toDate(),
        });
    }, []);

    const stats = [
        { title: "Total Invoices", value: "32" },
        { title: "Total Amount", value: "₹61,500", up: "12%" },
        { title: "Paid Amount", value: "₹19,500", up: "8%", link: true },
        { title: "Outstanding", value: "₹42,000", down: "5%", link: true },
    ];

    const invoices = [
        {
            no: "INV-01-26-002",
            name: "Murugan N",
            type: "Advance",
            date: "18 Dec 2025",
            dueDate: "18 Dec 2025",
            amount: "₹9,300",
            due: "₹0.00",
            status: "paid",
        },
        {
            no: "ADV-003",
            name: "Wilson Calzoni",
            type: "Advance",
            date: "18 Dec 2025",
            dueDate: "18 Dec 2025",
            amount: "₹8,100",
            due: "₹2,000",
            status: "partial",
        },
        {
            no: "INV-203",
            name: "Wilson",
            type: "Rental",
            date: "18 Dec 2025",
            dueDate: "18 Dec 2025",
            amount: "₹6,000",
            due: "₹6,000",
            status: "overdue",
        },
    ];

    const statusColor = {
        paid: "bg-green-500",
        partial: "bg-yellow-400",
        overdue: "bg-red-500",
    };








    return (
        <div className="font-gilroy p-1 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className='flex items-center gap-2'>
                    <ArrowLeft
                        size="20"
                        color="#4A5565"
                    />
                    <div>
                        <h1 className="text-xl font-semibold">Invoice Register</h1>
                        <p className="text-sm text-gray-500">
                            Reports / Invoice Register
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">

                    <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", }}
                    >
                        <RangePicker
                            style={{
                                width: "100%",
                                height: 48,
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
                            onChange={(dates) => {

                                if (dates) {
                                    setSelectedRange({
                                        from: dates[0].toDate(),
                                        to: dates[1].toDate(),
                                    });
                                } else {
                                    setSelectedRange(null);
                                }
                            }}
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

                    <button className="flex items-center gap-2 px-4 py-1 border rounded-lg text-sm">
                        <Filter size="16" />
                        Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-1 bg-[#1E45E1] text-white rounded-lg text-sm">
                        <Export size="16" />
                        Export
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {stats.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-xl p-4 shadow-sm"
                    >
                        <p className="text-sm text-gray-500">
                            {item.title}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <h2 className="text-xl font-semibold">
                                {item.value}
                            </h2>
                            {item.up && (
                                <span className="text-xs text-green-600">
                                    ↑ {item.up}
                                </span>
                            )}
                            {item.down && (
                                <span className="text-xs text-red-500">
                                    ↓ {item.down}
                                </span>
                            )}
                        </div>
                        {item.link && (
                            <p className="text-xs text-blue-600 mt-1 cursor-pointer">
                                Click to filter
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white mt-6 rounded-xl shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="px-4 py-3 text-left">Invoice No</th>
                            <th className="px-4 py-3 text-left">Name</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Invoice Date</th>
                            <th className="px-4 py-3">Due Date</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Due</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoices.map((row, i) => (
                            <tr
                                key={i}
                                className="border-b last:border-none hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 text-blue-600 font-medium">
                                    {row.no}
                                </td>
                                <td className="px-4 py-3">
                                    {row.name}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {row.type}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {row.date}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {row.dueDate}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {row.amount}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {row.due}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full ${statusColor[row.status]}`}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default InvoiceRegister;