
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Edit from '../../Assets/Images/Edit-blue.png';
import Delete from '../../Assets/Images/Delete_red.png';
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

  const popupRef = useRef(null);
  // const [invoicerowsPerPage, setInvoicerowsPerPage] = useState(4);
  // const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  // const [tabletrue, setTableTrue] = useState(true)
  // const [billMode, setBillMode] = useState("New Bill");
  // const [showmanualinvoice, setShowManualInvoice] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  // const canReadInvoice = useHasPermission("Bills", "canRead")
  // const canWriteInvoice = useHasPermission("Bills", "canWrite")
  // const canUpdateInvoice = useHasPermission("Bills", "canUpdate")
  // const canDeleteInvoice = useHasPermission("Bills", "canDelete")

  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");



  // const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
  // const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
  // const currentRowinvoice = invoiceFilterddata?.slice(
  //   indexOfFirstRowinvoice,
  //   indexOfLastRowinvoice
  // );

  // const handleInvoicePageChange = (InvoicepageNumber) => {
  //   setinvoicecurrentPage(InvoicepageNumber);
  // };

  // const invoiceOptions = [
  //   { value: 4, label: "4" },
  //   { value: 10, label: "10" },
  //   { value: 50, label: "50" },
  //   { value: 100, label: "100" },
  // ];



  // const handleItemsPerPageChange = (selectedOption) => {
  //   if (selectedOption?.value) {
  //     setInvoicerowsPerPage(selectedOption.value);
  //     setinvoicecurrentPage(1);
  //   }
  // };
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key) return currentRowinvoice;

  //   const sorted = [...currentRowinvoice].sort((a, b) => {
  //     const valueA = a[sortConfig.key];
  //     const valueB = b[sortConfig.key];

  //     if (!isNaN(valueA) && !isNaN(valueB)) {
  //       return sortConfig.direction === "asc"
  //         ? valueA - valueB
  //         : valueB - valueA;
  //     }

  //     if (typeof valueA === "string" && typeof valueB === "string") {
  //       return sortConfig.direction === "asc"
  //         ? valueA.localeCompare(valueB)
  //         : valueB.localeCompare(valueA);
  //     }

  //     return 0;
  //   });

  //   return sorted;
  // }, [currentRowinvoice, sortConfig]);

  // const handleSort = (key, direction) => {
  //   setSortConfig({ key, direction });
  // };

  // const totalPagesinvoice = Math.ceil(
  //   invoiceFilterddata?.length / invoicerowsPerPage
  // );

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
  // const [BillsForm, setBillsForm] = useState(false)

  const handleEditBill = (item) => {

    props.handleEditItem(item)
    // setBillsForm(false)

    dispatch({ type: 'USERROOMAVAILABLETRUE' });

  };

  const handleAddBill = () => {
    // setBillMode("New Bill");
    // setTableTrue(false)
    // setBillsForm(true)
    navigate('/create-bill', { state: { id: props.id } });
    dispatch({ type: 'USERROOMAVAILABLETRUE' });
  };

  // useEffect(() => {
  //   if (BillsForm) {
  //     dispatch({
  //       type: "MANUAL-INVOICE-NUMBER-GET",
  //       payload: { user_id: props.id },
  //     });
  //   }


  // }, [BillsForm])


  const handleDeleteBill = (user) => {
    props.handleDeleteItem(user.id)
    dispatch({ type: 'USERPROFILEBILLTRUE' });

  };

  


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
    {/* <div className="relative w-full">
  {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
    <div
      className="
        w-full flex justify-center
        md:absolute md:right-0 md:top-[-115px]
        md:w-auto md:justify-end
      "
    >
      <Button
        onClick={handleAddBill}
        disabled={props.customerAdd || !canWriteInvoice}
        className="!font-gilroy text-sm text-white !font-semibold rounded-md p-2 w-36 whitespace-nowrap !bg-[#1E45E1]"
      >
        + Create Bill
      </Button>
    </div>
  )}
</div> */}



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


      {/* {invoiceFilterddata?.length > 4 && (

        <nav
          className="position-fixed bottom-0 end-0 mb-3 me-3 d-flex justify-content-end align-items-center"
          style={{ backgroundColor: "white", zIndex: 1000 }}
        >
          <div>
            <Select
              value={invoiceOptions.find((opt) => opt.value === invoicerowsPerPage)}
              onChange={handleItemsPerPageChange}
              options={invoiceOptions}
              placeholder="Items per page"
              classNamePrefix="custom"
              menuPlacement="auto"
              noOptionsMessage={() => "No options"}
              styles={{
                control: (base) => ({
                  ...base,
                  height: "40px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#1E45E1",
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  border: "1px solid #1E45E1",
                  boxShadow: "0 0 0 1px #1E45E1",
                  cursor: "pointer",
                  width: 90,
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ced4da",
                  fontFamily: "Gilroy",
                }),
                menuList: (base) => ({
                  ...base,
                  backgroundColor: "#f8f9fa",
                  maxHeight: "200px",
                  padding: 0,
                  scrollbarWidth: "thin",
                  overflowY: "auto",
                  fontFamily: "Gilroy",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#555",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#1E45E1",
                  cursor: "pointer",
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                option: (base, state) => ({
                  ...base,
                  cursor: "pointer",
                  backgroundColor: state.isFocused ? "#1E45E1" : "white",
                  color: state.isFocused ? "#fff" : "#000",
                }),
              }}
            />
          </div>

          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: invoicecurrentPage === 1 ? "#ccc" : "#1E45E1",
                  cursor: invoicecurrentPage === 1 ? "not-allowed" : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
                disabled={invoicecurrentPage === 1}
              >
                <ArrowLeft2 size="16" color={invoicecurrentPage === 1 ? "#ccc" : "#1E45E1"} />
              </button>
            </li>

            <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
              {invoicecurrentPage} of {totalPagesinvoice}
            </li>

            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: invoicecurrentPage === totalPagesinvoice ? "#ccc" : "#1E45E1",
                  cursor: invoicecurrentPage === totalPagesinvoice ? "not-allowed" : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
                disabled={invoicecurrentPage === totalPagesinvoice}
              >
                <ArrowRight2
                  size="16"
                  color={invoicecurrentPage === totalPagesinvoice ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>
          </ul>
        </nav>
      )} */}




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