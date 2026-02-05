/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../Bills/Invoices.css";
import DownLoad from '../../Assets/Images/New_images/searchss.png'
import Whatsapp from '../../Assets/Images/whatsapp.png'
import Whatsapp_blue from '../../Assets/Images/whatsapp_blue.png'
import Whatsapp_white from '../../Assets/Images/whatsapp_white.png'
import Mail from '../../Assets/Images/gmail.png'
import Mail_white from '../../Assets/Images/gmail_white.png'
import Message_text from '../../Assets/Images/message-text.png'
import Message_text_white from '../../Assets/Images/message-white.png'
import Logo from "../../Assets/Images/New_images/Group_Logo.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import { Row, Col, Table } from "react-bootstrap";
import { Location, Call, Profile, } from 'iconsax-react'
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { ArrowUp2, ArrowDown2, AddCircle } from "iconsax-react";
import RecordPayment from "../../Pages/Bills/RecordPayment";
import RefundAmount from "../Bills/RefundAmount";
import { useHasPermission } from '../../Utils/Permission';




const InvoiceCard = ({ rowData ,isReportsInvoiceRegisterWay}) => {

  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showform, setShowform] = useState(false);
  const [isOpenPayment, setIsOpenPayment] = useState(false);
  const [payapleform, setPayableForm] = useState(false)
  const [hoveredItem, setHoveredItem] = useState(null);
  const [refundDetails, setRefundDetails] = useState('')


  
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



  const [isVisible, setIsVisible] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [invoiceValue, setInvoiceValue] = useState("");

  const [invoiceList, setInvoiceList] = useState({
    balanceDue: "",
    InvoiceId: "",

  });

  const cardRef = useRef(null);

  useEffect(() => {

    setIsVisible(true)
  }, [rowData])

  const handleCloseForm = () => {

    setShowform(false);
    dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
    dispatch({ type: 'CLEAR_INVALID_DETAILS_ERROR' })
    dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
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
    if(isReportsInvoiceRegisterWay){
navigate(`/reports/invoice-register/${state.login?.selectedHostel_Id}`);
    }else{
navigate(`/invoice/${state.login?.selectedHostel_Id}`);
    }
    

  }


  // const isValid = (value) => {
  //   return value !== null && value !== undefined && value !== "undefined" && value !== "";
  // };


  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (key === "whatsapp") {
      // try {
      //   dispatch({
      //     type: "SET_TRIGGER_SOURCE",
      //     payload: "whatsapp",
      //   });
      //   dispatch({
      //     type: "INVOICEPDF",
      //     payload: {
      //       id: idforwhats,
      //     },
      //   });

      // } catch (error) {
      //   console.error("Error sending WhatsApp with PDF:", error);
      // }
    }
  };


  const {
    canWriteModule: canWriteInvoice,

  } = useHasPermission("Bills");




  const pdfDetails = state.InvoiceList?.particularBillsDetails

console.log("pdfDetails",pdfDetails, state)

  const hasTax = Number(pdfDetails?.invoiceInfo?.taxAmount) > 0;


  const templateColor = pdfDetails?.configurations?.templateColor;
  const isGradient = templateColor?.includes("linear-gradient");

  const textStyle = isGradient
    ? {
      fontFamily: "Gilroy",
      fontWeight: 600,
      background: templateColor,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }
    : {
      fontFamily: "Gilroy",
      fontWeight: 600,
      color: templateColor || "#1E45E1",
    };


  const getIconStyle = (templateColor) => {
    const isGradient = templateColor?.includes("linear-gradient");

    return isGradient
      ? {
        background: templateColor,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }
      : { color: templateColor || "#4B4B4B" };
  };


  const totalDeductions = pdfDetails?.invoiceInfo?.listDeductions?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );


  const showRentalPeriod =
    pdfDetails?.configurations?.invoiceType === 'Rent' &&
    pdfDetails?.invoiceType !== 'SETTLEMENT';




  const handleNavigateRecordPayment = (pdfDetails) => {
    setShowform(true);
    setSelectedUserId(pdfDetails?.customerInfo?.customerId)
    setInvoiceValue(pdfDetails)
    setInvoiceList({
      balanceDue: pdfDetails?.invoiceInfo?.balanceAmount,
      InvoiceId: pdfDetails?.invoiceId,
    })
  }


  const handleNavigateRefund = (pdfDetails) => {

    setRefundDetails(pdfDetails)
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





  return (
    <div style={{
      position: 'relative ',

    }}>

      <div className="" style={{ borderLeft: "1px solid #E5E7EB" }}>


        <div
          className="d-flex justify-content-between align-items-center "
          style={{
            backgroundColor: "#fff",
            borderBottom: "1px solid #E0E0E0",
            height: "48px",
            boxShadow: "initial",
            width: "100%", position: "sticky", zIndex: 10, top: 0, right: 0, left: 0

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

            <div className="gap-2 d-flex ">
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
              <div className="me-3">
                <IoClose style={{ height: 20, width: 20, cursor: "pointer", color: "#FF0000" }} onClick={handleBackInvoice} />

              </div>

            </div>
          </div>
        </div>



        <div
          style={{
            height: "calc(100vh - 38px)",
            overflowY: "auto",
            // position: "relative",
            marginBottom: 20, zIndex: 100,
          }}
          className="d-flex justify-content-center p-3 show-scrolls"  >

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
                      <img src={pdfDetails?.configurations?.hostelLogo ? pdfDetails?.configurations?.hostelLogo : Logo} alt="logo"
                        style={{ height: pdfDetails?.configurations?.hostelLogo ? 50 : 25, maxWidth: 134, borderRadius: '4px', objectFit: "contain", }} className="mt-2" />
                    </div>

                    <div className="mt-2 col-5 ps-4 pe-0" >
                      <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", marginRight: '20px', color: '#2B2B2B' }}>
                        {pdfDetails?.stayInfo?.hostelName}
                      </div>
                      <div
                        className="d-flex flex-wrap"
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "#4B4B4B",
                          lineHeight: "1.2rem",
                          width: 220,
                          whiteSpace: "normal",
                          wordBreak: "break-word",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {pdfDetails?.configurations?.address}
                      </div>

                    </div>
                  </div>
                </div>

                <hr className="m-0"
                  style={{
                    border: "none",
                    height: "1px",
                    background: templateColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                />

                <div className="container bg-white rounded-bottom  position-relative" style={{ width: "100%", }}>
                  <div className="text-center pt-2 pb-1">
                    <h5 style={{ ...textStyle, fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600 }}>

                      {
                        pdfDetails?.invoiceType === 'SETTLEMENT'
                          ? "Final Settlement Invoice"
                          : pdfDetails?.configurations?.invoiceType === 'Advance'
                            ? "Security Deposit"
                            : pdfDetails?.configurations?.invoiceType === 'Rent'
                              ? "Payment Bills"
                              : "Invoice"
                      }



                    </h5>
                  </div>


                  <div className="row px-4 mt-1">
                    <div className="col-md-5 mb-3" style={{ fontFamily: "Gilroy", fontSize: 13, color: "#222" }}>

                      <div className="mb-2" style={{ fontSize: 11, fontWeight: 600, fontStyle: "italic", ...textStyle }}>
                        Bill to:
                      </div>

                      <div className="mb-1 d-flex align-items-center">
                        <span style={getIconStyle(templateColor)}>
                          <Profile size="16" variant="Bold" />
                        </span>
                        <span style={{ fontWeight: 600, color: "#171717", fontSize: 12 }} className="ms-1">
                          : {""}{pdfDetails?.customerInfo?.fullName}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <span style={getIconStyle(templateColor)}>
                          <Call size="16" variant="Bold" />
                        </span>
                        <span style={{ color: "#171717", fontSize: 12 }} className="ms-1">
                          : {""}{pdfDetails?.customerInfo?.customerMobileNo &&
                            pdfDetails.customerInfo.customerMobileNo !== "undefined"
                            ? `+${pdfDetails.customerInfo?.countryCode} ${pdfDetails.customerInfo.customerMobileNo}`
                            : ""}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <span style={getIconStyle(templateColor)}>
                          <IoBed style={{ fontSize: 16 }} />
                        </span>
                        <span style={{ color: "#171717", fontSize: 12 }} className="d-flex align-items-center ms-1">
                          {pdfDetails?.stayInfo?.floorName && (
                            <>
                              : {""}{pdfDetails.stayInfo.floorName} , {""}

                            </>
                          )}

                          {pdfDetails?.stayInfo?.roomName && (
                            <>
                              {pdfDetails.stayInfo.roomName} {""}

                            </>
                          )} {""}

                          -
                          {""}         {pdfDetails?.stayInfo?.bedName}
                        </span>

                      </div>

                      <div className="d-flex ">
                        <span style={getIconStyle(templateColor)}>
                          <Location size="16" variant="Bold" />
                        </span>

                        <div style={{ color: "#171717", fontSize: 12 }} className="ms-1" >
                          : {""} {pdfDetails?.customerInfo?.fullAddress}


                        </div>
                      </div>

                    </div>

                    <div className="col-md-7 mb-1 ps-5 mt-2 ">
                      <div className="row">

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.invoiceNumber}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.invoiceDate}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.dueDate}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.customerInfo?.joiningDate}</div>
                        {showRentalPeriod && <>
                          <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Rental Period :</div>
                          <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.invoiceInfo?.invoicePeriod}</div>
                        </>}
                      </div>
                    </div>
                  </div>







                </div>


                <div className="px-5 ">
                  <div className="mb-1">
                    <label style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, ...textStyle }}>Payment Summary</label>
                  </div>
                  {
                    pdfDetails?.invoiceType === 'SETTLEMENT' ?
                      <>
                        <div className="" style={{ fontFamily: "Gilroy" }}>
                          <Row style={{ border: "1px solid #DFDFDF", borderRadius: 8 }}>

                            <Col md={6} className="p-1">
                              <Table responsive className="mb-0">
                                <thead>
                                  <tr style={{ backgroundColor: "#FFF" }}>
                                    <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textTransform: "capitalize" }}>Refund</th>
                                    <th
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#222222",
                                        textAlign: "right",
                                      }}
                                    >
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>
                                  {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                                    <tr key={index}>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          color: "#2D2D2D",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {item.description}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          textAlign: "right",
                                          fontWeight: 600,
                                          color: "#2D2D2D",
                                        }}
                                      >
                                        ₹ {Number(item.amount)}
                                      </td>
                                    </tr>
                                  ))}


                                </tbody>
                              </Table>

                            </Col>


                            <Col md={6} className="p-1">
                              <Table responsive className="mb-0">
                                <thead>
                                  <tr style={{ backgroundColor: "#FFF" }}>
                                    <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textTransform: "capitalize" }}>Deductions</th>
                                    <th
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 600,
                                        color: "#222222",
                                        textAlign: "right",
                                      }}
                                    >
                                      AMOUNT / INR
                                    </th>
                                  </tr>
                                </thead>

                                <tbody>

                                  {pdfDetails?.invoiceInfo?.listDeductions.length > 0 ? pdfDetails?.invoiceInfo?.listDeductions?.map((item, index) => (
                                    <tr key={index}>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          color: "#2D2D2D",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {item.type}
                                      </td>
                                      <td
                                        style={{
                                          fontSize: 12,
                                          color: "#2D2D2D",
                                          fontWeight: 600,
                                          textAlign: "right",
                                        }}
                                      >
                                        ₹{" "}

                                        {item.amount}
                                      </td>
                                    </tr>

                                  ))
                                    :
                                    <tr>
                                      <td colSpan="2" style={{ fontSize: 12, textAlign: "center", color: "#2D2D2D", fontWeight: 500, backgroundColor: "" }}>
                                        No Deductions
                                      </td>

                                    </tr>}

                                  {/* <tr
                                    style={{
                                      backgroundColor: "#FAFBFF",
                                      fontWeight: 600,
                                      borderTop: "1px solid #DFDFDF",
                                    }}
                                  >
                                    <td
                                      style={{
                                        fontSize: 14,
                                        color: "#FF0000",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Total Deductions
                                    </td>
                                    <td
                                      style={{
                                        textAlign: "right",
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "#2D2D2D",
                                      }}
                                    >
                                      ₹{" "}
                                      {totalDeductions || 0}
                                    </td>
                                  </tr> */}
                                </tbody>
                              </Table>


                            </Col>





                            <Col md={6} className="p-1">
                              <div
                                style={{
                                  backgroundColor: "#FAFBFF",
                                  borderTop: "1px solid #DFDFDF",
                                  padding: "10px 12px",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#2D2D2D",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span>Total</span>
                                <span>₹ {pdfDetails?.invoiceInfo?.subTotal || 0}</span>
                              </div>
                            </Col>



                            <Col md={6} className="p-1">
                              <div
                                style={{
                                  backgroundColor: "#FAFBFF",
                                  borderTop: "1px solid #DFDFDF",
                                  padding: "10px 12px",
                                  fontSize: 14,
                                  fontWeight: 600,
                                  color: "#2D2D2D",
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <span style={{ color: "#FF0000" }}>Total Deductions</span>
                                <span>₹ {totalDeductions || 0}</span>
                              </div>
                            </Col>













                          </Row>

                        </div>
                       <div className="mb-3 mt-3  px-3 py-2 border rounded" style={{
                            backgroundColor: "#FAFBFF",
                            fontSize: 13,
                            fontWeight: 600,
                          }}>




                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>Grand Total</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#4B4B4B", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}</div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>{pdfDetails?.invoiceInfo?.totalAmount > 0 ? "Payments Made" : "Refund Made"}</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(0,163, 46, 1)", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}</div>
                            </div>

                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>Balance Due</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#FF0000", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}</div>
                            </div>
                          </div>
                      </>

                      :


                      pdfDetails?.configurations?.invoiceType === 'Advance' ?
                        <div
                          className="table-responsive row justify-content-between mt-0 mb-2 p-3 "
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
                              {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                                <tr key={index}
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
                                    Security Deposit (Advance)
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
                                    Rs. {item.amount?.toLocaleString("en-IN")}
                                  </td>
                                </tr>

                              ))}
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
                                  ₹{" "}
                                  {Number(pdfDetails?.invoiceInfo?.subTotal || 0)}
                                </td>
                              </tr>

                            </tbody>
                          </table>

                          <div className="mb-3 mt-3  px-3 py-2 border rounded" style={{
                            backgroundColor: "#FAFBFF",
                            fontSize: 13,
                            fontWeight: 600,
                          }}>




                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Grand Total</div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#4B4B4B", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}</div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Payment Made</div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(0,163, 46, 1)", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}</div>
                            </div>

                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>Balance Due</div>
                              <div style={{ fontSize: 14, fontWeight: 600, color: "#FF0000", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}</div>
                            </div>
                          </div>


                        </div>

                        :
                        <>
                          <div className="" style={{ fontFamily: "Gilroy" }}>
                            <Row
                              style={{
                                border: "1px solid #DFDFDF",
                                borderRadius: 8,
                                margin: 0,
                              }}
                            >

                              <Col
                                md={hasTax > 0 ? 6 : 12}
                                className="p-2"
                                style={{ borderRight: "none" }}
                              >
                                <Table responsive bordered={false} className="mb-0">
                                  <thead>
                                    <tr style={{ backgroundColor: "#FFF" }}>
                                      <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>INV NO</th>
                                      <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textAlign: "center" }}>DESCRIPTION</th>
                                      <th
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 600,
                                          color: "#222222",
                                          textAlign: "right",
                                        }}
                                      >
                                        AMOUNT / INR
                                      </th>
                                    </tr>
                                  </thead>

                                  <tbody>
                                    {pdfDetails?.invoiceInfo?.invoiceItems?.map((item, index) => (
                                      <tr key={index}>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500 }}>
                                          {item.invoiceNo}
                                        </td>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500, textAlign: "center" }}>
                                          {item.description}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            textAlign: "right",
                                            fontWeight: 600,
                                            color: "#2D2D2D",
                                          }}
                                        >
                                          ₹ {Number(item.amount).toLocaleString("en-IN")}
                                        </td>
                                      </tr>
                                    ))}

                                    <tr
                                      style={{
                                        backgroundColor: "#FAFBFF",
                                        fontWeight: 600,
                                        borderTop: "1px solid #DFDFDF",
                                      }}
                                    >
                                      <td colSpan={2} style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 500, textAlign: hasTax ? "start" : "center", paddingLeft: !hasTax && 150 }}>
                                        Total
                                      </td>
                                      <td
                                        style={{
                                          textAlign: "right",
                                          fontSize: 14,
                                          fontWeight: 600,
                                          color: "#2D2D2D",
                                        }}
                                      >
                                        ₹ {Number(pdfDetails?.invoiceInfo?.subTotal || 0).toLocaleString("en-IN")}
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </Col>


                              {hasTax && (
                                <Col md={6} className="p-2">
                                  <Table responsive bordered={false} className="mb-0">
                                    <thead>
                                      <tr style={{ backgroundColor: "#FFF" }}>
                                        <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>OTHERS</th>
                                        <th
                                          style={{
                                            fontSize: 12,
                                            fontWeight: 600,
                                            color: "#222222",
                                            textAlign: "right",
                                          }}
                                        >
                                          AMOUNT / INR
                                        </th>
                                      </tr>
                                    </thead>

                                    <tbody>
                                      <tr>
                                        <td style={{ fontSize: 12, color: "#2D2D2D", fontWeight: 500 }}>
                                          GST ({pdfDetails?.invoiceInfo?.taxPercentage}%)
                                        </td>
                                        <td
                                          style={{
                                            fontSize: 12,
                                            color: "#2D2D2D",
                                            fontWeight: 600,
                                            textAlign: "right",
                                          }}
                                        >
                                          ₹{" "}
                                          {Number(pdfDetails?.invoiceInfo?.taxAmount).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                          })}
                                        </td>
                                      </tr>

                                      <tr
                                        style={{
                                          backgroundColor: "#FAFBFF",
                                          fontWeight: 600,
                                          borderTop: "1px solid #DFDFDF",
                                        }}
                                      >
                                        <td style={{ fontSize: 14, color: "#2D2D2D", fontWeight: 500 }}>Total</td>
                                        <td
                                          style={{
                                            textAlign: "right",
                                            fontSize: 14,
                                            fontWeight: 600,
                                            color: "#2D2D2D",
                                          }}
                                        >
                                          ₹{" "}
                                          {Number(pdfDetails?.invoiceInfo?.taxAmount || 0).toLocaleString("en-IN")}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </Col>
                              )}
                            </Row>




                          </div>



                          <div className="mb-3 mt-3  px-3 py-2 border rounded" style={{
                            backgroundColor: "#FAFBFF",
                            fontSize: 13,
                            fontWeight: 600,
                          }}>




                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>Grand Total</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#4B4B4B", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.totalAmount || 0)}</div>
                            </div>
                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>Payment Made</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(0,163, 46, 1)", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.paidAmount || 0)}</div>
                            </div>

                            <div
                              className="d-flex justify-content-between align-items-center mb-2"
                              style={{
                                backgroundColor: "#FAFBFF",
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >

                              <div style={{ color: "#4B4B4B", fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>Balance Due</div>
                              <div style={{ fontSize: 12, fontWeight: 600, color: "#FF0000", fontFamily: "Gilroy" }}>₹{" "}
                                {Number(pdfDetails?.invoiceInfo?.balanceAmount || 0)}</div>
                            </div>
                          </div>

                        </>
                  }


                </div>






                <div className="px-5 mt-1">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <h6
                        style={{
                          fontSize: "11px",
                          fontFamily: "Gilroy",
                          fontWeight: 800,
                          marginBottom: "12px", ...textStyle
                        }}
                      >
                        ACCOUNT DETAILS
                      </h6>

                      <div className="mb-1">
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy", }}>
                          Account No:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy", }}>
                          {pdfDetails?.accountDetails?.accountNo || "N/A"}
                        </span>
                      </div>

                      <div className="mb-1">
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          IFSC Code:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}> {pdfDetails?.accountDetails?.ifscCode || "N/A"}</span>
                      </div>

                      <div className="mb-1">
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          Bank Name:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{pdfDetails?.accountDetails?.bankName || "N/A"}</span>
                      </div>

                      <div>
                        <label style={{ fontSize: "11px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          UPI Details:
                        </label>{" "}
                        <span style={{ fontSize: "12px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{pdfDetails?.accountDetails?.upiId || "N/A"}</span>
                      </div>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-4 d-flex flex-column justify-content-between">

                      <div className="d-flex justify-content-center mb-2">
                        {pdfDetails?.accountDetails?.qrCode ?
                          <img
                            src={pdfDetails?.accountDetails?.qrCode ? pdfDetails?.accountDetails?.qrCode : ""}
                            alt="Barcode"
                            style={{ height: "auto", maxWidth: 150, borderRadius: 2 }}
                            className="img-fluid"
                          />
                          :
                          ""}
                      </div>

                      {/* <div className="d-flex justify-content-end">
                        {[Paytm, Phonepe, Gpay].map((icon, idx) => (
                          <img
                            key={idx}
                            src={icon}
                            alt="UPI"
                            style={{ height: 38, width: 38 }}
                            className="ms-2"
                          />
                        ))}
                      </div> */}
                    </div>
                  </div>
                </div>



                <div className="row justify-content-between mt-4 mb-5 px-5">
                  <div className="col-md-8">
                    <h4 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, ...textStyle }}>Terms and Conditions</h4>
                    <p style={{ whiteSpace: "pre-line", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: '#3D3D3D', paddingRight: 50 }}>
                      {pdfDetails?.configurations?.termAndCondition}
                    </p>
                  </div>

                  <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
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


                <hr className="mb-2"
                  style={{
                    border: "none",
                    height: "1px",
                    background: templateColor,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    borderRadius: "2px",
                  }}
                />


                <div className="px-5">
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
                      Email: {" "}
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
                      Contact: {" "}
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


{
  pdfDetails?.invoiceInfo?.paymentStatus !== "Cancelled" && 

      <div
        style={{
          position: "sticky",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: 2,
          backgroundColor: "#fff",
          boxShadow: "0 -6px 10px -6px rgba(0,0,0,0.15)",
          // borderRadius: 12,
        }}
      >

        <div
          className="d-flex justify-content-between align-items-center px-3 py-2"
          style={{ cursor: "pointer" }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: 16,
              color: "#222",
              fontFamily: "Gilroy",
            }}
          >
            {pdfDetails?.invoiceInfo?.totalAmount > 0 ? "Payments Made" : "Refund Made"}
          </span>

          <div className="d-flex align-items-center gap-2">
            {
              Number(pdfDetails?.invoiceInfo?.balanceAmount) > 0 &&
              <Button disabled={!canWriteInvoice}
                size="sm"
                style={{
                  background: "#1E45E1",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  whiteSpace: "nowrap",display: "flex", alignItems: "center",
                  gap: 6,

                }}
                onClick={() => { if (canWriteInvoice) handleNavigateRecordPayment(pdfDetails) }}
              >
                <AddCircle size="16" color="#fff" variant="Bold" /> Record Payment
              </Button>
            }
            {
              pdfDetails?.invoiceInfo?.totalAmount < 0 && Number(pdfDetails?.invoiceInfo?.balanceAmount) !== 0 &&
              <Button disabled={!canWriteInvoice}
                size="sm"
                style={{
                  background: "#1E45E1",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 500,
                  fontFamily: "Gilroy", 
                  display: "flex", alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                }}
                onClick={() => handleNavigateRefund(pdfDetails)}
              >
                <AddCircle size="16" color="#fff" variant="Bold" /> Refund Amount
              </Button>
            }



            {
              (
                isOpenPayment ? (
                  <ArrowUp2
                    size="18"
                    color="#1E45E1"
                    style={{ cursor: "pointer" }}
                    onClick={() => { setIsOpenPayment(false); setIsOpen(false) }}
                  />
                ) : (
                  <ArrowDown2
                    size="18"
                    color="#1E45E1"
                    style={{ cursor: "pointer" }}
                    onClick={() => { setIsOpenPayment(true); setIsOpen(false) }}
                  />
                )
              )
            }


          </div>

        </div>

        {isOpenPayment && (
          <div style={{ fontFamily: "Gilroy" }}>
            <Table responsive className="mb-0">
              <thead style={{ background: "#F9FAFB" }}>
                <tr>
                  <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>DATE</th>
                  <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>REF NO</th>
                  <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>PAYMENT MODE</th>
                  <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>AMOUNT</th>
                  <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {pdfDetails?.paymentHistory?.length > 0 ? (
                  pdfDetails.paymentHistory.map((item, index) => (
                    <tr key={index}>
                      <td style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>
                        {item.paidDate || "-"}
                      </td>

                      <td
                        style={{
                          color: "#1E45E1",
                          fontWeight: 500,
                          fontSize: 12,
                        }}
                      >
                        {item.transactionReferenceId || item.referenceNumber || "-"}
                      </td>


                      <td style={{ color: "#111928", fontSize: 12, fontWeight: 600 }}>
                        CASH
                      </td>


                      <td style={{ color: "#111928", fontSize: 12, fontWeight: 600 }}>
                        ₹{item.amount}
                      </td>


                      <td>
                        <Badge
                          bg="success"
                          style={{
                            borderRadius: 20,
                            fontWeight: 500,
                            padding: "6px 10px",
                            fontSize: 12,
                          }}
                        >
                          ● Paid
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-3" style={{ fontSize: 12, color: "#FF0000" }}>
                      No payments found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            <div
              className="d-flex justify-content-end px-5 py-2"
              style={{ borderTop: "1px solid #eee" }}
            >
              <span className="me-2" style={{ color: "#4B4B4B", fontSize: 14, fontWeight: 500 }}>Balance Due</span>
              <span style={{ color: "#E53935", fontSize: 14, fontWeight: 500 }}>₹{pdfDetails?.invoiceInfo?.balanceAmount}</span>
            </div>
          </div>
        )}
      </div>
}
      {showform && (
        <RecordPayment show={showform} handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          invoiceValue={invoiceValue}
          invoiceList={invoiceList}
        />

      )}


      {payapleform &&
        <RefundAmount show={payapleform} handleClose={handleCloseRefundAmount} refundDetails={refundDetails} />

      }
    </div>
  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
   isReportsInvoiceRegisterWay: PropTypes.bool
};


export default withErrorBoundary(InvoiceCard);




