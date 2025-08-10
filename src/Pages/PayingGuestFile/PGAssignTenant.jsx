/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useEffect, useState, useRef  } from "react";
import {  useSelector , useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import { CloseCircle } from "iconsax-react";
import { Trash } from 'iconsax-react';
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import {Row,Col, } from "react-bootstrap";
import dayjs from 'dayjs';

 const PGAssignTenant = ({ show, handleClose , advanceform, handleCloseAdvanceForm , handleshowAdvanceForm , currentItem , openAdvanceAndCloseTenant}) => {

     const state = useSelector((state) => state);
     const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("long");
    const [errors, setErrors] = useState([]);
    const [fields, setFields] = useState([]);
    const [advanceAmountError, setAdvanceAmountError] = useState("");
    const [roomrentError, setRoomRentError] = useState("");
    const [RoomRent, setRoomRent] = useState("");   
    const [AdvanceAmount, setAdvanceAmount] = useState("");
    const [checkin_joiningDate, setCheckinJoiningDate] = useState(null);
    const [Checkin_joiningDateErrmsg, setCheckinJoingDateErrmsg] = useState('')
    const [loading, setLoading] = useState(false)

     const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];


    const handleRoomRent = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setRoomRent(newAmount);
    setRoomRentError("");
  };

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return;
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };


  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];
    const updatedErrors = [...errors];

    if (field === "reason") {
      if (value === "others") {
        updatedFields[index].showInput = true;
        updatedFields[index].reason_name = "others";
        updatedFields[index].customReason = "";
      } else {
        updatedFields[index].showInput = false;
        updatedFields[index].reason = value;
        updatedFields[index].reason_name = value;
        updatedFields[index].customReason = "";
      }


      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "customReason") {
      updatedFields[index].customReason = value;
      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      updatedFields[index].amount = value;


      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
  };

    const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  console.log("currentitem", currentItem);

  useEffect(() => {
    dispatch({ type: 'UNASSIGNCUSTOMER', payload: { hostel_Id: currentItem.room.Hostel_Id} })
  },[])

  console.log("state", state.UsersList?.UnAssignCustomerDetails);

    const bookingcustomerRef = useRef();
    const dateRef = useRef();
    const amountRef = useRef();
    const bookingDateRef = useRef();

   const [dateError, setDateError] = useState("");
   const [booking_customername, setBookingCustomerName] = useState("");
   const [booking_customererrmsg, setBookingCustomerErrmsg] = useState("");
   const [checkin_customername, setCheckinCustomerName] = useState("");
   const [checkin_customererrmsg, setCheckinCustomerErrmsg] = useState("");

    const handleBookingCustomerName = (selectedOption) => {

    setBookingCustomerName(selectedOption?.value || '');
    if (!selectedOption) {
      setBookingCustomerErrmsg("Please Select Name");
    } else {
      setBookingCustomerErrmsg("");
    }
  };

    const handleCheckinCustomerName = (selectedOption) => {

    setCheckinCustomerName(selectedOption?.value || '');
    if (!selectedOption) {
      setCheckinCustomerErrmsg("Please Select Customer");
    } else {
      setCheckinCustomerErrmsg("");
    }
  };

   const [amount, setAmount] = useState("");
   const [amountError, setamountError] = useState("");
   const [joiningDate, setJoiningDate] = useState(null);
   const [bookingDate, setBookingDate] = useState(null);
   const [joiningDateErrmsg, setJoingDateErrmsg] = useState('')
   const [bookingDateErrmsg, setBookingDateErrmsg] = useState('')
   const [formLoading, setFormLoading] = useState(false)

    const handleAmount = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setAmount(newAmount);
    setamountError("");
  };

   const validateAssignField = (value, fieldName, ref, setError, focusedRef) => {
    if (!value || value === "Select a PG") {

      switch (fieldName) {
          case "bookingcustomername":
          setError("Please Select Customer");
          break;
        case "joiningDate":
          setError("Please Select Joining Date");
          break;
        case "bookingDate":
          setError("Please Select Booking Date");
          break;
        case "amount":
          setError("Please Enter Amount");
          break;




       
        default:
          break;
      }


      if (ref?.current && !focusedRef.current) {
        ref.current.focus();
        focusedRef.current = true;
      }
      return false;
    } else {
      setError("");
      return true;
    }
  };


   const validateField = (value, fieldName) => {
    const trimmedValue = String(value).trim();
    if (!trimmedValue) {
      switch (fieldName) {
         case "checkin_customername":
          setCheckinCustomerErrmsg("Please Select Customer");
          break;
        case "stay_typename":
          setStayTypeNameErrMsg("Please Select Staytype");
          break;
        case "checkin_joiningDate":
          setCheckinJoingDateErrmsg("Please Select Joining Date");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Please Enter Advance Amount");
          break;
        case "RoomRent":
          setRoomRentError("Please Enter Rental Amount");
          break;

        default:
          break;
      }

      if (!focusedRef.current && ref?.current) {
        ref.current.focus();
        focusedRef.current = true;
      }
      return false;
    }

    return true;
  };

   


   const handleSubmitBooking = () => {

    let hasError = false;
    const focusedRef = { current: false };
    const isCustomerValid = validateAssignField(booking_customername, "bookingcustomername", bookingcustomerRef, setBookingCustomerErrmsg, focusedRef);
    const isJoiningDateValid = validateAssignField(joiningDate, "joiningDate", dateRef, setJoingDateErrmsg, focusedRef);
    const isBookingDateValid = validateAssignField(bookingDate, "bookingDate", bookingDateRef, setBookingDateErrmsg, focusedRef);
    const isAmountValid = validateAssignField(amount, "amount", amountRef, setamountError, focusedRef);

  

    if (!bookingDate) {
      if (!focusedRef.current && bookingDateRef?.current) {
        bookingDateRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    }
   
    if (hasError) return;
    if (
      !isCustomerValid ||
      !isJoiningDateValid ||
      !isAmountValid ||
      !isBookingDateValid
    ) {
      return;
    }



    let formattedDate = null;
     let bookingFormattedDate = null;
    try {
      const date = new Date(joiningDate);
      date.setDate(date.getDate() + 1);
      formattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      setDateError("Please Select Date");
      return;
    }


    try {
      const date = new Date(bookingDate);
      date.setDate(date.getDate() + 1);
      bookingFormattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      setDateError("Please Select Date");
      return;
    }

    const userDetails = state.UsersList.Users.find(
  (u) => u.ID === booking_customername
);
   


    dispatch({
      type: "ADD_BOOKING",
      payload: {
        joining_date: formattedDate,
        booking_date:  bookingFormattedDate,
        amount: amount,
        hostel_id: state.login.selectedHostel_Id,
        floor_id: currentItem?.room?.Floor_Id,
        room_id: currentItem?.room?.Room_Id,
        bed_id: currentItem?.bed?.id,
        customer_Id: booking_customername,
        mob_no: userDetails.Phone,
        email: userDetails.Email,
        profile: userDetails.profile
      },
    });
    setFormLoading(true)
  };


    useEffect(() => {
      if (state?.Booking?.statusCodeForAddBooking === 200) {
        handleClose()
        setFormLoading(false)
        setJoingDateErrmsg('');
    
        setTimeout(() => {
          dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
        }, 500);
      }
    }, [state?.Booking?.statusCodeForAddBooking]);



  const [advanceDate , setAdvanceDate] = useState(null)
  const [advanceDueDate , setAdvanceDueDate] = useState(null)
  const [advanceDateError , setAdvanceDateError] = useState('')
  const [advanceDueDateError ,  setAdvanceDueDateError] = useState('')
  const [stay_typename , setStayTypeName] = useState("")
  const [stay_typenameErrmsg , setStayTypeNameErrMsg] = useState("")

  const stayTypes = [
  { value: "short_stay", label: "Short Stay" },
  { value: "long_stay", label: "Long Stay" },
  { value: "day_stay", label: "Day Stay" },
];

  const longStayOnly = stayTypes.filter((s) => s.value === "long_stay");

// onChange handler
const handleStayTypeChange = (selectedOption) => {
    setStayTypeName(selectedOption?.value || '');
    if (!selectedOption) {
      setStayTypeNameErrMsg("Please Select Staytype");
    } else {
      setStayTypeNameErrMsg("");
    }
};

 const handleSaveCheckin = async () => {

    let hasReasonAmountError = false;
    let newErrors = [];


    if (!validateField(checkin_customername, "checkin_customername"))
    if (!validateField(stay_typename, "stay_typename"));
    if (!validateField(checkin_joiningDate, "checkin_joiningDate"));
    if (!validateField(AdvanceAmount, "AdvanceAmount"));
    if (!validateField(RoomRent, "RoomRent"));

 

    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      return;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      return;
    }

    if (
      AdvanceAmount === "" ||
      AdvanceAmount === null ||
      AdvanceAmount === undefined
    ) {
      setAdvanceAmountError("Please Enter Advance Amount");
      return;
    }
    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    }
  fields.map((item) => {
      let reason_name = "";

      if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
        reason_name = item.customReason || item["custom Reason"] || "";
      } else {
        reason_name = item.reason || item.reason_name || "";
      }

      const error = { reason: "", amount: "" };
      if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
        error.amount = "Please enter amount";
        hasReasonAmountError = true;
      }


      if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
        error.reason = "Please enter reason";
        hasReasonAmountError = true;
      }

      newErrors.push(error);
      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput
      };
    });

    setErrors(newErrors)

    if (hasReasonAmountError) return;



    if (
      checkin_customername && stay_typename &&
      currentItem?.room?.Floor_Id && currentItem?.room?.Room_Id && currentItem?.bed?.id && 
      checkin_joiningDate &&
      Number(AdvanceAmount) > 0 &&
      Number(RoomRent) > 0
    ) {
openAdvanceAndCloseTenant();
    }
  };


  const handleSaveUserlistAddUserButon = () => {

    let hasReasonAmountError = false;
    let newErrors = [];



    if (!validateField(checkin_customername, "checkin_customername"))
    if (!validateField(stay_typename, "stay_typename"));
    if (!validateField(checkin_joiningDate, "checkin_joiningDate"));
    if (!validateField(AdvanceAmount, "AdvanceAmount"));
    if (!validateField(RoomRent, "RoomRent"));


    if (!RoomRent && RoomRent !== 0) {
      setRoomRentError("Please Enter Rental Amount");
      return;
    }
    if (RoomRent <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      return;
    }
    if (!AdvanceAmount && AdvanceAmount !== 0) {
      setAdvanceAmountError("Please Enter Advance Amount");
      return;
    }

    if (AdvanceAmount <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    }


  //  floor_id: currentItem?.room?.Floor_Id,
  //       room_id: currentItem?.room?.Room_Id,
  //       bed_id: currentItem?.bed?.id,


    if (checkin_customername && stay_typename &&
       currentItem?.room?.Floor_Id && currentItem?.room?.Room_Id && currentItem?.bed?.id && 
      checkin_joiningDate && AdvanceAmount && RoomRent) {

      const incrementDateAndFormat = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);

        return newDate.toISOString().split("T")[0];
      };
      const formattedDate = checkin_joiningDate
        ? incrementDateAndFormat(checkin_joiningDate)
        : "";


      const formattedReasons = fields.map((item) => {
        let reason_name = "";

        if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
          reason_name = item.customReason || item["custom Reason"] || "";
        } else {
          reason_name = item.reason || item.reason_name || "";
        }

        const error = { reason: "", amount: "" };
        if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
          error.amount = "Please enter amount";
          hasReasonAmountError = true;
        }


        if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
          error.reason = "Please enter reason";
          hasReasonAmountError = true;
        }

        newErrors.push(error);
        return {
          reason_name,
          amount: item.amount || "",
          showInput: !!item.showInput
        };
      });

      setErrors(newErrors)

      if (hasReasonAmountError) return;




      dispatch({
        type: "ADDUSER",
        payload: {
          profile: file,
          firstname: firstname,
          lastname: lastname,
          Phone: Phone,
          Email: Email,
          Address: house_no,
          area: street,
          landmark: landmark,
          city: city,
          pincode: pincode,
          state: state_name,
          AadharNo: AadharNo,
          PancardNo: PancardNo,
          licence: licence,
          HostelName: HostelName,
          hostel_Id: hostel_Id,
          Floor: currentItem?.room?.Floor_Id,
          Rooms: currentItem?.room?.Room_Id,
          Bed: currentItem?.bed?.id,
          joining_date: formattedDate,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          paid_advance: paid_advance,
          paid_rent: paid_rent,
          payable_rent: payableamount,
          isadvance: 0,
          // ID: props.edit === "Edit" ? id : "",
          reasons: formattedReasons,
          stay_type: stay_typename
        },
      });
      setLoading(true)


    }
  };

    const handleSaveAdvance = () => {
    let hasError = false;
    let hasReasonAmountError = false;
    let newErrors = [];


    if (!advanceDate) {
      setAdvanceDateError("Please Select Invoice Date");
      hasError = true;
    } else {
      setAdvanceDateError("");
    }

    if (!advanceDueDate) {
      setAdvanceDueDateError("Please Select Due Date");
      hasError = true;
    } else {
      setAdvanceDueDateError("");
    }




    if (advanceDate && advanceDueDate && checkin_customername) {
      const selectedUser = state.UsersList.Users.find(
        item => item.ID === checkin_customername
      );

      if (selectedUser) {
        const CreateDate = dayjs(state.login.joiningDate).startOf('day');


        const InvoiceDate = dayjs(advanceDate).startOf('day');

        const DueDate = dayjs(advanceDueDate).startOf('day');
        const Today = dayjs().startOf('day');


        if (InvoiceDate.isBefore(CreateDate)) {

          setAdvanceDateError("Before joining date not allowed");
          hasError = true;
        } else if (InvoiceDate.isAfter(Today)) {
          setAdvanceDateError("Invoice date cannot be a future date");
          hasError = true;
        }


        if (DueDate.isBefore(InvoiceDate)) {
          setAdvanceDueDateError("Due date cannot be before invoice date");
          hasError = true;
        }
      }
    }




    if (hasError) {
      return;
    }

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate.toISOString().split("T")[0];
    };


    const formattedDate = selectedDate
      ? incrementDateAndFormat(selectedDate)
      : "";
    const formattedAdvanceDate = incrementDateAndFormat(advanceDate);
    const formattedAdvanceDateDue = incrementDateAndFormat(advanceDueDate);

  const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);
    
    const capitalizedLastname = capitalizeFirstLetter(lastname);
    const formattedReasons = fields.map((item) => {
      let reason_name = "";

      if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
        reason_name = item.customReason || item["custom Reason"] || "";
      } else {
        reason_name = item.reason || item.reason_name || "";
      }

      const error = { reason: "", amount: "" };
      if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
        error.amount = "Please enter amount";
        hasReasonAmountError = true;
      }


      if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
        error.reason = "Please enter reason";
        hasReasonAmountError = true;
      }

      newErrors.push(error);
      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput
      };
    });

    setErrors(newErrors)

    if (hasReasonAmountError) return;


   dispatch({
  type: "ADDUSER",
  payload: {
    profile: file,
    firstname: capitalizedFirstname,  
    LastName: capitalizedLastname,
    Phone: Phone,
    Email: Email,
    Address: house_no,
    area: street,
    landmark: landmark,
    city: city,
    pincode: pincode,
    state: state_name,
    AadharNo: AadharNo,
    PancardNo: PancardNo,
    licence: licence,
    HostelName: HostelName,
    hostel_Id: hostel_Id,
    Floor: Floor,
    Rooms: Rooms,
    Bed: Bed,
    joining_date: formattedDate,
    AdvanceAmount: AdvanceAmount,
    RoomRent: RoomRent,
    BalanceDue: BalanceDue,
    PaymentType: PaymentType,
    paid_advance: paid_advance,
    paid_rent: paid_rent,
    payable_rent: payableamount,
    isadvance: 1,
    invoice_date: formattedAdvanceDate,
    due_date: formattedAdvanceDateDue,
    ID: props.edit === "Edit" ? id : "",
    reasons: formattedReasons,
    stay_type: activeTab === "long" ? "long_stay" : "short_stay",
  },
});

    setLoading(true)

    dispatch({ type: "INVOICELIST" });
  };
  

    return(
        <>
        
           <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
              >
                <Modal.Dialog
                  style={{
                    maxWidth: 950,
                    paddingRight: "10px",
                    borderRadius: "30px",
                  }}
                  className="m-0 p-0"
                >
                  <Modal.Body >
                    <div>
                    
                        <div >
                          <Modal.Header className="pt-0"
                            style={{ position: "relative", marginTop: "", border: "none" }}
                          >
                            <div
                              style={{
                                fontSize: 20,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                              }}
                            >
                              Assign Tenant
                                <div>
                                <span  style={{
                                fontSize: 15,
                                fontWeight: 400,
                                fontFamily: "Gilroy",
                                color:'rgba(30, 69, 225, 1)'
                              }}>Room No {currentItem?.room?.Room_Name} | Bed {currentItem?.bed?.bed_no}</span> 
                            </div>
                            </div>
                          
        
                            <CloseCircle
                              size="24"
                              color="#000"
                              onClick={handleClose}
                              style={{ cursor: "pointer" }}
                            />
                          </Modal.Header>
        
        
                          <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, width: "100%" }} className="mt-1 p-1">
                            <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%" }}>
                              <button
                                onClick={() => setActiveTab("long")}
                                style={{
                                  flex: 1,
                                  padding: "10px 0",
                                  backgroundColor: activeTab === "long" ? "#1E45E1" : "#F7F9FF",
                                  color: activeTab === "long" ? "white" : "black",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontWeight: "600",
                                  fontFamily: "Gilroy"
                                }}
                              >
                                Booking
                              </button>
                              <button
                                onClick={() => setActiveTab("short")}
                                style={{
                                  flex: 1,
                                  padding: "10px 0",
                                  backgroundColor: activeTab === "short" ? "#1E45E1" : "#F7F9FF",
                                  color: activeTab === "short" ? "white" : "black",
                                  border: "none",
                                  borderRadius: "5px",
                                  fontWeight: "600",
                                  fontFamily: "Gilroy"
                                }}
                              >
                                Check-in
                              </button>
                            </div>
        
                          </div>
        
                          {activeTab === "long" ? <>
                            <div style={{ maxHeight: "350px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                              <div className="row d-flex align-items-center">

                                <Row>
                                     <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <Form.Group className="mb-1" controlId="exampleForm.ControlInput5">
                                                    <Form.Label
                                                      style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: "#222",
                                                        fontStyle: "normal",
                                                        lineHeight: "normal",
                                                      }}
                                                    >
                                                      Customer <span style={{ color: "red", fontSize: "20px" }}>*</span>
                                                    </Form.Label>
                                                    <Select
                                                      options={
                                                        state.UsersList?.UnAssignCustomerDetails?.length > 0 &&
                                                           state.UsersList?.UnAssignCustomerDetails.map((u) => ({
                                                            value: u.id,
                                                            label: u.Name,
                                                          }))
                                                        
                                                      }
                                                      onChange={handleBookingCustomerName}
                                                      value={
                                                        booking_customername
                                                          ? {
                                                            value: booking_customername,
                                                            label:
                                                              state.UsersList?.UnAssignCustomerDetails?.find((u) => u.id === booking_customername)?.Name ||
                                                              "Select Customer",
                                                          }
                                                          : null
                                                      }
                                                      placeholder="Select Customer"
                                                      classNamePrefix="custom"
                                                      menuPlacement="auto"
                                                      noOptionsMessage={() => "No customers available"}
                                                      styles={{
                                                        control: (base) => ({
                                                          ...base,
                                                          padding: "3px 5px ",
                                                          border: "1px solid #D9D9D9",
                                                          borderRadius: "8px",
                                                          fontSize: "16px",
                                                          color: "#4B4B4B",
                                                          fontFamily: "Gilroy",
                                                          fontWeight: booking_customername ? 600 : 500,
                                                          boxShadow: "none",
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
                                                          fontFamily: "Gilroy"
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
                                                        option: (base, state) => ({
                                                          ...base,
                                                          cursor: "pointer",
                                                          backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                                          color: "#000",
                                                        }),
                                                      }}
                                                    />
                                    
                                    
                                                    {booking_customererrmsg.trim() !== "" && (
                                                      <div>
                                                        <p
                                                          style={{
                                                            fontSize: "12px", color: "red", marginTop: "5px", fontFamily: "Gilroy",
                                                            fontWeight: 500,
                                                          }}
                                                        >
                                                          {booking_customererrmsg !== " " && (
                                                            <MdError
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "red",
                                                                marginRight: "3px",
                                                                marginBottom: "3px",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                              }}
                                                            />
                                                          )}{" "}
                                                          {booking_customererrmsg}
                                                        </p>
                                                      </div>
                                                    )}
                                                  </Form.Group>
                                                </div>
                                    
                                               
                                              </div>
                                </Row>
                                        <Col md={6}>
                                          <Form.Group controlId="">
                                            <Form.Label
                                              style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                              }}
                                            >
                                              Booking Date {" "}
                                              <span style={{ color: "red", fontSize: "20px" }}>
                                                {" "}
                                                *{" "}
                                              </span>
                                            </Form.Label>
                            
                            
                                            <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                              <DatePicker
                                                ref={bookingDateRef}
                                                style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                                                format="DD/MM/YYYY"
                                                placeholder="DD/MM/YYYY"
                                                value={bookingDate ? dayjs(bookingDate) : null}
                                                onChange={(date) => {
                                                  setDateError("");
                                                  setBookingDate(date ? date.toDate() : null);
                                                  setBookingDateErrmsg('');
                                                }}
                                                disabledDate={(current) => {
                                                  return current && current > dayjs().endOf('day');
                                                }}
                                                // getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                                                getPopupContainer={() => document.body}
                                              />
                                            </div>
                                          </Form.Group>
                                          {dateError && (
                                            <div style={{ color: "red" }}>
                                              <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
                                              <span
                                                style={{
                                                  color: "red",
                                                  fontSize: 12,
                                                  fontFamily: "Gilroy",
                                                  fontWeight: 500,
                                                }}
                                              >
                                                {dateError}
                                              </span>
                                            </div>
                                          )}
                            
                                          {bookingDateErrmsg.trim() !== "" && (
                                            <div className="d-flex align-items-center">
                                              <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                                              <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                {bookingDateErrmsg}
                                              </label>
                                            </div>
                                          )}
                                        </Col>
                            
                            
                                        <Col md={6}>
                                          <Form.Group className="">
                                            <Form.Label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy",
                                              }}
                                            >
                                              Booking Amount {" "}
                                              <span style={{ color: "red", fontSize: "20px" }}>
                                                {" "}
                                                *{" "}
                                              </span>
                                            </Form.Label>
                                            <FormControl
                                              type="text"
                                              ref={amountRef}
                                              id="form-controls"
                                              placeholder="Enter Booking Amount"
                                              value={amount}
                                              onChange={(e) => handleAmount(e)}
                                              style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                              }}
                                            />
                                          </Form.Group>
                                          {amountError && (
                                            <div style={{ color: "red" }}>
                                              <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
                                              <span
                                                style={{
                                                  color: "red",
                                                  fontSize: 12,
                                                  fontFamily: "Gilroy",
                                                  fontWeight: 500,
                                                }}
                                              >
                                                {amountError}
                                              </span>
                                            </div>
                                          )}
                                        </Col>
                                   
                                             <Row>
                                                <Col md={12}>
                                                 <Form.Group controlId="joiningDate">
                                                   <Form.Label
                                                     style={{
                                                       fontSize: 14,
                                                       color: "#222222",
                                                       fontFamily: "Gilroy",
                                                       fontWeight: 500,
                                                     }}
                                                   >
                                                     Joining Date (Tentative) {" "}
                                                     <span style={{ color: "red", fontSize: "20px" }}> * </span>
                                                   </Form.Label>
                                   
                                                   <div
                                                     className="datepicker-wrapper"
                                                     style={{ position: "relative", width: "100%", marginTop: 6 }}
                                                   >
                                                     <DatePicker
                                                       style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                                                       format="DD/MM/YYYY"
                                                       placeholder="DD/MM/YYYY"
                                                       value={joiningDate ? dayjs(joiningDate) : null}
                                                       onChange={(date) => {
                                                         setDateError("");
                                                         setJoiningDate(date ? date.toDate() : null);
                                                         dispatch({ type: 'REMOVE_ERROR_BOOKING_DATE' })
                                                         setJoingDateErrmsg("")
                                                       }}
                                                      //  disabledDate={(current) => current && current > dayjs().endOf("day")}
                                                      //  getPopupContainer={(triggerNode) =>
                                                      //    triggerNode.closest(".datepicker-wrapper")
                                                      //  }
                                                      getPopupContainer={() => document.body}
                                                     />
                                                   </div>
                                                 </Form.Group>
                                                 {dateError && (
                                                   <div style={{ color: "red" }}>
                                                     <MdError
                                                       style={{
                                                         marginRight: "5px",
                                                         fontSize: 14,
                                                         marginBottom: "1px",
                                                       }}
                                                     />
                                                     <span
                                                       style={{
                                                         color: "red",
                                                         fontSize: 12,
                                                         fontFamily: "Gilroy",
                                                         fontWeight: 500,
                                                       }}
                                                     >
                                                       {dateError}
                                                     </span>
                                                   </div>
                                                 )}

                                                        {joiningDateErrmsg.trim() !== "" && (
                                            <div className="d-flex align-items-center">
                                              <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                                              <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                {joiningDateErrmsg}
                                              </label>
                                            </div>
                                          )}
                                             
                                   
                                   
                                   
                                               </Col>
                                             </Row>
        
        
                              </div>
        
                            
        
        
        
        
        
        
        
        
        
                            </div>

                            {formLoading &&
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  opacity: 0.75,
                  zIndex: 10,
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
        
                            {state.createAccount?.networkError ?
                              <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                                <MdError style={{ color: "red", marginRight: '5px' }} />
                                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                              </div>
                              : null}
           <div className="d-flex justify-content-end">
                                                           <Button
                                                             style={{
                                                               backgroundColor: "white",
                                                               fontWeight: 400,
                                                                padding:'5px 40px',
                                                               borderRadius: 10,
                                                               fontSize: 16,
                                                               fontFamily: "Gilroy",
                                                               color:'rgba(75, 75, 75, 1)',
                                                               border:'1px solid white'
                                                             }}
                                                               onClick={handleClose}
                                                           >
                                                            Cancel
                                                           </Button>
                                         
                                                           <Button
                                                             style={{
                                                               backgroundColor: "#1E45E1",
                                                               fontWeight: 500,
                                                               // height: 40,
                                                               borderRadius: 10,
                                                               fontSize: 16,
                                                               padding:'5px 40px',
                                                               fontFamily: "Gilroy",
                                                             }}
                                                             onClick={handleSubmitBooking}
                                                           >
                                                              Book
                                                           </Button>
                                                           </div>
                          </>
        
                            :
        
        
        
                            activeTab === "short" && (
                                <>
                                <div style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                              <div className="row d-flex align-items-center">

                                  <Row>
                                     <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                  <Form.Group className="mb-1" controlId="exampleForm.ControlInput5">
                                                    <Form.Label
                                                      style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        color: "#222",
                                                        fontStyle: "normal",
                                                        lineHeight: "normal",
                                                      }}
                                                    >
                                                      Customer <span style={{ color: "red", fontSize: "20px" }}>*</span>
                                                    </Form.Label>
                                                    <Select
                                                      options={
                                                        state.UsersList?.UnAssignCustomerDetails?.length > 0 &&
                                                           state.UsersList?.UnAssignCustomerDetails.map((u) => ({
                                                            value: u.id,
                                                            label: u.Name,
                                                          }))
                                                        
                                                      }
                                                      onChange={handleCheckinCustomerName}
                                                      value={
                                                        checkin_customername
                                                          ? {
                                                            value: checkin_customername,
                                                            label:
                                                              state.UsersList?.UnAssignCustomerDetails?.find((u) => u.id === checkin_customername)?.Name ||
                                                              "Select Customer",
                                                          }
                                                          : null
                                                      }
                                                      placeholder="Select Customer"
                                                      classNamePrefix="custom"
                                                      menuPlacement="auto"
                                                      noOptionsMessage={() => "No customers available"}
                                                      styles={{
                                                        control: (base) => ({
                                                          ...base,
                                                          padding: "3px 5px ",
                                                          border: "1px solid #D9D9D9",
                                                          borderRadius: "8px",
                                                          fontSize: "16px",
                                                          color: "#4B4B4B",
                                                          fontFamily: "Gilroy",
                                                          fontWeight: checkin_customername ? 600 : 500,
                                                          boxShadow: "none",
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
                                                          fontFamily: "Gilroy"
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
                                                        option: (base, state) => ({
                                                          ...base,
                                                          cursor: "pointer",
                                                          backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                                          color: "#000",
                                                        }),
                                                      }}
                                                    />
                                    
                                    
                                                    {checkin_customererrmsg.trim() !== "" && (
                                                      <div>
                                                        <p
                                                          style={{
                                                            fontSize: "12px", color: "red", marginTop: "5px", fontFamily: "Gilroy",
                                                            fontWeight: 500,
                                                          }}
                                                        >
                                                          {checkin_customererrmsg !== " " && (
                                                            <MdError
                                                              style={{
                                                                fontSize: "14px",
                                                                color: "red",
                                                                marginRight: "3px",
                                                                marginBottom: "3px",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                              }}
                                                            />
                                                          )}{" "}
                                                          {checkin_customererrmsg}
                                                        </p>
                                                      </div>
                                                    )}
                                                  </Form.Group>
                                                </div>
                                    
                                               
                                              </div>
                                </Row>

                                <Row>
 <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                            <label
                              style={{
                                fontSize: 14,
                                color: "#222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                marginBottom: 5,
                                display: "block",
                              }}
                            >
                             Stay Type {" "}   <span style={{ color: "red", fontSize: "16px" }}>*</span>
                            </label>



                    <Select
  options={longStayOnly}
  onChange={handleStayTypeChange}
  placeholder="Select a type"
  classNamePrefix="custom"
  menuPlacement="auto"
  noOptionsMessage={() => "No stay types available"}
  styles={{
    control: (base) => ({
      ...base,
      height: "50px",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "16px",
      color: "#4B4B4B",
      fontFamily: "Gilroy",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      fontFamily: "Gilroy",
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      maxHeight: "120px",
      padding: 0,
      scrollbarWidth: "thin",
      overflowY: "auto",
      fontFamily: "Gilroy",
      cursor: "pointer",
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
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      color: state.isSelected ? "#fff" : "#000",
      fontFamily: "Gilroy",
    }),
  }}
/>


                          </div>
                          {stay_typenameErrmsg.trim() !== "" && (
                            <div>
                              <p style={{ fontSize: '15px', color: 'red' }}>
                                {stay_typenameErrmsg !== " " && <MdError style={{ color: 'red', marginRight: "5px", fontSize: "14px" }} />}<span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{stay_typenameErrmsg}</span>
                              </p>
                            </div>
                          )}
                                    </Row>

                                <Row>
                                       <div className="row align-items-end ms-1 me-1" style={{ paddingRight: 5, paddingLeft: 0 }}>
                                    

                                     <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                                                <Form.Group>
                                                                  <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                                    Rental Amount
                                                                    <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                                                  </Form.Label>
                                                                  <FormControl
                                                                    type="text"
                                                                    placeholder="Enter Amount"
                                                                    value={RoomRent}
                                                                    onChange={handleRoomRent}
                                                                    style={{
                                                                      fontSize: 16,
                                                                      color: "#4B4B4B",
                                                                      fontFamily: "Gilroy",
                                                                      fontWeight: 500,
                                                                      boxShadow: "none",
                                                                      border: "1px solid #D9D9D9",
                                                                      height: 50,
                                                                      borderRadius: 8,
                                                                    }}
                                                                  />
                                                                </Form.Group>
                                                                {roomrentError && (
                                                                  <div className="d-flex align-items-center justify-content-start" style={{ color: "red" }}>
                                                                    <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                                                                    <label
                                                                      className="mb-0"
                                                                      style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                      }}
                                                                    >
                                                                      {roomrentError}
                                                                    </label>
                                                                  </div>
                                                                )}
                                                              </div>
                                    
                                    
                                                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                                                <Form.Group>
                                                                  <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                                    Advance Amount
                                                                    <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                                                  </Form.Label>
                                                                  <FormControl
                                                                    type="text"
                                                                    placeholder="Enter Amount"
                                                                    value={AdvanceAmount}
                                                                    onChange={handleAdvanceAmount}
                                                                    style={{
                                                                      fontSize: 16,
                                                                      color: "#4B4B4B",
                                                                      fontFamily: "Gilroy",
                                                                      fontWeight: 500,
                                                                      boxShadow: "none",
                                                                      border: "1px solid #D9D9D9",
                                                                      height: 50,
                                                                      borderRadius: 8,
                                                                    }}
                                                                  />
                                                                </Form.Group>
                                                                {advanceAmountError && (
                                                                  <div style={{ color: "red" }}>
                                                                    <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                                                                    <label
                                                                      className="mb-0"
                                                                      style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                      }}
                                                                    >
                                                                      {advanceAmountError}
                                                                    </label>
                                                                  </div>
                                                                )}
                                                              </div>
                                    
                                    
                                                            
                                    
                                    
                                    
                                    
                                                            </div>
                                </Row>
                              
                                   
                                             <Row>
                                                <Col md={12}>
                                                 <Form.Group controlId="joiningDate">
                                                   <Form.Label
                                                     style={{
                                                       fontSize: 14,
                                                       color: "#222222",
                                                       fontFamily: "Gilroy",
                                                       fontWeight: 500,
                                                     }}
                                                   >
                                                     Joining Date (Tentative) {" "}
                                                     <span style={{ color: "red", fontSize: "20px" }}> * </span>
                                                   </Form.Label>
                                   
                                                   <div
                                                     className="datepicker-wrapper"
                                                     style={{ position: "relative", width: "100%", marginTop: 6 }}
                                                   >
                                                     <DatePicker
                                                       style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                                                       format="DD/MM/YYYY"
                                                       placeholder="DD/MM/YYYY"
                                                       value={checkin_joiningDate ? dayjs(checkin_joiningDate) : null}
                                                       onChange={(date) => {
                                                         setCheckinJoingDateErrmsg("");
                                                         setCheckinJoiningDate(date ? date.toDate() : null);
                                                       }}
                                                       disabledDate={(current) => current && current > dayjs().endOf("day")}
                                                      //  getPopupContainer={(triggerNode) =>
                                                      //    triggerNode.closest(".datepicker-wrapper")
                                                      //  }
                                                       getPopupContainer={() => document.body}
                                                     />
                                                   </div>
                                                 </Form.Group>
                                                 {Checkin_joiningDateErrmsg && (
                                                   <div style={{ color: "red" }}>
                                                     <MdError
                                                       style={{
                                                         marginRight: "5px",
                                                         fontSize: 14,
                                                         marginBottom: "1px",
                                                       }}
                                                     />
                                                     <span
                                                       style={{
                                                         color: "red",
                                                         fontSize: 12,
                                                         fontFamily: "Gilroy",
                                                         fontWeight: 500,
                                                       }}
                                                     >
                                                       {Checkin_joiningDateErrmsg}
                                                     </span>
                                                   </div>
                                                 )}
                                                 {/* {state.Booking?.ErrorAssignBookingDate && (
                                                   <div style={{ color: "red" }}>
                                                     <MdError
                                                       style={{
                                                         marginRight: "5px",
                                                         fontSize: 14,
                                                         marginBottom: "1px",
                                                       }}
                                                     />
                                                     <span
                                                       style={{
                                                         color: "red",
                                                         fontSize: 12,
                                                         fontFamily: "Gilroy",
                                                         fontWeight: 500,
                                                       }}
                                                     >
                                                       {state.Booking?.ErrorAssignBookingDate}
                                                     </span>
                                                   </div>
                                                 )} */}
                                   
                                   
                                   
                                               </Col>
                                             </Row>
        
        
                              </div>
        
                              <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-3 mb-3">
        
                                <div className="d-flex justify-content-between align-items-center p-4">
                                  <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                                  </div>
                                  <div>
                                    <Button
                                      onClick={handleAddField}
                                      style={{
                                        fontFamily: "Gilroy",
                                        fontSize: "14px",
                                        backgroundColor: "#1E45E1",
                                        color: "white",
                                        fontWeight: 600,
                                        borderRadius: "10px",
                                        padding: "6px 15px",
                                        marginBottom: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                      }}
                                    >
                                      <img
                                        src={addcircle}
                                        alt="Assign Bed"
                                        style={{
                                          height: 16,
                                          width: 16,
                                          filter: "brightness(0) invert(1)",
                                        }}
                                      />
                                      Add
                                    </Button>
        
                                  </div>
                                </div>
        
        
                                {fields.map((item, index) => {
                                  const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");
        
                                  const filteredOptions = reasonOptions.map((opt) => {
                                    if (opt.value === "maintenance") {
                                      return {
                                        ...opt,
                                        isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                                      };
                                    }
                                    return opt;
                                  });
        
                                  return (
                                    <div className="row px-4 mb-3" key={index}>
                                      <div className="col-md-6">
        
        
                                        {!item.showInput ? (
                                          <Select
                                            options={filteredOptions}
                                            value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                            onChange={(selectedOption) => {
                                              const selectedValue = selectedOption.value;
        
                                              if (selectedValue === "others") {
                                                handleInputChange(index, "reason", "others");
                                              } else {
                                                handleInputChange(index, "reason", selectedValue);
                                              }
                                            }}
                                            isDisabled={item.reason === "maintenance"}
                                            menuPlacement="auto"
                                            styles={{
                                              control: (base) => ({
                                                ...base,
                                                height: "50px",
                                                border: "1px solid #D9D9D9",
                                                borderRadius: "8px",
                                                fontSize: "16px",
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                boxShadow: "none",
                                              }),
                                              menu: (base) => ({
                                                ...base,
                                                backgroundColor: "#f8f9fa",
                                                border: "1px solid #ced4da",
                                                fontFamily: "Gilroy",
                                              }),
                                              menuList: (base) => ({
                                                ...base,
                                                backgroundColor: "#f8f9fa",
                                                maxHeight: "120px",
                                                padding: 0,
                                                scrollbarWidth: "thin",
                                                overflowY: "auto",
                                                fontFamily: "Gilroy",
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
                                                cursor: "pointer",
                                              }),
                                              indicatorSeparator: () => ({
                                                display: "none",
                                              }),
                                              option: (base, state) => ({
                                                ...base,
                                                cursor: state.isDisabled ? "not-allowed" : "pointer",
                                                backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                                color: state.isDisabled ? "#aaa" : "#000",
                                              }),
                                            }}
                                          />
                                        ) : (
                                          <>
                                            <input
                                              type="text"
                                              className="form-control"
                                              placeholder="Enter custom reason"
                                              value={item.customReason}
                                              onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
                                              style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                              }}
                                            />
                                          </>
                                        )}
                                        {errors[index]?.reason && (
                                          <div className="d-flex align-items-center mt-1">
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
                                              {errors[index]?.reason}
                                            </label>
                                          </div>
                                        )}
                                      </div>
        
        
                                      <div className="col-md-5">
        
                                        <input
                                          type="text"
                                          placeholder="Enter amount"
                                          value={item.amount}
                                          onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                          className="form-control"
                                          style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                            height: 50,
                                            borderRadius: 8,
                                          }}
        
                                        />
                                        {errors[index]?.amount && (
                                          <div className="d-flex align-items-center mt-1">
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
                                              {errors[index]?.amount}
                                            </label>
                                          </div>
                                        )}
                                      </div>
        
        
                                      <div className="col-md-1 d-flex justify-content-center align-items-center p-0">
        
                                        {index !== 0 && (
                                          <Trash
                                            size="20"
                                            color="red"
                                            variant="Bold"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => handleRemoveField(index)}
                                          />
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
        
        
        
        
                              </div>
        
        
        
        
        
        
        
        
        
                            </div>
        
                         
        
                            <div className="d-flex justify-content-end">
                                                           <Button
                                                             style={{
                                                               backgroundColor: "white",
                                                               fontWeight: 400,
                                                                padding:'5px 40px',
                                                               borderRadius: 10,
                                                               fontSize: 16,
                                                               fontFamily: "Gilroy",
                                                               color:'rgba(75, 75, 75, 1)',
                                                               border:'1px solid white'
                                                             }}
                                                              onClick={handleClose}
                                                           >
                                                            Cancel
                                                           </Button>
                                         
                                                           <Button
                                                             style={{
                                                               backgroundColor: "#1E45E1",
                                                               fontWeight: 500,
                                                               // height: 40,
                                                               borderRadius: 10,
                                                               fontSize: 16,
                                                               padding:'5px 40px',
                                                               fontFamily: "Gilroy",
                                                             }}
                                                             onClick={handleSaveCheckin}
                                                           >
                                                              Check-in
                                                           </Button>
                                                           </div>
                          </>
        
                            )
        
        
        
                          }
        
        
        
        
        
        
                        </div>
                      {/* )} */}
        
        
        
        
        
        
        
        
        
        
        
        
        
                    </div>
                  </Modal.Body>
        
        
                </Modal.Dialog>
              </Modal>

              <Modal
        show={advanceform}
        onHide={handleCloseAdvanceForm}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 666,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >

          <Modal.Header style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Generate Advance
            </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleCloseAdvanceForm}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>
          <Modal.Body style={{ paddingTop: 2 }}>
            <div className="d-flex align-items-center">
              <div className="container">



                <div className="row mb-3">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2" controlId="checkoutDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Invoice Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={advanceDate ? dayjs(advanceDate) : null}
                          onChange={(date) => {
                            setAdvanceDateError("");
                            setAdvanceDate(date ? date.toDate() : null);
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".datepicker-wrapper")
                          }
                          dropdownClassName="custom-datepicker-popup"
                          disabledDate={(current) => current && current > dayjs().endOf("day")}
                        />
                      </div>
                    </Form.Group>
                    {advanceDateError && (
                      <div style={{ color: "red", marginTop: "-7px" }}>
                        <MdError
                          style={{ fontSize: "13px", marginRight: "5px" }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {advanceDateError}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2" controlId="checkoutDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Due Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={advanceDueDate ? dayjs(advanceDueDate) : null}
                          onChange={(date) => {
                            setAdvanceDueDateError("");
                            setAdvanceDueDate(date ? date.toDate() : null);
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".datepicker-wrapper")
                          }
                          dropdownClassName="custom-datepicker-popup"
                        />
                      </div>
                    </Form.Group>
                    {advanceDueDateError && (
                      <div style={{ color: "red", marginTop: "-7px" }}>
                        <MdError
                          style={{ fontSize: "13px", marginRight: "5px" }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {advanceDueDateError}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row col-md-12 col-lg-12">
                  <div className="col-md-6 col-lg-6">
                    <Button
                      variant="secondary"
                      className="w-100"
                      style={{
                        height: 45,
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                      onClick={handleSaveUserlistAddUserButon}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="col-md-6 col-lg-6 mb-2">
                    <Button
                      variant="primary"
                      className="w-100"
                      style={{
                        backgroundColor: "#1E45E1",
                        height: 45,
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        paddingLeft: 25,
                        paddingRight: 25,
                      }}
                      onClick={handleSaveAdvance}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </Modal.Body>
          {loading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
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
          </div>}


        </Modal.Dialog>
      </Modal>
        </>
    )
 }
 PGAssignTenant.propTypes = {
     show: PropTypes.func.isRequired,
     handleClose: PropTypes.func.isRequired,
     currentItem: PropTypes.func.isRequired,
 }

 export default PGAssignTenant ; 