import React, { useState, useEffect,useRef } from "react";
import { TfiControlBackward } from "react-icons/tfi";
import { BsPrinter } from "react-icons/bs";
import Logo from "../Assets/Images/Logo-Icon-White.png"
import { useDispatch, useSelector } from 'react-redux';
import { usePDF } from 'react-to-pdf';
import { useReactToPrint } from 'react-to-print';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { MdDownload } from "react-icons/md";
import calen from "../Assets/Images/calendar.png"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



function InvoiceDetail(props) {
  

    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [hostelName,setHostetName] =useState("")
    const [submit,setSubmit] =useState(false)

    const handleSubmit = () => {
        if (startDate && endDate) {
            setSubmit(true);
        } else {
            alert("Please select both start date and end date.");
        }
    };
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  
    const handleStartDateChange = date => {
      setStartDate(date);
    };
  
    const handleEndDateChange = date => {
      setEndDate(date);
    };

    const targetRef = useRef();
    const handleGoBack = () => {
        props.handleInvoiceback(false)
    }


    const { sendInvoiceDetail } = props;


    const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

    useEffect(() => {
        dispatch({ type: 'BILLPAYMENTHISTORY' })
    }, [])
    useEffect(() => {
        // dispatch({ type: 'HOSTELLIST' })
        const selectedHostelName =  state.UsersList.hostelList.filter((item) => { 
            return item.Name === props.sendInvoiceDetail.Hostel_Name});
            setHostetName(selectedHostelName)
    }, [])




    const filteredDataForUserInvoice = state.UsersList.billPaymentHistory.filter(item => {
        const invoiceDate = new Date(item.invDate);
        return invoiceDate >= startDate && invoiceDate <= endDate && item.InvoiceNo === sendInvoiceDetail.Invoices;
    });

    // const filteredDataForUserInvoice = state.UsersList.billPaymentHistory.filter(item => item.Phone === sendInvoiceDetail.phoneNo);
    // // const filteredDataForUserInvoice = state.UsersList.billPaymentHistory.filter((item => item.Phone === sendInvoiceDetail.phoneNo))

    // console.log("filteredDataForUserInvoice", filteredDataForUserInvoice)
    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <>
         <button type="button" class="btn btn-primary" onClick={handleGoBack}>Back</button>
       

       <div>
    {
        submit ?
        <div>
        <div class="row g-0 justify-content-center" ref={contentToPrint} style={{ display: "flex", justifyContent: "center", backgroundColor: "#F8F9FA55" }}>
        <div class="col-lg-9" ref={targetRef}>
            <div class="card shadow-sm p-0" style={{ border: "none", boxShadow: "0 20px 27px 0 rgb(0 0 0 / 5%)" }}>
                <div className="card-header bg-primary text-white">
                    <div className="row  m-0" style={{ backgroundColor: "#2E75EA", padding: 3, color: "white" }}>
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <h4 class="mb-0" style={{ fontSize: 25, color: "white", fontWeight: 400 }} ><img src={Logo} style={{ marginRight: 10 }} /> INVOICE</h4>
                        </div>
                        <div className="col-lg-6 d-flex align-items-center justify-content-center">
                            <div>
                                <h2 class="mb-0" style={{ color: "white", fontSize: 13, textTransform: "capitalize", fontWeight: 800 }}>{sendInvoiceDetail.Hostel_Name}</h2>
                                <p className="mb-0" style={{ color: "white", fontSize: 13, textTransform: "capitalize", fontWeight: 400 }}><b>Address:</b>&nbsp;&nbsp; {hostelName[0] && hostelName[0].Address}</p>
                                <p className="mb-0" style={{ color: "white", fontSize: 13, textTransform: "capitalize", fontWeight: 400 }}><b>PhoneNo:</b>&nbsp;{hostelName[0] && hostelName[0].hostel_PhoneNo}</p>
                                <p className="mb-0" style={{ color: "white", fontSize: 13, textTransform: "capitalize", fontWeight: 400 }}><b>Email:</b>&nbsp;&nbsp;&nbsp;&nbsp;  {hostelName[0] && hostelName[0].email_id}</p>
                                <p className="mb-0" style={{ color: "white", fontSize: 13, textTransform: "capitalize", fontWeight: 400 }}>GST.No:</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body p-0" style={{ backgroundColor: "" }}>
                    <div className="row p-2 g-0">
                        <div className="col-lg-6 d-flex justify-content-start align-items-center ps-5">
                            <div>
                                <div className="text-muted">
                                    <div className="mb-2" style={{ backgroundColor: "", color: "#2E75EA", padding: "5px 3px" }}>
                                        <h5 className="mb-0" style={{ fontSize: 13 }}>Bill To:</h5>
                                    </div>
                                    <h5 className="mb-1" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}>{sendInvoiceDetail.Name}</h5>
                                    <p className="mb-1" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}>{filteredDataForUserInvoice[0]?.Address}</p>
                                    <p className="mb-1" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}>{filteredDataForUserInvoice[0]?.Email}</p>
                                    <p className="mb-1" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}>{filteredDataForUserInvoice[0]?.Phone}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex ps-5">
                            <div style={{ backgroundColor: "", width: "100%" }}>
                                <div className="mb-2" style={{ backgroundColor: "", color: "#2E75EA", padding: "5px 3px" }}>
                                    <h5 className="mb-0" style={{ fontSize: 13 }}>Invoice Details:</h5>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}><b>Invoice No:</b> <span className="mb-0 " >{sendInvoiceDetail.Invoices}</span> </p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}><b>Invoice Date:</b> <span>{formatDate(sendInvoiceDetail.Date)}</span></p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <p className="mb-0" style={{ color: "black", fontSize: 13, textTransform: "capitalize", fontWeight: 500 }}><b>Due Date:</b> <span>{formatDate(sendInvoiceDetail.DueDate)}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 mb-5">
                        <div class="table-responsive">
                            <table class="table align-middle table-nowrap table-centered mb-0">
                                <thead style={{ backgroundColor: "#F6F7FB", fontSize: 10, color: "#91969E" }} >
                                    <tr >
                                        <th style={{ color: "gray", fontSize: 12 }}>Date</th>
                                        <th style={{ color: "gray", fontSize: 12 }}>Description</th>
                                        <th style={{ color: "gray", fontSize: 12 }}>Room Rent</th>
                                        <th style={{ color: "gray", fontSize: 12 }}>BalanceDue</th>
                                        <th style={{ color: "gray", fontSize: 12 }}>Status</th>
                                        <th class="text-end" style={{ color: "gray", fontSize: 12 }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredDataForUserInvoice && filteredDataForUserInvoice.map((item, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(item.invDate)}</td>
                                            <td>{item.description}</td>
                                            <td>${item.invAmount}</td>
                                            <td>${item.BalanceDue}</td>
                                            <td>{item.invStatus}</td>
                                            <td className="text-end">${item.invAmount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div class=" mt-5">
                                <div >
                                    <i>Terms / Condition</i>
                                    <hr style={{ margin: "3px 0 5px" }} /><p style={{ fontSize: 13 }}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit repudiandae numquam sit facere blanditiis, quasi distinctio ipsam? Libero odit ex expedita, facere sunt, possimus consectetur dolore, nobis iure amet vero.</p>
                                </div>
                            </div>
                            <div style={{ textAlign: "right", marginTop: 50 }}>
                                <div>
                                    <span>Authorized Sign</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     <div class="d-print-none mt-4">
     <div style={{ display: "flex", justifyContent: "center" }}>
         <a onClick={() => { handlePrint(null, () => contentToPrint.current); }} class="btn btn-success  me-1"><BsPrinter /> Print</a>
         <a onClick={() => generatePDF(targetRef, { filename: 'page.pdf' })} class="btn btn-primary w-md"><MdDownload />Download</a>
     </div>
 </div>
 </div> :
  <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 100, flexDirection: "column" }}>
  {/* <h4 style={{ color: "#333" }}>Select Date Range</h4> */}
  <div className="card" style={{ backgroundColor: "#F6F7FB" }}>
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", paddingBottom: 50 }}>
      <img src={calen} height={50} width={50} style={{ marginTop: 5 }} />
 
      <div className="mt-5" style={{ marginLeft: "10px", paddingLeft: 15, paddingRight: 15 }}>
        <label htmlFor="start-date" style={{ fontSize: "16px", color: "#333", marginBottom: "5px" ,paddingLeft:5}}>Start Date:</label>
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Start Date"
          className="form-control"
          dateFormat="dd/MM/yyyy"
        />
      </div>
 
      <div className="mt-5" style={{ marginLeft: "10px", paddingLeft: 15, paddingRight: 15 }}>
        <label htmlFor="end-date" style={{ fontSize: "16px", color: "#333", marginBottom: "5px",paddingRight:5 }}>End Date:</label>
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          placeholderText="End Date"
          className="form-control"
          dateFormat="dd/MM/yyyy"
        />
      </div>
 
      <div>
        <button onClick={handleSubmit} style={{ backgroundColor: "#0D6EFD", border: "none", color: "white", padding: "10px 24px", textAlign: "center", display: "inline-block", fontSize: "16px", margin: "10px 2px", transitionDuration: "0.4s", cursor: "pointer", borderRadius: "12px" }}>Submit</button>
      </div>
    </div>
  </div>
 </div>
    }

    </div>
    
    </>


    )
}
export default InvoiceDetail

