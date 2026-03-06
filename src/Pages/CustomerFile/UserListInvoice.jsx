
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
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



function UserListInvoice(props) {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const popupRef = useRef(null);
  // const [invoicerowsPerPage, setInvoicerowsPerPage] = useState(4);
  // const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  // const [tabletrue, setTableTrue] = useState(true)
  // const [billMode, setBillMode] = useState("New Bill");
  // const [showmanualinvoice, setShowManualInvoice] = useState(false);
  // const [activeId, setActiveId] = useState(null);
  // const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

 
  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    // canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");



  
  const sortedData = React.useMemo(() => {
    return Array.isArray(invoiceFilterddata) ? invoiceFilterddata : [];
  }, [invoiceFilterddata]);




  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoiceResponseList);
  }, [state.UsersList.customerdetails.invoiceResponseList]);



  // const handleShowDots = (item, event) => {
  //   if (activeId === item.id) {
  //     setActiveId(null);
  //   } else {
  //     setActiveId(item.id);
  //   }
  //   const { top, left, height } = event.target.getBoundingClientRect();
  //   const popupTop = top + (height / 2);
  //   const popupLeft = left - 150;
  //   setPopupPosition({ top: popupTop, left: popupLeft });
  // };
  // const handleClickOutside = (event) => {
  //   if (popupRef.current && !popupRef.current.contains(event.target)) {
  //     setActiveId(null);
  //   }
  // };
  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  // const [BillsForm, setBillsForm] = useState(false)

  // const handleEditBill = (item) => {

  //   props.handleEditItem(item)
  //   // setBillsForm(false)

  //   dispatch({ type: 'USERROOMAVAILABLETRUE' });

  // };

  const handleAddBill = () => {
    
    navigate('/create-bill', { state: { id: state?.UsersList?.customerdetails?.customerId  } });
    dispatch({ type: 'USERROOMAVAILABLETRUE' });
  };

 


  // const handleDeleteBill = (user) => {
  //   props.handleDeleteItem(user.id)
  //   dispatch({ type: 'USERPROFILEBILLTRUE' });

  // };

  


  return (
    <>
      <div className="flex justify-end w-full lg:-mt-[70px]" >
        {
          state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" &&

          <Button
            onClick={handleAddBill}
            disabled={props.customerAdd || !canWriteInvoice}
            className="!font-gilroy text-sm text-white !font-semibold rounded-md p-2 w-36 whitespace-nowrap !bg-[#1E45E1]"
          >
            {" "}
            + Create Bill
          </Button>
        }
      </div>
   



      <div>
        {

          !canReadInvoice ?
            <div className="flex flex-col items-center justify-center min-h-1/2" >

              <ErrorMessage message={['You do not have access to view Bill']} type="warning" />

            </div>

            :


            sortedData?.length > 0 ? (
              <div className={`overflow-auto border-t border-gray-200 mt-5 mb-5 px-0 ${sortedData?.length >= 4 ? "h-64" : "h-auto"
                }`}

              >
                <Table className="min-w-full border-collapse w-full font-medium sticky top-0 z-10 font-gilroy">

                  <thead className="bg-blue-100 text-gray-400 font-gilroy text-sm font-medium sticky top-0 z-10 font-gilroy">
                    <tr className="h-7">
                      <th className="text-start pl-5 whitespace-nowrap">
                        <div className="flex gap-1 items-center justify-start">Invoice Number</div>
                      </th>
                      <th className="text-start whitespace-nowrap">
                        <div className="flex gap-1 items-center justify-start">Invoice Type</div>
                      </th>
                      <th className="text-start whitespace-nowrap">
                        <div className="flex gap-1 items-center justify-start ml-10">Invoice Date</div>
                      </th>
                      <th className="text-start whitespace-nowrap">
                        <div className="flex gap-1 items-center justify-start ml-12">Due Date</div>
                      </th>
                      <th className="text-start">
                        <div className="flex gap-1 items-center justify-start ml-10">Amount</div>
                      </th>
                      <th className="text-start">
                        <div className="flex gap-1 items-center justify-start ml-12">Due</div>
                      </th>
                      <th className="text-start">
                        <div className="flex gap-1 items-center justify-start ml-4">Status</div>
                      </th>
                      {/* {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
                        <th className="text-start text-gray-500 font-medium text-[12px] font-gilroy">
                          Action
                        </th>
                      )} */}

                    </tr>
                  </thead>

                  <tbody className="text-xs align-middle font-gilroy">
                    <PaginationList>
                      {sortedData?.map((view) => (
                        // let dueDated = new Date(view.DueDate);
                        // let daydue = dueDated.getDate();
                        // let monthdue = dueDated.getMonth() + 1;
                        // let yeardue = dueDated.getFullYear();
                        <tr key={view.id} className="border-b border-[#E8E8E8]">
                          <td >
                            {view.invoiceNumber}
                          </td>

                          <td >
                            {view.invoiceType}
                          </td>

                          <td>
                            <span className="px-5 py-1 rounded-[14px] text-xs font-medium font-gilroy leading-[1.5]">
                              {view?.invoiceGeneratedDate}
                            </span>
                          </td>

                          <td>
                            <span className="px-5 py-1 rounded-[14px] text-xs font-medium font-gilroy leading-[1.5]">
                              {view?.dueDate}
                            </span>
                          </td>

                          <td className="" >
                            <span className="px-5 py-1 rounded-[14px] text-xs font-medium font-gilroy leading-[1.5]">
                              {view?.totalAmount}
                            </span>
                          </td>

                          <td className="" >
                            <span className="px-5 py-1 rounded-[14px] text-xs font-medium font-gilroy leading-[1.5]">
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
                          {/* {

                              state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" &&

                              <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
                                <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
                                  <div
                                    style={{
                                      cursor: "pointer",
                                      // height: 40,
                                      // width: 40,
                                      // borderRadius: 100,
                                      // border: "1px solid #EFEFEF",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      position: "relative",
                                      zIndex:
                                        activeId === view.id
                                          ? 1000
                                          : "auto",
                                      // backgroundColor:
                                      //   activeId === view.id
                                      //     ? "#E7F1FF"
                                      //     : "white",
                                    }}
                                    onClick={(e) =>
                                      handleShowDots(view, e)
                                    }
                                  >
                                    <PiDotsThreeOutlineVerticalFill
                                      style={{ height: 20, width: 20 , transform:"rotate(90deg)" }}
                                    />
                                    {activeId === view.id && (
                                      <div
                                        ref={popupRef}
                                        className="ven-popup showdots-btn"
                                        style={{
                                          cursor: "pointer",
                                          backgroundColor: "#F9F9F9",
                                          position: "fixed",
                                          top: popupPosition.top,
                                          left: popupPosition.left-50,
                                          width: 160,
                                          height: "auto",
                                          border: "1px solid #EBEBEB",
                                          borderRadius: 10,
                                          display: "flex",
                                          flexDirection: "column",
                                          padding: 0,
                                          alignItems: "flex-start",
                                          zIndex: 1000,
                                        }}
                                      >
                                        <div style={{ width: "100%", backgroundColor: "#F9F9F9", borderRadius: 10 }}>

                                          <div
                                            onClick={() => {
                                              if (canUpdateInvoice) {
                                                handleEditBill(view);
                                              }
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#EDF2FF";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F9F9F9";
                                            }}
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                              padding: "8px 12px",
                                              width: "100%",
                                              backgroundColor: "#F9F9F9",
                                              cursor: !canUpdateInvoice ? "not-allowed" : "pointer",

                                              opacity: !canUpdateInvoice ? 0.5 : 1,
                                              borderTopLeftRadius: 10,
                                              borderTopRightRadius: 10,
                                            }}
                                          >
                                            <img
                                              src={Edit}
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: !canUpdateInvoice ? "grayscale(100%)" : "none",
                                              }}
                                              alt="Edit"
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: !canUpdateInvoice ? "#ccc" : "#222222",
                                                cursor: !canUpdateInvoice ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Edit
                                            </label>
                                          </div>


                                          <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                                          <div
                                            onClick={() => {
                                              if (canDeleteInvoice) {
                                                handleDeleteBill(view);
                                              }
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#FFF0F0";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F9F9F9";
                                            }}
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              gap: "10px",
                                              padding: "8px 12px",
                                              width: "100%",
                                              backgroundColor: "#F9F9F9",
                                              cursor: !canDeleteInvoice ? "not-allowed" : "pointer",
                                              opacity: !canDeleteInvoice ? 0.5 : 1,
                                              borderBottomLeftRadius: 10,
                                              borderBottomRightRadius: 10,
                                            }}
                                          >
                                            <img
                                              src={Delete}
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: !canDeleteInvoice ? "grayscale(100%)" : "none",
                                              }}
                                              alt="Delete"
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: !canDeleteInvoice ? "#ccc" : "#FF0000",
                                                cursor: !canDeleteInvoice ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Delete
                                            </label>
                                          </div>
                                        </div>
                                      </div>

                                    )}



                                  </div>
                                </div>

                              </td>
                            } */}
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
  handleEditItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  customerEdit: PropTypes.func.isRequired,
  customerDelete: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
  customerAdd: PropTypes.func.isRequired,
};

export default UserListInvoice;