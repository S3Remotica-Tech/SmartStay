
/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircle, DocumentText } from 'iconsax-react';
import React, {
    useEffect,
    useState
} from 'react';
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../Components/ErrorMessage'


function DiscountInvoice({ show, handleClose }) {


    const state = useSelector((state) => state);
    const [discountInput, setDiscountInput] = useState("");
    const [discountInputError, setDiscountInputError] = useState("");
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false)
    const pdfDetails = state.InvoiceList?.particularBillsDetails

    const handleDiscountChange = (e) => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        dispatch({ type: 'RMOVE_INVOICE_DISCOUNT_REDUCER_ERROR' })
        setDiscountInputError('')
        setDiscountInput(e.target.value)
    }

    const total = parseFloat(pdfDetails?.invoiceInfo?.totalAmount) || 0;
    const discount = parseFloat(discountInput) || 0;

    const payableAmount = total - discount;
    console.log("Discount", pdfDetails)


    const handleApplyInvoices = () => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        dispatch({ type: 'RMOVE_INVOICE_DISCOUNT_REDUCER_ERROR' })
        setDiscountInputError('')
        if (!discountInput) {
            setDiscountInputError("Please Enter Discount Amount")
        }
        if (discountInput && pdfDetails?.invoiceId && state.login?.selectedHostel_Id) {
            dispatch({
                type: 'INVOICE_DISCOUNT_SAGA',
                payload: {
                    hostelId: state.login?.selectedHostel_Id,
                    invoiceId: pdfDetails?.invoiceId,
                    discountAmount: discountInput,
                    // discountPercentage: ,
                    // reason: ,
                }
            })
            setFormLoading(true)
        }
    }


    useEffect(() => {
        if (state.InvoiceList?.makeDiscountError) {
            setFormLoading(false)
        }


    }, [state.InvoiceList?.makeDiscountError])

    useEffect(() => {
        if (state.createAccount?.networkError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])


    useEffect(() => {
        return () => {
            setDiscountInputError('')
            dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            dispatch({ type: 'RMOVE_INVOICE_DISCOUNT_REDUCER_ERROR' })
        }
    }, [])






    return (
        <Modal show={show} onHide={handleClose} centered size="lg" className='font-gilroy'>

            {formLoading && (
                <div className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-75">
                    <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent"></div>
                </div>
            )}
            <div className="flex justify-between items-center px-4 pt-4 py-2 border-b">
                <h2 className="text-lg font-semibold text-gray-800">
                    Discount Invoice
                </h2>

                <button onClick={handleClose} className="text-red-500 text-xl">
                    <CloseCircle />
                </button>
            </div>

            <div className='flex justify-between items-center bg-[#F7F8FCA8] px-4 py-2.5 rounded mb-2'>
                <div className="flex gap-3">
                    {
                       pdfDetails?.customerInfo?.profilePic ? 
                       <img src={pdfDetails?.customerInfo?.profilePic} alt="image"  className='h-14 w-14 '/> 
                       :
                        <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                        {pdfDetails?.customerInfo?.initials}
                    </div>
                    }
                   

                    <div>
                        <div className="font-medium text-lg text-gray-800 mb-1">{pdfDetails?.customerInfo?.fullName}</div>
                        <div className="text-xs">
                            <span className="bg-yellow-100 text-[10px] text-gray-900 px-3 py-1.5 rounded-md">{pdfDetails?.stayInfo?.floorName}
                            </span>
                            &nbsp; | &nbsp;
                            <span className="bg-[#FFE0D9] text-[10px] text-[#222222] px-[14px] py-[6px] rounded-[10px]">
                                {pdfDetails?.stayInfo?.roomName}
                                - {pdfDetails?.stayInfo?.bedName}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="text-[14px] text-[#4B4B4B] font-semibold mb-1 ">
                        Amount
                    </div>
                    <div className="flex items-center gap-2 font-semibold">

                        <div>
                            <label className='text-[#222222] text-[18px] font-semibold'>₹ {pdfDetails?.invoiceInfo?.totalAmount}</label>
                        </div>

                    </div>
                </div>


            </div>


            <div className="px-4 py-2">
                <p className="text-sm font-medium mb-2">For Invoices</p>

                <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
                            <tr>
                                <th className="text-left px-3 py-2">INVOICE OF</th>
                                <th className="text-left px-3 py-2">DUE DATE</th>
                                <th className="text-left px-3 py-2">AMOUNT</th>
                                <th className="text-left px-3 py-2">OVERDUE ON</th>
                                <th className="text-left px-3 py-2">
                                    AMOUNT TO APPLY (DISCOUNT)
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-t">
                                <td className="px-3 py-2 text-blue-600 font-semibold">
                                    {pdfDetails?.invoiceNumber}
                                </td>
                                <td className="px-3 py-2 text-gray-500">{pdfDetails?.dueDate}</td>
                                <td className="px-3 py-2 font-semibold">₹ {pdfDetails?.invoiceInfo?.totalAmount}</td>
                                <td className="px-3 py-2 text-gray-500">-</td>

                                <td className="px-3 py-2">
                                    <div className="flex items-center border rounded-md overflow-hidden w-full">


                                        <input
                                            type="number"
                                            value={discountInput}
                                            onChange={(e) => handleDiscountChange(e)}
                                            placeholder="₹ 0.00"
                                            className="w-full px-2 py-1 text-sm outline-none"
                                        />



                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {discountInputError &&
                    <ErrorMessage message={discountInputError} type="error" />
                }

                {
                    state.InvoiceList?.makeDiscountError &&
                    <ErrorMessage message={state.InvoiceList?.makeDiscountError} type="error" />
                }

            </div>


            <div className="flex justify-end h-fit w-full  px-10 whitespace-nowrap">
                <div className="bg-gray-50 p-4 rounded-lg w-full max-w-sm text-sm grid grid-cols-2 gap-y-2">


                    <span className="text-[#4B4B4B] break-words">
                        Invoice Amount ({pdfDetails?.invoiceNumber})
                    </span>
                    <span className="font-semibold text-right whitespace-nowrap">
                        ₹ {pdfDetails?.invoiceInfo?.totalAmount}
                    </span>


                    <span className="text-[#4B4B4B] break-words">
                        Discount Applied
                    </span>
                    <span className="font-semibold text-right whitespace-nowrap">
                        ₹ {discountInput || "0.00"}
                    </span>


                    <span className="text-[#4B4B4B] break-words font-medium">
                        Total Payable
                    </span>
                    <span className="font-semibold text-right whitespace-nowrap">
                        ₹ {payableAmount}
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

                <button disabled={formLoading} onClick={handleApplyInvoices} className="px-4 py-2 text-sm bg-[#1E45E1] text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                    <DocumentText size={18} />  Save Changes
                </button>
            </div>

        </Modal>
    );
}

export default DiscountInvoice;