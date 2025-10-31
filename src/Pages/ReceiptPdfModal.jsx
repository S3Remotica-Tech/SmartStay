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
import { IoClose } from "react-icons/io5";
import { Container, Row, Col, Table } from "react-bootstrap";
import Payment from '../Assets/Images/New_images/Mask-group.png'
import Refund from '../Assets/Images/New_images/Refund.png'


const InvoiceCard = ({ rowData, handleClosed }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  console.log("rowData", rowData)

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
  const [bill_template, setBillTemplate] = useState({})
  const [banking_details, setBankingDetails] = useState({})
  const [isVisible, setIsVisible] = useState(true);
  const [idforwhats, setIdForWhats] = useState("");
  const cardRef = useRef(null);

  useEffect(() => {
    setIdForWhats(rowData?.id);
    setIsVisible(true)
  }, [rowData])

  const [billTransaction, setBillTransaction] = useState("")
  const [billReceipt, setBillReceipt] = useState("")


  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })
  //   }

  // }, [])



  // console.log("state",state)

  //   useEffect(() => {
  //     if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {

  //       // const invoiceTypeMap = {
  //       //   Rent: "RENTAL",
  //       //   Advance: "ADVANCE",
  //       // };

  // //       const selectedType = invoiceTypeMap[rowData.invoiceType];
  // //       const TempArray = state.InvoiceList?.newReceiptchanges?.configurations?.filter(
  // //         (template) => template.receiptType === selectedType
  // //       );

  // // console.log("selectedType",selectedType)



  //       setHostelDetails(state.InvoiceList?.newReceiptchanges.configurations)
  //       setUserDetails(state.InvoiceList?.newReceiptchanges.customerInfo)
  //       setTableDetails(state.InvoiceList?.newReceiptchanges)
  //       setInvoiceDetails(state.InvoiceList?.newReceiptchanges)

  //       setBillTemplate(state.InvoiceList?.newReceiptchanges.configurations)

  //       setBankingDetails(state.InvoiceList.BillsPdfDetails.banking_details)
  //       setBillTransaction(state.InvoiceList.BillsPdfDetails.Transaction)
  //       setBillReceipt(state.InvoiceList.BillsPdfDetails)
  //       setTimeout(() => {
  //         dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
  //       }, 100);
  //     }
  //   }, [state.InvoiceList.statusCodeNewReceiptStatusCode]);



  function convertNumberToWords(num) {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if ((num = num.toString()).length > 9) return "Overflow";
    const n = ("000000000" + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";
    let str = "";
    str += n[1] != 0 ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + " Crore " : "";
    str += n[2] != 0 ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + " Lakh " : "";
    str += n[3] != 0 ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + " Thousand " : "";
    str += n[4] != 0 ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + " Hundred " : "";
    str += n[5] != 0
      ? (str != "" ? "and " : "") +
      (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]]) + " "
      : "";
    return str.trim() + "Rupees Only.";
  }


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



  const pdfDetails = state.InvoiceList?.newReceiptchanges


  console.log("pdfDetailsreceiptType", pdfDetails?.configurations?.receiptType)

  console.log("pdfDetails", pdfDetails)





const hasAmount  = -100





  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
      <div >
        <div className="d-flex justify-content-between align-items-center">


          <div
            className="d-flex justify-content-between align-items-center border"
            style={{
              backgroundColor: "#fff",
              borderBottom: "1px solid #E0E0E0",
              height: "50px",
              boxShadow: "initial",
              width: "100%"
            }}
          >
            <div className="d-flex align-items-center gap-2">
              <div className="ps-1">
                <label style={{
                  fontSize: 14, fontWeight: 500, color: "#222222",
                  fontFamily: "Gilroy"
                }}
                >{pdfDetails?.invoiceNumber}
                </label>
              </div>

              <div className="">
                {rowData?.paymentStatus !== "Pending" ? <span
                  style={{
                    fontSize: '10px',
                    backgroundColor: '#D9FFD9', color: '#000',
                    borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px"
                  }}>
                  Paid
                </span> : <span
                  style={{
                    fontSize: '10px', cursor: 'pointer',
                    backgroundColor: '#FFF0F0', fontFamily: 'Gilroy', color: '#EB2427',
                    borderRadius: '14px', padding: "8px 12px"
                  }}>
                  Unpaid</span>}
              </div>

            </div>




            <div>

              <div className="gap-2 d-flex me-3">
                <div
                  className="d-flex justify-content-center align-items-center border"
                  style={{ borderRadius: '8px', cursor: "pointer", height: 30, width: 30 }}
                  onClick={handleDownload}
                >
                  <img
                    src={DownLoad}
                    alt="Download Invoice"
                    style={{ height: 15, width: 15 }}
                  />
                </div>

                <div className="position-relative d-inline-block">
                  <div
                    className="d-flex align-items-center justify-content-center gap-2"
                    onClick={handleShareClick}
                    style={{
                      height: 30,
                      width: 80,
                      borderRadius: "8px",
                      cursor: "pointer",
                      backgroundColor: "rgba(30, 69, 225, 1)",
                    }}
                  >
                    <img
                      src={Whatsapp}
                      alt="Share"
                      style={{
                        height: 15,
                        width: 15,
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        fontFamily: "Gilroy",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      Share
                    </span>
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
                <div>
                  <IoClose style={{ height: 20, width: 20, cursor: "pointer", color: "#FF0000" }} onClick={handleBackInvoice} />

                </div>

              </div>
            </div>
          </div>


        </div>


        <div style={{
          backgroundColor: "#F7F8FC", maxHeight: 565,
          overflowY: "auto",
          overflowX: 'hidden',
        }}
          className="d-flex justify-content-center p-3 show-scrolls" >

          {isVisible &&
            <div className=""
              style={{
                width: '90%', borderRadius: '8px', backgroundColor: "",
              }}

            >


              <div ref={innerScrollRef}
                style={{ borderRadius: "8px", backgroundColor: "#FFFFFF", marginBottom: 50, boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)", }}
              >

                <div className=" p-2 position-relative" style={{
                  borderTopLeftRadius: "8px", borderTopRightRadius: "8px", height: "",
                }}>
                    <div className="row d-flex justify-content-between align-items-center ps-3 pe-3">
                                       <div className="col-6" >
                                         <img src={pdfDetails?.configurations?.hostelLogo ? pdfDetails?.configurations?.hostelLogo : Logo} alt="logo" style={{ height: 64, minWidth: 64, maxWidth: 84, borderRadius: '4px', }} className="me-2 mt-2" />
                   
                   
                   
                   
                                       </div>
                   
                                       <div className="mt-2 col-5" >
                                         <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", marginRight: '20px', color: '#2B2B2B' }}>
                                           {pdfDetails?.stayInfo?.hostelName}
                                         </div>
                                         <div
                                           className="d-flex flex-wrap"
                                           style={{
                                             fontSize: 12,
                                             fontWeight: 600,
                                             fontFamily: "Gilroy",
                                             color: "#4B4B4B",
                                             wordBreak: "break-word",
                                             width: 150,
                                           }}
                                         >
                                           {pdfDetails?.configurations?.address}
                                         </div>
                   
                                       </div>
                                     </div>
                </div>

 <hr className="m-0"
                  style={{
                    borderTop: "1px solid #D9D9D9",
                  }}
                />
                <div className="container bg-white rounded-bottom  position-relative" style={{ width: "100%", }}>
                  <div className="text-center pt-2 pb-1">
                    <h5 style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: '#171717', }}>

                      {
                        pdfDetails?.configurations?.receiptType === "Rent"
                          ? "Payment Receipt"
                          : pdfDetails?.configurations?.receiptType === "Booking"
                            ? "Booking Receipt"
                            : pdfDetails?.configurations?.receiptType === "Advance"
                              ? "Security Deposit Receipt"
                              : "Final Settlement Receipt"
                      }

                    </h5>
                  </div>


                  <div className="row px-4 mt-1">
                    <div className="col-md-5 mb-3" style={{ fontFamily: "Gilroy", fontSize: 13, color: "#222" }}>

                      <div className="mb-2" style={{ fontSize: 12, fontWeight: 400, fontStyle: "italic", color: "#1E45E1" }}>
                        Receipt to:
                      </div>

                      <div className="mb-1 d-flex align-items-center">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Tenant Name:</label>
                        <span style={{ fontWeight: 600, color: "#171717", fontSize: 12 }}>
                          {pdfDetails?.customerInfo?.fullName}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Mobile No:</label>
                        <span style={{ color: "#171717", fontSize: 12 }}>
                          {pdfDetails?.customerInfo?.customerMobileNo &&
                            pdfDetails.customerInfo.customerMobileNo !== "undefined"
                            ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                            : ""}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Room No:</label>
                        <span style={{ color: "#171717", fontSize: 12 }} className="d-flex align-items-center">
                          {pdfDetails?.stayInfo?.floorName && (
                            <>
                              {pdfDetails.stayInfo.floorName}
                             {""} , {""}
                            </>
                          )}

                          {pdfDetails?.stayInfo?.roomName && (
                            <>
                              {pdfDetails.stayInfo.roomName} {""} - {""}
                             
                            </>
                          )}

                          {pdfDetails?.stayInfo?.bedName}
                        </span>

                      </div>

                      <div className="d-flex ">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Address:</label>

                        <div style={{ color: "#171717", fontSize: 12 }} className="ms-5" >
                          {pdfDetails?.customerInfo?.fullAddress}


                        </div>
                      </div>

                    </div>

                    <div className="col-md-7 mb-1 ps-5 mt-2 ">
                      <div className="row">

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Receipt No : </div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.receiptNumber}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.transactionDate}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Time :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.transactionTime}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Payment Mode:</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.accountDetails?.bankName}</div>
                        {
                          pdfDetails?.configurations?.receiptType !== 'Rent' && <><div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Transaction ID :</div>
                            <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.transactionId}</div></>
                        }
                      </div>
                    </div>
                  </div>




                  <div className="d-flex px-4">
                    <div className=""
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        border: "1px solid #E6E6E6",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        width: "100%",
                        fontFamily: "Gilroy",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRight: "1px solid #E6E6E6",
                          fontWeight: 600,
                          fontSize: "13px",
                          color: "#000",
                          textTransform:"capitalize"
                        }}
                      >
                       { Number(pdfDetails?.invoiceAmount) > 0 ? "TOTAL PAID AMOUNT" : "Total Refunded Amount"  }<br />

                        {
                          pdfDetails?.configurations?.receiptType !== 'Rent' && <span style={{ fontFamily: "Gilroy", color: "#6D6D6D", fontSize: 11 }}>Security Deposit (Advance)</span>
                        }

                      </div>


                      <div
                        style={{
                          flex: 2,
                          backgroundColor: "#fff",
                          borderRadius: 10
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            color: "#000000",
                            fontWeight: 600,
                            fontSize: "18px",
                            backgroundColor: "#F1FFF5",
                            padding: 10,
                            borderTopRightRadius: "10px",
                          }}
                        >
                          <div
                            style={{
                              height: "24px",
                              width: "3px",
                              backgroundColor:Number(pdfDetails?.invoiceAmount) > 0 ? "#00A651" : "#FF0000",
                            }}
                          />
                          ₹ {pdfDetails?.receiptInfo?.paidAmount}
                        </div>
                        <div
                          style={{
                            marginTop: "0px",
                            fontSize: "12px",
                            color: "#4B4B4B", padding: 10,
                          }}
                        >
                          {convertNumberToWords(pdfDetails?.receiptInfo?.paidAmount || 0)}
                        </div>
                      </div>
                    </div>

                  </div>


                </div>




                <div className="row justify-content-between mt-4 mb-0 px-5">
                  <div className="col-md-8 p-0">
                    <h4 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: '#4B4B4B' }}>Acknowledgment</h4>
                    <p style={{ whiteSpace: "pre-line", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: '#3D3D3D', paddingRight: 50 }}>
                      {pdfDetails?.configurations?.termAndCondition}
                    </p>
                  </div>

                  <div className="col-md-4 d-flex flex-column justify-content-end align-items-end p-0">
                    {pdfDetails?.configurations?.signatureUrl && (
                      <img
                        src={pdfDetails?.configurations?.signatureUrl}
                        alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft: 20 }}

                      />
                    )}
                    <p
                      style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}
                    >Authorized Signature</p>
                  </div>
                </div>


                <div className="row justify-content-between mt-2 mb-0 px-5">
                  <div className="col-md-8 p-0">
                    <p style={{ whiteSpace: "pre-line", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: '#3D3D3D', paddingRight: 50 }}>
                      {pdfDetails?.configurations?.receiptNotes}
                    </p>
                  </div>

                  <div className="col-md-4 p-0 d-flex flex-column justify-content-end align-items-end bg-white">

{Number(pdfDetails?.invoiceAmount) > 0 ? (
  <p className="text-success fw-bold border-success d-inline-block">
    <img
      src={Payment}
      alt="payment received"
      className="img-fluid"
      style={{ transform: "rotate(0deg)" }}
    />
  </p>
) : (
  <p className="text-danger fw-bold border-danger d-inline-block">
    <img
      src={Refund}
      alt="refund"
      className="img-fluid"
      style={{ transform: "rotate(0deg)" }}
    />
  </p>
)}

                  </div>
                </div>



                {(pdfDetails?.configurations?.receiptType === 'Advance' || pdfDetails?.configurations?.receiptType === 'Booking') ?

                  <div
                    className="table-responsive row justify-content-between mt-0 mb-2 px-5"
                    style={{ fontFamily: "Gilroy, sans-serif" }}
                  >
                    <table className="p-0"
                      style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        border: "1px solid #dee2e6",
                        borderRadius: "12px",
                        overflow: "hidden",
                        fontFamily: "Gilroy, sans-serif",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "left",
                              borderBottom: "1px solid #dee2e6",
                              width: "10%",
                            }}
                          >
                            S.NO
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "left",
                              borderBottom: "1px solid #dee2e6",
                              width: "60%",
                            }}
                          >
                            DESCRIPTION
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "right",
                              borderBottom: "1px solid #dee2e6",
                              width: "30%",
                            }}
                          >
                            AMOUNT / INR
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          style={{
                            // borderBottom: "1px solid #dee2e6",
                            backgroundColor: "#fff",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            1
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            Security Deposit (Advance) - Deductions
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "right",
                              verticalAlign: "middle",
                            }}
                          >
                            Rs. {pdfDetails?.receiptInfo?.paidAmount?.toLocaleString("en-IN")}
                          </td>
                        </tr>


                        <tr
                          style={{
                            backgroundColor: "#F9F9F9",
                            fontWeight: 600,
                          }}
                        >
                          <td
                            colSpan="2"
                            style={{
                              textAlign: "left",
                              padding: "10px 14px",
                              fontSize: "13px",
                              // borderTop: "1px solid #dee2e6",
                              color: "#000",
                            }}
                          >
                            Total
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "10px 14px",
                              fontSize: "13px",
                              // borderTop: "1px solid #dee2e6",
                              color: "#000",
                            }}
                          >
                            ₹ {pdfDetails?.receiptInfo?.paidAmount?.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>


                  : pdfDetails?.configurations?.receiptType === 'Rent' ?
                    <div className="table-responsive row justify-content-between mt-0 mb-2 px-5" style={{ fontFamily: "Gilroy, sans-serif" }}>
                      <table className="p-0"
                        style={{
                          width: "100%",
                          borderCollapse: "separate",
                          borderSpacing: 0,
                          border: "1px solid #dee2e6",
                          borderRadius: "12px",
                          overflow: "hidden",
                          fontFamily: "Gilroy, sans-serif",
                        }}
                      >
                        <thead>
                          <tr >
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "left",
                                borderBottom: "1px solid #dee2e6",
                                width: "20%",
                              }}
                            >
                              INVOICE NO.
                            </th>
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "left",
                                borderBottom: "1px solid #dee2e6",
                                width: "20%",
                              }}
                            >
                              INV DATE
                            </th>
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "right",
                                borderBottom: "1px solid #dee2e6",
                                width: "30%",
                              }}
                            >
                              INVOICE AMOUNT
                            </th>
                            <th
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 600,
                                color: "#000",
                                textAlign: "right",
                                borderBottom: "1px solid #dee2e6",
                                width: "30%",
                              }}
                            >
                              PAYMENT AMOUNT
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr
                            style={{
                              borderBottom: "1px solid #dee2e6",
                              backgroundColor: "#fff",
                            }}
                          >
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#1E80E1",
                                textDecoration: "underline",
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              {pdfDetails?.invoiceNumber}
                            </td>
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#444",
                                textAlign: "left",
                                verticalAlign: "middle",
                              }}
                            >
                              {pdfDetails?.invoiceDate}
                            </td>
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#444",
                                textAlign: "right",
                                verticalAlign: "middle",
                              }}
                            >
                              ₹ {pdfDetails?.invoiceAmount?.toLocaleString("en-IN")}
                            </td>
                            <td
                              style={{
                                padding: "10px 14px",
                                fontSize: "13px",
                                fontWeight: 500,
                                color: "#444",
                                textAlign: "right",
                                verticalAlign: "middle",
                              }}
                            >
                              ₹ {pdfDetails?.receiptInfo?.paidAmount?.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    :

 <div
                    className="table-responsive row justify-content-between mt-0 mb-2 px-5"
                    style={{ fontFamily: "Gilroy, sans-serif" }}
                  >
                    <table className="p-0"
                      style={{
                        width: "100%",
                        borderCollapse: "separate",
                        borderSpacing: 0,
                        border: "1px solid #dee2e6",
                        borderRadius: "12px",
                        overflow: "hidden",
                        fontFamily: "Gilroy, sans-serif",
                      }}
                    >
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "left",
                              borderBottom: "1px solid #dee2e6",
                              width: "10%",
                            }}
                          >
                            S.NO
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "left",
                              borderBottom: "1px solid #dee2e6",
                              width: "60%",
                            }}
                          >
                            DESCRIPTION
                          </th>
                          <th
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 600,
                              color: "#000",
                              textAlign: "right",
                              borderBottom: "1px solid #dee2e6",
                              width: "30%",
                            }}
                          >
                            AMOUNT / INR
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr
                          style={{
                            // borderBottom: "1px solid #dee2e6",
                            backgroundColor: "#fff",
                          }}
                        >
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                            1
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "left",
                              verticalAlign: "middle",
                            }}
                          >
                           {pdfDetails?.configurations?.receiptType}
                          </td>
                          <td
                            style={{
                              padding: "10px 14px",
                              fontSize: "13px",
                              fontWeight: 500,
                              color: "#444",
                              textAlign: "right",
                              verticalAlign: "middle",
                            }}
                          >
                            Rs. {pdfDetails?.invoiceAmount?.toLocaleString("en-IN")}
                          </td>
                        </tr>


                        <tr
                          style={{
                            backgroundColor: "#F9F9F9",
                            fontWeight: 600,
                          }}
                        >
                          <td
                            colSpan="2"
                            style={{
                              textAlign: "left",
                              padding: "10px 14px",
                              fontSize: "13px",
                              // borderTop: "1px solid #dee2e6",
                              color: "#000",
                            }}
                          >
                            Total
                          </td>
                          <td
                            style={{
                              textAlign: "right",
                              padding: "10px 14px",
                              fontSize: "13px",
                              // borderTop: "1px solid #dee2e6",
                              color: "#000",
                            }}
                          >
                            ₹ {pdfDetails?.receiptInfo?.paidAmount?.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                    // <div className="mt-0 mb-2 px-5" style={{ fontFamily: "Gilroy" }}>
                    //   <Row style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}>

                    //     <Col md={6} className="p-1">
                    //       <Table responsive className="mb-0">
                    //         <thead>
                    //           <tr style={{ backgroundColor: "#FFF" }}>
                    //             <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" , textTransform:"capitalize"}}>Refund</th>
                    //             <th
                    //               style={{
                    //                 fontSize: 12,
                    //                 fontWeight: 600,
                    //                 color: "#222222",
                    //                 textAlign: "right",
                    //               }}
                    //             >
                    //               AMOUNT / INR
                    //             </th>
                    //           </tr>
                    //         </thead>

                    //         <tbody>
                    //           {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                    //             <tr key={index}>
                    //               <td
                    //                 style={{
                    //                   fontSize: 12,
                    //                   color: "#2D2D2D",
                    //                   fontWeight: 500,
                    //                 }}
                    //               >
                    //                 {item.description}
                    //               </td>
                    //               <td
                    //                 style={{
                    //                   fontSize: 12,
                    //                   textAlign: "right",
                    //                   fontWeight: 600,
                    //                   color: "#2D2D2D",
                    //                 }}
                    //               >
                    //                 ₹ {Number(item.amount)}
                    //               </td>
                    //             </tr>
                    //           ))}

                    //           <tr
                    //             style={{
                    //               backgroundColor: "#FAFBFF",
                    //               fontWeight: 600,
                    //               borderTop: "1px solid #DFDFDF",
                    //             }}
                    //           >
                    //             <td
                    //               style={{
                    //                 fontSize: 14,
                    //                 color: "#2D2D2D",
                    //                 fontWeight: 500,
                    //               }}
                    //             >
                    //               Total
                    //             </td>
                    //             <td
                    //               style={{
                    //                 textAlign: "right",
                    //                 fontSize: 14,
                    //                 fontWeight: 600,
                    //                 color: "#2D2D2D",
                    //               }}
                    //             >
                    //               ₹{" "}
                    //               {Number(pdfDetails?.invoiceInfo?.subTotal || 0)}
                    //             </td>
                    //           </tr>
                    //         </tbody>
                    //       </Table>

                    //     </Col>


                    //     <Col md={6} className="p-1">
                    //       <Table responsive className="mb-0">
                    //         <thead>
                    //           <tr style={{ backgroundColor: "#FFF" }}>
                    //             <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textTransform:"capitalize" }}>Deductions</th>
                    //             <th
                    //               style={{
                    //                 fontSize: 12,
                    //                 fontWeight: 600,
                    //                 color: "#222222",
                    //                 textAlign: "right",
                    //               }}
                    //             >
                    //               AMOUNT / INR
                    //             </th>
                    //           </tr>
                    //         </thead>

                    //         <tbody>

                    //           {pdfDetails?.invoiceInfo?.taxAmount > 0 && (
                    //             <tr>
                    //               <td
                    //                 style={{
                    //                   fontSize: 12,
                    //                   color: "#2D2D2D",
                    //                   fontWeight: 500,
                    //                 }}
                    //               >
                    //                 GST ({pdfDetails?.invoiceInfo?.taxPercentage}%)
                    //               </td>
                    //               <td
                    //                 style={{
                    //                   fontSize: 12,
                    //                   color: "#2D2D2D",
                    //                   fontWeight: 600,
                    //                   textAlign: "right",
                    //                 }}
                    //               >
                    //                 ₹{" "}
                    //                 {Number(pdfDetails?.invoiceInfo?.taxAmount).toLocaleString("en-IN", {
                    //                   minimumFractionDigits: 2,
                    //                 })}
                    //               </td>
                    //             </tr>
                    //           )}

                    //           <tr
                    //             style={{
                    //               backgroundColor: "#FAFBFF",
                    //               fontWeight: 600,
                    //               borderTop: "1px solid #DFDFDF",
                    //             }}
                    //           >
                    //             <td
                    //               style={{
                    //                 fontSize: 14,
                    //                 color: "#2D2D2D",
                    //                 fontWeight: 500,
                    //               }}
                    //             >
                    //               Total
                    //             </td>
                    //             <td
                    //               style={{
                    //                 textAlign: "right",
                    //                 fontSize: 14,
                    //                 fontWeight: 600,
                    //                 color: "#2D2D2D",
                    //               }}
                    //             >
                    //               ₹{" "}
                    //               {Number(pdfDetails?.invoiceInfo?.taxAmount || 0)}
                    //             </td>
                    //           </tr>
                    //         </tbody>
                    //       </Table>


                    //     </Col>
                    //   </Row>



                    // </div>

                }




                 <hr className="m-0"
                  style={{
                    borderTop: "1px solid #D9D9D9",
                  }}
                />

                  <div className="px-5 mt-2 mb-5">
                  <div
                    className="text-center rounded-bottom d-flex justify-content-between"
                    style={{
                      borderTopRightRadius: '38px',
                      borderTopLeftRadius: '38px',
                    }}
                  >

                    <p
                      className="mb-0"
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: '#4B4B4B',
                      }}
                    >
                      Email:
                      <span
                        style={{
                          fontSize: '13px',
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                          color: '#222222',
                        }}
                      >
                        {pdfDetails?.emailId}
                      </span>
                    </p>


                    <p
                      className="mb-0"
                      style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 500,
                        color: '#4B4B4B',
                      }}
                    >
                      Contact:
                      <span
                        style={{
                          fontSize: '13px',
                          fontFamily: 'Gilroy',
                          fontWeight: 600,
                          color: '#222222',
                        }}
                      >
                        {pdfDetails?.mobile && `+${pdfDetails?.countryCode} ${pdfDetails?.mobile}`}
                      </span>
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








