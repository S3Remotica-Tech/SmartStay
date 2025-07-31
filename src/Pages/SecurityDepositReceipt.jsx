/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "../Pages/Settings.css";
import { MdError } from "react-icons/md";
import TextAreaICon from '../Assets/Images/textarea.png'
import "react-datepicker/dist/react-datepicker.css";
import mob from "../Assets/Images/New_images/Rectangle 77.png";
import substrac from "../Assets/Images/New_images/Subtract.png";
import frame from "../Assets/Images/New_images/FramePDF.png";
import receiptLogo from '../Assets/Images/New_images/receiptlogo.png';
import received from '../Assets/Images/New_images/received.png'
import Button from 'react-bootstrap/Button';
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";
import ZoomImage from '../Assets/Images/zoom.png'
import Topbottom from '../Assets/Images/cancel_presentation.png';
import left85arrow from '../Assets/Images/arrow85.png';
import printdown from '../Assets/Images/printericon.png';
import downloadicon from '../Assets/Images/pdfdown.png'; 
import CloseIcon from '../Assets/Images/close_icon.png';

  const SecurityReceiptPdfTemplate = () => {

       
        const cardRef = useRef(null);
        const innerScrollRef = useRef(null);
        const [showFullView, setShowFullView] = useState(false);
      
    
        const [notes_errmsg , setNotesErrMsg] = useState('')
        const [terms_errmsg , setTermsErrMsg] = useState('')

      
  const [color, setColor] = useState({ r: 0, g: 163, b: 46, a: 1 });

  const handleColorChange = (newColor) => {
    setColor(newColor); 
  };
      
        const presetColors = [
          "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
          "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
        ];
      
        const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
        const alphaValue = Math.round(color.a * 100);
      
       
      
   
  
      
      
      const handleNotesChange = (e) => {
          const Value = e.target.value  
          setNotes(Value)
      
          if (Value.trim() !== "") {
          setNotesErrMsg("");
        }
      }
      
      const handleTermsChange = (e) => {
          const Value = e.target.value  
          setTerms(Value)
      
          if (Value.trim() !== "") {
          setTermsErrMsg("");
        }
      }
      
      
      
      
      
         const [notes, setNotes] = useState(
          '"Your comfort is our priority – See you again at Smart Stay!"'
        );
      
         const [terms, setTerms] = useState(
          'Tenants must pay all dues on or before the due date, maintain cleanliness, and follow PG rules; failure may lead to penalties or termination of stay.'
        );
      
      

      
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
      
   
   

    return(

        <div className="col-12 d-flex flex-row">
       <div className="col-lg-4 show-scroll" style={{ maxHeight: 450,
                  overflowY: "auto",
                  overflowX:'hidden',}}>
       <p style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600,}}>Form Specific Details</p>
       <p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,color:'rgba(99, 109, 148, 1)'}}>{`Fill the form with details you'd like to customize.`}</p>
       
        
       
       
        
       

                         

       
        
       
       
       
       
       
                                     <div className="p-3 mb-3 border col-lg-10" style={{borderRadius:'10px'}}>
                 <h6   style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}>
                  Notes
                  </h6>
                  <hr />
             <label className="form-label"  style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)',fontStyle: 'normal', lineHeight: 'normal' }}>Add Notes</label>
             <div className="position-relative">
               <textarea
                 style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                 className="form-control pe-5" 
                 rows="4"    
                 placeholder='Add any message...'
                 value={notes}
                 onChange={handleNotesChange}
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
              {notes_errmsg.trim() !== "" && (
                                                     <div className="d-flex align-items-center p-1">
                                                       <MdError
                                                         style={{
                                                           color: "red",
                                                           marginRight: "5px",
                                                           fontSize: "14px",
                                                         }}
                                                       />
                                                       <label
                                                         className="mb-0"
                                                         style={{
                                                           color: "red",
                                                           fontSize: "12px",
                                                           fontFamily: "Gilroy",
                                                           fontWeight: 500,
                                                         }}
                                                       >
                                                         {notes_errmsg}
                                                       </label>
                                                     </div>
                                                   )}
           </div>
       
                            <div className="p-3 mb-3 border col-lg-10" style={{borderRadius:'10px'}}>
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
                 onChange={handleTermsChange}
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
              {terms_errmsg.trim() !== "" && (
                                                     <div className="d-flex align-items-center p-1">
                                                       <MdError
                                                         style={{
                                                           color: "red",
                                                           marginRight: "5px",
                                                           fontSize: "14px",
                                                         }}
                                                       />
                                                       <label
                                                         className="mb-0"
                                                         style={{
                                                           color: "red",
                                                           fontSize: "12px",
                                                           fontFamily: "Gilroy",
                                                           fontWeight: 500,
                                                         }}
                                                       >
                                                         {terms_errmsg}
                                                       </label>
                                                     </div>
                                                   )}
             
           </div>
       
       
            <div className="col-lg-10" style={{ border: "1px solid #E5E7EB", borderRadius: 12, padding: 16,  fontFamily: "sans-serif" }}>
             <h6 style={{ marginBottom: 12 }}>Template Theme</h6>
       
             <RgbaColorPicker color={color} onChange={handleColorChange} style={{ width: "100%", }} />
       
             <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
               <input value={hexValue} readOnly style={{ width: 80, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={color.r} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={color.g} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={color.b} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
               <input value={alphaValue} readOnly style={{ width: 40, textAlign: "center", border: "1px solid #ccc", borderRadius: 4 }} />
             </div>
       
             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#555", marginTop: 4, marginBottom: 12 }}>
               <span style={{ width: 80, textAlign: "center" }}>Hex</span>
               <span style={{ width: 40, textAlign: "center" }}>R</span>
               <span style={{ width: 40, textAlign: "center" }}>G</span>
               <span style={{ width: 40, textAlign: "center" }}>B</span>
               <span style={{ width: 40, textAlign: "center" }}>A</span>
             </div>
       
             <div style={{
               display: "grid",
               gridTemplateColumns: "repeat(9, 1fr)",
               gap: 8,
               justifyContent: "center"
             }}>
              {presetColors.map((preset, index) => (
         <div
           key={index}
           onClick={() => {
             const r = parseInt(preset.substr(1, 2), 16);
             const g = parseInt(preset.substr(3, 2), 16);
             const b = parseInt(preset.substr(5, 2), 16);
             setColor({ r, g, b, a: 1 });
           }}
           style={{
             width: 24,
             height: 24,
             borderRadius: "20%",
             backgroundColor: preset,
             cursor: "pointer",
             border: preset.toLowerCase() === "#ffffff" ? "1px solid #ccc" : "none"
           }}
         />
       ))}
       
       <div
         onClick={() => console.log("Current color clicked")}
         style={{
           width: 24,
           height: 24,
           borderRadius: "20%",
           backgroundColor: hexValue,
           cursor: "pointer",
           border: "2px solid #000"
         }}
         title="Current selected color"
       />
       
             </div>
         </div>
       
        <div className="d-flex justify-content-end mt-2 col-lg-10">
               <Button
             style={{
               width: 160,
               height: 42,
               borderRadius: 10,
               padding: "8px 16px",
               background: "#1E45E1",
               color: "#FFFFFF",
               fontWeight: 600,
               fontFamily: "Gilroy",
               fontSize: "14px",
             }}
           >
             Save Template
           </Button>
         </div>
       
       </div>
<div className="col-lg-8 d-flex justify-content-center" style={{backgroundColor:'rgba(244, 246, 255, 1)'}}>
  <div className="d-flex justify-content-center">
       <div className="receipt-container border ps-4 pe-4 pb-4 pt-1 col-10" ref={cardRef} style={{ borderRadius:'8px' ,backgroundColor:'white'}} >
      
          <div className="d-flex justify-content-end ">
    <button
      className="btn btn-sm border bg-white"
      onClick={() => setShowFullView(true)}
      style={{height:25 , fontSize:8 , color: 'rgba(23, 23, 23, 1)'}}
    >
      <img  src={ZoomImage} alt="zoom"/> Full View
    </button>
  </div>

      <div   ref={innerScrollRef}
        className="  show-scroll col-lg-12  justify-content-center"
        style={{
          maxHeight: 470,
          overflowY: "auto",
          borderBottomLeftRadius: "13px",
          borderBottomRightRadius: "13px",
        }}>
                        <div   className=" text-white  p-2 position-relative" style={{ minHeight: 60, backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>
                         <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex gap-2 mb-2 mb-lg-0">
                                      <img src={ receiptLogo} alt="logo" style={{ height: 30, width: 30 }} />
                                      <div>
                                        <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
                                        <div style={{ fontSize: 10, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
                                      </div>
                                    </div>
                                
                                    <div>
                                      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" , marginRight:'20px'}}>
                                       Royal Grand Hostel
                                      </div>
                                      <div style={{ fontSize: 10, fontWeight: 600, fontFamily: "Gilroy" }}>
                                      <>
                         
                                      9, 8th Avenue Rd, Someshwara Nagar, <br />
                                      Chennai, Tamilnadu - 600 056
                               
                                </>
                                
                                      </div>
                                    </div>
                                  </div>
                        </div>
                      
                       
                        <div className="container border shadow bg-white rounded-bottom  position-relative" style={{width:"100%",}}>
                          <div className="text-center pt-2 pb-1">
                            <h5 className="" style={{ fontSize: '12px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>Security Deposit Receipt</h5> 
                          </div>
                      
                        
                          <div className="row px-4 mt-1">
                            <div className="col-md-6 mb-1">
                              <p className=" mb-1" style={{color:'rgba(0, 163, 46, 1)' ,  fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To :</p>
                              <p className="mb-1 me-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                              <p className="mb-1"><img src={mob} alt="mob" width={12} height={12}/>
                             <span className="ms-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}>
                                +91 85647 85332
                                              </span>
                               </p>
                               <p className="mb-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frame} alt="frame" width={15} height={15} className="me-1"/> 
                               No 103 -02 </p>
                              <div className="d-flex" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                             
                             <div className="me-2">
                               <img src={substrac} alt="subs" />
                             </div>
                           
                             <div>
                                         <p style={{ fontSize: '9px',fontFamily: 'Gilroy',}}>
                  9, 8th Main Rd, Someshwara Nagar, <br></br>
                   Bengaluru, Karnataka 560011
                </p>
                             </div>
                           
                           </div>
      
                            </div>
                            <div className="col-md-6 mb-1 ps-5">
                              <div className="row">
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Receipt No :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#SSR001</div>
                      
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Invoice Ref :</div>
                                <div className="col-6 text-start mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#324515</div>
                      
                                <div className="col-6 text-muted text-end mt-1"   style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                      
      
                      
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '9px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',paddingLeft:18}}>UPI / Net Banking </div>
                              </div>
                            </div>
                          </div>
                      
                          
        <div className="d-flex justify-content-end text-end mt-1 me-5">
            <div>
              <label style={{ fontSize: 10, fontWeight: 500, fontFamily: "Gilroy" , marginRight:'15px', marginTop:'60px'}}>
                Amount received
              </label>
            </div>
          <div style={{ padding: '10px', border: '1px solid rgba(0, 163, 46, 1)', borderRadius:'5px' }}>
          
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, fontFamily: "Gilroy" , color:'rgba(0, 163, 46, 1)' }}>
                 ₹ 8,073.00
              </label>
            </div>
            <div>
              <label style={{
                fontSize: 9,
                fontWeight: 600,
                color: "#000000",
                fontFamily: "Gilroy"
              }}>
                Eight Thousand and Seventy Three Rupees Only
              </label>
            </div>
          </div>
        </div>
      
      
     
      <div>
        <p style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)',marginLeft:'20px'}}>Payment For</p>
        </div>
     
                         
                          <div className="px-2">
                            <div className="table-responsive">
                              <table className="table  text-center ">
                                <thead  style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,color:"#FFFFFF"}}>
                                  <tr style={{color:"white"}}>
                                    <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white" , fontSize:'10px' , fontFamily:'Gilroy', fontWeight:600 }}>S.NO</th>
                                    <th style={{color:"white" , fontSize:'10px' , fontFamily:'Gilroy', fontWeight:600}}>Inv No</th>
                                    <th style={{color:"white" ,  fontSize:'10px' , fontFamily:'Gilroy', fontWeight:600 }}>Description</th>
                               
        <th style={{ color: "white"  ,  fontSize:'10px' , fontFamily:'Gilroy', fontWeight:600 }}>Duration</th>
    
                                  
                                    <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'10px' , fontFamily:'Gilroy', fontWeight:600  }}>Amount / INR</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
                                    <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                                    <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}}>INV-004</td>
                                    <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}}> 
                                      {`Security Deposit (Advance)`}
                                      </td>
                                  
        <td style={{ fontSize:'9px' , fontFamily:'Gilroy', fontWeight:500}} >May 2025</td>
  
      
      <td style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500 }}>
        Rs: 8,073.00
      </td>
      
      
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
        
    
      
      
                          </div>
                      
                         
                        
                        </div>
                        <div className="px-4" style={{marginTop:10}}>
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <h6  style={{
              fontSize: '10px',
              fontFamily: 'Gilroy',
              fontWeight: 700,
              color: '#00A32E',
              letterSpacing:'1px'}}
              >PAYMENT DETAILS</h6>
                                <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode: 
          G-Pay</p>
     
      
                                <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Received By: Admin - Anjali R</p>
                                <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)',marginTop:"-14px" }}>Status: Paid</p>
          
                              </div>
                              <div className="col-md-6 text-end">
                              <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={71} width={142}/></p>
                            
          <div className="text-start mt-1 ms-5" >
            <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(0, 163, 46, 1)',fontSize:"9px",marginLeft:"35px"}}>
            &quot;Thank you for choosing SmartStay. &quot;
            </p>
            <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(0, 163, 46, 1)',fontSize:"9px",marginLeft:"35px"}}>
            Your transaction is completed &quot;
            </p>
          </div>
     
                              </div>
                              <div className="row">
        <div className="col-md-6">
          <h6  style={{color:"#00A32E",fontSize:"10px",fontWeight:600,fontFamily:"Gilroy"}}>Acknowledgment</h6>
          <p style={{ fontSize: "9px", color: "#555",fontFamily:"Gilroy" }}>
            This payment confirms your dues till the mentioned period. Final settlement during checkout will be calculated based on services utilized and advance paid.
          </p>
        </div>
      
        <div className="col-md-6 text-end">
          <p className="text-success fw-bold border-success px-4 py-2 d-inline-block">
          </p>
          <p className="mt-4" style={{fontSize: "11px",fontFamily:"Gilroy",color:"#2C2C2C",paddingRight:"25px"}}>Authorized Signature</p>
        </div>
      </div>
      
                            </div>
                          </div>
                      
                        
                                       <div className="ms-5 me-5">
         <div
           className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
           style={{
             backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
             borderTopRightRadius: '38px',
             borderTopLeftRadius: '38px',
           }}
         >
           <p
             className="mb-0"
             style={{
               fontSize: '10px',
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
               fontSize: '10px',
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
</div></div>
                                      {showFullView && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: 'rgba(90, 90, 90, 0.22)',
      zIndex: 9999,
      overflowY: 'auto',
      marginLeft:'10%'
    }}
  >
    <div
      className="bg-white   shadow"
      style={{
        width: '100%',
        maxWidth: '900px',
        minHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
         borderTopLeftRadius: '16px',
         borderTopRightRadius: '16px',
      }}
    >
     <div
  style={{
      backgroundColor: '#2C2C2C',
    color: '#fff',
    padding: '7px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position:'relative',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
  }}
>
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' , marginLeft:25}}>
    <span style={{ fontSize: '8px' }}>1 / 1</span>
    <div style={{ borderLeft: '1px solid #555', height: '20px' }}></div>

    <div className="d-flex align-items-center" style={{ gap: '3px' }}>
      <button className="btn btn-sm text-white px-0 py-0 mb-1 me-1">−</button>
      <span style={{ fontWeight: 'bold', fontSize: '8px' }}>100%</span>
      <button className="btn btn-sm text-white px-0 py-0 mb-1 ms-1" >+</button>
    </div>

    <div style={{ borderLeft: '1px solid #555', height: '20px' }}></div>

    <button className="btn btn-sm  px-1 py-0 me-0"><img  src={Topbottom} alt="topbottom"/></button>
    <button className="btn btn-sm px-1 py-0"><img  src={left85arrow} alt="left85arrow"/></button>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <button className="btn btn-sm  px-2 py-0"><img  src={downloadicon} alt="topbottom"   style={{ width: '12px', height: '12px' }}/></button>
    <button className="btn btn-sm  px-2 py-0"><img  src={printdown} alt="topbottom"   style={{ width: '12px', height: '12px' }}/></button>
 <div
          className="bg-white rounded-circle d-flex align-items-center justify-content-center"
          onClick={() => setShowFullView(false)}
          style={{
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
        
          }}
        >
          <img
            src={CloseIcon}
            alt="Close"
            style={{ width: '12px', height: '12px' }}
          />
        </div>

  </div>
</div> 



<div className="d-flex justify-content-center">
 <div className="receipt-container border ps-5 pe-5 pb-2 pt-2 mt-3 col-lg-8" ref={cardRef} style={{ borderRadius:'8px' ,}} >
      
   

      <div   ref={innerScrollRef}
        className="border shadow show-scroll col-lg-12  justify-content-center"
        style={{
          maxHeight: 480,
          overflowY: "auto",
          borderBottomLeftRadius: "13px",
          borderBottomRightRadius: "13px",
        }}>
                        <div   className=" text-white  p-2 position-relative" style={{ minHeight: 90, backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}}>
                         <div className="d-flex justify-content-between align-items-center">
                                  <div className="d-flex gap-2 mb-2 mb-lg-0">
                                      <img src={ receiptLogo} alt="logo" style={{ height: 40, width: 40 }} />
                                      <div>
                                        <div style={{ fontSize: 15, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
                                        <div style={{ fontSize: 13, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
                                      </div>
                                    </div>
                                
                                    <div>
                                      <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, fontFamily: "Gilroy" , marginRight:'20px'}}>
                                       Royal Grand Hostel
                                      </div>
                                      <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>
                                      <>
                         
                                      9, 8th Avenue Rd, Someshwara Nagar, <br />
                                      Chennai, Tamilnadu - 600 056
                               
                                </>
                                
                                      </div>
                                    </div>
                                  </div>
                        </div>
                      
                       
                        <div className="container border shadow bg-white rounded-bottom  position-relative" style={{width:"100%",}}>
                          <div className="text-center pt-2 pb-1">
                            <h5 className="" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>Security Deposit Receipt</h5> 
                          </div>
                      
                        
                          <div className="row px-4 mt-1">
                            <div className="col-md-6 mb-1">
                              <p className=" mb-1" style={{color:'rgba(0, 163, 46, 1)' ,  fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill To :</p>
                              <p className="mb-1 me-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(23, 23, 23, 1)',}}>Mr. <span style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: '#000000',}}>Muthuraja M</span></p>
                              <p className="mb-1"><img src={mob} alt="mob" width={12} height={12}/>
                             <span className="ms-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}>
                                +91 85647 85332
                                              </span>
                               </p>
                               <p className="mb-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 500, color: '#000000',}}><img src={frame} alt="frame" width={15} height={15} className="me-1"/> 
                               No 103 -02 </p>
                              <div className="d-flex" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(34, 34, 34, 1)' }}>
                             
                             <div className="me-2">
                               <img src={substrac} alt="subs" />
                             </div>
                           
                             <div>
                                         <p style={{ fontSize: '10px',fontFamily: 'Gilroy',}}>
                  9, 8th Main Rd, Someshwara Nagar, <br></br>
                   Bengaluru, Karnataka 560011
                </p>
                             </div>
                           
                           </div>
      
                            </div>
                            <div className="col-md-6 mb-1 ps-5">
                              <div className="row">
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Receipt No :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#SSR001</div>
                      
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Invoice Ref :</div>
                                <div className="col-6 text-start mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>#324515</div>
                      
                                <div className="col-6 text-muted text-end mt-1"   style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Date :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>31 March 2024</div>
                      
      
                      
                                <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',whiteSpace:"nowrap"}}>Payment Mode :</div>
                                <div className="col-6  text-start mt-1" style={{ fontSize: '10px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',paddingLeft:18}}>UPI / Net Banking </div>
                              </div>
                            </div>
                          </div>
                      
                          
        <div className="d-flex justify-content-end text-end mt-1 me-5">
            <div>
              <label style={{ fontSize: 11, fontWeight: 500, fontFamily: "Gilroy" , marginRight:'15px', marginTop:'60px'}}>
                Amount received
              </label>
            </div>
          <div style={{ padding: '10px', border: '1px solid rgba(0, 163, 46, 1)', borderRadius:'5px' }}>
          
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, fontFamily: "Gilroy" , color:'rgba(0, 163, 46, 1)' }}>
                 ₹ 8,073.00
              </label>
            </div>
            <div>
              <label style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#000000",
                fontFamily: "Gilroy"
              }}>
                Eight Thousand and Seventy Three Rupees Only
              </label>
            </div>
          </div>
        </div>
      
      
     
      <div>
        <p style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(0, 0, 0, 1)',marginLeft:'20px'}}>Payment For</p>
        </div>
     
                         
                          <div className="px-2">
                            <div className="table-responsive">
                              <table className="table  text-center ">
                                <thead  style={{ backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,color:"#FFFFFF"}}>
                                  <tr style={{color:"white"}}>
                                    <th style={{ borderTopLeftRadius: "12px",borderBottomLeftRadius:"12px",color:"white" , fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600 }}>S.NO</th>
                                    <th style={{color:"white" , fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600}}>Inv No</th>
                                    <th style={{color:"white" ,  fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600 }}>Description</th>
                               
        <th style={{ color: "white"  ,  fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600 }}>Duration</th>
    
                                  
                                    <th style={{ borderTopRightRadius: "12px",borderBottomRightRadius:"12px",color:"white",  fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600  }}>Amount / INR</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
                                    <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}}>1</td>
                                    <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}}>INV-004</td>
                                    <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}}> 
                                      {`Security Deposit (Advance)`}
                                      </td>
                                  
        <td style={{ fontSize:'10px' , fontFamily:'Gilroy', fontWeight:500}} >May 2025</td>
  
      
      <td style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500 }}>
        Rs: 8,073.00
      </td>
      
      
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            
        
    
      
      
                          </div>
                      
                         
                        
                        </div>
                        <div className="px-4" style={{marginTop:10}}>
                            <div className="row">
                              <div className="col-md-6 mb-3">
                                <h6  style={{
              fontSize: '11px',
              fontFamily: 'Gilroy',
              fontWeight: 600,
              color: '#00A32E',
              letterSpacing:'1px'}}
              >PAYMENT DETAILS</h6>
                                <p className="mb-1" style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payment Mode: 
          G-Pay</p>
     
      
                                <p style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Received By: Admin - Anjali R</p>
                                <p style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)',marginTop:"-14px" }}>Status: Paid</p>
          
                              </div>
                              <div className="col-md-6 text-end">
                              <p className="text-success fw-bold  border-success px-4 py-2 d-inline-block ms-2"><img src={received} alt="received" height={71} width={142}/></p>
                            
          <div className="text-start mt-1 ms-5" >
            <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500 , color:'rgba(0, 163, 46, 1)',fontSize:"10px",marginLeft:"35px"}}>
            &quot;Thank you for choosing SmartStay. &quot;
            </p>
            <p className="mb-0" style={{ fontFamily: 'Gilroy', fontWeight: 500  , color:'rgba(0, 163, 46, 1)',fontSize:"10px",marginLeft:"35px"}}>
            Your transaction is completed &quot;
            </p>
          </div>
     
                              </div>
                              <div className="row">
        <div className="col-md-6">
          <h6  style={{color:"#00A32E",fontSize:"10px",fontWeight:600,fontFamily:"Gilroy"}}>Acknowledgment</h6>
          <p style={{ fontSize: "10px", color: "#555",fontFamily:"Gilroy" }}>
            This payment confirms your dues till the mentioned period. Final settlement during checkout will be calculated based on services utilized and advance paid.
          </p>
        </div>
      
        <div className="col-md-6 text-end">
          <p className="text-success fw-bold border-success px-4 py-2 d-inline-block">
          </p>
          <p className="mt-4" style={{fontSize: "12px",fontFamily:"Gilroy",color:"#2C2C2C",paddingRight:"25px"}}>Authorized Signature</p>
        </div>
      </div>
      
                            </div>
                          </div>
                      
                        
                                       <div className="ms-5 me-5">
         <div
           className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
           style={{
             backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
             borderTopRightRadius: '38px',
             borderTopLeftRadius: '38px',
           }}
         >
           <p
             className="mb-0"
             style={{
               fontSize: '10px',
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
               fontSize: '10px',
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



   </div>
  </div>
)}


                       </div>
    )

  }
  export default SecurityReceiptPdfTemplate;