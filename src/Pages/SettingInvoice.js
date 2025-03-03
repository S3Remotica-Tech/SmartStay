/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import InvoiceSettingsList from "./InvoicesettingsList";
import Modal from "react-bootstrap/Modal";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import Select from "react-select";
import PropTypes from "prop-types";

function SettingInvoice({ hostelid }) {


  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [selectedDate, setSelectedDate] = useState(null);

  const [invoiceDate, setInvoiceDate] = useState('');
  const [invoicedueDate, setInvoiceDueDate] = useState('');


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
  const [loading, setLoading] = useState(true)
  const initialValuesRef = useRef({});

  const [calculatedstartdate, setCalculatedstartdate] = useState("");
  const [calculatedenddate, setCalculatedEnddate] = useState("");
  const [calculatedstartdateerrmsg, setCalculatedstartdateErrmsg] = useState("");
  const [calculatedenddateerrmsg, setCalculatedEnddateErrMsg] = useState("");
  const [every_recurr, setEvery_Recurr] = useState("");
  const [InvoiceList, setInvoiceList] = useState([]);
  const [formFilled, setFormFilled] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 


 
  useEffect(() => {
    // if (state.login.selectedHostel_Id) {
    dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } });
    // }
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



  const handlePrefix = (e) => {
    setTotalErrmsg("");
    setPrefix(e.target.value);
    setSuffixfixErrmsg("");
    if (!e.target.value) {
      setPrefixErrmsg("Please Enter Prefix");
    } else {
      setPrefixErrmsg("");
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
      setTotalErrmsg("No changes detected.");
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
        setCalculatedstartdateErrmsg('Please Select date')
      }
      if (!calculatedenddate) {
        setCalculatedEnddateErrMsg('Please Select date')
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
  console.log("UsersListSTATUSCODE", state?.UsersList?.statuscodeForhotelDetailsinPg);


  useEffect(() => {
    if (InvoiceList.length === 0) {
      setLoading(true)
    }
    else if (InvoiceList && InvoiceList?.every(
      (item) =>
        (!item.prefix || item.prefix === 'null' || item.prefix === null || item.prefix === 0) &&
        (!item.suffix || item.suffix === 'null' || item.suffix === null || item.suffix === 0)
    )) {
      setLoading(false)
    }
  }, [InvoiceList])


  console.log("InvoiceList:", InvoiceList);

  // start date change
  const options = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleInvoiceStartDateChange = (selectedOption) => {
    setTotalErrmsg("");
    setInvoiceDate(selectedOption?.value);
  };
  const handleInvoiceEndDateChange = (selectedOption) => {
    setTotalErrmsg("");
    setInvoiceDueDate(selectedOption?.value);
  };

  const handleStartDateChange = (selectedOption) => {
    setCalculatedstartdate(selectedOption?.value);
  };
  const handleEndDateChange = (selectedOption) => {
    setCalculatedEnddate(selectedOption?.value);
  };


  return (
    <div className="container" style={{ position: "relative" }}>


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

      <div className="pt-4" style={{
        display: "flex", flexDirection: "row", justifyContent: "space-between", position: "sticky",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
        // height: 83, 
        marginTop: 5
      }}>
        <h3 style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Invoice</h3>


        {InvoiceList && InvoiceList.length > 0 ? (
          InvoiceList.map((list) => {
            const isDefaultPrefixSuffix =
              (!list.prefix || list.prefix === 'null' || list.prefix === null || list.prefix === 0) &&
              (!list.suffix || list.suffix === 'null' || list.suffix === null || list.suffix === 0);

            return isDefaultPrefixSuffix ? (
              <button
                key={`add-invoice-${list.id}`}
                onClick={handleShow}
                // style={{
                //   border: "none",
                //   fontFamily: "Gilroy",
                //   fontSize: 14,
                //   backgroundColor: "#1E45E1",
                //   color: "white",
                //   fontWeight: 600,
                //   borderRadius: 8,
                //   padding: "12px 16px",
                // }}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  padding: "10px 34px",
                  width: "auto",
                  maxWidth: "100%",
                  marginBottom: "10px",
                  maxHeight: 50,
                  marginTop: "-7px",
                  // borderColor: "#1E45E1",
                  border: "2px solid #1E45E1" 
                  // border: "none",
                }}
                disabled={showPopup}
              >
                + Invoice
              </button>
            ) : (
              <button
                key={`edit-invoice-${list.id}`}
                onClick={() => handleEdit(list)}
                // style={{
                //   border: "none",
                //   fontFamily: "Gilroy",
                //   fontSize: 14,
                //   backgroundColor: "#1E45E1",
                //   color: "white",
                //   fontWeight: 600,
                //   borderRadius: 8,
                //   padding: "12px 16px",
                // }}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: "8px",
                  padding: "10px 34px",
                  width: "auto",
                  maxWidth: "100%",
                  marginBottom: "10px",
                  maxHeight: 50,
                  marginTop: "-7px",
                  // borderColor: "#1E45E1",
                  border: "2px solid #1E45E1" 
                  // border: "none",
                }}
              >
                Edit Invoice
              </button>
            );
          })
        ) : null}








      </div>

      {showPopup && (
        <div className="d-flex flex-wrap">
          <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
            Please add a hostel before adding Invoice information.
          </p>
        </div>)}

      <div>
        {InvoiceList && InvoiceList.length > 0 ? (
          InvoiceList.every(
            (item) =>
              (!item.prefix || item.prefix === 'null' || item.prefix === null || item.prefix === 0) &&
              (!item.suffix || item.suffix === 'null' || item.suffix === null || item.suffix === 0)
          ) ? (
            <div style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
              <div className="d-flex justify-content-center">
                <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
              </div>
              <div
                className="pb-1 mt-3"
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: 20,
                  color: "rgba(75, 75, 75, 1)",
                }}
              >
                No Invoice available
              </div>
            </div>
          ) : (
            state.UsersList.hotelDetailsinPg.filter((item) => {
              const isValidPrefix =
                item.prefix && item.prefix !== 'null' && item.prefix !== null && item.prefix !== 0;
              const isValidSuffix =
                item.suffix && item.suffix !== 'null' && item.suffix !== null && item.suffix !== 0;
              console.log('Item:', item, 'isValidPrefix:', isValidPrefix, 'isValidSuffix:', isValidSuffix);
              return isValidPrefix || isValidSuffix;
            })
              .map((item) => (
                <div key={item.id} className="col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12 mt-3">
                  <InvoiceSettingsList
                    item={item}
                    isChecked={isChecked} // Pass controlled state
            setIsChecked={setIsChecked} // Allow child to update toggle
            handleRecurringFormShow={handleRecurringFormShow}
            handleCloseRecurringForm={handleCloseRecurringForm}
            setFormFilled={setFormFilled}
                    setRecurringForm={setRecurringForm}
                  // OnEditInvoice={handleEditInvoice}
                  />
                </div>
              ))
          )
        ) : !loading && (
          <div style={{ alignItems: "center", justifyContent: "center", marginTop: "90px" }}>
            <div className="d-flex justify-content-center">
              <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
            </div>
            <div
              className="pb-1 mt-3"
              style={{
                textAlign: "center",
                fontWeight: 600,
                fontFamily: "Gilroy",
                fontSize: 20,
                color: "rgba(75, 75, 75, 1)",
              }}
            >
              No Invoice available
            </div>
          </div>
        )}
      </div>



      {showform ? (
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
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseForm}
                      style={{ position: "absolute", right: "10px", top: "16px", border: "1px solid black", background: "transparent", cursor: "pointer", padding: "0", display: "flex", justifyContent: "center", alignItems: "center", width: "32px", height: "32px", borderRadius: "50%" }}
                    >
                      <span
                        aria-hidden="true"
                        style={{ fontSize: "30px", paddingBottom: "6px" }}
                      >
                        &times;
                      </span>
                    </button>
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
                        // readOnly
                        // style={inputStyle}
                        />
                      </Form.Group>

                      {prefixerrormsg.trim() !== "" && (
                        <div>
                          <p
                            style={{
                              fontSize: "13px",
                              color: "red",
                              
                            }}
                          >
                            {prefixerrormsg !== " " && (
                              <MdError
                                style={{ fontSize: "13px", color: "red", marginBottom: "3px" }}
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
                        // readOnly
                        />



                        {suffixerrormsg.trim() !== "" && (
                          <div>
                            <p
                              style={{
                                fontSize: "13px",
                                color: "red",
                                marginTop: "3px",
                              }}
                            >
                              {suffixerrormsg !== " " && (
                                <MdError
                                  style={{ fontSize: "13px", color: "red", marginBottom: "3px" }}
                                />
                              )}{" "}
                              {suffixerrormsg}
                            </p>
                          </div>
                        )}
                      </Form.Group>
                    </div>
                  </div>
                  {/* </div> */}



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
                      <label htmlFor="startDayDropdown" className="form-label">Invoice calculation Start Date 
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
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {invoicedateerrmsg.trim() !== "" && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "13px",
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
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation End date 
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
                        <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "13px",
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
                          fontSize: "15px",
                          color: "red",
                          marginTop: "13px",
                        }}
                      >
                        {totalErrormsg !== " " && (
                          <MdError style={{ fontSize: "12px", color: "red",marginBottom:"2px" }} />
                        )}{" "}
                        {totalErrormsg}
                      </p>
                    </div>
                  )}
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


      ) : null}



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
                    <button
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
                        width: "32px",
                        height: "32px",
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
                    </button>

                  </Modal.Header>
                </div>

                <div className="row mt-1">
                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice calculation Start Date will be
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
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedstartdateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: "13px", color: "red", marginTop: "-9px", fontFamily:"Gilroy" }}
                        >
                          {calculatedstartdateerrmsg !== " " && (
                            <MdError style={{ fontSize: "13px", color: "red", marginBottom: "3px", fontFamily:"Gilroy" }} />
                          )}{" "}
                          {calculatedstartdateerrmsg}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">Invoice Calculation End date wil be
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
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedenddateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: "13px", color: "red", marginTop: "-9px" , fontFamily:"Gilroy"}}
                        >
                          {calculatedenddateerrmsg !== " " && (
                            <MdError style={{ fontSize: "13px", color: "red", marginBottom: "3px", fontFamily:"Gilroy" }} />
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
SettingInvoice.propTypes = {
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  hostelid: PropTypes.func.isRequired,
}
export default SettingInvoice;