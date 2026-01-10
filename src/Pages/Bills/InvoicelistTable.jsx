/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../../Assets/Images/Edit-blue.png';
import Delete from '../../Assets/Images/Delete_red.png';
import Assign from '../../Assets/Images/MoneyAdd-Linear-32px.png';
import Download from '../../Assets/Images/New_images/download.png';
import PropTypes from "prop-types"
import WriteOffForm from "../../Pages/Bills/InvoiceWriteOff";
import { useHasPermission } from '../../Utils/Permission';
import { useDispatch, useSelector } from "react-redux";
import RefundAmount from "../Bills/RefundAmount";
import { useNavigate } from "react-router-dom";

const InvoiceTable = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const [showAbove, setShowAbove] = useState(false);
  // const canWriteInvoice = useHasPermission("Invoice", "canWrite")
  // const canUpdateInvoice = useHasPermission("Invoice", "canUpdate")
  // const canDeleteInvoice = useHasPermission("Invoice", "canDelete")



  const {
    canWriteModule: canWriteInvoice,
    // canReadModule: canReadReceipt,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");



  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;
      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);



  const [WriteoffForm, setWriteOffForm] = useState(false)
  const [payapleform, setPayableForm] = useState(false)
  const [refundDetails, setRefundDetails] = useState('')


  const handleShowDots = (event) => {
    setShowDots(!showDots)

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }

  const handleShowform = (props) => {
    props.OnHandleshowform(props)
  }

  const handleEdit = (props) => {
    props.OnHandleshowEditform(props.item)
  }

  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item)
  }

  const handleBillDelete = (props) => {
    props.OnHandleshowDeleteform(props)
  }


  const handleWriteOffFrom = () => {

    setWriteOffForm(true)
    setPayableForm(false)
  }
  const handleCloseWriteOffForm = () => {
    setWriteOffForm(false)
  }
  const handleRefundAmount = (details) => {
    setRefundDetails(details.item)
    setPayableForm(true)

  }
  const handleCloseRefundAmount = () => {
    setPayableForm(false)
  }

  useEffect(() => {
    if (state.InvoiceList.createRefundStatusCode === 200) {
      setPayableForm(false)
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

      setTimeout(() => {
        dispatch({ type: 'REMOVE_CREATE_REFUND' })
      }, 100)
    }

  }, [state.InvoiceList.createRefundStatusCode])






  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleDownload = (item) => {
    if (item) {
      // props.DisplayInvoice(true, item)

      // console.log("item", item)

      dispatch({ type: 'GETPARTICULARBILLSDETAILS', payload: { hostelId: item.hostelId, invoiceId: item.invoiceId } })

      navigate(`/invoice/details/${item.invoiceId}`, {
        state: {
          rowData: item
        },
      });

    }
  }


  const handleNavigateTenantProfile = (view) => {
    // console.log("view", view)
    if (view) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: view.customerId } });
      navigate(`/tenant/details/${view.customerId}`, {
        state: {
          customerId: view.customerId,
          IsOverView: true,
          totriggerBillTap: false
        },
      });
    }

  }




  return (

    <>
      <tr key={props.item.invoiceId} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 600, color: "#1E45E1", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8", cursor: "pointer", lineHeight: 'normal' }} className='ps-2'>
          <div onClick={() => handleDownload(props.item)} className="Invoice_Name">
            {props.item?.invoiceNumber === null || props.item?.invoiceNumber === '' ? '0.00' : props.item?.invoiceNumber}
          </div>
        </td>



        <td className="table-cells " style={{ verticalAlign: 'middle', border: "none", flexWrap: "wrap", whiteSpace: "nowrap", borderBottom: "1px solid #E8E8E8", lineHeight: 'normal' }} >


          <div className="Invoice_Name" style={{
            fontFamily: 'Gilroy', fontSize: '13px', color: "#1E45E1",
            fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer",
            textAlign: "start",
          }}
            onClick={() => handleNavigateTenantProfile(props.item)}

          >
            {props.item?.fullName}

          </div>


        </td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textTransform: "capitalize", borderBottom: "1px solid #E8E8E8" }} className=''>{props.item.invoiceType}
          <span style={{
            fontSize: 10,
            fontWeight: 500,
            color: "#6B7280",
            marginTop: 2,
            textTransform: "",
          }}>_{props.item.invoiceMode}</span></td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className=''>
          {/* <span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}> */}
          {props.item?.invoiceDate}
          {/* </span> */}
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className=''>
          {/* <span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px", marginLeft: 5 }}> */}
          {props.item?.dueDate}
          {/* </span> */}
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className=''>
          ₹{Number(props.item?.invoiceAmount || 0).toLocaleString('en-IN')}
        </td>

        <td
          style={{
            border: "none",
            textAlign: 'start',
            verticalAlign: 'middle',
            fontSize: 13,
            fontWeight: 500,
            color: "#000000",
            fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"
          }}
          className=''
        >
          ₹{Number(props.item?.dueAmount || 0).toLocaleString('en-IN')}
        </td>

        <td
          style={{
            border: "none",
            textAlign: "start",
            verticalAlign: "middle",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "Gilroy",
            borderBottom: "1px solid #E8E8E8",
          }}
          className=""
        >

          {(props.item?.paymentStatus === "Pending" ||
            props.item?.paymentStatus === "Partial Payment") && (
              <span
                style={{
                  backgroundColor: "#FFD9D9",
                  color: "#7A1C1C",
                  borderRadius: "13px",
                  fontFamily: "Gilroy",
                  padding: "4px 12px", lineHeight: 1
                }}
              >
                {props.item?.paymentStatus}
              </span>
            )}


          {props.item?.paymentStatus === "Paid" && (
            <span
              style={{
                cursor: "pointer",
                backgroundColor: "#D9FFD9",
                fontFamily: "Gilroy",
                color: "#065F46",
                borderRadius: "14px",
                padding: "4px 12px", lineHeight: 1
              }}
            >
              {props.item?.paymentStatus}
            </span>
          )}


          {(props.item?.paymentStatus === "Refunded" || props.item?.paymentStatus === "Partially Refunded") && (
            <span
              style={{
                backgroundColor: "#FFF3CD",
                color: "#8B8000",
                borderRadius: "14px",
                fontFamily: "Gilroy",
                padding: "4px 12px", lineHeight: 1
              }}
            >
              {props.item?.paymentStatus}
            </span>
          )}


          {props.item?.paymentStatus === "Pending Refund" && (
            <span
              style={{
                backgroundColor: "#FFE6B3",
                color: "#b45309",
                borderRadius: "14px",
                fontFamily: "Gilroy",
                padding: "4px 12px", lineHeight: 1
              }}
            >
              {props.item?.paymentStatus}
            </span>
          )}
          {props.item?.isCancelled && (
            <span
              style={{
                backgroundColor: "#FFE6B3",
                color: "#7C2D12",
                borderRadius: "14px",
                fontFamily: "Gilroy",
                padding: "4px 12px", lineHeight: 1
              }}
            >
              Cancelled
            </span>
          )
          }


        </td>



        <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
            <div style={{
              cursor: "pointer",
              // backgroundColor: showDots ? "#E7F1FF" : "white",
              // height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", 
              display: "flex", justifyContent: "center", alignItems: "center", position: "relative"
            }} >
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, transform: "rotate(90deg)", color: showDots ? "#1E45E1" : "#6B7280", }} onClick={(e) => handleShowDots(e)} />

              {showDots && <>
                <div
                  ref={popupRef}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#F9F9F9",
                    position: "fixed",
                    top: showAbove
                      ? popupPosition.top - (popupRef.current?.offsetHeight || 100) - 20
                      : popupPosition.top - 35,
                    left: popupPosition.left,
                    width: 170,
                    height: "auto",
                    border: "1px solid #EBEBEB",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    zIndex: showDots ? 3000 : "auto",
                  }}
                >
                  <div style={{ width: "100%" }}>

                     {
                      (props.item.invoiceMode === "Recurring" && props.item?.paymentStatus === "Pending") && 
                                                    

                      <div
                        className={`d-flex justify-content-start align-items-center gap-2 ${!canUpdateInvoice ? 'disabled' : ''}`}
                        style={{
                          cursor: !canUpdateInvoice ? "not-allowed" : "pointer",
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          backgroundColor: "#F9F9F9",
                          padding: "8px 12px",
                          opacity: !canUpdateInvoice ? 0.5 : 1,
                        }}
                        onClick={() => {
                          if (canUpdateInvoice) handleEdit(props);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#EDF2FF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                      >
                        <img
                          src={Edit}
                          alt="Edit"
                          style={{
                            height: 16,
                            width: 16,
                            filter: !canUpdateInvoice ? "grayscale(100%)" : "none",
                          }}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: "#222",
                            cursor: !canUpdateInvoice ? "not-allowed" : "pointer",
                          }}
                        >
                          Edit
                        </label>
                      </div>

                    } 

                    <div
                      className="d-flex justify-content-start align-items-center gap-2 "
                      onClick={() => { if (canWriteInvoice) { handleInvoicepdf(props.item) } }}
                      style={{
                        cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                        padding: "8px 12px",
                        opacity: !canWriteInvoice ? 0.5 : 1,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#EDF2FF"
                      }}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                    >
                      <img src={Download} alt="Download" style={{ height: 16, width: 16 }} />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: "#222",
                          cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                        }}
                      >
                        Download
                      </label>
                    </div>


                    {(props.item.dueAmount !== 0 && props.item?.invoiceAmount > 0 && props.item?.paymentStatus !== "Cancelled" && props.item?.paymentStatus !== "Paid") && (
                      <div
                        className={`d-flex justify-content-start align-items-center gap-2  ${!canWriteInvoice ? 'disabled' : ''}`}
                        style={{
                          cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                          padding: "8px 12px",
                          opacity: !canWriteInvoice ? 0.5 : 1,
                        }}
                        onClick={() => {
                          if (canWriteInvoice) handleShowform(props);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#EDF2FF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                      >
                        <img
                          src={Assign}
                          alt="Record"
                          style={{
                            height: 16,
                            width: 16,
                            filter: !canWriteInvoice ? "grayscale(100%)" : "none",
                          }}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: "#222",
                            cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                          }}
                        >
                          Record Payment
                        </label>
                      </div>
                    )}
                    {props.item?.invoiceAmount < 0 && props.item?.paymentStatus !== "Refunded" && props.item?.paymentStatus !== "Cancelled" && (
                      <div
                        className={`d-flex justify-content-start align-items-center gap-2 ${!canWriteInvoice ? 'disabled' : ''}`}
                        style={{
                          cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                          padding: "8px 12px",
                          opacity: !canWriteInvoice ? 0.5 : 1,
                        }}
                        onClick={() => {
                          if (canWriteInvoice) handleRefundAmount(props);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#EDF2FF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                      >
                        <img
                          src={Assign}
                          alt="Record"
                          style={{
                            height: 16,
                            width: 16,
                            filter: !canWriteInvoice ? "grayscale(100%)" : "none",
                          }}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: "#222",
                            cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                          }}
                        >
                          Refund Amount
                        </label>
                      </div>
                    )}
                    {
                      props.item?.paymentStatus !== "Refunded" && props.item?.paymentStatus !== "Cancelled" &&

                      <div
                        className={`d-flex justify-content-start align-items-center gap-2 ${!canWriteInvoice ? 'disabled' : ''}`}

                        style={{
                          cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                          padding: "8px 12px",
                          opacity: !canWriteInvoice ? 0.5 : 1,
                        }}
                        onClick={() => {
                          if (canWriteInvoice) handleWriteOffFrom(props.item);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#EDF2FF";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                      >
                        <img
                          src={Assign}
                          alt="Record"
                          style={{
                            height: 16,
                            width: 16,
                            filter: !canWriteInvoice ? "grayscale(100%)" : "none",
                          }}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: "#222",
                            cursor: !canWriteInvoice ? "not-allowed" : "pointer",
                          }}
                        >
                          Write_Off
                        </label>
                      </div>

                    }
                    {
                      (props.item?.paymentStatus !== "Cancelled" && props.item?.paymentStatus !== "Paid") &&

                      <div
                        className={`d-flex justify-content-start align-items-center gap-2  ${!canDeleteInvoice ? 'disabled' : ''}`}
                        style={{
                          cursor: !canDeleteInvoice ? "not-allowed" : "pointer",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          padding: "8px 12px",
                          opacity: !canDeleteInvoice ? 0.5 : 1,
                        }}
                        onClick={() => {
                          if (canDeleteInvoice) handleBillDelete(props);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = "#FFF0F0";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "#F9F9F9";
                        }}
                      >
                        <img
                          src={Delete}
                          alt="Delete"
                          style={{
                            height: 16,
                            width: 16,
                            filter: !canDeleteInvoice ? "grayscale(100%)" : "none",
                          }}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: "#FF0000",
                            cursor: !canDeleteInvoice ? "not-allowed" : "pointer",
                          }}
                        >
                          Delete
                        </label>
                      </div>
                    }
                  </div>
                </div>

              </>}
            </div>
          </div>
        </td>


      </tr>

      {
        (WriteoffForm) && (
          <WriteOffForm WriteoffForm={WriteoffForm} handleCloseWriteOffForm={handleCloseWriteOffForm} handleCloseRefundAmount={handleCloseRefundAmount} />
        )
      }

      {
        payapleform && <RefundAmount show={payapleform} handleClose={handleCloseRefundAmount} refundDetails={refundDetails} />
      }
    </>
  )
}
InvoiceTable.propTypes = {
  item: PropTypes.func.isRequired,
  billEditPermission: PropTypes.func.isRequired,
  billAddPermission: PropTypes.func.isRequired,
  OnHandleshowform: PropTypes.func.isRequired,
  billDeletePermission: PropTypes.func.isRequired,
  OnHandleshowEditform: PropTypes.func.isRequired,
  OnHandleshowDeleteform: PropTypes.func.isRequired,
  OnHandleshowInvoicePdf: PropTypes.func.isRequired,
  DisplayInvoice: PropTypes.func.isRequired,
};
export default InvoiceTable;