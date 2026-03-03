/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import Payment from '../../Assets/Images/New_images/Mask-group.png'
import Refund from '../../Assets/Images/New_images/Refund.png';
import { Location, Call, Profile, DocumentDownload } from 'iconsax-react'
import { IoBed } from "react-icons/io5";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from '../../Utils/Permission';


const InvoiceCard = ({ rowData, }) => {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  // const pdfOpenedRef = useRef(false);
  const modalRef = useRef(null);

  const [hoveredItem, setHoveredItem] = useState(null);
  const pdfDetails = state.InvoiceList?.newReceiptchanges
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
  // const [idforwhats, setIdForWhats] = useState("");
  const cardRef = useRef(null);


  const {
         canReadModule: canReadReceipt,
  } = useHasPermission("Receipt");








  useEffect(() => {
    // setIdForWhats(rowData?.id);
    setIsVisible(true)
  }, [rowData])


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function convertNumberToWords(num) {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen",
      "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if ((num = Number(num)) > 999999999) return "Overflow";
    if (num === 0) return "Zero Rupees Only";

    const nStr = ("000000000" + num).slice(-9);
    const n = nStr.match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return "";

    let str = "";

    const twoDigitWords = (val) => {
      val = Number(val);
      if (val < 20) return a[val];
      return b[Math.floor(val / 10)] + (val % 10 !== 0 ? " " + a[val % 10] : "");
    };

    str += n[1] !== "00" ? twoDigitWords(n[1]) + " Crore " : "";
    str += n[2] !== "00" ? twoDigitWords(n[2]) + " Lakh " : "";
    str += n[3] !== "00" ? twoDigitWords(n[3]) + " Thousand " : "";
    str += n[4] !== "0" ? a[Number(n[4])] + " Hundred " : "";
    str += n[5] !== "00" ? (str !== "" ? "and " : "") + twoDigitWords(n[5]) + " " : "";

    return str.trim() + " Rupees Only.";
  }



  const innerScrollRef = useRef(null);

  const [pdfLoading, setPdfLoading] = useState(false)


  const handleBackInvoice = () => {
    navigate(`/receipts/${state.login?.selectedHostel_Id}`);
  }


  const handleDownload = (item) => {
    if (item.transactionId) {

      dispatch({
        type: "RECEIPTPDF",
        payload: {
          transactionId: item.transactionId,
          hostelId: state.login?.selectedHostel_Id

        },
      });
      setPdfLoading(true)

    }
  };


  //   useEffect(() => {
  //     if (!state.InvoiceList.ReceiptPDF) return;

  //     window.open(state.InvoiceList.ReceiptPDF, "_blank");
  // setPdfLoading(false)
  //     dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
  //   }, [state.InvoiceList.ReceiptPDF]);

  useEffect(() => {
    if (state.InvoiceList.statusCodeForReceiptPDf === 200) {
      setPdfLoading(false);
      window.open(state.InvoiceList.ReceiptPDF, "_blank");

      dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
    }
  }, [state.InvoiceList.statusCodeForReceiptPDf]);





  useEffect(() => {
    if (state.InvoiceList.pdfErrorMessage || state.createAccount?.networkError || state.InvoiceList?.sharePdfError) {
      setPdfLoading(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        dispatch({ type: 'REMOVE_SHARE_PDF_ERROR' })

      }, 100);
    }
  }, [state.InvoiceList.pdfErrorMessage, state.createAccount?.networkError, state.InvoiceList?.sharePdfError]);





  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };


  const handleMenuClick = async (key) => {
    setIsOpen(false);

    if (key === "whatsapp") {
      dispatch({
        type: 'WHATSAPPSHAREPDFRECEIPT',
        payload: {
          hostelId: pdfDetails?.hostelId,
          transactionId: pdfDetails?.receiptInfo?.receiptId

        },
      })

      setPdfLoading(true)
    }
  };




  useEffect(() => {
    if (state.InvoiceList.shareReceiptPdfSuccess === 200) {
      setPdfLoading(false)
      dispatch({ type: 'REMOVE_WHATSAPP_SHARE_PDF_RECEIPT' })

    }

  }, [state.InvoiceList.shareReceiptPdfSuccess])










  useEffect(() => {

    if (state.login.selectedHostel_Id) {
      dispatch({ type: "RECEIPTSLIST", payload: state.login.selectedHostel_Id });
    }
  }, [state.login.selectedHostel_Id]);




  // const hasAmount = -100


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

  return (

    <>
      <div className="sticky-top bg-white p-0 m-0 d-flex justify-content-between align-items-center" style={{ borderLeft: "1px solid #E5E7EB" }}>

        {pdfLoading && (
          <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <div
          className="d-flex justify-content-between align-items-center "
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
                style={{
                  borderRadius: '8px', cursor: canReadReceipt ? "pointer" : "not-allowed", height: 30, width: 30,
                  opacity: canReadReceipt ? 1 : 0.5
                }}
                onClick={() => { if (canReadReceipt) handleDownload(rowData) }}
              >
                <DocumentDownload
                  size="18"
                  color={canReadReceipt ? "#222222" : "#BDBDBD"}
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
                    className="absolute  right-[5px] mt-2 p-2 shadow rounded-lg bg-white w-40 z-[9999]"
                  >
                   {menuItems.map((item) => {
  const isDisabled = !canReadReceipt;

  return (
    <div
      key={item.key}
      className={`d-flex align-items-center mb-2 hover-item p-1 rounded z-[9999]
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      style={{
        backgroundColor:
          hoveredItem === item.key && !isDisabled
            ? "rgba(30, 69, 225, 1)"
            : "#fff",
      }}
      onMouseEnter={() => !isDisabled && setHoveredItem(item.key)}
      onMouseLeave={() => setHoveredItem(null)}
      onClick={() => {
        if (!isDisabled) handleMenuClick(item.key);
      }}
    >
      <img
        src={
          hoveredItem === item.key && !isDisabled
            ? item.iconWhite
            : item.icon
        }
        className="me-2"
        alt={item.label}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 400,
          fontFamily: "Gilroy",
          color:
            hoveredItem === item.key && !isDisabled
              ? "#fff"
              : "rgba(33, 37, 41, 1)",
        }}
      >
        {item.label}
      </span>
    </div>
  );
})}
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
        backgroundColor: "#F7F8FC", height: "90vh",
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

                    <div className="mb-2" style={{ fontSize: 12, fontWeight: 400, fontStyle: "italic", ...textStyle }}>
                      Receipt to:
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

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Receipt No : </div>
                      <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.receiptNumber}</div>

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Date :</div>
                      <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.transactionDate}</div>

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Time :</div>
                      <div className="col-6 text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.transactionTime}</div>

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Payment Mode:</div>
                      <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.accountDetails?.bankName}</div>
                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: '#4B4B4B', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Transaction ID :</div>
                      <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>{pdfDetails?.receiptInfo?.transactionId}</div>

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
                        textTransform: "capitalize"
                      }}
                    >
                      {Number(pdfDetails?.invoiceAmount) > 0 ? "TOTAL PAID AMOUNT" : "Total Refunded Amount"}<br />

                      {
                        (pdfDetails?.configurations?.receiptType === 'Booking' || pdfDetails?.configurations?.receiptType === 'Advance') && <span style={{ fontFamily: "Gilroy", color: "#6D6D6D", fontSize: 11 }}>Security Deposit (Advance)</span>
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
                            backgroundColor: Number(pdfDetails?.invoiceAmount) > 0 ? "#00A651" : "#FF0000",
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
                  <h4 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, ...textStyle }}>Acknowledgment</h4>
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
                            width: "20%",
                          }}
                        >
                          Invoice Number
                        </th>
                        <th
                          style={{
                            padding: "10px 14px",
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#000",
                            textAlign: "center",
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
                            width: "20%",
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
                            width: "20%",
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
                            textAlign: "center",
                            verticalAlign: "middle",
                            width: "60%",
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
                            verticalAlign: "middle", width: "20%",
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
                          ₹ {pdfDetails?.invoiceAmount?.toLocaleString("en-IN")}
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
                            ₹ {pdfDetails?.invoiceAmount?.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

              }




              <hr className="m-0"
                style={{
                  border: "none",
                  height: "1px",
                  background: templateColor,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2px",
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
    </>

  );
};

InvoiceCard.propTypes = {
  rowData: PropTypes.func.isRequired,
  handleClosed: PropTypes.func.isRequired
};


export default withErrorBoundary(InvoiceCard);








