import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Assign from '../Assets/Images/MoneyAdd-Linear-32px.png';
import Download from '../Assets/Images/New_images/download.png';
import PropTypes from "prop-types"



const InvoiceTable = (props) => {




  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });



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
  let Dated = new Date(props.item.Date);

  let day = Dated.getDate();
  let month = Dated.getMonth() + 1;
  let year = Dated.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;



  let dueDated = new Date(props.item.DueDate);

  let daydue = dueDated.getDate();
  let monthdue = dueDated.getMonth() + 1;
  let yeardue = dueDated.getFullYear();

  let formattedDueDate = `${daydue}/${monthdue}/${yeardue}`;



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

    props.DisplayInvoice(true, item)

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
              <div className="ps-1">{props.item.Name}</div>

            </div>

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-3'>
          <div className="ps-1">  {props.item.Invoices === null || props.item.Invoices === '' ? '0.00' : props.item.Invoices}</div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textTransform: "capitalize", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-4'>{props.item.action === 'auto' ? "Recurring" : props.item.action}</td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-2'><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8" }} className='ps-2 ps-sm-2 ps-md-3 ps-lg-2'><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px", marginLeft: 5 }}>{formattedDueDate}</span></td>
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
          ₹{Number(props.item?.Amount || 0).toLocaleString('en-IN')}
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
          ₹{Number(props.item?.BalanceDue || 0).toLocaleString('en-IN')}
        </td>
        <td
          style={{
            border: "none",
            textAlign: "start",
            verticalAlign: "middle",
            fontSize: 13,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: props.item.status === "Paid" ? "green" : "red", borderBottom: "1px solid #E8E8E8"
          }}
          className='ps-2 ps-sm-2 ps-md-3 ps-lg-3'
        >
          {props.item.status === "Unpaid" ? (
            <span
              style={{
                backgroundColor: "#FFD9D9",
                color: "#000",
                borderRadius: "14px",
                fontFamily: "Gilroy",
                padding: "8px 12px",
              }}
            >
              Unpaid
            </span>
          ) : (
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
              Paid
            </span>
          )}
        </td>

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


                    <div
                      className={`d-flex justify-content-start align-items-center gap-2 ${props.billEditPermission ? 'disabled' : ''}`}
                      style={{
                        cursor: props.billEditPermission ? "not-allowed" : "pointer",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        backgroundColor: "#F9F9F9",
                        padding: "8px 12px",
                      }}
                      onClick={() => {
                        if (!props.billEditPermission) handleEdit(props);
                      }}
                      onMouseEnter={(e) => {
                        if (!props.billEditPermission) e.currentTarget.style.backgroundColor = "#EDF2FF";
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
                          filter: props.billEditPermission ? "grayscale(100%)" : "none",
                        }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: props.billEditPermission ? "#ccc" : "#222",
                        }}
                      >
                        Edit
                      </label>
                    </div>

                    <div
                      className="d-flex justify-content-start align-items-center gap-2 "
                      onClick={() => handleInvoicepdf(props.item)}
                      style={{
                        cursor: "pointer",
                        padding: "8px 12px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDF2FF")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F9F9F9")}
                    >
                      <img src={Download} alt="Download" style={{ height: 16, width: 16 }} />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: "#222",
                        }}
                      >
                        Download
                      </label>
                    </div>


                    {props.item.BalanceDue !== 0 && (
                      <div
                        className={`d-flex justify-content-start align-items-center gap-2  ${props.billAddPermission ? 'disabled' : ''}`}
                        style={{
                          cursor: props.billAddPermission ? "not-allowed" : "pointer",
                          padding: "8px 12px",
                        }}
                        onClick={() => {
                          if (!props.billAddPermission) handleShowform(props);
                        }}
                        onMouseEnter={(e) => {
                          if (!props.billAddPermission) e.currentTarget.style.backgroundColor = "#EDF2FF";
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
                            filter: props.billAddPermission ? "grayscale(100%)" : "none",
                          }}
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: props.billAddPermission ? "#ccc" : "#222",
                          }}
                        >
                          Record Payment
                        </label>
                      </div>
                    )}


                    <div
                      className={`d-flex justify-content-start align-items-center gap-2  ${props.billDeletePermission ? 'disabled' : ''}`}
                      style={{
                        cursor: props.billDeletePermission ? "not-allowed" : "pointer",
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        padding: "8px 12px",
                      }}
                      onClick={() => {
                        if (!props.billDeletePermission) handleBillDelete(props);
                      }}
                      onMouseEnter={(e) => {
                        if (!props.billDeletePermission) e.currentTarget.style.backgroundColor = "#FFF0F0";
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
                          filter: props.billDeletePermission ? "grayscale(100%)" : "none",
                        }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: props.billDeletePermission ? "#ccc" : "#FF0000",
                        }}
                      >
                        Delete
                      </label>
                    </div>
                  </div>
                </div>

              </>}
            </div>
          </div>
        </td>
      </tr>
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