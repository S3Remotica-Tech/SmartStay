import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import User from '../Assets/Images/New_images/profile-picture.png';
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import Assign from '../Assets/Images/MoneyAdd-Linear-32px.png'
import moment from 'moment';
import squre from '../Assets/Images/New_images/minus-square.png';
import Download from '../Assets/Images/New_images/download.png';



const InvoiceTable = (props) => {


  const Tablebodystyle = {

    fontFamily: 'Gilroy',
    color: "#000",
    fontSize: "14px",
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: 'normal'
  }


  const customCheckboxStyle = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid #DCDCDC',
    borderRadius: '4px',
    display: 'inline-block',
    position: 'relative',
  };

  const [showDots, setShowDots] = useState('')

  const handleShowDots = () => {
    setShowDots(!showDots)
  }


  const handleShowform = (props) => {
    props.OnHandleshowform(props)
  }
  const handleEdit = (props) => {
    props.OnHandleshowEditform(props)
  }

  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item)
  }

  const handleBillDelete = (props) => {
    props.OnHandleshowDeleteform(props)
  }
  let Dated = new Date(props.item.Date);

  let day = Dated.getDate();
  let month = Dated.getMonth() + 1; // Months are zero-based
  let year = Dated.getFullYear();

  let formattedDate = `${day}/${month}/${year}`;



  let dueDated = new Date(props.item.DueDate);

  let daydue = dueDated.getDate();
  let monthdue = dueDated.getMonth() + 1; // Months are zero-based
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

  const [downLoadInvoiceTable, setDownloadInvoiceTable] = useState(false)

  const handleDownload = (item) => {

    props.DisplayInvoice(true, item)

    setDownloadInvoiceTable(true)

  }




  return (

    <>

      <tr key={props.item.id} style={{ color: "#000", fontFamily: "Gilroy", fontSize: "14px", fontStyle: "normal", lineHeight: "normal", alignItems: 'center', marginTop: '10px', flexWrap: "wrap" }} className='m-2' >


        <td className="table-cells" style={{ border: "none", flexWrap: "wrap", }}>
          <div className="d-flex  align-items-center">
            {/* <div className="d-flex  align-items-center">
                            <span >
                              <img
                                src={
                                    props.item.user_profile && props.item.user_profile !== "0"
                                        ? props.item.user_profile
                                        : User
                                }
                                style={{ height: 40, width: 40 }}
                            />
                            </span></div> */}
            <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '16px', marginLeft: '8px', color: "#1E45E1", 
            fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer", textAlign: "start" }} 
            onClick={() => handleDownload(props.item)}

            >{props.item.Name}</div><br />

          </div>
        </td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} className=''>#{props.item.Invoices == null || props.item.Invoices == '' ? '0.00' : props.item.Invoices}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDate}</span></td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}><span style={{ backgroundColor: "#EBEBEB", borderRadius: "60px", lineHeight: "1.5em", margin: "0", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", padding: "8px 12px" }}>{formattedDueDate}</span></td>

        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} > ₹{props.item.Amount.toLocaleString('en-IN')}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }} >₹{props.item.BalanceDue.toLocaleString('en-IN')}</td>
        <td style={{ border: "none", textAlign: 'start', verticalAlign: 'middle', fontSize: 16, fontWeight: 500, color: props.item.BalanceDue === 0 ? "green" : "red", fontFamily: "Gilroy" }}>
          {props.item.BalanceDue === 0 ? <span style={{ backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span> : <span
            style={{ cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Unpaid</span>}</td>






        <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }} className=''>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative" }} onClick={handleShowDots}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20, }} />

              {showDots && <>
                <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 50, top: 20, width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 10, alignItems: "center", zIndex: showDots ? 1000 : 'auto' }}>
                  <div style={{ backgroundColor: "#fff" }} className=''>

                    <div
                      className={`mb-3 d-flex justify-content-start align-items-center gap-2 ${props.billEditPermission ? 'disabled' : ''}`}
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

                    <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                      onClick={() => handleInvoicepdf(props.item)}

                      style={{ backgroundColor: "#fff" }}
                    >
                      <img src={Download} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Download</label>
                    </div>
                    <div
                      className={`mb-3 d-flex justify-content-start align-items-center gap-2 ${props.billAddPermission ? 'disabled' : ''}`}
                      onClick={() => {
                        if (!props.billAddPermission) {
                          handleShowform(props);
                        }
                      }}
                      style={{
                        // backgroundColor: props.billAddPermission ? "#f9f9f9" : "#fff",
                        cursor: props.billAddPermission ? "not-allowed" : "pointer",
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



                    <div
                      className={`mb-2 d-flex justify-content-start align-items-center gap-2 ${props.billDeletePermission ? 'disabled' : ''}`}
                      style={{
                        // backgroundColor: props.billDeletePermission ? "#f9f9f9" : "#fff",
                        cursor: props.billDeletePermission ? "not-allowed" : "pointer",
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
export default InvoiceTable;