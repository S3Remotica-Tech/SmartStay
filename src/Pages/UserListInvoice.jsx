
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import {
  ArrowLeft2,
  ArrowRight2, ArrowUp2, ArrowDown2
} from "iconsax-react";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Emptystate from "../Assets/Images/Empty-State.jpg";

function UserListInvoice(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const popupRef = useRef(null);
  const [invoicerowsPerPage, setInvoicerowsPerPage] = useState(4);
  const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
  const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
  const currentRowinvoice = invoiceFilterddata?.slice(
    indexOfFirstRowinvoice,
    indexOfLastRowinvoice
  );

  const handleInvoicePageChange = (InvoicepageNumber) => {
    setinvoicecurrentPage(InvoicepageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setInvoicerowsPerPage(Number(event.target.value));
    setinvoicecurrentPage(1)
  };
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentRowinvoice;

    const sorted = [...currentRowinvoice].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentRowinvoice, sortConfig]);
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const totalPagesinvoice = Math.ceil(
    invoiceFilterddata?.length / invoicerowsPerPage
  );


  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details);
  }, [state.UsersList.customerdetails.invoice_details]);




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

    props.handleEditItem(item)
    setBillsForm(false)

    dispatch({ type: 'USERROOMAVAILABLETRUE' });

  };

  const handleAddBill = () => {
    setBillsForm(true)
    props.handleAddItem()



    dispatch({ type: 'USERROOMAVAILABLETRUE' });



  };









  useEffect(() => {
    if (BillsForm) {
      dispatch({
        type: "MANUAL-INVOICE-NUMBER-GET",
        payload: { user_id: props.id },
      });
    }


  }, [BillsForm])


  const handleDeleteBill = (user) => {
    props.handleDeleteItem(user.id)
    dispatch({ type: 'USERPROFILEBILLTRUE' });

  };


  return (
    <>
      <div className="d-flex justify-content-end col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <Button
          onClick={handleAddBill}

          style={{
            fontFamily: "Gilroy",
            fontSize: "14px",
            backgroundColor: "#1E45E1",
            color: "white",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "11px 32px",
            paddingLeft: 34,
            whiteSpace: "nowrap",
            marginTop: "-20px"
          }}
        >
          {" "}
          + Create Bill
        </Button>
      </div>

      <div
        className=" booking-table-userlist  booking-table ms-2"
        style={{ paddingBottom: "20px" }}
      >
        {sortedData?.length > 0 ? (
          <div

            className='show-scrolls'
            style={{

              height: sortedData?.length >= 4 || sortedData?.length >= 4 ? "250px" : "auto",
              overflow: "auto",
              borderTop: "1px solid #E8E8E8",
              marginBottom: 20,
              marginTop: "20px",
              paddingRight: 0,
              paddingLeft: 0
            }}
          >
            <Table
              responsive="md"
              style={{
                fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                top: 0,
                zIndex: 1,
                borderRadius: 0
              }}
            >
              <thead style={{
                fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 12, fontStyle: "normal", fontWeight: 500, position: "sticky",
                top: 0,
                zIndex: 1
              }}>
                <tr className="" style={{ height: "30px" }}>
                  <th
                    style={{
                      textAlign: "start",
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      paddingLeft: "20px",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Invoices", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Invoices", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Invoice Number
                    </div>
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "start",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("action", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("action", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Invoice Type
                    </div>
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "start",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Date", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Date", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Invoice Date
                    </div>
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "start",
                      whiteSpace: "nowrap"
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("DueDate", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("DueDate", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Due Date
                    </div>
                  </th>

                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "start",
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Amount", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("Amount", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Amount
                    </div>
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "start",
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("BalanceDue", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("BalanceDue", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Due
                    </div>
                  </th>

                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "start",
                    }}
                  >
                    <div className="d-flex gap-1 align-items-center justify-content-start">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <ArrowUp2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("status", "asc")}
                          style={{ cursor: "pointer" }}
                        />
                        <ArrowDown2
                          size="10"
                          variant="Bold"
                          color="#1E45E1"
                          onClick={() => handleSort("status", "desc")}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                      Status
                    </div>
                  </th>
                  <th style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    textAlign: "start",
                  }}> Action</th>
                </tr>
              </thead>
              <tbody
                style={{
                  height: "50px",
                  fontSize: "11px",
                  verticalAlign: "middle",
                }}
              >
                {sortedData?.map((view) => {
                  let Dated = new Date(view.Date);

                  let day = Dated.getDate();
                  let month = Dated.getMonth() + 1;
                  let year = Dated.getFullYear();

                  let formattedDate = `${day}/${month}/${year}`;

                  let dueDated = new Date(view.DueDate);

                  let daydue = dueDated.getDate();
                  let monthdue = dueDated.getMonth() + 1;
                  let yeardue = dueDated.getFullYear();

                  let DueformattedDate = `${daydue}/${monthdue}/${yeardue}`;

                  return (
                    <tr key={view.id} style={{ marginTop: "20px" }}>
                      <td
                        style={{
                          textAlign: "start",
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy",
                          borderBottom: "1px solid #E8E8E8",
                        }}
                        className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                      >
                        <div style={{marginLeft:10}}>  {view.Invoices}</div>

                      </td>
                      <td
                        style={{
                          textAlign: "start",
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy",
                          paddingLeft: "20px", borderBottom: "1px solid #E8E8E8"
                        }}
                        className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                      >
                        <div className="ps-1">
                          {view.action}
                        </div>

                      </td>
                      <td style={{ textAlign: "start", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-2" >
                        <span
                          style={{
                            backgroundColor: "#EBEBEB",
                            paddingTop: "3px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "3px",
                            borderRadius: "10px",
                            marginLeft:4,
                            lineHeight: "1.5em",
                            margin: "0",
                            fontSize: "11px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start"
                          }}

                        >
                          {formattedDate}
                        </span>
                      </td>
                      <td style={{ textAlign: "start", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-2">
                        <span
                          style={{
                            backgroundColor: "#EBEBEB",
                            paddingTop: "3px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "3px",
                            borderRadius: "10px",
                            marginLeft:4,
                            lineHeight: "1.5em",
                            margin: "0",
                            fontSize: "11px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start"
                          }}
                        >
                          {DueformattedDate}
                        </span>
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy",
                          textAlign: "start"
                          , borderBottom: "1px solid #E8E8E8"
                        }}
                        className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                      >
                        ₹{view.Amount}
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy",
                          textAlign: "start",
                          borderBottom: "1px solid #E8E8E8"
                        }}
                        className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                      >
                        ₹{view.BalanceDue}
                      </td>
                      <td style={{ textAlign: "start", borderBottom: "1px solid #E8E8E8" }} className="ps-2 ps-sm-2 ps-md-3 ps-lg-2">
                        <span
                          style={{
                            color: "black",
                            backgroundColor:
                              view.Status === "Success" ? "#D9FFD9" : "#FFD9D9",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            fontSize: "11px",
                            fontWeight: 500,
                            borderRadius: "10px",
                            marginLeft:4
                          }}
                        >
                          {view.Status === "Success" ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
                        <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
                          <div
                            style={{
                              cursor: "pointer",
                              height: 40,
                              width: 40,
                              borderRadius: 100,
                              border: "1px solid #EFEFEF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              zIndex:
                                activeId === view.id
                                  ? 1000
                                  : "auto",
                              backgroundColor:
                                activeId === view.id
                                  ? "#E7F1FF"
                                  : "white",
                            }}
                            onClick={(e) =>
                              handleShowDots(view, e)
                            }
                          >
                            <PiDotsThreeOutlineVerticalFill
                              style={{ height: 20, width: 20 }}
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
    left: popupPosition.left,
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
        if (!props.billEditPermission) {
          handleEditBill(view);
        }
      }}
      onMouseEnter={(e) => {
        if (!props.billEditPermission)
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
        cursor: props.billEditPermission ? "not-allowed" : "pointer",
        pointerEvents: props.billEditPermission ? "none" : "auto",
        opacity: props.billEditPermission ? 0.5 : 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <img
        src={Edit}
        style={{
          height: 16,
          width: 16,
          filter: props.billEditPermission ? "grayscale(100%)" : "none",
        }}
        alt="Edit"
      />
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Gilroy, sans-serif",
          color: props.billEditPermission ? "#ccc" : "#222222",
          cursor: props.billEditPermission ? "not-allowed" : "pointer",
        }}
      >
        Edit
      </label>
    </div>

    
    <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />

  
    <div
      onClick={() => {
        if (!props.billDeletePermission) {
          handleDeleteBill(view);
        }
      }}
      onMouseEnter={(e) => {
        if (!props.billDeletePermission)
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
        cursor: props.billDeletePermission ? "not-allowed" : "pointer",
        pointerEvents: props.billDeletePermission ? "none" : "auto",
        opacity: props.billDeletePermission ? 0.5 : 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}
    >
      <img
        src={Delete}
        style={{
          height: 16,
          width: 16,
          filter: props.billDeletePermission ? "grayscale(100%)" : "none",
        }}
        alt="Delete"
      />
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Gilroy, sans-serif",
          color: props.billDeletePermission ? "#ccc" : "#FF0000",
          cursor: props.billDeletePermission ? "not-allowed" : "pointer",
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
                    </tr>
                  );
                })}
                {currentRowinvoice?.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        ) : <div style={{ marginTop: 30 }}>
          <div style={{ textAlign: "center" }}>
            <img src={Emptystate} alt="emptystate" />
          </div>
          <div
            className="pb-1"
            style={{
              textAlign: "center",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: 20,
              color: "rgba(75, 75, 75, 1)",
            }}
          >
            No Bills available
          </div>
          <div
            className="pb-1"
            style={{
              textAlign: "center",
              fontWeight: 500,
              fontFamily: "Gilroy",
              fontSize: 16,
              color: "rgba(75, 75, 75, 1)",
            }}
          >
            There are no Bills added.
          </div>
        </div>
        }
      </div>


      {invoiceFilterddata?.length >= 4 && (

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            padding: "10px",
          }}
        >
          <div>
            <select
              value={invoicerowsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: "5px",
                border: "1px solid #1E45E1",
                borderRadius: "5px",
                color: "#1E45E1",
                fontWeight: "bold",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value={4}>4</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
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
      )}




    </>
  );
}
UserListInvoice.propTypes = {
  handleEditItem: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  billEditPermission: PropTypes.func.isRequired,
  billDeletePermission: PropTypes.func.isRequired,
  handleAddItem: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};

export default UserListInvoice;
