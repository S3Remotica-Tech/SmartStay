import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import imageCompression from "browser-image-compression";
import { MdError } from "react-icons/md";
import Plus from "../Assets/Images/New_images/add-circle.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function CustomerReAssign(props){
    const state = useSelector((state) => state);
    console.log("state...", state);
    const dispatch = useDispatch();
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateError, setDateError] = useState("");
    const [currentFloor,setCurrentFloor] = useState("")
    const [currentRoom,setCurrentRoom]= useState("")
    const [currentBed,setCurrentBed]= useState("")
    const [currentRoomRent,setCurrentRoomRent]=useState("")
    const [newRoomRent,setNewRoomRent]=useState("")
    const [currentHostel_id,setCurrentHostel_Id]=useState("")
    const [newFloor,setNewFloor]=useState("")
    const [newRoom,setNewRoom]=useState("")
    const [newBed,setNewBed]=useState("")
    console.log("props.reAssignDetail",props.reAssignDetail)

    useEffect(()=>{
        setCurrentFloor(props.reAssignDetail.Floor)
        setCurrentRoom(props.reAssignDetail.Rooms)
        setCurrentBed(props.reAssignDetail.Bed)
        setCurrentRoomRent(props.reAssignDetail.RoomRent)
        setCurrentHostel_Id(props.reAssignDetail.Hostel_Id)

    },[props.reAssignDetail])
    const handleCloseReAssign=()=>{
        props.setCustomerReAssign(false)
    }

    useEffect(() => {
        dispatch({ type: "HOSTELDETAILLIST", payload: { hostel_Id: currentHostel_id } });
      }, [currentHostel_id]);
    
      useEffect(() => {
        if (currentHostel_id && newFloor) {
          dispatch({
            type: "ROOMDETAILS",
            payload: { hostel_Id: currentHostel_id, floor_Id: newFloor },
          });
        }
      }, [newFloor]);
      const handleFloor = (e) => {
        setNewFloor(e.target.value);
        // setRooms("");
        // setBed("");
        // setfloorError("");
      };
      const handleBed = (e) => {
        setNewBed(e.target.value);
        // setRooms("");
        // setBed("");
        // setfloorError("");
      };
      const handleRooms = (e) => {
        setNewRoom(e.target.value);
        dispatch({
          type: "BEDNUMBERDETAILS",
          payload: {
            hostel_id: currentHostel_id,
            floor_id: newFloor,
            room_id: e.target.value,
          },
        });
        // setRoomRent("");
        // setRoomError("");
      };
   
    const customDateInput = (props) => {
        return (
            <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
                <FormControl
                    type="text"
                    className='date_input'
                    value={props.value || 'DD/MM/YYYY'}
                    readOnly
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: props.value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none"
                    }}
                />
                <img 
                    src={Calendars} 
                    style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }} 
                    alt="Calendar" 
                    onClick={props.onClick} 
                />
            </div>
        );
    };

    const handleNewRoomRent=(e)=>{
            setNewRoomRent(e.target.value)
    }
    
    return(
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
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body       style={{marginTop:-30}}>
            <div className="d-flex align-items-center">
              
                <div className="container">
                  <div className="row mb-3"></div>

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
                      Reassign bed
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseReAssign}
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

                  <div className="row mb-3">
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
                        //   onChange={(e) => handleFirstName(e)}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #E7F1FF",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor:"#E7F1FF"
                          }}
                        />
                      </Form.Group>
                      {/* {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
                        </div>
                      )} */}
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
                        //   onChange={(e) => handleFirstName(e)}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #E7F1FF",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor:"#E7F1FF"
                          }}
                        />
                      </Form.Group>
                      {/* {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
                        </div>
                      )} */}
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
                        //   onChange={(e) => handleFirstName(e)}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #E7F1FF",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor:"#E7F1FF"
                          }}
                        />
                      </Form.Group>
                      {/* {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
                        </div>
                      )} */}
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
                          placeholder="Enter amount"
                          value={currentRoomRent}
                        //   onChange={(e) => handleAdvanceAmount(e)}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #E7F1FF",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor:"#E7F1FF"
                          }}
                        />
                      </Form.Group>
                      {/* {advanceAmountError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {advanceAmountError}
                        </div>
                      )} */}
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
                      <Form.Select
                        aria-label="Default select example"
                        placeholder="Select no. of floor"
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
                        id="form-selects"
                        className="border"
                        value={newFloor}
                        onChange={(e) => handleFloor(e)}
                      >
                        <option>Selected Floor</option>
                        {state.UsersList?.hosteldetailslist?.map((u) => (
                          <option key={u.floor_id} value={u.floor_id}>
                            {u.floor_name}
                          </option>
                        ))}
                      </Form.Select>
                      {/* {floorError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {floorError}
                        </div>
                      )} */}
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
                      <Form.Select
                        aria-label="Default select example"
                        placeholder="Select no. of rooms"
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
                        value={newRoom}
                        className="border"
                        id="form-selects"
                        onChange={(e) => handleRooms(e)}
                      >
                        <option>Selected Room</option>

                        {state.UsersList?.roomdetails &&
                          state.UsersList.roomdetails.map((item) => (
                            <option key={item.Room_Id} value={item.Room_Id}>
                              {item.Room_Name}
                            </option>
                          ))}
                      </Form.Select>
                      {/* {roomError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {roomError}
                        </div>
                      )} */}
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

                      <Form.Select
                        aria-label="Default select example"
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
                        value={newBed}
                        className="border"
                        placeholder="Select a bed"
                        id="form-selects"
                        onChange={(e) => handleBed(e)}
                      >
                        <option value="" selected>
                          Selected Bed
                        </option>

                        {/* {props.edit === "Edit" &&
                          Bednum &&
                          Bednum.Bed &&
                          Bednum.Bed !== "undefined" &&
                          Bednum.Bed !== "" &&
                          Bednum.Bed !== "null" &&
                          Bednum.Bed !== "0" && (
                            <option value={Bednum.Bed} selected>
                              {Bednum.Bed}
                            </option>
                          )} */}

                        {state.UsersList?.bednumberdetails?.bed_details &&
                          state.UsersList?.bednumberdetails?.bed_details
                            .filter(
                              (item) =>
                                item.bed_no !== "0" &&
                                item.bed_no !== "undefined" &&
                                item.bed_no !== "" &&
                                item.bed_no !== "null"
                            )
                            .map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.bed_no}
                              </option>
                            ))}
                      </Form.Select>

                      {/* {bedError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {bedError}
                        </div>
                      )} */}
                    </div>
        
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                    Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </Form.Label>
                <div style={{ position: 'relative', width: "100%" }}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            setDateError('');
                            setSelectedDate(date);
                        }}
                        dateFormat="dd/MM/yyyy"
                        minDate={null}
                        maxDate={null} 
                        customInput={customDateInput({
                            value: selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                                ? selectedDate.toLocaleDateString('en-GB')
                                : '', 
                        })}
                    />
                </div>
            </Form.Group>

            {/* {dateError && (
                <div style={{ color: "red" }}>
                    <MdError />
                    {dateError}
                </div>
            )} */}
        </div>

        {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

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
    New Rent Amount
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
      className="ms-2"
      onClick={(e) => e.stopPropagation()} 
    />
  </Form.Label>
  <FormControl
  onChange={(e)=handleNewRoomRent(e)}
  value={newRoomRent}
    type="text"
    id="form-controls"
    placeholder="Enter amount"
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
</Form.Group>
</div> */}

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
      New Rent Amount
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
        className="ms-2"
        onChange={(e) => {
          if (e.target.checked) {
            setNewRoomRent(currentRoomRent); 
          } else {
            setNewRoomRent("");
          }
        }}
      />
    </Form.Label>
    <FormControl
      onChange={(e) => handleNewRoomRent(e)}
      value={newRoomRent}
      type="text"
      id="form-controls"
      placeholder="Enter amount"
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
  </Form.Group>
</div>

                  </div>

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
                    // onClick={handleSaveUserlistAddUser}
                  >
                    Reassign Bed
                  </Button>
                </div>
              {/* )} */}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
        </>
    )
}
export default CustomerReAssign;