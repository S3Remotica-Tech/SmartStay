/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormControl } from "react-bootstrap";
import React, { useState ,useRef , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
// import { MdError } from "react-icons/md";
import Error_Icon from "/src/Assets/Images/New_images/Error_warning.png"

function BookingBed({
  show, handleClose,currentItem
}) 

{
 
     const state = useSelector(state => state)
     const dispatch = useDispatch();

  console.log("currentitem" ,currentItem );
  
    const bookingcustomerRef = useRef();
    const dateRef = useRef();
    const amountRef = useRef();
    const bookingDateRef = useRef();

     const [amount, setAmount] = useState("");
     const [amountError, setamountError] = useState("");
     const [joiningDate, setJoiningDate] = useState(null);
     const [bookingDate, setBookingDate] = useState(null);
    //  const [checkoutDate , setCheckoutDate] = useState(null);
     const [joiningDateErrmsg, setJoingDateErrmsg] = useState('')
     const [bookingDateErrmsg, setBookingDateErrmsg] = useState('')
     const [dateError, setDateError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    const [booking_customername, setBookingCustomerName] = useState("");
    const [booking_customererrmsg, setBookingCustomerErrmsg] = useState("");
    const [customer_details , setCustomerDetails] = useState({})

  
console.log("currentItem",currentItem)
console.log("booking_customername",booking_customername)


useEffect(()=>{
    if (state.login.selectedHostel_Id && currentItem?.room?.Floor_Id && currentItem?.bed?.id && currentItem?.room?.Room_Id) {
      dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { hostel_id: state.login.selectedHostel_Id,floor_id:  currentItem?.room?.Floor_Id, room_id: currentItem?.room?.Room_Id, bed: currentItem?.bed?.id } })
        dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id},
      });
    }
},[currentItem])

  

//  useEffect(() => {
//   const userData = state.UsersList.Users.filter((item) => item.ID === customerID);
//   console.log("userData", customerID); 
// }, [state.UsersList, customerID]);
          useEffect(() => {

        const usersList = state?.UsersList?.Users;
        const userDetails = state?.PgList?.OccupiedCustomer; 
        
        if (
            Array.isArray(usersList) &&
            Array.isArray(userDetails) &&
            usersList.length > 0 &&
            userDetails.length > 0
        ) {
            const targetUserId = userDetails[0]?.User_Id?.trim()?.toLowerCase();
    
            const foundCustomer = usersList.find(
                (user) => user.User_Id?.trim()?.toLowerCase() === targetUserId
            );
    
            setCustomerDetails(foundCustomer || null);
        }
    }, [state?.UsersList?.Users , state?.PgList?.OccupiedCustomer]);

    // console.log("userdetails" ,customer_details.CheckoutDate);
    


      useEffect(() => {
              if(customer_details){
                setBookingCustomerName("")
                // const checkoutDate = customer_details?.CheckoutDate ? dayjs(customer_details?.CheckoutDate) : null;
                // setCheckoutDate(checkoutDate)
              }
              setFormLoading(false)
      },[customer_details])

       console.log("customerdetails", customer_details);
       
 
         const handleBookingCustomerName = (selectedOption) => {
     
         setBookingCustomerName(selectedOption?.value || '');
         if (!selectedOption) {
           setBookingCustomerErrmsg("Please Select Customer");
         } else {
           setBookingCustomerErrmsg("");
         }
       };

      const handleAmount = (e) => {
      const newAmount = e.target.value;
      if (!/^\d*$/.test(newAmount)) {
        return;
      }
      setAmount(newAmount);
      setamountError("");
    };


 const validateAssignField = (value, fieldName, ref, focusedRef) => {
  if (!value) {
    if (fieldName === "bookingcustomername") {
      setBookingCustomerErrmsg("Please Select Customer");
    } else if (fieldName === "joiningDate") {
      setJoingDateErrmsg("Please Select Joining Date");
    } else if (fieldName === "bookingDate") {
      setBookingDateErrmsg("Please Select Booking Date");
    } else if (fieldName === "amount") {
      setamountError("Please Enter Amount");
    }

    if (!focusedRef.current && ref?.current) {
      ref.current.focus();
      focusedRef.current = true;
    }
    return false;
  }

  // ✅ Clear only the respective field error
  if (fieldName === "bookingcustomername") {
    setBookingCustomerErrmsg("");
  } else if (fieldName === "joiningDate") {
    setJoingDateErrmsg("");
  } else if (fieldName === "bookingDate") {
    setBookingDateErrmsg("");
  } else if (fieldName === "amount") {
    setamountError("");
  }

  return true;
};



  console.log("booking_customername" , booking_customername);
  

       const handleSubmitBooking = () => {
    
        let hasError = false;
        const focusedRef = { current: false };
const isCustomerValid = validateAssignField(
  booking_customername,
  "bookingcustomername",
  bookingcustomerRef,
  focusedRef
);
const isJoiningDateValid = validateAssignField(joiningDate, "joiningDate", dateRef, focusedRef);
const isBookingDateValid = validateAssignField(bookingDate, "bookingDate", bookingDateRef, focusedRef);
const isAmountValid = validateAssignField(amount, "amount", amountRef, focusedRef);

if (!isCustomerValid || !isJoiningDateValid || !isBookingDateValid || !isAmountValid) {
  return;
}
    
      
    
        if (!bookingDate) {
          if (!focusedRef.current && bookingDateRef?.current) {
            bookingDateRef.current.focus();
            focusedRef.current = true;
          }
          hasError = true;
        }
       
        if (hasError) return;
        // if (
        //   !booking_customername ||
        //   !isJoiningDateValid ||
        //   !isAmountValid ||
        //   !isBookingDateValid
        // ) {
        //   return;
        // }
    
    
    
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
            setFormLoading(false)
            
            setJoingDateErrmsg('');
              dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id},
              });
    
             dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: currentItem?.room?.Floor_Id, hostel_Id: state.login.selectedHostel_Id } })
        
             handleClose()
            setTimeout(() => {
              dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
            }, 500);
          }
        }, [state?.Booking?.statusCodeForAddBooking]);

      useEffect(() => {
        dispatch({ type: 'UNASSIGNCUSTOMER', payload: { hostel_Id: currentItem.room.Hostel_Id} })
      },[])



  //   const isAlreadyAssigned =
  // booking_customername &&
  // !state.UsersList?.UnAssignCustomerDetails?.some(
  //   (u) => String(u.id) === String(booking_customername)
  // );



  return (
    <div>
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
          <Modal.Body>
            <Modal.Header
              className="pt-0 pb-2 mb-1"
              style={{
                position: "relative",
                borderBottom: "1px solid #e0e0e0",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div className="w-100 d-flex justify-content-between align-items-start">
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >
                  Booking
                </div>

                <CloseCircle
                  size="24"
                  color="#000"
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                />
              </div>

              <span
                className="text-primary"
                style={{
                  fontSize: "13px",
                  color: "#1E45E1",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Room No {currentItem?.room.Room_Name} &nbsp; | &nbsp; Bed {currentItem?.bed.bed_no}
              </span>
            </Modal.Header>

            <div
              style={{ maxHeight: "350px", overflowY: "scroll" }}
              className="show-scroll p-2 mt-1 me-1"
            >
              <div className="col-12 mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    paddingTop: "6px",
                  }}
                >
                  Select Tenant{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                                                        <div style={{
                                                                                                                                                                               color: "red",
                                                                                                                                                                                                                              backgroundColor: "rgba(255, 243, 243, 0.64)",
                                                                                                                                                                                                                                                                                           marginTop: 4,
                                                                                                                                                                                                                                                                                           display: "inline-flex", 
                                                                                                                                                                                                                                                                                           alignItems: "center",
                                                                                                                                                                                                                                                                                           padding: "4px 10px", 
                                                                                                                                                                                                                                                                                           borderRadius: 4,
                                                                                                                                                                                                                                                                                         }}> 
                                                                                                                                                                                                                                                                                         <img
                                                                                                                                                                                                                                                                                           src={Error_Icon}
                                                                                                                                                                                                                                                                                           alt="ErrorIcon"
                                                                                                                                                                                                                                                                                           style={{ marginRight: "4px", fontSize:15}}
                                                                                                                                                                                                                                                                                         />
                                                                                                                                                                                                                                                                                         <span
                                                                                                                                                                                                                                                                                           style={{
                                                                                                                                                                                                                                                                                             fontSize: "12px",
                                                                                                                                                                                                                                                                                             color: "red",
                                                                                                                                                                                                                                                                                             fontFamily: "Gilroy",
                                                                                                                                                                                                                                                                                             fontWeight: 500,
                                                                                                                                                                                                                                                                                             whiteSpace: "nowrap", 
                                      }}>
                                    {booking_customererrmsg}
                                             </span>
                                                   </div>
                                                    )}
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                  <Form.Group controlId="bookingDate">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Booking Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
    setBookingDateErrmsg("");
    setJoiningDate("");
  }}
  disabledDate={(current) => {
    const checkout = dayjs(customer_details.CheckoutDate).startOf('day');
    const today = dayjs().endOf('day');
    return current && (current.isBefore(checkout) || current.isAfter(today));
  }}
  getPopupContainer={() => document.body}
/>

                                                               </div>

                                                               {dateError && (
                                                                                                               <div style={{
                                                                                                                                                                               color: "red",
                                                                                                                                                                                                                              backgroundColor: "rgba(255, 243, 243, 0.64)",
                                                                                                                                                                                                                                                                                           marginTop: 4,
                                                                                                                                                                                                                                                                                           display: "inline-flex", 
                                                                                                                                                                                                                                                                                           alignItems: "center",
                                                                                                                                                                                                                                                                                           padding: "4px 10px", 
                                                                                                                                                                                                                                                                                           borderRadius: 4,
                                                                                                                                                                                                                                                                                         }}> 
                                                                                                                                                                                                                                                                                         <img
                                                                                                                                                                                                                                                                                           src={Error_Icon}
                                                                                                                                                                                                                                                                                           alt="ErrorIcon"
                                                                                                                                                                                                                                                                                           style={{ marginRight: "4px", fontSize:15}}
                                                                                                                                                                                                                                                                                         />
                                                                                                                                                                                                                                                                                         <span
                                                                                                                                                                                                                                                                                           style={{
                                                                                                                                                                                                                                                                                             fontSize: "12px",
                                                                                                                                                                                                                                                                                             color: "red",
                                                                                                                                                                                                                                                                                             fontFamily: "Gilroy",
                                                                                                                                                                                                                                                                                             fontWeight: 500,
                                                                                                                                                                                                                                                                                             whiteSpace: "nowrap", 
                                      }}>
                                    {dateError}
                                             </span>
                                                   </div>
                                                                                                         )}
                                                                                           
                                                                                                         {bookingDateErrmsg.trim() !== "" && (
                                                                                                                <div style={{
                                                                                                                                                                               color: "red",
                                                                                                                                                                                                                              backgroundColor: "rgba(255, 243, 243, 0.64)",
                                                                                                                                                                                                                                                                                           marginTop: 4,
                                                                                                                                                                                                                                                                                           display: "inline-flex", 
                                                                                                                                                                                                                                                                                           alignItems: "center",
                                                                                                                                                                                                                                                                                           padding: "4px 10px", 
                                                                                                                                                                                                                                                                                           borderRadius: 4,
                                                                                                                                                                                                                                                                                         }}> 
                                                                                                                                                                                                                                                                                         <img
                                                                                                                                                                                                                                                                                           src={Error_Icon}
                                                                                                                                                                                                                                                                                           alt="ErrorIcon"
                                                                                                                                                                                                                                                                                           style={{ marginRight: "4px", fontSize:15}}
                                                                                                                                                                                                                                                                                         />
                                                                                                                                                                                                                                                                                         <span
                                                                                                                                                                                                                                                                                           style={{
                                                                                                                                                                                                                                                                                             fontSize: "12px",
                                                                                                                                                                                                                                                                                             color: "red",
                                                                                                                                                                                                                                                                                             fontFamily: "Gilroy",
                                                                                                                                                                                                                                                                                             fontWeight: 500,
                                                                                                                                                                                                                                                                                             whiteSpace: "nowrap", 
                                      }}>
                                    {bookingDateErrmsg}
                                             </span>
                                                   </div>
                                                                                                         )}
                  </Form.Group>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 mb-2">
                  <Form.Group>
                    <Form.Label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Booking Amount
                      <span style={{ color: "red", fontSize: "20px" }}> *</span>
                    </Form.Label>

                    <div style={{ position: "relative" }}>
                      {/* <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: 12,
                          transform: "translateY(-50%)",
                          fontSize: 16,
                          color: "#000",
                          pointerEvents: "none",
                          zIndex: 1,

                        }}
                      >
                        ₹
                      </span> */}

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
                    </div>
                  </Form.Group>
                    {amountError && (
                                                                <div style={{
                                                                                                                                                                               color: "red",
                                                                                                                                                                                                                              backgroundColor: "rgba(255, 243, 243, 0.64)",
                                                                                                                                                                                                                                                                                           marginTop: 4,
                                                                                                                                                                                                                                                                                           display: "inline-flex", 
                                                                                                                                                                                                                                                                                           alignItems: "center",
                                                                                                                                                                                                                                                                                           padding: "4px 10px", 
                                                                                                                                                                                                                                                                                           borderRadius: 4,
                                                                                                                                                                                                                                                                                         }}> 
                                                                                                                                                                                                                                                                                         <img
                                                                                                                                                                                                                                                                                           src={Error_Icon}
                                                                                                                                                                                                                                                                                           alt="ErrorIcon"
                                                                                                                                                                                                                                                                                           style={{ marginRight: "4px", fontSize:15}}
                                                                                                                                                                                                                                                                                         />
                                                                                                                                                                                                                                                                                         <span
                                                                                                                                                                                                                                                                                           style={{
                                                                                                                                                                                                                                                                                             fontSize: "12px",
                                                                                                                                                                                                                                                                                             color: "red",
                                                                                                                                                                                                                                                                                             fontFamily: "Gilroy",
                                                                                                                                                                                                                                                                                             fontWeight: 500,
                                                                                                                                                                                                                                                                                             whiteSpace: "nowrap", 
                                      }}>
                                    {amountError}
                                             </span>
                                                   </div>
                                                            )}
                </div>
              </div>

              <div className="col-12 mb-3">
                <Form.Group controlId="joiningDate">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Joining Date {" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>

                    <div
                                                                       className="datepicker-wrapper"
                                                                       style={{ position: "relative", width: "100%", marginTop: 6 }}
                                                                     >
                                                                      
<DatePicker
  style={{
    width: "100%",
    height: 48,
    cursor: "pointer",
    fontFamily: "Gilroy",
  }}
  format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
  value={joiningDate ? dayjs(joiningDate) : null}
  onChange={(date) => {
    setDateError("");
    setJoiningDate(date ? date.toDate() : null);
    dispatch({ type: "REMOVE_ERROR_BOOKING_DATE" });
    setJoingDateErrmsg("");
  }}
  getPopupContainer={() => document.body}
  disabledDate={(current) => {
    if (!bookingDate) return true;

    return current && current.isBefore(dayjs(bookingDate), "day");
  }}
/>


                                                                     </div>
                </Form.Group>
                     {dateError && (
                                                                       <div style={{
                                                                                                                                                                               color: "red",
                                                                                                                                                                                                                              backgroundColor: "rgba(255, 243, 243, 0.64)",
                                                                                                                                                                                                                                                                                           marginTop: 4,
                                                                                                                                                                                                                                                                                           display: "inline-flex", 
                                                                                                                                                                                                                                                                                           alignItems: "center",
                                                                                                                                                                                                                                                                                           padding: "4px 10px", 
                                                                                                                                                                                                                                                                                           borderRadius: 4,
                                                                                                                                                                                                                                                                                         }}> 
                                                                                                                                                                                                                                                                                         <img
                                                                                                                                                                                                                                                                                           src={Error_Icon}
                                                                                                                                                                                                                                                                                           alt="ErrorIcon"
                                                                                                                                                                                                                                                                                           style={{ marginRight: "4px", fontSize:15}}
                                                                                                                                                                                                                                                                                         />
                                                                                                                                                                                                                                                                                         <span
                                                                                                                                                                                                                                                                                           style={{
                                                                                                                                                                                                                                                                                             fontSize: "12px",
                                                                                                                                                                                                                                                                                             color: "red",
                                                                                                                                                                                                                                                                                             fontFamily: "Gilroy",
                                                                                                                                                                                                                                                                                             fontWeight: 500,
                                                                                                                                                                                                                                                                                             whiteSpace: "nowrap", 
                                      }}>
                                    {dateError}
                                             </span>
                                                   </div>
                                                                 )}
                
                                                                        {joiningDateErrmsg.trim() !== "" && (
                                                                             <div style={{
                                                                                                                                                                               color: "red",
                                                                                                                                                                                                                              backgroundColor: "rgba(255, 243, 243, 0.64)",
                                                                                                                                                                                                                                                                                           marginTop: 4,
                                                                                                                                                                                                                                                                                           display: "inline-flex", 
                                                                                                                                                                                                                                                                                           alignItems: "center",
                                                                                                                                                                                                                                                                                           padding: "4px 10px", 
                                                                                                                                                                                                                                                                                           borderRadius: 4,
                                                                                                                                                                                                                                                                                         }}> 
                                                                                                                                                                                                                                                                                         <img
                                                                                                                                                                                                                                                                                           src={Error_Icon}
                                                                                                                                                                                                                                                                                           alt="ErrorIcon"
                                                                                                                                                                                                                                                                                           style={{ marginRight: "4px", fontSize:15}}
                                                                                                                                                                                                                                                                                         />
                                                                                                                                                                                                                                                                                         <span
                                                                                                                                                                                                                                                                                           style={{
                                                                                                                                                                                                                                                                                             fontSize: "12px",
                                                                                                                                                                                                                                                                                             color: "red",
                                                                                                                                                                                                                                                                                             fontFamily: "Gilroy",
                                                                                                                                                                                                                                                                                             fontWeight: 500,
                                                                                                                                                                                                                                                                                             whiteSpace: "nowrap", 
                                      }}>
                                    {joiningDateErrmsg}
                                             </span>
                                                   </div>
                                                          )}
                                                             
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "flex-end",
              }}
            >
              <button
                type="button"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#333",
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Montserrat",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="button"
                style={{
                  backgroundColor: "#1E45E1",
                  color: "#fff",
                  fontWeight: 600,
                  height: 40,
                  borderRadius: 8,
                  fontSize: 14,
                  fontFamily: "Montserrat",
                  padding: "0 24px",
                  border: "none",
                  cursor: "pointer",
                 
                }}
                onClick={handleSubmitBooking}
                // disabled={isAlreadyAssigned}
                
              >
                Book
              </button>
            </div>
          </Modal.Body>
            {formLoading && <div
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
    </div>
  );
}

BookingBed.propTypes = {
  show:PropTypes.func.isRequired,
  handleClose:PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  customerID: PropTypes.func.isRequired,

 
};

export default BookingBed;