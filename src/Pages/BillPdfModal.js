/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Pages/Invoices.css";
import moment from 'moment';
import DownLoad from '../Assets/Images/New_images/searchss.png'
import Whatsapp from '../Assets/Images/whatsapp.png'
// import Whatsapp_greenicon from '../Assets/Images/whatsapp_green_icon.png'
import Close from '../Assets/Images/New_images/circlie.png'
import Logo from '../Assets/Images/get.png'
import Dial from '../Assets/Images/dial.png'
import Room from '../Assets/Images/Car.png'
import Locat from '../Assets/Images/location 03.png'
import Barcode from '../Assets/Images/invoice_barcode.svg'
import Gpay from '../Assets/Images/gpay.png'
import Phonepe from '../Assets/Images/phonepe.png'
import Paytm from '../Assets/Images/paytm.png'
import {ArrowLeft } from 'iconsax-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PropTypes from "prop-types";
// import { WhatsApp } from "@material-ui/icons";





const InvoiceCard = ({ rowData, handleClosed }) => {

  const state = useSelector((state) => state);
    const dispatch = useDispatch();

  // const invoiceData = {
  //   payment: {
  //     bank: 'Rimberio Bank',
  //     accountName: 'Alfredo Torres',
  //     accountNo: '0123 4567 8901',
  //     dueDate: '23 June 2023',
  //   },
  // };


  const [hosteldetails, setHostelDetails] = useState({})
  const [userdetails, setUserDetails] = useState({})
  const [invoice_details, setInvoiceDetails] = useState({})
  const [tabledetails, setTableDetails] = useState([])
  const [isVisible, setIsVisible] = useState(true);
  const cardRef = useRef(null);

  useEffect(() => {
    setIsVisible(true)
  }, [rowData])


  
    useEffect(() => {
      if (state.InvoiceList.BillsPdfSuccessCode === 200) {
        setHostelDetails(state.InvoiceList.BillsPdfDetails.hostel_details)
        setUserDetails(state.InvoiceList.BillsPdfDetails.user_details)
        setTableDetails(state.InvoiceList.BillsPdfDetails.amenities)
        setInvoiceDetails(state.InvoiceList.BillsPdfDetails.invoice_details)
        setTimeout(() => {
          dispatch({ type: "CLEAR_GET_BILLS_PDF_DETAILS_STATUS_CODE" });
        }, 100);
      }
    }, [state.InvoiceList.BillsPdfSuccessCode]);


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



  const handleBackInvoice = () => {
    handleClosed()
  }

  const totalStayingDays = userdetails?.joining_date
  ? moment().diff(moment(userdetails.joining_date), 'days') + 1
  : 0;




  const isValid = (value) => {
    return value !== null && value !== undefined && value !== "undefined" && value !== "";
  };


  const [isOpen, setIsOpen] = useState(false);

  const handleShareClick = () => {
    setIsOpen(!isOpen);
  };

  //action: "recuring"



  // if (!isVisible) return null;
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'white' }}>
      <div >
        <div className="d-flex justify-content-between align-items-center ps-3">


          <div className="d-flex align-items-center justify-content-between gap-3 ">
            <div onClick={handleBackInvoice} style={{ cursor: 'pointer' }}>
              <ArrowLeft
                size="25"
                color="#545454"
              />
            </div>
            <div>


              <div className="mb-3">
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
                  fontSize: 16, fontWeight: 500, color: "#000000",
                  fontFamily: "Gilroy"
                }}>{moment(rowData?.Date).format('DD MMM YYYY')}
                </label> - <label style={{
                  fontSize: 16, fontWeight: 500, color: "#000000",
                  fontFamily: "Gilroy"
                }}
                >#{rowData?.Invoices === null || rowData?.Invoices === '' ? '0.00' : rowData?.Invoices}
                </label>
              </div>
            </div>
          </div>
          <div>
         
            <div className="gap-2 d-flex me-3">
              <div className="d-flex  border p-1" style={{height:38 , width: 120 , borderRadius:'8px'}}>
              <img src={DownLoad} className="mt-1 ms-1" alt="Download Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} onClick={handleDownload} />
                <p className="mt-1 ms-2" style={{ fontSize: 13, fontWeight: 400, fontFamily: "Gilroy" }}>Download</p>
   
              </div>
              <div className="position-relative d-inline-block">
  {/* Share Button */}
  <div
    className="d-flex align-items-center border p-1"
    onClick={handleShareClick}
    style={{
      height: 38,
      width: 100,
      borderRadius: "8px",
      // backgroundColor: isOpen ? "#e0f7fa" : "#fff",
      cursor: "pointer",
      borderColor: isOpen ? "#2196f3" : "#ccc",
    }}
  >
    <img
      src={Whatsapp}
      alt="Share"
      style={{
        height: 20,
        width: 20,
        filter: isOpen
          ? "invert(36%) sepia(82%) saturate(5000%) hue-rotate(200deg)"
          : "none",
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

  {/* Popup Menu */}
  {isOpen && (
    <div
      className="position-absolute start-0 mt-2 p-2 shadow"
      style={{
        borderRadius: "8px",
        backgroundColor: "#fff",
        width: 160,
        zIndex: 10,
      }}
    >
      <div className="d-flex align-items-center mb-2">
        <i className="bi bi-envelope-fill me-2 text-primary"></i>
        <span>Send Mail</span>
      </div>
      <div className="d-flex align-items-center mb-2">
        <i className="bi bi-chat-left-text-fill me-2 text-primary"></i>
        <span>Send SMS</span>
      </div>
      <div className="d-flex align-items-center">
        <i className="bi bi-whatsapp me-2 text-success"></i>
        <span>Send Whatsapp</span>
      </div>
    </div>
  )}
</div>


              <img src={Close} className="me-3 mt-1 ms-2" alt="Close Invoice" style={{ height: 20, width: 20, cursor: "pointer" }} onClick={handleBackInvoice} />
            </div>
          </div>

       
        </div>
        <hr />

        <div style={{ maxHeight: 400,  overflowY: "auto" , }} className="bill-invoice" >

          {isVisible &&
       <div className="border p-5 " style={{width:'80%', marginLeft:'10%', marginTop:'40px', borderRadius:'8px'}}>


<div ref={cardRef} className="border">
                
<div  className=" text-white  p-4 position-relative" style={{ minHeight: "120px",background: 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))' }}>
  <div className="d-flex justify-content-between align-items-center">
  <div className="d-flex gap-2 mb-3 mb-lg-0">
      <img src={rowData?.hostel_profile || Logo} alt="logo" style={{ height: 40, width: 40 }} />
      <div>
        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
        <div style={{ fontSize: 14, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
      </div>
    </div>

    <div>
      <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" , marginRight:'20px'}}>
       {hosteldetails.name}
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
      <>
  {isValid(hosteldetails?.address) && <>{hosteldetails.address}, </>}
  {isValid(hosteldetails?.area) && <>{hosteldetails.area}, </>}
  {isValid(hosteldetails?.city) && <>{hosteldetails.city}, </>}<br />
  {isValid(hosteldetails?.state) && <>{hosteldetails.state} - </>}
  
  {isValid(hosteldetails?.pincode) && <>{hosteldetails.pincode}</>}
</>

      </div>
    </div>
  </div>
</div>


<div className="container bg-white rounded-bottom  position-relative" style={{width:"100%",}}>
  <div className="text-center pt-5 pb-3">
    <h5 style={{ fontSize: '17px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{ invoice_details.invoice_type === "manual" ?   "Payment Invoice" : "Security Deposit Invoice"}</h5>
  </div>


  <div className="row px-4 mt-5">
    <div className="col-md-6 mb-3">
      <p className="  mb-1" style={{color:'rgba(48, 80, 210, 1)' , fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To:</p>
      <p className="mb-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{userdetails?.name}</span></p>
      <p className="mb-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(8, 8, 8, 0.81)',}}><img src={Dial} alt="dial"/> {userdetails?.phone}</p>
      <p className="mb-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(14, 14, 14, 1)',}}><img src={Room} alt="room" style={{height:20 , width:20}}/> {userdetails.room_name} - {userdetails.bed_name}</p>
      <p style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)',}}><img src={Locat} alt="local"/> 
      <>
  {isValid(userdetails?.address) && <>{userdetails.address}, </>}
  {isValid(userdetails?.area) && <>{userdetails.area}, </>}
  {isValid(userdetails?.city) && <>{userdetails.city}, </>}<br />
  {isValid(userdetails?.state) && <>{userdetails.state} - </>}
  
  {isValid(userdetails?.pincode) && <>{userdetails.pincode}</>}
</>
       </p>
    </div>
    <div className="col-md-6 mb-3">
      <div className="row">
      
        <div className="col-6 text-muted  text-end mt-1"  style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Invoice:</div>
        <div className="col-6 text-start mt-1"   style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#{invoice_details?.invoice_id === null || invoice_details?.invoice_id === '' ? '0.00' : invoice_details?.invoice_id}</div>
      

        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Invoice Date :</div>
        <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{moment(invoice_details?.invioice_date).format('DD MMM YYYY')}</div>

        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Due date :</div>
        <div className="col-6 text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{moment(invoice_details?.due_date).format('DD MMM YYYY')}</div>

        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Joining date :</div>
        <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{moment(userdetails?.joining_date).format('DD MMM YYYY')}</div>

        {/* <div className="col-6 text-muted" style={{ fontSize: '16px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Rent Period :</div>
        <div className="col-6  text-end" style={{ fontSize: '16px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}></div> */}

        <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Total Staying Days</div>
        <div className="col-6 text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{totalStayingDays} Days</div>
      </div>
    </div>
  </div>

 
  <div className="px-4 pb-3">
  <div className="table-responsive">
    <table className="table text-center">
      <thead
        style={{
          backgroundColor: "rgba(71, 104, 234, 1)",
          color: "white",
        }}
      >
        <tr>
          <th
            style={{
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
              color: "rgba(255, 255, 255, 1)",
              fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600
              // border: "1px solid #dee2e6",

            }}
          >
            S.NO
          </th>
          <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600 }}>Inv No</th>
          <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600}}>Description</th>
          {/* <th style={{  color: "rgba(255, 255, 255, 1)",  fontSize:'15px' , fontFamily:'Gilroy', fontWeight:600}}>Duration</th> */}
          <th
            style={{
              borderTopRightRadius: "12px",
              borderBottomRightRadius: "12px",
              color: "rgba(255, 255, 255, 1)",
              fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600
              // border: "1px solid #dee2e6",
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
      <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>{item.invoice_id}</td>
      <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>{item.am_name}</td>
      {/* <td style={{ fontSize:'15px' , fontFamily:'Gilroy', fontWeight:500}}>{item.am_name}</td> */}
      <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>Rs. {item.amount}</td>
    </tr>
  ))}
</tbody>

    </table>
  </div>

  <div className="d-flex flex-wrap align-items-start mt-4">
  {invoice_details.invoice_type === "manual" && (
    <div className="text-start mt-5" style={{ flex: '1 1 0%' }}>
      <p className="mb-0" style={{fontSize:'11px' , fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
        &quot;Your comfort is our priority –
      </p>
      <p className="mb-0" style={{fontSize:'11px' , fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(30, 69, 225, 1)' }}>
        See you again at Smart Stay! &quot;
      </p>
    </div>
  )}

  <div className="mt-3 ms-auto" style={{ minWidth: '200px' }}>
    <div className="d-flex justify-content-between py-1">
      <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax</span>
      <span className="me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. 0.00</span>
    </div>
    <div className="d-flex justify-content-between py-1">
      <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
      <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. {invoice_details?.total_amount}</span>
    </div>
    <div className="d-flex justify-content-between fw-bold py-2">
      <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
      <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs. {invoice_details?.total_amount}</span>
    </div>
  </div>
</div>

</div>


 

</div>
<div className="px-4" style={{ marginTop: 20 }}>
  <div className="row">
    <div className="col-md-6 mb-3">
      <h6  style={{
        fontSize: '13px',
        fontFamily: 'Gilroy',
        fontWeight: 700,
        color: 'rgba(30, 69, 225, 1)',
        letterSpacing:'1px'
        
      }} 
      >ACCOUNT DETAILS</h6>
      <p className="mb-1" 
     style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
      Account No : 87542310984</p>
      <p className="mb-1"   style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
        IFSC Code : SBIN007195</p>
      <p className="mb-1"   style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
        Bank Name: State Bank of India</p>
      <p   style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
        UPI Details : Net Banking</p>
    </div>

    <div className="col-md-2"></div>

    <div className="col-md-4 d-flex flex-column justify-content-between" style={{ height: "100%" }}>
    <div className="d-flex justify-content-end mt-auto">
        <img src={Barcode} alt="Barcode" style={{ height: 89, width: 89, borderRadius:'2px' }} />
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
  {/* Left Side: Terms and Conditions */}
  <div className="col-md-8">
    <h4 style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600 , color:'rgba(30, 69, 225, 1)'}}>Terms and Conditions</h4>
    <p style={{ whiteSpace: "pre-line", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color:'rgba(61, 61, 61, 1)'}}>
      Tenants must pay all dues on or before the due date,<br></br>
      maintain cleanliness, and follow PG rules;failure may lead<br></br>
       to penalties or termination of stay.
    </p>
  </div>

  {/* Right Side: Authorized Signature aligned bottom */}
  <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
    <p  
     style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}
      >Authorized Signature</p>
  </div>
</div>



<div className="ms-5 me-5">
  <div
    className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
    style={{
      backgroundColor: 'rgba(48, 80, 210, 1)',
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
      email: {hosteldetails.email ? hosteldetails.email : ''}
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
      Contact: {hosteldetails.phone ? hosteldetails.phone : ''}
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



{/* <Card ref={cardRef} className="m-2 p-0 " style={{ backgroundColor: "", borderRadius: 24, border: "1px solid rgba(225, 225, 225, 1)", padding:'0px' }}>
              <Card.Body className="" style={{padding:'0px'}}
              >
                <div>

                

                <div
   style={{
    position: "relative",
    background: 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))',
    borderBottomLeftRadius: '30px',
    borderBottomRightRadius: '30px',
    color: 'white',
    minHeight: '450px', 
    paddingBottom: '180px',
  }}
  className="d-flex flex-column justify-content-between p-4"
>
  <div className="d-flex flex-column flex-lg-row justify-content-between" style={{ height: '180px' }}>
    <div className="d-flex gap-2 mb-3 mb-lg-0">
      <img src={rowData?.hostel_profile || Logo} alt="logo" style={{ height: 40, width: 40 }} />
      <div>
        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
        <div style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Meet All Your Needs</div>
      </div>
    </div>

    <div>
      <div style={{ fontSize: 26, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" }}>
        Royal Grand Hostel
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
        9, 8th Avenue Rd, Someshwara Nagar,<br />
        Chennai, Tamilnadu - 600 056
      </div>
    </div>
  </div>

  <div
    className="shadow p-2"
    style={{
      position: "absolute",
      bottom: -160, 
      left: '50%',
      transform: 'translateX(-50%)',
      background: "white",
      color: "#000",
      borderRadius: 12,
      width: "95%",
      height:'auto'
    }}
  >
    <div className="text-center">
      <h2>Payment Invoice</h2>
    </div>

    <div className="d-flex flex-column flex-lg-row justify-content-between pt-3 px-4">
      <div>
        <label style={{ fontSize: 14, fontWeight: 500, color: "#939393" }}>Bill To:</label><br />
        <label style={{ fontSize: 15, fontWeight: 600 }}>Mr. {rowData?.Name}</label><br />
        <label style={{ fontSize: 15 }}>{rowData?.phoneNo}</label><br />
        <label style={{ fontSize: 15 }}>{rowData?.Room_No} - {rowData?.Bed}</label><br />
        <label style={{ fontSize: 15 }}>{rowData?.user_address}</label>
      </div>

      <div>
        <label style={{ fontSize: 14, color: "#939393" }}>Invoice:</label><br />
        <label style={{ fontSize: 15 }}>{rowData?.invoiceNo}</label><br />
        <label style={{ fontSize: 14, color: "#939393" }}>Date:</label><br />
        <label style={{ fontSize: 15 }}>{rowData?.date}</label>
      </div>
    </div>

 
                <div className="d-lg-block d-none">
                  <Table className="mt-5 mb-1 ps-3 pe-3">
                    <thead>
                      <tr>
                        <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>S.No</th>
                        <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Description</th>
                        <th style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rowData?.amenity?.map((item, index) => (
                        <tr key={index}>
                          <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy" }}>{index + 1}</td>
                          <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy" }}>{item.am_name}</td>
                          <td style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy" }}>₹{item.amount}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan="3"><hr /></td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "right" }}>Subtotal:</td>
                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>₹{rowData?.Amount}</td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "right" }}>Tax (0%):</td>
                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>₹0.00</td>
                      </tr>
                      <tr>
                        <td colSpan="3"><hr /></td>
                      </tr>
                      <tr>
                        <td style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "right" }}>Total:</td>
                        <td style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>₹{rowData?.Amount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="d-lg-none">
                  <Table className="mt-5 mb-1 ps-3 pe-3">
                    <tbody>
                      {rowData?.amenity?.map((item, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td className="d-sm-block d-md-table-cell" style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>S.No</td>
                            <td className="d-sm-block d-md-table-cell" style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy" }}>{index + 1}</td>
                          </tr>
                          <tr>
                            <td className="d-sm-block d-md-table-cell" style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Description</td>
                            <td className="d-sm-block d-md-table-cell" style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy" }}>{item.am_name}</td>
                          </tr>
                          <tr>
                            <td className="d-sm-block d-md-table-cell" style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Amount</td>
                            <td className="d-sm-block d-md-table-cell" style={{ fontSize: 15, fontWeight: 400, color: "#000000", fontFamily: "Gilroy" }}>₹{item.amount}</td>
                          </tr>
                        </React.Fragment>
                      ))}
                      <tr>
                        <td colSpan="2"><hr /></td>
                      </tr>
                      <tr>
                        <td className="d-sm-block d-md-table-cell text-sm-right" style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Subtotal:</td>
                        <td className="d-sm-block d-md-table-cell text-sm-center" style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>₹{rowData?.Amount}</td>
                      </tr>
                      <tr>
                        <td className="d-sm-block d-md-table-cell text-sm-right" style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Tax (0%):</td>
                        <td className="d-sm-block d-md-table-cell text-sm-center" style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>₹0.00</td>
                      </tr>
                      <tr>
                        <td colSpan="2"><hr /></td>
                      </tr>
                      <tr>
                        <td className="d-sm-block d-md-table-cell text-sm-right" style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Total:</td>
                        <td className="d-sm-block d-md-table-cell text-sm-center" style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>₹{rowData?.Amount}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

  </div>
</div>



                <div className="mt-4 ps-4 pe-4">
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
                </div>


                <div className="d-flex flex-column flex-lg-row justify-content-around mt-5 text-center ps-4 pe-4">
                  <div>
                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Thank you for your business!</label>
                  </div>
                  <div>
                    <hr style={{ border: "2px solid #dbaa16", width: 200 }} />
                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Authorized Signed</label>
                  </div>

                </div>
                </div>

              </Card.Body>
              <div
                style={{ backgroundColor: "#dbaa16", borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }}
                className="d-flex flex-column flex-sm-column flex-md-row p-3 justify-content-center gap-3"
              >
                <div className="d-flex gap-2 mb-2 mb-md-0">
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
            </Card> */}
