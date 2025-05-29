/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from '../Assets/Images/Delete_red.png';
import leftarrow from "../Assets/Images/arrow-left.png"
import UploadFileIcon from "../Assets/Images/upload_black.png"
import Logo from '../Assets/Images/get.png'
import Dial from '../Assets/Images/dial.png'
import Room from '../Assets/Images/Car.png'
import Locat from '../Assets/Images/location 03.png'
import Barcode from '../Assets/Images/invoice_barcode.svg'
import Gpay from '../Assets/Images/gpay.png'
import Phonepe from '../Assets/Images/phonepe.png'
import Paytm from '../Assets/Images/paytm.png'
import EditICon from '../Assets/Images/edit_whiteicon.png'
import TextAreaICon from '../Assets/Images/textarea.png'
import AddSquareICon from '../Assets/Images/add-square.png'
import "react-datepicker/dist/react-datepicker.css";
import Rentalinvoice from '../Assets/Images/Rental_invoice.png';
import SecurityDepositinvoice from '../Assets/Images/bill_settings.png';
import RentalReceipt from '../Assets/Images/receipt-text.png';
import DepositReceipt from '../Assets/Images/receipt-2.png';
import FinalReceipt from '../Assets/Images/receipt-square.png';
import LeftArrow from '../Assets/Images/New_images/arrow-leftblack.png';
import mob from "../Assets/Images/New_images/Rectangle 77.png";
import substrac from "../Assets/Images/New_images/Subtract.png";
import frame from "../Assets/Images/New_images/FramePDF.png";
import mobblue from "../Assets/Images/New_images/Rectangleblue.png";
import substracBlue from "../Assets/Images/New_images/location 03.png";
import frameblue from "../Assets/Images/New_images/Frameblue.png";
import paidfull from '../Assets/Images/New_images/paidfull.png'
import receiptLogo from '../Assets/Images/New_images/receiptlogo.png';
import received from '../Assets/Images/New_images/received.png'
import Select from "react-select";
import PropTypes from "prop-types";
import './SettingInvoice.css';

function SettingInvoice() {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [selectedDate, setSelectedDate] = useState(null);

  const [invoicedueDate, setInvoiceDueDate] = useState('');


  const [prefix, setPrefix] = useState("");
  const [startNumber, setStartNumber] = useState("");

 

  const [showform, setShowForm] = useState(false);

  const [edit, setEdit] = useState(false);
  const [cardshow, setCardShow] = useState(true)
  const [loading, setLoading] = useState(false)

  const [InvoiceList, setInvoiceList] = useState([]);

  const [isVisible, setIsVisible] = useState(true);
  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);

  const CardItems = [
    {
     id:1, 
     icon : Rentalinvoice, 
     title : "Monthly Rental Invoice", 
     type: 'paymentinvoice',
     description : "Detailed monthly rent breakdown including utilities and service charges"
    },
     {
     id:2, 
     icon: SecurityDepositinvoice,
     title: "Security Deposit Invoice",
     type: 'despositinvoice',
     description: "Detailed monthly rent breakdown including utilities and service charges."
    },
     {
     id:3, 
     icon : RentalReceipt, 
     title : "Monthly Rental Receipt", 
     type: 'payementreceipt',
     description : "Detailed monthly rent breakdown including utilities and service charges"
    },
     {
     id:4, 
     icon: DepositReceipt,
     title: "Security Deposit Receipt",
     type: 'depositreceipt',
     description: "Detailed monthly rent breakdown including utilities and service charges."
    },
     {
     id:5, 
     icon : FinalReceipt, 
     title : "Final Settlement Receipt", 
     type:'finalreceipt', 
     description : "Detailed monthly rent breakdown including utilities and service charges"
    },
     
  ]


   const PdfOptions = [
    { value: "paymentinvoice", label: "paymentinvoice" },
    { value: "despositinvoice", label: "despositinvoice" },
    { value: "payementreceipt", label: "payementreceipt" },
    { value: "depositreceipt", label: "depositreceipt" },
    { value: "finalreceipt", label: "finalreceipt" },
  ];

  const handleselectPdf = (selected) => {
    setSelectedard(selected.value); 
  };


  const billingFrequencyOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

 const [inputValue, setInputValue] = useState("");
  const [paymentTypes, setPaymentTypes] = useState([]);

  const handleAdd = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !paymentTypes.includes(trimmed)) {
      setPaymentTypes([...paymentTypes, trimmed]);
      setInputValue("");   
    }
  };

  const handleDelete = (type) => {
    setPaymentTypes(paymentTypes.filter((item) => item !== type));
  };



 const [selectedImages, setSelectedImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (selectedImages.length + files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedImages((prev) => [...prev, ...previews]);
    e.target.value = ""; 
  };

  const handleDeleteImage = (url) => {
    const filtered = selectedImages.filter((img) => img.url !== url);
    setSelectedImages(filtered);
  };


   const [notes, setNotes] = useState(
    '"Your comfort is our priority – See you again at Smart Stay!"'
  );

   const [terms, setTerms] = useState(
    'Tenants must pay all dues on or before the due date, maintain cleanliness, and follow PG rules; failure may lead to penalties or termination of stay.'
  );


    const fileInputRef = useRef(null);
  const [signature, setSignature] = useState(null);

  const handleFileSignatureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSignature(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setSignature(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

 
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
    dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    setLoading(true)
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
      appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });




  
  

 

  const handleEdit = () => {
    setShowForm(false);
    setCardShow(false)
    setEdit(true); 
  };

  const handleEditClose = () => {
      setShowForm(true);
    setCardShow(false)
    setEdit(false);
  }



 

 



  useEffect(() => {
    if (state.InvoiceList?.invoiceSettingsStatusCode === 200) {

      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
      setSelectedDate('')
      setInvoiceDueDate('')

      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_SETTINS_STATUSCODE" });
      }, 1000);
    }
  }, [state.InvoiceList]);




  const [selectedcard, setSelectedard] = useState('')

  const handleShow = (type) => {

    if (!state.login.selectedHostel_Id) {
      return;
    }
    setIsVisible(true)
    setSelectedard(type)
    setShowForm(true);
    setEdit(false);
    setCardShow(false)
  };

  


  const handleCloseForm = () => {
    setShowForm(false);
    setEdit(false);
    setCardShow(true)
    setSelectedard('')
    setPrefix('')
    setStartNumber('')
    setSelectedDate('')
    setInvoiceDueDate('')
  };

  

 

  

 




  useEffect(() => {
    if (selectedDate && isNaN(new Date(selectedDate).getTime())) {
      setSelectedDate(null);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (invoicedueDate && isNaN(new Date(invoicedueDate).getTime())) {
      setInvoiceDueDate(null);
    }
  }, [invoicedueDate]);




  useEffect(() => {
    if (state?.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      setInvoiceList(state?.UsersList?.hotelDetailsinPg)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_HOSTEL_LIST_All_CODE' })
      }, 1000)
    }

  }, [state?.UsersList?.statuscodeForhotelDetailsinPg])


  useState(()=>{
    if(state.UsersList.noAllHosteListStatusCode === 201){
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_HOSTEL_DETAILS" });
      }, 1000);
    }

  },[state.UsersList.noAllHosteListStatusCode])



  useEffect(() => {
    if (!InvoiceList || InvoiceList.length === 0) return;
  
    const allPrefixSuffixEmpty = InvoiceList.every(item =>
      (!item.prefix || item.prefix === 'null' || item.prefix === null || item.prefix === 0) &&
      (!item.suffix || item.suffix === 'null' || item.suffix === null || item.suffix === 0)
    );
  
    if (allPrefixSuffixEmpty) {
      setLoading(false);
    }
  }, [InvoiceList]);
  



  

 

 


  return (
    <div className="mt-4" style={{ position: "relative",paddingRight:11,paddingLeft:10 }}>


      {loading &&
        <div
        style={{
          position: 'fixed',
          top: '48%',
          left: '68%',
          transform: 'translate(-50%, -50%)',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          zIndex: 1050,
        }}
      >
        <div
          style={{
            borderTop: '4px solid #1E45E1',
            borderRight: '4px solid transparent',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
          }}
        ></div>
      </div>
      }

<div 
  className="container-fluid sticky-top bg-white"
  style={{
    zIndex: 1000,
    whiteSpace: "nowrap",
    marginTop: -2
  }}
>
  <div className="row align-items-center mt-3">
    
    <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start">
      <h3
        style={{
          fontFamily: "Gilroy",
          fontSize: 24,
          color: "rgba(34, 34, 34, 1)",
          fontWeight: 600,
          whiteSpace: "nowrap"
        }}
      >
        Invoice & Receipts
      </h3>
    </div>

    
{showform  &&
<div className="col-12 col-md-6 d-flex justify-content-md-end mt-2 mt-md-0">
      <div className="me-3" style={{ width: "60%" }}>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Select
            placeholder="Select"
           options={PdfOptions}
           value={PdfOptions.find(opt => opt.value === selectedcard)}
           onChange={(selected) => handleselectPdf(selected)}
            styles={{
              control: (base) => ({
                ...base,
                padding: "2px",
                marginTop: "5px",
                fontSize: "14px",
                fontFamily: "Gilroy",
                fontWeight: 500,
                color: "#4B4B4B",
                borderColor: "#ced4da",
              }),
            }}
          />
        </Form.Group>
      </div>
<button
  onClick={handleEdit}
  style={{
    fontFamily: "Gilroy",
    fontSize: "14px",
    backgroundColor: "#1E45E1",
    color: "white",
    fontWeight: 600,
    borderRadius: "8px",
    width: 146,
    height: 45,
    border: "2px solid #1E45E1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px", 
  }}
>
  <img src={EditICon} alt="edit" style={{ height: 18 }}  className="me-2"/>
  Edit
</button>

    </div>

}
    
    
  </div>
</div>


 

    {showform && (
      <>

       {(selectedcard === "paymentinvoice"|| selectedcard === "despositinvoice") ? (
      

  <div  style={{minHeight:'500px' }}>
  <div  >
          <img
                                      src={leftarrow}
                                      alt="leftarrow"
                                      width={20}
                                      height={20}
                                     onClick={handleCloseForm}
                                      style={{ cursor: "pointer", marginLeft:'10px'  }}
                                    />
        </div>
  
  <div className="receipt-container border ps-4 pe-4 pb-4 pt-4 " ref={cardRef} style={{width:"80%",marginLeft:'10%', marginTop:'20px', borderRadius:'8px' ,}} >
       
       
       <div   ref={innerScrollRef}
         className="border shadow show-scroll "
         style={{
           maxHeight: 450,
           overflowY: "auto",
           borderBottomLeftRadius: "13px",
           borderBottomRightRadius: "13px",
         }}>
                       
       <div  className=" text-white  p-4 position-relative" style={{ height:100,background: 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))' ,}}>
         <div className="d-flex justify-content-between align-items-center">
         <div className="d-flex gap-2 mb-3 mb-lg-0">
             <img src={ Logo} alt="logo" style={{ height: 40, width: 40 }} />
             <div>
               <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
               <div style={{ fontSize: 14, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
             </div>
           </div>
       
           <div>
             <div style={{ fontSize: 18, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" , marginRight:'20px'}}>
              Royal Grand Hostel
             </div>
             <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
             <>

             9, 8th Avenue Rd, Someshwara Nagar, <br />
             Chennai, Tamilnadu - 600 056
      
       </>
       
             </div>
           </div>
         </div>
       </div>
       
       
       <div className="container bg-white rounded-bottom  position-relative" style={{width:"100%",borderTopLeftRadius:'20px'}}>
         <div className="text-center pt-2 pb-1">
           <h5 style={{ fontSize: '17px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>
            { selectedcard === "paymentinvoice" ?   "Payment Invoice" : "Security Deposit Invoice"}
            </h5>
         </div>
       
       
         <div className="row px-4 mt-3">
           <div className="col-md-6 mb-3">
             <p className="  mb-1" style={{color:'rgba(48, 80, 210, 1)' , fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill to:</p>
             <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span className="ms-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}> Muthuraja M</span></p>
                <p className="mb-1"><img src={Dial} alt="mob" />
                                    <span className="ms-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}> 
                                      +91 85647 85332
                                                     </span>
                                      </p>
             <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(14, 14, 14, 1)',}}><img className="me-1" src={Room} alt="room" style={{height:20 , width:20}}/> No 103 -02</p>
             <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
         
         <div className="me-2">
           <img src={Locat} alt="local" />
         </div>
       
         <div>
          <p>
            9, 8th Main Rd, Someshwara Nagar, <br></br>
             Bengaluru, Karnataka 560011
          </p>
     
         </div>
       
       </div>
       
       
           </div>
           <div className="col-md-6 mb-3 ps-5 ">
             <div className="row">
             
               <div className="col-6 text-muted  text-end mt-1"  style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Invoice :</div>
               <div className="col-6 text-start mt-1"   style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',   whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>#324515</div>
             
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>Invoice Date :</div>
               <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',    whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>31 March 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Due date :</div>
               <div className="col-6 text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>31 March 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Joining date :</div>
               <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>05 Jan 2024</div>
       
               <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Rent Period :</div>
               <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>Mar - June 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   }}>Total Staying Days</div>
               <div className="col-6 text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>120 Days </div>
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
       
                   }}
                 >
                   S.NO
                 </th>
                 <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600 }}>Inv No</th>
                 <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600}}>Description</th>
                 <th
                   style={{
                     borderTopRightRadius: "12px",
                     borderBottomRightRadius: "12px",
                     color: "rgba(255, 255, 255, 1)",
                     fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600
                   }}
                 >
                   Amount / INR
                 </th>
               </tr>
             </thead>
             <tbody>
      
           <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
             <td>1</td>
             <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>#324515</td>
             <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>Room Rental</td>
             <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>Rs. 8000</td>
           </tr>
             <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
             <td>2</td>
             <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>#324515</td>
             <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>Electricity</td>
             <td style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:500}}>Rs. 950</td>
           </tr>
        
       </tbody>
       
           </table>
         </div>
       
         <div className="d-flex flex-wrap align-items-start mt-1">
         {selectedcard === "paymentinvoice"  && (
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
             <span className="me-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 1150.00</span>
           </div>
           <div className="d-flex justify-content-between py-1">
             <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
             <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 8950.00 </span>
           </div>
           <div className="d-flex justify-content-between fw-bold py-2">
             <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
             <span  style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs: 10,100.00</span>
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
         <div className="col-md-8">
           <h4 style={{ fontSize:'13px' , fontFamily:'Gilroy', fontWeight:600 , color:'rgba(30, 69, 225, 1)'}}>Terms and Conditions</h4>
           <p style={{ whiteSpace: "pre-line", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color:'rgba(61, 61, 61, 1)'}}>
             Tenants must pay all dues on or before the due date,<br></br>
             maintain cleanliness, and follow PG rules;failure may lead<br></br>
              to penalties or termination of stay.
           </p>
         </div>
       
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
             Email : contact@royalgrandhostel.in
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
           Contact : +91 88994 56611
           </p>
         </div>
       </div>
       
       
       </div>
       
       </div>
                   
                 
       
                
               </div>
      
)
:  (selectedcard === "payementreceipt" || selectedcard === "depositreceipt") ? 
  (
  <div>
  <div >
            <img
                                      src={leftarrow}
                                      alt="leftarrow"
                                      width={20}
                                      height={20}
                                     onClick={handleCloseForm}
                                      style={{ cursor: "pointer" , marginLeft:'10px' }}
                                    />
        </div>
  
  <div className="receipt-container border ps-4 pe-4 pb-4 pt-4 " ref={cardRef} style={{width:"80%",marginLeft:'10%', marginTop:'20px', borderRadius:'8px' ,}} >

<div   ref={innerScrollRef}
  className="border shadow show-scroll"
  style={{
    maxHeight: 450,
    overflowY: "auto",
    borderBottomLeftRadius: "13px",
    borderBottomRightRadius: "13px",
  }}>
                  <div   className=" text-white  p-3 position-relative" style={{ minHeight: "100px",backgroundColor:"#00A32E" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className=" mb-0"><img src={receiptLogo} alt="logo" style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }} className="me-2"/>Smartstay</h4>
                        <small className="ms-4" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</small>
                      </div>
                      <div className="text-start">
                        <h5 className="mb-1" style={{ fontSize: 17, fontWeight: 600,  fontFamily: "Gilroy" , marginRight:'20px'}}> Royal Grand Hostel</h5>
      <div style={{ fontSize: 13, fontWeight: 400, fontFamily: "Gilroy" }}>
 9, 8th Avenue Rd, Someshwara Nagar, <br />
             Chennai, Tamilnadu - 600 056
             </div>
                      </div>
                    </div>
                  </div>
                
                 
                  <div className="container bg-white rounded-bottom border position-relative" style={{}}>
                    <div className="text-center pt-2 pb-1">
                      <h5 className="" style={{ fontSize: '17px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>{selectedcard === "payementreceipt" ? "Payment Receipt" :  "Security Deposit Receipt"}</h5> 
                    </div>
                
                  
                    <div className="row px-4 mt-3">
                      <div className="col-md-7 mb-3">
                        <p className=" mb-1" style={{color:'rgba(0, 163, 46, 1)' ,  fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To :</p>
                        <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                        <p className="mb-1"><img src={mob} alt="mob" width={12} height={12}/>
                       <span className="ms-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}>
                          +91 85647 85332
                                        </span>
                         </p>
                         <p className="mb-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frame} alt="frame" width={15} height={15} className="me-1"/> 
                         No 103 -02 </p>
                        <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                       
                       <div className="me-2">
                         <img src={substrac} alt="subs" />
                       </div>
                     
                       <div>
                                   <p>
            9, 8th Main Rd, Someshwara Nagar, <br></br>
             Bengaluru, Karnataka 560011
          </p>
                       </div>
                     
                     </div>

                      </div>
                      <div className="col-md-5 mb-3">
                        <div className="row">
                          <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Receipt No :</div>
                          <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#SSR001</div>
                
                          <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Invoice Ref :</div>
                          <div className="col-6 text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#324515</div>
                
                          <div className="col-6 text-muted text-end mt-1"   style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                          <div className="col-6  text-start mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                
                          <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Time :</div>
                          <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>11:56:43 AM</div>
                
                          <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                          <div className="col-6  text-start mt-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',paddingLeft:18}}>UPI / Net Banking </div>
                        </div>
                      </div>
                    </div>
                
                    {selectedcard === "depositreceipt" && (
  <div className="d-flex justify-content-end text-end mt-3 me-5">
      <div>
        <label style={{ fontSize: 13, fontWeight: 500, fontFamily: "Gilroy" , marginRight:'15px', marginTop:'60px'}}>
          Amount received
        </label>
      </div>
    <div style={{ padding: '20px', border: '1px solid rgba(0, 163, 46, 1)', borderRadius:'5px' }}>
    
      <div>
        <label style={{ fontSize: 17, fontWeight: 700, fontFamily: "Gilroy" , color:'rgba(0, 163, 46, 1)' }}>
           ₹ 8,073.00
        </label>
      </div>
      <div>
        <label style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#000000",
          fontFamily: "Gilroy"
        }}>
          Eight Thousand and Seventy Three Rupees Only
        </label>
      </div>
    </div>
  </div>
)}

{selectedcard === "depositreceipt" && 
(
<div>
  <p style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)',marginLeft:'20px'}}>Payment For</p>
  </div>
)

}
                   
                    <div className="px-4 pb-3">
                      <div className="table-responsive">
                        <table className="table  text-center align-middle">
                          <thead  style={{backgroundColor:"#00A32E",color:"#FFFFFF"}}>
                            <tr style={{color:"white"}}>
                              <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white" , fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600 }}>S.NO</th>
                              <th style={{color:"white" , fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600}}>Inv No</th>
                              <th style={{color:"white" ,  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600 }}>Description</th>
                              { selectedcard !== "payementreceipt" && (
  <th style={{ color: "white"  ,  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600 }}>Duration</th>
)}
                            
                              <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:600  }}>Amount / INR</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
                              <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                              <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}>INV-004</td>
                              <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}> 
                                {selectedcard === "payementreceipt" ? "Room Rental" : "Security Deposit (Advance)"}
                                </td>
                              {selectedcard !== "payementreceipt" && (
  <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}} >May 2025</td>
)}

<td style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500 }}>
  {selectedcard === "payementreceipt" ? "Rs: 8,000.00" : "Rs: 8,073.00"}
</td>


                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
  
{selectedcard === "payementreceipt"  && (
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
           Rs: 1150.00
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
       Rs: 9,150.00
        </div>
      </div>
    </div>
  </div>
)}


                    </div>
                
                   
                  
                  </div>
                  <div className="px-4" style={{marginTop:20}}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <h6  style={{
        fontSize: '13px',
        fontFamily: 'Gilroy',
        fontWeight: 700,
        color: '#00A32E',
        letterSpacing:'1px'}}
        >PAYMENT DETAILS</h6>
                          <p className="mb-1" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode: 
    G-Pay</p>
                          {selectedcard === "payementreceipt" && (
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
                          <p style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)',marginTop:"-14px" }}>Status: Paid</p>
    
                        </div>
                        <div className="col-md-6 text-end">
                        <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={91} width={162}/></p>
                        {selectedcard !== "payementreceipt" && (
    <div className="text-start mt-2 ms-5" >
      <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(0, 163, 46, 1)',fontSize:"13px",marginLeft:"35px"}}>
      &quot;Thank you for choosing SmartStay. &quot;
      </p>
      <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(0, 163, 46, 1)',fontSize:"13px",marginLeft:"35px"}}>
      Your transaction is completed &quot;
      </p>
    </div>
  )}
                        </div>
                        <div className="row">
  <div className="col-md-6">
    <h6  style={{color:"#00A32E",fontSize:"13px",fontWeight:600,fontFamily:"Gilroy"}}>Acknowledgment</h6>
    <p style={{ fontSize: "12px", color: "#555",fontFamily:"Gilroy" }}>
      This payment confirms your dues till the mentioned period. Final settlement during checkout will be calculated based on services utilized and advance paid.
    </p>
  </div>

  <div className="col-md-6 text-end">
    <p className="text-success fw-bold border-success px-4 py-2 d-inline-block">
    </p>
    <p className="mt-4" style={{fontSize: "13px",fontFamily:"Gilroy",color:"#2C2C2C",paddingRight:"25px"}}>Authorized Signature</p>
  </div>
</div>

                      </div>
                    </div>
                
                    <div className="py-2 px-5">
                    <div className=" text-white text-center" style={{borderTopLeftRadius:"12px",borderTopRightRadius:"12px",backgroundColor:"#00A32E",padding:7}}>
                      <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)',}}>Email : contact@royalgrandhostel.in| Contact : +91 88994 56611</small>
                    </div>
                    </div>
                    </div>
                </div>

                </div>



  )
  : 
  (


    <div>
      <div >
            <img
                                      src={leftarrow}
                                      alt="leftarrow"
                                      width={20}
                                      height={20}
                                     onClick={handleCloseForm}
                                      style={{ cursor: "pointer", marginLeft:'10px' }}
                                    />
        </div>
    
<div style={{minHeight:'500px' }} className=" receipt-invoice">
  


                    {isVisible &&

 
  <div className="receipt-container border ps-4 pe-4 pb-4 pt-4"  
  ref={cardRef}  style={{width:'80%', marginLeft:'10%', marginTop:'20px', borderRadius:'8px' , }}>

<div   ref={innerScrollRef}
  className="border shadow show-scroll"
  style={{
    maxHeight: 450,
    overflowY: "auto",
    borderBottomLeftRadius: "13px",
    borderBottomRightRadius: "13px",
  }}>
                
                  <div   className=" text-white  p-3 position-relative" style={{height:110,backgroundColor:"#1E45E1" }}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h4 className="fw-bold mb-0"><img src={Logo} alt="logo" style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }} className="me-2"/>Smartstay</h4>
                        <p className="ms-4" style={{ fontSize: 14, fontWeight: 400, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px',letterSpacing:"0.5px" }}>Meet All Your Needs</p>
                      </div>

                      <div>
      <div style={{ fontSize: 17, fontWeight: 600, fontFamily: "Gilroy" , marginRight:'20px'}}>
        Royal Grand Hostel
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, fontFamily: "Gilroy" }}>
      <>
      <div style={{ fontSize: 13, fontWeight: 400, fontFamily: "Gilroy" }}>
 9, 8th Avenue Rd, Someshwara Nagar, <br />
             Chennai, Tamilnadu - 600 056
             </div>
</>

      </div>
    </div>

    
                    </div>
                  </div>
                
                 
                  <div className="container bg-white rounded-bottom border position-relative" style={{width:"100%",}}>
                    <div className="text-center pt-2 pb-1">

                      <p className="" style={{ fontSize: '17px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>

 { selectedcard === "finalreceipt" && "Final Settlement Receipt"}
        </p>


                    </div>
                
                  
                    <div className="row px-4 mt-2">
                      <div className="col-md-7 mb-3">
                        <p className="mb-1" style={{fontSize: '13px', color:'#1E45E1' ,fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To:</p>
                        <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                        <p className="mb-1"><img src={mobblue} alt="mob" width={12} height={12}/>
                         <span className="ms-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}> 
                                      +91 85647 85332
                                                     </span>
        
                         </p>
                        <p className="mb-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frameblue} alt="frame" width={15} height={15} className="me-1"/>
                                 No 103 -02  </p>

                         <div className="d-flex" style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                       
                       <div className="me-2">
                         <img src={substracBlue} alt="local" />
                       </div>
                     
                       <div>
                       <p>
            9, 8th Main Rd, Someshwara Nagar, <br></br>
             Bengaluru, Karnataka 560011
          </p>
                       </div>
                     
                     </div>

                      </div>
                      <div className="col-md-5 mb-3">
                        <div className="row">

                          <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Receipt No :</div>
                          <div className="col-6  text-start mt-1"  style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#REC-FS324515</div>
                
                          <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                          <div className="col-6  text-start mt-1"  style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                
                          <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Time :</div>
                          <div className="col-6  text-start mt-1"  style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>11:56:43 AM</div>
                          <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Room No :</div>
                          <div className="col-6  text-start mt-1"  style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>103–02</div>
                          <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                          <div className="col-6  text-start"  style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',marginTop:2,paddingLeft:18}}>
         Cash</div>
                        </div>
                      </div>
                    </div>
                
                   
                    <div className="px-4 pb-3">
                      <div className="table-responsive">
                        <table className="table  text-center align-middle">
                          <thead  style={{backgroundColor:"#1E45E1",color:"#FFFFFF"}}>
                            <tr style={{color:"white"}}>
                              <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white", fontSize:'12px' , fontFamily:'Gilroy', fontWeight:400 }}>S.NO</th>
                              <th style={{color:"white" , fontSize:'12px' , fontFamily:'Gilroy', fontWeight:400}}>Description</th>
                              <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'12px' , fontFamily:'Gilroy', fontWeight:400 }}>Amount / INR</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                              <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                              <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}>Outstanding Dues (if any)</td>
                              <td style={{ fontSize:'12px' , fontFamily:'Gilroy', fontWeight:500}}> Rs: - 8,000.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                
                      
                      <div className="d-flex justify-content-end mt-3"  >
  <div className="w-100 w-md-50" style={{paddingRight:"80px"}}>

  <div className="d-flex justify-content-end py-1">
      <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Advance Amount</div>
      <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}> Rs: 10,000.00</div>
    </div>
   
    

    
    <div className="d-flex justify-content-end py-2 fw-bold">
      <div className="w-50 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 500, color: '#1E1E1E', }}>Refundable Total</div>
      <div className="w-25 text-end" style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: '#1E1E1E', }}>Rs: 2,000.00</div>
    </div>
  </div>
</div>

                    </div>
                
                   
                  
                  </div>
                  <div className="px-4" style={{marginTop:20}}>
                      <div className="row">
                      <div className="col-md-8">
    <h6 className="" style={{color:'#1E45E1' ,fontSize:'13px' ,fontFamily: 'Gilroy', fontWeight: 500}}>Acknowledgment</h6>
    <p style={{ fontSize: "12px", color: "#555" ,fontFamily: 'Gilroy', fontWeight:400}}>
    This document confirms final settlement for the Tenant on <br></br>
    . All dues are cleared, and room has been vacated.
    </p>
  </div>
                        <div className="col-md-4 text-end">
                          <p className="mt-4"   style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(44, 44, 44, 1)', }}>
                            Authorized Signature</p>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4 align-items-start flex-wrap ms-4">
 
    <div className="text-start mt-4">
      <p className="mb-0" style={{fontSize: "12px", fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(30, 69, 225, 1)'}}>
      &quot;Your comfort is our priority –
      </p>
      <p className="mb-0" style={{fontSize: "12px", fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(30, 69, 225, 1)'}}>
        See you again at Smart Stay! &quot;
      </p>
    </div>
  

      <div>
      <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block"><img src={paidfull} alt="received" height={81} width={152}/></p>

     </div>
    </div>
                
                    <div className=" px-5">
                    <div className=" text-white text-center" style={{borderTopLeftRadius:"12px",borderTopRightRadius:"12px",backgroundColor:"#1E45E1",padding:7}}>
                      <small style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(255, 255, 255, 1)',}}>Email : contact@royalgrandhostel.in | Contact : +91 88994 56611</small>
                    </div>
                    </div>
                    </div>
                </div>


                
                    }
                </div>
                </div>
  )
}



      </>
    )
  }
         {
          cardshow &&

               <div className="mt-2">
      {CardItems.map(({ id, icon, title,type, description }) => (
        <div
          key={id}
          onClick={()=> handleShow(type)}
          className="d-flex justify-content-between align-items-center p-3 mb-3  shadow-sm"
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            cursor: "pointer",
            borderRadius:'10px'
          }}
        >
          <div className="d-flex align-items-center">
         
         <div className="me-3">

              <img src={icon} alt="pdficon"/>
            </div>

            <div>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{title}</div>
              <div style={{ fontSize: 12, color: "#888" }}>{description}</div>
            </div>
          </div>

          <img  src={LeftArrow} height={12} width={12} alt="left_arrow"/> 
        </div>
      ))}
    </div>
         }
   
        
    
  {
    edit &&

    (
  <div>

    <div
                                  className="container justify-content-start  d-flex align-items-start"
                                  style={{
                                    position: "sticky",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    zIndex: 1000,
                                    backgroundColor: "#FFFFFF",
                                    height: "60px",
                                    padding: "10px 5px",
                                  }}
                                >
                                  <div style={{ position: "fixed" }}>
                                    <img
                                      src={leftarrow}
                                      alt="leftarrow"
                                      width={20}
                                      height={20}
                                      onClick={handleEditClose}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <span
                                      style={{
                                        fontWeight: 500,
                                        fontSize: "18px",
                                        fontFamily: "Gilroy",
                                        paddingLeft: "10px"
                                      }}
                                    >
                                      {selectedcard === "paymentinvoice" && "Monthly Rental Invoice" }
                                      {selectedcard === "despositinvoice" && "Security Deposit Invoice" }
                                      {selectedcard === "payementreceipt" && "Monthly Rental Receipt" }
                                      {selectedcard === "depositreceipt" && "Security Deposit Receipt" }
                                      {selectedcard === "finalreceipt" && "Final Settlement Receipt" }
                                    
                                    </span>{" "}
                                  </div>
                                </div>
   
                              <div style={{overflowY:'auto', maxHeight:'500px' }}>
    
                                <div className="border p-3 mb-3" style={{borderRadius:'10px' ,minHeight:'500px', overflowY:'auto', }}>

                                    <p style={{ fontFamily: "Gilroy", fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 400,whiteSpace: "nowrap",}}>Account Details</p>
                                    <hr></hr>

                    <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                          Account No
                        </Form.Label>
                        <Form.Control
                          style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                          type="text"
                          placeholder="Account No"
                          value={prefix}
                   
                        />
                      </Form.Group>

                   
                    </div>


                    <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
  <Form.Label
    style={{
      fontFamily: "Gilroy",
      fontSize: 14,
      fontWeight: 400,
      color: "rgba(34, 34, 34, 1)",
      fontStyle: "normal",
      lineHeight: "normal",
    }}
  >
  IFSC Code
  </Form.Label>

  <Select
    options={billingFrequencyOptions}
    placeholder="Select"
    value={billingFrequencyOptions.find(opt => opt.value === startNumber)}
    styles={{
      control: (base) => ({
        ...base,
        padding: "2px",
        marginTop: "5px",
        fontSize: "16px",
        fontFamily: "Gilroy",
        fontWeight: 400,
        color: "rgba(34, 34, 34, 1)",
        borderColor: "#ced4da",
      }),
    }}
  />

 
</Form.Group>

                    </div>
                 
    
  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                          Bank Name
                        </Form.Label>
                        <Form.Control
                          style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                          type="text"
                          placeholder="Enter Bank Name"
                          value={prefix}
                       
                        />
                      </Form.Group>

                   
                    </div>


 <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
  <label
    htmlFor="paymentType"
    className="form-label"
    style={{
      fontFamily: "Gilroy",
      fontSize: 14,
      fontWeight: 400,
      color: "rgba(34, 34, 34, 1)",
      fontStyle: "normal",
      lineHeight: "normal",
    }}
  >
    Payment Types
  </label>

  <div className="position-relative">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      placeholder="Enter payment type"
      className="form-control"
      style={{
        height: "40px",
        paddingRight: "40px", 
        fontFamily: "Gilroy",
        fontSize: 16,
        fontWeight: 400,
        color: "rgba(34, 34, 34, 1)",
      }}
    />

    <img
      src={AddSquareICon}
      onClick={handleAdd}
      alt="addbutton"
      height={24}
      width={24}
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        cursor: "pointer",
      }}
    />
  </div>

  {paymentTypes.length > 0 && (
    <div className="mt-3 d-flex flex-wrap gap-2">
      {paymentTypes.map((item, index) => (
        <div
          key={index}
          className="d-flex align-items-center px-3 py-1 rounded bg-white"
          style={{
            fontWeight: 400,
            borderRadius: "8px",
            border: "1px solid rgba(30, 69, 225, 1)",
            fontFamily: "Gilroy",
            fontSize: 14,
            color: "rgba(34, 34, 34, 1)",
          }}
        >
          {item}
          <img
            className="ms-2"
            src={DeleteIcon}
            alt="delete"
            height={15}
            width={15}
            style={{ cursor: "pointer" }}
            onClick={() => handleDelete(item)}
          />
        </div>
      ))}
    </div>
  )}
</div>


                 


                    
   <div className="mb-3">
      <label className="form-label" style={{  fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", }}
      >Payment Types (Reference Images)</label>

      <div
        className="d-flex align-items-center justify-content-between p-2"
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          background: "#fff",
           fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)",
        }}
      >
        <span style={{ color: "#999" }}>Select</span>

        <label
          htmlFor="imageUpload"
          className="btn btn-outline-secondary d-flex align-items-center gap-2 mb-0"
          style={{
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "400",
            color: "rgba(34, 34, 34, 1)"
          }}
        >
          
          Upload File

          <img src={UploadFileIcon} height={15} width={15} alt="upload file"   />
        </label>

        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="mt-3 d-flex gap-2 flex-wrap">
        {selectedImages.map((img) => (
          <div
            key={img.url}
            className="position-relative"
            style={{
              border: "1px solid #1E45E1",
              borderRadius: "8px",
              overflow: "hidden",
              width: "100px",
              height: "100px",
            }}
          >
            <img
              src={img.url}
              alt="preview_image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <img
              src= {DeleteIcon}
              onClick={() => handleDeleteImage(img.url)}
              alt="deleteicon"
              className="position-absolute"
              style={{
                top: "5px",
                right: "5px",
                color: "red",
                width:'22px',
                height:'22px',
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "3px",
                fontSize: "12px",
                cursor: "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </div>
               


                 





              

                </div>

                <div className="border p-3 mb-3" style={{borderRadius:'10px' , overflowY:'auto', }}>

      <div>
        <p  style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
          Invoice No</p>
        <hr></hr>
      </div>

 <div className='d-flex row '>
                        <div className='col-lg-6 col-md-6 col-sm-11 col-xs-11'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label
                                    style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,  fontStyle: 'normal', lineHeight: 'normal', color:'rgba(34, 34, 34, 1)' }}
                                >
                                    Prefix
                                </Form.Label>
                                <Form.Control
                                    style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                                    type="text"
                                    placeholder="prefix"
                               
                                />
        

                          </Form.Group>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-11 col-xs-11'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,  color:'rgba(34, 34, 34, 1)' ,fontStyle: 'normal', lineHeight: 'normal' }}
                                >
                                    Suffix
                                </Form.Label>
                                <Form.Control
                                    style={{ padding: '10px', marginTop: '10px', fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                                    type="text"
                                    placeholder="suffix"
                                
                                />

 
                            </Form.Group>
                        </div>
                    </div>

                    <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,  color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                            >
                                Preview
                            </Form.Label>
                            <Form.Control
                                style={{ padding: '10px', marginTop: '10px', fontSize: 16,   color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                                type="text"
                                placeholder="preview"
                                readOnly
                           
                            />
                        </Form.Group>
                    </div>
                  </div>

                  <div className="border p-3 mb-3" style={{borderRadius:'10px' , overflowY:'auto', }}>

      <div>
        <p    style={{ fontFamily: 'Gilroy' , color:'rgba(34, 34, 34, 1)', fontSize: 14, fontWeight: 400,  fontStyle: 'normal', lineHeight: 'normal' }}>
          PG Tax Payable</p>
        <hr></hr>
      </div>

 <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label
                                    style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                                >
                                    Add the Tax payable GST in Percentage %
                                </Form.Label>
                                <Form.Control
                                    style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                                    type="text"
                                    placeholder="12%"
                               
                                />
        

                          </Form.Group>
                        </div>

                      
                    </div>
                   

                    
                  </div>

                  
                     <div className="p-3 mb-3 border " style={{borderRadius:'10px'}}>
      <h6                   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
        Notes</h6>
      <hr />
      <label className="form-label"                   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)',fontStyle: 'normal', lineHeight: 'normal' }}
      >Add Notes</label>

      <div className="position-relative">
        <textarea
          style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
          className="form-control pe-5" 
          rows="4"
          placeholder='Add any message...'
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <img
          src={TextAreaICon}
          alt="textarea_icon"
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            color: "#666",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>

                     <div className="p-3 mb-3 border " style={{borderRadius:'10px'}}>
      <h6  style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
        Terms & Condition</h6>
      <hr />
      <label className="form-label"                   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
      >Add T&C</label>

      <div className="position-relative">
        <textarea
          className="form-control pe-5" 
          rows="4"
          placeholder='Add any message...'
          value={terms}
          onChange={(e) => setTerms(e.target.value)}
                            style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
        />
         <img
          src={TextAreaICon}
           alt="textarea-icon"
          style={{
            position: "absolute",
            right: "12px",
            top: "12px",
            color: "#666",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>

    <div className="p-3 mb-3 border " style={{borderRadius:'10px'}}>
      <h6                   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)',fontStyle: 'normal', lineHeight: 'normal' }}>
        Authorized Signature</h6>
      <small className="text-muted"  style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
      >Add a respected Persons Signature</small>

      <div
        className="border border-dashed rounded mt-2 d-flex justify-content-center align-items-center"
        style={{ height: '120px', borderStyle: 'dashed' }}
      >
        {signature ? (
          <img src={signature} alt="signature" style={{ maxHeight: '100%', maxWidth: '100%' }} />
        ) : (
          <span className="text-muted"                   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
          >No signature uploaded</span>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          <label  style={{ cursor: 'pointer' , color:'rgba(30, 69, 225, 1)' ,  fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400}}>
            Choose file
            <input
              type="file"
              accept="image/*"
              className="d-none"
              ref={fileInputRef}
              onChange={handleFileSignatureChange}
            />
          </label>
          <span className="ms-1" style={{color:'rgba(22, 21, 28, 1)' ,  fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400}}>to Upload Image</span>
        </div>
        <div>
          <button
            className="btn btn-link text-decoration-none "
            onClick={handleClear}
            disabled={!signature}
            style={{color:'rgba(75, 75, 75, 1)' ,  fontFamily: 'Gilroy', fontSize: 16, fontWeight: 400}}
          >
            Clear
          </button>
          <button
            className="btn btn-link text-decoration-none "
            disabled={!signature}
            style={{color:'rgba(30, 69, 225, 1)',   fontFamily: 'Gilroy', fontSize: 16, fontWeight: 600}}
          >
            Done
          </button>
        </div>
      </div>
    </div>

    <div className="d-flex justify-content-end flex-wrap mt-3 ">
    <button
    
    onClick={handleEditClose}
    className="me-3 "
      style={{
        fontFamily: "Gilroy",
        fontSize: "14px",
        backgroundColor: "white",
        color: "rgba(75, 75, 75, 1)",
        fontWeight: 400,
        borderRadius: "12px",
        width: 146,
        height: 45,
        border: "1px solid rgba(75, 75, 75, 1)",
      
      }}
    >
      Cancel
    </button>
  
    <button
      style={{
        fontFamily: "Gilroy",
        fontSize: "14px",
        backgroundColor: "#1E45E1",
        color: "white",
        fontWeight: 400,
        borderRadius: "12px",
        width: 146,
        height: 45,
        border: "1px solid #1E45E1",
      }}
    >
      Update
    </button>
  </div>
       </div>           
  </div>
    )
  }
      





     
    </div>
  );
}
SettingInvoice.propTypes = {
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}
export default SettingInvoice;