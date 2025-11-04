/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Row, Col, } from "react-bootstrap";
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import ErrorMessage from '../../Components/ErrorMessage'

const PGAssignTenant = ({ show, handleClose, currentItem, }) => {

  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const modeofRef = useRef()
  const [activeTab, setActiveTab] = useState("LONG");
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState([]);
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [checkin_joiningDate, setCheckinJoiningDate] = useState(new Date());
  const [Checkin_joiningDateErrmsg, setCheckinJoingDateErrmsg] = useState('')
  const [isTrigger, setIsTrigger] = useState(false)
  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];



  useEffect(() => {
    if (currentItem) {
      setRoomRent(currentItem?.rentAmount);
    }
  }, [currentItem]);

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

    if (field === "reason" || field === "customReason") {
      const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

      if (field === "reason") {
        if (cleanedValue.toLowerCase() === "others") {
          updatedFields[index].showInput = true;
          updatedFields[index].reason_name = "others";
          updatedFields[index].customReason = "";
        } else {
          updatedFields[index].showInput = false;
          updatedFields[index].reason = cleanedValue;
          updatedFields[index].reason_name = cleanedValue;
          updatedFields[index].customReason = "";
        }
      } else if (field === "customReason") {
        updatedFields[index].customReason = cleanedValue;
      }

      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      const numericValue = value.replace(/[^0-9]/g, "");
      updatedFields[index].amount = numericValue;
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




  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      dispatch({ type: 'UNASSIGNCUSTOMER', payload: { hostel_id: state.login.selectedHostel_Id, type: "inactive" } })
      setIsTrigger(true)


    }
  }, []);

  var toastStyle = {

    fontFamily: "Gilroy",
    fontWeight: 600,
    fontSize: 14,
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    padding: "10px",

  };
  useEffect(() => {
    if (state.bankingDetails.bankingList.listBanks) {
      if (state.bankingDetails?.bankingList?.listBanks.length === 0 && isTrigger) {
        toast.error(
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "Gilroy" }}>Please Create Banking before adding booking</span>
          </div>,
        );
        setIsTrigger(false)
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.bankingList.listBanks]);


  useEffect(() => {
    if (state.UsersList?.UnAssignCustomerDetails?.length === 0 && isTrigger) {

      toast.error(
        "Please create a new tenant",
        {
          hideProgressBar: true,
          closeButton: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: toastStyle
        });
      setIsTrigger(false)
    }
  }, [state.UsersList?.UnAssignCustomerDetails]);









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

  const [paymentError, setPaymentError] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");

  const [transactionId, setTransactionId] = useState("")
  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };


  const labelMap = {
    CARD: "Card",
    CASH: "Cash",
    UPI: "UPI",
    BANK: "Bank",
  };

  const paymentOptions = Array.isArray(state.bankingDetails.bankingList.listBanks)
    ? state.bankingDetails?.bankingList?.listBanks.map((item) => ({
      value: String(item.bankingId),
      label: `${item.accountHolderName} - ${labelMap[item.accountType] || ""}`,
    }))
    : [];



  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setPaymentError("")
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
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
        case "modeofpayment":
          setError("Please Select Payment Mode");
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
    const trimmedValue = String(value ?? "").trim();
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
    const ismodeofpayment = validateAssignField(modeOfPayment, "modeofpayment", modeofRef, setPaymentError, focusedRef);


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
      !isBookingDateValid ||
      !ismodeofpayment
    ) {
      return;
    }



    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(joiningDate);
    const bookingDateForFormatted = formatDate(bookingDate);





    dispatch({
      type: "ADD_BOOKING",
      payload: {
        hostelId: currentItem.hostelId,
        joiningDate: joiningDateForFormatted,
        bookingDate: bookingDateForFormatted,
        bookingAmount: amount,
        floorId: currentItem?.floorId,
        roomId: currentItem?.roomId,
        bedId: currentItem?.bedId,
        customerId: booking_customername,
        bankId: modeOfPayment,
        referenceNumber: transactionId

      },
    });
    setFormLoading(true)
  };


  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false)
      setJoingDateErrmsg('');
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

    }
  }, [state?.Booking?.statusCodeForAddBooking]);


  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
      setFormLoading(false)
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });


      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
        dispatch({ type: 'REMOVE_STATUS_CODE_FOR_CREATE_CUSTOMER_SAVE_INFO' })
      }, 2000);
    }
  }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);




  const [stay_typename, setStayTypeName] = useState("")
  const [stay_typenameErrmsg, setStayTypeNameErrMsg] = useState("")

  const stayTypes = [
    { value: "SHORT", label: "Short Stay" },
    { value: "LONG", label: "Long Stay" },
    { value: "DAY", label: "Day Stay" },
  ];

  const longStayOnly = stayTypes.filter((s) => s.value === "LONG");

  // onChange handler
  const handleStayTypeChange = (selectedOption) => {
    setStayTypeName(selectedOption?.value || '');
    if (!selectedOption) {
      setStayTypeNameErrMsg("Please Select Staytype");
    } else {
      setStayTypeNameErrMsg("");
    }
  };


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
    }
  }, [state.login.selectedHostel_Id]);








  const handleSaveCheckin = () => {

    let hasReasonAmountError = false;
    let newErrors = [];


    let hasError = false;

    // Validate basic fields
    if (!validateField(checkin_customername, "checkin_customername")) hasError = true;
    if (!validateField(stay_typename, "stay_typename")) hasError = true;
    if (!validateField(checkin_joiningDate, "checkin_joiningDate")) hasError = true;
    if (!validateField(AdvanceAmount, "AdvanceAmount")) hasError = true;
    if (!validateField(RoomRent, "RoomRent")) hasError = true;





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
        type: reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput
      };
    });
    setErrors(newErrors)


    if (hasReasonAmountError) return;

    if (hasError) return



    // const selectedUser = state?.UsersList?.Users.find(
    //   item => item.ID === checkin_customername
    // );



    // const fullName = selectedUser?.Name?.trim() || "";

    // const [FirstName, ...lastNameParts] = fullName.split(" ");

    // const LastName = lastNameParts.join(" ") || "";

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = checkin_joiningDate
      ? incrementDateAndFormat(checkin_joiningDate)
      : "";




    const invoiceDateObj = new Date(formattedDate);

    const dueDateObj = new Date(invoiceDateObj);
    dueDateObj.setDate(dueDateObj.getDate() + (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0));

    // const formattedAdvanceDueDate = dueDateObj.toISOString().split("T")[0];




    if (
      checkin_customername && stay_typename &&
      currentItem?.floorId &&
      currentItem?.roomId && currentItem?.bedId &&
      checkin_joiningDate &&
      AdvanceAmount > 0 &&
      RoomRent > 0
    ) {

      dispatch({
        type: 'CHECKIN',
        payload: {
          customerId: checkin_customername,
          hostelId: currentItem?.hostelId,
          floorId: currentItem?.floorId,
          bedId: currentItem?.bedId,
          roomId: currentItem?.roomId,
          joiningDate: formattedDate,
          advanceAmount: AdvanceAmount,
          rentalAmount: RoomRent,
          stayType: activeTab,
          deductions: formattedReasons

        }
      })
      setFormLoading(true)


    }

  };



  useEffect(() => {
    if (state.UsersList.statusCodeForCheckInCustomer === 201) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES_CHECK_IN' })
      }, 2000)
    }

  }, [state.UsersList.statusCodeForCheckInCustomer])





  useEffect(() => {
    if (state.UsersList?.bedAvailableError || state.Booking?.bookingBedError) {
      setFormLoading(false)
     
        
      
    }

  }, [state.UsersList?.bedAvailableError, state.Booking?.bookingBedError])




  return (
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
                      <span style={{
                        fontSize: 15,
                        fontWeight: 400,
                        fontFamily: "Gilroy",
                        color: 'rgba(30, 69, 225, 1)'
                      }}>{currentItem?.floorName}  {" "} <span style={{
                        fontSize: 14,
                        color: "#1E45E1",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}>|</span>  {" "}
                        {currentItem?.roomName}  {" "} <span style={{
                          fontSize: 14,
                          color: "#1E45E1",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}>|</span>  {" "} {currentItem?.bedName}</span>
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
                      onClick={() => setActiveTab("LONG")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "LONG" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "LONG" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Booking
                    </button>
                    <button
                      onClick={() => setActiveTab("SHORT")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "SHORT" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "SHORT" ? "white" : "black",
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

                {activeTab === "LONG" ? <>
                  <div style={{ maxHeight: "350px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                    <div className="row d-flex align-items-center">


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
                              Tenant <span style={{ color: "red", fontSize: "20px" }}>*</span>
                            </Form.Label>
                            <Select
                              options={
                                state.UsersList?.UnAssignCustomerDetails?.length > 0 &&
                                state.UsersList?.UnAssignCustomerDetails.map((u) => ({
                                  value: u.customerId,
                                  label: u.firstName,
                                }))

                              }
                              onChange={handleBookingCustomerName}
                              value={
                                booking_customername
                                  ? {
                                    value: booking_customername,
                                    label:
                                      state.UsersList?.UnAssignCustomerDetails?.find((u) => u.customerId === booking_customername)?.firstName ||
                                      "Select Tenant",
                                  }
                                  : null
                              }
                              placeholder="Select Tenant"
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
                                  color: "#9AA0A6",
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
                              <ErrorMessage message={booking_customererrmsg} type="error" />
                            )}
                          </Form.Group>
                        </div>


                      </div>

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
                              className={bookingDate ? "datepicker-bold" : "datepicker-normal"}
                              ref={bookingDateRef}
                              style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", fontWeight: bookingDate ? 600 : 500, }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={bookingDate ? dayjs(bookingDate) : null}
                              onChange={(date) => {
                                setDateError("");
                                setBookingDate(date ? date.toDate() : null);
                                setBookingDateErrmsg('');
                                setJoiningDate("")
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
                          <ErrorMessage message={dateError} type="error" />
                        )}

                        {bookingDateErrmsg.trim() !== "" && (
                          <ErrorMessage message={bookingDateErrmsg} type="error" />
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
                              fontWeight: amount ? 600 : 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
                        </Form.Group>
                        {amountError && (
                          <ErrorMessage message={amountError} type="error" />
                        )}
                      </Col>



                      <Col md={6}>
                        <Form.Group

                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,

                            }}
                          >
                            Mode Of Transaction {" "}
                            <span
                              style={{
                                color: "#FF0000",
                                fontSize: "20px",
                              }}
                            >
                              *
                            </span>
                          </Form.Label>


                          <Select
                            options={paymentOptions}
                            onChange={(selectedOption) =>
                              handleModeOfPaymentChange(selectedOption?.value)
                            }
                            value={
                              modeOfPayment
                                ? paymentOptions.find((opt) => opt.value === String(modeOfPayment)) || null
                                : null
                            }
                            placeholder="Select Payment"
                            // isDisabled={currentItem}
                            noOptionsMessage={() => "No mode available"}
                            styles={{
                              control: (base) => ({
                                ...base,
                                fontSize: 16,
                                color: "rgba(75, 75, 75, 1)",
                                fontFamily: "Gilroy",
                                fontWeight: modeOfPayment ? 600 : 500,
                                border: "1px solid #D9D9D9",
                                borderRadius: "8px",
                                boxShadow: "none",
                                height: 48,
                                cursor: "pointer",
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
                                color: "#9AA0A6",
                              }),
                              dropdownIndicator: (base) => ({
                                ...base,
                                color: "#555",
                                cursor: "pointer",
                              }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                backgroundColor: state.isFocused ? "lightblue" : "white",
                                color: "#000",
                                fontFamily: "Gilroy",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                            }}
                          />


                        </Form.Group>
                        {paymentError && (
                          <ErrorMessage message={paymentError} type="error" />
                        )}
                      </Col>



                      <Col md={6}>
                        <Form.Group >
                          <Form.Label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                            }}
                          >
                            Transaction ID{" "}
                            <span
                              style={{
                                color: "white",
                                fontSize: "20px",
                              }}
                            >

                            </span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            id="form-controls"
                            placeholder="Enter Transaction ID"
                            value={transactionId}
                            onChange={(e) => handleTransactionId(e)}

                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: transactionId ? 600 : 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
                        </Form.Group>



                      </Col>

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
                              disabledDate={(current) => {
                                if (!bookingDate) {
                                  return true;
                                }
                                return current && current.isBefore(dayjs(bookingDate), "day");
                              }}
                              // disabledDate={(current) => current && current < dayjs().startOf("day")}
                              getPopupContainer={() => document.body}
                            />
                          </div>
                        </Form.Group>
                        {dateError && (
                          <ErrorMessage message={dateError} type="error" />
                        )}

                        {joiningDateErrmsg.trim() !== "" && (
                          <ErrorMessage message={joiningDateErrmsg} type="error" />
                        )}




                      </Col>

                      {state.Booking?.bookingBedError ?
                        <div className="d-flex justify-content-center">
                          <ErrorMessage message={state.Booking?.bookingBedError} type="error" />
                        </div>
                        : null}

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

                  <div className="d-flex justify-content-end">
                    <Button
                      style={{
                        backgroundColor: "white",
                        fontWeight: 400,
                        padding: '5px 40px',
                        borderRadius: 10,
                        fontSize: 16,
                        fontFamily: "Gilroy",
                        color: 'rgba(75, 75, 75, 1)',
                        border: '1px solid white'
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
                        padding: '5px 40px',
                        fontFamily: "Gilroy",
                      }}
                      onClick={handleSubmitBooking}
                    >
                      Book
                    </Button>
                  </div>
                </>

                  :



                  activeTab === "SHORT" && (
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
                                    Tenant <span style={{ color: "red", fontSize: "20px" }}>*</span>
                                  </Form.Label>
                                  <Select
                                    options={
                                      state.UsersList?.UnAssignCustomerDetails?.length > 0 &&
                                      state.UsersList?.UnAssignCustomerDetails.map((u) => ({
                                        value: u.customerId,
                                        label: u.firstName,
                                      }))

                                    }
                                    onChange={handleCheckinCustomerName}
                                    value={
                                      checkin_customername
                                        ? {
                                          value: checkin_customername,
                                          label:
                                            state.UsersList?.UnAssignCustomerDetails?.find((u) => u.customerId === checkin_customername)?.firstName ||
                                            "Select Tenant",
                                        }
                                        : null
                                    }
                                    placeholder="Select Tenant"
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
                                        color: "#9aa0a6",
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
                                    <ErrorMessage message={checkin_customererrmsg} type="error" />
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
                                    padding: "3px 5px ",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    color: "#4B4B4B",
                                    fontFamily: "Gilroy",
                                    fontWeight: longStayOnly ? 600 : 500,
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
                                    color: "#9aa0a6",
                                    fontWeight: 500
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


                            </div>
                            {stay_typenameErrmsg.trim() !== "" && (
                              <ErrorMessage message={stay_typenameErrmsg} type="error" />
                            )}
                          </Row>

                          <Row>


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
                                    fontWeight: RoomRent ? 600 : 500,
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    height: 50,
                                    borderRadius: 8,
                                  }}
                                />
                              </Form.Group>
                              {roomrentError && (
                                <ErrorMessage message={roomrentError} type="error" />
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
                                    fontWeight: AdvanceAmount ? 600 : 500,
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    height: 50,
                                    borderRadius: 8,
                                  }}
                                />
                              </Form.Group>
                              {advanceAmountError && (
                                <ErrorMessage message={advanceAmountError} type="error" />
                              )}
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
                                  Joining Date  {" "}
                                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                                </Form.Label>

                                <div
                                  className="datepicker-wrapper"
                                  style={{ position: "relative", width: "100%", marginTop: 6 }}
                                >
                                  <DatePicker
                                    style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", fontWeight: checkin_joiningDate ? 600 : 500, color: checkin_joiningDate ? "#4B4B4B" : "#9AA0A6", }}
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
                                <ErrorMessage message={Checkin_joiningDateErrmsg} type="error" />
                              )}




                            </Col>
                          </Row>


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
                                    <ErrorMessage message={errors[index]?.reason} type="error" />
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
                                    <ErrorMessage message={errors[index]?.amount} type="error" />
                                  )}
                                </div>


                                <div className="col-md-1 d-flex justify-content-center align-items-center p-0">


                                  <Trash
                                    size="20"
                                    color="red"
                                    variant="Bold"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleRemoveField(index)}
                                  />

                                </div>
                              </div>
                            );
                          })}




                        </div>









                      </div>

                      {state.UsersList?.bedAvailableError ?
                      <div className="d-flex justify-content-center">
                        <ErrorMessage message={state.UsersList?.bedAvailableError} type="error" />
                        </div>
                        : null}

                    



                      <div className="d-flex justify-content-end">
                        <Button
                          style={{
                            backgroundColor: "white",
                            fontWeight: 400,
                            padding: '5px 40px',
                            borderRadius: 10,
                            fontSize: 16,
                            fontFamily: "Gilroy",
                            color: 'rgba(75, 75, 75, 1)',
                            border: '1px solid white'
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
                            padding: '5px 40px',
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

    </>
  )
}
PGAssignTenant.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
}

export default PGAssignTenant; 