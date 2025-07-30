import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import Logo from '../Assets/Images/get.png'
import Dial from '../Assets/Images/dial.png'
import Room from '../Assets/Images/Car.png'
import Locat from '../Assets/Images/location 03.png'
import Barcode from '../Assets/Images/invoice_barcode.svg'
import Gpay from '../Assets/Images/gpay.png'
import Phonepe from '../Assets/Images/phonepe.png'
import Paytm from '../Assets/Images/paytm.png'
import Questionimage from '../Assets/Images/question.png';
import EditICon from '../Assets/Images/New_images/edit.png';
import TextAreaICon from '../Assets/Images/textarea.png'
import BankICon from '../Assets/Images/bank_white.png'
import "react-datepicker/dist/react-datepicker.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {CloseCircle} from "iconsax-react";
import "react-toastify/dist/ReactToastify.css";
import { RgbaColorPicker } from "react-colorful";



   const SecurityDepositInvoiceTemplate = () => {

 const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [selectedDate, setSelectedDate] = useState(null);
  const [invoicedueDate, setInvoiceDueDate] = useState('');
  const [accountName, setAccountName] = useState("")
  const [account_number, setAccount_Number] = useState(""); 
  const [description, setDescription] = useState("");
  const [ifsccode, setIfscCode] = useState(""); 
  const [bank_name, setBankName] = useState(""); 
  const [prefix, setPrefix] = useState("");
  const [suffix, setSuffix] = useState("");
  const [tax, setTax] = useState("");
  const [banking, setBanking] = useState([])
  const [selectedBankId, setSelectedBankId] = useState(null);

  const [contactnumberform , setContactNumberForm] = useState(false)
  
  const cardRef = useRef(null);
  const innerScrollRef = useRef(null);

  const [accountNameError, setaccountnameError] = useState("");
//   const [bankid_Error, setBankIdError] = useState("");
  const [prefix_errmsg , setPrefixErrMsg] = useState('')
  const [suffix_errmsg , setSuffixErrMsg] = useState('')
  const [tax_errmsg , setTaxErrMsg] = useState('')
  const [notes_errmsg , setNotesErrMsg] = useState('')
  const [terms_errmsg , setTermsErrMsg] = useState('')
  const [showFullView, setShowFullView] = useState(false);



  const handleShowContactNumberForm = () => {
setContactNumberForm(true)
  }

  const handleCloseContactNumberForm = () => {
    setContactNumberForm(false)
  }


  




 const defaultGradient = 'linear-gradient(to right, rgba(18, 50, 180, 1), rgba(72, 104, 234, 1))';

  const [useGradient, setUseGradient] = useState(true);
  const [color, setColor] = useState({ r: 30, g: 69, b: 225, a: 1 }); 

   const handleColorChange = (newColor) => {
    setColor(newColor);
    setUseGradient(false); 
  }

  const presetColors = [
    "#F44336", "#FF9800", "#FFEB3B", "#795548", "#8BC34A", "#4CAF50", "#E91E63", "#9C27B0", "#9C00FF",
    "#03A9F4", "#00BCD4", "#C8E6C9", "#000000", "#616161", "#9E9E9E", "#FFFFFF", "#AAAAAA", "#FF69B4"
  ];

  const hexValue = `#${((1 << 24) + (color.r << 16) + (color.g << 8) + color.b).toString(16).slice(1).toUpperCase()}`;
  const alphaValue = Math.round(color.a * 100);



 

 const handleAccountName = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setAccountName(value);
    setaccountnameError("")
  };



const handleAccountNumberChange = (e) => {
  const numericValue = e.target.value.replace(/[^0-9]/g, ""); 
  setAccount_Number(numericValue);

};


const handleIfscCodeChange = (e) => {
    const Value = e.target.value  
    setIfscCode(Value)

  
}

const handleBankNameChange = (e) => {
    const Value = e.target.value  
    setBankName(Value)
    
 
}

 const handleDescription = (e) => {
    setDescription(e.target.value);
  };


    const handleSubmitBank = () => {

    if (!accountName) {
      setaccountnameError("Please Enter Benificiary Name");
      return;
    }  
    setaccountnameError("");
 
    if(accountName){
      dispatch({     
      type: "ADD_BANKING",
      payload: { type:"bank", benificiary_name: accountName, acc_no: account_number, bank_name: bank_name,
                 ifsc_code: ifsccode, desc: description, hostel_id: state.login.selectedHostel_Id
               },
    });
    }
  };


const hanldePrefix = (e) => {
     const Value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setPrefix(Value)

    if (Value.trim() !== "") {
    setPrefixErrMsg("");
  }
}

const hanldeSuffix = (e) => {
     const numericValue =  e.target.value.replace(/[^0-9]/g, ""); 
    setSuffix(numericValue)

    if (numericValue.trim() !== "") {
    setSuffixErrMsg("");
  }
}




const handleTaxChange = (e) => {
  const inputValue = e.target.value;

  const formattedValue = inputValue
    .replace(/[^0-9.]/g, '')    
    .replace(/^([^.]*\.)|\./g, '$1'); 

  setTax(formattedValue);

  if (formattedValue.trim() !== "") {
    setTaxErrMsg("");
  }
};


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


;







  

 


  const [bankaccountform , setBankAccountForm] = useState(false)
 

            const handleAddBankAccount = () => {
               setBankAccountForm(true)
                   }

  
            const handleCloseBankAccount = () => {
                 setBankAccountForm(false)
                 setaccountnameError("")
                 setAccountName("")
                 setAccount_Number("")
                 setIfscCode("")
                 setBankName("")
                 setDescription("")
                }

                 useEffect(() => {
                    if(state.login.selectedHostel_Id){
                    dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
                    }
                  }, [state.login.selectedHostel_Id]);
 
 useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      setBanking(state.bankingDetails.bankingList.banks)
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);

                
     useEffect(() => {
       if (state.bankingDetails.statusCodeForAddBanking === 200) {
         setAccountName("")
         setAccount_Number("")
         setIfscCode("")
         setBankName("")
         setDescription("")
         handleCloseBankAccount();
   
         dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
         setTimeout(() => {
           dispatch({ type: "CLEAR_ADD_USER_BANKING" });
         }, 1000);
       }
     }, [state.bankingDetails.statusCodeForAddBanking]);






  

  const handleBankClick = (id) => {
    setSelectedBankId(id);
  };

    useEffect(() => {
    if (banking.length > 0) {
      const defaultBank = banking.find((bank) => bank.setus_default === 2) || banking[0];
      setSelectedBankId(defaultBank.id);
    }
  }, [banking]);

  


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
  if (showFullView) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}, [showFullView]);



    return(
        <>
        <div className="col-12 d-flex flex-row">
<div className="col-lg-5 show-scroll" style={{ maxHeight: 450,
           overflowY: "auto",
           overflowX:'hidden',}}>
<p style={{ fontFamily: 'Gilroy', fontSize: 20, fontWeight: 600,}}>Inherited Global Details</p>
<p style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400,color:'rgba(99, 109, 148, 1)'}}>{`Fill the form with details you'd like to customize.`}</p>

  <div className="border p-3 mb-3 col-lg-10 " style={{borderRadius:'10px' , overflowY:'auto', }}>

    
 <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
 <div style={{ width: '100%', fontFamily: 'Gilroy', fontSize: '14px', fontWeight: 500 }}>
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px'
  }}>
    <label style={{ fontWeight: 600 }}>Contact Number</label>
    {/* <span style={{
      cursor: 'pointer',
      fontSize: '16px',
      color: '#666'
    }} onClick={handleShowContactNumberForm}>✎</span> */}
    <img  src={EditICon} onClick={handleShowContactNumberForm} style={{cursor:'pointer'}} alt="editicon"/>
  </div>

  <div style={{
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F0F3FF',
    borderRadius: '8px',
    padding: '8px 12px',
    border: '1px solid #E0E0E0',
  }}>
    <select style={{
      border: 'none',
      backgroundColor: 'transparent',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontWeight: 'inherit',
      appearance: 'none',
      paddingRight: '16px',
      cursor: 'pointer',
      outline: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg width=\'12\' height=\'8\' viewBox=\'0 0 12 8\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M1 1L6 6L11 1\' stroke=\'%23666\' stroke-width=\'2\'/%3E%3C/svg%3E")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right center',
      backgroundSize: '10px'
    }}>
      <option value="+91">+91</option>
      <option value="+1">+1</option>
      <option value="+44">+44</option>
      <option value="+971">+971</option>
    </select>

    <input
      type="tel"
      placeholder="9876543210"
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        outline: 'none',
        marginLeft: '8px',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontWeight: 'inherit',
      }}
    />
  </div>
</div>



                        </div>

                      
                    </div>
                   

                    
                  </div>
                 <Modal
  show={contactnumberform}
  onHide={handleCloseContactNumberForm}
  centered
  backdrop="static"
  className="logout-card d-flex justify-content-center align-items-center"
  dialogClassName="custom-modal-width" 
>
  <Modal.Header style={{ borderBottom: "none" }}>
    <Modal.Title
      style={{
        fontSize: "18px",
        fontFamily: "Gilroy",
        textAlign: "center",
        fontWeight: 600,
        color: "#222222",
        flex: 1,
        paddingTop:'20px'
      }}
    >
      <img src={Questionimage} alt="question" className="me-2" />
      Override Global Value?
    </Modal.Title>
  </Modal.Header>

  <Modal.Body
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy",
      color: "#646464",
      textAlign: "center",
      paddingLeft: "20px",
      paddingRight: "20px",
    }}
  >
    You’re changing this field only for this bill. 
    It won’t affect the main settings.
  </Modal.Body>

  <Modal.Footer
    style={{
      justifyContent: "center",
      borderTop: "none",
      paddingBottom:'20px'
    }}
  >
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 10,
        padding: "12px 20px",
        background: "#fff",
        color: "rgba(111, 108, 143, 1)",
        fontWeight: 600,
        fontFamily: "Gilroy",
        fontSize: "14px",
        marginRight: 10,
      }}
      className="border"
      onClick={handleCloseContactNumberForm}
    >
      Cancel
    </Button>
    <Button
      style={{
        width: 160,
        height: 52,
        borderRadius: 10,
        padding: "12px 20px",
        background: "#1E45E1",
        color: "#FFFFFF",
        fontWeight: 600,
        fontFamily: "Gilroy",
        fontSize: "14px",
      }}
    >
      Edit Anyway
    </Button>
  </Modal.Footer>
</Modal>


 <div className="border p-3 mb-3 col-lg-10" style={{borderRadius:'10px' , overflowY:'auto', }}>

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
                                    value={prefix}
                                    onChange={hanldePrefix}
                                />
        {prefix_errmsg.trim() !== "" && (
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
                                                  {prefix_errmsg}
                                                </label>
                                              </div>
                                            )}

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
                                    value={suffix}
                                    onChange={hanldeSuffix}
                                />

  {suffix_errmsg.trim() !== "" && (
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
                                                  {suffix_errmsg}
                                                </label>
                                              </div>
                                            )}
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
                                value={`${prefix}-${suffix}`}
                                readOnly
                           
                            />

                            
                        </Form.Group>
                    </div>
                  </div>

                   <div className="border p-3 mb-3 col-lg-10 " style={{borderRadius:'10px' , overflowY:'auto', }}>

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
                                    value={tax}
                                    onChange={handleTaxChange}
                                />

                                {tax_errmsg.trim() !== "" && (
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
                                                  {tax_errmsg}
                                                </label>
                                              </div>
                                            )}
                          </Form.Group>
                        </div>

                      
                    </div>
                   

                    
                  </div>

                 <div
  style={{
    border: '1px solid #ddd',
    padding: '16px',
    marginBottom: '24px',
    borderRadius: '10px',
    fontFamily: 'Gilroy',
  }}
  className="col-lg-10"
>
  {/* Fixed Header */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    }}
  >
    <p
      style={{
        fontSize: 18,
        color: 'rgba(34, 34, 34, 1)',
        fontWeight: 400,
        whiteSpace: 'nowrap',
        margin: 0,
      }}
    >
      Account Details
    </p>
    {banking && banking.length > 0 && (
      <button
        onClick={handleAddBankAccount}
        style={{
          fontSize: 14,
          backgroundColor: '#1E45E1',
          color: 'white',
          fontWeight: 400,
          borderRadius: 12,
          width: 106,
          height: 35,
          border: '1px solid #1E45E1',
          fontFamily: 'Gilroy',
        }}
      >
        Add
      </button>
    )}
  </div>

  <hr />

  <div style={{ maxHeight: 160, overflowY: 'auto' }} className="show-scroll">
    {banking && banking.length > 0 ? (
      banking.map((bank) => (
        <div key={bank.id} style={{ marginBottom: 15, cursor: 'pointer' }} onClick={() => handleBankClick(bank.id)}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="radio"
              name="bank"
              checked={selectedBankId === bank.id}
              onChange={() => handleBankClick(bank.id)}
              style={{ accentColor: '#1E45E1', marginRight: 10, height: 16, width: 16 }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  backgroundColor: '#1E45E1',
                  color: 'white',
                  borderRadius: '50%',
                  width: 30,
                  height: 30,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img src={BankICon} alt="bankicon" height={17} width={17} className="mb-1" />
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{bank.bank_name || 'Bank Name'}</div>
                <div style={{ fontSize: 13, color: 'grey' }}>
                  {bank.benificiary_name || 'Beneficiary'} / Savings A/C
                </div>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ fontSize: 14, fontWeight: 400, color: 'grey' }}>No Bank accounts are there!</p>
        <button
          onClick={handleAddBankAccount}
          style={{
            fontSize: 14,
            backgroundColor: '#1E45E1',
            color: 'white',
            fontWeight: 400,
            borderRadius: 12,
            width: 106,
            height: 35,
            border: '1px solid #1E45E1',
            fontFamily: 'Gilroy',
          }}
        >
          Add
        </button>
      </div>
    )}
  </div>

  {/* Validation Error */}
  {/* {!selectedBankId && bankid_Error.trim() !== '' && (
    <div style={{ display: 'flex', alignItems: 'center', paddingTop: 8 }}>
      <MdError style={{ color: 'red', marginRight: 5, fontSize: 14 }} />
      <label
        style={{
          color: 'red',
          fontSize: 12,
          fontWeight: 500,
        }}
      >
        {bankid_Error}
      </label>
    </div>
  )} */}
</div>


 <div className="border p-3 mb-3 col-lg-10 " style={{borderRadius:'10px' , overflowY:'auto', }}>

      <div>
        <p    style={{ fontFamily: 'Gilroy' , color:'rgba(34, 34, 34, 1)', fontSize: 14, fontWeight: 400,  fontStyle: 'normal', lineHeight: 'normal' }}>
         Upload QR</p>
        <hr></hr>
      </div>

 <div className='d-flex row '>
                        <div className='col-lg-12 col-md-12 col-sm-11 col-xs-11'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label
                                    style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 400, color:'rgba(34, 34, 34, 1)', fontStyle: 'normal', lineHeight: 'normal' }}
                                >
                                    Valid UPI QR Code for Payment Easy
                                </Form.Label>
                                <Form.Control
                                    style={{ padding: '10px', marginTop: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 400 }}
                                    type="text"
                                    placeholder="12%"
                                    value={tax}
                                    onChange={handleTaxChange}
                                />

                                {tax_errmsg.trim() !== "" && (
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
                                                  {tax_errmsg}
                                                </label>
                                              </div>
                                            )}
                          </Form.Group>
                        </div>

                      
                    </div>
                   

                    
                  </div>


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

      <RgbaColorPicker color={color} onChange={handleColorChange}style={{ width: "100%", }} />

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
<div className="receipt-container border ps-4 pe-4 pb-4 pt-4 col-lg-7" ref={cardRef} style={{ marginTop:'20px', borderRadius:'8px' ,}} >
       
       <div className="d-flex justify-content-end pe-2">
  <button
    className="btn btn-sm btn-outline-primary"
    onClick={() => setShowFullView(true)}
  >
    🔍 Full View
  </button>
</div>

       <div   ref={innerScrollRef}
         className="border shadow show-scroll col-lg-12 justify-content-center"
         style={{
           maxHeight: 430,
           overflowY: "auto",
           overflowX:'hidden',
           borderBottomLeftRadius: "13px",
           borderBottomRightRadius: "13px",
         }}>
                       
       <div  className=" text-white  p-4 position-relative" style={{ height:100,   
        background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` ,}}>
         <div className="d-flex justify-content-between align-items-center">
         <div className="d-flex gap-2 mb-3 mb-lg-0">
             <img src={ Logo} alt="logo" style={{ height: 40, width: 40 }} />
             <div>
               <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
               <div style={{ fontSize: 12, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
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
       
       
       <div className="container bg-white rounded-bottom  position-relative" style={{width:"100%",borderTopLeftRadius:'20px'}}>
         <div className="text-center pt-2 pb-1">
           <h5 style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>
           Security Deposit Invoice
            </h5>
         </div>
       
       
         <div className="row px-4 mt-3">
           <div className="col-md-6 mb-3">
             <p className="  mb-1" style={{color:'rgba(48, 80, 210, 1)' , fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill to:</p>
             <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)',}}>Mr. <span className="ms-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)',}}> Muthuraja M</span></p>
                <p className="mb-1"><img src={Dial} alt="mob" />
                                    <span className="ms-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1)',}}> 
                                      +91 85647 85332
                                                     </span>
                                      </p>
             <p className="mb-1 me-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)',}}><img className="me-1" src={Room} alt="room" style={{height:20 , width:20}}/> No 103 -02</p>
             <div className="d-flex" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)' }}>
         
         <div className="me-2">
           <img src={Locat} alt="local" />
         </div>
       
         <div>
          <p  style={{ fontSize: '11px',fontFamily: 'Gilroy',}}>
            9, 8th Main Rd, Someshwara Nagar, <br></br>
             Bengaluru, Karnataka 560011
          </p>
     
         </div>
       
       </div>
       
       
           </div>
           <div className="col-md-6 mb-3 ps-5 ">
             <div className="row">
             
               <div className="col-6 text-muted  text-end mt-1"  style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Invoice :</div>
               <div className="col-6 text-start mt-1"   style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',   whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>#{`${prefix}-${suffix}`}</div>
             
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>Invoice Date :</div>
               <div className="col-6  text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)',    whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>31 March 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Due date :</div>
               <div className="col-6 text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>31 March 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Joining date :</div>
               <div className="col-6 text-muted  text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>05 Jan 2024</div>
       
               <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Rent Period :</div>
               <div className="col-6  text-muted text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))',}}>Mar - June 2024</div>
       

             </div>
           </div>
         </div>
       
        
         <div className="px-4 pb-3">
         <div className="table-responsive">
           <table className="table text-center">
             <thead
               style={{
                background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                 color: "white",
               }}
             >
               <tr>
                 <th
                   style={{
                     borderTopLeftRadius: "12px",
                     borderBottomLeftRadius: "12px",
                     color: "rgba(255, 255, 255, 1)",
                     fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600
       
                   }}
                 >
                   S.NO
                 </th>
                 <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600 }}>Inv No</th>
                 <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600}}>Description</th>
                 <th
                   style={{
                     borderTopRightRadius: "12px",
                     borderBottomRightRadius: "12px",
                     color: "rgba(255, 255, 255, 1)",
                     fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600
                   }}
                 >
                   Amount / INR
                 </th>
               </tr>
             </thead>
             <tbody>
      
           <tr  style={{ borderBottom: "1px solid #dee2e6" , color: 'rgba(188, 188, 188, 1))' }}>
             <td style={{color: 'rgba(188, 188, 188, 1))'}}>1</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>#324515</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Room Rental</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Rs. 8000</td>
           </tr>
             <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
             <td>2</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>#324515</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Electricity</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Rs. 950</td>
           </tr>
        
       </tbody>
       
           </table>
         </div>
       
         <div className="d-flex flex-wrap align-items-start mt-1">
        
       
         <div className="mt-3 ms-auto" style={{ minWidth: '200px' }}>
           <div className="d-flex justify-content-between py-1">
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax</span>
             <span className="me-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 1150.00</span>
           </div>
           <div className="d-flex justify-content-between py-1">
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 8950.00 </span>
           </div>
           <div className="d-flex justify-content-between fw-bold py-2">
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs: 10,100.00</span>
           </div>
         </div>
       </div>
       
       </div>
       
       
        
       
       </div>
       <div className="px-4" style={{ marginTop: 20 }}>
         <div className="row">
           <div className="col-md-6 mb-3">
             <h6  style={{
               fontSize: '11px',
               fontFamily: 'Gilroy',
               fontWeight: 700,
               color: 'rgba(30, 69, 225, 1)',
               letterSpacing:'1px'
               
             }} 
             >ACCOUNT DETAILS</h6>
             <p className="mb-1" 
            style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
             Account No : 87542310984</p>
             <p className="mb-1"   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
               IFSC Code : SBIN007195</p>
             <p className="mb-1"   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
               Bank Name: State Bank of India</p>
             <p   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
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
            style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(44, 44, 44, 1)', }}
             >Authorized Signature</p>
         </div>
       </div>
       
       
       
       <div className="ms-5 me-5">
         <div
           className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
           style={{
             background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
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

       {showFullView && (
  <div
    className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      zIndex: 9999,
      overflowY: 'auto',
      marginLeft:'10%'
    }}
  >
    <div
      className="bg-white  rounded shadow"
      style={{
        width: '100%',
        maxWidth: '900px',
        minHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        borderRadius: '16px',
      }}
    >
     <div
  style={{
    backgroundColor: '#333',
    color: 'white',
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    <span>1 / 1</span>
    <span>|</span>
    <div className="d-flex align-items-center" style={{ gap: '4px' }}>
      <button className="btn btn-sm btn-light">−</button>
      <span style={{ fontWeight: 'bold' }}>100%</span>
      <button className="btn btn-sm btn-light">+</button>
    </div>
    <span>|</span>
    <button className="btn btn-sm btn-light">🖥️</button>
    <button className="btn btn-sm btn-light">↻</button>
  </div>

  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <button className="btn btn-sm btn-light">⬇</button>
    <button className="btn btn-sm btn-light">🖨️</button>
    <button
      className="btn btn-sm btn-light"
      onClick={() => setShowFullView(false)}
    >
      ❌
    </button>
  </div>
</div>


      <div><div className="receipt-container border ps-4 pe-4 pb-4 pt-4 col-lg-9" ref={cardRef} style={{ marginTop:'20px', borderRadius:'8px' ,marginLeft:'10%'}} >
       
       
        <div   ref={innerScrollRef}
         className="border shadow show-scroll col-lg-11 justify-content-center"
         style={{
           maxHeight: 430,
           overflowY: "auto",
           overflowX:'hidden',
           borderBottomLeftRadius: "13px",
           borderBottomRightRadius: "13px",
         }}>
                       
       <div  className=" text-white  p-4 position-relative" style={{ height:100,
           background: useGradient
            ? defaultGradient
            : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})` ,}}>
         <div className="d-flex justify-content-between align-items-center">
         <div className="d-flex gap-2 mb-3 mb-lg-0">
             <img src={ Logo} alt="logo" style={{ height: 40, width: 40 }} />
             <div>
               <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>Smartstay</div>
               <div style={{ fontSize: 12, fontWeight: 300, fontFamily: "Gilroy", marginTop:'15px', marginLeft:'-15px' }}>Meet All Your Needs</div>
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
       
       
       <div className="container bg-white rounded-bottom  position-relative" style={{width:"100%",borderTopLeftRadius:'20px'}}>
         <div className="text-center pt-2 pb-1">
           <h5 style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',}}>
            Security Deposit  Invoice
            </h5>
         </div>
       
       
         <div className="row px-4 mt-3">
           <div className="col-md-6 mb-3">
             <p className="  mb-1" style={{color:'rgba(48, 80, 210, 1)' , fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400,fontStyle:'italic'}}>Bill to:</p>
             <p className="mb-1 me-1" style={{ fontSize: '13px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)',}}>Mr. <span className="ms-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)',}}> Muthuraja M</span></p>
                <p className="mb-1"><img src={Dial} alt="mob" />
                                    <span className="ms-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(188, 188, 188, 1)',}}> 
                                      +91 85647 85332
                                                     </span>
                                      </p>
             <p className="mb-1 me-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)',}}><img className="me-1" src={Room} alt="room" style={{height:20 , width:20}}/> No 103 -02</p>
             <div className="d-flex" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(188, 188, 188, 1)' }}>
         
         <div className="me-2">
           <img src={Locat} alt="local" />
         </div>
       
         <div>
          <p  style={{ fontSize: '11px',fontFamily: 'Gilroy',}}>
            9, 8th Main Rd, Someshwara Nagar, <br></br>
             Bengaluru, Karnataka 560011
          </p>
     
         </div>
       
       </div>
       
       
           </div>
           <div className="col-md-6 mb-3 ps-5 ">
             <div className="row">
             
               <div className="col-6 text-muted  text-end mt-1"  style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Invoice :</div>
               <div className="col-6 text-start mt-1"   style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)',   whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>#{`${prefix}-${suffix}`}</div>
             
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>Invoice Date :</div>
               <div className="col-6  text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)',    whiteSpace: 'nowrap' , overflow: "hidden", textOverflow: "ellipsis"}}>31 March 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Due date :</div>
               <div className="col-6 text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>31 March 2024</div>
       
               <div className="col-6 text-muted  text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>Joining date :</div>
               <div className="col-6 text-muted  text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))',   whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis"}}>05 Jan 2024</div>
       
               <div className="col-6 text-muted text-end mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 400, color: 'rgba(65, 65, 65, 1)',}}>Rent Period :</div>
               <div className="col-6  text-muted text-start mt-1" style={{ fontSize: '11px',fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(188, 188, 188, 1))',}}>Mar - June 2024</div>
       

             </div>
           </div>
         </div>
       
        
         <div className="px-4 pb-3">
         <div className="table-responsive">
           <table className="table text-center">
             <thead
               style={{
                background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                 color: "white",
               }}
             >
               <tr>
                 <th
                   style={{
                     borderTopLeftRadius: "12px",
                     borderBottomLeftRadius: "12px",
                     color: "rgba(255, 255, 255, 1)",
                     fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600
       
                   }}
                 >
                   S.NO
                 </th>
                 <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600 }}>Inv No</th>
                 <th style={{  color: "rgba(255, 255, 255, 1)", fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600}}>Description</th>
                 <th
                   style={{
                     borderTopRightRadius: "12px",
                     borderBottomRightRadius: "12px",
                     color: "rgba(255, 255, 255, 1)",
                     fontSize:'11px' , fontFamily:'Gilroy', fontWeight:600
                   }}
                 >
                   Amount / INR
                 </th>
               </tr>
             </thead>
             <tbody>
      
           <tr  style={{ borderBottom: "1px solid #dee2e6" , color: 'rgba(188, 188, 188, 1))' }}>
             <td style={{color: 'rgba(188, 188, 188, 1))'}}>1</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>#324515</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Room Rental</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Rs. 8000</td>
           </tr>
             <tr  style={{ borderBottom: "1px solid #dee2e6" }}>
             <td>2</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>#324515</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Electricity</td>
             <td style={{ fontSize:'11px' , fontFamily:'Gilroy', fontWeight:500 , color: 'rgba(188, 188, 188, 1))'}}>Rs. 950</td>
           </tr>
        
       </tbody>
       
           </table>
         </div>
       
         <div className="d-flex flex-wrap align-items-start mt-1">
       
       
         <div className="mt-3 ms-auto" style={{ minWidth: '200px' }}>
           <div className="d-flex justify-content-between py-1">
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Tax</span>
             <span className="me-1" style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 1150.00</span>
           </div>
           <div className="d-flex justify-content-between py-1">
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Sub Total</span>
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>Rs: 8950.00 </span>
           </div>
           <div className="d-flex justify-content-between fw-bold py-2">
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Total</span>
             <span  style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 600, color: 'rgba(23, 23, 23, 1)', }}>Rs: 10,100.00</span>
           </div>
         </div>
       </div>
       
       </div>
       
       
        
       
       </div>
       <div className="px-4" style={{ marginTop: 20 }}>
         <div className="row">
           <div className="col-md-6 mb-3">
             <h6  style={{
               fontSize: '11px',
               fontFamily: 'Gilroy',
               fontWeight: 700,
               color: 'rgba(30, 69, 225, 1)',
               letterSpacing:'1px'
               
             }} 
             >ACCOUNT DETAILS</h6>
             <p className="mb-1" 
            style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
             Account No : 87542310984</p>
             <p className="mb-1"   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
               IFSC Code : SBIN007195</p>
             <p className="mb-1"   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
               Bank Name: State Bank of India</p>
             <p   style={{ fontSize: '11px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(23, 23, 23, 1)', }}>
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
            style={{ fontSize: '13px', fontFamily: 'Gilroy', fontWeight: 500, color: 'rgba(44, 44, 44, 1)', }}
             >Authorized Signature</p>
         </div>
       </div>
       
       
       
       <div className="ms-5 me-5">
         <div
           className="text-white text-center py-2 rounded-bottom d-flex justify-content-center gap-4"
           style={{
             background: useGradient ? defaultGradient : `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
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
       
       </div></div>
    </div>
  </div>
)}

        </div>

         {bankaccountform && (
                                                        <div
                                                          className="modal show"
                                                          style={{
                                                            display: "block",
                                                            position: "initial",
                                                            fontFamily: "Gilroy,sans-serif",
                                                          }}
                                                        >
                                                          <Modal
                                                            show={bankaccountform}
                                                            onHide={handleCloseBankAccount}
                                                            centered
                                                            backdrop="static"
                                                            dialogClassName="custom-modal"
                                                          >
                                                            <Modal.Dialog
                                                              style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
                                                              className="m-0 p-0"
                                                            >
                                                              <div>
                                                                <Modal.Header
                                                                  style={{ position: "relative" }}
                                                                >
                                                                  <div
                                                                    style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}
                                                                  >
                                                                 
                                                
                                                                  Banking Details
                                                
                                                
                                                                  </div>
                                                                 
                                                                  <CloseCircle size="24" color="#000" onClick={handleCloseBankAccount} 
                                                            style={{ cursor: 'pointer' }}/>
                                                
                                                                 
                                                                </Modal.Header>
                                                              </div>
                                                              <Modal.Body>
                                                
                                                                <div className="row ">
                                                
                                                
                                                
          <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label
                                  style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                                 Beneficiary Name   {" "}
                                <span style={{  color: "red",  fontSize: "20px",}}>  {" "} *{" "} </span>
                                </Form.Label>
                                <Form.Control
                                  style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                                  type="text"
                                  placeholder="Enter Beneficiary Name"
                                  value={accountName}
                                  onChange={handleAccountName}
                                />
         {accountNameError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{fontSize:"14",marginRight:"5px"}}/>
                          <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{accountNameError}</span>
                        </div>
                      )}
                              </Form.Group>
        
                           
                            </div>
        
                              <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
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
                                  value={bank_name}
                                  onChange={handleBankNameChange}
                                />
        
                                  
                              </Form.Group>
        
                           
                            </div>
        
                                                
                          <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1" >
                                <Form.Label
                                  style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                                  Account Number
                                </Form.Label>
                                <Form.Control
                                  style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                                  type="text"
                                  placeholder="Enter Account Number"
                                  value={account_number}
                                  onChange={handleAccountNumberChange}
         
                                />
        
                              
                              </Form.Group>
        
                           
                            </div>
        
        
                               <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
                                <Form.Label
                                  style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                                  IFSC Code
                                </Form.Label> 
                                <Form.Control
                                  style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                                  type="text"
                                  placeholder="Enter IFSC Code"
                                  value={ifsccode}
                                 onChange={handleIfscCodeChange}
                                  
                                />
        
                                  
                              </Form.Group>
        
                              
                            </div>
        
        
                          
                           <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                              <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                              >
                                <Form.Label
                                  style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 400, color: "rgba(34, 34, 34, 1)", fontStyle: "normal", lineHeight: "normal" }}>
                                  Description
                                </Form.Label>
                                <Form.Control
                                  style={{ padding: "10px", marginTop: "5px", fontSize: 16, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 400 }}
                                  type="text"
                                  placeholder="Enter Description"
                                  value={description}
                                  onChange={(e) => handleDescription(e)}
                                />
        
                                
                              </Form.Group>
        
                           
                            </div>
            
                       
        
        
                                                
                                                
                                                
                                                
                                                               
                                                
                                             
                                                
                                                
                                                
                                           
                                                                </div>
                                                              </Modal.Body>
                                                
                                                
                                                
                                                
                                                              <Modal.Footer style={{ border: "none" }}>
                                                                
                                                                <Button
                                                                  className="w-100"
                                                                  style={{
                                                                    backgroundColor: "#1E45E1",
                                                                    fontWeight: 500,
                                                                    height: 50,
                                                                    borderRadius: 12,
                                                                    fontSize: 16,
                                                                    fontFamily: "Gilroy",
                                                                    fontStyle: "normal",
                                                                    lineHeight: "normal",
                                                                    marginTop:"-15px"
                                                                  }}
                                                               onClick={handleSubmitBank}
                                                                >
                                                                  Save
                                                                 
                                                                </Button>
                                                              </Modal.Footer>
                                                            </Modal.Dialog>
                                                          </Modal>
                                                        </div>
                                                      )}
        </>
    )
   }
   export default SecurityDepositInvoiceTemplate;