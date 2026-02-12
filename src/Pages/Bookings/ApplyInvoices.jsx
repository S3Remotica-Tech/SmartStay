
/* eslint-disable react-hooks/exhaustive-deps */
import React, { 
    // useEffect, 
    useState } from 'react';
import { Modal, Button, Table, Form } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

const initialData = [
    {
        type: "Rental",
        invNo: "#INV-987",
        dueDate: "11 Dec 2025",
        invoiceAmount: 4500,
        invoiceBalance: 4500,
        applyAmount: "",
    },
    {
        type: "Advance",
        invNo: "#ADV-287",
        dueDate: "12 Dec 2025",
        invoiceAmount: 5000,
        invoiceBalance: 5000,
        applyAmount: "",
    },
];





function ApplyBookingModal({ show, handleClose }) {


    const [sortedData, setSortedData] = useState(initialData);

    const handleApplyAmountChange = (index, value) => {
        if (value === "") {
            const updatedData = [...sortedData];
            updatedData[index].applyAmount = "";
            setSortedData(updatedData);
            return;
        }

        if (!/^\d+$/.test(value)) return;

        const sanitizedValue = value.replace(/^0+(?!$)/, "");

        const updatedData = [...sortedData];
        updatedData[index].applyAmount = sanitizedValue;
        setSortedData(updatedData);
    };











    return (
        <Modal show={show} onHide={handleClose} centered size="lg">
            <div className="font-gilroy p-4">
                <div className="flex justify-between items-center mb-4" >
                    <h5 className="m-0 font-semibold text-base">
                        Apply Booking to Invoice
                    </h5>

                    <span className="cursor-pointer text-lg font-medium text-red-500" 
                        onClick={handleClose}
                    >
                        ✕
                    </span>
                </div>


                <div className='flex justify-between items-center bg-gray-50 p-4 rounded mb-4'>
                    <div className="flex gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                            SK
                        </div>

                        <div>
                            <div className="font-medium text-lg text-gray-800">Ravi Kumar</div>
                            <div className="text-xs">
                                <span className="bg-yellow-100 text-[10px] text-gray-900 px-3 py-1.5 rounded-md">First Floor 
                                </span>
                                &nbsp; | &nbsp;
                                 <span className="bg-[#FFE0D9] text-[10px] text-[#222222] px-[14px] py-[6px] rounded-[10px]"> G105 - B02</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="text-xs text-gray-400">
                            Booking Amount
                        </div>
                        <div className="flex items-center gap-2 font-semibold">

                            <div>
                                <label>₹500</label>
                            </div>
                            <Button className="bg-[#16A34A] border-0 font-medium px-[11px] py-[6px] text-[10px]" >
                                Apply
                            </Button>
                        </div>
                    </div>


                </div>


                <Table
                    responsive="md"
                >

                    <thead className='sticky top-0 z-10 bg-gray-50 text-gray-400 text-xs font-medium'>
                        <tr>
                            <th className="align-middle text-left text-gray-400 text-xs font-medium">TYPE </th>

                            <th className="text-left text-gray-400 text-xs font-medium" >INV NO </th>

                            <th className="text-left text-gray-400 text-xs font-medium" > DUE DATE</th>

                            <th className="text-left text-gray-400 text-xs font-medium">INVOICE AMOUNT </th>

                            <th className="text-left text-gray-400 text-xs font-medium"> INVOICE BALANCE </th>

                            <th className="text-left text-gray-400 text-xs font-medium">AMOUNT TO APPLY </th>

                        </tr>
                    </thead>



                    <tbody>
                        {sortedData && sortedData.length > 0 ? (
                            sortedData.map((item, index) => (
                                <tr key={index} style={{ fontSize: 14, }}>
                                    <td>{item.type}</td>

                                    <td className='!text-[#2563EB] cursor pointer'>
                                        {item.invNo}
                                    </td>

                                    <td>{item.dueDate}</td>

                                    <td className='font-semibold'>
                                        ₹{item.invoiceAmount.toFixed(2)}
                                    </td>

                                    <td>₹{item.invoiceBalance.toFixed(2)}</td>


                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={item.applyAmount}
                                            onChange={(e) =>
                                                handleApplyAmountChange(index, e.target.value)
                                            }
                                            placeholder="₹ 0.00"
                                              className={`text-sm h-[34px] text-left rounded-md border border-gray-200 pr-[10px] shadow-none ${item.applyAmount ? 'font-semibold' : 'font-medium'}`}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-5">
                                    No invoices found
                                </td>
                            </tr>
                        )}
                    </tbody>


                </Table>


                <div className="mt-6 flex justify-end w-full"
                >
                    <div className="bg-gray-100 px-5 py-3 rounded-[10px]">
                        <div className="flex justify-between mb-2 gap-2.5"
                        >
                            <div className="text-xs text-[#64748B]">
                                Amount Applied
                            </div>
                            <div className="font-semibold">₹ 0.00</div>
                        </div>

                        <div
                            className="flex justify-between"
                        >
                            <div className="text-xs text-[#64748B]">
                                Available Balance
                            </div>
                            <div className="font-semibold ml-4">₹ 500.00</div>
                        </div>
                    </div>
                </div>


                {/* Actions */}
                <div className="mt-6 flex justify-end gap-3"
                >
                    <Button variant="light" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="bg-[#16A34A] border-0 font-medium px-[11px] py-[6px] text-[10px]" >
                        Apply →
                    </Button>
                </div>
            </div>
        </Modal>
    );
}
ApplyBookingModal.propTypes = {
  show: PropTypes.bool,        
  handleClose: PropTypes.func.isRequired,
};

export default ApplyBookingModal;
