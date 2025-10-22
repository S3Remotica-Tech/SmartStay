/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { toWords } from 'number-to-words';
import "../Pages/Invoices.css";
import moment from 'moment';
import DownLoad from '../Assets/Images/New_images/searchss.png'
import PrintIcon from '../Assets/Images/New_images/PrintIcon.png'
import Whatsapp from '../Assets/Images/whatsapp.png'
import Whatsapp_blue from '../Assets/Images/whatsapp_blue.png'
import Whatsapp_white from '../Assets/Images/whatsapp_white.png'
import Mail from '../Assets/Images/gmail.png'
import Mail_white from '../Assets/Images/gmail_white.png'
import Message_text from '../Assets/Images/message-text.png'
import Message_text_white from '../Assets/Images/message-white.png'
import Close from '../Assets/Images/New_images/close.png'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import './BillPdfModal.css';
import received from '../Assets/Images/New_images/Received_payment.png'
import "./Receipt.css";
// import mob from "../Assets/Images/New_images/Rectangle 77.png";
// import substrac from "../Assets/Images/New_images/Subtract.png";
// import frame from "../Assets/Images/New_images/FramePDF.png";
// import mobblue from "../Assets/Images/New_images/Rectangleblue.png";
// import substracBlue from "../Assets/Images/New_images/location 03.png";
// import frameblue from "../Assets/Images/New_images/Frameblue.png";
import paidfull from '../Assets/Images/New_images/Refunded.png'
import { useDispatch, useSelector } from "react-redux";
import Logo from '../Assets/Images/get.png'
import receiptLogo from '../Assets/Images/New_images/receiptlogo.png';
// import User from '../Assets/Images/user.png'
// import PaymentUser from '../Assets/Images/usertwo.png' 
import Rectangle from '../Assets/Images/New_images/Rectangle.png';
import GreenRectangleforrecipt from '../Assets/Images/New_images/Rectangle_fr_receipt.png'; 
// import { Card, Badge } from 'react-bootstrap';




const ReceiptPdfCard = ({ rowData, handleClosed }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [idforwhats, setIdForWhats] = useState("");
  const [receiptDataNew, setReceiptDataNew] = useState("");

  //  const AdminDetails = state?.createAccount?.accountList[0]?.user_details
  //  const fullName = `${AdminDetails.first_name} ${AdminDetails.last_name}`.trim();

  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setReceiptDataNew(state.InvoiceList.newReceiptchanges.receipt)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }

  }, [state.InvoiceList.statusCodeNewReceiptStatusCode])


  const cardRef = useRef(null);
  console.log("rowData",rowData)

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

  console.log("receiptDataNew", receiptDataNew?.invoice_type);
  

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
      <div >
        <div className="d-flex justify-content-between 
            align-items-center ps-3">


          <div className="d-flex flex-row align-items-center 
                justify-content-between gap-3 mx-3">

            <div className="d-flex flex-row">
                   <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>
                  #{(receiptDataNew?.invoice_number && receiptDataNew?.invoice_number !== '' && receiptDataNew?.invoice_number !== '0')
                    ? receiptDataNew.invoice_number
                    : (receiptDataNew?.reference_id || '0.00')}
                </label>

              <div className="ms-3">
                <span style={{ fontSize: '10px', backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span>
              </div>
            
            </div>
          </div>
          <div>

            <div className="gap-2 d-flex me-3">
              <div className="d-flex  border p-1" style={{ height: 38, width: 40, borderRadius: '4px', cursor: "pointer" }} onClick={handleDownload}>
                <img src={PrintIcon} className="mt-1 ms-1" alt="PrintIcon" style={{ height: 20, width: 20, cursor: "pointer" }} />

              </div>
              <div className="d-flex  border p-1" style={{ height: 38, width: 40, borderRadius: '4px', cursor: "pointer" }} onClick={handleDownload}>
                <img src={DownLoad} className="mt-1 ms-1" alt="Download Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} />

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

              <div>
                <img src={Rectangle}  alt="rectangle" />
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
            <div className="receipt-container ps-4 pe-4"
              ref={cardRef} style={{ width: "80%", marginLeft: '10%', marginTop: '20px', borderRadius: '8px',  }}>

              <div ref={innerScrollRef}
                className="border shadow-md show-scroll"
                style={{
                  maxHeight: 450,
                  overflowY: "auto",
                  borderTopLeftRadius: "13px",
                  borderTopRightRadius:"13px",
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                }}>

                <div className="text-white ps-3 pe-3 p-2 position-relative" style={{Height: "100px",
                  //  backgroundColor:receiptDataNew?.bill_template?.template_theme || "#1E45E1" 
                    }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-lg-2">
                     <img src={receiptDataNew?.bill_template?.logo_url ? receiptDataNew?.bill_template?.logo_url :  Logo} alt="logo" style={{ height:64 , minWidth:64 , maxWidth:84 ,  borderRadius: '4px', }} className="me-2 mt-1" />
                    </div> 
                   

                                      <div className="text-start mt-2 col-lg-4 d-flex flex-wrap">
  <h5
    className="mb-0"
    style={{
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 1,
      fontFamily: "Gilroy",
      marginRight: "20px",
      color:'black'
    }}
  >
    {receiptDataNew?.hostel_details?.name}
  </h5>
  <p
    style={{
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Gilroy",
      color:'black'
    }}
  >
    {receiptDataNew?.hostel_details?.address}
    {receiptDataNew?.hostel_details?.address && receiptDataNew?.hostel_details?.area && ','}{" "}
    {receiptDataNew?.hostel_details?.area}
    {receiptDataNew?.hostel_details?.area && receiptDataNew?.hostel_details?.landmark && ','}{" "}
    {receiptDataNew?.hostel_details?.landmark}
      {(receiptDataNew?.hostel_details?.address || 
  receiptDataNew?.hostel_details?.area || 
  receiptDataNew?.hostel_details?.landmark) && <br />}

    {receiptDataNew?.hostel_details?.city}
    {receiptDataNew?.hostel_details?.city && receiptDataNew?.hostel_details?.state && ','}{" "}
    {receiptDataNew?.hostel_details?.state}
    {receiptDataNew?.hostel_details?.pincode && ' - '}
    {receiptDataNew?.hostel_details?.pincode}
  </p>
</div>


 <div className="col-lg-3">
            </div>
                <div className="col-lg-3">
                  <h5
    className="mb-0"
    style={{
      fontSize: 13,
      fontWeight: 600,
      fontFamily: "Gilroy",
      color:'black'
    }}
  >
    Receipt of the Month
  </h5>
  <p style={{
      fontSize: 15,
      fontWeight: 700,
      letterSpacing:'1px',
      fontFamily: "Gilroy",
      color:'rgba(22, 37, 93, 1)'
    }}>March- Apr 2025</p>
                </div>


                  </div>
                  <hr  style={{ borderTop: "1px solid #ccc", marginTop: 8  }} />
                </div>


                <div className="container bg-white rounded-bottom  position-relative" >
                  <div className="text-center m-0 p-0">
                    <p className="" style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>
                      {receiptDataNew.invoice_type === "advance" && "Security Deposit Receipt"}
                      {receiptDataNew.invoice_type === "checkout" && "Final Settlement Receipt"}
                      {receiptDataNew.invoice_type !== "advance" && receiptDataNew.invoice_type !== "checkout" && "Payment Receipt"}
                     
                    </p>


                  </div>
                 


                  <div className="row px-4 mt-2">
                    {/* <div className="col-md-7 mb-3">
                      <p className="mb-1" style={{ fontSize: '13px', color: '#1E45E1', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill To:</p>
                      <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)', }}> <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',marginLeft:8 }}>
                        {receiptDataNew?.user_details?.name }</span></p>
                      <p className="mb-1">
                        <span className="ms-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}> 
                           + {receiptDataNew &&
                          String(receiptDataNew?.user_details?.phone)?.slice(
                            0,
                            String(receiptDataNew?.user_details?.phone).length - 10
                          )}{" "}
                          {receiptDataNew && String(receiptDataNew?.user_details?.phone)?.slice(-10)}</span>
                      </p>
                      <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}><img src={frameblue} alt="frame" width={15} height={15} className="me-1" /> 
                      {receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</p>

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

                    </div> */}

   <div className="col-md-6 mb-3">
  {/* Tenant Name */}
  <div
    className="d-flex mt-1"
    style={{
      fontSize: "12px",
      fontFamily: "Gilroy",
      fontWeight: 400,
      color: "rgba(65, 65, 65, 1)",
      alignItems: "center",
    }}
  >
    <span style={{ width: "90px", textAlign: "left" }}>Tenant Name</span>
    <span style={{ margin: "0 4px" }}>:</span>
    <span
      style={{
        fontSize: "13px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
      }}
    >
      {receiptDataNew?.user_details?.name}
    </span>
  </div>

  {/* Mobile No */}
  <div
    className="d-flex mt-1"
    style={{
      fontSize: "12px",
      fontFamily: "Gilroy",
      fontWeight: 400,
      color: "rgba(65, 65, 65, 1)",
      alignItems: "center",
    }}
  >
    <span style={{ width: "90px", textAlign: "left" }}>Mobile No</span>
    <span style={{ margin: "0 4px" }}>:</span>
    <span
      style={{
        fontSize: "13px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
      }}
    >
      +
      {receiptDataNew &&
        String(receiptDataNew?.user_details?.phone)?.slice(
          0,
          String(receiptDataNew?.user_details?.phone).length - 10
        )}{" "}
      {receiptDataNew &&
        String(receiptDataNew?.user_details?.phone)?.slice(-10)}
    </span>
  </div>

  {/* Room No */}
  <div
    className="d-flex mt-1"
    style={{
      fontSize: "12px",
      fontFamily: "Gilroy",
      fontWeight: 400,
      color: "rgba(65, 65, 65, 1)",
      alignItems: "center",
    }}
  >
    <span style={{ width: "90px", textAlign: "left" }}>Room No</span>
    <span style={{ margin: "0 4px" }}>:</span>
    <span
      style={{
        fontSize: "13px",
        fontFamily: "Gilroy",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
      }}
    >
      {receiptDataNew?.user_details?.room_name}-
      {receiptDataNew?.user_details?.bed_name}
    </span>
  </div>

  {/* Address */}
  <div
  className="d-flex mt-1"
  style={{
    fontSize: "12px",
    fontFamily: "Gilroy",
    fontWeight: 400,
    color: "rgba(65, 65, 65, 1)",
    alignItems: "flex-start",
  }}
>
  <span style={{ width: "90px", textAlign: "left", whiteSpace: "nowrap" }}>
    Address
  </span>
  <span style={{ margin: "0 4px" }}>:</span>

  <span
    style={{
      fontSize: "13px",
      fontFamily: "Gilroy",
      fontWeight: 600,
      color: "rgba(23, 23, 23, 1)",
      lineHeight: "18px",
      wordWrap: "break-word",
      wordBreak: "break-word",
      whiteSpace: "normal",
      flex: 1, // makes the address span take remaining width
    }}
  >
    {isValid(receiptDataNew?.user_details?.address) && (
      <>{receiptDataNew?.user_details?.address}, </>
    )}
    {isValid(receiptDataNew?.user_details?.area) && (
      <>{receiptDataNew?.user_details?.area}, </>
    )}
    {isValid(receiptDataNew?.user_details?.city) && (
      <>{receiptDataNew?.user_details?.city}. </>
    )}
    {isValid(receiptDataNew?.user_details?.state) && (
      <>{receiptDataNew?.user_details?.state} </>
    )}
    {isValid(receiptDataNew?.user_details?.pincode) && (
      <>- {receiptDataNew?.user_details?.pincode}.</>
    )}
  </span>
</div>

</div>

                    <div className="col-md-6 mb-3">
                      <div className="row">

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Receipt No :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.reference_id}</div>

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>


                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Payment Mode :</div>
                        <div className="col-6  text-start" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginTop: 2, paddingLeft: 18 }}> {receiptDataNew?.bank_type !== ""
                          ? receiptDataNew.bank_type
                          : receiptDataNew.payment_mode}</div>
                                                  <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Transaction ID :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>
                          {/* {receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name} */}
                          -
                          </div>
                      </div>
                    </div>
                  </div>


 <div className="d-flex flex-row  mt-3 ms-4 me-4 border" style={{borderRadius: '10px'}}>
                      <div className="col-lg-6 d-flex  justify-content-left align-items-center ">
                        <div className="d-flex flex-column">
                        <label style={{ fontSize: 15, fontWeight: 600, fontFamily: "Gilroy", marginLeft: '15px',  }}>
                          TOTAL REFUNDED AMOUNT
                        </label>
                        <p style={{ fontSize: 11, fontWeight: 500, fontFamily: "Gilroy",marginLeft: '15px',  }}>Security Deposit - Deductions (If any)</p>
                      </div>
                      </div>
                      <div className="col-lg-6 border" >

                        <div style={{backgroundColor:'rgba(241, 255, 245, 1)', padding:10}}>
                          <div className="d-flex flex-row">
                             <div className="me-2">
                              <img src={GreenRectangleforrecipt} alt="greenrectangleimage"/>
                              </div>
                          <label style={{ fontSize: 17, fontWeight: 700, fontFamily: "Gilroy",  }}>
                            ₹ 
                          </label>
                        </div>
                        </div>
                        <div>
                          <label style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#000000",
                            fontFamily: "Gilroy"
                            , padding:10
                          }}>
                            only
                          </label>
                        </div>
                      </div>
                    </div>


                  <div className="px-4 pb-3">
                    


                    <div className="d-flex justify-content-end mt-3"  >
                      <div className="w-100 w-md-50" style={{ paddingRight: "80px" }}>

                        <div className="d-flex justify-content-end py-1">
                          <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Advance Amount</div>
                          <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}> Rs: {receiptDataNew?.total_advance_amount}</div>
                        </div>




                        <div className="d-flex justify-content-end py-2 fw-bold">
                          <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: '#1E1E1E', }}>Refundabled Total</div>
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
                        {receiptDataNew?.bill_template?.terms_and_condition}
                        {/* This document confirms final settlement for the Tenant on <br></br>
                        {moment(receiptDataNew?.Date).format('DD/MM/YYYY')}. All dues are cleared, and room has been vacated. */}
                      </p>
                    </div>
                    <div className="col-md-4 text-end">
                        {receiptDataNew?.bill_template?.digital_signature_url && (
                              <img
                                src={receiptDataNew?.bill_template.digital_signature_url}
                                alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft: 30 }}

                              />
                            )}
                      <p className="mt-4" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}>
                        Authorized Signature</p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between  align-items-start flex-wrap ms-4">

                  <div className="text-start mt-5 col-lg-4">
                    <p className="mb-0" style={{ fontSize: "12px", fontFamily: 'Gilroy', fontWeight: 500,  }}>
                      &quot;{receiptDataNew?.bill_template?.notes}&quot;
                    </p>
                   
                  </div>

                  <div className="col-lg-4">
                  </div>


                  <div className="col-lg-4">
                    <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received"  /></p>

                  </div>
                </div>

                    <div className="px-4 pb-3">
                   <div className="table-responsive">
<table
  style={{
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    border: "1px solid #dee2e6",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "Gilroy",
  }}
>
  <thead>
    <tr style={{  textAlign: "left" }}>
      <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          borderBottom: "1px solid #dee2e6",
          width: "10%",
        }}
      >
        REFUND
      </th>
      <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        AMOUNT / INR
      </th>
      <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          textAlign: "right",
          borderBottom: "1px solid #dee2e6",
          width: "25%",
        }}
      >
        DEDUCTION
      </th>
       <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          textAlign: "right",
          borderBottom: "1px solid #dee2e6",
          width: "25%",
        }}
      >
        AMOUNT / INR
      </th>
    </tr>
  </thead>

  <tbody>
    {
      receiptDataNew?.amenities?.map((item, index) => (
        <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
       
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
            {item.am_name}
          </td>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
            ₹ {item.amount}
          </td>
        </tr>
      ))
    }

    <tr style={{ backgroundColor: "rgba(250, 251, 255, 1)" }}>
      <td style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#000",
          borderTop: "1px solid #dee2e6",
        }}>Total</td>
      <td
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#000",
          borderTop: "1px solid #dee2e6",
        }}
      >
         ₹{" "}
        {receiptDataNew?.invoice_type === "booking"
          ? receiptDataNew?.amount_received
          : receiptDataNew?.amenities?.reduce(
              (acc, item) => acc + Number(item.amount || 0),
              0
            )}
      </td>
       <td style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "rgba(255, 0, 0, 1)",
          borderTop: "1px solid #dee2e6",
        }}>Total Deductions</td>
      <td
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "rgba(255, 0, 0, 1)",
          textAlign: "right",
          borderTop: "1px solid #dee2e6",
        }}
      >
         ₹{" "}
        {receiptDataNew?.invoice_type === "booking"
          ? receiptDataNew?.amount_received
          : receiptDataNew?.amenities?.reduce(
              (acc, item) => acc + Number(item.amount || 0),
              0
            )}
      </td>
    </tr>
  </tbody>
</table>



                    </div>
                      </div>
                
<div className="py-2 px-5 d-flex justify-content-evenly"> 
                  <div>
                    <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600,color:'rgba(133, 133, 133, 1)'  }}>email: <span style={{color:'black'}}>{receiptDataNew?.bill_template?.email}</span>
                    </p>
                    </div>
                  <div >
                    <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color:'rgba(133, 133, 133, 1)' }}> Contact: 
                      <span style={{color:'black'}}> +91 {receiptDataNew?.bill_template?.contact_number}</span></p>
                  </div>
                </div>

              </div>
            </div>
          ) :
            <div className="receipt-container  ps-4 pe-4 " ref={cardRef} style={{ width: "80%", marginLeft: '10%', marginTop: '20px', borderRadius: '8px', }} >

              <div ref={innerScrollRef}
                className="border shadow-md show-scroll"
                style={{
                  maxHeight: 450,
                  overflowY: "auto",
                  borderTopLeftRadius: "13px",
                  borderTopRightRadius:"13px",
                  borderBottomLeftRadius: "13px",
                  borderBottomRightRadius: "13px",
                }}>
                <div className=" text-white ps-3 pe-3 p-2 position-relative" style={{ height: "100px",
                  //  backgroundColor:receiptDataNew?.bill_template?.template_theme || "#00A32E" 
                    }}>
                  <div className="d-flex justify-content-between align-items-center">
                    
                    <div className="col-lg-2">
                     <img src={receiptDataNew?.bill_template?.logo_url ? receiptDataNew?.bill_template?.logo_url :  receiptLogo} alt="logo" style={{ height:64 , minWidth:64 , maxWidth:84 ,  borderRadius: '4px', }} className="me-2 mt-1" />
                    </div> 
                   <div className="text-start mt-2 col-lg-4 d-flex flex-wrap">
  <h5
    className="mb-0"
    style={{
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: 1,
      fontFamily: "Gilroy",
      marginRight: "20px",
      color:'black'
    }}
  >
    {receiptDataNew?.hostel_details?.name}
  </h5>
  <p
    style={{
      fontSize: 12,
      fontWeight: 600,
      fontFamily: "Gilroy",
      color:'black'
    }}
  >
    {receiptDataNew?.hostel_details?.address}
    {receiptDataNew?.hostel_details?.address && receiptDataNew?.hostel_details?.area && ','}{" "}
    {receiptDataNew?.hostel_details?.area}
    {receiptDataNew?.hostel_details?.area && receiptDataNew?.hostel_details?.landmark && ','}{" "}
    {receiptDataNew?.hostel_details?.landmark}
      {(receiptDataNew?.hostel_details?.address || 
  receiptDataNew?.hostel_details?.area || 
  receiptDataNew?.hostel_details?.landmark) && <br />}

    {receiptDataNew?.hostel_details?.city}
    {receiptDataNew?.hostel_details?.city && receiptDataNew?.hostel_details?.state && ','}{" "}
    {receiptDataNew?.hostel_details?.state}
    {receiptDataNew?.hostel_details?.pincode && ' - '}
    {receiptDataNew?.hostel_details?.pincode}
  </p>
</div>
           <div className="col-lg-3">
            </div>
                <div className="col-lg-3">
                  <h5
    className="mb-0"
    style={{
      fontSize: 13,
      fontWeight: 600,
      fontFamily: "Gilroy",
      color:'black'
    }}
  >
    Receipt of the Month
  </h5>
  <p style={{
      fontSize: 15,
      fontWeight: 700,
      letterSpacing:'1px',
      fontFamily: "Gilroy",
      color:'rgba(22, 37, 93, 1)'
    }}>March- Apr 2025</p>
                </div>
 
                  </div>
                  <hr  style={{ borderTop: "1px solid #ccc", marginTop: 8  }} />
                </div>
      

                <div className="container bg-white rounded-bottom  position-relative" style={{}}>
                  <div className="text-center pt-2 pb-1">
                    <h5 className="" style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.invoice_type === "advance" ? "Security Deposit Receipt" : "Payment Receipt"}</h5>
                  </div>


                  <div className="row px-4 mt-3">
      

 <div className="col-md-6 mb-3" style={{ fontFamily: "Gilroy" }}>
  {/* Tenant Name */}
  <div className="row mt-1">
    <div
      className="col-4"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: "12px",
        fontWeight: 400,
        color: "rgba(65, 65, 65, 1)",
        paddingRight: 0,
      }}
    >
      <span style={{ width: "90px", textAlign: "left" }}>Tenant Name</span>
      <span style={{ marginLeft: "4px" }}>:</span>
    </div>
    <div
      className="col-8"
      style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
        lineHeight: "18px",
        whiteSpace: "normal",
        wordBreak: "break-word",
        paddingLeft: 10,
      }}
    >
      {receiptDataNew?.user_details?.name || rowData?.Name}
    </div>
  </div>

  {/* Mobile No */}
  <div className="row mt-1">
    <div
      className="col-4"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: "12px",
        fontWeight: 400,
        color: "rgba(65, 65, 65, 1)",
        paddingRight: 0,
      }}
    >
      <span style={{ width: "90px", textAlign: "left" }}>Mobile No</span>
      <span style={{ marginLeft: "4px" }}>:</span>
    </div>
    <div
      className="col-8"
      style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
        lineHeight: "18px",
        whiteSpace: "normal",
        wordBreak: "break-word",
        paddingLeft: 10,
      }}
    >
      +{receiptDataNew &&
        String(receiptDataNew?.user_details?.phone)?.slice(
          0,
          String(receiptDataNew?.user_details?.phone).length - 10
        )}{" "}
      {receiptDataNew &&
        String(receiptDataNew?.user_details?.phone)?.slice(-10)}
    </div>
  </div>

  {/* Room No */}
  <div className="row mt-1">
    <div
      className="col-4"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: "12px",
        fontWeight: 400,
        color: "rgba(65, 65, 65, 1)",
        paddingRight: 0,
      }}
    >
      <span style={{ width: "90px", textAlign: "left" }}>Room No</span>
      <span style={{ marginLeft: "4px" }}>:</span>
    </div>
    <div
      className="col-8"
      style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
        lineHeight: "18px",
        whiteSpace: "normal",
        wordBreak: "break-word",
        paddingLeft: 10,
      }}
    >
      {receiptDataNew?.user_details?.room_name} -{" "}
      {receiptDataNew?.user_details?.bed_name}
    </div>
  </div>

  {/* Address */}
  <div className="row mt-1">
    <div
      className="col-4"
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        fontSize: "12px",
        fontWeight: 400,
        color: "rgba(65, 65, 65, 1)",
        paddingRight: 0,
      }}
    >
      <span style={{ width: "90px", textAlign: "left" }}>Address</span>
      <span style={{ marginLeft: "4px" }}>:</span>
    </div>
    <div
      className="col-8"
      style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "rgba(23, 23, 23, 1)",
        lineHeight: "18px",
        whiteSpace: "normal",
        wordBreak: "break-word",
        paddingLeft: 10,
      }}
    >
      {isValid(receiptDataNew?.user_details?.address) && (
        <>{receiptDataNew?.user_details?.address}, </>
      )}
      {isValid(receiptDataNew?.user_details?.area) && (
        <>{receiptDataNew?.user_details?.area}, </>
      )}
      {isValid(receiptDataNew?.user_details?.city) && (
        <>{receiptDataNew?.user_details?.city}. </>
      )}
      {isValid(receiptDataNew?.user_details?.state) && (
        <>{receiptDataNew?.user_details?.state} </>
      )}
      {isValid(receiptDataNew?.user_details?.pincode) && (
        <>- {receiptDataNew?.user_details?.pincode}.</>
      )}
    </div>
  </div>
</div>



                    <div className="col-md-6 mb-3">
                      <div className="row">
                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Receipt No :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.reference_id || rowData?.reference_id}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Invoice Ref :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.invoice_number ? `#${receiptDataNew.invoice_number}` : "-"}</div>

                        <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>



                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Payment Mode :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', paddingLeft: 18 }}>
                          {receiptDataNew.bank_type || rowData.payment_mode}
                          </div>
                      </div>
                    </div>
                  </div>
                  

                  {/* {receiptDataNew?.invoice_type === "advance" && ( */}
                    <div className="d-flex flex-row  mt-3 ms-4 me-4 border" style={{borderRadius: '10px'}}>
                      <div className="col-lg-6 d-flex justify-content-left align-items-center ">
                        <label style={{ fontSize: 15, fontWeight: 600, fontFamily: "Gilroy", marginLeft: '15px',  }}>
                          TOTAL PAID AMOUNT
                        </label>
                      </div>
                      <div className="col-lg-6 border" >

                        <div style={{backgroundColor:'rgba(241, 255, 245, 1)', padding:10}}>
                          <div className="d-flex flex-row">
                             <div className="me-2">
                              <img src={GreenRectangleforrecipt} alt="greenrectangleimage"/>
                              </div>
                          <label style={{ fontSize: 17, fontWeight: 700, fontFamily: "Gilroy",  }}>
                            ₹ {receiptDataNew?.amount_received}
                          </label>
                        </div>
                        </div>
                        <div>
                          <label style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#000000",
                            fontFamily: "Gilroy"
                            , padding:10
                          }}>
                            {amountInWords} only
                          </label>
                        </div>
                      </div>
                    </div>
                  {/* )} */}

                


                  



                </div>
                <div className="px-4" style={{ marginTop: 20 }}>

                  <div className="row">
                      <div className="col-md-8">
                        <h6 style={{ color: "grey", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" , letterSpacing:'0px',}}>Acknowledgment</h6>
                        <p style={{ fontSize: "12px", color: "#555", fontFamily: "rgba(61, 61, 61, 1)" }}>
                      {receiptDataNew?.bill_template?.terms_and_condition}
                        </p>
                      </div>

                      <div className="col-md-4 text-end">
                           {receiptDataNew?.bill_template?.digital_signature_url && (
                              <img
                                src={receiptDataNew?.bill_template.digital_signature_url}
                                alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft:20 }}

                              />
                            )}
                        <p className="mt-4 " style={{ fontSize: "13px", fontFamily: "Gilroy", color: "#2C2C2C", paddingRight: "5px" }}>Authorized Signature</p>
                      </div>
                    </div>
                  <div className="row">
                    <div className="col-md-6 pt-4">
   <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500,  fontSize: "13px", }}>
                            &quot;{receiptDataNew?.bill_template?.notes} &quot;
                          </p>
                         

                    </div>
                    <div className="col-md-6 text-end">
                      <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received"  className="img-fluid" style={{rotate:'5deg'}} /></p>
                      
                    </div>

                    

                  </div>
                </div>

             <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)', marginLeft: '20px' }}>Payment For</p>

                <div className="px-4 pb-3">

                  {
                    receiptDataNew?.invoice_type === "checkIn" ?

                    
                                    <div className="table-responsive">
                    
 

<table
  style={{
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    border: "1px solid #dee2e6",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "Gilroy",
  }}
>
  <thead>
    <tr style={{  textAlign: "left" }}>
      <th
        style={{
          padding: "10px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          borderBottom: "1px solid #dee2e6",
          width: "10%",
        }}
      >
        INVOICE.NO
      </th>
      <th
        style={{
          padding: "10px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        INV DATE
      </th>
      <th
        style={{
          padding: "10px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          textAlign: "right",
          borderBottom: "1px solid #dee2e6",
          width: "25%",
        }}
      >
       INVOICE AMOUNT 
      </th>
       <th
        style={{
          padding: "10px 12px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          textAlign: "right",
          borderBottom: "1px solid #dee2e6",
          width: "25%",
        }}
      >
       PAYMENT AMOUNT
      </th>
    </tr>
  </thead>

  <tbody>
  
      
     {  receiptDataNew?.amenities?.map((item, index) => (
        <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
            {index + 1}
          </td>
            <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
           -
          </td>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
            {item.am_name}
          </td>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
              textAlign: "right",
            }}
          >
            ₹ {item.amount}
          </td>
        </tr>
      ))
    }

    
  </tbody>
</table>



                    </div>

                    :              
                    
                    <div className="table-responsive">
<table
  style={{
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    border: "1px solid #dee2e6",
    borderRadius: "12px",
    overflow: "hidden",
    fontFamily: "Gilroy",
  }}
>
  <thead>
    <tr style={{  textAlign: "left" }}>
      <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          borderBottom: "1px solid #dee2e6",
          width: "10%",
        }}
      >
        S.NO
      </th>
      <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          borderBottom: "1px solid #dee2e6",
        }}
      >
        DESCRIPTION
      </th>
      <th
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "black",
          fontFamily: "Gilroy",
          textAlign: "right",
          borderBottom: "1px solid #dee2e6",
          width: "25%",
        }}
      >
        AMOUNT / INR
      </th>
    </tr>
  </thead>

  <tbody>
    {receiptDataNew?.invoice_type === "booking" ? (
      <tr style={{ borderBottom: "1px solid #dee2e6" }}>
        <td
          style={{
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#444",
          }}
        >
          1
        </td>
        <td
          style={{
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#444",
          }}
        >
          Booking Amount
        </td>
        <td
          style={{
            padding: "10px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "#444",
            textAlign: "right",
          }}
        >
          ₹ {receiptDataNew?.amount_received}
        </td>
      </tr>
    ) : (
      receiptDataNew?.amenities?.map((item, index) => (
        <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
            {index + 1}
          </td>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
            }}
          >
            {item.am_name}
          </td>
          <td
            style={{
              padding: "10px 16px",
              fontSize: "13px",
              fontWeight: 500,
              color: "#444",
              textAlign: "right",
            }}
          >
            ₹ {item.amount}
          </td>
        </tr>
      ))
    )}

    <tr style={{ backgroundColor: "rgba(250, 251, 255, 1)" }}>
      <td style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#000",
          borderTop: "1px solid #dee2e6",
        }}></td>
      <td
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#000",
          borderTop: "1px solid #dee2e6",
        }}
      >
        Total
      </td>
      <td
        style={{
          padding: "10px 16px",
          fontSize: "13px",
          fontWeight: 600,
          color: "#000",
          textAlign: "right",
          borderTop: "1px solid #dee2e6",
        }}
      >
        ₹{" "}
        {receiptDataNew?.invoice_type === "booking"
          ? receiptDataNew?.amount_received
          : receiptDataNew?.amenities?.reduce(
              (acc, item) => acc + Number(item.amount || 0),
              0
            )}
      </td>
    </tr>
  </tbody>
</table>



                    </div>
                    
                  }
    



                    {/* {receiptDataNew.invoice_type !== "advance" &&  ( */}
                    {!(receiptDataNew?.invoice_type === "advance" || receiptDataNew?.invoice_type === "booking") && (
                      <>
                      
                      {/* <div className="d-flex justify-content-end mt-3">
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
                      </div> */}
                      </>
                    )}


                  </div>

                <div className="py-2 px-5 d-flex justify-content-evenly"> 
                  <div>
                    <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600,color:'rgba(133, 133, 133, 1)'  }}>email: <span style={{color:'black'}}>{receiptDataNew?.bill_template?.email}</span>
                    </p>
                    </div>
                  <div >
                    <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color:'rgba(133, 133, 133, 1)' }}> Contact: 
                      <span style={{color:'black'}}> +91 {receiptDataNew?.bill_template?.contact_number}</span></p>
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