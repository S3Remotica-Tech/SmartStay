// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useRef, useEffect } from "react";
// import { toWords } from 'number-to-words';
// import "../Pages/Invoices.css";
// import moment from 'moment';
// import DownLoad from '../Assets/Images/New_images/searchss.png'
// import Whatsapp from '../Assets/Images/whatsapp.png'
// import Whatsapp_blue from '../Assets/Images/whatsapp_blue.png'
// import Whatsapp_white from '../Assets/Images/whatsapp_white.png'
// import Mail from '../Assets/Images/gmail.png'
// import Mail_white from '../Assets/Images/gmail_white.png'
// import Message_text from '../Assets/Images/message-text.png'
// import Message_text_white from '../Assets/Images/message-white.png'
// import Close from '../Assets/Images/New_images/circlie.png'
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import PropTypes from "prop-types";
// import './BillPdfModal.css';
// import received from '../Assets/Images/New_images/received.png'
// import "./Receipt.css";
// import mob from "../Assets/Images/New_images/Rectangle 77.png";
// import substrac from "../Assets/Images/New_images/Subtract.png";
// import frame from "../Assets/Images/New_images/FramePDF.png";
// import mobblue from "../Assets/Images/New_images/Rectangleblue.png";
// import substracBlue from "../Assets/Images/New_images/location 03.png";
// import frameblue from "../Assets/Images/New_images/Frameblue.png";
// import paidfull from '../Assets/Images/New_images/paidfull.png'
// import { useDispatch, useSelector } from "react-redux";
// import Logo from '../Assets/Images/get.png'
// import receiptLogo from '../Assets/Images/New_images/receiptlogo.png';
// import User from '../Assets/Images/user.png'
// import PaymentUser from '../Assets/Images/usertwo.png'



// const ReceiptPdfCard = ({ rowData, handleClosed }) => {

//   const state = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const [isVisible, setIsVisible] = useState(true);
//   const [idforwhats, setIdForWhats] = useState("");
//   const [receiptDataNew, setReceiptDataNew] = useState("");

//    const AdminDetails = state?.createAccount?.accountList[0]?.user_details
//    const fullName = `${AdminDetails.first_name} ${AdminDetails.last_name}`.trim();

//   useEffect(() => {
//     if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
//       setReceiptDataNew(state.InvoiceList.newReceiptchanges.receipt)
//       setTimeout(() => {
//         dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
//       }, 500);
//     }

//   }, [state.InvoiceList.statusCodeNewReceiptStatusCode])


//   const cardRef = useRef(null);


//   useEffect(() => {

//     setIsVisible(true)
//     if (rowData?.id) {
//       setIdForWhats(rowData?.id);
//       dispatch({ type: "RECEIPTPDF_NEWCHANGES", id: rowData?.id })
//     }

//   }, [rowData])



//   const [isOpen, setIsOpen] = useState(false);

//   const handleShareClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const [hoveredItem, setHoveredItem] = useState(null);

//   const menuItems = [
//     {
//       label: "Send Mail",
//       icon: Mail,
//       iconWhite: Mail_white,
//       key: "mail",
//     },
//     {
//       label: "Send SMS",
//       icon: Message_text,
//       iconWhite: Message_text_white,
//       key: "sms",
//     },
//     {
//       label: "Send Whatsapp",
//       icon: Whatsapp_blue,
//       iconWhite: Whatsapp_white,
//       key: "whatsapp",
//     },
//   ];

//   const isValid = (value) => {
//     return value !== null && value !== undefined && value !== "undefined" && value !== "";
//   };


//   const innerScrollRef = useRef(null);

//   const handleDownload = async () => {
//     const element = cardRef.current;
//     const innerElement = innerScrollRef.current;

//     if (!element || !innerElement) return;

//     const outerOriginal = {
//       height: element.style.height,
//       maxHeight: element.style.maxHeight,
//       overflow: element.style.overflow,
//       overflowY: element.style.overflowY,
//     };

//     const innerOriginal = {
//       height: innerElement.style.height,
//       maxHeight: innerElement.style.maxHeight,
//       overflow: innerElement.style.overflow,
//       overflowY: innerElement.style.overflowY,
//     };

//     element.style.height = "auto";
//     element.style.maxHeight = "none";
//     element.style.overflow = "visible";
//     element.style.overflowY = "visible";

//     innerElement.style.height = "auto";
//     innerElement.style.maxHeight = "none";
//     innerElement.style.overflow = "visible";
//     innerElement.style.overflowY = "visible";

//     await new Promise((resolve) => setTimeout(resolve, 100));

//     const canvas = await html2canvas(element, {
//       scale: 2,
//       useCORS: true,
//       logging: true,
//       allowTaint: false,
//     });

//     const imgData = canvas.toDataURL("image/png");
//     const imgWidth = 595.28;
//     const pageHeight = 841.89;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let heightLeft = imgHeight;
//     let position = 0;

//     const pdf = new jsPDF("p", "pt", "a4");
//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft > 0) {
//       pdf.addPage();
//       position = -(imgHeight - heightLeft);
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save("invoice.pdf");

//     Object.assign(element.style, outerOriginal);
//     Object.assign(innerElement.style, innerOriginal);
//   };

//   const handleBackInvoice = () => {
//     handleClosed()
//   }

//   const amountInWords = rowData?.amount_received
//     ? `${toWords(rowData.amount_received).replace(/\b\w/g, char => char.toUpperCase())} Rupees`
//     : '';

//   const handleMenuClick = async (key) => {
//     setIsOpen(false);

//     if (key === "whatsapp") {
//       try {
//         dispatch({
//           type: "SET_TRIGGER_SOURCE",
//           payload: "whatsapp",
//         });

//         dispatch({
//           type: "RECEIPTPDF",
//           payload: {
//             id: idforwhats,
//           },
//         });

//       } catch (error) {
//         console.error("Error sending WhatsApp with PDF:", error);
//       }
//     }
//   };


  

//   return (
//     <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
//       <div >
//         <div className="d-flex justify-content-between 
//             align-items-center ps-3">


//           <div className="d-flex align-items-center 
//                 justify-content-between gap-3 mx-3">

//             <div>


//               <div className="mb-3">
//                 <span style={{ fontSize: '10px', backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span>

//               </div>
//               <div className="mb-2 mt-2">
//                 <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>
//                   {moment(receiptDataNew?.Date).format('DD-MM-YYYY')}
//                 </label>
//                 -
//                 <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>
//                   #{(receiptDataNew?.invoice_number && receiptDataNew?.invoice_number !== '' && receiptDataNew?.invoice_number !== '0')
//                     ? receiptDataNew.invoice_number
//                     : (receiptDataNew?.reference_id || '0.00')}
//                 </label>


//               </div>
//             </div>
//           </div>
//           <div>

//             <div className="gap-2 d-flex me-3">
//               <div className="d-flex  border p-1" style={{ height: 38, width: 120, borderRadius: '8px', cursor: "pointer" }} onClick={handleDownload}>
//                 <img src={DownLoad} className="mt-1 ms-1" alt="Download Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} />
//                 <p className="mt-1 ms-2" style={{ fontSize: 13, fontWeight: 400, fontFamily: "Gilroy" }}>Download</p>

//               </div>
//               <div className="position-relative d-inline-block">
//                 <div
//                   className="d-flex align-items-center border p-1"
//                   onClick={handleShareClick}
//                   style={{
//                     height: 38,
//                     width: 100,
//                     borderRadius: "8px",
//                     cursor: "pointer",
//                     borderColor: isOpen ? "#2196f3" : "#ccc",
//                   }}
//                 >
//                   <img
//                     src={isOpen ? Whatsapp_blue : Whatsapp}
//                     alt="Share"
//                     style={{
//                       height: 20,
//                       width: 20,
//                     }}
//                     className="ms-1"
//                   />
//                   <p
//                     className="ms-2 mt-3"
//                     style={{
//                       fontSize: 13,
//                       fontWeight: 400,
//                       fontFamily: "Gilroy",
//                       color: isOpen ? "rgba(30, 69, 225, 1)" : "#000",
//                     }}
//                   >
//                     Share
//                   </p>
//                 </div>


//                 {isOpen && (
//                   <div
//                     className="position-absolute  start-0 mt-2 p-2 shadow"
//                     style={{
//                       borderRadius: "8px",
//                       backgroundColor: "#fff",
//                       width: 160,
//                       zIndex: 10,
//                     }}
//                   >
//                     {menuItems.map((item) => (
//                       <div
//                         key={item.key}
//                         className="d-flex align-items-center mb-2 hover-item p-1 rounded"
//                         style={{
//                           backgroundColor:
//                             hoveredItem === item.key ? "rgba(30, 69, 225, 1)" : "#fff",
//                         }}
//                         onMouseEnter={() => setHoveredItem(item.key)}
//                         onMouseLeave={() => setHoveredItem(null)}
//                         onClick={() => handleMenuClick(item.key)}
//                       >
//                         <img
//                           src={hoveredItem === item.key ? item.iconWhite : item.icon}
//                           className="me-2"
//                           alt={item.label}
//                         />
//                         <span
//                           style={{
//                             fontSize: 13,
//                             fontWeight: 400,
//                             fontFamily: "Gilroy",
//                             color:
//                               hoveredItem === item.key
//                                 ? "rgba(255, 255, 255, 1)"
//                                 : "rgba(33, 37, 41, 1)",
//                           }}
//                         >
//                           {item.label}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )
//                 }

//               </div>


//               <img src={Close} className="me-3 mt-1 ms-2" alt="Close Invoice" style={{ height: 20, width: 20, cursor: "pointer" }}
//                 onClick={handleBackInvoice} />
//             </div>

//           </div>

//         </div>
//         <div style={{ height: "2px", }} className="mx-4 mt-0">
//           <hr />
//         </div>

//         <div style={{ maxHeight: 400, }} className=" receipt-invoice">

//           {isVisible &&

//             receiptDataNew.invoice_type === "checkout" ? (
//             <div className="receipt-container border ps-4 pe-4 pb-4 pt-4"
//               ref={cardRef} style={{ width: '80%', marginLeft: '10%', marginTop: '20px', borderRadius: '8px', }}>

//               <div ref={innerScrollRef}
//                 className=" shadow-md show-scroll"
//                 style={{
//                   maxHeight: 390,
//                   overflowY: "auto",
//                   borderBottomLeftRadius: "13px",
//                   borderBottomRightRadius: "13px",
//                 }}>

//                 <div className=" text-white  p-2 position-relative" style={{Height: "100px", backgroundColor:receiptDataNew?.bill_template?.template_theme || "#1E45E1"  }}>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="col-lg-8">
//                     <img src={receiptDataNew?.bill_template?.logo_url ? receiptDataNew?.bill_template?.logo_url :  Logo} alt="logo" style={{ height:64 , minWidth:64 , maxWidth:84 ,  borderRadius: '4px',}} className="me-2 mt-1" />
//                     </div>

//                                       <div className="text-start mt-2 col-lg-4 d-flex flex-wrap">
//   <h5
//     className="mb-0"
//     style={{
//       fontSize: 18,
//       fontWeight: 600,
//       letterSpacing: 1,
//       fontFamily: "Gilroy",
//       marginRight: "20px",
//     }}
//   >
//     {receiptDataNew?.hostel_details?.name}
//   </h5>
//   <p
//     style={{
//       fontSize: 12,
//       fontWeight: 600,
//       fontFamily: "Gilroy",
//     }}
//   >
//     {receiptDataNew?.hostel_details?.address}
//     {receiptDataNew?.hostel_details?.address && receiptDataNew?.hostel_details?.area && ','}{" "}
//     {receiptDataNew?.hostel_details?.area}
//     {receiptDataNew?.hostel_details?.area && receiptDataNew?.hostel_details?.landmark && ','}{" "}
//     {receiptDataNew?.hostel_details?.landmark}
//       {(receiptDataNew?.hostel_details?.address || 
//   receiptDataNew?.hostel_details?.area || 
//   receiptDataNew?.hostel_details?.landmark) && <br />}

//     {receiptDataNew?.hostel_details?.city}
//     {receiptDataNew?.hostel_details?.city && receiptDataNew?.hostel_details?.state && ','}{" "}
//     {receiptDataNew?.hostel_details?.state}
//     {receiptDataNew?.hostel_details?.pincode && ' - '}
//     {receiptDataNew?.hostel_details?.pincode}
//   </p>
// </div>


//                   </div>
//                 </div>


//                 <div className="container bg-white rounded-bottom border position-relative" style={{ width: "100%", }}>
//                   <div className="text-center pt-2 pb-1">
//                     <p className="" style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>
//                       {receiptDataNew.invoice_type === "advance" && "Security Deposit Receipt"}
//                       {receiptDataNew.invoice_type === "checkout" && "Final Settlement Receipt"}
//                       {receiptDataNew.invoice_type !== "advance" && receiptDataNew.invoice_type !== "checkout" && "Payment Receipt"}
                     
//                     </p>


//                   </div>


//                   <div className="row px-4 mt-2">
//                     <div className="col-md-7 mb-3">
//                       <p className="mb-1" style={{ fontSize: '13px', color: '#1E45E1', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill To:</p>
//                       <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)', }}><img src={User} alt="user" /> <span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',marginLeft:8 }}>{receiptDataNew?.user_details?.name }</span></p>
//                       <p className="mb-1"><img src={mobblue} alt="mob" width={12} height={12} />
//                         <span className="ms-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}>  + {receiptDataNew &&
//                           String(receiptDataNew?.user_details?.phone)?.slice(
//                             0,
//                             String(receiptDataNew?.user_details?.phone).length - 10
//                           )}{" "}
//                           {receiptDataNew && String(receiptDataNew?.user_details?.phone)?.slice(-10)}</span>
//                       </p>
//                       <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}><img src={frameblue} alt="frame" width={15} height={15} className="me-1" /> {receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</p>

//                       <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>

//                         <div className="me-2">
//                           <img src={substracBlue} alt="local" />
//                         </div>

//                         <div>
//                           <div>
//                             {isValid(receiptDataNew?.user_details?.address) && <>{receiptDataNew?.user_details?.address} , </>}
//                             {isValid(receiptDataNew?.user_details?.area) && <>{receiptDataNew?.user_details?.area} , </>}
                           
//                           </div>
//                           <div>
//                              {isValid(receiptDataNew?.user_details?.city) && <>{receiptDataNew?.user_details?.city} .</>}
//                             {isValid(receiptDataNew?.user_details?.state) && <>{receiptDataNew?.user_details?.state} </>}
//                             {isValid(receiptDataNew?.user_details?.pincode) && <>- {receiptDataNew?.user_details?.pincode} .</>}
//                           </div>
//                         </div>

//                       </div>

//                     </div>
//                     <div className="col-md-5 mb-3">
//                       <div className="row">

//                         <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Receipt No :</div>
//                         <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.reference_id}</div>

//                         <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Date :</div>
//                         <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>

//                         <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Room No :</div>
//                         <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</div>
//                         <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Payment Mode :</div>
//                         <div className="col-6  text-start" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', marginTop: 2, paddingLeft: 18 }}> {receiptDataNew?.bank_type !== ""
//                           ? receiptDataNew.bank_type
//                           : receiptDataNew.payment_mode}</div>
//                       </div>
//                     </div>
//                   </div>


//                   <div className="px-4 pb-3">
//                     <div className="table-responsive">
//                       <table className="table  text-center align-middle">
//                         <thead style={{backgroundColor:receiptDataNew?.bill_template?.template_theme || "#1E45E1" , color: "#FFFFFF" }}>
//                           <tr style={{ color: "white" }}>
//                             <th style={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400 }}>S.NO</th>
//                             <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400 }}>Description</th>
//                             <th style={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400 }}>Amount / INR</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {receiptDataNew?.amenities?.map((item, index) => (
//                             <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{index + 1}</td>
//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{item.am_name}</td>
//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>Rs: {item.amount}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>


//                     <div className="d-flex justify-content-end mt-3"  >
//                       <div className="w-100 w-md-50" style={{ paddingRight: "80px" }}>

//                         <div className="d-flex justify-content-end py-1">
//                           <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Advance Amount</div>
//                           <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}> Rs: {receiptDataNew?.total_advance_amount}</div>
//                         </div>




//                         <div className="d-flex justify-content-end py-2 fw-bold">
//                           <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: '#1E1E1E', }}>Refundabled Total</div>
//                           <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: '#1E1E1E', }}>Rs: {receiptDataNew?.advance_return}</div>
//                         </div>
//                       </div>
//                     </div>

//                   </div>



//                 </div>
//                 <div className="px-4" style={{ marginTop: 20 }}>
//                   <div className="row">
//                     <div className="col-md-8">
//                       <h6 className="" style={{ color: '#1E45E1', fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500 }}>Terms and Conditions</h6>
//                       <p style={{ fontSize: "12px", color: "#555", fontFamily: 'Gilroy', fontWeight: 400 }}>
//                         {receiptDataNew?.bill_template?.terms_and_condition}
//                         {/* This document confirms final settlement for the Tenant on <br></br>
//                         {moment(receiptDataNew?.Date).format('DD/MM/YYYY')}. All dues are cleared, and room has been vacated. */}
//                       </p>
//                     </div>
//                     <div className="col-md-4 text-end">
//                         {receiptDataNew?.bill_template?.digital_signature_url && (
//                               <img
//                                 src={receiptDataNew?.bill_template.digital_signature_url}
//                                 alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft: 30 }}

//                               />
//                             )}
//                       <p className="mt-4" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}>
//                         Authorized Signature</p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="d-flex justify-content-between mt-4 align-items-start flex-wrap ms-4">

//                   <div className="text-start mt-4">
//                     <p className="mb-0" style={{ fontSize: "12px", fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
//                       &quot;{receiptDataNew?.bill_template?.notes}&quot;
//                     </p>
                   
//                   </div>


//                   <div>
//                     <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received" height={81} width={152} /></p>

//                   </div>
//                 </div>

//                 <div className=" px-5">
//                   <div className=" text-white text-center" style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px", backgroundColor:receiptDataNew?.bill_template?.template_theme || "#1E45E1" , padding: 7 }}>
//                     <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)', }}>email:{receiptDataNew?.bill_template?.email} | Contact: + {receiptDataNew?.bill_template?.contact_number}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) :
//             <div className="receipt-container border ps-4 pe-4 pb-4 pt-4 " ref={cardRef} style={{ width: "80%", marginLeft: '10%', marginTop: '20px', borderRadius: '8px', }} >

//               <div ref={innerScrollRef}
//                 className=" shadow-md show-scroll"
//                 style={{
//                   maxHeight: 390,
//                   overflowY: "auto",
//                   borderBottomLeftRadius: "13px",
//                   borderBottomRightRadius: "13px",
//                 }}>
//                 <div className=" text-white  p-2 position-relative" style={{ Height: "100px", backgroundColor:receiptDataNew?.bill_template?.template_theme || "#00A32E"  }}>
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="col-lg-8">
//                      <img src={receiptDataNew?.bill_template?.logo_url ? receiptDataNew?.bill_template?.logo_url :  receiptLogo} alt="logo" style={{ height:64 , minWidth:64 , maxWidth:84 ,  borderRadius: '4px', }} className="me-2 mt-1" />
//                     </div> 
//                    <div className="text-start mt-2 col-lg-4 d-flex flex-wrap">
//   <h5
//     className="mb-0"
//     style={{
//       fontSize: 18,
//       fontWeight: 600,
//       letterSpacing: 1,
//       fontFamily: "Gilroy",
//       marginRight: "20px",
//     }}
//   >
//     {receiptDataNew?.hostel_details?.name}
//   </h5>
//   <p
//     style={{
//       fontSize: 12,
//       fontWeight: 600,
//       fontFamily: "Gilroy",
//     }}
//   >
//     {receiptDataNew?.hostel_details?.address}
//     {receiptDataNew?.hostel_details?.address && receiptDataNew?.hostel_details?.area && ','}{" "}
//     {receiptDataNew?.hostel_details?.area}
//     {receiptDataNew?.hostel_details?.area && receiptDataNew?.hostel_details?.landmark && ','}{" "}
//     {receiptDataNew?.hostel_details?.landmark}
//       {(receiptDataNew?.hostel_details?.address || 
//   receiptDataNew?.hostel_details?.area || 
//   receiptDataNew?.hostel_details?.landmark) && <br />}

//     {receiptDataNew?.hostel_details?.city}
//     {receiptDataNew?.hostel_details?.city && receiptDataNew?.hostel_details?.state && ','}{" "}
//     {receiptDataNew?.hostel_details?.state}
//     {receiptDataNew?.hostel_details?.pincode && ' - '}
//     {receiptDataNew?.hostel_details?.pincode}
//   </p>
// </div>

//                   </div>
//                 </div>


//                 <div className="container bg-white rounded-bottom border position-relative" style={{}}>
//                   <div className="text-center pt-2 pb-1">
//                     <h5 className="" style={{ fontSize: '17px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.invoice_type === "advance" ? "Security Deposit Receipt" : "Payment Receipt"}</h5>
//                   </div>


//                   <div className="row px-4 mt-3">
//                     <div className="col-md-5 mb-3">
//                       <p className=" mb-1" style={{ color: 'rgba(0, 163, 46, 1)', fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, fontStyle: 'italic' }}>Bill To :</p>
//                       <p className="mb-1 me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)', }}><img src={PaymentUser} alt="user" /><span style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: '#000000', marginLeft:12}}>{receiptDataNew?.user_details?.name || rowData?.Name}</span></p>
//                       <p className="mb-1"><img src={mob} alt="mob" width={12} height={12} />
//                         <span className="ms-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}>  + {receiptDataNew &&
//                           String(receiptDataNew?.user_details?.phone)?.slice(
//                             0,
//                             String(receiptDataNew?.user_details?.phone).length - 10
//                           )}{" "}
//                           {receiptDataNew && String(receiptDataNew?.user_details?.phone)?.slice(-10)}</span>
//                       </p>
//                       <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: '#000000', }}><img src={frame} alt="frame" width={15} height={15} className="me-1" /> {receiptDataNew?.user_details?.room_name}-{receiptDataNew?.user_details?.bed_name}</p>
//                       <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>

//                         <div className="me-2">
//                           <img src={substrac} alt="subs" />
//                         </div>

//                         <div>
//                             {isValid(receiptDataNew?.user_details?.address) && <>{receiptDataNew?.user_details?.address}, </>}
//                             {isValid(receiptDataNew?.user_details?.area) && <>{receiptDataNew?.user_details?.area}, </>}
//                             {isValid(receiptDataNew?.user_details?.city) && <>{receiptDataNew?.user_details?.city}</>}
// {(isValid(receiptDataNew?.user_details?.address) || isValid(receiptDataNew?.user_details?.area) || isValid(receiptDataNew?.user_details?.city)) && <br />}
//                             {isValid(receiptDataNew?.user_details?.state) && <>{receiptDataNew?.user_details?.state} </>}
//                             {isValid(receiptDataNew?.user_details?.pincode) && <>- {receiptDataNew?.user_details?.pincode}</>}
//                         </div>

//                       </div>

//                     </div>
//                     <div className="col-md-7 mb-3">
//                       <div className="row">
//                         <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Receipt No :</div>
//                         <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>#{receiptDataNew?.reference_id || rowData?.reference_id}</div>

//                         <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Invoice Ref :</div>
//                         <div className="col-6 text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{receiptDataNew?.invoice_number ? `#${receiptDataNew.invoice_number}` : "-"}</div>

//                         <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Date :</div>
//                         <div className="col-6  text-start mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>



//                         <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: "nowrap" }}>Payment Mode :</div>
//                         <div className="col-6  text-start mt-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', paddingLeft: 18 }}>
//                           {receiptDataNew.bank_type || rowData.payment_mode}
//                           </div>
//                       </div>
//                     </div>
//                   </div>

//                   {receiptDataNew?.invoice_type === "advance" && (
//                     <div className="d-flex justify-content-end text-end mt-3 me-5">
//                       <div>
//                         <label style={{ fontSize: 13, fontWeight: 500, fontFamily: "Gilroy", marginRight: '15px', marginTop: '60px' }}>
//                           Amount received
//                         </label>
//                       </div>
//                       <div style={{ padding: '20px', border: '1px solid rgba(0, 163, 46, 1)', borderRadius: '5px' }}>

//                         <div>
//                           <label style={{ fontSize: 17, fontWeight: 700, fontFamily: "Gilroy", color: 'rgba(0, 163, 46, 1)' }}>
//                             ₹ {receiptDataNew?.amount_received}
//                           </label>
//                         </div>
//                         <div>
//                           <label style={{
//                             fontSize: 13,
//                             fontWeight: 600,
//                             color: "#000000",
//                             fontFamily: "Gilroy"
//                           }}>
//                             {amountInWords} only
//                           </label>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {receiptDataNew?.invoice_type === "advance" &&
//                     (
//                       <div>
//                         <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)', marginLeft: '20px' }}>Payment For</p>
//                       </div>
//                     )

//                   }

//                   <div className="px-4 pb-3">
//                     <div className="table-responsive">
//                       {/* <table className="table  text-center align-middle">
//                         <thead style={{ backgroundColor:receiptDataNew?.bill_template?.template_theme || "#00A32E" , color: "#FFFFFF" }}>
//                           <tr style={{ color: "white" }}>
//                             <th style={{ borderTopLeftRadius: "12px", borderBottomLeftRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>S.NO</th>
//                             <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Inv No</th>
//                             <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Description</th>
//                             {receiptDataNew?.invoice_type !== "advance" && (
//                               <th style={{ color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Duration</th>
//                             )}

//                             <th style={{ borderTopRightRadius: "12px", borderBottomRightRadius: "12px", color: "white", fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600 }}>Amount / INR</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {receiptDataNew?.amenities?.map((item, index) => (
//                             <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{index + 1}</td>
//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{receiptDataNew?.invoice_number}</td>
//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>{item.am_name}</td>
//                               {receiptDataNew?.invoice_type !== "advance" && (
//                                 <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }} >{moment(item?.created_at).format("MMM YYYY")}</td>
//                               )}

//                               <td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
//                                 ₹ {receiptDataNew?.invoice_type === "advance" ? receiptDataNew?.amount_received : item.amount}
//                               </td>


//                             </tr>
//                           ))}
//                         </tbody>
//                       </table> */}
//                       <table className="table text-center align-middle">
//   <thead
//     style={{
//       backgroundColor: receiptDataNew?.bill_template?.template_theme || "#00A32E",
//       color: "#FFFFFF",
//     }}
//   >
//     <tr style={{ color: "white" }}>
//       <th
//         style={{
//           borderTopLeftRadius: "12px",
//           borderBottomLeftRadius: "12px",
//           fontSize: "12px",
//           fontFamily: "Gilroy",
//           fontWeight: 400,
//         }}
//       >
//         S.NO
//       </th>
//       <th style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 400 }}>Description</th>
//       <th
//         style={{
//           borderTopRightRadius: "12px",
//           borderBottomRightRadius: "12px",
//           fontSize: "12px",
//           fontFamily: "Gilroy",
//           fontWeight: 400,
//         }}
//       >
//         Amount / INR
//       </th>
//     </tr>
//   </thead>

//   <tbody>
//     {receiptDataNew?.invoice_type === "booking" ? (
//       <tr style={{ borderBottom: "1px solid #dee2e6" }}>
//         <td style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>1</td>
//         <td style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>Booking Amount</td>
//         <td style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
//           Rs: {receiptDataNew?.amount_received}
//         </td>
//       </tr>
//     ) : (
//       receiptDataNew?.amenities?.map((item, index) => (
//         <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
//           <td style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>{index + 1}</td>
//           <td style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>{item.am_name}</td>
//           <td style={{ fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>Rs: {item.amount}</td>
//         </tr>
//       ))
//     )}
//   </tbody>
// </table>

//                     </div>

//                     {(receiptDataNew.invoice_type !== "advance" || receiptDataNew.invoice_type !== "booking")  &&  (
//                       <div className="d-flex justify-content-end mt-3">
//                         <div className="w-100 w-md-50" style={{ paddingRight: "50px" }}>
//                           <div className="d-flex justify-content-end py-1">
//                             <div
//                               className="w-50 text-end"
//                               style={{
//                                 fontSize: '13px',
//                                 fontFamily: 'Gilroy',
//                                 fontWeight: 500,
//                                 color: 'rgba(23, 23, 23, 1)',
//                               }}
//                             >
//                               Sub Total
//                             </div>
//                             <div
//                               className="w-25 text-end"
//                               style={{
//                                 fontSize: '13px',
//                                 fontFamily: 'Gilroy',
//                                 fontWeight: 500,
//                                 color: 'rgba(23, 23, 23, 1)',
//                               }}
//                             >
//                               ₹ {receiptDataNew?.total_amount}
//                             </div>
//                           </div>
//                           <div className="d-flex justify-content-end py-2 fw-bold">
//                             <div
//                               className="w-50 text-end"
//                               style={{
//                                 fontSize: '13px',
//                                 fontFamily: 'Gilroy',
//                                 fontWeight: 500,
//                                 color: 'rgba(23, 23, 23, 1)',
//                               }}
//                             >
//                               Total
//                             </div>
//                             <div
//                               className="w-25 text-end"
//                               style={{
//                                 fontSize: '15px',
//                                 fontFamily: 'Gilroy',
//                                 fontWeight: 500,
//                                 color: 'rgba(23, 23, 23, 1)',
//                               }}
//                             >
//                               ₹ {receiptDataNew?.total_amount}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}


//                   </div>



//                 </div>
//                 <div className="px-4" style={{ marginTop: 20 }}>
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <h6 style={{
//                         fontSize: '13px',
//                         fontFamily: 'Gilroy',
//                         fontWeight: 700,
//                         color: '#00A32E',
//                         letterSpacing: '1px'
//                       }}
//                       >PAYMENT DETAILS</h6>
//                       <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode :  {receiptDataNew.bank_type || rowData.payment_mode}</p>
//                       {receiptDataNew?.invoice_type !== "advance" && (
//                         <p
//                           className="mb-1"
//                           style={{
//                             fontSize: '13px',
//                             fontFamily: 'Gilroy',
//                             fontWeight: 500,
//                             color: 'rgba(23, 23, 23, 1)',
//                           }}
//                         >
//                           Transaction ID : 
//                         </p>
//                       )}

//                       <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Recorded By : Admin - {fullName}</p>
//                       <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', marginTop: "-14px" }}>Status : Paid</p>

//                     </div>
//                     <div className="col-md-6 text-end">
//                       <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={91} width={162} /></p>
//                       {receiptDataNew?.invoice_type === "advance" && (
//                         <div className="text-start mt-2 ms-5" >
//                           <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 163, 46, 1)', fontSize: "13px", marginLeft: "35px" }}>
//                             &quot;{receiptDataNew?.bill_template?.notes} &quot;
//                           </p>
                         
//                         </div>
//                       )}
//                     </div>
//                     <div className="row">
//                       <div className="col-md-8">
//                         <h6 style={{ color: "#00A32E", fontSize: "13px", fontWeight: 600, fontFamily: "Gilroy" }}>Terms and Conditions</h6>
//                         <p style={{ fontSize: "12px", color: "#555", fontFamily: "Gilroy" }}>
//                       {receiptDataNew?.bill_template?.terms_and_condition}
//                         </p>
//                       </div>

//                       <div className="col-md-4 text-end">
//                            {receiptDataNew?.bill_template?.digital_signature_url && (
//                               <img
//                                 src={receiptDataNew?.bill_template.digital_signature_url}
//                                 alt="Digital Signature" style={{ height: 60, width: 130, paddingLeft:20 }}

//                               />
//                             )}
//                         <p className="mt-4 " style={{ fontSize: "13px", fontFamily: "Gilroy", color: "#2C2C2C", paddingRight: "5px" }}>Authorized Signature</p>
//                       </div>
//                     </div>

//                   </div>
//                 </div>

//                 <div className="py-2 px-5">
//                   <div className=" text-white text-center" style={{ borderTopLeftRadius: "12px", borderTopRightRadius: "12px", backgroundColor:receiptDataNew?.bill_template?.template_theme || "#00A32E" , padding: 7 }}>
//                     <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)', }}>email: {receiptDataNew?.bill_template?.email} | Contact: + {receiptDataNew?.bill_template?.contact_number}</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           }
//         </div>
//       </div>
//     </div>
//   );
// };
// ReceiptPdfCard.propTypes = {
//   rowData: PropTypes.func.isRequired,
//   handleClosed: PropTypes.func.isRequired,

// };
// export default ReceiptPdfCard;











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


  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })
  //   }

  // }, [])






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








