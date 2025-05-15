/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { FaCalendarAlt } from "react-icons/fa";
import { FaCheck } from 'react-icons/fa';
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import InvoiceSettingsList from "./InvoicesettingsList";
import leftarrow from "../Assets/Images/arrow-left.png"
import Modal from "react-bootstrap/Modal";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import Billsimage from '../Assets/Images/bill_settings.png';
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import Select from "react-select";
import PropTypes from "prop-types";
import {CloseCircle} from "iconsax-react";
import './SettingInvoice.css';
import   "./SettingsBills.css";

function SettingsBills({ hostelid }) {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);

//   const [selectedDate, setSelectedDate] = useState(null);

  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoicedueDate, setInvoiceDueDate] = useState('');

  const [selectedDate, setSelectedDate] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const dates = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // close after selection
  };

  const [prefix, setPrefix] = useState("");
  const [startNumber, setStartNumber] = useState("");

  const [prefixerrormsg, setPrefixErrmsg] = useState("");
  const [suffixerrormsg, setSuffixfixErrmsg] = useState("");
  const [totalErrormsg, setTotalErrmsg] = useState("");

  const [showform, setShowForm] = useState(false);
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [duedateerrmsg, setDueDateErrmsg] = useState("");
  const [recurringform, setRecurringForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const initialValuesRef = useRef({});

  const [calculatedstartdate, setCalculatedstartdate] = useState("");
  const [calculatedenddate, setCalculatedEnddate] = useState("");
  const [calculatedstartdateerrmsg, setCalculatedstartdateErrmsg] = useState("");
  const [calculatedenddateerrmsg, setCalculatedEnddateErrMsg] = useState("");
  const [every_recurr, setEvery_Recurr] = useState("");
  const [InvoiceList, setInvoiceList] = useState([]);
  const [formFilled, setFormFilled] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 

  const [isOn, setIsOn] = useState(true);

  const handleToggle = () => setIsOn(!isOn);


 
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
    dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    setLoading(true)
    }
  }, [state.login.selectedHostel_Id]);

  console.log("state.UsersList.hotelDetailsinPg", state.UsersList.hotelDetailsinPg)
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



  // const handlePrefix = (e) => {
  //   setTotalErrmsg("");
  //   setPrefix(e.target.value);
  //   setSuffixfixErrmsg("");
  //   if (!e.target.value) {
  //     setPrefixErrmsg("Please Enter Prefix");
  //   } else {
  //     setPrefixErrmsg("");
  //   }
  // };
  const handlePrefix = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z]*$/.test(inputValue)) {
      setTotalErrmsg("");
      setPrefix(inputValue);
      setSuffixfixErrmsg("");
  
      if (!inputValue) {
        setPrefixErrmsg("Please Enter Prefix");
      } else {
        setPrefixErrmsg("");
      }
    }
  };
  

  const handleSuffix = (e) => {
    setTotalErrmsg("");
    setSuffixfixErrmsg("");
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setStartNumber(value);
    }
    if (!e.target.value) {
      setSuffixfixErrmsg("Please Enter suffix");
    } else {
      setSuffixfixErrmsg("");
    }
  };

  const handleEdit = (item) => {
    console.log("item", item);
    setTotalErrmsg("");
    setPrefix(item.prefix);
    setStartNumber(item.suffix);
    setInvoiceDate(item.inv_date)
    setInvoiceDueDate(item.due_date)

    setEdit(true);
    setShowForm(true);

    // Save initial values for editing
    initialValuesRef.current = {
      editprefix: item.prefix,
      editstartnumber: item.suffix,
      editinvoicedate: item.inv_date,
      editduedate : item.due_date
    };
  };



 

  const handleInvoiceSettings = () => {
    const isPrefixValid = prefix !== undefined && prefix !== null && prefix !== "";
    const isStartNumberValid = startNumber !== undefined && startNumber !== null && startNumber !== "";
    // const isSelectedImageValid = selectedImage !== null;
  
    if (!isPrefixValid || !isStartNumberValid || !invoiceDate || !invoicedueDate) {
      if (!isPrefixValid) {
        setPrefixErrmsg("Please enter Prefix");
      }
      if (!isStartNumberValid) {
        setSuffixfixErrmsg("Please Enter Suffix");
      }
      if (!invoiceDate) {
        setInvoiceDateErrmsg("Please Select Date");
        
      }
      if (!invoicedueDate) {
        setDueDateErrmsg("Please Select Date");
      }
      return;
    }
  
    // Check if any changes were made
    if (
      edit && 
      prefix === initialValuesRef.current.editprefix &&
      startNumber === initialValuesRef.current.editstartnumber &&
      invoiceDate === initialValuesRef.current.editinvoicedate &&
      invoicedueDate === initialValuesRef.current.editduedate 
    ) {
      setTotalErrmsg("No Changes Detected");
      return;
    }
  
    if (isPrefixValid && isStartNumberValid && state.login.selectedHostel_Id && invoiceDate && invoicedueDate) {
  
      dispatch({
        type: "INVOICESETTINGS",
        payload: {
          hostel_Id: state.login.selectedHostel_Id,
          prefix: prefix,
          suffix: startNumber,
          inv_date: invoiceDate,
          due_date: invoicedueDate
        }
      });
  
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
  
      setShowForm(false);
      setPrefix("");
      setStartNumber("");
      setSelectedDate("");
      setInvoiceDueDate("");
      setTotalErrmsg("");
    } else {
      setSelectedDate("");
      setInvoiceDueDate("");
    }
  };
  



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




  useEffect(() => {
    if (!state.UsersList?.hotelDetailsinPg) return; 
  
    const filteredHostels = state.UsersList.hotelDetailsinPg.filter(
      (item) => item.id === Number(hostelid)
    );
  
    if (filteredHostels.length > 0) {
      const recureEnable = filteredHostels[0]?.recure === 1;
      setIsChecked(recureEnable);
      console.log("recure", filteredHostels[0]?.recure);
  
      // const profileURL = filteredHostels[0]?.profile;
      // setLogo(profileURL);
    } 
    // else {
    //   setLogo(Logo);
    // }
  }, [state.UsersList?.hotelDetailsinPg, hostelid]); 

  
  


  useEffect(() => {
  if (state.UsersList?.hotelDetailsinPg) {
    setTimeout(() => {
      const filteredHostels = state.UsersList.hotelDetailsinPg.filter(
        (item) => item.id === Number(hostelid)
      );

      if (filteredHostels.length > 0) {
        setIsChecked(filteredHostels[0]?.recure === 1);
        // setLogo(filteredHostels[0]?.profile);
      } 
      // else {
      //   setLogo(Logo);
      // }
    }, 500); 
  }
}, [state.UsersList?.hotelDetailsinPg, hostelid]);

  

  



 
  const handlechangeEvery = (e) => {
    setEvery_Recurr(e.target.value)
  }

  const handleSaveRecurring = () => {

    if (!calculatedstartdate || !calculatedenddate) {

      if (!calculatedstartdate) {
        setCalculatedstartdateErrmsg('Please Select Date')
      }
      if (!calculatedenddate) {
        setCalculatedEnddateErrMsg('Please Select Date')
      }
      return;
    }

    dispatch({
      type: "SETTINGSADDRECURRING",
      payload: { hostel_id: Number(state.login.selectedHostel_Id), type: 'invoice', recure: 1, start_date: Number(calculatedstartdate), end_date: Number(calculatedenddate) }
    });
    setRecurringForm(false);
  }


  useEffect(() => {
    if (state.InvoiceList.settingsaddRecurringStatusCode === 200) {
      setCalculatedstartdate("")
      setCalculatedEnddate("")
      dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING' })
      }, 100)
    }
  }, [state.InvoiceList.settingsaddRecurringStatusCode])


  const [showPopup, setShowPopup] = useState(false);
  const handleShow = () => {

    if (!state.login.selectedHostel_Id) {
      setShowPopup(true);
      return;
    }
    setShowForm(true);
    setEdit(false);
    console.log("Form is now showing...");
  };


  const handleCloseForm = () => {
    setShowForm(false);
    setPrefixErrmsg('');
    setSuffixfixErrmsg('')
    setInvoiceDateErrmsg('')
    setDueDateErrmsg('')
    setTotalErrmsg("");
    setPrefix('')
    setStartNumber('')
    setSelectedDate('')
    setInvoiceDueDate('')
  };

  const handleRecurringFormShow = () => {
    setRecurringForm(true);

  };

  // const handleCloseRecurringForm = () => {
  //   setRecurringForm(false);
  //   setCalculatedstartdateErrmsg('')
  //   setCalculatedEnddateErrMsg('')
  //   setCalculatedstartdate('')
  //   setCalculatedEnddate('')
  // };

  

  const handleCloseRecurringForm = () => {
    // Close form WITHOUT calling API
    setRecurringForm(false);
    setCalculatedstartdateErrmsg('')
    setCalculatedEnddateErrMsg('')
    setCalculatedstartdate('')
    setCalculatedEnddate('')

    if (!formFilled) {
        setIsChecked(false); // Reset switch only if no data entered
    }

    setFormFilled(false);
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
  console.log("UsersListSTATUSCODE", state.UsersList.noAllHosteListStatusCode);


  // useEffect(() => {
  //   if (InvoiceList.length === 0) {
  //   }
  //   else if (InvoiceList && InvoiceList?.every(
  //     (item) =>
  //       (!item.prefix || item.prefix === 'null' || item.prefix === null || item.prefix === 0) &&
  //       (!item.suffix || item.suffix === 'null' || item.suffix === null || item.suffix === 0)
  //   )) {
  //     setLoading(false)
  //   }
  // }, [InvoiceList])
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
  


  console.log("InvoiceList:", InvoiceList);

  // start date change
  const options = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleInvoiceStartDateChange = (selectedOption) => {
    setTotalErrmsg("");
    setInvoiceDate(selectedOption?.value);
    setInvoiceDateErrmsg("")
  };
  const handleInvoiceEndDateChange = (selectedOption) => {
    setTotalErrmsg("");
    setInvoiceDueDate(selectedOption?.value);
  };

  const handleStartDateChange = (selectedOption) => {
    setCalculatedstartdate(selectedOption?.value);
    setCalculatedstartdateErrmsg("")
  };
  const handleEndDateChange = (selectedOption) => {
    setCalculatedEnddate(selectedOption?.value);
    setCalculatedEnddateErrMsg("")
  };


  const labelStyle = {
    color: "#939393",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Gilroy",
  };
  
  const valueStyle = {
    color: "#222222",
    fontSize: 16,
    fontWeight: 600,
    fontFamily: "Gilroy",
  };


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
  className="d-flex flex-column flex-md-row justify-content-between align-items-center"
        style={{
        // display: "flex", flexDirection: "row", justifyContent: "space-between", 
        position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
        // height: 83,
        whiteSpace: "nowrap",
        marginTop:-2
      }}>
          <div 
    className="w-100 d-flex justify-content-center justify-content-md-start mt-3">
        <h3 style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600,
          whiteSpace: "nowrap",
         }}>Bills</h3>

        </div>
 

      </div>

      {showPopup && (
        <div className="d-flex flex-wrap">
          <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
            Please add a hostel before adding Invoice information.
          </p>
        </div>)}
        {showform ? (
            <div>
                 <div className="row mt-1 col-lg-10 ">
                  <div className="d-flex row ">
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
                                      onClick={handleCloseForm}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <span
                                      style={{
                                        fontWeight: 500,
                                        fontSize: "18px",
                                        // marginLeft: 15,
                                        fontFamily: "Gilroy",
                                        paddingLeft: "10px"
                                      }}
                                    >
                                      Recurring Bill Setting
                                    </span>{" "}
                                  </div>
                                </div>

                                <div className="border p-3" style={{borderRadius:'10px'}}>

                                    <p style={{ fontFamily: "Gilroy", fontSize: 18, color: "#222", fontWeight: 500,whiteSpace: "nowrap",}}>Add Recurring Event</p>
                                    <hr></hr>

                    <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 500, color: "#000", fontStyle: "normal", lineHeight: "normal" }}>
                          Name
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>
                        <Form.Control
                          style={{ padding: "10px", marginTop: "10px", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 500 }}
                          type="text"
                          placeholder="prefix"
                          value={prefix}
                          onChange={(e) => handlePrefix(e)}
                        // readOnly
                        // style={inputStyle}
                        />
                      </Form.Group>

                      {prefixerrormsg.trim() !== "" && (
                        <div>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "red",
                              fontFamily:"Gilroy",
                              fontWeight:500
                              
                            }}
                          >
                            {prefixerrormsg !== " " && (
                              <MdError
                                style={{ fontSize: "14px", color: "red", marginBottom: "3px" }}
                              />
                            )}{" "}
                            {prefixerrormsg}
                          </p>
                        </div>
                      )}
                    </div>


                    <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 500, color: "#000", fontStyle: "normal", lineHeight: "normal", }}
                        >
                          Billing Frequency
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>
                        <Form.Control
                          style={{
                            padding: "10px",
                            marginTop: "10px",
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            lineHeight: "18.83px",
                            fontWeight: 500,
                          }}
                          type="text"
                          placeholder="suffix"
                          value={startNumber}
                          onChange={(e) => handleSuffix(e)}
                        // readOnly
                        />



                        {suffixerrormsg.trim() !== "" && (
                          <div>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "red",
                                marginTop: "3px",
                                fontFamily:"Gilroy",
                                fontWeight:500
                              }}
                            >
                              {suffixerrormsg !== " " && (
                                <MdError
                                  style={{ fontSize: "14px", color: "red", marginBottom: "3px" }}
                                />
                              )}{" "}
                              {suffixerrormsg}
                            </p>
                          </div>
                        )}
                      </Form.Group>
                    </div>
                 
                    <div>
                        <p style={{  fontFamily: "Gilroy",  fontSize: 14,  fontWeight: 500,  color: "#000",  fontStyle: "normal", lineHeight: "normal",}}>
                            Calculation Date</p>
                    </div>   

                    <div style={{ position: "relative" }}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="btn btn-light"
        style={{ display: "flex", alignItems: "center", gap: "8px" }}
      >
        <FaCalendarAlt />
        {selectedDate ? `Selected: ${selectedDate}` : "Select a date"}
      </button>

      {/* Calendar Popup */}
      {isCalendarOpen && (
        <div className="date-picker-container" style={{ position: "absolute", zIndex: 10, top: "100%", marginTop: "8px" }}>
          <h3>Select date</h3>

          <div className="date-grid">
            {dates.map((date, index) => (
              <div
                key={index}
                className={`date-cell ${date === selectedDate ? "selected" : ""}`}
                onClick={() => handleDateClick(date)}
              >
                {date}
              </div>
            ))}
          </div>

          <div className="date-picker-footer">
            <span className="startmonth">Start of the month</span>
            <span className="Endmonth">Date of joining</span>
          </div>
        </div>
      )}
    </div>


    <div className="toggle-wrapper" onClick={handleToggle}>
      <span className={`toggle-label ${isOn ? 'active' : ''}`}>
        {isOn ? 'On' : 'Off'}
      </span>
      <div className={`toggle-switch ${isOn ? 'on' : 'off'}`}>
        <div className="toggle-thumb">
          {isOn && <FaCheck size={10} color="#1E1E1E" />}
        </div>
      </div>
    </div>
                 

                  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#000",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        Preview
                      </Form.Label>
                      <Form.Control
                        style={{
                          padding: "10px",
                          marginTop: "10px",
                          backgroundColor: "#E7F1FF",
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          lineHeight: "18.83px",
                          fontWeight: 500,
                        }}
                        type="text"
                        placeholder="preview"
                        readOnly
                        value={prefix + startNumber}
                      // readOnly
                      />
                    </Form.Group>
                  </div>

               


                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation Start Date Will Be
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleInvoiceStartDateChange}
                        value={options.find((option) => option.value === invoiceDate)}
                        placeholder="Select"
                        classNamePrefix="custom" 
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            overflowY: "auto",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                            cursor:"pointer"
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {invoicedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1 ">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {invoicedateerrmsg}
                        </label>
                      </div>
                    )}
                     
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation End Date Will Be 
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleInvoiceEndDateChange}
                        value={options.find((option) => option.value === invoicedueDate)}
                        placeholder="Select"
                        classNamePrefix="custom" // Prefix for custom styles
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            overflowY: "auto",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                             cursor:"pointer"
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {/* {duedateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: "15px", color: "red", marginTop: "-9px" }}
                        >
                          {duedateerrmsg !== " " && (
                            <MdError style={{ fontSize: "13px", color: "red", marginBottom: "3px" }} />
                          )}{" "}
                          {duedateerrmsg}
                        </p>
                      </div>
                    )} */}

{duedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {duedateerrmsg}
                        </label>
                      </div>
                    )}

                  </div>





                  {totalErrormsg.trim() !== "" && (
                    <div className="text-center">
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "13px",
                          fontFamily:"Gilroy",
                          fontWeight:500
                        }}
                      >
                        {totalErrormsg !== " " && (
                          <MdError style={{ fontSize: "14px", color: "red",marginBottom:"2px" }} />
                        )}{" "}
                        {totalErrormsg}
                      </p>
                    </div>
                  )}
                </div>
                </div>
                </div>
                </div>
        )
: (
    <div className="col-12 mt-3">
    <Card
      className="h-100 fade-in mb-4 p-3"
      style={{
        borderRadius: 16,
        border: "1px solid #E6E6E6",
        width: "100%",
      }}
    >
      <Card.Body style={{ padding: 20 }}>
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap mb-3">
    {/* Left side: Image + Label + Description */}
    <div className="d-flex align-items-center gap-3">
      <img src={Billsimage} height={20} width={20} alt="billsimage" />
      <div className="d-flex flex-column">
        <label
          style={{
            fontFamily: "Gilroy",
            fontSize: 16,
            color: "#222",
            fontWeight: 600,
          }}
        >
          Recurring Bill Settings
        </label>
        <p
          style={{
            fontFamily: "Gilroy",
            fontSize: 11,
            color: "#222",
            fontWeight: 400,
            marginBottom: 0,
          }}
        >
          Detailed monthly rent breakdown including utilities and service charges.
        </p>
      </div>
    </div>
  
    {/* Right side: Button or Switch */}
    <div className="mt-3 mt-md-0">
      {InvoiceList && InvoiceList.length > 0 &&
        InvoiceList.map((list) => {
          const isDefaultPrefixSuffix =
            (!list.prefix || list.prefix === 'null' || list.prefix === null || list.prefix === 0) &&
            (!list.suffix || list.suffix === 'null' || list.suffix === null || list.suffix === 0);
  
          return isDefaultPrefixSuffix ? (
            <button
              key={`add-invoice-${list.id}`}
              onClick={handleShow}
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
              }}
              disabled={showPopup}
            >
              + Recurring
            </button>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <label
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 12,
                  color: "#222",
                  fontWeight: 400,
                  marginBottom: 0,
                }}
              >
                Automation Status
              </label>
              <Form.Check
                type="switch"
                id={`custom-switch-${list.id}`}
                className="custom-switch-pointer"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            </div>
          );
        })}
    </div>
  
    <style>
      {`
        .custom-switch-pointer input[type="checkbox"],
        .custom-switch-pointer label {
          cursor: pointer !important;
        }
      `}
    </style>
  </div>
  
  
        {/* Render details only if hotelDetailsinPg is not empty */}
        {state.UsersList.hotelDetailsinPg.length > 0 && (
          <>
            {state.UsersList.hotelDetailsinPg.map((item) => (
              <div key={item.id}>
               <div className="d-flex justify-content-between flex-wrap mb-3 mt-4">
                  <div className="row col-12">
  
    <div className="col-lg-9 col-md-6 mb-3" >
      <label style={labelStyle}>Recurring Name</label>
      <div>
        <label style={valueStyle}>Monthly Recurring</label>
      </div>
    </div>
  
    <div className="col-lg-3 col-md-6 mb-3 d-flex  justify-content-center" >
      <div className="d-flex flex-column me-3">
      <label style={labelStyle}>Frequency</label>
      <div>
        <label style={valueStyle}>Monthly</label>
      </div>
      </div> 
    </div>
    </div>
  </div>
  
  
               
  
                <div className="row mt-3 col-12">
                  <div className="col-6 col-md-4 mb-3">
                    <label style={labelStyle}>Billing Period</label>
                    <div><label style={valueStyle}>Monthly</label></div>
                  </div>
  
                  <div className="col-3 col-md-4 mb-3 d-flex  justify-content-center">
                  <div className="d-flex flex-column ms-3">
                    <label style={labelStyle}>Bill Generate</label>
                    <div><label style={valueStyle}>{item.inv_startdate}</label></div>
                    </div>
                  </div>
  
                  <div className="col-3 col-md-4 mb-3 d-flex  justify-content-end">
                  <div className="d-flex flex-column ms-3">
                    <label style={labelStyle}>Due date of Month</label>
                    <div><label style={valueStyle}>{item.inv_enddate}</label></div>
                    </div>
                  </div>
                </div>
  
                <div className="d-flex justify-content-end flex-wrap mt-3 ">
    <button
    className="me-3 "
      style={{
        fontFamily: "Gilroy",
        fontSize: "14px",
        backgroundColor: "rgba(247, 52, 52, 1)",
        color: "white",
        fontWeight: 600,
        borderRadius: "8px",
        width: 146,
        height: 45,
        border: "2px solid rgba(247, 52, 52, 1)",
      
      }}
    >
      Delete
    </button>
  
    <button
      key={`edit-invoice-${item.id}`}
      onClick={() => handleEdit(item)}
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
      }}
    >
      Edit Recurring
    </button>
  </div>
  
              </div>
  
              
            ))}
          </>
        )}
      </Card.Body>
    </Card>
  </div>
)
}

  





      {/* {showform ? (
        <div
          className="modal show"
          style={{ display: "block", position: "initial", fontFamily: "Gilroy,sans-serif" }}
        >
          <Modal show={showform} onHide={handleCloseForm} centered backdrop="static">
            <Modal.Dialog
              style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
              className="m-0 p-0"
            >
              <Modal.Body>
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}
                    >
                      {edit ? "Edit Invoice" : "Add Invoice "}
                    </div>
                  
                    <CloseCircle size="24" color="#000" onClick={handleCloseForm} 
            style={{ cursor: 'pointer' }}/>
                  </Modal.Header>
                </div>

                <div className="row mt-1">
                  <div className="d-flex row ">
                    <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 500, color: "#000", fontStyle: "normal", lineHeight: "normal" }}>
                          Prefix
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>
                        <Form.Control
                          style={{ padding: "10px", marginTop: "10px", fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: "18.83px", fontWeight: 500 }}
                          type="text"
                          placeholder="prefix"
                          value={prefix}
                          onChange={(e) => handlePrefix(e)}
                       
                        />
                      </Form.Group>

                      {prefixerrormsg.trim() !== "" && (
                        <div>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "red",
                              fontFamily:"Gilroy",
                              fontWeight:500
                              
                            }}
                          >
                            {prefixerrormsg !== " " && (
                              <MdError
                                style={{ fontSize: "14px", color: "red", marginBottom: "3px" }}
                              />
                            )}{" "}
                            {prefixerrormsg}
                          </p>
                        </div>
                      )}
                    </div>


                    <div className="col-lg-6 col-md-6 col-sm-11 col-xs-11">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label
                          style={{ fontFamily: "Gilroy", fontSize: 14, fontWeight: 500, color: "#000", fontStyle: "normal", lineHeight: "normal", }}
                        >
                          Suffix
                          <span style={{ color: "red", fontSize: "20px" }}> * </span>
                        </Form.Label>
                        <Form.Control
                          style={{
                            padding: "10px",
                            marginTop: "10px",
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            lineHeight: "18.83px",
                            fontWeight: 500,
                          }}
                          type="text"
                          placeholder="suffix"
                          value={startNumber}
                          onChange={(e) => handleSuffix(e)}
                       
                        />



                        {suffixerrormsg.trim() !== "" && (
                          <div>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "red",
                                marginTop: "3px",
                                fontFamily:"Gilroy",
                                fontWeight:500
                              }}
                            >
                              {suffixerrormsg !== " " && (
                                <MdError
                                  style={{ fontSize: "14px", color: "red", marginBottom: "3px" }}
                                />
                              )}{" "}
                              {suffixerrormsg}
                            </p>
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                 



                  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          fontWeight: 500,
                          color: "#000",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        Preview
                      </Form.Label>
                      <Form.Control
                        style={{
                          padding: "10px",
                          marginTop: "10px",
                          backgroundColor: "#E7F1FF",
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          lineHeight: "18.83px",
                          fontWeight: 500,
                        }}
                        type="text"
                        placeholder="preview"
                        readOnly
                        value={prefix + startNumber}
                     
                      />
                    </Form.Group>
                  </div>

               


                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation Start Date Will Be
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleInvoiceStartDateChange}
                        value={options.find((option) => option.value === invoiceDate)}
                        placeholder="Select"
                        classNamePrefix="custom" 
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            overflowY: "auto",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                            cursor:"pointer"
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {invoicedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1 ">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {invoicedateerrmsg}
                        </label>
                      </div>
                    )}
                     
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation End Date Will Be 
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleInvoiceEndDateChange}
                        value={options.find((option) => option.value === invoicedueDate)}
                        placeholder="Select"
                        classNamePrefix="custom" 
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            overflowY: "auto",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                             cursor:"pointer"
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                  

{duedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {duedateerrmsg}
                        </label>
                      </div>
                    )}

                  </div>





                  {totalErrormsg.trim() !== "" && (
                    <div className="text-center">
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "13px",
                          fontFamily:"Gilroy",
                          fontWeight:500
                        }}
                      >
                        {totalErrormsg !== " " && (
                          <MdError style={{ fontSize: "14px", color: "red",marginBottom:"2px" }} />
                        )}{" "}
                        {totalErrormsg}
                      </p>
                    </div>
                  )}
                </div>
              </Modal.Body>

              <Modal.Footer style={{ border: "none" }}>
                <Button
                  className="w-100 mt-2"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 500,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    marginTop:"-23px"
                  }}
                  onClick={handleInvoiceSettings}
                >
                   {edit ? "Update Invoice" : "Add Invoice "}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>


      ) : null} */}



      {recurringform && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "initial",
            fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={recurringform}
            onHide={handleCloseRecurringForm}
            centered
            className="custom-modal"
            backdrop="static"
          >
            <Modal.Dialog
              style={{
                maxWidth: 950,
                paddingRight: "10px",
                borderRadius: "30px",
              }}
              className="m-0 p-0"
            >
              <Modal.Body>
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Recurring Enable
                    </div>
                    {/* <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseRecurringForm}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "16px",
                        border: "1px solid black",
                        background: "transparent",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: "30px",
                          paddingBottom: "6px",
                        }}
                      >
                        &times;
                      </span>
                    </button> */}
                    <CloseCircle size="24" color="#000" onClick={handleCloseRecurringForm} 
            style={{ cursor: 'pointer' }}/>

                  </Modal.Header>
                </div>

                <div className="row mt-1">
                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation Start Date Will Be
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleStartDateChange}
                        value={options.find((option) => option.value === calculatedstartdate)}
                        placeholder="Select"
                        classNamePrefix="custom" // Prefix for custom styles
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            overflowY: "auto",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                            cursor:"pointer"
                          }),
                          option: (base, state) => ({
                            ...base,
                            cursor: "pointer", 
                            backgroundColor: state.isFocused ? "lightblue" : "white", 
                            color: "#000",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedstartdateerrmsg.trim() !== "" && (
                      <div className="mt-3">
                        <p style={{ fontSize: "12px", color: "red", marginTop: "-9px", fontFamily:"Gilroy",fontWeight:500 }}
                        >
                          {calculatedstartdateerrmsg !== " " && (
                            <MdError style={{ fontSize: "14px", color: "red", marginBottom: "3px", fontFamily:"Gilroy" }} />
                          )}{" "}
                          {calculatedstartdateerrmsg}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation End Date Will Be
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleEndDateChange}
                        value={options.find((option) => option.value === calculatedenddate)}
                        placeholder="Select"
                        classNamePrefix="custom" // Prefix for custom styles
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            border: "1px solid #ced4da",
                          }),
                          menuList: (base) => ({
                            ...base,
                            backgroundColor: "#f8f9fa",
                            overflowY: "auto",
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                            cursor:"pointer"
                          }),
                          option: (base, state) => ({
                            ...base,
                            cursor: "pointer", 
                            backgroundColor: state.isFocused ? "lightblue" : "white", 
                            color: "#000",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedenddateerrmsg.trim() !== "" && (
                      <div className="mt-3">
                        <p style={{ fontSize: "12px", color: "red", marginTop: "-9px" , fontFamily:"Gilroy",fontWeight:500}}
                        >
                          {calculatedenddateerrmsg !== " " && (
                            <MdError style={{ fontSize: "14px", color: "red", marginBottom: "3px", fontFamily:"Gilroy" }} />
                          )}{" "}
                          {calculatedenddateerrmsg}
                        </p>
                      </div>
                    )}

                  </div>


                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">On Every</label>
                    </div>
                    <div className="col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                        value={every_recurr}
                        onChange={handlechangeEvery}
                      >
                        <option value="monthly">Monthly</option>

                      </select>
                    </div>

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
                  }}
                  onClick={handleSaveRecurring}
                >
                  Add Invoice
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      )}
    </div>
  );
}
SettingsBills.propTypes = {
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  hostelid: PropTypes.func.isRequired,
}
export default SettingsBills;