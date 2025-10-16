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



const InvoiceCard = ({ rowData, handleClosed }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  console.log("rowData", rowData.invoiceType)

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


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })
    }

  }, [])






  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetsuccessCode === 200) {

      const invoiceTypeMap = {
        Rent: "RENTAL",
        Advance: "ADVANCE",
      };

      const selectedType = invoiceTypeMap[rowData.invoiceType];

      const TempArray = state.Settings?.settingsBillsTemplateList?.templates?.filter(
        (template) => template.type === selectedType
      );

      console.log(TempArray, "TempArray");


      setHostelDetails(TempArray)
      setUserDetails(state.InvoiceList.BillsPdfDetails.user_details)
      setTableDetails(state.InvoiceList.BillsPdfDetails.amenities)
      setInvoiceDetails(TempArray)

      setBillTemplate(TempArray)

      setBankingDetails(state.InvoiceList.BillsPdfDetails.banking_details)
      setBillTransaction(state.InvoiceList.BillsPdfDetails.Transaction)
      setBillReceipt(state.InvoiceList.BillsPdfDetails)
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_BILLS_PDF_DETAILS_STATUS_CODE" });
      }, 100);
    }
  }, [state.Settings?.SettingsBilltemplategetsuccessCode]);





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



  // const taxAmount = (invoice_details?.total_amount * bill_template?.tax) / 100;

  // const totalAmount = invoice_details?.total_amount + taxAmount;





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
                >#AFHFOHGSJH{rowData?.Invoices === null || rowData?.Invoices === '' ? '0.00' : rowData?.Invoices}
                </label>
              </div>

              <div className="">
                {rowData?.BalanceDue === 0 ? <span
                  style={{
                    fontSize: '10px',
                    backgroundColor: '#FFF0F0', color: '#000',
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
                style={{ borderRadius: "8px", backgroundColor: "#FFFFFF" , marginBottom:50,boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",}}
              >

                <div className=" p-2 position-relative" style={{
                  borderTopLeftRadius: "8px", borderTopRightRadius: "8px", height: "80px",
                  // bill_template.template_theme || 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))',
                }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex" >
                      <img src={bill_template?.invoiceLogoUrl ? bill_template?.invoiceLogoUrl : Logo} alt="logo" style={{ height: 64, minWidth: 64, maxWidth: 84, borderRadius: '4px', }} className="me-2 mt-2" />

                      <div >
                        <div style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", marginRight: '20px', color: '#2B2B2B' }}>
                          {/* {hosteldetails?.name}  */}Sweet Homes
                        </div>
                        <div
                          className="d-flex flex-wrap"
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            color: "#4B4B4B",
                            wordBreak: "break-word",
                            paddingRight: 100
                          }}
                        >
                          9, 8th Avenue Rd, Someshwara Nagar, Chennai, Tamilnadu - 600 056
                        </div>

                      </div>


                    </div>
                    <div>

                      <label style={{ fontSize: 10, fontWeight: 600, fontFamily: "Gilroy", color: "#4B4B4B" }}>Invoice of the Month</label>

                      <label style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy", color: "#16255D" }}>March- Apr 2025</label>
                    </div>

                  </div>
                </div>


                <div className="container bg-white rounded-bottom  position-relative" style={{ width: "100%", }}>
                  <div className="text-center pt-2 pb-1">
                    <h5 style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: '#171717', }}>
                      {/* {invoice_details.invoice_type === "advance" ? "Security Deposit Invoice" : "Payment Invoice"} */}
                      Payment Invoice
                    </h5>
                  </div>


                  <div className="row px-4 mt-1">
                    <div className="col-md-5 mb-3" style={{ fontFamily: "Gilroy", fontSize: 13, color: "#222" }}>

                      <div className="mb-2" style={{ fontSize: 12, fontWeight: 400, fontStyle: "italic", color: "#1E45E1" }}>
                        Bill to:
                      </div>

                      <div className="mb-1 d-flex align-items-center">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Tenant Name:</label>
                        <span style={{ fontWeight: 600, color: "#171717", fontSize: 14 }}>
                          {/* {userdetails?.name} */}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Mobile No:</label>
                        <span style={{ color: "#171717", fontSize: 14 }}>
                          {userdetails &&
                            String(userdetails?.phone)?.slice(
                              0,
                              String(userdetails?.phone).length - 10
                            )}{" "}
                          {userdetails && String(userdetails?.phone)?.slice(-10)}
                        </span>
                      </div>

                      <div className="mb-1 d-flex">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Room No:</label>
                        <span style={{ color: "#171717", fontSize: 14 }}>
                          {userdetails?.room_name}  {userdetails?.bed_name}
                        </span>
                      </div>

                      <div className="d-flex">
                        <label style={{ fontWeight: 500, width: 90, color: "#4B4B4B", fontSize: 12 }}>Address:</label>
                        <div>
                          <div style={{ color: "#171717", fontSize: 14 }}>
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

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '14px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>#{invoice_details?.invoice_id === null || invoice_details?.invoice_id === '' ? '0.00' : invoice_details?.invoice_id}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '14px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{moment(invoice_details?.invioice_date).format('DD MMM YYYY')}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                        <div className="col-6 text-start mt-1" style={{ fontSize: '14px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{moment(invoice_details?.due_date).format('DD MMM YYYY')}</div>

                        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                        <div className="col-6  text-start mt-1" style={{ fontSize: '14px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{moment(userdetails?.joining_date).format('DD MMM YYYY')}</div>

                      </div>
                    </div>
                  </div>







                </div>
                <div className="px-4 mt-1">
                  <div className="row">
                    <div className="col-md-6 mb-1">
                      <h6
                        style={{
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 700,
                          color: "#1E45E1",
                          letterSpacing: "1px",
                          marginBottom: "12px",
                        }}
                      >
                        ACCOUNT DETAILS
                      </h6>

                      <div className="mb-1">
                        <label style={{ fontSize: "12px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy", }}>
                          Account No:
                        </label>{" "}
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy", }}>
                          {banking_details?.acc_num}
                        </span>
                      </div>

                      <div className="mb-1">
                        <label style={{ fontSize: "12px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          IFSC Code:
                        </label>{" "}
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{banking_details?.ifsc_code}</span>
                      </div>

                      <div className="mb-1">
                        <label style={{ fontSize: "12px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          Bank Name:
                        </label>{" "}
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{banking_details?.bank_name}</span>
                      </div>

                      <div>
                        <label style={{ fontSize: "12px", fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>
                          UPI Details:
                        </label>{" "}
                        <span style={{ fontSize: "14px", fontWeight: 500, color: "#171717", fontFamily: "Gilroy" }}>{banking_details?.type}</span>
                      </div>
                    </div>

                    <div className="col-md-2"></div>

                    <div className="col-md-4 d-flex flex-column justify-content-between">

                      <div className="d-flex justify-content-end mb-2">
                        <img
                          src={bill_template?.qr_url ? bill_template?.qr_url : Barcode}
                          alt="Barcode"
                          style={{ height: "auto", maxWidth: 150, borderRadius: 2 }}
                          className="img-fluid"
                        />
                      </div>

                      <div className="d-flex justify-content-end">
                        {[Paytm, Phonepe, Gpay].map((icon, idx) => (
                          <img
                            key={idx}
                            src={icon}
                            alt="UPI"
                            style={{ height: 38, width: 38 }}
                            className="ms-2"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>



                <div className="row justify-content-between mt-4 mb-0 px-4">
                  <div className="col-md-8">
                    <h4 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: '#4B4B4B' }}>Terms and Conditions</h4>
                    <p style={{ whiteSpace: "pre-line", fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: '#3D3D3D', paddingRight: 50 }}>
                      {/* {bill_template?.terms_and_condition} */}
                      Tenants must pay all dues on or before the due date, maintain cleanliness, and follow PG rules; failure may lead to penalties or termination of stay.
                    </p>
                  </div>

                  <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
                    {bill_template?.digital_signature_url && (
                      <img
                        src={bill_template?.digital_signature_url}
                        alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft: 20 }}

                      />
                    )}
                    <p
                      style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}
                    >Authorized Signature</p>
                  </div>
                </div>




                <div className="px-4 ">
                  <div className="mb-1">
                    <label style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: '#3F3F3F' }}>Payment Summary</label>
                  </div>
                  <div className="p-3" style={{ fontFamily: "Gilroy" }}>
                    <Row style={{border:"1px solid #DFDFDF", borderRadius:8}}>
                      
                      <Col md={6} className="p-1">
                        <Table   responsive className="mb-0">
                          <thead>
                            <tr style={{ backgroundColor: "#FFF" }}>
                              <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>DESCRIPTION</th>
                              <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textAlign: "right" }}>
                                AMOUNT / INR
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ fontSize: 12 , color:"#2D2D2D", fontWeight:500}}>Rental Amount</td>
                              <td style={{ fontSize: 12, textAlign: "right",fontWeight:600,color:"#2D2D2D" }}>₹ 6,000.00</td>
                            </tr>
                            <tr>
                              <td style={{ fontSize: 12 , color:"#2D2D2D",fontWeight:500}}>EB Bill</td>
                              <td style={{ fontSize: 12, textAlign: "right",fontWeight:600 ,color:"#2D2D2D"}}>₹ 900.00</td>
                            </tr>
                            <tr>
                              <td style={{ fontSize: 12 , color:"#2D2D2D", fontWeight:500}}>Food</td>
                              <td style={{ fontSize: 12, textAlign: "right" ,fontWeight:600,color:"#2D2D2D"}}>₹ 2,100.00</td>
                            </tr>
                            <tr style={{ backgroundColor: "#FAFBFF", fontWeight: 600, borderTop:"1px solid #DFDFDF" }}>
                              <td  style={{ fontSize: 14 , color:"#2D2D2D", fontWeight:500}}>Total</td>
                              <td style={{ textAlign: "right",fontSize: 14, textAlign: "right" ,fontWeight:600,color:"#2D2D2D" }}>₹ 9,000.00</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>

                      
                      <Col md={6} className="p-1">
                        <Table  responsive className="mb-0">
                          <thead>
                            <tr style={{ backgroundColor: "#FFF" }}>
                              <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>OTHERS</th>
                              <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textAlign: "right" }}>
                                AMOUNT / INR
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td style={{ fontSize: 12 , color:"#2D2D2D", fontWeight:500 }}>GST</td>
                              <td style={{ fontSize: 12, color:"#2D2D2D", fontWeight:600, textAlign: "right" }}>₹ 300.00</td>
                            </tr>
                            <tr style={{ backgroundColor: "#FAFBFF", fontWeight: 600 ,borderTop:"1px solid #DFDFDF" }}>
                              <td style={{fontSize: 14 , color:"#2D2D2D", fontWeight:500}}>Total</td>
                              <td style={{ textAlign: "right",fontSize: 14, textAlign: "right" ,fontWeight:600,color:"#2D2D2D" }}>₹ 300.00</td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>

                    {/* Grand Total */}
                  
                  </div>

                  {/* <div className="d-flex flex-wrap align-items-start mt-1">
                    {invoice_details?.invoice_type === "manual" && (
                      <div className="text-start mt-5" style={{ flex: '1 1 0%' }}>
                        <p className="mb-0" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
                          &quot; {bill_template?.notes} &quot;
                        </p>

                      </div>
                    )}
                    {invoice_details?.invoice_type === "advance" ? (




                      <div className="mt-3 ms-auto" style={{ minWidth: '300px' }}>
                        <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', marginRight: 50 }}>Rs. {billReceipt?.subtotal}</span>
                        </div>


                        {Number(billReceipt?.tax) > 0 && (
                          <div className="d-flex justify-content-between py-1">
                            <span
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: 'rgba(23, 23, 23, 1)',
                              }}
                            >
                              Tax({billReceipt?.tax}%)
                            </span>
                            <span
                              className="me-1"
                              style={{
                                fontSize: '13px',
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                color: 'rgba(23, 23, 23, 1)',
                                marginRight: 50
                              }}
                            >
                              Rs. {billReceipt?.taxAmount}
                            </span>
                          </div>
                        )}

                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total Bill Amount </span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', paddingLeft: 10, marginRight: 50 }}>Rs.{billReceipt?.totalBillAmount}</span>
                        </div>

                       
                        {billTransaction?.length > 0 &&
                          billTransaction.map((item, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between fw-bold py-2"
                            >
                              <span
                                style={{
                                  fontSize: '13px',
                                  fontFamily: 'Gilroy',
                                  fontWeight: 600,
                                  color: 'rgba(23, 23, 23, 1)',
                                }}
                              >
                                
                                Payment made <p style={{ fontSize: 10 }}>(receiptId:  {item.reference_id}) </p>
                              </span>
                              <span
                                style={{
                                  fontSize: '13px',
                                  fontFamily: 'Gilroy',
                                  fontWeight: 600,
                                  color: 'red',
                                  marginRight: 50
                                }}
                              >
                                Rs. {Number(item.amount || 0)}
                              </span>
                            </div>
                          ))}


                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>BalanceDue</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginRight: 50 }}>Rs. {billReceipt.BalanceDueAmount}</span>
                        </div>

                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Non Refundable</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginRight: "60px" }}>Rs. {invoice_details?.non_refundable_amount}</span>
                        </div>
                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Refundable</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginRight: "60px" }}>Rs. {invoice_details?.refundable_Amount}</span>
                        </div>
                      </div>

                    ) : (
                      <div className="mt-3 ms-auto" style={{ minWidth: '300px' }}>
                        <div className="d-flex justify-content-between py-1">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', marginRight: "60px" }}>Rs. {billReceipt.subtotal}</span>
                        </div>
                        {Number(billReceipt.tax) > 0 && (
                          <div className="d-flex justify-content-between py-1">
                            <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax({billReceipt.tax}%)</span>
                            <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', marginRight: "60px" }}>Rs. {billReceipt.taxAmount}</span>
                          </div>
                        )}
                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total Bill Amount </span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', paddingLeft: 10, marginRight: "60px" }}>Rs.{billReceipt.totalBillAmount}</span>
                        </div>


                        {billTransaction?.length > 0 &&
                          billTransaction.map((item, index) => (
                            <div
                              key={index}
                              className="d-flex justify-content-between fw-bold py-2"
                            >
                              <span
                                style={{
                                  fontSize: '13px',
                                  fontFamily: 'Gilroy',
                                  fontWeight: 600,
                                  color: 'rgba(23, 23, 23, 1)',
                                }}
                              >
                              
                                Payment made <p style={{ fontSize: 10 }}>(receiptId: {item.reference_id}) </p>
                              </span>
                              <span
                                style={{
                                  fontSize: '13px',
                                  fontFamily: 'Gilroy',
                                  fontWeight: 600,
                                  color: 'red',
                                  marginRight: "60px"
                                }}
                              >
                                Rs. {Number(item.amount || 0)}
                              </span>
                            </div>
                          ))}


                        <div className="d-flex justify-content-between fw-bold py-2">
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>BalanceDue</span>
                          <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginRight: "60px" }}>Rs. {billReceipt.BalanceDueAmount}</span>
                        </div>


                      </div>
                    )}

                  </div> */}
  <div
                      className="d-flex justify-content-between align-items-center mt-2 px-4 py-2 border rounded"
                      style={{
                        backgroundColor: "#FAFBFF",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
                      <div style={{color:"#4B4B4B",fontSize: 14 ,fontWeight:600, fontFamily:"Gilroy"}}>Grand Total</div>
                      <div style={{ fontSize: 14, fontWeight: 700 , color:"#1E1E1E",fontFamily:"Gilroy"}}>₹ 9,300.00</div>
                    </div>
                  <hr
        style={{
          borderTop: "1px solid #D9D9D9",
          
        }}
      />

                </div>





                <div className="ms-5 me-5">
                  <div
                    className="text-center rounded-bottom d-flex justify-content-center gap-4"
                    style={{
                      // backgroundColor: 'rgba(48, 80, 210, 1)',
                      // background: bill_template.template_theme || 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))',
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
                      email:
                      <span style={{fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 600,
                        color: '#222222',}}>example@gmail.com</span> 
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
                       <span style={{fontSize: '13px',
                        fontFamily: 'Gilroy',
                        fontWeight: 600,
                        color: '#222222',}}>+912365987548</span> 
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




