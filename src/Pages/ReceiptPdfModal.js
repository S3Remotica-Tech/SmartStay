import React, { useState, useRef, useEffect } from "react";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import { toWords } from 'number-to-words';
import "../Pages/Invoices.css";
import moment from 'moment';
import DownLoad from '../Assets/Images/New_images/searchss.png'
import Share from '../Assets/Images/New_images/share.png'
import Close from '../Assets/Images/New_images/circlie.png'
import Logo from '../Assets/Images/Logo-Icon.png'
import { ImportCurve, CloseCircle, Call, Location, ArrowCircleLeft2, ArrowLeft } from 'iconsax-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";





const ReceiptPdfCard = ({ rowData, handleClosed ,selectedItem}) => {
    const invoiceData = {
        payment: {
            bank: 'Rimberio Bank',
            accountName: 'Alfredo Torres',
            accountNo: '0123 4567 8901',
            dueDate: '23 June 2023',
        },
    };

    console.log("receiptdata", rowData);
    


    const [isVisible, setIsVisible] = useState(true);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsVisible(true)
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

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleBackInvoice = () => {
        handleClosed()
    }

    const amountInWords = rowData?.amount_received 
    ? `${toWords(rowData.amount_received).replace(/\b\w/g, char => char.toUpperCase())} Rupees`
    : '';


console.log("Bill Row Data:",rowData);

//action: "recuring"



    // if (!isVisible) return null;
    return (
        <div >
            <div className="d-flex justify-content-between align-items-center ps-3">


                <div className="d-flex align-items-center justify-content-between gap-3 ">
                    <div onClick={handleBackInvoice} style={{cursor:'pointer'}}>
                        <ArrowLeft
                            size="25"
                            color="#545454"
                        />
                    </div>
                    <div>


                        <div className="mb-3">
                            {rowData?.BalanceDue === 0 ? <span style={{ fontSize: '10px', backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span> : <span
                                style={{ fontSize: '10px', cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Unpaid</span>}
                        </div>
                        <div className="mb-2 mt-2">
                            <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{moment(rowData?.Date).format('DD MMM YYYY')}</label> - <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>#{rowData?.Invoices == null || rowData?.Invoices == '' ? '0.00' : rowData?.Invoices}</label>
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
                        <img src={DownLoad}  alt="Download Invoice" style={{ height: 20, width: 20,cursor:"pointer" }} onClick={handleDownload} />
                        {/* <img src={Share} alt="Share Invoice" style={{ height: 20, width: 20 }} onClick={handleShare} /> */}
                        <img src={Close}  alt="Close Invoice" style={{ height: 20, width: 20,cursor:"pointer" }} onClick={handleBackInvoice} />
                    </div>
                </div>

            </div>
            <hr />

            <div style={{ maxHeight: 500, overflowY: "auto" }} className="show-scroll">

                {isVisible &&
                    <Card ref={cardRef} className="m-2 " style={{ maxWidth: "100%", backgroundColor: "", borderRadius: 24, border: "1px solid rgba(225, 225, 225, 1)" }}>
                        <Card.Body className="my-4 p-3"
                            style={{
                                // maxHeight: 500, overflowY: "auto",
                                padding: "20px"

                            }}
                        >
                            <div className="d-flex justify-content-between ps-4 pe-4 " >
                                <div className="d-flex gap-2">
                                    <div>
                                        <img src={rowData?.hostel_profile ? rowData?.hostel_profile : Logo} style={{ height: 40, width: 40, }} />
                                    </div>
                                    <div>

                                    
                                    <div>
                                        <label style={{ fontSize: 20, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData?.Hostel_Name}</label>
                                    </div> 
  

                                    {/* <div>
                                        <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Meet All Your Needs</label>
                                    </div> */}
                                    </div>
                                </div>

                                <div>
                                    <div>
                                    <label style={{ fontSize: 26, letterSpacing: 1, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData?.Hostel_Name}</label>
                              </div>
                              <div>
                                    <div className="d-flex justify-content-between gap-2">
                                       
                                    <div className="" style={{ width: 140 }}>
                                        {/* <label style={{ wordBreak: "break-word", whiteSpace: "normal", fontSize: 15, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{rowData.UserAddress}</label> */}
                                        <label style={{ wordBreak: "break-word", whiteSpace: "normal", fontSize: 15, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{rowData?.admin_address}</label>
                                    </div>

                                    </div>

                                 
                                    {/* <div className="d-flex justify-content-between gap-5">
                                        <div>
                                            <label style={{ fontSize: 12, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Date</label>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 12, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{moment(rowData?.Date).format('DD/MM/YYYY')}</label>
                                        </div>

                                    </div> */}

                                </div>
                                </div>
                            </div>
                  <hr/>

                  <div className="d-flex flex-row justify-content-center">
                  <div>
                      <label style={{ fontSize: 19, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Payment Receipt</label>
                  </div>

                  </div>

                            <div className="d-flex flex-row justify-content-between pt-5 ps-4 pe-4">

                              <div className="d-flex flex-column">

                              
                                <div className="d-flex flex-row">
                                    <div >
                                        <label style={{ fontSize: 14, fontWeight: 500, color: "#939393", fontFamily: "Gilroy" , marginRight:'30px'  }}>Payment Date:</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{moment(rowData?.created_at).format('DD/MM/YYYY')}</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row">
                                    <div >
                                        <label style={{ fontSize: 14, fontWeight: 500, color: "#939393", fontFamily: "Gilroy", marginRight:'10px'  }}>Reference Number:</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData?.reference_id}</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row">
                                    <div >
                                        <label style={{ fontSize: 14, fontWeight: 500, color: "#939393", fontFamily: "Gilroy", marginRight:'30px' }}>Payment Mode:</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData?.payment_mode}</label>
                                    </div>
                                </div>

                                <div className="d-flex flex-row">
    <div>
        <label style={{ fontSize: 14, fontWeight: 500, color: "#939393", fontFamily: "Gilroy", marginRight: '30px' }}>
            Amount Received in Words:
        </label>
    </div>
    <div>
        <label style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>
            {amountInWords}
        </label>
    </div>
</div>


                                </div>

                                <div style={{backgroundColor:'#1E45E1', color:"white", padding:'10px'}}>


<div >
    <label style={{ fontSize: 14, fontWeight: 500,  fontFamily: "Gilroy" }}>Amount Received:</label>
</div>
<div>
    <label style={{ fontSize: 15, fontWeight: 600,  fontFamily: "Gilroy" }}>₹ {rowData?.amount_received}</label>
</div>



</div>
                                
                            </div>






                            <Table className="table-responsive border mt-5 mb-1 ps-3 pe-3">
  <thead 
  style={{ position:"sticky",
                top:0,
                zIndex:1,}}>
    <tr>
    <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy"}}>S.No</th>
      <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy"}}>Invoice Number</th>
      <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy"}}>Invoice Date</th>
      <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy"}}>Invoice Amount</th>
      <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy"}}>Payment Amount</th>
    </tr>
  </thead>
  <tbody>
   
    {rowData?.amenity?.map((item, index) => (
      <tr key={index}>
        <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy"}}>{index+1}</td>
        <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy"}}>
          {rowData.invoice_number}
        </td>
        <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy"}}>
        {moment(rowData?.Date).format('DD/MM/YYYY')}
        </td>
        <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy"}}>
        ₹ {rowData.Amount}
        </td>
        <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy"}}>
          ₹ {rowData.amount_received}
        </td>
      </tr>
    ))}
  
    {/* <tr>
      <td colSpan="3">
        <hr />
      </td>
    </tr> */}
   
    {/* <tr>
      <td style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "right" }}>
        Subtotal:
      </td>
      <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>
        ₹{rowData?.Amount}
      </td>
    </tr>
  
    <tr>
      <td style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "right" }}>
        Tax (0%):
      </td>
      <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>
        ₹0.00
      </td>
    </tr> */}
   
    {/* <tr>
      <td colSpan="3">
        <hr />
      </td>
    </tr> */}
   
    {/* <tr>
      <td style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "right" }}>
        Total:
      </td>
      <td style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>
        ₹{rowData?.Amount}
      </td>
    </tr> */}
  </tbody>
</Table>




                            {/* <div className="mt-4 ps-4 pe-4">
                                <h6 style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }} >PAYMENT METHOD</h6>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{invoiceData.payment.bank}</label>
                                </div>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Account Name: {invoiceData.payment.accountName}</label>
                                </div>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Account No: {invoiceData.payment.accountNo}</label>
                                </div>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Pay by: {invoiceData.payment.dueDate}</label>
                                </div>
                            </div> */}




                            <div className="d-flex justify-content-around mt-5 text-center ps-4 pe-4">
                              <div className="d-flex flex-column">
                              <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Received From</label>
                                </div>

                                <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData?.user_name}</label>
                                </div>
                              </div>
                               

                                <div>
                                    <hr style={{ border: "2px solid #dbaa16", width: 200 }} />
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Authorized Signature</label>
                                </div>

                            </div>









                        </Card.Body>
                        <div style={{ backgroundColor: "#dbaa16", borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }} className="d-flex p-3 justify-content-center gap-3" >
                            <div className="d-flex gap-2">
                                <div>
                                    <Call
                                        size="20"
                                        color="#FFF"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "Gilroy" }}>1234578589</label>
                                </div>

                            </div>

                            <div className="d-flex gap-2">
                                <div>
                                    <Location
                                        size="20"
                                        color="#FFF"
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "Gilroy" }}>123,Any where Street, Any City</label>
                                </div>
                            </div>
                        </div>
                    </Card>
                }
            </div>
        </div>
    );
};

export default ReceiptPdfCard;
