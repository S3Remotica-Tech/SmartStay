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
    const popupTop = top -14;
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

    // setDownloadInvoiceTable(true)

  }




  return (

    <>

      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


      <td className="table-cells" style={{ border: "none", flexWrap: "wrap",whiteSpace:"nowrap", }}>
          <div className="d-flex  align-items-center">
       
          <div className="Invoice_Name" style={{
              fontFamily: 'Gilroy', fontSize: '13px', marginLeft: '8px', color: "#1E45E1",
              fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer", textAlign: "start",paddingTop:"15px",paddingLeft:5,
            }}
            onClick={()=>handleDownload(props.item)}
            >{props.item.Name}</div>

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} className=''>{props.item.Invoices === null || props.item.Invoices === '' ? '0.00' : props.item.Invoices}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textTransform: "capitalize" }} className=''>{props.item.action === 'auto' ? "Recurring" : props.item.action}</td>

        <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDate}</span></td>
        <td style={{ border: "none", textAlign: 'center', verticalAlign: 'middle', fontSize: 13, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDueDate}</span></td>
        <td
          style={{
            border: "none",
            textAlign: 'start',
            verticalAlign: 'middle',
            fontSize: 13,
            fontWeight: 500,
            color: "#000000",
            fontFamily: "Gilroy"
          }}
        >
          ₹{Number(props.item?.Amount || 0).toLocaleString('en-IN')}
        </td>

        {/* <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} > ₹{props.item.Amount.toLocaleString('en-IN')}</td> */}
        {/* <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} >₹{props.item.BalanceDue.toLocaleString('en-IN')}</td> */}
        <td
          style={{
            border: "none",
            textAlign: 'start',
            verticalAlign: 'middle',
            fontSize: 13,
            fontWeight: 500,
            color: "#000000",
            fontFamily: "Gilroy"
          }}
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
    color: props.item.status === "Paid" ? "green" : "red", // Text color
  }}
>
  {props.item.status === "Unpaid" ? (
    <span
      style={{
        backgroundColor: "#FFD9D9", // Red background for Unpaid
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
        backgroundColor: "#D9FFD9", // Green background for Paid
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

        <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{
              cursor: "pointer",
              backgroundColor: showDots ? "#E7F1FF" : "white",
              height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative"
            }} onClick={(e) => handleShowDots(e)}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

              {showDots && <>
                <div ref={popupRef} style={{
                  cursor: "pointer", backgroundColor: "#F9F9F9",
                  // position: "absolute", right: 50, top: 20, 

                  position: "fixed",
                  top: popupPosition.top,
                  left: popupPosition.left,


                  width: 143, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 5, alignItems: "center", zIndex: showDots ? 1000 : 'auto'
                }}>
                  <div style={{ }} className=''>

                    <div
                      className={`mb-3 d-flex justify-content-start align-items-center gap-1 ${props.billEditPermission ? 'disabled' : ''}`}
                      style={{
                        // backgroundColor: props.billEditPermission ? "#f9f9f9" : "#fff",
                        cursor: props.billEditPermission ? "not-allowed" : "pointer",
                      }}
                      onClick={() => {
                        if (!props.billEditPermission) {
                          handleEdit(props);
                        }
                      }}
                    >
                      <img
                        src={Edit}
                        style={{
                          height: 16,
                          width: 16,
                          filter: props.billEditPermission ? "grayscale(100%)" : "none", // Makes the icon appear disabled
                        }}
                        alt="Edit"
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy, sans-serif",
                          color: props.billEditPermission ? "#ccc" : "#222222", // Disabled color
                          cursor: props.billEditPermission ? "not-allowed" : "pointer",
                        }}
                      >
                        Edit
                      </label>
                    </div>

                    <div className='mb-3 d-flex justify-content-start align-items-center gap-1'
                      onClick={() => handleInvoicepdf(props.item)}

                      style={{ marginTop:"-5px" }}
                    >
                      <img src={Download} alt="download" style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Download</label>
                    </div>

                    {
                      props.item.BalanceDue !== 0 &&


                      <div
                        className={`mb-3 d-flex justify-content-start align-items-center gap-1 ${props.billAddPermission ? 'disabled' : ''}`}
                        onClick={() => {
                          if (!props.billAddPermission) {
                            handleShowform(props);
                          }
                        }}
                        style={{
                          // backgroundColor: props.billAddPermission ? "#f9f9f9" : "#fff",
                          cursor: props.billAddPermission ? "not-allowed" : "pointer",marginTop:"-5px"
                        }}
                      >
                        <img
                          src={Assign}
                          style={{
                            height: 16,
                            width: 16,
                            filter: props.billAddPermission ? "grayscale(100%)" : "none", // Makes the icon appear disabled
                          }}
                          alt="Assign"
                        />
                        <label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy, sans-serif",
                            color: props.billAddPermission ? "#ccc" : "#222222", // Disabled color
                            cursor: props.billAddPermission ? "not-allowed" : "pointer",
                          }}
                        >
                          Record Payment
                        </label>
                      </div>

                    }

                    <div
                      className={`mb-2 d-flex justify-content-start align-items-center gap-1 ${props.billDeletePermission ? 'disabled' : ''}`}
                      style={{
                        // backgroundColor: props.billDeletePermission ? "#f9f9f9" : "#fff",
                        cursor: props.billDeletePermission ? "not-allowed" : "pointer",marginTop:"-5px"
                      }}
                      onClick={() => {
                        if (!props.billDeletePermission) {
                          handleBillDelete(props);
                        }
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
                          fontWeight: 500,
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