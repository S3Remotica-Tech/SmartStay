/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "../../Pages/Settings/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Assets/Images/New_images/Group_Logo.png";

import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import BankingAddForm from "../../Pages/Banking/BankingAddForm";
import { Location, Call, Profile, } from 'iconsax-react'
import { IoBed } from "react-icons/io5";
import { Row, Col, Table } from "react-bootstrap";
import { BsQrCode } from "react-icons/bs";

const SecurityDepositInvoiceTemplate = ({ BillsTemplateList , templateThemes}) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [selectedDate, setSelectedDate] = useState(null);
  const [invoicedueDate, setInvoiceDueDate] = useState('');
 
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  
  const [formLoading, setFormLoading] = useState(false)
  
  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);

  
  const [mobilenum, setMobileNum] = useState("")
  
  const [email, setEmail] = useState("")
 
  const [signaturePreview, setSignaturePreview] = useState(null);
  
  const [bankaccountform, setBankAccountForm] = useState(false)

  

  const handleCloseForm = () => {
    setBankAccountForm(false);
    
  }

  







 const defaultGradient ="#1E45E1";

  const [useGradient, setUseGradient] = useState(true);
  const [color, setColor] = useState({ r: 30, g: 69, b: 225, a: 1 });

  







  

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


  ;




  const handleCloseBankAccount = () => {
    setBankAccountForm(false)
   
  }




  useEffect(() => {
    if (state.bankingDetails.statusCodeForAddBanking === 200) {
     
      handleCloseBankAccount();

      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BANKING" });
      }, 1000);
    }
  }, [state.bankingDetails.statusCodeForAddBanking]);








  





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




  const [logoPreview, setLogoPreview] = useState(null);
  

  const [qrImage, setQrImage] = useState(null);
 

 





  useEffect(() => {
    if (state.Settings?.settingsBillsAddTemplateSucesscode === 200) {

      dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_BILLS_TEMPLATE_STATUS_CODE" });
      }, 1000);
    }
  }, [state.Settings.settingsBillsAddTemplateSucesscode]);

 

  useEffect(() => {
    if (state.Settings?.SettingsBilltemplategetErrorCode === 500) {
      setTimeout(() => {
               dispatch({ type: "CLEAR_ERROR_TEMPLATELIST_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings.SettingsBilltemplategetErrorCode]);



  const securityDepositInvoiceTemplate = BillsTemplateList && BillsTemplateList.templates?.find(
    (template) => template.type === "ADVANCE"
  );





useEffect(() => {
 
  if (templateThemes) {
    setLogoPreview(templateThemes.logoPreview || "");

    setMobileNum(templateThemes.mobilenum || "");
    setEmail(templateThemes.email || "");
    setPrefix(templateThemes.prefix || "");
    setSuffix(templateThemes.suffix || "");
    setSignaturePreview(templateThemes.signaturePreview || "");
        setQrImage(templateThemes.qrImage || null);
   
    setTerms(templateThemes.terms || "");
       setColor(templateThemes.color || { r: 0, g: 0, b: 0, a: 1 });
    setUseGradient(false);
    return; 
  }

  
  if (securityDepositInvoiceTemplate) {
    setLogoPreview(
      BillsTemplateList?.isLogoCustomized && securityDepositInvoiceTemplate?.invoiceLogoUrl
        ? securityDepositInvoiceTemplate.invoiceLogoUrl
        : BillsTemplateList?.logo || ""
    );

  

    setMobileNum(
      BillsTemplateList?.isMobileCustomized && securityDepositInvoiceTemplate?.invoiceMobileNumber
        ? securityDepositInvoiceTemplate.invoiceMobileNumber
        : BillsTemplateList?.mobile || ""
    );

    setEmail(
      BillsTemplateList?.isMailIdCustomized && securityDepositInvoiceTemplate?.invoiceMailId
        ? securityDepositInvoiceTemplate.invoiceMailId
        : BillsTemplateList?.emailId || ""
    );

    setPrefix(securityDepositInvoiceTemplate?.prefix || "");
    setSuffix(securityDepositInvoiceTemplate?.suffix || "");

    setSignaturePreview(
      BillsTemplateList?.isSignatureCustomized && securityDepositInvoiceTemplate?.invoiceSignatureUrl
        ? securityDepositInvoiceTemplate.invoiceSignatureUrl
        : BillsTemplateList?.signature || ""
    );
   

    setTerms(securityDepositInvoiceTemplate?.invoiceTermsAndCondition || "");
   
    setQrImage(securityDepositInvoiceTemplate?.qrCodeUrl || null);
   
    const templateTheme = securityDepositInvoiceTemplate?.invoiceTemplateColor;
    if (templateTheme && templateTheme.trim() !== "") {
      if (templateTheme.includes("rgba")) {
        const match = templateTheme.match(
          /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+\.?\d*)\)/
        );
        if (match) {
          setColor({
            r: parseInt(match[1]),
            g: parseInt(match[2]),
            b: parseInt(match[3]),
            a: parseFloat(match[4]),
          });
          setUseGradient(false);
        }
      } else {
        setUseGradient(true);
      }
    } else {
      setUseGradient(true);
    }
  }
}, [securityDepositInvoiceTemplate, templateThemes, BillsTemplateList]);











  useEffect(() => {
    if (state.Settings.settingGlobalAddStatusCode === 200) {
      setFormLoading(false)
           dispatch({ type: 'GET_TEMPLATE_LIST', payload: state.login.selectedHostel_Id })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_GLOBAL_SETTINGS" });
      }, 1000);
    }

  }, [state.Settings.settingGlobalAddStatusCode])









  return (
    <>

      {formLoading &&
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


    


       

        <div className=" g-0 d-flex justify-content-center ps-5 pe-5 pt-1  " style={{ backgroundColor: '#F7F8FC' }}>


          <div className="" ref={cardRef} style={{
            maxHeight: 650,
            overflowY: "auto",
            overflowX: 'hidden',
          }}>
            
            <div ref={innerScrollRef}
              className=" col-lg-12  justify-content-center"
              style={{

                borderBottomLeftRadius: "13px",
                borderBottomRightRadius: "13px", borderRadius: "8px", backgroundColor: "#FFFFFF", marginBottom: 50, boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
              }}>

              <div className="p-3 position-relative"
                style={{
                  backgroundColor: ""
                }}>
                <div className="row d-flex justify-content-between align-items-center ps-3 pe-3">
                  <div className="col-6">
                    <img src={logoPreview ? logoPreview : Logo} alt="logo"  style={{ height: 25, maxWidth: 134, borderRadius: '4px', objectFit: "contain",  }} />
                    <div>
                    </div>
                  </div>


                  <div className="mt-2 col-5 ps-4 pe-0">


                    <div style={{ fontSize: 11, fontWeight: 600, fontFamily: "Gilroy" }}>{state.UsersList.hotelDetailsinPg?.name}</div>

                    <div style={{ fontSize: 8, fontWeight: 600, fontFamily: "Gilroy" }}>
                      {[
                        [state.UsersList.hotelDetailsinPg?.street, state.UsersList.hotelDetailsinPg?.area, state.UsersList.hotelDetailsinPg?.landmark]
                          .filter(Boolean)
                          .join(", "),

                        [state.UsersList.hotelDetailsinPg?.city, state.UsersList.hotelDetailsinPg?.state]
                          .filter(Boolean)
                          .join(", ") + (state.UsersList.hotelDetailsinPg?.pinCode ? ` - ${state.UsersList.hotelDetailsinPg.pinCode}` : "")
                      ]
                        .filter(line => line && line.trim() !== "")
                        .map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                    </div>

                  </div>

                </div>
              </div>

              <hr className="m-0"
                style={{
                  border: "none",
                  height: "1px",
                  background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2px",
                }}
              />
              <div className="container rounded-bottom  position-relative" style={{ width: "100%", }}>
                <div className="text-center pt-2 pb-1">
                  <h5 style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`, }}>
                    Security Deposit
                  </h5>
                </div>


                <div className="row px-4 mt-1">
                  <div className="col-md-6 mb-1">
                    <p
                      className="mb-1"
                      style={{
                        color: useGradient
                          ? defaultGradient
                          : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                        fontSize: "11px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontStyle: "italic",
                      }}
                    >
                      Bill to:
                    </p>


                    <div className="d-flex align-items-center mb-1">
                      <Profile
                        size="16"
                        variant="Bold"
                        color={
                          useGradient
                            ? defaultGradient
                            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                        }
                      />
                      <span
                        className="ms-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          color: "#171717",
                        }}
                      >
                        Mr. Muthuraja M
                      </span>
                    </div>


                    <div className="d-flex align-items-center mb-1">
                      <Call
                        size="16"
                        variant="Bold"
                        color={
                          useGradient
                            ? defaultGradient
                            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                        }
                      />
                      <span
                        className="ms-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#171717",
                        }}
                      >
                        +91 9876543210
                      </span>
                    </div>


                    <div className="d-flex align-items-center mb-1">
                      <IoBed
                        size="16"
                        color={
                          useGradient
                            ? defaultGradient
                            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                        }
                      />
                      <span
                        className="ms-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#171717",
                        }}
                      >
                        No 103 - 02
                      </span>
                    </div>

                    {/* Address */}
                    <div className="d-flex align-items-start">
                      <Location
                        size="16"
                        variant="Bold"
                        color={
                          useGradient
                            ? defaultGradient
                            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`
                        }
                      />
                      <span
                        className="ms-1"
                        style={{
                          fontSize: "9px",
                          fontFamily: "Gilroy",
                          fontWeight: 400,
                          color: "#171717",
                          lineHeight: 1.4,
                        }}
                      >
                        9, 8th Main Rd, Someshwara Nagar, <br />
                        Bengaluru, Karnataka 560011
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6  ps-5 ">
                    <div className="row">

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice :</div>
                      <div className="col-6 text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>#{`${prefix}-${suffix}`}</div>

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Invoice Date :</div>
                      <div className="col-6  text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>31 March 2024</div>

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Due date :</div>
                      <div className="col-6 text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>31 March 2024</div>

                      <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>Joining date :</div>
                      <div className="col-6 text-muted  text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis" }}>05 Jan 2024</div>

                      <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)', }}>Rent Period :</div>
                      <div className="col-6  text-muted text-start mt-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))', }}>Mar - June 2024</div>


                    </div>
                  </div>
                </div>


                <div className="px-3 py-1 ">

                  <div className="mb-1">
                    <label style={{ fontSize: '12px', fontFamily: 'Gilroy', fontWeight: 600, color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>Payment Summary</label>
                  </div>
                 <Row
                                                 style={{
                                                   border: "1px solid #DFDFDF",
                                                   borderRadius: 8,
                                                   margin: 0, fontFamily:"Gilroy"
                                                 }}
                                               >
                    <Col md={12} className="p-1">
                      <Table responsive bordered={false} className="mb-0">
                        <thead>
                          <tr style={{ backgroundColor: "#FFF" }}>
                            <th style={{ fontSize: 12, fontWeight: 600, color: "#222222" }}>INV NO</th>
                            <th
                              style={{
                                fontSize: 12,
                                fontWeight: 600,
                                color: "#222222",
                                textAlign: "", textTransform: "capitalize"
                              }}
                            >
                              DESCRIPTION
                            </th>
                            <th style={{ fontSize: 12, fontWeight: 600, color: "#222222", textAlign: "right" }}>AMOUNT / INR</th>

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
                                    Rs. 5000
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
                                  ₹5000
                                </td>
                              </tr>

                            </tbody>
                      </Table>


                    </Col>
                  </Row>


                  {/* <div className="d-flex flex-wrap align-items-start">



                    <div className="mt-3 ms-auto me-5" style={{ minWidth: '200px' }}>

                      <div className="d-flex justify-content-between py-1">
                        <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Payable Amount</span>
                        <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. 8000</span>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Non Refundable</span>
                        <span className="me-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs.0</span>
                      </div>
                      <div className="d-flex justify-content-between py-1">
                        <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Refundable Amount</span>
                        <span style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs. 8000</span>
                      </div>


                    </div>
                  </div> */}

                </div>




              </div>
              <div className="px-4" style={{ marginTop: 10 }}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <h6 style={{
                      fontSize: '10px',
                      fontFamily: 'Gilroy',
                      fontWeight: 700,
                      color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                      letterSpacing: '1px'

                    }}
                    >ACCOUNT DETAILS</h6>
                    <p className="mb-1"
                      style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                      Account No :  {securityDepositInvoiceTemplate?.accountNumber || '-'}
                    </p>
                    <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                      IFSC Code : {securityDepositInvoiceTemplate?.ifscCode || '-'}
                    </p>
                    <p className="mb-1" style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                      Bank Name: {securityDepositInvoiceTemplate?.bankName || '-'}
                    </p>
                    <p style={{ fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
                      UPI Details : {securityDepositInvoiceTemplate?.upiId || '-'}
                    </p>
                  </div>

                  <div className="col-md-2"></div>

                  <div className="col-md-4 d-flex flex-column align-items-end " style={{}}>
                    <div className="text-end">
                      {
                        qrImage ? 
                      
                      <img
                        src={qrImage }
                        alt="QR Code"
                        className="img-fluid"
                        style={{
                          maxWidth: '150px',
                          height: 'auto',
                        }}/>
                        :
                                                    <BsQrCode  style={{ height: 89, width: 89, borderRadius: '2px' , color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`}}/>
                        
                      }
                      
                    </div>

                    {/* <div className="d-flex">
                      <img src={Paytm} alt="Paytm" style={{ height: 38, width: 38 }} className="m-1" />
                      <img src={Phonepe} alt="PhonePe" style={{ height: 38, width: 38 }} className="m-1" />
                      <img src={Gpay} alt="GPay" style={{ height: 38, width: 38 }} className="m-1" />
                    </div> */}
                  </div>

                </div>
              </div>


              <div className="row justify-content-between mt-2 mb-4 px-4">
                <div className="col-md-8">
                  <h4 style={{ fontSize: '10px', fontFamily: 'Gilroy', fontWeight: 600, color: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` }}>Terms and Conditions</h4>
                  <p style={{ whiteSpace: "pre-line", fontSize: '9px', fontFamily: 'Gilroy', fontWeight: 500, color: 'black' }}>
                    {terms}
                  </p>
                </div>

                <div className="col-md-4 d-flex flex-column justify-content-end align-items-end">
                  {signaturePreview && (
                    <img src={signaturePreview} alt="signature" style={{ height: 40, width: 90 }} />
                  )}
                  <p
                    style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(44, 44, 44, 1)', }}
                  >Authorized Signature</p>
                </div>
              </div>

              <hr className="m-0"
                style={{
                  border: "none",
                  height: "1px",
                  background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "2px",
                }}
              />


              <div className="px-4 py-2 pb-2">
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
                      {email}

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
                      {mobilenum}
                    </span>
                  </p>
                </div>
              </div>

            </div>


          </div>
        </div>

      


      {bankaccountform && (

        <BankingAddForm showForm={bankaccountform}
          setShowForm={handleCloseForm}
          // setEdit={setEdit}


        />

      )}
    </>
  )
}
SecurityDepositInvoiceTemplate.propTypes = {
  hostelid: PropTypes.any,

  BillsTemplateList: PropTypes.shape({
    templates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    mobile: PropTypes.string,
    emailId: PropTypes.string,
    logo: PropTypes.string,
    signature: PropTypes.string,
    isLogoCustomized: PropTypes.bool,
    isSignatureCustomized: PropTypes.bool,
    isMailIdCustomized: PropTypes.bool,
    isMobileCustomized: PropTypes.bool,
  }),

  templateThemes: PropTypes.shape({
    logoPreview: PropTypes.string,
    mobilenum: PropTypes.string,
    email: PropTypes.string,
    prefix: PropTypes.string,
    suffix: PropTypes.string,
    signaturePreview: PropTypes.string,
    qrImage: PropTypes.string,
    notes: PropTypes.string,
    terms: PropTypes.string,
    tax: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    color: PropTypes.string,
  }),
};

export default SecurityDepositInvoiceTemplate;