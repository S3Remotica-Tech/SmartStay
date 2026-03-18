
/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircle, DocumentText } from 'iconsax-react';
import React, {
    // useEffect, 
    useState
} from 'react';
import { Modal } from "react-bootstrap";
// import { useDispatch, useSelector } from 'react-redux';

function DiscountInvoice({ show, handleClose }) {
    const [discountInput, setDiscountInput] = useState("");





    const handleDiscountChange = (e) => {
        setDiscountInput(e.target.value)
    }


    const handleSet = () => {
        setDiscountInput(500)
    }

    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className='font-gilroy'>


            <div className="flex justify-between items-center px-4 pt-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                    Late Fee Invoice
                </h2>

                <button onClick={handleClose} className="text-red-500 text-xl">
                    <CloseCircle />
                </button>
            </div>

            <div className='flex justify-between items-center bg-[#F7F8FCA8] px-4 py-2.5 rounded mb-2'>
                <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                        SK
                    </div>

                    <div>
                        <div className="font-medium text-lg text-gray-800 mb-1">Ravi Kumar</div>
                        <div className="text-xs">
                            <span className="bg-yellow-100 text-[10px] text-gray-900 px-3 py-1.5 rounded-md">First Floor
                            </span>
                            &nbsp; | &nbsp;
                            <span className="bg-[#FFE0D9] text-[10px] text-[#222222] px-[14px] py-[6px] rounded-[10px]"> G105 - B02</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-[#4B4B4B] font-semibold mb-1 ">
                        Fine Amount
                    </div>
                    <div className="flex items-center gap-2 font-semibold">

                        <div>
                            <label className='text-[#222222] text-[18px] font-semibold'>₹500</label>
                        </div>

                    </div>
                </div>


            </div>


            <div className="px-4 py-2">
                <p className="text-sm font-medium mb-2">Unpaid Invoices</p>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
                            <tr>
                                <th className="text-left px-3 py-2">INVOICE OF</th>
                                <th className="text-left px-3 py-2">DUE DATE</th>
                                <th className="text-left px-3 py-2">FINE AMOUNT</th>
                                <th className="text-left px-3 py-2">OVERDUE DURATION</th>
                                <th className="text-left px-3 py-2">
                                    AMOUNT TO APPLY (DISCOUNT)
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-t">
                                <td className="px-3 py-2 text-blue-600 font-semibold">
                                    #INV-987
                                </td>
                                <td className="px-3 py-2 text-gray-500">11 Feb 2025</td>
                                <td className="px-3 py-2 font-semibold">₹400.00</td>
                                <td className="px-3 py-2 text-gray-500">12 - 20 Feb 2026</td>

                                <td className="px-3 py-2">
                                    <div className="flex items-center border rounded-md overflow-hidden w-full">


                                        <input
                                            type="number"
                                            value={discountInput}
                                            onChange={(e) => handleDiscountChange(e)}
                                            placeholder="₹ 0.00"
                                            className="w-full px-2 py-1 text-sm outline-none"
                                        />

                                        {!discountInput && (
                                            <button
                                                onClick={() => handleSet()}
                                                className="bg-blue-100 text-blue-600 text-xs px-2 py-1 hover:bg-blue-200"
                                            >
                                                Set
                                            </button>
                                        )}

                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="flex justify-end h-fit w-full  px-10 whitespace-nowrap">
                <div className="bg-gray-50 p-4 rounded-lg w-full max-w-sm text-sm grid grid-cols-2 gap-y-2">


                    <span className="text-[#4B4B4B] break-words">
                        Invoice Amount (#INV-987)
                    </span>
                    <span className="font-semibold text-right whitespace-nowrap">
                        ₹
                    </span>


                    <span className="text-[#4B4B4B] break-words">
                        Amount Applied
                    </span>
                    <span className="font-semibold text-right whitespace-nowrap">
                        ₹ {discountInput || "0.00"}
                    </span>


                    <span className="text-[#4B4B4B] break-words font-medium">
                        Total
                    </span>
                    <span className="font-semibold text-right whitespace-nowrap">
                        ₹
                    </span>

                </div>
            </div>


            <div className="flex justify-end gap-3 px-5 py-4 border-t">
                <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm border rounded-md bg-gray-100 hover:bg-gray-200"
                >
                    Cancel
                </button>
 
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                  <DocumentText size={18} />  Generate Invoice
                </button>
            </div>

        </Modal>
    );
}

export default DiscountInvoice;