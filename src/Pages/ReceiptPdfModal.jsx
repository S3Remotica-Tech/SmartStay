/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { toWords } from 'number-to-words';
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
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import './BillPdfModal.css';
import received from '../Assets/Images/New_images/received.png'
import "./Receipt.css";
import mob from "../Assets/Images/New_images/Rectangle 77.png";
import substrac from "../Assets/Images/New_images/Subtract.png";
import frame from "../Assets/Images/New_images/FramePDF.png";
import mobblue from "../Assets/Images/New_images/Rectangleblue.png";
import substracBlue from "../Assets/Images/New_images/location 03.png";
import frameblue from "../Assets/Images/New_images/Frameblue.png";
import paidfull from '../Assets/Images/New_images/paidfull.png'
import { useDispatch, useSelector } from "react-redux";
import Logo from '../Assets/Images/get.png'
import receiptLogo from '../Assets/Images/New_images/receiptlogo.png';
import User from '../Assets/Images/user.png'
import PaymentUser from '../Assets/Images/usertwo.png'



const ReceiptPdfCard = ({ rowData, handleClosed }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [idforwhats, setIdForWhats] = useState("");
  const [receiptDataNew, setReceiptDataNew] = useState("");
  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setReceiptDataNew(state.InvoiceList.newReceiptchanges.receipt)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }

  }, [state.InvoiceList.statusCodeNewReceiptStatusCode])


  const cardRef = useRef(null);

  useEffect(() => {

    setIsVisible(true)
    if (rowData?.id) {
      setIdForWhats(rowData?.id);
      dispatch({ type: "RECEIPTPDF_NEWCHANGES", id: rowData?.id })
    }

  }, [rowData])



  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

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

  const isValid = (value) => {
    return value !== null && value !== undefined && value !== "undefined" && value !== "";
  };


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

  const amountInWords = rowData?.amount_received
    ? `${toWords(rowData.amount_received).replace(/\b\w/g, char => char.toUpperCase())} Rupees`
    : '';

  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (key === "whatsapp") {
      try {
        dispatch({
          type: "SET_TRIGGER_SOURCE",
          payload: "whatsapp",
        });

        dispatch({
          type: "RECEIPTPDF",
          payload: {
            id: idforwhats,
          },
        });

      } catch (error) {
        console.error("Error sending WhatsApp with PDF:", error);
      }
    }
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
      <div >
        <div className="d-flex justify-content-between 
            align-items-center ps-3">


          <div className="d-flex align-items-center 
                justify-content-between gap-3 mx-3">

            <div>


              <div className="mb-3">
                <span style={{ fontSize: '10px', backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span>

              </div>
              <div className="mb-2 mt-2">
                <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>
                  {moment(receiptDataNew?.Date).format('DD-MM-YYYY')}
                </label>
                -
                <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>
                  #{(receiptDataNew?.invoice_number && receiptDataNew?.invoice_number !== '' && receiptDataNew?.invoice_number !== '0')
                    ? receiptDataNew.invoice_number
                    : (receiptDataNew?.reference_id || '0.00')}
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


              <img src={Close} className="me-3 mt-1 ms-2" alt="Close Invoice" style={{ height: 20, width: 20, cursor: "pointer" }}
                onClick={handleBackInvoice} />
            </div>

          </div>

        </div>
        <div style={{ height: "2px", }} className="mx-4 mt-0">
          <hr />
        </div>

        <div style={{ maxHeight: 400, }} className=" receipt-invoice">

          {isVisible &&

            receiptDataNew.invoice_type === "checkout" ? (
            <div className="receipt-container border ps-4 pe-4 pb-4 pt-4"
              ref={cardRef} style={{ width: '80%', marginLeft: '10%', marginTop: '20px', borderRadius: '8px', }}>

              <div ref={innerScrollRef}
                className="border shadow show-scroll"
                style={{
                  maxHeight: 390,
                  overflowY: "auto",
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                }}>

                <div className=" text-white  p-3 position-relative" style={{ height: 100, backgroundColor: "#1E45E1" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="fw-bold mb-0"><img src={Logo} alt="logo" style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }} className="me-2" />Smartstay</h4>
                      <small className="ms-4" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", marginTop: '15px', marginLeft: '-15px' }}>Meet All Your Needs</small>
                    </div>

                    <div>
                      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy", marginRight: '20px' }}>
                        {receiptDataNew?.hostel_details?.name}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
                        <>
                          {isValid(receiptDataNew?.hostel_details?.address) && <>{receiptDataNew?.hostel_details?.address}, </>}
                          {isValid(receiptDataNew?.hostel_details?.area) && <>{receiptDataNew?.hostel_details?.area}, </>}
                          {isValid(receiptDataNew?.hostel_details?.landmark) && <>{receiptDataNew?.hostel_details?.landmark} </>} <br />
                          {isValid(receiptDataNew?.hostel_details?.city) && <>{receiptDataNew?.hostel_details?.city}, </>}
                          {isValid(receiptDataNew?.hostel_details?.state) && <>{receiptDataNew?.hostel_details?.state} - </>}
                          {isValid(receiptDataNew?.hostel_details?.pincode) && <>{receiptDataNew?.hostel_details?.pincode}</>}
                        </>

                      </div>
                    </div>


                  </div>
                </div>


                <div className="container bg-white rounded-bottom border position-relative" style={{ width: "100%", }}>
                  <div className="text-center pt-2 pb-1">
                    <p className="" style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>
                      {receiptDataNew.invoice_type === "advance" && "Security Deposit Receipt"}
                      {receiptDataNew.invoice_type === "checkout" && "Final Settlement Receipt"}
                      {receiptDataNew.invoice_type !== "advance" && receiptDataNew.invoice_type !== "checkout" && "Payment Receipt"}
                    </p>


                  </div>


                  <div className="row px-4 mt-2">
                    <div className="col-md-7 mb-3">
                      <p className="mb-1" style={{ fontSize: '13px', color: '#1E45E1', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill To:</p>
                      <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)', }}><img src={User} alt="user" /> <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',marginLeft:8 }}>{receiptDataNew?.user_details?.name}</span></p>
                      <p className="mb-1"><img src={mobblue} alt="mob" width={12} height={12} />
                        <span className="ms-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}>  + {receiptDataNew &&
                          String(receiptDataNew?.user_details?.phone)?.slice(
                            0,
                            String(receiptDataNew?.user_details?.phone).length - 10
                          )}{" "}
                          {receiptDataNew && String(receiptDataNew?.user_details?.phone)?.slice(-10)}</span>
                      </p>
                      <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}><img src={frameblue} alt="frame" width={15} height={15} className="me-1" /> {receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</p>

                      <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>

                        <div className="me-2">
                          <img src={substracBlue} alt="local" />
                        </div>

                        <div>
                          <div>
                            {isValid(receiptDataNew?.user_details?.address) && <>{receiptDataNew?.user_details?.address} , </>}
                            {isValid(receiptDataNew?.user_details?.area) && <>{receiptDataNew?.user_details?.area} , </>}
                           
                          </div>
                          <div>
                             {isValid(receiptDataNew?.user_details?.city) && <>{receiptDataNew?.user_details?.city} .</>}
                            {isValid(receiptDataNew?.user_details?.state) && <>{receiptDataNew?.user_details?.state} </>}
                            {isValid(receiptDataNew?.user_details?.pincode) && <>- {receiptDataNew?.user_details?.pincode} .</>}
                          </div>
                        </div>

                      </div>

                    </div>
                    <div className="col-md-5 mb-3">
                      <div className="row">

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Receipt No :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.reference_id}</div>

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Room No :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</div>
                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Payment Mode :</div>
                        <div className="col-6  text-start" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginTop: 2, paddingLeft: 18 }}> {receiptDataNew?.bank_type !== ""
                          ? receiptDataNew.bank_type
                          : receiptDataNew.payment_mode}</div>
                      </div>
                    </div>
                  </div>


                  <div className="px-4 pb-3">
                    <div className="table-responsive">
                      <table className="table  text-center align-middle">
                        <thead style={{ backgroundColor: "#1E45E1", color: "#FFFFFF" }}>
                          <tr style={{ color: "white" }}>
                            <th style={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400 }}>S.NO</th>
                            <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400 }}>Description</th>
                            <th style={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400 }}>Amount / INR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptDataNew?.amenities?.map((item, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{index + 1}</td>
                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{item.am_name}</td>
                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>Rs: {item.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>


                    <div className="d-flex justify-content-end mt-3"  >
                      <div className="w-100 w-md-50" style={{ paddingRight: "80px" }}>

                        <div className="d-flex justify-content-end py-1">
                          <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Advance Amount</div>
                          <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}> Rs: {receiptDataNew?.total_advance_amount}</div>
                        </div>




                        <div className="d-flex justify-content-end py-2 fw-bold">
                          <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: '#1E1E1E', }}>Refundable Total</div>
                          <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: '#1E1E1E', }}>Rs: {receiptDataNew?.advance_return}</div>
                        </div>
                      </div>
                    </div>

                  </div>



                </div>
                <div className="px-4" style={{ marginTop: 20 }}>
                  <div className="row">
                    <div className="col-md-8">
                      <h6 className="" style={{ color: '#1E45E1', fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500 }}>Acknowledgment</h6>
                      <p style={{ fontSize: "12px", color: "#555", fontFamily: 'Gilroy', fontWeight: 400 }}>
                        This document confirms final settlement for the Tenant on <br></br>
                        {moment(receiptDataNew?.Date).format('DD/MM/YYYY')}. All dues are cleared, and room has been vacated.
                      </p>
                    </div>
                    <div className="col-md-4 text-end">
                      <p className="mt-4" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}>
                        Authorized Signature</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between mt-4 align-items-start flex-wrap ms-4">

                  <div className="text-start mt-4">
                    <p className="mb-0" style={{ fontSize: "12px", fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                      &quot;Your comfort is our priority –
                    </p>
                    <p className="mb-0" style={{ fontSize: "12px", fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                      See you again at Smart Stay! &quot;
                    </p>
                  </div>


                  <div>
                    <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received" height={81} width={152} /></p>

                  </div>
                </div>

                <div className=" px-5">
                  <div className=" text-white text-center" style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px", backgroundColor: "#1E45E1", padding: 7 }}>
                    <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)', }}>email:{receiptDataNew?.hostel_details?.email} | Contact: +{receiptDataNew?.hostel_details?.phone}</small>
                  </div>
                </div>
              </div>
            </div>
          ) :
            <div className="receipt-container border ps-4 pe-4 pb-4 pt-4 " ref={cardRef} style={{ width: "80%", marginLeft: '10%', marginTop: '20px', borderRadius: '8px', }} >

              <div ref={innerScrollRef}
                className="border shadow show-scroll"
                style={{
                  maxHeight: 390,
                  overflowY: "auto",
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                }}>
                <div className=" text-white  p-2 position-relative" style={{ minHeight: "100px", backgroundColor: "#00A32E" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className=" mb-0"><img src={receiptLogo} alt="logo" style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }} className="me-2" />Smartstay</h4>
                      <small className="ms-4" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", marginTop: '15px', marginLeft: '-15px' }}>Meet All Your Needs</small>
                    </div>
                    <div className="text-start mt-2">
                      <h5 className="mb-0 " style={{ fontSize: 18, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy", marginRight: '20px' }}>{receiptDataNew?.hostel_details?.name}</h5>
                      <p style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }} className="">{receiptDataNew?.hostel_details?.address} , {receiptDataNew?.hostel_details?.area}  {receiptDataNew?.hostel_details?.landmark} <br />
                        {receiptDataNew?.hostel_details?.city} , {receiptDataNew?.hostel_details?.state} - {receiptDataNew?.hostel_details?.pincode}</p>
                    </div>
                  </div>
                </div>


                <div className="container bg-white rounded-bottom border position-relative" style={{}}>
                  <div className="text-center pt-2 pb-1">
                    <h5 className="" style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.invoice_type === "advance" ? "Security Deposit Receipt" : "Payment Receipt"}</h5>
                  </div>


                  <div className="row px-4 mt-3">
                    <div className="col-md-7 mb-3">
                      <p className=" mb-1" style={{ color: 'rgba(0, 163, 46, 1)', fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill To :</p>
                      <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)', }}><img src={PaymentUser} alt="user" /><span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: '#000000', marginLeft:12}}>{receiptDataNew?.user_details?.name}</span></p>
                      <p className="mb-1"><img src={mob} alt="mob" width={12} height={12} />
                        <span className="ms-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}>  + {receiptDataNew &&
                          String(receiptDataNew?.user_details?.phone)?.slice(
                            0,
                            String(receiptDataNew?.user_details?.phone).length - 10
                          )}{" "}
                          {receiptDataNew && String(receiptDataNew?.user_details?.phone)?.slice(-10)}</span>
                      </p>
                      <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}><img src={frame} alt="frame" width={15} height={15} className="me-1" /> {receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</p>
                      <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>

                        <div className="me-2">
                          <img src={substrac} alt="subs" />
                        </div>

                        <div>
                            {isValid(receiptDataNew?.user_details?.address) && <>{receiptDataNew?.user_details?.address}, </>}
                            {isValid(receiptDataNew?.user_details?.area) && <>{receiptDataNew?.user_details?.area}, </>}
                            {isValid(receiptDataNew?.user_details?.city) && <>{receiptDataNew?.user_details?.city}</>}
                            {isValid(receiptDataNew?.user_details?.state) && <>{receiptDataNew?.user_details?.state} </>}
                            {isValid(receiptDataNew?.user_details?.pincode) && <>- {receiptDataNew?.user_details?.pincode}</>}
                        </div>

                      </div>

                    </div>
                    <div className="col-md-5 mb-3">
                      <div className="row">
                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Receipt No :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.reference_id}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Invoice Ref :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.invoice_number}</div>

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>



                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Payment Mode :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', paddingLeft: 18 }}> {receiptDataNew?.bank_type !== ""
                          ? receiptDataNew.bank_type
                          : receiptDataNew.payment_mode}</div>
                      </div>
                    </div>
                  </div>

                  {receiptDataNew?.invoice_type === "advance" && (
                    <div className="d-flex justify-content-end text-end mt-3 me-5">
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", marginRight: '15px', marginTop: '60px' }}>
                          Amount received
                        </label>
                      </div>
                      <div style={{ padding: '20px', border: '1px solid rgba(0, 163, 46, 1)', borderRadius: '5px' }}>

                        <div>
                          <label style={{ fontSize: 17, fontWeight: 700, fontFamily: "Gilroy", color: 'rgba(0, 163, 46, 1)' }}>
                            ₹ {receiptDataNew?.amount_received}
                          </label>
                        </div>
                        <div>
                          <label style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#000000",
                            fontFamily: "Gilroy"
                          }}>
                            {amountInWords} only
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {receiptDataNew?.invoice_type === "advance" &&
                    (
                      <div>
                        <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)', marginLeft: '20px' }}>Payment For</p>
                      </div>
                    )

                  }

                  <div className="px-4 pb-3">
                    <div className="table-responsive">
                      <table className="table  text-center align-middle">
                        <thead style={{ backgroundColor: "#00A32E", color: "#FFFFFF" }}>
                          <tr style={{ color: "white" }}>
                            <th style={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>S.NO</th>
                            <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Inv No</th>
                            <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Description</th>
                            {receiptDataNew?.invoice_type !== "advance" && (
                              <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Duration</th>
                            )}

                            <th style={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Amount / INR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {receiptDataNew?.amenities?.map((item, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{index + 1}</td>
                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{receiptDataNew?.invoice_number}</td>
                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{item.am_name}</td>
                              {receiptDataNew?.invoice_type !== "advance" && (
                                <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }} >{moment(item?.created_at).format("MMM YYYY")}</td>
                              )}

                              <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                ₹ {receiptDataNew?.invoice_type === "advance" ? receiptDataNew?.amount_received : item.amount}
                              </td>


                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {receiptDataNew.invoice_type !== "advance" && (
                      <div className="d-flex justify-content-end mt-3">
                        <div className="w-100 w-md-50" style={{ paddingRight: "50px" }}>
                          <div className="d-flex justify-content-end py-1">
                            <div
                              className="w-50 text-end"
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: 'rgba(23, 23, 23, 1)',
                              }}
                            >
                              Sub Total
                            </div>
                            <div
                              className="w-25 text-end"
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: 'rgba(23, 23, 23, 1)',
                              }}
                            >
                              ₹ {receiptDataNew?.total_amount}
                            </div>
                          </div>
                          <div className="d-flex justify-content-end py-2 fw-bold">
                            <div
                              className="w-50 text-end"
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: 'rgba(23, 23, 23, 1)',
                              }}
                            >
                              Total
                            </div>
                            <div
                              className="w-25 text-end"
                              style={{
                                fontSize: '15px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: 'rgba(23, 23, 23, 1)',
                              }}
                            >
                              ₹ {receiptDataNew?.total_amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}


                  </div>



                </div>
                <div className="px-4" style={{ marginTop: 20 }}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <h6 style={{
                        fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 700,
                        color: '#00A32E',
                        letterSpacing: '1px'
                      }}
                      >PAYMENT DETAILS</h6>
                      <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode:  {receiptDataNew?.bank_type !== ""
                        ? receiptDataNew.bank_type
                        : receiptDataNew.payment_mode}</p>
                      {receiptDataNew?.invoice_type !== "advance" && (
                        <p
                          className="mb-1"
                          style={{
                            fontSize: '13px',
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            color: 'rgba(23, 23, 23, 1)',
                          }}
                        >
                          Transaction ID: GPay-2134-8482-XYZ
                        </p>
                      )}

                      <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Received By: Admin - Anjali R</p>
                      <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', marginTop: "-14px" }}>Status: Paid</p>

                    </div>
                    <div className="col-md-6 text-end">
                      <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={91} width={162} /></p>
                      {receiptDataNew?.invoice_type === "advance" && (
                        <div className="text-start mt-2 ms-5" >
                          <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 163, 46, 1)', fontSize: "13px", marginLeft: "35px" }}>
                            &quot;Thank you for choosing SmartStay. &quot;
                          </p>
                          <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 163, 46, 1)', fontSize: "13px", marginLeft: "35px" }}>
                            Your transaction is completed &quot;
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <h6 style={{ color: "#00A32E", fontSize: "13px", fontWeight: 600, fontFamily: "Gilroy" }}>Acknowledgment</h6>
                        <p style={{ fontSize: "12px", color: "#555", fontFamily: "Gilroy" }}>
                          This payment confirms your dues till the mentioned period. Final settlement during checkout will be calculated based on services utilized and advance paid.
                        </p>
                      </div>

                      <div className="col-md-6 text-end">
                        <p className="text-success fw-bold border-success px-4 py-2 d-inline-block">
                        </p>
                        <p className="mt-4" style={{ fontSize: "13px", fontFamily: "Gilroy", color: "#2C2C2C", paddingRight: "25px" }}>Authorized Signature</p>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="py-2 px-5">
                  <div className=" text-white text-center" style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px", backgroundColor: "#00A32E", padding: 7 }}>
                    <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)', }}>email: {receiptDataNew?.hostel_details?.email} | Contact: +{receiptDataNew?.hostel_details?.phone}</small>
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
ReceiptPdfCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  handleClosed: PropTypes.func.isRequired,

};
export default ReceiptPdfCard;