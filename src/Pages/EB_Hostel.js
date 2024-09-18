import React, { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Logo from "../Assets/Images/Logo-Icon.png";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Roombased from "./EB_RoomBased";
import CryptoJS from "crypto-js";
import Filter from "../Assets/Images/New_images/Group 13.png";
import Button from "react-bootstrap/Button";
import "./EB_Hostel.css";
import dottt from "../Assets/Images/Group 14.png";
import { Dropdown, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FormControl } from "react-bootstrap";
import Calendars from "../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import Swal from "sweetalert2";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import {
  Autobrightness,
  Call,
  Sms,
  House,
  Buildings,
  ArrowLeft2,
  ArrowRight2,
} from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdError } from "react-icons/md";

function EB_Hostel() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log("state", state);

  const [loginid, setLoginid] = useState();
  const loginId = localStorage.getItem("loginId");
  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  const [isvisible, setISVisible] = useState(false);
  const [backbtn, setBackbtn] = useState(true);
  const [hosteldetails, setHosteldetails] = useState("");
  const [transactionshow, settransactionshow] = useState(true);
  const [ebShow, setebshow] = useState(false);
  const [addEbDetail, setaddEbDetail] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState([]);
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [roomsByFloor, setRoomsByFloor] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startmeterdata, setStartmeterData] = useState([]);
  console.log("startmeterdata", startmeterdata);
  const [startmeter, setStartmeter] = useState([]);
  const [endmeter, setEndmeter] = useState("");
  const [amount, setAmount] = useState("");
  const [unitAmount, setUnitAmount] = useState("");
  console.log("unitAmount", unitAmount);
  const [totmetReading, settotmetReading] = useState("");
  const [id, setId] = useState("");
  const [edit, setEdit] = useState("");
  const [ebErrorunit, setEbErrorunit] = useState("");

  console.log("selectedDate", selectedDate);
  const calendarRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "EBLIST" });
    dispatch({ type: "EBSTARTMETERLIST" });
  }, []);

  useEffect(() => {
    const filteredstartmeter = state.PgList?.EB_startmeterlist.filter((item) =>
      item.Floor == 0 && item.Room == 0
        ? item.hostel_Id == selectedHostel
        : item?.hostel_Id == selectedHostel &&
          item.Floor == Floor &&
          item.Room == Rooms
    );

    const lastItem =
      filteredstartmeter?.length > 0
        ? filteredstartmeter[filteredstartmeter.length - 1]
        : null;
    setStartmeter(lastItem);
  }, [selectedHostel, state.PgList?.EB_startmeterlist, Floor, Rooms]);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
  };
  useEffect(() => {
    setEbErrorunit(state.PgList.ebError);
  }, [state.PgList.ebError]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  const handleHostelChange = (e) => {
    setSelectedHostel(e.target.value);
    setFloor("");
    setRooms("");
    setHostelIdError("");
    setEbErrorunit("");
  };
  const handleFloor = (e) => {
    setFloor(e.target.value);
    const filteredRooms = state.UsersList?.hosteldetailslist.filter(
      (room) => room.floor_id == e.target.value
    );
    console.log("filteredRooms", filteredRooms);
    setRoomsByFloor(filteredRooms);
    setRooms("");
    setfloorError("");
    setEbErrorunit("");
  };

  const handleRoom = (e) => {
    setRooms(e.target.value);
    setRoomError("");
    setEbErrorunit("");
  };
  const [startmeterValue, setStartmeterValue] = useState("");

  useEffect(() => {
    if (startmeter && startmeter.end_Meter_Reading) {
      setStartmeterValue(startmeter.end_Meter_Reading);
      setstartMeterError("");
    } else {
      setStartmeterValue("");
    }
  }, [startmeter]);

  useEffect(() => {
    if (selectedHostel && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: selectedHostel, floor_Id: Floor },
      });
    }
  }, [Floor]);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: selectedHostel },
    });
  }, [selectedHostel]);

  useEffect(() => {
    dispatch({ type: "EB-BILLING-UNIT-LIST" });
  }, []);
  useEffect(() => {
    dispatch({ type: "TRANSACTIONHISTORY" });
  }, []);

  const handleEbbill = (hostel) => {
    setISVisible(true);
    setHosteldetails(hostel);
  };

  const handleback = (isShow) => {
    setBackbtn(isShow);
    setISVisible(false);
  };
  const handleAddEbDetails = () => {
    if (ebShow) {
      setaddEbDetail(true);
    } else {
      setaddEbDetail(false);
    }
  };

  const handleTransactionsShow = () => {
    settransactionshow(true);
    setebshow(false);
  };

  const handlestartmeter = (e) => {
    setStartmeterValue(e.target.value);
    if (e.target.value) {
      setstartMeterError("");
    }
  };

  const handleendmeter = (e) => {
    setEndmeter(e.target.value);
    setendMeterError("");
  };

  const handleamount = (e) => {
    setAmount(e.target.value);
  };
  const handleebViewShow = () => {
    setebshow(true);
    settransactionshow(false);
  };
  useEffect(() => {
    const FilterEbAmount = state.Settings.EBBillingUnitlist.eb_settings?.filter(
      (item) => item.hostel_id == selectedHostel
    );
    console.log("FilteredEBAmount:", FilterEbAmount);
    setUnitAmount(FilterEbAmount);
    if (Array.isArray(FilterEbAmount) && FilterEbAmount.length > 0) {
      console.log("unitAmount..123?", FilterEbAmount[0]?.amount);
      setUnitAmount(FilterEbAmount[0]?.amount);
    } else {
      console.log("unitAmount is not a valid array or is empty.");
    }
  }, [state.Settings.EBBillingUnitlist.eb_settings, selectedHostel]);

  const totalMeterReading =
    endmeter -
    (startmeter && startmeter.end_Meter_Reading
      ? parseFloat(startmeter.end_Meter_Reading)
      : 0);
  console.log("totalMeterReading", totalMeterReading);

  const totalAmountRead =
    (unitAmount ? parseFloat(unitAmount) : 0) * (totalMeterReading || 0);
  console.log("totalAmountRead", totalAmountRead);

  useEffect(() => {
    if (state.PgList.AddEBstatusCode === 200) {
      dispatch({ type: "EBSTARTMETERLIST" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_EB" });
      }, 200);
    }
  }, [state.PgList.AddEBstatusCode]);
  const [hostelIdError, setHostelIdError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [endMeterError, setendMeterError] = useState("");
  const [startMeterError, setstartMeterError] = useState("");

  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select PG" ||
      value === "Select Floor" ||
      value === "Select a Room"
    ) {
      switch (fieldName) {
        case "Hostel ID":
          setHostelIdError("Hostel ID is required");
          break;
        case "Floor":
          setfloorError("Floor is required");
          break;
        case "Rooms":
          setRoomError("Room is required");
          break;
        case "startmeter":
          setstartMeterError("startmeter is required");
          break;
        case "endmeter":
          setendMeterError("endMeter is required");
          break;
        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "Hostel ID":
          setHostelIdError("");
        case "Floor":
          setfloorError("");
          break;
        case "Rooms":
          setRoomError("");
          break;
        case "Bed":
          setBedError("");
          break;
        case "startmeter":
          setstartMeterError("");
          break;
        case "endmeter":
          setendMeterError("");
          break;
        default:
          break;
      }
      return true;
    }
  };
  const validateStartMeter = () => {
    if (!startmeterValue || startmeterValue === 0) {
      setstartMeterError("Start meter is required");
      return false;
    } else {
      setstartMeterError(""); // Clear error if value is present
      return true;
    }
  };

  const handleClose = () => {
    setaddEbDetail(false);
    setHostelIdError("");
    setfloorError("");
    setRoomError("");
    setendMeterError("");
    setEbErrorunit("");
    setStartmeter("");
    setEndmeter("");
    setSelectedHostel("");
    setRooms("");
    setFloor("");
    setstartMeterError("");
  };

  const handleSaveEbBill = () => {
    // Validate each field before proceeding
    const isHostelValid = validateAssignField(selectedHostel, "Hostel ID");
    const isFloorValid = validateAssignField(Floor, "Floor");
    const isRoomValid = validateAssignField(Rooms, "Rooms");
    const isStartMeterValid = validateAssignField(
      startmeterValue,
      "startmeter"
    );
    const isEndMeterValid = validateAssignField(endmeter, "endmeter");

    if (
      !isHostelValid ||
      !isEndMeterValid ||
      (!isFloorValid && !isRoomValid && !isStartMeterValid)
    ) {
      return;
    }

    // Dispatch based on whether or not floor and room values exist
    if (selectedHostel && Floor && Rooms && endmeter) {
      dispatch({
        type: "CREATEEB",
        payload: {
          Hostel_Id: selectedHostel,
          Floor: Floor,
          Room: Rooms,
          startMeterReading: startmeterValue,
          end_Meter_Reading: endmeter,
          EbAmount: totalAmountRead,
        },
      });
    } else if (selectedHostel && endmeter) {
      dispatch({
        type: "CREATEEB",
        payload: {
          Hostel_Id: selectedHostel,
          end_Meter_Reading: endmeter,
          EbAmount: totalAmountRead,
        },
      });
    }

    // Reset fields after successful save
  };
  useEffect(() => {
    if (state.PgList?.AddEBstatusCode === 200) {
      handleClose();
    }
  }, [state.PgList?.AddEBstatusCode]);

  const electricityrowsPerPage = 10;
  const [electricitycurrentPage, setelectricitycurrentPage] = useState(1);
  const [electricityFilterddata, setelectricityFilterddata] = useState([]);
  const indexOfLastRowelectricity =
    electricitycurrentPage * electricityrowsPerPage;
  const indexOfFirstRowelectricity =
    indexOfLastRowelectricity - electricityrowsPerPage;
  const currentRowelectricity = electricityFilterddata?.slice(
    indexOfFirstRowelectricity,
    indexOfLastRowelectricity
  );

  const handleElectricityPageChange = (InvoicepageNumber) => {
    setelectricitycurrentPage(InvoicepageNumber);
  };

  const totalPagesinvoice = Math.ceil(
    electricityFilterddata?.length / electricityrowsPerPage
  );

  const renderPageNumberselectricity = () => {
    const pageNumberselectricity = [];
    let startPageelectricity = electricitycurrentPage - 1;
    let endPageelectricity = electricitycurrentPage + 1;

    if (electricitycurrentPage === 1) {
      startPageelectricity = 1;
      endPageelectricity = 3;
    }

    if (electricitycurrentPage === totalPagesinvoice) {
      startPageelectricity = totalPagesinvoice - 2;
      endPageelectricity = totalPagesinvoice;
    }

    if (electricitycurrentPage === 2) {
      startPageelectricity = 1;
      endPageelectricity = 3;
    }

    if (electricitycurrentPage === totalPagesinvoice - 1) {
      startPageelectricity = totalPagesinvoice - 2;
      endPageelectricity = totalPagesinvoice;
    }

    for (let i = startPageelectricity; i <= endPageelectricity; i++) {
      if (i > 0 && i <= totalPagesinvoice) {
        pageNumberselectricity.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === electricitycurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === electricitycurrentPage ? "transparent" : "transparent",
                border:
                  i === electricitycurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleElectricityPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumberselectricity;
  };

  useEffect(() => {
    setelectricityFilterddata(state.PgList?.EB_startmeterlist);
  }, [state.PgList?.EB_startmeterlist]);

  const transactionrowsPerPage = 10;
  const [tranactioncurrentPage, settranactioncurrentPage] = useState(1);
  const [TransactionFilterddata, seteleTransactionFilterddata] = useState([]);

  const indexOfLastRowtransaction =
    tranactioncurrentPage * transactionrowsPerPage;
  const indexOfFirstRowtranaction =
    indexOfLastRowtransaction - transactionrowsPerPage;
  const currentRowtransaction = TransactionFilterddata?.slice(
    indexOfFirstRowtranaction,
    indexOfLastRowtransaction
  );
  const totalPagestransaction = Math.ceil(
    TransactionFilterddata?.length / transactionrowsPerPage
  );

  const handleTransactionPageChange = (transpageNumber) => {
    settranactioncurrentPage(transpageNumber);
  };

  const renderPageNumberstransaction = () => {
    const pageNumberstransaction = [];
    let startPagetransaction = tranactioncurrentPage - 1;
    let endPagetransaction = tranactioncurrentPage + 1;

    if (tranactioncurrentPage === 1) {
      startPagetransaction = 1;
      endPagetransaction = 3;
    }

    if (tranactioncurrentPage === totalPagestransaction) {
      startPagetransaction = totalPagestransaction - 2;
      endPagetransaction = totalPagestransaction;
    }

    if (tranactioncurrentPage === 2) {
      startPagetransaction = 1;
      endPagetransaction = 3;
    }

    if (tranactioncurrentPage === totalPagestransaction - 1) {
      startPagetransaction = totalPagestransaction - 2;
      endPagetransaction = totalPagestransaction;
    }

    for (let i = startPagetransaction; i <= endPagetransaction; i++) {
      if (i > 0 && i <= totalPagestransaction) {
        pageNumberstransaction.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === tranactioncurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === tranactioncurrentPage ? "transparent" : "transparent",
                border: i === tranactioncurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleTransactionPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumberstransaction;
  };

  useEffect(() => {
    seteleTransactionFilterddata(state.ExpenseList.transactionHistory);
  }, [state.ExpenseList.transactionHistory]);

  return (
    <div style={{ width: "100%", padding: 20 }}>
      <div className="d-flex justify-content-between align-items-center ms-3 mb-3">
        <div>
          <label
            style={{
              fontSize: 24,
              color: "#000000",
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Transactions
          </label>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <div className="me-3">
            <Image
              src={Filter}
              roundedCircle
              style={{ height: "30px", width: "30px" }}
            />
          </div>

          <div>
            <Button
              style={{
                fontFamily: "Montserrat",
                fontSize: 16,
                backgroundColor: transactionshow ? "#ccc" : "#1E45E1",
                color: "white",
                height: 56,
                fontWeight: 600,
                borderRadius: 12,
                width: 184,
                padding: "18px, 20px, 18px, 20px",
                border: "none",
                cursor: transactionshow ? "not-allowed" : "pointer",
              }}
              onClick={handleAddEbDetails}
              disabled={transactionshow}
            >
              + Add transaction
            </Button>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          className={`tab-path ${transactionshow ? "active" : ""}`}
          onClick={handleTransactionsShow}
          style={{
            fontFamily: "Gilroy",
            fontWeight: 500,
            fontSize: 16,
            marginLeft: 5,
          }}
        >
          General
        </div>

        <div
          className={`tab-path ${ebShow ? "active" : ""}`}
          onClick={handleebViewShow}
          style={{
            fontFamily: "Gilroy",
            fontWeight: 500,
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          Electricity Bill
        </div>
      </div>

      {transactionshow && (
        <div style={{ padding: 15 }}>
          <Table className="ebtable mt-3" responsive>
            <thead
              style={{
                color: "gray",
                fontSize: "11px",
                backgroundColor: "#E7F1FF",
              }}
            >
              <tr className="" style={{ height: "30px" }}>
                <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  Name 
                </th>
                <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  category
                </th>
                <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Date
                </th>

                <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "14px",
                    fontFamily: "Gilroy",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                  }}
                >
                  Made of pyment
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{ height: "50px", fontSize: "11px" }}>
              {currentRowtransaction &&
                currentRowtransaction.map((v, i) => {
                  return (
                    <tr>
                      <td
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          textAlign: "center",
                        }}
                      >
                        {v.hostel_Name}
                      </td>
                      <td>
                        <span
                          style={{
                            backgroundColor: "#FFEFCF",
                            paddingTop: "3px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "3px",
                            borderRadius: "10px",
                            lineHeight: "1.5em",
                            margin: "0",
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          {v.category_Name}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            backgroundColor: "#EBEBEB",
                            paddingTop: "3px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "3px",
                            borderRadius: "10px",
                            lineHeight: "1.5em",
                            margin: "0",
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          {v.date}
                        </span>
                      </td>
                      <td
                        style={{
                          fontSize: "16px",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        {v.credit}
                      </td>
                      <td>
                        <span
                          style={{
                            backgroundColor: "#D9E9FF",
                            paddingTop: "3px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "3px",
                            borderRadius: "10px",
                            lineHeight: "1.5em",
                            margin: "0",
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          {v.payment_type}
                        </span>
                      </td>
                      <td>
                        {" "}
                        <div
                          style={{
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderRadius: 100,
                            border: "1px solid #EFEFEF",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            position: "relative",
                            zIndex: 1000,
                          }}
                        >
                          <PiDotsThreeOutlineVerticalFill
                            style={{ height: 20, width: 20 }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {currentRowtransaction.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {currentRowtransaction.length > 0 && (
            <nav>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyleType: "none",
                  padding: 0,
                  justifyContent: "end",
                }}
              >
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color: tranactioncurrentPage === 1 ? "#ccc" : "#007bff",
                      cursor:
                        tranactioncurrentPage === 1 ? "not-allowed" : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() =>
                      handleTransactionPageChange(tranactioncurrentPage - 1)
                    }
                    disabled={tranactioncurrentPage === 1}
                  >
                    {" "}
                    <ArrowLeft2 size="16" color="#1E45E1" />
                  </button>
                </li>
                {tranactioncurrentPage > 3 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handleTransactionPageChange(1)}
                    >
                      1
                    </button>
                  </li>
                )}
                {tranactioncurrentPage > 3 && <span>...</span>}
                {renderPageNumberstransaction()}
                {tranactioncurrentPage < totalPagestransaction - 2 && (
                  <span>...</span>
                )}
                {tranactioncurrentPage < totalPagestransaction - 2 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",

                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() =>
                        handleTransactionPageChange(totalPagestransaction)
                      }
                    >
                      {totalPagestransaction}
                    </button>
                  </li>
                )}
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color:
                        tranactioncurrentPage === tranactioncurrentPage
                          ? "#ccc"
                          : "#007bff",
                      cursor:
                        tranactioncurrentPage === tranactioncurrentPage
                          ? "not-allowed"
                          : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() =>
                      handleTransactionPageChange(tranactioncurrentPage + 1)
                    }
                    disabled={tranactioncurrentPage === totalPagestransaction}
                  >
                    <ArrowRight2 size="16" color="#1E45E1" />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      )}
      {ebShow && (
        <>
          <div style={{ padding: 15 }}>
            <Table className="ebtable mt-3" responsive>
              <thead
                style={{
                  color: "gray",
                  fontSize: "11px",
                  backgroundColor: "#E7F1FF",
                }}
              >
                <tr className="" style={{ height: "30px" }}>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                      textAlign: "center",
                    }}
                  >
                    Paying Guest 
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Floor 
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Room no 
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Start meter 
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    End meter 
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Dated 
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Units
                  </th>
                  <th
                    style={{
                      color: "#939393",
                      fontWeight: 500,
                      fontSize: "14px",
                      fontFamily: "Gilroy",
                      paddingTop: "10px",
                      paddingBottom: "10px",
                    }}
                  >
                    Amount 
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ height: "50px", fontSize: "11px" }}>
                {currentRowelectricity &&
                  currentRowelectricity.map((v) => {
                    const imageUrl = v.profile || Profile;
                    let Dated = new Date(v.createAt);
                    console.log("Dated..?", Dated);

                    let day = Dated.getDate();
                    let month = Dated.getMonth() + 1;
                    let year = Dated.getFullYear();

                    let formattedDate = `${day}/${month}/${year}`;
                    console.log("Formatted Date:", formattedDate);
                    return (
                      <tr>
                        <td
                          style={{
                            border: "none",
                            display: "flex",
                            padding: "10px",
                          }}
                        >
                          <Image
                            src={imageUrl}
                            alt={v.hoatel_Name || "Default Profile"}
                            roundedCircle
                            style={{
                              height: "40px",
                              width: "40px",
                              marginRight: "10px",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = Profile;
                            }}
                          />
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {v.hoatel_Name}
                          </span>
                        </td>
                        {/* <td style={{ fontSize: "16px", fontWeight: 500, fontFamily: "Gilroy", textAlign: "center" }}>{v.hoatel_Name}</td> */}
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start",
                          }}
                        >
                          {v.Floor}
                        </td>
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start",
                          }}
                        >
                          {v.Room}
                        </td>
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start",
                          }}
                        >
                          {v.start_Meter_Reading}
                        </td>
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start",
                          }}
                        >
                          {v.end_Meter_Reading}
                        </td>
                        {/* <td>₹{view.BalanceDue}</td> */}

                        <td>
                          <span
                            style={{
                              backgroundColor: "#EBEBEB",
                              paddingTop: "5px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              paddingBottom: "5px",
                              borderRadius: "60px",
                              lineHeight: "1.5em",
                              margin: "0",
                              fontSize: "14px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {formattedDate}
                          </span>
                        </td>
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start",
                          }}
                        >
                          {v.Eb_Unit}
                        </td>
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            textAlign: "start",
                          }}
                        >
                          {v.EbAmount}
                        </td>
                        <td>
                          <div
                            style={{
                              cursor: "pointer",
                              height: 40,
                              width: 40,
                              borderRadius: 100,
                              border: "1px solid #EFEFEF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              zIndex: 1000,
                            }}
                          >
                            <PiDotsThreeOutlineVerticalFill
                              style={{ height: 20, width: 20 }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                {currentRowelectricity?.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      style={{ textAlign: "center", color: "red" }}
                    >
                      No data found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

          {currentRowelectricity.length > 0 && (
            <nav>
              <ul
                style={{
                  display: "flex",
                  alignItems: "center",
                  listStyleType: "none",
                  padding: 0,
                  justifyContent: "end",
                }}
              >
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color: electricitycurrentPage === 1 ? "#ccc" : "#007bff",
                      cursor:
                        electricitycurrentPage === 1
                          ? "not-allowed"
                          : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() =>
                      handleElectricityPageChange(electricitycurrentPage - 1)
                    }
                    disabled={electricitycurrentPage === 1}
                  >
                    {" "}
                    <ArrowLeft2 size="16" color="#1E45E1" />
                  </button>
                </li>
                {electricitycurrentPage > 3 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",
                        color: "white",
                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handleElectricityPageChange(1)}
                    >
                      1
                    </button>
                  </li>
                )}
                {electricitycurrentPage > 3 && <span>...</span>}
                {renderPageNumberselectricity()}
                {electricitycurrentPage < totalPagesinvoice - 2 && (
                  <span>...</span>
                )}
                {electricitycurrentPage < totalPagesinvoice - 2 && (
                  <li style={{ margin: "0 5px" }}>
                    <button
                      style={{
                        padding: "5px 10px",
                        textDecoration: "none",

                        cursor: "pointer",
                        borderRadius: "5px",
                        display: "inline-block",
                        minWidth: "30px",
                        textAlign: "center",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() =>
                        handleElectricityPageChange(totalPagesinvoice)
                      }
                    >
                      {totalPagesinvoice}
                    </button>
                  </li>
                )}
                <li style={{ margin: "0 5px" }}>
                  <button
                    style={{
                      padding: "5px 10px",
                      textDecoration: "none",
                      color:
                        electricitycurrentPage === electricitycurrentPage
                          ? "#ccc"
                          : "#007bff",
                      cursor:
                        electricitycurrentPage === electricitycurrentPage
                          ? "not-allowed"
                          : "pointer",
                      borderRadius: "5px",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() =>
                      handleElectricityPageChange(electricitycurrentPage + 1)
                    }
                    disabled={electricitycurrentPage === totalPagesinvoice}
                  >
                    <ArrowRight2 size="16" color="#1E45E1" />
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {!transactionshow && (
        <Modal
          show={addEbDetail}
          onHide={() => handleClose()}
          backdrop="static"
          centered
        >
          <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18 }} className="text-center">
              Add a transaction
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row ">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {ebErrorunit && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {ebErrorunit}
                  </div>
                )}
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Paying Guest<span style={{ color: 'red', fontSize: '20px' }}> * </span>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={selectedHostel}
                  onChange={(e) => handleHostelChange(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    lineHeight: "18.83px",
                    fontWeight: 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                >
                  <option
                    style={{ fontSize: 14, fontWeight: 600 }}
                    selected
                    value=""
                  >
                    Select PG 
                  </option>
                  {state.UsersList?.hostelList &&
                    state.UsersList?.hostelList.map((item) => (
                      <>
                        <option key={item.id} value={item.id}>
                          {item.Name}
                        </option>
                      </>
                    ))}
                </Form.Select>
                {hostelIdError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {hostelIdError}
                  </div>
                )}
                {unitAmount &&
                  unitAmount?.length === 0 &&
                  selectedHostel != "" && (
                    <>
                      <label
                        className="pb-1"
                        style={{
                          fontSize: 12,
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        Please add a 'ebUnitAmount in Settings'
                      </label>
                    </>
                  )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Floor <span style={{ color: 'red', fontSize: '20px' }}> * </span>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  disabled={
                    unitAmount &&
                    unitAmount?.length === 0 &&
                    selectedHostel != ""
                  }
                  value={Floor}
                  onChange={(e) => handleFloor(e)}
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
                >
                  <option
                    style={{ fontSize: 14, fontWeight: 600 }}
                    selected
                    value=""
                  >
                    Select Floor 
                  </option>
                  {state?.UsersList?.hosteldetailslist &&
                    state?.UsersList?.hosteldetailslist.map((item) => (
                      <>
                        <option key={item.floor_id} value={item.floor_id}>
                          {item.floor_id}
                        </option>
                      </>
                    ))}
                </Form.Select>
                {floorError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {floorError}
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Room <span style={{ color: 'red', fontSize: '20px' }}> * </span>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  disabled={
                    unitAmount &&
                    unitAmount?.length === 0 &&
                    selectedHostel != ""
                  }
                  value={Rooms}
                  onChange={(e) => handleRoom(e)}
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
                >
                  <option>Select a Room</option>
                  {state.UsersList?.roomdetails &&
                    state.UsersList?.roomdetails.map((item) => (
                      <>
                        <option key={item.Room_Id} value={item.Room_Id}>
                          {item.Room_Id}
                        </option>
                      </>
                    ))}
                </Form.Select>
                {roomError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {roomError}
                  </div>
                )}
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
                    Start meter <span style={{ color: 'red', fontSize: '20px' }}> * </span>
                  </Form.Label>
                  <FormControl
                    id="form-controls"
                    placeholder={
                      !(startmeter && startmeter.end_Meter_Reading)
                        ? "Please enter startmeter "
                        : ""
                    }
                    type="text"
                    value={startmeterValue}
                    onChange={handlestartmeter}
                    disabled={!!(startmeter && startmeter.end_Meter_Reading)}
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
                {startMeterError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {startMeterError}
                  </div>
                )}
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
                    End meter <span style={{ color: 'red', fontSize: '20px' }}> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="6542310"
                    value={endmeter}
                    onChange={(e) => handleendmeter(e)}
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
                {endMeterError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {endMeterError}
                  </div>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                height: 50,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Montserrat, sans-serif",
                marginTop: 20,
              }}
              onClick={handleSaveEbBill}
            >
              Add transaction
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default EB_Hostel;
