
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
// import Edit from '../../Assets/Images/Edit-blue.png';
// import Delete from '../../Assets/Images/Delete_red.png';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
// import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
// import InvoicePage from "../../Invoice";
import { useNavigate } from "react-router-dom";
import PaginationList from "../../Components/PaginationList";
import {
  Edit,
  Trash,
  DiscountCircle,
  DocumentDownload,
  ReceiptEdit,
  MoneySend
} from "iconsax-react";
import { IoMdMore } from "react-icons/io";

function UserListInvoice(props) {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const popupRef = useRef(null);
  // const [invoicerowsPerPage, setInvoicerowsPerPage] = useState(4);
  // const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  // const [tabletrue, setTableTrue] = useState(true)
  // const [billMode, setBillMode] = useState("New Bill");
  // const [showmanualinvoice, setShowManualInvoice] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");




  const sortedData = React.useMemo(() => {
    return Array.isArray(invoiceFilterddata) ? invoiceFilterddata : [];
  }, [invoiceFilterddata]);




  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoiceResponseList);
  }, [state.UsersList.customerdetails.invoiceResponseList]);



  const handleShowDots = (item, event) => {
    if (activeId === item.id) {
      setActiveId(null);
    } else {
      setActiveId(item.id);
    }
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;
    setPopupPosition({ top: popupTop, left: popupLeft });
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveId(null);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const [BillsForm, setBillsForm] = useState(false)

  const handleEditBill = (item) => {

    // props.handleEditItem(item)
    // setBillsForm(false)

    dispatch({ type: 'USERROOMAVAILABLETRUE' });

  };

  const handleAddBill = () => {

    navigate('/create-bill', { state: { id: state?.UsersList?.customerdetails?.customerId } });
    dispatch({ type: 'USERROOMAVAILABLETRUE' });
  };




  // const handleDeleteBill = (user) => {
  //   props.handleDeleteItem(user.id)
  //   dispatch({ type: 'USERPROFILEBILLTRUE' });

  // };

  const isValidSubscription = state.UsersList?.hotelDetailsinPg?.isSubscriptionActive
  const isExportAllow = isValidSubscription && canReadInvoice


  return (
    <>

      <div className="flex justify-end w-full lg:-mt-[65px] min-h-[45px]">
        {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
          <Button
            onClick={handleAddBill}
            disabled={props.customerAdd || !canWriteInvoice}
            className="!font-gilroy text-sm text-white !font-semibold rounded-md p-2 w-36 whitespace-nowrap !bg-[#1E45E1]"
          >
            + Create Bill
          </Button>
        )}
      </div>

      <div>
        {

          !canReadInvoice ?
            <div className="flex flex-col items-center justify-center min-h-1/2" >

              <ErrorMessage message={['You do not have access to view Bill']} type="warning" />

            </div>

            :


            sortedData?.length > 0 ? (
              <div className="mx-3 bg-white shadow-md max-h-[420px] overflow-y-auto mt-7">
                <Table bordered={false} className="align-middle mb-0">
                  <thead className="bg-[rgba(231,241,255,1)] sticky top-0 z-2">
                    <tr className="text-left">
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Invoice Number</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Invoice Type</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Invoice Date</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Due Date</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Amount</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Due</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Status</th>
                      <th className="font-gilroy text-gray-500 font-bold text-[13px] whitespace-nowrap">Action</th>
                    </tr>
                  </thead>

                  <tbody className="text-xs align-middle font-gilroy">
                    <PaginationList>
                      {sortedData?.map((view) => (

                        <tr key={view.id} className="border-b border-[#F9FAFF] text-left font-gilroy text-[14px] font-medium" >

                          <td className="text-[13px]">
                            {view.invoiceNumber}
                          </td>

                          <td>
                            {view.invoiceType}
                          </td>

                          <td>
                            <span className="text-[13px] rounded-[14px] font-medium font-gilroy">
                              {view?.invoiceGeneratedDate}
                            </span>
                          </td>

                          <td>
                            <span className="text-[13px] rounded-[14px] font-medium font-gilroy">
                              {view?.dueDate}
                            </span>
                          </td>

                          <td className="" >
                            <span className="text-[13px] rounded-[14px] font-medium font-gilroy">
                              {view?.totalAmount}
                            </span>
                          </td>

                          <td className="" >
                            <span className="rounded-[14px] font-medium font-gilroy ">
                              ₹{view.dueAmount}
                            </span>
                          </td>


                          <td >
                            {(view.paymentStatus === "Pending" ||
                              view.paymentStatus === "Partial Payment" ||
                              view.paymentStatus === "Partial payment") && (
                                <span className="bg-red-100 text-black px-3 py-1 rounded-[14px]">
                                  {view.paymentStatus}
                                </span>
                              )}

                            {view.paymentStatus === "Paid" && (
                              <span className="bg-green-100 text-black px-3 py-1 rounded-[14px]">
                                {view.paymentStatus}
                              </span>
                            )}

                            {(view.paymentStatus === "Refunded" ||
                              view.paymentStatus === "Partially Refunded") && (
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-[14px] ">
                                  {view.paymentStatus}
                                </span>
                              )}

                            {view.paymentStatus === "Refund" && (
                              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-[14px] ">
                                {view.paymentStatus}
                              </span>
                            )}

                            {view?.paymentStatus === "Cancelled" && (
                              <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-[14px]">
                                Cancelled
                              </span>
                            )}
                          </td>
                          {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
                            <td className="text-left align-middle border-b border-[#E8E8E8]">
                              <div className="flex flex-wrap gap-2 py-2">
                                <div
                                  className={`flex justify-center items-center relative cursor-pointer 
        ${activeId === view.id ? "z-[1000]" : ""}`}
                                  onClick={(e) => handleShowDots(view, e)}
                                >

                                  <IoMdMore className="text-xl text-[#222222]" />

                                  {activeId === view.id && (
                                    <div
                                      ref={popupRef}
                                      className="fixed z-[1000] w-44 bg-[#F9F9F9] border border-[#EBEBEB] rounded-[10px] overflow-hidden flex flex-col"
                                      style={{
                                        top: popupPosition.top,
                                        left: popupPosition.left - 50,
                                      }}
                                    >

                                     
                                      {(view.invoiceMode === "Recurring" &&
                                        view?.paymentStatus === "Pending") && (
                                          <button
                                            onClick={() => canUpdateInvoice && handleEdit(view)}
                                            disabled={!canUpdateInvoice}
                                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm
      ${canUpdateInvoice
                                                ? "hover:bg-[#EDF2FF] text-[#1E45E1]"
                                                : "opacity-50 cursor-not-allowed text-[#ccc]"
                                              } rounded-t-[10px]`}
                                          >
                                            <Edit size="16" />
                                            Edit
                                          </button>
                                        )}

                                      {/* Unpaid */}
                                      {(view.invoiceMode === "Manual" &&
                                        view?.paymentStatus === "Paid" &&
                                        view.invoiceType === "Rent") && (
                                          <button
                                            disabled={!canWriteInvoice}
                                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm
      ${canWriteInvoice
                                                ? "hover:bg-[#EDF2FF] text-[#1E45E1]"
                                                : "opacity-50 cursor-not-allowed text-[#ccc]"
                                              }`}
                                          >
                                            <Edit size="16" />
                                            Unpaid
                                          </button>
                                        )}

                                      {/* Discount */}
                                      {(view?.invoiceAmount > 0 &&
                                        view?.paymentStatus === "Pending" &&
                                        !view?.isDiscounted &&
                                        (view?.invoiceType === "Rent" ||
                                          view?.invoiceType === "Settlement")) && (
                                          <button
                                            disabled={!canWriteInvoice}
                                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm
      ${canWriteInvoice
                                                ? "hover:bg-[#FFF4F0] text-[#ec400c]"
                                                : "opacity-50 cursor-not-allowed text-[#ccc]"
                                              }`}
                                          >
                                            <DiscountCircle size="16" />
                                            Discount
                                          </button>
                                        )}

                                      {/* Download */}
                                      <button
                                        onClick={() => isExportAllow && handleInvoicepdf(view)}
                                        disabled={!isExportAllow}
                                        className={`flex items-center gap-2 w-full px-3 py-2 text-sm
    ${isExportAllow
                                            ? "hover:bg-gray-100 text-[#222]"
                                            : "opacity-50 cursor-not-allowed text-[#ccc]"
                                          }`}
                                      >
                                        <DocumentDownload size="16" />
                                        Download
                                      </button>

                                      {/* Record */}
                                      {(view.dueAmount !== 0 &&
                                        view?.invoiceAmount > 0 &&
                                        view?.paymentStatus !== "Cancelled" &&
                                        view?.paymentStatus !== "Paid") && (
                                          <button
                                            disabled={!canWriteInvoice}
                                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm
      ${canWriteInvoice
                                                ? "hover:bg-[#EDF2FF] text-[#1E45E1]"
                                                : "opacity-50 cursor-not-allowed text-[#ccc]"
                                              }`}
                                          >
                                            <ReceiptEdit size="16" />
                                            Record
                                          </button>
                                        )}

                                      {/* Refund */}
                                      {(view?.invoiceAmount < 0 &&
                                        view?.paymentStatus !== "Refunded" &&
                                        view?.paymentStatus !== "Cancelled") && (
                                          <button
                                            disabled={!canWriteInvoice}
                                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm
      ${canWriteInvoice
                                                ? "hover:bg-[#EDF2FF] text-[#1E45E1]"
                                                : "opacity-50 cursor-not-allowed text-[#ccc]"
                                              }`}
                                          >
                                            <MoneySend size="16" />
                                            Refund
                                          </button>
                                        )}

                                      {/* Divider */}
                                      <div className="h-px bg-[#EAEAEA]" />

                                    
                                      {/* {(view?.paymentStatus !== "Cancelled" &&
                                        view?.paymentStatus !== "Paid") && (
                                          <button
                                            disabled={!canDeleteInvoice}
                                            className={`flex items-center gap-2 w-full px-3 py-2 text-sm rounded-b-[10px]
      ${canDeleteInvoice
                                                ? "hover:bg-[#FFF0F0] text-red-500"
                                                : "opacity-50 cursor-not-allowed text-[#ccc]"
                                              }`}
                                          >
                                            <Trash size="16" />
                                            Delete
                                          </button>
                                        )} */}

                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))}
                    </PaginationList>

                    {invoiceFilterddata?.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-red-500 py-4">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>




              </div>
            ) :

              <div className="mt-2.5 flex justify-center">
                <div>
                  <div className="text-center">
                    <img src={Emptystate} alt="emptystate" />
                  </div>

                  <div className="pb-1 text-center font-semibold text-[16px] text-[#4B4B4B] font-gilroy">
                    No Bills available
                  </div>
                  <div className="pb-1 text-center font-medium text-[14px] text-[#4B4B4B] font-gilroy">
                    There are no Bills added.
                  </div>
                </div>
              </div>
        }
      </div>






    </>
  );
}
UserListInvoice.propTypes = {
  handleEditItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  customerEdit: PropTypes.func,
  customerDelete: PropTypes.func,
  handleAddItem: PropTypes.func,
  id: PropTypes.func,
  customerAdd: PropTypes.func,
};

export default UserListInvoice;