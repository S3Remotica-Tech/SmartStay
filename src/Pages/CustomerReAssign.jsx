/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { CloseCircle } from "iconsax-react";
dayjs.extend(customParseFormat);

function CustomerReAssign(props) {
  
  const state = useSelector((state) => state);
  console.log("CustomerReAssign",state)
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [currentFloor, setCurrentFloor] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentBed, setCurrentBed] = useState("");
  const [currentRoomId, setCurrentRoomId] = useState("");
  const [currentBedId, setCurrentBedId] = useState("");
  const [currentRoomRent, setCurrentRoomRent] = useState("");
  const [newRoomRent, setNewRoomRent] = useState("");
  const [currentHostel_id, setCurrentHostel_Id] = useState("");
  const [newFloor, setNewFloor] = useState("");
  const [newRoom, setNewRoom] = useState("");
  const [newBed, setNewBed] = useState("");
  const [userId, setUserId] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [rentError, setRentError] = useState("");
  const [formLoading, setFormLoading] = useState(false)


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

useEffect(()=>{
  if(userId){
dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: userId } });
  }
 
},[userId])

const [lastDate, setLastDate] = useState("");
console.log("userId",userId)
useEffect(()=>{
if(state.UsersList.CustomerdetailsgetStatuscode === 200){
  setTimeout(() => {
        dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })
      }, 500)
}

},[state.UsersList.CustomerdetailsgetStatuscode])
console.log("state.UsersList.CustomerdetailsgetStatuscode",state.UsersList.CustomerdetailsgetStatuscode)

 useEffect(() => {
  if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
    const invoiceDetails = state.UsersList.customerdetails.invoice_details;

    if (invoiceDetails && invoiceDetails.length > 0) {
      const dates = invoiceDetails
        .map(item => item.Date)
        .filter(date => !!date);

      if (dates.length > 0) {
        const maxDate = new Date(Math.max(...dates.map(d => new Date(d))));
        const formatted = `${String(maxDate.getDate()).padStart(2, "0")}-${String(maxDate.getMonth() + 1).padStart(2, "0")}-${maxDate.getFullYear()}`;
        setLastDate(formatted);
      } else {
        setLastDate("");
      }
    } else {
      setLastDate(""); 
    }

   
    setTimeout(() => {
      dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' });
    }, 1000);
  }
}, [state.UsersList.CustomerdetailsgetStatuscode]);
  console.log("lastdate",lastDate)

  useEffect(() => {
    setCurrentFloor(props.reAssignDetail.Floor);
    setCurrentRoom(props.reAssignDetail.Rooms);
    setCurrentBed(props.reAssignDetail.Bed);
    setCurrentRoomRent(props.reAssignDetail.RoomRent);
    setCurrentHostel_Id(state.login.selectedHostel_Id);
    setUserId(props.reAssignDetail.ID);
    setCurrentBedId(props.reAssignDetail.hstl_Bed);
    setCurrentRoomId(props.reAssignDetail.room_id);
  }, [props.reAssignDetail]);
  const handleCloseReAssign = () => {
    props.setCustomerReAssign(false);
    setRentError("");
    setRoomError("");
    setBedError("");
    setfloorError("");
    setDateError("");
    setNewFloor("");
    setNewRoom("");
    setNewBed("");
    setNewRoomRent("");
    setSelectedDate("");
    setLastDate("")
    setUserId("")
     dispatch({ type: 'CLEAR_CUSTOMER_DETAILS' })
  };

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: state.login.selectedHostel_Id },
    });
  }, [currentHostel_id]);

  useEffect(() => {
    if (currentHostel_id && newFloor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: {
          hostel_Id: state.login.selectedHostel_Id,
          floor_Id: newFloor,
        },
      });
    }
  }, [newFloor]);
  const handleFloor = (selectedOption) => {
    setNewFloor(selectedOption?.value || "");

    setfloorError("");
  };
  const handleBed = (selectedOption) => {
    setNewBed(selectedOption?.value || "");

    setBedError("");
  };
  const handleRooms = (selectedOption) => {
    const value = selectedOption?.value || "";
    setNewRoom(value);
    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: state.login.selectedHostel_Id,
        floor_id: newFloor,
        room_id: value,
      },
    });

    setRoomError("");
  };

  const rentRef = useRef(null);
  const floorRef = useRef(null);
  const roomRef = useRef(null);
  const BedRef = useRef(null);
  const selectedDateRef = useRef(null);
  const focusedRef = useRef(false);




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
        case "newFloor":
          setError("Please Select New Floor");
          break;
        case "newRoom":
          setError("Please Select New Room");
          break;
        case "newBed":
          setError("Please Select New Bed");
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

  

  const handleSaveReassignBed = () => {
    focusedRef.current = false;
    let hasError = false;

    if (!validateAssignField(newRoomRent, "newRoomRent", rentRef, focusedRef, setRentError)) hasError = true;
    if (!validateAssignField(newFloor, "newFloor", floorRef, focusedRef, setfloorError)) hasError = true;
    if (!validateAssignField(newRoom, "newRoom", roomRef, focusedRef, setRoomError)) hasError = true;
    if (!validateAssignField(newBed, "newBed", BedRef, focusedRef, setBedError)) hasError = true;
    if (!validateAssignField(selectedDate, "selectedDate", selectedDateRef, focusedRef, setDateError)) hasError = true;





if (selectedDate && props.reAssignDetail.user_join_date) {
  const joiningDate = new Date(props.reAssignDetail.user_join_date);
  const selected = new Date(selectedDate);
  const today = new Date();

  const joinDateOnly = new Date(joiningDate.getFullYear(), joiningDate.getMonth(), joiningDate.getDate());
  const selectedDateOnly = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  let lastDateOnly = null;
  const hasLastDate = lastDate && /^\d{2}-\d{2}-\d{4}$/.test(lastDate);

 
  if (selectedDateOnly < joinDateOnly) {
    setDateError("Before Join Date Not Allowed");
    hasError = true;
    return;
  }

  
  if (hasLastDate) {
    const [dd, mm, yyyy] = lastDate.split("-");
    const last = new Date(`${yyyy}-${mm}-${dd}`);
    lastDateOnly = new Date(last.getFullYear(), last.getMonth(), last.getDate());

    if (selectedDateOnly <= lastDateOnly) {
      setDateError("Bills already generated up to this date");
      hasError = true;
      return;
    }
  }

  
  if (selectedDateOnly > todayOnly) {
    setDateError("Future Date Not Allowed");
    hasError = true;
    return;
  }

 
  setDateError("");
}



    if (hasError) return;
    if (newRoom === "Selected Room") {
      setRoomError("Please Select a Valid Room");
      hasError = true;
      return;
    } else {
      setRoomError("");
    }
  





  const formatToISODate = (date) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const formattedDate = selectedDate ? formatToISODate(selectedDate) : "";


    dispatch({
      type: "CUSTOMERREASSINBED",
      payload: {
        hostel_id: currentHostel_id,
        c_floor: currentFloor,
        c_room: currentRoomId,
        c_bed: currentBedId,
        re_floor: newFloor,
        re_room: newRoom,
        re_bed: newBed,
        re_date: formattedDate,
        re_rent: newRoomRent,
        user_id: userId,
      },
    });
    setFormLoading(true)
  };





  useEffect(() => {
    if (state.UsersList.statusCodeForReassinBed === 200) {
      setFormLoading(false)
      handleCloseReAssign();
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_REASSIGN_BED" });
      }, 200);
    }
  }, [state.UsersList.statusCodeForReassinBed]);

  const handleNewRoomRent = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setNewRoomRent(newAmount);
    setRentError("");
  };

  return (
    <>
      <div>
        <Modal
          show={props.customerReassign}
          onHide={handleCloseReAssign}
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
                      Reassign Bed
                    </div>

                    <CloseCircle size="24" color="#000" onClick={handleCloseReAssign}
                      style={{ cursor: 'pointer' }} />
                  </Modal.Header>
            <Modal.Body  className="pb-1 pt-0">
              <div className="d-flex align-items-center">
                <div >
           

                
                  <div style={{ maxHeight: "390px", overflowY: "scroll" }} className="show-scroll p-2 mt-0 me-0">

                    <div className="row  d-flex align-items-center">
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Current Floor{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </Form.Label>
                          <FormControl
                            id="form-controls"
                            placeholder="Enter name"
                            type="text"
                            value={currentFloor}

                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #E7F1FF",
                              height: 50,
                              borderRadius: 8,
                              backgroundColor: "#E7F1FF",
                            }}
                          />
                        </Form.Group>

                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Current Room{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </Form.Label>
                          <FormControl
                            id="form-controls"
                            placeholder="Enter name"
                            type="text"
                            value={currentRoom}

                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #E7F1FF",
                              height: 50,
                              borderRadius: 8,
                              backgroundColor: "#E7F1FF",
                            }}
                          />
                        </Form.Group>

                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="mb-3">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Current Bed{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </Form.Label>
                          <FormControl
                            id="form-controls"
                            placeholder="Enter name"
                            type="text"
                            value={currentBed}

                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #E7F1FF",
                              height: 50,
                              borderRadius: 8,
                              backgroundColor: "#E7F1FF",
                            }}
                          />
                        </Form.Group>

                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                            }}
                          >
                            Current Rent Amount
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            id="form-controls"
                            placeholder="Enter Amount"
                            value={currentRoomRent}
                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #E7F1FF",
                              height: 50,
                              borderRadius: 8,
                              backgroundColor: "#E7F1FF",
                            }}
                          />
                        </Form.Group>

                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Reassign Floor
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>


                        <Select
                          options={
                            state.UsersList?.hosteldetailslist?.length > 0
                              ? state.UsersList.hosteldetailslist.map((u) => ({
                                value: u.floor_id,
                                label: u.floor_name,
                              }))
                              : []
                          }
                          onChange={handleFloor}
                          ref={floorRef}
                          value={
                            newFloor
                              ? {
                                value: newFloor,
                                label:
                                  state.UsersList?.hosteldetailslist?.find(
                                    (f) => f.floor_id === newFloor
                                  )?.floor_name || "Selected Floor",
                              }
                              : null
                          }
                          placeholder="Selected Floor"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          noOptionsMessage={() => "No floors available"}
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: newFloor ? 600 : 500,
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
                              cursor: "pointer"
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


                        {floorError && (
                          <div style={{ color: "red", marginTop: "1px" }}>
                            {" "}
                            <MdError
                              style={{ fontSize: "14px", marginRight: "4px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              {floorError}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Reassign Room{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>


                        <Select
                          options={
                            state.UsersList?.roomdetails?.length > 0
                              ? state.UsersList.roomdetails.map((item) => ({
                                value: item.Room_Id,
                                label: item.Room_Name,
                              }))
                              : []
                          }
                          onChange={handleRooms}
                          ref={roomRef}
                          value={
                            newRoom
                              ? {
                                value: newRoom,
                                label:
                                  state.UsersList?.roomdetails?.find(
                                    (room) => room.Room_Id === newRoom
                                  )?.Room_Name || "Selected Room",
                              }
                              : null
                          }
                          placeholder="Selected Room"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          noOptionsMessage={() => "No rooms available"}
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: newRoom ? 600 : 500,
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
                              cursor: "pointer"
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

                        {roomError && (
                          <div style={{ color: "red", marginTop: "1px" }}>
                            {" "}
                            <MdError
                              style={{ fontSize: "14px", marginRight: "4px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              {roomError}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Reassign Bed{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>



                        <Select
                          options={
                            state.UsersList?.bednumberdetails?.bed_details
                              ?.length > 0
                              ? state.UsersList.bednumberdetails.bed_details
                                .filter(
                                  (item) =>
                                    item.bed_no !== "0" &&
                                    item.bed_no !== "undefined" &&
                                    item.bed_no !== "" &&
                                    item.bed_no !== "null"
                                )
                                .map((item) => ({
                                  value: item.id,
                                  label: item.bed_no,
                                }))
                              : []
                          }
                          onChange={handleBed}
                          ref={BedRef}
                          value={
                            newBed
                              ? {
                                value: newBed,
                                label:
                                  state.UsersList?.bednumberdetails?.bed_details?.find(
                                    (bed) => bed.id === newBed
                                  )?.bed_no || "Selected Bed",
                              }
                              : null
                          }
                          placeholder="Selected Bed"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          noOptionsMessage={() => "No beds available"}
                          styles={{
                            control: (base) => ({
                              ...base,
                              height: "50px",
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              fontSize: "16px",
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: newBed ? 600 : 500,
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
                              cursor: "pointer"
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


                        {bedError && (
                          <div style={{ color: "red", marginTop: "1px" }}>
                            {" "}
                            <MdError
                              style={{ fontSize: "14px", marginRight: "4px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              {bedError}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                              style={{ width: "100%", height: 48, border: "1px solid lightgrey", cursor: "pointer", fontFamily: "Gilroy", }}
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
                            />
                          </div>
                            {dateError && (
                          <div style={{ color: "red", marginTop: "1px" }}>
                            {" "}
                            <MdError
                              style={{ fontSize: "14px", marginRight: "4px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              {dateError}
                            </span>
                          </div>
                        )}
                        </Form.Group>


                      
                      </div>



                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                            <Form.Check
                              type="checkbox"
                              label={
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
                              }
                              className="ms-3"
                              ref={rentRef}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewRoomRent(currentRoomRent);
                                  setRentError("");
                                } else {
                                  setNewRoomRent("");
                                  setRentError("");
                                }
                              }}
                            />
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
                          <div style={{ color: "red", marginTop: "0px" }}>
                            {" "}
                            <MdError
                              style={{ fontSize: "14px", marginRight: "4px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {" "}
                              {rentError}
                            </span>
                          </div>
                        )}
                        </Form.Group>

                  
                      </div>
                    </div>
                  </div>


                </div>

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
            {state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
              </div>
              : null}
            <Modal.Footer className="pt-1" style={{ border: "none" }}>
              <Button
                className="w-100"
                style={{
                  backgroundColor: "#1E45E1",
                  fontWeight: 600,
                  height: 50,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "Montserrat",
                }}
                onClick={handleSaveReassignBed}
              >
                Reassign Bed
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}

CustomerReAssign.propTypes = {
  customerReassign: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  reAssignDetail: PropTypes.func.isRequired,
  setCustomerReAssign: PropTypes.func.isRequired,
};

export default CustomerReAssign;
