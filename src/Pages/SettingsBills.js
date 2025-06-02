/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import DeleteIcon from "../Assets/Images/Delete_red.png";
import { FaCheck } from "react-icons/fa";
import DatepickerIcon from "../Assets/Images/calendar-2.png";
import "react-calendar/dist/Calendar.css";
import "../Pages/Settings.css";
import { useDispatch, useSelector } from "react-redux";
import leftarrow from "../Assets/Images/arrow-left.png";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import Billsimage from "../Assets/Images/bill_settings.png";
import Select from "react-select";
import PropTypes from "prop-types";
import "./SettingInvoice.css";
import "./SettingsBills.css";

function SettingsBills() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoicedueDate, setInvoiceDueDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isFromOpen, setIsFromOpen] = useState(false);
  const [isToOpen, setIsToOpen] = useState(false);
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [recurring_name, setRecurringName] = useState("");
  const [billing_frequency, setBilling_Frequency] = useState("");
  const [billing_types, setBilling_FrequencyTypes] = useState(null);
  const [recurr_nameerrormsg, setRecurr_NameErrmsg] = useState("");
  const [billingfreuencyerrormsg, setBillingFrequencyErrmsg] = useState("");
  const [selectedFromerrmsg, setSelectedFromErrmsg] = useState("");
  const [selectedToerrmsg, setSelectedToErrMsg] = useState("");
  const [selectedremainderdayserrmsg, setSelectedRemainderDaysErrMsg] =
    useState("");
  const [showform, setShowForm] = useState(false);
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [duedateerrmsg, setDueDateErrmsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [checkboxOptions, setCheckboxOptions] = useState([]);
  const [notifications, setNotifications] = useState({});
  const [isOn, setIsOn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const initialOptions = [
    { label: "01st ", value: 1 },
    { label: "02nd", value: 2 },
    { label: "03rd", value: 3 },
    { label: "04th", value: 4 },
    { label: "05th", value: 5 },
  ];

  const filteredOptions = initialOptions.filter(
    (option) => !selectedDays.some((day) => day.value === option.value)
  );

  const handleSelect = (selected) => {
    if (!selected) {
      setSelectedRemainderDaysErrMsg("Please select a reminder day");
      return;
    }

    setSelectedRemainderDaysErrMsg("");
    setSelectedDays((prev) => [...prev, selected]);
  };

  const handleDelete = (valueToRemove) => {
    setSelectedDays((prev) =>
      prev.filter((day) => day.value !== valueToRemove)
    );
  };

  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleFromClick = (date) => {
    setSelectedFrom(date);
    setIsFromOpen(false);
  };

  const handleToClick = (date) => {
    setSelectedTo(date);
    setIsToOpen(false);
  };

  const handleToggle = () => setIsOn(!isOn);

  const handleChange = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      setShowPopup(true);
      return;
    }
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setRecurr_NameErrmsg("");
    setBillingFrequencyErrmsg("");
    setSelectedFromErrmsg("");
    setSelectedToErrMsg("");
    setInvoiceDateErrmsg("");
    setDueDateErrmsg("");
    setSelectedRemainderDaysErrMsg("");
    setRecurringName("");
    setBilling_Frequency("");
    setSelectedFrom(null);
    setSelectedTo(null);
    setInvoiceDate("");
    setInvoiceDueDate("");
    setIsOn(false);
    setSelectedDays([]);
    setNotifications({});
  };

  const handleRecurrName = (e) => {
    const inputValue = e.target.value;
    if (/^[a-zA-Z]*$/.test(inputValue)) {
      setRecurringName(inputValue);

      if (!inputValue) {
        setRecurr_NameErrmsg("Please Enter Recurr Name");
      } else {
        setRecurr_NameErrmsg("");
      }
    }
  };

  const handleSaveRecurring = () => {
    if (
      !recurring_name ||
      !billing_frequency ||
      !selectedFrom ||
      !selectedTo ||
      !invoiceDate ||
      !invoicedueDate ||
      selectedDays.length === 0
    ) {
      if (!recurring_name) {
        setRecurr_NameErrmsg("Please Enter Recurr Name");
      }
      if (!billing_frequency) {
        setBillingFrequencyErrmsg("Please Select Frequncy");
      }
      if (!selectedFrom) {
        setSelectedFromErrmsg("Please Select Date");
      }
      if (!selectedTo) {
        setSelectedToErrMsg("Please Select Date");
      }
      if (!invoiceDate) {
        setInvoiceDateErrmsg("Please Select Date");
      }
      if (!invoicedueDate) {
        setDueDateErrmsg("Please Select Date");
      }
      if (selectedDays.length === 0) {
        setSelectedRemainderDaysErrMsg("Please Select Remainder Days");
      }
      return;
    }

    const reminderDays =
      selectedDays.length > 0 && selectedDays.map((item) => item.value);

    const selectedNotificationIds = Object.keys(notifications)
      .filter((key) => notifications[key])
      .map(Number);

    dispatch({
      type: "SETTINGSADD_RECURRING",
      payload: {
        hostel_id: Number(state.login.selectedHostel_Id),
        recurringName: recurring_name,
        billFrequency: billing_frequency,
        calculationFromDate: selectedFrom,
        calculationToDate: selectedTo,
        billingDateOfMonth: invoiceDate,
        dueDateOfMonth: invoicedueDate,
        isAutoSend: isOn === true ? 1 : 0,
        remainderDates: reminderDays,
        billDeliveryChannels: selectedNotificationIds,
      },
    });
  };

  useEffect(() => {
    if (state.Settings.SettingsRecurringAddSuccess === 200) {
      setShowForm(false);
      setRecurr_NameErrmsg("");
      setBillingFrequencyErrmsg("");
      setSelectedFromErrmsg("");
      setSelectedToErrMsg("");
      setInvoiceDateErrmsg("");
      setDueDateErrmsg("");
      setSelectedRemainderDaysErrMsg("");
      setRecurringName("");
      setBilling_Frequency("");
      setSelectedFrom(null);
      setSelectedTo(null);
      setInvoiceDate("");
      setInvoiceDueDate("");
      setIsOn(false);
      setSelectedDays([]);
      setNotifications({});

      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
      }, 100);
    }
  }, [state.Settings.SettingsRecurringAddSuccess]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "SETTINGS_GET_RECURRING" , payload:{hostel_id: state.login.selectedHostel_Id} });
      dispatch({ type: "FREQUENCY_TYPES_LIST" });
      dispatch({ type: "NOTIFICATION_TYPES_LIST" });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state?.Settings?.FrequncyTypegetSuccessCode === 200) {
      setLoading(false);
      const transformed = state?.Settings?.FrequencyTypeList?.map((item) => ({
        label: item.frequency_type,
        value: item.frequency_type,
        fullData: item,
      }));
      setBilling_FrequencyTypes(transformed);

      setTimeout(() => {
        dispatch({ type: "CLEAR_FREQUENCYTYPESLIST_STATUS_CODE" });
      }, 1000);
    }
  }, [state?.Settings?.FrequncyTypegetSuccessCode]);

  useEffect(() => {
    if (state?.Settings?.NotificationypegetSuccessCode === 200) {
      const apiData = state?.Settings?.NotificationTypeList;

      const options = apiData.map((item) => ({
        key: item.id,
        label: item.name,
      }));

      const defaultState = {};
      options.forEach((opt) => {
        defaultState[opt.key] = false;
      });

      setCheckboxOptions(options);
      setNotifications(defaultState);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATIONTYPESLIST_STATUS_CODE" });
      }, 1000);
    }
  }, [state?.Settings?.NotificationypegetSuccessCode]);

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

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

  const options = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleInvoiceStartDateChange = (selectedOption) => {
    setInvoiceDate(selectedOption?.value);
    setInvoiceDateErrmsg("");
  };
  const handleInvoiceEndDateChange = (selectedOption) => {
    setInvoiceDueDate(selectedOption?.value);
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
    <div
      className="mt-2"
      style={{ position: "relative", paddingRight: 11, paddingLeft: 10 }}
    >
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "48%",
            left: "68%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              borderTop: "4px solid #1E45E1",
              borderRight: "4px solid transparent",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}
      <div
        className="d-flex justify-content-start align-items-center"
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          minHeight: 73,
          whiteSpace: "nowrap",
          paddingRight: 10,
        }}
      >
        <div style={{ position: "fixed", backgroundColor: "white" }}>
          <h3
            style={{
              fontFamily: "Gilroy",
              fontSize: 20,
              color: "#222",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Bills
          </h3>
        </div>
      </div>

      {showPopup && (
        <div className="d-flex flex-wrap">
          <p
            style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }}
            className="col-12 col-sm-6 col-md-6 col-lg-9"
          >
            Please add a hostel before adding Invoice information.
          </p>
        </div>
      )}

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
                      fontFamily: "Gilroy",
                      paddingLeft: "10px",
                    }}
                  >
                    Recurring Bill Setting
                  </span>{" "}
                </div>
              </div>

              <div
                className="border p-3"
                style={{
                  borderRadius: "10px",
                  overflowY: "auto",
                  maxHeight: 450,
                }}
              >
                <p
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: 18,
                    color: "#222",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  Add Recurring Event
                </p>
                <hr></hr>

                <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11">
                  <Form.Group
                    className="mb-1"
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
                      Name
                    </Form.Label>
                    <Form.Control
                      style={{
                        padding: "10px",
                        marginTop: "5px",
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        lineHeight: "18.83px",
                        fontWeight: 500,
                      }}
                      type="text"
                      placeholder="recurring_name"
                      value={recurring_name}
                      onChange={(e) => handleRecurrName(e)}
                    />
                  </Form.Group>

                  {recurr_nameerrormsg.trim() !== "" && (
                    <div>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {recurr_nameerrormsg !== " " && (
                          <MdError
                            style={{
                              fontSize: "14px",
                              color: "red",
                              marginBottom: "3px",
                            }}
                          />
                        )}{" "}
                        {recurr_nameerrormsg}
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
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#000",
                        fontStyle: "normal",
                        lineHeight: "normal",
                      }}
                    >
                      Billing Frequency
                    </Form.Label>

                    <Select
                      options={billing_types}
                      placeholder="Select"
                      value={billing_types.find(
                        (opt) => opt.value === billing_frequency
                      )}
                      onChange={(selected) => {
                        setBilling_Frequency(selected.value);
                        setBillingFrequencyErrmsg("");
                      }}
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

                    {billingfreuencyerrormsg.trim() !== "" && (
                      <div>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "red",
                            marginTop: "3px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {billingfreuencyerrormsg !== " " && (
                            <MdError
                              style={{
                                fontSize: "14px",
                                color: "red",
                                marginBottom: "3px",
                              }}
                            />
                          )}{" "}
                          {billingfreuencyerrormsg}
                        </p>
                      </div>
                    )}
                  </Form.Group>
                </div>

                <div className="mt-3 mb-1">
                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#000",
                      fontStyle: "normal",
                      lineHeight: "normal",
                    }}
                  >
                    Calculation Date
                  </p>
                </div>
                <div className="row">
                  <div className="col-6 position-relative mb-4">
                    <label
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#000",
                        fontStyle: "normal",
                        lineHeight: "normal",
                      }}
                    >
                      From
                    </label>
                    <button
                      onClick={() => setIsFromOpen(!isFromOpen)}
                      className="btn btn-white border w-100 d-flex justify-content-between align-items-center"
                    >
                      {selectedFrom ? `${selectedFrom}` : "Select a date"}
                      <img src={DatepickerIcon} alt="datepicker" />
                    </button>

                    {isFromOpen && (
                      <div className="date-picker-container">
                        <div className="d-flex justify-content-center">
                          <h3>Select date</h3>
                        </div>

                        <div className="date-grid">
                          {dates.map((date, index) => (
                            <div
                              key={index}
                              className={`date-cell ${
                                date === selectedFrom ? "selected" : ""
                              }`}
                              onClick={() => handleFromClick(date)}
                            >
                              {date}
                            </div>
                          ))}
                        </div>
                        <div className="date-picker-footer">
                          <span className="startmonthone">
                            Start of the month
                          </span>
                          <span className="Endmonthone">End of the month</span>
                        </div>
                      </div>
                    )}
                    {selectedFromerrmsg.trim() !== "" && (
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
                          {selectedFromerrmsg}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-6 position-relative">
                    <label
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: 14,
                        fontWeight: 500,
                        color: "#000",
                        fontStyle: "normal",
                        lineHeight: "normal",
                      }}
                    >
                      To
                    </label>
                    <button
                      onClick={() => setIsToOpen(!isToOpen)}
                      className="btn btn-white border w-100 d-flex justify-content-between align-items-center"
                    >
                      {selectedTo ? `${selectedTo}` : "Select a date"}
                      <img src={DatepickerIcon} alt="datepicker" />
                    </button>

                    {isToOpen && (
                      <div className="date-picker-container">
                        <div className="d-flex justify-content-center">
                          <h3>Select date</h3>
                        </div>
                        <div className="date-grid">
                          {dates.map((date, index) => (
                            <div
                              key={index}
                              className={`date-cell ${
                                date === selectedTo ? "selected" : ""
                              }`}
                              onClick={() => handleToClick(date)}
                            >
                              {date}
                            </div>
                          ))}
                        </div>
                        <div className="date-picker-footer">
                          <button className="startmonthtwo">
                            Start of the month
                          </button>
                          <button disabled className="Endmonthtwo">
                            End of the month
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedToerrmsg.trim() !== "" && (
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
                          {selectedToerrmsg}
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <label htmlFor="startDayDropdown" className="form-label">
                      Billing Date of Month
                    </label>
                    <Select
                      options={options}
                      onChange={handleInvoiceStartDateChange}
                      value={options.find(
                        (option) => option.value === invoiceDate
                      )}
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
                          backgroundColor: "#fff",
                          border: "1px solid #ced4da",
                        }),
                        menuList: (base) => ({
                          ...base,
                          backgroundColor: "#fff",
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
                          cursor: "pointer",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />
                    {invoicedateerrmsg.trim() !== "" && (
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
                          {invoicedateerrmsg}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <label htmlFor="endDayDropdown" className="form-label">
                      Due Date of Month
                    </label>
                    <Select
                      options={options}
                      onChange={handleInvoiceEndDateChange}
                      value={options.find(
                        (option) => option.value === invoicedueDate
                      )}
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
                          backgroundColor: "#fff",
                          border: "1px solid #ced4da",
                        }),
                        menuList: (base) => ({
                          ...base,
                          backgroundColor: "#fff",
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
                          cursor: "pointer",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                      }}
                    />
                    {duedateerrmsg.trim() !== "" && (
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
                          {duedateerrmsg}
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex  justify-content-between mt-3 mb-3">
                  <div>
                    <p
                      style={{
                        fontSize: "15px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Auto Send Bills
                    </p>
                  </div>

                  <div className="toggle-wrapper" onClick={handleToggle}>
                    <span className={`toggle-label ${isOn ? "active" : ""}`}>
                      {isOn ? "On" : "Off"}
                    </span>
                    <div className={`toggle-switch ${isOn ? "on" : "off"}`}>
                      <div className="toggle-thumb">
                        {isOn && <FaCheck size={10} color="#1E1E1E" />}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                  <label htmlFor="endDayDropdown" className="form-label">
                    Remainder days before Due
                  </label>
                  <Select
                    options={filteredOptions}
                    placeholder="Select a Reminder date"
                    onChange={handleSelect}
                    value={null}
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "40px",
                        border: "1px solid #ced4da",
                      }),
                    }}
                  />

                  {selectedDays.length > 0 && (
                    <div className="mt-3 d-flex flex-wrap gap-2">
                      {selectedDays.map((item) => (
                        <div
                          key={item.value}
                          className="d-flex align-items-center px-3 py-1 rounded bg-white"
                          style={{
                            fontWeight: 400,
                            borderRadius: "8px",
                            border: "1px solid rgba(30, 69, 225, 1)",
                          }}
                        >
                          {item.label}
                          <img
                            className="ms-2"
                            src={DeleteIcon}
                            alt="delete"
                            height={14}
                            width={14}
                            onClick={() => handleDelete(item.value)}
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedremainderdayserrmsg.trim() !== "" && (
                    <div className="text-left">
                      <p
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginTop: "13px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        <MdError
                          style={{
                            fontSize: "14px",
                            color: "red",
                            marginBottom: "2px",
                          }}
                        />
                        {selectedremainderdayserrmsg}
                      </p>
                    </div>
                  )}
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="d-flex flex-column">
                    <p
                      style={{
                        fontSize: "15px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Bill Delivery Channels
                    </p>
                    <div>
                      <div className="d-flex gap-4 flex-wrap">
                        {checkboxOptions.map(({ key, label }) => (
                          <div className="form-check" key={key}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`notification-${key}`}
                              checked={notifications[key] || false}
                              onChange={() => handleChange(key)}
                              style={{
                                backgroundColor: notifications[key]
                                  ? "#1e40af"
                                  : "#fff",
                                borderColor: "#1e40af",
                                cursor: "pointer",
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`notification-${key}`}
                              style={{
                                color: notifications[key] ? "#000" : "#aaa",
                                fontSize: "14px",
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                              }}
                            >
                              {label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end flex-wrap mt-3 ">
                  <button
                    onClick={handleCloseForm}
                    className="me-3 "
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: "14px",
                      color: "rgba(75, 75, 75, 1)",
                      fontWeight: 600,
                      borderRadius: "12px",
                      width: 146,
                      height: 45,
                      border: "1px solid grey",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveRecurring}
                    style={{
                      fontFamily: "Gilroy",
                      fontSize: "14px",
                      backgroundColor: "#1E45E1",
                      color: "white",
                      fontWeight: 600,
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
          </div>
        </div>
      ) : (
        <div className="col-12 mt-2">
          <Card
            className="h-100 fade-in mb-4 p-3"
            style={{
              borderRadius: 16,
              border: "1px solid #E6E6E6",
              width: "100%",
            }}
          >
            <Card.Body style={{ padding: 20 }}>
              <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap mb-3">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={Billsimage}
                    height={20}
                    width={20}
                    alt="billsimage"
                  />
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
                      Detailed monthly rent breakdown including utilities and
                      service charges.
                    </p>
                  </div>
                </div>

                <div className="mt-3 mt-md-0">
                  <button
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

              {state.UsersList.hotelDetailsinPg.length === 0 && (
                <>
                  {state.UsersList.hotelDetailsinPg.map((item) => (
                    <div key={item.id}>
                      <div className="d-flex justify-content-between flex-wrap mb-3 mt-4">
                        <div className="row col-12">
                          <div className="col-lg-9 col-md-6 mb-3">
                            <label style={labelStyle}>Recurring Name</label>
                            <div>
                              <label style={valueStyle}>
                                Monthly Recurring
                              </label>
                            </div>
                          </div>

                          <div className="col-lg-3 col-md-6 mb-3 d-flex  justify-content-center">
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
                          <div>
                            <label style={valueStyle}>Monthly</label>
                          </div>
                        </div>

                        <div className="col-3 col-md-4 mb-3 d-flex  justify-content-center">
                          <div className="d-flex flex-column ms-3">
                            <label style={labelStyle}>Bill Generate</label>
                            <div>
                              <label style={valueStyle}>
                                {item.inv_startdate}
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="col-3 col-md-4 mb-3 d-flex  justify-content-end">
                          <div className="d-flex flex-column ms-3">
                            <label style={labelStyle}>Due date of Month</label>
                            <div>
                              <label style={valueStyle}>
                                {item.inv_enddate}
                              </label>
                            </div>
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
      )}
    </div>
  );
}
SettingsBills.propTypes = {
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default SettingsBills;
