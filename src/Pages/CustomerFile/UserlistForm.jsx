/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { JoininDatecustomer } from "../../Redux/Action/smartStayAction";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";


function TenantCheckIn(props) {
 
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [Bed, setBed] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
 
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  // const [formLoading, setFormLoading] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState([]);
  const [activeTab, setActiveTab] = useState("long");
  






  const [fields, setFields] = useState([]);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [dateError, setDateError] = useState("");

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };


  const options = {
    dateFormat: "Y/m/d",
    maxDate: null,
    minDate: new Date(),
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);




  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Selected Floor" ||
      value === "Selected Room" ||
      value === "Selected Bed"
    ) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Please Select Floor");
          break;
        case "Rooms":
          setRoomError("Please Select Room");
          break;
        case "Bed":
          setBedError("Please Select Bed");
          break;
        case "selectedDate":
          setDateError("Please Select Joining Date");
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
    } else {
      switch (fieldName) {
        case "Floor":
          setfloorError("");
          break;
        case "Rooms":
          setRoomError("");
          break;
        case "Bed":
          setBedError("");
          break;
        case "selectedDate":
          setDateError("");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("");
          break;
        case "RoomRent":
          setRoomRentError("");
          break;
       
      
        default:
          break;
      }
      return true;
    }
  };

  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || "");
    setRooms("");
    setBed("");
    setfloorError("");
  };

  const handleRooms = (selectedValue) => {
    setRooms(selectedValue);

    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: state.login.selectedHostel_Id,
        floor_id: Floor,
        room_id: selectedValue,
      },
    });

    setRoomRent("");
    setRoomError("");
  };

  const handleBed = (selectedOption) => {
    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);

    const Bedfilter = state?.UsersList?.roomdetails?.filter(
      (u) =>
        // String(u.Hostel_Id) === String(hostel_Id) &&
        String(u.Floor_Id) === String(Floor) &&
        String(u.Room_Id) === String(Rooms)
    );

    const Roomamountfilter =
      Bedfilter?.[0]?.bed_details?.filter(
        (amount) => String(amount.id) === String(selectedBedId)
      ) ?? [];

    if (Roomamountfilter.length > 0) {
      setRoomRent(Roomamountfilter[0]?.bed_amount);
    }

    setBedError("");
    setRoomRentError("");
  };

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


  const handleCloseAssign = () => {

    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    props.setShowAssignMenu(false);
    props.setShowForm(false);
    props.OnShowTable(true);
    if (props.edit === "Edit") {
      props.OnShowTable(true);
    } else {
      props.setRoomDetail(false);
    }
  }




  const handleAdvaceShowForm = () => {
    props.setShowMenu(false);
    props.setAdvanceForm(true);
  };

  useEffect(() => { }, [props.showMenu]);


  const handleSaveUserlistAddUser = async () => {

    let hasReasonAmountError = false;
    let newErrors = [];


    if (!validateAssignField(Floor, "Floor"));
    if (!validateAssignField(Rooms, "Rooms"));
    if (!validateAssignField(Bed, "Bed"));
    if (!validateAssignField(selectedDate, "selectedDate"));
    if (!validateAssignField(AdvanceAmount, "AdvanceAmount"));
    if (!validateAssignField(RoomRent, "RoomRent"));

    if (Floor === "Selected Floor" || floorError) {
      setfloorError("Please Select a Valid PG");
      return;
    }
    if (Rooms === "Selected Room" || roomError) {
      setRoomError("Please Select a Valid PG");
      return;
    }
    if (Bed === "Selected Bed" || bedError) {
      setBedError("Please Select a Valid PG");
      return;
    }

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
      Floor !== "Selected Floor" &&
      Rooms !== "Selected Room" &&
      Bed !== "Selected Bed" &&
      selectedDate &&
      Number(AdvanceAmount) > 0 &&
      Number(RoomRent) > 0
    ) {
      handleAdvaceShowForm();

      handleCloseAssign()
    }
    dispatch({ type: "INVOICELIST" });
  };


  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];



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







  return (
    <div>
      <Modal
        show={props.showAssignMenu}
        onHide={handleCloseAssign}
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
                    Tenant Check-In
                  </div>

                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleCloseAssign}
                    style={{ cursor: "pointer" }}
                  />
                </Modal.Header>


                <div className="d-flex align-items-center gap-3 mb-3 ms-3">
                  <img
                    src={Profileimage}
                    alt="Profile"
                    className="rounded-circle"
                    width="35"
                    height="35"
                  />
                  <div>
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                      Rajesh
                    </p>

                  </div>
                </div>


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
                      Long Stay
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
                      Short Stay
                    </button>
                  </div>

                </div>

                {activeTab === "long" ? <>
                  <div style={{ maxHeight: "350px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                    <div className="row d-flex align-items-center">
                      <div className="col-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            paddingTop: "6px",
                          }}
                        >
                          Floor  {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList?.hosteldetailslist?.map((u) => ({
                              value: u.floor_id,
                              label: u.floor_name,
                            })) || []
                          }
                          onChange={handleFloor}
                          value={
                            state.UsersList?.hosteldetailslist?.find(
                              (option) => option.floor_id === Floor
                            )
                              ? {
                                value: Floor,
                                label: state.UsersList.hosteldetailslist.find(
                                  (option) => option.floor_id === Floor
                                )?.floor_name,
                              }
                              : null
                          }
                          placeholder="Select a Floor"
                          classNamePrefix="custom"
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
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                              color: "#000",
                            }),
                          }}
                        />

                        {floorError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
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
                              {floorError}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="col-12 mb-1">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Room {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList?.roomdetails?.map((item) => ({
                              value: item.Room_Id,
                              label: item.Room_Name,
                            })) || []
                          }
                          onChange={(selectedOption) =>
                            handleRooms(selectedOption?.value)
                          }
                          value={
                            state.UsersList?.roomdetails?.find(
                              (option) => option.Room_Id === Rooms
                            )
                              ? {
                                value: Rooms,
                                label: state.UsersList.roomdetails.find(
                                  (option) => option.Room_Id === Rooms
                                )?.Room_Name,
                              }
                              : null
                          }
                          placeholder="Select a Room"
                          classNamePrefix="custom"
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
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                              color: "#000",
                            }),
                          }}
                        />


                      </div>



                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Bed {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList?.bednumberdetails?.bed_details
                              ?.filter(
                                (item) =>
                                  item.bed_no !== "0" &&
                                  item.bed_no !== "undefined" &&
                                  item.bed_no !== "" &&
                                  item.bed_no !== "null"
                              )
                              ?.map((item) => ({
                                value: item.id,
                                label: item.bed_no,
                              })) || []
                          }
                          onChange={handleBed}
                          value={
                            state.UsersList?.bednumberdetails?.bed_details?.find(
                              (option) => option.id === Bed
                            )
                              ? {
                                value: Bed,
                                label:
                                  state.UsersList.bednumberdetails.bed_details.find(
                                    (option) => option.id === Bed
                                  )?.bed_no,
                              }
                              : null
                          }
                          placeholder="Select a Bed"
                          classNamePrefix="custom"
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
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                              color: "#000",
                            }),
                          }}
                        />

                        {bedError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
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
                              {bedError}
                            </label>
                          </div>
                        )}
                      </div>


                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Group controlId="purchaseDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Joining Date{" "}
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
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => {
                                setDateError("");
                                setSelectedDate(date ? date.toDate() : null);
                                setJoingDateErrmsg('')

                                dispatch(JoininDatecustomer(date ? date.toDate() : null));
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <div style={{ color: "red", marginTop: "-px" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
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
                              {dateError}
                            </label>
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
                      </div>

                      <div className="row align-items-end ms-1 me-1" style={{ paddingRight: 5, paddingLeft: 0 }}>


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




                      </div>


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


                            <div className="col-md-5 position-relative">
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
                                  paddingRight: 35,
                                }}
                              />


                              <button
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                style={{
                                  position: "absolute",
                                  right: 10,
                                  top: "10%",
                                  transform: "translateY(-50%)",
                                  background: "#F0F0F0",
                                  border: "1px solid #C1C1C1",
                                  borderRadius: "50%",
                                  width: 20,
                                  height: 20,
                                  padding: 0,
                                  fontSize: 12,
                                  lineHeight: 1,
                                  textAlign: "center",
                                  color: "#333",
                                }}
                              >
                                ×
                              </button>


                              {errors[index]?.amount && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError
                                    style={{ color: "red", marginRight: "5px", fontSize: "14px" }}
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
                                    {errors[index]?.amount}
                                  </label>
                                </div>
                              )}
                            </div>




                          </div>
                        );
                      })}




                    </div>








                  </div>




                  <div className="col-12 p-1">
                    <button
                      type="button"
                      className="w-100"
                      style={{
                       
                        backgroundColor: "#1E45E1",
                        color: "#fff",
                        fontWeight: 600,
                        height: 40,
                        borderRadius: 8,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={handleSaveUserlistAddUser}
                    >
                      Assign Bed
                    </button>
                  </div>



                </>

                  :



                  activeTab === "short" && (
                    <div
                      style={{
                        height: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2f6fc",
                        borderRadius: "10px",
                        marginTop: "20px",
                        marginRight: "0",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        border: "1px dashed #b0c4de",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                          alt="Coming Soon"
                          width="80"
                          height="80"
                          style={{ marginBottom: "15px", opacity: 0.7 }}
                        />

                        <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                      </div>
                    </div>

                  )



                }






              </div>

            </div>
          </Modal.Body>


        </Modal.Dialog>
      </Modal>


    </div>
  );
}

TenantCheckIn.propTypes = {
  EditObj: PropTypes.func.isRequired,
  setRoomDetail: PropTypes.func.isRequired,
  setUserClicked: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  OnShowTable: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  AfterEditFloors: PropTypes.func.isRequired,
  AfterEditRoomses: PropTypes.func.isRequired,
  AfterEditBeds: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  displayDetail: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  advanceForm: PropTypes.func.isRequired,
  setAdvanceForm: PropTypes.func.isRequired,
  setShowAssignMenu: PropTypes.func.isRequired,
  showAssignMenu: PropTypes.func.isRequired,
};
export default TenantCheckIn;






