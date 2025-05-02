/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { toWords } from 'number-to-words';
import "../Pages/Invoices.css";
import moment from 'moment';
import DownLoad from '../Assets/Images/New_images/searchss.png'
import Close from '../Assets/Images/New_images/circlie.png'
import {  ArrowLeft } from 'iconsax-react';
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



const ReceiptPdfCard = ({ rowData, handleClosed }) => {
  
  const state = useSelector((state) => state);
 const dispatch = useDispatch();
    const [isVisible, setIsVisible] = useState(true);
    const [receiptDataNew, setReceiptDataNew] = useState("");
    useEffect(()=>{
       if(state.InvoiceList.statusCodeNewReceiptStatusCode === 200){
        setReceiptDataNew(state.InvoiceList.newReceiptchanges.receipt)
         setTimeout(() => {
           dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
         },500);
       }
       
     },[state.InvoiceList.statusCodeNewReceiptStatusCode])

     console.log("receiptDataNew...........//",receiptDataNew)
     
    const cardRef = useRef(null);

    useEffect(() => {
      
        setIsVisible(true)
        if(rowData?.id){
          dispatch({type:"RECEIPTPDF_NEWCHANGES",id:rowData?.id})
        }
       
    }, [rowData])


    //     const handleDownload = async () => {
    //   const element = cardRef.current;
    //   const canvas = await html2canvas(element);
    //   const imageData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF({
    //     orientation: "portrait", 
    //     unit: "px", 
    //     format: [canvas.width, canvas.height]
    //   });
    //   pdf.addImage(imageData, "PNG", 0, 0);
    //   pdf.save("invoice.pdf");
    // };


    const handleDownload = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imageData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width / 2, canvas.height / 2]
        });

        pdf.addImage(imageData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save("invoice.pdf");
    };








    // const handleShare = async () => {
    //     if (navigator.share) {
    //         try {
    //             await navigator.share({
    //                 title: "Invoice",
    //                 text: "Here is your invoice.",
    //                 url: window.location.href,
    //             });
    //         } catch (err) {
    //             console.error("Error sharing", err);
    //         }
    //     } else {
    //         alert("Web Share API not supported in this browser.");
    //     }
    // };



    const handleBackInvoice = () => {
        handleClosed()
    }

    const amountInWords = rowData?.amount_received
        ? `${toWords(rowData.amount_received).replace(/\b\w/g, char => char.toUpperCase())} Rupees`
        : '';



    //action: "recuring"



    // if (!isVisible) return null;
    return (
        <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
            <div >
                <div className="d-flex justify-content-between 
            align-items-center ps-3">


                    <div className="d-flex align-items-center 
                justify-content-between gap-3 ">
                        <div onClick={handleBackInvoice} style={{ cursor: 'pointer' }}>
                            <ArrowLeft
                                size="25"
                                color="#545454"
                            />
                        </div>
                        <div>


                            <div className="mb-3">
                                {rowData?.BalanceDue === 0 ? <span style={{ fontSize: '10px', backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span> : <span
                                    style={{
                                        fontSize: '10px',
                                        cursor: 'pointer',
                                        backgroundColor: '#FFD9D9',
                                        fontFamily: 'Gilroy',
                                        color: '#000',
                                        borderRadius: '14px',
                                        padding: "8px 12px"
                                    }}>Unpaid</span>}
                            </div>
                            <div className="mb-2 mt-2">
                                <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{moment(rowData?.Date).format('DD MMM YYYY')}</label> - <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>#{receiptDataNew?.invoice_number === null || receiptDataNew?.invoice_number === '' ? '0.00' : receiptDataNew?.invoice_number}</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="gap-5 d-flex">
                            {/* <ImportCurve
 size="32"
 color="#FF8A65"
/>


<CloseCircle
 size="32"
 color="#FF8A65"
/> */}
                            <img src={DownLoad} alt="Download Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} onClick={handleDownload} />
                            {/* <img src={Share} alt="Share Invoice" style={{ height: 20, width: 20 }} onClick={handleShare} /> */}
                            <img src={Close} alt="Close Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} onClick={handleBackInvoice} />
                        </div>
                    </div>

                </div>
                <hr />

                <div style={{ maxHeight: 400, overflowY: "auto" }} className="show-scroll receipt-invoice">

                    {isVisible &&

receiptDataNew.invoice_type === "Checkout" ? (
  <div className="receipt-container" ref={cardRef} >
                
                  <div   className=" text-white  p-4 position-relative" style={{borderBottomRightRadius:"24px",borderBottomLeftRadius:"24px", minHeight: "180px",backgroundColor:"#1E45E1" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fw-bold mb-0">Smartstay</h4>
                        <small>Meet All Your Needs</small>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-0">{rowData?.Hostel_Name}</h5>
                        <small>{rowData?.admin_address},<br/>Chennai, Tamilnadu - 600 056</small>
                      </div>
                    </div>
                  </div>
                
                 
                  <div className="container bg-white rounded-bottom border position-relative" style={{marginTop:"-50px",zIndex:1,width:"95%",borderRadius:"24px"}}>
                    <div className="text-center pt-5 pb-3">
                      {/* <h5 className="fw-bold">Payment Receipt</h5> */}
                      {/* <h5 className="fw-bold">{rowData?.action === "advance" ? "Security Deposit Receipt":"Payment Receipt"}</h5>  */}
                      <h5 className="fw-bold">
  {rowData?.action === "advance" && "Security Deposit Receipt"}
  {rowData?.action === "Checkout" && "Final Settlement Receipt"}
  {rowData?.action !== "advance" && rowData?.action !== "Checkout" && "Payment Receipt"}
</h5>


                    </div>
                
                  
                    <div className="row px-4 mt-5">
                      <div className="col-md-6 mb-3">
                        <p className="fw-bold text-success mb-1">Bill To:</p>
                        <p className="mb-1">{rowData?.user_name}</p>
                        <p className="mb-1"><img src={mobblue} alt="mob" width={12} height={12}/> {rowData?.phoneNo}</p>
                        <p className="mb-1"><img src={frameblue} alt="frame" width={13} height={13}/> {rowData?.user_address}</p>
                        <p><img src={substracBlue} alt="subs" width={12} height={12}/> 8th Main Rd, Someshwara Nagar, Bengaluru, Karnataka 560011</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="row">
                          <div className="col-6 text-muted">Receipt No:</div>
                          <div className="col-6 fw-bold text-end">#SSR001</div>
                
                          <div className="col-6 text-muted">Invoice Ref:</div>
                          <div className="col-6 fw-bold text-end">{rowData?.invoice_number}</div>
                
                          <div className="col-6 text-muted">Date:</div>
                          <div className="col-6 fw-bold text-end">{moment(rowData?.Date).format('DD/MM/YYYY')}</div>
                
                          <div className="col-6 text-muted">Time:</div>
                          <div className="col-6 fw-bold text-end">11:56:43 AM</div>
                
                          <div className="col-6 text-muted">Payment Mode:</div>
                          <div className="col-6 fw-bold text-end">{rowData?.payment_mode}</div>
                        </div>
                      </div>
                    </div>
                
                   
                    <div className="px-4 pb-3">
                      <div className="table-responsive">
                        <table className="table  text-center align-middle">
                          <thead  style={{backgroundColor:"#1E45E1",color:"#FFFFFF"}}>
                            <tr style={{color:"white"}}>
                              <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white" }}>S.NO</th>
                              <th style={{color:"white"}}>Inv No</th>
                              <th style={{color:"white"}}>Description</th>
                              <th style={{color:"white"}}>Duration</th>
                              <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white" }}>Amount / INR</th>
                            </tr>
                          </thead>
                          <tbody>
                          {rowData?.amenity?.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{rowData.invoice_number}</td>
                              <td>{item.am_name}</td>
                              <td>{moment(rowData?.Date).format("DD/MM/YYYY")}</td>
                              <td>₹ {item.amount}</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                
                      
                      <div className="d-flex justify-content-end mt-3"  >
  <div className="w-100 w-md-50" style={{paddingRight:"50px"}}>
   
    <div className="d-flex justify-content-end border-bottom py-1">
      <div className="w-50 text-end">Sub Total</div>
      <div className="w-25 text-end">₹ {rowData?.amount_received}</div>
    </div>
    <div className="d-flex justify-content-end py-2 fw-bold">
      <div className="w-50 text-end">Total</div>
      <div className="w-25 text-end">₹ {rowData?.amount_received}</div>
    </div>
  </div>
</div>

                    </div>
                
                   
                  
                  </div>
                  <div className="px-4" style={{marginTop:20}}>
                      <div className="row">
                      <div className="col-md-6">
    <h6 className="text-success fw-bold">Acknowledgment</h6>
    <p style={{ fontSize: "14px", color: "#555" }}>
    This document confirms final settlement for the Tenant on <br></br>
    {moment(rowData?.Date).format('DD/MM/YYYY')}. All dues are cleared, and room has been vacated.
    </p>
  </div>
                        <div className="col-md-6 text-end">
                          <p className="mt-4">Authorized Signature</p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4 align-items-start flex-wrap">
  {/* Left Message Block */}
 
    <div className="text-start mt-4">
      <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(30, 69, 225, 1)'}}>
      &quot;Your comfort is our priority –
      </p>
      <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(30, 69, 225, 1)'}}>
        See you again at Smart Stay! &quot;
      </p>
    </div>
  

      <div>
      <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received" height={91} width={162}/></p>

     </div>
    </div>
                
                    <div className="py-5 px-5">
                    <div className=" text-white text-center" style={{borderTopLeftRadius:"12px",borderTopRightRadius:"12px",backgroundColor:"#1E45E1",padding:7}}>
                      <small>email: contact@royalgrandhostel.in | Contact: +91 88996 54611</small>
                    </div>
                    </div>
                </div>
) :
                  <div className="receipt-container" ref={cardRef} >
                
                  <div   className=" text-white  p-4 position-relative" style={{borderBottomRightRadius:"24px",borderBottomLeftRadius:"24px", minHeight: "180px",backgroundColor:"#00A32E" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fw-bold mb-0">Smartstay</h4>
                        <small>Meet All Your Needs</small>
                      </div>
                      <div className="text-end">
                        <h5 className="mb-0">{receiptDataNew?.hostel_details?.name}</h5>
                        <small>{receiptDataNew?.hostel_details?.address},<br/>{receiptDataNew?.hostel_details?.area},{receiptDataNew?.hostel_details?.city} {receiptDataNew?.hostel_details?.landmark}, {receiptDataNew?.hostel_details?.state} - {receiptDataNew?.hostel_details?.pincode}</small>
                      </div>
                    </div>
                  </div>
                
                 
                  <div className="container bg-white rounded-bottom border position-relative" style={{marginTop:"-50px",zIndex:1,width:"95%",borderRadius:"24px"}}>
                    <div className="text-center pt-5 pb-3">
                      {/* <h5 className="fw-bold">Payment Receipt</h5> */}
                      <h5 className="fw-bold">{receiptDataNew?.invoice_type === "advance" ? "Security Deposit Receipt":"Payment Receipt"}</h5> 
                    </div>
                
                  
                    <div className="row px-4 mt-5">
                      <div className="col-md-6 mb-3">
                        <p className="fw-bold text-success mb-1">Bill To:</p>
                        <p className="mb-1">{receiptDataNew?.user_details?.name}</p>
                        <p className="mb-1"><img src={mob} alt="mob" width={12} height={12}/> {receiptDataNew?.user_details?.phone}</p>
                        <p className="mb-1"><img src={frame} alt="frame" width={13} height={13}/>  {receiptDataNew?.user_details?.address}</p>
                        <p><img src={substrac} alt="subs" width={12} height={12}/> {receiptDataNew?.user_details?.area} {receiptDataNew?.user_details?.city} {receiptDataNew?.user_details?.landmark}, {receiptDataNew?.user_details?.state} {receiptDataNew?.user_details?.pincode}</p>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="row">
                          <div className="col-6 text-muted">Receipt No:</div>
                          <div className="col-6 fw-bold text-end">{receiptDataNew?.reference_id}</div>
                
                          <div className="col-6 text-muted">Invoice Ref:</div>
                          <div className="col-6 fw-bold text-end">{receiptDataNew?.invoice_number}</div>
                
                          <div className="col-6 text-muted">Date:</div>
                          <div className="col-6 fw-bold text-end">{moment(receiptDataNew?.payment_date).format('DD/MM/YYYY')}</div>
                
                          <div className="col-6 text-muted">Time:</div>
                          <div className="col-6 fw-bold text-end">11:56:43 AM</div>
                
                          <div className="col-6 text-muted">Payment Mode:</div>
                          <div className="col-6 fw-bold text-end">{receiptDataNew?.payment_mode}</div>
                        </div>
                      </div>
                    </div>
                
                    {receiptDataNew?.invoice_type === "advance" && (
  <div className="d-flex justify-content-end text-end mt-3">
    <div style={{ padding: '20px', border: '1px solid rgba(0, 163, 46, 1)' }}>
      <div>
        <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
          Amount received
        </label>
      </div>
      <div>
        <label style={{ fontSize: 15, fontWeight: 600, fontFamily: "Gilroy" }}>
          ₹ {rowData?.amount_received}
        </label>
      </div>
      <div>
        <label style={{
          fontSize: 15,
          fontWeight: 600,
          color: "#000000",
          fontFamily: "Gilroy"
        }}>
          {amountInWords}
        </label>
      </div>
    </div>
  </div>
)}

{receiptDataNew?.invoice_type === "advance" && 
(
<div>
  <p style={{ fontSize: '16px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)',}}>Payment For</p>
  </div>
)

}
                   
                    <div className="px-4 pb-3">
                      <div className="table-responsive">
                        <table className="table  text-center align-middle">
                          <thead  style={{backgroundColor:"#00A32E",color:"#FFFFFF"}}>
                            <tr style={{color:"white"}}>
                              <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white" }}>S.NO</th>
                              <th style={{color:"white"}}>Inv No</th>
                              <th style={{color:"white"}}>Description</th>
                              <th style={{color:"white"}}>Duration</th>
                              <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white" }}>Amount / INR</th>
                            </tr>
                          </thead>
                          <tbody>
                          {receiptDataNew?.amenities?.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{receiptDataNew?.invoice_number}</td>
                              <td>{item.am_name}</td>
                              <td>{moment(rowData?.created_at).format("DD/MM/YYYY")}</td>
                              <td>₹ {item.amount}</td>
                            </tr>
                          ))}
                          </tbody>
                        </table>
                      </div>
                
                      
                      <div className="d-flex justify-content-end mt-3"  >
  <div className="w-100 w-md-50" style={{paddingRight:"50px"}}>
    {/* <div className="d-flex justify-content-end border-bottom py-1">
      <div className="w-50 text-end">Tax</div>
      <div className="w-25 text-end">₹ 150.00</div>
    </div> */}
    <div className="d-flex justify-content-end border-bottom py-1">
      <div className="w-50 text-end">Sub Total</div>
      <div className="w-25 text-end">₹ {receiptDataNew?.total_amount}</div>
    </div>
    <div className="d-flex justify-content-end py-2 fw-bold">
      <div className="w-50 text-end">Total</div>
      <div className="w-25 text-end">₹ {receiptDataNew?.total_amount}</div>
    </div>
  </div>
</div>

                    </div>
                
                   
                  
                  </div>
                  <div className="px-4" style={{marginTop:20}}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <h6 className="fw-bold">Payment Details</h6>
                          <p className="mb-1">Payment Mode: {receiptDataNew?.payment_mode}</p>
                          <p className="mb-1">Transaction ID: GPay-2134-8482-XYZ</p>
                          <p>Received By: Admin - Anjali R</p>
                        </div>
                        <div className="col-md-6 text-end">
                        <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={received} alt="received" height={91} width={162}/></p>
                        {receiptDataNew?.invoice_type === "advance"  && (
    <div className="text-start mt-4">
      <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(0, 163, 46, 1)'}}>
      &quot;Thank you for choosing SmartStay. &quot;
      </p>
      <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(0, 163, 46, 1)'}}>
      Your transaction is completed &quot;
      </p>
    </div>
  )}
                          {/* <p className="mt-4">Authorized Signature</p> */}
                        </div>
                        <div className="row">
  {/* Left side - Acknowledgment */}
  <div className="col-md-6">
    <h6 className="text-success fw-bold">Acknowledgment</h6>
    <p style={{ fontSize: "14px", color: "#555" }}>
      This payment confirms your dues till the mentioned period. Final settlement during checkout will be calculated based on services utilized and advance paid.
    </p>
  </div>

  {/* Right side - Signature */}
  <div className="col-md-6 text-end">
    <p className="text-success fw-bold border-success px-4 py-2 d-inline-block">
      {/* <img src={received} alt="received" height={91} width={162} /> */}
    </p>
    <p className="mt-4">Authorized Signature</p>
  </div>
</div>

                      </div>
                    </div>
                
                    <div className="py-5 px-5">
                    <div className=" text-white text-center" style={{borderTopLeftRadius:"12px",borderTopRightRadius:"12px",backgroundColor:"#00A32E",padding:7}}>
                      <small>email: {receiptDataNew?.hostel_details?.email} | Contact: +{receiptDataNew?.hostel_details?.phone}</small>
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
