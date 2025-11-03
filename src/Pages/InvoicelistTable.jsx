import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Assign from '../Assets/Images/MoneyAdd-Linear-32px.png';
import Download from '../Assets/Images/New_images/download.png';
import PropTypes from "prop-types"
import WriteOffForm from "./InvoiceWriteOff";
import { useHasPermission } from '../Utils/Permission';
import { useDispatch, useSelector } from "react-redux";
import RefundAmount from "./Bills/RefundAmount";


const InvoiceTable = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });



  // const canWriteInvoice = useHasPermission("Invoice", "canWrite")
  // const canUpdateInvoice = useHasPermission("Invoice", "canUpdate")
  // const canDeleteInvoice = useHasPermission("Invoice", "canDelete")



const {
    canWriteModule: canWriteInvoice,
    // canReadModule: canReadReceipt,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Invoice");







  const [WriteoffForm, setWriteOffForm] = useState(false)
  const [payapleform, setPayableForm] = useState(false)
  const [refundDetails, setRefundDetails] = useState('')


  const handleShowDots = (event) => {
    setShowDots(!showDots)

    const { top, left } = event.target.getBoundingClientRect();
    const popupTop = top - 14;
    const popupLeft = left - 180;

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


  const handleWriteOffFrom = (item) => {

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
      dispatch({ type: "MANUALINVOICESLIST", payload: state?.login?.selectedHostel_Id })
      setTimeout(() => {
        dispatch({ type: 'REMOVE_CREATE_REFUND' })
      }, 100)
    }

  }, [state.InvoiceList.createRefundStatusCode])







  // let Dated = new Date(props.item?.invoiceDate);

  // let day = Dated.getDate();
  // let month = Dated.getMonth() + 1;
  // let year = Dated.getFullYear();

  // let formattedDate = `${day}/${month}/${year}`;



  // let dueDated = new Date(props.item?.dueDate);

  // let daydue = dueDated.getDate();
  // let monthdue = dueDated.getMonth() + 1;
  // let yeardue = dueDated.getFullYear();

  // let formattedDueDate = `${daydue}/${monthdue}/${yeardue}`;



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
      // dispatch({ type: 'GETPARTICULARBILLSDETAILS', payload: { hostelId: item.hostelId, invoiceId: item.invoiceId}})
      props.DisplayInvoice(true, item)
    }
  }


  return (

    <>
      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


        <td className="table-cells ps-2 ps-sm-2 ps-md-3 ps-lg-3" style={{ border: "none", flexWrap: "wrap", whiteSpace: "nowrap", borderBottom: "1px solid #E8E8E8" }} >
          <div className="d-flex  align-items-center">

            <div className="Invoice_Name" style={{
              fontFamily: 'Gilroy', fontSize: '13px', marginLeft: '8px', color: "#1E45E1",
              fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer", textAlign: "start", paddingTop: "15px", paddingLeft: 5,
            }}
              onClick={() => handleDownload(props.item)}
            >
              <div className="ps-1">{props.item?.fullName}</div>

            </div>

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-3'>
          <div className="ps-1">  {props.item?.invoiceNumber === null || props.item?.invoiceNumber === '' ? '0.00' : props.item?.invoiceNumber}</div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textTransform: "capitalize", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-4'>{props.item.invoiceType === 'auto' ? "Recurring" : props.item.invoiceType}</td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-2'><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{props.item?.invoiceDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-2'><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px", marginLeft: 5 }}>{props.item?.dueDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-4'>
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
          className='ps-2 ps-sm-2 ps-md-3 ps-lg-4'
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
            color:
              props.item?.paymentStatus === "Paid"
                ? "green"
                : props.item?.paymentStatus === "Refunded"
                  ? "#d97706" 
                  : props.item?.paymentStatus === "Pending Refund"
                    ? "#b45309" 
                    : "red",
            borderBottom: "1px solid #E8E8E8",
          }}
          className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
        >

      {(props.item?.paymentStatus === "Pending" ||
            props.item?.paymentStatus === "Partial Payment") && (
              <span
                style={{
                  backgroundColor: "#FFD9D9",
                  color: "#000",
                  borderRadius: "14px",
                  fontFamily: "Gilroy",
                  padding: "8px 12px",
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
                color: "#000",
                borderRadius: "14px",
                padding: "8px 12px",
              }}
            >
              {props.item?.paymentStatus}
            </span>
          )}


          {props.item?.paymentStatus === "Refunded" && (
            <span
              style={{
                backgroundColor: "#FFF3CD",
                color: "#8B8000",
                borderRadius: "14px",
                fontFamily: "Gilroy",
                padding: "8px 12px",
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
                padding: "8px 12px",
              }}
            >
              {props.item?.paymentStatus}
            </span>
          )} 
           {props.item?.isCancelled && (
            <span
              style={{
                backgroundColor: "#FFE6B3",
                color: "#b45309",
                borderRadius: "14px",
                fontFamily: "Gilroy",
                padding: "8px 12px",
              }}
            >
              Cancelled
            </span>
          )
        }

         
        </td>

        {/* <td
          style={{
            border: "none",
            textAlign: "start",
            verticalAlign: "middle",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "Gilroy",
            borderBottom: "1px solid #E8E8E8",
          }}
          className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
        >
          {(() => {
            let bgColor = "";
            let textColor = "";
             let label = (props.item?.paymentStatus || "").trim(); 

            if (props.item?.isCancelled) {
              bgColor = "#FFE6B3";
              textColor = "#b45309";
              label = "Cancelled";
            } else {
              switch (props.item?.paymentStatus) {
                case "Paid":
                  bgColor = "#D9FFD9";
                  textColor = "#000";
                  break;
                case "Refunded":
                  bgColor = "#FFF3CD";
                  textColor = "#8B8000";
                  break;
                case "Pending Refund":
                  bgColor = "#FFE6B3";
                  textColor = "#b45309";
                  break;
                case "Pending":
                case "Partial Payment":
                  bgColor = "#FFD9D9";
                  textColor = "#000";
                  break;
                default:
                  bgColor = "#F3F3F3";
                  textColor = "#000";
              }
            }

            return (
              <span
                style={{
                  cursor: "pointer",
                  backgroundColor: bgColor,
                  color: textColor,
                  borderRadius: "14px",
                  fontFamily: "Gilroy",
                  padding: "8px 12px",
                }}
              >
                {label}
              </span>
            );
          })()}
        </td> */}


        <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none", borderBottom: "1px solid #E8E8E8" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{
              cursor: "pointer",
              backgroundColor: showDots ? "#E7F1FF" : "white",
              height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"
            }} onClick={(e) => handleShowDots(e)}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

              {showDots && <>
                <div
                  ref={popupRef}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#F9F9F9",
                    position: "fixed",
                    top: popupPosition.top,
                    left: popupPosition.left - 10,
                    width: 170,
                    height: "auto",
                    border: "1px solid #EBEBEB",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    zIndex: showDots ? 1000 : "auto",
                  }}
                >
                  <div style={{ width: "100%" }}>

{
  props.item?.paymentStatus !== "Cancelled" &&

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


                    {(props.item.dueAmount !== 0 && props.item?.invoiceAmount > 0 &&  props.item?.paymentStatus !== "Cancelled") && (
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
                      props.item?.paymentStatus !== "Refunded" &&  props.item?.paymentStatus !== "Cancelled" &&

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
                       props.item?.paymentStatus !== "Cancelled" && 
                    
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