/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Pages/Invoices.css";
import moment from 'moment';
import DownLoad from '../Assets/Images/New_images/searchss.png'
import Whatsapp from '../Assets/Images/whatsapp.png'
import Whatsapp_blue from '../Assets/Images/whatsapp_blue.png'
import Whatsapp_white from '../Assets/Images/whatsapp_white.png'
import Mail from '../Assets/Images/gmail.png'
import Mail_white from '../Assets/Images/gmail_white.png'
import Message_text from '../Assets/Images/message-text.png'
import Message_text_white from '../Assets/Images/message-white.png'
import Close from '../Assets/Images/New_images/circlie.png'
import Logo from '../Assets/Images/get.png'
import Dial from '../Assets/Images/dial.png'
import Room from '../Assets/Images/Car.png'
import Locat from '../Assets/Images/location 03.png'
import Barcode from '../Assets/Images/invoice_barcode.svg'
import Gpay from '../Assets/Images/gpay.png'
import Phonepe from '../Assets/Images/phonepe.png'
import Paytm from '../Assets/Images/paytm.png'
import User from '../Assets/Images/user.png'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";





const InvoiceCard = ({ rowData, handleClosed }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      label: "Send Mail",
      icon: Mail,
      iconWhite: Mail_white,
      key: "mail",
    },
    {
      label: "Send SMS",
      icon: Message_text,
      iconWhite: Message_text_white,
      key: "sms",
    },
    {
      label: "Send Whatsapp",
      icon: Whatsapp_blue,
      iconWhite: Whatsapp_white,
      key: "whatsapp",
    },
  ];



  const [hosteldetails, setHostelDetails] = useState({})
  const [userdetails, setUserDetails] = useState({})
  const [invoice_details, setInvoiceDetails] = useState({})
  const [tabledetails, setTableDetails] = useState([])
  const [bill_template , setBillTemplate] = useState({})
  const [banking_details , setBankingDetails] = useState({})
  const [isVisible, setIsVisible] = useState(true);
  const [idforwhats, setIdForWhats] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    setIdForWhats(rowData?.id);
    setIsVisible(true)
  }, [rowData])



  useEffect(() => {
    if (state.InvoiceList.BillsPdfSuccessCode === 200) {
      setHostelDetails(state.InvoiceList.BillsPdfDetails.hostel_details)
      setUserDetails(state.InvoiceList.BillsPdfDetails.user_details)
      setTableDetails(state.InvoiceList.BillsPdfDetails.amenities)
      setInvoiceDetails(state.InvoiceList.BillsPdfDetails.invoice_details)
      setBillTemplate(state.InvoiceList.BillsPdfDetails.bill_template)
      setBankingDetails(state.InvoiceList.BillsPdfDetails.banking_details)
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_BILLS_PDF_DETAILS_STATUS_CODE" });
      }, 100);
    }
  }, [state.InvoiceList.BillsPdfSuccessCode]);

  console.log("template" , invoice_details);
  

   

  const innerScrollRef = useRef(null);

  const handleDownload = async () => {
    const element = cardRef.current;
    const innerElement = innerScrollRef.current;

    if (!element || !innerElement) return;


    const outerOriginal = {
      height: element.style.height,
      maxHeight: element.style.maxHeight,
      overflow: element.style.overflow,
      overflowY: element.style.overflowY,
    };

    const innerOriginal = {
      height: innerElement.style.height,
      maxHeight: innerElement.style.maxHeight,
      overflow: innerElement.style.overflow,
      overflowY: innerElement.style.overflowY,
    };


    element.style.height = "auto";
    element.style.maxHeight = "none";
    element.style.overflow = "visible";
    element.style.overflowY = "visible";

    innerElement.style.height = "auto";
    innerElement.style.maxHeight = "none";
    innerElement.style.overflow = "visible";
    innerElement.style.overflowY = "visible";

    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 595.28;
    const pageHeight = 841.89;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    const pdf = new jsPDF("p", "pt", "a4");
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      position = -(imgHeight - heightLeft);
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("invoice.pdf");


    Object.assign(element.style, outerOriginal);
    Object.assign(innerElement.style, innerOriginal);
  };


  const handleBackInvoice = () => {
    handleClosed()
  }

 
  const isValid = (value) => {
    return value !== null && value !== undefined && value !== "undefined" && value !== "";
  };


  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (key === "whatsapp") {
      try {
        dispatch({
          type: "SET_TRIGGER_SOURCE",
          payload: "whatsapp",
        });
        dispatch({
          type: "INVOICEPDF",
          payload: {
            id: idforwhats,
          },
        });

      } catch (error) {
        console.error("Error sending WhatsApp with PDF:", error);
      }
    }
  };



  const taxAmount = (invoice_details?.total_amount * bill_template?.tax) / 100;

  const totalAmount = invoice_details?.total_amount + taxAmount;


  console.log("rowData" , rowData);
  

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
      <div >
        <div className="d-flex justify-content-between align-items-center ps-3">


          <div className="d-flex align-items-center justify-content-between gap-3 mx-3">

            <div>


              <div className="mb-2">
                {rowData?.BalanceDue === 0 ? <span
                  style={{
                    fontSize: '10px',
                    backgroundColor: '#D9FFD9', color: '#000',
                    borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px"
                  }}>
                  Paid
                </span> : <span
                  style={{
                    fontSize: '10px', cursor: 'pointer',
                    backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000',
                    borderRadius: '14px', padding: "8px 12px"
                  }}>
                  Unpaid</span>}
              </div>
              <div className="mb-2 mt-2">
                <label style={{
                  fontSize: 15, fontWeight: 500, color: "#000000",
                  fontFamily: "Gilroy"
                }}>{moment(rowData?.Date).format('DD-MM-YYYY')}
                </label> - <label style={{
                  fontSize: 15, fontWeight: 500, color: "#000000",
                  fontFamily: "Gilroy"
                }}
                >#{rowData?.Invoices === null || rowData?.Invoices === '' ? '0.00' : rowData?.Invoices}
                </label>
              </div>
            </div>
          </div>
          <div>

            <div className="gap-2 d-flex me-3">
              <div className="d-flex  border p-1" style={{ height: 38, width: 120, borderRadius: '8px', cursor: "pointer" }} onClick={handleDownload}>
                <img src={DownLoad} className="mt-1 ms-1" alt="Download Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} />
                <p className="mt-1 ms-2" style={{ fontSize: 13, fontWeight: 400, fontFamily: "Gilroy" }}>Download</p>

              </div>
              <div className="position-relative d-inline-block">
                <div
                  className="d-flex align-items-center border p-1"
                  onClick={handleShareClick}
                  style={{
                    height: 38,
                    width: 100,
                    borderRadius: "8px",
                    cursor: "pointer",
                    borderColor: isOpen ? "#2196f3" : "#ccc",
                  }}
                >
                  <img
                    src={isOpen ? Whatsapp_blue : Whatsapp}
                    alt="Share"
                    style={{
                      height: 20,
                      width: 20,
                    }}
                    className="ms-1"
                  />
                  <p
                    className="ms-2 mt-3"
                    style={{
                      fontSize: 13,
                      fontWeight: 400,
                      fontFamily: "Gilroy",
                      color: isOpen ? "rgba(30, 69, 225, 1)" : "#000",
                    }}
                  >
                    Share
                  </p>
                </div>



                {isOpen && (
                  <div
                    className="position-absolute  start-0 mt-2 p-2 shadow"
                    style={{
                      borderRadius: "8px",
                      backgroundColor: "#fff",
                      width: 160,
                      zIndex: 10,
                    }}
                  >
                    {menuItems.map((item) => (
                      <div
                        key={item.key}
                        className="d-flex align-items-center mb-2 hover-item p-1 rounded"
                        style={{
                          backgroundColor:
                            hoveredItem === item.key ? "rgba(30, 69, 225, 1)" : "#fff",
                        }}
                        onMouseEnter={() => setHoveredItem(item.key)}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => handleMenuClick(item.key)}
                      >
                        <img
                          src={hoveredItem === item.key ? item.iconWhite : item.icon}
                          className="me-2"
                          alt={item.label}
                        />
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 400,
                            fontFamily: "Gilroy",
                            color:
                              hoveredItem === item.key
                                ? "rgba(255, 255, 255, 1)"
                                : "rgba(33, 37, 41, 1)",
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )
                }

              </div>


              <img src={Close} className="me-3 mt-1 ms-2" alt="Close Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} onClick={handleBackInvoice} />
            </div>
          </div>


        </div>
        <div style={{ height: "2px", }} className="mx-4 mt-0">
          <hr />
        </div>


        <div style={{ minHeight: '400px', overflowY: "auto", }} className="bill-invoice " >

          {isVisible &&
            <div ref={cardRef} className="border ps-4 pe-4 pb-4 pt-4 "
              style={{ width: '80%', marginLeft: '10%', marginTop: '20px', borderRadius: '8px', }}>


              <div ref={innerScrollRef}
                className="border shadow show-scroll "
                style={{
                  maxHeight: 390,
                  overflowY: "auto",
                  overflowX:'hidden',
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                }}>

                <div className=" text-white  p-2 position-relative" style={{ height: "100px", background: bill_template.template_theme || 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))', }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-lg-8">
                                           <img src={bill_template?.logo_url ? bill_template?.logo_url :  Logo} alt="logo" style={{ height:64 , minWidth:64 , maxWidth:84 , borderRadius: '4px',}} className="me-2 mt-2" />
                      {/* <img src={rowData?.hostel_profile || Logo} alt="logo" style={{ height: 40, width: 40 }} /> */}
                      <div>
                      </div>
                    </div>

                    <div className="text-start mt-2 col-lg-4 d-flex flex-wrap">
                      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy", marginRight: '20px' }}>
                        {hosteldetails.name}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
                        <>
                          {isValid(hosteldetails?.address) && <>{hosteldetails.address}, </>}
                          {isValid(hosteldetails?.area) && <>{hosteldetails.area} </>}
                         <br />
                          {isValid(hosteldetails?.city) && <>{hosteldetails.city}, </>}
                          {isValid(hosteldetails?.state) && <>{hosteldetails.state} - </>}

                          {isValid(hosteldetails?.pincode) && <>{hosteldetails.pincode}</>}
                        </>

                      </div>
                    </div>
                  </div>
                </div>


                <div className="container bg-white rounded-bottom  position-relative" style={{ width: "100%", borderTopLeftRadius: '20px' }}>
                  <div className="text-center pt-2 pb-1">
                    <h5 style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{invoice_details.invoice_type === "advance" ? "Security Deposit Invoice" :  "Payment Invoice" }</h5>
                  </div>


                  <div className="row px-4 mt-3">
                    <div className="col-md-5 mb-3">
                      <p className="  mb-1" style={{ color: 'rgba(48, 80, 210, 1)', fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill to:</p>
                      <p className="ms-1 mb-1 " style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)', }}><img src={User} alt="user" /> <span className="ms-2" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',marginLeft:8 }}>{userdetails?.name}</span></p>
                      <p className="mb-1"><img src={Dial} alt="mob" />

                        <span className="ms-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}>  + {userdetails &&
                          String(userdetails?.phone)?.slice(
                            0,
                            String(userdetails?.phone).length - 10
                          )}{" "}
                          {userdetails && String(userdetails?.phone)?.slice(-10)}</span>
                      </p>
                      <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(14, 14, 14, 1)', }}><img className="me-1" src={Room} alt="room" style={{ height: 20, width: 20 }} /> {userdetails.room_name} - {userdetails.bed_name}</p>
                      <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>

                        <div className="me-2">
                          <img src={Locat} alt="local" />
                        </div>

                        <div>
                          <div>
                            {isValid(userdetails?.address) && <>{userdetails.address}, </>}
                            {isValid(userdetails?.area) && <>{userdetails.area}, </>}
                            {isValid(userdetails?.city) && <>{userdetails.city}</>}
                          </div>
                          <div>
                            {isValid(userdetails?.state) && <>{userdetails.state} </>}
                            {isValid(userdetails?.pincode) && <>- {userdetails.pincode}</>}
                          </div>
                        </div>

                      </div>


                    </div>
                    <div className="col-md-7 mb-1 ps-5 mt-2 ">
                      <div className="row">

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>#{invoice_details?.invoice_id === null || invoice_details?.invoice_id === '' ? '0.00' : invoice_details?.invoice_id}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{moment(invoice_details?.invioice_date).format('DD MMM YYYY')}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{moment(invoice_details?.due_date).format('DD MMM YYYY')}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{moment(userdetails?.joining_date).format('DD MMM YYYY')}</div>

                      </div>
                    </div>
                  </div>


                  <div className="px-4 pb-3">
                    <div className="table-responsive">
                      <table className="table text-center">
                        <thead
                          style={{
                            // backgroundColor: "rgba(71, 104, 234, 1)",
                            background: bill_template.template_theme || 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))',
                            color: "white",
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                borderTopLeftRadius: "12px",
                                borderBottomLeftRadius: "12px",
                                color: "rgba(255, 255, 255, 1)",
                                fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600


                              }}
                            >
                              S.NO
                            </th>
                            <th style={{ color: "rgba(255, 255, 255, 1)", fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600 }}>Inv No</th>
                            <th style={{ color: "rgba(255, 255, 255, 1)", fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600 }}>Description</th>
                            <th
                              style={{
                                borderTopRightRadius: "12px",
                                borderBottomRightRadius: "12px",
                                color: "rgba(255, 255, 255, 1)",
                                fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600
                              }}
                            >
                              Amount / INR
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {tabledetails.length > 0 && tabledetails.map((item, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                              <td>{index + 1}</td>
                              <td style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500 }}>{item.invoice_id}</td>
                  <td style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500 }}>
  <div>
    {item.am_name}
  </div>
  {invoice_details.invoice_type === "advance" && item.am_name !== "Advance" && (
    <div style={{ fontSize: '12px', marginTop: '2px', color: '#666' }}>
    <p>(Refundable Amount)</p>  
    </div>
  )}
</td>
  
                              <td style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500 }}>Rs. {item.amount} </td>
                            </tr>
                          ))}
                        </tbody>

                      </table>
                    </div>

                    <div className="d-flex flex-wrap align-items-start mt-1">
                      {invoice_details.invoice_type === "manual" && (
                        <div className="text-start mt-5" style={{ flex: '1 1 0%' }}>
                          <p className="mb-0" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                            &quot; {bill_template?.notes} &quot;  
                          </p>
                         
                        </div>
                      )}
{invoice_details.invoice_type === "advance" ? (
    <div className="mt-3 ms-auto me-5" style={{ minWidth: '200px' }}>
     
        <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payable Amount</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. {invoice_details?.total_amount}</span>
                        </div>
                        <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Non Refundable</span>
                          <span className="me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs.{invoice_details?.non_refundable_amount}</span>
                        </div>
                           <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Refundable Amount</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. {invoice_details?.refundable_Amount}</span>
                        </div>
                      
                     
                      </div>

):(
  <div className="mt-3 ms-auto" style={{ minWidth: '200px' }}>
                        <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax</span>
                          <span className="me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. {taxAmount}</span>
                        </div>
                        <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. {invoice_details?.total_amount}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs. {totalAmount}</span>
                        </div>
                      </div>
)}
                    
                    </div>

                  </div>




                </div>
                <div className="px-4" style={{ marginTop: 20 }}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <h6 style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 700,
                        color: 'rgba(30, 69, 225, 1)',
                        letterSpacing: '1px'

                      }}
                      >ACCOUNT DETAILS</h6>
                      <p className="mb-1"
                        style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                        Account No : {banking_details?.acc_num} </p>
                      <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                        IFSC Code : {banking_details?.ifsc_code} </p>
                      <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                        Bank Name: {banking_details?.bank_name} </p>
                      <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                        UPI Details : {banking_details?.type} </p>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-4 d-flex flex-column justify-content-between" style={{ height: "100%" }}>
                      <div className="d-flex justify-content-end mt-auto">
                        <img src={bill_template?.qr_url ? bill_template?.qr_url :  Barcode}
                        className="img-fluid"
                         alt="Barcode" style={{ height: "auto", maxWidth: 150, borderRadius: '2px' }} />
                      </div>
                      <div className="d-flex flex-row justify-content-end">
                        <img src={Paytm} alt="Paytm" style={{ height: 38, width: 38 }} className="m-2" />
                        <img src={Phonepe} alt="PhonePe" style={{ height: 38, width: 38 }} className="m-2" />
                        <img src={Gpay} alt="GPay" style={{ height: 38, width: 38 }} className="m-2" />
                      </div>

                    </div>
                  </div>
                </div>


                <div className="row justify-content-between mt-4 mb-4 px-4">
                  <div className="col-md-8">
                    <h4 style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(30, 69, 225, 1)' }}>Terms and Conditions</h4>
                    <p style={{ whiteSpace: "pre-line", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(61, 61, 61, 1)' }}>
                    {bill_template?.terms_and_condition}
                    </p>
                  </div>

                  <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
                      {bill_template?.digital_signature_url && (
                              <img
                                src={bill_template?.digital_signature_url}
                                alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft:20 }}

                              />
                            )}
                    <p
                      style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}
                    >Authorized Signature</p>
                  </div>
                </div>



                <div className="ms-5 me-5">
                  <div
                    className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
                    style={{
                      // backgroundColor: 'rgba(48, 80, 210, 1)',
                      background: bill_template.template_theme || 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))',
                      borderTopRightRadius: '38px',
                      borderTopLeftRadius: '38px',
                    }}
                  >
                    <p
                      className="mb-0"
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 1)',

                      }}
                    >
                      email: {bill_template?.email ? bill_template?.email : ''}
                    </p>
                    <p
                      className="mb-0"
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 1)',
                      }}
                    >
                      Contact: {bill_template?.contact_number ? bill_template?.contact_number : ''}
                    </p>
                  </div>
                </div>


              </div>

            </div>

          }


        </div>
      </div>
    </div>
  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  handleClosed: PropTypes.func.isRequired
};


export default InvoiceCard;




