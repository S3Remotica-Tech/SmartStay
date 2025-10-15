import PropTypes from "prop-types";
/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useState , useRef , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, } from "react-bootstrap";
import {  FormControl } from "react-bootstrap";
import { FiRepeat } from "react-icons/fi";
import building from '/src/Assets/Images/New_images/building1.svg';
import Frame from "/src/Assets/Images/New_images/Frame.svg";
import Group from "/src/Assets/Images/New_images/Group.png";
import { CloseCircle } from "iconsax-react";
import repeatOne from "/src/Assets/Images/New_images/repeate-one.svg";
// import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import Error_Icon from "/src/Assets/Images/New_images/Error_warning.png";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);


function ConfirmChangeBed({ show, handleClose , reserved_customer  , selectedBedDetails , floorName}) {
ConfirmChangeBed.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  reserved_customer: PropTypes.func.isRequired,
  selectedBedDetails: PropTypes.func.isRequired,
  floorName: PropTypes.func.isRequired,
};

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(null);
  const selectedDateRef = useRef(null);
  const focusedRef = useRef(false);
  const rentRef = useRef(null);

  const [lastDate, setLastDate] = useState("");
  const [joiningdate, setJoiningDate] = useState("")
  const [reAssignDate,setReAssignDate] = useState("")
  const [dateError, setDateError] = useState("");
  const [currentRoomRent, setCurrentRoomRent] = useState("");
  const [newRoomRent, setNewRoomRent] = useState("");
  const [rentError, setRentError] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");


    const handleNewRoomRent = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setNewRoomRent(newAmount);
    setRentError("");
  };


   console.log("reservedcustomer", reserved_customer);
   


   const validateAssignField = (value, fieldName, ref, focusedRef, setError) => {
    const isValueEmpty =
      (typeof value === "string" && (
        value.trim() === "" ||
        value === "Selected Room" ||
        value === "Selected Floor" ||
        value === "Selected Bed"
      )) ||
      value === undefined ||
      value === null ||
      value === "0";

    if (isValueEmpty) {
      switch (fieldName) {
        case "newRoomRent":
          setError("Please Enter New Rent Amount");
          break;
        case "selectedDate":
          setError("Please Select Date");
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

    setError("");
    return true;
  };


  console.log("selectedCustomer", selectedCustomer);
  

  //  const handleSaveReassignBed = () => {
  //   focusedRef.current = false;
  //   let hasError = false;

  //   if (!validateAssignField(newRoomRent, "newRoomRent", rentRef, focusedRef, setRentError)) hasError = true;
  //   if (!validateAssignField(selectedDate, "selectedDate", selectedDateRef, focusedRef, setDateError)) hasError = true;

  //   if (hasError) return;

  //   const formatToISODate = (date) => {
  //     const d = new Date(date);
  //     const yyyy = d.getFullYear();
  //     const mm = String(d.getMonth() + 1).padStart(2, '0');
  //     const dd = String(d.getDate()).padStart(2, '0');
  //     return `${yyyy}-${mm}-${dd}`;
  //   };

  //   const formattedDate = selectedDate ? formatToISODate(selectedDate) : "";

  //   if(formattedDate && newRoomRent && selectedCustomer){
  //     dispatch({
  //     type: "CUSTOMERREASSINBED",
  //     payload: {
  //       hostel_id: Number(selectedCustomer.Hostel_Id),
  //       c_floor: Number(selectedCustomer.Floor),
  //       c_room: Number(selectedCustomer.Room_Id),
  //       c_bed: Number(selectedCustomer.Bed),
  //       re_floor: selectedBedDetails.floorId,
  //       re_room: selectedBedDetails.RoomId,
  //       re_bed: selectedBedDetails.bedId,
  //       re_date: formattedDate,
  //       re_rent: newRoomRent,
  //       user_id: selectedCustomer?.ID,
  //     },
  //   });
  //   }

  //   else if (reserved_customer?.bed_status === "Booking"){
  //         dispatch({
  //     type: "BOOKING_BEDCHANGE",
  //     payload: {
  //       hostel_id: Number(selectedCustomer.Hostel_Id),
  //       floor_id: Number(selectedCustomer.Floor),
  //       room_id: Number(selectedCustomer.Room_Id),
  //       bed_id: Number(selectedCustomer.Bed),
  //       change_floor_id: selectedBedDetails.floorId,
  //       change_room_id: selectedBedDetails.RoomId,
  //       change_bed_id: selectedBedDetails.bedId,
  //       bookingDate: formattedDate,
  //       id: selectedCustomer?.ID,
  //     },
  //   });
  //   }
  // };


  const handleSaveReassignBed = () => {
  focusedRef.current = false;
  let hasError = false;

  if (!validateAssignField(newRoomRent, "newRoomRent", rentRef, focusedRef, setRentError)) hasError = true;
  if (!validateAssignField(selectedDate, "selectedDate", selectedDateRef, focusedRef, setDateError)) hasError = true;

  if (hasError) return;

  const formatToISODate = (date) => {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const formattedDate = selectedDate ? formatToISODate(selectedDate) : "";

  // 🔹 PRIORITY: Check if customer is in Booking status
  if (reserved_customer?.bed_status === "Booking" && reserved_customer && formattedDate) {
    dispatch({
      type: "BOOKING_BEDCHANGE",
      payload: {
        hostel_id: Number(selectedCustomer.Hostel_Id),
        floor_id: Number(reserved_customer.booking_floor_id),
        room_id: Number(reserved_customer.booking_room_id),
        bed_id: Number(reserved_customer.booking_bed_id),
        change_floor_id: selectedBedDetails.floorId,
        change_room_id: selectedBedDetails.RoomId,
        change_bed_id: selectedBedDetails.bedId,
        bookingDate: formattedDate,
        id: reserved_customer?.ID,
      },
    });
  } 
  // 🔹 Otherwise, it's a normal reassignment
  else if (formattedDate && newRoomRent && selectedCustomer) {
    dispatch({
      type: "CUSTOMERREASSINBED",
      payload: {
        hostel_id: Number(selectedCustomer.Hostel_Id),
        c_floor: Number(selectedCustomer.Floor),
        c_room: Number(selectedCustomer.Room_Id),
        c_bed: Number(selectedCustomer.Bed),
        re_floor: selectedBedDetails.floorId,
        re_room: selectedBedDetails.RoomId,
        re_bed: selectedBedDetails.bedId,
        re_date: formattedDate,
        re_rent: newRoomRent,
        user_id: selectedCustomer?.ID,
      },
    });
  }

  // setFormLoading(true)
};

useEffect(() => {
  if (selectedBedDetails?.bedamount ) {
    // default → show bed amount
    setNewRoomRent(selectedBedDetails.bedamount);
      const customerData = state.UsersList.customerdetails?.data?.[0]; 
    if(customerData){
        setCurrentRoomRent(customerData?.RoomRent || "");
    }
  }
}, [selectedBedDetails]);

    //  useEffect(() => {
    //     dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props?.id } });
    //  }, [props]);
    
      console.log("selectedCustomer", selectedCustomer);


    
      useEffect(() => {
        if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
          const customerData = state.UsersList.customerdetails?.data?.[0]; 
          const invoiceDetails = state.UsersList.customerdetails?.invoice_details;
         console.log("customerData", customerData);
         setSelectedCustomer(customerData)
         
        setCurrentRoomRent(customerData?.RoomRent)
          if (customerData?.joining_Date) {
            const joining = new Date(customerData.joining_Date);
            const formattedJoining = `${String(joining.getDate()).padStart(2, "0")}-${String(
              joining.getMonth() + 1
            ).padStart(2, "0")}-${joining.getFullYear()}`;
            setJoiningDate(formattedJoining);
          } else {
            setJoiningDate("");
          }
    
           if (customerData?.reassign_date) {
            const rejoining = new Date(customerData.reassign_date);
            const formattedJoining = `${String(rejoining.getDate()).padStart(2, "0")}-${String(
              rejoining.getMonth() + 1
            ).padStart(2, "0")}-${rejoining.getFullYear()}`;
            setReAssignDate(formattedJoining);
          } else {
            setReAssignDate("");
          }
    
         
          if (invoiceDetails && invoiceDetails.length > 0) {
            const dates = invoiceDetails.map((item) => item.Date).filter(Boolean);
            if (dates.length > 0) {
              const maxDate = new Date(Math.max(...dates.map((d) => new Date(d))));
              const formatted = `${String(maxDate.getDate()).padStart(2, "0")}-${String(
                maxDate.getMonth() + 1
              ).padStart(2, "0")}-${maxDate.getFullYear()}`;
              setLastDate(formatted);
            } else {
              setLastDate("");
            }
          } else {
            setLastDate("");
          }
    
        
          setTimeout(() => {
            dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
          }, 1000);
        }
      }, [state.UsersList.CustomerdetailsgetStatuscode]);





  return (


    <div>
      <Modal
        show={show}
        backdrop="static"
        style={{ marginTop: 50 }}
      >
        <Modal.Dialog
          style={{
            minWidth: 570,
            paddingRight: "10px",
            borderRadius: "30px",
            border: "none",
            boxShadow: "none",
          }}
          className="m-0 p-0"
        >
          <Modal.Header
            style={{ position: "relative" }}
          >
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Confirm Change Bed
            </div>
            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />


          </Modal.Header>


          <Modal.Body className="pb-1 pt-3" style={{ minHeight: 350, maxHeight: 540, }} >

            <div className="d-flex justify-content-between align-items-start mb-1" >

              <div>
                <p className="mb-2" style={{ fontFamily: 'Gilroy' }}>Current Bed</p>


                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={building}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="building"
                  />
                  <span style={{ position: 'relative', top: '4px', left: '3px' }}>{reserved_customer?.Booking_FloorName || reserved_customer?.floor_name} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Frame}
                    className="me-2"
                    style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    alt="Frame"
                  />
                  <span style={{ position: 'relative', top: '2px' }}>Room {reserved_customer?.Booking_Rooms || reserved_customer?.Rooms } </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Group}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="Group"
                  />
                  <span style={{ position: 'relative', top: '3px', left: '4px' }}>Bed {reserved_customer?.Booking_Bed || reserved_customer?.Bed} </span>
                </p>

              </div>

              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 33,
                  height: 33,
                  borderRadius: 10,
                  padding: 6,
                  backgroundColor: "#EEF1FF",
                  gap: 10,
                  opacity: 1,
                  transform: "rotate(0deg)",
                  marginTop: 80
                }}
              >
                <FiRepeat size={20} color="#1E45E1" />
              </div>



              <div>
                <h6 className="mb-3" style={{ fontFamily: 'Gilroy' }}>New Bed</h6>
                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={building}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="building"
                  />
                  <span style={{ position: 'relative', top: '4px', left: '3px' }}>{floorName? floorName : "-"} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Frame}
                    className="me-2"
                    style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
                    alt="Frame"
                  />
                  <span style={{ position: 'relative', top: '2px' }}>Room {selectedBedDetails.roomName} </span>
                </p>

                <p className="mb-3" style={{ fontFamily: 'Gilroy', fontSize: '16px' }}>
                  <img
                    src={Group}
                    className="me-2"
                    style={{ width: '20px', height: '20px', verticalAlign: 'middle' }}
                    alt="Group"
                  />
                  <span style={{ position: 'relative', top: '3px', left: '4px' }}>Bed {selectedBedDetails.bedNo} </span>
                </p>
              </div>
            </div>


           

             
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <Form.Group className="mb-2" controlId="purchaseDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Date{" "}
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
    border: "1px solid lightgrey",
    cursor: "pointer",
    fontFamily: "Gilroy",
  }}
  format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
  value={selectedDate ? dayjs(selectedDate) : null}
  ref={selectedDateRef}
  onChange={(date) => {
    setDateError("");
    setSelectedDate(date ? date.toDate() : null);
  }}
   getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".datepicker-wrapper")
                              }
   disabledDate={(current) => {
  if (!current) return false;

  const today = dayjs().endOf("day");

  let joining = null;
  if (joiningdate && /^\d{2}-\d{2}-\d{4}$/.test(joiningdate)) {
    const [dd, mm, yyyy] = joiningdate.split("-");
    joining = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
  }

  let lastBillDate = null;
  if (lastDate && /^\d{2}-\d{2}-\d{4}$/.test(lastDate)) {
    const [dd, mm, yyyy] = lastDate.split("-");
    lastBillDate = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
  }

  let reAssign = null;
  if (reAssignDate && /^\d{2}-\d{2}-\d{4}$/.test(reAssignDate)) {
    const [dd, mm, yyyy] = reAssignDate.split("-");
    reAssign = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
  }

  let minAllowedDate = null;
  if (reAssign) {
    minAllowedDate = reAssign;
  } else if (joining) {
    const sameMonth =
      joining.month() === today.month() &&
      joining.year() === today.year();

    if (sameMonth) {
      minAllowedDate = joining;
    } else if (lastBillDate) {
      minAllowedDate = lastBillDate;
    }
  }


  if (reserved_customer?.bed_status === "Booking" && reserved_customer?.booking_booking_date) {
    const bookingDate = dayjs(reserved_customer.booking_booking_date).startOf("day");

    if (bookingDate.isSame(today, "day")) {
      return !current.isSame(today, "day");
    }

    if (current.isBefore(bookingDate) || current.isAfter(today)) {
      return true; 
    }
    return false; 
  }

 
  if (current.isAfter(today)) {
    return true;
  }

  if (minAllowedDate && current.isBefore(minAllowedDate)) {
    return true;
  }

  return false;
}}


  // disabledDate={(current) => {
  //   if (!current) return false;

  //   const today = dayjs().endOf("day");


  //   let joining = null;
  //   if (joiningdate && /^\d{2}-\d{2}-\d{4}$/.test(joiningdate)) {
  //     const [dd, mm, yyyy] = joiningdate.split("-");
  //     joining = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
  //   }

    
  //   let lastBillDate = null;
  //   if (lastDate && /^\d{2}-\d{2}-\d{4}$/.test(lastDate)) {
  //     const [dd, mm, yyyy] = lastDate.split("-");
  //     lastBillDate = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
  //   }

    
  //   let reAssign = null;
  //   if (reAssignDate && /^\d{2}-\d{2}-\d{4}$/.test(reAssignDate)) {
  //     const [dd, mm, yyyy] = reAssignDate.split("-");
  //     reAssign = dayjs(`${yyyy}-${mm}-${dd}`).startOf("day");
  //   }

  //   let minAllowedDate = null;

  //   if (reAssign) {
   
  //     minAllowedDate = reAssign;
  //   } else if (joining) {
  //     const sameMonth =
  //       joining.month() === today.month() &&
  //       joining.year() === today.year();

  //     if (sameMonth) {
  //       minAllowedDate = joining;
  //     } else if (lastBillDate) {
  //       minAllowedDate = lastBillDate;
  //     }
  //   }

    
  //   if (current.isAfter(today)) {
  //     return true;
  //   }

 
  //   if (minAllowedDate && current.isBefore(minAllowedDate)) {
  //     return true;
  //   }

  //   return false;
  // }}
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
                                                                                                                                                                                              }}
                                                                                      >
                                                                                        {dateError}
                                                                                      </span>
                                                                                    </div>
                          )}
                        </Form.Group>



                      </div>

                      {reserved_customer.bed_status !== "Booking" && 
                      (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              display: "flex",
                              alignItems: "center",
                              whiteSpace: "nowrap",
                            }}
                          >
                            New Rent Amount {" "} <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                           <Form.Check className="ms-3">
  <Form.Check.Input
    type="checkbox"
    ref={rentRef}
    style={{ cursor: "pointer" }}  
    onChange={(e) => {
      if (e.target.checked) {
        setNewRoomRent(currentRoomRent);
        setRentError("");
      } else {
        setNewRoomRent(selectedBedDetails?.bedamount || "")
        setRentError("");
      }
    }}
  />
  <Form.Check.Label>
    <span
      style={{
        color: "#1E45E1",
        fontWeight: 500,
        whiteSpace: "nowrap",
        fontSize: 11,
        fontFamily: "Gilroy",
      }}
    >
      Same as Current
    </span>
  </Form.Check.Label>
</Form.Check>

                          </Form.Label>
                          <FormControl
                            onChange={(e) => handleNewRoomRent(e)}
                            value={newRoomRent}
                            type="text"
                            id="form-controls"
                            placeholder="Enter Amount"
                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                              marginTop: 8,
                            }}
                          />
                          {rentError && (
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
                                                                                                                                                                                              }}
                                                                                      >
                                                                                        {rentError}
                                                                                      </span>
                                                                                    </div>
                          )}
                        </Form.Group>


                      </div>
                      )
                      }

                    

             
            


           <div className="d-flex justify-content-end gap-3 mt-3">
  <Button
    variant="light"
    className="px-4"
    style={{
      border: "1px solid #ddd",
      width: "160px",
      backgroundColor: "white",
      fontSize: 16,
      fontFamily: "Gilroy",
    }}
    onClick={handleClose}
  >
    Cancel
  </Button>

  <Button
    variant="primary"
    className="px-4"
    style={{
      fontSize: 16,
      backgroundColor: "#1E45E1",
      color: "white",
      fontWeight: 600,
      borderRadius: 12,
      padding: "10px 20px",
      fontFamily: "Gilroy",
      width: "160px",
    }}
    onClick={handleSaveReassignBed}
  >
    <img src={repeatOne} alt="icon" className="me-2" />
    Assign
  </Button>
</div>

          </Modal.Body>


        </Modal.Dialog>
      </Modal>
      
     


    </div>

  );
}

export default ConfirmChangeBed;


